import installVersioning from '@jscutlery/semver/src/generators/install';
import installPublishing from 'ngx-deploy-npm/src/generators/install/generator';

import { formatFiles, readNxJson, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export default async function library(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const workspaceConfigs = readNxJson(tree);

  await libraryGenerator(tree, {
    name: options.name,
    importPath: `@${workspaceConfigs.npmScope}/${options.name}`,
    unitTestRunner: 'vitest',
    publishable: true,
    linter: 'eslint',
    bundler: 'vite',
  });

  await installVersioning(tree, {
    projects: [options.name],
    enforceConventionalCommits: true,
    preset: 'conventional',
    syncVersions: false,
  });

  await installPublishing(tree, {
    projects: [options.name],
  });

  await formatFiles(tree);
}
