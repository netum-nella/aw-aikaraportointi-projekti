
CREATE TABLE workhours (
    id SERIAL PRIMARY KEY, 
    startdate DATE NOT NULL, 
    starttime TIME NOT NULL, 
    enddate DATE NOT NULL, 
    endtime TIME NOT NULL, 
    sum INT NOT NULL,
    project VARCHAR(255) NOT NULL, 
    explanation VARCHAR(255) NOT NULL);

INSERT INTO workhours (startdate, starttime, enddate, endtime, sum,project, explanation)

VALUES ('2022-07-01', '08:00:00', '2022-07-06', '16:00:00',' ',TuntiJ', 'ajanhallintajärjestelmän luonti');