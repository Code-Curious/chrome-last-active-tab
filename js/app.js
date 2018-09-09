// pour tester il faut changer de tab de fois avant d'appuyer sur le raccourcis clavier/icone du plugin
//DONE: Basculer uniquement entre les 2 dernières tabs
//TODO: Supporter plusieurs windows
//TODO: si la dernière tab n'existe plus passer 
		// -> à lastTab(lastTab)
		// ou
		// -> à tab-1 
		// ou 
		// -> à lastTab-1 
// IDEA: sauvegarder les 10 dernière tab dans une pile
// IDEA: si lastTab closed basculer vers lastTabArray[lastfield] - 2
// IDEA: on tab closing : pop
// TODO: je dois changer la conception, la logique du lastTabIdArray avec pop n'est pas bien perfectionnée 
// TODO: si Wikipedia alors unbind Alt+q 

// var lastTabIdArray = new Array(10);

var lastTabIdArray = new Array()

var lastTabId = 0;
var curTabId = 0;
var lastTabWindowId = 0;
var curTabWindowId = 0;



chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	cleanArrayIfToobig(lastTabIdArray, 10)
	lastTabIdArray.push(curTabId);



	// lastTabId = curTabId;
	curTabId = tabId;

	// Pour la window (marche pas) :
	// lastTabWindowId = curTabWindowId;
	// curTabWindowId = selectInfo.windowId;
})

chrome.tabs.onRemoved.addListener(function(closedTabId){
	// alert("u closed tab : "+ closedTabId)
	if(closedTabId == lastTabIdArray[lastTabIdArray.length - 1])
	{
		// alert("Closed Tab was the last tab, popping....");
		lastTabIdArray.pop();
	}
})

function cleanArrayIfToobig(tab, maxSize){
	if(tab.length > maxSize) {
		do{tab.shift();} 
		while(tab.length > maxSize);
	}
}

function switchToLastTab(){

		// Si wikipedia alors unbind alt+q :

/*		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		    var url = tabs[0].url;
		    if (url.match('wikipedia\.(org|com)')){
		    	// DONT KNOW WHAT TO DO HERE
		    	// $('*').off('keyup keydown keypress');

		    	// $(document).on('keypress', function(e) {
		    	// 	e.preventDefault();
		    	// });
			}
		});
*/
		

	if (lastTabIdArray.length && lastTabIdArray[lastTabIdArray.length - 1] !== 0) {
		lastTabId = lastTabIdArray[lastTabIdArray.length - 1];
		chrome.tabs.get(lastTabId, function(tab) {
			if (tab) {
				chrome.tabs.update(lastTabId, { active: true });

			}
			// else {
			// alert("La dernière tab n'a pas pu être retrouvé")
			// alert("Switching to tab : ");
			// lastTabIdArray.pop();
			// alert('popping succeeded')
			// alert("Switching to tab : "+ lastTabId);
			// }
		})
	}


/*
		//Pour basculer entre les windows (marche pas) :
		chrome.window.get(lastTabWindowId, function(window)
		{
			if(window.focused == false)
			{
				chrome.window.update(lastTabWindowId, {focused: true})
			}
		})
*/

}



chrome.commands.onCommand.addListener(function(command) {
	if(command === "last-tab"){
		switchToLastTab();
	}

})


chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
		switchToLastTab();

});


