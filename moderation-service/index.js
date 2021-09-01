const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data:{
        id:data.id,
        postId:data.postId,
        status,
        content:data.content
      }
    });
  }

  res.send({});
});

APP_PORT = process.env.PORT || 4003;
app.listen(APP_PORT, () => {
  console.log(`Listening to port ${APP_PORT}`);
});
