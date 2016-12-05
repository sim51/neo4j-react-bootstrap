import React, {Component, PropTypes} from "react";
import {PageEnhancer} from "~/enhancer/page";
import {branch} from 'baobab-react/higher-order';
import Form from "react-jsonschema-form";
import Neo4jService from "~/services/neo4j/neo4j";
import configPerson from "./config";
import SimpleTable from "~/components/dumb/simple-table/simple-table";
import TextCypherComplete  from "~/components/dumb/jsonschema-custom/text-cypher-complete";
import Log from "~/services/log";
import * as notification from '~/actions/notifications';
import './style.less';
import * as action from './action';

// logger
const log = new Log("Component.PersonSearch");

const widgets = {
  textCypherComplete: TextCypherComplete
};

class PersonSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { data: null};
        this.neo4j = new Neo4jService(this.props.neo4j.url, this.props.neo4j.login, this.props.neo4j.password);
        this.simpleTableActions = [
            {
                icone:'eye',
                title:'See detail view',
                event: (e) => {
                    return (ev) => {window.location.hash = '/person/' + e._id;};
                }
            }
        ];

    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.page.path === nextProps.page.path ) {

            if(nextProps.search) {

                // Create a notification
                this.props.dispatch( notification.pushNotification, {
                    title: "Success: ",
                    message: "Executing search query",
                    type : "info"
                });

                // Run the query
                this.neo4j.cypher(configPerson.searchQuery, nextProps.search)
                    .then(result => {
                        log.debug("Query result is :" + JSON.stringify(result));
                        this.setState({
                           data: result
                        });

                    })
                    .catch( error => {
                        this.props.dispatch( notification.pushNotification, {
                            title: "Error: ",
                            message: "The following error occured during query execution => \n" + JSON.stringify(error),
                            type : "danger"
                        });
                    });
            }
        }
    }

    saveFormToStore(data){
        this.props.dispatch( action.saveSearchData, data.formData);
    }

    render() {
        return (
            <main id="fraude-home" className="container-fluid">
                <aside className="col-md-4 sidebar">
                    <h2>Search</h2>
                    <Form schema={configPerson.searchSchema}
                          uiSchema={configPerson.searchUi}
                          liveValidate={true}
                          onSubmit={ data => this.saveFormToStore(data) }
                          formData={this.props.search}
                          className={""}
                          widgets={widgets}/>
                </aside>
                <section className="col-md-8 main">
                    <h2>Search result</h2>
                    <SimpleTable data={this.state.data} actions={this.simpleTableActions}/>
                </section>
            </main>
        )
    }

}

export default PageEnhancer(
    branch(
        {
            neo4j: ['settings', 'neo4j'],
            search: ['person', 'search']
        }, PersonSearch )
);
