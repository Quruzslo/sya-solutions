import { client } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

interface UserData {
  name: string;
  email: string;
  tel: any;
  password: string;
  role: "admin" | "editor";
}

interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    tel?: any | null;
    role?: string | null;
  };
}

export async function POST(req: NextRequest) {
  const session = (await auth()) as CustomSession | null;

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Nincs jogosultságod új felhasználó létrehozásához!" },
      { status: 403 },
    );
  }

  try {
    const data: UserData = await req.json();
    const { name, email, password, role, tel } = data;
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Minden mező kitöltése kötelező!" },
        { status: 400 },
      );
    }

    if (role !== "admin" && role !== "editor") {
      return NextResponse.json(
        { message: "Érvénytelen szerepkör!" },
        { status: 400 },
      );
    }

    const db = client.db("main").collection("admin");
    const normalizedEmail = email.toLowerCase().trim();

    const alreadyExists = await db.findOne({ email: normalizedEmail });

    if (alreadyExists) {
      return NextResponse.json(
        { message: "Ez az email cím már regisztrálva van!" },
        { status: 400 },
      );
    }

    const hasheltJelszo = await bcrypt.hash(password, 10);

    await db.insertOne({
      name: name,
      email: normalizedEmail,
      tel: tel,
      password: hasheltJelszo,
      role: role,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Sikeresen hozzáadtál egy új felhasználót!" },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Hiba a regisztráció során:", err);
    return NextResponse.json(
      { message: "Szerverhiba történt!", error: err.message },
      { status: 500 },
    );
  }
}
