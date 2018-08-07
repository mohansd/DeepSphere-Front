const express = require('express')
const app = express()
app.use('/', (req, res) => {
  res.send('hello express!')
})
app.listen(3100, () => {
  console.log('app listening on port 3000.')
})
