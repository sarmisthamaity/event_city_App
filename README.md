## event_city_App 

### Create a nodejs application which contains 2 models -> 
#### User model with user details like name, email, phone number, role(should be either admin or user).
##### Event model with event name, description, start date , end date, city.

### App summary - 

- User should be able to sign up and login with email. Use JWT token for authentication. Post that user  can create events. Api calls needed.

- Sign up api, Login api (Without auth token) 
- Create event, update event and delete event. (With auth token, only user who created the event can    update or delete) 
- Search events based on name and city. It should have sort also. ex - sort_by="name", sort_type="asc/   desc" (Without auth token, user can view all events)  
- Fetch all users (only admin should be able to do this)(With auth token) 
- Fetch all users and corresponding events (only admin)(With auth token) 
- Fetch all events by the user (With auth token) 

### For creating server I used here express
### for running server run this command - http://localhost:portnumber / npm start
### for api testing used mocha and chai,
### for test the api run this - npm test

## In this project I have used:
### signup

-  For signup user will enter name, email, password, phonenumber, and user role (user/ admin)
-  Joi validation for validate the user data
-  Bcrypt module for  the phashing the password

### login 

- For login also used Joi for validate the data
- in login it will create token , for creating token used Jwt sign method

### user will create event 


### for install the depencies

- run the command in terminal 

- express- npm i express    (i stands for install)
- joi - npm i joi 
- bcrypt - npm i bcrypt
- jwt - npm i jsonwebtoken
- mocha & chai - npm i mocha chai 