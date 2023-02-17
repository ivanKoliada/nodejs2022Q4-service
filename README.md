# Home Library Service

## Instractions:

- Make sure that you have v18 LTS Node installed
- `git clone` https://github.com/ivanKoliada/nodejs2022Q4-service.git
- Open your newly created folder with your code editor
- Checkout `containerization-database-orm` branch
- Type `npm i` to install all dependencies.
- **Change** `.env.example` to `.env`

> **NOTE:** if hot reload does not work on windows - turn off setting general `Use the WSL 2 based engine`

## Running application:
- Run docker desktop
- To start application run command `npm run docker:start`

## Testing

After application running open new terminal and enter:

To run vulnerabilities scanning

```
npm run docker:scan
```

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
