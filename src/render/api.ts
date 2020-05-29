import Mustache from 'mustache';

export const renderApi = (template: any, scheme: any) => {
  const apiScheme = {
    basePath: scheme.basePath,
  };

  return Mustache.render(template, apiScheme);
};
