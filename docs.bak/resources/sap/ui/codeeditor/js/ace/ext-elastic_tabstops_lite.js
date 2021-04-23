ace.define("ace/ext/elastic_tabstops_lite",["require","exports","module","ace/editor","ace/config"],function(t,e,s){"use strict";var i=function(t){this.$editor=t;var e=this;var s=[];var i=false;this.onAfterExec=function(){i=false;e.processRows(s);s=[]};this.onExec=function(){i=true};this.onChange=function(t){if(i){if(s.indexOf(t.start.row)==-1)s.push(t.start.row);if(t.end.row!=t.start.row)s.push(t.end.row)}}};(function(){this.processRows=function(t){this.$inChange=true;var e=[];for(var s=0,i=t.length;s<i;s++){var r=t[s];if(e.indexOf(r)>-1)continue;var o=this.$findCellWidthsForBlock(r);var n=this.$setBlockCellWidthsToMax(o.cellWidths);var a=o.firstRow;for(var h=0,l=n.length;h<l;h++){var c=n[h];e.push(a);this.$adjustRow(a,c);a++}}this.$inChange=false};this.$findCellWidthsForBlock=function(t){var e=[],s;var i=t;while(i>=0){s=this.$cellWidthsForRow(i);if(s.length==0)break;e.unshift(s);i--}var r=i+1;i=t;var o=this.$editor.session.getLength();while(i<o-1){i++;s=this.$cellWidthsForRow(i);if(s.length==0)break;e.push(s)}return{cellWidths:e,firstRow:r}};this.$cellWidthsForRow=function(t){var e=this.$selectionColumnsForRow(t);var s=[-1].concat(this.$tabsForRow(t));var i=s.map(function(t){return 0}).slice(1);var r=this.$editor.session.getLine(t);for(var o=0,n=s.length-1;o<n;o++){var a=s[o]+1;var h=s[o+1];var l=this.$rightmostSelectionInCell(e,h);var c=r.substring(a,h);i[o]=Math.max(c.replace(/\s+$/g,"").length,l-a)}return i};this.$selectionColumnsForRow=function(t){var e=[],s=this.$editor.getCursorPosition();if(this.$editor.session.getSelection().isEmpty()){if(t==s.row)e.push(s.column)}return e};this.$setBlockCellWidthsToMax=function(t){var e=true,s,i,r;var o=this.$izip_longest(t);for(var n=0,a=o.length;n<a;n++){var h=o[n];if(!h.push){console.error(h);continue}h.push(NaN);for(var l=0,c=h.length;l<c;l++){var f=h[l];if(e){s=l;r=0;e=false}if(isNaN(f)){i=l;for(var u=s;u<i;u++){t[u][n]=r}e=true}r=Math.max(r,f)}}return t};this.$rightmostSelectionInCell=function(t,e){var s=0;if(t.length){var i=[];for(var r=0,o=t.length;r<o;r++){if(t[r]<=e)i.push(r);else i.push(0)}s=Math.max.apply(Math,i)}return s};this.$tabsForRow=function(t){var e=[],s=this.$editor.session.getLine(t),i=/\t/g,r;while((r=i.exec(s))!=null){e.push(r.index)}return e};this.$adjustRow=function(t,e){var s=this.$tabsForRow(t);if(s.length==0)return;var i=0,r=-1;var o=this.$izip(e,s);for(var n=0,a=o.length;n<a;n++){var h=o[n][0],l=o[n][1];r+=1+h;l+=i;var c=r-l;if(c==0)continue;var f=this.$editor.session.getLine(t).substr(0,l);var u=f.replace(/\s*$/g,"");var v=f.length-u.length;if(c>0){this.$editor.session.getDocument().insertInLine({row:t,column:l+1},Array(c+1).join(" ")+"\t");this.$editor.session.getDocument().removeInLine(t,l,l+1);i+=c}if(c<0&&v>=-c){this.$editor.session.getDocument().removeInLine(t,l+c,l);i+=c}}};this.$izip_longest=function(t){if(!t[0])return[];var e=t[0].length;var s=t.length;for(var i=1;i<s;i++){var r=t[i].length;if(r>e)e=r}var o=[];for(var n=0;n<e;n++){var a=[];for(var i=0;i<s;i++){if(t[i][n]==="")a.push(NaN);else a.push(t[i][n])}o.push(a)}return o};this.$izip=function(t,e){var s=t.length>=e.length?e.length:t.length;var i=[];for(var r=0;r<s;r++){var o=[t[r],e[r]];i.push(o)}return i}}).call(i.prototype);e.ElasticTabstopsLite=i;var r=t("../editor").Editor;t("../config").defineOptions(r.prototype,"editor",{useElasticTabstops:{set:function(t){if(t){if(!this.elasticTabstops)this.elasticTabstops=new i(this);this.commands.on("afterExec",this.elasticTabstops.onAfterExec);this.commands.on("exec",this.elasticTabstops.onExec);this.on("change",this.elasticTabstops.onChange)}else if(this.elasticTabstops){this.commands.removeListener("afterExec",this.elasticTabstops.onAfterExec);this.commands.removeListener("exec",this.elasticTabstops.onExec);this.removeListener("change",this.elasticTabstops.onChange)}}}})});(function(){ace.require(["ace/ext/elastic_tabstops_lite"],function(t){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=t}})})();