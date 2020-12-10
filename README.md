# ambossUrl

getDataFromAmboss.ts: Scrapes links to all publicly available articles from https://www.amboss.com/de/wissen/index. Data will be saved into .\json-products\dataFromAmboss.json.

matchAmbossStrict.ts: Compares diagnosis-list.json.name with dataFromAmboss.json.name. Creates new json file diagnosis-list-updated.json which is the copy of the original json file
with saved urls of the matched names.

searchUrlByName.ts: This one has to be done over many iterations manually (Info written as comment in the file), not an elegant solution but worked. It scrapes the search results
from duckduckgo and save them into json file diagnosis-list-updated2.json.
