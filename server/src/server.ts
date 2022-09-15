import express from "express";
import { PrismaClient } from "@prisma/client";
import { covertHourStringToMinutes } from "./utils/covertHourStringToMinutes";
import { covertMinutesToHoursString } from "./utils/covertMinutesToHoursString";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({}));

const prisma = new PrismaClient();

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: { _count: { select: { ads: true } } },
  });
  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: covertHourStringToMinutes(body.hourStart),
      hourEnd: covertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    where: { gameId },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: covertMinutesToHoursString(ad.hourStart),
      hourEnd: covertMinutesToHoursString(ad.hourEnd),
    }))
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json(ad);
});

app.listen(3333);
