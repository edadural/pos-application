import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20">
        <div className="categories overflow-auto max-h-[calc(100vh_-_85px)] md:pb-10">
          <Categories />
        </div>
        <div className="products flex-[8] max-h-[calc(100vh_-_85px)] overflow-auto pb-10">
          <Products />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[30px] border">
          <CartTotals />
        </div>
      </div>F
    </>
  )
}

export default HomePage
