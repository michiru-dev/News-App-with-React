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
const jsdom_1 = require("jsdom"); // parsing article HTML
const readability_1 = require("@mozilla/readability"); // parsing article HTML
const NewsAPI = require('newsapi');
const getNewsFeeds = (queryObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsapi = new NewsAPI(process.env.NEWS_APIKEY);
        return newsapi.v2.everything(Object.assign(Object.assign({}, queryObj), { sources: 'bbc-news,the-verge', domains: 'bbc.co.uk, techcrunch.com' }));
    }
    catch (error) {
        throw new Error("Error with fetch news feed");
    }
});
exports.getNewsFeeds = getNewsFeeds;
const getNewsContent = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return axios_1.default.get(url)
            .then(r => {
            const dom = new jsdom_1.JSDOM(r.data, { url });
            const article = new readability_1.Readability(dom.window.document).parse();
            return article;
        });
    }
    catch (error) {
        throw new Error("Error with fetch news content");
    }
});
exports.getNewsContent = getNewsContent;
