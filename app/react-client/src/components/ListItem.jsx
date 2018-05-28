import React from 'react';


const item ={
  color:'#000000',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};


class ListItem extends React.Component {
	 constructor(props){
        super(props);
    }
	render () {
  return(
	<div style={item}>
	<h4 > Orgnaization Name : {this.props.item.Value.organization} </h4>
	<h4 > Amount : {this.props.item.Value.amount} </h4>
	<h4 > Date: {this.props.item.Value.date} </h4>
	</div>
	)
}
}

export default ListItem;