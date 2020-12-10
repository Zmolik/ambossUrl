// 2. match all names from amboss with names from sublimbd diagnosis list
//    - create one json file where the matches will be saved 

const fs = require('fs');

fs.readFile('.\\json-products\\dataFromAmboss.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }
    const ambossJson = JSON.parse(data);    // name, url
    fs.readFile('diagnosis-list.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
    
        const sublimbdJson = JSON.parse(data);      // id, name, searchKeywords  
        const listMatch = [];
        let match = false;
        let count: number = 0;
        sublimbdJson.forEach( dbSublimbd=> {
            ambossJson.forEach(dbAmboss => {
                if (dbAmboss.name == dbSublimbd.name) {
                    listMatch.push(
                        {
                            "id": dbSublimbd.id,
                            "name": dbSublimbd.name,
                            "searchKeywords": dbSublimbd.searchKeywords,
                            'ambossUrl': dbAmboss.url,
                            'urlByName': "",
                            'urlByKeywords': "",
                    })
                    match = true;
                    count++;
                } 
            });
            if (!match) {
                listMatch.push(
                    {
                        "id": dbSublimbd.id,
                        "name": dbSublimbd.name,
                        "searchKeywords": dbSublimbd.searchKeywords,
                        'ambossUrl': "",
                        'urlByName': "",
                        'urlByKeywords': "",
                })
            } else {
                match = false;
            }
        });
        const jsonMatch = JSON.stringify(listMatch, null, 2)
        fs.writeFile('.\\json-products\\diagnosis-list-updated.json', jsonMatch, (err) => {
            if (err) {
                throw err;
            }
            console.log(`JSON data "diagnosis-list-updated.json" is saved. It contains ${count} matches.`);
        });
    });
});