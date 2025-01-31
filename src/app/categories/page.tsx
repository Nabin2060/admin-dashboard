"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/use-toast";
import { CategoryDialog } from "@/app/componentsAdmin/categories/CategoryDialog";

interface Category {
  id: string;
  name: string;
  image: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { toast } = useToast();

  const handleAddCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: Math.random().toString(36).substring(7),
    };
    setCategories([...categories, newCategory]);
    toast({
      title: "Category created",
      description: "The category has been created successfully.",
    });
  };

  const handleEditCategory = (category: Category) => {
    setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    toast({
      title: "Category updated",
      description: "The category has been updated successfully.",
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    });
  };

  return (
    <div className="m-7">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button
          onClick={() => {
            setSelectedCategory(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={selectedCategory}
        onSubmit={(category) => {
          if (selectedCategory) {
            handleEditCategory({ ...category, id: selectedCategory.id });
          } else {
            handleAddCategory(category);
          }
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
