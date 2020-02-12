/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/base/util/Version","sap/ui/thirdparty/jquery"],function(e,t,r,a){"use strict";var o=e.extend("sap.ui.core.util.LibraryInfo",{constructor:function(){e.apply(this);this._oLibInfos={}},destroy:function(){e.prototype.destroy.apply(this,arguments);this._oLibInfos={}},getInterface:function(){return this}});o.prototype._loadLibraryMetadata=function(e,r){e=e.replace(/\//g,".");if(this._oLibInfos[e]){setTimeout(r.bind(window,this._oLibInfos[e]),0);return}var o=this,n,i,l=/themelib_(.*)/i.exec(e);if(!l){i=".library";n=sap.ui.require.toUrl(e.replace(/\./g,"/"))+"/"}else{i=".theme";n=sap.ui.require.toUrl("sap/ui/core/themes/"+l[1]+"/")}a.ajax({url:n+i,dataType:"xml",error:function(a,l,f){t.error("failed to load library details from '"+n+i+": "+l+", "+f);o._oLibInfos[e]={name:e,data:null,url:n};r(o._oLibInfos[e])},success:function(t,a,i){o._oLibInfos[e]={name:e,data:t,url:n};r(o._oLibInfos[e])}})};o.prototype._getLibraryInfo=function(e,t){this._loadLibraryMetadata(e,function(e){var r={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var n=a(e.data);r.vendor=n.find("vendor").text();r.copyright=n.find("copyright").text();r.version=n.find("version").text();r.documentation=n.find("documentation").text();r.releasenotes=n.find("releasenotes").attr("url");r.componentInfo=o.prototype._getLibraryComponentInfo(n)}t(r)})};o.prototype._getThirdPartyInfo=function(e,t){this._loadLibraryMetadata(e,function(e){var r={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var o=a(e.data).find("appData").find("thirdparty").children();o.each(function(t,o){if(o.nodeName==="lib"){var n=a(o);var i=n.children("license");r.libs.push({displayName:n.attr("displayName"),homepage:n.attr("homepage"),license:{url:i.attr("url"),type:i.attr("type"),file:e.url+i.attr("file")}})}})}t(r)})};o.prototype._getDocuIndex=function(e,r){this._loadLibraryMetadata(e,function(e){var o=e.name,n=e.url,i={docu:{},library:o,libraryUrl:n};if(!e.data){r(i);return}var l=a(e.data).find("appData").find("documentation");var f=l.attr("indexUrl");if(!f){r(i);return}if(l.attr("resolve")=="lib"){f=e.url+f}a.ajax({url:f,dataType:"json",error:function(e,a,o){t.error("failed to load library docu from '"+f+"': "+a+", "+o);r(i)},success:function(e,t,a){e.library=o;e.libraryUrl=n;r(e)}})})};o.prototype._getReleaseNotes=function(e,o,n){this._loadLibraryMetadata(e,function(i){if(!i.data){n({});return}var l=o.split(".").length===3&&!/-SNAPSHOT/.test(o);var f=r(o);var s=f.getMajor();var u=f.getMinor();var d=f.getPatch();var p=a(i.data).find("appData").find("releasenotes");var c=p.attr("url");if(!c){t.warning("failed to load release notes for library "+e);n({});return}if(f.getSuffix()==="-SNAPSHOT"){if(u%2!=0){u=u+1;d=0}o=s+"."+u+"."+d}var y=window.location.href,m=/\/\d.\d{1,2}.\d{1,2}\//;if(p.attr("resolve")=="lib"){if(m.test(y)||l===false){c=i.url+c}else{c="{major}.{minor}.{patch}/"+i.url+c}}c=c.replace(/\{major\}/g,s);c=c.replace(/\{minor\}/g,u);c=c.replace(/\{patch\}/g,d);a.ajax({url:c,dataType:"json",error:function(r,a,o){if(a==="parsererror"){t.error("failed to parse release notes for library '"+e+", "+o)}else{t.warning("failed to load release notes for library '"+e+", "+o)}n({})},success:function(e,t,r){n(e,o)}})})};o.prototype._getLibraryComponentInfo=function(e){var t={};var r=[];var a="";e.find("ownership > component").each(function(e,t){if(t.childElementCount===0){a=t.textContent}else{var o=t.getElementsByTagName("name");if(o&&o.length>0){o=o[0].textContent;var n=t.getElementsByTagName("module");if(o&&n&&n.length>0){var i=[];for(var l=0;l<n.length;l++){var f=n[l].textContent.replace(/\//g,".");if(f){i.push(f)}}if(i.length>0){r.push({component:o,modules:i})}}}}});t["defaultComponent"]=a;if(r&&r.length>0){t["specialCases"]=r}return t};o.prototype._getActualComponent=function(e,r){function a(e,t){e=e.toLowerCase();t=t.toLowerCase();return e===t||t.match(/\*$/)&&e.indexOf(t.slice(0,-1))===0||t.match(/\.\*$/)&&e===t.slice(0,-2)}if(r){for(var o in e){if(!e[o]){t.error("No library information deployed for "+o);continue}var n;if(r.indexOf(o)===0){n=e[o].defaultComponent}var i=e[o].specialCases;if(i){for(var l=0;l<i.length;l++){var f=i[l].modules;for(var s=0;s<f.length;s++){if(a(r,f[s])){n=i[l].component}}}}if(n){return n}}}};o.prototype._getDefaultComponent=function(e){return e&&e.componentInfo&&e.componentInfo.defaultComponent};return o});