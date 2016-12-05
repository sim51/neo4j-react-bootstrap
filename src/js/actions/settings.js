import Log from "~/services/log";
import {pushNotification} from './notifications';
/**
 * Module logger.
 */
const log = new Log("Actions.settings");

/**
 * Saving server settings in state.
 */
export function saveSettingsServer(tree, conf) {
    tree.select('settings', 'neo4j').set(conf);
    pushNotification(tree, {
        title: "Success: ",
        message: "Neo4j configuration has been successfully updated",
        type : "success"
    });
}

/**
 * Saving advanced settings in state.
 */
export function saveSettingsAdvanced(tree, conf) {
    tree.select('settings', 'application').set(conf);
    pushNotification(tree, {
        title: "Success: ",
        message: "Application configuration has been successfully updated",
        type : "success"
    });
}

/**
 * Saving chart-sigma settings in state.
 */
export function saveSettingsSigma(tree, conf) {
    tree.select('settings', 'sigma').deepMerge(conf);
    pushNotification(tree, {
        title: "Success: ",
        message: "Sigma configuration has been successfully updated",
        type : "success"
    });
}


/**
 * Saving chart-sigma settings in state.
 */
export function saveSettingsLayout(tree, conf) {
    tree.select('settings', 'sigmaLayout').deepMerge(conf);
    pushNotification(tree, {
        title: "Success: ",
        message: "Layout configuration has been successfully updated",
        type : "success"
    });
}
