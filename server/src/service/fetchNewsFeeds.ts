import axios from 'axios';
import { JSDOM } from 'jsdom'; // parsing article HTML
import { Readability } from '@mozilla/readability'; // parsing article HTML
import { NewsFetchResult, NewsSearchQueryObj } from '../utils/types';
const NewsAPI = require('newsapi');

const getNewsFeeds = async (queryObj: NewsSearchQueryObj): Promise<NewsFetchResult> => {
    try {
        const newsapi = new NewsAPI(process.env.NEWS_APIKEY);

        return newsapi.v2.everything({
            ...queryObj,
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
        });

    } catch (error) {
        throw new Error("Error with fetch news feed");
    }

};

const getNewsContent = async (url: string) => {
    try {
        return axios.get(url)
            .then(r => {
                const dom = new JSDOM(r.data, { url });
                const article = new Readability(dom.window.document).parse();
                return article;
            });
    } catch (error) {
        throw new Error("Error with fetch news content");
    }

};

export {
    getNewsFeeds,
    getNewsContent,
};