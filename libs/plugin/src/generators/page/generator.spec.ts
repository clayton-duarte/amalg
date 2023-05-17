import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import {
  Tree,
  addProjectConfiguration,
  readProjectConfiguration,
} from '@nx/devkit';

import generator from './generator';
import { PageGeneratorSchema } from './schema';

describe('page generator', () => {
  let tree: Tree;
  const options: PageGeneratorSchema = { name: 'test', project: 'test' };

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
