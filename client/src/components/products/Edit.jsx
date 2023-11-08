import { Button, Form, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = ({
    categories,
    setCategories,
}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products/get-all");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);


    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla güncellendi.");
            setCategories(categories.map((item) => {
                return item;
            }));
        } catch (error) {
            console.log(error);
            message.error("Bir şeyler yanlış gitti.");
        }
    }

    const deleteCategory = (id) => {
        if (window.confirm("Emin misiniz?")) {
            try {
                fetch("http://localhost:5000/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                });
                message.success("Kategori başarıyla silindi.");
                setCategories(categories.filter((item) => item._id !== id));            // filter - istenen sonuçları döndürür, gönderdiğim id  dönen id eşit değilse categry e onun dışındakileri gönder
            } catch (error) {
                console.log(error);
                message.error("Bir şeyler yanlış gitti.");
            }
        }
    };

    const colums = [
        {
            title: "Ürün Adı",
            dataIndex: "title",
            width: "8%",
            render: (_, record) => {        // record: her dönen id
                return <p>{record.title}</p>
            }
        },
        {
            title: "Ürün Görseli",
            dataIndex: "img",
            width: "4%",
            render: (_, record) => {        // record: her dönen id
                return <img src={record.img} alt='' className='w-full h-20 object-cover' />
            }
        },
        {
            title: "Ürün Fiyatı",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Kategori",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return (
                    <div>
                        <Button
                            type='link'
                            className='pl-0'>
                            Düzenle
                        </Button>
                        <Button
                            type='link'
                            htmlType='submit' className='text-gray-500'
                        >
                            Kaydet
                        </Button>
                        <Button
                            type='link'
                            onClick={() => deleteCategory(record._id)}
                            danger
                        >
                            Sil
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <Form onFinish={onFinish}>
            <Table
                bordered
                dataSource={products}
                columns={colums}
                rowKey={"_id"}
                scroll={{
                    x: 1000,
                    y: 360,
                }}
            />
        </Form>
    )
}

export default Edit;
