
import Vue from '@vitejs/plugin-vue';

export default {
  plugins: [Vue()],
  server: {
    open: true,
  },
  build: {
    // Set publicDir to specify the directory for static assets
    // In this example, we assume static assets are in the "public" directory
    publicDir: 'public',
  },
};
