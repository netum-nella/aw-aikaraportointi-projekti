CREATE TABLE workhours(id SERIAL PRIMARY KEY, startday DATE NOT NULL, starttime TIME NOT NULL, enddate DATE NOT NULL, endtime TIME NOT NULL, project VARCHAR(255) NOT NULL, explanation VARCHAR(255) NOT NULL);

INSERT INTO workhours()