import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import * as sitemap from "~/actions/sitemap";
import Log from "~/services/log";

const log = new Log("Component.view");

class View extends Component {

    render() {
        log.debug("Props view is " +  this.props.view);
        var page = sitemap.getPageFromView(this.props.view);
        var MyView = page.component;
        return (
            <MyView page={ page }/>
        )
    }
}

export default branch({view: ['view']}, View);

