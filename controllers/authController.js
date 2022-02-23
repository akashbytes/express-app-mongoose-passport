const { User } = require('../models/User');
const { handleErrors } = require('../utils/handleError');
const { sendEmail } = require('../utils/mailer');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const register = async (req, res, next) => {
  
    try {
        // Get user input
        const { name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && name)) {
             return res.status(200).json({status :  false, msg : 'Please fill all fields', });
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
            res.status(200).json({status :  false, msg : 'Email already exists', });
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // return new user
        res.status(201).json({status : true, msg : 'Registration successfull' , token : token , user : user});
    }catch(err){
        handleErrors(req,res,err);
    }

}

const login = async (req, res, next) => {
  // console.log('errr');
  // return
  
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(200).json({status :  false, msg : 'Something went wrong....', err});
        }

        if(!info.status){
          return res.status(200).json({status :  false, msg : info.msg, err: null});
        }

        req.login(
            user,
            { session: false },
            async (error) => {
                if (error) {
                  return res.status(200).json({status :  false, msg : 'Somthing went wrong...', err: error });
                }
                try{
                    // UserAuthModel.create({user_id: user._id});
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);
                   return res.status(200).json({status :  true, msg : 'Login Successfull', token });

                }catch (err){
                   return res.status(200).json({status :  false, msg : 'Somthing went wrong..',  err});
                }
            }
        );


      } catch (error) {
          return res.status(200).json({status :  false, msg : 'Somthing went wrong.', err: error });
      }
  }
  )(req, res, next);
}
// const login = async (req, res, next) => {
//     try {
//         // Get user input
//         const { email, password } = req.body;
    
//         // Validate user input
//         if (!(email && password)) {
//             res.status(200).json({status :  false, msg : 'Please fill all fields', });
//         }
//         // Validate if user exist in our database
//         const user = await User.findOne({ email });
    
//         if (user && (await bcrypt.compare(password, user.password))) {
//           // Create token
//           const token = jwt.sign(
//             { user_id: user._id, email },
//             process.env.TOKEN_KEY,
//             {
//               expiresIn: "2h",
//             }
//           );
          
//           sendEmail({ to: [req.body.email], bcc : 'akashbytes@gmali.com' ,subject : 'Subject', html :  'Mail Body' });
//           return res.status(200).json({status :  true, msg : 'Login successfull', user,token});
            
//         }
//         res.status(200).json({status :  false, msg : 'Invalid credentials'});

//       } catch (err) {
//         handleErrors(req,res,err);
//       }

// }





module.exports = {
    login,
    register,
}
