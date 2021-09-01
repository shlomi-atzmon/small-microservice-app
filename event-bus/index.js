const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // Push to store the events occur on the app
  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

const APP_PORT = process.env.APP_PORT || 4005;
app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
