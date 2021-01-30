import React, { Component,Redirect } from 'react'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { LOGIN_URL } from '../constant'
import { notification } from 'antd';
import { notificationComponent } from './../utils/notification';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: [],

            count: 0,
            arrayOrder: []
        }
    }

    // getCount() {
    //     var count = localStorage.getItem('count')
    //     if (count == null) {
    //         return 0;
    //     }
    //     else {
    //         return parseInt(count);
    //     }
    // }


    // componentDidMount() {
    //     let array = JSON.parse(localStorage.getItem('arrayOrder')) || [];
    //     let count = this.getCount();
    //     this.setState({
    //         arrayOrder: array,
    //         count: count
    //     })

    //     console.log('login array order: ', this.state.arrayOrder);
    //     console.log('login count: ', this.state.count);
    // }


    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // console.log(name, ", ", value)
        this.setState({
            [name]: value

        })
    }



    handleSubmit = (username, password) => {

        let arrayOrderSmall;
        const { errors } = this.state;
        Axios.post(LOGIN_URL,{
            "username":username,
            "password":password
        }).then(async response => {
            const data = await response.data;
            await console.log(data)
            await localStorage.setItem('token', data.token);
            await localStorage.setItem('role',"admin")
            await localStorage.setItem('username', data.user.username);
            await localStorage.setItem('user', JSON.stringify(data));
            await notificationComponent('success', "Login success")
            await setTimeout(() => {
                this.props.history.push('/admin')
                window.location.reload();
                // return <Redirect to="/admin"/>
            }, 500);
        }).catch(err => {
            this.setState({
                errors: [... this.state.errors, "USERNAME OR PASSWORD IS INCORRECT"]
            })
        });
        // firebase.auth().signInWithusernameAndPassword(username, password)
        //     //everything is almost exactly the same as the function above
        //     .then(async res => {
        //         const token = await Object.entries(res.user)[5][1].b
        //         //set token to localStorage 
        //         await localStorage.setItem('token', token);
        //         await localStorage.setItem('username', username);

        //         // console.log(this.state.currentUser);

        //         // console.log(res.user.uid);
        //         // this.setState({
        //         //     errors: []
        //         // })


        //         // await datas.ref('users/' + res.user.uid).on('value', function (snapshot) {
        //         //     snapshot.forEach(function (childSnapshot) {

        //         //         // if (childSnapshot.val().uid == uid) {
        //         //         //     // hehe = childSnapshot.val()
        //         //         //     countCart=childSnapshot.val().count;
        //         //         //     arrayOrderCart = childSnapshot.val().arrayOrder
        //         //         // }

        //         //         console.log(childSnapshot.val());
        //         //         arrayOrderSmall = childSnapshot.val().arrayOrder;



        //         //     });
        //         // });

        //         // if (arrayOrderSmall !== undefined) {
        //         //     arrayOrderSmall = Object.values(arrayOrderSmall)
        //         //     // console.log(childSnapshot.val().arrayOrder);
        //         //     arrayOrderSmall.map((value, key) => {
        //         //         this.setState({ arrayOrder: [...this.state.arrayOrder, value] })
        //         //     })
        //         // }


        //         notificationComponent('success', "Login success")

        //         if (res !== '') {
        //             setTimeout(() => {
        //                 this.props.history.push('/')
        //             }, 2000);
        //         }
        //     })
        //     .catch(err => {
        //         // setTimeout(() => {
        //         //     this.props.history.push('/')
        //         // }, 2000);
        //         // this.notification('error', err)
        //         this.setState({
        //             errors: [...this.state.errors, err.message]
        //         })
        //     })





    }



    render() {


        // console.log(this.props.history);

        const { username, password, errors } = this.state;
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-6">
                        <div className="col-md-2 contact-info ftco-animate " />
                        <div className="col-md-8 contact-info ftco-animate ">
                            <h3 className="mb-3">Login</h3>
                            <div className="appointment-form">
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="username"
                                            name="username"
                                            value={username}
                                            onChange={(event) => this.isChange(event)}
                                        />
                                    </div>
                                    <div className="form-group ml-md-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Pasword"
                                            onChange={(event) => this.isChange(event)}
                                            name="password"
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    {errors.length > 0 ? errors.map(error => <p style={{ color: 'red' }}>{error}</p>) : null}
                                </div>
                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <button onClick={() => this.handleSubmit(username, password)} type="button" className="btn btn-primary py-3 px-4">Login</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <p style={{ color: '#fff', textAlign: 'center', display: 'block' }}>OR</p>
                                </div>

                                <div class="nav-item" style={{ textAlign: 'center' }}>
                                    <NavLink to="/register" >
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> REGISTER
                                            </NavLink>
                                </div>
                                <div class="nav-item" style={{ textAlign: 'center' }}>
                                    <NavLink to="/" >
                                        <i class="fa fa-home" aria-hidden="true"></i> RETURN HOMEPAGE
                                            </NavLink>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-2 contact-info ftco-animate " />
                    </div>
                </div>
            </section>
        )
    }
}
