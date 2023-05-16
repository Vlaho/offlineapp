sap.ui.define([
    "test/offlineapp/controller/BaseCotroller.controller",
    "sap/ui/model/json/JSONModel"
],
    function (BaseCotroller,
        JSONModel) {
        "use strict";

        return BaseCotroller.extend("test.offlineapp.controller.Splash", {
            onInit: function () {
                this.getRouter().getRoute("splashScreen").attachMatched(this._onRouteMatched, this);
                this.getView().setModel(new JSONModel({
                    pic: "/images/Expertum_Logo_futuregreen_rgb.png",
                    height: (screen.height * 0.15) + "px"
                }), "img");
            },

            _onRouteMatched: function () {
                setTimeout(() => {
                    this.getRouter().navTo("main");
                }, 3000);
            }
        });
    });
