import React from 'react';


class ListItem extends React.Component {
	 constructor(props){
        super(props);
    }
	render () {
  return(
	
	<tr>
      <th scope="row">{this.props.item.Value.familyId}</th>
      <td>{this.props.item.Value.organization}</td>
      <td>{this.props.item.Value.amount}</td>
      <td>{this.props.item.Value.date}</td>
    </tr>
	
	)
}
}

export default ListItem;

// <div style={item}>
// 	<h4 > Orgnaization Name : {this.props.item.Value.organization} </h4>
// 	<h4 > Amount : {this.props.item.Value.amount} </h4>
// 	<h4 > Date: {this.props.item.Value.date} </h4>
// 	</div>