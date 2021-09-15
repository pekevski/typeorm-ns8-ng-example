import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { AppModule } from './app/app.module'
import { createConnection } from "typeorm";
import { User } from './models/User';

import "reflect-metadata"

//driver
let driver = require('nativescript-sqlite');


(async () => {

  console.log('START APP')


    try {
        const connection = await createConnection({
            database: 'test.db',
            type: 'nativescript',
            driver,
            entities: [
              User
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


runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

