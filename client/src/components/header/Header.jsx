import { Badge, Input, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import "./index.css"

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };

  return (
    <div className='border-b mb-6'>
      <header className='py-4 px-6 flex justify-between items-center gap-10'>
        <div className="logo">
          <Link
            to='/'>
            <h2 className='text-2xl font-bold md:text-4xl'>LOGO</h2>
          </Link>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün ara"
            prefix={<SearchOutlined />}
            className='rounded-full max-w-[800px]'
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link
            to={"/"}
            className="menu-link">
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px] pt-1">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} className='md:flex hidden'>
            <Link
              to={"/cart"}
              className='menu-link'>
              <ShoppingCartOutlined className='md:text-2xl text-xl' />
              <span className='md:text-xs text-[10px] pt-1'>Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className='menu-link'>
            <CopyOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px] pt-1'>Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className='menu-link'>
            <UserOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px] pt-1'>Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className='menu-link'>
            <BarChartOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px] pt-1'>İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link
              className='menu-link'>
              <LogoutOutlined className='md:text-2xl text-xl' />
              <span className='md:text-xs text-[10px] pt-1'>Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge count={cart.cartItems.length} className='md:hidden flex'>
          <Link
            to={"/"}
            className='menu-link'>
            <ShoppingCartOutlined className='text-2xl' />
            <span className='md:text-xs text-[10px] pt-1'>Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  )
}

export default Header;