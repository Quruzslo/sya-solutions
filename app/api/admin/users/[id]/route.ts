import { client } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

interface CustomSession {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    tel?: any | null;
    role?: string | null;
  };
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

// --- TÖRLÉS (DELETE) ---

export async function DELETE(req: NextRequest, context: RouteContext) {
  const session = (await auth()) as CustomSession | null;

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Nincs jogosultságod a törléshez!" },
      { status: 403 },
    );
  }

  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const db = client.db("main").collection("admin");
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Felhasználó nem található!" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Felhasználó sikeresen törölve!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Hiba a törlés során!" },
      { status: 500 },
    );
  }
}

// --- MÓDOSÍTÁS (PATCH) ---
export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = (await auth()) as CustomSession | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Nincs bejelentkezve!" },
      { status: 401 },
    );
  }

  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const currentUserId = session.user.id;
    const currentUserRole = session.user.role;

    const isAdmin = currentUserRole === "admin";

    const isSelf = currentUserId === id;

    if (!isAdmin && !isSelf) {
      return NextResponse.json(
        { message: "Nincs jogosultságod más felhasználó adatait módosítani!" },
        { status: 403 },
      );
    }

    const data = await req.json();
    const { name, email, tel, role, password } = data;
    const db = client.db("main").collection("admin");

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await db.findOne({
      email: normalizedEmail,
      _id: { $ne: new ObjectId(id) },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Ez az email cím már foglalt!" },
        { status: 400 },
      );
    }

    const updateData: any = {
      name,
      email: normalizedEmail,
      tel,
    };

    if (isAdmin && role) {
      updateData.role = role;
    }

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await db.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json(
      { message: "Felhasználó sikeresen módosítva!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Hiba a módosítás során!" },
      { status: 500 },
    );
  }
}
