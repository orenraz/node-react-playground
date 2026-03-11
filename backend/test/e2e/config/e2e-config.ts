import { Config } from '@src/config/config';

export const e2EConfig1 = () => Config.create().getConfig();

// Extend config here if needed
// export const e2eConfig = () => ({ ...loadE2EConfig(), customE2EProperty: 'value' });