/**
 * Enhanced Development Configuration
 * Provides Clockwise-like functionality using real development tools
 */

const config = {
  // Project configuration
  project: {
    name: 'memoriesgifts',
    version: '0.1.0',
    description: 'A Next.js memories gifts application'
  },

  // Development server configuration
  dev: {
    port: 3000,
    host: 'localhost',
    protocol: 'http',
    open: true,
    hot: true
  },

  // Build configuration
  build: {
    output: '.next',
    clean: true,
    analyze: false
  },

  // Quality assurance
  quality: {
    lint: {
      enabled: true,
      fix: true,
      config: './eslint.config.mjs'
    },
    typeCheck: {
      enabled: true,
      strict: true,
      config: './tsconfig.json'
    },
    format: {
      enabled: true,
      config: './.prettierrc'
    }
  },

  // Environment variables
  env: {
    NODE_ENV: 'development',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000'
  },

  // Scripts configuration
  scripts: {
    predev: 'npm run lint',
    postdev: 'echo "Development server started successfully"',
    prebuild: 'npm run lint && npm run type-check',
    postbuild: 'echo "Build completed successfully"'
  },

  // Development tools
  tools: {
    concurrently: true,
    crossEnv: true,
    rimraf: true
  }
};

module.exports = config;

