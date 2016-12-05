// Import application style
import "~/../less/main.less";
import "font-awesome-webpack";

// Javascript import
import React from "react";
import ReactDOM from "react-dom";
import {root} from "baobab-react/higher-order";
import tree from "~/store";
import App from "~/pages/app";
import router from "~/router";

// Create the react application
const RootedApp = root(tree, App);
ReactDOM.render(<RootedApp />, document.getElementById('root'));
