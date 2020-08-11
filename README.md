# all-design-events


## Getting started

Create a .env file inside project folder with following values:

HOST=localhost
PORT=3000
mongo_url = mongodb://localhost/design_events


### Mongo Collections & setup

The Mongodb collection contains following coloums
1. Event Title
2. Slug - url structure
3. CollectionId - no need to parse now
4. Created On - date on which event was added to our platform
5. Location - where the design is being conducted
6. Registration Link - link to register for event
7. Date - event date
8. Time - event time
9. Price - free/paid
10. Mode - offline/online, I think this is a redundent entry future work to make is drived attribute
11. Organizer - Organizer details
12. Image - Link to event image 
13. Description - 240 char description about event
14. clicks - no. of people clicked the event registration link

Start by importing data testing data in mongodb using following commands

`$ mongoimport -d design_events -c active_events --type csv --headerline --file /your/file/location/design_event.csv`


---


### Request format for Active Events


### GET Request format

##### 1. Without Lazy Loading 

curl -X GET http://localhost:3000/api/events/  - Return all active events and all corresponding details about them

curl -X GET http://localhost:3000/api/events/key/value

1. key: mandatory - following are the only values that can act as key for using get with filters.
	1. slug:
	2. mode
	3. price 
	4. location
	5. user_id

2. value: mandatory - value of the corresponding key parameter

##### 2. With Lazy Loading 

curl -X GET http://localhost:3000/api/events/?pageNum=val  - Return skips first valx10(for first 10 events pageNum=1, for next 10 events pageNum=2 an so on.) events and returns all corresponding details about them

curl -X GET http://localhost:3000/api/events/key/value?pageNum=val



### POST Request format

curl -X POST http://localhost:3000/api/events/ -H 'content-type: application/json' -d '{"user_id":"---","event_title":"---","location":"---","registration_link":"---","event_date":"---","time":"---","price":"---","mode":"---","organizer":"---","image":"---", "description":"---"}'

1. user_id: mandatory
2. event title: mandatory
3. location: mandatory
4. registration_link: optional
5. event_date: mandatory
6. event_time: optional
7. event_time_zone: mandatory
7. price: mandatory
8. mode: mandatory
9. organizer: mandatory
10. image: optional
11. description: optional
12. isactive: "true"  (string)


---


### Request format for Past events

### GET Request format for Past Events
curl -X GET http://localhost:3000/api/past_events  - Return all past events and all corresponding details about them

curl -X GET http://localhost:3000/api/past_events?pageNum=val  - Return skips first valx10(for first 10 events pageNum=1, for next 10 events pageNum=2 an so on.) events and returns all corresponding details about them

**parameters returned**
isactive: "false"  (string)


### PUT Request format for Past Events to update past events

curl -X PUT http://localhost:3000/api/past_events -H 'content-type: application/json' -d '
{ 
	
	"slug":"--------", 
	"youtube":"-----",
	"blog":"--------" 
} '

1. slug: mandatory
2. youtube: mandatory  (anyone or all among youtube and blog)
3. blog: mandatory (anyone or all among youtube and blog)


---


### Request format for Users Database


### GET Request format for Users Database
curl -X GET http://localhost:3000/api/users  - Return all users and all corresponding details about them

curl -X GET http://localhost:3000/api/users/user_id/value  - Returns all the details of a user, uniquely represetned using using user_id(which is email)

### GET Request format for Organizations

curl -X GET http://localhost:3000/api/users/organizations  - Return all organizations and their logo urls


### POST Request format for Users Database

curl -X POST http://localhost:3000/api/users -H 'content-type: application/json' -d '
{ 
	
	"user_id":"-------", 
	"user_fullname":"------",
	"user_image":"---------"
	"user_bio: "----------",
    "isadmin": 1 or 0, 
	"organization":"-------",
	"organization_image":"---",
} '

1. user_id: mandatory (this will be the email address)
2. user_fullname: mandatory 
3. user_image: optional
4. user_bio: optional
5. isadmin: mandatory (values should be 1 or 0. 1:yes, 0:no, default value 0)
6. organization: optional
7. organization_image: optional

### PUT Request format for Users Database

curl -X POST http://localhost:3000/api/users -H 'content-type: application/json' -d '
{ 
	
	"user_id":"-------", 
	"organization":"-------",
	"organization_image":"---",
} '

1. user_id: mandatory (this will be the email address)
2. organization: mandatory
3. organization_image: optional


---


### Request format for Users Subscription to Events


### GET Request format to find all users subscribed to an event identified by slug

curl -X GET http://localhost:3000/api/event_subscription/key/value

1. key : slug (mandatory)
2. value: slug value (mandatory)


### POST Request format for subscribing user to an event

curl -X POST http://localhost:3000/api/event_subscription/ -H 'content-type: application/json' -d '
{ 
    "slug": "---------",
    "name": "---------",
    "email": "--------"
	"phone": "--------"
}'

1. slug: mandatory
2. name: mandatory
3. email: mandatory
4. phone: optional


### Request format for Exporting Events Subscriptions in CSV

curl -X GET http://localhost:3000/api/export_csv/:key/:value

1. key : slug (mandatory)
2. value: slug value (mandatory)