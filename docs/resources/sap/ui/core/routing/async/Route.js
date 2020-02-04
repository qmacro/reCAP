/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,i){"use strict";return{_routeMatched:function(r,o,a){var n=this._oRouter,s,h,u,f=null,c=null,_,g,d,l=this;n._matchedRoute=this;n._bMatchingProcessStarted=true;if(!o||o===true){_=true;o=Promise.resolve()}if(this._oParent){o=this._oParent._routeMatched(r,o)}else if(this._oNestingParent){this._oNestingParent._routeMatched(r,o,this)}h=i.extend({},n._oConfig,this._oConfig);g=i.extend({},r);g.routeConfig=h;u={name:h.name,arguments:r,config:h};if(a){u.nestedRoute=a}this.fireBeforeMatched(u);n.fireBeforeRouteMatched(u);if(this._oTarget){s=this._oTarget;s._updateOptions(this._convertToTargetOptions(h));o=s._place(o);if(this._oRouter._oTargetHandler&&this._oRouter._oTargetHandler._chainNavigation){d=o;o=this._oRouter._oTargetHandler._chainNavigation(function(){return d})}}else{if(t.browser.msie||t.browser.edge){d=o;o=new Promise(function(t,e){setTimeout(function(){if(n._oTargets){var i=n._oTargets._display(l._oConfig.target,g,l._oConfig.titleTarget,d);i.then(t,e)}else{t()}},0)})}else{o=n._oTargets._display(this._oConfig.target,g,this._oConfig.titleTarget,o)}}return o.then(function(t){n._bMatchingProcessStarted=false;var i,o,a;if(Array.isArray(t)){i=t;t=i[0]}t=t||{};f=t.view;c=t.control;u.view=f;u.targetControl=c;if(i){o=[];a=[];i.forEach(function(t){o.push(t.view);a.push(t.control)});u.views=o;u.targetControls=a}if(h.callback){h.callback(this,r,h,c,f)}this.fireEvent("matched",u);n.fireRouteMatched(u);if(_){e.info("The route named '"+h.name+"' did match with its pattern",this);this.fireEvent("patternMatched",u);n.fireRoutePatternMatched(u)}return t}.bind(this))}}});