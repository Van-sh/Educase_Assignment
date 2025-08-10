# Educase Assignment

The Assignment was to implement a set of APIs using Node.js, Express.js framework and MySQL to manage school data. The system allows users to add new schools and retrieve a list of schools sorted by proximity to a user specified location.

## Contents

- [Database Setup](#database-setup)
- [API Development](#api-development)
- [Hosting](#hosting)
- [Installation and How to run locally](#installation-and-how-to-run-locally)

## Database Setup

A MySQL server was setup with the following schema:

```sql
CREATE TABLE `schools` (
   `id` serial AUTO_INCREMENT NOT NULL,
   `name` varchar(100) NOT NULL,
   `address` varchar(255) NOT NULL,
   `latitude` float NOT NULL,
   `longitude` float NOT NULL,
   CONSTRAINT `schools_id` PRIMARY KEY(`id`),
   CONSTRAINT `schools_name_unique` UNIQUE(`name`),
   CONSTRAINT `schools_address_unique` UNIQUE(`address`),
   CONSTRAINT `latitude_range` CHECK(-90 <= `schools`.`latitude` and `schools`.`latitude` <= 90),
   CONSTRAINT `longitude_range` CHECK(-180 <= `schools`.`longitude` and `schools`.`longitude` <= 180)
);
```

## API Development

Endpoints:

- Add School

   Method: `POST`

   Payload:

   ```json
   {
      "name": string,
      "address": string,
      "latitude": number,
      "longitude": number
   }
   ```

   The payload is validated and added to the database

- List Schools

   Method: `GET`

   Query:

   ```json
   {
      "latitude": number,
      "longitude": number
   }
   ```

   The query values are validated. Then Schools from the database are sorted based on distance from the provided location and the first 10 from the sorted list are returned

## Hosting

The [API](https://educase-assignment-n6ye.onrender.com/listSchools?latitude=33&longitude=-118) is deployed on [render.com](https://render.com/)

However, since I am using the free tier of their services, the service needs about 5 minutes as an initial startup time when using

## Installation and How to run locally

1. Clone the repo and Navigate to the project directory

   ```bash
   git clone https://github.com/Van-sh/Educase_Assignment.git
   cd Educase_Assignmnet
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables: Copy the example file to create your own env file

   ```bash
   cp .env.example .env
   ```

   You will need the connection string to a [TiDB cloud storage](https://www.pingcap.com/tidb-cloud-serverless/)

4. Push the database migrations to the database

   ```bash
   pnpm db:migrate
   ```

5. Run the development server

   ```bash
   pnpm dev
   ```
