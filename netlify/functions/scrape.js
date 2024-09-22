
/*const axios = require('axios');
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
};*/

const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    const { i } = event.queryStringParameters;
    const { t } = event.queryStringParameters;
    const doc = getDoc("https://pornhub.com/video?o=mv&page="+rand(0,455));
    const vids = doc('.pcVideoListItem.js-pop.videoblock.videoBox.omega');
    return {
        statusCode: 200, // Change status code to 200 for success
        body: JSON.stringify({ links: vids.attr('data-id') }), // Return the list of links
    };
    if (!i) {
        //Get random popular page videos
        switch(t){
            case 0:
                    //Get N videos in random site MAX PAGE 455 https://es.pornhub.com/video?o=mv&page=455
                    //max vids 44
                    const doc = getDoc("https://pornhub.com/video?o=mv&page="+rand(0,455));
                    const vids = doc('.pcVideoListItem.js-pop.videoblock.videoBox.omega');
                    return {
                        statusCode: 200, // Change status code to 200 for success
                        body: JSON.stringify({ links: vids.attr('data-id') }), // Return the list of links
                    };
                    /*
                    const links = [];
                    const numItems = 20; // Generate a random number of items to process 44
                    
                    for (let a = 1; a < numItems; a++) {
                        const vid = vids.eq(a); // Get the video item at index 'a'
                        const linkElements = vid.find('a'); // Find all <a> elements within the video item
                    
                        // Check if there are any <a> elements
                        if (linkElements.length > 0) {
                            const link = linkElements.attr('href'); // Get the href attribute of the first <a> element
                            links.push(link); // Add the link to the links array
                        }
                    }
                    return {
                        statusCode: 200, // Change status code to 200 for success
                        body: JSON.stringify({ links: links }), // Return the list of links
                    };*/
                break;
            default:break;
        }

        /*
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };*/
    }
    else{
        try {
            switch(t){
                case 0:
                    //Get N videos in random site MAX PAGE 455 https://es.pornhub.com/video?o=mv&page=455
                    //max vids 44
                    const doc = getDoc("https://pornhub.com/video?o=mv&page="+rand(0,455));
                    const vids = doc('.pcVideoListItem.js-pop.videoblock.videoBox.omega');
                default:break;
            }
            //const title = $('title').text();

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
    }
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getDoc(urls) {
    try {
        const response = await axios.get(urls);
        const $ = cheerio.load(response.data);
        return $; // Returns the Cheerio instance
    } catch (error) {
        console.error(`Error fetching the document: ${error.message}`);
        throw error; // Rethrow the error to handle it upstream if needed
    }
}