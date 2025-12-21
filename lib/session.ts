import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, {
    password: process.env.SESSION_SECRET!,
    cookieName: 'niraj-wallpapers-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: undefined, // Session cookie (expires when browser closes)
    },
  });

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
}