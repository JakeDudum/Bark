# Bark
Bark! Voice what's going on around you on our location based social platform. Our login authentication is ran on the npm <a href="https://www.npmjs.com/package/passport">Passport.</a> To start as the user types in the required fields to sign up or login we check to make sure the inputs are all filled out and valid. We take these values and pass them into the passport into our <a href="http://www.passportjs.org/docs/authenticate/">passport authenticate</a> method. Here we check if the email has been taken already, if not we store the members information as cookies. We pass our password into the NPM package<a href="http://www.passportjs.org/docs/authenticate/">Bcrypt</a>  which will hash the members password and allow us to call on method to add extra characters to the end making in extremely hard to hack. 

<br>
Our members will access there the Bark! database and be able to see each individual relationship. We have created it so we render information based on the members location, and it will grab all post in that location. Results can also be filtered by category or user profile. 

<br>
Members have the option to create new content as well as add images for relevant information in their location and upvote notable posts. 





## Perquisites


## Running Tests/Instructions
Open the file in your text editor or terminal. Install the node packages listed below. Move into the file you have saved the file in and type node server.js. This will start the application running. Or visit our deployed   <a href="https://barksf.herokuapp.com/">Heroku</a> site

## Built with:
<ol>
<li> Javascript
<li> Bcrypt
<li> Express
<li> Express-Session
<li> Moment
<li> Passport
<li> Passport-local
<li> Sequelize
</ol>

### Local Development Environment for website Repo
The following will get up and running locally.

Author
Adam Lehrer, Alton Shu,
Minori Hashimoto,
Jake Dudum

![Bark](/public/assets/images/login-page.png)
![Bark](/public/assets/images/Main.png)








