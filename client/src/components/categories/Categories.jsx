import { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Add from './Add';
import Edit from './Edit';
import "./style.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("Tümü");

    useEffect(() => {
        if (categoryTitle === "Tümü") {
            setFiltered(products);
        } else {
            setFiltered(products.filter((item) => item.category === categoryTitle));
        }
    }, [products, setFiltered, categoryTitle]);


    return (
        <ul className="flex gap-4 md:flex-col text-lg">
            {categories.map((item) => (
                <li
                    className={`category-item ${item.title === categoryTitle && "!bg-pink-700"
                        }`}
                    key={item._id}
                    onClick={() => setCategoryTitle(item.title)}
                >
                    <span>{item.title}</span>
                </li>
            ))}
            <li
                className="category-item !bg-slate-500 hover:opacity-90"
                onClick={() => setIsAddModalOpen(true)}>
                <PlusOutlined className='md:text-2xl' />
            </li>
            <li
                className="category-item !bg-slate-700 hover:opacity-90"
                onClick={() => setIsEditModalOpen(true)}>
                <EditOutlined className='md:text-2xl' />
            </li>

            <Add
                categories={categories}
                setCategories={setCategories}
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
            />
            <Edit
                categories={categories}
                setCategories={setCategories}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
            />
        </ul>
    )
}

export default Categories
