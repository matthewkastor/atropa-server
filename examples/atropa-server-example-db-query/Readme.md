Copy this directory wherever you want to start a new Atropa Server project and
 then, in the copy, run

```
npm install
```

It will set everything up for you. Then run

```
npm start
```

And open your browser to http://localhost:9999


## Modifying this project

You can easily change the database using [sqlite studio](http://sqlitestudio.pl/).
 Simply connect to the database and augment it to your heart's content. If you
 want to continue using the reset query, then grab the `DDL` of your table(s)
 and replace the contents of `tracking_table_create.sql` with your sql to build
 up your database. You'll also have to change the statements stored in
 `dbQueries.js` under it's `reset` property so that it drops all your tables.

Adding and removing queries to execute is as simple as adding and removing
 properties from `dbQueries.js` `exports` object.

To change the way data is displayed in `index.html` you'll have to edit the file
 to add in some css. If you want the information displayed as something other
 than text in a pre element, change the pre element into whatever element you
 want and edit the `success` function inside `getQueryResults.js`.

## Explanation of Files

`server.js` is called when you run `npm start` edit it to change the port or
 root directory of your project. If you change the root directory you'll have to
 move everything except the `node_modules` folder, `package.json`, `Readme.md`,
 and `server.js` to the new root directory.

`database.db3` is an sqlite database you can access with any of the normal tools
 for managing sqlite databases, like [sqlite studio](http://sqlitestudio.pl/)
 or, if you're feeling adventurous grab the
 [sqlite manager](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/)
 extension for Firefox and do fancy tricks with your browser. This file is
 accessed by the `executeQuery` function inside `sqliteQuery.jsn`.

`sqliteQuery.jsn` runs in the context of the server. It decides which database
 query to run based on the `q` parameter's value when accessing the page through the browser. It basically just `requires` `dbQueries.js` and grabs the property
 from it's `exports` object that matches the name given by the `q` parameter
 from the url. When given an invalid name it will run the query stored in the
 `table` property of `dbQueries.js`. Inside the function `queryDb`, the first
 thing that happens is that some information about the request made to
 `sqliteQuery.jsn` is recorded. You'll have to change that function if you want
 to modify this project into something else, the rest of the file is probably ok
 to leave as is.

`dbQueries.js` runs in the context of the server. It simply exports an object
 whose properties contain string values representing SQL queries. Basically the
 property names give the queries names so arbitrary queries may be added to the
 object and accessed easily. Larger queries are stored in the `SQL files`
 folder as plain `sql` files. Look at the source of `dbQueries.js` for examples
 of how to load the contents of an sql file into the exports object, without
 wasting time reading every single sql file every time the `dbQueries` module is
 required.

`getQueryResults.js` loads in the context of `index.html`. It provides a wrapper
 around an `XMLHttpRequest` object that will fetch information from the running
 server and display it in the web page. The function `getQueryResults` takes a
 single argument which specifies which property from `dbQueries` to access when
 looking up the sql query to run.

`index.html` is the front end to the database. The buttons are coded to call
 `getQueryResults` with various arguments so it will display information
 returned from the several predefined queries.
