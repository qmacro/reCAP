/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../Device","../base/Object","sap/ui/dom/containsOrEquals","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(t,o,e,n,r){"use strict";var s=o.extend("sap.ui.core.FocusHandler",{constructor:function(e,s){o.apply(this);this.oCore=s;this.oCurrent=null;this.oLast=null;this.aEventQueue=[];this.oLastFocusedControlInfo=null;this.oPatchingControlFocusInfo=null;this.fEventHandler=r.proxy(this.onEvent,this);if(e.addEventListener&&!t.browser.msie){e.addEventListener("focus",this.fEventHandler,true);e.addEventListener("blur",this.fEventHandler,true)}else{r(e).bind("activate",this.fEventHandler);r(e).bind("deactivate",this.fEventHandler)}n.debug("FocusHandler setup on Root "+e.type+(e.id?": "+e.id:""),null,"sap.ui.core.FocusHandler")}});s.prototype.getCurrentFocusedControlId=function(){var t=null;try{var o=r(document.activeElement);if(o.is(":focus")){t=o.control()}}catch(t){}return t&&t.length>0?t[0].getId():null};s.prototype.getControlFocusInfo=function(t){t=t||this.getCurrentFocusedControlId();if(!t){return null}var o=this.oCore&&this.oCore.byId(t);if(o){return{id:t,control:o,info:o.getFocusInfo(),type:o.getMetadata().getName(),focusref:o.getFocusDomRef()}}return null};s.prototype.storePatchingControlFocusInfo=function(t){var o=document.activeElement;if(!o||!t.contains(o)){this.oPatchingControlFocusInfo=null}else{this.oPatchingControlFocusInfo=this.getControlFocusInfo();if(this.oPatchingControlFocusInfo){this.oPatchingControlFocusInfo.patching=true}}};s.prototype.getPatchingControlFocusInfo=function(){return this.oPatchingControlFocusInfo};s.prototype.updateControlFocusInfo=function(t){if(t&&this.oLastFocusedControlInfo&&this.oLastFocusedControlInfo.control===t){var o=t.getId();this.oLastFocusedControlInfo=this.getControlFocusInfo(o);n.debug("Update focus info of control "+o,null,"sap.ui.core.FocusHandler")}};s.prototype.restoreFocus=function(t){var o=t||this.oLastFocusedControlInfo;if(!o){return}var e=this.oCore&&this.oCore.byId(o.id);var r=o.focusref;if(e&&o.info&&e.getMetadata().getName()==o.type&&(o.patching||e.getFocusDomRef()!=r&&(t||e!==o.control))){n.debug("Apply focus info of control "+o.id,null,"sap.ui.core.FocusHandler");o.control=e;this.oLastFocusedControlInfo=o;delete this.oLastFocusedControlInfo.patching;e.applyFocusInfo(o.info)}else{n.debug("Apply focus info of control "+o.id+" not possible",null,"sap.ui.core.FocusHandler")}};s.prototype.destroy=function(o){var e=o.data.oRootRef;if(e){if(e.removeEventListener&&!t.browser.msie){e.removeEventListener("focus",this.fEventHandler,true);e.removeEventListener("blur",this.fEventHandler,true)}else{r(e).unbind("activate",this.fEventHandler);r(e).unbind("deactivate",this.fEventHandler)}}this.oCore=null};s.prototype.onEvent=function(t){var o=r.event.fix(t);n.debug("Event "+o.type+" reached Focus Handler (target: "+o.target+(o.target?o.target.id:"")+")",null,"sap.ui.core.FocusHandler");var e=o.type=="focus"||o.type=="focusin"||o.type=="activate"?"focus":"blur";this.aEventQueue.push({type:e,controlId:i(o.target)});if(this.aEventQueue.length==1){this.processEvent()}};s.prototype.processEvent=function(){var t=this.aEventQueue[0];if(!t){return}try{if(t.type=="focus"){this.onfocusEvent(t.controlId)}else if(t.type=="blur"){this.onblurEvent(t.controlId)}}finally{this.aEventQueue.shift();if(this.aEventQueue.length>0){this.processEvent()}}};s.prototype.onfocusEvent=function(t){var o=this.oCore&&this.oCore.byId(t);if(o){this.oLastFocusedControlInfo=this.getControlFocusInfo(t);n.debug("Store focus info of control "+t,null,"sap.ui.core.FocusHandler")}this.oCurrent=t;if(!this.oLast){return}if(this.oLast!=this.oCurrent){u(this.oLast,t,this.oCore)}this.oLast=null};s.prototype.onblurEvent=function(t){if(!this.oCurrent){return}this.oLast=t;this.oCurrent=null;setTimeout(this["checkForLostFocus"].bind(this),0)};s.prototype.checkForLostFocus=function(){if(this.oCurrent==null&&this.oLast!=null){u(this.oLast,null,this.oCore)}this.oLast=null};var i=function(t){var o=r(t).closest("[data-sap-ui]").attr("id");if(o){return o}return null};var u=function(t,o,n){var s=t?n&&n.byId(t):null;if(s){var i=o?n.byId(o):null;var u=r.Event("sapfocusleave");u.target=s.getDomRef();u.relatedControlId=i?i.getId():null;u.relatedControlFocusInfo=i?i.getFocusInfo():null;var a=s.getUIArea();var l=null;if(a){l=n.getUIArea(a.getId())}else{var c=n.getStaticAreaRef();if(e(c,u.target)){l=n.getUIArea(c.id)}}if(l){l._handleEvent(u)}}};return s});