import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";

import '../admin/admin.css';

import Header from '../component/Header';
import Home from '../component/Home';
import Sidebar from '../component/Sidebar';
import AdminCustomers from './../admin/AdminCustomers';
import AdminCategories from './../admin/AdminCategories';
import AdminOrders from './../admin/AdminOrders';

class AdminDirection extends Component {

    render() {
        return (
            <Fragment>
                <Route path="/admin" component={Sidebar} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Route path="/admin" component={Header} />
                        <div className="container-fluid" id="layoutSidenav_content">

                            <Route exact path="/admin/" component={Home} />
                            <Route path="/admin/admin-orders" component={AdminOrders} />
                            <Route exact path="/admin/admin-customers" component={AdminCustomers} />
                            <Route exact path="/admin/admin-categories" component={AdminCategories} />
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}
export default AdminDirection;