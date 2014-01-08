var files = [
    {
        "name": "root",
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
    {"id": 0, "block": 0, "type": "dir"},
    {"id": 1, "block": 1, "type": "dir"},
    {"id": 2, "block": 2, "type": "dir"},
    {"id": 3, "block": 3, "type": "dir"},
    {"id": 4, "block": 4, "type": "file"},
    {"id": 5, "block": 5, "type": "file"}
];
var Blocks = [
    {"children": ["bin", "home", "myfile1", "myfile2"]},
    {"children": []},
    {"children": ["Link"]},
    {"children": ["myfile2"]},
    {"text": "this is myfile 1"},
    {"text": "this is myfile 2"}
];
