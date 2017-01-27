select *
from Mots
where name like 'chat'
union
select *
from Mots
where name like 'chat>%' ;

select m.eid , m.name , md.def
from Mots m , MotsDefs md
where m.name like 'chat' or m.name like 'chat>%' and m.eid = md.id
union
select m.eid , m.name , md.def
from Mots m , MotsDefs md
where m.name like 'chat>%' and m.eid = md.id ;


select * from Mots where name like 'chat>%' ;

select At.name , A.nA , A.nB , M.name , MM.name
from AretesTypes At, Aretes A , Mots M , Mots MM
where  A.nA = M.eid and A.nB = MM.eid and MM.name='chien' and At.name = '\'r_isa\'' and At.rtid = A.t order by MM.w desc limit 100 ;


SELECT SUBSTR(name, 2)
FROM AretesTypes

SELECT SUBSTRING(
  sentence,
  LOCATE('\'', sentence),
  LOCATE('\'', sentence, (LOCATE('\'', sentence) + 1)) - LOCATE('\'', sentence)
)
FROM (SELECT 'THIS \'IS\' A TEST' AS sentence) temp
;

SELECT SUBSTR(SUBSTRING(
  name,
  LOCATE('\'', name),
  LOCATE('\'', name, (LOCATE('\'', name) + 1)) - LOCATE('\'', name)
),2)
FROM AretesTypes
;
