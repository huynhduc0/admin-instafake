import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import {header} from '../axios/header'
import {GET_USER,getAvatar,PROFILE_URL_DETAIL} from '../constant'
import _ from 'lodash'
class AdminCustomers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrData: [],
            searchText: '',

            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: '',

            forwardingAddress: {
                name: '',
                phone: '',
                street_address: '',
                city: '',
                number_home: '',
            },

            id: '',
            pagination:'',
            totalPages:'',
            last:true,
            first:true,
            cPage:0,
            page:[]

        }
    }

    componentDidMount() {
        console.log(header)
        Axios.get(GET_USER,{
            headers:header
        })
            .then((response) => {
                const data = response.data.content;
                this.setState({ arrData: data });
                this.setState({pagination: response.data.pageable})
                this.setState({totalPages:response.data.totalPages})
                this.setState({last:response.data.last})
                this.setState({first:response.data.first})
                var page = _.range( this.state.totalPages )
                console.log(response)
                this.setState({page:page})

            })
        console.log(this.state.arrData);

    }

    isChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    show = (val) => {

        this.setState({
            forwardingAddress: {
                name: val.name,
                phone: val.phone,
                number_home: val.number_home,
                street_address: val.street_address,
                city: val.city
            }
        })
    }


    setRole = (id, role) => {
        this.setState({
            id: id,
            role: role
        })
    }


    render() {

        const {forwardingAddress, arrData, role, totalPages,last,first,cPage,page} = this.state;

        var result = [];
        arrData.forEach((item) => {
            let item1 = item.username;
            if (item1.indexOf(this.state.searchText) !== -1 || !this.state.searchText) {
                result.push(item);
            }
        })

        const data = result.map((values, key) => {
            return (<tr key={key}>
                <td>{key + 1}</td>
                <td> <img src={getAvatar(values.avatar)} style={{ width: '80%' }} /> </td>
                <td>  {values.fullname} </td>
                <td>  <a target="blank" href={PROFILE_URL_DETAIL+values.id}>{values.username} </a></td>
                <td>  <NavLink to="/admin/admin-orders" style={{color: '#000'}}>{values.uid}</NavLink> </td>
                {/* <td>  <button onClick={() => this.show(values)} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Forwarding Address</button></td> */}
                <td><button onClick={() => this.setRole(values.id, values.role)} data-toggle="modal" data-target="#exampleModalLong1" className="btn  btn-primary" >{values.roles !== undefined ? values.roles[0].rolename : 'Edit'}</button>
                 </td>
                 <td><button className="btn btn-warning" onClick={() => this.delete(values.id)}>Deactivate</button>
                 </td>

            </tr>
            )
        })
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>Customers Datatables</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                        <div id="dataTable_filter" className="row dataTables_filter">

                            <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="search" />
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                        <thead>
                                            <tr role="row">

                                                <th>No</th>
                                                <th style={{ width: '100px' }}>Image</th>
                                                <th>Full name</th>
                                                <th>Username</th>
                                                <th>Details</th>
                                                {/* <th>created</th> */}
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="modal fade" id="exampleModalLong1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Role</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form id="form-create-product">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1">User's Role</label>
                                                            <input
                                                                name="role"
                                                                value={role}
                                                                className="form-control py-4 modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.editRole()}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade modal-product" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                        <div className="modal-body">
                                            <h4 className="modal-title" >Details</h4>

                                            <h4 className="modal-title" >Name: {forwardingAddress.name}</h4>
                                            <h4 className="modal-title" >Phone: {forwardingAddress.phone}</h4>
                                            <h4 className="modal-title" >Address: {forwardingAddress.number_home} {forwardingAddress.street_address}, {forwardingAddress.city}</h4>
                                        </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div>

                                <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                    <ul className="pagination">
                                        <li className={first?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a href="https://www.facebook.com/hongomyvy1999" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                         {page.map(index =>(
                                             <li onClick={()=>{this.rerender(index)}} className={index == cPage ?"paginate_button page-item active" :"paginate_button page-item"} aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{index + 1} </li>
                                         ))}
                                        <li className={last?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a href="https://www.facebook.com/hongomyvy1999" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Last</a></li>
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
export default AdminCustomers;