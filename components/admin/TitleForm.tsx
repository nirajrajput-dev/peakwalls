"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

interface TitleFormProps {
  initialData?: {
    _id: string;
    title: string;
    releaseDate: string;
    description: string;
    thumbnail: {
      url: string;
    };
  };
  mode: "create" | "edit";
}

export default function TitleForm({ initialData, mode }: TitleFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [releaseDate, setReleaseDate] = useState(
    initialData?.releaseDate || ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(
    initialData?.thumbnail.url || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        toast.error("Invalid file type. Please upload JPEG, PNG, or WebP.");
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit.");
        return;
      }

      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("releaseDate", releaseDate);
      formData.append("description", description);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      } else if (mode === "create") {
        toast.error("Thumbnail is required");
        setIsSubmitting(false);
        return;
      }

      const endpoint =
        mode === "create"
          ? "/api/admin/titles"
          : `/api/admin/titles/${initialData?._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Title saved successfully");
        router.push("/admin/titles");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to save title");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Ghost of Tsushima"
        />
      </div>

      {/* Release Date */}
      <div>
        <label
          htmlFor="releaseDate"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Release Date *
        </label>
        <input
          type="text"
          id="releaseDate"
          required
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., July 2025"
        />
        <p className="mt-1 text-sm text-muted">Format: Month YYYY</p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Download stunning Ghost of Tsushima free high-resolution wallpapers."
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Thumbnail {mode === "create" && "*"}
        </label>
        {thumbnailPreview && (
          <div className="mb-4 relative w-full aspect-video max-w-md">
            <Image
              src={thumbnailPreview}
              alt="Thumbnail preview"
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleThumbnailChange}
          className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <p className="mt-1 text-sm text-muted">
          JPEG, PNG, or WebP. Max 10MB. 16:9 ratio recommended.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
            ? "Create Title"
            : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
