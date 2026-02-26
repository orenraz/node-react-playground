"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_config_builder_1 = require("../utils/db-config-builder");
var devConfig = function () { return ({
    port: parseInt(process.env.PORT, 10),
    allowedOrigins: '',
    logLevel: 'debug',
    mongodb: {
        uri: db_config_builder_1.default.buildConnectionString(),
        dbName: process.env.MONGODB_DB_NAME,
    },
    MONGODB_PROTOCOL: process.env.MONGODB_PROTOCOL,
}); };
exports.default = devConfig;
