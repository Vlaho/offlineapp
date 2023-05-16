sap.ui.define([
	"test/offlineapp/test/unit/controller/Splash.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Splash Controller");

	QUnit.test("I should test the Splash controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	}
	);
});
