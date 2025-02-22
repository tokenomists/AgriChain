import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiProcessor = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(text);
    const responseText = result.response.text() || "No response generated";
    res.json({ success: true, response: responseText });

  } catch (error) {
    console.error("Error processing with Gemini:", error);
    res.status(500).json({ success: false, message: "Failed to process text" });
  }
};

export default geminiProcessor;
