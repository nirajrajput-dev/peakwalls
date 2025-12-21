import Title from './models/Title';

export const generateUniqueSlug = async (title: string): Promise<string> => {
  // Convert title to slug
  let baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  let slug = baseSlug;
  let counter = 2;

  // Check if slug exists
  while (await Title.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

export const validateFileType = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
};