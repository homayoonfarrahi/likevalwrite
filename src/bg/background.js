var defaultExtensionDisabled = false;
var defaultLikeProbability = 0.3;


if (localStorage.extensionDisabled == undefined)
	localStorage.extensionDisabled = defaultExtensionDisabled;



if (localStorage.extensionDisabled === "true")
	chrome.browserAction.setIcon({path: "icons/icon19_disabled.png"});
else
	chrome.browserAction.setIcon({path: "icons/icon19.png"});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.msg == "getLikeProbability")
	{
		if (localStorage.likeProbability == undefined || isNaN(localStorage.likeProbability))
			localStorage.likeProbability = defaultLikeProbability;

		sendResponse({likeProbability: localStorage.likeProbability});
		return true;
	}
    else if (request.msg == "getExtensionDisabled")
    {
        sendResponse({extensionDisabled: localStorage.extensionDisabled});
        return true;
    }
    else
    {
    	sendResponse({});
    	return true;
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
	if (localStorage.extensionDisabled === "false")
	{
		localStorage.extensionDisabled = true;
		chrome.browserAction.setIcon({path: "icons/icon19_disabled.png"});
	}
	else
	{
		localStorage.extensionDisabled = false;
		chrome.browserAction.setIcon({path: "icons/icon19.png"});
	}
});
