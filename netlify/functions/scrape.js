const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };
    }

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('title').text();

        return {
            statusCode: 200,
            body: JSON.stringify({ title }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scrape data' }),
        };
    }
};
