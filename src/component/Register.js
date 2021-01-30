import React, { Component } from 'react'
import firebase from 'firebase'
import { NavLink } from 'react-router-dom';
import { notificationComponent } from './../utils/notification';
export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
        }
    }


    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(name, ", ", value)
        this.setState({
            [name]: value

        })
    }

    handleSubmit = (email, password) => {

        const { errors } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                
                await localStorage.setItem('token', token);
                await localStorage.setItem('username', email);

                this.setState({
                    error: []
                });

                notificationComponent('success', 'Chúc mừng bạn đã đăng ký thành công')

                if (res !== '') {
                   setTimeout(() => {
                    this.props.history.push('/')
                   }, 2000);
                }
            })
            .catch(err => {

                setTimeout(() => {
                    this.props.history.push('/')
                   }, 2000);
                console.log(errors);
                this.setState({
                    errors: [...this.state.errors, err.message]
                })
            })
       
    }


    render() {

        const { email, password, errors } = this.state;
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-9">
                        <div className="col-md-4 contact-info ftco-animate">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <h2 className="h4">Register</h2>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Email:</span> <a href="/cdn-cgi/l/email-protection#d2bbbcb4bd92abbda7a0a1bba6b7fcb1bdbf"><span className="__cf_email__" data-cfemail="cda4a3aba28db4a2b8bfbea4b9a8e3aea2a0">[email&nbsp;protected]</span></a></p>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p><span>Website:</span> <a href="#">yoursite.com</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col-md-6 ftco-animate">
                            <div className="contact-form appointment-form" >
                                <div className="form-group">
                                    <input type="text" onChange={(event) => this.isChange(event)} name="email" value={email} className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" onChange={(event) => this.isChange(event)} name="password" value={password} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    {errors.length > 0 ? errors.map(error => <p style={{ color: 'red', display: 'block' }}>{error}</p>) : null}
                                </div>

                                <div className="d-md-flex">
                                    <div className="form-group">
                                        <button onClick={() => this.handleSubmit(email, password)} type="button" className="btn btn-primary py-3 px-5" >Register</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <p style={{ color: '#fff', textAlign: 'center', display: 'block' }}>OR</p>
                                </div>
                                <div class="nav-item" style={{ textAlign: 'center' }}>
                                    <NavLink to="/login" >
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> LOGIN
                                            </NavLink>
                                </div>
                                <div class="nav-item" style={{ textAlign: 'center' }}>
                                    <NavLink to="/" >
                                        <i class="fa fa-home" aria-hidden="true"></i> RETURN HOMEPAGE
                                            </NavLink>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
