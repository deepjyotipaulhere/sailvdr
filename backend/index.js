import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import { Client } from '@elastic/elasticsearch'
import fileupload from 'express-fileupload'

import documentRoute from './documents.js'

var app = express()
app.use(bodyparser.json())
app.use(cors())
app.use(fileupload())
var es = new Client({
    node: 'http://localhost:9200',
})

// es.indices.delete({index:'documents'})
// es.indices.create({index:'documents'})

app.post("/login", (req, res) => {
    es.search({
        index: 'users',
        body: {
            query: {
                match: { username: req.body.username }
            }
        }
    }).then((response) => {
        res.send(response.body.hits.hits)
    })
})

app.post("/register", (req, res) => {
    es.search({
        index: 'users',
        body: {
            query: {
                match: { username: req.body.username }
            }
        }
    }).then((response) => {
        if (response.body.hits.hits.length > 0)
            res.status(500).send({ error: 'Already exists' })
        else {
            es.index({
                index: 'users',
                body: req.body
            }).then(async (err, result) => {
                if (err) console.log(err)
                await es.indices.refresh({ index: 'users' }).then((res1, err1) => {
                    res.send({ msg: 'created' })
                })
            })
        }
    })
})

app.use("/doc", documentRoute)


app.listen(5000, () => console.log('-------- server started at 5000 --------'))