// import { client } from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: NextRequest) {
//   try {
//     const db = client.db("main").collection("admin");
//     const targetEmail = "buliii1010@gmail.com";

//     const alreadyExists = await db.findOne({ email: targetEmail });

//     if (alreadyExists) {
//       return NextResponse.json(
//         { message: "Ez az email cím már regisztrálva van!" },
//         { status: 400 },
//       );
//     }

//     const hasheltJelszo = await bcrypt.hash("ZsoCunnAdmin#1010", 10);

//     await db.insertOne({
//       name: "Szőgyényi Zsófia",
//       email: targetEmail,
//       password: hasheltJelszo,
//       createdAt: new Date(),
//       role: "admin",
//     });

//     return NextResponse.json(
//       { message: "Sikeresen hozzáadtál egy új felhasználót! " },
//       { status: 200 },
//     );
//   } catch (err: any) {
//     return NextResponse.json(
//       { message: "Szerverhiba történt!", error: err.message },
//       { status: 500 },
//     );
//   }
// }
