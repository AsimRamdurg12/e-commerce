"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useProduct } from "@/hooks/useProduct";
import {
  ProductFormSchema,
  ProductFormValues,
} from "@/schema/ProductFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineTitle } from "react-icons/md";
import { RiLoader4Line } from "react-icons/ri";

const Formfields = () => {
  const { products, isLoading, isError, error } = useProduct(
    "categories",
    "/products/categories"
  );

  const [image, setImage] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string); // `reader.result` is `string | ArrayBuffer | null`
      };
    }
  };

  const handleFormSubmit = (data: ProductFormValues) => {
    console.log(data);
  };

  if (isError) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        {error?.message}
      </div>
    );
  }

  return isLoading ? (
    <div className="min-h-screen w-full flex justify-center items-center">
      <RiLoader4Line size={50} className="animate-spin" />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 mx-4"
    >
      <h2 className="text-2xl font-poppins font-bold mb-4">Add New Product</h2>

      <Input
        type="text"
        label="Title"
        placeholder="Enter Title"
        Icon={<MdOutlineTitle />}
        {...register("title")}
      />
      {errors.title && (
        <p className="text-xs text-red-500">{errors.title.message}</p>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-semibold font-poppins">Category</label>
        <select
          {...register("category")}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">Select Category</option>
          {products?.map((product: string) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <Input
        label="Price"
        type="number"
        placeholder="Price"
        {...register("price")}
      />

      <div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold font-poppins">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageUpload}
            className="border px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.image && (
            <p className="text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        {image && (
          <div className="w-fit mt-4 border rounded-lg p-2">
            <Image
              src={image}
              alt="image"
              width={300}
              height={300}
              className="object-contain rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold font-poppins">Description</label>
        <textarea
          rows={6}
          {...register("description")}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Submit
      </Button>
    </form>
  );
};

export default Formfields;
