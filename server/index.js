const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

const dataPath = '/tmp/data/';
//getting quey parameters As we have given
app.get('/data', (req, res) => {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
        return res.status(400).send('Missing required parameter: n');
    }

    const filePath = `${dataPath}${fileName}.txt`;
//reading  line and entire the file synchronouly 
    if (lineNumber) {
       
        const lineContent = readLineFromFile(filePath, lineNumber);
        res.send(lineContent);
    } else {
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        res.send(fileContent);
    }
});

function readLineFromFile(filePath, lineNumber) {
    const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
    return fileContent[lineNumber - 1] || '';
}
// as our port is 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
