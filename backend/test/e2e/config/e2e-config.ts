import { Config } from '@src/config/config';

export const e2eConfig = () => Config.create().getConfig();

// Extend config here if needed
// export const e2eConfig = () => ({ ...loadE2EConfig(), customE2EProperty: 'value' });