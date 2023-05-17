import installVersioning from '@jscutlery/semver/src/generators/install';
import installPublishing from 'ngx-deploy-npm/src/generators/install/generator';

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
  const projectConfiguration = readProjectConfiguration(tree, options.name);

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

  await updateProjectConfiguration(tree, options.name, {
    root: `libs/${options.name}`,
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
          dryRun: '${dryRun}',
          access: 'public',
        },
      },
    },
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
