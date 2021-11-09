// chrome.alarms.create({ delayInMinutes: 3 });

// chrome.alarms.onAlarm.addListener(() => {
//   chrome.action.setIcon({
//     path: getRandomIconPath(),
//   });
// });

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['content-script.js']
//     });
// });

// chrome.scripting.executeScript(null, {file: 'content.js'});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     var rq = request.key;
//     if (rq != undefined && typeof rq == 'string') {
//       switch (rq) {
//         case 'popupInit':
//           chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             var keyString = JSON.parse(localStorage.getItem('keyWords'));
//             chrome.tabs.sendMessage(tabs[0].id, msgToSend, function(response) {
//               ;
//             });
//           });
//           break;
//       }
//     }
//   });

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
      // do your things
      
       // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
           // target: { tabId: tab.id },
           target: { tabId: tabId },
            files: ['content.js']
        });
  
    }
  })


