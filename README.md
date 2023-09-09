# 1. Code-First

## To Run

- Have `yarn`, `git` and `node` installed locally
- Clone the repo
- Checkout to branch `feature/code-first`
- Install Postgres [here](https://formulae.brew.sh/formula/postgresql@14)
- Start Postgres locally. for Mac users run `brew services start postgresql@14`
- Create an env file at the root of project and add your db url in the format `DATABASE_URL=postgresql://username:password@localhost:5432/mydb`
- Run `yarn run push:db` to push the schema to db
- Run `yarn run migrate:dev` to create new migration
- Run `npx prisma generate` to generate the Prisma client based off the Model definitions

## To Test

- Run `yarn start` to start the server
- To Test the /POST /users/new endpoint run

  ```
  curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName":"Doe",
  "username":"mysupercoolalias",
  "email": "john@example.com",
  "password": "mysecurepassword"
  }' http://localhost:3000/users/new
  ```

- To Test the /PUT /users/edit/:id endpoint run

  ```
  curl -X PUT -H "Content-Type: application/json" -d '{
  "firstName": "Joe",
  "lastName":"Blight",
  "username":"myothersupercoolalias"
  }' http://localhost:3000/users/edit/1
  ```

- To Test the /GET /users?email='youremail' endpoint run
  ```
  curl -X GET "http://localhost:3000/users?email=john@example.com"
  ```
