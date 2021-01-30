import React, { Component } from 'react';

import { BrowserRouter } from "react-router-dom";
import Direction from './redirect/Direction';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        role: localStorage.getItem('role')
    }
}
  async componentDidMount() {
    const role = await localStorage.getItem('role')
    console.log(role)
    this.setState({
        role: role
    })
    // if(role != "admin") window.location.reload();
}
  render() {
    return (
      <BrowserRouter>
          <Direction role={this.state.role}/>
      </BrowserRouter>
    )
  }
}

export default App;