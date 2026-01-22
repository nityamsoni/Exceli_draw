import express  from "express";
import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
import { authmiddleware } from "./authmiddleware.js";
import { CreateUserSchema , CreateRoomSchema , SignInSchema } from "@repo/common/types";
const app = express();
const PORT = 443;

app.get("/", (req, res) => {
  res.send("Hello, HTTPS World!");
});

app.post("/signup", (req, res) => {
//db logic here

  const data=CreateUserSchema.safeParse(req.body);  
  if(!data.success){
    return res.status(400).json({ error: "Invalid data" });
  }

  res.json({ status: "OK" });
});
app.post("/signin", (req, res) => {
//db logic here
const userId =1;

const data=SignInSchema.parse(req.body);  
//@ts-ignore
if(!data.success){
  return res.status(400).json({ error: "Invalid data" });
}
//@ts-ignore
const token = jwt.sign(userId, JWT_SECRET, { expiresIn: "1h" });
  res.json(token);
});
app.post("/connectRoom", authmiddleware,(req, res) => {


  const date=CreateRoomSchema.parse(req.body);  
  //@ts-ignore
  if(!date.success){
    return res.status(400).json({ error: "Invalid data" });
  }
  res.json({ roomId: 1234 });
});
app.listen(PORT, () => {
  console.log(`HTTPS server is running at https://localhost:${PORT}`);
});