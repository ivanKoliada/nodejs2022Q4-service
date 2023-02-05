# Home Library Service

## Instractions:

- Make sure that you have v18 LTS Node installed
- `git clone` https://github.com/ivanKoliada/nodejs2022Q4-service.git
- Open your newly created folder with your code editor
- Checkout `rest-service` branch
- **Type** `npm i` or `npm i --force` **to install all dependencies.**
- Change `.env.example` to `.env`

## Running application:

- To start application run command `npm run start`.
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
