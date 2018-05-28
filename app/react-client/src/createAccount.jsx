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
     
      
      <div className='container-fluid'>
      
     <div className="container animatedMove">

      <h3 style={{color:'#17503C' , fontFamily:'Merriweather'}}><strong>Add New Account</strong></h3>
            
          <form>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} for="email">Username</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" name='username' onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} for="pwd">Password</label>
              <input type="password" className="form-control" id="pwd" placeholder="Enter password" name='password' onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label style={{color:'#FF5733', marginRight: '10px'}} for="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' onChange={this.onChange} />
            </div>
            <button className='btn btn-lg choiceButton' type="submit" onClick={()=> this.signUp(this.state.username,this.state.password)}><strong>Submit</strong></button>
      
          </form>
        </div>

      </div>
 

      )
   }

}
export default CreateAccount;
