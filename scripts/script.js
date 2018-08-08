var myLists = {};
var oList = document.getElementById('lists');
var editIndex = -1;
var serverData = [];

window.onload = function () {
    var mainBody = document.getElementById('main-body');
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:3000/v1/todoList',false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send();
    serverData = JSON.parse(http.responseText);
    console.log(serverData);
    if (serverData !== []) {
        for (let i=0; i<serverData.length; i++) {
            makeListItem(serverData[i]['task'],serverData[i]['isDone'], serverData[i]['_id']);
        }
    }
    else {
        let textNode = document.createTextNode("You don't have any tasks right now. You can start tasks bellow.");
        let paragraph = document.createElement('p');
        paragraph.setAttribute('id','paragraph');
        paragraph.appendChild(textNode);
        mainBody.appendChild(paragraph);
    }
    mainBody.appendChild(document.createElement('br'));
    mainBody.appendChild(document.createElement('b').appendChild(document.createTextNode('TASK: ')));
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id','text-box');
    let button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','+');
    button.onclick = function () {
        addList(input.value);
        var http = new XMLHttpRequest();   // new HttpRequest instance
        http.open("POST", "http://localhost:3000/v1/todoList/add");
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send(JSON.stringify({ task: input.value, isDone: false}));
        input.value = '';
    };
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            button.click();
        }
    });
    mainBody.appendChild(input);
    mainBody.appendChild(document.createElement('pre').appendChild(document.createTextNode('  ')))
    mainBody.appendChild(button);
    document.getElementById('my-lists').setAttribute('style','font-weight: bold');
    document.getElementById('app').setAttribute('style','font-weight: normal');
} ();

function addList(list) {
    if (!localStorage.myLists) {
        document.getElementById('main-body').removeChild(document.getElementById('paragraph'));
    }
    list = list.replace(/\s+/g,' ').trim();
    if (list.toString() === '')
        alert('Please enter something!');
    else if (myLists[list] === undefined && list)
        makeListItem(list,false);
    else
        alert('Task is already present!');
    localStorage.myLists = JSON.stringify(myLists);
}

function makeListItem(text, isChecked, id) {
    myLists[text] = isChecked;
    text = document.createTextNode(text);
    var par = document.createElement('p');
    par.appendChild(text);
    let listItemObj = document.createElement('li');
    //let link = document.createElement('a');
    //link.setAttribute('href','#');
    //link.appendChild(text);
    listItemObj.appendChild(par);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = isChecked;

    checkbox.onchange = function () {
        if (checkbox.checked) {
            checkbox.parentNode.childNodes[0].setAttribute('style','text-decoration: line-through; display: inline;');
            myLists[checkbox.previousSibling.innerHTML] = true;
            localStorage.myLists = JSON.stringify(myLists);
        }
        else {
            checkbox.parentNode.childNodes[0].setAttribute('style','text-decoration: none; display: inline;');
            myLists[checkbox.previousSibling.innerHTML] = false;
            localStorage.myLists = JSON.stringify(myLists);
        }
    };
    listItemObj.appendChild(checkbox);
    var edit = document.createElement('a');
    edit.setAttribute('href','Javascript:void(0)');
    edit.appendChild(document.createTextNode('Edit'));
    edit.setAttribute('class','edit');
    edit.onclick = function () {
        setEditIndex(edit.parentNode);
        //alert(editIndex);
        document.getElementById('text-box').value = edit.parentNode.childNodes[0].innerHTML;
        edit.parentNode.parentNode.removeChild(edit.parentNode);
        delete myLists[edit.parentNode.childNodes[0].innerHTML];
        localStorage.myLists = JSON.stringify(myLists);
        var http = new XMLHttpRequest();
        http.open('DELETE','http://localhost:3000/v1/todoList/'+edit.parentNode._id ,false);
        http.send();
    };
    listItemObj.appendChild(edit);
    var del = document.createElement('a');
    del.appendChild(document.createTextNode('Delete'));
    del.setAttribute('href','Javascript:void(0)');
    del.setAttribute('class','delete');
    del.onclick = function() {
        del.parentNode.parentNode.removeChild(del.parentNode);
        delete myLists[del.parentNode.childNodes[0].innerHTML];
        localStorage.myLists = JSON.stringify(myLists);
        var http = new XMLHttpRequest();
        http.open('DELETE','http://localhost:3000/v1/todoList/'+del.parentNode._id ,false);
        http.send();
    };
    listItemObj.appendChild(del);
    listItemObj._id = id;
    if (editIndex === -1)
        oList.appendChild(listItemObj);
    else {
        oList.insertBefore(listItemObj, oList.childNodes[editIndex]);
        editIndex = -1;
    }



    if (checkbox.checked) {
        checkbox.parentNode.childNodes[0].setAttribute('style','text-decoration: line-through; display: inline;');
        myLists[checkbox.previousSibling.innerHTML] = true;
    }
    else {
        checkbox.parentNode.childNodes[0].setAttribute('style','text-decoration: none; display: inline;');
        myLists[checkbox.previousSibling.innerHTML] = false;
    }
}

function removeExtraSpace(str) {
    var i;
    var len = str.length;
    for (i=0;i<=str.length-1; i++) {
        console.log(i);
        if(str[i] == ' ')
            continue;
        else {
            str = str.slice(i);
            break;
        }
    }
    if (i = str.len)
        return '';
    else {
        for (i=str.length-1;i>-1; i--) {
            if(str[i] == ' ')
                continue;
            else {
                str = str.slice(0,i+1);
                break;
            }
        }
        return str;}
}

function setEditIndex(node) {
    var nodes = document.getElementsByTagName('ol')[0].childNodes;
    for (let i=0; i<nodes.length; i++){
        if (node == nodes[i]) {
            editIndex = i;
            return;
        }
    }
    editIndex = -1;
}