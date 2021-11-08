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
        info: { appenders: ["miLoggerConsole","miLoggerFileInfo"], level: "info" },
        warn: { appenders: ["miLoggerFileWarn"], level: "warn" },
        error: { appenders: ["miLoggerFileError"], level: "error" }
    }
});
export const logger = log4js.getLogger();
export const loggerInfo = log4js.getLogger('info');
export const loggerWarn = log4js.getLogger('warn');
export const loggerError = log4js.getLogger('error');