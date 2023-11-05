import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';
import "./style.css";

const Categories = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            fetch("http://localhost:5000/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success("Kategori başarıyla eklendi.");
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ul className="flex gap-4 md:flex-col text-lg">
            <li className="bg-green-900 px-6 md:py-3 py-6 text-white cursor-pointer hover:bg-pink-700 transition-all text-center min-w-[145px]">
                <span>Tümü</span>
            </li>
            <li className="category-item">
                <span>Yiyecek</span>
            </li>
            <li className="category-item">
                <span>İçecek</span>
            </li>
            <li className="category-item">
                <span>Yiyecek</span>
            </li>
            <li className="category-item">
                <span>İçecek</span>
            </li>
            <li className="category-item">
                <span>İçecek</span>
            </li>
            <li className="category-item">
                <span>Yiyecek</span>
            </li>
            <li
                className="category-item !bg-slate-500 hover:opacity-90"
                onClick={() => setIsAddModalOpen(true)}>
                <PlusOutlined className='md:text-2xl' />
            </li>

            <Modal
                title="Yeni kategori Ekle"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        name="title"
                        label="Kategori Ekle"
                        rules={[{
                            required: true,
                            message: "Kategori Alanı Boş geçilemez!"
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className='flex justify-end mb-0'>
                        <Button type='primary' htmlType='submit'>Oluştur</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </ul>
    )
}

export default Categories
