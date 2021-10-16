var express = require('express')
var multer  = require('multer')
const router = express.Router();
const { userService, productService } = require("../../services");
const ApiError = require('../../utils/ApiError');
const { BASE_URL } = require("../../config/config")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, "uploads-"+new Date().toISOString()+file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/upload/:productId', upload.single('file'), async (req, res) => {
    try{
      console.log(JSON.stringify(req.file),req.file, req.query)
    if(req.params.productId){
         await productService.updateProductById(req.params.productId, {profileImage : `${BASE_URL}${req.file.path}`})
         return res.send(`${BASE_URL}${req.file.path}`)
    }
    } catch(err) {
      console.log(err)
    }
});

router.post('/delete/:productId',upload.single('file'), async (req, res) => {
    try{
      console.log(JSON.stringify(req.file),req.file, req.query)
    if(req.params.productId){
         await productService.updateProductById(req.params.productId, {profileImage : ``})
         return res.send(`Succcess`)
    }
    } catch(err) {
      console.log(err)
    }
});


module.exports = router;