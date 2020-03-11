const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = require('./config/keys').mongodbURI;
mongoose.connect(db,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("mongoDb connected...")
  })
  .catch((err) => {
    console.log(err);
  })
//设置路由
app.get("/", (req, res) => {
  res.send("hello")
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})

