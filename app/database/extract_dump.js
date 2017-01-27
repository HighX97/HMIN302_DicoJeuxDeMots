var neo4j = require('neo4j-driver').v1;
var fs = require('fs');
//https://www.npmjs.com/package/line-by-line
var LineByLineReader = require('line-by-line');
var cypher = require('node-cypher');

function extractData_fromDumpTxt(table , db)
{
  var filePath_2 ='./JDM-LEXICALNET-FR/01022017-LEXICALNET-JEUXDEMOTS-FR_utf8.txt';
  lr = new LineByLineReader(filePath_2);
  var cmpt_rtid = 0;
  var cmpt_eid = 0;
  var cmpt_rid = 0;
  var date = new Date();
  var date_form = date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear() ;
  lr.on('line', function (line) {
    if (line.substring(0, 3) == "rti" && table.indexOf("RelationTypes") != -1)
    {
      var relation_info = line.split("|");
      var query_insert ="";
      if (cmpt_rtid++ == 0)
      {
        var pre_head ="";
        var post_head ="";
        if (db.toLowerCase() == "sql")
        {
          pre_head += "INSERT INTO Mots ("
          post_head = ") VALUES \n";
        }
        query_insert += pre_head + "name , nom_etendu , info , rtid \n" + post_head;

      }
      var pre_body ="";
      var post_body ="";
      if (db.toLowerCase() == "sql")
      {
        pre_body = "( "
        post_body = " )";
      }
      query_insert += pre_body ;

      var n = (String(relation_info[1]).split("=")[1]) ;
      while (n.indexOf('"') !== -1 || n.indexOf("'") !== -1){
        n = n.replace('"','') ;
        n = n.replace("'",'') ;
      }
      query_insert += "'"+n+"' ,";
      n = (String(relation_info[2]).split("=")[1]) ;
      while (n.indexOf('"') !== -1 || n.indexOf("'") !== -1){
        n = n.replace('"','') ;
        n = n.replace("'",'') ;
      }
      query_insert += "'"+n+"' ,";
      n= (String(relation_info[3]).split("=")[1]) ;
      while (n.indexOf('"') !== -1 || n.indexOf("'") !== -1){
        n = n.replace('"','') ;
        n = n.replace("'",' ') ;
      }
      query_insert += "'"+n+"'";
      query_insert += ","+String(relation_info[0]).split("=")[1] ;
      query_insert += post_body ;

      fs.appendFile('relationTypes_dump_'+date_form+'.csv', query_insert+"\n", function (err)
      {
        //console.log(query_insert);
      });
    }
    else if (line.substring(0, 3) == "eid" && table.indexOf("Mots") != -1)
    {
      var relation_info = line.split("|");
      var query_insert ="";
      if (cmpt_eid++ == 0)
      {
        query_insert += "name , t , w , nf , eid \n";
      }
      var n= (String(relation_info[1]).split("=")[1]) ;
      while (n.indexOf('"') !== -1 || n.indexOf("'") !== -1){
        n = n.replace('"','') ;
        n = n.replace("'",'') ;
      }
      query_insert += "'"+n+"' ,";
      query_insert += String(relation_info[2]).split("=")[1]+"," ;
      query_insert += String(relation_info[3]).split("=")[1];
      if(relation_info.length > 4)
      {
          var nf= String(relation_info[4]).substring(3) ;
          while (nf.indexOf('"') !== -1 || nf.indexOf("'") !== -1){
            nf = nf.replace('"','') ;
            nf = nf.replace("'",'') ;
          }
          query_insert += " , "+nf;
      }
      else {
          query_insert += " , "+"";
      }
      query_insert += ","+String(relation_info[0]).split("=")[1] ;


      fs.appendFile('mots_dump_'+date_form+'.csv', query_insert+"\n", function (err)
      {
        //console.log(query_insert);
      });
    }
    else if ( line.substring(0, 3) == "rid" && table.indexOf("Aretes") != -1)
    {
      var relation_info = line.split("|");
      var query_insert ="";
      if (cmpt_eid++ == 0)
      {
        query_insert += "rid , nA , nB , t , w \n";
      }
      query_insert += String(relation_info[0]).split("=")[1]+", " ;
      query_insert += String(relation_info[1]).split("=")[1]+", " ;
      query_insert += String(relation_info[2]).split("=")[1]+", " ;
      query_insert += String(relation_info[3]).split("=")[1]+", " ;
      query_insert += String(relation_info[4]).split("=")[1] ;
      fs.appendFile('aretes_dump_'+date_form+'.'+db, query_insert+"\n", function (err)
      {
        //console.log(query_insert);
      });
    }
  });
}


/*
============================================================================================================
*/

//convert_to_csv_node()
//insert_noeuds_live()
//insert_noeuds_cypher()w
//insert_aretes_cypher()
//session.close();
//insert_aretes_sql()
//extractData_fromDumpTxt_SQL() ;
extractData_fromDumpTxt("RelationTypes Mots","csv") ;
