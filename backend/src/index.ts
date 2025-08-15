import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import CartRoutes from "./routes/CartRoutes";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
