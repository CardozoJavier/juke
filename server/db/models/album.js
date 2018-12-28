'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;
const unique = require('./plugins/unique-through')

const Album = db.define('album', {

  name: {
    type: DataTypes.STRING(1e4),
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  artists: unique('artists').through('songs'),
  imageUrl: {
    type: DataTypes.VIRTUAL,
    get: function () {
      return `/api/albums/${this.id}/image`;
    }
  }
}, {

  scopes: {
    songIds: () => ({ 
      include: [{
        model: db.model('song'),
        attributes: ['id']
      }]
    }),
    populated: () => ({
      include: [{
        model: db.model('song').scope('defaultScope', 'populated')
      }]
    })
  }
});

Album.prototype.toJSON = function () {
  return Object.assign({}, this.get());
}

module.exports = Album;
