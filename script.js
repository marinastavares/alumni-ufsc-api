const fs = require("fs");
var mongoose = require('mongoose');
const fastcsv = require("fast-csv");
var Alumni = require('./models/alumni');

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb+srv://alumni:alumni@bd-alunos.qtji9.mongodb.net/test";
mongoose.connect(url,{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}); //via Modulus

function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

let stream = fs.createReadStream("bd.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      full_name: capitalizeFirstLetter(data[0]),
      start_by: data[1],
      end_by: data[2],
      linkedin: data[3],
      country: capitalizeFirstLetter(data[4]),
      position: capitalizeFirstLetter(data[5]),
      company: capitalizeFirstLetter(data[6]),
      ufsc: data[7]
    });
  })
  .on("end", function() {
    Alumni.deleteMany({});

    // remove the first line: header
    csvData.shift();

    console.log('inserting');
    Alumni.insertMany(csvData, (err, res) => {
      if (err) throw err;

      console.log(`Inserted: ${res.insertedCount} rows`);
      return
    });
    return
  });

stream.pipe(csvStream);
