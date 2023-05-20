import {
  addDependenciesToPackageJson,
  updateProjectConfiguration,
  readProjectConfiguration,
  generateFiles,
  formatFiles,
  readNxJson,
  Tree,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export default async function library(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const workspaceConfigs = readNxJson(tree);
  const importPath = `@${workspaceConfigs.npmScope}/${options.name}`;

  await libraryGenerator(tree, {
    name: options.name,
    unitTestRunner: 'vitest',
    publishable: true,
    linter: 'eslint',
    bundler: 'vite',
    importPath,
  });

  await generateFiles(tree, `${__dirname}/files`, `libs/${options.name}`, {
    fileName: options.name,
    name: options.name,
  });

  await addDependenciesToPackageJson(tree, { [importPath]: 'latest' }, {});

  const projectConfiguration = readProjectConfiguration(tree, options.name);

  await updateProjectConfiguration(tree, options.name, {
    ...projectConfiguration,
    targets: {
      ...projectConfiguration.targets,
      version: {
        executor: '@jscutlery/semver:version',
        options: {
          postTargets: [`${options.name}:deploy`],
          preset: 'conventional',
        },
      },
      deploy: {
        executor: 'ngx-deploy-npm:deploy',
        options: {
          buildTarget: 'production',
          access: 'public',
        },
      },
    },
  });

  await formatFiles(tree);
}
