import { Button } from 'antd';
import React from 'react';
import { ClearOutlined } from '@ant-design/icons';

const CartTotals = () => {
    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>Sepetteki Ürünler</h2>
            <div className="cart-items">
                <div className="cart-item">cart item</div>
            </div>
            <div className="cart-totals mt-auto">
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b>Ara toplam</b>
                        <span>99₺</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>KDV %8</b>
                        <span className='text-red-700'>+7.92₺</span>
                    </div>
                </div>
                <div className='border-b mt-4'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500'>Genel toplam</b>
                        <span className='text-xl'>99₺</span>
                    </div>
                </div>
                <div className='py-4 px-2'>
                    <Button type='primary' size='large' className='w-full'>Sipariş Oluştur</Button>
                    <Button type='primary' size='large' className='w-full mt-2' icon={<ClearOutlined />} danger>Temizle</Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals
