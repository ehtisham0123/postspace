

 export const UserAuth = {
    "paths":{"/user/auth/login": {
        "put": {
            "tags": [
                "User-Auth"
            ],
            "description": "login user in system",
            "parameters": [
                {
                    "name": "user Credential",
                    "in": "body",
                    "required": true,
                    "description": "User that we want to login",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            ],
            "produces": [
                "application/json"
            ],
            "responses": {
                "200": {
                    "description": "User is login",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            }
        }
    },
    "/user/auth/refreshToken": 
    {
        "post": {
            "tags": [
                "User-Auth"
            ],
            "description": "refresh token",
            "produces": [
                "application/json"
            ],
            "responses": {
                "200": {
                    "accessToken": "string",
                    "refreshToken": "string",
                }
            }
        }
    },},
    "definitions":{
        "User": {
            "required": [
              "userName",
              "password",
            ],
            "properties": {
                "userName": {
                    "type": "string",
                    "description": "User name",
                    "example": "reiuser"
                },
                "password": {
                    "type": "string",
                    "description": "User password",
                    "example": "Pakistan12@"
                }
            }
          },
    }
}