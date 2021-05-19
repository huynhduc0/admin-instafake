import axios from 'axios';
import React, { Component, Link } from 'react'
import { GET_REPORT_POST, POST_HANDLE_POST, MAIN_URL_DETAIL, PROFILE_URL_DETAIL, getAvatar } from '../constant'
import { Fragment } from 'react';
import { notificationComponent } from './../utils/notification';
import _ from 'lodash'
import Skeleton from 'react-loading-skeleton';
import { GET_ORDERS } from './../constant';
import { header } from './../axios/header';
export default class AdminOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrData: [],
            searchText: '',

            arrayOrder: []
        }
    }

    isChange = (event) => {
        this.setState({ searchText: event.target.value.toUpperCase() });
    };

    componentDidMount() {
        axios.get(GET_ORDERS, {
            headers: header
        })
            .then((response) => {
                if (response.data) {
                    const data = response.data.content;

                    console.log(data);
                    this.setState({ arrData: data });
                    // this.setState({pagination: response.data.pageable})
                    // this.setState({totalPages:response.data.totalPages})
                    // this.setState({last:response.data.last})
                    // this.setState({first:response.data.first})
                    // var page = _.range( this.state.totalPages )
                    // console.log(response)
                    // this.setState({cPage:response.data.pageable.pageNumber})
                    // this.setState({page:page})
                    // this.setState({isLoading:false})
                    // this.setState({arrLoading:Array(data.length).fill(1)})

                    // this.setState({ arr: data });    
                }

            })
    }

    displayOrderDetails = (arrayOrder) => {
        // let item = Object.values(arrayOrder)
        this.setState({
            OrderDetails: arrayOrder
        })

        console.log(arrayOrder);

    }



    displayForwardingAddr = (reportDetail) => {
        // console.log(addressDefault);
        this.setState({
            reportDetails: reportDetail,
        })
        // console.log(forwardingAddress);
    }
    checkCritr(crit, str) {
        var flag = false
        crit.map((ct) => {
            // console.log(ct.reportCriterias.criteriaName.toUpperCase().indexOf(str)
            if (ct.reportCriterias.criteriaName.toUpperCase().indexOf(str) != -1)
                flag = true;
        })
        return flag;
    }


    getArrayOrder = (array) => {
        let item = array.map((value, key) => {
            return (
                <tr>
                    <td>
                        {key + 1}
                    </td>
                    <td>
                        <img src={value.url} style={{ width: 80 }} />
                    </td>
                    <td>
                        {value.productName}
                    </td>
                    <td>
                        {value.count}
                    </td>
                    <td>
                        {value.price}
                    </td>
                </tr>
            )
        })
        return item;
    }
    handlePost(val) {
        const { arr } = this.state
        console.log(val)
        axios.post(POST_HANDLE_POST, {
            "id": val.id
        }, {
            headers: header,

        }).then(async response => {
            const data = response.data;
            console.log(data);
            arr.map((rp, i) => {
                if (val.id == rp.id) {
                    arr[i] = data
                }
            });
            this.setState({ arr: arr })
            notificationComponent('success', "Update done")
        }).catch(err => {
            notificationComponent('error', err.response ? err.response.message : err.status)
        });
    }
    rerender(page, reload) {
        if (this.state.cPage == page) return;
        this.setState({ isLoading: true })
        axios.get(GET_REPORT_POST + `?page=${page}`, {
            headers: header
        })
            .then((response) => {
                const data = response.data.content;
                this.setState({ arrData: data });
                this.setState({ pagination: response.data.pageable })
                this.setState({ totalPages: response.data.totalPages })
                this.setState({ last: response.data.last })
                this.setState({ first: response.data.first })
                var page = _.range(this.state.totalPages)
                console.log(response)
                this.setState({ cPage: response.data.pageable.pageNumber })
                this.setState({ page: page })
                this.setState({ isLoading: false })
                if (reload) this.setState({ arrLoading: Array(data.length).fill(1) })
            })
    }

    showOrderDetails = (arrayOrder) => {
        console.log(arrayOrder);
        this.setState({
            arrayOrder: arrayOrder
        });
    }

    render() {

        const { arrData, search, reportDetails, totalPages, last, first, cPage, page, isLoading, arrLoading, OrderDetails, arrayOrder } = this.state;
        console.log(arrData)
        var result = [];
        // arrData.forEach((item) => {
        //     let item1 = item.posts.description;
        //     let fullname = item.posts.author.fullname
        //     let username = item.posts.author.username
        //     console.log(this.checkCritr(item.reportDetails,this.state.searchText))
        //     if (this.checkCritr(item.reportDetails,this.state.searchText)||item1.indexOf(this.state.searchText) !== -1 ||username.indexOf(this.state.searchText) !== -1  ||fullname.indexOf(this.state.searchText) !== -1 || !this.state.searchText) {
        //         result.push(item);
        //     }
        // })
        const datas = arrData.map((values, key) => {
            console.log(values);
            return (
                <tr key={key} >

                    <td >{isLoading ? (<Skeleton />) : key + 1}</td>
                    <td >{isLoading ? (<Skeleton />) : <>
                        <p><b>Email</b> : {values.user.email ? values.user.email : 'null'}</p>
                        <p><b>Fullname</b> : {values.user.fullname ? values.user.fullname : "undefined"}</p>
                        <p><b>Phone</b> : {values.user.phoneNumber ? values.user.phoneNumber : "undefined"}</p>
                    </>}</td>

                    <td >{isLoading ? (<Skeleton />) : <>
                        <p><b>Name</b> : {values.shippingAddress.firstName ? values.shippingAddress.firstName : 'null'} {values.shippingAddress.lastName ? values.shippingAddress.lastName : 'null'}</p>
                        <p><b>Address</b> : {values.shippingAddress.street ? values.shippingAddress.street : "undefined"}, {values.shippingAddress.city ? values.shippingAddress.city : "undefined"}, {values.shippingAddress.country ? values.shippingAddress.country : "undefined"}</p>
                        {/* <p><b>Phone</b> : {values.user.phoneNumber ? values.user.phoneNumber : "undefined"}</p> */}
                    </>}</td>


                    <td >{isLoading ? (<Skeleton />) :
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong1" onClick={() => this.showOrderDetails(values.orderDetails)}>Details</button>}</td>
                    <td>{values.fee}</td>
                </tr>)
        });
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>Report Datatables</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className=" col-sm-12 col-md-6">
                                    <div id="dataTable_filter" className="row dataTables_filter">

                                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="search" />
                                    </div>
                                </div>
                            </div>


                            <div className="modal fade modal-product" id="exampleModalLong1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle1" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="forwardingAddress">List Products</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p>No</p>
                                                <p>Image</p>
                                                <p>Product Name</p>
                                                <p>Price</p>
                                            </div>
                                            {arrayOrder.map((value, key) => {
                                                return (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <p>{key + 1}</p>
                                                        <img src={getAvatar(value.product.medias[0].mediaPath)} style={{ width: 80 }} />
                                                        <p>{value.product.name}</p>
                                                        <p>{value.productOption.subPrice}</p>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal fade modal-product bd-example-modal-lg" id="exampleModalLong2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle2" aria-hidden="true">
                                <div className="modal-dialog modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="forwardingAddress">Forwarding Address</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputCategory">Product</label>
                                                    <div>
                                                        <table>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Image</th>
                                                                <th>Name</th>
                                                                <th>Count</th>
                                                                <th>Price</th>
                                                            </tr>
                                                            {/* {OrderDetails ? this.getArrayOrder(OrderDetails) : null} */}
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                        <thead>
                                            <tr role="row">
                                                <th style={{ width: '100px' }} >No</th>
                                                <th style={{ width: '100px' }} >User</th>
                                                <th style={{ width: '100px' }} >Shipping Address</th>
                                                <th style={{ width: '100px' }} >Order details</th>
                                                <th style={{ width: '100px' }} >Fee</th>
                                                {/* <th style={{ width: '100px' }} >Num of report</th>
                                                <th style={{ width: '100px' }} >Report Status</th>
                                                <th style={{ width: '100px' }} >Action</th> */}
                                                {/* <th style={{ width: '100px' }} >#</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div>

                                <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    <ul className="pagination">
                                        <li className={first ? "paginate_button page-item previous disabled" : "paginate_button page-item previous"} id="dataTable_previous"><a aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                        {/* {page.map(index =>(
                                             <li onClick={()=>{this.rerender(index, true)}} className={index == cPage ?"paginate_button page-item active" :"paginate_button page-item"} > <a aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{index + 1} </a> </li>
                                         ))} */}
                                        <li className={last ? "paginate_button page-item previous disabled" : "paginate_button page-item previous"} id="dataTable_previous"><a herf="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Last</a></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
