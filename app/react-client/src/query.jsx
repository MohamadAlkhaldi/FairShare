//Sending different types of queries to retreive the family data stored in the ledger

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import {Redirect} from "react-router-dom";

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      argsQuery:""
      }
    this.onChange=this.onChange.bind(this);
    this.query=this.query.bind(this);
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
          items:data
        })
      }
    });
  }


   render () {
    if(this.props.loggedIn){
    return (
      <div className='container-fluid animatedMove'>
        <center>
        <div className="form-group ">
          <h3 style={{color:'#FF5733', fontFamily:'Merriweather'}}><strong>Search</strong></h3>
          <input type="text" className="form-control" id="argsQuery" placeholder="Enter family ID" name='argsQuery' onChange={this.onChange} /> 
        </div>
          
        <button className='btn btn-lg choiceButton' onClick={()=> this.query('lastAid',this.state.argsQuery)}><strong>Get the last aid info</strong></button>
        <br/>
        <button className='btn btn-lg choiceButton' onClick={()=> this.query('aidHistory',this.state.argsQuery)}><strong>Get aid history</strong></button>
        <br/>
        <button className='btn btn-lg choiceButton' onClick={()=> this.query('getFamilyInfo',this.state.argsQuery)}><strong>Get family info</strong></button>
        <br/>
        {this.state.items === 'failed' || this.state.items.length === 0 ? <h3 className='mssgErr w3-animate-zoom'>No such family</h3> : null}
        
        <div>{ this.state.items.rent !== undefined ?
          <div className="panel panel-success" style={{width:'400px'}}>
              <div className="panel-body">
                <p>familyId: {this.state.items.familyId}</p>
                <p>rent: {this.state.items.rent}</p>
                <p>income: {this.state.items.income}</p>
                <p>address: {this.state.items.address}</p>
                <p>familyMembers: {this.state.items.familyMembers}</p>
                <p>date: {this.state.items.date}</p>
              </div>
          </div> :  <List items={this.state.items}/> 
        }
        </div>
        </center>
      </div>
      )
    } else{
         return <Redirect to='/login'/>
      }
   }

}
export default Query;
