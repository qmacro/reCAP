/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/EventProvider","sap/ui/core/InvisibleText","sap/ui/core/ListItem","sap/ui/core/ResizeHandler","sap/ui/core/ValueStateSupport","sap/m/library","sap/ui/core/library","sap/m/Bar","sap/m/Toolbar","sap/m/Button","sap/m/ToggleButton","sap/m/ColumnListItem","sap/m/GroupHeaderListItem","sap/ui/core/SeparatorItem","sap/m/Dialog","sap/m/DisplayListItem","sap/m/List","sap/m/Popover","sap/m/StandardListItem","sap/m/Table","sap/m/Title","sap/ui/core/IconPool","sap/base/security/encodeXML","sap/ui/events/KeyCodes","sap/m/ValueStateHeader"],function(e,t,o,s,i,n,r,a,u,p,l,h,_,d,g,c,f,S,I,v,m,P,y,b,T,L){"use strict";var V=r.ListMode;var C=r.PlacementType;var H=r.ListType;var w=r.ListSeparators;var x="sapMSuggestionsPopover",A="sapUiNoContentPadding";var E=a.ValueState;var D=t.extend("sap.m.SuggestionsPopover",{constructor:function(o){t.apply(this,arguments);this._oInput=o;this._bHasTabularSuggestions=false;this._bUseDialog=e.system.phone;this._iPopupListSelectedIndex=-1;this._sPopoverContentWidth=null;this._bEnableHighlighting=true;this._bIsInputIncrementalType=false;this._bAutocompleteEnabled=false;this._sTypedInValue="";this._sOldValueState=E.None;this._oInput.addEventDelegate({onsapup:function(e){this._onsaparrowkey(e,"up",1)},onsapdown:function(e){this._onsaparrowkey(e,"down",1)},onsappageup:function(e){this._onsaparrowkey(e,"up",5)},onsappagedown:function(e){this._onsaparrowkey(e,"down",5)},onsaphome:function(e){if(this._oList){this._onsaparrowkey(e,"up",this._oList.getItems().length)}},onsapend:function(e){if(this._oList){this._onsaparrowkey(e,"down",this._oList.getItems().length)}},onsapright:this._onsapright},this)},destroy:function(){if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this._oList){this._oList.destroy();this._oList=null}this._oProposedItem=null;this._oInputDelegate=null;this._oValueStateHeader=null;if(this._oPickerValueStateText){this._oPickerValueStateText.destroy();this._oPickerValueStateText=null}}});D.M_EVENTS={SELECTION_CHANGE:"selectionChange"};D._wordStartsWithValue=function(e,t){var o;if(!e||!t||typeof e!=="string"||typeof t!=="string"){return false}while(e){if(typeof t==="string"&&t!==""&&e.toLowerCase().indexOf(t.toLowerCase())===0){return true}o=e.indexOf(" ");if(o===-1){break}e=e.substring(o+1)}return false};D._DEFAULTFILTER=function(e,t){if(t instanceof s&&D._wordStartsWithValue(t.getAdditionalText(),e)){return true}return D._wordStartsWithValue(t.getText(),e)};D.prototype.isOpen=function(){return this._oPopover&&this._oPopover.isOpen()};D.prototype.setInputLabels=function(e){this._fnInputLabels=e};D.prototype._getInputLabels=function(){return this._fnInputLabels()};D.prototype._getScrollableContent=function(){return this._oPopover&&this._oPopover.getDomRef("scroll")};D.prototype.updatePickerHeaderTitle=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=this.getPickerTitle(),o,s;if(!t){return}s=this._getInputLabels();if(s.length){o=s[0];if(o&&typeof o.getText==="function"){t.setText(o.getText())}}else{t.setText(e.getText("COMBOBOX_PICKER_TITLE"))}return t};D.prototype.getPickerTitle=function(){return this._oPopover.getCustomHeader().getContentMiddle()[0]};D.prototype.getOkButton=function(){var e=this._oPopover&&this._oPopover.getBeginButton();return e||null};D.prototype.getCancelButton=function(){var e=this._oPopover&&this._oPopover.getCustomHeader()&&this._oPopover.getCustomHeader().getContentRight&&this._oPopover.getCustomHeader().getContentRight()[0];return e||null};D.prototype.getFilterSelectedButton=function(){var e=this._oPopover&&this._oPopover.getSubHeader()&&this._oPopover.getSubHeader().getContent()[1];return e||null};D.prototype._createFilterSelectedButton=function(){var e=y.getIconURI("multiselect-all");return new h({icon:e})};D.prototype._createSuggestionPopup=function(e){e=e||[];var t=this._oInput,s=this,i=t._oRb;this._oPopover=!this._bUseDialog?new I(t.getId()+"-popup",{showArrow:false,placement:C.VerticalPreferredBottom,showHeader:true,initialFocus:t,horizontalScrolling:true}):new c(t.getId()+"-popup",{beginButton:new l(t.getId()+"-popup-closeButton",{text:i.getText("SUGGESTIONSPOPOVER_CLOSE_BUTTON")}),stretch:true,customHeader:new u(t.getId()+"-popup-header",{contentMiddle:new P,contentRight:new l({icon:y.getIconURI("decline")})}),subHeader:this.createSubHeaderContent(e),horizontalScrolling:false,initialFocus:this._oPopupInput,beforeOpen:function(){s.updatePickerHeaderTitle()},afterClose:function(){t.focus();r.closeKeyboard()}});this._registerAutocomplete();this._oPopover.addStyleClass(x);this._oPopover.addStyleClass(A);this._oPopover.addAriaLabelledBy(o.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));if(!this._bUseDialog){this._overwritePopover()}if(this._oList){this._oPopover.addContent(this._oList)}};D.prototype.createSubHeaderContent=function(e){var t=[this._oPopupInput];if(e.showSelectedButton){t.push(this._createFilterSelectedButton())}return new p({content:t})};D.prototype._createSuggestionPopupContent=function(e){var t=this._oInput;this._bHasTabularSuggestions=e;if(!e){this._oList=new S(t.getId()+"-popup-list",{showNoData:false,mode:V.SingleSelectMaster,rememberSelections:false,width:"100%",showSeparators:w.None,busyIndicatorDelay:0});this._oList.addEventDelegate({onAfterRendering:function(){var e,t;if(!this._bEnableHighlighting){return}e=this._oList.$().find(".sapMDLILabel, .sapMSLITitleOnly, .sapMDLIValue");t=(this._sTypedInValue||this._oInput.getValue()).toLowerCase();this.highlightSuggestionItems(e,t)}.bind(this)})}else{this._oList=this._oInput._getSuggestionsTable()}if(this._oPopover){if(this._bUseDialog){this._oPopover.addAggregation("content",this._oList,true);var o=this._oPopover.$("scrollCont")[0];if(o){var s=sap.ui.getCore().createRenderManager();s.renderControl(this._oList);s.flush(o);s.destroy()}}else{this._oPopover.addContent(this._oList)}}};D.prototype._getValueStateHeader=function(){if(!this._oValueStateHeader){this._oValueStateHeader=new L;if(this._oPopover.isA("sap.m.Popover")){this._oPopover.setCustomHeader(this._oValueStateHeader)}else{this._oPopover.insertContent(this._oValueStateHeader,0)}this._oValueStateHeader.setPopup(this._oPopover)}return this._oValueStateHeader};D.prototype._destroySuggestionPopup=function(){if(this._oPopover){if(this._oList instanceof m){this._oPopover.removeAllContent()}this._oPopover.destroy();this._oPopover=null}if(this._oList instanceof S){this._oList.destroy();this._oList=null}if(this._oPickerValueStateText){this._oPickerValueStateText.destroy();this._oPickerValueStateText=null}if(this._oValueStateHeader){this._oValueStateHeader.destroy();this._oValueStateHeader=null}this._getInput().removeEventDelegate(this._oInputDelegate,this)};D.prototype._overwritePopover=function(){var e=this._oInput;this._oPopover.open=function(){this.openBy(e,false,true)};this._oPopover.oPopup.setAnimations(function(e,t,o){o()},function(e,t,o){o()})};D.prototype._resizePopup=function(){var e=this._oInput;if(this._oList&&this._oPopover){if(this._sPopoverContentWidth){this._oPopover.setContentWidth(this._sPopoverContentWidth)}else{this._oPopover.setContentWidth(e.$().outerWidth()+"px")}setTimeout(function(){if(this._oPopover&&this._oPopover.isOpen()&&this._oPopover.$().outerWidth()<e.$().outerWidth()){this._oPopover.setContentWidth(e.$().outerWidth()+"px")}}.bind(this),0)}};D.prototype._registerResize=function(){if(!this._bUseDialog){this._sPopupResizeHandler=i.register(this._oInput,this._resizePopup.bind(this))}};D.prototype._deregisterResize=function(){if(this._sPopupResizeHandler){this._sPopupResizeHandler=i.deregister(this._sPopupResizeHandler)}};D.prototype._onsaparrowkey=function(t,o,s){var i=this._oInput,n,r=i.$("inner");if(t.isMarked()){return}if(t.isMarked()){return}if(!i.getEnabled()||!i.getEditable()){return}if(o!=="up"&&o!=="down"){return}if(this._bIsInputIncrementalType){t.setMarked()}if(!this._oPopover||!this._oPopover.isOpen()){return}t.preventDefault();t.stopPropagation();var a=false,u=this._oList,p=u.getItems(),l=this._iPopupListSelectedIndex,h,d=l;if(o==="up"&&l===0){return}if(o=="down"&&l===p.length-1){return}var g;if(s>1){if(o=="down"&&l+s>=p.length){o="up";s=1;p[l].setSelected(false);g=l;l=p.length-1;a=true}else if(o=="up"&&l-s<0){o="down";s=1;p[l].setSelected(false);g=l;l=0;a=true}}if(l===-1){l=0;if(this._isSuggestionItemSelectable(p[l])){d=l;a=true}else{o="down"}}if(o==="down"){while(l<p.length-1&&(!a||!this._isSuggestionItemSelectable(p[l]))){p[l].setSelected(false);l=l+s;a=true;s=1;if(g===l){break}}}else{while(l>0&&(!a||!p[l].getVisible()||!this._isSuggestionItemSelectable(p[l]))){p[l].setSelected(false);l=l-s;a=true;s=1;if(g===l){break}}}if(!this._isSuggestionItemSelectable(p[l])){if(d>=0){p[d].setSelected(true).updateAccessibilityState();r.attr("aria-activedescendant",p[d].getId())}return}else{n=p[l];n.setSelected(true).updateAccessibilityState();if(n.isA("sap.m.GroupHeaderListItem")){r.removeAttr("aria-activedescendant")}else{r.attr("aria-activedescendant",p[l].getId())}}if(e.system.desktop){this._scrollToItem(l)}this._oLastSelectedHeader&&this._oLastSelectedHeader.removeStyleClass("sapMInputFocusedHeaderGroup");if(_&&p[l]instanceof _){h=i._getInputValue(i._fnRowResultFilter(p[l]))}else{if(p[l].isA("sap.m.GroupHeaderListItem")){h="";p[l].addStyleClass("sapMInputFocusedHeaderGroup");this._oLastSelectedHeader=p[l]}else if(p[l]instanceof f){h=i._getInputValue(p[l].getLabel())}else{h=i._getInputValue(p[l].getTitle())}}this._iPopupListSelectedIndex=l;this._bSuggestionItemChanged=true;this.fireEvent(D.M_EVENTS.SELECTION_CHANGE,{newValue:h})};D.prototype._isSuggestionItemSelectable=function(e){var t=this._bHasTabularSuggestions||e.getType()!==H.Inactive||e.isA("sap.m.GroupHeaderListItem");return e.getVisible()&&t};D.prototype.setOkPressHandler=function(e){var t=this.getOkButton();t&&t.attachPress(e);return t};D.prototype.setCancelPressHandler=function(e){var t=this.getCancelButton();t&&t.attachPress(e)};D.prototype.setShowSelectedPressHandler=function(e){var t=this.getFilterSelectedButton();t&&t.attachPress(e);return t};D.prototype._scrollToItem=function(e){var t=this._oPopover,o=this._oList,s,i,n,r,a;if(!(t instanceof I)||!o){return}s=t.getScrollDelegate();if(!s){return}var u=o.getItems()[e],p=u&&u.getDomRef();if(!p){return}i=t.getDomRef("cont").getBoundingClientRect();n=p.getBoundingClientRect();r=i.top-n.top;a=n.bottom-i.bottom;if(r>0){s.scrollTo(s._scrollX,Math.max(s._scrollY-r,0))}else if(a>0){s.scrollTo(s._scrollX,s._scrollY+a)}};D.prototype._createHighlightedText=function(e,t,o){var s,i,n,r,a,u=e?e.innerText:"",p="";if(!D._wordStartsWithValue(u,t)){return b(u)}t=t.toLowerCase();n=t.length;while(D._wordStartsWithValue(u,t)){s=u.toLowerCase();i=s.indexOf(t);i=i>0?s.indexOf(" "+t)+1:i;a=u.substring(0,i);u=u.substring(i);p+=b(a);a=u.substring(0,n);u=u.substring(n);p+='<span class="sapMInputHighlight">'+b(a)+"</span>";r=u.indexOf(" ");r=r===-1?u.length:r;a=u.substring(0,r);u=u.substring(r);p+=b(a);if(!o){break}}if(u){p+=b(u)}return p};D.prototype.highlightSuggestionItems=function(e,t,o){var s;if(!this._bEnableHighlighting||!e&&!e.length){return}for(s=0;s<e.length;s++){e[s].innerHTML=this._createHighlightedText(e[s],t,o)}};D.prototype._registerAutocomplete=function(){var t=this._oPopover,o=this._getInput(),s=this._bUseDialog;if(s){t.addEventDelegate({ontap:function(){if(!this._bSuggestionItemTapped&&this._sProposedItemText){o.setValue(this._sProposedItemText);this._sProposedItemText=null}}},this)}else{t.attachAfterOpen(this._handleTypeAhead,this)}t.attachAfterOpen(this._setSelectedSuggestionItem,this);t.attachAfterClose(this._finalizeAutocomplete,this);this._oInputDelegate={onkeydown:function(t){this._bDoTypeAhead=!e.os.android&&this._bAutocompleteEnabled&&t.which!==T.BACKSPACE&&t.which!==T.DELETE},oninput:this._handleTypeAhead};o.addEventDelegate(this._oInputDelegate,this)};D.prototype._handleTypeAhead=function(){var t=this._getInput(),o=t.getValue();this._oProposedItem=null;this._sProposedItemText=null;this._sTypedInValue=o;if(!this._bDoTypeAhead||o===""){return}if(!this._oPopover.isOpen()||o.length<this._oInput.getStartSuggestion()){return}if(document.activeElement!==t.getFocusDomRef()){return}var s=o.toLowerCase(),i=this._bHasTabularSuggestions?this._oInput.getSuggestionRows():this._oInput.getSuggestionItems(),n,r,a,u;i=i.filter(function(e){return!(e.isA("sap.ui.core.SeparatorItem")||e.isA("sap.m.GroupHeaderListItem"))});n=i.length;for(u=0;u<n;u++){a=this._bHasTabularSuggestions?this._oInput._fnRowResultFilter(i[u]):i[u].getText();if(a.toLowerCase().indexOf(s)===0){this._oProposedItem=i[u];r=a;break}}this._sProposedItemText=r;if(r){r=this._formatTypedAheadValue(r);if(!t.isComposingCharacter()){t.updateDomValue(r)}if(e.system.desktop){t.selectText(o.length,r.length)}else{setTimeout(function(){t.selectText(o.length,r.length)},0)}}};D.prototype._setSelectedSuggestionItem=function(){var e;if(this._oList){e=this._oList.getItems();for(var t=0;t<e.length;t++){if((e[t]._oItem||e[t])===this._oProposedItem){e[t].setSelected(true);break}}}};D.prototype._getInput=function(){return this._bUseDialog?this._oPopupInput:this._oInput};D.prototype._finalizeAutocomplete=function(){if(this._oInput.isComposingCharacter()){return}if(!this._bAutocompleteEnabled){return}if(!this._bSuggestionItemTapped&&!this._bSuggestionItemChanged&&this._oProposedItem){if(this._bHasTabularSuggestions){this._oInput.setSelectionRow(this._oProposedItem,true)}else{this._oInput.setSelectionItem(this._oProposedItem,true)}}if(this._oProposedItem&&document.activeElement===this._oInput.getFocusDomRef()){var e=this._oInput.getValue().length;this._oInput.selectText(e,e)}this._resetTypeAhead()};D.prototype._resetTypeAhead=function(){this._oProposedItem=null;this._sProposedItemText=null;this._sTypedInValue="";this._bSuggestionItemTapped=false;this._bSuggestionItemChanged=false};D.prototype._formatTypedAheadValue=function(e){return this._sTypedInValue.concat(e.substring(this._sTypedInValue.length,e.length))};D.prototype._onsapright=function(){var e=this._oInput,t=e.getValue();if(!this._bAutocompleteEnabled){return}if(this._sTypedInValue!==t){this._sTypedInValue=t;e.fireLiveChange({value:t,newValue:t})}};D.prototype.updateValueState=function(e,t,o){var s=o&&e!==E.None;t=t||n.getAdditionalText(e);if(!this._oPopover){return this}if(this._oPopupInput){this._oPopupInput.setValueState(e)}this._getValueStateHeader().setValueState(e);this._setValueStateHeaderText(t);this._showValueStateHeader(s);this._alignValueStateStyles(e);return this};D.prototype._showValueStateHeader=function(e){if(this._oValueStateHeader){this._oValueStateHeader.setVisible(e)}};D.prototype._setValueStateHeaderText=function(e){if(this._oValueStateHeader){this._oValueStateHeader.setText(e)}};D.prototype._alignValueStateStyles=function(e){var t=x+"ValueState",o=x+this._sOldValueState+"State",s=x+e+"State";this._oPopover.addStyleClass(t);this._oPopover.removeStyleClass(o);this._oPopover.addStyleClass(s);this._sOldValueState=e};D.prototype.addContent=function(e){this._oPopover.addContent(e)};return D});