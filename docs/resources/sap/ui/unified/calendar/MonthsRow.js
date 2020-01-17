/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/LocaleData","sap/ui/core/delegate/ItemNavigation","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/library","sap/ui/core/format/DateFormat","sap/ui/core/library","sap/ui/core/Locale","./MonthsRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/unified/DateRange"],function(e,t,a,i,s,r,o,n,l,h,g,c,f){"use strict";var u=n.CalendarType;var p=e.extend("sap.ui.unified.calendar.MonthsRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});p.prototype.init=function(){this._oFormatYyyymm=o.getInstance({pattern:"yyyyMMdd",calendarType:u.Gregorian});this._oFormatLong=o.getInstance({pattern:"MMMM y"});this._mouseMoveProxy=c.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified")};p.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._sInvalidateMonths){clearTimeout(this._sInvalidateMonths)}};p.prototype.onAfterRendering=function(){d.call(this);U.call(this)};p.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!g(this.getDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){if(this._bMouseMove){k.call(this,true);b.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;w.call(this)}if(this._bMousedownChange){this._bMousedownChange=false;w.call(this)}}};p.prototype.invalidate=function(t){if(!this._bDateRangeChanged&&(!t||!(t instanceof f))){e.prototype.invalidate.apply(this,arguments)}else if(this.getDomRef()&&!this._sInvalidateMonths){if(this._bInvalidateSync){R.call(this)}else{this._sInvalidateMonths=setTimeout(R.bind(this),0)}}};p.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("selectedDates");return e};p.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("selectedDates");return e};p.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var e=this.removeAllAggregation("specialDates");return e};p.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var e=this.destroyAggregation("specialDates");return e};p.prototype.setDate=function(e){S.call(this,s.fromLocalJSDate(e),false);return this};p.prototype._setDate=function(e){var t=e.toLocalJSDate();this.setProperty("date",t,true);this._oDate=e};p.prototype._getDate=function(){if(!this._oDate){this._oDate=new s}return this._oDate};p.prototype.setStartDate=function(e){i._checkJSDateObject(e);var t,a,r;a=e.getFullYear();i._checkYearInValidRange(a);t=s.fromLocalJSDate(e);this.setProperty("startDate",e,true);this._oStartDate=t;this._oStartDate.setDate(1);if(this.getDomRef()){r=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(e);this._bNoRangeCheck=false;if(r&&this.checkDateFocusable(r)){this.setDate(r)}}return this};p.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=new s;this._oStartDate.setDate(1)}return this._oStartDate};p.prototype.displayDate=function(e){S.call(this,s.fromLocalJSDate(e),true);return this};p.prototype._getLocale=function(){var e=this.getParent();if(e&&e.getLocale){return e.getLocale()}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale};p.prototype._getLocaleData=function(){var e=this.getParent();if(e&&e._getLocaleData){return e._getLocaleData()}else if(!this._oLocaleData){var a=this._getLocale();var i=new l(a);this._oLocaleData=t.getInstance(i)}return this._oLocaleData};p.prototype._getFormatLong=function(){var e=this._getLocale();if(this._oFormatLong.oLocale.toString()!=e){var t=new l(e);this._oFormatLong=o.getInstance({style:"long"},t)}return this._oFormatLong};p.prototype.getIntervalSelection=function(){var e=this.getParent();if(e&&e.getIntervalSelection){return e.getIntervalSelection()}else{return this.getProperty("intervalSelection")}};p.prototype.getSingleSelection=function(){var e=this.getParent();if(e&&e.getSingleSelection){return e.getSingleSelection()}else{return this.getProperty("singleSelection")}};p.prototype.getSelectedDates=function(){var e=this.getParent();if(e&&e.getSelectedDates){return e.getSelectedDates()}else{return this.getAggregation("selectedDates",[])}};p.prototype.getSpecialDates=function(){var e=this.getParent();if(e&&e.getSpecialDates){return e.getSpecialDates()}else{return this.getAggregation("specialDates",[])}};p.prototype._getShowHeader=function(){var e=this.getParent();if(e&&e._getShowItemHeader){return e._getShowItemHeader()}else{return this.getProperty("showHeader")}};p.prototype.getAriaLabelledBy=function(){var e=this.getParent();if(e&&e.getAriaLabelledBy){return e.getAriaLabelledBy()}else{return this.getAssociation("ariaLabelledBy",[])}};p.prototype._setLegendControlOrigin=function(e){this._oLegendControlOrigin=e};p.prototype.getLegend=function(){var e=this.getParent();if(this._oLegendControlOrigin){return this._oLegendControlOrigin.getLegend()}if(e&&e.getLegend){return e.getLegend()}else{return this.getAssociation("ariaLabelledBy",[])}};p.prototype._setAriaRole=function(e){this._ariaRole=e;return this};p.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell"};p.prototype._checkDateSelected=function(e){var t,a,r,o,n=0,l=0,h=0,g,c,f;i._checkCalendarDate(e);c=this.getSelectedDates();f=new s(e);f.setDate(1);o=f.toUTCJSDate().getTime();for(g=0;g<c.length;g++){t=c[g];a=t.getStartDate();n=0;if(a){a=s.fromLocalJSDate(a);a.setDate(1);n=a.toUTCJSDate().getTime()}r=t.getEndDate();l=0;if(r){r=s.fromLocalJSDate(r);r.setDate(1);l=r.toUTCJSDate().getTime()}if(o==n&&!r){h=1;break}else if(o==n&&r){h=2;if(r&&o==l){h=5}break}else if(r&&o==l){h=3;break}else if(r&&o>n&&o<l){h=4;break}if(this.getSingleSelection()){break}}return h};p.prototype._getDateType=function(e){i._checkCalendarDate(e);var t,a,r,o,n=0,l,h=0,g,c=this.getSpecialDates(),f=new s(e);f.setDate(1);g=f.toUTCJSDate().getTime();for(r=0;r<c.length;r++){a=c[r];o=a.getStartDate();n=0;if(o){o=s.fromLocalJSDate(o);o.setDate(1);n=o.toUTCJSDate().getTime()}l=a.getEndDate();h=0;if(l){l=s.fromLocalJSDate(l);l.setDate(i._daysInMonth(l));h=l.toUTCJSDate().getTime()}if(g==n&&!l||g>=n&&g<=h){t={type:a.getType(),tooltip:a.getTooltip_AsString()};break}}return t};p.prototype._checkMonthEnabled=function(e){i._checkCalendarDate(e);var t=this.getParent();if(t&&t._oMinDate&&t._oMaxDate){if(i._isOutside(e,t._oMinDate,t._oMaxDate)){return false}}return true};p.prototype._handleMouseMove=function(e){if(!this.$().is(":visible")){k.call(this,true)}var t=c(e.target);if(t.hasClass("sapUiCalItemText")){t=t.parent()}if(t.hasClass("sapUiCalItem")){var a=this._getDate();var i=s.fromLocalJSDate(this._oFormatYyyymm.parse(t.attr("data-sap-month")));i.setDate(1);if(!i.isSame(a)){this._setDate(i);b.call(this,i,true);this._bMoveChange=true}}};p.prototype.onmouseup=function(e){if(this._bMouseMove){k.call(this,true);var t=this._getDate();var a=this._oItemNavigation.getItemDomRefs();for(var i=0;i<a.length;i++){var r=c(a[i]);if(r.attr("data-sap-month")==this._oFormatYyyymm.format(t.toUTCJSDate(),true)){r.focus();break}}if(this._bMoveChange){var o=c(e.target);if(o.hasClass("sapUiCalItemText")){o=o.parent()}if(o.hasClass("sapUiCalItem")){t=s.fromLocalJSDate(this._oFormatYyyymm.parse(o.attr("data-sap-month")));t.setDate(1)}b.call(this,t);this._bMoveChange=false;this._bMousedownChange=false;w.call(this)}}if(this._bMousedownChange){this._bMousedownChange=false;w.call(this)}};p.prototype.onsapselect=function(e){var t=b.call(this,this._getDate());if(t){w.call(this)}e.stopPropagation();e.preventDefault()};p.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};p.prototype.onsappageupmodifiers=function(e){var t=new s(this._getDate());var a=t.getYear();if(e.metaKey||e.ctrlKey){t.setYear(a-10)}else{var i=this.getMonths();if(i<=12){t.setYear(a-1)}else{t.setMonth(t.getMonth()-i)}}this.fireFocus({date:t.toLocalJSDate(),notVisible:true});e.preventDefault()};p.prototype.onsappagedownmodifiers=function(e){var t=new s(this._getDate());var a=t.getYear();if(e.metaKey||e.ctrlKey){t.setYear(a+10)}else{var i=this.getMonths();if(i<=12){t.setYear(a+1)}else{t.setMonth(t.getMonth()+i)}}this.fireFocus({date:t.toLocalJSDate(),notVisible:true});e.preventDefault()};p.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var e=this._getLocaleData();var t=e.getMonthsStandAlone("wide");var a=this.$("months").children();var i=this._getStartDate().getMonth();for(var s=0;s<a.length;s++){var r=c(c(a[s]).children(".sapUiCalItemText"));r.text(t[(s+i)%12])}U.call(this)};p.prototype.checkDateFocusable=function(e){i._checkJSDateObject(e);if(this._bNoRangeCheck){return false}var t=this._getStartDate();var a=new s(t);a.setDate(1);a.setMonth(a.getMonth()+this.getMonths());var r=s.fromLocalJSDate(e);return r.isSameOrAfter(t)&&r.isBefore(a)};p.prototype.applyFocusInfo=function(e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this};function d(){var e=this._getDate();var t=this._oFormatYyyymm.format(e.toUTCJSDate(),true);var i=0;var s=this.$("months").get(0);var r=this.$("months").children(".sapUiCalItem");for(var o=0;o<r.length;o++){var n=c(r[o]);if(n.attr("data-sap-month")===t){i=o;break}}if(!this._oItemNavigation){this._oItemNavigation=new a;this._oItemNavigation.attachEvent(a.Events.AfterFocus,m,this);this._oItemNavigation.attachEvent(a.Events.FocusAgain,v,this);this._oItemNavigation.attachEvent(a.Events.BorderReached,D,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true)}this._oItemNavigation.setRootDomRef(s);this._oItemNavigation.setItemDomRefs(r);this._oItemNavigation.setFocusedIndex(i);this._oItemNavigation.setPageSize(r.length)}function m(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}var i=this._getDate();var r=new s(i);var o=this._oItemNavigation.getItemDomRefs();var n=c(o[t]);r=s.fromLocalJSDate(this._oFormatYyyymm.parse(n.attr("data-sap-month")));r.setDate(1);this._setDate(r);this.fireFocus({date:r.toLocalJSDate(),notVisible:false});if(a.type=="mousedown"){_.call(this,a,r,t)}}function v(e){var t=e.getParameter("index");var a=e.getParameter("event");if(!a){return}if(a.type=="mousedown"){var i=this._getDate();_.call(this,a,i,t)}}function D(e){var t=e.getParameter("event");var a=this.getMonths();var i=this._getDate();var r=new s(i);if(t.type){switch(t.type){case"sapnext":case"sapnextmodifiers":r.setMonth(r.getMonth()+1);break;case"sapprevious":case"sappreviousmodifiers":r.setMonth(r.getMonth()-1);break;case"sappagedown":r.setMonth(r.getMonth()+a);break;case"sappageup":r.setMonth(r.getMonth()-a);break;default:break}this.fireFocus({date:r.toLocalJSDate(),notVisible:true})}}function _(e,t,a){if(e.button){return}var i=b.call(this,t);if(i){this._bMousedownChange=true}if(this._bMouseMove){k.call(this,true);this._bMoveChange=false}else if(i&&this.getIntervalSelection()&&this.$().is(":visible")){N.call(this,true)}e.preventDefault();e.setMark("cancelAutoClose")}function S(e,t){i._checkCalendarDate(e);var a=e.getYear();i._checkYearInValidRange(a);var r=true;if(!this.getDate()||!e.isSame(s.fromLocalJSDate(this.getDate()))){var o=new s(e);o.setDate(1);r=this.checkDateFocusable(e.toLocalJSDate());if(!this._bNoRangeCheck&&!r){throw new Error("Date must be in visible date range; "+this)}this.setProperty("date",e.toLocalJSDate(),true);this._oDate=o}if(this.getDomRef()){if(r){y.call(this,this._oDate,t)}else{C.call(this,t)}}}function y(e,t){var a=this._oFormatYyyymm.format(e.toUTCJSDate(),true);var i=this._oItemNavigation.getItemDomRefs();var s;for(var r=0;r<i.length;r++){s=c(i[r]);if(s.attr("data-sap-month")==a){if(document.activeElement!=i[r]){if(t){this._oItemNavigation.setFocusedIndex(r)}else{this._oItemNavigation.focusItem(r)}}break}}}function C(e){var t=this._getStartDate();var a=this.$("months");if(a.length>0){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderMonths(i,this,t);i.flush(a[0]);i.destroy()}I.call(this);d.call(this);if(!e){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex())}}function I(){var e=this._getStartDate();if(this._getShowHeader()){var t=this.$("Head");if(t.length>0){var a=this._getLocaleData();var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(i,this,a,e);i.flush(t[0]);i.destroy()}}}function b(e,t){if(!this._checkMonthEnabled(e)){return false}var a=this.getSelectedDates();var i;var r=this._oItemNavigation.getItemDomRefs();var o;var n;var l=0;var h=this.getParent();var g=this;var u;if(h&&h.getSelectedDates){g=h}if(this.getSingleSelection()){if(a.length>0){i=a[0];u=i.getStartDate();if(u){u=s.fromLocalJSDate(u);u.setDate(1)}}else{i=new f;g.addAggregation("selectedDates",i,true)}if(this.getIntervalSelection()&&(!i.getEndDate()||t)&&u){var p;if(e.isBefore(u)){p=u;u=e;if(!t){i.setProperty("startDate",u.toLocalJSDate(),true);i.setProperty("endDate",p.toLocalJSDate(),true)}}else if(e.isSameOrAfter(u)){p=e;if(!t){i.setProperty("endDate",p.toLocalJSDate(),true)}}M.call(this,u,p)}else{M.call(this,e);i.setProperty("startDate",e.toLocalJSDate(),true);i.setProperty("endDate",undefined,true)}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection")}else{var d=this._checkDateSelected(e);if(d>0){for(l=0;l<a.length;l++){u=a[l].getStartDate();if(u){u=s.fromLocalJSDate(u);u.setDate(1);if(e.isSame(u)){g.removeAggregation("selectedDates",l,true);break}}}}else{i=new f({startDate:e.toLocalJSDate()});g.addAggregation("selectedDates",i,true)}n=this._oFormatYyyymm.format(e.toUTCJSDate(),true);for(l=0;l<r.length;l++){o=c(r[l]);if(o.attr("data-sap-month")==n){if(d>0){o.removeClass("sapUiCalItemSel");o.attr("aria-selected","false")}else{o.addClass("sapUiCalItemSel");o.attr("aria-selected","true")}}}}}return true}function M(e,t){var a=this._oItemNavigation.getItemDomRefs();var r;var o=0;var n=false;var l=false;if(!t){var h=this._oFormatYyyymm.format(e.toUTCJSDate(),true);for(o=0;o<a.length;o++){r=c(a[o]);n=false;l=false;if(r.attr("data-sap-month")==h){r.addClass("sapUiCalItemSel");r.attr("aria-selected","true");n=true}else if(r.hasClass("sapUiCalItemSel")){r.removeClass("sapUiCalItemSel");r.attr("aria-selected","false")}if(r.hasClass("sapUiCalItemSelStart")){r.removeClass("sapUiCalItemSelStart")}else if(r.hasClass("sapUiCalItemSelBetween")){r.removeClass("sapUiCalItemSelBetween")}else if(r.hasClass("sapUiCalItemSelEnd")){r.removeClass("sapUiCalItemSelEnd")}L.call(this,r,n,l)}}else{var g;for(o=0;o<a.length;o++){r=c(a[o]);n=false;l=false;g=s.fromLocalJSDate(this._oFormatYyyymm.parse(r.attr("data-sap-month")));g.setDate(1);if(g.isSame(e)){r.addClass("sapUiCalItemSelStart");n=true;r.addClass("sapUiCalItemSel");r.attr("aria-selected","true");if(t&&g.isSame(t)){r.addClass("sapUiCalItemSelEnd");l=true}r.removeClass("sapUiCalItemSelBetween")}else if(t&&i._isBetween(g,e,t)){r.addClass("sapUiCalItemSel");r.attr("aria-selected","true");r.addClass("sapUiCalItemSelBetween");r.removeClass("sapUiCalItemSelStart");r.removeClass("sapUiCalItemSelEnd")}else if(t&&g.isSame(t)){r.addClass("sapUiCalItemSelEnd");l=true;r.addClass("sapUiCalItemSel");r.attr("aria-selected","true");r.removeClass("sapUiCalItemSelStart");r.removeClass("sapUiCalItemSelBetween")}else{if(r.hasClass("sapUiCalItemSel")){r.removeClass("sapUiCalItemSel");r.attr("aria-selected","false")}if(r.hasClass("sapUiCalItemSelStart")){r.removeClass("sapUiCalItemSelStart")}else if(r.hasClass("sapUiCalItemSelBetween")){r.removeClass("sapUiCalItemSelBetween")}else if(r.hasClass("sapUiCalItemSelEnd")){r.removeClass("sapUiCalItemSelEnd")}}L.call(this,r,n,l)}}}function L(e,t,a){if(!this.getIntervalSelection()){return}var i="";var s=[];var r=this.getId();var o=false;i=e.attr("aria-describedby");if(i){s=i.split(" ")}var n=-1;var l=-1;for(var h=0;h<s.length;h++){var g=s[h];if(g==r+"-Start"){n=h}if(g==r+"-End"){l=h}}if(n>=0&&!t){s.splice(n,1);o=true;if(l>n){l--}}if(l>=0&&!a){s.splice(l,1);o=true}if(n<0&&t){s.push(r+"-Start");o=true}if(l<0&&a){s.push(r+"-End");o=true}if(o){i=s.join(" ");e.attr("aria-describedby",i)}}function w(){if(this._bMouseMove){k.call(this,true)}this.fireSelect()}function U(){if(!this._bNamesLengthChecked){var e=0;var t=this.$("months").children();var a=false;var i=this.getMonths();var s=Math.ceil(12/i);var r=0;var o=this._getLocaleData();var n=o.getMonthsStandAlone("wide");var l;for(var h=0;h<s;h++){if(i<12){for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(n[(e+r)%12])}r=r+i;if(r>11){r=11}}for(e=0;e<t.length;e++){var g=t[e];if(Math.abs(g.clientWidth-g.scrollWidth)>1){a=true;break}}if(a){break}}if(i<12){r=this._getStartDate().getMonth();for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(n[(e+r)%12])}}if(a){this._bLongMonth=false;var f=o.getMonthsStandAlone("abbreviated");r=this._getStartDate().getMonth();for(e=0;e<t.length;e++){l=c(c(t[e]).children(".sapUiCalItemText"));l.text(f[(e+r)%12])}}else{this._bLongMonth=true}this._bNamesLengthChecked=true}}function R(){this._sInvalidateMonths=undefined;C.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined}function N(){c(window.document).bind("mousemove",this._mouseMoveProxy);this._bMouseMove=true}function k(){c(window.document).unbind("mousemove",this._mouseMoveProxy);this._bMouseMove=undefined}return p});