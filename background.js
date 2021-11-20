chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
     
    }
})

//globals
let mailSubject = "";
let senderName = "";
let senderEmail = "";


//waiting for a message to start timer
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.task === "start"){
        //get all info about mail
        mailSubject = request.subject;
        senderName = request.senderName;
        senderEmail = request.senderMail;

        chrome.alarms.create("myAlarm", {delayInMinutes: request.timerValue} );
        sendResponse({status: "started"});
      }
    }
);


//timer otkucao, treba da se posalje notif
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "myAlarm") {
        chrome.notifications.create('remindMe', {
            type: 'basic',
            iconUrl: 'images/icons/logo_notif.png',
            title: "Reminder!",
            message: "You have e-mail: " + mailSubject,
            priority: 2,
            contextMessage: "From: "+ senderName + "(" + senderEmail + ")",
            requireInteraction: true
        });
        chrome.alarms.clear("myAlarm");
    }
});