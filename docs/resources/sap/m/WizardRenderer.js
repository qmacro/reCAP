/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,t){this.startWizard(e,t);this.renderProgressNavigator(e,t);this.renderWizardSteps(e,t);this.endWizard(e)};e.startWizard=function(e,t){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("WIZARD_LABEL");e.write("<div");e.writeControlData(t);e.addClass("sapMWizard");e.addClass("sapMWizardBg"+t.getBackgroundDesign());e.writeClasses();e.addStyle("width",t.getWidth());e.addStyle("height",t.getHeight());e.writeAccessibilityState({label:r});e.writeStyles();e.write(">")};e.renderProgressNavigator=function(e,t){e.renderControl(t.getAggregation("_progressNavigator"))};e.renderWizardSteps=function(e,t){e.write("<section class='sapMWizardStepContainer'");e.writeAttribute("id",t.getId()+"-step-container");e.write(">");var r=this._getStepsRenderingOrder(t);r.forEach(e.renderControl,e);e.write("</section>")};e.endWizard=function(e){e.write("</div>")};e._getStepsRenderingOrder=function(e){if(!e.getEnableBranching()){return e.getSteps()}var t=e.getSteps().slice(),r,i,n,a;var s=function(e,r,i){var n=sap.ui.getCore().byId(e);if(t.indexOf(n)<t.indexOf(i)){var a=t.indexOf(n),s=t[a];t[a]=i;t[r]=s;r=0}return r};for(r=0;r<t.length;r++){i=t[r];a=i.getSubsequentSteps();if(a.length<1&&i.getNextStep()){a=[i.getNextStep()]}for(n=0;n<a.length;n++){r=s(a[n],r,i)}}return t};return e},true);