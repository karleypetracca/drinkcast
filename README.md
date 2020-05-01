---
noteId: "79548ee08b0a11eaa02e9d9266c24b2e"
tags: []

---

# drinkcast Client

## Summary

Invite your friends and enjoy a happy hour with video chat and games to play!

The demo for this app is located at [drinkcast.live](https://www.drinkcast.live)

The repo for the API can be viewed on [GitHub](https://github.com/karleypetracca/drinkcast-api) or as a demo site at [api.drinkcast.live](https://api.drinkcast.live)


## Features

The drinkcast project uses Node.js, Express and PostgreSQL on the backend and
React for the frontend. The core video connecton functionality is run with the
use of the OpenTok API to create unique session IDs, or in our case 'bars', thats
are available for others to join via the bar's name and password set by a user.
Upon a successful log in, the user is granted a token that is used to join the
session. Once a user has created a bar and invites friends to join, the app
allows friends to play games and hang out through video chat in their own
private 'bar'!

Additional features include:
- 2 embedded games in each bar: 'Would you rather' and 'Never have I ever'
- Randomizer option for the bar name
- Automatic CRON-like database cleaning to remove rooms that have not been used
  in the last 24 hours


## Tools used

- [React](https://reactjs.org/)
- [OpenTok React](https://tokbox.com/developer/guides/basics/)
- [Random Word API](https://random-word-api.herokuapp.com/home)
- [Uomo Font](https://www.freefonts.io/uomo-font-family/)
- [Favicon](https://favicon.io/)
- [Animated Burger Icon](https://march08.github.io/animated-burgers/)
- [React Select Input](https://react-select.com/home)
- [Background Image](https://pixabay.com/photos/floor-wood-hardwood-floors-1256804/)


## Screenshots

<img src="https://i.postimg.cc/VvrvZdqB/index-Desktop.png" width="300px">
<img src="https://i.postimg.cc/63LVYSST/index-Mobile.png" width="200px">
<img src="https://i.postimg.cc/nztYKZ36/create-Bar-Mobile.png" width="200px">
<img src="https://i.postimg.cc/kGTQdS7m/create-Bar-Desktop.png" width="300px">

## Installation

### Clone

- Clone this repo to your local machine

### Setup

- Install npm packages

```
$ npm i
```

- Run program

```
$ npm start
```


## Authors

- Lockett Pundt - [GitHub](https://github.com/LockettPundt)
- Joshua Bevers - [GitHub](https://github.com/JoshuaBevers)
- Zach Barbre - [GitHub](https://github.com/ZachBarbre)
- Karley Petracca - [GitHub](https://github.com/karleypetracca)