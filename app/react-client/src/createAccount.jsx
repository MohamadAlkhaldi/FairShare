import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
  signUp(e){
    e.preventDefault();
    $.ajax({
      type:'POST',
      url: '/signUp',
      data:{username:this.state.username,password:this.state.password},
      success: () => {
        //this.setState({redirect : true})
    }
})
  }

   render () {
    return (
     
      
      <div className='container-fluid'>
      
     <div className="container animatedMove">

      <h3 style={{color:'#17503C' , fontFamily:'Merriweather'}}><strong>Add New Account</strong></h3>
            
          <form>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter username" name='username' onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} htmlFor="pwd">Password</label>
              <input type="password" className="form-control" id="pwd" placeholder="Enter password" name='password' onChange={this.onChange} />
            </div>
            <button className='btn btn-lg choiceButton' type="submit" onClick={this.signUp}><strong>Submit</strong></button>
      
          </form>
        </div>

      </div>
 

      )
   }

}
export default CreateAccount;
