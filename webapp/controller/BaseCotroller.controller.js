sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(
	Controller,
    UIComponent
) {
	"use strict";

	return Controller.extend("test.offlineapp.controller.BaseCotroller", {
        getRouter() {
            return UIComponent.getRouterFor(this);
        }
	});
});