/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/thirdparty/jquery"],function(e,t,i){"use strict";var r=e.GenericTileScope;var s=e.LoadState;var a={};a.render=function(e,i){var a=i._getTooltipText(),d=i._isScreenLarge(),n=i._getAriaText(),o=t("sapMGTScope"+i.getScope()),l=i.hasListeners("press");this._bRTL=sap.ui.getCore().getConfiguration().getRTL();e.write("<span");e.writeControlData(i);e.writeAttributeEscaped("aria-label",n);if(l){e.writeAttribute("role","button")}else{e.writeAttribute("role","presentation")}e.addClass("sapMGT");e.addClass(o);e.addClass("sapMGTLineMode");this._writeDirection(e);if(a){e.writeAttributeEscaped("title",a)}var p=i.getState();if(p!==s.Disabled){e.addClass("sapMPointer");e.writeAttribute("tabindex","0")}else{e.addClass("sapMGTDisabled")}if(p===s.Failed){e.addClass("sapMGTFailed")}e.writeClasses();e.write(">");if(d){e.write("<div");e.writeAttribute("id",i.getId()+"-startMarker");e.addClass("sapMGTStartMarker");e.writeClasses();e.write("></div>");this._renderFailedIcon(e,i);this._renderHeader(e,i);if(i.getSubheader()){this._renderSubheader(e,i)}e.write("<div");e.writeAttribute("id",i.getId()+"-endMarker");e.addClass("sapMGTEndMarker");e.writeClasses();e.write(">");if(i.getScope()===r.Actions){this._renderActionsScope(e,i)}e.write("</div>");e.write("<div");e.writeAttribute("id",i.getId()+"-styleHelper");e.addClass("sapMGTStyleHelper");e.writeClasses();e.write("></div>")}else{if(i.getState()!==s.Disabled){this._renderFocusDiv(e,i)}e.write("<div");e.writeAttribute("id",i.getId()+"-touchArea");e.addClass("sapMGTTouchArea");e.writeClasses();e.write(">");this._renderFailedIcon(e,i);e.write("<span");e.writeAttribute("id",i.getId()+"-lineModeHelpContainer");e.addClass("sapMGTLineModeHelpContainer");e.writeClasses();e.write(">");this._renderHeader(e,i);if(i.getSubheader()){this._renderSubheader(e,i)}e.write("</span>");if(i.getScope()===r.Actions){this._renderActionsScope(e,i)}e.write("</div>")}e.write("</span>")};a._writeDirection=function(e){if(this._bRTL){e.writeAttribute("dir","rtl")}};a._renderFailedIcon=function(e,t){if(t.getState()===s.Failed){if(t._isCompact()){t._oWarningIcon.setSize("1.25rem")}else{t._oWarningIcon.setSize("1.375rem")}e.renderControl(t._oWarningIcon.addStyleClass("sapMGTLineModeFailedIcon"))}};a._renderHeader=function(e,t){e.write("<span");this._writeDirection(e);e.addClass("sapMGTHdrTxt");e.writeClasses();e.writeAttribute("id",t.getId()+"-hdr-text");e.write(">");e.writeEscaped(t._oTitle.getText());e.write("</span>")};a._renderSubheader=function(e,t){e.write("<span");this._writeDirection(e);e.addClass("sapMGTSubHdrTxt");e.writeClasses();e.writeAttribute("id",t.getId()+"-subHdr-text");e.write(">");e.writeEscaped(t._oSubTitle.getText());e.write("</span>")};a._renderActionsScope=function(e,t){if(t.getState()!==s.Disabled){e.write("<span");e.writeAttribute("id",t.getId()+"-actions");e.addClass("sapMGTActionsContainer");e.writeClasses();e.write(">");e.renderControl(t._oMoreIcon);e.renderControl(t._oRemoveButton);e.write("</span>")}};a._updateHoverStyle=function(){var e=this.$("styleHelper"),t,r=0,s="";e.empty();if(!this._oStyleData||this.$().is(":hidden")){return}if(this._oStyleData.rtl){e.css("right",-this._oStyleData.positionRight)}else{e.css("left",-this._oStyleData.positionLeft)}for(r;r<this._oStyleData.lines.length;r++){t=this._oStyleData.lines[r];var a=i("<div class='sapMGTLineStyleHelper'><div class='sapMGTLineStyleHelperInner' /></div>");if(this._oStyleData.rtl){a.css("right",t.offset.x+"px")}else{a.css("left",t.offset.x+"px")}a.css({top:t.offset.y+"px",width:t.width+"px",height:t.height});s+=a.get(0).outerHTML.trim()}e.html(s)};a._renderFocusDiv=function(e,t){e.write("<div");e.writeAttribute("id",t.getId()+"-focus");e.addClass("sapMGTFocusDiv");e.writeClasses();e.write(">");e.write("</div>")};a._getCSSPixelValue=function(e,t){var r=e instanceof i?e:e.$(),s=(r.css(t)||"").match(/([^a-zA-Z\%]*)(.*)/),a=parseFloat(s[1]),d=s[2];return d==="px"?a:a*16};return a},true);