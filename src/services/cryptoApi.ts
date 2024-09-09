import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Crypto {
    id: string;
    name: string;
    price: string;
}

interface CryptosResponse {
    data: {
        coins: Crypto[];
    };
}

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '3898d1509cmsh5691a26141948cep1c5250jsnc005710d8a3b'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<CryptosResponse, void>({
            query: (count) => createRequest(`/coins?limit=${count}`),
            keepUnusedDataFor: 14400, // хранить данные в течение 4 часов
        }),

        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
            keepUnusedDataFor: 14400, // хранить данные в течение 4 часов
        }),

        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
            keepUnusedDataFor: 14400, // хранить данные в течение 4 часов
        }),

        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
            keepUnusedDataFor: 14400, // хранить данные в течение 4 часов
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;
