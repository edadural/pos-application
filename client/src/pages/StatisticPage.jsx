import React from 'react'
import Header from '../components/header/Header'
import StatisticCard from '../components/statistics/StatisticCard'

const StatisticPage = () => {
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
                </div>
            </div>
        </>
    )
}

export default StatisticPage
