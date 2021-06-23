import axios from "axios";
import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { header } from "../axios/header";
import Skeleton from "react-loading-skeleton";
import _ from 'lodash';
import {
    GET_PRODUCTS,
    GET_RATTING,
    GET_CATEGORIES,
    getAvatar,
    GET_Media,
    PRODUCT_URL
} from "./../constant";
import { property, size } from "lodash";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import { notificationComponent, sosanh } from './../utils/notification';
class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrData: [],
            searchText: "",
            pagination: '',
            totalPages: '',
            last: true,
            first: true,
            cPage: 0,
            page: [],
            isLoading: true,
            arrLoading: [],
            categories: [],
            images: [],
            selected: [],
            selectedCategories: [],
            editItem: null,
            editItemCate: [],
            properties: [
                {
                    options: [{}],
                },
            ],
        };
        this.onPick = this.onPick.bind(this);
    }

    addProperties = () => {
        const { properties } = this.state;
        this.setState({ properties: [...properties, { options: [{}] }] });
    };
    onEdit = (prod) => {
        this.setState({ editItem: prod, editItemCate: prod.categories });
    }
    addOption = (key) => {
        const { properties } = this.state;
        properties[key].options = [...properties[key].options, {}];
        this.setState({ properties: properties });
    };
    isChangeProp = (e, index) => {
        const values = this.state.properties;
        const { name, value } = e.target;
        values[index][name] = value;
        this.setState(values);
        console.log(this.state.properties);
    };
    handleChange = (event) => {
        var selectedCate = [];
        console.log(event);
        event.map((cate) => {
            selectedCate.push({ id: cate.id });
        });
        this.setState({ selectedCategories: selectedCate });
    };
    isChangeOption = (e, index, optionIndex) => {
        const { properties } = this.state;
        // properties[key].options = [... properties[key].options,{}]
        // this.setState({ properties: properties});
        console.log(properties[index].options[optionIndex]);
        const values = properties[index].options[optionIndex];
        const { name, value } = e.target;

        values[name] = value;
        console.log("op", name, value);
        properties[index].options[optionIndex] = values;
        this.setState({ properties: properties });
        console.log(this.state.properties);
    };
    isChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onPick = (image) => {
        var imgs = []
        image.map((im) => {
            imgs.push({ id: im.value });
        })
        console.log(image);
        this.setState({ selected: imgs });
    };
    addProduct = () => {
        const {
            selectedCategories,
            selected,
            properties,
            name,
            fullDescription,
            shortDescription,
            status,
        } = this.state;
        var request = {
            categories: selectedCategories,
            medias: selected,
            properties: properties,
            name: name,
            description: fullDescription,
            shortDescription: shortDescription,
            status: status,
        };
        // console.log(val)
        axios.post(GET_PRODUCTS,
            request
            , {
                headers: header,
            }).then(async response => {
                // this.rerender(this.state.cPage, false);
                notificationComponent('success', "Add done")
                // notificationComponent('success', "Update done")
            }).catch(async err => {
                // const data = response.data;
                // console.log(data);
                // arr.map( (rp,i)=>{
                //     if(val.id == rp.id){
                //         arr[i] = data
                //     }
                // });
                // this.setState({arr:arr})
                // this.rerender(this.state.cPage, false);
                notificationComponent('success', "Add done")
                // notificationComponent('error', err.response?err.response.message:err.status)
            });
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        console.log("Master Lau Nốt J ớt");
        console.log(header.Authorization);

        axios
            .get(GET_RATTING, {
                headers: header,
            })
            .then((response) => {
                console.log("ahihihihih", response);
                const data = response.data.content;
                console.log(data);

                this.setState({ arrData: data });
                // this.setState({pagination: response.data.pageable})
                // this.setState({totalPages:response.data.totalPages})
                // this.setState({last:response.data.last})
                // this.setState({first:response.data.first})
                // var page = _.range( this.state.totalPages )
                // console.log(data.length)
                // this.setState({page:page})
                // this.setState({cPage:response.data.pageable.pageNumber})
                this.setState({ isLoading: false });
                this.setState({ arrLoading: Array(data.length).fill(1) })
            })
            .catch((err) => {
                console.log(err);
                // localStorage.clear();
                // return <Redirect to='/login'  />
            });
        // axios
        //   .get(GET_CATEGORIES, {
        //     headers: header,
        //   })
        //   .then((response) => {
        //     console.log("ahihihihih", response);
        //     const data = response.data.content;
        //     // console.log(data);

        //     this.setState({ categories: data });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     // localStorage.clear();
        //     // return <Redirect to='/login'  />
        //   });
        // axios
        //   .get(GET_Media+"?size=99", {
        //     headers: header,
        //   })
        //   .then((response) => {
        //     console.log("ahihihihih", response);
        //     const data = response.data.content;
        //     // console.log(data);
        //     this.setState({ images: data });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     // localStorage.clear();
        //     // return <Redirect to='/login'  />
        //   });
    }
    rerender(page, reload) {
        // if(this.state.cPage == page) return;
        this.setState({ isLoading: reload })
        axios.get(GET_RATTING + `?page=${page}`, {
            headers: header
        })
            .then((response) => {
                const data = response.data.content;

                this.setState({ arrData: data });
                // this.setState({ pagination: response.data.pageable })
                // this.setState({ totalPages: response.data.totalPages })
                // this.setState({ last: response.data.last })
                // this.setState({ first: response.data.first })
                // var page = _.range(this.state.totalPages)
                // console.log(response)
                // this.setState({ cPage: response.data.pageable.pageNumber })
                // this.setState({ page: page })
                this.setState({ isLoading: false })
                if (reload) this.setState({ arrLoading: Array(data.length).fill(1) })
            })
    }


    render() {
        const { isLoading, searchText, arrData, categories, images, properties, editItem, editItemCate, totalPages, last, first, cPage, page, arrLoading } =
            this.state;

        const animatedComponents = makeAnimated();
        var result = [];
        arrData.forEach((item) => {
            //   if (item.name.indexOf(searchText) !== -1 || !searchText) {
            //     result.push(item);
            //   }

            console.log("aaaaaa");
            console.log(item.rating);
            //   console.log(item.product.name)
            if (item.rating != "") {
                result.push(item);
            }
            // if(item.n)
        });


        const datas = result.map((values, key) => {
            console.log(values.medias.status);
            return (
                <tr key={key + 1}>
                    <td> {isLoading ? <Skeleton /> : key + 1}</td>
                    <td>
                        {" "}
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <>
                                {" "}
                                <p>{values.user.username}</p>
                            </>
                        )}
                    </td>
                    <td>
                        {" "}    {isLoading ? (
                            <Skeleton height={100} />
                        ) : (
                            values.medias.map((val) => (
                                <img src={getAvatar(val.mediaPath)} style={{ width: 80 }} />
                            ))
                        )}{" "}
                    </td>
                    <td>{" "}
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <>
                                {" "}
                                <p>{values.content}</p>
                            </>
                        )}</td>
                    <td>{" "}
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            
                            <>
                            
                               <p> {" "} <ReactStars
                                    count={5}
                                    value= {values.rating}
                                    size={24}
                                    // isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                /></p>
                            </>
                        )}</td>
                    <td>
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        {/* <button
                          className="btn btn-primary"
                          onClick={() => this.onEdit(values)}
                          data-toggle="modal"
                          data-target="#editModalLong"
                        >
                          Edit
                        </button> */}
                        {!values.status ? (
                          <button
                            className="btn btn-success"
                            // onClick={() => this.onEdit(values)}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning"
                            // onClick={() => this.handlePost(values)}
                          >
                            Deactive
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>



                // <tr key={key + 1}>
                //   {/* <td> {isLoading ? <Skeleton /> : key + 1}
                //   </td> */}
                //   <td>
                //     {" "}
                //     {isLoading ? (
                //       <Skeleton />
                //     ) : (
                //       <>
                //         {" "}
                //         <p>{values.name}</p>
                //         <small>{values.user.username}</small>
                //       </>
                //     )}
                //   </td>
                //   {/* <td>
                //     {values.productProperties.map((property) => {
                //       return (
                //         <>
                //           <p
                //             style={{
                //               textAlign: "left",
                //               textTransform: "uppercase",
                //               margin: "0",
                //             }}
                //           >
                //             {property.propertyName}
                //           </p>

                //           {property.options.map((op) => {
                //             return (
                //               <p>
                //                 <b>{op.name}</b> : {op.subQuantity}
                //               </p>
                //             );
                //           })}
                //           <br />
                //         </>
                //       );
                //     })}
                //   </td> */}
                //   {/* <td>
                //     {" "}
                //     {isLoading ? (
                //       <Skeleton />
                //     ) : (
                //       <>
                //         {" "}
                //         <p>{values.name}</p>
                //         <small>{values.description}</small>
                //       </>
                //     )}
                //   </td> */}
                //   {/* <td>
                //     {" "}
                //     {isLoading ? (
                //       <Skeleton height={100} />
                //     ) : (
                //       values.medias.map((val) => (
                //         <img src={getAvatar(val.mediaPath)} style={{ width: 80 }} />
                //       ))
                //     )}{" "}
                //   </td> */}


                //   <td>{values.status}</td>

                  
                // </tr>
            );
        });

        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3 row">
                    <h6
                        className="m-0 font-weight-bold text-primary"
                        style={{ textAlign: "left" }}
                    >
                        {" "}
                        Posts Datatables
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div
                            id="dataTable_wrapper"
                            className="dataTables_wrapper dt-bootstrap4"
                        >
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="row dataTables_filter">
                                        <input
                                            className="col-lg-4"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                            onChange={(event) => this.isChange(event)}
                                            name="searchText"
                                            style={{ outline: "none" }}
                                        />
                                        <div
                                            className="btn btn-primary btn-vy"
                                            style={{ marginRight: "20px" }}
                                            data-toggle="modal"
                                            data-target="#exampleModalLong"
                                        >
                                            New Product
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="modal fade modal-product"
                                id="exampleModalLong"
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby="exampleModalLongTitle"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">
                                                Add Product
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form id="form-create-product">
                                                <div className="form-row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="small mb-3 mr-4">Name</label>
                                                            <input
                                                                name="name"
                                                                // value=name
                                                                className="modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">
                                                                Full Description
                                                            </label>
                                                            <input
                                                                name="fullDescription"
                                                                // value=name
                                                                className="modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">
                                                                Select categories
                                                            </label>
                                                            <Select
                                                                name="cates"
                                                                closeMenuOnSelect={false}
                                                                defaulValue={[categories[0], categories[1]]}
                                                                isMulti
                                                                getOptionLabel={(cat) => cat.name}
                                                                getOptionValue={(cat) => cat.id}
                                                                onChange={this.handleChange}
                                                                options={categories}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select existed options"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">
                                                                Select category
                                                            </label>
                                                            <ImagePicker
                                                                images={images.map((image, i) => ({
                                                                    src: getAvatar(image.mediaPath),
                                                                    value: image.id,
                                                                }))}
                                                                onPick={this.onPick}
                                                                multiple
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">
                                                                Short Description
                                                            </label>
                                                            <input
                                                                name="shortDescription"
                                                                // value=name
                                                                className="modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">
                                                                Properties
                                                            </label>
                                                            <div
                                                                className="btn btn-primary btn-vy"
                                                                onClick={() => {
                                                                    this.addProperties();
                                                                }}
                                                                style={{ marginRight: "20px" }}
                                                            >
                                                                Add propeties
                                                            </div>
                                                        </div>

                                                        {properties.map((property, key) => {
                                                            return (
                                                                <div className="form-group">
                                                                    <div className="col-md-4">
                                                                        <label className="small mb-1">
                                                                            Property name
                                                                        </label>
                                                                        <div
                                                                            className="btn btn-primary "
                                                                            onClick={() => {
                                                                                this.addOption(key);
                                                                            }}
                                                                            style={{ marginRight: "20px" }}
                                                                        >
                                                                            Add Option
                                                                        </div>

                                                                        <input
                                                                            name="propertyName"
                                                                            // value=name
                                                                            className="modal-product-input"
                                                                            type="text"
                                                                            onChange={(event) =>
                                                                                this.isChangeProp(event, key)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="row">
                                                                            {property.options.map(
                                                                                (option, optionKey) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className="col-md-6">
                                                                                                <label className="small mb-1 mr-2">
                                                                                                    Option name
                                                                                                </label>
                                                                                                <input
                                                                                                    name="name"
                                                                                                    // value=name
                                                                                                    className="modal-product-input"
                                                                                                    type="text"
                                                                                                    onChange={(event) =>
                                                                                                        this.isChangeOption(
                                                                                                            event,
                                                                                                            key,
                                                                                                            optionKey
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-md-6">
                                                                                                <label className="small mb-1 mr-2">
                                                                                                    Option value
                                                                                                </label>
                                                                                                <input
                                                                                                    name="value"
                                                                                                    // value=name
                                                                                                    className="modal-product-input"
                                                                                                    type="text"
                                                                                                    onChange={(event) =>
                                                                                                        this.isChangeOption(
                                                                                                            event,
                                                                                                            key,
                                                                                                            optionKey
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-md-6">
                                                                                                <label className="small mb-1 mr-2">
                                                                                                    Option Quantity
                                                                                                </label>
                                                                                                <input
                                                                                                    name="subQuantity"
                                                                                                    // value=name
                                                                                                    className="modal-product-input"
                                                                                                    type="number"
                                                                                                    onChange={(event) =>
                                                                                                        this.isChangeOption(
                                                                                                            event,
                                                                                                            key,
                                                                                                            optionKey
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-md-6">
                                                                                                <label className="small mb-1 mr-2">
                                                                                                    Option Price
                                                                                                </label>
                                                                                                <input
                                                                                                    name="subPrice"
                                                                                                    // value=name
                                                                                                    className="modal-product-input"
                                                                                                    type="text"
                                                                                                    onChange={(event) =>
                                                                                                        this.isChangeOption(
                                                                                                            event,
                                                                                                            key,
                                                                                                            optionKey
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        </>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                        <div className="form-group">
                                                            <label className="small mb-1">Ratting</label>
                                                            <div>
                                                                <input
                                                                    id="age1"
                                                                    name="status"
                                                                    value="ACTIVATE"
                                                                    type="radio"
                                                                    onChange={(event) => this.isChange(event)}
                                                                />
                                                                <label for="age1">ACTIVATE</label>
                                                            </div>

                                                            <div>
                                                                <input
                                                                    id="age2"
                                                                    name="status"
                                                                    value="DEACTIVATE"
                                                                    type="radio"
                                                                    onChange={(event) => this.isChange(event)}
                                                                />
                                                                <label for="age2">DEACTIVATE</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-dismiss="modal"
                                                onClick={() => this.addProduct()}
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="modal fade modal-product"
                                id="editModalLong"
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby="editModalLongTitle"
                                aria-hidden="true"
                            >{

                                }
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="editModalLongTitle">
                                                Edit Product
                                            </h5>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {editItem ? (
                                                <form id="form-create-product">
                                                    <div className="form-row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="small mb-3 mr-4">Name</label>
                                                                <input
                                                                    name="name"
                                                                    value={editItem.name}
                                                                    className="modal-product-input"
                                                                    type="text"
                                                                    onChange={(event) => this.isChange(event)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="small mb-1 mr-2">
                                                                    Full Description
                                                                </label>
                                                                <input
                                                                    name="fullDescription"
                                                                    value={editItem.description}
                                                                    className="modal-product-input"
                                                                    type="text"
                                                                    onChange={(event) => this.isChange(event)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="small mb-1 mr-2">
                                                                    Select categories
                                                                </label>
                                                                {
                                                                    console.log(editItemCate)
                                                                }
                                                                {
                                                                    console.log(categories)
                                                                }
                                                                <Select
                                                                    name="categories"
                                                                    closeMenuOnSelect={false}
                                                                    options={categories}
                                                                    defaultValue={editItemCate}
                                                                    isMulti
                                                                    getOptionLabel={(cat) => cat.name}
                                                                    getOptionValue={(cat) => cat.id}
                                                                    onChange={this.handleChange}
                                                                    options={categories}
                                                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                    placeholder="Select existed options"

                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="small mb-1 mr-2">
                                                                    Select image
                                                                </label>
                                                                <ImagePicker
                                                                    images={images.map((image, i) => ({
                                                                        src: getAvatar(image.mediaPath),
                                                                        value: image.id,
                                                                    }))}
                                                                    onPick={this.onPick}
                                                                    multiple
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="small mb-1 mr-2">
                                                                    Short Description
                                                                </label>
                                                                <input
                                                                    name="shortDescription"
                                                                    value={editItem.shortDescription}
                                                                    className="modal-product-input"
                                                                    type="text"
                                                                    onChange={(event) => this.isChange(event)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="small mb-1 mr-2">
                                                                    Properties
                                                                </label>
                                                                <div
                                                                    className="btn btn-primary btn-vy"
                                                                    onClick={() => {
                                                                        this.addProperties();
                                                                    }}
                                                                    style={{ marginRight: "20px" }}
                                                                >
                                                                    Add propeties
                                                                </div>
                                                            </div>

                                                            {editItem.productProperties.map((property, key) => {
                                                                return (
                                                                    <div className="form-group">
                                                                        <div className="col-md-4">
                                                                            <label className="small mb-1">
                                                                                Property name
                                                                            </label>
                                                                            <div
                                                                                className="btn btn-primary "
                                                                                onClick={() => {
                                                                                    this.addOption(key);
                                                                                }}
                                                                                style={{ marginRight: "20px" }}
                                                                            >
                                                                                Add Option
                                                                            </div>

                                                                            <input
                                                                                name="propertyName"
                                                                                value={property.propertyName}
                                                                                className="modal-product-input"
                                                                                type="text"
                                                                                onChange={(event) =>
                                                                                    this.isChangeProp(event, key)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="row">
                                                                                {property.options.map(
                                                                                    (option, optionKey) => {
                                                                                        return (
                                                                                            <>
                                                                                                <div className="col-md-6">
                                                                                                    <label className="small mb-1 mr-2">
                                                                                                        Option name
                                                                                                    </label>
                                                                                                    <input
                                                                                                        name="name"
                                                                                                        value={option.name}
                                                                                                        className="modal-product-input"
                                                                                                        type="text"
                                                                                                        onChange={(event) =>
                                                                                                            this.isChangeOption(
                                                                                                                event,
                                                                                                                key,
                                                                                                                optionKey
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                    <label className="small mb-1 mr-2">
                                                                                                        Option value
                                                                                                    </label>
                                                                                                    <input
                                                                                                        name="value"
                                                                                                        value={option.value}
                                                                                                        className="modal-product-input"
                                                                                                        type="text"
                                                                                                        onChange={(event) =>
                                                                                                            this.isChangeOption(
                                                                                                                event,
                                                                                                                key,
                                                                                                                optionKey
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                    <label className="small mb-1 mr-2">
                                                                                                        Option Quantity
                                                                                                    </label>
                                                                                                    <input
                                                                                                        name="subQuantity"
                                                                                                        value={option.subQuantity}
                                                                                                        className="modal-product-input"
                                                                                                        type="number"
                                                                                                        onChange={(event) =>
                                                                                                            this.isChangeOption(
                                                                                                                event,
                                                                                                                key,
                                                                                                                optionKey
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="col-md-6">
                                                                                                    <label className="small mb-1 mr-2">
                                                                                                        Option Price
                                                                                                    </label>
                                                                                                    <input
                                                                                                        name="subPrice"
                                                                                                        value={option.subPrice}
                                                                                                        className="modal-product-input"
                                                                                                        type="text"
                                                                                                        onChange={(event) =>
                                                                                                            this.isChangeOption(
                                                                                                                event,
                                                                                                                key,
                                                                                                                optionKey
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            </>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                            <div className="form-group">
                                                                <label className="small mb-1">Status</label>
                                                                <div>
                                                                    <input
                                                                        id="age1"
                                                                        name="status"
                                                                        value="ACTIVATE"
                                                                        type="radio"
                                                                        checked={editItem.status == "ACTIVATE"}
                                                                        onChange={(event) => this.isChange(event)}
                                                                    />
                                                                    <label for="age1">ACTIVATE</label>
                                                                </div>

                                                                <div>
                                                                    <input
                                                                        id="age2"
                                                                        name="status"
                                                                        value="DEACTIVATE"
                                                                        type="radio"
                                                                        checked={editItem.status == "DEACTIVATE"}
                                                                        onChange={(event) => this.isChange(event)}
                                                                    />
                                                                    <label for="age2">DEACTIVATE</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            ) : ""}</div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-dismiss="modal"
                                                onClick={() => this.addProduct()}
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-sm-12">
                                    <table
                                        className="table table-bordered dataTable"
                                        id="dataTable"
                                        width="100%"
                                        cellSpacing={0}
                                        role="grid"
                                        aria-describedby="dataTable_info"
                                        style={{ width: "100%" }}
                                    >
                                        <thead>
                                            <tr role="row">
                                                <th style={{ width: "100px" }}>No</th>
                                                <th style={{ width: "100px" }}>Username</th>
                                                <th style={{ width: "100px" }}>Image</th>
                                                <th style={{ width: "100px" }}>Content</th>
                                                <th style={{ width: "100px" }}>Status</th>
                                                <th
                                                    className="sorting"
                                                    tabIndex={0}
                                                    aria-controls="dataTable"
                                                    rowSpan={1}
                                                    colSpan={1}
                                                    aria-label="Start date: activate to sort column ascending"
                                                    style={{ width: "132px" }}
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{datas}</tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div>

                                <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    <ul className="pagination">
                                        <li className={first ? "paginate_button page-item previous disabled" : "paginate_button page-item previous"} id="dataTable_previous"><a aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                        {page.map(index => (
                                            <li onClick={() => { this.rerender(index, true) }} className={index == cPage ? "paginate_button page-item active" : "paginate_button page-item"} > <a aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{index + 1} </a> </li>
                                        ))}
                                        <li className={last ? "paginate_button page-item previous disabled" : "paginate_button page-item previous"} id="dataTable_previous"><a herf="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Last</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminProducts;
