import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { client } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // 1. Ellenőrizzük a jogosultságot
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }
    const db = client.db("main").collection("posts");
    const body = await request.json();

    await db.insertOne({
      authorId: session.user.id,
      author: session.user.name,
      role: session.user.role,
      title: body.blogTitle,
      category: body.blogCategory || "Általános",
      description: body.blogDescription,
      content: body.blogContent,
      createdAt: new Date(),
      status: body.blogStatus,
    });

    return NextResponse.json({ message: "Sikeres művelet!" }, { status: 200 });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Ismeretlen hiba történt";

    return NextResponse.json(
      { message: "Szerverhiba történt!", error: errorMessage },
      { status: 500 },
    );
  }
}
