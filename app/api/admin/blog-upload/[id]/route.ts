import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { client } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (
      !session ||
      (session.user?.role !== "admin" && session.user?.role !== "editor")
    ) {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Érvénytelen bejegyzés ID!" },
        { status: 400 },
      );
    }

    const db = client.db("main").collection("posts");
    const post = await db.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json(
        { message: "A bejegyzés nem található!" },
        { status: 404 },
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Hiba a bejegyzés lekérésekor:", err);
    return NextResponse.json(
      { message: "Szerverhiba történt!" },
      { status: 500 },
    );
  }
}

// ==========================================
// 1. POSZT MÓDOSÍTÁSA (PUT)
// ==========================================
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (
      !session ||
      (session.user?.role !== "admin" && session.user?.role !== "editor")
    ) {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Érvénytelen bejegyzés ID!" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const db = client.db("main").collection("posts");

    const updateData = {
      title: body.blogTitle,
      category:
        body.blogCategory && ObjectId.isValid(body.blogCategory)
          ? new ObjectId(body.blogCategory)
          : "Általános",
      description: body.blogDescription,
      content: body.blogContent,
      imageUrl: body.blogImage,
      status: body.blogStatus,
      updatedAt: new Date(),
      ...(body.categoryId && isValidObjectId(body.categoryId)
        ? { category: new ObjectId(body.categoryId) }
        : {}),
    };

    // 4. Frissítés a MongoDB-ben
    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "A bejegyzés nem található!" },
        { status: 404 },
      );
    }
    revalidateTag("posts", "max");
    revalidateTag("categories", "max");
    return NextResponse.json(
      { message: "Bejegyzés sikeresen frissítve!" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Hiba a bejegyzés frissítésekor:", err);
    return NextResponse.json(
      {
        message: "Szerverhiba történt!",
        error: err instanceof Error ? err.message : "Ismeretlen hiba",
      },
      { status: 500 },
    );
  }
}

// ==========================================
// 2. POSZT TÖRLÉSE (DELETE)
// ==========================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    // 1. Jogosultság ellenőrzése
    if (
      !session ||
      (session.user?.role !== "admin" && session.user?.role !== "editor")
    ) {
      return NextResponse.json(
        { message: "Nincs jogosultságod ehhez a művelethez!" },
        { status: 403 },
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Érvénytelen bejegyzés ID!" },
        { status: 400 },
      );
    }

    const db = client.db("main").collection("posts");

    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "A bejegyzés nem található, vagy már törölve lett!" },
        { status: 404 },
      );
    }
    revalidateTag("posts", "max");
    revalidateTag("categories", "max");
    return NextResponse.json(
      { message: "Bejegyzés sikeresen törölve!" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Hiba a bejegyzés törlésekor:", err);
    return NextResponse.json(
      {
        message: "Szerverhiba történt!",
        error: err instanceof Error ? err.message : "Ismeretlen hiba",
      },
      { status: 500 },
    );
  }
}
