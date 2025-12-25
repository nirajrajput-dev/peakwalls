import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Title from "@/lib/models/Title";

async function getTitles() {
  try {
    await connectDB();
    const titles = await Title.find().sort({ updatedAt: -1 }).lean();
    return titles.map((t) => ({
      ...t,
      _id: t._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching titles:", error);
    return [];
  }
}

export default async function TitlesPage() {
  // Check authentication
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const titles = await getTitles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Titles</h1>
          <p className="text-muted mt-2">Manage your wallpaper collections</p>
        </div>
        <Link
          href="/admin/titles/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          ➕ Create New Title
        </Link>
      </div>

      {titles.length === 0 ? (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-12 text-center">
          <p className="text-muted text-lg">No titles yet</p>
          <Link
            href="/admin/titles/new"
            className="inline-block mt-4 text-blue-500 hover:text-blue-400"
          >
            Create your first title
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {titles.map((title: any) => (
            <div
              key={title._id}
              className="bg-gray-900 rounded-lg border border-gray-800 p-6"
            >
              <div className="flex gap-6">
                {/* Thumbnail */}
                <div className="relative w-48 h-27 flex-shrink-0">
                  <Image
                    src={title.thumbnail.url}
                    alt={title.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {title.title}
                  </h3>
                  <p className="text-sm text-muted mb-1">
                    Release: {title.releaseDate}
                  </p>
                  <p className="text-sm text-muted mb-1">Slug: /{title.slug}</p>
                  <p className="text-sm text-muted mb-4">
                    Views: {title.viewCount}
                  </p>
                  <p className="text-foreground line-clamp-2">
                    {title.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/titles/${title._id}/edit`}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm text-center"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/titles/${title._id}/wallpapers`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm text-center"
                  >
                    Wallpapers
                  </Link>
                  <DeleteButton id={title._id} type="title" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
