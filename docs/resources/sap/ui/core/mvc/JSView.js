/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./View","./JSViewRenderer","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/library","sap/base/Log"],function(e,i,t,n,r,s,o){"use strict";var a=i.extend("sap.ui.core.mvc.JSView",{metadata:{library:"sap.ui.core"}});var c={};a.asyncSupport=true;var p=s.mvc.ViewType;a.create=function(e){var t=n({},e);for(var r in t){if(r==="definition"||r==="preprocessors"){delete t[r];o.warning("JSView.create does not support the options definition or preprocessor!")}}t.type=p.JS;return i.create(t)};sap.ui.jsview=function(e,i,t){var n=function(t){o[t]("Do not use deprecated view factory functions."+"Use the static create function on the specific view module instead: [XML|JS|HTML|JSON]View.create().","sap.ui.view",null,function(){return{type:"sap.ui.view",name:e||i&&i.name}})};if(i&&i.async){n("info")}else{n("warning")}return u.apply(this,arguments)};function u(e,i,t){var n={},r;if(i&&typeof i=="string"){n.viewName=i;if(typeof arguments[2]=="boolean"){n.async=t}else if(typeof arguments[2]=="object"){n.controller=arguments[2];n.async=!!arguments[3]}r=new a(e,n);return r}else if(i&&typeof i=="object"){c[e]=i;sap.ui.loader._.declareModule(e.replace(/\./g,"/")+".view.js");o.info("For defining views use JSView.extend instead.")}else if(arguments.length==1&&typeof e=="string"||arguments.length==2&&typeof arguments[0]=="string"&&typeof arguments[1]=="boolean"){n.viewName=arguments[0];n.async=!!arguments[1];r=n.id?new a(n.id,n):new a(n);return r}else{throw new Error("Wrong arguments ('"+e+"', '"+i+"')! Either call sap.ui.jsview([sId,] sViewName) to instantiate a View or sap.ui.jsview(sViewName, oViewImpl) to define a View type.")}}a.prototype.initViewSettings=function(i){var t;if(!c[i.viewName]){var n=i.viewName.replace(/\./g,"/")+".view";if(i.async){t=new Promise(function(e,i){sap.ui.require([n],e,i)})}else{sap.ui.requireSync(n)}}if(i.async){return Promise.resolve(t).then(function(){e.extend(this,c[i.viewName])}.bind(this))}e.extend(this,c[i.viewName])};a.prototype.onControllerConnected=function(e){r.runWithPreprocessors(function(){this.applySettings({content:this.createContent(e)})},{id:this.getAutoPrefixId()?this.createId.bind(this):undefined,settings:this._fnSettingsPreprocessor},this)};a.prototype.getAutoPrefixId=function(){return false};return a});