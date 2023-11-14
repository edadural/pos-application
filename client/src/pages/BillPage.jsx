import { Button, Table } from "antd";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import PrintBill from "../components/bills/PrintBill";

const BillPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billItems, setBillItems] = useState(false);

    useEffect(() => {
        const getBills = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/bills/get-all");
                const data = await res.json();
                setBillItems(data);
            } catch (error) {
                console.log(error);
            }
        };
        getBills();
    }, []);

    const columns = [
        {
            title: 'Müşteri Adı',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Telefon Numarası',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
                return <span>{text.substring(0, 10)}</span>
            }
        },
        {
            title: 'Ödeme Yöntemi',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
        },
        {
            title: 'Toplam Fiyat',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => {
                return <span>{text}₺</span>
            }
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (text) => {
                return <Button type="link" className="pl-0" onClick={()=>setIsModalOpen(true)}>Yazdır</Button>
            }
        },
    ];

    return (
        <>
            <Header />
            <div className="px-6">
                <h1 className="text-3xl font-bold text-center mb-3">Faturalar</h1>
                <Table
                    dataSource={billItems}
                    columns={columns}
                    bordered
                    pagination={false}
                />
            </div>
            <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default BillPage