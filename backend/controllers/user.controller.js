import User from "../models/user.model.js";
import httpsStatus from "http-status";
import bcrypt , { hash } from "bcrypt";
import crypto from "crypto";


// User Registration 
const register = async (req , res ) => {
    const { name , username , password } = req.body;

    try{
        const existingUser = await User.findOne({ username });
        if(existingUser){
            // return res.status(400).json({ message : "User already exists" });
            return res.status(httpsStatus.FOUND).json({ message : "User already exists" }); 
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new User ({
            name , 
            username , 
            password : hashedPassword
        });
        
        await newUser.save();

        return res.status(httpsStatus.CREATED).json({ message : "User registered successfully" });

    }catch(err){
        console.error("Error during user registration:", err);
        return res.status(httpsStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }   

}


// User Login
const login = async (req ,res) => {

    const { username , password } = req.body;

    if(!username || !password){
        return res.status(httpsStatus.BAD_REQUEST).json({ message : "Username and password are required" });
    }

    try {
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpsStatus.NOT_FOUND).json({ message : "User not found" });
        }
        // else{
        //     const isPasswordValid = await bcrypt.compare(password , user.password);
        //     if(!isPasswordValid){
        //         return res.status(httpsStatus.UNAUTHORIZED).json({ message : "Invalid password" });
        //     }
        //     else{
        //         return res.status(httpsStatus.OK).json({ message : "Login successful" });
        //     }
        // }

        if (bcrypt.compareSync(password, user.password)) {
            let token = crypto.randomBytes(20).toString('hex');
            user.token = token;
            await user.save();
            return res.status(httpsStatus.OK).json({ message: "Login successful", token });
        }

    }catch (err) {
        return res.status(500).json({ message : `Something went wrong : ${err}` });
    }
}


export { register , login };