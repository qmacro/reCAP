/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./PlanningCalendarHeader","./SegmentedButtonItem","./SinglePlanningCalendarWeekView","./SinglePlanningCalendarGrid","./SinglePlanningCalendarMonthGrid","./SinglePlanningCalendarRenderer","sap/base/Log","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","sap/ui/core/format/DateFormat","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/DateRange","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/jquery"],function(e,t,i,a,r,s,n,o,g,l,p,d,h,u,c,_){"use strict";var f=e.PlanningCalendarStickyMode;var y="_sHeaderResizeHandlerId";var m=4;var w="--item";var D=g.extend("sap.m.SinglePlanningCalendar",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},startHour:{type:"int",group:"Data",defaultValue:0},endHour:{type:"int",group:"Data",defaultValue:24},fullDay:{type:"boolean",group:"Data",defaultValue:true},stickyMode:{type:"sap.m.PlanningCalendarStickyMode",group:"Behavior",defaultValue:f.None},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsResize:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsCreate:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action",forwarding:{getter:"_getHeader",aggregation:"actions"}},appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment",forwarding:{getter:"_getCurrentGrid",aggregation:"appointments"}},views:{type:"sap.m.SinglePlanningCalendarView",multiple:true,singularName:"view"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate",forwarding:{getter:"_getCurrentGrid",aggregation:"specialDates"}},_header:{type:"sap.m.PlanningCalendarHeader",multiple:false,visibility:"hidden"},_grid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_mvgrid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{selectedView:{type:"sap.m.SinglePlanningCalendarView",multiple:false},legend:{type:"sap.m.PlanningCalendarLegend",multiple:false}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"}}},appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},copy:{type:"boolean"}}},appointmentResize:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}},appointmentCreate:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},headerDateSelect:{parameters:{date:{type:"object"}}},startDateChange:{parameters:{date:{type:"object"}}},cellPress:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},moreLinkPress:{parameters:{date:{type:"object"}}},viewChange:{}}}});D.prototype.init=function(){var e=this.getId();this._oRB=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oDefaultView=new a({key:"DEFAULT_INNER_WEEK_VIEW_CREATED_FROM_CONTROL",title:""});this.setAssociation("selectedView",this._oDefaultView);this.setAggregation("_header",this._createHeader());this.setAggregation("_grid",new r(e+"-Grid"));this.setAggregation("_mvgrid",new s(e+"-GridMV"));this._attachHeaderEvents();this._attachGridEvents();this._attachDelegates();this.setStartDate(new Date)};D.prototype.onBeforeRendering=function(){this._toggleStickyClasses()};D.prototype.onAfterRendering=function(){var e=this._getHeader();this._adjustColumnHeadersTopOffset();this.toggleStyleClass("sapMSinglePCActionsHidden",!e._getActionsToolbar().getVisible());this._registerResizeHandler(y,e,this._onHeaderResize.bind(this))};D.prototype.exit=function(){if(this._oDefaultView){this._oDefaultView.destroy();this._oDefaultView=null}if(this._afterRenderFocusCell){this.removeDelegate(this._afterRenderFocusCell);this._afterRenderFocusCell=null}this._deRegisterResizeHandler(y)};D.prototype._onHeaderResize=function(e){if(e.oldSize.height===e.size.height){return this}this.toggleStyleClass("sapMSinglePCActionsHidden",!this._getHeader()._getActionsToolbar().getVisible());this._adjustColumnHeadersTopOffset();return this};D.prototype.setTitle=function(e){this._getHeader().setTitle(e);return this.setProperty("title",e)};D.prototype.setStartDate=function(e){this.setProperty("startDate",e);this._alignColumns();return this};D.prototype.setStartHour=function(e){this.getAggregation("_grid").setStartHour(e);this.setProperty("startHour",e);return this};D.prototype.setEndHour=function(e){this.getAggregation("_grid").setEndHour(e);this.setProperty("endHour",e);return this};D.prototype.setFullDay=function(e){this.getAggregation("_grid").setFullDay(e);this.setProperty("fullDay",e);return this};D.prototype.setEnableAppointmentsDragAndDrop=function(e){this.getAggregation("_grid").setEnableAppointmentsDragAndDrop(e);this.getAggregation("_mvgrid").setEnableAppointmentsDragAndDrop(e);return this.setProperty("enableAppointmentsDragAndDrop",e,true)};D.prototype.setEnableAppointmentsResize=function(e){this.getAggregation("_grid").setEnableAppointmentsResize(e);return this.setProperty("enableAppointmentsResize",e,true)};D.prototype.setEnableAppointmentsCreate=function(e){this.getAggregation("_grid").setEnableAppointmentsCreate(e);return this.setProperty("enableAppointmentsCreate",e,true)};D.prototype._toggleStickyClasses=function(){var e=this.getStickyMode();this.toggleStyleClass("sapMSinglePCStickyAll",e===f.All);this.toggleStyleClass("sapMSinglePCStickyNavBarAndColHeaders",e===f.NavBarAndColHeaders);return this};D.prototype._adjustColumnHeadersTopOffset=function(){var e=this.getStickyMode(),t=this.getAggregation("_grid"),i=t&&t._getColumnHeaders(),a;if(!i||!i.getDomRef()){return this}switch(e){case f.All:a=this._getHeader().$().outerHeight();break;case f.NavBarAndColHeaders:a=this._getHeader()._getActionsToolbar().$().outerHeight();break;default:a="auto";break}i.$().css("top",a);i._setTopPosition(a);return this};D.prototype.addView=function(e){var t,a=this._getHeader(),r=e.getId()+w,s;if(!e){return this}if(this._isViewKeyExisting(e.getKey())){o.error("There is an existing view with the same key.",this);return this}this.addAggregation("views",e);t=a._getOrCreateViewSwitch();s=new i(r,{key:e.getKey(),text:e.getTitle()});t.addItem(s);this._observeViewTitle(e);if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",e)}this._alignView();if(this.getViews().length>m){a._convertViewSwitchToSelect()}return this};D.prototype.insertView=function(e,t){var a,r=this._getHeader(),s=e.getId()+w,n;if(!e){return this}if(this._isViewKeyExisting(e.getKey())){o.error("There is an existing view with the same key.",this);return this}this.insertAggregation("views",e,t);a=r._getOrCreateViewSwitch();n=new i(s,{key:e.getKey(),text:e.getTitle()});a.insertItem(n,t);this._observeViewTitle(e);if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",e)}this._alignView();if(this.getViews().length>m){r._convertViewSwitchToSelect()}return this};D.prototype.removeView=function(e){if(!e){return this}var t=this._getHeader(),i=t._getOrCreateViewSwitch(),a=i.getItems(),r=this._getSelectedView(),s=e.getKey(),n,o;if(this.getViews().length===1){this._disconnectAndDestroyViewsObserver()}else{this._oViewsObserver.unobserve(e,{properties:["title"]})}for(o=0;o<a.length;o++){n=a[o];if(n.getKey()===s){i.removeItem(n);break}}this.removeAggregation("views",e);if(s===r.getKey()){this.setAssociation("selectedView",this.getViews()[0]||this._oDefaultView)}this._alignView();if(this.getViews().length<=m){t._convertViewSwitchToSegmentedButton()}return this};D.prototype.removeAllViews=function(){var e=this._getHeader()._getOrCreateViewSwitch();this._disconnectAndDestroyViewsObserver();e.removeAllItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.removeAllAggregation("views")};D.prototype.destroyViews=function(){var e=this._getHeader()._getOrCreateViewSwitch();this._disconnectAndDestroyViewsObserver();e.destroyItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.destroyAggregation("views")};D.prototype._viewsObserverCallbackFunction=function(e){sap.ui.getCore().byId(e.object.getId()+w).setText(e.current)};D.prototype._getViewsObserver=function(){if(!this._oViewsObserver){this._oViewsObserver=new c(this._viewsObserverCallbackFunction)}return this._oViewsObserver};D.prototype._observeViewTitle=function(e){this._getViewsObserver().observe(e,{properties:["title"]})};D.prototype._disconnectAndDestroyViewsObserver=function(){if(this._oViewsObserver){this._oViewsObserver.disconnect();this._oViewsObserver.destroy();this._oViewsObserver=null}};D.prototype.setSelectedView=function(e){if(typeof e==="string"){e=this._getViewById(e)}else if(e.isA("sap.m.SinglePlanningCalendarView")&&!this._isViewKeyExisting(e.getKey())){e=null}if(!e){o.error("There is no such view.",this);return this}this._setupNewView(e);this._getHeader()._getOrCreateViewSwitch().setSelectedKey(e.getKey());return this};D.prototype.getSelectedAppointments=function(){return this.getAggregation("_grid").getSelectedAppointments()};D.prototype.setLegend=function(e){var t,i,a;this.setAssociation("legend",e);this.getAggregation("_grid").setAssociation("legend",e);this.getAggregation("_mvgrid").setAssociation("legend",e);i=this.getLegend();if(i){this.getAggregation("_grid")._sLegendId=i;this.getAggregation("_mvgrid")._sLegendId=i;a=sap.ui.getCore().byId(i)}if(a){t=new c(function(e){this.invalidate()}.bind(this));t.observe(a,{destroy:true})}return this};D.prototype._alignView=function(){this._switchViewButtonVisibility();this._alignColumns();return this};D.prototype._createHeader=function(){var e=new t(this.getId()+"-Header");e.getAggregation("_actionsToolbar").addAriaLabelledBy(l.getStaticId("sap.m","SPC_ACTIONS_TOOLBAR"));e.getAggregation("_navigationToolbar").addAriaLabelledBy(l.getStaticId("sap.m","SPC_NAVIGATION_TOOLBAR"));return e};D.prototype._isViewKeyExisting=function(e){return this.getViews().some(function(t){return t.getKey()===e})};D.prototype.getViewByKey=function(e){var t=this.getViews(),i;for(i=0;i<t.length;i++){if(t[i].getKey()===e){return t[i]}}return null};D.prototype._getViewById=function(e){var t=this.getViews(),i;for(i=0;i<t.length;i++){if(t[i].getId()===e){return t[i]}}return null};D.prototype._getSelectedView=function(){var e,t=this.getViews(),i=sap.ui.getCore().byId(this.getAssociation("selectedView")).getKey();for(var a=0;a<t.length;a++){if(i===t[a].getKey()){e=t[a];break}}return e||this._oDefaultView};D.prototype._switchViewButtonVisibility=function(){var e=this._getHeader()._getOrCreateViewSwitch(),t=e.getItems().length>1;e.setProperty("visible",t);return this};D.prototype._attachHeaderEvents=function(){var e=this._getHeader();e.attachEvent("viewChange",this._handleViewChange,this);e.attachEvent("pressPrevious",this._handlePressArrow,this);e.attachEvent("pressToday",this._handlePressToday,this);e.attachEvent("pressNext",this._handlePressArrow,this);e.attachEvent("dateSelect",this._handleCalendarPickerDateSelect,this);return this};D.prototype._attachDelegates=function(){this._afterRenderFocusCell={onAfterRendering:function(){if(this._sGridCellFocusSelector){_(this._sGridCellFocusSelector).focus();this._sGridCellFocusSelector=null}}.bind(this)};this.getAggregation("_grid").addDelegate(this._afterRenderFocusCell);this.getAggregation("_mvgrid").addDelegate(this._afterRenderFocusCell)};D.prototype._attachGridEvents=function(){var e=this.getAggregation("_grid"),t=this.getAggregation("_mvgrid");var i=function(e){this.fireHeaderDateSelect({date:e.getSource().getDate()})};var a=function(e){this.fireAppointmentSelect({appointment:e.getParameter("appointment"),appointments:e.getParameter("appointments")})};var r=function(e){this.fireAppointmentDrop({appointment:e.getParameter("appointment"),startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate"),copy:e.getParameter("copy")})};var s=function(e){this.fireAppointmentResize({appointment:e.getParameter("appointment"),startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var n=function(e){this.fireAppointmentCreate({startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var o=function(e){this.fireEvent("cellPress",{startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var g=function(e){this.fireEvent("moreLinkPress",{date:e.getParameter("date")})};var l=function(e){var t=this.getAggregation("_grid"),i=t._getDateFormatter(),a=this._getSelectedView().getScrollEntityCount()-t._getColumns()+1,r=new Date(e.getParameter("startDate")),s=e.getParameter("fullDay"),n=this.getStartDate();if(e.getParameter("next")){r.setDate(r.getDate()+a);n=new Date(n.setDate(n.getDate()+this._getSelectedView().getScrollEntityCount()));this.setStartDate(n)}else{r.setDate(r.getDate()-a);n=new Date(n.setDate(n.getDate()-this._getSelectedView().getScrollEntityCount()));this.setStartDate(n)}this._sGridCellFocusSelector=s?"[data-sap-start-date='"+i.format(r)+"'].sapMSinglePCBlockersColumn":"[data-sap-start-date='"+i.format(r)+"'].sapMSinglePCRow"};var p=function(e){var t=new Date(e.getParameter("startDate")),i=h.fromLocalJSDate(t),a;i.setDate(i.getDate()+e.getParameter("offset"));a=i.toLocalJSDate();this.setStartDate(a);this._sGridCellFocusSelector="[sap-ui-date='"+i.valueOf()+"'].sapMSPCMonthDay"};e._getColumnHeaders().attachEvent("select",i,this);e.attachEvent("appointmentSelect",a,this);t.attachEvent("appointmentSelect",a,this);e.attachEvent("appointmentDrop",r,this);t.attachEvent("appointmentDrop",r,this);e.attachEvent("appointmentResize",s,this);e.attachEvent("appointmentCreate",n,this);e.attachEvent("cellPress",o,this);t.attachEvent("cellPress",o,this);t.attachEvent("moreLinkPress",g,this);e.attachEvent("borderReached",l,this);t.attachEvent("borderReached",p,this);return this};D.prototype._handleViewChange=function(e){var t=e.getParameter("item").getProperty("key"),i=this.getViewByKey(t);this._setupNewView(i);this.fireViewChange()};D.prototype._handlePressArrow=function(e){this._applyArrowsLogic(e.getId()==="pressPrevious");this._adjustColumnHeadersTopOffset()};D.prototype._handlePressToday=function(){var e=this._getSelectedView().calculateStartDate(new Date);this.setStartDate(e);this.fireStartDateChange({date:e});this._adjustColumnHeadersTopOffset()};D.prototype._setupNewView=function(e){var t=this._getCurrentGrid();this.setAssociation("selectedView",e);this._transferAggregations(t);this._alignColumns();this._adjustColumnHeadersTopOffset()};D.prototype._transferAggregations=function(e){var t=this._getCurrentGrid(),i,a,r;if(e.getId()!==t.getId()){i=e.removeAllAggregation("appointments",true);for(r=0;r<i.length;r++){t.addAggregation("appointments",i[r],true)}a=e.removeAllAggregation("specialDates",true);for(r=0;r<a.length;r++){t.addAggregation("specialDates",a[r],true)}}};D.prototype._handleCalendarPickerDateSelect=function(){var e=this._getHeader().getStartDate(),t;t=this._getSelectedView().calculateStartDate(new Date(e.getTime()));this.setStartDate(t);if(!this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){this.getAggregation("_grid")._getColumnHeaders().setDate(e)}this.fireStartDateChange({date:t});this._adjustColumnHeadersTopOffset()};D.prototype._updateCalendarPickerSelection=function(){var e=this._getFirstAndLastRangeDate(),t;t=new u({startDate:e.oStartDate.toLocalJSDate(),endDate:e.oEndDate.toLocalJSDate()});this._getHeader().getAggregation("_calendarPicker").removeAllSelectedDates();this._getHeader().getAggregation("_calendarPicker").addSelectedDate(t)};D.prototype._formatPickerText=function(){var e=this._getFirstAndLastRangeDate(),t=e.oStartDate.toLocalJSDate(),i=e.oEndDate.toLocalJSDate(),a=d.getDateInstance({format:"yMMMMd"}),r=a.format(t);if(t.getTime()!==i.getTime()){r+=" - "+a.format(i)}return r};D.prototype._applyArrowsLogic=function(e){var t=h.fromLocalJSDate(this.getStartDate()||new Date),i=e?-1:1,a=this._getSelectedView().getScrollEntityCount(this.getStartDate(),i),r;if(e){a*=-1}t.setDate(t.getDate()+a);r=t.toLocalJSDate();this.setStartDate(r);this.fireStartDateChange({date:r})};D.prototype._getFirstAndLastRangeDate=function(){var e=this._getSelectedView(),t=this._getHeader().getStartDate()||new Date,i=e.getEntityCount()-1,a,r;a=h.fromLocalJSDate(e.calculateStartDate(new Date(t.getTime())));r=new h(a);r.setDate(a.getDate()+i);return{oStartDate:a,oEndDate:r}};D.prototype._alignColumns=function(){var e=this._getHeader(),t=this.getAggregation("_grid"),i=this.getAggregation("_mvgrid"),a=this._getSelectedView(),r=this.getStartDate()||new Date,s=a.calculateStartDate(new Date(r.getTime())),n=h.fromLocalJSDate(s);e.setStartDate(s);e.setPickerText(this._formatPickerText(n));this._updateCalendarPickerSelection();t.setStartDate(s);i.setStartDate(s);t._setColumns(a.getEntityCount());this._setColumnHeaderVisibility()};D.prototype._setColumnHeaderVisibility=function(){var e;if(this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){return}e=!this._getSelectedView().isA("sap.m.SinglePlanningCalendarDayView");this.getAggregation("_grid")._getColumnHeaders().setVisible(e);this.toggleStyleClass("sapMSinglePCHiddenColHeaders",!e)};D.prototype._getHeader=function(){return this.getAggregation("_header")};D.prototype._getCurrentGrid=function(){if(this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){return this.getAggregation("_mvgrid")}else{return this.getAggregation("_grid")}};D.prototype._registerResizeHandler=function(e,t,i){if(!this[e]){this[e]=p.register(t,i)}return this};D.prototype._deRegisterResizeHandler=function(e){if(this[e]){p.deregister(this[e]);this[e]=null}return this};return D});