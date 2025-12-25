import TitleForm from "@/components/admin/TitleForm";
import { notFound } from "next/navigation";

async function getTitle(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/admin/titles`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const titles = data.data || [];
    return titles.find((t: any) => t._id === id) || null;
  } catch (error) {
    console.error("Error fetching title:", error);
    return null;
  }
}

export default async function EditTitlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const title = await getTitle(id);

  if (!title) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Title</h1>
        <p className="text-muted mt-2">Update wallpaper collection details</p>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <TitleForm mode="edit" initialData={title} />
      </div>
    </div>
  );
}
