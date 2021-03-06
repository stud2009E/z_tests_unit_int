sap.ui.define([
	'sap/ui/test/opaQunit',
	"./pages/Welcome"
], function (opaTest) {
	"use strict";

	QUnit.module("Welcome test");

	// opaTest("Should start the app and see table with 10 rows", function (Given, When, Then) {
	// 	// Arrangements
	// 	Given.iStartMyApp();
	// 	// Assertions
	// 	Then.onMain.iShouldSee10EntriesInSmartTable();
    //     // Cleanup
	// 	Then.iTeardownMyApp();
	// });

	// QUnit.module("Column test");
	// opaTest("Check columns ", function (Given, When, Then) {
	// 	// Arrangements
	// 	Given.iStartMyApp();
		
	// 	// Assertions
	// 	Then.onMain.iShouldSee10EntriesInSmartTable()
	// 		.iShouldSee8ColumnsInSmartTable();
	// 	When.onMain.pressTableSettings();
	// 	Then.onMain.iShouldSeeTableSettingsDialog();
		
	// 	When.onMain.selectAllColumns()
	// 		.applyTableSettings();

	// 	Then.onMain.iShouldSee9ColumnsInSmartTable();

    //     // Cleanup
	// 	Then.iTeardownMyApp();
	// });


	QUnit.module("Sort test");
	opaTest("Sort by Decimal ", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		
		When.onMain.pressTableSettings();
		Then.onMain.iShouldSeeTableSettingsDialog();
		
		When.onMain.selectSortTabInSettingDialog()
			.chooseSortFieldInSortDialog("Decimal")
			.chooseSortType(true)
			.applyTableSettings();

		Then.onMain.iShouldSortedTableBy("Decimal", true);
		
		When.onMain.pressTableSettings();
		Then.onMain.iShouldSeeTableSettingsDialog();

		When.onMain.selectSortTabInSettingDialog()
			.chooseSortFieldInSortDialog("Decimal")
			.chooseSortType(false)
			.applyTableSettings();

		Then.onMain.iShouldSortedTableBy("Decimal", false);
		

        // Cleanup
		Then.iTeardownMyApp();
	});

});
