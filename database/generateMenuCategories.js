const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/menu_categories.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateFile = function(writer) {
  let i = 1;
  writer.write('categories_id,categories_name\n')

  const generate = function() {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} written`);
      };
      if (i === 40000000) {
        writer.write(`${getRandomInt(1, 10000000)},${getRandomInt(1, 100000)}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${getRandomInt(1, 10000000)},${getRandomInt(1, 100000)}\n`);
      };
      i += 1;
    } while (i <= 40000000 && ok);
    if (i <= 40000000) {
      writer.once('drain', generate);
    };
  };
  generate();
};

generateFile(swriter);
