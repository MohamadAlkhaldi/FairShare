import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Prompt, IndexRoute, hashHistory } from "react-router-dom";

import List from './components/List.jsx';
import Sign from './signing.jsx'

const input={
  padding: '10px 10px 10px 10px',
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop:'20px',
  color:'black',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};

const button={
  padding:'5px',
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #000000',
  borderRadius: '10px',
  marginTop:'20px',
  fontSize:'20px',
  fontFamily: 'Lobster',
};

const p ={
  color:'#000000',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = { 
      
      new:"",
      redirect: false,
      data:'',
      items: [],
      item: {},
      argsQuery:""

    }
    this.onChange=this.onChange.bind(this);
    this.redirect=this.redirect.bind(this);
       this.query=this.query.bind(this);
    this.queryAll=this.queryAll.bind(this);
  }


  onChange (e) {
    this.setState({

     [e.target.name]: e.target.value });
    
  }

  query(fcn,args) {
    $.ajax({
      type:'POST',
      url: '/query',
      data:{fcn:fcn,args:args}, 
      success: (data) => {
        console.log(data)
        this.setState({
          item:data
        })
      }
    });


  }


 

  queryAll(fcn,args) {
    $.ajax({
      type:'POST',
      url: '/getAll',
      data:{fcn:fcn,args:args}, 
      success: (data) => {
        console.log(data)
        this.setState({
          items:data
        })
      }
    });
  }

  redirect(data){
    this.setState({redirect : true, data:data})
  }
//


  render () {
    const { redirect } = this.state;
       if (redirect) {
         return <Redirect to={this.state.data}/>;
       }
    this.state.new = this.props.username
    if(this.state.new === "guest"){
      console.log(this.state.new)
    return (
      <div>

      
      <p style={p}>last Aid for :</p><input style={input} name='argsQuery' onChange={this.onChange} />
      
      <button  style={button} onClick={()=> this.query('searchByOrg',this.state.argsQuery)}>get one aid </button>
      <button  style={button} onClick={()=> this.queryAll('aidHistory',this.state.argsQuery)}>get history aid </button>

      <p style={p}>{this.state.item.amount}</p>
      <List items={this.state.items}/>

      </div>
      )}else if(this.state.new === "admin"){
      return (
      <div>

      <button  style={button} onClick={()=> this.redirect('/createAccount')}>Create Account</button>
      <button  style={button} onClick={()=> this.redirect('/query')}>Query</button>
      <button  style={button} onClick={()=> this.redirect('/invoke')}>Invoke</button>
      

      </div>
      )} else {
        return (
      <div>
      <button  style={button} onClick={()=> this.redirect('/query')}>Query</button>
      <button  style={button} onClick={()=> this.redirect('/invoke')}>Invoke</button>
      

      </div>
      )
      }

  }
}

export default App;