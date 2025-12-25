import TitleForm from "@/components/admin/TitleForm";

export default function NewTitlePage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Title</h1>
        <p className="text-muted mt-2">Add a new wallpaper collection</p>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <TitleForm mode="create" />
      </div>
    </div>
  );
}
