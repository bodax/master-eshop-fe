import React, {Component} from 'react';
import './product.scss'
//import { url, headers, price } from '../../config'
import {Link, useLocation} from 'react-router-dom'
import _ from 'lodash'

//import Header from '../Header'
//import Navbar from '../Navbar'

export function withRouter(Children) {
    return (props) => {

        const match = {params: useLocation()};
        return <Children {...props} match={match}/>
    }
}

class index extends Component {

    state = {
        product: '',
        comfirm_delete: true,
        message: '',
        loading: true
    }

    /* deleteProduct(id) {
         axios.delete( url+ '/product/' + id , headers(this.props.user.token) )
         .then(res=>{
             this.props.history.push("/products")
         })
         .catch(err=>{
             this.setState({ message: 'Failed delete', comfirm_delete: false })
         })
     }*/

    componentDidMount() {

        if (this.props.match.params.state.product) {
            this.setState({
                product: this.props.match.params.state.product,
                loading: false
            })
        }
        /* else {

            let id = this.props.match.params.id
            axios( apiurl + "/product/" + id )
            .then(res=>{
                if(res.data){
                    this.setState({
                        product: res.data,
                        loading: false
                    })
                }
            })
        }*/
    }


    render() {

        const {product, comfirm_delete, message, loading} = this.state
        console.log("Product" + product)
        return (
            <div className="detail-product">
                {/*   <Header />
                <Navbar />*/}

                { //open comfirm delete category
                    comfirm_delete ? '' :
                        <div className="comfirm-delete">
                            <div>
                                <h3>Are you sure want to delete?</h3>
                                <button onClick={() => {
                                    this.deleteProduct(product.product_id)
                                }}>Yes
                                </button>
                                <button onClick={() => {
                                    this.setState({comfirm_delete: true})
                                }}>No
                                </button>
                            </div>
                        </div>
                }
                <div className="top">
                    <div className="back">
                        <Link style={{textDecoration: 'none', color: '#4694fc', fontWeight: '400'}}
                              to='/admin/products'>Products</Link> <span>{' > ' + product.product_name}</span>
                    </div>

                    <div className="action">
                        <div onClick={() => {
                            this.setState({comfirm_delete: false})
                        }} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        <Link to={`/admin/product/update/${product.product_id}`} state={{product: product}}>
                            <div className="update">
                                <i className="demo-icon icon-cog">&#xe81a;</i>
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="wrapper">

                        <div className="image">
                            {loading ? <div className="load"></div> :
                                <img src={`/static/product/${product.product_id}/${product.filename}`} alt=""/>}
                        </div>
                        <div className="detail">
                            <span className="message">{message}</span>

                            <div className="box">
                                <div className="name">
                                    <span>{product.product_name}</span>
                                </div>
                                <div className="category">
                                    <div>
                                        Category <br/>
                                        <span>{product.category_name}</span>
                                    </div>
                                   {/* <div>
                                        Subcategory <br/>
                                         <span>{product.sub_category_name}</span>
                                    </div>*/}
                                </div>
                                <div className="base_price">
                                    Base price <br/>
                                    {<span>{product.base_price}</span>}
                                </div>
                                <div className="base_price">
                                    Discount, % <br/>
                                    {<span>{product.discount_percent}</span>}
                                </div>
                                <div className="base_price">
                                    Currency <br/>
                                    {<span>{product.iso}</span>}
                                </div>
                            </div>

                            <div className="price">
                                Current Price <br/>
                                {<span> {`${
                                    product.discount_percent
                                        ? Math.ceil(product.base_price - (product.base_price / 100) *  product.discount_percent).toFixed(2)
                                        : product.base_price}`}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        Description <br/>
                        <div dangerouslySetInnerHTML={{__html: product.description}}></div>
                    </div>
                </div>

            </div>
        );
    }
}


/*const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}*/

export default withRouter(index);