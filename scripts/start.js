// Production entrypoint: run the API on an internal port and Next on the public port in one
// container. Next proxies /api/* to the API (see apps/web/next.config.js), so only WEB_PORT is
// exposed. If either child exits, take the whole container down so the platform restarts it.
const { spawn } = require('node:child_process');

const API_PORT = process.env.API_PORT || '8080';
const WEB_PORT = process.env.PORT || '3000';

const api = spawn('node', ['apps/api/dist/main.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: API_PORT },
});
const web = spawn('node', ['apps/web/server.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: WEB_PORT, API_INTERNAL_URL: 'http://localhost:' + API_PORT, HOSTNAME: '0.0.0.0' },
});

function shutdown(code) { api.kill('SIGTERM'); web.kill('SIGTERM'); process.exit(code); }
api.on('exit', (c) => shutdown(c ?? 1));
web.on('exit', (c) => shutdown(c ?? 1));
process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));
