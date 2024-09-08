import millify from "millify";
import {Col, Row, Statistic, Typography} from "antd";
import {Cryptocurrencies} from "../Cryptocurrencies/Cryptocurrencies";
import {Link} from "react-router-dom";
import {News} from "../News/News";
import {useGetCryptosQuery} from "../../services/cryptoApi";


const { Title } = Typography;

function Loader() {
    return null;
}

export const HomePage = () => {
    // const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return 'Loading...';

    return (
        <>
            <Title level={2} className="heading">Мировая статистика по криптовалютам</Title>
            <Row gutter={[32, 32]}>
                <Col span={12}><Statistic title="Общее число криптовалют" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Общее число бирж" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Общая рыночная капитализация:" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Общий объем за 24 часа" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Общее число рынков" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Топ 10 криптовалют</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Ещё</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Последние новости криптовалют</Title>
                <Title level={3}><Link to="/news">Ещё</Link></Title>
            </div>
            <News simplified />
        </>
    );
};
