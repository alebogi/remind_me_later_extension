
var notifsNames;
chrome.storage.local.get(["notifArray"], function (result) {

    if(result.notifArray == undefined){
        let wrapper = document.createElement("span");
        wrapper.setAttribute("style", "padding-left: 10px;");
        wrapper.innerText = "No active reminders.";
        document.getElementById("remindersArr").appendChild(wrapper);
    }else{

        notifsNames = result.notifArray;

        notifsNames.forEach((name)=>{

            var obj = [name]
            chrome.storage.local.get(obj, function(result) {
                notif = result[name];
            
                let wrapper = document.createElement("p");
                wrapper.setAttribute("style", "padding-left: 10px;");
                wrapper.innerHTML = "<b>Subject:</b> "+ notif.mailSubject + "<br>" + 
                    "<b>From:</b> " + notif.senderName + " (" + notif.senderEmail + ") <br><hr><br>";

                // let btn = document.createElement("button");
                // btn.innerText = "Cancel";

                // wrapper.appendChild(btn);
                
                let divv = document.getElementById("remindersArr");
                divv.appendChild(wrapper);
                
            });

       
        });

        if(notifsNames.length == 0){
            let wrapper = document.createElement("span");
            wrapper.setAttribute("style", "padding-left: 10px;");
            wrapper.innerText = "No active reminders.";
            document.getElementById("remindersArr").appendChild(wrapper);
        }


    }

    
});

