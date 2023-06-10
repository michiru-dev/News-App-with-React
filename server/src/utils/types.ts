interface FetchResult {
    status: string;
}

interface Source {
    id: number;
    name: string;
}

interface News {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}

interface NewsFetchResult extends FetchResult {
    articles: News[];
    totalResults: number;
}

interface NewsSearchQueryObj {
    q: string;
    from: string;
    sortBy: string;
    language: string;
}

export type {
    Source,
    News,
    NewsFetchResult,
    NewsSearchQueryObj
};