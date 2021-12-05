#!/usr/bin/env python

"""
 * Fill up User db
"""

import sys
import getopt
import http.client
import urllib
import json
from random import randint
from random import choice
from datetime import date
from time import mktime

def usage():
    print('dbFill.py -u <baseurl> -p <port> -n <numUsers> -t <numTasks>')

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/user?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in range(len(d['data']))]

    return users


def fillUser(conn, headers):
    """
    Fill up user databse
    @param - conn - connection to databse
    @param - headers
    @return - userID - list of user id
    """
    userID = []

    with open('userData.json','r') as user_file:
        user_data = user_file.read()
    user_obj = json.loads(user_data)

    # init User data
    for i in range(len(user_obj)):

        # Pick a random first name and last name
        params = urllib.parse.urlencode({'name': user_obj[i]['name'], 'password':user_obj[i]['password'] })

        # POST the user
        conn.request("POST", "/api/user", params, headers)
        response = conn.getresponse()
        data = response.read()
        
        d = json.loads(data)
        userID.append(str(d['data']['_id']))
    return userID

def fillPost(conn, headers, userID):
    """
    fill post databse
    @param - conn - connection to databse
    @param - headers
    @params - userID - list of user id
    """
    with open('postData.json','r') as post_file:
        post_data = post_file.read()
    post_obj = json.loads(post_data)

    post_count = len(post_obj)
    user_count = len(userID)
    post_each_user = post_count // user_count
    # init User data
    for i in range(len(post_obj)):
        user_idx = i // post_each_user
        if user_idx >= user_count: user_idx = user_count - 1
        # fill up with data in the json file
        params = urllib.parse.urlencode({'content': post_obj[i]['content'], 'userId':userID[user_idx]})

        # POST the post
        conn.request("POST", "/api/post", params, headers)
        response = conn.getresponse()
        data = response.read()
        
        d = json.loads(data)

def fillEvent(conn, headers, userID):
    """
    fill event databse
    @param - conn - connection to databse
    @param - headers
    @params - userID - list of user id
    """
    with open('eventData.json','r') as event_file:
        event_data = event_file.read()
    event_obj = json.loads(event_data)

    event_count = len(event_obj)
    user_count = len(userID)
    event_each_user = event_count // user_count
    if event_each_user <= 0: event_each_user = 1
    print(event_count,user_count )
    # init User data
    for i in range(len(event_obj)):
        user_idx = i // event_each_user
        if user_idx >= user_count: user_idx = user_count - 1
        # fill up with data in the json file
        params = urllib.parse.urlencode({'name': event_obj[i]['name'], 
                                         'creator':userID[user_idx],
                                        'time': event_obj[i]['time'],
                                        'lat':event_obj[i]['lat'],
                                        'lng': event_obj[i]['lng']}
                                        )

        # Post the event
        conn.request("POST", "/api/event", params, headers)
        response = conn.getresponse()
        data = response.read()
        
        d = json.loads(data)





def main(argv):

    # Server Base URL and port
    baseurl = "localhost"
    port = 4000

    try:
        opts, args = getopt.getopt(argv,"hu:p:n:t:",["url=","port=","users=","tasks="])
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
        elif opt in ("-n", "--users"):
             userCount = int(arg)
        elif opt in ("-t", "--tasks"):
             taskCount = int(arg)

    
    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)

    # HTTP Headers
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
    userID = getUsers(conn)
    # userID = fillUser(conn, headers)
    # fillPost(conn, headers, userID)
    fillEvent(conn, headers, userID)

    # Exit gracefully
    conn.close()
    print(str(17)+" users added at "+baseurl+":"+str(port))


if __name__ == "__main__":
     main(sys.argv[1:])
