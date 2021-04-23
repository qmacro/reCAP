/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_ODataMetaModelUtils","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ClientContextBinding","sap/ui/model/Context","sap/ui/model/FilterProcessor","sap/ui/model/MetaModel","sap/ui/model/json/JSONListBinding","sap/ui/model/json/JSONModel","sap/ui/model/json/JSONPropertyBinding","sap/ui/model/json/JSONTreeBinding","sap/ui/performance/Measurement"],function(t,e,n,i,o,r,a,s,l,p,u,d,y,c,h,f,g){"use strict";var m="sap.ui.model.odata.ODataMetaModel",O=[m],v=m+"/load",M=/^((\/dataServices\/schema\/\d+)\/(?:complexType|entityType)\/\d+)\/property\/\d+$/;var C=y.extend("sap.ui.model.odata.ODataMetaListBinding"),b=r.extend("sap.ui.model.odata._resolver",{metadata:{properties:{any:"any"}}});C.prototype.applyFilter=function(){var t=this,e=u.combineFilters(this.aFilters,this.aApplicationFilters);this.aIndices=u.apply(this.aIndices,e,function(e,n){return n==="@sapui.name"?e:t.oModel.getProperty(n,t.oList[e])},this.mNormalizeCache);this.iLength=this.aIndices.length};var D=d.extend("sap.ui.model.odata.ODataMetaModel",{constructor:function(e,n,i){var o=i.annotationsLoaded(),r=this;function a(){var i;if(r.bDestroyed){throw new Error("Meta model already destroyed")}g.average(v,"",O);i=JSON.parse(JSON.stringify(e.getServiceMetadata()));r.oModel=new c(i);r.oModel.setDefaultBindingMode(r.sDefaultBindingMode);t.merge(n?n.getAnnotationsData():{},i,r);g.end(v)}d.apply(this);this.oModel=null;this.mContext2Promise={};this.sDefaultBindingMode=s.OneTime;this.oLoadedPromise=o?o.then(a):new Promise(function(t,e){a();t()});this.oMetadata=e;this.oDataModel=i;this.mQueryCache={};this.mQName2PendingRequest={};this.oResolver=undefined;this.mSupportedBindingModes={OneTime:true}}});D.prototype._getObject=function(t,n){var i=n,r,a,s,l,u,d,y,c=t||"",h;if(!n||n instanceof p){c=this.resolve(t||"",n);if(!c){e.error("Invalid relative path w/o context",t,m);return null}}if(c.charAt(0)==="/"){i=this.oModel._getObject("/");c=c.slice(1)}y="/";u=i;while(c){d=undefined;r=undefined;if(c.charAt(0)==="["){try{h=o.parseExpression(c,1);l=h.at;if(c.length===l+1||c.charAt(l+1)==="/"){r=h.result;d=c.slice(0,l+1);c=c.slice(l+2)}}catch(t){if(!(t instanceof SyntaxError)){throw t}}}if(d===undefined){l=c.indexOf("/");if(l<0){d=c;c=""}else{d=c.slice(0,l);c=c.slice(l+1)}}if(!u){if(e.isLoggable(e.Level.WARNING,m)){e.warning("Invalid part: "+d,"path: "+t+", context: "+(n instanceof p?n.getPath():n),m)}break}if(r){if(i===n){e.error("A query is not allowed when an object context has been given",t,m);return null}if(!Array.isArray(u)){e.error("Invalid query: '"+y+"' does not point to an array",t,m);return null}a=y+d;d=this.mQueryCache[a];if(d===undefined){this.oResolver=this.oResolver||new b({models:this.oModel});for(s=0;s<u.length;s+=1){this.oResolver.bindObject(y+s);this.oResolver.bindProperty("any",r);try{if(this.oResolver.getAny()){this.mQueryCache[a]=d=s;break}}finally{this.oResolver.unbindProperty("any");this.oResolver.unbindObject()}}}}u=u[d];y=y+d+"/"}return u};D.prototype._mergeMetadata=function(e){var n=this.getODataEntityContainer(),i=t.getChildAnnotations(e.annotations,n.namespace+"."+n.name,true),o=n.entitySet.length,r=this.oModel.getObject("/dataServices/schema"),a=this;e.entitySets.forEach(function(i){var o,s,l=i.entityType,p=l.slice(0,l.lastIndexOf("."));if(!a.getODataEntitySet(i.name)){n.entitySet.push(JSON.parse(JSON.stringify(i)));if(!a.getODataEntityType(l)){o=a.oMetadata._getEntityTypeByName(l);s=t.getSchema(r,p);s.entityType.push(JSON.parse(JSON.stringify(o)));t.visitParents(s,e.annotations,"entityType",t.visitEntityType,s.entityType.length-1)}}});t.visitChildren(n.entitySet,i,"EntitySet",r,null,o)};D.prototype._sendBundledRequest=function(){var t=this.mQName2PendingRequest,e=Object.keys(t),n=this;if(!e.length){return}this.mQName2PendingRequest={};e=e.sort();e.forEach(function(t,n){e[n]=encodeURIComponent(t)});this.oDataModel.addAnnotationUrl("$metadata?sap-value-list="+e.join(",")).then(function(e){var i;n._mergeMetadata(e);for(i in t){try{t[i].resolve(e)}catch(e){t[i].reject(e)}}},function(e){var n;for(n in t){t[n].reject(e)}})};D.prototype.bindContext=function(t,e,n){return new l(this,t,e,n)};D.prototype.bindList=function(t,e,n,i,o){return new C(this,t,e,n,i,o)};D.prototype.bindProperty=function(t,e,n){return new h(this,t,e,n)};D.prototype.bindTree=function(t,e,n,i){return new f(this,t,e,n,i)};D.prototype.destroy=function(){d.prototype.destroy.apply(this,arguments);return this.oModel&&this.oModel.destroy.apply(this.oModel,arguments)};D.prototype.fetchCodeList=function(){return a.resolve(null)};D.prototype.getMetaContext=function(t){var e,n,i,o,r,a,s,l,p;function u(t){var e=t.indexOf("(");return e>=0?t.slice(0,e):t}if(!t){return null}l=t.split("/");if(l[0]!==""){throw new Error("Not an absolute path: "+t)}l.shift();s=u(l[0]);n=this.getODataEntitySet(s);if(n){p=n.entityType}else{o=this.getODataFunctionImport(s);if(o){if(l.length===1){r=this.getODataFunctionImport(s,true)}p=o.returnType;if(p.lastIndexOf("Collection(",0)===0){p=p.slice(11,-1)}}else{throw new Error("Entity set or function import not found: "+s)}}l.shift();while(l.length){i=this.getODataEntityType(p);if(i){a=u(l[0]);e=this.getODataAssociationEnd(i,a)}else{i=this.getODataComplexType(p)}if(e){p=e.type;if(e.multiplicity==="1"&&a!==l[0]){throw new Error("Multiplicity is 1: "+l[0])}l.shift()}else{r=this.getODataProperty(i,l,true);if(l.length){throw new Error("Property not found: "+l.join("/"))}break}}r=r||this.getODataEntityType(p,true);return this.createBindingContext(r)};D.prototype.getODataAssociationEnd=function(e,n){var i=e?t.findObject(e.navigationProperty,n):null,o=i?t.getObject(this.oModel,"association",i.relationship):null,r=o?t.findObject(o.end,i.toRole,"role"):null;return r};D.prototype.getODataAssociationSetEnd=function(e,n){var i,o=null,r=this.getODataEntityContainer(),a=e?t.findObject(e.navigationProperty,n):null;if(r&&a){i=t.findObject(r.associationSet,a.relationship,"association");o=i?t.findObject(i.end,a.toRole,"role"):null}return o};D.prototype.getODataComplexType=function(e,n){return t.getObject(this.oModel,"complexType",e,n)};D.prototype.getODataEntityContainer=function(e){var n=e?undefined:null,i=this.oModel.getObject("/dataServices/schema");if(i){i.forEach(function(i,o){var r=t.findIndex(i.entityContainer,"true","isDefaultEntityContainer");if(r>=0){n=e?"/dataServices/schema/"+o+"/entityContainer/"+r:i.entityContainer[r];return false}});if(!n&&i.length===1&&i[0].entityContainer&&i[0].entityContainer.length===1){n=e?"/dataServices/schema/0/entityContainer/0":i[0].entityContainer[0]}}return n};D.prototype.getODataEntitySet=function(e,n){return t.getFromContainer(this.getODataEntityContainer(),"entitySet",e,n)};D.prototype.getODataEntityType=function(e,n){return t.getObject(this.oModel,"entityType",e,n)};D.prototype.getODataFunctionImport=function(e,n){var i=e&&e.indexOf("/")>=0?e.split("/"):undefined,o=i?t.getObject(this.oModel,"entityContainer",i[0]):this.getODataEntityContainer();return t.getFromContainer(o,"functionImport",i?i[1]:e,n)};D.prototype.getODataProperty=function(e,n,i){var o,r=Array.isArray(n)?n:[n],a=null,s;while(e&&r.length){o=t.findIndex(e.property,r[0]);if(o<0){break}r.shift();a=e.property[o];s=e.$path+"/property/"+o;if(r.length){e=this.getODataComplexType(a.type)}}return i?s:a};D.prototype.getODataValueLists=function(e){var o=false,r,a=e.getPath(),s=this.mContext2Promise[a],l=this;if(s){return s}r=M.exec(a);if(!r){throw new Error("Unsupported property context with path "+a)}s=new Promise(function(s,p){var u=e.getObject(),d,y=t.getValueLists(u);if(!(""in y)&&u["sap:value-list"]){o=true;d=l.oModel.getObject(r[2]).namespace+"."+l.oModel.getObject(r[1]).name;l.mQName2PendingRequest[d+"/"+u.name]={resolve:function(e){n(u,(e.annotations.propertyAnnotations[d]||{})[u.name]);y=t.getValueLists(u);if(i(y)){p(new Error("No value lists returned for "+a))}else{delete l.mContext2Promise[a];s(y)}},reject:p};setTimeout(l._sendBundledRequest.bind(l),0)}else{s(y)}});if(o){this.mContext2Promise[a]=s}return s};D.prototype.getProperty=function(){return this._getObject.apply(this,arguments)};D.prototype.isList=function(){return this.oModel.isList.apply(this.oModel,arguments)};D.prototype.loaded=function(){return this.oLoadedPromise};D.prototype.refresh=function(){throw new Error("Unsupported operation: ODataMetaModel#refresh")};D.prototype.requestCurrencyCodes=function(){return Promise.resolve(this.fetchCodeList("CurrencyCodes"))};D.prototype.requestUnitsOfMeasure=function(){return Promise.resolve(this.fetchCodeList("UnitsOfMeasure"))};D.prototype.setLegacySyntax=function(t){if(t){throw new Error("Legacy syntax not supported by ODataMetaModel")}};D.prototype.setProperty=function(){throw new Error("Unsupported operation: ODataMetaModel#setProperty")};D.getCodeListTerm=function(t){if(t==="/##@@requestCurrencyCodes"){return"CurrencyCodes"}else if(t==="/##@@requestUnitsOfMeasure"){return"UnitsOfMeasure"}};return D});