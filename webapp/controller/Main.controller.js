sap.ui.define([
	"test/offlineapp/controller/BaseCotroller.controller",
	"sap/ui/model/odata/v2/ODataModel"
], function (
	BaseCotroller,
	ODataModel
) {
	"use strict";

	return BaseCotroller.extend("test.offlineapp.controller.Main", {
		onInit() {
			this.getRouter().getRoute("main").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched() {
			new ODataModel("/V2/Northwind/Northwind.svc/").read("/Customers", {
				success: (oData) => {
					this.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "customers");
				}
			});
		},

		onSaveLocal() {
			if (!self.indexedDB) {
				console.log("This browser doesn't support IndexedDB.");
				return;
			}

			const oCustomersModel = this.getView().getModel("customers");
			const request = self.indexedDB.open('EXAMPLE_DB', 1);

			request.onupgradeneeded = (oEvent) => {
				const oDB = oEvent.target.result;
				const oObjectStore = oDB.createObjectStore("customers", { keyPath: "CustomerID" });

				oObjectStore.transaction.oncomplete = (oEvent) => {
					const oCustomerObjectStore = oDB.transaction("customers", "readwrite").objectStore("customers");
				};
			};

			request.onerror = (oEvent) => {
				console.log("Error: " + oEvent.target.errorCode);
			};

			request.onsuccess = (oEvent) => {
				const oDB = oEvent.target.result;
				const oCustomerObjectStore = oDB.transaction("customers", "readwrite").objectStore("customers");
				oCustomerObjectStore.clear();
				oCustomersModel.oData.forEach((oCustomer) => {
					oCustomerObjectStore.put(oCustomer);
				});
			};
		},

		onLoadLocal() {
			const request = self.indexedDB.open('EXAMPLE_DB');

			request.onsuccess = (oEvent) => {
				const oDB = oEvent.target.result;
				const oCustomerObjectStore = oDB.transaction("customers", "readwrite").objectStore("customers");
				const oRequest = oCustomerObjectStore.getAll();

				oRequest.onsuccess = (oEvent) => {
					this.getView().setModel(new sap.ui.model.json.JSONModel(oEvent.target.result), "customers");
				};
			};
		}
	});
});