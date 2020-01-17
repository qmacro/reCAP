/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/CustomData","./mvc/View","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/values","sap/base/assert","sap/base/security/encodeXML","sap/base/util/LoaderExtensions","sap/base/util/JSTokenizer","sap/base/util/isEmptyObject"],function(e,t,n,r,i,a,o,s,u,l,f,c,p,d,g,m,v){"use strict";function h(e,r,i,a,o){var s=n.bindingParser(r,a,true,false,false,false,o);if(s&&typeof s==="object"){return s}var u=r=s||r;var f=t.getType(e);if(f){if(f instanceof t){u=f.parseValue(r,{context:a,locals:o});if(!f.isValid(u)){l.error("Value '"+r+"' is not valid for type '"+f.getName()+"'.")}}}else{throw new Error("Property "+i+" has unknown type "+e)}return typeof u==="string"?n.bindingParser.escape(u):u}function w(e){return e.localName||e.baseName||e.nodeName}function y(e){if(e.isRejected()){throw e.getResult()}return e.getResult()}function b(e,t){function n(e,n,r,i){var a,o,s=[];for(a=e.firstChild;a;a=a.nextSibling){o=t(e,n,r,a,false,i);if(o){s.push(y(o))}}return u.resolve(s)}function r(e,n,r,i){var a,o=Promise.resolve(),s=[i];for(a=e.firstChild;a;a=a.nextSibling){o=o.then(t.bind(null,e,n,r,a,false,i));s.push(o)}return Promise.all(s)}return e?r:n}var C={};C.loadTemplate=function(e,t){var n=e.replace(/\./g,"/")+("."+(t||"view")+".xml");return g.loadResource(n).documentElement};C.loadTemplatePromise=function(e,t){var n=e.replace(/\./g,"/")+("."+(t||"view")+".xml");return g.loadResource(n,{async:true}).then(function(e){return e.documentElement})};C.parseViewAttributes=function(e,t,n){var r=t.getMetadata().getAllProperties();for(var i=0;i<e.attributes.length;i++){var a=e.attributes[i];if(a.name==="controllerName"){t._controllerName=a.value}else if(a.name==="resourceBundleName"){t._resourceBundleName=a.value}else if(a.name==="resourceBundleUrl"){t._resourceBundleUrl=a.value}else if(a.name==="resourceBundleLocale"){t._resourceBundleLocale=a.value}else if(a.name==="resourceBundleAlias"){t._resourceBundleAlias=a.value}else if(a.name==="class"){t.addStyleClass(a.value)}else if(!n[a.name]&&r[a.name]){n[a.name]=h(r[a.name].type,a.value,a.name,t._oContainingView.oController)}}};C.enrichTemplateIds=function(e,t){C.enrichTemplateIdsPromise(e,t,false);return e};C.enrichTemplateIdsPromise=function(e,t,n){return N(e,t,true,n).then(function(){return e})};C.parseTemplate=function(e,t){return y(C.parseTemplatePromise(e,t,false))};C.parseTemplatePromise=function(e,t,n,r){return N(e,t,false,n,r)};function _(e){var t,n=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;if(!e||typeof e!=="object"){t="core:require in XMLView can't be parsed to a valid object"}else{Object.keys(e).some(function(r){if(!n.test(r)){t="core:require in XMLView contains invalid identifier: '"+r+"'";return true}if(!e[r]||typeof e[r]!=="string"){t="core:require in XMLView contains invalide value '"+e[r]+"'under key '"+r+"'";return true}})}return t}function x(e,t){var n=e.getAttributeNS("sap.ui.core","require"),r,i,a;if(n){try{r=m.parseJS(n)}catch(t){l.error("Require attribute can't be parsed on Node: ",e.nodeName);throw t}a=_(r);if(a){throw new Error(a+" on Node: "+e.nodeName)}if(!v(r)){i={};if(t){return new Promise(function(e,t){sap.ui.require(c(r),function(){var t=arguments;Object.keys(r).forEach(function(e,n){i[e]=t[n]});e(i)},t)})}else{Object.keys(r).forEach(function(e){i[e]=sap.ui.requireSync(r[e])});return u.resolve(i)}}}}function N(t,c,g,m,_){var N=[],I=x(t,m)||u.resolve();m=m&&c._sProcessingMode==="sequential";l.debug("XML processing mode is "+(m?"sequential":"default"),"","XMLTemplateProcessor");var R=sap.ui.getCore().getConfiguration().getDesignMode();if(R){c._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:c._oContainingView===c?t:c._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}var M=c.sViewName||c._sFragmentName;if(!M){var V=c;var A=0;while(++A<1e3&&V&&V!==V._oContainingView){V=V._oContainingView}M=V.sViewName}if(c.isSubView()){U(t,true,false,I)}else{if(t.localName==="View"&&t.namespaceURI!=="sap.ui.core.mvc"){l.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+t.namespaceURI+"'"+(M?" (View name: "+M+")":""))}O(t,false,false,I)}var P=0;function S(){for(;P<N.length;P++){var e=N[P];if(e&&typeof e.then==="function"){return e.then(T).then(S)}}return N}function T(e){var t=[P,1].concat(e);Array.prototype.splice.apply(N,t)}return I.then(S);function E(e){return e}function L(e){return c._oContainingView.createId(e)}function U(e,t,n,r){if(e.nodeType===1){var i=w(e);if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){N.push("<"+i+" ");var a=false;for(var o=0;o<e.attributes.length;o++){var s=e.attributes[o];var u=s.value;if(s.name==="id"){a=true;u=k(c,e)}N.push(s.name+'="'+d(u)+'" ')}if(t===true){N.push("data-sap-ui-preserve"+'="'+c.getId()+'" ');if(!a){N.push("id"+'="'+c.getId()+'" ')}}N.push(">");var l=e;if(window.HTMLTemplateElement&&e instanceof HTMLTemplateElement&&e.content instanceof DocumentFragment){l=e.content}O(l,false,false,r);N.push("</"+i+">")}else if(i==="FragmentDefinition"&&e.namespaceURI==="sap.ui.core"){O(e,false,true,r)}else{I=I.then(function(){return X(e,r).then(function(e){for(var t=0;t<e.length;t++){var n=e[t];if(c.getMetadata().hasAggregation("content")){c.addAggregation("content",n)}else if(c.getMetadata().hasAssociation("content")){c.addAssociation("content",n)}}return e})});N.push(I)}}else if(e.nodeType===3&&!n){var f=e.textContent||e.text,p=w(e.parentNode);if(f){if(p!="style"){f=d(f)}N.push(f)}}}function O(e,t,n,r){var i=e.childNodes;for(var a=0;a<i.length;a++){U(i[a],t,n,r)}}function q(t,n){var r;var i=sap.ui.getCore().getLoadedLibraries();e.each(i,function(e,i){if(t===i.namespace||t===i.name){r=i.name+"."+(i.tagNames&&i.tagNames[n]||n)}});r=r||t+"."+n;function a(e){if(!e){l.error("Control '"+r+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");e=f.get(r)}if(!e){l.error("Can't find object class '"+r+"' for XML-view","","XMLTemplateProcessor")}return e}var o=r.replace(/\./g,"/");var s=sap.ui.require(o);if(!s){if(m){return new Promise(function(e){sap.ui.require([o],function(t){t=a(t);e(t)})})}else{s=sap.ui.requireSync(o);s=a(s)}}return s}function j(e,t){if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){var n=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(g){return C.enrichTemplateIdsPromise(e,c,m).then(function(){return[]})}else{var r=function(t){var r={id:n?k(c,e,n):undefined,xmlNode:e,containingView:c._oContainingView,processingMode:c._sProcessingMode};if(c.fnScopedRunWithOwner){return c.fnScopedRunWithOwner(function(){return new t(r)})}return new t(r)};if(m){return new Promise(function(e,t){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(t){e([r(t)])})})}else{var i=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return u.resolve([r(i)])}}}else{return X(e,t)}}function X(e,t){if(w(e)==="ExtensionPoint"&&e.namespaceURI==="sap.ui.core"){if(g){return u.resolve([])}else{var n=c instanceof i?c._oContainingView:c;var r=o._factory.bind(null,n,e.getAttribute("name"),function(){var n=u.resolve();var r=[];var i=e.childNodes;for(var a=0;a<i.length;a++){var o=i[a];if(o.nodeType===1){n=n.then(j.bind(null,o,t));r.push(n)}}return u.all(r).then(function(e){var t=[];e.forEach(function(e){t=t.concat(e)});return t})});return u.resolve(c.fnScopedRunWithOwner?c.fnScopedRunWithOwner(r):r())}}else{var a=q(e.namespaceURI,w(e));if(a&&typeof a.then==="function"){return a.then(function(n){return B(e,n,t)})}else{return B(e,a,t)}}}function B(t,o,f){var d=t.namespaceURI,N={},I="",M=[],V=null,A=null;if(!o){return u.resolve([])}var P=o.getMetadata();var S=P.getAllSettings();var T=x(t,m);if(T){f=u.all([f,T]).then(function(e){return Object.assign({},e[0],e[1])})}f=f.then(function(e){if(v(e)){e=null}if(!g){for(var s=0;s<t.attributes.length;s++){var u=t.attributes[s],f=u.name,d=S[f],m=u.value;if(f==="id"){N[f]=k(c,t,m)}else if(f==="class"){I+=m}else if(f==="viewName"){N[f]=m}else if(f==="fragmentName"){N[f]=m;N["containingView"]=c._oContainingView}else if(f==="binding"&&!d||f==="objectBindings"){var y=n.bindingParser(m,c._oContainingView.oController);if(y){N.objectBindings=N.objectBindings||{};N.objectBindings[y.model||undefined]=y}}else if(f==="metadataContexts"){var b=null;try{b=C._calculatedModelMapping(m,c._oContainingView.oController,true)}catch(e){l.error(c+":"+e.message)}if(b){N.metadataContexts=b;if(C._preprocessMetadataContexts){C._preprocessMetadataContexts(o.getMetadata().getName(),N,c._oContainingView.oController)}}}else if(f.indexOf(":")>-1){if(u.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var _=w(u);M.push(new r({key:_,value:h("any",m,_,c._oContainingView.oController)}))}else if(u.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){A=m}else if(u.namespaceURI&&u.namespaceURI.indexOf("http://schemas.sap.com/sapui5/preprocessorextension/")===0){l.debug(c+": XMLView parser ignored preprocessor attribute '"+f+"' (value: '"+m+"')")}else if(f.indexOf("xmlns:")!==0){if(!V){V={}}if(!V.hasOwnProperty(u.namespaceURI)){V[u.namespaceURI]={}}V[u.namespaceURI][w(u)]=u.nodeValue;l.debug(c+": XMLView parser encountered unknown attribute '"+f+"' (value: '"+m+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(d&&d._iKind===0){N[f]=h(d.type,m,f,c._oContainingView.oController,e)}else if(d&&d._iKind===1&&d.altTypes){N[f]=h(d.altTypes[0],m,f,c._oContainingView.oController,e)}else if(d&&d._iKind===2){var y=n.bindingParser(m,c._oContainingView.oController,false,false,false,false,e);if(y){N[f]=y}else{l.error(c+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+f+"='"+m+"')")}}else if(d&&d._iKind===3){N[f]=L(m)}else if(d&&d._iKind===4){N[f]=m.split(/[\s,]+/g).filter(E).map(L)}else if(d&&d._iKind===5){var x=[];a.parse(m).forEach(function(t){var n=a.resolveEventHandler(t,c._oContainingView.oController,e);if(n){x.push(n)}else{l.warning(c+': event handler function "'+t+'" is not a function or does not exist in the controller.')}});if(x.length){N[f]=x}}else if(d&&d._iKind===-1){if(i.prototype.isPrototypeOf(o.prototype)&&f=="async"){N[f]=h(d.type,m,f,c._oContainingView.oController,e)}else{l.warning(c+": setting '"+f+"' for class "+P.getName()+" (value:'"+m+"') is not supported")}}else{p(f==="xmlns",c+": encountered unknown setting '"+f+"' for class "+P.getName()+" (value:'"+m+"')");if(C._supportInfo){C._supportInfo({context:t,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+f+"' for class "+P.getName()}})}}}if(V){M.push(new r({key:"sap-ui-custom-settings",value:V}))}if(M.length>0){N.customData=M}}return e});var U=b(m,O);function O(t,n,r,i,a,o){var u;if(i.nodeType===1){if(i.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1"){N[w(i)]=i.querySelector("*");return}u=i.namespaceURI===d&&r&&r[w(i)];if(u){return U(i,u,false,o)}else if(n){if(!a&&i.getAttribute("stashed")==="true"&&!g){s.createStashedControl(k(c,i),{sParentId:N["id"],sParentAggregationName:n.name,fnCreate:function(){var e=m;m=false;try{return y(O(t,n,r,i,true,o))}finally{m=e}}});return}return j(i,o).then(function(e){for(var t=0;t<e.length;t++){var r=e[t];var i=n.name;if(n.multiple){if(!N[i]){N[i]=[]}if(typeof N[i].path==="string"){p(!N[i].template,"list bindings support only a single template object");N[i].template=r}else{N[i].push(r)}}else{p(!N[i],"multiple aggregates defined for aggregation with cardinality 0..1");N[i]=r}}return e})}else if(w(t)!=="FragmentDefinition"||t.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+P.getElementName())}}else if(i.nodeType===3){if(e.trim(i.textContent||i.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+e.trim(i.textContent||i.text))}}}var q=P.getDefaultAggregation();var X=P.getAllAggregations();return U(t,q,X,f).then(function(){var e;if(g&&t.hasAttribute("id")){D(c,t)}else if(!g){if(i.prototype.isPrototypeOf(o.prototype)&&typeof o._sType==="string"){var n=function(){if(o.getMetadata().isA("sap.ui.core.mvc.XMLView")&&c._sProcessingMode==="sequential"){N.processingMode="sequential"}return i._legacyCreate(N,undefined,o._sType)};if(c.fnScopedRunWithOwner){e=c.fnScopedRunWithOwner(n)}else{e=n()}}else{var r=function(){if(o.getMetadata().isA("sap.ui.core.Fragment")&&t.getAttribute("type")!=="JS"&&c._sProcessingMode==="sequential"){N.processingMode="sequential"}if(c.fnScopedRunWithOwner){return c.fnScopedRunWithOwner(function(){return new o(N)})}else{return new o(N)}};if(_&&_.fnRunWithPreprocessor){e=_.fnRunWithPreprocessor(r)}else{e=r()}}if(I&&e.addStyleClass){e.addStyleClass(I)}}if(!e){e=[]}else if(!Array.isArray(e)){e=[e]}if(C._supportInfo&&e){for(var a=0,s=e.length;a<s;a++){var u=e[a];if(u&&u.getId()){var l=C._supportInfo({context:t,env:{caller:"createRegularControls",nodeid:t.getAttribute("id"),controlid:u.getId()}}),f=A?A+",":"";f+=l;C._supportInfo.addSupportInfo(u.getId(),f)}}}if(R){e.forEach(function(e){if(P.getCompositeAggregationName){var n=t.getElementsByTagName(e.getMetadata().getCompositeAggregationName());for(var r=0;r<n.length;r++){t.removeChild(n[0])}}e._sapui_declarativeSourceInfo={xmlNode:t,xmlRootNode:c._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:P.getName()==="sap.ui.core.Fragment"?N["fragmentName"]:null}})}return e})}function k(e,t,n){if(t.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return t.getAttribute("id")}else{return L(n?n:t.getAttribute("id"))}}function D(e,t){t.setAttribute("id",L(t.getAttribute("id")));t.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true)}}C._preprocessMetadataContexts=null;C._calculatedModelMapping=function(e,t,r){var i,a={},o=n.bindingParser(e,t);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var t=1;t<=e.length;t=t+2){if(typeof e[t-1]=="string"){throw new Error("Binding expected not a string")}if(e[t]){if(typeof e[t]!="string"||e[t]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){i=o;o={parts:[i]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){i=o.parts[u];a[i.model]=a[i.model]||(r?[]:null);if(Array.isArray(a[i.model])){a[i.model].push(i)}else{a[i.model]=i}}}return a};return C},true);