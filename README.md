# Backend
📶 Custom backend for Splitgate made in TypeScipt

**⚠️ This repo is still in development, therefore you may run in some errors**

## Installation
  • Download and install [Node.js](https://nodejs.org/en/download/)
  
  • Download and extract the repo or git clone it
  
  • Open the terminal and go into the unzipped directory
  
  • Type `npm install` and wait
  
## Usage
  • Fill the values in config.ts
  
  • Build via the `npx tsc` command
  
  • Make sure every file from `/assets/json/` is in `/dist/assets/json`, if not copy them
  
  • Set proxy in the settings app to `127.0.0.1:8080`
  
  • Run proxy.py via the `mitmdump -s proxy.py -k` **([mitmproxy](https://mitmproxy.org/) is required)**
  
  • Run the server via the `node .` command
  
  • Profit

## How To

  • To update cosmetics:

  - Via **[FModel](https://fmodel.app)**, use "Save Folder's Packages Properties" feature on `PortalWars/Content` folder, then run `node scripts/fillCosmeticsFromFModel.js`
    
  - Sniff http calls made to sections and items, merge them together in `sections.json` and `items.json` files placed in `scripts/bin`, then run `node scripts/updateCosmeticsFromItems.js`