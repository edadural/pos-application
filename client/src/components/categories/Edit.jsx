import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

const Edit = ({ categories, setCategories, isEditModalOpen, setIsEditModalOpen }) => {
    const [editingRow, setEditingRow] = useState({});

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla güncellendi.");
            setCategories(categories.map((item) => {
                if (item._id === editingRow._id) {
                    return { ...item, title: values.title };
                }
                return item;
            }));
        } catch (error) {
            console.log(error);
            message.success("Bir şeyler yanlış gitti.");
        }
    }

    const colums = [
        {
            title: "Category Title",
            dataIndex: "title",
            render: (_, record) => {        // record: her dönen id
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name={"title"}>
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    );
                } else {
                    return <p>{record.title}</p>
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div>
                        <Button type='link' onClick={() => setEditingRow(record)} className='pl-0'>
                            Düzenle
                        </Button>
                        <Button type='link' htmlType='submit' className='text-gray-500'>
                            Kaydet
                        </Button>
                        <Button type='link' danger>
                            Sil
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <Modal
            open={isEditModalOpen}
            title="Kategori İşlemleri"
            footer={false}
            onCancel={() => setIsEditModalOpen(false)}
        >
            <Form onFinish={onFinish}>
                <Table bordered dataSource={categories} columns={colums} rowKey={"_id"} />
            </Form>
        </Modal>
    )
}

export default Edit
