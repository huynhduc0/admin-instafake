import axios from 'axios';
import React, { Component } from 'react';
import { header } from './../axios/header';
import {GET_USER, getAvatar } from './../constant';
import  Skeleton  from 'react-loading-skeleton';
class AdminUser extends Component {
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
        axios.get(GET_USER, {
            headers: header
        })
            .then((response) => {
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

        var result = [];
        arrData.forEach((item) => {
            if (item.username.indexOf(searchText) !== -1 || !searchText) {
                result.push(item);
            }
        })

        const datas = arrData.map((values, key) => {
            return (
                <tr key={key + 1} >

                    <td > {isLoading ? (<Skeleton />) : key + 1}</td>
                    <td> {isLoading ? <Skeleton height={100} /> : <img src={getAvatar(values.avatar)} style={{ width: 80 }} />} </td>
                    <td>  {isLoading ? (<Skeleton />) :<> 
                    <p><b>Username</b>: {values.username?values.username: 'null'}</p>
                    <p><b>Fullname</b>: {values.fullname?values.fullname:'null'}</p>
                    <p><b>Email</b>: {values.email?values.email:'null'}</p>
                    <p><b>Phone</b>: {values.phoneNumber?values.phoneNumber:'null'}</p>
                    </> }</td>
                    <td >
                        {
                            isLoading
                                ?
                                (<Skeleton />)
                                :
                                    !values.status
                                        ?
                                        <button className="btn btn-success" onClick={() => this.handlePost(values)}>Active</button>
                                        :
                                        <button className="btn btn-warning" onClick={() => this.handlePost(values)}>Deactive</button>
                                    
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
                                <div className="col-sm-12">
                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                        <thead>
                                            <tr role="row">
                                                <th style={{ width: '100px' }} >No</th>
                                                <th style={{ width: '100px' }} >Image</th>
                                                <th style={{ width: '100px' }} >Info</th>
                                                <th style={{ width: '100px' }} >Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datas}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminUser;