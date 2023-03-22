import React, {Component} from 'react';
import './products.scss'
import axios, {apiurl} from '../../../axios'
//import { url } from '../../config'
//import { categoryAction } from '../../actions'
import {Link} from 'react-router-dom'
import _ from 'lodash'

import AllProducts from './AllProducts'
//import Header from '../Header'
//import Navbar from '../Navbar'

class index extends Component {
    state = {
        show: 'card',
        loading: true,
        products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        allCategories: [],
        categories: [],
        subcategories: [],
        category_id: -1,
        sub_category_id: -1,
        top: '100px',
        search: '',
        categoryProducts: [],
        searchProductResult: []
    }


    componentDidMount() {
        this.fetchProducts()
        this.fetchCategories()

        window.addEventListener('scroll', () => {
            let scroll = window.scrollY
            if (scroll > 0) {
                this.setState({top: '65px'})
            } else {
                this.setState({top: '100px'})
            }
        })
    }

    fetchCategories = () => {
        let category = localStorage.getItem('categories')

        if (_.isString(category)) {
            let categories = JSON.parse(category)
            if (_.isArray(categories)) {
                let listCategories = categories.filter((el) => {
                    return (
                        el.parent_id === 0
                    )
                })
                this.setState({allCategories: categories, categories: listCategories, loading: false})
            }
        }


        /*axios.get( apiurl + 'api/admin/categories' )
        .then(res=>{
            if(_.isArray(res.data.data)){
                this.props.categoryAction(res.data.data)
                this.setState({ categories: res.data.data, loading: false })
            }
        })*/
    }

    fetchProducts = () => {

        let products = JSON.parse(localStorage.getItem('products'))
        if (_.isArray(products)) {
            this.setState({products: products, searchProductResult: products, loading: false})
        }

        axios.get(apiurl + '/admin/products')
            .then(res => {
                if (_.isArray(res.data.products))
                    this.setState({products: res.data.products, searchProductResult: res.data.products, loading: false})
                localStorage.setItem('products', JSON.stringify(res.data.products))
            })
    }

    selectCategory = (e) => {
        let id = e.target.value
        let allProducts = this.state.products
        this.setState({category_id: id, sub_category_id: -1, loading: true})

        if (id === '-1') {
            this.setState({searchProductResult: allProducts, loading: false})
        } else {
            let categories = this.state.allCategories

            let subCategories = categories.filter((el) => {
                return (
                    el.parent_id.toString() === id.toString()
                )
            })

            let filteredProducts = allProducts.filter((p) => {
                let categoriesIDs = subCategories.map((c) => {
                    return c.category_id.toString();
                })
                return (
                    categoriesIDs.includes(p.category_id.toString())
                )
            })

            this.setState({
                subcategories: subCategories,
                searchProductResult: filteredProducts,
                categoryProducts: filteredProducts,
                loading: false
            })
        }
    }

    /* fetchProductsCategory(id){
         let products = JSON.parse(localStorage.getItem(`category${id}`))
         if(_.isArray(products)){
             this.setState({ products, loading: false })
         }

         axios.get( url + "/product/category/" + id )
         .then(res=>{
             if(_.isArray(res.data)){
                 localStorage.setItem(`category${id}`, JSON.stringify(res.data))
                 this.setState({ products: res.data, loading: false })
             }
         })
     }*/

    selectSubcategory = (e) => {
        let id = e.target.value
        this.setState({sub_category_id: id, loading: true})

        let allFilteredProducts = this.state.categoryProducts
        if (id === '-1') {
            this.setState({searchProductResult: allFilteredProducts, loading: false})
        } else {
            let filteredProducts = allFilteredProducts.filter((p) => {
                return (
                    p.category_id.toString() === id)
            })

            this.setState({searchProductResult: filteredProducts, loading: false})
        }


        /*   if (id <= 0) {
               this.fetchProductsCategory(category)
           } else {
               let products = JSON.parse(localStorage.getItem(`category${category}${id}`))
               if (_.isArray(products)) {
                   this.setState({products, loading: false})
               }

               /!* axios.get( url + "/product/category/" + category + "?idSub=" + id )
                .then( res => {
                    if(_.isArray(res.data)){
                        localStorage.setItem(`category${category}${id}`, JSON.stringify(res.data))
                        this.setState({ products: res.data, loading: false })
                    }
                } )*!/
           }*/
    }


    searchProduct = (e) => {
        let searchText = e.target.value;
        this.setState({search: searchText, loading: true});
        let products;
        if (this.state.category_id !== '-1') {
            products = this.state.categoryProducts
        } else {
            products = this.state.products
        }

        let selectedProduct = products.filter((p) => {
            return (
                p.product_name.toString().replaceAll("-", "").replaceAll(/ /g, '').toLowerCase()
                    .includes(searchText.toString().replaceAll(/ /g, '').replaceAll("-", "").toLowerCase())
            )
        })
        this.setState({searchProductResult: selectedProduct, loading: false})
    }

    render() {
        const {
            allCategories,
            top,
            loading,
            searchProductResult,
            products,
            show,
            categories,
            subcategories,
            sub_category_id,
            category_id /*message *!/*/
        } = this.state
        return (
            <div className="products">
                {/* <Header />
                <Navbar />*/}

                <div className="wrapper">
                    <Link to="/admin/product/add" state={{allCategories: allCategories, categories: categories}}>
                        {<div style={{top: top, transition: '0.5s'}} className="new">
                            <i className="demo-icon icon-plus">&#xe808;</i>
                        </div>}
                    </Link>

                    <span>Products</span>

                    <div className="show">
                        <div className={show === 'card' ? 'active' : ''} onClick={() => this.setState({show: 'card'})}>
                            <span>cards</span>
                        </div>
                        <div className={show === 'table' ? 'active' : ''}
                             onClick={() => this.setState({show: 'table'})}>
                            <span>table</span>
                        </div>
                    </div>

                    <div className="wrapper-search">
                        <div className="search">
                            <label style={{marginRight: "27px"}} htmlFor="category">Category</label>
                            {<select value={category_id} onChange={this.selectCategory} name="category" id="category">
                                <option value="-1">All</option>
                                {
                                    categories && categories.map(category => <option key={category.category_id}
                                                                                     value={category.category_id}>{category.name}</option>)
                                }
                            </select>}
                        </div>

                        <div className="search">
                            <label htmlFor="category">Subcategory</label>
                            {<select value={sub_category_id} onChange={this.selectSubcategory} name="category"
                                     id="category">
                                <option value="-1">All</option>
                                {
                                    subcategories && subcategories.map(subCategory => <option
                                        key={subCategory.category_id}
                                        value={subCategory.category_id}>{subCategory.name}</option>)
                                }
                            </select>}
                        </div>

                        <div className="search-input">
                            <input placeholder="Search product" onChange={this.searchProduct} type="search"/>
                        </div>
                    </div>

                    { // loading product

                        loading ? <div className={show}>{searchProductResult.map(num => <div key={num}
                                                                                             className="loading-list">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>)}</div> :
                            <div className={show}>
                                { //list all products
                                    searchProductResult.length === 0 ? <span style={{color: "red"}}>Not found</span> :
                                        searchProductResult.map(product => <AllProducts key={product.product_id}
                                                                                        product={product}/>)
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        categories: state.categoriesReducer,
        user: state.userReducer
    })
}

export default /*connect(mapStateToProps , { categoryAction })*/ (index);