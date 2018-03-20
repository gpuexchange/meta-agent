import 'babel-register';
import architect from 'architect';
import path from 'path';
import { error as debug } from 'console';

const configPath = path.join(__dirname, 'config.js');
const config = architect.loadConfig(configPath);

debug('Loaded config');
architect.createApp(config, (err, app) => {
  if (err) {
    throw err;
  }

  debug('Good news! All services have been loaded.');
  debug('Loading config from config.json');
  app.services.store.dispatch({ type: 'LOAD' });
  app.services['frontend-registry'].launch();
  app.services['driver-registry'].launch();
});

