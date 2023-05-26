import express from "express";
import dotenv from "dotenv";
import { getNewsContent, getNewsFeeds } from "./service/fetchNewsFeeds";
import { NewsFetchResult } from "./utils/types";

dotenv.config();

//node.jsのフレームワーク
const app = express();

//envファイルにアクセスしてポートを取得
const port = process.env.PORT || 5001;

//アクセスを許可するオリジンを設定
const corsOptions = {
  origin: process.env.ALLOW_CORS,
};

//ミドルウェアといってフロントとバックの間にある。バックにアクセスさせていいかの判断等を行う。例えばログインしていればOKとか。
//今回のこれは自分が認証したサーバーからしかアクセスを許さないコード
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", corsOptions.origin);
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

//./news-feeds任意の名前
app.get("/news-feeds", async (req, res) => {
  //   console.log({ req, res });
  console.log({ q: req.query });
  //query paratermeterを受け取る設定
  const q = req.query.q as string;
  const from = req.query.from as string;
  const sortBy = req.query.sortBy as string;
  const language = req.query.language as string;

  const newsFeeds: NewsFetchResult = await getNewsFeeds({
    q,
    from,
    sortBy,
    language,
  });

  if (newsFeeds.status !== "ok") {
    res.status(500).send("Internal server error");
    throw new Error("Internal server error");
  }
  //   console.log(newsFeeds);
  res.send(newsFeeds);
});

app.get("/news-feeds/content", async (req, res) => {
  const urlForContent = req.query.contentUrl as string;

  if (urlForContent) {
    const news = await getNewsContent(urlForContent);
    const response = {
      status: "ok",
      newsContent: news,
    };
    res.send(response);
    return;
  }

  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
