# Lisk Explorer
This explorer is an abstraction from Liskscan. 
When running this Lisk explorer you can browse the connected blockchain. 
Lisk-explorer is built with NextJS and connects directly to the `lisk-service` gateway.

## Usage
#### Dependencies
For the explorer to run you need at least node v12

| Dependencies | Version |
| ------------ |--------|
| NodeJS       | 12+    |

### Clone
```git clone https://github.com/liskscan/lisk-explorer.git```

### Configure the explorer
Edit the `.env` file variables to configure your explorer.

The `public` network hosts need to be reachable through the browser
```dotenv
NEXT_PUBLIC_NETWORK_WS=wss://public-gateway-host.com
NEXT_PUBLIC_NETWORK_HTTP=https://public-gateway-host.com
```
The `local` network hosts need to be reachable at the machine the explorer runs on
```dotenv
NEXT_PUBLIC_LOCAL_NETWORK_WS=ws://localhost:9292
NEXT_PUBLIC_LOCAL_NETWORK_HTTP=http://localhost:9292
```

### Install NodeJS dependencies and build Lisk Explorer
```npm run init```

### Start explorer
```npm run start```

### Start pm2
```pm2 start pm2.conf.json```

### Run dev mode
```npm run dev```

### Build explorer
```npm run build```

## Configure
- edit configuration in .env
- change the theme colors in styles/theme.css
- Don't forget to run `npm run build` after any changes

# License
Copyright 2022 Moosty

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.