'use strict';
var curDir = '/';

var main = $('#main');
function display(child) {
    files.forEach(function (file) {
        if (file.name == child) {
            var node = nodes[file.node_id];
            var icon = $("<div class='icon'></div>");
            var fileIcon = $("<span class='glyphicon glyphicon-file'></span");
            var folderIcon = $("<span class='glyphicon glyphicon-folder-close'></span");
            var name = $("<span class='name'>" + file.name + "</span>");
            if (node.type == "dir") {
                icon.append(folderIcon);
            } else {
                icon.append(fileIcon);
            }
            icon.append(name);
            main.append(icon);
            return false;
        }
    });
}
function ls(dir) {
    $(".icon").remove();
    files.forEach(function (file) {
        if (file.name === dir) {
            var node = nodes[file.node_id]; 
            var children = Blocks[node.block].content;
            children.forEach(function (child) {
                display(child);
            });
            return false;
        }
    });
    $('.glyphicon-folder-close').parent().bind('dblclick', function () {
        var name = this.children[1].innerHTML;
        ls(name);
    });
    curDir = dir;
    $('#curDir').html(curDir);
}

function create(type, name) {
    var block;
    var i;
    var exist = false;
    if (name == '') {
        alert('文件名不能为空');
        return false;
    }
    files.forEach(function (file) {
        if (file.name == curDir) {
            var node = nodes[file.node_id];
            if ($.inArray(name, Blocks[node.block].content) != -1) {
                alert('文件已经存在');
                exist = true;
                return false;
            }
        }
    });
    if (exist)
        return false;

    // 在虚拟硬盘中找空闲的块
    for (i = 0; i < Blocks.length; i++) {
        block = Blocks[i];
        if (block.used == false) {
            block.used = true;
            if (type == 'dir') {
                block.content = [];
            }
            break;
        }
    }
    
    // 添加一个file对象
    files.push({
        "name": name,
        "node_id": nodes.length
    });
    // 添加到nodes数组
    nodes.push({
        "block": i,
        "type": type
    });
    // 把添加的文件添加到当前目录的孩子中去
    files.forEach(function (file) {
        if (file.name === curDir) {
            var node = nodes[file.node_id]; 
            Blocks[node.block].content.push(name);
            return false;
        }
    });
    
    ls(curDir);
}

$('#add-file').click(function () {
    create('file', $('#name').val());
    $('#name').val('');
    return false;
});
$('#add-dir').click(function () {
    create('dir', $('#name').val());
    $('#name').val('');
    return false;
});
$('#back-to-root').click(function () {
    ls('/');
    return false;
});

ls('/');

