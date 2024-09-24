
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
/*
const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    const { i } = event.queryStringParameters;
    const { t } = event.queryStringParameters;

    if (!i) {
        //Get random popular page videos
                    //Get N videos in random site MAX PAGE 455 https://pornhub.com/video?o=mv&page=455
                    //max vids 44
                    const d = await getDoc("https://site.com/video?o=mv&page="+rand(0,455));
                    const videoElements = d('.pcVideoListItem.js-pop.videoblock.videoBox');
                    if (videoElements.length > 0) {
                        // Get the first element in the list
                        const firstVideoElement = videoElements.first();
            
                        // Find the first <a> element inside the first video element
                        const firstAnchor = firstVideoElement.find('a').first();
            
                        // Extract the href attribute or any other information you need
                        const href = firstAnchor.attr('href');
                        const linkText = firstAnchor.text();
                        return {
                            statusCode: 200, // Change status code to 200 for success
                            body: JSON.stringify({ links: href }), // Return the list of links
                        };
                    } else {
                        return {
                            statusCode: 300, // Change status code to 200 for success
                            body: JSON.stringify({ error:"no videos found" }), // Return the list of links
                        };
                    }
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

        /*
        switch(t){
            case 0:
                break;
            default:break;
        }*/

        /*
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };
    }
    else{
        try {
            switch(t){
                case 0:
                    const doc = await getDoc("https://site.com/view_video.php?"+i);
                    const vids = doc('.pcVideoListItem.js-pop.videoblock.videoBox.omega');

                    // Collect the data you want to return
                    const links = vids.map((index, element) => {
                        return doc(element).attr('data-id'); // Use doc(element) to access Cheerio methods
                    }).get(); // Get an array from the Cheerio object
                
                    return {
                        statusCode: 200, // Change status code to 200 for success
                        body: JSON.stringify({ links }), // Return the list of links
                    };
                    break;
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
}*/


const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    const { i } = event.queryStringParameters;
    const { t } = event.queryStringParameters;

    if (!i) {
        // Get random popular page videos from a site
        try {
            // Use await to correctly wait for getDoc's async result
            const d = await getDoc("https://pornhub.com/video?o=mv&page=" + rand(0, 455));
            const videoElements = d('.pcVideoListItem.js-pop.videoblock.videoBox');

            if (videoElements.length > 0) {
                // Get the first video element
                const firstVideoElement = videoElements.first();

                // Find the first <a> element inside the first video element
                const firstAnchor = firstVideoElement.find('a').first();

                // Extract the href attribute
                const href = firstAnchor.attr('href');

                return {
                    statusCode: 200, // Success
                    body: JSON.stringify({ links: href }), // Return the first video link
                };
            } else {
                return {
                    statusCode: 300,
                    body: JSON.stringify({ error: "No videos found" }),
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: `Error fetching videos: ${error.message}` }),
            };
        }
    } else {
        try {
            switch(t) {
                case 0:
                    const doc = await getDoc("https://pornhub.com/view_video.php?" + i);
                    const vids = doc('.pcVideoListItem.js-pop.videoblock.videoBox.omega');

                    // Collect the data you want to return
                    const links = vids.map((index, element) => {
                        return doc(element).attr('data-id'); // Extract data-id attribute
                    }).get(); // Convert Cheerio object to array
                
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ links }), // Return the list of video links
                    };
                default:
                    break;
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Success' }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to scrape data' }),
            };
        }
    }
};

// Function to generate a random integer between min and max
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get and parse the document
async function getDoc(urls) {
    try {
        const response = await axios.get(urls);
        const $ = cheerio.load(response.data);
        return $; // Return the Cheerio object
    } catch (error) {
        console.error(`Error fetching the document: ${error.message}`);
        throw error; // Rethrow the error so it can be handled by the calling code
    }
}
