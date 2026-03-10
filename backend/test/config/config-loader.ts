import { EnvironmentConfigBuilder } from '../../src/config/loaders/environment-loader';

export function loadConfig() {
  return new EnvironmentConfigBuilder();
}