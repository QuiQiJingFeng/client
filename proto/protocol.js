module.exports = require("protobufjs").newBuilder({})['import']({
    "package": null,
    "syntax": "proto2",
    "messages": [
        {
            "name": "C2GS",
            "syntax": "proto2",
            "fields": [
                {
                    "rule": "optional",
                    "type": "msg.login.Login",
                    "name": "login",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "msg.login.Logout",
                    "name": "logout",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "msg.user.CreateName",
                    "name": "create_name",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "msg.user.QueryBaseInfo",
                    "name": "query_base_info",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "msg.payment.QueryProducts",
                    "name": "query_products",
                    "id": 7
                }
            ]
        },
        {
            "name": "GS2C",
            "syntax": "proto2",
            "fields": [
                {
                    "rule": "optional",
                    "type": "msg.login.LoginRet",
                    "name": "login_ret",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "msg.login.LogoutRet",
                    "name": "logout_ret",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "msg.user.CreateNameRet",
                    "name": "create_name_ret",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "msg.user.QueryBaseInfoRet",
                    "name": "query_base_info_ret",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "msg.payment.QueryProductsRet",
                    "name": "query_products_ret",
                    "id": 7
                }
            ]
        },
        {
            "name": "msg",
            "fields": [],
            "syntax": "proto2",
            "messages": [
                {
                    "name": "login",
                    "fields": [],
                    "syntax": "proto2",
                    "messages": [
                        {
                            "name": "Login",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "account",
                                    "id": 1
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "password",
                                    "id": 2
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "version",
                                    "id": 3
                                },
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "server_id",
                                    "id": 4
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "locale",
                                    "id": 5
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "platform",
                                    "id": 6
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "logintype",
                                    "id": 7
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "device_type",
                                    "id": 8
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "net_mode",
                                    "id": 9
                                }
                            ]
                        },
                        {
                            "name": "LoginRet",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "Result",
                                    "name": "result",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "type": "uint32",
                                    "name": "server_time",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "type": "string",
                                    "name": "user_id",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "type": "int32",
                                    "name": "time_zone",
                                    "id": 4
                                }
                            ]
                        },
                        {
                            "name": "Logout",
                            "syntax": "proto2",
                            "fields": []
                        },
                        {
                            "name": "LogoutRet",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "Result",
                                    "name": "reason",
                                    "id": 1
                                }
                            ]
                        }
                    ],
                    "enums": [
                        {
                            "name": "Result",
                            "syntax": "proto2",
                            "values": [
                                {
                                    "name": "success",
                                    "id": 0
                                },
                                {
                                    "name": "auth_failure",
                                    "id": 1
                                },
                                {
                                    "name": "invalid_pwd",
                                    "id": 2
                                },
                                {
                                    "name": "account_not_exist",
                                    "id": 3
                                },
                                {
                                    "name": "error_pwd",
                                    "id": 4
                                },
                                {
                                    "name": "version_too_low",
                                    "id": 5
                                },
                                {
                                    "name": "server_is_busy",
                                    "id": 6
                                },
                                {
                                    "name": "repeated_login",
                                    "id": 7
                                },
                                {
                                    "name": "create_role",
                                    "id": 8
                                }
                            ]
                        }
                    ],
                    "isNamespace": true
                },
                {
                    "name": "user",
                    "fields": [],
                    "syntax": "proto2",
                    "messages": [
                        {
                            "name": "CreateName",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "user_name",
                                    "id": 1
                                },
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "role_id",
                                    "id": 2
                                }
                            ]
                        },
                        {
                            "name": "CreateNameRet",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "Result",
                                    "name": "result",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "QueryBaseInfo",
                            "syntax": "proto2",
                            "fields": []
                        },
                        {
                            "name": "QueryBaseInfoRet",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "Result",
                                    "name": "result",
                                    "id": 1
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "user_name",
                                    "id": 2
                                },
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "role_id",
                                    "id": 3
                                },
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "card_num",
                                    "id": 4
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "user_id",
                                    "id": 5
                                }
                            ]
                        }
                    ],
                    "enums": [
                        {
                            "name": "Result",
                            "syntax": "proto2",
                            "values": [
                                {
                                    "name": "success",
                                    "id": 0
                                },
                                {
                                    "name": "failure",
                                    "id": 1
                                },
                                {
                                    "name": "has_emoji",
                                    "id": 2
                                },
                                {
                                    "name": "max_num_char",
                                    "id": 3
                                }
                            ]
                        }
                    ],
                    "isNamespace": true
                },
                {
                    "name": "payment",
                    "fields": [],
                    "syntax": "proto2",
                    "messages": [
                        {
                            "name": "GoodItem",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "good_id",
                                    "id": 1
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "product_id",
                                    "id": 2
                                },
                                {
                                    "rule": "required",
                                    "type": "string",
                                    "name": "name",
                                    "id": 3
                                },
                                {
                                    "rule": "required",
                                    "type": "double",
                                    "name": "price",
                                    "id": 4
                                },
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "num",
                                    "id": 5
                                },
                                {
                                    "rule": "optional",
                                    "type": "int32",
                                    "name": "first_pay_gift",
                                    "id": 6
                                },
                                {
                                    "rule": "optional",
                                    "type": "int32",
                                    "name": "gift",
                                    "id": 7
                                }
                            ]
                        },
                        {
                            "name": "QueryProducts",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "int32",
                                    "name": "type",
                                    "id": 1
                                }
                            ]
                        },
                        {
                            "name": "QueryProductsRet",
                            "syntax": "proto2",
                            "fields": [
                                {
                                    "rule": "required",
                                    "type": "Result",
                                    "name": "result",
                                    "id": 1
                                },
                                {
                                    "rule": "repeated",
                                    "type": "GoodItem",
                                    "name": "good_list",
                                    "id": 2
                                }
                            ]
                        }
                    ],
                    "enums": [
                        {
                            "name": "Result",
                            "syntax": "proto2",
                            "values": [
                                {
                                    "name": "success",
                                    "id": 0
                                },
                                {
                                    "name": "failure",
                                    "id": 1
                                },
                                {
                                    "name": "ptype_is_nil",
                                    "id": 2
                                }
                            ]
                        }
                    ],
                    "isNamespace": true
                }
            ],
            "isNamespace": true
        }
    ],
    "isNamespace": true
}).build();