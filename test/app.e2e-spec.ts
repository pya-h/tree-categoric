import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('<h1>Routes are on /category</h1>');
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/category')
      .send({ title: 'e2eTestNew', parent_id: null })
      .expect(201);
    expect(response.body.title).toBe('e2eTestNew');
    expect(response.body.parent_id).toBe(null);
  });

  it('/ (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .post('/category/cc433479-2f3f-4cb3-abee-ed12e2bddc06')
      .send({ title: 'testY_updated by e2e' })
      .expect(200);
    expect(response.body.title).toBe('testY_updated by e2e');
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/category/65108f4c-7b24-46ce-85e9-1e12f2a079a9')
      .expect(200);
    const expectedItem = {
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
    };

    expect(response.body).toEqual(expectedItem);
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/category')
      .expect(200);
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
      {
        id: '9013a8b7-2f41-4dc0-8fa8-a6d2230a3575',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '264eba57-4b8b-45e7-bb41-a9f2ba52c98b',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'b0d777c7-d40c-4977-8479-78dcf00f4458',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '0e191465-df6b-4361-aaf7-cf24a0e89d4b',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'bf7bfcf5-3a5b-4814-8755-8f59d7e5bb66',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'ed7046bc-6bd7-45ab-9cbf-fae1ab2ea414',
        title: '2nd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '0588cd1f-9882-4df2-8d9b-4c54eaa4cd22',
        title: '3rd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '31ae4a3b-0e79-49a3-831b-95a9b24d8ce1',
        title: 'undefined Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '0c6a21fd-a550-4e74-ba2e-5d4044db7d7d',
        title: '2nd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '1ac2839e-a0c7-4c2d-a4d3-f334eb2253e0',
        title: '3rd Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '32d71188-b90b-4da8-bcb5-f813a1a908a2',
        title: 'undefined Updated',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '4b4a62db-2477-4fc7-85c7-1e094bbdbf4f',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '3e9d3652-c74a-4435-8476-952bc49d76b8',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: 'cf9a89ff-7e91-4639-b9dc-83f1d5427215',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
      {
        id: '73cfa6b7-481d-490f-9760-1f55d16770c7',
        title: 'e2eTestNew',
        parent_id: null,
        subCategories: [],
      },
    ];
    for (const item of expectedItems)
      expect(response.body).toContainEqual(item);
  });

  it('/ (DELETE)', async () => {
    return await request(app.getHttpServer())
      .delete('/category/0b5a37e9-e594-458a-8222-9922736b0335')
      .expect(200); // this test just succeeds one time
  });
});
