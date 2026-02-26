/**
 * @typedef {Object} ApiClientConfig
 * @property {string} baseUrl - Base URL for the API
 * @property {number} [timeout] - Request timeout in milliseconds
 */

/**
 * @typedef {Object} GreetRequest
 * @property {string} name - Name to greet
 */

/**
 * @typedef {Object} GreetResponse
 * @property {string} message - Greeting message
 */

/**
 * @typedef {Object} HelloResponse
 * @property {string} app - Application name
 * @property {string} version - Application version
 */

/**
 * @typedef {Object} HealthResponse
 * @property {string} status - Health status
 * @property {number} uptime - Uptime in seconds
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} RootResponse
 * @property {string} message - Welcome message
 */

/**
 * API Client for edu-jarvis backend
 */
export class ApiClient {
  /**
   * @param {ApiClientConfig} config
   */
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout || 10000;
  }

  /**
   * Private method to make HTTP requests
   * @private
   * @param {string} path - API path
   * @param {RequestInit} [options] - Fetch options
   * @returns {Promise<any>}
   */
  async request(path, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Get root endpoint
   * @returns {Promise<RootResponse>}
   */
  async getRoot() {
    return this.request('/');
  }

  /**
   * Get application info
   * @returns {Promise<HelloResponse>}
   */
  async getHello() {
    return this.request('/hello');
  }

  /**
   * Get health status
   * @returns {Promise<HealthResponse>}
   */
  async getHealth() {
    return this.request('/health');
  }

  /**
   * Send greeting request
   * @param {GreetRequest} data
   * @returns {Promise<GreetResponse>}
   */
  async greet(data) {
    return this.request('/greet', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
