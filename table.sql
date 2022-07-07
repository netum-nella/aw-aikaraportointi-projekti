CREATE TABLE Työajat 
(id SERIAL PRIMARY KEY, 
aloituspäivä DATE NOT NULL, 
aloitusaika TIME NOT NULL, 
lopetuspäivä DATE NOT NULL, 
lopetusaika TIME NOT NULL, 
projekti VARCHAR(255) NOT NULL, 
selite VARCHAR(255) NOT NULL); 

INSERT INTO Työajat (aloituspäivä, aloitusaika, lopetuspäivä, lopetusaika, projekti, selite)
VALUES ('2022-07-01', '08:00:00', '2022-07-06', '16:00:00', 'TuntiJ', 'ajanhallintajärjestelmän luonti');