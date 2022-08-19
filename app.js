import axios from 'axios';
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import { URLSearchParams } from 'url'

dotenv.config();

const app = express()
const Port = process.env.PORT || 2000;
app.use(cors());

// parse incoming body payload
app.use(express.json());


app.post('/scan', (req, res) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('url', req.body.url);

    const options = {
        method: 'POST',
        url: 'https://www.virustotal.com/api/v3/urls',
        headers: {
            Accept: 'application/json',
            'x-apikey': req.body.key,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
    };

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
    });
    
    app.post('/analysis', (req, res) =>{
        const options = {
            method: 'GET',
            url: `https://www.virustotal.com/api/v3/analyses/${req.body.id}`,
            headers: {
                Accept: 'application/json',
                'x-apikey': req.body.key,
            },
        };
        axios
            .request(options)
            .then(function (response) {
                res.json(response.data);
            })
            .catch(function (error) {
                res.json(error);
            });
    })
    


app.listen(Port, console.log('server started at port 2000')
);