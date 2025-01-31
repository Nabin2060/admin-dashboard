import { db } from '@/app/api/index';
import { categories } from '@/app/db/drizzle/schema';
import { NextResponse } from 'next/server';

// Fetch all categories
export async function GET() {
  const allCategories = await db.select().from(categories);
  return NextResponse.json(allCategories);
}

// Create a new category
export async function POST(req: Request) {
  const { id,name,image } = await req.json();
  await db.insert(categories).values({id, name,image });
  return NextResponse.json({ message: "Category added successfully" });
}
