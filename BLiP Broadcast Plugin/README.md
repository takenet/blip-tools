# BLiP Broadcast Plugin

 This is a BLiP example plugin made to help users manage distribuiton lists with ease.

 Visit the sample [page here](https://blip-broadcast-plugin.netlify.com/).

## Connecting the plugin to your bot
1. Access your bot's advanced configuration.
2. Set the follow tuple:  
 **Domain**: `postmaster@portal.blip.ai`  
 **Key**: `Plugins`  
 **Value**: 
 ```json
{ 
   "broadcast-plugin":{ 
      "name":"Broadcast Plugin",
      "url":"https://blip-broadcast-plugin.netlify.com/"
   }
}

```

## Getting started from this project

1. Download or clone the project from `git`(the recommended way):

`git clone https://github.com/takenet/blip-plugin-sample.git`

2. Install all packages from npm:

`npm install`

3. Run the project:

`npm start`

4. Now just add the plugin to your chatbot and enjoy!

