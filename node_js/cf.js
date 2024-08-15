"use strict";

const fs = require("fs");
const url = "http://codeforces.com/api";
const options = "/contest.list";
const link = "http://codeforces.com/contest/";

let contest = async () => {
  let edu = [];
  let div3 = [];
  try {
    const response = await fetch(url + options);
    if (response.status == 200) {
      let data = await response.json();

      for (let i in data.result) {
        let fct = data.result[i];
        if (fct["name"].includes("Educational")) {
          edu.push(fct.id);
        }
        if (fct["name"].includes("Div. 3")) {
          div3.push(fct.id);
        }
      }
    } else {
      console.log(`Request failed with status code of ${response.status}`);
    }
  } catch (error) {
    console.log(
      "There may be some issues on Codeforces or the servers or not responding"
    );
    console.log("Please Wait and try it after few minutes");
    return;
  }

  div3.sort((a, b) => a - b);
  edu.sort((a, b) => a - b);

  for (let i in div3) {
    fs.appendFile(
      "Div3.txt",
      `Div3 Rounds ${Number(i) + 1} :  ${link + div3[i]}\n`,
      (err) => {
        if (err) console.log(err);
        else return;
      }
    );
  }

  for (let i in edu) {
    fs.appendFile(
      "Educational.txt",
      `Educational Round ${Number(i) + 1} :  ${link + edu[i]}\n`,
      (err) => {
        if (err) console.log(err);
        else return;
      }
    );
  }
};
contest();
