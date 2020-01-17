/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,r=e.Audiences;var s={id:"titleLevelProperty",audiences:[r.Internal],categories:[t.FioriGuidelines,t.Accessibility],enabled:true,minversion:"*",title:"Title: It is recommended to set the level property",description:"Level defines the semantic level of the title. This information is used by assistive technologies like screen readers to create a hierarchical site map for faster navigation.",resolution:"Add value to the level property",resolutionurls:[{text:"SAP Fiori Design Guidelines: Title",href:"https://experience.sap.com/fiori-design-web/title/#guidelines"},{text:"API Reference: Title",href:"https://ui5.sap.com/#/api/sap.m.Title/controlProperties"}],check:function(e,t,r){r.getElementsByClassName("sap.m.Title").forEach(function(t){if(t.getProperty("level")===sap.ui.core.TitleLevel.Auto){var r=t.getId(),s=t.getMetadata().getElementName();e.addIssue({severity:i.Low,details:"Title '"+s+"' ("+r+") has no level property set",context:{id:r}})}})}};return[s]},true);