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
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<CryptosResponse, void>({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
    }),
});

export const { useGetCryptosQuery } = cryptoApi;
