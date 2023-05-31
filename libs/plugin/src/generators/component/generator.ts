import installVersioning from '@jscutlery/semver/src/generators/install';
import installPublishing from 'ngx-deploy-npm/src/generators/install/generator';

import { libraryGenerator } from '@nrwl/react';
import {
  addDependenciesToPackageJson,
  generateFiles,
  formatFiles,
  readNxJson,
  Tree,
} from '@nx/devkit';
import { Linter } from '@nx/linter';

import { ComponentGeneratorSchema } from './schema';
import { fromKebabCaseToPascalCase } from '../../utils/format';

export default async function component(
  tree: Tree,
  options: ComponentGeneratorSchema
) {
  const workspaceConfigs = readNxJson(tree);
  const importPath = `@${workspaceConfigs.npmScope}/${options.name}`;

  await libraryGenerator(tree, {
    name: options.name,
    unitTestRunner: 'vitest',
    style: '@emotion/styled',
    pascalCaseFiles: true,
    linter: Linter.EsLint,
    publishable: true,
    bundler: 'vite',
    importPath,
  });

  await generateFiles(tree, `${__dirname}/files`, `libs/${options.name}`, {
    componentName: fromKebabCaseToPascalCase(options.name),
    fileName: options.name,
  });

  await addDependenciesToPackageJson(tree, { [importPath]: 'latest' }, {});

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
