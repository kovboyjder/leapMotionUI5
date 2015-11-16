# leapMotionUI5
LeapMotion controller for SAP UI5

This is a free to use extension of the leapMotion controller to work with SAPUI5. What i have done is just to package some of the commonly used functions of the leapMotion controller and added a js file to communicate with SAPUI5. This works with the Webide as well as a local eclipse installation.

The leapmotion.js file needs to be referenced in the index file as well as the leapMotion library. For example the following two lines:
	<script src="https://js.leapmotion.com/leap-0.6.4.min.js"></script>
	<script src="/leapMotion/leapMotion.js" type="text/javascript"></script>

Under samples the leapmotion1 is a local example using eclipse. 
The po_approval is the sample application from the SAP Webide extended with leapMotion controls

Have fun.
