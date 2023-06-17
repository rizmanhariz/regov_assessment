# Q1
To spin up server:
1. replace `.env` file with appropriate values
2. Open a terminal and navigate to Q1
```
docker build . -t Q1Server
docker run -p 49160:8080 -d <your username>/node-web-app
```
3. Refer to `Q1/regovTest.postman_collection` for API documentation
4. Send POST /auth/login request to get cookie. This cookie should be used in every request
5. Only users with `isAdmin` = `true` can access `admin` & `report` endpoints

# Q2
1. stack implementation in `stack.py`.
2. hash table implementation in `hash.py`