var menuItem={
    "type":"normal",
    "id":"addToCalorie",
    "title":"Add '%s' to Calorie Tracker",
    "contexts":["selection"]
}
chrome.contextMenus.create(menuItem);
chrome.contextMenus.onClicked.addListener(function (clickedItem) {
    if(clickedItem.menuItemId=="addToCalorie"&&clickedItem.selectionText){
        if (!isNaN(clickedItem.selectionText)){
            chrome.storage.sync.get(['total', 'goalAmount'], function (obj) {
                if(obj.goalAmount>0){
                    var newTotal = 0;
                    if (obj.total) {
                        newTotal += parseInt(obj.total);
                    }
                    newTotal += parseInt(clickedItem.selectionText);
                    chrome.storage.sync.set({ 'total': newTotal });
                    var opt = {
                        "type": "basic",
                        "title": "CALORIE TRACKER",
                        "message": parseInt(clickedItem.selectionText) + " kCal have been added to your daily calorie count!",
                        "iconUrl": "icon.png"
                    }
                    chrome.notifications.create('added', opt)
                }else{
                    var op = {
                        type: "basic",
                        title: "CALORIE TRACKER",
                        message: "Uh...Oh! Appears like haven't set your goal yet!",
                        iconUrl: "icon.png"
                    }
                    chrome.notifications.create('goalNotSet', op);
                }
            });
        }
    }
});
chrome.storage.sync.get(['total'],function (obj) {
    if(!isNaN(obj.total)){
        chrome.browserAction.setBadgeText({ "text": obj.total.toString() });
    }
})
chrome.storage.onChanged.addListener(function (changes ) {
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});