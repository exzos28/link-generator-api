import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import UrlsRoute from '@routes/urls.route';
import VisitsRoute from '@routes/visits.route';

validateEnv();

async function main() {
  const app = new App([new IndexRoute(), new AuthRoute(), new UrlsRoute(), new VisitsRoute()]);
  // noinspection ES6MissingAwait
  app.init();
}

// noinspection JSIgnoredPromiseFromCall
main();
