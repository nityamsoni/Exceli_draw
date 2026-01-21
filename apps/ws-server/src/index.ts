import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws, req) => {
  console.log("New client connected");
  const url=req.url;

  const queryparams= new URLSearchParams(url?.split("?")[1]);
  const token=queryparams.get("token");

 const decodeToken=jwt.verify(token as string, JWT_SECRET);

 if(!decodeToken || !(decodeToken as JwtPayload).userId){
    ws.close(1008, "Unauthorized");
    return;
 }
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});
