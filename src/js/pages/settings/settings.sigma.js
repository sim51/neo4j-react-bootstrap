import React, {Component, PropTypes} from 'react';
import {branch} from 'baobab-react/higher-order';
import {PageEnhancer} from '~/enhancer/page';
import * as action from '~/actions/settings';
import Settings from './settings';

const schema = {
        type: 'object',
        properties: {
            defaultLabelColor: {
                type: 'string',
                title: 'Default text color',
                default: '#000000'
            },
            defaultEdgeColor: {
                type: 'string',
                title: 'Default edge color',
                default: '#000000'
            },
            defaultNodeColor: {
                type: 'string',
                title: 'Default node color',
                default: '#000000'
            },
            defaultLabelSize: {
                type: 'number',
                title: 'Default node text size',
                minimum: 6,
                maximum: 50
            },
            defaultEdgeLabelSize: {
                type: 'number',
                title: 'Default edge text size',
                minimum: 6,
                maximum: 50
            },
            minArrowSize: {
                type: 'number',
                title: 'minimal edge\'s arrow display size',
                minimum: 0
            },
            labelSize: {
                type: 'string',
                title: 'Indicates how to choose the labels size',
                enum: ['fixed', 'proportional'],
                default: 'fixed'
            },
            edgeLabelSize: {
                type: 'string',
                title: 'Indicates how to choose the labels size',
                enum: ['fixed', 'proportional'],
                default: 'fixed'
            },
            labelSizeRatio: {
                type: 'number',
                title: 'The ratio between the font size of the label and the node size',
                minimum: 0
            },
            labelThreshold: {
                type: 'number',
                title: 'The minimum size a node must have to see its label displayed',
                minimum: 0
            },
            edgeLabelThreshold: {
                type: 'number',
                title: 'The minimum size an edge must have to see its label displayed',
                minimum: 0
            },
            webglOversamplingRatio: {
                type: 'number',
                title: 'The oversampling factor used in WebGL renderer',
                minimum: 0
            },
            borderSize: {
                type: 'number',
                title: 'Size of the border of hovered nodes',
                minimum: 0
            },
            defaultNodeBorderColor: {
                type: 'string',
                title: 'Default hovered node border\'s color',
                default: '#000000'
            },
            singleHover: {
                type: 'boolean',
                title: 'Only one node can be hovered at a time ?',
                default: true
            },
            hoverFontStyle: {
                type: 'string',
                title: 'Font style for hover',
                default: 'bold'
            },
            labelHoverShadowColor: {
                type: 'string',
                title: 'Hover text shadow color',
                default: '#000000'
            },
            nodeHoverColor: {
                type: 'string',
                title: 'How to choose the hovered nodes shadow color',
                enum: ['default', 'node'],
                default: 'node'
            },
            defaultNodeHoverColor: {
                type: 'string',
                title: 'Default noe hover color',
                default: '#000000'
            },
            defaultHoverLabelBGColor: {
                type: 'string',
                title: 'Default text hover background color',
                default: '#FFFFFF'
            },
            defaultLabelHoverColor: {
                type: 'string',
                title: 'Default text hover color',
                default: '#FFFFFF'
            },
            edgeHoverColor: {
                type: 'string',
                title: 'How to choose the hovered edge color',
                enum: ['default', 'edge'],
                default: 'edge'
            },
            edgeHoverSizeRatio: {
                type: 'number',
                title: 'Size multiplicator of hovered edges',
                minimum: 1
            },
            defaultEdgeHoverColor: {
                type: 'string',
                title: 'Default edge hover color',
                default: '#000000'
            },
            edgeHoverExtremities: {
                type: 'boolean',
                title: 'Edge extremities must be hovered when the edge is hovered ?',
                default: false
            },
            drawEdges: {
                type: 'boolean',
                title: 'Display edges ?',
                default: true
            },
            drawNodes: {
                type: 'boolean',
                title: 'Display nodes ?',
                default: true
            },
            drawLabels: {
                type: 'boolean',
                title: 'Display node text ?',
                default: true
            },
            drawEdgeLabels: {
                type: 'boolean',
                title: 'Display edge text ?',
                default: true
            },
            batchEdgesDrawing: {
                type: 'boolean',
                title: 'Display edges in batch ?',
                default: false
            },
            hideEdgesOnMove: {
                type: 'boolean',
                title: 'Hide edges on move ?',
                default: false
            },
            canvasEdgesBatchSize: {
                type: 'number',
                title: 'Canvas batch size',
                minimum: 50,
                multipleOf: 50
            },
            webglEdgesBatchSize: {
                type: 'number',
                title: 'Webgl batch size',
                minimum: 50,
                multipleOf: 50
            },
            /**
             * RESCALE SETTINGS:
             * *****************
             */
            scalingMode: {
                type: 'string',
                title: 'Indicates of to scale the graph relatively to its container',
                enum: ['inside', 'outside']
            },
            sideMargin: {
                type: 'number',
                title: 'Margin to keep around the graph',
                minimum: 0
            },
            minEdgeSize: {
                type: 'number',
                title: 'Min edge size',
                minimum: 0
            },
            maxEdgeSize: {
                type: 'number',
                title: 'Max edge size',
                minimum: 0
            },
            minNodeSize: {
                type: 'number',
                title: 'Min node size',
                minimum: 0
            },
            maxNodeSize: {
                type: 'number',
                title: 'Max node size',
                minimum: 0
            },
            /**
             * CAPTORS SETTINGS:
             * *****************
             */
            zoomingRatio: {
                type: 'number',
                title: 'Zoom multiplicator when user zooms with mouse-wheel',
                minimum: 1.1,
                default: 1.7
            },
            doubleClickZoomingRatio: {
                type: 'number',
                title: 'Zoom multiplicator when user zooms with double click',
                minimum: 1.1,
                default: 2.2
            },
            zoomMin: {
                type: 'number',
                title: 'Minimum zooming level',
                minimum: 0,
                default: 0.0625
            },
            zoomMax: {
                type: 'number',
                title: 'Maximum zooming level',
                minimum: 0,
                default: 2
            },
            mouseZoomDuration: {
                type: 'number',
                title: 'Duration of animations following a mouse scrolling',
                minimum: 1,
                default: 200
            },
            doubleClickZoomDuration: {
                type: 'number',
                title: 'Duration of animations following a mouse double clic',
                minimum: 1,
                default: 200
            },
            mouseInertiaDuration: {
                type: 'number',
                title: 'Duration of animations following a mouse dropping',
                minimum: 1,
                default: 200
            },
            mouseInertiaRatio: {
                type: 'number',
                title: 'The inertia power (mouse captor)',
                minimum: 1,
                default: 3
            },
            touchInertiaDuration: {
                type: 'number',
                title: 'duration of animations following a touch dropping',
                minimum: 1,
                default: 200
            },
            doubleClickTimeout: {
                type: 'number',
                title: 'Maximum time between two clicks to make it a double click (ms)',
                minimum: 1,
                default: 300
            },
            dragTimeout: {
                type: 'number',
                title: 'Maximum time of dragging to trigger intertia (ms)',
                minimum: 1,
                default: 200
            },
            ///**
            // * GLOBAL SETTINGS:
            // * ****************
            autoResize: {
                type: 'boolean',
                title: 'Auto-resize on window change ?',
                default: true
            },
            autoRescale: {
                type: 'boolean',
                title: 'Auto rescale on instance refresh',
                default: true
            },
            enableHovering: {
                type: 'boolean',
                title: 'Enable node hover ?',
                default: true
            },
            enableEdgeHovering: {
                type: 'boolean',
                title: 'Enable edge hover ?',
                default: true
            },
            edgeHoverPrecision: {
                type: 'number',
                title: 'Size of the area around the edges to activate hovering',
                minimum: 1,
                default: 5
            },
            rescaleIgnoreSize: {
                type: 'boolean',
                title: 'Ignore node/edge size for rescale ?',
                default: false
            },
            /**
             * CAMERA SETTINGS:
             * ****************
             */
            nodesPowRatio: {
                type: 'number',
                title: 'Power degrees applied to nodes size relatively to the zooming level',
                minimum: 0.1
            },
            edgesPowRatio: {
                type: 'number',
                title: 'Power degrees applied to edges size relatively to the zooming level',
                minimum: 0.1
            },
            animationsTime: {
                type: 'number',
                title: 'Default animation time (ms)',
                minimum: 0,
                multipleOf: 10
            }
        }
    };

const ui = {};

class SettingsSigma extends Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired,
        data: React.PropTypes.object
    };

    saveToStore(data){
        this.props.dispatch( action.saveSettingsSigma, data);
    }

    render() {
        return (
            <Settings page={this.props.page} schema={schema}  ui={ui} data={this.props.data} save={(data) => this.saveToStore(data)} />
        )
    }
}

export default PageEnhancer(branch({data: ['settings', 'sigma']}, SettingsSigma));
