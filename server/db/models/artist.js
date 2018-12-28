'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;

const Artist = db.define('artist', {

  name: {
    type: DataTypes.STRING(1e4), 
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  }

});

Artist.prototype.getAlbums = function () {
  return db.model('album').findAll({
    where : {artistId : this.id},
    include: [{
      model: db.model('song'),
      include: [{
        model: db.model('artist'),
        where: { id: this.id } 
      }]
    }]
  });
}

Artist.prototype.toJSON = function () {
  return Object.assign({}, this.get());
}

module.exports = Artist;
