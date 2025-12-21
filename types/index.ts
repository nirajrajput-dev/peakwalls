import { ObjectId } from 'mongoose';

export interface ITitle {
  _id?: string;
  title: string;
  slug: string;
  releaseDate: string;
  thumbnail: {
    url: string;
    originalUrl: string;
    publicId: string;
  };
  description: string;
  viewCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWallpaper {
  _id?: string;
  titleId: string | ObjectId;
  imageUrl: string;
  originalUrl: string;
  publicId: string;
  downloadCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRateLimit {
  _id?: string;
  identifier: string;
  action: 'upload' | 'download';
  count: number;
  windowStart: Date;
  expiresAt: Date;
}

export interface IAdmin {
  username: string;
  password: string;
}