import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "1f913a9a593d4f78bff39d15577841cc";
const baseUrl = "https://api.worldnewsapi.com";

interface INewsItem {
  title: string;
  summary?: string;
  url: string;
  image?: string;
  author?: string;
  publish_date: string;
}

interface RootNews {
  news: INewsItem[];
}
// @ts-ignore
export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<RootNews, { text: string; language: string; limit: number }>({
      query: ({ text, language, limit }) =>
          `/search-news?text=${text}&language=${language}&number=${limit}`,
      keepUnusedDataFor: 14400,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
