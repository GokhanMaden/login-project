const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium"

// Configure cloudinary
cloudinary.config({
    cloud_name: 'gokhankartal',
    api_key: '622435289282756',
    api_secret: 'DVlHedBea2ELyDycYsXoUcwOTiQ'
})

//Sample upload code 
//cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
//Sample image manipulation tag
//cloudinary.image("sample", {"crop":"fill","gravity":"faces","width":300,"height":200,"format":"jpg"});
//Environment variable:
//cloudinary://622435289282756:DVlHedBea2ELyDycYsXoUcwOTiQ@gokhankartal/

try {
    mongoose.connect(url, {
        //useMongoClient: true
        useNewUrlParser: true 
    })    
} catch (error) {
    
}

let port = 5000 || process.env.PORT;

/** set up routes {API Endpoints} */
routes(router);

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});