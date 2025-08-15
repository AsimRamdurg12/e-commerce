"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyCart = exports.removeFromCart = exports.updateCartQuantity = exports.addToCart = exports.getCart = void 0;
const prisma_1 = require("../utils/prisma");
// Get all cart items for current user
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(403).json({
                success: false,
                message: "Please login to view cart",
            });
            return;
        }
        const cartItems = yield prisma_1.prisma.cartItem.findMany({
            where: { userId: user.id },
            include: { product: true },
        });
        res.status(200).json({ success: true, message: cartItems });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in getCart: ${error}`,
        });
        return;
    }
});
exports.getCart = getCart;
// Add product to cart
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const product = yield prisma_1.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        const existingCartItem = yield prisma_1.prisma.cartItem.findFirst({
            where: {
                userId: user.id,
                productId: productId,
            },
        });
        if (existingCartItem) {
            const updated = yield prisma_1.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + (quantity || 1) },
            });
            res.status(200).json({ success: true, message: updated });
            return;
        }
        const newItem = yield prisma_1.prisma.cartItem.create({
            data: {
                userId: user.id,
                productId,
                quantity: quantity || 1,
            },
        });
        res.status(201).json({ success: true, message: newItem });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error addToCart: ${error}`,
        });
    }
});
exports.addToCart = addToCart;
// Update cart quantity
const updateCartQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const cartItem = yield prisma_1.prisma.cartItem.findUnique({
            where: { id: Number(id) },
        });
        if (!cartItem || cartItem.userId !== user.id) {
            res.status(404).json({ success: false, message: "Cart item not found" });
            return;
        }
        const updated = yield prisma_1.prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity },
        });
        res
            .status(200)
            .json({ success: true, message: "Quantity updated", item: updated });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error updateCartQuantity: ${error}`,
        });
        return;
    }
});
exports.updateCartQuantity = updateCartQuantity;
// Remove item from cart
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const cartItem = yield prisma_1.prisma.cartItem.findUnique({
            where: { id: Number(id) },
        });
        if (!cartItem || cartItem.userId !== user.id) {
            res.status(404).json({ success: false, message: "Cart item not found" });
            return;
        }
        yield prisma_1.prisma.cartItem.delete({ where: { id: cartItem.id } });
        res.status(200).json({ success: true, message: "Item removed from cart" });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in removeFromCart: ${error}`,
        });
    }
});
exports.removeFromCart = removeFromCart;
// Empty cart
const emptyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(403).json({
                success: false,
                message: "Please login",
            });
            return;
        }
        yield prisma_1.prisma.cartItem.deleteMany({ where: { userId: user.id } });
        res.status(200).json({ success: true, message: "Cart emptied" });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error emptying cart: ${error}`,
        });
        return;
    }
});
exports.emptyCart = emptyCart;
