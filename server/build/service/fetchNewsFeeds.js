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
exports.getNewsContent = exports.getNewsFeeds = void 0;
const axios_1 = __importDefault(require("axios"));
//requireでモジュールをjsで使えるようにする
//ここら辺は公式ドキュメント読む
const NewsAPI = require("newsapi");
const getNewsFeeds = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsapi = new NewsAPI(process.env.NEWS_APIKEY);
        console.log(newsapi.v2.topHeadlines({
            category: category,
            language: "jp",
            country: "jp",
        }));
        return newsapi.v2.topHeadlines({
            category: "business",
        });
    }
    catch (error) {
        throw new Error("Error with fetch news feed");
    }
});
exports.getNewsFeeds = getNewsFeeds;
const getNewsContent = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return axios_1.default.get(url).then((r) => {
            //   const dom = new JSDOM(r.data, { url });
            //   const article = new Readability(dom.window.document).parse();
            return r;
        });
    }
    catch (error) {
        throw new Error("Error with fetch news content");
    }
});
exports.getNewsContent = getNewsContent;
// const getNewsFeeds = async (
//     queryObj: NewsSearchQueryObj
//   ): Promise<NewsFetchResult> => {
//     try {
//       const newsapi = new NewsAPI(process.env.NEWS_APIKEY);
//       return newsapi.v2.everything({
//         ...queryObj,
//         sources: "bbc-news,the-verge",
//         domains: "bbc.co.uk, techcrunch.com",
//       });
//     } catch (error) {
//       throw new Error("Error with fetch news feed");
//     }
//   };
//   const getNewsContent = async (url) => {
//     try {
//       return axios.get(url).then((r) => {
//         const dom = new JSDOM(r.data, { url });
//         const article = new Readability(dom.window.document).parse();
//         return article;
//       });
//     } catch (error) {
//       throw new Error("Error with fetch news content");
//     }
//   };
//   export { getNewsFeeds, getNewsContent };
