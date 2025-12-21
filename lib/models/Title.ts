import mongoose, { Schema, Model } from 'mongoose';
import { ITitle } from '@/types';

const TitleSchema = new Schema<ITitle>(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    thumbnail: {
      url: { type: String, required: true },
      originalUrl: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for sorting
TitleSchema.index({ updatedAt: -1 });

const Title: Model<ITitle> =
  mongoose.models.Title || mongoose.model<ITitle>('Title', TitleSchema);

export default Title;