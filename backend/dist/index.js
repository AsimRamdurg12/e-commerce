"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const CartRoutes_1 = __importDefault(require("./routes/CartRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api/auth", AuthRoutes_1.default);
app.use("/api/products", ProductRoutes_1.default);
app.use("/api/carts", CartRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`);
});
