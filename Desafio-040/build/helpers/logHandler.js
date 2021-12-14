"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFileWarn: { type: 'file', filename: 'warn.log' },
        miLoggerFileError: { type: 'file', filename: 'error.log' },
        miLoggerFileInfo: { type: 'file', filename: 'info.log' }
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        info: { appenders: ["miLoggerConsole", "miLoggerFileInfo"], level: "info" },
        warn: { appenders: ["miLoggerFileWarn"], level: "warn" },
        error: { appenders: ["miLoggerFileError"], level: "error" }
    }
});
exports.logger = log4js.getLogger();
exports.loggerInfo = log4js.getLogger('info');
exports.loggerWarn = log4js.getLogger('warn');
exports.loggerError = log4js.getLogger('error');
//# sourceMappingURL=logHandler.js.map