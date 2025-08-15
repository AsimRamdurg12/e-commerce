import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ProductSchema } from "../schema/ProductSchema";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    if (!products) {
      res.status(404).json({
        success: false,
        message: "No Products found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: products,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getProducts: ${error}`,
    });
    return;
  }
};

export const addProducts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const data = ProductSchema.safeParse(req.body);

    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Only admins can add products",
      });
      return;
    }

    if (!data || !data.success) {
      res.status(400).json({
        success: false,
        message: data.error,
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        title: data.data?.title!,
        description: data.data?.description!,
        category: data.data?.category!,
        price: data.data?.price!,
        image: data.data?.image!,
        adminId: user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: product,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in addProduct: ${error}`,
    });
    return;
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const id = Number(req.params.id);

    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Unauthorized to delete products",
      });
      return;
    }

    const product = await prisma.product.findFirst({
      where: {
        id: id,
        adminId: user.id,
      },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
      return;
    }

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in deleteProduct: ${error}`,
    });
    return;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const productId = Number(req.params.id);

    // 1. Check admin role
    if (!user || user.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Only admins can update products",
      });
      return;
    }

    // 2. Validate request body with Zod
    const parsed = ProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.flatten(),
      });
      return;
    }

    // 3. Check if the product exists and belongs to the admin
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        adminId: user.id,
      },
    });

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found or unauthorized to update",
      });
      return;
    }

    // 4. Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        price: parsed.data.price,
        image: parsed.data.image,
      },
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in updateProduct: ${error}`,
    });
    return;
  }
};
