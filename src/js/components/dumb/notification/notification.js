import React, {Component, PropTypes} from "react";
import _ from "lodash";
import Log from "~/services/log";

const log = new Log("Component.Alert");

class Alert extends Component {

    static propTypes = {
        title: React.PropTypes.string,
        message: React.PropTypes.string,
        type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
        timeout: React.PropTypes.number.isRequired
    };

    // Declare default properties
    static defaultProps = {
        type: 'info',
        timeout: 2
    };

    constructor(props) {
        super(props);
        this.state = {
            id: _.uniqueId('alert'),
            timeLeft: this.props.timeout
        };
    }

    _tick() {
        log.debug("Tick");
        var self = this;
        this.timer = setTimeout(() => {
            if (this.state.timeLeft > 0) {
                this.setState({timeLeft: (this.state.timeLeft - 1)});
                this._tick();
            } else {
                this._stop();
            }
        }, 1000);
    }

    _stop() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        if (this.props.type === 'danger') {
            log.error(this.props.message);
        }
        else {
            log.debug("Message is " + this.props.message);
        }
        this._tick();
    }

    _hideAlert() {
        this.setState({timeLeft: -1});
    }

    _onMouseOver() {
        log.debug("Mouse over");
        this._stop();
        this.state.timeLeft = this.props.timeout;
    }

    _onMouseOut() {
        log.debug("Mouse out");
        this._tick();
    }

    render() {
        if (this.props.message && this.state.timeLeft > 0) {
            return (
                <div id={this.props.id}
                     className={ "alert-dismissible alert alert-" + this.props.type }
                     role="alert"
                     onMouseOver={e => this._onMouseOver()}
                     onMouseOut={e => this._onMouseOut()}>
                    <button type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={e => this._hideAlert()}>
                        <span aria-hidden="true">&times;</span>
                    </button>

                    <strong>{this.props.title}</strong> {this.props.message}
                </div>
            )
        }
        else {
            return ( <div/>)
        }
    }
}

export default Alert;
