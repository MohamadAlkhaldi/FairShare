import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
    return (
     
      
      <div>
      
       <p style={p}>ORG:</p><input style={input} name='ORG' onChange={this.onChange} />
      <p style={p} >FamilyID:</p><input style={input} name='FamilyID' onChange={this.onChange} />
      <p style={p} >Amount:</p><input style={input} name='Amount' onChange={this.onChange} />
      <p style={p} >Date:</p><input style={input} name='Date' type="date" onChange={this.onChange} />
      <button  style={button} onClick={()=> this.invoke('newAid',this.state.ORG,this.state.FamilyID,this.state.Amount,this.state.Date)}>submit the last aid </button>
     

      </div>
 

      )
   }

}
export default Invoke;
