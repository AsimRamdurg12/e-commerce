import express from "express";

import {
  addToCart,
  emptyCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/CartController";
import { authenticate } from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/get-cart", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.patch("/upadte-cart/:id", authenticate, updateCartQuantity);
router.delete("/remove/:id", authenticate, removeFromCart);
router.delete("/empty-cart", authenticate, emptyCart);

export default router;
