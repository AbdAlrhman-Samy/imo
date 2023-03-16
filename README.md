# "imo" - In My Opinion Blog

A blog web application built with Express.js, SQLite, and Nunjucks.

## Description

"imo" is a web application that allows users to create and share their opinions on various topics. Only registered admins can create, edit, and delete posts. All users can view posts and comment on them.

> README is still a WIP.

## Features

- #### Role based authentication: 
  - Admins can 
    - create, edit, and delete posts. 
    - delete comments and 
    - assign admin privileges to other users.
  
  - Users can 
    - view posts and comment on them.

- #### Commenting system: All users can comment on posts and interact with other users.
- #### Responsive design: The web application is optimized for various screen sizes.

## Installation

1. Clone the repository: 
   
   `git clone https://github.com/abdalrhman-samy/imo.git`
2. Install dependencies:
   
   `npm install`
3. Start the server:
   
   `npm start`
4. Access the application at 
   
   `http://localhost:3000`

## Dependencies

- **Express.js**: Web application framework
- **SQLite**: Relational database management system
- **Nunjucks**: Templating engine for generating HTML pages

## Usage

1. Log in with admin credentials.
2. Create a new post or view existing ones.
3. Interact with other users by commenting on their posts.

Please note that this application is for educational purposes only and should not be used in production.

## TODO
- [x] Create database schema and models
- [x] Get nunjucks to work with express
- [x] use static files
- [x] Add user authentication
- [ ] Make a good looking, responsive UI
  - [x] Homepage
  - [ ] Post page
  - [x] Login page
  - [x] Signup page
  - [ ] User page
  - [ ] Admin page
- [ ] Deploy to Render/Cyclic/Fly.io