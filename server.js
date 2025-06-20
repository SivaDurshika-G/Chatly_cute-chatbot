const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": Bearer ${process.env.OPENAI_API_KEY}
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(Chatly backend running on port ${port});
});