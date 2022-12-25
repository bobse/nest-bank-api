# SETUP Prisma for Next.js

## Install prisma dev

## `npm install prisma --save-dev`

---

## Init prisma project

`npx prisma init --datasource-provider postgresql`

---

## Install prisma client for production

`npm i @prisma/client`

---

## View DB

`npx prisma studio `

---

## Generate

<small><i>The prisma generate command reads your Prisma schema and updates the generated Prisma Client library inside node_modules/@prisma/client.</i></small>

`prisma generate`

---

## Migrations

`npx prisma migrate dev --name <nameOfMigration>`

## Prisma service

<small><i>Inside the src directory, create a new file called `prisma.service.ts` and add the following code to it:</i></small>

```import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```
