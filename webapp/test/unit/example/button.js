sap.ui.define([
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/ui/core/Core",
	"sap/ui/qunit/QUnitUtils",
	"sap/ui/events/KeyCodes",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(
	Button,
	ButtonType,
	Core,
	QUnitUtils,
	KeyCodes
){
	"use strict";

	QUnit.module("Test Button", {
		beforeEach: function(){
			this.oButton = new Button();
			this.oButton.placeAt("qunit-fixture")
			Core.applyChanges();
		},

		afterEach: function () {
			this.oButton.destroy();
		}
	});

	QUnit.test("Button rerendering", function (assert) {
		var fnRerenderingSpy = this.spy();

		this.oButton.addEventDelegate({
			onBeforeRendering : fnRerenderingSpy
		});

		this.oButton.setTooltip("test rerender");
		Core.applyChanges();
		
		assert.strictEqual(fnRerenderingSpy.callCount, 1, "Rerendered 1 times");
		assert.strictEqual(this.oButton.getTooltip(), "test rerender", "Tooltip property got set");
		assert.strictEqual(this.oButton.$().attr("title"), "test rerender", "Tooltip got updated");
		
		this.oButton.setText("Text");
		Core.applyChanges();
		assert.strictEqual(fnRerenderingSpy.callCount, 2, "Rerendered 1 times");
		assert.strictEqual(this.oButton.getText(), "Text", "Tooltip property got set");
		assert.strictEqual(this.oButton.$().find(".sapMBtnContent>bdi").text(), "Text", "Text got updated");

	});	

	QUnit.test("Button events press", function (assert) {
		var aCalls = [];
		var oTestButton = this.oButton;
		var fnCallback = function(oEvent){
			aCalls.push(oEvent);

			oTestButton.setType(ButtonType.Reject);
		};
		var fnSpy = this.spy(fnCallback);

		this.oButton.attachPress(fnSpy);
		QUnitUtils.triggerKeydown(this.oButton.getDomRef(), KeyCodes.ENTER);

		assert.strictEqual(aCalls.length, 1, "button pressed 1 time");
		assert.strictEqual(fnSpy.callCount, 1, "spy calls eq 1");

		assert.strictEqual(this.oButton.getText(), "", "New test - with new button");
		assert.strictEqual(this.oButton.getType(), ButtonType.Reject, "button type is reject");
	});	
});