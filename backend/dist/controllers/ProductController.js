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
exports.updateProduct = exports.removeProduct = exports.addProducts = exports.getProducts = void 0;
const prisma_1 = require("../utils/prisma");
const ProductSchema_1 = require("../schema/ProductSchema");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma_1.prisma.product.findMany({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in getProducts: ${error}`,
        });
        return;
    }
});
exports.getProducts = getProducts;
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const user = req.user;
        const data = ProductSchema_1.ProductSchema.safeParse(req.body);
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
        const product = yield prisma_1.prisma.product.create({
            data: {
                title: (_a = data.data) === null || _a === void 0 ? void 0 : _a.title,
                description: (_b = data.data) === null || _b === void 0 ? void 0 : _b.description,
                category: (_c = data.data) === null || _c === void 0 ? void 0 : _c.category,
                price: (_d = data.data) === null || _d === void 0 ? void 0 : _d.price,
                image: (_e = data.data) === null || _e === void 0 ? void 0 : _e.image,
                adminId: user.id,
            },
        });
        res.status(201).json({
            success: true,
            message: product,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in addProduct: ${error}`,
        });
        return;
    }
});
exports.addProducts = addProducts;
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const product = yield prisma_1.prisma.product.findFirst({
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
        yield prisma_1.prisma.product.delete({
            where: {
                id: product.id,
            },
        });
        res.status(200).json({
            success: true,
            message: "product deleted successfully",
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in deleteProduct: ${error}`,
        });
        return;
    }
});
exports.removeProduct = removeProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const parsed = ProductSchema_1.ProductSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: parsed.error.flatten(),
            });
            return;
        }
        // 3. Check if the product exists and belongs to the admin
        const existingProduct = yield prisma_1.prisma.product.findFirst({
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
        const updatedProduct = yield prisma_1.prisma.product.update({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Error in updateProduct: ${error}`,
        });
        return;
    }
});
exports.updateProduct = updateProduct;
