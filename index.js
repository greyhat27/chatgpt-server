import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());

app.use(bodyParser.json());

const configuration = new Configuration({
  organization: "org-rcMopDvySnWx1syIoRyLL9y0",
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.listen("5000", () => console.log("listening on port 3080"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (err) {
    console.log("Error occurred", err);
    res.send(err).status(400);
  }
});
