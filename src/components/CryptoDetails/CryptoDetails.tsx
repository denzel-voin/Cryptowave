import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined} from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import { LineChart } from "../LineChart/LineChart";
import {DetailCoin, DetailRoot, HistoryData, Link} from "../../../types/types";
import {useEffect, useState} from "react";

const { Title, Text } = Typography;

export const CryptoDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const timeperiod = '24h';
  const [dataAlreadyFetched, setDataAlreadyFetched] = useState(false);
  // @ts-ignore
  const { data: cryptoDetailsData, isFetching } = useGetCryptoDetailsQuery<DetailRoot>(coinId!, { skip: dataAlreadyFetched });
  // @ts-ignore
  const { data: coinHistoryData, isFetching: isFetchingHistory } = useGetCryptoHistoryQuery<HistoryData>({ coinId, timeperiod }, { skip: dataAlreadyFetched });

  useEffect(() => {
    if (cryptoDetailsData && !isFetching && coinHistoryData && !isFetchingHistory) {
      setDataAlreadyFetched(true);
    }
  }, [cryptoDetailsData, isFetching, coinHistoryData, isFetchingHistory]);

  if (isFetching || isFetchingHistory) {
    return <Spin size="large" />;
  }

  if (!cryptoDetailsData || !coinHistoryData) {
    return <div>Данные не найдены</div>;
  }

  const cryptoDetails: DetailCoin = cryptoDetailsData.data.coin;

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(Number(cryptoDetails.price))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(Number(cryptoDetails.marketCap))}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails.allTimeHigh?.price && millify(Number(cryptoDetails.allTimeHigh.price))}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.supply?.total && millify(Number(cryptoDetails.supply.total))}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply?.circulating && millify(Number(cryptoDetails.supply.circulating))}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>Стоимость {cryptoDetails.name} в долларах США. Обзорная статистика.</p>
        </Col>
        <LineChart
            coinHistory={coinHistoryData}
            currentPrice={Math.round(Number(cryptoDetails.price))}
            coinName={cryptoDetails.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">Значения {cryptoDetails.name}</Title>
              <p>Обзор, показывающий статистику {cryptoDetails.name}, такую как базовая и котируемая валюта, рейтинг и объем торгов.</p>
            </Col>
            {stats.map(({ icon, title, value }, index) => (
                <Col className="coin-stats" key={index}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">Остальная статистика</Title>
              <p>Обзор, показывающий статистику {cryptoDetails.name}, включая базовую и котируемую валюту, рейтинг и объем торгов.</p>
            </Col>
            {genericStats.map(({ icon, title, value }, index) => (
                <Col className="coin-stats" key={index}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">Что такое {cryptoDetails.name}?</Title>
            {cryptoDetails.description && HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Ссылки</Title>
            {cryptoDetails.links?.map((link: Link) => (
                <Row className="coin-link" key={link.name}>
                  <Title level={5} className="link-name">{link.type}</Title>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                </Row>
            ))}
          </Col>
        </Col>
      </Col>
  );
};
