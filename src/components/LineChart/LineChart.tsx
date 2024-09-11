import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart as ChartJS, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import {LineChartProps, RootDataset, RootScales} from "../../../types/types.ts";

ChartJS.register(Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, TimeScale);

const { Title } = Typography;

export const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {
  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  if (coinHistory.data.history) {
    for (const entry of coinHistory.data.history) {
      coinPrice.unshift(Number(entry.price));
      coinTimestamp.unshift(
          new Date(entry.timestamp * 1000).toLocaleTimeString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
          })
      );
    }
  }

  const data: RootDataset = {
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

  const options: RootScales | any = {
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
          <Title level={2} className="chart-title">{coinName} Price Chart</Title>
          <Col className="price-container">
            <Title level={5} className="price-change">Change: {coinHistory?.data?.change || 'N/A'}%</Title>
            <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
          </Col>
        </Row>
        <Line data={data} options={options} />
      </>
  );
};
