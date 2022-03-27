const models = require("../models");
const {v4 : uuidv4}=require("uuid")

const createAccount = async (req, res) => {
    try {
      const account = await models.account.create({...req.body,id:uuidv4()});
      return res.status(201).json({
        account
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

const getShareBalance = async (req, res) => {
  try {
    const account = await models.account.findOne({
      where: { account_Owner:req.userId }
    });
    if (account) {
      return res.status(200).json({ share: parseFloat(account.share_Balance) });
    }
    return res.status(404).send("Account with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCashBalance = async (req, res) => {
    try {
      const account = await models.account.findOne({
        where: { account_Owner:req.userId }
      });
      if (account) {
        return res.status(200).json({ cash: parseFloat(account.cash_Balance) });
      }
      return res.status(404).send("Account with the specified ID does not exists");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  

  const cashTransaction = async (req, res) => {
    try {
      const account = await models.account.findOne({
        where: { account_Owner:req.userId }
      });
            
      let cash_Balance= parseFloat(account.cash_Balance)

      if (!account) {
        return res.status(404).send({message:"Account with the specified ID does not exists"});
      }

      if(req.body.amount<0){
        if(cash_Balance + req.body.amount < 0){
            return res.status(400).send({
                message:"Cash balance is insufficient"
            })
        }

        cash_Balance=cash_Balance + req.body.amount
        const [is_updated] = await models.account.update({...account,cash_Balance}, {
          where: { account_Owner: req.userId }
        });
        if (is_updated) {
          const updated_account = await models.account.findOne({ where: { account_Owner: req.userId } });
          return res.status(200).json({ account: updated_account });
        }
        throw new Error("Account not found");
    }

      cash_Balance=cash_Balance + req.body.amount
      const [is_updated] = await models.account.update({...account,cash_Balance}, {
        where: { account_Owner: req.userId }
      });
      if (is_updated) {
        const updated_account = await models.account.findOne({ where: { account_Owner: req.userId } });
        return res.status(200).json({ account: updated_account });
      }
      throw new Error("Account not found");

    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  const shareTransaction = async (req, res) => {
    try {
      const account = await models.account.findOne({
        where: { account_Owner:req.userId }
      });

      let cash_Balance= parseFloat(account.cash_Balance)
      let share_Balance= parseFloat(account.share_Balance)

      if (!account) {
        return res.status(404).send({message:"Account with the specified ID does not exists"});
      }

      if(req.body.amount<0){
          if(share_Balance + req.body.amount < 0){
              return res.status(400).send({
                  message:"Share balance is insufficient"
              })
          }
          share_Balance=share_Balance+req.body.amount
          cash_Balance=cash_Balance + Math.abs(req.body.amount)
          const [is_updated] = await models.account.update({...account,cash_Balance,share_Balance}, {
            where: { account_Owner: req.userId }
          });
          if (is_updated) {
            const updated_account = await models.account.findOne({ where: { account_Owner: req.userId } });
            return res.status(200).json({ account: updated_account });
          }
          throw new Error("Account not found");

      }
      if(req.body.amount>cash_Balance){
          return res.status(400).send({
              message:"Cash balance is Insufficient"
          })
      }

      cash_Balance = cash_Balance - req.body.amount   
      share_Balance = share_Balance + req.body.amount    
      const [is_updated] = await models.account.update({...account,cash_Balance,share_Balance}, {
        where: { account_Owner: req.userId }
      });
      if (is_updated) {
        const updated_account = await models.account.findOne({ where: { account_Owner: req.userId } });
        return res.status(200).json({ account: updated_account });
      } 
      throw new Error("Account not found");

  } catch (e) {
      res.status(400).send(e)
  }
  };

module.exports={
    createAccount,
    getShareBalance,
    getCashBalance,
    cashTransaction,
    shareTransaction
}