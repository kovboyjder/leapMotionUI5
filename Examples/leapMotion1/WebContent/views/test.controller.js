sap.ui.controller("views.test", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf test
*/
	onInit: function() {
		var oBus = sap.ui.getCore().getEventBus();
		var that = this;
		oBus.subscribe("leapMotion", "Pinch", function(){
			that.getView().byId("label").setText("Pinch");
		});
		oBus.subscribe("leapMotion", "Up", function(){
			that.getView().byId("label").setText("Up");
		});
		oBus.subscribe("leapMotion", "Down", function(){
			that.getView().byId("label").setText("Down");
		});
		oBus.subscribe("leapMotion", "Right", function(){
			that.getView().byId("label").setText("Right");
		});
		oBus.subscribe("leapMotion", "Left", function(){
			that.getView().byId("label").setText("Left");
		});
		oBus.subscribe("leapMotion", "Grab", function(){
			that.getView().byId("label").setText("Grab");
		});
		oBus.subscribe("leapMotion", "circleClockwise", function(){
			that.getView().byId("label").setText("Clockwise circle");
		});
		oBus.subscribe("leapMotion", "circleCounterClockwise", function(){
			that.getView().byId("label").setText("Counter clockwise circle");
		});
		oBus.subscribe("leapMotion", "HandRollLeft", function(){
			that.getView().byId("label").setText("HandRollLeft");
		});
		oBus.subscribe("leapMotion", "HandRollRight", function(){
			that.getView().byId("label").setText("HandRollRight");
		});
		
		
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf test
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf test
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf test
*/
//	onExit: function() {
//
//	}

});