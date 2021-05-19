import axios from 'axios';
import React, { Component } from 'react';
import  Skeleton  from 'react-loading-skeleton';
import { header } from '../axios/header';
import {GET_Media, getAvatar } from './../constant';
class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {

            arrData: [],
            searchText: '',

            isLoading: true,
        }
    }

    isChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });


    };


    componentDidMount() {
        this.setState({ isLoading: true })
        console.log(header);
        axios.get(GET_Media, {
            headers: header
        })
            .then((response) => {
                console.log('ahihihihih', response);
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
                this.setState({ isLoading: false })
                // this.setState({arrLoading:Array(data.length).fill(1)})
            }).catch((err) => {
                console.log(err);
                // localStorage.clear();
                // return <Redirect to='/login'  />

            });

    }


    render() {

        const {isLoading, searchText, arrData}=this.state;


        const datas = arrData.map((values, key) => {
            return (
                <div className="col-2" style={{position:'relative'}}  id="dropdown-admin-media" >
                   { isLoading ?
                    <Skeleton height={100} /> 
                    :
                     <img src={getAvatar(values.mediaPath)} style={{ width: '100%' }} />
                     }

                     <div id="dropdown-admin-media-content" style={{background: 'rgba(0,0,0,0.5)',margin: '15px',position: 'absolute', top: '0', left: '0',bottom: '0', right: '0',  textAlign: 'center'}}>
                        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <button className="btn btn-warning">
                             Edit
                         </button>
                         <button className="btn btn-danger">
                             Delete
                         </button>
                        </div>
                     </div>
                   
                </div>)
        });



        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3 row" >
                    <div className="btn btn-primary btn-vy" style={{ marginRight: '20px' }} data-toggle="modal" data-target="#exampleModalLong" >New Media</div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">

                                    <div id="dataTable_filter" className="row dataTables_filter">
                                        
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
                                            <form id="form-create-product">
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1 mr-2">Name</label>
                                                            <input
                                                                name="name"
                                                                // value=name
                                                                className="modal-product-input"
                                                                type="text"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="small mb-1">Status</label>
                                                            <div>
                                                            
                                                            <input
                                                                id="age1"
                                                                name="status"
                                                                value="active"
                                                                type="radio"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                            <label for="age1">active</label>
                                                            </div>
                                                            

                                                            <div>
                                                            
                                                            <input
                                                                id="age2"
                                                                name="status"
                                                                value="deactive"
                                                                type="radio"
                                                                onChange={(event) => this.isChange(event)}
                                                            />
                                                            <label for="age2">deactive</label>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                        <label className="small mb-1">Image</label>
                                                        <input type="file"
                                                         name="image"
                                                        //   value={category.image}  
                                                          onChange={(event) => this.isChange(event)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" 
                                            // onClick={() => this.addCategories()}
                                            >Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-sm-12">
                                    {datas}
                                    
                                </div>
                            </div>
                            {/* <div className="row">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Media;