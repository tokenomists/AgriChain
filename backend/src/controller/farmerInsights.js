import fetch from "node-fetch";

const PORT = process.env.PORT || 5000;

const farmerInsights = async (req, res) => {
  try {
    const newsResponse = await fetch(`http://localhost:${PORT}/api/data/farmerNews`);
    const newsData = await newsResponse.json();

    if (!newsData || !newsData.success || !Array.isArray(newsData.news)) {
      return res.status(500).json({ success: false, message: "Failed to fetch news" });
    }

    const newsTitles = newsData.news;
    const prompt = `Here are the latest farming news headlines in India:\n
      ${newsTitles.map((title, index) => `${index + 1}. ${title}`).join("\n")}

      Write a clear, formal, concise **daily farming news update** for Indian farmers in a paragraph (3-4 lines). Start with Namaste and use an easy-to-understand tone.`;

    const geminiResponse = await fetch(`http://localhost:${PORT}/api/data/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: prompt }),
    });

    const rawText = await geminiResponse.text();

    let geminiData;
    try {
      geminiData = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return res.status(500).json({ success: false, message: "Invalid response from Gemini API" });
    }

    if (!geminiData || !geminiData.success || !geminiData.response) {
      return res.status(500).json({ success: false, message: "Failed to generate summary" });
    }

    res.json({ success: true, summary: geminiData.response });
  } catch (error) {
    console.error("Error in farmerInsights:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default farmerInsights;
