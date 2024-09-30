
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
};*//*
const express = require('express');
const cors = require('cors');
const app = express(); // Initialize Express app

// Enable CORS
app.use(cors());

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
            const links1 = [];
            videoElements.each((index, element) => {
                const anchor = d(element).find('a').first(); // Get the first <a> element
                const href = anchor.attr('href'); // Extract the href attribute

                if (href) {
                    links1.push(href); // Add the href to the links1 array
                }
            });
            return {
                statusCode: 200, // Success
                body: JSON.stringify({ links: links1 }), // Return the first video link
            };

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
*/









const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
            },
            body: ""
        };
    }

    try {

        
        const { i, t } = event.queryStringParameters;
        if(i){

        // Fetch the HTML content of the page that contains the iframe
            const { data } = await axios.get('https://pornhub.com/view_video.php?viewkey=66cf5d90a3a30' + rand(0, 455), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                }
            });

        const $ = cheerio.load(data);
        const el = $('script');

        //const elm = el.children();


        // Remove elements that match the selector
        //$('.mgp_topBar').remove();

        // Get the modified HTML
        //const modifiedHtml = $.html();
    //modifiedHtml
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Allows any domain
                },
                body: JSON.stringify({ el}),
            };



        } else{
            
            const { data } = await axios.get('https://pornhub.com/video?o=mv&page=' + rand(0, 455), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                }
            });
    
            const $ = cheerio.load(data);
            const videoElements = $('.pcVideoListItem.js-pop.videoblock.videoBox');
            const links = [];
            const titles=[];
            const images =[];
            const thvids = [];
            videoElements.each((index, element) => {
            const anchor = $(element).find('a').first(); // Get the first <a> element
            const imgElement =$(element).find('img').first();
            const img = imgElement.attr('src');
            const href = anchor.attr('href'); // Extract the href attribute
            const tit = anchor.attr('title'); // Extract the href attribute
            const thvid = imgElement.attr('data-mediabook'); // Extract the href attribute
            if (href) {
                links.push(href); // Add the href to the links1 array
            }
            if(tit){
                titles.push(tit);
            }
            if(img){
                images.push(img);
            }
            if(thvid){
                thvids.push(thvid);
            }
            });
            
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Allows any domain
                },
                body: JSON.stringify({ links , titles , images,thvids}),
            };
        }
    
        }
        catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: `Failed to scrape data: ${error.message}` }),
            };
        }
};

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
const puppeteer = require('puppeteer');

exports.handler = async (event, context) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://pornhub.com/embed/66cf5d90a3a30');

  // Remove the part you don't want
  await page.evaluate(() => {
    const element = document.querySelector('.element-to-remove');
    if (element) element.remove();
  });

  const modifiedHTML = await page.content();
  await browser.close();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Or specify your domain
      'Content-Type': 'text/html',
    },
    body: modifiedHTML,
  };
};
*//*
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com', { waitUntil: 'networkidle0' });

  // Accede al iframe por su selector
  const frame = await page.frames().find(f => f.url().includes('iframe-url.com'));
  
  // Extraer el blob URL del contexto del iframe
  const blobUrl = await frame.evaluate(() => {
    const videoElement = document.querySelector('video');
    return videoElement ? videoElement.src : null;
  });

  if (blobUrl) {
    console.log('Blob URL encontrado en el iframe:', blobUrl);
  }

  await browser.close();
})();

*/
/*


const axios = require('axios');
const cheerio = require('cheerio');

async function fetchVideo() {
    try {
        // Fetch the HTML content of the page that contains the iframe
        const { data } = await axios.get("https://pornhub.com/embed/66cf5d90a3a30", { 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
            }
        });

        const $ = cheerio.load(data);
        const el = $('#mgp_videoElement');
        const videoBlobUrl = el.attr('src'); // Modify selector as needed

        if (videoBlobUrl) {/*
            // Fetch the video data
            const videoResponse = await axios.get(videoBlobUrl, {
                responseType: 'arraybuffer', // Important for binary data
            });

            // Create a buffer and convert it to a blob URL
            const videoBlob = Buffer.from(videoResponse.data);
            const blobUrl = URL.createObjectURL(new Blob([videoBlob]));

            // Create an HTML response with the video
            const modifiedHtml = `
                <video controls>
                    <source src="${blobUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Or specify your domain
                    'Content-Type': 'text/html',
                },
                body: videoBlobUrl,
            };
        } else {
            console.error("No video source found.");
            return {
                statusCode: 404,
                body: $.html(),
            };
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        return {
            statusCode: 500,
            body: "Internal Server Error",
        };
    }
}

// Call the async function
module.exports.handler = fetchVideo;
*/