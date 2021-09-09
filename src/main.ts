import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { AppModule } from './app/app.module'
import { createConnection } from "typeorm";
import { User } from './models/User';

import "reflect-metadata"

//driver
let driver = require('nativescript-sqlite');


(async () => {

  console.log('START APP')
  console.log('dan test', global.process)


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

        console.log("Connection Created")

        // setting true will drop tables and recreate
        await connection.synchronize(false) 

        console.log("Synchronized")


    } catch (err) {
        console.error(err)
    }
})();


runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

