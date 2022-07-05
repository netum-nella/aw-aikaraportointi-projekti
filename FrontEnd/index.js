"use strict";
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let aloituspäivät = [];
let aloitusajat = [];
let lopetuspäivät = [];
let lopetusajat = [];
let projektit = [];
let selitteet = [];
let kooste = [];

// Syötteenä tulisi olla työn: Aloituspäivämäärä, Aloitusaika, Lopetuspäiväämäär, Lopetusaika, Projekti, mihin työ kohdistuu, Selite (mitä on tehty)

rl.question(`Aloituspäivämäärä:`, (aloituspäivämäärä) => {
  aloituspäivät.push(aloituspäivämäärä);
  rl.question(`Aloitusaika:`, (aloitusaika) => {
    aloitusajat.push(aloitusaika);
    rl.question(`Lopetuspäivämäärä:`, (lopetuspäivämäärä) => {
      lopetuspäivät.push(lopetuspäivämäärä);
      rl.question(`Lopetusaika:`, (lopetusaika) => {
        lopetusajat.push(lopetusaika);
        rl.question(`Projekti:`, (projekti) => {
          projektit.push(projekti);
          rl.question(`Selite:`, (selite) => {
            selitteet.push(selite);
            rl.close();
          });
        });
      });
    });
  });
});

rl.on("close", () => {
  for (let i = 0; i < aloituspäivät.length; i++) {
    kooste.push(
      `Aloitus:${aloituspäivät[i]} ${aloitusajat[i]}, lopetus: ${lopetuspäivät[i]} ${lopetusajat[i]}, projekti sekä selitys: ${projektit[i]} ${selitteet[i]}.`
    );
  }
  console.log(kooste);
});

// Validoi tarvittaessa käyttäjän syötteet oikeellisiksi,  Aloituspäivä ei saa olla lopetuspäivän jälkeen, Dataformaatin oikeellisuus7

// Sytötä data Databaseen
