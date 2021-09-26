sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "z/unit/int/module/Util",
    "sap/ui/thirdparty/jquery"
], function (
    UIComponent, 
    Device, 
    Util,
    jQuery
) {
	"use strict";

	return UIComponent.extend("z.unit.int.Component", {

		metadata : {
			manifest : "json"
		},

		init : function () {

			this.setModel(Util.createDeviceModel(), "device");
            this.setModel(Util.createStateModel(), "state");

			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class
		 */
		getContentDensityClass : function() {
			if (this._sContentDensityClass === undefined) {
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
                    this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});
});