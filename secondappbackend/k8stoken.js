const mysqlx = require('@mysql/xdevapi');

module.exports = mysqlx.getClient('mysqlx://alan:1234@localhost:33060/tempdb');