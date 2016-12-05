import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import Menu from "~/pages/layout/menu";
import Log from "~/services/log";
import * as sitemap from "~/actions/sitemap";

const log = new Log("Component.menuItem");

class MenuItem extends Component {

    static propTypes = {
        item: React.PropTypes.shape({
            name: React.PropTypes.string,
            title: React.PropTypes.string,
            path: React.PropTypes.string,
            component:  React.PropTypes.func
        }).isRequired,

    };

    constructor(props) {
        super(props);
        this.state = {
            expand : false 
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = { expand: false };
    }

    /**
     * 
     * @private
     */
    _bindItemMenuClick(e) {
        this.props.dispatch( sitemap.navigateTo, this.props.item);
    }

    /**
     * 
     * @private
     */
    _bindDropMenuClick(e) {
        if(this.state.expand) {
            this.setState( {expand: false});
        }
        else {
            this.setState( {expand: true});
        }
    }

    /**
     * Determinate if the current menu item is active or not.
     * This is done with the hash page.
     * @private
     * @returns {string}
     */
    _isMenuItemActive() {
        log.debug("Page hash is " + sitemap.getPageHashFromView(this.props.view) + "\n\t window Hash is " + window.location.hash);
        var activeClass = "";

        // if we are in the page or we are in the path of the display page
        var page = sitemap.getPageHashFromView(this.props.item.state.view);
        if(window.location.hash.includes(page)) {
            var pageHash = '#' + page;
            if (window.location.hash.startsWith(pageHash)) {
                activeClass = "active";
            }
        }

        return activeClass
    }

    _isDropdownMenuOpen() {
        var menuClass = "dropdown-menu";
        if(this.state.expand) {
            menuClass += " visible"
        }
        return menuClass;
    }

    /**
     * Render subpages of this pages
     * @private
     */
    _renderDropDownPage() {
        if(this.props.item.pages && this.props.item.expand) {
            return (
                <li className={ this._isMenuItemActive() + " dropdown"}>
                    <a title={ this.props.item.title } onClick={ e => this._bindDropMenuClick(e) }>
                        { this.props.item.name } 
                        <span className="caret"></span>
                    </a>
                    <Menu pages={ this.props.item.pages } styleClass={ this._isDropdownMenuOpen() }/>
                </li>
            )
        }
    }

    /**
     * Render a menu item page
     * @private
     */
    _renderPage() {
        return (
            <li className={ this._isMenuItemActive() }>
                <a onClick={ e => this._bindItemMenuClick(e) }
                   title={ this.props.item.title }>
                    { this.props.item.name }
                </a>
            </li>
        )
    }

    _renderMenuComponent() {
        var Component = this.props.item.component;
        return ( <Component />)
    }

    /**
     * Render phase
     */
    render() {
        if(this.props.item['path']) {
            if(this.props.item.pages && this.props.item.expand) {
                return this._renderDropDownPage();
            }
            else {
                return this._renderPage();
            }
        }
        else {
            return this._renderMenuComponent();
        }
    }
}

export default branch({view: ['view']}, MenuItem);
