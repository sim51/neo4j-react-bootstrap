import Log from "~/services/log";
import {pushNotification} from '~/actions/notifications';

/**
 * Module logger.
 */
const log = new Log("Actions.teamSearch");

/**
 * Saving team search in state.
 */
export function saveSearchData(tree, data) {
    tree.select('movie', 'search').set(data);
}
