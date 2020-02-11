/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./FormattedTextAnchorGenerator","./FormattedTextRenderer","sap/base/Log","sap/base/security/URLWhitelist","sap/base/security/sanitizeHTML"],function(e,t,s,r,a,i,n){"use strict";var l=e.LinkConversion;var o=t.extend("sap.m.FormattedText",{metadata:{library:"sap.m",properties:{htmlText:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:l.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}},aggregations:{controls:{type:"sap.m.Link",multiple:true,singularName:"control"}}}});var u={ATTRIBS:{style:1,class:1,"a::href":1,"a::target":1},ELEMENTS:{a:{cssClass:"sapMLnk"},abbr:1,blockquote:1,br:1,cite:1,code:1,em:1,h1:{cssClass:"sapMTitle sapMTitleStyleH1"},h2:{cssClass:"sapMTitle sapMTitleStyleH2"},h3:{cssClass:"sapMTitle sapMTitleStyleH3"},h4:{cssClass:"sapMTitle sapMTitleStyleH4"},h5:{cssClass:"sapMTitle sapMTitleStyleH5"},h6:{cssClass:"sapMTitle sapMTitleStyleH6"},p:1,pre:1,strong:1,span:1,u:1,dl:1,dt:1,dd:1,ol:1,ul:1,li:1}},p={ATTRIBS:{"a::href":1,"a::target":1},ELEMENTS:{a:{cssClass:"sapMLnk"},em:1,strong:1,u:1}};o.prototype._renderingRules=u;o.prototype.init=function(){};function c(e,t){var s;var r,n,l=e==="a";var o=this._renderingRules.ELEMENTS[e].cssClass||"";for(var u=0;u<t.length;u+=2){r=t[u];n=t[u+1];if(!this._renderingRules.ATTRIBS[r]&&!this._renderingRules.ATTRIBS[e+"::"+r]){s="FormattedText: <"+e+"> with attribute ["+r+'="'+n+'"] is not allowed';a.warning(s,this);t[u+1]=null;continue}if(r=="href"){if(!i.validate(n)){a.warning("FormattedText: incorrect href attribute:"+n,this);t[u+1]="#";l=false}}if(r=="target"){l=false}if(o&&r.toLowerCase()=="class"){t[u+1]=o+" "+n;o=""}}if(l){t.push("target");t.push("_blank")}if(o){t.push("class");t.push(o)}return t}function h(e,t){if(this._renderingRules.ELEMENTS[e]){return c.call(this,e,t)}else{var s="<"+e+"> is not allowed";a.warning(s,this)}}function g(e){return n(e,{tagPolicy:h.bind(this),uriRewriter:function(e){if(i.validate(e)){return e}}})}function T(e){var t=window.open();t.opener=null;t.location=e.currentTarget.href;e.preventDefault()}o.prototype.onAfterRendering=function(){this.$().find('a[target="_blank"]').on("click",T)};o.prototype._getDisplayHtml=function(){var t=this.getHtmlText(),r=this.getConvertLinksToAnchorTags();if(r===e.LinkConversion.None){return t}t=s.generateAnchors(t,r,this.getConvertedLinksDefaultTarget());return g.call(this,t)};o.prototype.setHtmlText=function(e){return this.setProperty("htmlText",g.call(this,e))};o.prototype._setUseLimitedRenderingRules=function(e){this._renderingRules=e?p:u};return o});