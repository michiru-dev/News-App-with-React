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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
var corsOptions = {
    origin: process.env.ALLOW_CORS,
};
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/news-feeds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query.q;
    const from = req.query.from;
    const sortBy = req.query.sortBy;
    const language = req.query.language;
    const newsFeeds = yield (0, fetchNewsFeeds_1.getNewsFeeds)({
        q,
        from,
        sortBy,
        language,
    });
    if (newsFeeds.status !== 'ok') {
        res.status(500).send("Internal server error");
        throw new Error("Internal server error");
    }
    res.send(newsFeeds);
}));
app.get('/news-feeds/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urlForContent = req.query.contentUrl;
    if (urlForContent) {
        const news = yield (0, fetchNewsFeeds_1.getNewsContent)(urlForContent);
        const response = {
            status: 'ok',
            newsContent: news
        };
        res.send(response);
        return;
    }
    res.status(404).send();
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
