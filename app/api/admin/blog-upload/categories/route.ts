import { client } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import slugify from "@/lib/slugify";
import { revalidateTag } from "next/cache";

// ==========================================
// 1. ÖSSZES LEKÉRÉSE (GET) - /api/admin/categories
// ==========================================
export async function GET() {
  try {
    const session = await auth();

    const allowedRoles = ["admin", "editor"];
    if (!session || !allowedRoles.includes(session.user?.role || "")) {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }

    const db = client.db("main").collection("posts-category");

    const categories = await db.find({}).sort({ name: 1 }).toArray();

    return NextResponse.json(categories);
  } catch (err) {
    console.error("Hiba a kategóriák lekérésekor:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Szerverhiba történt" },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. ÚJ LÉTREHOZÁSA - /api/admin/categories
// ==========================================
export async function POST(request: Request) {
  try {
    const session = await auth();

    const allowedRoles = ["admin", "editor"];
    if (!session || !allowedRoles.includes(session.user?.role || "")) {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "A kategória neve kötelező mező!" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const slug = slugify(trimmedName);

    const db = client.db("main").collection("posts-category");

    // Duplikáció ellenőrzése
    const existingCategory = await db.findOne(
      {
        $or: [{ name: trimmedName }, { slug: slug }],
      },
      { collation: { locale: "hu", strength: 2 } }, // strength: 2 = kis/nagybetű független!
    );

    if (existingCategory) {
      return NextResponse.json(
        { message: "Ez a kategória már létezik!" },
        { status: 400 },
      );
    }

    const newCategory = {
      name: trimmedName,
      slug: slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.insertOne(newCategory);
    revalidateTag("posts", "max");
    revalidateTag("categories", "max");
    return NextResponse.json(
      {
        message: "Kategória sikeresen létrehozva!",
        category: {
          _id: result.insertedId,
          ...newCategory,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Hiba a kategória mentésekor:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Szerverhiba történt" },
      { status: 500 },
    );
  }
}
