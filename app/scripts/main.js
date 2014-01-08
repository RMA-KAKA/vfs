
(function () {
    'use strict';
    var curDir = '';

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
            }
        });
    }
    function ls(dir) {
        $(".icon").remove();
        files.forEach(function (file) {
            if (file.name === dir) {
                var node = nodes[file.node_id]; 
                var children = Blocks[node.block].children;
                children.forEach(function (child) {
                    display(child);
                });
            }
        });
        $('.glyphicon-folder-close').parent().bind('dblclick', function () {
            var name = this.children[1].innerHTML;
            ls(name);
        });
        curDir = dir;
        $('#curDir').html(curDir);
    }

    ls('/');
})();

