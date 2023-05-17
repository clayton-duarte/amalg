import * as path from 'path';

import { generateFiles, formatFiles, Tree } from '@nx/devkit';

import { PageGeneratorSchema } from './schema';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default async function generator(
  tree: Tree,
  options: PageGeneratorSchema
) {
  const projectPath = `apps/${options.project}`;

  await generateFiles(tree, path.join(__dirname, 'files'), projectPath, {
    componentName: capitalize(options.name),
    fileName: options.name,
    name: options.name,
  });

  await formatFiles(tree);
}
