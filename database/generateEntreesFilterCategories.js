const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/entrees_filter_categories.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateFile = function(writer) {
  let i = 1;
  writer.write('entrees_id,filter_categories_id\n')

  const generate = function() {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} written`);
      };
      if (i === 150000000) {
        writer.write(`${getRandomInt(1, 50000000)},${getRandomInt(1, 15)}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${getRandomInt(1, 50000000)},${getRandomInt(1, 15)}\n`);
      };
      i += 1;
    } while (i <= 150000000 && ok);
    if (i <= 150000000) {
      writer.once('drain', generate);
    };
  };
  generate();
};

generateFile(swriter);
