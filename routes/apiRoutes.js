const router = require('express').Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get('/notes', (req, res) => {
  fs.readFile("./db/db.json", (err,data) => {
    if (err) {
      console.log(err)
    }
    else {
      res.json(JSON.parse(data));
    }
  });
});

router.post('/notes', (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err)
    }

    const dataArray = JSON.parse(data);
    console.log(dataArray);
    dataArray.push(req.body);
    
    fs.writeFile("./db/db.json", JSON.stringify(dataArray, null, 2), (err) => {
      if (err) {
        console.log(err);
        res.json({message: "no good"});
      }
    
      else {
        res.json({message: "good to go"});
      }
      const newId = req.body;
      newId.id = uuidv4();
    });
  });
});

router.delete("/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(JSON.parse(data));
      const notesArray = JSON.parse(data);
      const filteredArray = notesArray.filter(item => item.id != req.params.id);
      fs.writeFile("./db/db.json", JSON.stringify(filteredArray, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
        else {
          res.json(filteredArray)
        }
      });
    }
  });
});

module.exports = router;