const  handleErrors = async (req, res, err, msg = 'Something went wrong') =>  {
    return res.json({
      status: false,
      err: err,
      msg: msg,
      data: null
    })
}

module.exports = {
    handleErrors
}