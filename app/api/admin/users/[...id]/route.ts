import { client } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

// --- TÖRLÉS (DELETE) ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = (await auth()) as CustomSession | null;
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Nincs jogosultságod!" },
      { status: 403 },
    );
  }

  try {
    const db = client.db("main").collection("admin");
    const result = await db.deleteOne({ _id: new ObjectId(params.id) });

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
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = (await auth()) as CustomSession | null;
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Nincs jogosultságod!" },
      { status: 403 },
    );
  }

  try {
    const data = await req.json();
    const { name, email, role, password } = data;
    const db = client.db("main").collection("admin");

    // Ha az emailt is módosítjuk, ellenőrizni kell, nem foglalt-e már
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await db.findOne({
      email: normalizedEmail,
      _id: { $ne: new ObjectId(params.id) },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Ez az email cím már foglalt!" },
        { status: 400 },
      );
    }

    // Csak azokat a mezőket frissítjük, amik meg lettek adva
    const updateData: any = {
      name,
      email: normalizedEmail,
      role,
    };

    // Ha a jelszó mező nem üres, akkor azt is hash-eljük és frissítjük
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await db.updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

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
