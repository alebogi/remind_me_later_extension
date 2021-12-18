
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
                var timestamp = parseInt(name);
                var scheduledFor = notif.timerValue*60000 + timestamp;
                var date = new Date(scheduledFor);
                var dateStr = date.getDate()+
                            "/"+(date.getMonth()+1)+
                            "/"+date.getFullYear()+
                            " "+date.getHours()+
                            ":"+date.getMinutes()+
                            ":"+date.getSeconds();
            
                let wrapper = document.createElement("p");
                wrapper.setAttribute("style", "padding-left: 10px;");
                wrapper.innerHTML = "<b>Subject:</b> "+ notif.mailSubject + "<br>" + 
                    "<b>From:</b> " + notif.senderName + " (" + notif.senderEmail + ") <br>"+
                    "<b>Scheduled for:</b> " + dateStr  + "<br><br>";

                 let btn = document.createElement("button");
                 btn.innerText = "Cancel";
                 btn.onclick = () =>{
                    //clear alarm
                    var alarm = "myAlarm"+name;
                    chrome.alarms.clear(alarm);

                     // clear notif from storage
                    chrome.storage.local.remove(name,function(){
                        var error = chrome.runtime.lastError;
                        if (error) {
                            console.error(error);
                        }
                    });

                    //clear notif name from array od notifs
                    chrome.storage.local.get("notifArray", function(result) {
                        if (result.notifArray !== undefined){
                            var arr = result.notifArray;
                            var i = arr.indexOf(name);
                            if (i > -1) {
                                arr.splice(i, 1);
                            }
                            chrome.storage.local.set({"notifArray": arr}, function() {});
                        }       
                    });

                    //refresh
                    location.reload();
                 }

                 wrapper.appendChild(btn);
                wrapper.appendChild(document.createElement("br"));
                wrapper.appendChild(document.createElement("hr"));
                
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

