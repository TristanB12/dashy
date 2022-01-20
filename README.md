# <img src="/front/src/assets/logo.png" alt="Éditer sur GitLab" width="30x"/> Dashy

  url: https://dashyepitech.herokuapp.com

# Authors
- [tristan.bourgeois@epitech.eu](tristan.bourgeois@epitech.eu)
- [dorian.beasse@epitech.eu](dorian.beasse@epitech.eu)

# Compilation

## Compilation with Docker
First, make sure to have Docker and docker-compose installed.
Then launch these commands in a terminal at the root:

  - `sudo docker-compose build`
  - `sudo docker-compose up -d`

When the compilation ends, go at http://localhost:8080 to see the app.

The API base url is http://localhost:8080/api.

## Compilation with npm (API and front are separated)

Open a terminal at the root and launch:

  - `cd front/`
  - `npm install && npm run build`
  - `cd ../back/`
  - `npm install && npm run start`

When the compilation ends, go at http://localhost:8080 to see the app.

## Compile vue.js components documentation

Open a terminal and run:
  - `cd front/`
  - `sudo yarn global add @vuese/cli`
  - `vuese serve --open`
  

# User API
## Description
The User API enable developer to get informations about a user of Dashy.

Get User API postman documentation [here](https://documenter.getpostman.com/view/13326496/UVJfjb6z#59a14633-2957-4b5a-8487-8616372b2864).
## Routes
| Action               | Method | Route                       |
|----------------------|--------|-----------------------------|
| Get user infos       | `GET` | `/api/user`                 |


# Auth API
## Description
The Auth API enable developer to login or signup a user for Dashy.

Get Auth API postman documentation [here](https://documenter.getpostman.com/view/13326496/UVJfjb6z#7bfebfe7-5d8d-49f5-a16a-60a1efcabba1).
## Routes
| Action               | Method | Route                       |
|----------------------|--------|-----------------------------|
| Signup with email    | `POST` | `/api/auth/signup`          |
| Signup with facebook | `POST` | `/api/auth/signup/facebook` |
| Signup with github   | `POST` | `/api/auth/signup/github`   |
| Login with email     | `POST` | `/api/auth/login`           |
| Login with facebook  | `POST` | `/api/auth/login/facebook`  |
| Login with github    | `POST` | `/api/auth/login/github`    |

# Services API
## Description
The Service API enable developer to interacts with his services in Dashy.

Get Services API postman documentation [here](https://documenter.getpostman.com/view/13326496/UVJfjb6z#9f7a31a9-3a9e-4154-8922-d3031b578dd5).

## Routes variables
| Parameters                        |Type     | Descrition                              |
|-----------------------------------|---------|-----------------------------------------|
| {service}                         | String  | Must be `twitch`, `spotify` or `github` |
| {widget_code}                     | String  | Must be a available code widget: `STA` spotify top artist, `STT` spotify top tracks, `TOC` twitch online channels, `TUP` twith user profile, `GUP` github user profile, `FWP` fbi wanted people |

## Routes
| Action                            | Method | Route                                |
|-----------------------------------|--------|--------------------------------------|
| Link service account              | `POST` | `/api/services/{service}/link `      |
| Get widget content                | `POST` | `/api/services/widget/{widget_code}` |
| Get available widget of a service | `GET`  | `/api/services/{service}/widgets `   |

# Widgets API
## Description
The Widgets API enable developer to interacts with widgets on Dashy.

Get Widget API postman documentation [here](https://documenter.getpostman.com/view/13326496/UVJfjb6z#c3cc020b-79ef-42ad-9dfe-80724eef8487).
## Routes
| Action                       | Method | Route                       |
|------------------------------|--------|-----------------------------|
| Get widgets configuration    | `GET`  | `/api/widgets`               |
| Create widget                | `POST` | `/api/widgets`               |
| Delete widget                | `DEL`  | `/api/widgets`               |
| Update widget                | `PATCH`| `/api/widgets`               |

# List of services and their widgets
## Spotify
- **Top artists**: Lets see your top artists
- **Top tracks**: Lets see your top tracks
## Twitch
- **Online channels**: Use this widget to display the online channels you follow
- **User profile**: Use this widget to display a user profile
## Github
-**User prolile**: Use this widget to display your user profile
## FBI
-**FBI wanted people**: Use this widget to display wanted people by the FBI and get all details

