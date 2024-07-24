import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: '/one-game-a-month-july-2024/',
    build: {
      outDir: 'dist'
    },
  });
}