#!/usr/bin/env python

"""
 * @file dbClean.py
 * Used in CS498RK MP4 to empty database of all users and posts.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
 * @date Modified: Spring 2019
"""

import sys
import getopt
import http.client
import urllib
import json

def usage():
    print('dbClean.py -u <baseurl> -p <port>')

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/user?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return users

def getPost(conn):
    # Retrieve the list of posts
    conn.request("GET","""/api/post?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    posts = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return posts

def getEvent(conn):
    # Retrieve the list of posts
    conn.request("GET","""/api/event?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    events = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return events

def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 4000

    try:
        opts, args = getopt.getopt(argv,"hu:p:",["url=","port="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)

    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)

    # Fetch a list of users
    users = getUsers(conn)

    # Loop for as long as the database still returns users
    while len(users):

        # Delete each individual user
        for user in users:
            conn.request("DELETE","/api/user/"+user)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of users
        users = getUsers(conn)

    # Fetch a list of posts
    posts = getPost(conn)

    # Loop for as long as the database still returns posts
    while len(posts):

        # Delete each individual post
        for post in posts:
            conn.request("DELETE","/api/post/"+post)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of posts
        posts = getPost(conn)

    # Fetch a list of events
    events = getEvent(conn)
    # Loop for as long as the database still returns events
    while len(events):

        # Delete each individual post
        for event in events:
            conn.request("DELETE","/api/event/"+event)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of posts
        events = getEvent(conn)

    # Exit gracefully
    conn.close()
    print("All users and posts removed at "+baseurl+":"+str(port))


if __name__ == "__main__":
     main(sys.argv[1:])
