// we have to remove buttons in case they were already added, and then add it
removeAll();
addButton();

function removeAll(){
    
    let elem = document.getElementById("remindme");
    if (elem !== undefined && elem !=null){
        elem.remove();
    }
    chrome.storage.local.set({"timer": -1}, function() {});

    chrome.storage.local.remove("subject");
    chrome.storage.local.remove("name");
    chrome.storage.local.remove("email");

    chrome.storage.local.get("notifArray", function(result) {
        if (result.notifArray == undefined){
            var arr = new Array();
            chrome.storage.local.set({"notifArray": arr}, function() {});
        }       
    });
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
    let subjectToSend = document.getElementsByClassName("hP")[0].innerText;
    chrome.storage.local.set({"subject": subjectToSend}, function() {});
    console.log("Subject: " + subjectToSend);

    //fetching e-mail sender
    let senderObj = document.getElementsByClassName("gD")[0];
    let senderNameToSend = senderObj.getAttribute("name");
    let senderMailToSend = senderObj.getAttribute("email");
    console.log("Name: " + senderNameToSend);
    chrome.storage.local.set({"name": senderNameToSend}, function() {});
    console.log("Email: " + senderMailToSend);
    chrome.storage.local.set({"email": senderMailToSend}, function() {});
    //-----------------------------------------------------
    
     //open popup that lets you choose time inetrval

     const modal = document.createElement("dialog");
     modal.setAttribute(
     "style",`
     height:150px;
     border: none;
     top:150px;
     border-radius:20px;
     background-color:white;
     position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
     `);

     modal.innerHTML = `
     <div class="modal-content">
        <button  class="close closeBtn" style:"align:right;">&times;</button>
        </br>   
        <p>Choose time interval:</p> </br>
        <div class="selectMenuDiv>
        </div>
        
     </div>
     `;

     

    let newSelect = document.createElement("select");
    newSelect.className = "selectClass";

    let option0 = document.createElement("option");
    option0.value = "0";
    option0.innerText = "Remind me later";
    newSelect.appendChild(option0);


    let option1 = document.createElement("option");
    option1.value = "1";
    option1.innerText = "5 min";
    newSelect.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = "10";
    option2.innerText = "10 min";
    newSelect.appendChild(option2);

    let option3 = document.createElement("option");
    option3.value = "15";
    option3.innerText = "15 min";
    newSelect.appendChild(option3);

    let option4 = document.createElement("option");
    option4.value = "30";
    option4.innerText = "30 min";
    newSelect.appendChild(option4);

    let option5 = document.createElement("option");
    option5.value = "60";
    option5.innerText = "1 hour";
    newSelect.appendChild(option5);

    let option6 = document.createElement("option");
    option6.value = "120";
    option6.innerText = "2 hours";
    newSelect.appendChild(option6);

    let option7 = document.createElement("option");
    option7.value = "180";
    option7.innerText = "3 hours";
    newSelect.appendChild(option7);
         
    modal.appendChild(newSelect);
    
    let br = document.createElement("br");
    modal.appendChild(br);

    let brr = document.createElement("br");
    modal.appendChild(brr);

    let newBtn = document.createElement("button");
    newBtn.className="submitBtn";
    newBtn.innerText = "Submit";
    newBtn.onclick = () => {
        var select = modal.getElementsByClassName("selectClass")[0];
        var value = select.options[select.selectedIndex].value;
        var timerVal = parseInt(value);
        if(value > 0){
            var s;
            var n;
            var m;
            chrome.storage.local.set({"timer": timerVal}, function() {});
            chrome.storage.local.get(["subject", "name", "email"], function(result) {
               s = result.subject;
               n = result.name;
               m = result.email;

               chrome.runtime.sendMessage({
                    timerValue: timerVal, 
                    task: "start",
                    subject: s,
                    senderName: n,
                    senderMail: m
                    }
                    , 
                    function(response) {
                        console.log(response.status);
                    }
                );
            });
            
            
            select.selectedIndex = 0;
            dialog.close();
        }
    }

    modal.appendChild(newBtn);

    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
   
    dialog.getElementsByClassName("closeBtn")[0].addEventListener("click", () => {
        dialog.close();
    });

 
}

