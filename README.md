# Backend
📶 Custom backend for Splitgate made in TypeScipt

**⚠️ This repo is still in development, therefore you may run in some errors**

## Installation
- Download and install [Bun](https://bun.sh/)
  
- Download and extract the repo or git clone it
  
- Open the terminal and go into the unzipped directory
  
- Type `bun install` and wait
  
## Usage
- Fill the values in config.ts

- **Start one of the two proxies**

  - Use this **[fiddler](https://www.telerik.com/download/fiddler) auto responder rule:**
    ```
    Match: regex:(.*)splitgate.accelbyte.io/(.*)
    Action: http://localhost:5005/$2
    ```
      
  ---
    
  - Set proxy in the windows settings app to `127.0.0.1:8080`

  - Run proxy.py via the `mitmdump -s scripts/proxy.py -k` **([mitmproxy](https://mitmproxy.org/) is required)**

- Run the server via the `bun .` command

- Profit

## How To

- To update cosmetics:

  - Via **[FModel](https://fmodel.app)**, use "Save Folder's Packages Properties" feature on `PortalWars/Content` folder, then run `bun scripts/fillCosmeticsFromFModel.js`
    
  - Sniff http calls made to sections and items, merge them together in `sections.json` and `items.json` files placed in `scripts/bin`, then run `bun scripts/updateCosmeticsFromItems.js`
