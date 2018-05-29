import React from 'react';
import ListItem from './ListItem.jsx';



class List extends React.Component {
	 constructor(props){
        super(props);
    }
	render () {
  return(<div style={{height: '200px', overflow: 'scroll'}}>
  			
  			<table className="table">
			  <thead className="thead-dark">
			    <tr>
			      <th scope="col">Id</th>
			      <th scope="col">Orgnaization</th>
			      <th scope="col">Amount</th>
			      <th scope="col">Date</th>
			    </tr>
			  </thead>
			  {Array.isArray(this.props.items) ?
			  <tbody >
    			{this.props.items.map((item) => <ListItem item={item}/>)}
    		  </tbody>
			
			: <tbody >
    			<ListItem item={{Value:this.props.items}}/>
    		  
    		  </tbody>
    		  }
			</table>
 		</div>
	)
	}
}
export default List;