/**
 * Creates a new Grasl global object.
 * @constructor 
 */ 
Grasl = {};

/** 
 * Generates a selector (CSS or DOM) with a random index.
 * 
 * @param {string} Name of the target window.
 * @param {string} Type of locator (CSS or DOM).
 * @param {string} Selector to find elements
 * @return {string} Selector string with random index
*/
Grasl.randomSelector = function(targetWindow, type, selector) {
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
 * @param {boolean} reverse 
 * @return {boolean} If step skiped return true.
*/
Grasl.conditionalStep = function(target, stepIndex, reverse) {
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

// grasl.validateForVisibility = function(locator) {}

/**
 * Dynamically executes type and wait actions.
 * 
 * @param {object} target The window and locators of the target element(s).
 * @param {string} text The text value to type.
*/
Grasl.dynamicTyping = function(target, text) {
	var textValue = '';
    var charCodes = [];
	
	for (var i=0;i<text.length;i++) {
			textValue += text.charAt(i);
			charCodes.push(text.charCodeAt(i));
    
      var type = new KeystrokesCommand({
					"target": target,
					"textValue": textValue,
					"charCodes": charCodes
			});
      type.execute();

			var timeWait = new Wait({ "criteria": "time", "absoluteMS": 1000 });
      timeWait.execute();
    
			var networkWait = new Wait({ "criteria": "network" });
      networkWait.execute();
	}
	
	return;
};

/**
 * Find the index of the frame that contains frame url and target window.
 * 
 * @param {string} url URL string to search with. 
 * @param {targetWindow} The target window of the desired frame.
 * @return {number} The index of the frame.
*/
Grasl.findFrameIndex = function(url, targetWindow) {
    var frameIndex = null;

    targetWindow = targetWindow || 'gomez_top[0]';

	var win = new Locator({
			targetWindow: targetWindow,
			locators: [["dom", 'window']]
	}).execute();

	for(var i=0;i<win.frames.length;i++) {
			var frameURL = window.frames[i].location;
    
			if (String(frameURL).indexOf(url) != -1) frameIndex = i;
	}
    
    return frameIndex;
};