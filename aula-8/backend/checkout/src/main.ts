import createApp from './app'

const PORT = process.env.PORT ? +process.env.PORT :  3000

createApp().then(app => {
  app.httpServer.listen(PORT).then(port => {
    console.log(`listening on port ${port}`)
  })
})
