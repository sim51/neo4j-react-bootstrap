import React, {Component, PropTypes} from "react";
import {branch} from 'baobab-react/higher-order';
import Neo4jService from "~/services/neo4j/neo4j";
import Log from "~/services/log";
import _ from "lodash";

const log = new Log("Field.autocomplete");

class TextCypherComplete extends Component {

    constructor(props) {
      super(props);
      this.neo4j = new Neo4jService(this.props.neo4j.url, this.props.neo4j.login, this.props.neo4j.password);
      this.id =  _.uniqueId('list');
      this.state = {suggest:[]};
    }

    _eventOnChange(value) {
      log.debug("Autocomplete onchange");
      this.neo4j.cypher( this.props.options.query, { 'value':value}).then(result => {
        log.debug("Query result is :" + JSON.stringify(result));
          this.setState({
            suggest: result
          });

       });
      this.props.onChange(value);
    }

    render() {
      return (
        <div>
          <input
                  className="form-control"
                  readOnly={this.props.readonly}
                  autoFocus={this.props.autofocus}
                  value={typeof this.props.value === "undefined" ? "" : this.props.value}
                  onChange={(event) => {log.debug("Autocomplete onchange"); this._eventOnChange(event.target.value)}}
                  list={this.id}/>

          <datalist id={this.id}>
            {this.state.suggest.map((row, index) => {
              return <option key={index} value={row.value} />
            })}
          </datalist>

        </div>
      )
    }

}

export default  branch(  {  neo4j: ['settings', 'neo4j'] }, TextCypherComplete );
