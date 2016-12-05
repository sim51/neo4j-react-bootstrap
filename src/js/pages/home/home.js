import React, {Component, PropTypes} from "react";
import {PageEnhancer} from "~/enhancer/page";
import {branch} from "baobab-react/higher-order";
import "./home.less"

class Home extends Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main id="page-home" className="container-fluid">
                <section className="col-md-6 col-md-offset-3 main">
                    <h1>{ this.props.page.title }</h1>
                </section>
            </main>
        )
    }
}

export default PageEnhancer(
    branch( { }, Home )
);
