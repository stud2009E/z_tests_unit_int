sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/matchers/AggregationLengthEquals',
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	AggregationLengthEquals,
	PropertyStrictEquals,
	Press
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
