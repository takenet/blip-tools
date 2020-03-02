# BLiP Broadcast Plugin

 This is a BLiP example plugin made to help users manage distribution lists with ease.

 Visit the sample [page here](https://blip-broadcast-plugin.netlify.com/).
 
 ## What is possible to do with this plugin
 
 ### Distribution Lists
 1. See all the distribution lists of the bot.
 2. Add new lists.
 
 ![Manage List](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/broadcast1.png)
 
 ### Members
 
 1. See all the members' distribution list. 
 2. Remove a member from a distribution list.
 
 ![Manage members](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/broadcast2.png)
 
 ### Contacts
 
 1. See all the contacts' bot.
 2. Add contacts into the selected distribution list.
 
 ![Manage contacts](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/broadcast3.png)
 
 3. Filter all the contacts' bot by:
* Name
* Email
* Phone
* City
* Id
* Extras

![Filter contacts](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/broadcast4.png)

 4. See all contact information.
  ![See all contact information](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/broadcast5.png)
  

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
See the result below:
![Define information in advanced settings](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/advanced_configuration.png)

3. Access the following path shown below to use the plugin:

![Path to access the plugin](https://github.com/takenet/blip-tools/blob/master/BLiP%20Broadcast%20Plugin/imgs/img2.png)

## Getting started from this project

1. Download or clone the project from `git`(the recommended way):

`git clone https://github.com/takenet/blip-plugin-sample.git`

2. Install all packages from npm:

`npm install`

3. Run the project:

`npm start`

4. Now just add the plugin to your chatbot and enjoy!

