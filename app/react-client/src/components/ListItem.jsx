import React from 'react';


class ListItem extends React.Component {
	constructor(props){
        super(props);
        this.state = {
         showDoc:true
       }
   this.onChange=this.onChange.bind(this); 
    }

  onChange (e) {
    this.setState({
    showDoc:!this.state.showDoc });
  }

	render () {
    if(this.state.showDoc){
      return(
  <tr>
      <th scope="row">{this.props.item.Value.familyId}</th>
      <td>{this.props.item.Value.organization}</td>
      <td>{this.props.item.Value.amount}</td>
      <td>{this.props.item.Value.date}</td>
      <td onClick={this.onChange}>{this.props.item.Value.doc?"Proof":""}</td>
    </tr>
  
  )
    }
    else{
      return(
    <img  src={this.props.item.Value.doc} onClick={this.onChange}/>

)
    }
  
}
}
//<img  src={this.props.item.Value.doc}/>

export default ListItem;

// <div style={item}>
// 	<h4 > Orgnaization Name : {this.props.item.Value.organization} </h4>
// 	<h4 > Amount : {this.props.item.Value.amount} </h4>
// 	<h4 > Date: {this.props.item.Value.date} </h4>
// 	</div>