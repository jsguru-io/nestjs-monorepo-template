# JSGuru NestJS Monorepo Template

### Setup and project installation
After you clone this project you need to copy the `.env.example` file into `.env` file:
```shell
cp .env.example .env
```
And then you can change your env variables and settings accordingly

We are using docker for running services locally, so in order to run the whole set of applications type:
```shell
docker-compose up -d
```

If you want to rebuild the application, for example, if you added new dependencies, just type:
```shell
docker-compose up -d --build --force-recreate
```

If you want to shut down your services just type:
```shell
docker-compose down --remove-orphans
```

If you only want to start some of the services (eg. `api-gateway` and `users` services), just type:
```shell
docker-compose up -d api-gateway users
```

If you want to trace the logs locally from docker container, type:
```shell
docker-compose logs -f
```

### Database versioning
Database versioning is done through the migrations which are located in 
`libs/database/migrations`. You'll notice there is already one migration laying there, the migration for creating the users table,
feel free to edit it or remove it if needed.

If you need to create new migration, type:
```shell
yarn db:migration:create <migration_name>
```

If you need to run the migrations in the database type:
```shell
yarn db:migrate
```

If you need to undo the last migration, type:
```shell
yarn db:migrate:down
```

If you need to reset the whole list of migrations, type:
```shell
yarn db:migrate:reset
```

### Models setup
In order to load the models and repositories in the application, you'll have to register them manually unfortunately,
because in the monorepo world there isn't easy way of finding the glob pattern of the models, so they models need
to be added manually to the `Sequelize` instance, the same goes for repositories inside `providers` array for `DatabaseModule`
located in `libs/database/src/database.module.ts`.

In order to register more models, add them to the `modelsProviders` array inside `libs/database/src/database.providers`.
The same goes for the repositories, just add them to the `repositoriesProviders` array in the same file.

### Data layer
Data layer's place is in `libs` folder and there you need to add all of the applications models and repositories.

Eg. you need to create new model called `Product`. You'll need to generate new library for that model called `book`, with command:
```shell
nest g lib product
```

After that you need to define model inside newly generated library, inside `libs/book/src/model/product.model.ts`,
and the same goes for the repository `libs/book/src/repository/product.repository.ts`, and after that you need to register them both in
database providers inside `libs/database/src/database.providers.ts`, in the both arrays present there, as explained
in the chapter above (you can take a look at existing `libs/user/` library).

### Business logic layer
So, now comes the part for exposing that model through some kind of exposure layer (like API).
How do we do that here? We will generate a new application called `products`, with command:
```shell
nest g app products
```
And then you will have new `main.ts`, `product.module.ts`, `product.controller.ts` and `product.service.ts` generated.
Our `product.module.ts` should by default import both `DatabaseModule` from `@app/database` and `NatsCommunicatorModuile` from `@app/nats-communicator` (we'll talk about NATS later).
After that you need to register new message listeners inside `product.controller.ts` controller, because this time we don't have APIs on the monorepo applications level, only on
`api-gateway` application, so that our `products` application can listen to the NATS messages that comes from the other applications.

So, if we want to return the list of products inside `products.controller.ts`, we would do something like:

```typescript
import { Controller } from "@nestjs/common";
import { ProductsService } from './products.service';
import { MessagePattern } from "@nestjs/microservices";
import { PaginatedSet } from "@jsgurucompany/jsg-nestjs-common";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductsService) {
  }

  @MessagePattern('products.findAll')
  async findAll(): Promise<PaginatedSet<Product[]>> {
    return this.productService.findAll();
  }
}
```

and then inside `api-gateway` application we would have new folders inside `apps/api-gateway/src` folder called `product` where we would have `product.controller.ts` (same as for the `user`).
In that `product.controller.ts` inside `api-gateway` application, we would have trigger that would call our above snippet for exposing the list of users that would look something like:
```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NatsCommunicatorService } from '@app/nats-communicator';
import { PaginatedProductSet } from '@app/product';
import { firstValueFrom } from 'rxjs';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly communicator: NatsCommunicatorService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedProductSet })
  async findAll(): Promise<PaginatedUsersSet> {
    return firstValueFrom(
      this.communicator.getClient().send('products.findAll', {}),
    );
  }
}
```
And that way we would wire our HTTP router (`api-gateway`) with our microservice-like application (`products`) and they both would communicate through NATS communication protocol.

Then, you would need to register that application inside your `docker-compose.yml` file, that would look something like:
```yaml
  products:
    env_file:
      - .env
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        BUILD_APP: products
    command: 'yarn start:dev products'
    volumes:
      - ./apps:/app/apps
      - ./libs:/app/libs
    depends_on:
      - nats
      - postgres
```

And also, last but not least, you will need to generate migrations for that new application with:
```shell
yarn db:migration:create create_products_table
```
And change the schema inside migration accordingly.

### API testing
API tests can be located inside `api-gateway/test` folder and they can similar to those ones in classic [nestjs-template](https://github.com/jsguru-io/nestjs-template/tree/master/test)
