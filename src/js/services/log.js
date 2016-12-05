import tree from "~/store";

/**
 * Simple class that allow you to make some logging
 */
class Log {

    /**
     * Default constructor.
     *
     * @param name Instance name of the logger (ie. package)
     */
    constructor(name) {
        this.name = name;
        this.levels = ["Error", "Warning", "Info", "Debug"];
    }

    /**
     * Retrieve the current logging level from the state.
     *
     * @returns {string} the current logging level
     * @private
     */
    _getCurrentLevel() {
        return tree.select('settings', 'application', 'logLevel').get();
    }

    /**
     * Retrieve the pattern filter from the state.
     *
     * @returns {Regex} The filter regex
     * @private
     */
    _getPattern() {
        return new RegExp(tree.select('settings', 'application', 'logPattern').get());
    }

    /**
     * Return true if we log is valid for the specified level.
     * This method also take care about pattern filter.
     *
     * @param {string} level The lvel to test
     * @returns {boolean}
     * @private
     */
    _shouldBeLog(level) {
        var result = false;
        // check the level
        const currentLevelIndex = this.levels.indexOf(this._getCurrentLevel()); // could be -1 if 'Off'
        const levelIndex = this.levels.indexOf(level);
        if (currentLevelIndex > -1 && levelIndex <= currentLevelIndex ) {
            // checking pattern
            if(this._getPattern().test(this.name)) {
                result = true;
            }
        }
        return result;
    }

    /**
     * Just wrap the specified message with the logger name.
     *
     * @param msg The message to wrap
     * @returns {string}
     * @private
     */
    _wrapMsg(msg) {
        var newMsg = "[" + this.name + "]: ";
        newMsg += msg;
        return newMsg;
    }

    /**
     * Log a message as error.
     *
     * @param {string} msg The message to log
     */
    error(msg) {
        if (this._shouldBeLog('Error')) {
            console.log("%c" + this._wrapMsg(msg), "color:Red");
        }
    }

    /**
     * Log a message as warn.
     *
     * @param {string} msg The message to log
     */
    warn(msg) {
        if (this._shouldBeLog('Warn')) {
            console.log("%c" + this._wrapMsg(msg), "color:Tomato");
        }
    }

    /**
     * Log a message as info.
     *
     * @param {string} msg The message to log
     */
    info(msg) {
        if (this._shouldBeLog('Info')) {
            console.log("%c" + this._wrapMsg(msg), "color:DodgerBlue");
        }
    }

    /**
     * Log a message as debug.
     *
     * @param {string} msg The message to log
     */
    debug(msg) {
        if (this._shouldBeLog('Debug')) {
            console.log("%c" + this._wrapMsg(msg), "color:Orchid");
        }
    }

}

export default Log;
