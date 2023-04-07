import {BrowserRouter, createBrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import PagesComposing from './pages/pagesComposing';
import Login from './pages/Registration&Login/Login';
import Register from './pages/Registration&Login/Register';
import React from 'react';
import LanguagePopup from './components/LanguagePopup';
import CompagePage from './pages/ComparePage';
import CategoriesPage from './pages/CategoriesPage';
import {useDispatch} from 'react-redux';
import {fetchCurrency} from './redux/Slicess/cartSlice2';
import Breadcrumbs from './components/Breadcrumbs';
import SearchPage from './pages/SearchPage';
import {ToastContainer} from 'react-toastify';
import Guarantee from './pages/Guarantee';
import Payment from './pages/Payment';
import Cooperation from './pages/Cooperation';
import Delivery from './pages/Delivery';
import Brands from './pages/Brands';
import Portfolio from './pages/Portfolio';
import Support from './pages/Support';
import News from './pages/News';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Products from "./admin/pages/Products";
import Product from "./admin/pages/Product";
import UpdateProduct from "./admin/pages/Product/Update";
import AddProduct from "./admin/pages/Product/AddProduct";

const Layout = () => {
    const [cartStatus, setCartStatus] = React.useState(false);
    const [languageStatus, setLanguageStatus] = React.useState(false);
    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />

            <LanguagePopup
                languageStatus={languageStatus}
                setLanguageStatus={setLanguageStatus}
            />
            <Cart cartStatus={cartStatus} setCartStatus={setCartStatus}/>
            <Header
                cartStatus={cartStatus}
                setCartStatus={setCartStatus}
                setLanguageStatus={setLanguageStatus}
                languageStatus={languageStatus}
            />
            <Breadcrumbs/>
            <Outlet/>
            <Footer/>
        </>
    );
};

let user = JSON.parse(localStorage.getItem("user"));
const isHasToAdminAccess = user === null ? false : ['admin', 'manager'].includes(user.role);

function App() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchCurrency());
    }, []);
    return <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Layout/>}>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/compare' element={<CompagePage/>}/>
                <Route path='/categories' element={<CategoriesPage/>}/>
                <Route path='/guarantee' element={<Guarantee/>}/>
                <Route path='/delivery' element={<Delivery/>}/>
                <Route path='/payment' element={<Payment/>}/>
                <Route path='/cooperation' element={<Cooperation/>}/>
                <Route path='/brands' element={<Brands/>}/>
                <Route path='/portfolio' element={<Portfolio/>}/>
                <Route path='/support' element={<Support/>}/>
                <Route path='/news' element={<News/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/:url' element={<PagesComposing/>}/>
                <Route path='/search' element={<SearchPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/admin" element={true ? <Products/> : <Navigate replace to="/"/>}/>
                <Route path="/admin/products" element={<Products/>}/>
                <Route path="/admin/product/add" element={<AddProduct/>}/>
                <Route path="/admin/product/:product_id" element={<Product/>}/>
                <Route path="/admin/product/update/:product_id" element={<UpdateProduct/>}/>
               {/*
                    <Route path="/admin/product/:id" element={<UpdateProduct/>}/>
                    <Route path="/admin/users" element={<Users/>}/>*/}
                <Route path="/admin/categories" element={<CategoriesPage/>}/>

            </Route>
        </Routes>
    </BrowserRouter>;
}

export default App;
