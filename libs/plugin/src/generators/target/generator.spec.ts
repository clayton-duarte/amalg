import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import {
  Tree,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nx/devkit';

import generator from './generator';
import { TargetGeneratorSchema } from './schema';

describe('target generator', () => {
  let tree: Tree;
  const options: TargetGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(tree, 'test', {
      root: 'libs/test',
    });
  });

  it('should run successfully', async () => {
    await generator(tree, options);

    const config = readProjectConfiguration(tree, 'test');

    expect(config).toBeDefined();
  });
});
