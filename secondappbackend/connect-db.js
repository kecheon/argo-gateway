const mysqlx = require('@mysql/xdevapi');

module.exports = mysqlx.getClient('mysqlx://argo:devstack@20.194.32.137:33060/tempdb');