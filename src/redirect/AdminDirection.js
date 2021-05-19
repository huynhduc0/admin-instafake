import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";

import '../admin/admin.css';

import Header from '../component/Header';
import Home from '../component/Home';
import Sidebar from '../component/Sidebar';
import AdminCategories from './../admin/AdminCategories';
import AdminOrders from './../admin/AdminOrders';
import AdminProducts from '../admin/AdminProducts';
import Media from './../admin/Media';
import AdminUser from '../admin/AdminUser';

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
                            <Route path="/admin/admin-users" component={AdminUser} />
                            <Route path="/admin/admin-products" component={AdminProducts} />
                            <Route path="/admin/admin-media" component={Media} />
                            <Route exact path="/admin/admin-categories" component={AdminCategories} />
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}
export default AdminDirection;