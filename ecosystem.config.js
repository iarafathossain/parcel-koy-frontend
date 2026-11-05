module.exports = {
  apps: [
    {
      name: "parcelkoy - frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      out_file: "./logs/parcelkoy-frontend-out.log",
      error_file: "./logs/parcelkoy-frontend-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
