function saveLikeProbability() {
	var likeProbability = document.getElementById("likeProb").value;
	localStorage.likeProbability = likeProbability / 10.0;
}


document.addEventListener('DOMContentLoaded', function () {
	var likeProbability = localStorage.likeProbability;
	if (likeProbability == undefined || isNaN(likeProbability))
	{
		likeProbability = 0.3;
		localStorage.likeProbability = likeProbability;
	}

	var select = document.getElementById("likeProb");
	for (var i=0 ; i<select.children.length ; i++)
	{
		if (select.children[i].value / 10.0 == likeProbability)
		{
			select.children[i].selected = true;
			break;
		}
	}

 	document.getElementById("likeProb").addEventListener('change', saveLikeProbability);
});