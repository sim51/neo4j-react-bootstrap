import Neo4jService from "~/services/neo4j/neo4j";
import Log from "~/services/log";
import {pushNotification} from "~/actions/notifications";
import _ from "lodash";

/**
 * Module logger.
 */
const log = new Log('Actions.graph');

/**
 *  Save the query to the state.
 * @param query A cypher query.
 */
export function setOverObject(tree, object) {
    tree.select('data', 'over').set(object);
}
