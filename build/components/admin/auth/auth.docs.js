"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuth = void 0;
exports.AdminAuth = {
    "paths": { "/admin/auth/login": {
            "put": {
                "tags": [
                    "Admin-Auth"
                ],
                "description": "login user in system",
                "parameters": [
                    {
                        "name": "user Credential",
                        "in": "body",
                        "required": true,
                        "description": "User that we want to login",
                        "schema": {
                            "$ref": "#/definitions/Admin"
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
                            "$ref": "#/definitions/Admin"
                        }
                    }
                }
            }
        },
        "/admin/auth/refreshToken": {
            "post": {
                "tags": [
                    "Admin-Auth"
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
        }, },
    "definitions": {
        "Admin": {
            "required": [
                "userName",
                "password",
            ],
            "properties": {
                "userName": {
                    "type": "string",
                    "description": "User name",
                    "example": "reiadmin"
                },
                "password": {
                    "type": "string",
                    "description": "User password",
                    "example": "Pakistan12@"
                }
            }
        },
    }
};
