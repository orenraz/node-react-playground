import { loadConfig } from '../src/config/loaders/config-builder';

process.env.NODE_ENV = 'test'; // Explicitly set NODE_ENV to test

(async () => {
  try {
    console.log('Testing loadConfig function...');
    const config = await loadConfig();
    console.log('Loaded configuration:', config);
  } catch (error) {
    console.error('Error during loadConfig execution:', error);
  }
})();