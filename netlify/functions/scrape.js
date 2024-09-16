const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    // Hardcoded URL to scrape
    const url = 'https://example.com';

    try {
        // Fetch the page
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract the title or other data as needed
        const title = $('title').text();

        // Return the extracted data
        return {
            statusCode: 200,
            body: JSON.stringify({ title }),
        };
    } catch (error) {
        // Handle any errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to scrape data' }),
        };
    }
};
