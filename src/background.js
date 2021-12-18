chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
     
    }
})

//waiting for a message to start timer
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.task === "start"){
        //get all info about mail
        let notif = {
            timerValue : request.timerValue,
            mailSubject: request.subject,
            senderName: request.senderName,
            senderEmail: request.senderMail
        }
       

        var timestamp = Date.now().toString();

        //we must use obj because it won't work with variable
        var obj = {};
        obj[timestamp] = notif;

        var alarmName = "myAlarm" + timestamp;
        chrome.alarms.create(alarmName, {delayInMinutes: request.timerValue} );
        sendResponse({status: "started"});

        chrome.storage.local.set(obj);

        //add notif name in array od notifs
        chrome.storage.local.get("notifArray", function(result) {
            if (result.notifArray !== undefined){
                var arr = result.notifArray;
                arr.push(timestamp);
                chrome.storage.local.set({"notifArray": arr}, function() {});
            }       
        });
      }
    }
);


//timer otkucao, treba da se posalje notif
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.substring(0, 7) === "myAlarm") {
        //get notification info from storage  
        var notifName = alarm.name.substring(7, );
        //we must use obj because it won't work with variable
        var obj = [notifName]
        chrome.storage.local.get(obj, function(result) {
            var notif = result[notifName];
            chrome.notifications.create(notifName, {
                type: 'basic',
                iconUrl: 'images/icons/logo_notif.png',
                title: "Reminder!",
                message: "You have e-mail: " + notif.mailSubject,
                priority: 2,
                contextMessage: "From: "+ notif.senderName + "(" + notif.senderEmail + ")",
                requireInteraction: true
            });

            // clear notif from storage
            chrome.storage.local.remove(notifName,function(){
                var error = chrome.runtime.lastError;
                   if (error) {
                       console.error(error);
                   }
            });

            //clear notif name from array od notifs
            chrome.storage.local.get("notifArray", function(result) {
                if (result.notifArray !== undefined){
                    var arr = result.notifArray;
                    var i = arr.indexOf(notifName);
                    if (i > -1) {
                        arr.splice(i, 1);
                    }
                    chrome.storage.local.set({"notifArray": arr}, function() {});
                }       
            });
            
         });   
    }
});