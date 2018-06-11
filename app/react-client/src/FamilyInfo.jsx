//here the organization can update family details in the ledger
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      familyId:"",
      rent:"",
      income:"",
      address:"",
      familyMembers:0,
      date: '',
      mssg:false
    }
    this.onChange=this.onChange.bind(this);
    this.invoke=this.invoke.bind(this);
  }

  onChange (e) {
    this.setState({
     [e.target.name]: e.target.value });
  }
  
 invoke(e) {
  e.preventDefault()
    $.ajax({
      type:'POST',
      url: '/invoke',
      data:{fcn:'updateFamily',args:[this.state.familyId,this.state.income,this.state.rent,this.state.address, this.state.familyMembers, this.state.date]}, 
      success: (data) => {
        console.log('worked')
        this.setState({
          mssg:true
        })
      }
    })
  }

   render () {
    if(this.props.loggedIn){
    return (
      <div className='container-fluid'>

       <div className="container animatedMove">
       <center>
            <h3 style={{color:'#17503C' , fontFamily:'Merriweather'}}><strong>Add New Family</strong></h3>
            <form>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >FamilyId</label>
                <input type="text" className="form-control" id="id" placeholder="Enter familyId" name='familyId' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >Rent</label>
                <input type="number" className="form-control" id="rent" placeholder="Enter rent" name='rent' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >Income</label>
                <input type="number" className="form-control" id="income" placeholder="Enter income" name='income' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" name='address' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >Date</label>
                <input type="date" className="form-control" id="date" placeholder="Enter date" name='Date' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} >Number of family members</label>
                <input type="number" className="form-control" id="familyMembers" placeholder="Enter family members" name='familyMembers' onChange={this.onChange} />
              </div>
              <button className='btn btn-lg choiceButton' type="submit" onClick={this.invoke}><strong>Submit</strong></button>
              {this.state.mssg ? <h3 className='mssg w3-animate-fading'>Family info updated!</h3> : null}
              
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
export default FamilyInfo;
