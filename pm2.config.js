module.exports = {
    apps: [
      {
        name: 'Novaria',
        script: 'dist/src/index.js',
        error_file: 'novaria_error.log',
        out_file: 'novaria.log',
        max_restarts: 10,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '100M', 
      },
    ],
  };
  