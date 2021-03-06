sap.ui.define([
	"sap/ui/test/Opa5",
	"z/unit/int/test/integration/arrangement/Arrangement",
	"./WelcomeTest"
], function (
	Opa5,
	Arrangement
){
	"use strict";

	Opa5.extendConfig({
		arrangements: new Arrangement(),
		viewNamespace: "z.unit.int.view.",
		autoWait: true
	});

});
