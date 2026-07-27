"use server";

import { client } from "@/lib/mongodb";
import { revalidateTag } from "next/cache";
import { ObjectId } from "mongodb";

// TÖRLÉS
export async function deleteReviewAction(id: string) {
  const db = client.db("main").collection("reviews");
  await db.deleteOne({ _id: new ObjectId(id) });
  revalidateTag("reviews", "max");
}

//  SZERKESZTÉS / MÓDOSÍTÁS
export async function updateReviewAction(
  id: string,
  updatedData: { name: string; content: string; stars: number },
) {
  const db = client.db("main").collection("reviews");

  await db.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: updatedData.name,
        content: updatedData.content,
        stars: Number(updatedData.stars),
      },
    },
  );

  revalidateTag("reviews", "max");
}

// ÚJ ÉRTÉKELÉS LÉTREHOZÁSA
export async function createReviewAction(newData: {
  name: string;
  content: string;
  stars: number;
}) {
  const db = client.db("main").collection("reviews");

  await db.insertOne({
    name: newData.name,
    content: newData.content,
    stars: Number(newData.stars),
    date: new Date(),
  });

  revalidateTag("reviews", "max");
}
