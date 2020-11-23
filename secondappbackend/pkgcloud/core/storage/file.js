/*
 * file.js: Base container from which all pkgcloud files inherit from
 *
 * (C) 2010 Charlie Robbins, Ken Perkins, Ross Kukulinski & the Contributors.
 *
 */

var util = require('util'),
    model = require('../base/model'),
    storage = require('../storage');

var File  = function (client, details) {
  model.call(this, client, details);
};

util.inherits(File, model);

File.prototype.remove = function (callback) {
  this.client.removeFile(this.containerName, this.name, callback);
};

File.prototype.download = function (options, callback) {
  this.client.download(options, callback);
};

File.prototype.__defineGetter__('fullPath', function () {
  return this.client._getUrl({
    container: this.containerName,
    path: this.name
  });
});

File.prototype.__defineGetter__('containerName', function () {
  return this.container instanceof storage.Container ? this.container.name : this.container;
});

module.exports = File;