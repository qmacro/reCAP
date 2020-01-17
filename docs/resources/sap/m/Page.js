/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/m/Title","sap/m/Button","sap/m/Bar","sap/m/TitleAlignmentMixin","sap/ui/core/ContextMenuSupport","sap/ui/core/util/ResponsivePaddingsEnablement","sap/ui/core/library","sap/ui/Device","sap/ui/core/Element","./TitlePropagationSupport","./PageRenderer","sap/ui/thirdparty/jquery"],function(t,e,o,n,r,a,i,s,l,p,u,g,h,d,f){"use strict";var c=p.AccessibleLandmarkRole;var y=t.ButtonType;var _=t.PageBackgroundDesign;var v=p.TitleLevel;var B=t.TitleAlignment;var T="div";var m="header";var C="footer";var H=e.extend("sap.m.Page",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:v.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},navButtonText:{type:"string",group:"Misc",defaultValue:null,deprecated:true},navButtonTooltip:{type:"string",group:"Misc",defaultValue:null},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null,deprecated:true},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:_.Standard},navButtonType:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:y.Back,deprecated:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true},contentOnlyBusy:{type:"boolean",group:"Appearance",defaultValue:false},floatingFooter:{type:"boolean",group:"Appearance",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:B.Auto}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.m.IBar",multiple:false},footer:{type:"sap.m.IBar",multiple:false},subHeader:{type:"sap.m.IBar",multiple:false},headerContent:{type:"sap.ui.core.Control",multiple:true,singularName:"headerContent",forwarding:{getter:"_getInternalHeader",aggregation:"contentRight"}},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false},_internalHeader:{type:"sap.m.IBar",multiple:false,visibility:"hidden"}},events:{navButtonTap:{deprecated:true},navButtonPress:{}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/Page.designtime"}});s.apply(H.prototype);l.call(H.prototype,{header:{suffix:"intHeader"},subHeader:{selector:".sapMPageSubHeader .sapMIBar"},content:{suffix:"cont"},footer:{selector:".sapMPageFooter:not(.sapMPageFloatingFooter) .sapMIBar"},floatingFooter:{selector:".sapMPageFloatingFooter.sapMPageFooter"}});h.call(H.prototype,"content",function(){return this._headerTitle?this._headerTitle.getId():false});H.FOOTER_ANIMATION_DURATION=350;H.prototype.init=function(){this._initTitlePropagationSupport();this._initResponsivePaddingsEnablement()};H.prototype._hasScrolling=function(){return this.getEnableScrolling()};H.prototype.onBeforeRendering=function(){if(this._oScroller&&!this._hasScrolling()){this._oScroller.destroy();this._oScroller=null}else if(this._hasScrolling()&&!this._oScroller){this._oScroller=new o(this,null,{scrollContainerId:this.getId()+"-cont",horizontal:false,vertical:true})}if(this._headerTitle){this._headerTitle.setLevel(this.getTitleLevel())}};H.prototype.onAfterRendering=function(){setTimeout(this._adjustFooterWidth.bind(this),10)};H.prototype.exit=function(){if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null}if(this._navBtn){this._navBtn.destroy();this._navBtn=null}if(this._appIcon){this._appIcon.destroy();this._appIcon=null}};H.prototype.setBackgroundDesign=function(t){var e=this.getBackgroundDesign();this.setProperty("backgroundDesign",t,true);this.$().removeClass("sapMPageBg"+e).addClass("sapMPageBg"+this.getBackgroundDesign());return this};H.prototype.setTitle=function(t){var e=!this._headerTitle;this._headerTitle=this._headerTitle||new n(this.getId()+"-title",{level:this.getTitleLevel()});this._headerTitle.setText(t);if(e){this._updateHeaderContent(this._headerTitle,"middle",0)}this.setProperty("title",t,true);return this};H.prototype._ensureNavButton=function(){var t=this.getNavButtonTooltip()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT");if(!this._navBtn){var e=this.getNavButtonType();this._navBtn=new r(this.getId()+"-navButton",{press:f.proxy(function(){this.fireNavButtonPress();this.fireNavButtonTap()},this)});if(u.os.android&&e==y.Back){this._navBtn.setType(y.Up)}else{this._navBtn.setType(e)}}this._navBtn.setTooltip(t)};H.prototype.setShowNavButton=function(t){var e=!!this.getShowNavButton();if(t===e){return this}this.setProperty("showNavButton",t,true);if(t){this._ensureNavButton();if(this._appIcon){this._updateHeaderContent(this._appIcon,"left",-1)}this._updateHeaderContent(this._navBtn,"left",0)}else if(this._navBtn){this._updateHeaderContent(this._navBtn,"left",-1)}return this};H.prototype.setShowFooter=function(t){if(this.getDomRef()){t?this.$().addClass("sapMPageWithFooter"):this.$().removeClass("sapMPageWithFooter")}var e=f(this.getDomRef()).find(".sapMPageFooter").last(),o=sap.ui.getCore().getConfiguration().getAnimation();if(!this.getFloatingFooter()){this.setProperty("showFooter",t);return this}this.setProperty("showFooter",t,true);e.removeClass("sapUiHidden");e.toggleClass("sapMPageFooterControlShow",t);e.toggleClass("sapMPageFooterControlHide",!t);if(t){return this}if(o){setTimeout(function(){e.toggleClass("sapUiHidden",!t)},H.FOOTER_ANIMATION_DURATION)}else{e.toggleClass("sapUiHidden",!t)}return this};H.prototype.setNavButtonType=function(t){this._ensureNavButton();if(!u.os.ios&&t==y.Back){this._navBtn.setType(y.Up)}else{this._navBtn.setType(t)}this.setProperty("navButtonType",t,true);return this};H.prototype.setNavButtonText=function(t){this._ensureNavButton();this.setProperty("navButtonText",t,true);return this};H.prototype.setNavButtonTooltip=function(t){this.setProperty("navButtonTooltip",t,true);this._ensureNavButton();return this};H.prototype.setIcon=function(t){var e=this.getIcon();if(e===t){return this}this.setProperty("icon",t,true);return this};H.prototype._adjustFooterWidth=function(){var t=sap.ui.getCore().getConfiguration().getRTL()?"left":"right";if(!this.getShowFooter()||!this.getFloatingFooter()||!this.getFooter()){return}var e=f(this.getDomRef()).find(".sapMPageFooter").last();if(this._contentHasScroll()){e.css(t,f.position.scrollbarWidth()+"px");e.css("width","initial")}else{e.css(t,0);e.css("width","")}};H.prototype._contentHasScroll=function(){var t=f(document.getElementById(this.getId()+"-cont"));return t[0].scrollHeight>t.innerHeight()};H.prototype._updateHeaderContent=function(t,e,o){var n=this._getInternalHeader();if(n){switch(e){case"left":if(o==-1){if(n.getContentLeft()){n.removeContentLeft(t)}}else{if(n.indexOfContentLeft(t)!=o){n.insertContentLeft(t,o);n.invalidate()}}break;case"middle":if(o==-1){if(n.getContentMiddle()){n.removeContentMiddle(t)}}else{if(n.indexOfContentMiddle(t)!=o){n.insertContentMiddle(t,o);n.invalidate()}}break;case"right":if(o==-1){if(n.getContentRight()){n.removeContentRight(t)}}else{if(n.indexOfContentRight(t)!=o){n.insertContentRight(t,o);n.invalidate()}}break;default:break}}};H.prototype._getInternalHeader=function(){var t=this.getAggregation("_internalHeader");if(!t){this.setAggregation("_internalHeader",new a(this.getId()+"-intHeader"),true);t=this.getAggregation("_internalHeader");this._setupBarTitleAlignment(t,this.getId()+"_internalHeader");if(this.getShowNavButton()&&this._navBtn){this._updateHeaderContent(this._navBtn,"left",0)}if(this.getTitle()&&this._headerTitle){this._updateHeaderContent(this._headerTitle,"middle",0)}}return t};H.prototype._getAnyHeader=function(){var t=this.getCustomHeader();if(t){return t.addStyleClass("sapMPageHeader")}return this._getInternalHeader().addStyleClass("sapMPageHeader")};H.prototype.getScrollDelegate=function(){return this._oScroller};H.prototype._formatLandmarkInfo=function(t,e){if(t){var o=t["get"+e+"Role"]()||"",n=t["get"+e+"Label"]()||"";if(o===c.None){o=""}return{role:o.toLowerCase(),label:n}}return{}};H.prototype._getHeaderTag=function(t){if(t&&t.getHeaderRole()!==c.None){return T}return m};H.prototype._getSubHeaderTag=function(t){if(t&&t.getSubHeaderRole()!==c.None){return T}return m};H.prototype._getFooterTag=function(t){if(t&&t.getFooterRole()!==c.None){return T}return C};H.prototype.scrollTo=function(t,e){if(this._oScroller){this._oScroller.scrollTo(0,t,e)}return this};H.prototype.scrollToElement=function(t,e,o){if(t instanceof g){t=t.getDomRef()}if(this._oScroller){this._oScroller.scrollToElement(t,e,o)}return this};H.prototype.setContentOnlyBusy=function(t){this.setProperty("contentOnlyBusy",t,true);this.$().toggleClass("sapMPageBusyCoversAll",!t);return this};H.prototype.setBusy=function(){this._sBusySection=this.getContentOnlyBusy()?"cont":null;return e.prototype.setBusy.apply(this,arguments)};H.prototype.setCustomHeader=function(t){this.setAggregation("customHeader",t);this.toggleStyleClass("sapFShellBar-CTX",t&&t.isA("sap.f.ShellBar"));if(t&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{parent:this,adaptableContent:t})}return this};H.prototype._getAdaptableContent=function(){return this._getAnyHeader()};i.mixInto(H.prototype);return H});