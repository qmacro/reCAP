/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/registry/Settings","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/write/_internal/Storage","sap/base/util/UriParameters","sap/ui/model/json/JSONModel","sap/ui/fl/Utils","sap/ui/model/BindingMode"],function(e,r,t,n,i,s,a){"use strict";var o={};var f=9;var d=f+1;function l(e,r,t){var n=c(t);var o=sap.ui.fl.Versions.Original;t.forEach(function(e){if(e.version===sap.ui.fl.Versions.Draft){e.type="draft"}else if(o===sap.ui.fl.Versions.Original){e.type="active";o=e.version}else{e.type="inactive"}});var d=s.getParameter(sap.ui.fl.Versions.UrlParameter);var l;if(d){l=parseInt(d)}else if(t.length>0){l=t[0].version}else{l=sap.ui.fl.Versions.Original}var p=new i({versioningEnabled:r,versions:t,activeVersion:o,backendDraft:n,dirtyChanges:false,draftAvailable:n,activateEnabled:n,persistedVersion:l,displayedVersion:l});p.setDefaultBindingMode(a.OneWay);p.setSizeLimit(f);p.setDirtyChanges=function(e){p.setProperty("/dirtyChanges",e);p.updateDraftVersion();p.updateBindings(true)};p.updateDraftVersion=function(){var e=p.getProperty("/versions");var r=p.getProperty("/versioningEnabled");var t=p.getProperty("/dirtyChanges");var n=p.getProperty("/backendDraft");var i=r&&(t||n);p.setProperty("/draftAvailable",i);var s=t?sap.ui.fl.Versions.Draft:p.getProperty("/persistedVersion");p.setProperty("/displayedVersion",s);if(!c(e)&&i){e.splice(0,0,{version:sap.ui.fl.Versions.Draft,type:"draft"})}if(c(e)&&!i){e.shift();p.setProperty("/displayedVersion",p.getProperty("/persistedVersion"))}var a=p.getProperty("/displayedVersion")!==p.getProperty("/activeVersion");p.setProperty("/activateEnabled",a)};return p}function p(e,r){var t=[];var n=r.changePersistences;n.forEach(function(e){t=e.getDirtyChanges().concat();t.forEach(function(r){e.deleteChange(r,true)})});return t.length>0}function v(e){var t={dirtyChangesExist:false,changePersistences:[]};if(e.reference){var n=r.getChangePersistenceForComponent(e.reference);if(n.getDirtyChanges().length>0){t.dirtyChangesExist=true;t.changePersistences.push(n)}}if(e.nonNormalizedReference){var i=r.getChangePersistenceForComponent(e.nonNormalizedReference);if(i.getDirtyChanges().length>0){t.dirtyChangesExist=true;t.changePersistences.push(i)}}return t}function c(e){return e.some(function(e){return e.version===sap.ui.fl.Versions.Draft})}var g={};g.initialize=function(r){var n=r.reference;var i=r.layer;r.limit=d;return e.getInstance().then(function(e){var s=e.isVersioningEnabled(i);var a=s?t.versions.load(r):Promise.resolve([]);return a.then(function(e){o[n]=o[n]||{};o[n][i]=o[n][i]||{};o[n][i]=l(r,s,e);return o[n][i]})})};g.getVersionsModel=function(e){var r=e.reference;var t=e.layer;if(!o[r]||!o[r][t]){throw Error("Versions Model for reference '"+r+"' and layer '"+t+"' were not initialized.")}var n=v(e);if(n.dirtyChangesExist){o[r][t].updateDraftVersion(e)}return o[r][t]};g.clearInstances=function(){o={}};g.onAllChangesSaved=function(e){e.reference=s.normalizeReference(e.reference);var r=g.getVersionsModel(e);var t=r.getProperty("/versioningEnabled");var n=r.getProperty("/dirtyChanges");r.setProperty("/dirtyChanges",true);r.setProperty("/backendDraft",t&&n);r.updateDraftVersion()};g.activate=function(e){var r=g.getVersionsModel(e);var n=r.getProperty("/versions");var i=c(n);var s=r.getProperty("/displayedVersion");var a=r.getProperty("/activeVersion");var o=r.getProperty("/persistedVersion");if(s===a){return Promise.reject("Version is already active")}e.version=s;var f=[];if(r.getProperty("/dirtyChanges")){var d=v(e);var l=d.changePersistences;f=l.map(function(r){return r.saveDirtyChanges(e.appComponent,false,undefined,o)})}return Promise.all(f).then(t.versions.activate.bind(undefined,e)).then(function(e){n.forEach(function(e){e.type="inactive"});e.type="active";if(i){n.shift()}n.splice(0,0,e);r.setProperty("/backendDraft",false);r.setProperty("/dirtyChanges",false);r.setProperty("/draftAvailable",false);r.setProperty("/activateEnabled",false);r.setProperty("/activeVersion",e.version);r.setProperty("/displayedVersion",e.version);r.setProperty("/persistedVersion",e.version);r.updateBindings(true)})};g.discardDraft=function(e){var r=g.getVersionsModel(e);var n=r.getProperty("/versions");var i=v(e);var s=r.getProperty("/backendDraft");var a=s?t.versions.discardDraft(e):Promise.resolve();return a.then(function(){n.shift();r.setProperty("/backendDraft",false);r.setProperty("/dirtyChanges",false);r.setProperty("/draftAvailable",false);r.setProperty("/activateEnabled",false);r.setProperty("/displayedVersion",r.getProperty("/persistedVersion"));r.updateBindings(true);var t=p(e,i);return{backendChangesDiscarded:s,dirtyChangesDiscarded:t}})};return g});