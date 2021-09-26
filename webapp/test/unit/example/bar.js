sap.ui.define([
	"sap/m/Bar",
	"sap/ui/core/Core",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(
	Bar,
	Core
){
	"use strict";

	QUnit.module("bar context class test;organization example");

	function renderBarInPageTestCase(sTestName, oOptions) {
		QUnit.test(sTestName, function (assert) { 
			// System under Test
			var oBar = new Bar();
	
			oBar.placeAt("qunit-fixture");
	
			// Act
			oBar.applyTagAndContextClassFor(oOptions.context);
			Core.applyChanges();
	
			// Assert
		   assert.strictEqual(oBar.getDomRef().nodeName, oOptions.expectedTag.toUpperCase());
		   assert.ok(oBar.$().hasClass(oOptions.expectedClass), "The bar has the context class: " + oOptions.expectedClass);
	
			// Cleanup
			oBar.destroy();
		});
	};
	
	renderBarInPageTestCase("Should render the header context", {
		context : "header",
		expectedTag : "header",
		expectedClass : "sapMHeader-CTX"
	});
	
	renderBarInPageTestCase("Should render the subheader context", {
		context : "subheader",
		expectedTag : "header",
		expectedClass : "sapMSubHeader-CTX"
	});
	
	renderBarInPageTestCase("Should render the footer context", {
		context : "footer",
		expectedTag : "footer",
		expectedClass : "sapMFooter-CTX"
	});
});