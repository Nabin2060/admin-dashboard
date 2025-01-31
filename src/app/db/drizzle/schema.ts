import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

// Categories Table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique(),
  image: varchar('image'),
});

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  description: text('description'),
  image:text('image'),
  price: integer('price'),
  categoryId: integer('category_id').references(() => categories.id),
  initialStock:integer,
  availableStock:integer,
  
});
