/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/theming/Parameters","./FormLayoutRenderer","sap/base/Log"],function(e,t,r,a){"use strict";var n=e.extend(r);n.apiVersion=2;n.renderForm=function(e,r,a){var n=r.getSingleColumn();var i=16;var l=false;var o=0;var s=a.getFormContainers();var d=s.length;var f=0;var p;var c;var g=a.getToolbar();var u=a.getTitle();if(n){i=i/2;o=i}else{o=i/2;for(f=0;f<d;f++){c=this.getContainerData(r,s[f]);if(c&&c.getHalfGrid()){l=true;break}}}e.openStart("table",r).attr("role","presentation").attr("cellpadding","0").attr("cellspacing","0").style("border-collapse","collapse").style("table-layout","fixed").style("width","100%").class("sapUiGrid");this.addBackgroundClass(e,r);if(g){e.class("sapUiFormToolbar")}e.openEnd();e.openStart("colgroup").openEnd();e.voidStart("col").attr("span",o).voidEnd();if(l){e.voidStart("col").class("sapUiGridSpace").attr("span","1").voidEnd()}if(!n){e.voidStart("col").attr("span",o).voidEnd()}e.close("colgroup");e.openStart("tbody").openEnd();if(g||u){var v=i;if(l){v++}e.openStart("tr").class("sapUiGridTitle").openEnd();e.openStart("th").attr("colspan",v).openEnd();var E;if(!g){E=t.get("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize")}this.renderHeader(e,g,u,undefined,false,E,a.getId());e.close("th");e.close("tr")}f=0;var h;var m;while(f<d){p=s[f];p._checkProperties();if(p.isVisible()){c=this.getContainerData(r,p);if(c&&c.getHalfGrid()&&!n){h=s[f+1];m=undefined;if(h&&h.isVisible()){m=this.getContainerData(r,h)}if(m&&m.getHalfGrid()){h._checkProperties();this.renderContainerHalfSize(e,r,p,h,i);f++}else{this.renderContainerHalfSize(e,r,p,undefined,i)}}else{this.renderContainerFullSize(e,r,p,i,l)}}f++}e.close("tbody");e.close("table")};n.renderContainerFullSize=function(e,t,r,a,n){var i=r.getExpandable();var l=r.getTooltip_AsString();var o=r.getToolbar();var s=r.getTitle();if(o||s){var d=a;if(n){d++}e.openStart("tr").class("sapUiGridConteinerFirstRow").class("sapUiGridConteinerHeaderRow").openEnd();e.openStart("td").attr("colspan",d);e.class("sapUiGridHeader");if(l){e.attr("title",l)}if(o){e.class("sapUiFormContainerToolbar")}else if(s){e.class("sapUiFormContainerTitle")}e.openEnd();this.renderHeader(e,o,r.getTitle(),r._oExpandButton,i,false,r.getId());e.close("td");e.close("tr")}if(!i||r.getExpanded()){var f=r.getFormElements();var p;var c=[];var g;var u=false;for(var v=0,E=f.length;v<E;v++){p=f[v];if(p.isVisible()){g=c[0]&&c[0][0]==a;if(!this.checkFullSizeElement(t,p)&&c[0]!="full"&&!g){e.openStart("tr",p);e.class("sapUiFormElement")}else{e.openStart("tr")}if(!u){u=true;if(!o&&!s){e.class("sapUiGridConteinerFirstRow")}}e.openEnd();if(!g){c=this.renderElement(e,t,p,false,a,n,c)}else{c.splice(0,1)}e.close("tr");if(c[0]=="full"||g){v=v-1}}}if(c.length>0){for(var h=0;h<c.length;h++){e.openStart("tr").openEnd().close("tr")}}}};n.renderContainerHalfSize=function(e,t,r,a,n){var i=n/2;var l=r.getExpandable();var o=r.getTooltip_AsString();var s;var d=r.getTitle();var f;var p=r.getToolbar();var c;var g=[];if(!l||r.getExpanded()){g=r.getFormElements()}var u=g.length;var v=[];var E=0;var h=false;if(a){h=a.getExpandable();s=a.getTooltip_AsString();f=a.getTitle();c=a.getToolbar();if(!h||a.getExpanded()){v=a.getFormElements()}E=v.length}if(d||f||p||c){e.openStart("tr").class("sapUiGridConteinerFirstRow").class("sapUiGridConteinerHeaderRow").openEnd();e.openStart("td").attr("colspan",i);e.class("sapUiGridHeader");if(o){e.attr("title",o)}if(p){e.class("sapUiFormContainerToolbar")}else if(d){e.class("sapUiFormContainerTitle")}e.openEnd();if(r){this.renderHeader(e,p,d,r._oExpandButton,l,false,r.getId())}e.close("td");e.openStart("td").openEnd().close("td");e.openStart("td").attr("colspan",i);e.class("sapUiGridHeader");if(s){e.attr("title",s)}if(c){e.class("sapUiFormContainerToolbar")}else if(f){e.class("sapUiFormContainerTitle")}e.openEnd();if(a){this.renderHeader(e,c,f,a._oExpandButton,h,false,a.getId())}e.close("td");e.close("tr")}if(!l||r.getExpanded()||(!h||a.getExpanded())){var m=[],S=[];var C=0,F=0;var b;var T;var U;var G;var H=false;while(C<u||F<E){b=g[C];T=v[F];U=m[0]&&m[0][0]==i;G=S[0]&&S[0][0]==i;if(b&&b.isVisible()||T&&T.isVisible()||U||G){e.openStart("tr");if(!H){H=true;if(!p&&!d&&!c&&!f){e.class("sapUiGridConteinerFirstRow")}}e.openEnd();if(!U){if(b&&b.isVisible()&&(!l||r.getExpanded())){m=this.renderElement(e,t,b,true,i,false,m)}else{e.openStart("td").attr("colspan",i).openEnd().close("td")}if(m[0]!="full"){C++}}else{if(m[0][2]>0){e.openStart("td").attr("colspan",m[0][2]).openEnd().close("td")}m.splice(0,1)}e.openStart("td").openEnd().close("td");if(!G){if(T&&T.isVisible()&&(!h||a.getExpanded())){S=this.renderElement(e,t,T,true,i,false,S)}else{e.openStart("td").attr("colspan",i).openEnd().close("td")}if(S[0]!="full"){F++}}else{if(S[0][2]>0){e.openStart("td").attr("colspan",S[0][2]).openEnd().close("td")}S.splice(0,1)}e.close("tr")}else{C++;F++}}if(m.length>0||S.length>0){for(var y=0;y<m.length||y<S.length;y++){e.openStart("tr").openEnd().close("tr")}}}};n.renderElement=function(e,t,r,n,i,l,o){var s=r.getLabelControl();var d=0;var f=r.getFieldsForRendering();var p=0;var c=0;var g=false;var u=1;var v=1;var E=0;if(this.checkFullSizeElement(t,r)){if(o.length>0&&o[0]!="full"){a.error('Element "'+r.getId()+'" - Too much fields for one row!',"Renderer","GridLayout");return o}if(l){i=i+1}if(s&&o[0]!="full"){e.openStart("td").attr("colspan",i).class("sapUiFormElementLbl").class("sapUiGridLabelFull").openEnd();e.renderControl(s);e.close("td");return["full"]}else{o.splice(0,1);v=this.getElementData(t,f[0]).getVCells();e.openStart("td").attr("colspan",i);if(v>1&&n){e.attr("rowspan",v);for(E=0;E<v-1;E++){o.push([i,undefined,false])}}e.openEnd();e.renderControl(f[0]);e.close("td");return o}}if(o.length>0&&o[0][0]>0){i=i-o[0][0]+o[0][2];g=o[0][1];d=o[0][2];o.splice(0,1)}var h=d;var m;var S="";if(s||d>0){h=3;if(s&&d==0){m=this.getElementData(t,s);if(m){S=m.getHCells();if(S!="auto"&&S!="full"){h=parseInt(S)}}}e.openStart("td").attr("colspan",h).class("sapUiFormElementLbl").openEnd();if(s){e.renderControl(s)}i=i-h;e.close("td")}if(f&&f.length>0){var C=i;var F=f.length;var b;var T=0;var U=0;for(T=0,U=f.length;T<U;T++){b=f[T];m=this.getElementData(t,b);if(m&&m.getHCells()!="auto"){C=C-parseInt(m.getHCells());F=F-1}}var G=0;for(T=0,G=0,U=f.length;T<U;T++){b=f[T];m=this.getElementData(t,b);S="auto";u=1;v=1;if(m){S=m.getHCells();v=m.getVCells()}if(S=="auto"){if(C>0){u=Math.floor(C/F);if(u<1){u=1}G++;c=c+u;if(G==F&&C>c){u=u+(C-c)}}else{u=1}}else{u=parseInt(S)}p=p+u;if(p>i){a.error('Element "'+r.getId()+'" - Too much fields for one row!',"Renderer","GridLayout");p=p-u;break}if(v>1){for(E=0;E<v-1;E++){if(s){d=h}if(o.length>E){o[E][0]=o[E][0]+u;o[E][2]=d}else{o.push([h+u,undefined,d])}}}if(l&&p>=Math.floor(i/2)&&!g){u=u+1;g=true;if(v>1){for(E=0;E<v-1;E++){o[E][1]=true}}}e.openStart("td");if(u>1){e.attr("colspan",u)}if(v>1){e.attr("rowspan",v)}e.openEnd();e.renderControl(b);e.close("td")}}if(p<i){var H=i-p;if(!n&&l&&!g){H++}e.openStart("td").attr("colspan",H).openEnd().close("td")}return o};n.checkFullSizeElement=function(e,t){var r=t.getFieldsForRendering();if(r.length==1&&this.getElementData(e,r[0])&&this.getElementData(e,r[0]).getHCells()=="full"){return true}else{return false}};n.getContainerData=function(e,t){return e.getLayoutDataForElement(t,"sap.ui.layout.form.GridContainerData")};n.getElementData=function(e,t){return e.getLayoutDataForElement(t,"sap.ui.layout.form.GridElementData")};return n},true);