# Mindy Bot (Out)

Mindy Bot Out, gets a post request once the responder starts a session. On getting the post request, Mindy Bot creates a new space, generates JWT token to both requester and responder, adds requester and responder to the space created and generate a response link and send it as the post resquest response and also to the soap box as a request. 

### Usage
One can use the Mindy Bot by sending a post request to 
```
curl --location --request POST 'https://mindy.wbx.ninja/virtual-nurse-request' \
--header 'Content-Type: application/json' \
--data-raw '{
    "guid":"",
    "labels":{
        "responder":"",
        "requester":""
    }
}'

```
and the response contains the response URL, which looks like:
```
{
    "redirect": ""
}

```

### Setup
You will need to create a file called **.env** that includes the following lines:
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
1. You will need to provide a PORT for this to run locally, or else if empty, it runs on port 3000
2. You will need to provide an WEBEX_ACCESS_TOKEN of a test bot for testing
3. You will need to create a new Guest Issuer application in My Webex Apps and provide the WEBEX_ORG_ID and WEBEX_JWT_SECRET.
4. You will need to provide WEBEX_TEAM_ID in which the spaces are created.

### Install
The typical npm install flow, after cloning this repo
```
npm init
npm install
npm start
```
