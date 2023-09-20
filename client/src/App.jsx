import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories flex-1 overflow-auto max-h-[calc(100vh-_-85px)] pb-60">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <div className="">products</div>
        </div>
        <div className="">
          <div className="">cart totals</div>
        </div>
      </div>
    </>
  );
}

export default App;
