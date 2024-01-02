// todo.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TreeCategoryService } from './tree-category.service';
import { PrismaService } from '../prisma.service';

describe('TreeCategoryService', () => {
  let treeCategoryService: TreeCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeCategoryService, PrismaService],
    }).compile();

    treeCategoryService = module.get<TreeCategoryService>(TreeCategoryService);
  });

  it('should be defined', () => {
    expect(treeCategoryService).toBeDefined();
  });

  // READ ONE

  it('get some categories one by one', async () => {
    // searching for valid ids
    const IDs = [
      'f82f5f27-6e46-4ca3-951e-3018fe9bd99c',
      '9b9f61c2-3e1c-4265-8ddc-6de33eb210c0',
      '9bfdd29d-be03-463f-85e7-fd7b96767b99',
    ];

    for (const id of IDs) {
      const item = await treeCategoryService.findOne(id);
      expect(item.id).toBe(id);
    }

    // now search for an unexisting one
    const nID = 'Some Nonesense id';
    let found = false;
    try {
      const item = await treeCategoryService.findOne(nID);
      expect(item).toEqual(null);
      found = Boolean(item); // not found body => empty
    } catch (ex) {
      found = false;
    } finally {
      expect(found).toBe(false);
    }
  });

  // CREATE
  it('create new category/subcategory', async () => {
    const newParent = await treeCategoryService.create({
      title: 'testX',
      parent_id: null,
    });
    expect(newParent.title).toBe('testX');
    expect(newParent.parent_id).toBe(null);

    for (const title of ['sub1', 'sub2', 'sub_n']) {
      const newSub = await treeCategoryService.create({
        title,
        parent_id: newParent.id,
      });
      expect(newSub.title).toEqual(title);
      expect(newSub.parent_id).toEqual(newParent.id);
    }
  });

  // DELETE
  it('delete a category (last one)', async () => {
    // get an item
    const result = await treeCategoryService.findAll();
    if (result.length) {
      const toBeDeleted = result[result.length - 1];
      const deleted = await treeCategoryService.delete(toBeDeleted.id);
      expect(deleted.id).toEqual(toBeDeleted.id);
      expect(deleted.title).toEqual(toBeDeleted.title);

      let done = false;
      try {
        // after deleting the item, it must not be removed again!
        await treeCategoryService.delete(toBeDeleted.id);
        done = true;
      } catch (ex) {
        // whatever
        done = false;
      } finally {
        expect(done).toBe(false);
      }
    }
  });

  // UPDATE
  it('update a category; last 3 from get req', async () => {
    // get an item
    const newTitles = ['1st', '2nd', '3rd'];
    const result = await treeCategoryService.findAll();
    for (let i = 1; i <= result.length && i <= 3; i++) {
      const toBeUpdated = result[result.length - i];
      const updated = await treeCategoryService.update(toBeUpdated.id, {
        title: newTitles[i] + ' Updated',
        parent_id: null, // if the're subcategories, put them out
      });
      expect(updated.title).toBe(newTitles[i] + ' Updated');
      expect(updated.parent_id).toBe(null);
    }
  });
  // READ
  it('should return an empty array initially', async () => {
    const result = await treeCategoryService.findAll();
    const expectedItems = [
      {
        id: '4ba0299e-dbfe-4ec2-8e09-e4203dd1d304',
        title: 'testX',
        parent_id: null,
        subCategories: [
          {
            id: 'b55924e9-2d93-4e89-bc52-6295df20f80a',
            title: 'sub1',
            parent_id: '4ba0299e-dbfe-4ec2-8e09-e4203dd1d304',
          },
          {
            id: '59638776-b03a-4ae7-a279-043b1c582e02',
            title: 'sub2',
            parent_id: '4ba0299e-dbfe-4ec2-8e09-e4203dd1d304',
          },
          {
            id: '2d237fdd-e9b3-4821-a7c7-50b4ce009898',
            title: 'sub_n',
            parent_id: '4ba0299e-dbfe-4ec2-8e09-e4203dd1d304',
          },
        ],
      },
      {
        id: 'a93354fe-b55e-4619-b1bc-f9abae455e99',
        title: 'testX',
        parent_id: null,
        subCategories: [
          {
            id: '8b8bf97a-852c-4940-9c8d-bb6404a6115e',
            title: 'sub1',
            parent_id: 'a93354fe-b55e-4619-b1bc-f9abae455e99',
          },
          {
            id: 'c85ad410-cb77-42e8-b3b3-fd75873ae687',
            title: 'sub2',
            parent_id: 'a93354fe-b55e-4619-b1bc-f9abae455e99',
          },
          {
            id: '1d2c1c71-6dcb-47f7-a63d-dfe807d6b499',
            title: 'sub_n',
            parent_id: 'a93354fe-b55e-4619-b1bc-f9abae455e99',
          },
        ],
      },
      {
        id: '65108f4c-7b24-46ce-85e9-1e12f2a079a9',
        title: 'testX',
        parent_id: null,
        subCategories: [
          {
            id: '705ac6a5-856e-4776-a34d-d5cdc4937afc',
            title: 'sub1',
            parent_id: '65108f4c-7b24-46ce-85e9-1e12f2a079a9',
          },
          {
            id: '24558798-f20e-4d7f-a6ad-92b600acc200',
            title: 'sub2',
            parent_id: '65108f4c-7b24-46ce-85e9-1e12f2a079a9',
          },
          {
            id: '1228603d-6658-4638-9250-82ab93532417',
            title: 'sub_n',
            parent_id: '65108f4c-7b24-46ce-85e9-1e12f2a079a9',
          },
        ],
      },
      {
        id: '9b9f61c2-3e1c-4265-8ddc-6de33eb210c0',
        title: 'testX',
        parent_id: null,
        subCategories: [
          {
            id: '17b58557-2413-4baf-a573-a19dae11427c',
            title: 'sub1',
            parent_id: '9b9f61c2-3e1c-4265-8ddc-6de33eb210c0',
          },
          {
            id: 'c331ba53-c501-4c9b-baa3-f38c8d9514c6',
            title: 'sub2',
            parent_id: '9b9f61c2-3e1c-4265-8ddc-6de33eb210c0',
          },
          {
            id: '2a3fc358-905f-413d-8eda-2cbee78c8b42',
            title: 'sub_n',
            parent_id: '9b9f61c2-3e1c-4265-8ddc-6de33eb210c0',
          },
        ],
      },
      {
        id: '0182bfb9-e7fe-4ddc-a103-887db112180c',
        title: 'sub1',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '538a5df7-2d43-4a6c-af6d-4c60937df960',
        title: 'sub2',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '5ac2b8ee-3df3-42ad-8125-e51f761a7a9b',
        title: 'sub_n',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'ba5ff2be-8a5e-4f5a-96be-1b21cc2a5163',
        title: 'sub1',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '168b319f-909b-46d8-862d-b8c25cc0488e',
        title: '2nd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '1bfe5741-3dc2-48ad-9f1b-53671560653b',
        title: '2nd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'f82f5f27-6e46-4ca3-951e-3018fe9bd99c',
        title: '3rd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '9bfdd29d-be03-463f-85e7-fd7b96767b99',
        title: 'undefined Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '0a759ab3-0699-47e8-8a4c-572b05a122f9',
        title: 'testX',
        parent_id: null,
        subCategories: [
          {
            id: '61562e9b-8c45-4070-aea8-3796946c5327',
            title: 'sub1',
            parent_id: '0a759ab3-0699-47e8-8a4c-572b05a122f9',
          },
          {
            id: '02fb2d4d-8ee6-4541-8c10-b0c48a7f200d',
            title: 'sub2',
            parent_id: '0a759ab3-0699-47e8-8a4c-572b05a122f9',
          },
          {
            id: 'e7f78551-236d-4e13-aed7-2193c191a0a9',
            title: 'sub_n',
            parent_id: '0a759ab3-0699-47e8-8a4c-572b05a122f9',
          },
        ],
      },
      {
        id: 'adde151a-e067-4bb8-bf35-b4f1fa882dc4',
        title: '2nd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'd698c151-296a-4ae6-816e-045eb53744fd',
        title: '3rd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '7dea7dc8-9ff9-4334-88cf-442392e49b32',
        title: 'undefined Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'f9205e7c-b8e9-45cb-9d2b-5aba7498c09c',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
    ];
    for (const item of expectedItems) expect(result).toContainEqual(item);
  });
});
