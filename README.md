# virtuoso-auth

> Simple user/pass auth service with JWT for the [Virtuoso platform](https://github.com/Samwisebuze/senior-design) (WIP).

Based on [cornflourblue/node-mongo-registration-login-api](https://github.com/cornflourblue/node-mongo-registration-login-api)

## Getting Started

```sh
$ yarn install
$ cp .env.example .env
# specify a JWT secret as JWT_SECRET in the .env file
# start mongodb service and specify MONGODB_URI in .env file
$ yarn start-dev
```

## With Docker

Run with the environment variables (this example binds on port 4000 on the host machine for easy access):

```sh
$ docker build -t virtuoso-auth .
$ docker run --rm -it \
    -e "MONGODB_URI=mongodb://<username>:<password>@d<host>:37817/virtuoso-test" \
    -e "JWT_SECRET=foobar" \
    -p 4000:4000 \
    virtuoso-auth
```

## Quick API Documentation

### `POST /register`

Example request:

```sh
$ curl --request POST \
  --url http://localhost:4000/api/v1/register \
  --header 'content-type: application/json' \
  --data '{
	"username": "foo",
	"password": "bar"
}
'
```

### `POST /authenticate`

Example request:

```sh
$ curl --request POST \
  --url http://localhost:4000/api/v1/authenticate \
  --header 'content-type: application/json' \
  --data '{
	"username": "foo",
	"password": "bar"
}
'
```

Example response:

```json
{
  "_id": "5e755e343cc84882966cee09",
  "username": "foo",
  "createdAt": "2020-03-21T00:22:12.523Z",
  "__v": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTc1NWUzNDNjYzg0ODgyOTY2Y2VlMDkiLCJpYXQiOjE1ODQ3NTAzNzJ9.vyjfLd-RwPRQYN7LtEWGWyGb6KcEFGfilbNic-X6Gvk"
}
```

### `GET /api/v1/current`

Retrives information about the current user.

Example request:

```sh
$ curl --request GET \
  --url http://localhost:4000/api/v1/current \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTc1NWUzNDNjYzg0ODgyOTY2Y2VlMDkiLCJpYXQiOjE1ODQ3NTAzNzJ9.vyjfLd-RwPRQYN7LtEWGWyGb6KcEFGfilbNic-X6Gvk'
```

Example response:

```json
{
  "username": "foo",
  "createdAt": "2020-03-21T00:22:12.523Z",
  "__v": 0,
  "id": "5e755e343cc84882966cee09"
}
```

## License

[MIT](LICENSE)
