const uploadFile = async (req, res, next) => {
    console.log(req.files);
    try {
        if(!req.files) {
            res.status(200).json({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
           let upladStatus = avatar.mv('./public/uploads/' + Date.now() + avatar.name);

            //send response
            res.status(200).json({
                status: true,
                upladStatus,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).json({err});
    }
}




module.exports = {
    uploadFile,
}
