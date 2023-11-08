import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({})
    const [form] = Form.useForm();

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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/categories/get-all");
                const data = await res.json();
                data &&
                    setCategories(
                        data.map((item) => {
                            return { ...item, value: item.title };
                        })
                    );
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({ ...values, productId: editingItem._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Ürün başarıyla güncellendi.");
            setProducts(
                products.map((item) => {
                    if (item._id === editingItem._id) {
                        return values;
                    }
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
                            className='pl-0'
                            onClick={() => {
                                setIsEditModalOpen(true);
                                setEditingItem(record);
                            }}
                        >
                            Düzenle
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
        <>
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
            <Modal
                title="Ürün Düzenle"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                footer={false}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    initialValues={editingItem}
                >
                    <Form.Item
                        name="title"
                        label="Ürün Adı"
                        rules={[{
                            required: true,
                            message: "Ürün Adı Alanı Boş geçilemez!"
                        }]}
                    >
                        <Input placeholder='Ürün adı giriniz' />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Ürün Görseli"
                        rules={[{
                            required: true,
                            message: "Ürün Görseli Alanı Boş geçilemez!"
                        }]}
                    >
                        <Input placeholder='Görsel linki girini' />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Ürün Fiyatı"
                        rules={[{
                            required: true,
                            message: "Ürün Fiyatı Alanı Boş geçilemez!"
                        }]}
                    >
                        <Input placeholder='Ürün fiyatı giriniz' />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Kategori"
                        rules={[{
                            required: true,
                            message: "Kategori Alanı Boş geçilemez!"
                        }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.title ?? '').includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.title ?? '')
                                    .toLowerCase()
                                    .localeCompare((optionB?.title ?? '').toLowerCase())
                            }
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item className='flex justify-end mb-0'>
                        <Button type='primary' htmlType='submit'>
                            Güncelle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Edit;
