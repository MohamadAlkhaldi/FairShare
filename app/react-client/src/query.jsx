import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import {Redirect} from "react-router-dom";

class Query extends React.Component {
  constructor(props) {

// familyId : 'a',
//               income : 444,
//               rent : 444,
//               address : 'Amman',
//               familyMembers : 5,
//               date : '33/33/33'

// [{"TxId":"47fc9e2261c78d3c467538938c75df45f1e1c3b93260f5baba6a65a2af978d11","Timestamp":{"seconds":{"low":1527434601,"high":0,"unsigned":false},"nanos":949996971},"IsDelete":"false","Value":{"docType":"aid","familyId":"a","amount":100,"organization":"organization"}},{"TxId":"55fa7c2613f787b2ab39e146348773dcb556698be1843f0d1f0ce9321d89d99f","Timestamp":{"seconds":{"low":1527434938,"high":0,"unsigned":false},"nanos":104000000},"IsDelete":"false","Value":{"docType":"aid","familyId":"a","amount":"12312312312","organization":"1","date":"2018-05-03"}}]

// {amount: "500", date: "2018-05-09", docType: "aid", familyId: "a", organization: "1"}

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
        
        // if(!Array.isArray(data) && data.TxId){
        //   this.setState({
        //     items:[{Value:data}]
        //   })
        // } else {
        //     items:data
        // }
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
