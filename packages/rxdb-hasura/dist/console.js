"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorDir = exports.error = exports.warn = exports.info = exports.debug = void 0;
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["MUTE"] = 0] = "MUTE";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 1] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 3] = "INFO";
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 4] = "DEBUG";
})(LOG_LEVEL || (LOG_LEVEL = {}));
const VERBOSE_LEVEL = process.env.NODE_ENV === 'development' ? LOG_LEVEL.INFO : LOG_LEVEL.ERROR;
const debug = (...args) => VERBOSE_LEVEL >= LOG_LEVEL.DEBUG && console.log(...args);
exports.debug = debug;
const info = (...args) => VERBOSE_LEVEL >= LOG_LEVEL.INFO && console.log(...args);
exports.info = info;
const warn = (...args) => VERBOSE_LEVEL >= LOG_LEVEL.WARN && console.warn(...args);
exports.warn = warn;
const error = (...args) => VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.warn(...args);
exports.error = error;
const errorDir = (...args) => VERBOSE_LEVEL >= LOG_LEVEL.ERROR && console.dir(...args);
exports.errorDir = errorDir;
//# sourceMappingURL=console.js.map