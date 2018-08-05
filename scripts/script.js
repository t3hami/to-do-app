var myLists = {};
var oList = document.getElementById('lists');

console.log(myLists);
window.onload = function () {
    var mainBody = document.getElementById('main-body');
    console.log(myLists);
    if (localStorage.myLists) {
        myLists = JSON.parse(localStorage.myLists);
        let listItemObj;
        let list;
        let i;
        console.log(myLists);
        for (i in myLists) {
            makeListItem(i,myLists[i]);
            //console.log(i+' '+myLists[i]);
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
    var input = document.createElement('input');
    input.setAttribute('type','text');
    let button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','Create');
    button.onclick = function () {
        if (input.value !== '')
            addList(input.value);
        else if (myLists.hasOwnProperty(input.value))
            alert('This task is already present!');
        else
            alert('Please enter something.');
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
    if (myLists[list] === undefined || myLists[list] === false)
        makeListItem(list,false);
    else
        makeListItem(list, true)
    localStorage.myLists = JSON.stringify(myLists);
}

function makeListItem(text, isChecked) {
    myLists[text] = isChecked;
    text = document.createTextNode(text);
    var par = document.createElement('p');
    par.setAttribute('style','display: inline;');
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
            checkbox.parentNode.setAttribute('style','text-decoration: line-through;');
            myLists[checkbox.previousSibling.innerHTML] = true;
            localStorage.myLists = JSON.stringify(myLists);
        }
        else {
            checkbox.parentNode.setAttribute('style','text-decoration: none;');
            myLists[checkbox.previousSibling.innerHTML] = false;
            localStorage.myLists = JSON.stringify(myLists);
        }
    };
    listItemObj.appendChild(checkbox);
    var del = document.createElement('a');
    del.appendChild(document.createTextNode('Delete'));
    del.setAttribute('href','Javascript:void(0)');
    del.setAttribute('class','delete');
    del.onclick = function() {
        del.parentNode.parentNode.removeChild(del.parentNode);
        delete myLists[del.parentNode.childNodes[0].innerHTML];
        localStorage.myLists = JSON.stringify(myLists);
    };
    listItemObj.appendChild(del);
    oList.appendChild(listItemObj);

    if (checkbox.checked) {
        checkbox.parentNode.setAttribute('style','text-decoration: line-through;');
        myLists[checkbox.previousSibling.innerHTML] = true;
    }
    else {
        checkbox.parentNode.setAttribute('style','text-decoration: none;');
        myLists[checkbox.previousSibling.innerHTML] = false;
    }
}