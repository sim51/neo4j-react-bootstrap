import Log from "~/services/log";

/**
 * Module logger.
 */
const log = new Log("Service.utils");

/**
 * Test if the given param is an object.
 *
 * @param item The object to test
 * @returns {*|boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

/**
 * Make a deep merge of the source object into the target one.
 *
 * @param target
 * @param source
 * @returns The merge object
 */
export function mergeDeep(target, source) {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
