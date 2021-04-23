/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/testrecorder/codeSnippets/ControlSnippetGenerator","sap/ui/testrecorder/interaction/Commands","sap/base/strings/capitalize"],function(t,e,n){"use strict";var r=t.extend("sap.ui.testrecorder.codeSnippets.OPA5ControlSnippetGenerator",{});r.prototype._generate=function(t){var e=t.controlSelector.interaction&&t.controlSelector.interaction.idSuffix;var n=this._getActionAsString(t.action,e);var r=this._getAssertionAsString(t.assertion);if(n){t.controlSelector.actions=[]}if(r){t.controlSelector.success=[]}delete t.controlSelector.interaction;var o=this._getSelectorAsString(t.controlSelector);var i=this._getSelectorWithAction(o,n);var s=this._getSelectorWithAssertion(i,r);return"this.waitFor("+s+");"};r.prototype._getActionAsString=function(t,n){n=n?'idSuffix: "'+n+'"':"";var r;switch(t){case e.PRESS:r=n&&"{\n"+this._getIndentation(3)+n+"\n"+this._getIndentation(2)+"}";return"new Press("+r+")";case e.ENTER_TEXT:r="{\n"+this._getIndentation(2)+(n&&n+",\n"+this._getIndentation(2))+'text: "test"'+"\n"+this._getIndentation(1)+"}";return"new EnterText("+r+")";default:return""}};r.prototype._getAssertionAsString=function(t){if(t){var e="oControl.get"+n(t.propertyName)+"()";if(!t.expectedValue||t.expectedValue==="false"){return"Opa5.assert.ok(!"+e+");"}else if(t.propertyType==="boolean"){return"Opa5.assert.ok("+e+");"}else{return"Opa5.assert.strictEqual("+e+', "'+t.expectedValue+'");'}}else{return""}};r.prototype._getSelectorWithAction=function(t,e){return t.replace("actions: []","actions: "+e)};r.prototype._getSelectorWithAssertion=function(t,e){return t.replace("success: []","success: function (vControls) {\n"+this._getIndentation(2)+"var oControl = vControls[0] || vControls;\n"+this._getIndentation(2)+e+"\n"+this._getIndentation(1)+"}")};return new r});