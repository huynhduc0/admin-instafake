import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";
import AdminDirection from './AdminDirection';
import Login from './../component/Login';



export default class Direction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: localStorage.getItem('role')
        }
    }


    async componentDidMount() {

        const role = await localStorage.getItem('role')
        await console.log(role)
        this.setState({
            role: role
        })
        if(!role){
            const role = await localStorage.getItem('role')
        await console.log(role)
        this.setState({
            role: role
        })
        }
        // if(role != "admin") window.location.reload();

    }



    render() {
        const { role } = this.state;
        console.log(role)
        return (
            <Fragment>
                {/* {role=='admin'&&<Route path="/admin" component={AdminDirection} />}
                <Route  path="/" component={HomepageDirection} /> */}

                { role ?
                    <Route path="/admin" component={AdminDirection} />
                    :
                    <Route path="/login" component={Login} />
                }
            </Fragment>
        )
    }
}


