import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPrivileges } from '@/actions/admin';

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();
    
    if (!uid) {
      return NextResponse.json({ error: 'UID is required' }, { status: 400 });
    }

    const isAdmin = await checkAdminPrivileges(uid);
    
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('[Check Admin API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
