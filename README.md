## Gun Storage App Backend
NodeJS &amp; MongoDB backend app, setup for JWT authentication and gun and ammo storage and tracking. Intended to be the API for a frontend website or mobile app.

### Intentions
I decided to build this project to better understand what it means to build out authentication services from scratch (as opposed to using a library such as [PassportJS](https://github.com/jaredhanson/passport)). I have absolutely nothing against using a pre-built library, but I wanted to gain experience with [argon2](https://github.com/P-H-C/phc-winner-argon2) hashing and [JWT](https://jwt.io) authentication at a core level.

### Setup
- Requires `SECRET_KEY` and `DB_CONNECTION_STRING` environment variables to be set (it's setup for `.env` files using the [dotenv](https://github.com/motdotla/dotenv) package)
- Install dependencies: `yarn install`/`npm install`
- Run `yarn dev`/`npm run dev` to update on changes or just `yarn start`/`npm start` to start normally
