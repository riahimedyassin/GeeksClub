# Geeks Club 
## Who are we ?
Geeks Club is a tech club that aim to solve real world problems by merging technologie with a creative member's mindset.
## What do we offer ?
We offer free and paid courses for members instructed by tech professionals and the member's themselves .
We organize events that could help you enhance your soft skills as well as your hard skills. 
## Our work flow ?
Most of our work will be remotly done thanks to Github and this website that we will be working on enhancing it.
----------------------
# Project Structure : 
The project structure could be divided to 3 main parts  :
## Public Pages :
The public pages are those visible for everyone who tend to visit the website and discover more about our activities. 
This section itself could be divided to two main sections : 
### Home 
The home section is the main part loaded in the website . It is part of the app module.
It contains : 
1. Home Page 
2. Member's Login Page  
3. Admin's Login Page 
4. Register Page
### Statics
The statics section is part of the main section but will be lazy loaded once the user request one of the folloing pages :  
1. About the Founder 
2. Articles (A lazy loaded component inside the Statics Module)
3. Donate 
3. Sponsoring 
4. General Terms Of Application
## Member's Pages : 
The member's pages are those pages only visible for the club's members. The structure of this pages is as following :
1. Home Page (Dashboard)
2. Events Page : Includes path to happening events or ended ones and allow member to participate to a one .
3. Forums Page : Includes path to available forums and allow user to publish articles in those forums .
4. Leaderboard : Keep track of all the member's activities and points.
5. Settings : Allow the user's to change his own data .
## Admin Pages :
The admin page allow admins (Sup admin or Normal Admin) to manipulate the websites CRUD the different data of the event.

# Explaining Some Code Logic 
**NOTE** : The approaches used could not be the best approaches to be implemented but I did my best in seaching and trying to optimize as much as possible in this code .

### Image Upload : 
For the image upload , I used **Cloudinary** which is a free open source cloud that allow you to upload picture and get a unique path to the picture uplaoded that could be accessed directelly from the link.
1. Get Image Signature : The following logic implemented allows me to get a unique image signature for the image uploaded by specifying ( in the backend ) the config for my cloudinary account and by specifying the folder where I want to save my picture in. 
2. Upload the image : After getting a unique signature , I could upload the image to my cloudinary account and get a secure url (https) for my picture
3. Save the image : After getting the URL , I could simply save it to my mongoDB collection relativly to the logged in user.

### Interceptors :
#### JWT Interceptor : 
The JWT interceptor is simply used to send Bearer Tokens headers automatically .
#### Error Interceptor : 
The Error interceptor is mainly implemented here to redirect unauthorized user's **403 Forbidden**. Otherwise the problems will be handeled in the components .

### Resolvers :
Implementing the is superior admin resolver is meant to check if the admin is superieur before loading the page. 

### Standalone Components : 
Stand alone components are a new way of declaring global components that will be used in multiple modules. Instead of defining a module that contains just some components and importing it all , we could simply import the components we want only . 
The usage of standalone components is mainly for performance optimization. 
