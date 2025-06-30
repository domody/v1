import { NextResponse } from 'next/server';
import { getPageContent } from '@/app/lib/markdown';

export async function GET(request, context) {
  const { params } = await context;
  const slug = (await params).slug.toLowerCase();

  try {
    const content = await getPageContent(slug);
    return NextResponse.json({
      content,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message || 'An unexpected error occurred',
    });
  }
}
