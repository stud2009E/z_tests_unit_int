sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/matchers/AggregationLengthEquals',
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/Properties",
], function (
	Opa5,
	AggregationLengthEquals,
	PropertyStrictEquals,
	Press,
	EnterText,
	Ancestor,
	Properties
) {
	"use strict";

	Opa5.createPageObjects({
		onMain : {
			viewName : "Main",

			assertions: {

				iShouldSee10EntriesInSmartTable: function () {
					return this.waitFor({
						controlType: "sap.ui.table.Table",
						matchers: new AggregationLengthEquals({
                            length : 10,
                            name: "rows"
                        }),
						success : function () {
							Opa5.assert.ok(true, "The smart table must have 10 rows");
						},
						errorMessage : "The smart table has incorrect number of rows"
					});
				},

				//TODO replace by one action with param 
				iShouldSee8ColumnsInSmartTable: function () {
					return this.waitFor({
						controlType: "sap.ui.table.Table",
						matchers: new AggregationLengthEquals({
                            length : 8,
                            name: "columns"
                        }),
						success : function () {
							Opa5.assert.ok(true, "The smart table must have 8 columns");
						},
						errorMessage : "The smart table has incorrect number of columns"
					});
				},

				iShouldSee9ColumnsInSmartTable: function () {
					return this.waitFor({
						controlType: "sap.ui.table.Table",
						matchers: new AggregationLengthEquals({
                            length : 9,
                            name: "columns"
                        }),
						success : function () {
							Opa5.assert.ok(true, "The smart table must have 9 columns");
						},
						errorMessage : "The smart table has incorrect number of columns"
					});
				},


				iShouldSeeTableSettingsDialog: function(){
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.P13nDialog",
						matchers: new PropertyStrictEquals({
                            name : "title",
							value: "Настройки просмотра"
                        }),
						success: function(oP13nDialog){
							Opa5.assert.ok(true, "Setting dialog is open");
							Opa5.getContext().dialog = oP13nDialog;
						},
						errorMessage : "Can not find setting dialog"
					})
				},

				iShouldSortedTableBy: function(sField, bAsc){
					var sText = bAsc ? "По восходящей" : "По нисходящей";

					return this.waitFor({
						controlType: "sap.ui.table.Table",
						matchers: new AggregationLengthEquals({
							length : 10,
							name: "rows"
						}),
						success : function (aTables) {
							var oTable = aTables[0];
							var oModel = oTable.getModel();
							var aDataSet = [];
							$.each(oModel.oData, function(sKey, oObject){
								if(sKey.startsWith("TestDataSet")){
									aDataSet.push(oObject[sField]);
								}
							});

							var fnSort = bAsc ? (a, b) => a - b : (a, b) => - (a - b);
							aDataSet.sort(fnSort);

							var oBinding = oTable.getBinding("rows");
							var aSortData = oBinding.getContexts()
								.map(function(oCtx){
									return oCtx.getProperty("Decimal");
								});
							
							Opa5.assert.deepEqual(aDataSet, aSortData, "Data in smart Table are corectly sorted " + sText);
						},
						errorMessage : "The smart table has incorrect sort order"
					});
				}

			},

			actions: {
				pressTableSettings: function(){
					return this.waitFor({
						id : "smartTable-btnPersonalisation",
						actions : new Press(),
						errorMessage : "did not find the Button"
					});
				},

				selectSortTabInSettingDialog: function(){
					return this.waitFor({
						controlType : "sap.m.Button",
						searchOpenDialogs: true,
						matchers: new PropertyStrictEquals({
                            name : "text",
							value: "Сортировка"
                        }),
						actions : new Press(),
						errorMessage : "did not find the Sort button Button"
					});
				},

				chooseSortFieldInSortDialog: function(sText){
					return this.waitFor({
						controlType : "sap.m.ComboBox",
						searchOpenDialogs: true,
						actions: new EnterText({ text: sText }),
						errorMessage : "did not find the sort field combobox"
					});
				},

				chooseSortType: function(bAsc){
					var sText = bAsc ? "По восходящей" : "По нисходящей";

					return this.waitFor({
						controlType : "sap.m.Select",
						actions: new Press(),
						searchOpenDialogs: true,
						success: function(oSelect) {
							this.waitFor({
								controlType: "sap.ui.core.Item",
								searchOpenDialogs: true,
								matchers: [
									new Ancestor(oSelect[0]),
									new Properties({ text: sText})
								],
								actions: new Press(),
								errorMessage: "Cannot select " + sText + " from sort select"
							});
						},
						errorMessage: "Could not find sort select"
					});
				},

				applyTableSettings: function(){
					return this.waitFor({
						controlType : "sap.m.Button",
						searchOpenDialogs: true,
						actions : new Press(),
						matchers : new PropertyStrictEquals({
                            name : "text",
							value: "ОК"
                        }),
						errorMessage : "did not find the OK button"
					});
				},

				selectAllColumns: function(){
					return this.waitFor({
						controlType : "sap.m.CheckBox",
						visible: true,
						searchOpenDialogs: true,
						actions : new Press(),
						matchers : function(oCheckBox) {
							return oCheckBox.getId().endsWith("-sa");
						},
						errorMessage : "did not find the Checkbox"
					});
				}

			}
		}
	});
});
