var files = [
    {
        "name": "/",
        "node_id": 0
    },
    {
        "name": "bin",
        "node_id": 1
    },
    {
        "name": "home",
        "node_id": 2
    },
    {
        "name": "Link",
        "node_id": 3
    },
    {
        "name": "myfile1",
        "node_id": 4
    },
    {
        "name": "myfile2",
        "node_id": 5
    }
];
var nodes = [
    {"block": 0, "type": "dir"},
    {"block": 1, "type": "dir"},
    {"block": 2, "type": "dir"},
    {"block": 3, "type": "dir"},
    {"block": 4, "type": "file"},
    {"block": 5, "type": "file"}
];
var Blocks = [
    {"content": ["bin", "home", "myfile1", "myfile2"], "used": true},
    {"content": [], "used": true},
    {"content": ["Link"], "used": true},
    {"content": ["myfile2"], "used": true},
    {"content": "this is myfile 1", "used": true},
    {"content": "this is myfile 2", "used": true},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false},
    {"content": "", "used": false}
];
