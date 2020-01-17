/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e){"use strict";return{_routeMatched:function(i,a,r){var o=this._oRouter,n,s,h,f,g,c=null,u=null,_,d,l,p,C;o._matchedRoute=this;o._bMatchingProcessStarted=true;if(this._oParent){n=this._oParent._routeMatched(i)}else if(this._oNestingParent){this._oNestingParent._routeMatched(i,false,this)}f=e.extend({},o._oConfig,this._oConfig);_=e.extend({},i);_.routeConfig=f;g={name:f.name,arguments:i,config:f};if(r){g.nestedRoute=r}this.fireBeforeMatched(g);o.fireBeforeRouteMatched(g);if(this._oTarget){h=this._oTarget;h._updateOptions(this._convertToTargetOptions(f));if(h._isValid(n,false)){s=h._place(n)}s=s||{};c=s.oTargetParent;u=s.oTargetControl;g.view=c;g.targetControl=u}else{l=[];p=[];d=function(t){l.push(t.getParameter("view"));p.push(t.getParameter("control"))};if(Array.isArray(this._oConfig.target)){C=this._oConfig.target}else{C=[this._oConfig.target]}C.forEach(function(t){var e=o._oTargets.getTarget(t);if(e){e.attachEventOnce("display",d)}});o._oTargets._display(this._oConfig.target,_,this._oConfig.titleTarget);g.view=l[0];g.targetControl=p[0];g.views=l;g.targetControls=p}o._bMatchingProcessStarted=false;if(f.callback){f.callback(this,i,f,u,c)}this.fireEvent("matched",g);o.fireRouteMatched(g);if(a){t.info("The route named '"+f.name+"' did match with its pattern",this);this.fireEvent("patternMatched",g);o.fireRoutePatternMatched(g)}return s}}});