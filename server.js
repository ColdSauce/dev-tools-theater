const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')  
const compression = require('compression')

function chunk(arr, chunkSize) {
    var R = [];
    for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
    return R;
}

const filePath = path.join(__dirname, 'setup/images.json');
const imagesJson = chunk(JSON.parse(fs.readFileSync(filePath)), 500)
console.log("Loaded and ready to go, sir!")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/totalChunks', function (req, res) {
    res.send("" + imagesJson.length)
})

app.get('/getFrames', function (req, res) {
    res.send(imagesJson[req.query.chunk])
})

app.use(express.static('public'))
app.use(compression())

app.listen(7738)
