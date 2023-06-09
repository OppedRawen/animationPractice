// import express from 'express';
// import * as dotenv from 'dotenv';
// import {Configuration,OpenAIApi} from 'openai';

const express = require('express');
const dotenv = require('dotenv');
const {Configuration,OpenAIApi} = require('openai');
// make sure the environment variable is populated
dotenv.config();

const router = express.Router();

const configugration = new Configuration({apiKey:process.env.OPENAI_API_KEY});
// create an instance of open ai
const openai = new OpenAIApi(configugration);

router.route('/').get((req,res)=>{
    res.send('Hello from Dalle');
});
router.route('/').post(async(req,res)=>{
    try {
        const {prompt}= req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format:'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error});
    }
})

// export default router;
module.exports = router;