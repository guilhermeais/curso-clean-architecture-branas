import app from './app'

const PORT = process.env.PORT ? +process.env.PORT :  3005

app.httpServer.listen(PORT).then(port => {
  console.log(`listening on port ${port}`)
})
