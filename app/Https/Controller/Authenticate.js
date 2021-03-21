const User = require('../../Models/User');
const bcrypt = require('bcryptjs');


 function AuthenticateController() {
    return {
        async Register(req,res) {
            const {name,email,password,cpassword} = req.body;
            if(!name || !email || !password || !cpassword) return res.status(422).json( {error:'all fields are required'} );
            if(password !== cpassword) return res.status(422).json( {error:'password not matched'} );
            try {
             const userExist = await User.findOne({email:email});
             if(userExist){
                 return res.status(200).json({
                     message:'user already exist',
                    });
                }
            
                const user = new User({name,email,password});
                const userRegister = await user.save();
                if(userRegister){
                    return res.status(200).json({
                        'message':'user register successfully'
                    })
                }
            } catch (error) {
                return res.status(400).json({
                    'message': error
                })
            }
        },

        async Login(req,res){
            const {email, password} = req.body;
            if(!email || !password){
                res.status(422).json({
                    message:'All fileds are required'
                })
            }
            const isUserFind = await User.findOne({email:email});
            if(isUserFind){
                const isMatch = await bcrypt.compare(password, isUserFind.password);
                const token = await isUserFind.generateAuthToken();
                console.log(token)
                if(!isMatch){
                    res.json({
                        message:'Invalid credentials'
                    })
                }else{
                    res.status(200).json({
                        message:'Successfully login'
                    })
                }
            }else{
                res.status(422).json({
                    message:'Invalid Credentials'
                })
            }
        }
    }   
}

module.exports = AuthenticateController;