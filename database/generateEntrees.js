const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/entrees.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateFile = function(writer) {
  let i = 1;
  writer.write('entrees_id,name,price,description,photourl\n')

  const generate = function() {
    let ok = true;
    do {
      // if (i % 100000 === 0) {
      //   console.log(`${i} written`);
      // };
      if (i === 50000000) {
        writer.write(`${i},${faker.lorem.word()},${getRandomInt(3, 99)}99,${hipster.getWords(30)},${faker.image.imageUrl()}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${i},${faker.lorem.word()},${getRandomInt(3, 99)}99,${hipster.getWords(30)},${faker.image.imageUrl()}\n`);
      };
      i += 1;
    } while (i <= 50000000 && ok);
    if (i <= 50000000) {
      writer.once('drain', generate);
    };
  };
  generate();
};

generateFile(swriter);
