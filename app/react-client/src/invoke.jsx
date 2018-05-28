import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";

class Invoke extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      ORG:"",
      FamilyID:"",
      Amount:"",
      Date:""
    }
    this.onChange=this.onChange.bind(this);
    this.invoke=this.invoke.bind(this);

  }

  onChange (e) {
 
    this.setState({

     [e.target.name]: e.target.value });
    
  }
  
 invoke(fcn,org,famid,amount,date) {
    $.ajax({
      type:'POST',
      url: '/invoke',
      data:{fcn:fcn,args:[famid,org,amount,date]}, 
      success: (data) => {
        this.setState({
          items:data
        })
      }
    });


  }

   render () {
    if(this.props.loggedIn){
    return (
      <div className='container-fluid'>

       <div className="container animatedMove">
       <center>
            <h3 style={{color:'#17503C' , fontFamily:'Merriweather'}}><strong>Add New Aid</strong></h3>
            <form>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="email">Organization</label>
                <input type="text" className="form-control" id="email" placeholder="Enter email" name='ORG' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="pwd">FamilyID</label>
                <input type="text" className="form-control" id="pwd" placeholder="Enter FamilyID" name='FamilyID' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="email">Amount</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Amount" name='Amount' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="email">Date</label>
                <input type="date" className="form-control" id="email" placeholder="Enter email" name='Date' onChange={this.onChange} />
              </div>
              <button className='btn btn-lg choiceButton' type="submit" onClick={()=> this.invoke('newAid',this.state.ORG,this.state.FamilyID,this.state.Amount,this.state.Date)}><strong>Submit</strong></button>
      
            </form>
            </center>
          </div>

      </div>
      )
     } else{
         return <Redirect to='/login'/>
      }
   }

}
export default Invoke;
