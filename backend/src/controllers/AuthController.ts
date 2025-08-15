import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { CreateUserSchema, signInSchema } from "../schema/AuthSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const data = CreateUserSchema.safeParse(req.body);

    if (!data.success) {
      res.status(400).json({
        message: data.error,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.data?.email,
      },
    });
    if (user) {
      res.status(401).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(data.data?.password as string, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.data?.name!,
        email: data.data?.email!,
        password: hashedPassword,
        role: data.data?.role,
      },
    });

    res.status(201).json({
      success: true,
      message: newUser,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in signUp: ${error}`,
    });
    return;
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const data = signInSchema.safeParse(req.body);

    if (!data.success) {
      res.status(400).json({
        message: data.error,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.data?.email,
        role: data.data?.role,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const verifyPassword = await bcrypt.compare(
      data.data?.password as string,
      user.password
    );

    if (!verifyPassword) {
      res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string
    );

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: token,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in signIn: ${error}`,
    });
    return;
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const findUser = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
    });

    if (!findUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: findUser,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in getProfile: ${error}`,
    });
    return;
  }
};
