const { json, Router } = require('express');
var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
//joining path of directory 


// const users = [
//   { name: 'ofek', password: 'fdf', files: ['er', 'erer'] },
//   { name: 'itay', password: 'erer', files: ['rtrer', 'erertrtr'] }
// ];
router.get('/', (req, res) => {
  fs.readFile('../usersArr.json', 'utf8', (err, data) => { res.send(data); })
})

router.post('/', (req, res) => {
  fs.readFile('../usersArr.json', 'utf8', (err, data) => {
    const userArr = JSON.parse(data)
    const searched = userArr.find((user) => (user.name === req.body.username));
    console.log({ searched });
    if (!searched) {
      userArr.push({ name: req.body.username, password: req.body.password, files: [] });
      fs.mkdirSync(`./users/${req.body.username}`);
      fs.writeFileSync(`../usersArr.json`, JSON.stringify(userArr), 'utf8')
    }
    res.json(!searched ? { name: req.body.username, password: req.body.password, files: [] } : {});
  })
}
)
/* GET users listing. */


router.get('/:name', function (req, res, next) {
  // let user = users.find((user) => user.name == req.params.name);
  console.log("erer");
  fs.readFile('../usersArr.json', 'utf8', (err, data) => {


    fs.readdir(`./users/${req.params.name}`, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      let users = JSON.parse(data);
      const user = users.find(user => user.name === req.params.name);
      res.send(JSON.stringify(user));
    });
  });
})

// let user = { files: [], name: req.params.name }
// fs.readdir(`./users/${req.params.name}`, function (err, files) {
//   if (err) {
//     return console.log('Unable to scan directory: ' + err);
//   }
//   files.forEach(function (file) {
//     user.files.push(path.basename(file));
//   });
//   res.send(JSON.stringify(user));
// });


router.get('/:name/:type/:file', function (req, res, next) {
  // // let user = users.find((user) => user.name == req.params.name);
  if(req.params.type === 'file'){
  fs.readFile(`./users/${req.params.name}/${req.params.file}`, function (err, data) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    const needed = data.toString();
    console.log(needed);
    res.json(needed);
  })};
  if(req.params.type === 'folder'){
    console.log("hello world!");
  fs.readdir(`./users/${req.params.name}/${req.params.file}`, function (err, data) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    res.json(data);
  })}
});

router.post('/:name', function (req, res) {
  if (req.body.password) {
    fs.readFile('../usersArr.json', 'utf8', (err, data) => {
      const users = JSON.parse(data);
      const searched = users.find((user) => (user.name === req.body.username && user.password === req.body.password));
      console.log("users");
      res.json(searched ? searched : {});
    })
  }
  else if (req.body.type == "file") {
    let users
    console.log("hello");
    fs.readFile('../usersArr.json', 'utf8', (err, data) => {
      users = JSON.parse(data);
      const user = users.find(user => user.name === req.params.name);
      console.log(users);
      fs.appendFile(`./users/${req.params.name}/${req.body.fileName}`, req.body.fileBody, (err) => {
        if (err) {
          console.log(err);
        }
        let stats = fs.statSync(`./users/${req.params.name}/${req.body.fileName}`, 'utf8')
        console.log(stats);
        user.files.push({ fileName: req.body.fileName, type: "file", stats: { show: false, size: stats.size, birthtime: stats.birthtime } })
        console.log(user);
        fs.writeFileSync(`../usersArr.json`, JSON.stringify(users), 'utf8')
        res.json(user)
      });
    })
  }
  else if (req.body.type == "folder") {
    let users
    console.log("hello");
    fs.readFile('../usersArr.json', 'utf8', (err, data) => {
      users = JSON.parse(data);
      const user = users.find(user => user.name === req.params.name);
      console.log(users);
      fs.mkdir(`./users/${req.params.name}/${req.body.fileName}`, req.body.fileBody, (err) => {
        if (err) {
          console.log(err);
        }
        let stats = fs.statSync(`./users/${req.params.name}/${req.body.fileName}`, 'utf8')
        console.log(stats);
        user.files.push({ fileName: req.body.fileName, type: "folder", stats: { show: false, size: stats.size, birthtime: stats.birthtime } })
        console.log(user);
        fs.writeFileSync(`../usersArr.json`, JSON.stringify(users), 'utf8')
        res.json(user)
      });
    })
  }
  else {
    console.log("Dfdf");
  }
})

router.post('/:name/:file', function (req, res) {
  fs.readFile('../usersArr.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);
    const user = users.find(user => user.name === req.params.name);
    const file = user.files.find(file => file.fileName === req.body.fileName);
    file.stats.show = !file.stats.show
    fs.writeFileSync(`../usersArr.json`, JSON.stringify(users), 'utf8');
    res.json(user)
  })
})

router.put('/:name/:file', function (req, res) {
  fs.readFile('../usersArr.json', 'utf8', (err, data) => {
    const users = JSON.parse(data);
    const user = users.find(user => user.name === req.params.name);
    const file = user.files.find(file => file.fileName === req.body.fileName);
    file.fileName = req.body.newName;
    fs.renameSync(`./users/${req.params.name}/${req.body.fileName}`, `./users/${req.params.name}/${req.body.newName}`)
    fs.writeFileSync(`../usersArr.json`, JSON.stringify(users), 'utf8');
    res.json(user)
  })
})

router.delete('/:name/:file', function (req, res) {
  fs.readFile('../usersArr.json', 'utf8', (err, data) => {
    if(req.body.type === 'file'){
    const users = JSON.parse(data);
    const user = users.find(user => user.name === req.params.name);
    const files = user.files.filter(file => file.fileName !== req.body.fileName);
    user.files= files;
    fs.unlinkSync(`./users/${req.params.name}/${req.body.fileName}`)
    fs.writeFileSync(`../usersArr.json`, JSON.stringify(users), 'utf8');
    res.json(user)}
  })
})

module.exports = router;
