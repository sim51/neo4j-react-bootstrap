import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import Logo from "~/pages/layout/logo";
import Menu from "~/pages/layout/menu";
import configSitemap from "~/config/sitemap";
import configApplication from "~/config/application";

class Header extends Component {

    render() {
        return (
            <header className="navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Logo name={ configApplication.name } url={ configApplication.logo }/>
                    </div>
                    <nav id="navbar" className="nav navbar-nav navbar-right">
                        <Menu pages={ configSitemap.pages } styleClass="nav navbar-nav"/>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;
