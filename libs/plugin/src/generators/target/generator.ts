import {
  updateProjectConfiguration,
  getProjects,
  formatFiles,
  Tree,
} from '@nx/devkit';

import { TargetGeneratorSchema } from './schema';

export default async function generator(
  tree: Tree,
  options: TargetGeneratorSchema
) {
  const projects = getProjects(tree);

  await projects.forEach((projectConfig) =>
    updateProjectConfiguration(tree, projectConfig.name, {
      root: projectConfig.root,
      targets: {
        ...projectConfig.targets,
        [options.name]: {
          executor: 'nx:run-commands',
          outputs: [],
          options: {
            command: 'npm run tsc --noEmit',
          },
        },
      },
    })
  );

  await formatFiles(tree);
}
