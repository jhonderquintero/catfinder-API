# catfinder-API
https://documenter.getpostman.com/view/13313612/Tz5jefSE (API DOCUMENTATION)

## Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This project is a SPA (SINGLE PAGE APPLICATION) developed in React.js library.  
This page applied good practices in design, such as responsive, first mobile and Material design.  

## Technologies

Project is created with:

* MERN STACK (BACKEND)
* MongoDB w mongoose
* Node.js w Typescript
* Express 
* Encryption with bcrypt
* Layer of security with JSON-WEB-TOKEN
* Validations with express-validator and mongoose-unique-validator.

## Setup

To run this project, first install it locally using npm:

```git
$npm clone https://github.com/jhonderquintero/heroes-app.git
$npm install
```

create your database with the same, first compile ts to js:

```git
$npm run build // This create a file "dist" with all the code compile in js
$npm run create-db //This command full with cats data your database (before initializated with mongo)
$npm run start // Create your server
```

If you want to deploy this web in a host, just change variables with extension .env with your domain.
