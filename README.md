# Studybuddy
> Final project for web technologies course

## Getting started

### Prerequisites

To run this project you need to have installed [Node.js](https://nodejs.org/en/). 

Next, to install all dependencies run:

```bash
npm install
```

After installing the dependencies, setup your env file following the example in `.env.example` file.

Then create a Postgres database and run the migrations:

```bash
npm run db:migrate
```

### Running

#### Development

To run the project in development mode run:

```bash
npm run dev
```
#### Production

To run the project in production mode run:

```bash
docker compose up -d
```

Then, manually apply the migrtions by running the `migrate.ts` script:

```bash
npm run db:migrate

# or

npx tsx [...]/src/database/migrate.ts # make sure to have the correct env while running this command
```