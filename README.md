# Call Queue Bot

Welcome to our WXSD DEMO Repo! <!-- Keep this here --> 

Call queue bot also known as Mindy bot, gets a post request once the responder starts a session. On getting the post request and based on the post request, if the request URL is '/virtual-nurse-request', Mindy Bot creates a new space, generates JWT token to both requester and responder, adds requester and responder to the space created and generate a response link and send it as the post resquest response and also to the soap box as a request. But if the request URL is '/virtual-nurse-sip-address-request', Mindy Bot creates a new space, generates JWT token to both requester and responder, adds requester and responder to the space created, gets the SIP Address for the room, sends the SIP Address as a response and also sends a soapbox request.


<!-- Keep the following here -->  
 *_Everything included is for demo and Proof of Concept purposes only. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos._
 
 
### Usage

One can use the Mindy Bot by sending a post request to:

```
curl --location --request POST 'https://mindy.wbx.ninja/virtual-nurse-request' \
--header 'Content-Type: application/json' \
--data-raw '{
    "guid":"123",
    "labels":
    {
        "responder":"Responder Nurse",
        "requester":"Requester Nurse"
    }
}'
```

and the response contains the response URL, which looks like:

```
{
    "redirect": "https://wxsd.wbx.ninja/guest?headerToggle=false&destination=DESTINATION&userType=licensed&token=ACCESS_TOKEN"
}

```
For the SIP Address usecase, one can send the request to:

```
curl --location --request POST 'https://mindy.wbx.ninja/virtual-nurse-sip-address-request' \
--header 'Content-Type: application/json' \
--data-raw '{
"guid": "123",
"labels":
{
"responder":"Responder Nurse",
"requester":"Requester Nurse"
}
}'
```

and the response contains SIP address and host token which looks like:

```
{
"sipAddress": "*@meet.ciscospark.com",
"hostToken": ""
}
```
For getting the access token of the guest user, one can send the request to:

```
curl --location --request POST 'https://mindy.wbx.ninja/issue-token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":""
}' 
```

and the response contains access token which looks like:

```
{
    "accessToken": "ACCESS_TOKEN"
}
```


### Setup

Open a new terminal window and follow the instructions below to setup the project locally for development/demo.

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/mindy-bot-refactored.git && cd mindy-bot-refactored
   ```

2. Copy `.env.example` file as `.env`:
   ```
   cp .env.example .env
   ```

You will need to add values to **.env** file:

```
WEBEX_API_URL=https://webexapis.com/v1
NINJA_API_URL=https://wxsd.wbx.ninja
SOAPBOX_API_URL=https://soapbox.wbx.ninja
WEBEX_ACCESS_TOKEN=
WEBEX_ORG_ID=
WEBEX_TEAM_ID=
WEBEX_JWT_SECRET=
PORT=
```
Note:

1. You will need to provide a PORT for this to run locally, if left empty, it runs on port 3000
2. Review and follow the [Creating a Webex Bot](https://developer.webex.com/docs/bots#creating-a-webex-bot) guide.
   Take note of your Bot access token. Assign this value to the `WEBEX_BOT_TOKEN` environment variable.
3. Review and follow the [Create a Guest Issuer app on Webex](https://developer.webex.com/docs/guest-issuer#guest-issuer-app) guide.
   Take note of your Guest Issuer ID and Shared Secret. Assign these values to the `WEBEX_ORG_ID`
   and `WEBEX_JWT_SECRET` environment variables respectively.
4. You can [create a team](https://developer.webex.com/docs/api/v1/teams/create-a-team) by following the link. Take a note of id returned in the response and assign it to `WEBEX_TEAM_ID` environment variable.

### Install

The typical npm install flow, after the setup

```
npm install
npm start
```
