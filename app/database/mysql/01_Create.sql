
CREATE database db_dico_jdm ;
use db_dico_jdm ;

CREATE TABLE Aretes
(
  rid int,
  nA int,
  nB int,
  t int,
  w int,
  CONSTRAINT pk_Aretes PRIMARY KEY (rid),
  CONSTRAINT fk_Aretes_nA FOREIGN KEY (nA) REFERENCES Mots(eid),
  CONSTRAINT fk_Aretes_nB FOREIGN KEY (nB) REFERENCES Mots(eid),
  CONSTRAINT fk_Aretes_type FOREIGN KEY (t) REFERENCES AretesTypes(id)
)
;

CREATE TABLE AretesTypes
(
  rtid int,
  name varchar(100),
  nom_etendu varchar(100),
  info text,
  CONSTRAINT pk_AretesTypes PRIMARY KEY (rtid)
)
;

CREATE TABLE Mots
(
  eid int,
  name varchar(50),
  t int,
  w int,
  nf varchar(255),
  CONSTRAINT pk_Mot PRIMARY KEY (eid)
)
;

CREATE INDEX ind_name ON Mots (name(25));

mysql> desc MotsTypes ;
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int(11)     | NO   | PRI | NULL    | auto_increment |
| Name  | varchar(32) | NO   | PRI |         |                |
+-------+-------------+------+-----+---------+----------------+
CREATE TABLE MotsTypes
(
  id int,
  name varchar(32),
  CONSTRAINT pk_MotsTypes PRIMARY KEY (id)
)
;
mysql> desc MotsDefs ;
+----------+------------+------+-----+-------------------+-----------------------------+
| Field    | Type       | Null | Key | Default           | Extra                       |
+----------+------------+------+-----+-------------------+-----------------------------+
| id       | bigint(20) | NO   | PRI | NULL              | auto_increment              |
| termid   | int(11)    | NO   | MUL | NULL              |                             |
| def      | text       | NO   | MUL | NULL              |                             |
| date     | timestamp  | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| playerid | int(11)    | NO   | MUL | NULL              |                             |
+----------+------------+------+-----+-------------------+-----------------------------+

Drop table MotsDefs;
CREATE TABLE MotsDefs
(
  id int,
  termid int,
  def text,
  date timestamp,
  playerid int,
  CONSTRAINT pk_MotsDefs PRIMARY KEY (id),
  CONSTRAINT fk_MotsDefs_termid FOREIGN KEY (termid) REFERENCES Mots(eid)
)
;



CREATE OR REPLACE VIEW view_Mots_Def AS
SELECT N.id,N.name,N.w, T.def
FROM Mots N, MotsDefs T
WHERE T.termid = N.id;


SELECT N.id,N.name,N.w, T.def
FROM Mots N, MotsDefs T
WHERE (N.Name like "lion" or N.name like "lion>%") and T.termid = N.id ;

SELECT id,name,w, def
FROM view_Mots_Def
WHERE Name like "lion" or name like "lion>%" ;

SELECT N.id,N.name,N.w,NN.name,NN.w
FROM Mots N , Aretes A , Mots NN
WHERE  N.name like "ganglionner"
and
NN.id = A.nA
AND N.id = A.nB
LIMIT 25 ;

SELECT N.id,N.name,N.w,NN.name,NN.w , NN.def
FROM view_Mots_Def N , Aretes A , view_Mots_Def NN
WHERE  N.name like "ganglionner"
and
NN.id = A.nA
AND N.id = A.nB
LIMIT 25 ;
