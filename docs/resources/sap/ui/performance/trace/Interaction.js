/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/performance/Measurement","sap/ui/performance/XHRInterceptor","sap/base/util/LoaderExtensions","sap/base/util/now","sap/base/util/uid","sap/base/Log","sap/ui/thirdparty/URI"],function(e,t,n,i,r,s,o){"use strict";var a=window.location.host,u="INTERACTION",d=[],p=g();function f(e){var t=new o(e).host();return t&&t!==a}function c(e){var t=e.toString();var n="";for(var i=0;i<t.length;i+=2){n+=String.fromCharCode(parseInt(t.substr(i,2),16))}return n.trim()}function g(e){return{event:"startup",trigger:"undetermined",component:"undetermined",appVersion:"undetermined",start:e||window.performance.timing.fetchStart,end:0,navigation:0,roundtrip:0,processing:0,duration:0,requests:[],measurements:[],sapStatistics:[],requestTime:0,networkTime:0,bytesSent:0,bytesReceived:0,requestCompression:undefined,busyDuration:0,id:r(),passportAction:"undetermined_startup_0"}}function l(e){if(e.start>p.start&&e.end<p.end){return e}}function m(e){var t=e.startTime>0&&e.startTime<=e.requestStart&&e.requestStart<=e.responseEnd;return t&&e.initiatorType==="xmlhttprequest"}function h(e){this.end=e.responseEnd>this.end?e.responseEnd:this.end;p.requestTime+=e.responseEnd-e.startTime;if(this.roundtripHigherLimit<=e.startTime){p.navigation+=this.navigationHigherLimit-this.navigationLowerLimit;p.roundtrip+=this.roundtripHigherLimit-this.roundtripLowerLimit;this.navigationLowerLimit=e.startTime;this.roundtripLowerLimit=e.startTime}if(e.responseEnd>this.roundtripHigherLimit){this.roundtripHigherLimit=e.responseEnd}if(e.requestStart>this.navigationHigherLimit){this.navigationHigherLimit=e.requestStart}}function y(e){var t={start:e[0].startTime,end:e[0].responseEnd,navigationLowerLimit:e[0].startTime,navigationHigherLimit:e[0].requestStart,roundtripLowerLimit:e[0].startTime,roundtripHigherLimit:e[0].responseEnd};e.forEach(h,t);p.navigation+=t.navigationHigherLimit-t.navigationLowerLimit;p.roundtrip+=t.roundtripHigherLimit-t.roundtripLowerLimit;if(p.networkTime){var n=p.requestTime-p.networkTime;p.networkTime=n/e.length}else{p.networkTime=0}if(p.processing===0){var i=p.start-window.performance.timing.fetchStart;p.duration=t.end-i;p.processing=t.start-i}}function v(t){if(p){var n=window.performance.getEntriesByType("resource");p.end=t;p.duration=p.processing;p.requests=n.filter(m);p.completeRoundtrips=0;p.measurements=e.filterMeasurements(l,true);if(p.requests.length>0){y(p.requests)}p.completeRoundtrips=p.requests.length;var i=p.processing-p.navigation-p.roundtrip;p.processing=i>-1?i:0;p.completed=true;Object.freeze(p);d.push(p);var r=d[d.length-1];if(D.onInteractionFinished&&r){D.onInteractionFinished(r)}s.info("Interaction step finished: trigger: "+p.trigger+"; duration: "+p.duration+"; requests: "+p.requests.length,"Interaction.js");p=null}}function S(e){var t,n;if(e){var i,r;i=sap.ui.require("sap/ui/core/Component");while(i&&e&&e.getParent){r=i.getOwnerComponentFor(e);if(r||e instanceof i){r=r||e;var s=r.getManifestEntry("sap.app");t=s&&s.id||r.getMetadata().getName();n=s&&s.applicationVersion&&s.applicationVersion.version}e=e.getParent()}}return{id:t?t:"undetermined",version:n?n:""}}var I=false,L=false,T,E,w=false,b=false,H=0,q=0,R=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");function A(){Object.defineProperty(HTMLScriptElement.prototype,"src",{set:function(e){var t;if(!this.dataset.sapUiCoreInteractionHandled){t=D.notifyAsyncStep();this.addEventListener("load",function(){t()});this.addEventListener("error",function(){t()});this.dataset.sapUiCoreInteractionHandled="true"}R.set.call(this,e)},get:R.get})}function C(){t.register(u,"send",function(){if(this.pendingInteraction){this.pendingInteraction.bytesSent+=arguments[0]?arguments[0].length:0}});t.register(u,"setRequestHeader",function(e,t){if(!this.requestHeaderLength){this.requestHeaderLength=0}this.requestHeaderLength+=(e+"").length+(t+"").length});t.register(u,"open",function(){var e,t,n;function i(e){if(this.readyState===4){e()}}if(p){if(!f(arguments[1])){e=D.passportHeader.get(this);if(e&&e.length>=370){t=c(e.substring(150,230));if(parseInt(e.substring(8,10),16)>2){n=e.substring(372,404)}}if(!e||t&&n&&p.passportAction.endsWith(t)){this.addEventListener("readystatechange",_.bind(this,p.id))}}this.addEventListener("readystatechange",i.bind(this,D.notifyAsyncStep()));this.pendingInteraction=p}})}function _(e){if(this.readyState===4){if(this.pendingInteraction&&!this.pendingInteraction.completed&&p.id===e){var t=this.getResponseHeader("content-length"),n=this.getResponseHeader("content-encoding")==="gzip",i=this.getResponseHeader("sap-perf-fesrec");this.pendingInteraction.bytesReceived+=t?parseInt(t):0;this.pendingInteraction.bytesReceived+=this.getAllResponseHeaders().length;this.pendingInteraction.bytesSent+=this.requestHeaderLength||0;this.pendingInteraction.requestCompression=n&&this.pendingInteraction.requestCompression!==false;this.pendingInteraction.networkTime+=i?Math.round(parseFloat(i,10)/1e3):0;var r=this.getResponseHeader("sap-statistics");if(r){var s=window.performance.getEntriesByType("resource");this.pendingInteraction.sapStatistics.push({url:this.responseURL,statistics:r,timing:s?s[s.length-1]:undefined})}delete this.requestHeaderLength;delete this.pendingInteraction}}}var D={getAll:function(e){if(e){D.end(true)}return d},filter:function(e){var t=[];if(e){for(var n=0,i=d.length;n<i;n++){if(e(d[n])){t.push(d[n])}}}return t},getPending:function(){return p},clear:function(){d=[]},start:function(e,t){var n=i();if(p){v(n)}if(E){clearTimeout(E)}H=0;if(window.performance.clearResourceTimings){window.performance.clearResourceTimings()}var r=S(t);p=g(n);p.event=e;p.component=r.id;p.appVersion=r.version;p.start=n;if(t&&t.getId){p.trigger=t.getId()}if(s.isLoggable(null,"sap.ui.Performance")){console.time("INTERACTION: "+p.trigger+" - "+p.event)}s.info("Interaction step started: trigger: "+p.trigger+"; type: "+p.event,"Interaction.js")},end:function(e){if(p){if(e){if(s.isLoggable(null,"sap.ui.Performance")){console.timeEnd("INTERACTION: "+p.trigger+" - "+p.event)}v(p.preliminaryEnd||i());s.info("Interaction ended...")}else{p.preliminaryEnd=i();p.processing=p.preliminaryEnd-p.start}}},getActive:function(){return I},setActive:function(e){if(e&&!I){C();A();n.notifyResourceLoading=D.notifyAsyncStep}I=e},notifyShowBusyIndicator:function(e){e._sapui_fesr_fDelayedStartTime=i()+e.getBusyIndicatorDelay()},notifyHideBusyIndicator:function(e){if(e._sapui_fesr_fDelayedStartTime){var t=i()-e._sapui_fesr_fDelayedStartTime;D.addBusyDuration(t>0?t:0);delete e._sapui_fesr_fDelayedStartTime}},notifyStepStart:function(e,t){if(I){if(!p&&T&&!L||t){var n;if(t){n="startup"}else if(T.originalEvent){n=T.originalEvent.type}else{n=T.type}D.start(n,e);p=D.getPending();if(p&&!p.completed&&D.onInteractionStarted){p.passportAction=D.onInteractionStarted(p,t)}T=null;L=true;setTimeout(function(){T=null;L=false},0)}}},notifyAsyncStep:function(e){if(p){if(s.isLoggable(null,"sap.ui.Performance")&&e){console.time(e)}var t=p.id;D.notifyAsyncStepStart();return function(){D.notifyAsyncStepEnd(t);if(s.isLoggable(null,"sap.ui.Performance")&&e){console.timeEnd(e)}}}else{return function(){}}},notifyAsyncStepStart:function(){if(p){H++;clearTimeout(E);w=false;s.info("Interaction relevant step started - Number of pending steps: "+H)}},notifyAsyncStepEnd:function(e){if(p&&e===p.id){H--;D.notifyStepEnd(true);s.info("Interaction relevant step stopped - Number of pending steps: "+H)}},notifyStepEnd:function(e){if(I&&!b){if(H===0||!e){if(w||!e){D.end(true);s.info("Interaction stopped");w=false}else{D.end();w=true;if(E){clearTimeout(E)}E=setTimeout(D.notifyStepEnd,250);s.info("Interaction check for idle time - Number of pending steps: "+H)}}}},notifyEventStart:function(e){T=I?e:null},notifyScrollEvent:function(e){if(I){if(!q){D.notifyEventStart(e)}else{clearTimeout(q)}q=setTimeout(function(){D.notifyStepStart(e.sourceElement);q=0;D.notifyStepEnd()},250)}},notifyEventEnd:function(){if(T){if(T.type.match(/^(mousedown|touchstart|keydown)$/)){D.end(true)}}},onInteractionStarted:null,onInteractionFinished:null,setStepComponent:function(e){if(I&&p&&e&&!p.stepComponent){p.stepComponent=e}},addBusyDuration:function(e){if(I&&p){if(!p.busyDuration){p.busyDuration=0}p.busyDuration+=e}}};return D});