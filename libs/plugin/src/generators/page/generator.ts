import * as path from 'path';

import { generateFiles, formatFiles, Tree } from '@nx/devkit';

import { PageGeneratorSchema } from './schema';
import { fromKebabCaseToPascalCase } from '../../utils/format';

export default async function generator(
  tree: Tree,
  options: PageGeneratorSchema
) {
  const projectPath = `apps/${options.project}`;

  await generateFiles(tree, path.join(__dirname, 'files'), projectPath, {
    componentName: fromKebabCaseToPascalCase(options.name),
    fileName: options.name,
    name: options.name,
  });

  await formatFiles(tree);
}
