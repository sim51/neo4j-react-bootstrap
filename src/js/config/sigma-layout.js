/**
 * Configuration object for the Sigma Layout
 */
const configSigmaLayout = { 
	linLogMode: false,  // alternative energy model with linear repulsion force and logarithmic attraction force.
    outboundAttractionDistribution: false,
    adjustSizes: false,
    edgeWeightInfluence: 0,
    scalingRatio: 5,
    strongGravityMode: false,
    gravity: 2,
    barnesHutOptimize: false, // should we use the algorithm's Barnes-Hut to improve repulsion's scalability (`O(n²)` to `O(nlog(n))`)? This is useful for large graph but harmful to small ones.
    barnesHutTheta: 0.5,
    slowDown: 1,
    startingIterations: 1, // number of iterations to be run before the first render.
    iterationsPerRender: 1, // number of iterations to be run before each render.
    maxIterations: 1000, // set a limit if `autoStop: true`.
    avgDistanceThreshold: 0.1, // this is the normal stopping condition of `autoStop: true`. When the average displacements of nodes is below this threshold, the layout stops.
    autoStop: true,
    alignNodeSiblings: true, // align nodes that are linked to the same two nodes only. It enhances readability. This operation is performed once the main layout is finished.
    nodeSiblingsScale: 10, // Distance multiplicator between the aligned nodes.
    nodeSiblingsAngleMin: 0.1 // force a minimal angle between aligned nodes (from 0 to PI / 2). Node labels may indeed overlap on horizontally aligned nodes.
}

export default configSigmaLayout;

