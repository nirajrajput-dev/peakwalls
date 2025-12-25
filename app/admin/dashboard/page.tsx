import StatsCard from "@/components/admin/StatsCard";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Title from "@/lib/models/Title";
import Wallpaper from "@/lib/models/Wallpaper";

async function getAnalytics() {
  try {
    await connectDB();

    // Get counts
    const totalTitles = await Title.countDocuments();
    const totalWallpapers = await Wallpaper.countDocuments();

    // Get total views
    const viewsResult = await Title.aggregate([
      { $group: { _id: null, total: { $sum: "$viewCount" } } },
    ]);
    const totalViews = viewsResult.length > 0 ? viewsResult[0].total : 0;

    // Get total downloads
    const downloadsResult = await Wallpaper.aggregate([
      { $group: { _id: null, total: { $sum: "$downloadCount" } } },
    ]);
    const totalDownloads =
      downloadsResult.length > 0 ? downloadsResult[0].total : 0;

    // Get recent titles
    const recentTitles = await Title.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("title slug updatedAt")
      .lean();

    return {
      totalTitles,
      totalWallpapers,
      totalViews,
      totalDownloads,
      recentTitles: recentTitles.map((t) => ({
        ...t,
        _id: t._id.toString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

export default async function DashboardPage() {
  // Check authentication
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const analytics = await getAnalytics();

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Failed to load analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-2">Overview of your wallpapers website</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Titles"
          value={analytics.totalTitles}
          icon="📁"
        />
        <StatsCard
          title="Total Wallpapers"
          value={analytics.totalWallpapers}
          icon="🖼️"
        />
        <StatsCard title="Total Views" value={analytics.totalViews} icon="👁️" />
        <StatsCard
          title="Total Downloads"
          value={analytics.totalDownloads}
          icon="⬇️"
        />
      </div>

      {/* Recent Titles */}
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Titles
          </h2>
        </div>
        <div className="p-6">
          {analytics.recentTitles.length === 0 ? (
            <p className="text-muted text-center py-8">No titles yet</p>
          ) : (
            <div className="space-y-4">
              {analytics.recentTitles.map((title: any) => (
                <div
                  key={title._id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="text-foreground font-medium">
                      {title.title}
                    </h3>
                    <p className="text-sm text-muted">
                      Updated: {new Date(title.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/titles/${title._id}/wallpapers`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/titles/new"
          className="block p-6 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            ➕ Create New Title
          </h3>
          <p className="text-blue-100">Add a new wallpaper collection</p>
        </Link>
        <Link
          href="/admin/titles"
          className="block p-6 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2">
            📋 Manage Titles
          </h3>
          <p className="text-muted">View and edit all titles</p>
        </Link>
      </div>
    </div>
  );
}
