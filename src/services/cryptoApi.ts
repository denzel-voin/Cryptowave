import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Data, Coin, HistoryData} from "../../types/types.ts";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "3898d1509cmsh5691a26141948cep1c5250jsnc005710d8a3b",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Data, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
      keepUnusedDataFor: 14400,
    }),

    getCryptoDetails: builder.query<Coin, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      keepUnusedDataFor: 14400,
    }),

    getCryptoHistory: builder.query<HistoryData, { coinId: string; timeperiod: string }>({
      query: ({ coinId, timeperiod }) =>
          createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
      keepUnusedDataFor: 14400,
    }),

  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
