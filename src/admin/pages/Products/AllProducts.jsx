import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class AllProducts extends Component {

    render() {
        const { product } = this.props

        return (
           <Link to={`/admin/product/${product.product_id}`} state={{product: product}} style={{textDecoration: 'none'}}>
            <div className="product">
                <div className="code">Name:
                 {  <span>{product.product_name}</span>}
                </div>
                <div className="code">
                    <div>Product ID:
                        {<span>{product.product_id}</span>}
                    </div>

                </div>
                <div className="price">
                    <div>Price:
                    {<span>{product.base_price} {product.iso}</span>}
                    </div>
                </div>

            </div>
        </Link>
        );
    }
}

export default AllProducts;