import z from "zod";

export const ProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title is not valid")
    .max(100, "Title exceeds character limit"),
  description: z
    .string()
    .min(50, "Enter minimum 50 characters")
    .max(300, "description exceeds limit"),
  category: z.string(),
  price: z.number(),
  image: z.string(),
});
