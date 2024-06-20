import express from 'express'
import cors from 'cors'
import { eventRouter } from './routes/event.routes.js'
import { eventCategoryRouter } from './routes/event_category.routes.js'
import { contactFormRouter } from './routes/contact_form.routes.js'
import { userRouter } from './routes/user.routes.js'
import { invoiceRouter } from './routes/invoice.routes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(eventRouter)
app.use(eventCategoryRouter)
app.use(contactFormRouter)
app.use(userRouter)
app.use(invoiceRouter)

app.listen(process.env.PORT, () => {
    console.log('EventMetropolis backend initialized')
})