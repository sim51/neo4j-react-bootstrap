import React, {Component, PropTypes} from "react";
import Header from "~/pages/layout/header";
import View from "~/pages/layout/view";
import Notifications from '~/components/smart/notifications';
//import "bootstrap/dist/js/npm.js"

/**
 * Main component that create the application.
 */
class App extends Component {

    render() {
        return (
            <div>
                <Header />
                <View />
                <Notifications />
            </div>
        )
    }

}

export default App
