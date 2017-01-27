module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    areteTypeRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var areteType = require("../models/areteType");

// ***** Methods
//NONE

areteTypeRouter.get('/', function(req, res)
{
  console.log("coucou");
  var query = abstract_db.mysql_select(['*'],['AretesTypes'],"name like '%"+req.query.relation+"%'");
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list areteType'));
  });
});

app.use('/api/areteType',areteTypeRouter);
};
