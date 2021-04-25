# RadioPlatform - A Platform for Radio Amateurs

RadioPlatform is an Angular platform thought for radio amateurs to have a safe place to chat and manage their next purchase of equipment.

# Objectives
* Users can share antennae used for their equipment, along with transceivers they may use, and make it known to other radio amateurs.
* Users can chat, where they can ask for advice, find buying options among other radio-amateur related topics.
* Users have a list of users they can filter by country, equipment, antennae, preferred frequency range... When they search for contacts.
* Users have a map where they can see at a quick glance all the contacts they have neatly shown in the 'Contacts' section.
* Users can set their favoured frequency and let other users know when they start transmitting and when.
* Users can give a price to equipment and make simple calculations to know whether they can afford it or not.
* Admins can moderate the chat with several tools that will allow for it.

# Technologies
RadioPlatform will use several technologies to accomplish its objectives.
* Ionic and Angular for the frontend.
* MySQL for caching coordinate data and usage limitation checking.
* Firebase Storage for holding users' pictures.
* Firebase Database for holding users' data.
* Express for holding the chat server
* Socket.io for chat application allowing
* Leaflet for rendering the maps.
* Nominatim for obtaining OpenStreetMap's data.
* PHP for building an access point to the MySQL database
# Mockup

![Mockup 1](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%201.png)
![Mockup 2](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%202.png)
![Mockup 3](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%203.png)
![Mockup 4](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%204.png)
![Mockup 5](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%205.png)
![Mockup 6](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%206.png)
![Mockup 7](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%207.png)
![Mockup 8](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%208.png)
![Mockup 9](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%209.png)
![Mockup 10](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%2010.png)
![Mockup 11](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%2011.png)
![Mockup 12](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/Web%201920%20%E2%80%93%2012.png)

## Mar 18, 2021
Initial commit

@PabloLuisMolinaBlanes
PabloLuisMolinaBlanes committed 18/03/2021

## Mar 23, 2021
Create .gitignore - I just created a file called .gitignore, generated from the repository of other user.

I edited the README to add the first actions taken

Added purpose for the program

@PabloLuisMolinaBlanes
PabloLuisMolinaBlanes committed 23/03/2021

## Mar 30, 2021
Added relevant application description and info

@PabloLuisMolinaBlanes
PabloLuisMolinaBlanes committed 30/03/2021

## Apr 25, 2021

I went and searched for information on how to perform some basic actions on Ionic this week; including installing, configuring and getting everything ready, including Git. I also went and developed the ionic login page and refreshed my knowledge on ionic components:

* https://ionicframework.com/docs/api/thumbnail
* https://ionicframework.com/docs/api/button
* https://ionicframework.com/docs/api/input

I also saw a little mistake on how would I do the chat, as it wouldn't be efficient to do with the current technology, so I added express and socket.io implementation in Ionic to the technology requirements.
