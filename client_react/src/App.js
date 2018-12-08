import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    fetchedValue: '',
  }
  componentDidMount() {
    const fetchUrl = 'http://localhost:5000';
    axios(fetchUrl)
      .then((res) => {
        this.setState({
          fetchedValue: res.data.value,
        })
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { fetchedValue } = this.state;
    return (
      <div>
        <label>{fetchedValue}</label>
      </div>
    );
  }
}

export default App;
