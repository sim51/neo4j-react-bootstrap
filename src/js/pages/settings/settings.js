import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import Form from "react-jsonschema-form";
import {PageEnhancer} from "~/enhancer/page";
import * as sitemap from "~/actions/sitemap";
import Menu from "~/pages/layout/menu";
import Log from "~/services/log";

/**
 * Module logger.
 */
const log = new Log("Component.Settings");

class Settings extends Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired,
        schema: React.PropTypes.object.isRequired,
        ui: React.PropTypes.object.isRequired,
        data: React.PropTypes.object,
        save: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    _renderSettingMenu() {
        // Retrieve the setting page object
        log.debug("Current page is " + JSON.stringify(this.props.page));
        var settingPageView = this.props.page.state.view.split(".");
        settingPageView.pop();
        var settingPage = sitemap.getPageFromView(settingPageView.join('.'));
        log.debug("Settings page is " + JSON.stringify(settingPage));

        return (
            <aside className="col-md-2 sidebar">
                <Menu pages={ settingPage.pages } styleClass="nav navbar-nav"/>
            </aside>
        )
    }

    _renderForm() {
        return (
            <section className="col-md-10 main">
                <h1 className="page-header">{this.props.page.title}</h1>
                <Form schema={this.props.schema}
                      uiSchema={this.props.ui}
                      liveValidate={true}
                      onSubmit={ data => this.props.save(data.formData) }
                      formData={this.props.data}
                      className={"horizontal" }/>
            </section>
        )
    }

    render() {
        return (
            <main className="container-fluid">
                {this._renderSettingMenu()}
                {this._renderForm()}
            </main>
        )
    }
}

export default Settings;
