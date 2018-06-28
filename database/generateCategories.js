const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/categories.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateFile = function(writer) {
  let i = 1;
  writer.write('categories_id,categories_name\n')

  const generate = function() {
    let ok = true;
    do {
      if (i === 100000) {
        writer.write(`${i},${faker.lorem.word()}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${i},${faker.lorem.word()}\n`);
      };
      i += 1;
    } while (i <= 100000 && ok);
    if (i <= 100000) {
      writer.once('drain', generate);
    };
  };
  generate();
};

generateFile(swriter);
