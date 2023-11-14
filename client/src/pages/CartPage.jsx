import { increase, decrease, deleteCart } from "../redux/cartSlice";
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";
import { Button, Card, Popconfirm, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';

const CartPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'img',
            key: 'img',
            width: "120px",
            render: (text) => {
                return (<img src={text} alt="" className="w-full h-20 object-cover" />)
            }
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <span>{text.toFixed(2)}₺</span>
                )
            }
        },
        {
            title: 'Ürün Adeti',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => {
                return (
                    <div className='flex items-center'>
                        <Button
                            type='primary'
                            size='small'
                            className='w-full !rounded-full'
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                                dispatch(increase(record));
                                message.success("Ürün sepete eklendi.")
                            }}
                        />
                        <span className='font-bold w-6 inline-block text-center'>
                            {record.quantity}
                        </span>
                        <Button
                            type='primary'
                            size='small'
                            className='w-full !rounded-full'
                            icon={<MinusCircleOutlined />}
                            onClick={() => {
                                if (record.quantity === 1) {
                                    if (window.confirm("Ürün silinsin mi?")) {
                                        dispatch(decrease(record));
                                        message.success("Ürün sepetten silindi.");
                                    }
                                }
                                if (record.quantity > 1) {
                                    dispatch(decrease(record));
                                    message.success("Ürün sepetten silindi.");
                                }
                            }}
                        />
                    </div>
                )
            }
        },
        {
            title: 'Toplam Fiyat',
            render: (text, record) => {
                return (
                    <span>{(record.quantity * record.price).toFixed(2)}₺</span>
                )
            }
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return (
                    <Popconfirm
                        title="Silmek için emin misiniz"
                        onConfirm={() => {
                            dispatch(deleteCart(record));
                            message.success("Ürün sepetten silindi.");
                        }}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type="link"
                            danger
                        >
                            Sil
                        </Button>
                    </Popconfirm>
                )
            }
        },
    ];

    return (
        <>
            <Header />
            <div className="px-6">
                <Table
                    dataSource={cart.cartItems}
                    columns={columns}
                    bordered
                    pagination={false}
                    scroll={{
                        x: 1200,
                        y: 300,
                    }}
                    rowKey={record => record._id}
                />
                <div className="cart-total flex justify-end mt-4">
                    <Card className="w-72">
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>
                                {cart.total > 0
                                    ? cart.total.toFixed(2)
                                    : 0}
                                ₺
                            </span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span>KDV %{cart.tax}</span>
                            <span className='text-red-500'>
                                {(cart.total * cart.tax) / 100 > 0
                                    ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                    : 0}
                                ₺
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <b>Genel Toplam</b>
                            <span className='text-xl'>
                                {cart.total + (cart.total * cart.tax) / 100 > 0
                                    ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                    : 0}
                                ₺
                            </span>
                        </div>
                        <Button
                            className="mt-4 w-full"
                            type="primary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            disabled={cart.cartItems.length === 0}
                        >
                            Sipariş Oluştur
                        </Button>
                    </Card>
                </div>
            </div>
            <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default CartPage