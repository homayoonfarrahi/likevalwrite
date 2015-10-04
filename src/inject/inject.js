function leftSideLikeOnly(word)
{
	if (word.toUpperCase() == "A" || word.toUpperCase() == "AN" || word.toUpperCase() == "THE")
		return true;

	return false;
}


function rightSideLikeOnly(word)
{
	if (word.toUpperCase() == "BUT," || word.toUpperCase() == "BUT")
		return true;

	return false;
}


function isNotAWord(word)
{
	if (word == "" || word == "\n" || word == "\r" || word == "\r\n" || word === undefined)
		return true;

	if (word.charAt(0) == "." || word.charAt(0) == "," || word.charAt(0) == "?" || word.charAt(0) == "!")
		return true;

	if (word.charAt(0) == "(" || word.charAt(0) == ")" || word.charAt(0) == "[" || word.charAt(0) == "]")
		return true;

	return false;
}


function injectLike(element, likeProbability)
{
    if (element.childNodes.length > 0) 
        for (var i=0 ; i<element.childNodes.length ; i++) 
            injectLike(element.childNodes[i], likeProbability);

    if (element.nodeType == Node.TEXT_NODE && /\S/.test(element.nodeValue))
    {
    	var words = element.nodeValue.split(" ");


    	var likeWord = "like";
    	if (words.length == 1 && !isNotAWord(words[0]))
    	{
    		if (words[0] != "" && Math.random() <= likeProbability)
    			words.splice(0, 0, likeWord);
    	}
    	else
    	{
	    	for (var i=0 ; i<words.length ; i++)
	    	{
	    		var word = words[i];

	    		if (isNotAWord(word))
	    			continue;

    			if (i == words.length - 1 || isNotAWord(words[i+1]) || leftSideLikeOnly(word))
    			{
    				if (Math.random() <= likeProbability)
    				{
	    				// Insert likeWord on the left side
	    				words.splice(i, 0, likeWord);
	    				i++;
	    			}

    				if (leftSideLikeOnly(word))
    					i++;
    			}
    			else if (rightSideLikeOnly(word))
    			{
    				if (Math.random() <= likeWord)
    				{
	    				// Insert likeWord on the right side
	    				words.splice(i + 1, 0, likeWord);
	    				i += 2;
	    			}
    			}
    			else
    			{
    				if (Math.random() <= likeWord)
    				{
	    				// Insert likeWord on either the left or the right side
	    				if (Math.random() < 0.5)
	    				{
	    					words.splice(i, 0, likeWord);
	    					i++;
	    				}
	    				else
	    				{
	    					words.splice(i + 1, 0, likeWord);
	    					i += 2;
	    				}
	    			}
    			}
	    	}
	    }


	    var likedString = words[0];
	    for (var i=1 ; i<words.length ; i++)
	    {
	    	likedString += " " + words[i];
	    }
    	
    	element.nodeValue = likedString;

    }
}


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		var likeProbability = 0.0;
		chrome.runtime.sendMessage({msg: "getLikeProbability"}, function(response) {
			likeProbability = parseFloat(response.likeProbability);
		});


		chrome.runtime.sendMessage({msg: "getExtensionDisabled"}, function(response) {

			if (response.extensionDisabled === "false")
			{
				var elements = document.getElementsByTagName("body")[0];
				injectLike(elements, likeProbability);
			}
		});

	}
	}, 10);
});