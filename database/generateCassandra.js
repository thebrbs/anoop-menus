const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('../data/cassandra.csv');

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const boolean = [true, false];

const generateFile = function(writer) {
  let i = 1;
  writer.write('id,rest_name,menu_name,categories,entrees,price,description,photourl,vegetarian,non_vegetarian,vegan,gluten_free\n')

  const generate = function() {
    let ok = true;
    do {
      // if (i % 100000 === 0) {
      //   console.log(`${i} written`);
      // };
      if (i === 150000000) {
        writer.write(`${getRandomInt(1, 10000000)},${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()},
        ${getRandomInt(3, 99)}99,${hipster.getWords(30)},${faker.image.imageUrl()},${boolean[getRandomInt(0, 1)]},${boolean[getRandomInt(0, 1)]},
        ${boolean[getRandomInt(0, 1)]},${boolean[getRandomInt(0, 1)]}`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write(`${getRandomInt(1, 10000000)},${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()},
        ${getRandomInt(3, 99)}99,${hipster.getWords(30)},${faker.image.imageUrl()},${boolean[getRandomInt(0, 1)]},${boolean[getRandomInt(0, 1)]},
        ${boolean[getRandomInt(0, 1)]},${boolean[getRandomInt(0, 1)]}`);
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
