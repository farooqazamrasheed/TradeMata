import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const LANGUAGE_MODEL_API_KEY = "AIzaSyBS_bDrruqlZkiYEDe_A_koaHUbLwxCsNM";
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

apiRoute.get( async (req, res) => {
  const data = req.query;
  console.log(data)
 let text =data.text;
console.log(text)
  if (
    text.includes("trading") ||
    text.includes("electricity") ||
    text.includes("Trade guidance portal") ||
    text.includes("Guidelines") ||
    text.includes("Practical trading") ||
    text.includes("Courses") ||
    text.includes("Assignments") ||
    text.includes("Lectures") ||
    text.includes("Social community") ||
    text.includes("Trading strategies") ||
    text.includes("Market analysis") ||
    text.includes("Technical analysis") ||
    text.includes("Fundamental analysis") ||
    text.includes("Trading signals") ||
    text.includes("Trading tools") ||
    text.includes("Trading platforms") ||
    text.includes("Market trends") ||
    text.includes("Broker") ||
    text.includes("Brokers") ||
    text.includes("Exchange ") ||
    text.includes("Crypto exchange") ||
    text.includes("Crypto coins") ||
    text.includes("Tokens") ||
    text.includes("Currency") ||
    text.includes("hello") ||
    text.includes("hi")
  ) {
    console.log("inter")
    const payload = {
      prompt: { messages: [{ content: text }] },
      temperature: 0.1,
      candidate_count: 1,
    };

    try {
      const response = await fetch(process.env.LANGUAGE_MODEL_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        method: "POST",
      });

      const data = await response.json();
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.json({
      message: "I can only answer questions related trading and finance.",
    });
  }
});

export default connectDb(apiRoute);
