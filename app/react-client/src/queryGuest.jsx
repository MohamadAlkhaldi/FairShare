import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class QueryGuest extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      info: {amountOfDonations: 5432, amountofLastDonation: 32, docType: "user", lastDonationDate: "33/44/44", numberOfDonations: 20},
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
          info:data
        })
      }
    });
  }

   render () {
    return (
      <div className='container-fluid animatedMove'>
      <center>
      
      <div className="form-group f">
        <h3 style={{color:'#FF5733'}}><strong>Search For Organization</strong></h3>
        <input type="text" className="form-control" id="argsQuery" placeholder="Enter organization name" name='argsQuery' onChange={this.onChange} /> 
       </div>
        
      <button className='btn btn-lg choiceButton' onClick={()=> this.query('searchByOrg',this.state.argsQuery)}><strong>Get</strong></button>
      <br/>
      <div>{ this.state.info !== '' ?
      <div className="panel panel-success" style={{width:'400px'}}>
            <div className="panel-heading f" style={{color:'#17503C '}}><h3>{this.state.argsQuery}Ahed Group</h3></div>
            <div className="panel-body">
            <p>Total Donations: {this.state.info.amountOfDonations}</p>
            <p>Number Of Donations: {this.state.info.numberOfDonations}</p>
            <p>Last Donation on: {this.state.info.lastDonationDate}</p>
            <p>Last Donation amount: {this.state.info.amountofLastDonation}</p>
            </div>
      </div> : null}
      </div>
      </center>
      
      </div>
      )
   }

}
export default QueryGuest;
