import millify from "millify";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useEffect, useState } from "react";
import { Card, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";

export const Cryptocurrencies = ({ simplified }: {simplified: boolean}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm),
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

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
                <p>Цена: {millify(currency.price) + "$"}</p>
                <p>
                  Рыночная капитализация: {millify(currency.marketCap) + "$"}
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
