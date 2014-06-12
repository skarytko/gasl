# GASL

Gomez Advanced Scripting Library (GASL) is a library of functions that simplifies complex scripting techniques within the Gomez Recorder and Gomez Agents.

## Usage

Add the following code to the body of a Custom Action with a scope of 'control' at the begining of the script:

	importJS = new ImportJSCommand({
	    name: 'gasl', 
	    version: '', 
	    url: 'https://raw.github.com/skarytko/gasl/master/gasl.min.js'
	}).execute();

or...

just copy and paste the source js into the body of the Custom Action.

When using methods within a Custom Action target scope must always be 'control'.

## Methods

#### conditionalStep(target, [reverse=false])

Skips all of the actions in the current step depending on if element exists or not.  By default, if target does not exist, remaining actions within step will be skipped.

Example:

	GASL.conditionalStep({
        targetWindow: 'gomez_top[0]',
        locators:[
            ['css', '#CardHolder'],
            ['dom', 'document.getElementById("CardHolder")'],
            ['css', 'input[type="text"][name="account_holder_name"]']
        ]
    });

#### dynamicType(target, text)

Dynamically executes type and newtork wait actions.

Example:
	
	GASL.dynamicType({
			targetWindow: 'gomez_top[0]',
			locators: [['css', '#search-field']]
		}, 'samsung tv');

#### frameIndexOf(targetWindow, url)

Finds the index of the frame based upon location property.  URL may be a partial URL match (uses indexOf).

Example:

	frameIndex = GASL.frameIndexOf('gomez_top[0]', 'checkoutanyware'); // => 2

#### randomSelector(targetWindow, Type, Selector)

Generates a selector (CSS or DOM) with a random index.

Example

	selector = GASL.randomSelector('gomez_top[0]', 'css', 'div.hproduct div.info-main h3 a'); // => "div.hproduct div.info-main h3 a:eq(3)"

#### getCurrentStep()

Gets the current Step object from the global script.

Example

	GASL.getCurrentStep().actions[1].target.targetWindow = "gomez_top[1]";


## Compatibility

* FF Agent 13+
* IE Agent 8+