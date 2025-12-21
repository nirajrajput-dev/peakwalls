import mongoose, { Schema, Model } from 'mongoose';
import { IRateLimit } from '@/types';

const RateLimitSchema = new Schema<IRateLimit>({
  identifier: {
    type: String,
    required: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['upload', 'download'],
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  windowStart: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // TTL index
  },
});

const RateLimit: Model<IRateLimit> =
  mongoose.models.RateLimit ||
  mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);

export default RateLimit;