const dotenv = require('dotenv')
dotenv.config()
// Express to handle the API
const express = require('express')
// Mongoose to handle the database
const mongoose = require('mongoose')
// cors stops any cross origin errors
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// app.use(cors({
//     origin: 'https://ctd-project-client.netlify.app/' || 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error)

const nodemailer = require('nodemailer');

async function sendEmail(itemTitle, userEmail) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SENDER_EMAIL, // generated ethereal user
            pass: process.env.SENDER_PASSWORD // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Christian" <christian.jro.dev@gmail.com>', // sender address
        to: `${userEmail}`, // list of receivers
        subject: 'Restock Needed', // Subject line
        text: `Hello, you have run out of ${itemTitle}!`, // plain text body
        html: `<p>Hello, you have run out of ${itemTitle}!</p>` // html body
    });

    console.log('Message sent: %s', info.messageId);
}

const Item = require('./models/Item')


app.post('/api/run-function', (req, res) => {
    const itemTitle = req.body.item.title
    const userEmail = req.body.userEmail
    sendEmail(itemTitle, userEmail)
    res.send({message: "hello from backend"})
})


app.get('/items', async (req, res) => {
    const items = await Item.find()
    res.json(items)
})

app.post('/item/new', (req, res) => {
    const item = new Item({
        title: req.body.title,
        quantity: req.body.quantity
    })
    item.save()
    res.json(item)
})

app.delete('/item/delete/:id', async (req, res) => {
    const result = await Item.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.put('/item/increase/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    item.quantity++
    item.save()
    res.json(item)
})

app.put('/item/decrease/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)

    // prevent item quantity from going below 0
    if(item.quantity == 0) {
        res.status(400).send("Quantity cannot be below 0.")
        return res.json(item)
    } else {
        item.quantity--
        item.save()
        res.json(item)
    }
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});