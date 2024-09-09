import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart as ChartJS, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const { Title } = Typography;

export const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = coinHistory?.data?.history?.length - 1; i > 0; i -= 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).getHours().toString() + ':' +
            new Date(coinHistory?.data?.history[i].timestamp * 1000).getMinutes().toString()
        );
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} График цены </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Изменения за сутки: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Текущая цена {coinName}: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};
