"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const RoleMiddleware_1 = require("../middlewares/RoleMiddleware");
const router = express_1.default.Router();
router.get("/products", ProductController_1.getProducts);
router.post("/add-product", AuthMiddleware_1.authenticate, (0, RoleMiddleware_1.authorizeRoles)("admin"), ProductController_1.addProducts);
router.patch("/update-product", AuthMiddleware_1.authenticate, (0, RoleMiddleware_1.authorizeRoles)("admin"), ProductController_1.updateProduct);
router.post("/remove-product", AuthMiddleware_1.authenticate, (0, RoleMiddleware_1.authorizeRoles)("admin"), ProductController_1.removeProduct);
exports.default = router;
