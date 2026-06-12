// PM2 process config for the Iranian VPS.
// Build first: `npm run build` (produces .next/standalone), then `pm2 start ecosystem.config.cjs`.
module.exports = {
  apps: [
    {
      name: "dashtzad",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "512M",
    },
  ],
};
