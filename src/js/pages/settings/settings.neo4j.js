import React, {Component, PropTypes} from 'react';
import {branch} from 'baobab-react/higher-order';
import {PageEnhancer} from '~/enhancer/page';
import * as action from '~/actions/settings';
import Settings from './settings';


const schema = {
    'type': 'object',
    'required': [
        'url',
        'login',
        'password'
    ],
    'properties': {

        'login': {
            'type': 'string',
            'title': 'Login'
        },
        'password': {
            'type': 'string',
            'title': 'Password'
        },
        'url': {
            'type': 'string',
            'format': 'uri',
            'title': 'URL',
            'pattern': 'bolt://.*'
        }
    }
};

const ui = {
    'url': {
        'ui:placeholder': 'bolt://localhost',
        'ui:help': 'Example: bolt://localhost'
    },
    'login': {
        'ui:placeholder': 'neo4j'
    },
    'password': {
        'ui:widget': 'password'
    }
};

class SettingsNeo4j extends Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired,
        data: React.PropTypes.object
    };

    saveToStore(data){
        this.props.dispatch( action.saveSettingsServer, data);
    }

    render() {
        return (
            <Settings page={this.props.page} schema={schema} ui={ui} data={this.props.data} save={ (data) => this.saveToStore(data)} />
        )
    }
}

export default PageEnhancer(
    branch(
        {
            data: ['settings', 'neo4j']
        },
        SettingsNeo4j
    )
);
