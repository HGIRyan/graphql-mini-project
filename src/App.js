import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { baseUrl } from './config'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: "",
      links: []
    }
    this.url = React.createRef();
    this.description = React.createRef()
  }
  async componentDidMount(){
    const query = `
      query {
        links {
          id
          url
          description
        }
      }
    `
    let res = await axios.post(baseUrl, {query: query})
    this.setState({
      links: res.data.data.links
    })
  }

async welcome(){
  const query = `
    query {
      welcome
    }
  `
  let res = await axios.post(baseUrl, {query: query})
  this.setState({
    message: res.data.data.welcome
  })
} 
async addLink(){
  const mutation = `
    mutation {
      addLink(url:"${this.url.current.value}" , description: "${this.description.current.value}") {
          id
          url
          description
      }
    }
  `;
  await axios.post(baseUrl, {query: mutation})
}

  render() {
    return (
      <div className="App">
        <h1>CLONE WARS, STAR WARS</h1>
        <button onClick={()=>{this.welcome()}}>WELCOME</button>
        <p>{this.state.message}</p>
        <p>URL:<input ref={this.url}/></p>
        <p>DESCRIPTION:<input ref={this.description}/></p>
        <button onClick={()=>{this.addLink()}}>Add New Link</button>
        
          {this.state.links.map(link => {
            return (<div key ={link.id}>
              <p>ID: {link.id}</p>
              <p>description: {link.description}</p>
              <p><a href={link.url}>URL</a> </p>
            </div>)
          })}
        
      </div>
    );
  }
}

export default App;
