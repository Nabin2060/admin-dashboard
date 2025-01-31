import { db } from '@/app/api/index';
import { products } from '@/app/db/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Update a product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, description,image,initialStock,availableStock, price, categoryId } = await req.json();
  await db.update(products).set({ name, description,image,initialStock,availableStock, price, categoryId }).where(eq(products.id, Number(params.id)));
  return NextResponse.json({ message: "Product updated successfully..." });
}

// Delete a product
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await db.delete(products).where(eq(products.id, Number(params.id)));
  return NextResponse.json({ message: "Product deleted successfully..." });
}
