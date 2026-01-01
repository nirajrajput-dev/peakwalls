# Niraj Wallpapers

A modern, full-stack wallpapers website built with Next.js, featuring an admin panel for content management.

## 🌐 Live Site

**Production:** [https://niraj-wallpapers.vercel.app](https://niraj-wallpapers.vercel.app)

## ✨ Features

### Public Site

- Browse wallpaper collections in a stunning zig-zag layout
- View high-resolution wallpapers
- Download wallpapers with proper filenames
- Responsive design (mobile, tablet, desktop)
- Rate limiting (10 downloads per hour per IP)

### Admin Panel

- Secure authentication
- Dashboard with real-time analytics
- Create/Edit/Delete wallpaper collections
- Upload multiple wallpapers (max 10MB each)
- View download and page view statistics
- Manage wallpaper ordering

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Image Hosting:** Cloudinary
- **Deployment:** Vercel
- **Authentication:** Iron Session

## 🚀 Local Development

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nirajrajput-dev/niraj-wallpapers.git
cd niraj-wallpapers
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file:

```env
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_BASE64=your_base64_password
SESSION_SECRET=your_session_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Admin Access

- URL: `/admin/login`
- Username: `admin`
- Password: (set via `ADMIN_PASSWORD_BASE64`)

## 📁 Project Structure

```
niraj-wallpapers/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin panel pages
│   ├── [slug]/           # Dynamic wallpapers pages
│   └── page.tsx          # Home page
├── components/
│   ├── admin/            # Admin components
│   └── ...               # Public components
├── lib/
│   ├── models/           # Mongoose models
│   ├── mongodb.ts        # Database connection
│   ├── cloudinary.ts     # Image upload utilities
│   └── ...               # Other utilities
├── types/
│   └── index.ts          # TypeScript types
└── middleware.ts         # Route protection
```

## 🔒 Security Features

- Session-based authentication with Iron Session
- Rate limiting on downloads and uploads
- Environment variable protection
- Secure password hashing (Base64 encoded bcrypt)
- Protected admin routes via middleware

## 📊 Database Schema

### Titles Collection

```typescript
{
  title: String,
  slug: String (unique),
  releaseDate: String,
  thumbnail: { url, originalUrl, publicId },
  description: String,
  viewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Wallpapers Collection

```typescript
{
  titleId: ObjectId,
  imageUrl: String,
  originalUrl: String,
  publicId: String,
  downloadCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Design Specifications

- **Colors:** Background `#000000`, Text `#FDFDFD`, Muted `#A5A4B2`
- **Container:** Max-width 1024px, 32px horizontal padding
- **Images:** 16:9 aspect ratio
- **Layout:** Zig-zag alternating (desktop), vertical stack (mobile)

## 📝 License

This project is private and not licensed for public use.

## 👤 Author

Niraj - [GitHub](https://github.com/nirajrajput-dev)
