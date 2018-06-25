const faker = require('faker');
const hipster = require('hipsteripsum');
const fs = require('fs');

const swriter = fs.createWriteStream('./data/menus.csv');

const getRandomNum = function(min, max) {
  return Math.random() * (max - min) + min;
}

const generateFile = function(writer) {
  let i = 1;

  const generate = function() {
    let ok = true;
    writer.write('menu_id,rest_id,menu_name\n')
    do {
      if (i % 100000 === 0) {
        console.log(`${i} written`);
      }
      if (i === 60000000) {
        writer.write(`${i},${getRandomNum(1, 10000000)},`);
        writer.end();
        console.log('all files have been written');
      } else {
        ok = writer.write();
      }
      i += 1;
    } while (i > 0 && ok);
    if (i < 60000000) {
      writer.once('drain', write);
    }
  }
}

generateFile(swriter);
