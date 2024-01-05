/**
 * Enum representing different application environments.
 * It defines three environment types: Development, Production, and Test.
 */
export enum Environment {
  /**
   * Development environment is typically used during the software development phase.
   * It may have additional logging, debugging, and other development-related configurations.
   */
  DEVELOPMENT = 'development',

  /**
   * Production environment is used for running the application in a live/production environment.
   * It is optimized for performance and usually has minimal logging and debugging information.
   */
  PRODUCTION = 'production',

  /**
   * Test environment is used for running automated tests.
   * It may have specific configurations for testing purposes and is isolated from production data.
   */
  TEST = 'test',
}
