import Mustache from 'mustache';
import { compile } from 'json-schema-to-typescript';

import { pascalCase, camelCase } from 'change-case';

const handlePayloadTypes = async (schema: any, name: string) => {
  if (!schema) return {};
  console.log(schema);

  const typeString = await compile(
    {
      demo: {
        $ref: './paths/cms/user/current-get.yaml',
      },
    },
    name,
    {
      bannerComment: '',
      cwd: `${__dirname}../../mocks/`,
      declareExternallyReferenced: false,
      $refOptions: {
        parse: {
          yaml: {
            canParse: true,
            allowEmpty: true,
          },
        },
        resolve: {
          external: true,
          file: true,
        },
        dereference: {
          circular: true,
        },
      },
    },
  );

  console.log('TYPE', typeString);

  return typeString;
};

const handleMethod = async (path: string, method: string, methodObj: any) => {
  const contentType = methodObj.requestBody
    ? Object.keys(methodObj.requestBody.content)
    : null;

  const payloadSchema =
    contentType && methodObj.requestBody.content[contentType[0]];

  const name = methodObj.operationId;
  const payloadName = `${name}Payload`;
  console.log('METHODOBJ', methodObj);
  const route = {
    name: name,
    method: method.toUpperCase(),
    url: path,
    headers: {
      ...(contentType ? { ...contentType } : {}),
    },
    payload: {
      name: pascalCase(payloadName),
      type: await handlePayloadTypes(payloadSchema, camelCase(payloadName)),
    },
    result: {
      name: pascalCase(`${name}Result`),
      type: '',
    },
  };

  return route;
};

export const renderHandlers = async (template: any, scheme: any) => {
  const pathes = Object.keys(scheme.paths);

  let handlers = [];

  for (let path of pathes) {
    const methodsRoutes = Object.keys(scheme.paths[path]).map((method) =>
      handleMethod(path, method, scheme.paths[path][method]),
    );

    const list = await Promise.all(methodsRoutes);

    handlers.push(...list);
  }

  return Mustache.render(template, {
    handlers,
  });
};
