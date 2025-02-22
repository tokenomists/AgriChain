import Parser from "rss-parser";

const parser = new Parser();

const googleNewsRSS = "https://news.google.com/rss/search?q=farming+OR+agriculture+OR+crops+OR+farmers+OR+harvest&hl=en-IN&gl=IN&ceid=IN:en";

const fetchNews = async (req, res) => {
  try {
    const feed = await parser.parseURL(googleNewsRSS);
    const newsTitles = feed.items.slice(0, 5).map((article) => article.title);
    
    res.json({ success: true, news: newsTitles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
};

export default fetchNews;
