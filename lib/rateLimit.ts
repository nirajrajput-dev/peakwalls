import RateLimit from './models/RateLimit';
import connectDB from './mongodb';

export async function checkRateLimit(
  identifier: string,
  action: 'upload' | 'download'
): Promise<{ allowed: boolean; retryAfter?: number }> {
  await connectDB();

  const now = new Date();
  const windowDuration = action === 'download' ? 60 * 60 * 1000 : 10 * 60 * 1000; // 1 hour for download, 10 min for upload
  const limit = action === 'download' ? 10 : 20;

  // Find existing rate limit record
  const record = await RateLimit.findOne({ identifier, action });

  if (!record) {
    // Create new record
    await RateLimit.create({
      identifier,
      action,
      count: 1,
      windowStart: now,
      expiresAt: new Date(now.getTime() + windowDuration),
    });
    return { allowed: true };
  }

  // Check if window has expired
  if (now.getTime() - record.windowStart.getTime() > windowDuration) {
    // Reset window
    record.count = 1;
    record.windowStart = now;
    record.expiresAt = new Date(now.getTime() + windowDuration);
    await record.save();
    return { allowed: true };
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    const retryAfter = Math.ceil(
      (record.windowStart.getTime() + windowDuration - now.getTime()) / 1000
    );
    return { allowed: false, retryAfter };
  }

  // Increment count
  record.count += 1;
  await record.save();
  return { allowed: true };
}