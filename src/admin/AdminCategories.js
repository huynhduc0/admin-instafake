import React, { Component, Fragment, Redirect } from 'react';
import axios from 'axios';
import Axios from 'axios';
import { notificationComponent, sosanh } from './../utils/notification';
import { GET_POST, POST_HANDLE, MAIN_URL_DETAIL, PROFILE_URL_DETAIL, getAvatar } from '../constant'
import { header,formDataHeader } from '../axios/header'
import _ from 'lodash';
import Skeleton from 'react-loading-skeleton';
import { GET_CATEGORIES } from './../constant';
class AdminCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrData: [],
            searchText: '',
            id: '',
            pagination: '',
            totalPages: '',
            last: true,
            first: true,
            cPage: 0,
            page: [],
            isLoading: true,
            arrLoading: [],

            category: {}
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        console.log(header);
        axios.get(GET_CATEGORIES, {
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
    rerender(page, reload) {
        // if(this.state.cPage == page) return;
        this.setState({ isLoading: reload })
        axios.get(GET_POST + `?page=${page}`, {
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

    isChange = (event) => {

        
        console.log(event.target.name, event.target.files);
        event.target.name == 'searchText' && this.setState({ [event.target.name]: event.target.value });

        event.target.name !== 'searchText' && event.target.name !== 'image'   && this.setState({ category: {...this.state.category,  [event.target.name]: event.target.value } });

        if(event.target.name == 'image') {
            
            this.setState({ categoryImage:  event.target.files[0] });
        } 




    };



    handleImageLoaded(key) {
        const { arrLoading } = this.state
        arrLoading[key] = 0;
        console.log(arrLoading)
        this.setState({ arrLoading: arrLoading });
    }


    editCategories = (value) => {
        this.setState({
            categoryName: value.categoryName, id: value.id

        })
    }
    handlePost(val) {
        const { arr } = this.state
        // console.log(val)
        axios.post(POST_HANDLE, {
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
            this.rerender(this.state.cPage, false);
            notificationComponent('success', "Update done")
            // notificationComponent('error', err.response?err.response.message:err.status)
        });

    }


    addCategories = () => {
        const {category, categoryImage}=this.state
        // const {file} = 
      
        const formData = new FormData();
        // formData.append('file',categoryImage)
        formData.append('name', category.name)
        formData.append('status',category.status)
        formData.append('image', categoryImage)
        // console.log(data);

        axios.post(GET_CATEGORIES, formData, {
            headers: formDataHeader,
        }).then(async response => {
            const data = response.data;
            console.log(data);
           
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
            console.log(err);
            notificationComponent('success', "Update done")
            // notificationComponent('error', err.response?err.response.message:err.status)
        });
    }

    render() {

        // console.log(header);

        const { searchText, categoryName, totalPages, last, first, cPage, page, isLoading, arrLoading, category } = this.state;
        var result = [];
        this.state.arrData.forEach((item) => {
            if (item.name.indexOf(searchText) !== -1 || !searchText) {
                result.push(item);
            }
        })

        console.log(category);
        console.log(arrLoading)

        const datas = result.map((values, key) => {
            return (
                <tr key={key + 1} >

                    <td > {isLoading ? (<Skeleton />) : key + 1}</td>
                    <td>  {isLoading ? (<Skeleton />) : values.name} </td>
                    <td> {isLoading ? (<Skeleton height={100} />) : (<img src={getAvatar(values.image.mediaPath)} style={{ width: 80 }} />)} </td>
                    <td>
                        {values.status}
                    </td>
                    <td >
                        {
                            isLoading
                                ?
                                (<Skeleton />)
                                :
                                <><button className="btn btn-primary" onClick={() => this.handlePost(values)}>Edit</button>
                                    {!values.status
                                        ?
                                        <button className="btn btn-success" onClick={() => this.handlePost(values)}>ACTIVATE</button>
                                        :
                                        <button className="btn btn-warning" onClick={() => this.handlePost(values)}>DEACTIVATE</button>}</>
                        }

                    </td>
                </tr>)
        });

        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3 row" >
                    <h6 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'left' }}>  Posts Datatables</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">

                                    <div id="dataTable_filter" className="row dataTables_filter">

                                        <input className="col-lg-4" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="searchText" style={{ outline: 'none' }} />
                                        <div className="btn btn-primary btn-vy" style={{ marginRight: '20px' }} data-toggle="modal" data-target="#exampleModalLong" >New Categories</div>
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
                                                                value={category.name}
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

                                                        <div className="form-group">
                                                        <label className="small mb-1">Image</label>
                                                        <input type="file" name="image" value={category.image}  onChange={(event) => this.isChange(event)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.addCategories()}>Save changes</button>
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
                                                <th style={{ width: '100px' }} >Name</th>
                                                <th style={{ width: '100px' }} >Image</th>
                                                <th style={{ width: '100px' }} >Status</th>
                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '132px' }}>Action</th>
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
        )
    }
}
export default AdminCategories;