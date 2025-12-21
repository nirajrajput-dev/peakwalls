import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: File,
  folder: 'thumbnails' | 'wallpapers'
): Promise<{ url: string; originalUrl: string; publicId: string }> => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `niraj-wallpapers/${folder}`,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            const url =
              folder === 'thumbnails'
                ? cloudinary.url(result.public_id, {
                    width: 800,
                    height: 450,
                    crop: 'fill',
                    quality: 'auto:good',
                    fetch_format: 'auto',
                  })
                : cloudinary.url(result.public_id, {
                    width: 1024,
                    height: 576,
                    crop: 'fill',
                    quality: 'auto:good',
                    fetch_format: 'auto',
                  });

            resolve({
              url,
              originalUrl: result.secure_url,
              publicId: result.public_id,
            });
          }
        }
      )
      .end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
};

export default cloudinary;