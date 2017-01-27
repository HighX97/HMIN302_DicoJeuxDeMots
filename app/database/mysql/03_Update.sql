RENAME TABLE `Nodes` TO `Mots`;
RENAME TABLE `Mots` TO `Nodes`;
RENAME TABLE `NodeTypes` TO `MotsTypes`;
RENAME TABLE `RelationTypes` TO `AretesTypes`;
RENAME TABLE `TermDef` TO `MotsDefs`;


ALTER TABLE Mots DROP PRIMARY KEY;

ALTER TABLE Aretes
ALTER COLUMN nA int(20)
;

ALTER TABLE Aretes
ALTER COLUMN nB int(20)
;


ALTER TABLE Aretes
ADD CONSTRAINT fk_Aretes_nA
FOREIGN KEY (nA)
REFERENCES Mots(eid)
;

ALTER TABLE Aretes
ADD CONSTRAINT fk_Aretes_nA
FOREIGN KEY (nA)
REFERENCES Mots(eid)
;


ALTER TABLE Aretes
ADD CONSTRAINT fk_Aretes_nB
FOREIGN KEY (nb)
REFERENCES Mots(id)
;




UPDATE AretesTypes
SET name = REPLACE(name, '\'', '')
;

UPDATE AretesTypes
SET nom_etendu = REPLACE(nom_etendu, '\'', '')
;
