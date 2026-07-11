import { auth } from "@/auth";
import { redirect } from "next/navigation";
import BlogUploadForm from "./blogUploadForm";

export default async function AdminBlogPage() {
  const session = await auth();

  return <BlogUploadForm session={session} />;
}
