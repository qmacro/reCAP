/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t,r){"use strict";var i=e.FacetFilterType;var a={};a.render=function(e,t){switch(t.getType()){case i.Simple:a.renderSimpleFlow(e,t);break;case i.Light:a.renderSummaryBar(e,t);break}};a.renderSimpleFlow=function(e,r){e.write("<div");e.writeControlData(r);e.addClass("sapMFF");e.writeAccessibilityState(r,{role:"toolbar"});if(r.getShowSummaryBar()){e.write(">");a.renderSummaryBar(e,r)}else{if(r._lastScrolling){e.addClass("sapMFFScrolling")}else{e.addClass("sapMFFNoScrolling")}if(r.getShowReset()){e.addClass("sapMFFResetSpacer")}e.writeClasses();e.write(">");if(t.system.desktop){e.renderControl(r._getScrollingArrow("left"))}e.write("<div");e.writeAttribute("id",r.getId()+"-head");e.addClass("sapMFFHead");e.writeClasses();e.write(">");a.renderFacetFilterListButtons(r,e);if(r.getShowPersonalization()){e.renderControl(r.getAggregation("addFacetButton"))}e.write("</div>");if(t.system.desktop){e.renderControl(r._getScrollingArrow("right"))}if(r.getShowReset()){e.write("<div");e.addClass("sapMFFResetDiv");e.writeClasses();e.write(">");e.renderControl(r.getAggregation("resetButton"));e.write("</div>")}}e.write("</div>")};a.renderSummaryBar=function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapMFF");e.writeClasses();e.write(">");e.renderControl(t.getAggregation("summaryBar"));e.write("</div>")};a.getAriaAnnouncement=function(e,t){return r.getStaticId("sap.m",t||"FACETFILTER_"+e.toUpperCase())};a.getAriaDescribedBy=function(e){var t=[];if(e.getShowPersonalization()){t.push(this.getAriaAnnouncement("ARIA_REMOVE"))}t=t.concat(e._aAriaPositionTextIds);return t.join(" ")};a.getAccessibilityState=function(e){return{describedby:{value:this.getAriaDescribedBy(e),append:true}}};a.renderFacetFilterListButtons=function(e,t){var i=e._getSequencedLists(),s=i.length,n,o,d,l,g=[],c=[],u=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FACETFILTER_ARIA_FACET_FILTER"),A=this.getAriaAnnouncement("ARIA_REMOVE");for(o=0;o<s;o++){var w=i[o].getItems().length>0,F=i[o].getActive(),p=e._bCheckForAddListBtn&&(w||F);if(!e._bCheckForAddListBtn||p){n=e._getButtonForList(i[o]);g=n.removeAllAriaDescribedBy();g.forEach(C);d=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FACETFILTERLIST_ARIA_POSITION",[o+1,s]);l=new r({text:u+" "+d}).toStatic();e._aOwnedLabels.push(l.getId());n.addAriaDescribedBy(l);c.push(l.getId());if(e.getShowPersonalization()){n.addAriaDescribedBy(a.getAriaAnnouncement("ARIA_REMOVE"))}t.renderControl(n);if(e.getShowPersonalization()){t.renderControl(e._getFacetRemoveIcon(i[o]))}}}e._aAriaPositionTextIds=c;function C(e){if(A!==e){var t=sap.ui.getCore().byId(e);if(t){t.destroy()}}}};return a},true);