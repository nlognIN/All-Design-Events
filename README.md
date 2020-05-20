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
