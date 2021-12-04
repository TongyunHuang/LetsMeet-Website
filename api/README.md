# LetsMeet Backend

## Table of Contents


## Description

**The Goal** : Implement Rest api for LetsMeet which allows users to interact with Event (creat, join, unjoin, display by categories) and Post (post, display)

## Task

 Implement an API with Node, Express and Mongoose

| Endpoints | Actions | Intended Outcome                                      |
|---------- |---------|-------------------------------------------------------|
| users     | GET     | Respond with a List of users                          |
|           | POST    | Create a new user. Respond with details of new user   |
| users/:id | GET     | Respond with details of specified user or 404 error   |
|           | PUT     | Replace entire user with supplied user or 404 error   |
|           | DELETE  | Delete specified user or 404 error                    |
| events    | GET     | Respond with a List of events                         |
|           | POST    | Create a new event. Respond with details of new event |
| events/:id| GET     | Respond with details of specified event or 404 error  |
|           | PUT     | Replace entire event with supplied event or 404 error |
|           | DELETE  | Delete specified event or 404 error                   |
| posts     | GET     | Respond with a List of posts                          |
|           | POST    | Create a new post. Respond with details of new post   |
| posts/:id | GET     | Respond with details of specified post or 404 error   |
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