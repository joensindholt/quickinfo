var express = require('express');
var debug = require('debug')('web:server');

module.exports = {

  /* GET contacts */
  getAll: function(req, res, next) {

    debug('getting contacts from db')
      // Get data from db
    db.collection('SchoolIntraContact')
      .find({}, {
        _id: 1,
        To: 1,
        StudentName: 1,
        ContactPerson: 1,
        Address: 1,
        Mobile: 1,
        Phone: 1,
        WorkPhone: 1
      })
      .sort({
        StudentName: 1
      })
      .map(function(doc) {
        return {
          id: doc._id,
          to: doc.To,
          studentName: doc.StudentName,
          contactPerson: doc.ContactPerson,
          address: doc.Address,
          mobile: doc.Mobile.replace('<br/>', ', '),
          phone: doc.Phone.replace('<br/>', ', '),
          workPhone: doc.WorkPhone.replace('<br/>', ', ')
        }
      })
      .toArray(function(err, docs) {
        res.send(docs);
        debug('contacts sent')
      });
  },

  /* Get single contact */
  get: function(req, res, next) {
    db.collection('SchoolIntraContact')
      .find({ _id: req.params.contactId }, {
        _id: 1,
        To: 1,
        StudentName: 1,
        ContactPerson: 1,
        Address: 1,
        Mobile: 1,
        Phone: 1,
        WorkPhone: 1
      })
      .sort({
        StudentName: 1
      })
      .map(function(doc) {

        var address = doc.Address;
        var addresses = doc.Address.split('<br/>');
        if (addresses.length > 1 && addresses[1] === addresses[0]) {
          addresses.pop();
        }

        var contactPersons = doc.ContactPerson.split('<br/>');
        var mobilePhones = doc.Mobile.split('<br/>');

        return {
          id: doc._id,
          to: doc.To,
          studentName: doc.StudentName,
          contactPersons: contactPersons,
          addresses: addresses,
          mobilePhones: mobilePhones,
          phone: doc.Phone,
          workPhone: doc.WorkPhone
        }
      })
      .next(function(err, doc) {
        res.send(doc);
        debug('contact sent')
      });
  }
}
