import React, {Component, PropTypes} from "react";

/**
 * Create the logo image with a link that go to the main view.
 */
class Logo extends Component {

    static propTypes = {
        url: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    };

    /**
     * Goto main view when clicking on logo.
     */
    handleLogoClick() {
        window.location.hash = "/";
    }

    /**
     * Render phase
     */
    render() {
        return (
            <a className="brand" onClick={e => this.handleLogoClick(e)} title={ this.props.name }>
                <img className="baseline" src={ this.props.url } alt={ this.props.name }/>
            </a>
        )
    }
}

export default Logo;
