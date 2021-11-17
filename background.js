chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js', 'content.css']
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


