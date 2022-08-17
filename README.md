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
  
  • Make sure every file in `/assets/json/` is in `/dist/assets/json`, if not copy them
  
  • Set proxy in the settings app to `127.0.0.1:5005`
  
  • Run proxy.py via the `mitmdump -s proxy.py -k` **(mitmproxy is required)**
  
  • Run the server via the `node .` command
  
  • Profit
