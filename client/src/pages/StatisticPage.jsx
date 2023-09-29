import React from 'react'
import Header from '../components/header/Header'

const StatisticPage = () => {
    return (
        <>
            <Header />
            <div className="px-6">
                <h1 className="text-3xl font-bold text-center mb-3">İstatistiklerim</h1>
                <div>
                    <h2 className='text-lg'>Hoş geldin <span className='text-green-700 font-bold'>admin</span>.</h2>
                    <div className="statistic-cards grid grid-cols-4 my-5">
                        <div className="card-item bg-gray-800 p-8 rounded-lg">
                            <div className='flex gap-x-4'>
                                <div className='rounded-full bg-white w-16 h-16 p-3'>
                                    <img src='images/user.png' alt='' />
                                </div>
                                <div className='text-white'>
                                    <p className='mb-2 text-lg font-medium text-gray-400'>Toplam Müşteri</p>
                                    <p className='text-xl font-bold text-gray-200'>6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticPage
