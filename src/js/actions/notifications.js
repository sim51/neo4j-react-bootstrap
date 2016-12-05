import Log from "~/services/log";

/**
 * Module logger.
 */
const log = new Log("Actions.notifications");

/**
 * Add a notification to the system.
 */
export function pushNotification(tree, notification) {
    tree.select('notifications').push(notification);
}
