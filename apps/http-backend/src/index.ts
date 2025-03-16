import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import middleware from "./middleware";
import cors from 'cors'
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(cors())
app.use(express.json());


app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid body",
    });
  } else {
    try {
      await prismaClient.user.create({
        data: {
          email: parsedData.data.username,
          name: parsedData.data.name,
          password: parsedData.data.password,
        },
      });
      res.json({
        message: "Signed up user",
        username: parsedData.data.username,
      });
    } catch (e) {
      res.json({
        error: e,
      });
    }
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(403).json({
      message: "invalid input",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });
  if (!user) {
    res.status(411).json({
      message: "user not found",
    });
  }
  const userId = user?.id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({
    token,
    userId,
  });
});

app.post("/room", middleware, async (req, res) => {
  const { success } = CreateRoomSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      message: "Invalid body",
    });
  }
  try {
    const room = await prismaClient.room.create({
      data: {
        //@ts-ignore
        adminId: req.userId,
        slug: req.body.name,
      },
    });
    res.json({
      message: "Room Created",
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "room already exists with this name",
    });
  }
});

app.get("/chats/:roomId", async function (req, res) {
  const roomId = Number(req.params.roomId);
  try {
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });
    res.json({
      messages,
    });
  } catch (e) {
    res.json({
      messages: [],
    });
  }
});
app.get("/room/:slug", async function (req, res) {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

// Add new endpoint to get all rooms
app.get("/rooms", async function (req, res) {
  try {
    const rooms = await prismaClient.room.findMany({
      orderBy: {
        id: "desc"
      }
    });
    res.json({
      rooms,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching rooms",
      error: e
    });
  }
});

app.listen(3003);
