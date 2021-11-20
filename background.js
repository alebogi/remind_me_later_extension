chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
     
    }
})

//globals
let notifsInfo = new Array();

//sort notifications in desc, last in array has smallest value
function mySort(a ,b){
    return b.timerValue - a.timerValue;
}



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
        notifsInfo.push(notif);
        notifsInfo.sort(mySort);

        chrome.alarms.create("myAlarm", {delayInMinutes: request.timerValue} );
        sendResponse({status: "started"});
      }
    }
);


//timer otkucao, treba da se posalje notif
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "myAlarm") {
        //get notification info from array
        let notif = notifsInfo.pop();

        chrome.notifications.create('remindMe', {
            type: 'basic',
            iconUrl: 'images/icons/logo_notif.png',
            title: "Reminder!",
            message: "You have e-mail: " + notif.mailSubject,
            priority: 2,
            contextMessage: "From: "+ notif.senderName + "(" + notif.senderEmail + ")",
            requireInteraction: true
        });
        chrome.alarms.clear("myAlarm");
    }
});