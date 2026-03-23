"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitConfig = void 0;
const config_1 = require("@src/config/config");
const unitConfig = () => config_1.Config.create({}, { PROTOCOL: 'mongodb', USER: 'mock', PASSWORD: 'mock', HOST: 'localhost', DB_NAME: 'mockdb' }).getConfig();
exports.unitConfig = unitConfig;
//# sourceMappingURL=unit-config.js.map