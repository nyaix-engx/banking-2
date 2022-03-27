const models = require("../models");
const {v4 : uuidv4}=require("uuid")
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
      const {name,address,telephone}=req.body
      const existing_user = await models.user.findOne({where:{cust_Telephone:telephone}})
      if(existing_user){
        return res.status(400).send({message:"User with this phone number is already registered"})
      }
      const user = await models.user.create({id:uuidv4(),cust_Name:name,cust_Address:address,cust_Telephone:telephone});
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

const loginUser=async(req,res)=>{
  const {telephone,pin}=req.body
  try {
    const user = await models.user.findOne({where:{cust_Telephone:telephone}})
    if(!user){
      return res.status(404).send({message:"User does not exist"});
    }
    const account = await models.account.findOne({where:{account_Owner:user.id,account_Pin:pin}})
    if(!account){
      return res.status(404).send({message:"Incorrect Pin"});
    }
    const token = jwt.sign({ _id: user.id.toString() }, '1b1c58965376')

    res.status(200).json({ user,token })
} catch (e) {
    res.status(400).send(e)
}
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.user.findOne({
      where: { id }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports={
    createUser,
    getUser,
    loginUser
}