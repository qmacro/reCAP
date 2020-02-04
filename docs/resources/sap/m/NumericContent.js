/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/ResizeHandler","sap/m/Image","./NumericContentRenderer","sap/ui/events/KeyCodes","sap/base/util/deepEqual"],function(e,t,i,a,o,n,r,s){"use strict";var p={ar:4,ar_eg:4,ar_sa:4,bg:4,ca:6,cs:4,da:4,de:8,de_at:8,de_ch:8,el:4,el_cy:4,en:4,en_au:4,en_gb:4,en_hk:4,en_ie:4,en_in:4,en_nz:4,en_pg:4,en_sg:4,en_us:4,en_za:4,es:6,es_ar:4,es_bo:4,es_cl:4,es_co:4,es_mx:6,es_pe:4,es_uy:4,es_ve:4,et:4,fa:4,fi:4,fr:4,fr_be:4,fr_ca:4,fr_ch:4,fr_lu:4,he:4,hi:4,hr:4,hu:4,id:4,it:8,it_ch:8,ja:6,kk:4,ko:6,lt:4,lv:4,ms:4,nb:4,nl:4,nl_be:4,pl:4,pt:4,pt_pt:4,ro:4,ru:4,ru_ua:4,sk:4,sl:4,sr:4,sv:4,th:4,tr:4,uk:4,vi:4,zh_cn:6,zh_hk:6,zh_sg:6,zh_tw:6};var l=t.extend("sap.m.NumericContent",{metadata:{library:"sap.m",properties:{animateTextChange:{type:"boolean",group:"Behavior",defaultValue:true},formatterValue:{type:"boolean",group:"Data",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconDescription:{type:"string",group:"Accessibility",defaultValue:null},indicator:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},nullifyValue:{type:"boolean",group:"Behavior",defaultValue:true},scale:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto"},truncateValueTo:{type:"int",group:"Appearance"},value:{type:"string",group:"Data",defaultValue:null},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},withMargin:{type:"boolean",group:"Appearance",defaultValue:true},state:{type:"sap.m.LoadState",group:"Behavior",defaultValue:"Loaded"},adaptiveFontSize:{type:"boolean",group:"Appearance",defaultValue:true}},events:{press:{}}}});l.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setTooltip("{AltText}");sap.ui.getCore().attachInit(this._registerResizeHandler.bind(this))};l.prototype._getParentTile=function(){var e=this.getParent();while(e){if(e.isA("sap.m.GenericTile")){return e}e=e.getParent()}return null};l.prototype._getMaxDigitsData=function(){var e=null,t=sap.ui.getCore().getConfiguration().getLanguage().toLowerCase(),i=p[t]||4;if(this.getAdaptiveFontSize()){switch(i){case 6:e="sapMNCMediumFontSize";break;case 8:e="sapMNCSmallFontSize";break;default:e="sapMNCLargeFontSize";break}}else{e="sapMNCLargeFontSize";i=4}return{fontClass:e,maxLength:i}};l.prototype._registerResizeHandler=function(){a.register(this,this.invalidate.bind(this))};l.prototype.onBeforeRendering=function(){this.$().unbind("mouseenter");this.$().unbind("mouseleave");this._iMaxLength=null};l.prototype.onAfterRendering=function(){this.$().bind("mouseenter",this._addTooltip.bind(this));this.$().bind("mouseleave",this._removeTooltip.bind(this));if(!sap.ui.getCore().isThemeApplied()){sap.ui.getCore().attachThemeChanged(this._checkIfIconFits,this)}else{this._checkIfIconFits()}};l.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};l.prototype._checkIfIconFits=function(){var e=this._getParentTile();if(e&&(e.isA("sap.m.GenericTile")||e.isA("sap.m.SlideTile"))){e._setupResizeClassHandler()}var t=this.$("icon-image"),i=this.$("value-inner"),a=this.$("value-scr");var o=t.outerWidth()+i.width(),n=a.width();o>n?t.hide():t.show()};l.prototype._removeTooltip=function(){this.$().attr("title",null)};l.prototype.exit=function(){if(this._oIcon){this._oIcon.destroy()}};l.prototype.getAltText=function(){var t=this.getValue();var i=this.getScale();var a;var o=this._rb.getText(("SEMANTIC_COLOR_"+this.getValueColor()).toUpperCase());var n="";if(this.getNullifyValue()){a="0"}else{a=""}if(this.getIconDescription()){n=n.concat(this.getIconDescription());n=n.concat("\n")}if(t){n=n.concat(t+i)}else{n=n.concat(a)}n=n.concat("\n");if(this.getIndicator()&&this.getIndicator()!==e.DeviationIndicator.None){n=n.concat(this._rb.getText(("NUMERICCONTENT_DEVIATION_"+this.getIndicator()).toUpperCase()));n=n.concat("\n")}n=n.concat(o);return n};l.prototype.getTooltip_AsString=function(){var e=this.getTooltip();var t=this.getAltText();if(typeof e==="string"||e instanceof String){t=e.split("{AltText}").join(t).split("((AltText))").join(t);return t}if(e){return e}else{return""}};l.prototype.setIcon=function(e){var t=!s(this.getIcon(),e);if(t){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined}if(e){this._oIcon=i.createControlByURI({id:this.getId()+"-icon-image",src:e},o)}}this._setPointerOnIcon();return this.setProperty("icon",e)};l.prototype._setPointerOnIcon=function(){if(this._oIcon&&this.hasListeners("press")){this._oIcon.addStyleClass("sapMPointer")}else if(this._oIcon&&this._oIcon.hasStyleClass("sapMPointer")){this._oIcon.removeStyleClass("sapMPointer")}};l.prototype.ontap=function(e){this.$().focus();this.firePress();e.preventDefault()};l.prototype.onkeyup=function(e){if(e.which===r.ENTER||e.which===r.SPACE){this.firePress();e.preventDefault()}};l.prototype.onkeydown=function(e){if(e.which===r.SPACE){e.preventDefault()}};l.prototype.attachEvent=function(e,i,a,o){t.prototype.attachEvent.call(this,e,i,a,o);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnIcon()}return this};l.prototype.detachEvent=function(e,i,a){t.prototype.detachEvent.call(this,e,i,a);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnIcon()}return this};l.prototype._parseFormattedValue=function(e){var t=e.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");return{scale:t.replace(/[+-., \d]*(.*)$/g,"$1").trim().replace(/\.$/,""),value:t.replace(/([+-., \d]*).*$/g,"$1").trim()}};return l});