export interface Root {
    status: string
    data: Data
}

export interface Data {
    stats: Stats
    coins: Coin[]
}

export interface Stats {
    total: number
    totalCoins: number
    totalMarkets: number
    totalExchanges: number
    totalMarketCap: string
    total24hVolume: string
}

export interface Coin {
    uuid: string
    symbol: string
    name: string
    color: string
    iconUrl: string
    marketCap: string
    price: string
    listedAt: number
    tier: number
    change: string
    rank: number
    sparkline: string[]
    lowVolume: boolean
    coinrankingUrl: string
    "24hVolume": string
    btcPrice: string
    contractAddresses: string[]
}

export interface HistoryData {
    change: string
    history: History[]
}

export interface History {
    price?: string
    timestamp: number
}

export interface DetailRoot {
    status: string
    data: DetailData
}

export interface DetailData {
    coin: DetailCoin
}

export interface DetailCoin {
    volume: number;
    uuid: string
    symbol: string
    name: string
    description: string
    color: string
    iconUrl: string
    websiteUrl: string
    links: Link[]
    supply: Supply
    numberOfMarkets: number
    numberOfExchanges: number
    "24hVolume": string
    marketCap: string
    fullyDilutedMarketCap: string
    price: string
    btcPrice: string
    priceAt: number
    change: string
    rank: number
    sparkline: string[]
    allTimeHigh: AllTimeHigh
    coinrankingUrl: string
    tier: number
    lowVolume: boolean
    listedAt: number
    hasContent: boolean
    notices: any
    contractAddresses: any[]
    tags: string[]
}

export interface Link {
    name: string
    url: string
    type: string
}

export interface Supply {
    confirmed: boolean
    supplyAt: number
    max: string
    total: string
    circulating: string
}

export interface AllTimeHigh {
    price: string
    timestamp: number
}

export interface LineChartProps {
    coinHistory: {
        data: {
            history: { price: number; timestamp: number }[];
            change: number;
        };
    };
    currentPrice: number;
    coinName: string;
}
