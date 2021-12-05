# LetsMeet Backend

## Table of Contents
1. [Description](#description)
2. [Task](#task)
3. [Schema Design](#schema-design)
4. [Getting Start](#getting-started)

## Description

**The Goal** : Implement Rest api for LetsMeet which allows users to interact with Event (creat, join, unjoin, display by categories) and Post (post, display)

## Task

 Implement an API with Node, Express and Mongoose

| Endpoints | Actions | Intended Outcome                                      |
|---------- |---------|-------------------------------------------------------|
| user      | GET     | Respond with a List of users                          |
|           | POST    | Create a new user. Respond with details of new user   |
| user/:id  | GET     | Respond with details of specified user or 404 error   |
|           | PUT     | Replace entire user with supplied user or 404 error   |
|           | DELETE  | Delete specified user or 404 error                    |
| event     | GET     | Respond with a List of events                         |
|           | POST    | Create a new event. Respond with details of new event |
| event/:id | GET     | Respond with details of specified event or 404 error  |
|           | PUT     | Replace entire event with supplied event or 404 error |
|           | DELETE  | Delete specified event or 404 error                   |
| post      | GET     | Respond with a List of posts                          |
|           | POST    | Create a new post. Respond with details of new post   |
| post/:id  | GET     | Respond with details of specified post or 404 error   |
|           | PUT     | Replace entire post with supplied post or 404 error   |
|           | DELETE  | Delete specified post or 404 error                    |

**Query Parameter**

| Parameter | Description                                                                                 |
|----------|----------------------------------------------------------------------------------------------|
| where    | filter results based on JSON query                                                           |
| sort     | specify the order in which to sort each specified field  (1- ascending; -1 - descending)     |
| select   | specify the set of fields to include or exclude in each document  (1 - include; 0 - exclude) |
| limit    | specify the number of results to return                                                      |
| count    | if true, return the count of documents that match (instead of the documents)                 |

**Query Example - Dec 3**

Local api for now, host this later

| Query                                                                                | Description                                             |
|-----------------------------------------------------------------------------------------|---------------------------------------------------------|
| `http://localhost:4000/api/event`                          | Returns full list of  events                       |
| `http://localhost:4000/api/user`                          | Returns full list of users                       |
| `http://localhost:4000/api/post`                          | Returns full list of  posts                       |
| `http://localhost:4000/api/user?where={"_id": "55099652e5993a350458b7b7"}`         | Returns a list with a single user with the specified ID ('_id' will be different) |
| `http://localhost:4000/api/event?where={"completed":1 }`                          | Returns a list of completed events                     |
| `http://localhost:4000/api/post?where={"user_id": {"$in": ["59f930d6b1596b0cb3e82953","5a1b6d7bd72ba9106fe9239c"]}}` | Returns a set of posts by certain users                                 |
| `http://localhost:4000/api/user?sort={"name": 1}`                                  | Returns a list of users sorted by name                  |
| `http://localhost:4000/api/user?select={"_id": 0}`                                  | Returns a list of users without the _id field           |
| `http://localhost:4000/api/post?limit=20`                                   | Returns posts number from 61 to 80                            |

## Schema Design:

Here is the Users Schema:

1. "name" - String     `Required`
2. "password" - String    `Required`
3. "joinedEvent" - [String] - The id fields of the events that the user joined
4. "attendedEvent" - [String] - The id fields of the events that the user actually showed up


Here is the Events Schema:

1. "name" - String `Required`
2. "time" - Date `Required`
3. "creator" - String `Required`
4. "lat" - Double `Required`
5. "lng" - Double `Required`
6. "joinUser" - [String] - The id fields of the users join this event
7. "showupUser" - [String] - The id fields of the users actually showed up



Here is the Tasks Schema:
1. "content" - String  `Required`
2. "userId" - String - id of user who post the post `Required`
3. "likeCount" - Interger - number of likes this post get

## Getting Started
1. Clone the repository
2. Install dependencies:
`npm install`
3. Start the dev server:
`npm start`