chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
        
      //   if (chrome.runtime.lastError) {
      //     var errorMsg = chrome.runtime.lastError.message
      //     var reg = /\w*Cannot access contents of url\w*/
      //     if (errorMsg == "Cannot access a chrome:// URL" || errorMsg.match(reg)) {
      //         // Error handling here
      //     }
      //  }
    }
  })



//waiting for a message to start timer
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.task === "start"){
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
            iconUrl: 'images/icons/logo_48.png',
            title: "Reminder!",
            message: 'You are awesome!',
            priority: 2,
            contextMessage: "Ovo je context message i ne znam cemu sluzi."
        });
        chrome.alarms.clear("myAlarm");
    }
});