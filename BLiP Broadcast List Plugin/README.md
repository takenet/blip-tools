# BLiP Broadcast List Plugin/Tool

This is a BLiP example plugin/tool made to help users manage distribution lists with ease.

Visit the sample [page here](https://blip-broadcast-plugin.netlify.app).

## What is possible to do with this plugin/tool

### Distribution Lists

1.  See all the distribution lists of the bot.
2.  Add new lists.

![Manage List](./imgs/broadcast1.png)

3.  Delete list.

![Delete list](./imgs/broadcast2.png)

### Members

1.  See all the members' distribution list.
2.  Remove a member from a distribution list.

![Manage members](./imgs/broadcast3.png)

### Contacts

1.  See all the contacts' bot.
2.  Add contacts into the selected distribution list.

![Manage contacts](./imgs/broadcast4.png)

3.  Filter all the contacts' bot by:

- Name
- Email
- Phone
- City
- Id
- Extras

![Filter contacts](./imgs/broadcast5.png)

4.  See all contact information.
    ![See all contact information](./imgs/broadcast6.png)

## Connecting the plugin to your bot

1. Access your bot's advanced configuration.
2. Set the follow tuple:  
   **Domain**: `postmaster@portal.blip.ai`  
   **Key**: `Plugins`  
   **Value**:

```json
{
  "broadcast-list-plugin": {
    "name": "Broadcast List Plugin",
    "url": "https://blip-broadcast-plugin.netlify.app"
  }
}
```

See the result below:
![Define information in advanced settings](./imgs/advanced_configuration.png)

3. Access the following path shown below to use the plugin:

![Path to access the plugin](./imgs/img2.png)

## Using the project as a Tool

1. Access the [url project](https://blip-broadcast-plugin.netlify.app)
   ![Project as a Tool](./imgs/tool.png)
1. Fill in the fields key with your bot information, you can find this information following the image bellow:
   ![How to get your bot information](./imgs/bot-info.png)
1. Click on load button.

## Getting started from this project

1. Download or clone the project from `git`(the recommended way):

`git clone https://github.com/takenet/blip-plugin-sample.git`

2. Install all packages from npm:

`npm install`

3. Run the project:

`npm start`

4. Now just add the plugin to your chatbot and enjoy!
