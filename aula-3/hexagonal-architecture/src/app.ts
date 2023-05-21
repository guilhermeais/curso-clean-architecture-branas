import express, { Request, Response } from 'express'
import { Checkout } from './checkout'


const app = express()

app.use(express.json())

app.post('/checkout', async (req: Request, res: Response) => {
  try {
    const checkoutService = new Checkout();

    const checkout = await checkoutService.execute(req.body)

    return res.json(checkout)
  } catch (error: any) {
    return res.status(422).json({ message: error.message })
  }
})

export default app
