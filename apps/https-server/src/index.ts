import express  from "express";
import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
import { authmiddleware } from "./authmiddleware.js";

const app = express();
const PORT = 443;

app.get("/", (req, res) => {
  res.send("Hello, HTTPS World!");
});

app.post("/signup", (req, res) => {
//db logic here

  res.json({ status: "OK" });
});
app.post("/signin", (req, res) => {
//db logic here
const userId =1;
//@ts-ignore
const token = jwt.sign(userId, JWT_SECRET, { expiresIn: "1h" });
  res.json(token);
});
app.post("/connectRoom", authmiddleware,(req, res) => {
  res.json({ roomId: 1234 });
});
app.listen(PORT, () => {
  console.log(`HTTPS server is running at https://localhost:${PORT}`);
});