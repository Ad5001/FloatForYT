/**
 * main.js by Ad5001
 * (C) Ad5001 2017
 */

window.addEventListener("load", function() {
    window.resizeTo(400, 200);
    document.getElementById("youtube").addEventListener("paste", function() {
        setTimeout(function() {
            if(document.getElementById("youtube").value.indexOf("youtube.com/watch?") > 0) {
                var videoArgs = document.getElementById("youtube").value.split("youtube.com/watch?")[1].split("&");
                for(var i = 0; i < videoArgs.length; i++) {
                    var argName = videoArgs[i].split("=")[0];
                    var argValue = videoArgs[i].split("=")[1] ? videoArgs[i].split("=")[1] : videoArgs[i].split("=")[0]; // In case no key is provided (that's rare)
                    if(argName == "v") {
                        document.title = JSON.stringify({switch: argValue})
                        location = "https://www.youtube-nocookie.com/embed/" + argValue;
                    }
                }
            } else if(document.getElementById("youtube").value.indexOf("youtu.be/") > 0) {
                var videoArgs = document.getElementById("youtube").value.split("youtu.be")[1].split("?")[0];
                document.title = JSON.stringify({switch: videoArgs});
                location = "https://www.youtube-nocookie.com/embed" + videoArgs;
            }
        }, 6);
    })
});


