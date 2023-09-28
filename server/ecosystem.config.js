module.exports = {
  apps: [
    {
      name: 've-server',
      script: './server/index.js',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '2000M',
      env_dev: {
        NODE_ENV: 'dev',
      },
      env: {
        NODE_ENV: 'prod',
        PORT: 8000,
      },
    },
  ],
  deploy: {
    prod: {
      user: 'root',
      host: '157.245.69.81',
      ref: 'origin/main',
      repo: 'https://github.com/victorbobkov/venue-explorer.git',
      path: '/opt/ve-server',
      'post-deploy': 'npm install && pm2 startOrReload ecosystem.config.js',
    },
  },
};
