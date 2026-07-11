// Production entrypoint: run the API on an internal port and Next on the public port in one
// container. Next proxies /api/* to the API (see apps/web/next.config.js), so only WEB_PORT is
// exposed. If either child exits, take the whole container down so the platform restarts it.
const { spawn } = require('node:child_process');

let API_PORT = process.env.API_PORT || '8080';
const WEB_PORT = process.env.PORT || '3000';

// Avoid collision when the platform sets PORT=8080 (the same as the default API_PORT)
if (parseInt(API_PORT, 10) === parseInt(WEB_PORT, 10)) {
  API_PORT = String(parseInt(WEB_PORT, 10) + 1);
}

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
