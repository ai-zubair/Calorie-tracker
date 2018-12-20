$(function () {
    window.addEventListener('offline',function () {
        $('#connection ').css("visibility","visible");
    })
    window.addEventListener('online',function () {
        TweenMax.staggerFrom(["h1", "#stats", "#addition"], 0.8, { autoAlpha: 0, rotationX: "-95deg", ease: Back.easeOut.config(3) }, 0.2);
        $('#connection').css("visibility","hidden");
    })
    if(!navigator.onLine){
        $('#connection').css("visibility","visible");
    }else{
        TweenMax.staggerFrom(["h1", "#stats", "#addition"], 0.8, { autoAlpha: 0, rotationX: "-95deg", ease: Back.easeOut.config(3) }, 0.2);
        function addAndUpdateCalorie() {
            chrome.storage.sync.get(['total','goalAmount'], function (obj) {
                if(obj.goalAmount>0){
                    var newTotal = 0;
                    if (obj.total) {
                        newTotal += parseInt(obj.total);
                    }
                    var addAmount = $('#enterCalorie').val();
                    if (addAmount > 0) {
                        newTotal += parseInt(addAmount);
                    }
                    chrome.storage.sync.set({ 'total': newTotal });
                    $('#total').text(newTotal);
                    $('#enterCalorie').val('');
                    if (newTotal == obj.goalAmount) {
                        var opt = {
                            type: "basic",
                            title: "CALORIE TRACKER",
                            message: "CONGRATS! You've reached you goal of " + obj.goalAmount + " kCal a day!",
                            iconUrl: "icon.png"
                        }
                        chrome.notifications.create('goal', opt);
                    }
                    if (newTotal > obj.goalAmount) {
                        var options = {
                            type: "basic",
                            title: "CALORIE TRACKER",
                            message: "My my! You've passed your goal by " + (newTotal - obj.goalAmount) + " kCal today",
                            iconUrl: "icon.png"
                        }
                        chrome.notifications.create('goalPassed', options);
                    }
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
        chrome.storage.sync.get(['total','goalAmount'], function (obj) {
            $('#total').text(obj.total);
            $('#goal').text(obj.goalAmount);
        });

        $('#enterCalorie').on("keypress", function (e) {
            if (e.which === 13) {
                addAndUpdateCalorie();
            }
        })
        $('#addCalorie').click(function () {
            addAndUpdateCalorie();
        });
    }
    
});