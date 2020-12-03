import express from 'express'
import { Client } from '@elastic/elasticsearch'

var router = express.Router();
var es = new Client({
    node: 'http://localhost:9200',
})

router.post("/insert", (req, res) => {
    if (!req.files) res.status(500).send({ error: 'No files' })
    else {
        es.index({
            index: 'documents',
            body: {
                title: req.body.title,
                content: req.files.file.data.toString('base64'),
                size: req.files.file.size,
                folder: req.path,
                ip: req.ip,
                createdOn: new Date().toLocaleString()
            }
        }).then((res1, err) => {
            res.send(res1)
        })
    }
})


router.post("/get/:id?", (req, res) => {
    if (req.params.id)
        es.get({
            index: 'documents',
            id: req.params.id,
        }).then((response, err) => {
            es.index({ index: 'audit_trail', body: req.headers }).then(() =>
                res.send(response.body)
            )
        })
    else
        es.search({
            index: 'documents',
            _source: ['title', 'folder']
        }).then((response, err) => {
            res.send(response.body.hits)
        })
})

export default router;