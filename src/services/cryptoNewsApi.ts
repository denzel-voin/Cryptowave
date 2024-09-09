import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Ваш API-ключ
const apiKey = '1f913a9a593d4f78bff39d15577841cc';

// Базовый URL для запросов
const baseUrl = 'https://api.worldnewsapi.com';

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('x-api-key', apiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ text, language, limit }) =>
                `/search-news?text=${text}&language=${language}&number=${limit}`,
            keepUnusedDataFor: 14400, // хранить данные в течение 4 часов
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
