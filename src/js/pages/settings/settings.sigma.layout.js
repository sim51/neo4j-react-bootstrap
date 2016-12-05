import React, {Component, PropTypes} from 'react';
import {branch} from 'baobab-react/higher-order';
import {PageEnhancer} from '~/enhancer/page';
import * as action from '~/actions/settings';
import Settings from './settings';

const schema = {
        type: 'object',
        properties: {
            // alternative energy model with linear repulsion force and logarithmic attraction force.
            linLogMode: {
                type: 'boolean',
                title: 'linLogMode',
                default: false
            },
            outboundAttractionDistribution: {
                type: 'boolean',
                title: 'outboundAttractionDistribution',
                default: false
            },
            adjustSizes: {
                 type: 'boolean',
                 title: 'adjustSizes',
                 default: false
            },
            edgeWeightInfluence: {
                type: 'number',
                title: 'edgeWeightInfluence',
                default: 0,
            },
            scalingRatio: {
                type: 'number',
                title: 'scalingRatio',
                default: 5,
            },
            strongGravityMode: {
                type: 'boolean',
                title: 'strongGravityMode',
                default: false
            },
            gravity: {
                type: 'number',
                title: 'gravity',
                default: 0.8,
            },
            // should we use the algorithm's Barnes-Hut to improve repulsion's scalability (`O(n²)` to `O(nlog(n))`)? This is useful for large graph but harmful to small ones.
            barnesHutOptimize: {
                type: 'boolean',
                title: 'barnesHutOptimize',
                default: false
            },
            barnesHutTheta: {
                type: 'number',
                title: 'barnesHutTheta',
                default: 0.5,
            },
            slowDown: {
                type: 'number',
                title: 'slowDown',
                default: 1,
            },
            // number of iterations to be run before the first render.
            startingIterations: {
                type: 'number',
                title: 'startingIterations',
                default: 1,
                min:1
            },
            // number of iterations to be run before the first render.
            iterationsPerRender: {
                type: 'number',
                title: 'iterationsPerRender',
                default: 1,
                min:1
            },
            autoStop: {
                type: 'boolean',
                title: 'autoStop',
                default: true
            },
            // set a limit if `autoStop: true`.
            maxIterations: {
                type: 'number',
                title: 'maxIterations',
                default: 1000,
                min:100
            },
            // this is the normal stopping condition of `autoStop: true`. When the average displacements of nodes is below this threshold, the layout stops.
            avgDistanceThreshold: {
                type: 'number',
                title: 'avgDistanceThreshold',
                default: 0.01,
                min:0.001
            },
            // align nodes that are linked to the same two nodes only. It enhances readability. This operation is performed once the main layout is finished.
            alignNodeSiblings: {
                type: 'boolean',
                title: 'alignNodeSiblings',
                default: true,
                min:0.001
            },
            // Distance multiplicator between the aligned nodes.
            nodeSiblingsScale: {
                type: 'number',
                title: 'nodeSiblingsScale',
                default: 5
            },
            // force a minimal angle between aligned nodes (from 0 to PI / 2). Node labels may indeed overlap on horizontally aligned nodes.
            nodeSiblingsAngleMin: {
                type: 'number',
                title: 'nodeSiblingsAngleMin',
                default: 0.01
            }
        }
    };

const ui = {};

class SettingsSigmaLayout extends Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired,
        data: React.PropTypes.object
    };

    saveToStore(data){
        this.props.dispatch( action.saveSettingsLayout, data);
    }

    render() {
        return (
            <Settings page={this.props.page} schema={schema}  ui={ui} data={this.props.data} save={(data) => this.saveToStore(data)} />
        )
    }
}

export default PageEnhancer(branch({data: ['settings', 'sigmaLayout']}, SettingsSigmaLayout));
