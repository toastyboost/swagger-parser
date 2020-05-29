import fs from 'fs';
import yaml from 'js-yaml';
import { renderApi, renderHandlers } from './render';

const apiScheme = yaml.safeLoad(
  fs.readFileSync(`${__dirname}/../mocks/cms-api.yaml`, 'utf8'),
);

const apiTemplate = fs.readFileSync(
  `${__dirname}/../templates/api.mustache`,
  'utf8',
);

const handlerTemplate = fs.readFileSync(
  `${__dirname}/../templates/handler.mustache`,
  'utf8',
);

async function main() {
  renderApi(apiTemplate, apiScheme);
  const r = await renderHandlers(handlerTemplate, apiScheme);
  console.log('r', r);
}

main().catch(console.error); // eslint-disable-line @typescript-eslint/unbound-method
