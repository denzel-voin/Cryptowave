import millify from "millify";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useEffect, useState } from "react";
import {Card, Col, Input, Row, Spin} from "antd";
import { Link } from "react-router-dom";
import {Coin, Root} from "../../../types/types.ts";

export const Cryptocurrencies = ({ simplified }: { simplified: boolean }) => {
  const count = simplified ? 10 : 100;
  const [dataAlreadyFetched, setDataAlreadyFetched] = useState(false);
  // @ts-ignore
  const { data: cryptosList, isFetching } = useGetCryptosQuery<Root>(count, { skip: dataAlreadyFetched });
  const [cryptos, setCryptos] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      setDataAlreadyFetched(true);
      const filteredData: Coin[] = cryptosList.data.coins.filter((item) =>
          item.name.toLowerCase().includes(searchTerm)
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return <Spin size="large" />;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Поиск криптовалюты"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Цена: {millify(Number(currency.price)) + "$"}</p>
                <p>
                  Рыночная капитализация: {millify(Number(currency.marketCap)) + "$"}
                </p>
                <p
                  style={
                    Number(currency.change) > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  Изменение за день: {currency.change}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
