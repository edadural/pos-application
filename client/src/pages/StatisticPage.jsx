import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import StatisticCard from '../components/statistics/StatisticCard'
import { Area, Pie } from '@ant-design/plots';

const StatisticPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const data2 = [
        {
          type: '分类一',
          value: 27,
        },
        {
          type: '分类二',
          value: 25,
        },
        {
          type: '分类三',
          value: 18,
        },
        {
          type: '分类四',
          value: 15,
        },
        {
          type: '分类五',
          value: 10,
        },
        {
          type: '其他',
          value: 5,
        },
      ];
    const config = {
        data,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
    };

    const config2 = {
        appendPadding: 10,
        data: data2,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'AntV\nG2Plot',
            },
        },
    };
    return (
        <>
            <Header />
            <div className="px-5">
                <h1 className="text-3xl font-bold text-center mb-3">İstatistiklerim</h1>
                <div>
                    <h2 className='text-lg'>Hoş geldin <span className='text-green-700 font-bold'>admin</span>.</h2>
                    <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-2 md:gap-6 gap-3">
                        <StatisticCard
                            title={"Toplam Müşteri"}
                            amount={"6"}
                            img="images/user.png"
                        />
                        <StatisticCard
                            title={"Toplam Kazanç"}
                            amount={"660.96₺"}
                            img="images/money.png"
                        />
                        <StatisticCard
                            title={"Toplam Satış"}
                            amount={"6"}
                            img="images/sale.png"
                        />
                        <StatisticCard
                            title={"Toplam Ürün"}
                            amount={"28"}
                            img="images/product.png"
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <Area {...config} />
                        </div>
                        <div>
                            <Pie {...config2} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticPage
