# Nest-Bank-API

Rest API for a mock bank service

Interview test from: https://github.com/4cadia-foundation/dev-test

## Tech stack:

- Backend: NestJs

- Database: Postgres (I chose SQL DB as we have a very structured data, and as we would be performing aggregations on transactions quite it would be a faster choice for this kind of operation)

- Authentication: Passport using (email and password for login and JWT for access to protected routes)

- Container: Docker-compose

## DB Architecture:

The first choice in designing this archtecture was to separate the `User` from the `Account`. I designed the database in a way that if in the future I want to extend the application so the user can have multiple accounts, that's already possible. We would only have to create an endpoint for registering new accounts under for the user.

## How to run:

- Start services: `docker-compose up -d`
- Rename `.example.env` to `.env`
- Install dependencies: `npm install`
- Migrate DB: `npx prisma migrate dev`
- Start backend: `npm start`
- Register user at `api/users/register`
- Login `api/auth/login`
- Use token from Login to access:
  - Retrieve your account Id `api/users/profile`
  - POST `api/accounts/transaction` (Add transactions to your account)
  - Balance: `api/accounts/balance` (all accounts) or `api/accounts/:id/balance`
  - Statement: `api/accounts/:id/statement`

<br/>

## API Documentation (Swagger):

- `/api/docs`

<br/>

## Tests

Due to time constrains, only a few tests were implemented.
`npm test`

<br/>

## DB Tools

You can use pgadmin or `npx prisma studio` to check the database.

<br/>

## Improvements to be implemented in the future:

- Cache: Redis (When calculating the balance for the account, if we consider thousands of records in transactions, a cache implementation for `Balance` would speed up responses.)
- Paginated responses for transactions
