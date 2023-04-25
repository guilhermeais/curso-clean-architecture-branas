import expressApp from "./app";

const port = Number(process.env.PORT) || 3000


expressApp.listen(port, () => console.log('Server running at http://localhost:3000'));

const closeEvents = ['SIGINT', 'SIGTERM', 'SIGQUIT']

closeEvents.forEach((event) => {
  process.on(event, async () => {
    await expressApp.close()
    process.exit(0)
  })
})