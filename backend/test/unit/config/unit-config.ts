import { Config } from '@src/config/config';

export const unitConfig = () => Config.create(
	{},
	{ PROTOCOL: 'mongodb', USER: 'mock', PASSWORD: 'mock', HOST: 'localhost', DB_NAME: 'mockdb' }
).getConfig();

// Extend config here if needed
// export const unitConfig = () => ({ ...unitConfig(), customUnitProperty: 'value' });
