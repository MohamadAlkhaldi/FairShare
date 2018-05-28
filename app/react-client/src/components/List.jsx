import React from 'react';
import ListItem from './ListItem.jsx';



class List extends React.Component {
	 constructor(props){
        super(props);
    }
	render () {
  return(<div>
    		{this.props.items.map((item) => <ListItem item={item}/>)}
 		</div>
	)
	}
}
export default List;