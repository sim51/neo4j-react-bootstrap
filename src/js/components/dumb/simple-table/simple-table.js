import React, {Component, PropTypes} from "react";
import Log from "~/services/log";

const log = new Log("Component.SimpleTable");

class SimpleTable extends Component {

    static propTypes = {
        data: React.PropTypes.array,
        actions: React.PropTypes.array  // { icone, title, event}
    };

    constructor(props) {
        super(props);
    }

    _renderValue(value, index) {
    	if (value.constructor.name === 'Array') 
    		return ( <td key={index}> {value.join(', ')} </td> )
    	if (value.constructor.name === 'Integer') 
    		return ( <td key={index}> {value.toNumber()} </td> )

		return ( <td key={index}> {value} </td> )
    }

    render() {
    	if(this.props.data) {
    		if(this.props.data.length > 0) {
		    	return (
		    		<table className="table table-striped">
		    			<thead>
		    				<tr>
		    					<th></th> 
		    					{ Object.keys(this.props.data[0]).map( 
		    						(key, index) => {
		    							if (!key.startsWith('_')) {
	                            			return (<th key={index}>{key}</th> )
	                            		}
	                        		}
	                        	)}
	                        	<th>&nbsp;</th> 
		    				</tr>
		    			</thead>
		    			<tbody>
		    				{ this.props.data.map( 
		    					(row, index) => {
		    						return (
				    					<tr key={index} > 
				    						<th scope="row"> {index}</th> 
				    						{ Object.keys(row).map(
				    							(key, index) => {
				    								if (!key.startsWith('_')) {
				    									return this._renderValue(row[key], index);
			                            			}
			                        			}
			                        		)}	
			                        		<td>
			                        			{ this.props.actions.map(
					    							(item, index) => {
			                            				return (
			                            					<a key={index} 
			                            						onClick={item.event(row)} 
			                            						title={item.title}>
						                        				<i className={'fa fa-' + item.icone}></i> 
						                        			</a>
						                        		)
				                        			})
				                        		}	
			                        		</td> 
				    					</tr> 
				    				)
		    					}
		    				)} 
		    			</tbody>
					</table>
		    	)
		    } 
		    else {
		    	return ( <h3>Aucun résultat</h3> );
		    }
		}
		else {
			return null;
		}
    }
}

export default SimpleTable;