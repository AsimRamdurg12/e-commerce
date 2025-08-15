import express from "express";
import {
  addProducts,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/ProductController";
import { authenticate } from "../middlewares/AuthMiddleware";
import { authorizeRoles } from "../middlewares/RoleMiddleware";

const router = express.Router();

router.get("/products", getProducts);
router.post("/add-product", authenticate, authorizeRoles("admin"), addProducts);
router.patch(
  "/update-product",
  authenticate,
  authorizeRoles("admin"),
  updateProduct
);
router.post(
  "/remove-product",
  authenticate,
  authorizeRoles("admin"),
  removeProduct
);

export default router;
