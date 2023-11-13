import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux"

const ProductItem = ({ item }) => {
    // const cart = useSelector((state) => state.cart);  // sürekli props yazmama gerek yok, kullancağm yere ekleyebilirim

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct(item));
    };

    return (
        <div
            className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
            onClick={handleClick}
        >
            <div className="product-img">
                <img
                    src={item.img}
                    alt=""
                    className="h-28 object-cover w-full border-b"
                />
            </div>
            <div className="product-info flex flex-col p-2">
                <span className="font-bold">{item.title}</span>
                <span>{item.price}₺</span>
            </div>
        </div>
    )
}

export default ProductItem;
