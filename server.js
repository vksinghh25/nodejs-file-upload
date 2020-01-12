const express = require('express');
const multer = require('multer');
const cors = require('cors');

// multer ships with with storage engines DiskStorage and MemoryStorage
// more engines are available from third parties
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
                  cb(null, 'public/files/uploads')
              },
  filename: (req, file, cb) => {
              cb(null, file.originalname.toString());
            }
});

// create upload middleware and provide it the storage option
const upload = multer({ storage: storage });

const app = express();

app.use(cors);

// upload.single('file') acts like a middleware and works on the app.post endpoint here
app.post('/uploadfile', upload.single('file'), (req, res, next) => {
  if(req.file.filename) {
    res.send(`File ${req.file.filename} uploaded succcessfully!`);
  }
  else {
    res.send('Some error occurred!');
  }
});

app.post('/uploadfiles', upload.array('files', 10), (req, res, next) => {
  console.log(req.files);
  if(req.files) {
    res.send(`${req.files.length} Files uploaded succcessfully!`);
  }
  else {
    res.send('Some error occurred!');
  }
});

app.use('/hello', (req, res) => {
  res.send('Hello World!!');
});

app.listen(7000, () => {
  console.log('Listening on Port 7000');
});
