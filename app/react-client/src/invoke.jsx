import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";

class Invoke extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      FamilyID:"",
      Amount:"",
      Date:"",
      familyinfo:true,
      Document: '',
      mssg:false
    }
    this.onChange=this.onChange.bind(this);
    this.invoke=this.invoke.bind(this);
    this.uploadDocument=this.uploadDocument.bind(this);
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
      data:{fcn:'newAid',args:[this.state.FamilyID,this.state.Amount,this.state.Date,this.state.Document]}, 
      success: (data) => {
        console.log(data)
        this.setState({
          mssg:true
        })
      }
    })
    
    $.ajax({
      type:'POST',
      url: '/query',
      data:{fcn:'getFamilyInfo',args:this.state.FamilyID}, 
      success: (data) => {
        if(data === 'failed'){
        this.setState({
          familyinfo:false
        })
      }
      }
    });
  }


 uploadDocument (Doc) {
    var that=this;
    var file = Doc.target.files[0]
    var fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = function (e) {
       that.setState({
        Document: e.target.result }) 
       console.log("zzzzz",that.state.Document)
  }
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
                <label style={{color:'#FF5733', marginRight: '10px'}} for="pwd">FamilyID</label>
                <input type="text" className="form-control" id="pwd" placeholder="Enter FamilyID" name='FamilyID' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="Amount">Amount</label>
                <input type="text" className="form-control" id="Amount" placeholder="Enter Amount" name='Amount' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="Date">Date</label>
                <input type="date" className="form-control" id="Date" placeholder="Enter Date" name='Date' onChange={this.onChange} />
              </div>
              <div className="form-group">
                <label style={{color:'#FF5733', marginRight: '10px'}} for="Document">Add a proof</label>
                <input type='file' name='Document' id='Document' onChange={this.uploadDocument} />
              </div>
              <button className='btn btn-lg choiceButton' type="submit" onClick={this.invoke}><strong>Submit</strong></button>
              {this.state.mssg ? <h3 className='mssg w3-animate-fading'>Aid added!</h3> : null}
              
              <div>
              {!this.state.familyinfo ? <a className='btn btn-lg choiceButton' href='#/familyInfo'><strong>This family's info is not available, update it here please!</strong></a> : null}
              </div>
      
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
