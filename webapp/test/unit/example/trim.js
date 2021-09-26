sap.ui.define([
	"z/unit/int/module/Util",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(
	Util
){
	"use strict";

	QUnit.module("trim function");

	QUnit.test("trim()", function (assert) {
		assert.equal(Util.trim(""), "", "Пустая строка");
		assert.ok(Util.trim("		") === "", "Строка из пробельных символов");
		assert.equal(Util.trim(), "", "Без параметра");
		assert.equal(Util.trim(null), "", "С null");

	  
		assert.equal(Util.trim(" x"), "x", "Начальные пробелы");
		assert.equal(Util.trim("x "), "x", "Концевые пробелы");
		assert.equal(Util.trim(" x "), "x", "Пробелы с обоих концов");
		assert.equal(Util.trim("    x  "), "x", "Табы");
		assert.equal(Util.trim("    x   y  "), "x   y", "Табы и пробелы внутри строки не трогаем");
	  });
});