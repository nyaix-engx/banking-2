const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const account=require('./accounts/account')
const user=require('./users/user')
const verifyToken=require('./middleware/auth')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



app.post('/loginUser',user.loginUser)
app.post('/createAccount', account.createAccount)
app.post('/createUser', user.createUser)

app.get('/getUser',verifyToken, user.getUser)
app.get('/getShareBalance',verifyToken, account.getShareBalance)
app.get('/getCashBalance',verifyToken, account.getCashBalance)
app.post('/cashTransaction',verifyToken, account.cashTransaction)
app.post('/shareTransaction',verifyToken, account.shareTransaction)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})