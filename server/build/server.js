"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/games", (request, response) => {
    return response.json({ ok: true });
});
app.post("/ads", (request, response) => {
    return response.json({ ok: true });
});
app.get("/games/:id/ads", (request, response) => {
    return response.json({ ok: true });
});
app.get("/ads/:id/discord", (request, response) => {
    return response.json({ ok: true });
});
app.listen(3333);
