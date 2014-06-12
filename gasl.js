/**
    All GASL methods and functions are defined inside of this namespace.

	Gomez Advanced Scripting Library (GASL) is a library of functions that simplifies complex scripting techniques within the Gomez Recorder and Gomez Agents.

	@namespace
*/ 

GASL = {};

/** 
 * Generates a selector (CSS or DOM) with a random index.
 * 
 * @param {string} targetWindow Name of the target window.
 * @param {string} type The type of locator (CSS or DOM).
 * @param {string} selector The selector to find the elements
 * @return {string} Selector string with random index
*/

GASL.randomSelector = function(targetWindow, type, selector) {
    var rndSelector = selector;
    
    var els = new Locator({
			targetWindow: targetWindow,
      locators: [[type, selector]]
	}).getElements();
	
	var rndIdx = Math.floor(Math.random() * els.length);
    
    if (type == 'css') {
        rndSelector = selector + ':eq(' + rndIdx + ')';
    } else if (type == 'dom') {
        rndSelector = selector + '[' + rndIdx + ']';   
    }
    
	return rndSelector;
};

/**
 * Skips all of the actions in the step if element exists or does not exists.
 * 
 * @param {object} target The target window and locators of the element to check.
 * @param {number} stepIndex The index of the step to skip.
 * @param {boolean} [reverse=false] If set to true step will be skipped if element is found. 
 * @return {boolean} If step skiped return true.
*/

GASL.conditionalStep = function(target, stepIndex, reverse) {
    var els = [];
    
    try {
		els = new Locator(target).getElements();
	} catch(e) {}
    
  if (!els.length || (reverse && els.length > 0)) {
		for(var i=0;i<script.steps[stepIndex].actions.length;i++) {
			script.steps[stepIndex].actions[i].type = 'do not execute';
		}
        
			return true;
    }
    
    return false;
};

/**
 * Dynamically executes type and wait actions.
 * 
 * @param {object} target The window and locators of the target element(s).
 * @param {string} text The text value to type.
*/

GASL.dynamicType = function(target, text) {
	var textValue = '';
    var charCodes = [];
	
	for (var i=0;i<text.length;i++) {
			textValue += text.charAt(i);
			charCodes.push(text.charCodeAt(i));
    
      var type = new KeystrokesCommand({
					"target": target,
					"textValue": textValue,
					"keyCodes": charCodes,
					"charCodes": charCodes,
					"selectionStart": [],
					"selectionEnd": []
			});
      type.execute();

			var timeWait = new Wait({ "criteria": "time", "absoluteMS": 500 });
      timeWait.execute();
    
			var networkWait = new Wait({ "criteria": "network" });
      networkWait.execute();
	}
	
	return;
};

/**
	Finds the index of the frame that contains frame url and target window.

	@param {string} targetWindow The target window to be searched.
	@param {string} url The URL or partial URL of the frame. 
	@return {number} The index of the frame. If no frame found returns null.
*/

GASL.frameIndexOf = function(targetWindow, url) {
	var frameIndex = null;

	var win = new Locator({
			targetWindow: targetWindow,
			locators: [["dom", 'window']]
	}).execute();

	for(var i=0;i<win.frames.length;i++) {
			var frameURL = win.frames[i].location;

			if (String(frameURL).indexOf(url) != -1) frameIndex = i;
	}
	
	return frameIndex;
};

/**
	Get the step object of the script.

	@return {object} The current step object.
*/

GASL.getCurrentStep = function() {

	return script.steps[external.currentStepIdx];

};