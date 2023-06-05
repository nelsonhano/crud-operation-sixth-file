const express = require('express');
const client = require('./routes/client');
const Instructor = require('./models/Instructor');
const app = express();
const fileUpload = require('express-fileUpload');
app.use(express.static('public'));
app.use(express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload(
    {
        // limits: { fileSize: 50 * 1024 * 1024 },
        // abortOnLimit: true,
        // preserveExtension: true,
        // uploadDir: './public/uploads/',
        // createParentPath: true,
        // safeFileNames: true,
        useTempFiles: true,
        tempFileDir: './tmp/'
    }
));
app.use(client)
app.use(Instructor)
console.log(Instructor.tableName);
app.listen(3200, () => {
    console.log('Example app listening on port 3200!');
});