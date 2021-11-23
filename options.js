var notifsInfo;
chrome.storage.local.get(["notifsInfo"], function (result) {
    notifsInfo = result.notifsInfo;

    notifsInfo.forEach((notif)=>{
        let wrapper = document.createElement("div");
        wrapper.className = "row";
        wrapper.innerText = "Subject: "+ notif.mailSubject + "\n" + 
            "From: " + notif.senderName + " (" + notif.senderEmail + ")";
        
        document.getElementById("remindersArr").appendChild(wrapper);
    
    });
});

