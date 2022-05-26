import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import UrlsRoute from '@routes/urls.route';

validateEnv();

async function main() {
  const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new UrlsRoute()]);
  // noinspection ES6MissingAwait
  app.init();
}

// noinspection JSIgnoredPromiseFromCall
main();
