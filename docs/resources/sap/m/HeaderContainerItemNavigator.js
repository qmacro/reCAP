/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/delegate/ItemNavigation","sap/base/assert","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes"],function(t,e,n,a){"use strict";var i=t.extend("sap.m.HeaderContainerItemNavigator");i.prototype._callParent=function(e,n){if(typeof t.prototype[e]==="function"){t.prototype[e].apply(this,n)}};i.prototype.onsaphome=function(t){if(this._skipNavigation(t)){return}this._callParent("onsaphome",arguments)};i.prototype.onsapend=function(t){if(this._skipNavigation(t)){return}this._callParent("onsapend",arguments)};i.prototype.onsapnext=function(t){if(this._skipNavigation(t)){return}this._callParent("onsapnext",arguments)};i.prototype.onsapprevious=function(t){if(this._skipNavigation(t,true,false)){return}this._callParent("onsapprevious",arguments)};i.prototype._skipNavigation=function(t){return Array.prototype.indexOf.call(this.aItemDomRefs,t.target)===-1};return i});