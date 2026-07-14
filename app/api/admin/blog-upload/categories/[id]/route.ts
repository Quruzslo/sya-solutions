import { client } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";

import slugify from "@/lib/slugify";

// Segédfüggvény az ObjectId ellenőrzéséhez
function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

// ==========================================
// 1. MÓDOSÍTÁS (PUT) - /api/admin/categories/[id]
// ==========================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    const allowedRoles = ["admin", "editor"];
    if (!session || !allowedRoles.includes(session.user?.role || "")) {
      return NextResponse.json(
        { message: "Nincs jogosultságod!" },
        { status: 403 },
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Érvénytelen kategória ID!" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { message: "A név megadása kötelező!" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const slug = slugify(trimmedName);

    const db = client.db("main").collection("posts-category");

    // Ellenőrizzük, hogy létezik-e már MÁSIK kategória ezzel a névvel/sluggal
    const duplicate = await db.findOne({
      _id: { $ne: new ObjectId(id) },
      $or: [
        { name: { $regex: new RegExp(`^${trimmedName}$`, "i") } },
        { slug: slug },
      ],
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "Ez a kategórianév már használatban van!" },
        { status: 400 },
      );
    }

    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: trimmedName,
          slug: slug,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Kategória nem található!" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Kategória sikeresen frissítve!" });
  } catch (err) {
    console.error("Hiba a kategória frissítésekor:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Szerverhiba" },
      { status: 500 },
    );
  }
}

// ==========================================
//  TÖRLÉS (DELETE) - /api/admin/categories/[id]
// ==========================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    // Jogosultság ellenőrzése
    const allowedRoles = ["admin", "editor"];
    if (!session || !allowedRoles.includes(session.user?.role || "")) {
      return NextResponse.json(
        { message: "Nincs jogosultságod!" },
        { status: 403 },
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Érvénytelen kategória ID!" },
        { status: 400 },
      );
    }

    const db = client.db("main");

    //  van-e olyan poszt, ami még használja ezt a kategóriát!
    const postWithThisCategory = await db.collection("posts").findOne({
      category: new ObjectId(id),
    });

    if (postWithThisCategory) {
      return NextResponse.json(
        {
          message:
            "A kategória nem törölhető, mert aktív posztok tartoznak hozzá!",
        },
        { status: 400 },
      );
    }

    // Ha nincs hozzárendelt poszt
    const result = await db.collection("posts-category").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Kategória nem található!" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Kategória sikeresen törölve!" });
  } catch (err) {
    console.error("Hiba a kategória törlésekor:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Szerverhiba" },
      { status: 500 },
    );
  }
}
