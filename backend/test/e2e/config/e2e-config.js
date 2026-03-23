"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2eConfig = void 0;
const config_1 = require("@src/config/config");
const e2eConfig = () => config_1.Config.create().getConfig();
exports.e2eConfig = e2eConfig;
//# sourceMappingURL=e2e-config.js.map