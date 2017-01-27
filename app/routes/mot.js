module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    motRouter = express.Router();
    mysql = require('mysql');

    //Helpers:
    var commonHelper   = require('../helpers/common');
    var abstract_db = require("../models/abstract_db");
    var mot = require("../models/mot");

// ***** Methods
//NONE

motRouter.get('/', function(req, res)
{
  console.log("coucou");
  var query = abstract_db.mysql_select(['name'],['Mots'],"name like '%"+req.query.mot+"%'","w desc ","10");
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,'list mots'));
  });
});

motRouter.get('/def', function(req, res)
{
  var query = "select m.eid , m.name , md.def from Mots m , MotsDefs md where m.name like '"+req.query.mot+"' and m.eid = md.id ";
  query += "union ";
  query += "select m.eid , m.name , md.def from Mots m , MotsDefs md where m.name like '"+req.query.mot+">%' and m.eid = md.id ";
  //abstract_db.mysql_select(['N.eid','N.name','N.w','T.def'],['Mots N','MotsDefs T'],'N.eid=T.termid and N.name like "%'+req.body.mot+'%"',"N.w desc ","25");
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,mot.table+'/def'));
  });
});


motRouter.post('/def_assoc', function(req, res)
{
  var query = abstract_db.mysql_select(['RT.name as rt_name','NN.eid','NN.name','NN.w','T.def'],['Mots N','MotsDefs T','Aretes A ' ,' Mots NN ','AretesTypes RT'],'A.nA = N.eid and A.nB = NN.eid and T.termid = A.nB and RT.rtid=A.t and N.name = "'+req.body.mot+'"',"A.w desc ","25");
console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,mot.table+'/def_assoc'));
  });
});

motRouter.get('/relation', function(req, res)
{
  var query = abstract_db.mysql_select(['RT.name as rt_name','RT.rtid','NN.eid','NN.name','NN.w'],['Mots N','Aretes A ' ,' Mots NN ','AretesTypes RT'],'A.nA = N.eid and A.nB = NN.eid and RT.rtid=A.t and N.name = "'+req.query.mot+'"',"A.w desc ","200");
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,mot.table+'/def_assoc'));
  });
});

motRouter.get('/areteType', function(req, res)
{
  var query = `select AT.rtid , AT.name , AT.nom_etendu , AT.info, COUNT(A.rid) as quantity
  from Mots M , Aretes A , AretesTypes AT , Mots MM
  where M.name = '`+req.query.mot+`' and ((M.eid=A.nA and MM.eid=A.nb ) or (M.eid=A.nB and MM.eid=A.nA)) and A.t = AT.rtid
  GROUP BY AT.rtid`;
  //abstract_db.mysql_select(['N.eid','N.name','N.w','T.def'],['Mots N','MotsDefs T'],'N.eid=T.termid and N.name like "%'+req.body.mot+'%"',"N.w desc ","25");
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,mot.table+'/areteType'));
  });
});

motRouter.get('/byRelation', function(req, res)
{
  var query = `select At.name as rt_name , A.nA , A.nB , M.name , MM.name as query  ,M.eid as id , MD.def
  from AretesTypes At, Aretes A , Mots M , Mots MM , MotsDefs MD
  where  A.nA = M.eid and A.nB = MM.eid and M.eid = MD.id and MM.name='`+req.query.mot+`' and At.name = '`+req.query.relation+`' and At.rtid = A.t order by MM.w desc limit 100 ;`;
  //abstract_db.mysql_select(['N.eid','N.name','N.w','T.def'],['Mots N','MotsDefs T'],'N.eid=T.termid and N.name like "%'+req.body.mot+'%"',"N.w desc ","25");
  console.log(query);
  abstract_db.connection.query(query, function(err, result)
  {
    res.json(commonHelper.result_json(err, result,mot.table+'/areteType'));
  });
});





  app.use('/api/mot',motRouter);
};
