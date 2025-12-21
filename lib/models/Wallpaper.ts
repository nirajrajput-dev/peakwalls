import mongoose, { Schema, Model } from 'mongoose';
import { IWallpaper } from '@/types';

const WallpaperSchema = new Schema<IWallpaper>(
  {
    titleId: {
      type: Schema.Types.ObjectId,
      ref: 'Title',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for ordering wallpapers
WallpaperSchema.index({ titleId: 1, createdAt: 1 });

const Wallpaper: Model<IWallpaper> =
  mongoose.models.Wallpaper ||
  mongoose.model<IWallpaper>('Wallpaper', WallpaperSchema);

export default Wallpaper;