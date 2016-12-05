import React, {Component, PropTypes} from "react";
import {PageEnhancer} from "~/enhancer/page";
import {branch} from 'baobab-react/higher-order';
import ReactSigma from "~/components/dumb/chart-sigma/sigma";
import GraphDisplayObject from "~/components/smart/graph-display-object/graph-display-object";
import Neo4jService from "~/services/neo4j/neo4j";
import configPerson from "./config";
import sigmaGraphStyle from "~/config/sigma-graph-style";
import Log from "~/services/log";
import * as notification from '~/actions/notifications';
import './style.less';

// logger
const log = new Log("Component.PersonDetail");

class PersonDetail extends Component {

  constructor(props) {
    super(props);
    this.neo4j = new Neo4jService(this.props.neo4j.url, this.props.neo4j.login, this.props.neo4j.password);
    this.state = {
      data: null,
      graph: {
        nodes:[],
        edges: []
      }
    };
  }

  componentDidMount() {
    this.propsToState();
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps);
  }

  propsToState(props = this.props) {
    var params = {
      id: parseInt(props.personId)
    };

    // Run the query
    this.neo4j.graph(configPerson.detailGraphQuery, params)
    .then(result => {
      //log.debug("Query result is :" + JSON.stringify(result));
      this.setState({
        graph: result
      });

    })
    .catch( error => {
      throw error;
      this.props.dispatch( notification.pushNotification, {
        title: "Error: ",
        message: "The following error occured during query execution => \n" + JSON.stringify(error),
        type : "danger"
      });
    });

    // Run the query
    this.neo4j.cypher(configPerson.detailViewQuery, params)
    .then(result => {
      log.debug("Query result is :" + JSON.stringify(result));
      this.setState({
        detail: result
      });

    });
  }

  _renderValue(key, value, index) {
    if (value && value.constructor.name === 'Array')
    return ( <li key={index}><strong>{key} :</strong> {value.join(', ')} </li> )
    if (value && value.constructor.name === 'Integer')
    return ( <li key={index}><strong>{key} :</strong> {value.toNumber()} </li> )
    return ( <li key={index}><strong>{key} :</strong> {value} </li> )
  }

  renderProfil() {
    if(this.state.detail) {
      return (
        <div>
          <h2>{this.state.detail[0].ID}</h2>
          <ul className="list-unstyled">
            { Object.keys(this.state.detail[0]).map(
              (key, index) => {
                return this._renderValue(key, this.state.detail[0][key], index);
              }
            )}
          </ul>
        </div>
      )
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <main id="graph" className="container-fluid">
        <section className="col-md-3">
          {this.renderProfil()}
        </section>
        <section className="col-md-9 main">
          <ReactSigma options={this.props.sigmaOptions}
            graph={this.state.graph}
            layout={this.props.layoutOptions}
            style={sigmaGraphStyle}
            refresh={true}>
          </ReactSigma>
          <GraphDisplayObject />
        </section>
      </main>
    )
  }

}

export default PageEnhancer(
  branch(
    {
      personId: ['person', 'id'],
      neo4j: ['settings', 'neo4j'],
      sigmaOptions: ['settings', 'sigma'],
      layoutOptions: ['settings', 'sigmaLayout']
    }, PersonDetail )
  );
