'use strict';
var curDir = '/';

var main = $('#main');

/**
 * @synopsis  根据文件名获取文件对象
 *
 * @param name 文件名
 *
 * @returns   包含文件详细信息到文件对象
 */
function getFileByName(name) {
    var ret = new Object();
    Files.forEach(function (file) {
        if (file.name == name) {
            ret.name = name;
            ret.node_id = file.node_id;
            ret.type = Nodes[file.node_id].type;
            ret.block = Nodes[file.node_id].block;
            ret.content = Blocks[Nodes[file.node_id].block].content;
            return false;
        }
    });
    return ret;
}

/**
 * @synopsis 生成一个文件或文件夹的HTML元素添加到DOM树中
 *
 * @param child 文件或者文件夹名
 *
 * @returns   
 */
function display(child) {
    Files.forEach(function (file) {
        if (file.name == child) {
            var node = Nodes[file.node_id];
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

/**
 * @synopsis  列出当前目录的所有文件和子目录
 *
 * @param dir 目录名
 *
 * @returns   
 */
function ls(dir) {
    $(".icon").remove();
    $('#editor').hide();
    Files.forEach(function (file) {
        if (file.name === dir) {
            var node = Nodes[file.node_id]; 
            var children = Blocks[node.block].content;
            children.forEach(function (child) {
                display(child);
            });
            return false;
        }
    });

    // 给每个目录绑定双击事件：打开目录
    $('.glyphicon-folder-close').parent().bind('dblclick', function () {
        var name = this.children[1].innerHTML;
        ls(name);
    });

    // 给每个文件绑定双击事件：编辑文件
    $('.glyphicon-file').parent().bind('dblclick', function () {
        var name = this.children[1].innerHTML;
        var file = getFileByName(name);
        $('#editing-file-name').text(name);
        $('#editing-content').val(file.content);
        $('#editor').show();
    });
    curDir = dir;
    $('#curDir').html(curDir);
}


/**
 * @synopsis  创建一个文件
 *
 * @param type 类型(文件或者目录)
 * @param name 名称
 *
 * @returns   
 */
function create(type, name) {
    var block;
    var i;
    var exist = false;
    if (name == '') {
        alert('文件名不能为空');
        return false;
    }
    Files.forEach(function (file) {
        if (file.name == curDir) {
            var node = Nodes[file.node_id];
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
    Files.push({
        "name": name,
        "node_id": Nodes.length
    });
    // 添加到Nodes数组
    Nodes.push({
        "block": i,
        "type": type
    });
    // 把添加的文件添加到当前目录的孩子中去
    Files.forEach(function (file) {
        if (file.name === curDir) {
            var node = Nodes[file.node_id]; 
            Blocks[node.block].content.push(name);
            return false;
        }
    });
    
    ls(curDir);
}



/**
 * @synopsis 添加文件的单击事件
 */
$('#add-file').click(function () {
    create('file', $('#name').val());
    $('#name').val('');
    return false;
});
/**
 * @synopsis 添加目录的单击事件
 */
$('#add-dir').click(function () {
    create('dir', $('#name').val());
    $('#name').val('');
    return false;
});
/**
 * @synopsis 返回根目录的单击事件
 */
$('#back-to-root').click(function () {
    ls('/');
    return false;
});

/**
 * @synopsis  保存的单击事件
 */
$('#save').click(function () {
    var content = $('#editing-content').val();
    var name = $('#editing-file-name').text();
    var file = getFileByName(name);
    Blocks[file.block].content = content;
    $('#editing-content').text('');
    $('#editing-file-name').val('');
    $('#editor').hide();
    return false;
});

/**
 * @synopsis  删除的单击事件
 */
$('#remove').click(function () {
    if (confirm("你确认要删除这个文件吗？")) {
        var name = $('#editing-file-name').text();
        var file = getFileByName(name);
        for (var i = 0; i < Files.length; i++) {
            if (Files[i].name == name) {
                Files.splice(i, 1);
                break;
            }
        }
        Blocks[file.block].content = "";
        Blocks[file.block].used = false;
        Blocks.forEach(function (block) {
            if ($.isArray(block.content)) {
                var index = $.inArray(file.name, block.content);
                if (index != -1) {
                    block.content.splice(index, 1);
                }
            }
        });
        ls(curDir);
    }
    return false;
});

ls('/');

