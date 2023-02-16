const { response } = require("express");


const uploadImage = async (req, res) => {


    const { file } = req.files;

    console.log(file);
    
    file.mv(`./files/${file.name}`, err => {
        if(err) return res.send({msg: err});
        return res.send({message:'true'});
    })

}


module.exports = {
    uploadImage,
}