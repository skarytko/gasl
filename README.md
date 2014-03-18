# GASL

Gomez Advanced Scripting Library (GASL) is a library of functions that simplifies complex scripting techniques within the Gomez Recorder and Gomez Agents.

## Usage

Add the following code to a Custom Action with a scope of 'control' at the begining of the script:

	importJS = new ImportJSCommand({
	    name: 'gasl', 
	    version: '', 
	    url: 'https://raw.github.com/skarytko/gasl/master/gasl.min.js'
	}).execute();

## Methods


	
## Compatibility

* FF Agent 13+
* IE Agent 8+