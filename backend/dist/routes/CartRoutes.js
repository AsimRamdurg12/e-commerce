"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = require("../controllers/CartController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
router.get("/get-cart", AuthMiddleware_1.authenticate, CartController_1.getCart);
router.post("/add", AuthMiddleware_1.authenticate, CartController_1.addToCart);
router.patch("/upadte-cart/:id", AuthMiddleware_1.authenticate, CartController_1.updateCartQuantity);
router.delete("/remove/:id", AuthMiddleware_1.authenticate, CartController_1.removeFromCart);
router.delete("/empty-cart", AuthMiddleware_1.authenticate, CartController_1.emptyCart);
exports.default = router;
