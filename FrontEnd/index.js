"use strict";

import * as readline from "readline";
import pkg from "pg";
import "dotenv/config";
const { Client } = pkg;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

await connectDB();
async function connectDB() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });


function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

let startdays = [];
let starttimes = [];
let enddays = [];
let endtimes = [];
let projects = [];
let explanations = [];
let totalhours = [];
let summary = [];


// Syötteenä tulisi olla työn: Aloituspäivämäärä, Aloitusaika, Lopetuspäiväämäär, Lopetusaika, Projekti, mihin työ kohdistuu, Selite (mitä on tehty)
// DONE
async function getInput() {
  rl.question("Aloituspäivämäärä muodossa 'YYYY/MM/DD': ", (startDay) => {
    rl.question("Aloitusaika muodossa HH:MM:SS: ", (aAika) => {
      rl.question("Lopetuspäivämäärä muodossa 'YYYY/MM/DD': ", (lPäivä) => {
        if (startDay <= lPäivä) {
          rl.question("Lopetusaika muodossa HH:MM:SS: ", (lAika) => {
            if (startDay < lPäivä) {
              endtimes.push(lAika);
              totalhours.push(0 - parseInt(aAika) + parseInt(lAika));
            } else if (startDay > lPäivä) {
              console.log(
                "Lopetusaika on aikaisempi kuin aloitusaika, poistu komennosta"
              );
              rl.close();
            } else if (aAika < lAika) {
              endtimes.push(lAika);
              totalhours.push(parseInt(lAika) - parseInt(aAika));
            }
            rl.question("Projekti: ", (projekti) => {
              rl.question("Selite: ", (selite) => {
                startdays.push(startDay);
                starttimes.push(aAika);
                enddays.push(lPäivä);
                projects.push(projekti);
                explanations.push(selite);
                totalhours.push(
                  getDifferenceInHours(new Date(startDay), new Date(lPäivä))
                );
                rl.close();
              });
            });
          });
        } else {
          console.log(
            "Aloituspäivämäärä on myöhempi kuin lopetuspäivämäärä, poistu komennosta"
          );
          rl.close();
        }
      });
    });
  });
}

getInput();
async function rl(){ rl.on("close", () => {
  for (let i = 0; i < startdays.length; i++) {
    summary.push(
      startdays,
      starttimes,
      enddays,
      endtimes,
      totalhours,
      projects,
      explanations
    );
  
  console.log(
    `Aloitus:${startdays[i]} ${starttimes[i]}, lopetus: ${enddays[i]} ${endtimes[i]}, projekti sekä selitys: ${projects[i]}, ${explanations[i]}.`
  );
  }
});
}
// Validoi tarvittaessa käyttäjän syötteet oikeellisiksi,  Aloituspäivä ei saa olla lopetuspäivän jälkeen, Dataformaatin oikeellisuus
// DONE should be able to validate the input

// Syötä data Databaseen
  async function lähetä() {
    client.query(
      "INSERT INTO workhours (startdate, starttime, enddate, endtime, sum, project, explanation) VALUES ?",
      [summary],
      (err) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("Tieto lisätty");
        }
      }
    );
  }
  lähetä();

await client.end();

}