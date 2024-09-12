import { Card, Col, Row, Typography, Avatar, Spin } from "antd";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import {INews, RootNews} from "../../../types/types.ts";

const { Title, Text } = Typography;

export const News = ({ simplified }: { simplified: boolean }) => {
  // @ts-ignore
  const { data: newsData, isFetching } = useGetCryptoNewsQuery<RootNews>({
    text: "криптовалюта",
    language: "ru",
    limit: simplified ? 6 : 12,
  }) || { data: { news: [] }, isFetching: false };

  if (isFetching) {
    return <Spin size="large" />;
  }

  const newsArray: INews[] = newsData.news || [];

  return (
      <Row gutter={[32, 32]}>
        {newsArray.map((news, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.title}
                    </Title>
                    {news.image && (
                        <img
                            src={news.image}
                            alt={news.title}
                            style={{
                              maxHeight: "200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                        />
                    )}
                  </div>
                  <p>
                    {news.summary
                        ? (news.summary.length > 100 ? `${news.summary.substring(0, 100)}...` : news.summary)
                        : "Нет доступного описания"}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                          src={news.image || "https://via.placeholder.com/150"}
                          alt={news.author}
                      />
                      <Text className="provider-name">{news.author}</Text>
                    </div>
                    <Text>{new Date(news.publish_date).toLocaleDateString()}</Text>
                  </div>
                </a>
              </Card>
            </Col>
        ))}
      </Row>
  );
};
