/*jslint
node : true,
vars : true,
stupid : true,
nomen : true,
white : true
 */
// collection of named sql strings.
var dbQueries = {
    table : 'SELECT * FROM tracking',
    hit_count : 'SELECT COUNT(*) FROM tracking',
    ip_addresses : 'SELECT DISTINCT ip_address FROM tracking',
    browsers : 'SELECT DISTINCT browser FROM tracking',
    queries : 'SELECT DISTINCT query FROM tracking',
    add : 'INSERT INTO tracking (ip_address, browser, query) VALUES (?,?,?)'
};
/**
 *  Returns the file contents of the sql file named. The file must be located
 *  in the SQL files directory.
 */
function dbQueriesFile(filename) {
    'use strict';
    var fs = require('fs');
    var path = require('path');
    var location = path.join(__dirname, 'SQL files', filename);
    return fs.readFileSync(location);
}
/*
 * Defining accessor properties for sql that needs to be read from a file.
 *  This defers reading the file until the property is actually accessed.
 *  If I expected dbQueriesFile to be called multiple times for the same file
 *  I'd have to build in some sort of caching mechanism, like an array that
 *  would persist for the lifetime of this script that I could check for
 *  previously fetched file contents.
 */
Object.defineProperties(dbQueries, {
    create_table : {
        get : function () {
            'use strict';
            return dbQueriesFile('tracking_table_create.sql');
        },
        configurable : false,
        enumerable : true
    },
    reset : {
        get : function () {
            'use strict';
            var out = 'DROP TABLE IF EXISTS tracking;\r\n' +
            dbQueriesFile('tracking_table_create.sql');
            return out;
        },
        configurable : false,
        enumerable : true
    }
});


module.exports = dbQueries;
