chrome.storage.local.get(["loadNum"], function (result) {
    console.log('loadNum currently is ' + result.loadNum);
    if (result.loadNum == undefined ) { //first time loading page, just add button
        chrome.storage.local.set({"loadNum": 1}, function() {});
        console.log('loadNum set 1');
        addButton();
       
    }else{ //>1 time loading page, first remove the button, that add it again
        let newNum = result.loadNum + 1;
        chrome.storage.local.set({"loadNum": newNum}, function() {});
        console.log('loadNum set ' + newNum);
        removeAll();
        addButton();
    }
});



function removeAll(){
    
    let elem = document.getElementById("remindme");
    if (elem !== undefined && elem !=null){
        elem.remove();
    }
    //document.getElementById("buttonContainer").innerHTML = "";
}

function addButton(){
    var div_elem = document.getElementsByClassName("amn")[0];

    let newSpan = document.createElement("span");
    newSpan.id = "remindme";
    newSpan.tabIndex = "0";
    newSpan.className = "ams remindMeClass";
    newSpan.onclick = () => remindMeFunc();
    newSpan.innerText = "Remind me later";

    let extensionId = chrome.runtime.id;
    let src = "url('chrome-extension://"+extensionId + "/images/clock.png')"
    newSpan.style.backgroundImage = src;
    newSpan.style.backgroundOrigin = "content-box";
    newSpan.style.paddingLeft = " 5 px";
    newSpan.style.backgroundPosition = "left";
    newSpan.style.backgroundRepeat = "no-repeat";
    newSpan.style.backgroundSize = "20 px";

    div_elem.append(newSpan);
    
}

function remindMeFunc(){
    console.log("REMIND ME 2")
}
