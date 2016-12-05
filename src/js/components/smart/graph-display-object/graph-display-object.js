import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import Log from "~/services/log";
import "./style.less";

const log = new Log("Component.dumb.DisplayObject");

class GraphDisplayObject extends Component {

    /**
     * Constructor.
     * @param props
     */
    constructor(props) {
        super(props);
    }

    _renderProperty(key, value) {
        log.debug("Property " + key + " has constructor => " + value.constructor.name);
        var displayValue = value;
        switch (value.constructor.name) {
            case 'Integer': 
                displayValue = value.toNumber();
                break;
            case 'String': 
                displayValue = value;
                break;
            default:
                displayValue = JSON.stringify(value);
        }
        return (
            <li key={key}><strong>{key} :</strong> {displayValue}</li>
        )
    }

    _renderNodeOrEdge(obj, index) {
        if(obj && obj['properties']) {
            var title = "";
            if(obj.labels)
                title = obj.labels.join(', ');
            else 
                title = obj.type;

            return (
                 <div key={index}>
                    <h4>{title} <span>&lt;{obj.id}&gt;</span></h4>
                    <ul className="list-unstyled" key={index}>
                        {Object.keys(obj['properties']).map( (key, index) => {
                                return this._renderProperty(key, obj['properties'][key])
                        })}
                    </ul>
                 </div>
            )
        }
    }

    /**
     * Render phase.
     */
    render() {
        if(this.props.object && (this.props.object.nodes.length > 0 || this.props.object.edges.length > 0)) {
            return (
                 <div id="display-object">
                        { this.props.object.nodes.map((node, index) => {
                            return this._renderNodeOrEdge(node, index)
                        })}
                        { this.props.object.edges.map((edge, index) => {
                            return this._renderNodeOrEdge(edge, index)
                        })}
                 </div>
            )
        }
        else {
            return null;
        }
    }

}

export default branch(
    {
        object: ['data', 'over']
    },
    GraphDisplayObject
);
