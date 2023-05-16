import installVersioning from '@jscutlery/semver/src/generators/install';
import installPublishing from 'ngx-deploy-npm/src/generators/install/generator';

import { libraryGenerator } from '@nrwl/react';
import { formatFiles, readNxJson, Tree, generateFiles } from '@nx/devkit';
import { Linter } from '@nx/linter';

import { ComponentGeneratorSchema } from './schema';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default async function component(
  tree: Tree,
  options: ComponentGeneratorSchema
) {
  const workspaceConfigs = readNxJson(tree);

  await libraryGenerator(tree, {
    name: options.name,
    importPath: `@${workspaceConfigs.npmScope}/${options.name}`,
    unitTestRunner: 'vitest',
    style: '@emotion/styled',
    pascalCaseFiles: true,
    linter: Linter.EsLint,
    publishable: true,
    bundler: 'vite',
  });

  await generateFiles(tree, `${__dirname}/files`, `libs/${options.name}`, {
    componentName: capitalize(options.name),
    fileName: options.name,
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
