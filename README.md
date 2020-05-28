# all-design-events


### Getting started

###### Mongo Collections & setup

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


###### Get Request format

curl -X POST http://localhost:3000/api/events/v1/  - Return all the events and all the corresponding details around them

curl -X POST http://localhost:3000/api/events/v1/key/value

1. key: mandatory - following are the only values that can act as key for using get with filters.
	1. slug:
	2. mode
	3. price 
	4. location
	5. user_id

2. value: mandatory - value of the corresponding key parameter



###### Post Request format

curl -X POST http://localhost:3000/api/events/v1/ -H 'content-type: application/json' -d '{"user_id":"---","event_title":"---","location":"---","registration_link":"---","event_date":"---","time":"---","price":"---","mode":"---","organizer":"---","image":"---", "description":"---"}'

1. user_id: mandatory
2. event title: mandatory
3. location: mandatory
4. registration_link: mandatory
5. event_date: mandatory
6. event_time: optional
7. price: mandatory
8. mode: mandatory
9. oranizer: mandatory
10. image: optional
11. description: optional
