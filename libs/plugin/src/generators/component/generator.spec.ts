import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import {
  Tree,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nx/devkit';

import generator from './generator';
import { ComponentGeneratorSchema } from './schema';

describe('component generator', () => {
  let tree: Tree;
  const options: ComponentGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(tree, options);

    const config = readProjectConfiguration(tree, options.name);

    expect(config).toBeDefined();
  });
});
