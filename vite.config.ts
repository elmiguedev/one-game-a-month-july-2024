import { defineConfig, loadEnv } from 'vite';
import XMLLoader from 'vite-plugin-xml-loader';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: './',
    build: {
      outDir: 'docs'
    },
    plugins: [
      XMLLoader()
    ],
  });
}