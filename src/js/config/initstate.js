import configApplication from "~/config/application";
import configNeo4j from "~/config/neo4j";
import configSigma from "~/config/sigma";
import configSigmaLayout from "~/config/sigma-layout";

/**
 * Configuration object for the initialisation fo the state
 */
const configInitState = { 
	view: 'home',
	notifications: [],
	settings: {
		application: configApplication,
		neo4j: configNeo4j,
		sigma: configSigma,
		sigmaLayout: configSigmaLayout
	},
	teamSearch: {
		search: {},
		data: {}
	}
}

export default configInitState;
