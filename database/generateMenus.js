const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/menus.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateFile = function(writer) {
  let i = 1;
  writer.write('menu_id,menu_name\n')

  const generate = function() {
    let ok = true;
    do {
      if (i % 100000 === 0) {
        console.log(`${i} written`);
      };
      if (i === 10000000) {
        writer.write(`${i},${faker.lorem.word()}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${i},${faker.lorem.word()}\n`);
      };
      i += 1;
    } while (i <= 10000000 && ok);
    if (i <= 10000000) {
      writer.once('drain', generate);
    };
  };
  generate();
};

generateFile(swriter);
