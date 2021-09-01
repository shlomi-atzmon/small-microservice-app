const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // check to see if we alrady got an array of comments
  const comments = commentsByPostId[req.params.id] || [];
  let data = { id: commentId, content, status: "pending" };
  comments.push(data);
  
  commentsByPostId[req.params.id] = comments;
  
  data.postId = req.params.id;
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data
  });

  res.status(201).send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  const {type , data} = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status , content} = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find(comment => {
        return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data:{
        id,
        status,
        postId,
        content
      }
    });
  }
  
  res.send({});
});

APP_PORT = process.env.PORT || 4001;
app.listen(APP_PORT, () => {
  console.log(`Listening to port ${APP_PORT}`);
});
