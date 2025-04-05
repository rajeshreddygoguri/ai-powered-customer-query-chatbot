import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body
           
        const existUser= await UserModel.findOne({email})
        if (existUser) {
            return res.status(401).json({success:false,message:"User already Exist"})
        }
            const hasepassword=await bcryptjs.hashSync(password,10)
        const newUser= new UserModel({
            name,email,password:hasepassword
        })
        
          await newUser.save()

          res.status(200).json({message:"user registered successfully",newUser})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log(error)
    }
}


const Login=async(req,res)=>{
    try {
          const {email,password}=req.body

          const user=await UserModel.findOne({email})

          if (!user) {
              return res.status(401).json({success:false,message:"Invalid credentials"})
          }

          const ispasswordValid= await bcryptjs.compare(password,user.password)
          if (!ispasswordValid) {
            return res.status(401).json({success:false,message:"Invalid credentials"})
            
          }
               const token= jwt.sign({userId:user._id},process.env.JWT_SECRETE)

                res.cookie('token',token,{
                    httpOnly: true,
                    secure: true,
                    maxAge: 3600000,
                    sameSite: 'None',
                })
              res.status(200).json({success:true,message:"Login successfully",user,token})

    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log(error)
    }
}
  const Logout=async(req,res)=>{
    try {
        res.clearCookie('token',{
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                })
        res.status(200).json({message:"user Logout successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
        console.log(error)
    }
  }
     const CheckUser=async(req,res)=>{
            try {
                const user=req.user
                if (!user) {
                    res.status(404).json({message:'User not found'})
                }
                res.status(200).json(user)

                
            } catch (error) {
                res.status(500).json({message:"internal server error"})
                console.log(error)
                
            }
     }

export {register,Login,Logout,CheckUser}
