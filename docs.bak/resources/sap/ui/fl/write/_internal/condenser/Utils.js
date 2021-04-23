/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core"],function(e,n){"use strict";var i={};i.TARGET_UI="targetUI";i.INITIAL_UI="initialUI";i.PLACEHOLDER="X";i.INDEX_RELEVANT="indexRelevant";i.NOT_INDEX_RELEVANT="notIndexRelevant";function t(e,n){return(Math.max(e,n)||0)+1}i.getInitialUIContainerElementIds=function(e,n,t,r){if(!e[n]){e[n]={}}var a=e[n];if(!a[t]){a[t]={}}var f=a[t];if(!f[i.TARGET_UI]){f[i.TARGET_UI]=r}if(!f[i.INITIAL_UI]){f[i.INITIAL_UI]=r.slice(0)}return f[i.INITIAL_UI]};i.getContainerElementIds=function(i,t){var r=n.byId(i);var a=e.getAggregation(r,t);return a.map(function(e){return e.getId()})};i.initializeArrayWithPlaceholders=function(e,n){var r=t(n,e);return Array(r).fill(i.PLACEHOLDER).map(function(e,n){return e+n})};i.extendArrayWithPlaceholders=function(e,n,r){var a=t(n,r);if(e.length<a){var f;for(var l=e.length;l<=a;l++){f=i.PLACEHOLDER+e.length;e.splice(e.length,0,f)}}};i.extendElementsArray=function(e,n,t,r){i.extendArrayWithPlaceholders(e,n,t);var a=e.indexOf(r);var f=e.indexOf(i.PLACEHOLDER+n);if(a!==n&&n!==undefined){if(a>=0){i.shiftElement(e,a,n)}else if(f>-1){e[f]=r}else if(i.isUnknown(e[n])){e[n]=r}}};i.shiftElement=function(e,n,i){e.splice(i,0,e.splice(n,1)[0])};i.isUnknown=function(e){if(e!==undefined&&e.indexOf(i.PLACEHOLDER)===0){var n=e.slice(1,e.length);var t=parseInt(n);if(isNaN(t)){return false}return true}return false};return i});