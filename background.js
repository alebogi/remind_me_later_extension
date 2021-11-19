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


chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "myAlarm") {
        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: 'images/icons/logo_32.png',
            title: 'Test Message',
            message: 'You are awesome!',
            priority: 2
        });
    }
});