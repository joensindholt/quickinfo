var express = require('express');
var debug = require('debug')('web:server');
var JwtBearerStrategy = require('passport-http-jwt-bearer').Strategy;

module.exports = {

  /* GET schoolIntraMessage listing. */
  get: function(req, res, next) {

    debug(JwtBearerStrategy);

    debug('getting school intra messages from db');
      // Get data from db
    db.collection('SchoolIntraMessage')
      .find({}, {
        Title: 1,
        Text: 1,
        From: 1,
        To: 1,
        Date: 1
      })
      .sort({
        Date: -1
      })
      .limit(50)
      .map(function(doc) {
        return {
          title: doc.Title,
          text: doc.Text,
          from: doc.From,
          to: doc.To,
          date: doc.Date
        }
      })
      .toArray(function(err, docs) {
        res.send(docs);
        debug('messages send')
      });
  }
}
