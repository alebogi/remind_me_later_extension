// chrome.storage.local.get(["loadNum"], function (result) {
//     if (result.loadNum == undefined ) { //first time loading page, just add button
//         chrome.storage.local.set({"loadNum": 1}, function() {});
//         addButton();
       
//     }else{ //>1 time loading page, first remove the button, that add it again
//         let newNum = result.loadNum + 1;
//         chrome.storage.local.set({"loadNum": newNum}, function() {});
//         removeAll();
//         addButton();
//     }
// });

removeAll();
addButton();

function removeAll(){
    
    let elem = document.getElementById("remindme");
    if (elem !== undefined && elem !=null){
        elem.remove();
    }
    chrome.storage.local.set({"timer": -1}, function() {});
}

function addButton(){
    var div_elem = document.getElementsByClassName("amn")[0];

    if (div_elem != undefined){
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
 
}



function remindMeFunc(){
    console.log("REMIND ME");

    //fetching e-mail subject
    let subject = document.getElementsByClassName("hP")[0].innerText;
    console.log("Subject: " + subject);

    //fetching e-mail sender
    let senderObj = document.getElementsByClassName("gD")[0];
    let senderName = senderObj.getAttribute("name");
    let senderMail = senderObj.getAttribute("email");
    console.log("Name: " + senderName);
    console.log("Email: " + senderMail);
    
//odaberi interval-otvara se popup gde se bira interval i setuje se u local storage-u na ovaj nacin
let timerVal = 0.1;
chrome.storage.local.set({"timer": timerVal}, function() {});
    
    chrome.storage.local.get(["timer"], function (result) {
        if (result.timer > -1){
            
            //send message to background.js to start timer
            chrome.runtime.sendMessage({
                    timerValue: result.timer, 
                    task: "start",
                    subject: subject,
                    senderName: senderName,
                    senderMail: senderMail
                }, 
                function(response) {
                    console.log(response.status);
                }
            );

        }
    });
}



function startTimer(){
    chrome.storage.local.get(["timer"], function (result) {
        if (result.timer > -1){
            
            //send message to background.js to start timer
            chrome.runtime.sendMessage({timerValue: result.timer, task: "start"}, function(response) {
                console.log(response.status);
            });

        }
    });
}


