# RadioPlatform - A Platform for Radio Amateurs

RadioPlatform is an Angular platform thought for radio amateurs to have a safe place to chat and manage their equipment.

# Objectives
* Users can share antennae used for their equipment, along with transceivers they may use, and make it known to other radio amateurs.
* Users can chat, where they can ask for advice, find buying options among other radio-amateur related topics.
* Users have a list of users they can filter by country, equipment, antennae, preferred frequency range... When they search for contacts.
* Users have a map where they can see at a quick glance all the contacts they have neatly shown in the 'Contacts' section.
* Users can set their favoured frequency and let other users know when they start transmitting and where.
* Users can give a price to equipment and make simple calculations to know whether they can afford it or not.
* Admins can moderate the chat with several tools that will allow for it.

# Technologies
RadioPlatform will use several technologies to accomplish its objectives.
* Ionic and Angular for the frontend.
* PostgreSQL for caching coordinate data and usage limitation checking.
* Firebase Storage for holding users' pictures.
* Firebase Database for holding users' data.
* Express and node for holding the chat server and making an API to the MySQL server
* Socket.io for chat application allowing
* Heroku for holding the Express API
* Leaflet for rendering the maps.
* Nominatim for obtaining OpenStreetMap's data.
* GitHub Pages for web app hosting.
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

## Apr 29, 2021 - May 02, 2021

I have got the infrastructure (Firebase, MySQL and Express) ready thus far, I wondered whether I should replace PHP with Express just because it seems easier: 

I also put together the database and how is the data going to be organized.

![Design](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Proyecto/Disenio/Diagrama1.png)

I designed the final logo for RadioPlatform.

![Logo](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Mockup/logoRadioPlatform.svg)

I also developed the server further, adding test Socket.io functionality and a basic listing for cached coordinate data in my MySQL database. I also managed to connect this server through Socket.IO with my Ionic app.

I also think I managed to connect to Firebase.

Relevant Bibliography:

* https://dev.to/nurofsun/building-simple-rest-api-with-express-js-and-mysql-140p.
* https://devdactic.com/ionic-4-socket-io/
* https://ionicthemes.com/tutorials/about/building-a-ionic-firebase-app-step-by-step
* https://stackoverflow.com/questions/60455433/property-auth-does-not-exist-on-type-angularfireauth (An error I had)

## May 03, 2021 - May 10, 2021

It seems I have completed the functional version. The basic functionality is complete, except for the external API access. More specifically, these parts are marked as at the very least functional.

* Users have a map where they can see at a quick glance all the contacts they have neatly shown in the 'Contacts' section.
* Users can chat, where they can ask for advice, find buying options among other radio-amateur related topics.
* Users can set their favoured frequency
* Users can give a price to equipment and make simple calculations to know whether they can afford it or not.
* Users can read, remove, set and update antennae, radio sets and contacts (the latter only under certain circumstances yet)

The landing page is almost complete as well.

![Landing1](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Landing/landingpage.png)
![Landing2](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Landing/landingpage2.png)
![Landing3](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Landing/landingpage3.png)


I also decided to remove PHP from the list of technologies as it is too cumbersome and it is much more efficient to use express and node. Express and node also allow for more possibilities with respect to future features with less code and hardship.

List of relevant bibliography:

  Project:
  
* https://blog.angular-university.io/angular-material-dialog/
* https://ionicframework.com/docs/api/select/
* https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet
* https://www.djamware.com/post/5b74e54f80aca74669894413/ionic-4-and-angular-6-tutorial-firebase-realtime-crud-mobile-app
* https://ionicframework.com/docs/api/modal
* https://blog.angular-university.io/angular-file-upload/
* https://www.joshmorony.com/using-angular-routing-with-ionic-4/
* https://www.technbuzz.com/2020/02/09/upload-photos-to-firebase-storage-with-ionic-angular/
* https://www.bennadel.com/blog/3630-pasting-images-into-your-app-using-file-blobs-and-url-createobjecturl-in-angular-7-2-15.htm
* https://blog.angular-university.io/angular-http/

Landing page:
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
* https://www.w3schools.com/css/css_grid.asp

And many StackOverFlow threads, too.

## May 10, 2021 - May 16, 2021

Added both the video (.mkv) and the .apk of the functional version (can be found in "Proyecto" folder).

Here is the video (in .mp4 format, in spanish):


![video](https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Proyecto/Video/2021-05-13%2012-12-34.mp4)

For those who don't understand spoken spanish, I am basically presenting my application and saying what functionality is yet to be added (refactoring, an admin panel, chat moderation and better design)

## May 17, 2021 - May 23, 2021

I modified the landing page in order to fix some layout bugs, make the canvas button functional and add some new images. 

## May 23, 2021 - May 30, 2021

I did various additions and bug fixes, among those:

* Fix bug in contacts page in which audio files were duplicated across contacts.
* Added a rudimentary admininstration page (still not fully functional).
* Added login through callsign for new accounts.
* Fixed testing issue in which phone emulators/phones couldn't connect to the application's infrastructure.
* Added basic form validation where if the required data is not input it won't be allowed to make the new relevant item.
* Fixed bug where map would gray out consistently.
* Now the antennae and equipment are listed based on the user instead of being in a generic all-encompasing list.
* Now data is shown tabularly.
* Fixed certain layout problems in mobile phones.
* Now if data is added changes are registered in real time.
* Login is required to go to any part of the page except for the login and registration pages.

To-do list:

* Add chat moderation tools.
* Improve accesibility.
* Update and delete items from all lists in real time.
* Improve the appereance of the profile page.
* Let users choose preferred antennae and equipment.
* Let users be shown data based on drop-down forms.
* Improve feedback for the user.

## May 30, 2021 - June 06, 2021

I did multiple things, big update!

* I added the API and database to the cloud (Heroku) and made them both work inside the application.
* I made the admin panel, with full functionality.
* Small visual changes on profile.
* Added in all the chat moderation tools.
* Added in function to add already existing radio sets and antennas.
* Small visual changes on how price is shown.
* Now when an user is blocked only that user will be able to see it.
* Fixed bug where markers wouldn't show up properly on certain circumstances.
* Changed MySQL with PostgreSQL as that is what Heroku used as a database system.
* Fixed bug where registration wouldn't occur properly.
* Fixed bugs where certain use cases in making contacts wouldn't add contacts properly.
* Removed buttons from some components or hid them based if the user was in the admin panel or not.
* Added basic verification to see if an user is admin or not and let them into the panel if they are.
* Now all lists update and delete items from it in real time.
* Now users can choose preferred antennae and equipment and have it be shown.
* Now all users' profile pictures appear in the user list.
* Added in the presentation I will be doing on the 21st.
* Updated the landing page to reflect the changes.
* Fixed styling error in canvas in the landing page.
* Started some code refactoring efforts.

The application is now, functionality-wise, finished, now it would only remain to do bug-fixing, and testing, loads of it.

To-do list:

* Test on phone.
* Test on computer
* Make a tutorial.
* Make an explanatory video.

## June 06, 2021 - June 13, 2021:

Multiple bug fixes and new changes:

* Fixed a bug where undefined markers would break the contacts map.
* Reorganized the folders where the project resides.
* Fixed repeated component imports.
* Added in improved blocking capabilities and a list of blocked people in both the admin and the individual user pages.
* Deployed the web application: https://pabloluismolinablanes.github.io/RadioPlatformDeployed/login/ (credentials will be shown later, not yet up, although it is functional)
* Deployed the landing page: https://pabloluismolinablanes.github.io/RadioPlatformLandingPage/
* Improved filtering dropdowns, now it only shows unique options to choose from.
* Added in a tutorial.
* Added in a preliminary video (yet to add the last one, taking into account the latest version).
* Modified a little the presentation.
* Updated the .apk.

 ## June 14, 2021 - June 16, 2021:
 
 At last, the application seems to be complete.
 
 * Finally deployed the web version of the application: https://pabloluismolinablanes.github.io/RadioPlatformDeployed/login/ (will add credentials tomorrow).
 * The video is available in this link: https://github.com/PabloLuisMolinaBlanes/RadioPlatform/blob/main/Video/definitivevideo.mkv?raw=true
 * Improved feedback on login, now it shows better if there has been an error signing in.
 * Updated video to be more relevant.
 * Fixed problems with storage saving where it would be wrong.
 * Fixed coding typos in filtering in admin page that would make it not filter well.
 * Fixed not properly working delete button in admin page.
 * Fixed bug in calculator page wherein quantitites of elements would not show up repeated.
 * Fixed bug where the original callsign would remain to use to login when modified.
 * Updated tutorial.
 * Added some clarity to the crud pages, now it should be more clear what is mandatory and what isn't.
 * Added GitHub Pages as a new technology
 * Changed application description
