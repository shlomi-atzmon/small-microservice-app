const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const posts = {};

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const data = { id, title };
  posts[id] = data;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data,
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

const APP_PORT = process.env.PORT || 4000;
app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
