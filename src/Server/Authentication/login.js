const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {loginValidation}=require('./validation');

let refreshTokens= [];

router.post('/',async (req,res) => {
    // Lets validate
       
       const {error} =loginValidation(req.body);
       if(error) return res.status(400).send(error.details[0].message)
    
        // checking if email exit
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email does not exist');

        // password is correct
        const validpass= await bcrypt.compare(req.body.password, user.password);
        if(!validpass) return res.status(400).send('Invalid Password')

    
        // create ans assign token 

        try{
            const accessToken = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{ expiresIn: '1000s' })
            const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.send({ accessToken: accessToken, refreshToken: refreshToken} )
        } catch (err)
        {
            res.status(400).send('hello');
        }
  
       
    })

   
    module.exports= router;
    