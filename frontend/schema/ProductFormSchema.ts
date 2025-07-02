import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ProductFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title length is too short")
    .max(100, "Title length exceeded limit"),
  category: z.string(),
  description: z
    .string()
    .min(20, "Minimum description length must be 20 characters")
    .max(200, "Description length above 200 characters"),
  price: z.coerce.number().min(1, "Please enter pricing"),
  image: z
    .any()
    .refine((file) => file?.[0], {
      message: "Image is required",
    })
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, {
      message: "Max file size is 2MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), {
      message: "Only .jpg, .png, .webp formats are supported.",
    }),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;
