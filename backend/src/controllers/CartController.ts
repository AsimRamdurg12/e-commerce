import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

// Get all cart items for current user
export const getCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Please login to view cart",
      });
      return;
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    res.status(200).json({ success: true, message: cartItems });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getCart: ${error}`,
    });
    return;
  }
};

// Add product to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { productId, quantity } = req.body;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Please login",
      });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + (quantity || 1) },
      });
      res.status(200).json({ success: true, message: updated });
      return;
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId: user.id,
        productId,
        quantity: quantity || 1,
      },
    });

    res.status(201).json({ success: true, message: newItem });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error addToCart: ${error}`,
    });
  }
};

// Update cart quantity
export const updateCartQuantity = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Please login",
      });
      return;
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: Number(id) },
    });

    if (!cartItem || cartItem.userId !== user.id) {
      res.status(404).json({ success: false, message: "Cart item not found" });
      return;
    }

    const updated = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

    res
      .status(200)
      .json({ success: true, message: "Quantity updated", item: updated });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updateCartQuantity: ${error}`,
    });
    return;
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Please login",
      });
      return;
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: Number(id) },
    });

    if (!cartItem || cartItem.userId !== user.id) {
      res.status(404).json({ success: false, message: "Cart item not found" });
      return;
    }

    await prisma.cartItem.delete({ where: { id: cartItem.id } });

    res.status(200).json({ success: true, message: "Item removed from cart" });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in removeFromCart: ${error}`,
    });
  }
};

// Empty cart
export const emptyCart = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Please login",
      });
      return;
    }

    await prisma.cartItem.deleteMany({ where: { userId: user.id } });

    res.status(200).json({ success: true, message: "Cart emptied" });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error emptying cart: ${error}`,
    });
    return;
  }
};
