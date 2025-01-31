import { db } from '@/app/api/index';
import { products } from '@/app/db/drizzle/schema';
import { NextResponse } from 'next/server';

// Fetch all products
export async function GET() {
  const allProducts = await db.select().from(products);
  return NextResponse.json(allProducts);
}

// Create a new product
export async function POST(req: Request) {
  const { name, description,image,initialStock,availableStock, price, categoryId } = await req.json();
  await db.insert(products).values({ name, description,image,initialStock,availableStock, price, categoryId });
  return NextResponse.json({ message: "Product added successfully" });
}
