/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./Popover","sap/ui/core/Item","./ColumnListItem","./GroupHeaderListItem","./DisplayListItem","./StandardListItem","sap/ui/core/SeparatorItem","./List","./Table","./library","sap/ui/core/IconPool","sap/ui/Device","sap/ui/core/Control","./SuggestionsPopover","./Toolbar","./ToolbarSpacer","./Button","sap/ui/dom/containsOrEquals","sap/base/assert","sap/base/util/deepEqual","./InputRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/selectText"],function(e,t,o,s,i,n,u,r,g,p,a,l,h,_,f,S,c,d,y,v,m,P,I){"use strict";var b=a.ListType;var T=a.InputTextFormatMode;var V=a.InputType;var w=a.ListMode;var R=a.ListSeparators;var L=e.extend("sap.m.Input",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.InputType",group:"Data",defaultValue:V.Text},maxLength:{type:"int",group:"Behavior",defaultValue:0},dateFormat:{type:"string",group:"Misc",defaultValue:"YYYY-MM-dd",deprecated:true},showValueHelp:{type:"boolean",group:"Behavior",defaultValue:false},showSuggestion:{type:"boolean",group:"Behavior",defaultValue:false},valueHelpOnly:{type:"boolean",group:"Behavior",defaultValue:false},filterSuggests:{type:"boolean",group:"Behavior",defaultValue:true},maxSuggestionWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},startSuggestion:{type:"int",group:"Behavior",defaultValue:1},showTableSuggestionValueHelp:{type:"boolean",group:"Behavior",defaultValue:true},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"50%"},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},selectedKey:{type:"string",group:"Data",defaultValue:""},textFormatMode:{type:"sap.m.InputTextFormatMode",group:"Misc",defaultValue:T.Value},textFormatter:{type:"any",group:"Misc",defaultValue:""},suggestionRowValidator:{type:"any",group:"Misc",defaultValue:""},enableSuggestionsHighlighting:{type:"boolean",group:"Behavior",defaultValue:true},autocomplete:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"suggestionItems",aggregations:{suggestionItems:{type:"sap.ui.core.Item",multiple:true,singularName:"suggestionItem"},suggestionColumns:{type:"sap.m.Column",multiple:true,singularName:"suggestionColumn",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"columns"}},suggestionRows:{type:"sap.m.ColumnListItem",altTypes:["sap.m.GroupHeaderListItem"],multiple:true,singularName:"suggestionRow",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"items"}},_suggestionPopup:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_valueHelpIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},selectedRow:{type:"sap.m.ColumnListItem",multiple:false}},events:{liveChange:{parameters:{value:{type:"string"},escPressed:{type:"boolean"},previousValue:{type:"string"}}},valueHelpRequest:{parameters:{fromSuggestions:{type:"boolean"}}},suggest:{parameters:{suggestValue:{type:"string"},suggestionColumns:{type:"sap.m.ListBase"}}},suggestionItemSelected:{parameters:{selectedItem:{type:"sap.ui.core.Item"},selectedRow:{type:"sap.m.ColumnListItem"}}},submit:{parameters:{value:{type:"string"}}}},designtime:"sap/m/designtime/Input.designtime"}});l.insertFontFaceStyle();L._DEFAULTFILTER_TABULAR=function(e,t){var o=t.getCells(),s=0;for(;s<o.length;s++){if(o[s].getText){if(f._wordStartsWithValue(o[s].getText(),e)){return true}}}return false};L._DEFAULTRESULT_TABULAR=function(e){var t=e.getCells(),o=0;for(;o<t.length;o++){if(t[o].getText){return t[o].getText()}}return""};L.prototype.init=function(){e.prototype.init.call(this);this._fnFilter=f._DEFAULTFILTER;this._bUseDialog=h.system.phone;this._bFullScreen=h.system.phone;this._iSetCount=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m")};L.prototype.exit=function(){e.prototype.exit.call(this);this._deregisterEvents();this.cancelPendingSuggest();if(this._iRefreshListTimeout){clearTimeout(this._iRefreshListTimeout);this._iRefreshListTimeout=null}if(this._oSuggestionTable){this._oSuggestionTable.destroy();this._oSuggestionTable=null}if(this._oSuggPopover){this._oSuggPopover.destroy();this._oSuggPopover=null}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null}this.$().off("click")};L.prototype.onBeforeRendering=function(){var t=this.getSelectedKey(),o=this.getShowValueHelp()&&this.getEnabled()&&this.getEditable(),s=this.getAggregation("_endIcon")||[],i=s[0],n;e.prototype.onBeforeRendering.call(this);this._deregisterEvents();if(t){this.setSelectedKey(t)}if(this.getShowSuggestion()){this._oSuggPopover._bAutocompleteEnabled=this.getAutocomplete();if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton()}else{this._removeShowMoreButton()}n=this._oSuggPopover._oPopupInput;if(n){n.setType(this.getType())}}if(this._oSuggPopover&&this._oSuggPopover._oPopover&&this.getShowTableSuggestionValueHelp()){this._addShowMoreButton()}else{this._removeShowMoreButton()}if(o){i=this._getValueHelpIcon();i.setProperty("visible",true,true)}else{if(i){i.setProperty("visible",false,true)}}!this.getWidth()&&this.setWidth("100%");this.$().off("click")};L.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.call(this);if(this._oSuggPopover){this._oSuggPopover._resetTypeAhead()}if(this._bUseDialog&&this.getEditable()&&this.getEnabled()){this.$().on("click",I.proxy(function(e){if(this._onclick){this._onclick(e)}if(this.getShowSuggestion()&&this._oSuggPopover&&e.target.id!=this.getId()+"-vhi"){this._openSuggestionsPopover()}},this))}};L.prototype._getDisplayText=function(e){var t=this.getTextFormatter();if(t){return t(e)}var o=e.getText(),s=e.getKey(),i=this.getTextFormatMode();switch(i){case T.Key:return s;case T.ValueKey:return o+" ("+s+")";case T.KeyValue:return"("+s+") "+o;default:return o}};L.prototype._onValueUpdated=function(e){if(this._bSelectingItem||e===this._sSelectedValue){return}var t=this.getSelectedKey(),o;if(t===""){return}if(this._hasTabularSuggestions()){o=this._oSuggestionTable&&!!this._oSuggestionTable.getSelectedItem()}else{o=this._oSuggPopover._oList&&!!this._oSuggPopover._oList.getSelectedItem()}if(o){return}this.setProperty("selectedKey","",true);this.setAssociation("selectedRow",null,true);this.setAssociation("selectedItem",null,true);this.fireSuggestionItemSelected({selectedItem:null,selectedRow:null})};L.prototype._updateSelectionFromList=function(){if(this._oSuggPopover._iPopupListSelectedIndex<0){return false}var e=this._oSuggPopover._oList.getSelectedItem();if(e){if(this._hasTabularSuggestions()){this.setSelectionRow(e,true)}else{this.setSelectionItem(e._oItem,true)}}return true};L.prototype.setSelectionItem=function(e,t){this._bSelectingItem=true;if(!e){this.setAssociation("selectedItem",null,true);this.setValue("");return}this._oSuggPopover._iPopupListSelectedIndex=-1;var o=this._iSetCount,s;this.setAssociation("selectedItem",e,true);this.setProperty("selectedKey",e.getKey(),true);if(t){this.fireSuggestionItemSelected({selectedItem:e})}if(o!==this._iSetCount){s=this.getValue()}else{s=this._getDisplayText(e)}this._sSelectedValue=s;this.updateInputField(s);if(this.bIsDestroyed){return}if(!(this._bUseDialog&&this instanceof sap.m.MultiInput)){this._closeSuggestionPopup()}this._bSelectingItem=false};L.prototype.addSuggestionRowGroup=function(e,t,o){t=t||new i({title:e.text||e.key});this.addAggregation("suggestionRows",t,o);return t};L.prototype.addSuggestionItemGroup=function(e,t,o){t=t||new r({text:e.text||e.key});this.addAggregation("suggestionItems",t,o);return t};L.prototype.setSelectedItem=function(e){if(typeof e==="string"){e=sap.ui.getCore().byId(e)}if(e!==null&&!(e instanceof o)){return this}this.setSelectionItem(e);return this};L.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);this.setProperty("selectedKey",e,true);if(this._hasTabularSuggestions()){return this}if(!e){this.setSelectionItem();return this}var t=this.getSuggestionItemByKey(e);this.setSelectionItem(t);return this};L.prototype.getSuggestionItemByKey=function(e){var t=this.getSuggestionItems()||[],o,s;for(s=0;s<t.length;s++){o=t[s];if(o.getKey()===e){return o}}};L.prototype.setSelectionRow=function(e,t){if(!e){this.setAssociation("selectedRow",null,true);return}this._oSuggPopover._iPopupListSelectedIndex=-1;this._bSelectingItem=true;var s,i=this.getSuggestionRowValidator();if(i){s=i(e);if(!(s instanceof o)){s=null}}var n=this._iSetCount,u="",r;this.setAssociation("selectedRow",e,true);if(s){u=s.getKey()}this.setProperty("selectedKey",u,true);if(t){this.fireSuggestionItemSelected({selectedRow:e})}if(n!==this._iSetCount){r=this.getValue()}else{if(s){r=this._getDisplayText(s)}else{r=this._fnRowResultFilter?this._fnRowResultFilter(e):f._DEFAULTRESULT_TABULAR(e)}}this._sSelectedValue=r;this.updateInputField(r);if(this.bIsDestroyed){return}if(!(this._bUseDialog&&this instanceof sap.m.MultiInput&&this._isMultiLineMode)){this._closeSuggestionPopup()}this._bSelectingItem=false};L.prototype.setSelectedRow=function(e){if(typeof e==="string"){e=sap.ui.getCore().byId(e)}if(e!==null&&!(e instanceof s)){return this}this.setSelectionRow(e);return this};L.prototype._getValueHelpIcon=function(){var e=this,t=this.getAggregation("_endIcon")||[],o=t[0];if(!o){o=this.addEndIcon({id:this.getId()+"-vhi",src:l.getIconURI("value-help"),useIconTooltip:false,noTabStop:true,press:function(t){if(!e.getValueHelpOnly()){var o=this.getParent(),s;if(h.support.touch){s=o.$("inner");s.attr("readonly","readonly");o.focus();s.removeAttr("readonly")}else{o.focus()}e.bValueHelpRequested=true;e._fireValueHelpRequest(false)}}})}return o};L.prototype._fireValueHelpRequest=function(e){var t="";if(this.getShowSuggestion()&&this._oSuggPopover){t=this._oSuggPopover._sTypedInValue||""}else{t=this.getDOMValue()}this.fireValueHelpRequest({fromSuggestions:e,_userInputValue:t})};L.prototype._fireValueHelpRequestForValueHelpOnly=function(){if(this.getEnabled()&&this.getEditable()&&this.getShowValueHelp()&&this.getValueHelpOnly()){if(h.system.phone){this.focus()}this._fireValueHelpRequest(false)}};L.prototype.ontap=function(t){e.prototype.ontap.call(this,t);this._fireValueHelpRequestForValueHelpOnly()};L.prototype.getWidth=function(){return this.getProperty("width")||"100%"};L.prototype.setFilterFunction=function(e){if(e===null||e===undefined){this._fnFilter=f._DEFAULTFILTER;return this}v(typeof e==="function","Input.setFilterFunction: first argument fnFilter must be a function on "+this);this._fnFilter=e;return this};L.prototype.setRowResultFunction=function(e){var t;if(e===null||e===undefined){this._fnRowResultFilter=f._DEFAULTRESULT_TABULAR;return this}v(typeof e==="function","Input.setRowResultFunction: first argument fnFilter must be a function on "+this);this._fnRowResultFilter=e;t=this.getSelectedRow();if(t){this.setSelectedRow(t)}return this};L.prototype.closeSuggestions=function(){this._closeSuggestionPopup()};L.prototype._doSelect=function(e,t){if(h.support.touch){return}var o=this._$input[0];if(o){var s=this._$input;o.focus();s.selectText(e?e:0,t?t:s.val().length)}return this};L.prototype._isIncrementalType=function(){var e=this.getType();if(e==="Number"||e==="Date"||e==="Datetime"||e==="Month"||e==="Time"||e==="Week"){return true}return false};L.prototype.onsapescape=function(t){var o;if(this._isSuggestionsPopoverOpen()){t.originalEvent._sapui_handledByControl=true;this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();if(this._sBeforeSuggest!==undefined){if(this._sBeforeSuggest!==this.getValue()){o=this._lastValue;this.setValue(this._sBeforeSuggest);this._lastValue=o}this._sBeforeSuggest=undefined}return}if(this.getValueLiveUpdate()){this.setProperty("value",this._lastValue,true)}if(e.prototype.onsapescape){e.prototype.onsapescape.apply(this,arguments)}};L.prototype.onsapenter=function(t){this.cancelPendingSuggest();if(this._isSuggestionsPopoverOpen()){if(!this._updateSelectionFromList()&&!this.isComposingCharacter()){this._closeSuggestionPopup()}}if(e.prototype.onsapenter){e.prototype.onsapenter.apply(this,arguments)}if(this.getEnabled()&&this.getEditable()&&!(this.getValueHelpOnly()&&this.getShowValueHelp())){this.fireSubmit({value:this.getValue()})}};L.prototype.onsapfocusleave=function(o){var s=this._oSuggPopover,i=s&&s._oPopover,n=o.relatedControlId&&sap.ui.getCore().byId(o.relatedControlId),u=n&&n.getFocusDomRef(),r=s&&s._sProposedItemText&&this.getAutocomplete(),g=i&&u&&y(i.getDomRef(),u);if(i instanceof t){if(g){this._bPopupHasFocus=true;if(h.system.desktop&&m(i.getFocusDomRef(),u)){this.focus()}}else{if(this.getDOMValue()===this._sSelectedSuggViaKeyboard){this._sSelectedSuggViaKeyboard=null}}}if(!g&&!r){e.prototype.onsapfocusleave.apply(this,arguments)}this.bValueHelpRequested=false};L.prototype.onmousedown=function(e){var o=this._oSuggPopover&&this._oSuggPopover._oPopover;if(o instanceof t&&o.isOpen()){e.stopPropagation()}};L.prototype._deregisterEvents=function(){if(this._oSuggPopover){this._oSuggPopover._deregisterResize()}if(this._bUseDialog&&this._oSuggPopover&&this._oSuggPopover._oPopover){this.$().off("click")}};L.prototype.updateSuggestionItems=function(){this._bSuspendInvalidate=true;this.updateAggregation("suggestionItems");this._synchronizeSuggestions();this._bSuspendInvalidate=false;return this};L.prototype.invalidate=function(){if(!this._bSuspendInvalidate){_.prototype.invalidate.apply(this,arguments)}};L.prototype.cancelPendingSuggest=function(){if(this._iSuggestDelay){clearTimeout(this._iSuggestDelay);this._iSuggestDelay=null}};L.prototype._triggerSuggest=function(e){this.cancelPendingSuggest();this._bShouldRefreshListItems=true;if(!e){e=""}if(e.length>=this.getStartSuggestion()){this._iSuggestDelay=setTimeout(function(){if(this._sPrevSuggValue!==e){this._bBindingUpdated=false;this.fireSuggest({suggestValue:e});if(!this._bBindingUpdated){this._refreshItemsDelayed()}this._sPrevSuggValue=e}}.bind(this),300)}else if(this._bUseDialog){if(this._oSuggPopover._oList instanceof p){this._oSuggPopover._oList.addStyleClass("sapMInputSuggestionTableHidden")}else if(this._oSuggPopover._oList&&this._oSuggPopover._oList.destroyItems){this._oSuggPopover._oList.destroyItems()}}else if(this._isSuggestionsPopoverOpen()){setTimeout(function(){var e=this.getDOMValue()||"";if(e<this.getStartSuggestion()){this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup()}}.bind(this),0)}};(function(){L.prototype.setShowSuggestion=function(e){this.setProperty("showSuggestion",e,true);if(e){this._oSuggPopover=this._getSuggestionsPopover();this._oSuggPopover._iPopupListSelectedIndex=-1;if(!this._oSuggPopover._oPopover){this._createSuggestionsPopoverPopup();this._synchronizeSuggestions();this._createSuggestionPopupContent()}}else{if(this._oSuggPopover){this._oSuggPopover._destroySuggestionPopup();this._oSuggPopover._iPopupListSelectedIndex=-1;this._oButtonToolbar=null;this._oShowMoreButton=null}}return this};L.prototype.onchange=function(e){if(this.getShowValueHelp()||this.getShowSuggestion()){return}this.onChange(e)};L.prototype.oninput=function(t){e.prototype.oninput.call(this,t);if(t.isMarked("invalid")){return}var o=this.getDOMValue();if(this.getValueLiveUpdate()){this.setProperty("value",o,true);this._onValueUpdated(o)}this.fireLiveChange({value:o,newValue:o});if(this.getShowSuggestion()&&!this._bUseDialog){this._triggerSuggest(o)}};L.prototype.getValue=function(){return this.getDomRef("inner")&&this._$input?this.getDOMValue():this.getProperty("value")};L.prototype._refreshItemsDelayed=function(){clearTimeout(this._iRefreshListTimeout);this._iRefreshListTimeout=setTimeout(function(){if(this._oSuggPopover){this._refreshListItems()}}.bind(this),0)};L.prototype._filterListItems=function(e,t){var o,s,r,g=[],p=[],a=this.getFilterSuggests(),l=false;for(o=0;o<e.length;o++){r=e[o];if(e[o].isA("sap.ui.core.SeparatorItem")){s=new i({id:r.getId()+"-ghli",title:e[o].getText()});g.push({header:s,visible:false});this._configureListItem(r,s);p.push(s)}else if(!a||this._fnFilter(t,r)){if(e[o].isA("sap.ui.core.ListItem")){s=new n(r.getId()+"-dli");s.setLabel(r.getText());s.setValue(r.getAdditionalText())}else{s=new u(r.getId()+"-sli");s.setTitle(r.getText())}if(!l&&this._oSuggPopover._sProposedItemText===e[o].getText()){s.setSelected(true);l=true}if(g.length){g[g.length-1].visible=true}this._configureListItem(r,s);p.push(s)}}g.forEach(function(e){e.header.setVisible(e.visible)});return{hitItems:p,groups:g}};L.prototype._filterTabularItems=function(e,t){var o,s,i=this.getFilterSuggests(),n=[],u=[],r=false;for(o=0;o<e.length;o++){if(e[o].isA("sap.m.GroupHeaderListItem")){u.push({header:e[o],visible:false})}else{s=!i||this._fnFilter(t,e[o]);e[o].setVisible(s);s&&n.push(e[o]);if(!r&&s&&this._oSuggPopover._sProposedItemText===this._fnRowResultFilter(e[o])){e[o].setSelected(true);r=true}if(u.length&&s){u[u.length-1].visible=true}}}u.forEach(function(e){e.header.setVisible(e.visible)});this._getSuggestionsTable().invalidate();return{hitItems:n,groups:u}};L.prototype._clearSuggestionPopupItems=function(){if(!this._oSuggPopover._oList){return}if(this._oSuggPopover._oList instanceof p){this._oSuggPopover._oList.removeSelections(true)}else{this._oSuggPopover._oList.destroyItems()}};L.prototype._hideSuggestionPopup=function(){var e=this._oSuggPopover._oPopover;function t(){if(h.browser.internet_explorer){var e=this.getFocusInfo();this.setDOMValue(this._oSuggPopover._sTypedInValue);this.applyFocusInfo(e)}else{this.setDOMValue(this._oSuggPopover._sTypedInValue)}}if(!this._bUseDialog){if(e.isOpen()){this._sCloseTimer=setTimeout(function(){this._oSuggPopover._iPopupListSelectedIndex=-1;this.cancelPendingSuggest();if(this._oSuggPopover._sTypedInValue){t.call(this)}this._oSuggPopover._oProposedItem=null;e.close()}.bind(this),0)}}else if(this._hasTabularSuggestions()&&this._oSuggPopover._oList){this._oSuggPopover._oList.addStyleClass("sapMInputSuggestionTableHidden")}this.$("SuggDescr").text("");this.$("inner").removeAttr("aria-haspopup");this.$("inner").removeAttr("aria-activedescendant")};L.prototype._openSuggestionPopup=function(e){var t=this._oSuggPopover._oPopover;if(!this._bUseDialog){if(this._sCloseTimer){clearTimeout(this._sCloseTimer);this._sCloseTimer=null}if(!t.isOpen()&&!this._sOpenTimer&&e!==false){this._sOpenTimer=setTimeout(function(){this._sOpenTimer=null;this._openSuggestionsPopover()}.bind(this),0)}}this.$("inner").attr("aria-haspopup","true")};L.prototype._getFilteredSuggestionItems=function(e){var t,o=this.getSuggestionItems(),s=this.getSuggestionRows();if(this._hasTabularSuggestions()){if(this._bUseDialog&&this._oSuggPopover._oList){this._oSuggPopover._oList.removeStyleClass("sapMInputSuggestionTableHidden")}t=this._filterTabularItems(s,e)}else{t=this._filterListItems(o,e)}return t};L.prototype._fillSimpleSuggestionPopupItems=function(e){var t,o=e.hitItems,s=e.groups,i=o.length,n=i;if(!this._hasTabularSuggestions()){for(t=0;t<i;t++){this._oSuggPopover._oList.addItem(o[t])}n-=s.length}return n};L.prototype._applySuggestionAcc=function(e){var t="",o=this._oRb;if(e===1){t=o.getText("INPUT_SUGGESTIONS_ONE_HIT")}else if(e>1){t=o.getText("INPUT_SUGGESTIONS_MORE_HITS",e)}else{t=o.getText("INPUT_SUGGESTIONS_NO_HIT")}this.$("SuggDescr").text(t)};L.prototype._refreshListItems=function(){var e=this.getShowSuggestion(),t=this._oSuggPopover._sTypedInValue||this.getDOMValue()||"",o,s;this._oSuggPopover._iPopupListSelectedIndex=-1;if(!e||!this._bShouldRefreshListItems||!this.getDomRef()||!this._bUseDialog&&!this.$().hasClass("sapMInputFocused")){return null}this._clearSuggestionPopupItems();if(t.length<this.getStartSuggestion()){this._hideSuggestionPopup();return false}o=this._getFilteredSuggestionItems(t);s=this._fillSimpleSuggestionPopupItems(o);if(s>0){this._openSuggestionPopup(this.getValue().length>=this.getStartSuggestion())}else{this._hideSuggestionPopup()}this._applySuggestionAcc(s)};L.prototype._configureListItem=function(e,t){var o=b.Active;if(!e.getEnabled()||t.isA("sap.m.GroupHeaderListItem")){o=b.Inactive}t.setType(o);t._oItem=e;t.addEventDelegate({ontouchstart:function(e){(e.originalEvent||e)._sapui_cancelAutoClose=true}});return t};L.prototype.addSuggestionItem=function(e){this.addAggregation("suggestionItems",e,true);if(!this._oSuggPopover){this._getSuggestionsPopover()}this._synchronizeSuggestions();this._createSuggestionPopupContent();return this};L.prototype.insertSuggestionItem=function(e,t){this.insertAggregation("suggestionItems",t,e,true);if(!this._oSuggPopover){this._getSuggestionsPopover()}this._synchronizeSuggestions();this._createSuggestionPopupContent();return this};L.prototype.removeSuggestionItem=function(e){var t=this.removeAggregation("suggestionItems",e,true);this._synchronizeSuggestions();return t};L.prototype.removeAllSuggestionItems=function(){var e=this.removeAllAggregation("suggestionItems",true);this._synchronizeSuggestions();return e};L.prototype.destroySuggestionItems=function(){this.destroyAggregation("suggestionItems",true);this._synchronizeSuggestions();return this};L.prototype.addSuggestionRow=function(e){e.setType(b.Active);this.addAggregation("suggestionRows",e);this._synchronizeSuggestions();this._createSuggestionPopupContent(true);return this};L.prototype.insertSuggestionRow=function(e,t){e.setType(b.Active);this.insertAggregation("suggestionRows",e,t);this._synchronizeSuggestions();this._createSuggestionPopupContent(true);return this};L.prototype.removeSuggestionRow=function(e){var t=this.removeAggregation("suggestionRows",e);this._synchronizeSuggestions();return t};L.prototype.removeAllSuggestionRows=function(){var e=this.removeAllAggregation("suggestionRows");this._synchronizeSuggestions();return e};L.prototype.destroySuggestionRows=function(){this.destroyAggregation("suggestionRows");this._synchronizeSuggestions();return this};L.prototype.bindAggregation=function(){if(arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns"||arguments[0]==="suggestionItems"){this._createSuggestionPopupContent(arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns");this._bBindingUpdated=true}return e.prototype.bindAggregation.apply(this,arguments)};L.prototype._closeSuggestionPopup=function(){if(this._oSuggPopover){this._bShouldRefreshListItems=false;this.cancelPendingSuggest();this._oSuggPopover._oPopover.close();if(!this._bUseDialog&&this.$().hasClass("sapMInputFocused")){this.openValueStateMessage()}this.$("SuggDescr").text("");this.$("inner").removeAttr("aria-haspopup");this.$("inner").removeAttr("aria-activedescendant");this._sPrevSuggValue=null}};L.prototype._synchronizeSuggestions=function(){this._bShouldRefreshListItems=true;this._refreshItemsDelayed();if(!this.getDomRef()||this._isSuggestionsPopoverOpen()){return}this._synchronizeSelection()};L.prototype._synchronizeSelection=function(){var e=this.getSelectedKey();if(!e){return}if(this.getValue()&&!this.getSelectedItem()&&!this.getSelectedRow()){return}this.setSelectedKey(e)}})();L.prototype.onfocusin=function(t){e.prototype.onfocusin.apply(this,arguments);this.addStyleClass("sapMInputFocused");if(!this._bUseDialog&&this._isSuggestionsPopoverOpen()){this.closeValueStateMessage()}if(!this._bPopupHasFocus&&!this.getStartSuggestion()&&!this.getValue()&&this.getShowSuggestion()){this._triggerSuggest(this.getValue())}this._bPopupHasFocus=undefined;this._sPrevSuggValue=null};L.prototype.oncompositionend=function(t){e.prototype.oncompositionend.apply(this,arguments);if(this._oSuggPopover&&!h.browser.edge&&!h.browser.firefox){this._oSuggPopover._handleTypeAhead()}};L.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getEditable()||!this.getShowValueHelp()){return}this.bValueHelpRequested=true;this._fireValueHelpRequest(false);e.preventDefault();e.stopPropagation()};L.prototype.onsaphide=L.prototype.onsapshow;L.prototype.onsapselect=function(e){this._fireValueHelpRequestForValueHelpOnly()};L.prototype.onfocusout=function(t){e.prototype.onfocusout.apply(this,arguments);this.removeStyleClass("sapMInputFocused");this.closeValueStateMessage(this);this.$("SuggDescr").text("")};L.prototype._hasTabularSuggestions=function(){return!!(this.getAggregation("suggestionColumns")&&this.getAggregation("suggestionColumns").length)};L.prototype._getSuggestionsTable=function(){if(this._bIsBeingDestroyed){return this._oSuggestionTable}if(!this._oSuggestionTable){this._oSuggestionTable=new p(this.getId()+"-popup-table",{mode:w.SingleSelectMaster,showNoData:false,showSeparators:R.None,width:"100%",enableBusyIndicator:false,rememberSelections:false,itemPress:function(e){if(h.system.desktop){this.focus()}this._oSuggPopover._bSuggestionItemTapped=true;var t=e.getParameter("listItem");this.setSelectionRow(t,true)}.bind(this)});this._oSuggestionTable.addEventDelegate({onAfterRendering:function(){var e,t;if(!this.getEnableSuggestionsHighlighting()){return}e=this._oSuggestionTable.$().find("tbody .sapMLabel");t=(this._sTypedInValue||this.getValue()).toLowerCase();this._oSuggPopover.highlightSuggestionItems(e,t)}.bind(this)});if(this._bUseDialog){this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden")}this._oSuggestionTable.updateItems=function(){p.prototype.updateItems.apply(this,arguments);this._refreshItemsDelayed();return this}}return this._oSuggestionTable};L.prototype.clone=function(){var e=_.prototype.clone.apply(this,arguments),t;t=this.getBindingInfo("suggestionColumns");if(t){e.bindAggregation("suggestionColumns",I.extend({},t))}t=this.getBindingInfo("suggestionRows");if(t){e.bindAggregation("suggestionRows",I.extend({},t))}e.setRowResultFunction(this._fnRowResultFilter);e.setValue(this.getValue());return e};L.prototype.setValue=function(t){this._iSetCount++;e.prototype.setValue.call(this,t);this._onValueUpdated(t);return this};L.prototype.setDOMValue=function(e){this._$input.val(e)};L.prototype.getDOMValue=function(){return this._$input.val()};L.prototype.updateInputField=function(e){if(this._isSuggestionsPopoverOpen()&&this._bUseDialog){this._oSuggPopover._oPopupInput.setValue(e);this._oSuggPopover._oPopupInput._doSelect()}else{e=this._getInputValue(e);this.setDOMValue(e);this.onChange(null,null,e)}};L.prototype.getAccessibilityInfo=function(){var t=e.prototype.getAccessibilityInfo.apply(this,arguments);t.description=((t.description||"")+" "+this.getDescription()).trim();return t};L.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering||this.bValueHelpRequested};L.prototype._getShowMoreButton=function(){return this._oShowMoreButton||(this._oShowMoreButton=new d({text:this._oRb.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(this.getShowTableSuggestionValueHelp()){if(this._oSuggPopover._sTypedInValue){this.updateDomValue(this._oSuggPopover._sTypedInValue);this._oSuggPopover._resetTypeAhead()}this._fireValueHelpRequest(true);this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup()}}.bind(this)}))};L.prototype._addShowMoreButton=function(e){var t=this._oSuggPopover&&this._oSuggPopover._oPopover;if(!t||!e&&!this._hasTabularSuggestions()){return}if(t.isA("sap.m.Dialog")){var o=this._getShowMoreButton();t.setEndButton(o)}else{var s=this._getButtonToolbar();t.setFooter(s)}};L.prototype._removeShowMoreButton=function(){var e=this._oSuggPopover&&this._oSuggPopover._oPopover;if(!e||!this._hasTabularSuggestions()){return}if(e.isA("sap.m.Dialog")){e.setEndButton(null)}else{e.setFooter(null)}};L.prototype._getButtonToolbar=function(){var e=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new S({content:[new c,e]}))};L.prototype._hasShowSelectedButton=function(){return false};L.prototype._createSuggestionPopupContent=function(e){if(this._bIsBeingDestroyed||this._getSuggestionsPopover()._oList){return}this._oSuggPopover._createSuggestionPopupContent(e);if(!this._hasTabularSuggestions()&&!e){this._oSuggPopover._oList.attachItemPress(function(e){if(h.system.desktop){this.focus()}var t=e.getParameter("listItem");if(!t.isA("sap.m.GroupHeaderListItem")){this._oSuggPopover._bSuggestionItemTapped=true;this.setSelectionItem(t._oItem,true)}},this)}else{if(this._fnFilter===f._DEFAULTFILTER){this._fnFilter=L._DEFAULTFILTER_TABULAR}if(!this._fnRowResultFilter){this._fnRowResultFilter=L._DEFAULTRESULT_TABULAR}if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton(e)}}};L.prototype._createPopupInput=function(){var e=new L(this.getId()+"-popup-input",{width:"100%",valueLiveUpdate:true,showValueStateMessage:false,valueState:this.getValueState(),showValueHelp:this.getShowValueHelp(),valueHelpRequest:function(e){this.fireValueHelpRequest({fromSuggestions:true});this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup()}.bind(this),liveChange:function(e){var t=e.getParameter("newValue");this.setDOMValue(this._getInputValue(this._oSuggPopover._oPopupInput.getValue()));this._triggerSuggest(t);this.fireLiveChange({value:t,newValue:t})}.bind(this)});return e};L.prototype._modifyPopupInput=function(e){e.addEventDelegate({onsapenter:function(){if(this.getAutocomplete()){this._oSuggPopover._finalizeAutocomplete()}this._closeSuggestionPopup()}},this);return e};L.prototype.forwardEventHandlersToSuggPopover=function(e){e.setOkPressHandler(this._closeSuggestionPopup.bind(this));e.setCancelPressHandler(this._closeSuggestionPopup.bind(this))};L.prototype._getSuggestionsPopover=function(){if(!this._oSuggPopover){var e=this._oSuggPopover=new f(this);if(this._bUseDialog){var t=this._createPopupInput();e._oPopupInput=this._modifyPopupInput(t)}this._oSuggPopover.setInputLabels(this.getLabels.bind(this));this._createSuggestionsPopoverPopup();this.forwardEventHandlersToSuggPopover(e);this._updateSuggestionsPopoverValueState();e._bAutocompleteEnabled=this.getAutocomplete();e.attachEvent(f.M_EVENTS.SELECTION_CHANGE,function(e){var t=e.getParameter("newValue");this.setDOMValue(t);this._sSelectedSuggViaKeyboard=t;this._doSelect()},this);if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton()}}return this._oSuggPopover};L.prototype._createSuggestionsPopoverPopup=function(){if(!this._oSuggPopover){return}var e=this._oSuggPopover;e._createSuggestionPopup({showSelectedButton:this._hasShowSelectedButton()});var t=e._oPopover;if(this._bUseDialog){t.attachBeforeClose(function(){this.setDOMValue(this._getInputValue(e._oPopupInput.getValue()));this.onChange();if(this instanceof sap.m.MultiInput&&this._bUseDialog){this._onDialogClose()}},this).attachAfterClose(function(){var t=e._oList;if(!t){return}if(p&&!(t instanceof p)){t.destroyItems()}else{t.removeSelections(true)}}).attachAfterOpen(function(){this._triggerSuggest(this.getValue());this._refreshListItems()},this).attachBeforeOpen(function(){e._oPopupInput.setPlaceholder(this.getPlaceholder());e._oPopupInput.setMaxLength(this.getMaxLength());e._oPopupInput.setValue(this.getValue())},this)}else{t.attachAfterClose(function(){this._updateSelectionFromList();var t=e._oList;if(t instanceof p){t.removeSelections(true)}else{t.destroyItems()}e._deregisterResize()},this).attachBeforeOpen(function(){e._sPopoverContentWidth=this.getMaxSuggestionWidth();e._bEnableHighlighting=this.getEnableSuggestionsHighlighting();e._bAutocompleteEnabled=this.getAutocomplete();e._bIsInputIncrementalType=this._isIncrementalType();this._sBeforeSuggest=this.getValue();e._resizePopup();e._registerResize()},this)}this.setAggregation("_suggestionPopup",t);this._oSuggestionPopup=t};L.prototype.showItems=function(e){var t,o,s=this._fnFilter;if(!this.getEnabled()||!this.getEditable()){return}this.setFilterFunction(e||function(){return true});this._clearSuggestionPopupItems();t=this._getFilteredSuggestionItems(this.getDOMValue());o=this._fillSimpleSuggestionPopupItems(t);if(o>0){this._openSuggestionPopup()}else{this._hideSuggestionPopup()}this._applySuggestionAcc(o);this.setFilterFunction(s)};L.prototype.shouldValueStateMessageBeOpened=function(){var t=e.prototype.shouldValueStateMessageBeOpened.apply(this,arguments);if(!t||this._isSuggestionsPopoverOpen()){return false}return true};L.prototype._isSuggestionsPopoverOpen=function(){return this._oSuggPopover&&this._oSuggPopover.isOpen()};L.prototype._openSuggestionsPopover=function(){this.closeValueStateMessage();this._updateSuggestionsPopoverValueState();this._oSuggPopover._oPopover.open()};L.prototype._updateSuggestionsPopoverValueState=function(){var e=this._oSuggPopover,t=this.getValueState();if(e){e.updateValueState(t,this.getValueStateText(),this.getShowValueStateMessage());if(this._bUseDialog){e._oPopupInput.setValueState(t)}}};L.prototype.setShowValueHelp=function(e){this.setProperty("showValueHelp",e);if(this._oSuggPopover&&this._oSuggPopover._oPopupInput){this._oSuggPopover._oPopupInput.setShowValueHelp(e)}return this};L.prototype.setValueState=function(t){e.prototype.setValueState.apply(this,arguments);this._updateSuggestionsPopoverValueState();return this};L.prototype.setValueStateText=function(t){e.prototype.setValueStateText.apply(this,arguments);this._updateSuggestionsPopoverValueState();return this};L.prototype.setShowValueStateMessage=function(t){e.prototype.setShowValueStateMessage.apply(this,arguments);this._updateSuggestionsPopoverValueState();return this};return L});