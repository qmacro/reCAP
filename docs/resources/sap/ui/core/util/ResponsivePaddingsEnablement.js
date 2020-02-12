/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/base/Log","sap/ui/core/ResizeHandler","sap/ui/thirdparty/jquery"],function(i,e,n,r){"use strict";var s={S:599,M:1023,L:1439};var t={S:"sapUi-Std-PaddingS",M:"sapUi-Std-PaddingM",L:"sapUi-Std-PaddingL",XL:"sapUi-Std-PaddingXL"};var a=function(i){if(!this.isA||!this.isA("sap.ui.core.Control")){e.error("Responsive Paddings enablement could be applied over controls only");return}this._initResponsivePaddingsEnablement=function(){this.addEventDelegate({onAfterRendering:d,onBeforeRendering:a},this)};function a(){u(this)}function d(){var e=c(this,i);if(e.length){window.requestAnimationFrame(function(){o(this)}.bind(this))}}function o(i){f(i);if(!i.__iResponsivePaddingsResizeHandlerId__){i.__iResponsivePaddingsResizeHandlerId__=n.register(i,f.bind(i,i))}}function u(i){if(i.__iResponsivePaddingsResizeHandlerId__){n.deregister(i.__iResponsivePaddingsResizeHandlerId__);i.__iResponsivePaddingsResizeHandlerId__=null}}function f(e,n){var r=c(e,i);var s=l(e,r);var t=n?n.size.width:e.$().width();p(s);v(s,t)}function c(i,e){var n=_(e);n=n.filter(function(e){return i.hasStyleClass(e)});if(!n.length){return[]}n=n.map(function(i){return i.split("--")[1]});n=n.map(function(i){return e[i]}).filter(function(i){return i});return n}function l(i,e){var n=r();e.forEach(function(e){if(e.suffix){n=n.add(i.$(e.suffix))}if(e.selector){n=n.add(i.$().find(e.selector).first())}});return n}function p(i){var e=Object.keys(t).map(function(i){return t[i]}).join(" ");i.removeClass(e)}function v(i,e){var n;switch(true){case e<=s.S:n="S";break;case e<=s.M&&e>s.S:n="M";break;case e<=s.L&&e>s.M:n="L";break;default:n="XL";break}i.addClass(t[n])}function _(i){return Object.keys(i).map(function(i){return"sapUiResponsivePadding--"+i})}};return a});