import { Card, Col, Row, Typography, Avatar } from "antd";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi"; // предположим, что API настроено

const { Title, Text } = Typography;

export const News = ({ simplified }) => {
    const { data: newsData, isFetching, error } = useGetCryptoNewsQuery({
        text: 'криптовалюта', // В зависимости от задачи
        language: 'ru',         // Устанавливаем язык на русский
        limit: simplified ? 6 : 12, // Если включен режим "упрощенный", показываем меньше новостей
    });

    if (isFetching) return 'Loading...'; // Показать статус загрузки
    if (error) return 'Error loading news'; // Обработка ошибки

    // Убеждаемся, что данные получены
    const newsArray = newsData?.news || [];

    return (
        <Row gutter={[32, 32]}>
            {newsArray.map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.title}</Title>
                                {news.image && <img src={news.image} alt={news.title} style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }} />}
                            </div>
                            <p>{news.summary?.length > 100 ? `${news.summary.substring(0, 100)}...` : news.summary}</p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.image || 'https://via.placeholder.com/150'} alt={news.author} />
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
