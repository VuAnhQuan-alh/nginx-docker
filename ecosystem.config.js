module.exports = {
  apps: [
    {
      name: 'petpot',
      exec_mode: 'cluster',
      instances: 1,
      script: 'dist/apps/petpot/main.js',
    },
    {
      name: 'admin',
      exec_mode: 'cluster',
      instances: 1,
      script: 'dist/apps/admin/main.js',
    },
    {
      name: 'booking',
      exec_mode: 'cluster',
      instances: 1,
      script: 'dist/apps/bookings/main.js',
    },
  ],
};
