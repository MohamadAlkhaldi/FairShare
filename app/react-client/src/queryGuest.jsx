import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class QueryGuest extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      info: '',
      argsQuery:""
    }
    this.onChange=this.onChange.bind(this);
    this.query=this.query.bind(this);
  }

  onChange (e) {
    e.preventDefault()
    this.setState({
    [e.target.name]: e.target.value });
  }
  
  query(e) {
    e.preventDefault()
    $.ajax({
      type:'POST',
      url: '/query',
      data:{fcn:'searchByOrg',args:this.state.argsQuery}, 
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
      <form onSubmit={this.query}>
      <div className="form-group f">
        <h3 style={{color:'#FF5733'}}><strong>Search For Organization</strong></h3>
        <input type="text" className="form-control" id="argsQuery" placeholder="Enter organization name" name='argsQuery' onChange={this.onChange} /> 
       </div>
        
      <button className='btn btn-lg choiceButton' type='submit' ><strong>Get</strong></button>
      </form>
      <br/>
      <div>{ this.state.info !== 'failed' && this.state.info !== ''?
      <div className="panel panel-success" style={{width:'400px'}}>
            <div className="panel-heading f" style={{color:'#17503C '}}><h3>{this.state.argsQuery}</h3></div>
            <div className="panel-body">
            <p>Total Donations: {this.state.info.amountOfDonations}</p>
            <p>Number Of Donations: {this.state.info.numberOfDonations}</p>
            <p>Last Donation on: {this.state.info.lastDonationDate}</p>
            <p>Last Donation amount: {this.state.info.amountofLastDonation}</p>
            </div>
      </div> : null}
      <div>
        {this.state.info === 'failed' ? <h3 className="mssgErr w3-animate-zoom">No such organization</h3> : null}
      </div>
      </div>
      </center>
      
      </div>
      )
   }

}
export default QueryGuest;
