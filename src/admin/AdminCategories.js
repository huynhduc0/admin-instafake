import React, { Component , Fragment, Redirect } from 'react';
import axios from 'axios';
import Axios from 'axios';
import { notificationComponent, sosanh } from './../utils/notification';
import {GET_POST,POST_HANDLE, getAvatar} from '../constant'
import {header} from '../axios/header'
import _ from 'lodash';
import Skeleton from 'react-loading-skeleton';
class AdminCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrData: [],
            searchText: '',
            id: '',
            pagination:'',
            totalPages:'',
            last:true,
            first:true,
            cPage:0,
            page:[],
            isLoading: true,
            arrLoading:[]
        }
    }
    
    componentDidMount() {
        this.setState({isLoading:true})
        axios.get(GET_POST,{
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
                console.log(data.length)
                this.setState({page:page})
                this.setState({cPage:response.data.pageable.pageNumber})
                this.setState({isLoading:false})
                this.setState({arrLoading:Array(data.length).fill(1)})
            }).catch((err)=>{
                console.log(err);
                localStorage.clear();
                return <Redirect to='/login'  />
                
            });

    }
    rerender(page,reload){
        // if(this.state.cPage == page) return;
        this.setState({isLoading:reload})
        axios.get(GET_POST+`?page=${page}`,{
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
                this.setState({cPage:response.data.pageable.pageNumber})
                this.setState({page:page})
                this.setState({isLoading:false})
                if (reload) this.setState({arrLoading:Array(data.length).fill(1)})
            })
    }

    isChange = (event) => {
        console.log(event.target.value);


        this.setState({ [event.target.name]: event.target.value });

    };


  
    handleImageLoaded(key) {
        const {arrLoading} = this.state
        arrLoading[key] = 0;
        console.log(arrLoading)
        this.setState({ arrLoading: arrLoading });
    }


    editCategories = (value) => {
        this.setState({
            categoryName: value.categoryName, id: value.id

        })
    }
    handlePost(val){
        const { arr } = this.state
        // console.log(val)
        axios.post(POST_HANDLE,{
             "id":val.id
        },{
            headers:header,
        }).then(async response => {
            const data = response.data;
            console.log(data);
            arr.map( (rp,i)=>{
                if(val.id == rp.id){
                    arr[i] = data
                }
            });
            this.setState({arr:arr})
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

    render() {

        const { searchText, categoryName,totalPages,last,first,cPage,page,isLoading,arrLoading } = this.state;
        var result = [];
        this.state.arrData.forEach((item) => {
            if (item.description.indexOf(searchText) !== -1 || !searchText) {
                result.push(item);
            }
        })
        console.log(arrLoading)

        const datas = result.map((values, key) => {
            return (
                <tr key={key + 1} >

                    <td > {isLoading?(<Skeleton />):key + 1}</td>
                    <td>  {isLoading?(<Skeleton/>):values.description} </td>
                    <td> {isLoading?(<Skeleton height={100}/>):(<img src={getAvatar(values.author.avatar)} style={{ width: 80 }} />)} </td>
                    <td> <Fragment><a target="blank" href={MAIN_URL_DETAIL+values.id}><img hidden={arrLoading[key] || isLoading} onLoad={()=>{const {arrLoading} = this.state;arrLoading[key] = 0;this.setState({ arrLoading: arrLoading });}} src={getAvatar(values.medias[0].media_url)} style={{ width: 80 }} /></a>{arrLoading[key] || isLoading?(<Skeleton  width={80} height={80}/>):""}</Fragment></td>
                    <td>  {isLoading?(<Skeleton/>):values.author.fullname} </td>
                    <td>  {isLoading?(<Skeleton/>):values.author.username} </td>
                    <td>  {isLoading?(<Skeleton/>):values.author.roles.map((e)=> ( e.rolename+ '   ' ))} </td>
                    <td >{isLoading?(<Skeleton/>):!values.deactive?(<button  className="btn btn-success" onClick={() => this.handlePost(values)}>Active</button>):(<button  className="btn btn-sencondary" onClick={() => this.handlePost(values)}>Deactive</button>)}</td>
                    {/* <td style={{ textAlign: 'left' }}>{values.categoryName}</td> */}
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
                                    {/* <div className="btn btn-primary btn-vy" style={{ marginRight: '20px' }} data-toggle="modal" data-target="#exampleModalLong" >New Categories</div> */}
                                    <div id="dataTable_filter" className="row dataTables_filter">
                                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={(event) => this.isChange(event)} name="searchText" />
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
                                                            <label className="small mb-1">Category Name</label>
                                                            <input
                                                                name="categoryName"
                                                                value={categoryName}
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
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.saveCategories()}>Save changes</button>
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
                                                <th style={{ width: '100px' }} >Description</th>
                                                <th style={{ width: '100px' }} >UserAvatar</th>
                                                <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '195px' }} >PostImage</th>
                                                <th style={{ width: '100px' }} >Username</th>
                                                <th style={{ width: '100px' }} >FullName</th>
                                               
                                                <th style={{ width: '100px' }}>Role</th>

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
                                        <li className={first?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                                         {page.map(index =>(
                                             <li onClick={()=>{this.rerender(index, true)}} className={index == cPage ?"paginate_button page-item active" :"paginate_button page-item"} > <a aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">{index + 1} </a> </li>
                                         ))}
                                        <li className={last?"paginate_button page-item previous disabled":"paginate_button page-item previous"}   id="dataTable_previous"><a herf="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Last</a></li>
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