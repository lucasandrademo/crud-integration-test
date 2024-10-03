## Dependencies:

* [NodeJS](https://nodejs.org/en);
* [Docker](https://www.docker.com/products/docker-desktop/);

## Environment:

create a file named *.env* inside the *crud-integration-test* directory:

``` .env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=
```

Enter any password and database name you prefer.

## To Run:

```bash
npm install
```
```bash
docker compose up
```
```bash
npm run start
```

## Swagger:
acces localhost:3000/api/docs

## To Run Tests:

#### unit tests with coverage
``` bash
npm run test -- src/users --coverage
```

#### integration test
``` bash
npm run test -- src/integration
```

#### integration and unit test
``` bash
npm run test
```

#### End-to-end test
``` bash
npm run test:e2e
```

## Coverage:

Access the HTML report at: *./crud-integration-test/coverage/lcov-report/index.html*