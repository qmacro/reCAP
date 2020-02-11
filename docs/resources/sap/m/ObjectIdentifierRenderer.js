/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var n;if(!t.getVisible()){return}e.openStart("div",t);e.class("sapMObjectIdentifier");n=t.getTooltip_AsString();if(n){e.attr("title",n)}e.openEnd();e.openStart("div");e.class("sapMObjectIdentifierTopRow");if(!t._hasTopRow()){e.style("display","none")}e.openEnd();e.openStart("div",t.getId()+"-title");e.class("sapMObjectIdentifierTitle");e.openEnd();e.renderControl(t._getTitleControl());e.renderControl(t._oAriaCustomRole);e.close("div");e.openStart("div");e.class("sapMObjectIdentifierIcons");e.openEnd();if(t.getBadgeAttachments()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getAttachmentsIcon());e.close("span")}if(t.getBadgeNotes()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getNotesIcon());e.close("span")}if(t.getBadgePeople()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getPeopleIcon());e.close("span")}e.close("div");e.close("div");e.openStart("div",t.getId()+"-text");e.class("sapMObjectIdentifierText");if(!!t.getProperty("text")&&!!t.getProperty("title")){e.class("sapMObjectIdentifierTextBellow")}e.openEnd();e.renderControl(t._getTextControl());e.close("div");e.close("div")};return e},true);