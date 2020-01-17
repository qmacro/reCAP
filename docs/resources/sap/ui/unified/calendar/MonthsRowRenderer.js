/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/CalendarLegendRenderer","sap/ui/unified/library","sap/base/Log"],function(e,t,a,n,r){"use strict";var s=n.CalendarDayType;var o={apiVersion:2};o.render=function(e,t){var a=t._getStartDate();var n=t.getTooltip_AsString();var r=t.getId();var s={value:r+"-Descr",append:true};e.openStart("div",t);e.class("sapUiCalMonthsRow");e.class("sapUiCalRow");if(n){e.attr("title",n)}e.accessibilityState(t,{role:"grid",readonly:"true",multiselectable:!t.getSingleSelection()||t.getIntervalSelection(),labelledby:s});e.openEnd();e.openStart("span",r+"-Descr");e.style("display","none");e.openEnd();e.text(t._rb.getText("CALENDAR_DIALOG"));e.close("span");if(t.getIntervalSelection()){e.openStart("span",r+"-Start");e.style("display","none");e.openEnd();e.text(t._rb.getText("CALENDAR_START_MONTH"));e.close("span");e.openStart("span",r+"-End");e.style("display","none");e.openEnd();e.text(t._rb.getText("CALENDAR_END_MONTH"));e.close("span")}this.renderRow(e,t,a);e.close("div")};o.renderRow=function(e,t,a){var n=t.getId();this.renderHeader(e,t,a);e.openStart("div",n+"-months");e.class("sapUiCalItems");e.attr("role","row");e.openEnd();this.renderMonths(e,t,a);e.close("div")};o.renderHeader=function(t,a,n){e._checkCalendarDate(n);if(a._getShowHeader()){var r=a._getLocaleData();var s=a.getId();t.openStart("div",s+"-Head");t.openEnd();this.renderHeaderLine(t,a,r,n);t.close("div")}};o.renderHeaderLine=function(a,n,r,s){e._checkCalendarDate(s);var o=n.getId();var i=n.getMonths();var l=new t(s);var d="";var c=0;var p=[];var g=0;for(g=0;g<i;g++){c=l.getYear();if(p.length>0&&p[p.length-1].iYear==c){p[p.length-1].iMonths++}else{p.push({iYear:c,iMonths:1})}l.setMonth(l.getMonth()+1)}for(g=0;g<p.length;g++){var h=p[g];d=100/i*h.iMonths+"%";a.openStart("div",o+"-Head"+g);a.class("sapUiCalHeadText");a.style("width",d);a.openEnd();a.text(h.iYear);a.close("div")}};o.renderMonths=function(e,a,n){var r=this.getHelper(a,n);var s=a.getMonths();var o=100/s+"%";var i=new t(n);i.setDate(1);for(var l=0;l<s;l++){this.renderMonth(e,a,i,r,o);i.setMonth(i.getMonth()+1)}};o.getHelper=function(a,n){e._checkCalendarDate(n);var s={};s.sLocale=a._getLocale();s.oLocaleData=a._getLocaleData();s.oToday=new t;s.sCurrentMonth=a._rb.getText("CALENDAR_CURRENT_MONTH");s.sId=a.getId();s.oFormatLong=a._getFormatLong();if(a._bLongMonth||!a._bNamesLengthChecked){s.aMonthNames=s.oLocaleData.getMonthsStandAlone("wide")}else{s.aMonthNames=s.oLocaleData.getMonthsStandAlone("abbreviated");s.aMonthNamesWide=s.oLocaleData.getMonthsStandAlone("wide")}var o=a.getLegend();if(o){var i=sap.ui.getCore().byId(o);if(i){if(!(i instanceof sap.ui.unified.CalendarLegend)){throw new Error(i+" is not an sap.ui.unified.CalendarLegend. "+a)}s.oLegend=i}else{r.warning("CalendarLegend "+o+" does not exist!",a)}}return s};o.renderMonth=function(t,n,r,o,i){e._checkCalendarDate(r);var l={role:n._getAriaRole(),selected:false,label:"",describedby:""};if(!n._bLongMonth&&n._bNamesLengthChecked){l["label"]=o.aMonthNamesWide[r.getMonth()]}var d=n._oFormatYyyymm.format(r.toUTCJSDate(),true);var c=n._checkDateSelected(r);var p=n._getDateType(r);var g=n._checkMonthEnabled(r);t.openStart("div",o.sId+"-"+d);t.class("sapUiCalItem");if(i){t.style("width",i)}if(e._isSameMonthAndYear(r,o.oToday)){t.class("sapUiCalItemNow");l["label"]=o.sCurrentMonth+" "}if(c>0){t.class("sapUiCalItemSel");l["selected"]=true}if(c==2){t.class("sapUiCalItemSelStart");l["describedby"]=l["describedby"]+" "+o.sId+"-Start"}else if(c==3){t.class("sapUiCalItemSelEnd");l["describedby"]=l["describedby"]+" "+o.sId+"-End"}else if(c==4){t.class("sapUiCalItemSelBetween")}else if(c==5){t.class("sapUiCalItemSelStart");t.class("sapUiCalItemSelEnd");l["describedby"]=l["describedby"]+" "+o.sId+"-Start";l["describedby"]=l["describedby"]+" "+o.sId+"-End"}if(p&&p.type!=s.None){t.class("sapUiCalItem"+p.type);if(p.tooltip){t.attr("title",p.tooltip)}}if(!g){t.class("sapUiCalItemDsbl");l["disabled"]=true}t.attr("tabindex","-1");t.attr("data-sap-month",d);l["label"]=l["label"]+o.oFormatLong.format(r.toUTCJSDate(),true);if(p&&p.type!=s.None){a.addCalendarTypeAccInfo(l,p.type,o.oLegend)}t.accessibilityState(null,l);t.openEnd();t.openStart("span");t.class("sapUiCalItemText");t.openEnd();t.text(o.aMonthNames[r.getMonth()]);t.close("span");t.close("div")};return o},true);