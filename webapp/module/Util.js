sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],function(
    JSONModel,
    Device
) {
    "use strict";

    return {

        /**
         * create device model
         * @returns {sap.ui.model.json.JSONModel} 
         */
        createDeviceModel : function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        /**
         * create state model
         * @returns {sap.ui.model.json.JSONModel}
         */
        createStateModel: function(){
            var oModel = new JSONModel();
            return oModel;
        },

        /**
         * trim remove spaces and tabs from start and end
         * @param {string} text 
         * @returns string
         */
        trim: function(text) {
            return (text || "").replace(/^\s+|\s+$/g, "");
        }
    };

});