import express from "express";
import dotenv from "dotenv";
import { getNewsFeeds } from "./service/fetchNewsFeeds";

//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる
dotenv.config();

//node.jsのフレームワーク
const app = express();

//envファイルにアクセスしてポートを取得
const port = process.env.PORT || 5001;

//アクセスを許可するオリジンを設定
const corsOptions = {
  origin: process.env.ALLOW_CORS,
}; //どこで呼び出してる？

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

//./news-feeds任意の名前（フロントのつながりを持たせる）
//ブラウザでurlをいれてエンターキーを押すのはgetに相当する
//第一引数はよぶ側で与えるクエリパラメーターの値
//第二引数のresは自動で入ってくる値
app.get("/news-feeds", async (req, res) => {
  //   query parameterを受け取る設定
  const category = req.query.category as string;
  const newsFeeds = await getNewsFeeds(category);
  if (newsFeeds.status !== "ok") {
    res.status(500).send("Internal server error");
    throw new Error("Internal server error");
  }
  //このres.sendで送った内容が呼び出し元（フロント）にレスポンス（成果物）として渡る
  res.send(newsFeeds);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
