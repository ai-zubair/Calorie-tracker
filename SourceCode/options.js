$(function () {
    chrome.storage.sync.get(['goalAmount'],function(obj){
        if(obj.goalAmount){
            $('#goalAmount').val(obj.goalAmount); 
        }
    });
    function setGoal(){
        var goal=$('#goalAmount').val();
        if(goal>0){
            chrome.storage.sync.set({'goalAmount':goal},function () {
                var options={
                    type:"basic",
                    title:"Calorie TRACKER",
                    message:"Your Calorie goal has been set to "+goal+" kCal a day!",
                    iconUrl:"icon.png"
                }
                chrome.notifications.create('save',options);
                setTimeout(function () {
                    close();
                }, 500);
            })
        }else {
            $('#goalAmount').attr("placeholder","Can't be empty!");
        }
    }
    $('#saveGoal').click(function () {
        setGoal();
    })

    $('#resetStats').click(function () {
        chrome.storage.sync.get(['goalAmount'], function (obj) {
            if (obj.goalAmount>0) {
                $('#goalAmount').val('');
                chrome.storage.sync.set({ 'total': 0 });
                chrome.storage.sync.set({ 'goalAmount': 0 });
                var opt = {
                    type: "basic",
                    title: "CALORIE TRACKER",
                    message: "All the stats for goal count and total count have been reset to zero!",
                    iconUrl: "icon.png"
                }
                chrome.notifications.create('reset', opt);            }
            });
    })
})