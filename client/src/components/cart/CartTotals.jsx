import { Button } from 'antd';
import React from 'react';
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteCart, increase, decrease } from '../../redux/cartSlice';

const CartTotals = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>Sepetteki Ürünler</h2>
            <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 py-2 md:overflow-y-auto">
                {cart.cartItems.length > 0
                    ? cart.cartItems.map((item) => (  // cI içinde kaç eleman varsa her birini dön, her döndüğünde bir item gönder 
                        <li className="cart-item flex justify-between" key={item._id}>
                            <div className='flex items-center'>
                                <img
                                    src={item.img}
                                    alt=''
                                    className='w-14 h-14 object-cover cursor-pointer'
                                    onClick={() => dispatch(deleteCart(item))}
                                />
                                <div className='flex flex-col ml-2'>
                                    <b>{item.title}</b>
                                    <span>{item.price}₺ x {item.quantity}</span>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Button
                                    type='primary'
                                    size='small'
                                    className='w-full !rounded-full'
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => dispatch(increase(item))}
                                />
                                <span className='font-bold w-6 inline-block text-center'>{item.quantity}</span>
                                <Button
                                    type='primary'
                                    size='small'
                                    className='w-full !rounded-full'
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => {
                                        if (item.quantity === 1) {
                                            if (window.confirm("Ürün silinsin mi?")) {
                                                dispatch(decrease(item));
                                            }
                                        }
                                        if (item.quantity > 1) {
                                            dispatch(decrease(item));
                                        }
                                    }}
                                />
                            </div>
                        </li>
                    )) : "Sepette hiç ürün yok..."}
            </ul>
            <div className="cart-totals mt-auto">
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b>Ara toplam</b>
                        <span>
                            {cart.total > 0
                                ? cart.total.toFixed(2)
                                : 0}        {/* virgülden sonra 2 basamak */}
                            ₺
                        </span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>KDV %{cart.tax}</b>
                        <span className='text-red-700'>
                            {(cart.total * cart.tax) / 100 > 0
                                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                : 0}
                            ₺
                        </span>
                    </div>
                </div>
                <div className='border-b mt-1'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500'>
                            Genel toplam
                        </b>
                        <span className='text-xl'>
                            {cart.total + (cart.total * cart.tax) / 100 > 0
                                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                : 0}
                            ₺
                        </span>
                    </div>
                </div>
                <div className='py-2 px-2'>
                    <Button type='primary' size='large' className='w-full'>
                        Sipariş Oluştur
                    </Button>
                    <Button type='primary' size='large' className='w-full mt-2' icon={<ClearOutlined />} danger>
                        Temizle
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals
