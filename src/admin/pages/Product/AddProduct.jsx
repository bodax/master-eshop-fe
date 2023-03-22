import React, {Component} from 'react';
import './addproduct.scss'
import axios from 'axios'
import ReactQuill from 'react-quill'
import {Link, useLocation} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'

/*import { url, headers } from '../../config'*/
import {apiurl} from "../../../axios";
import {currencies} from "../../constants/Currency";
import {languages} from "../../constants/Language";

/*import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'*/

export function withRouter(Children) {
    return (props) => {
        const match = {params: useLocation()};
        return <Children {...props} match={match}/>
    }
}

class AddProduct extends Component {
    state = {
        allCategories: [],
        categories: [],
        subcategories: [],
        currencies: [],
        languages: [],
        selectedImages: '',
        images: [],
        isImagesLoad: '',
        imagePreview: '',
        message: '',
        messageadd: '',
        allinput: [],
        allsize: [],
        allstock: [],
        size: '',
        stock: '',
        description: '',
        success: false,
        loading: false,
    }

    componentDidMount() {
        let categories = this.props.match.params.state.categories
        let allCategories = this.props.match.params.state.allCategories
        this.setState({
            categories: categories,
            allCategories: allCategories,
            currencies: currencies,
            languages: languages
        })
    }

    selectCategory = (e) => {
        let id = e.target.value;
        this.setState({
            category_id: id, sub_category_id: -1
        })

        let allCategories = this.state.allCategories
        let subCategories = allCategories.filter((el) => {
            return (
                el.parent_id.toString() === id.toString()
            )
        })

        this.setState({subcategories: subCategories})
    }

    addSize = () => {
        const {allinput, allsize, size, allstock, stock} = this.state

        if (size && stock) {
            let input = allinput
            let num = allinput.length
            input.push(num)

            let sizes = allsize
            sizes.push(size)

            let stocks = allstock
            stocks.push(stock)

            this.setState({
                allinput: input,
                allsize: sizes,
                allstock: stocks,
                size: '',
                stock: '',
                messageadd: ''
            })
        } else {
            this.setState({messageadd: 'Submit size and stock'})
        }
    }

    deleteSizes(i) {
        let allsize = this.state.allsize
        let allstock = this.state.allstock
        let allinput = this.state.allinput


        allsize.splice(i, 1)
        allstock.splice(i, 1)
        allinput.splice(i, 1)

        this.setState({
            allsize,
            allstock,
            allinput
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImage = (e) => {
        let files = e.target.files
        console.log(e.target.files)

        let images = [];

        for (let i = 0; i < files.length; i++) {
            images.push(URL.createObjectURL(files[i]))
        }
        console.log(images)
        this.setState({
            /* // file: files,*/
            selectedImages: files,
            images: images,
            isImagesLoad: true
        })
        /*   reader.onloadend = () => {

           }*/

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {
            imagePreview,
            file,
            allinput,
            allsize,
            allstock,
            name,
            category_id,
            sub_category_id,
            currency_id,
            price,
            discount,
            description
        } = this.state
        // const token = this.props.user.token
        // console.log(category_id, sub_category_id)
        /* if(!description) this.setState({ message: 'Submit description' })
         if(allsize.length<1) this.setState({ message: 'Click add size and stock' })
         if(!weight) this.setState({ message: 'Submit weight' })
         if(!price) this.setState({ message: 'Submit price' })
         if(!sub_category_id) this.setState({ message: 'Select subcategory' })
         if(!category_id) this.setState({ message: 'Select category' })
         if(!code) this.setState({ message: 'Submit code' })
         if(!name) this.setState({ message: 'Submit name' })
         if(!imagePreview) this.setState({ message: 'Submit image' })*/


       let data = new URLSearchParams();

        data.append("image", '')
        data.append("name", name)
        data.append("url", name.toString().replaceAll("-", "").replaceAll(/ /g, ''))
        data.append("category_id", category_id)
        data.append("sub_category_id", sub_category_id)
        data.append("currency_id", currency_id)
        data.append("base_price", price)
        data.append("discount_percent", discount)
        data.append("description", description)


       /* const formData = new FormData();
        Object.values(this.state.selectedImages).forEach(file=>{
            formData.append("uploadImages", file);
        });

      const res =  axios.post(apiurl + "/admin/product/upload",formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });*/

        axios.post(apiurl + "/admin/product/add", data/* headers(token)*/).then()


        //console.log(Object.fromEntries(data))
    }

    /*  handleSubmit = (e) => {

          e.preventDefault()
          const {
              imagePreview,
              file,
              allinput,
              allsize,
              allstock,
              name,
              category_id,
              sub_category_id,
              currency_id,
              price,
              discount,
              description
          } = this.state
          // const token = this.props.user.token
          console.log(category_id, sub_category_id)
          /!* if(!description) this.setState({ message: 'Submit description' })
           if(allsize.length<1) this.setState({ message: 'Click add size and stock' })
           if(!weight) this.setState({ message: 'Submit weight' })
           if(!price) this.setState({ message: 'Submit price' })
           if(!sub_category_id) this.setState({ message: 'Select subcategory' })
           if(!category_id) this.setState({ message: 'Select category' })
           if(!code) this.setState({ message: 'Submit code' })
           if(!name) this.setState({ message: 'Submit name' })
           if(!imagePreview) this.setState({ message: 'Submit image' })*!/


          let data = new FormData()

          data.append("image", '')
          data.append("name", name)
          data.append("url", name.toString().replaceAll("-", "").replaceAll(/ /g, ''))
          data.append("category_id", category_id)
          data.append("sub_category_id", sub_category_id)
          data.append("currency_id", currency_id)
          data.append("base_price", price)
          data.append("discount_percent", discount)
          data.append("description", description)
         /!* const config = {
              headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }*!/

          axios.post(apiurl + "/admin/product/add", data/!* headers(token)*!/).then()

          console.log(Object.fromEntries(data))
  return;

          if (imagePreview && name && category_id && sub_category_id && price && allsize && allstock && description) {
              this.setState({loading: true})
              let data = new FormData()
              data.append('image', file)
              axios.post(apiurl + "/admin/product/add", data, /!*headers(token)*!/).
              then(res => {
                  this.setState({
                      loading: false,
                      success: true
                  });

                  /!*         let data = new FormData()
                           data.append("image", res.data.url)
                           data.append("name", name)
                           data.append("category_id", category_id)
                           data.append("sub_category_id", sub_category_id)
                           data.append("currency_id", currency_id)
                           data.append("price", price)
                           data.append("weight", weight)
                           data.append("description", description)*!/

                  axios.post(apiurl + "/product", data,/!* headers(token)*!/)
                      .then(res => {
                          this.setState({
                              loading: false,
                              success: true,
                              message: '',
                              imagePreview: '',
                              name: '',
                              code: '',
                              category_id: '',
                              allsize: [],
                              allstock: [],
                              sub_category_id: '',
                              price: '',
                              weight: '',
                              description: '',
                              file: null
                          })
                          setTimeout(() => {
                              this.setState({success: false})
                          }, 2000);
                      })
                      .catch(err => {
                          this.setState({message: 'Failed add product', loading: false})
                      })

              })
                  .catch(err => {
                      this.setState({message: 'Failed connect server', loading: false})
                  })

          }

      }*/

    render() {

        const {
            categories,
            subcategories,
            currencies,
            currency_id,
            loading,
            imagePreview,
            images,
            isImagesLoad,
            discount,
            allstock,
            name,
            code,
            size,
            stock,
            category_id,
            sub_category_id,
            price,
            weight,
            description,
            message,
            messageadd,
            success
        } = this.state

        return (
            <div className="add-wrapper">
                {/*  <Header />
                <Navbar />*/}
                <Link to='/products'>
                    <div className="cancel"><i className="demo-icon icon-cancel">&#xe80f;</i></div>
                </Link>
                {loading ? {/*<Loading />*/} : ''}

                <div className="add-product">
                    <h1>Add Product</h1>
                    {success ? <div className="success">
                        <div>Success</div>
                    </div> : ""}

                    <div className="photo">
                        <div className="image-preview">
                            {isImagesLoad ? images.map(image => <img src={image} alt="imagePreview"/>) : <div></div>}
                        </div>
                        <label htmlFor="photo">Image <i className="demo-icon icon-picture">&#xe812;</i></label><br/>
                        <input onChange={this.handleImage} id="photo" type="file" multiple
                               accept="image/x-png,image/gif,image/jpeg, image/png, image/jpg"/>
                    </div>

                    <form onSubmit={this.handleSubmit} encType="application/x-www-form-urlencoded">
                        <label htmlFor="">Name</label>
                        <input value={name} onChange={this.handleChange} name="name" type="text"/>
                        <label htmlFor="">Category</label>
                        <select value={category_id} onChange={this.selectCategory} name="category_id" id="category">
                            <option value="-1">select</option>
                            {
                                categories.map(category => {
                                    return (
                                        <option key={category.category_id}
                                                value={category.category_id}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Subcategory</label>
                        <select value={sub_category_id} onChange={this.handleChange} name="sub_category_id"
                                id="sub_category">
                            <option value="-1">select</option>
                            {
                                subcategories.map(subcategory => {
                                    return (
                                        <option key={subcategory.category_id}
                                                value={subcategory.category_id}>{subcategory.name}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="">Currency</label>
                        <select value={currency_id} onChange={this.handleChange} name="currency_id" id="currency_id">
                            <option value="-1">select</option>
                            {
                                currencies.map(currency => {
                                    return (
                                        <option key={currency.id} value={currency.id}>{currency.name}</option>
                                    )
                                })
                            }
                        </select>

                        <label htmlFor="">Price</label>
                        <input value={price} placeholder="price" onChange={this.handleChange} name="price"
                               type="number"/>
                        <label htmlFor="">Discount</label>
                        <input value={discount} placeholder="discount" onChange={this.handleChange} name="discount"
                               type="number" min="1" max="100"/>

                        <span className="message">{messageadd}</span>

                        <label htmlFor="description">Description</label>

                        <ReactQuill className="description" value={description}
                                    onChange={(value) => this.setState({description: value})} id="description"/>

                        <span className="message">{message}</span>
                        <button type="submit">Save</button>
                    </form>
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

export default withRouter(AddProduct);