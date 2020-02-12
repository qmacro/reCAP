/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";var t={};t.render=function(t,r){var i=r.getWidth(),l=r.getHeight(),s=r.getAggregation("controls"),d=r._getDisplayHtml(),a=[],n="",o=0;t.write("<div");t.writeControlData(r);t.addClass("sapMFT");if(i){t.addClass("sapMFTOverflowWidth")}if(l){t.addClass("sapMFTOverflowHeight")}t.writeClasses();if(r.getTooltip_AsString()){t.writeAttributeEscaped("title",r.getTooltip_AsString())}t.addStyle("width",i||null);t.addStyle("height",l||null);t.writeStyles();t.write(">");while(d!==""&&d!==n){n=d.replace(/(?:\%\%(\d+))/,g)}if(d!==""){t.write(d)}t.write("</div>");function g(i,l,n){var g=i.length;t.write(d.substr(0,n));o+=n;if(s[l]!==undefined){if(a[l]===undefined){t.renderControl(s[l]);a[l]=o}else{e.error("Control with index '"+l+"' ("+i+", htmlText@"+o+") is already rendered (htmlText@"+a[l]+")!","sap.m.FormattedText:",r.getId())}}else{t.write(i);e.error("Missing control for placeholder '"+i+"' (htmlText@"+o+")!","sap.m.FormattedText:",r.getId())}d=d.substr(n+g);o+=g}};return t},true);