# Backend
📶 Custom backend for Splitgate made in TypeScipt

## Usage
  • Fill the values in config.ts
  
  • Build via the `npx tsc` tsc command
  
  • Make sure every file in `/assets/json/` is in `/dist/assets/json`, if not copy them
  
  • Set proxy in the settings app to `127.0.0.1:5005`
  
  • Run proxy.py via the `mitmdump -s proxy.py -k` **(mitmproxy is required)**
  
  • Run the server via the `node .` command
  
  • Profit
