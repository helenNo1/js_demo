
const fs = require('fs');

const clearFile = (f) => {
  fs.writeFile(f,'', err => {
    if (err) {
      console.log('写文件出错', err);
      return;
    }
  });
}


const writeS2F = (f, s) => {

  fs.appendFile(f, (new Date()).toString(), err => {
    if (err) {
      console.log('写文件出错', err);
      return;
    }
  })
  fs.appendFile(f, '\n', err => {
    if (err) {
      console.log('写文件出错', err);
      return;
    }
  })
  fs.appendFile(f, s, err => {
    if (err) {
      console.log('写文件出错', err);
      return;
    }
  })
  fs.appendFile(f, '\n', err => {
    if (err) {
      console.log('写文件出错', err);
      return;
    }
  })
}

module.exports = { writeS2F ,clearFile};
