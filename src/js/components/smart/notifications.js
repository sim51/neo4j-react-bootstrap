import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import Log from "~/services/log";
import Notification from "~/components/dumb/notification/notification";

const log = new Log("Component.smart.Notifications");

class Notifications extends Component {

    /**
     * Constructor.
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render phase
     */
    render() {

        return (
            <div id="notifications">
                {this.props.notifications.map(
                    (notification, index) => {
                        return <Notification key={index} title={notification.title} message={notification.message} type={notification.type} />
                    }
                )}
            </div>
        )
    }
}

export default branch(
    {
        notifications: ['notifications']
    },
    Notifications
);

