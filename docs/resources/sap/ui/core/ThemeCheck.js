/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/base/Log","sap/ui/dom/includeStylesheet","sap/ui/thirdparty/jquery"],function(e,t,a,r,s){"use strict";var n=150;var h=t.extend("sap.ui.core.ThemeCheck",{constructor:function(e){this._oCore=e;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;this._sFallbackTheme=null;this._mThemeFallback={};this._oThemeMetaDataCheckElement=null},getInterface:function(){return this},fireThemeChangedEvent:function(e){l(this);d.apply(this,[true]);if(!e&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()})}}});h.themeLoaded=false;function i(e){try{return e.cssRules}catch(e){return null}}function o(e){var t=i(e);return!!t&&t.length>0}h.checkStyle=function(e,t){var r=document.getElementById(e);try{var s=false,n=false,h=false,i=false;s=!r;n=!!(r&&(r.getAttribute("data-sap-ui-ready")==="true"||r.getAttribute("data-sap-ui-ready")==="false"));h=!!(r&&r.sheet&&r.sheet.href===r.href&&o(r.sheet));i=!!(r&&r.innerHTML&&r.innerHTML.length>0);var l=s||h||i||n;if(t){a.debug("ThemeCheck: "+e+": "+l+" (noLinkElement: "+s+", sheet: "+h+", innerHtml: "+i+", linkElementFinishedLoading: "+n+")")}return l}catch(r){if(t){a.error("ThemeCheck: "+e+": Error during check styles '"+e+"'",r)}}return false};function l(e){h.themeLoaded=false;if(e._sThemeCheckId){clearTimeout(e._sThemeCheckId);e._sThemeCheckId=null;e._iCount=0;e._sFallbackTheme=null;e._mThemeFallback={};if(e._oThemeMetaDataCheckElement&&e._oThemeMetaDataCheckElement.parentNode){e._oThemeMetaDataCheckElement.parentNode.removeChild(e._oThemeMetaDataCheckElement);e._oThemeMetaDataCheckElement=null}}}function u(e){var t=e._oCore.getLoadedLibraries();var n=e._oCore.getConfiguration().getTheme();var i=e._oCore._getThemePath("sap.ui.core",n)+"custom.css";var l=n.indexOf("sap_")===0||n==="base";var u=true;var d=[];if(!!e._customCSSAdded&&e._themeCheckedForCustom===n){t[e._CUSTOMID]={}}function C(c){var C="sap-ui-theme-"+c;var f=h.checkStyle(C,true);if(f){var g=document.querySelectorAll("link[data-sap-ui-foucmarker='"+C+"']");if(g.length>0){for(var _=0,T=g.length;_<T;_++){g[_].parentNode.removeChild(g[_])}a.debug("ThemeCheck: Old stylesheets removed for library: "+c)}}u=u&&f;if(u){if(e._themeCheckedForCustom!=n){if(!l&&m(e,c)){var k=i;var p=e._oCore._getLibraryCssQueryParams(t["sap.ui.core"]);if(p){k+=p}r(k,e._CUSTOMID);e._customCSSAdded=true;a.debug("ThemeCheck: delivered custom CSS needs to be loaded, Theme not yet applied");e._themeCheckedForCustom=n;u=false;return false}else{var v=s("LINK[id='"+e._CUSTOMID+"']");if(v.length>0){v.remove();a.debug("ThemeCheck: Custom CSS removed")}e._customCSSAdded=false}}}if(!l&&f&&!e._mThemeFallback[c]){var y=document.getElementById(C);if(y&&y.getAttribute("data-sap-ui-ready")==="false"&&!(y.sheet&&o(y.sheet))){d.push(c)}}}s.each(t,C);if(d.length>0){if(!e._sFallbackTheme){if(!e._oThemeMetaDataCheckElement){e._oThemeMetaDataCheckElement=document.createElement("style");s.each(t,function(t){var a="sapThemeMetaData-UI5-"+t.replace(/\./g,"-");e._oThemeMetaDataCheckElement.classList.add(a)});document.head.appendChild(e._oThemeMetaDataCheckElement)}e._sFallbackTheme=c(e._oThemeMetaDataCheckElement)}if(e._sFallbackTheme){d.forEach(function(t){var r="sap-ui-theme-"+t;var s=document.getElementById(r);a.warning("ThemeCheck: Custom theme '"+n+"' could not be loaded for library '"+t+"'. "+"Falling back to its base theme '"+e._sFallbackTheme+"'.");e._oCore._updateThemeUrl(s,e._sFallbackTheme);e._mThemeFallback[t]=true});u=false}}if(!u){a.debug("ThemeCheck: Theme not yet applied.")}else{e._themeCheckedForCustom=n}return u}function c(e){function t(){var t=window.getComputedStyle(e).getPropertyValue("background-image");var a=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)/i.exec(t);if(!a||a.length<2){return null}var r=a[1];if(r.charAt(0)!=="{"&&r.charAt(r.length-1)!=="}"){try{r=decodeURI(r)}catch(e){}}r=r.replace(/\\"/g,'"');r=r.replace(/%20/g," ");try{return JSON.parse(r)}catch(e){return null}}var a=t();if(a&&a.Extends&&a.Extends[0]){return a.Extends[0]}else{return null}}function m(t,r){var s=window.document.getElementById("sap-ui-theme-"+r);if(!s){return false}var n=window.getComputedStyle(s,":after");var h=n?n.getPropertyValue("content"):null;if(!h&&e.browser.safari){var o=document.documentElement;o.classList.add("sapUiThemeDesignerCustomCss");h=window.getComputedStyle(o,":after").getPropertyValue("content");o.classList.remove("sapUiThemeDesignerCustomCss")}if(h&&h!=="none"){try{if(h[0]==="'"||h[0]==='"'){h=h.substring(1,h.length-1)}return h==="true"}catch(e){a.error("Custom check: Error parsing JSON string for custom.css indication.",e)}}var l=s.sheet?i(s.sheet):null;if(!l||l.length===0){a.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+r);return false}for(var u=0;u<2&&u<l.length;u++){if(t._CUSTOMCSSCHECK.test(l[u].selectorText)){return true}}return false}function d(e){this._iCount++;var t=this._iCount>n;if(!u(this)&&!t){var r;if(this._iCount<=100){r=2}else if(this._iCount<=110){r=500}else{r=1e3}this._sThemeCheckId=setTimeout(d.bind(this),r)}else if(!e){l(this);h.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(t){a.error("ThemeCheck: max. check cycles reached.")}}else{h.themeLoaded=true}}return h});