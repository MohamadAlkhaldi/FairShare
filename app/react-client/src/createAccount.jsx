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
class CreateAccount extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      username:'',
      password:'',
      email:''
    }
    this.onChange=this.onChange.bind(this);
    this.signUp=this.signUp.bind(this);

  }

  onChange (e) {
 
    this.setState({

     [e.target.name]: e.target.value });
    
  }
  signUp(username,password){
    console.log(username, password);
    $.ajax({
      type:'POST',
      url: '/signUp',
      data:{username:username,password:password},
      success: () => {
        //this.setState({redirect : true})
    }
})
  }

   render () {
    return (
     
      
      <div>
      
      <p style={p}>USER NAME:</p><input style={input} name='username' onChange={this.onChange} />
      <p style={p} >PASSWORD:</p><input style={input} name='password' onChange={this.onChange} />
      <p style={p} >EMAIL:</p><input style={input} name='email' onChange={this.onChange} />
      <button  style={button} onClick={()=> this.signUp(this.state.username,this.state.password)}>Create Account</button>
     

      </div>
 

      )
   }

}
export default CreateAccount;
