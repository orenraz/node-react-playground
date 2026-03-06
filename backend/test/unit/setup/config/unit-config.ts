import { configLoader } from '../../../shared/config-loader';

export const unitConfig = {
  ...configLoader,
  dbUri: 'mock://localhost',
  useMockServices: true,
};