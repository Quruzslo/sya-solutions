import React from "react";
import BlogUploadForm from "../../feltoltes/blogUploadForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ModifyBlogPage({ params }) {
  const session = await auth();
  const { id } = await params;

  if (!session || session.user?.role !== "admin") {
    redirect("/admin-belepes");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <BlogUploadForm session={session} postId={id} />
    </div>
  );
}
