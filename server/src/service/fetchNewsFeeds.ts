//requireでモジュールをjsで使えるようにする
//ここら辺は公式ドキュメント読む
const NewsAPI = require("newsapi");

const getNewsFeeds = async (category: string) => {
  try {
    const newsapi = new NewsAPI(process.env.NEWS_APIKEY);
    return newsapi.v2.topHeadlines({
      category: category,
      language: "jp",
      country: "jp",
    });
  } catch (error) {
    throw new Error("Error with fetch news feed");
  }
};

export { getNewsFeeds };
