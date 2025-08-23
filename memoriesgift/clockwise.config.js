/** @type {import('clockwise').Config} */
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
    protocol: 'http'
  },

  // Build configuration
  build: {
    output: '.next',
    clean: true
  },

  // Deployment configuration
  deploy: {
    platform: 'vercel', // or 'netlify', 'railway', etc.
    autoDeploy: false
  },

  // Extensions configuration
  extensions: {
    // Enable Next.js specific extensions
    next: {
      enabled: true,
      config: './next.config.ts'
    },
    
    // Enable TypeScript support
    typescript: {
      enabled: true,
      config: './tsconfig.json'
    },

    // Enable Tailwind CSS support
    tailwind: {
      enabled: true,
      config: './tailwind.config.js'
    },

    // Enable ESLint integration
    eslint: {
      enabled: true,
      config: './eslint.config.mjs'
    }
  },

  // Environment variables
  env: {
    NODE_ENV: 'development',
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000'
  },

  // Scripts that Clockwise can run
  scripts: {
    predev: 'npm run lint',
    postdev: 'echo "Development server started successfully"',
    prebuild: 'npm run lint',
    postbuild: 'echo "Build completed successfully"'
  }
};

module.exports = config;

