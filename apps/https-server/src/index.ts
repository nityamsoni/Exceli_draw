import express  from "express";

const app = express();
const PORT = 443;

app.get("/", (req, res) => {
  res.send("Hello, HTTPS World!");
});
app.listen(PORT, () => {
  console.log(`HTTPS server is running at https://localhost:${PORT}`);
});