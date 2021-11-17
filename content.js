chrome.storage.local.get(["loadNum"], function (result) {
    if (result.loadNum == undefined ) { //first time loading page, just add button
        chrome.storage.local.set(
            {
                loadNum: 1
            }
        );
        addButton();
    }else{ //>1 time loading page, first remove the button, that add it again
        let newNum = result.loadNum + 1;
        chrome.storage.local.set(
            {
                loadNum: newNum
            }
        );
        removeAll();
        addButton();
    }
});

function removeAll(){
    document.getElementById("buttonContainer").innerHTML = "";
}

function addButton(){

}