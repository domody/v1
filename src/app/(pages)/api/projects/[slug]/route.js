import { NextResponse } from 'next/server';

import { getPageContent } from '@/app/lib/markdown';

export async function GET(request, context) {
  console.log('hello');
  const { params } = context;
  const slug = params.slug.toLowerCase();

  try {
    const content = await getPageContent(slug);
    return NextResponse.json({
      content,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err.message || 'An unexpected error occurred',
    });
  }
}
