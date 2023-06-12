"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchNewsFeeds_1 = require("./service/fetchNewsFeeds");
//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる
dotenv_1.default.config();
//node.jsのフレームワーク
const app = (0, express_1.default)();
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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//./news-feeds任意の名前（フロントのつながりを持たせる）
//ブラウザでurlをいれてエンターキーを押すのはgetに相当する
//第一引数はよぶ側で与えるクエリパラメーターの値
//第二引数のresは自動で入ってくる値
app.get("/news-feeds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   query parameterを受け取る設定
    const category = req.query.category;
    const newsFeeds = yield (0, fetchNewsFeeds_1.getNewsFeeds)(category);
    if (newsFeeds.status !== "ok") {
        res.status(500).send("Internal server error");
        throw new Error("Internal server error");
    }
    //このres.sendで送った内容が呼び出し元（フロント）にレスポンス（成果物）として渡る
    res.send(newsFeeds);
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
