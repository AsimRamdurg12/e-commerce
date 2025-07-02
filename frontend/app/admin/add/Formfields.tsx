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
      <RiLoader4Line className="animate-spin" />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4 mx-4"
    >
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
        <label className="font-medium">Category</label>
        <select
          {...register("category")}
          className="border px-4 py-2 rounded-lg"
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
          <label className="font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageUpload}
            className="border px-4 py-2 rounded-lg"
          />
          {errors.image && (
            <p className="text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        {image && (
          <div className="w-fit border m-4">
            <Image
              src={image}
              alt="image"
              width={300}
              height={300}
              className="m-4 overflow-scroll"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Description</label>
        <textarea
          rows={10}
          className="border rounded-lg px-4 py-2"
          {...register("description")}
        ></textarea>
      </div>

      <Button type="submit" onClick={() => console.log("Asim")}>
        Submit
      </Button>
    </form>
  );
};

export default Formfields;
