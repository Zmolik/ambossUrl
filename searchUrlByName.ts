const sec = require('search-engine-client');
const fs = require('fs');

// the first scraping has to be done by reading from file diagnosis-list-updated.json, after the diagnosis-list-updated2.json is 
// created, you change to read from diagnosis-list-updated2.json to update it each iteration
fs.readFile('.\\json-products\\diagnosis-list-updated2.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    const json = JSON.parse(data);
    console.log(json.length)

    //let list = [];
/*
Problem: If I tried to loop over the whole json file (1375 elements), it would crash. I tried to scrape the links by myself
but I wasn't succesful. Search-engine-client library was the only library I could make work, but it works only on small amount of
searches. So I did it half-manually. Via trial/error I realised that the best number of concurrent searches is 30. 
Solution: So I changed manually the variable "mal" from 1 to 45 (when mal == 45 then you have to change var "to" = 1375) and got 
like 90 percent of success. Still there were some empty searches (urlByName = []) so I loop over it again, this time over 200 at once,
I used if condition (in this code the if condition is deleted) to not search again for the once that have already links saved.
Through repeating this cca 5 time for each 200 I got to find the links where it was possible. There are still some without any links 
in urlByName, but there are no search results on duckduckgo. 
I think this can work without the manual part but there has to be some time delay implemented between each iteration but I didn't know how.
*/

    let mal = 40  
    let from = 30 * mal
    let to = 30 * (mal + 1)
    for (let i = from; i < to ; i++) {
        if (json[i].urlByName.length == 0 && json[i].ambossUrl.length == 0) {
            //list.push(json[i]);
            ///*
            sec.duckduckgo(json[i].name + ' site:amboss.com/de').then(function(result) {
                json[i].urlByName = result.links;
                const jsonFile = JSON.stringify(json, null, 2);
                // I don't know how to save the data outside the block. When I do it saves nothing.
                // So I saved it each time, inneficient and not optimal I know... I was hoping you can tell me how I can do it :)
                fs.writeFile('.\\json-products\\diagnosis-list-updated2.json', jsonFile, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
            //*/
        }        
    };
    //console.log(list);
    //console.log(list.length);
})
    
