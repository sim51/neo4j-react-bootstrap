import React from 'react';

/**
 * Component wrapper that update the html title tag.
 *
 * @param ComposedComponent
 * @constructor
 */
export var PageEnhancer = ComposedComponent => class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = this.props.page.title;
    }

    render() {
        return <ComposedComponent {...this.props} {...this.state} />;
    }
};
