// const initialize = require("./youtube");
require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
// const axios = require("axios");

const cors = require("cors");
const yt = require("./youtube");

const app = express();
app.use(formidable());
app.use(cors());

//----------------------------------------------------------------------------------------------------
//                                            XXXXXX
//----------------------------------------------------------------------------------------------------
app.post("/next-video", async (req, res) => {
  try {
    const {
      setUpBigLoop,
      setUpSmallLoop,
      automationYoutubeUrl,
      username,
      password,
      secondAdded,
    } = req.fields;
    res
      .status(200)
      .send(
        await yt(
          automationYoutubeUrl,
          username,
          password,
          setUpBigLoop,
          setUpSmallLoop,
          secondAdded
        )
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//ALL ROUTE & SERVER PORT\\\\\\\\_________________________\\\\\\\\\
app.all("*", (req, res) => {
  res.status(404).json({ error: "None existing route" });
});

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Server Launched");
});
//----------------------------------------------------------------------------------------------------
//                                            XXXXXX
//----------------------------------------------------------------------------------------------------
