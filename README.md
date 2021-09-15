# typeorm-ns8-ng-example
Example application that uses the latest version of TypeORM and Nativescript

## Dev Note
Currently a patched version of the typeorm npm package has been copied locally in this repository.
It is awaiting this pull request to be merged [https://github.com/typeorm/typeorm/pull/8182](https://github.com/typeorm/typeorm/pull/8182)

## Usage
1. Install the dependencies for nativescript sqlite and typeorm.
    ```bash
    npm i typeorm reflect-metadata nativescript-sqlite
    ns plugin add @pekevski/typeorm
    ```

2. Create a database connection in your applications entry point eg. `main.ts`

    ```js
    let driver = require('nativescript-sqlite');

    // use an iife to run it before angular starts
    (async () => {
        console.log('START APP')
        try {
            const connection = await createConnection({
                database: 'test.db',
                type: 'nativescript',
                driver,
                entities: [
                    User,
                    // ... more models here
                ],
                logging: true
            })

            // Dangerously drops all tables on app start if true
            // connection.synchronize(true);

            console.log("Connection Created")
        } catch (err) {
            console.error(err)
        }
    })();
    ```

3. Then follow the instructions on how to use [TypeOrm](https://typeorm.io/)

## License

Apache License Version 2.0
