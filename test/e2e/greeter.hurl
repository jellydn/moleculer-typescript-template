# Get hello message
GET http://localhost:{{PORT}}/api/greeter/hello

HTTP 200

# Get welcome message
GET http://localhost:{{PORT}}/api/greeter/welcome
[QueryStringParams]
username: itman

HTTP 422
[Asserts]
jsonpath "$.message" == "Parameters validation error!"

GET http://localhost:{{PORT}}/api/greeter/welcome
[QueryStringParams]
username: dunghd

HTTP 200
