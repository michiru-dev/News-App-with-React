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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewsFeeds = void 0;
//requireでモジュールをjsで使えるようにする
//ここら辺は公式ドキュメント読む
const NewsAPI = require("newsapi");
const getNewsFeeds = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsapi = new NewsAPI(process.env.NEWS_APIKEY);
        return newsapi.v2.topHeadlines({
            category: category,
            language: "jp",
            country: "jp",
        });
    }
    catch (error) {
        throw new Error("Error with fetch news feed");
    }
});
exports.getNewsFeeds = getNewsFeeds;
