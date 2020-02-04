/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/events/PseudoEvents"],function(t,e){"use strict";var r=Object.create(null);var n=false;r.apply=function(){if(n){return}n=true;t.Event.prototype.getPseudoTypes=function(){var t=[];if(e.getBasicTypes().indexOf(this.type)!=-1){var r=e.order.length;var n=null;for(var i=0;i<r;i++){n=e.events[e.order[i]];if(n.aTypes&&n.aTypes.indexOf(this.type)>-1&&n.fnCheck&&n.fnCheck(this)){t.push(n.sName)}}}this.getPseudoTypes=function(){return t.slice()};return t.slice()};t.Event.prototype.isPseudoType=function(t){var e=this.getPseudoTypes();if(t){return e.indexOf(t)>-1}else{return e.length>0}};t.Event.prototype.getOffsetX=function(){if(this.type=="click"){if(this.offsetX){return this.offsetX}if(this.layerX){return this.layerX}if(this.originalEvent.layerX){return this.originalEvent.layerX}}return 0};t.Event.prototype.getOffsetY=function(){if(this.type=="click"){if(this.offsetY){return this.offsetY}if(this.layerY){return this.layerY}if(this.originalEvent.layerY){return this.originalEvent.layerY}}return 0};var r=function(t){return function(e){t.apply(this,arguments);if(e){this._bIsStopHandlers=true}}};var i=t.Event.prototype.stopImmediatePropagation;t.Event.prototype.stopImmediatePropagation=r(i);t.Event.prototype.isImmediateHandlerPropagationStopped=function(){return!!this._bIsStopHandlers};var o=function(t){while(t&&t.originalEvent&&t!==t.originalEvent){t=t.originalEvent}return t};t.Event.prototype.setMark=function(t,e){t=t||"handledByControl";e=arguments.length<2?true:e;var r=o(this);r["_sapui_"+t]=e};t.Event.prototype.isMarked=function(t){return!!this.getMark(t)};t.Event.prototype.getMark=function(t){t=t||"handledByControl";var e=o(this);return e["_sapui_"+t]};t.Event.prototype.setMarked=t.Event.prototype.setMark};return r});