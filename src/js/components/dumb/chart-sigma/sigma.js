import React, {Component, PropTypes} from "react";
import {branch} from "baobab-react/higher-order";
import _ from "lodash";
import {mergeDeep} from "~/services/utils";
import * as action from "~/actions/sigma-events";
import "linkurious/src/sigma.core.js";
import "sigma/src/conrad.js";
import "linkurious/src/utils/sigma.utils.js";
import "linkurious/src/utils/sigma.polyfills.js";
import "linkurious/src/sigma.settings.js";
import "linkurious/src/classes/sigma.classes.dispatcher.js";
import "linkurious/src/classes/sigma.classes.configurable.js";
import "linkurious/src/classes/sigma.classes.graph.js";
import "linkurious/src/classes/sigma.classes.camera.js";
import "linkurious/src/classes/sigma.classes.quad.js";
import "linkurious/src/captors/sigma.captors.mouse.js";
import "linkurious/src/captors/sigma.captors.touch.js";
import "linkurious/src/renderers/sigma.renderers.def.js";
import "linkurious/src/renderers/sigma.renderers.svg.js";
import "linkurious/src/renderers/sigma.renderers.canvas.js";
import "linkurious/src/renderers/sigma.renderers.webgl.js";
import "linkurious/src/renderers/canvas/sigma.canvas.labels.def.js";
import "linkurious/src/renderers/canvas/sigma.canvas.hovers.def.js";
import "linkurious/src/renderers/canvas/sigma.canvas.nodes.def.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edges.def.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edges.curve.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edges.arrow.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edges.curvedArrow.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edgehovers.def.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edgehovers.curve.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edgehovers.arrow.js";
import "linkurious/src/renderers/canvas/sigma.canvas.edgehovers.curvedArrow.js";
import "linkurious/src/renderers/canvas/sigma.canvas.extremities.def.js";
import "linkurious/src/middlewares/sigma.middlewares.rescale.js";
import "linkurious/src/middlewares/sigma.middlewares.copy.js";
import "linkurious/src/misc/sigma.misc.animation.js";
import "linkurious/src/misc/sigma.misc.bindEvents.js";
import "linkurious/src/misc/sigma.misc.bindDOMEvents.js";
import "linkurious/src/misc/sigma.misc.drawHovers.js";
import "linkurious/plugins/sigma.renderers.edgeLabels/settings.js";
import "linkurious/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.def.js";
import "linkurious/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.def.js"
import "linkurious/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.curve.js"
import "linkurious/plugins/sigma.renderers.edgeLabels/sigma.canvas.edges.labels.curvedArrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/settings.js"
import "linkurious/plugins/sigma.renderers.linkurious/webgl/sigma.webgl.nodes.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/webgl/sigma.webgl.nodes.fast.js"
import "linkurious/plugins/sigma.renderers.linkurious/webgl/sigma.webgl.edges.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/webgl/sigma.webgl.edges.fast.js"
import "linkurious/plugins/sigma.renderers.linkurious/webgl/sigma.webgl.edges.arrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.labels.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.hovers.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.cross.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.diamond.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.equilateral.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.square.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.nodes.star.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.def.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.curve.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.arrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.curvedArrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.dotted.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.parallel.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edges.tapered.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.curve.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.arrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.curvedArrow.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.dotted.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.parallel.js"
import "linkurious/plugins/sigma.renderers.linkurious/canvas/sigma.canvas.edgehovers.tapered.js"
import "linkurious/plugins/sigma.plugins.animate/sigma.plugins.animate.js";
import "linkurious/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js";
import "linkurious/plugins/sigma.layouts.forceLink/worker.js";
import "linkurious/plugins/sigma.layouts.forceLink/supervisor.js";
import "./style.less";

/**
 * Create a Sigma graph.
 *
 * <Sigma />
 */
class ReactSigma extends Component {

    // Declare props types
    static propTypes = {
        graph: React.PropTypes.object.isRequired,
        style: React.PropTypes.object,
        defaultNodeStyle: React.PropTypes.object,
        defaultEdgeStyle: React.PropTypes.object,
        options: React.PropTypes.object,
        layout: React.PropTypes.object,
        events: React.PropTypes.object
    };

    // Declare default properties
    static defaultProps = {
        style: {labels: {}, edges: {}},
        defaultNodeStyle: {
            color: '#000000',
            size: '5',
        },
        defaultEdgeStyle: {
            color: '#000000',
            size: '0.1',
        },
        options: {},
        events: {},
        refresh: true
    };

    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.props.selectedNode;
        this.state = {id: _.uniqueId('sigma')};
        this.supportedEvents = [
            "clickStage",
            "doubleClickStage",
            "rightClickStage",
            "clickNode",
            "doubleClickNode",
            "rightClickNode",
            "overNode",
            "outNode",
            "clickEdge",
            "doubleClickEdge",
            "rightClickEdge",
            "overEdge",
            "outEdge"
        ];
    }

    /**
     * After mounting component, we init sigmaJS and populate it's graph model.
     */
    componentDidMount() {
        // init sigmaJS
        this._initSigmaJS();
        // register events
        this._registerSigmaEvent();
        // update graph
        this._updateSigmaGraph(this.props.graph, this.props.style);
        // start layout algo
        this._eventLayoutStart(true);
        // allow drag node
        this.dragListener = new sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
    }

    /**
     * If no config or data is changed, then no new render...
     */
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.refresh;
    }

    /**
     * After mounting on props change, we just populate/update sigmaJS graph model.
     */
    componentDidUpdate(prevProps, prevState) {
        // kill layout
        sigma.layouts.killForceLink();
        // update settings
        this.sigma.settings(this.props.options);
        // register events
        this._registerSigmaEvent();
        // update graph
        this._updateSigmaGraph(this.props.graph, this.props.style);
        // start layout algo
        this._eventLayoutStart(true);
        // allow drg node
        this.dragListener = new sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
    }

    /**
     * On unmount, we kill sigmaJS.
     */
    componentWillUnmount() {
        this.sigma.kill();
    }

    /**
     * Function to initialize an empty sigmaJS with some settings.
     * @private
     */
    _initSigmaJS() {
        // init sigmajs
        var container = document.getElementById(this.state.id);
        this.sigma = new sigma({
            id: this.state.id,
            graph: {nodes: [], edges: []},
            renderer: {
                container: container,
                type: 'canvas'
            },
            settings: this.props.options
        });
    }

    /**
     * Update sigmJS graph model.
     * @private
     */
    _updateSigmaGraph() {
        // init the new graph model
        var newSigmaGraph = {nodes: [], edges: []};

        // Transform all node to sigma nodes
        newSigmaGraph.nodes = this.props.graph.nodes.map((node) => {
            node['x'] = Math.random();
            node['y'] = Math.random();

            // If it already exist, we just take its coordinate
            var previousNode = this.sigma.graph.nodes(node.id);
            if (previousNode) {
                node['x'] = previousNode.x;
                node['y'] = previousNode.y;
            }

            return this._applyNodeStyle(node);
        });

        // Transform all edged to sigma edges
        newSigmaGraph.edges = this.props.graph.edges.map((edge) => {
            return this._applyEdgeStyle(edge);
        });

        this.sigma.graph.clear();
        this.sigma.graph.read(newSigmaGraph);
        this.sigma.refresh();
    }

    _registerSigmaEvent() {
        this.sigma.bind("hovers", (e) => {
            var object = JSON.parse(JSON.stringify(e.data.current));
            this.props.dispatch(action.setOverObject, object);
        });
    }

    /**
     * Apply style on a Map node.
     *
     * @param node {Map}
     * @return node {Map}
     * @private
     */
    _applyNodeStyle(node) {
        // Apply default style
        var tNode = node;
        tNode['label'] = node['id'];

        // Apply style per labels
        tNode['labels'].forEach(label => {
            let style = this.props.style.labels[label];

            for(var key in style ) {
                if (key === "label" && tNode['properties'])
                    tNode['label'] = tNode['properties'][style.label];
                else
                    tNode[key]= style[key];
            }

        });

        return tNode;
    }

    /**
     * Apply style on a Map edge.
     *
     * @param edge {Map}
     * @return edge {Map}
     * @private
     */
    _applyEdgeStyle(edge) {
        // Apply default style
        var tEdge = edge;
        edge['label'] = edge['type'];

        // Apply style per labels
        let style = this.props.style.edges[edge['type']];

        for(var key in style ) {
            if (key === "label" && tNode['properties'])
                tEdge['label'] = tEdge['properties'][style.label];
            else
                tEdge[key] = style[key];
        }

        return tEdge;
    }

    _eventZoomIn() {
        sigma.misc.animation.camera(
            this.sigma.cameras[0],
            {ratio: this.sigma.cameras[0].ratio / 1.5},
            {duration: 150}
        );
    }

    _eventZoomOut() {
        sigma.misc.animation.camera(
            this.sigma.cameras[0],
            {ratio: this.sigma.cameras[0].ratio * 1.5},
            {duration: 150}
        );
    }

    _eventRotateLeft() {
        sigma.misc.animation.camera(
            this.sigma.cameras[0],
            {angle : this.sigma.cameras[0].angle + 0.05},
            {duration: 150}
        );
    }

    _eventRotateRight() {
        sigma.misc.animation.camera(
            this.sigma.cameras[0],
            {angle : this.sigma.cameras[0].angle - 0.05},
            {duration: 150}
        );
    }

    _eventCenter() {
        sigma.misc.animation.camera(
            this.sigma.cameras[0],
            {x: 0, y: 0, angle: this.sigma.cameras[0].angle, ratio: 1.2},
            {duration: 150}
        );
    }

    _eventLayoutStart(autoStop){
        var config = _.clone(this.props.layout, true);
        if(autoStop) {
            config.autoStop = true;
        }
        else {
            config.autoStop = false;
        }
        this.layoutAlgo = sigma.layouts.startForceLink(this.sigma, config);
    }

    _eventLayoutStop(){
        sigma.layouts.stopForceLink();
    }

    /**
     * Render phase
     */
    render() {
        return (
            <div id={this.state.id} className={'sigma-container'}>
                <div className="graph-tools">

                    <button title="Resize graph to see all"
                            onClick={e => this._eventCenter()} >
                        <i className="fa fa-bullseye"></i>
                    </button>

                    <button title="Zoom in"
                            onClick={e => this._eventZoomIn()}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button title="Zoom out"
                            onClick={e => this._eventZoomOut()}>
                        <i className="fa fa-minus"></i>
                    </button>
                    <button title="Rotation left"
                            onClick={e => this._eventRotateLeft()}>
                        <i className="fa fa-rotate-left"></i>
                    </button>
                    <button title="Rotatoin right"
                            onClick={e => this._eventRotateRight()}>
                        <i className="fa fa-rotate-right"></i>
                    </button>
                    <button title="Start layout algo"
                            onClick={e => this._eventLayoutStart(false)}>
                        <i className="fa fa-play"></i>
                    </button>
                    <button title="Stop layout algo"
                            onClick={e => this._eventLayoutStop()}>
                        <i className="fa fa-stop"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default branch( { }, ReactSigma );
