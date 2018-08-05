var myLists = [];
var oList = document.getElementById('lists');
console.log(myLists);
window.onload = function () {
    var mainBody = document.getElementById('main-body');
    console.log(myLists);
    if (localStorage.myLists) {
        console.log('vfjvf');
        myLists = JSON.parse(localStorage.myLists);
        let listItemObj;
        let list;
        for (let i=0; i<myLists.length; i++) {
            makeListItem(myLists[i]);
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
    mainBody.appendChild(document.createTextNode('New task: '));
    console.log('djvbhffdv');
    var input = document.createElement('input');
    input.setAttribute('type','text');
    let button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','Create');
    button.onclick = function () {
        addList(input.value);
    };
    mainBody.appendChild(input);
    mainBody.appendChild(button);
    document.getElementById('my-lists').setAttribute('style','font-weight: bold');
    document.getElementById('app').setAttribute('style','font-weight: normal');
} ();

function addList(list) {
    if (!localStorage.myLists) {
        document.getElementById('main-body').removeChild(document.getElementById('paragraph'));
    }
    myLists.push(list);
    makeListItem(list);
    localStorage.myLists = JSON.stringify(myLists);
}

function makeListItem(text) {
    text = document.createTextNode(text);
    let listItemObj = document.createElement('li');
    //let link = document.createElement('a');
    //link.setAttribute('href','#');
    //link.appendChild(text);
    listItemObj.appendChild(text);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox')
    checkbox.onchange = function () {
        if (checkbox.checked) {
            checkbox.parentNode.setAttribute('style','text-decoration: line-through;');
        }
        else {
            checkbox.parentNode.setAttribute('style','text-decoration: none;')
        }
    };
    listItemObj.appendChild(checkbox);
    oList.appendChild(listItemObj);
}