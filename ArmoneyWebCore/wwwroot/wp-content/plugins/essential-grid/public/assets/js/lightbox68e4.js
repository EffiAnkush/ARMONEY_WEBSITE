/*
 FANCYBOX - jQuery Plugin
 version: 2.1.5 (Fri, 14 Jun 2013)
 @requires jQuery v1.6 or later

 Examples at http://fancyapps.com/fancybox/
 License: www.fancyapps.com/fancybox/#license

 Copyright 2012 Janis Skarnelis - janis@fancyapps.com

*/
;(function(q,n,c,m){var l=c("html"),u=c(q),t=c(n),a=c.esgbox=function(){a.open.apply(this,arguments)},v=navigator.userAgent.match(/msie/i),A=null,x=n.createTouch!==m,C=function(b){return b&&b.hasOwnProperty&&b instanceof c},w=function(b){return b&&"string"===c.type(b)},F=function(b){return w(b)&&0<b.indexOf("%")},r=function(b,d){var c=parseInt(b,10)||0;d&&F(b)&&(c*=a.getViewport()[d]/100);return Math.ceil(c)},z=function(b,a){return r(b,a)+"px"};c.extend(a,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!x,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-esgbox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="esgbox-wrap" tabIndex="-1"><div class="esgbox-skin"><div class="esgbox-outer"><div class="esgbox-inner"></div></div></div></div>',image:'<img class="esgbox-image" src="{href}" alt="" />',iframe:'<iframe id="esgbox-frame{rnd}" name="esgbox-frame{rnd}" class="esgbox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(v?' allowtransparency="true"':"")+"></iframe>",error:'<p class="esgbox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="esgbox-item esgbox-close" href="javascript:;"></a>',next:'<a title="Next" class="esgbox-nav esgbox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="esgbox-nav esgbox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",
closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:c.noop,beforeLoad:c.noop,afterLoad:c.noop,beforeShow:c.noop,afterShow:c.noop,beforeChange:c.noop,beforeClose:c.noop,afterClose:c.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,
wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,d){if(b&&(c.isPlainObject(d)||(d={}),!1!==a.close(!0)))return c.isArray(b)||(b=C(b)?c(b).get():[b]),c.each(b,function(f,e){var k={},h;"object"===c.type(e)&&(e.nodeType&&(e=c(e)),C(e)?(k={href:e.data("esgbox-href")||e.attr("href"),title:e.data("esgbox-title")||e.attr("title"),isDom:!0,element:e},c.metadata&&c.extend(!0,k,e.metadata())):k=e);var g=d.href||
k.href||(w(e)?e:null);var p=d.title!==m?d.title:k.title||"";var y=(h=d.content||k.content)?"html":d.type||k.type;!y&&k.isDom&&(y=e.data("esgbox-type"),y||(y=(y=e.prop("class").match(/esgbox\.(\w+)/))?y[1]:null));if(w(g)&&(y||(a.isImage(g)?y="image":a.isSWF(g)?y="swf":"#"===g.charAt(0)?y="inline":w(e)&&(y="html",h=e)),"ajax"===y)){var l=g.split(/\s+/,2);g=l.shift();l=l.shift()}h||("inline"===y?g?h=c(w(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(h=e):"html"===y?h=g:y||g||!k.isDom||(y="inline",h=
e));c.extend(k,{href:g,type:y,content:h,title:p,selector:l});b[f]=k}),a.opts=c.extend(!0,{},a.defaults,d),d.keys!==m&&(a.opts.keys=d.keys?c.extend({},a.defaults.keys,d.keys):!1),a.group=b,a._start(a.opts.index)},cancel:function(){var b=a.coming;b&&!1!==a.trigger("onCancel")&&(a.hideLoading(),a.ajaxLoad&&a.ajaxLoad.abort(),a.ajaxLoad=null,a.imgPreload&&(a.imgPreload.onload=a.imgPreload.onerror=null),b.wrap&&b.wrap.stop(!0,!0).trigger("onReset").remove(),a.coming=null,a.current||a._afterZoomOut(b))},
close:function(b){a.cancel();!1!==a.trigger("beforeClose")&&(a.unbindEvents(),a.isActive&&(a.isOpen&&!0!==b?(a.isOpen=a.isOpened=!1,a.isClosing=!0,c(".esgbox-item, .esgbox-nav").remove(),a.wrap.stop(!0,!0).removeClass("esgbox-opened"),a.transitions[a.current.closeMethod]()):(c(".esgbox-wrap").stop(!0).trigger("onReset").remove(),a._afterZoomOut())))},play:function(b){var d=function(){clearTimeout(a.player.timer)},c=function(){d();a.current&&a.player.isActive&&(a.player.timer=setTimeout(a.next,a.current.playSpeed))},
e=function(){d();t.unbind(".player");a.player.isActive=!1;a.trigger("onPlayEnd")};!0===b||!a.player.isActive&&!1!==b?a.current&&(a.current.loop||a.current.index<a.group.length-1)&&(a.player.isActive=!0,t.bind({"onCancel.player beforeClose.player":e,"onUpdate.player":c,"beforeLoad.player":d}),c(),a.trigger("onPlayStart")):e()},next:function(b){var d=a.current;d&&(w(b)||(b=d.direction.next),a.jumpto(d.index+1,b,"next"))},prev:function(b){var d=a.current;d&&(w(b)||(b=d.direction.prev),a.jumpto(d.index-
1,b,"prev"))},jumpto:function(b,d,c){var e=a.current;e&&(b=r(b),a.direction=d||e.direction[b>=e.index?"next":"prev"],a.router=c||"jumpto",e.loop&&(0>b&&(b=e.group.length+b%e.group.length),b%=e.group.length),e.group[b]!==m&&(a.cancel(),a._start(b)))},reposition:function(b,d){var f=a.current,e=f?f.wrap:null;if(e){var k=a._getPosition(d);b&&"scroll"===b.type?(delete k.position,e.stop(!0,!0).animate(k,200)):(e.css(k),f.pos=c.extend({},f.dim,k))}},update:function(b){var d=b&&b.type,c=!d||"orientationchange"===
d;c&&(clearTimeout(A),A=null);a.isOpen&&!A&&(A=setTimeout(function(){var e=a.current;e&&!a.isClosing&&(a.wrap.removeClass("esgbox-tmp"),(c||"load"===d||"resize"===d&&e.autoResize)&&a._setDimension(),"scroll"===d&&e.canShrink||a.reposition(b),a.trigger("onUpdate"),A=null)},c&&!x?0:300))},toggle:function(b){a.isOpen&&(a.current.fitToView="boolean"===c.type(b)?b:!a.current.fitToView,x&&(a.wrap.removeAttr("style").addClass("esgbox-tmp"),a.trigger("onUpdate")),a.update())},hideLoading:function(){t.unbind(".loading");
c("#esgbox-loading").remove()},showLoading:function(){a.hideLoading();var b=c('<div id="esgbox-loading"><div></div></div>').click(a.cancel).appendTo("body");t.bind("keydown.loading",function(b){27===(b.which||b.keyCode)&&(b.preventDefault(),a.cancel())});if(!a.defaults.fixed){var d=a.getViewport();b.css({position:"absolute",top:.5*d.h+d.y,left:.5*d.w+d.x})}},getViewport:function(){var b=a.current&&a.current.locked||!1,d={x:u.scrollLeft(),y:u.scrollTop()};b?(d.w=b[0].clientWidth,d.h=b[0].clientHeight):
(d.w=x&&q.innerWidth?q.innerWidth:u.width(),d.h=x&&q.innerHeight?q.innerHeight:u.height());return d},unbindEvents:function(){a.wrap&&C(a.wrap)&&a.wrap.unbind(".fb");t.unbind(".fb");u.unbind(".fb")},bindEvents:function(){var b=a.current,d;b&&(u.bind("orientationchange.fb"+(x?"":" resize.fb")+(b.autoCenter&&!b.locked?" scroll.fb":""),a.update),(d=b.keys)&&t.bind("keydown.fb",function(f){var e=f.which||f.keyCode,k=f.target||f.srcElement;if(27===e&&a.coming)return!1;f.ctrlKey||f.altKey||f.shiftKey||f.metaKey||
k&&(k.type||c(k).is("[contenteditable]"))||c.each(d,function(d,g){if(1<b.group.length&&g[e]!==m)return a[d](g[e]),f.preventDefault(),!1;if(-1<c.inArray(e,g))return a[d](),f.preventDefault(),!1})}),c.fn.mousewheel&&b.mouseWheel&&a.wrap.bind("mousewheel.fb",function(d,e,k,h){for(var f=c(d.target||null),p=!1;f.length&&!(p||f.is(".esgbox-skin")||f.is(".esgbox-wrap"));)p=(p=f[0])&&!(p.style.overflow&&"hidden"===p.style.overflow)&&(p.clientWidth&&p.scrollWidth>p.clientWidth||p.clientHeight&&p.scrollHeight>
p.clientHeight),f=c(f).parent();0!==e&&!p&&1<a.group.length&&!b.canShrink&&(0<h||0<k?a.prev(0<h?"down":"left"):(0>h||0>k)&&a.next(0>h?"up":"right"),d.preventDefault())}))},trigger:function(b,d){var f,e=d||a.coming||a.current;if(e){c.isFunction(e[b])&&(f=e[b].apply(e,Array.prototype.slice.call(arguments,1)));if(!1===f)return!1;e.helpers&&c.each(e.helpers,function(d,f){if(f&&a.helpers[d]&&c.isFunction(a.helpers[d][b]))a.helpers[d][b](c.extend(!0,{},a.helpers[d].defaults,f),e)});t.trigger(b)}},isImage:function(b){return w(b)&&
b.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(b){return w(b)&&b.match(/\.(swf)((\?|#).*)?$/i)},_start:function(b){var d={};b=r(b);var f=a.group[b]||null;var e=jQuery(f.element[0].parentNode).closest(".tp-esg-item"),e=0<e.length&&void 0!==e?e.attr("id"):"rnoid_0";if(!f)return!1;var k=[];jQuery.each(a.group,function(a,d){var c=!1,g=jQuery(d.element[0].parentNode).closest(".tp-esg-item"),g=0<g.length&&void 0!==g?g.attr("id"):"noid_0";jQuery.each(k,function(b,
a){var e=jQuery(a.element[0].parentNode).closest(".tp-esg-item"),e=0<e.length&&void 0!==e?e.attr("id"):"cel_noid_0";!1===c&&a.href===d.href&&e===g&&(c=!0)});c||(k.push(d),d.href===f.href&&e===g&&(b=k.length-1))});a.group=k;b=r(b);f=a.group[b]||null;if(!f)return!1;d=c.extend(!0,{},a.opts,f);var h=d.margin;var g=d.padding;"number"===c.type(h)&&(d.margin=[h,h,h,h]);"number"===c.type(g)&&(d.padding=[g,g,g,g]);d.modal&&c.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,
helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=a.group;d.index=b;a.coming=d;if(!1===a.trigger("beforeLoad",d))a.coming=null;else{g=d.type;h=d.href;if(!g)return a.coming=null,a.current&&a.router&&"jumpto"!==a.router?(a.current.index=b,a[a.router](a.direction)):!1;a.isActive=!0;if("image"===g||"swf"===g)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===g&&(d.aspectRatio=!0);"iframe"===
g&&x&&(d.scrolling="scroll");d.wrap=c(d.tpl.wrap).addClass("esgbox-"+(x?"mobile":"desktop")+" esgbox-type-"+g+" esgbox-tmp "+d.wrapCSS).appendTo(d.parent||"body");c.extend(d,{skin:c(".esgbox-skin",d.wrap),outer:c(".esgbox-outer",d.wrap),inner:c(".esgbox-inner",d.wrap)});c.each(["Top","Right","Bottom","Left"],function(b,a){d.skin.css("padding"+a,z(d.padding[b]))});a.trigger("onReady");if("inline"===g||"html"===g){if(!d.content||!d.content.length)return a._error("content")}else if(!h)return a._error("href");
"image"===g?a._loadImage():"ajax"===g?a._loadAjax():"iframe"===g?a._loadIframe():a._afterLoad()}},_error:function(b){c.extend(a.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:b,content:a.coming.tpl.error});a._afterLoad()},_loadImage:function(){var b=a.imgPreload=new Image;b.onload=function(){this.onload=this.onerror=null;a.coming.width=this.width/a.opts.pixelRatio;a.coming.height=this.height/a.opts.pixelRatio;a._afterLoad()};b.onerror=function(){this.onload=
this.onerror=null;a._error("image")};b.src=a.coming.href;!0!==b.complete&&a.showLoading()},_loadAjax:function(){var b=a.coming;a.showLoading();a.ajaxLoad=c.ajax(c.extend({},b.ajax,{url:b.href,error:function(b,c){a.coming&&"abort"!==c?a._error("ajax",b):a.hideLoading()},success:function(d,c){"success"===c&&(b.content=d,a._afterLoad())}}))},_loadIframe:function(){var b=a.coming,d=c(b.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",x?"auto":b.iframe.scrolling).attr("src",b.href);
c(b.wrap).bind("onReset",function(){try{c(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(f){}});b.iframe.preload&&(a.showLoading(),d.one("load",function(){c(this).data("ready",1);x||c(this).bind("load.fb",a.update);c(this).parents(".esgbox-wrap").width("100%").removeClass("esgbox-tmp").show();a._afterLoad()}));b.content=d.appendTo(b.inner);b.iframe.preload||a._afterLoad()},_preloadImages:function(){var b=a.group,d=a.current,c=b.length,e=d.preload?Math.min(d.preload,c-
1):0,k;for(k=1;k<=e;k+=1){var h=b[(d.index+k)%c];"image"===h.type&&h.href&&((new Image).src=h.href)}},_afterLoad:function(){var b=a.coming,d=a.current;a.hideLoading();if(b&&!1!==a.isActive)if(!1===a.trigger("afterLoad",b,d))b.wrap.stop(!0).trigger("onReset").remove(),a.coming=null;else{d&&(a.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("esgbox-opened").find(".esgbox-item, .esgbox-nav").remove());a.unbindEvents();var f=b.content;var e=b.type;var k=b.scrolling;c.extend(a,{wrap:b.wrap,skin:b.skin,
outer:b.outer,inner:b.inner,current:b,previous:d});var h=b.href;switch(e){case "inline":case "ajax":case "html":b.selector?f=c("<div>").html(f).find(b.selector):C(f)&&(f.data("esgbox-placeholder")||f.data("esgbox-placeholder",c('<div class="esgbox-placeholder"></div>').insertAfter(f).hide()),f=f.show().detach(),b.wrap.bind("onReset",function(){c(this).find(f).length&&f.hide().replaceAll(f.data("esgbox-placeholder")).data("esgbox-placeholder",!1)}));break;case "image":f=b.tpl.image.replace("{href}",
h);break;case "swf":f='<object id="esgbox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+h+'"></param>';var g="";c.each(b.swf,function(b,a){f+='<param name="'+b+'" value="'+a+'"></param>';g+=" "+b+'="'+a+'"'});f+='<embed src="'+h+'" type="application/x-shockwave-flash" width="100%" height="100%"'+g+"></embed></object>"}C(f)&&f.parent().is(b.inner)||b.inner.append(f);a.trigger("beforeShow");b.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);a._setDimension();a.reposition();a.isOpen=!1;a.coming=null;a.bindEvents();if(!a.isOpened)c(".esgbox-wrap").not(b.wrap).stop(!0).trigger("onReset").remove();else if(d.prevMethod)a.transitions[d.prevMethod]();a.transitions[a.isOpened?b.nextMethod:b.openMethod]();a._preloadImages()}},_setDimension:function(){var b=a.getViewport(),d=0,f=a.wrap,e=a.skin,k=a.inner,h=a.current;var g=h.width;var p=h.height,l=h.minWidth,m=h.minHeight,n=h.maxWidth,q=h.maxHeight,u=h.scrolling,t=h.scrollOutside?
h.scrollbarWidth:0,w=h.margin,v=r(w[1]+w[3]),x=r(w[0]+w[2]);f.add(e).add(k).width("auto").height("auto").removeClass("esgbox-tmp");w=r(e.outerWidth(!0)-e.width());var C=r(e.outerHeight(!0)-e.height());var D=v+w;var A=x+C;var E=F(g)?(b.w-D)*r(g)/100:g;var B=F(p)?(b.h-A)*r(p)/100:p;if("iframe"===h.type){var I=h.content;if(h.autoHeight&&1===I.data("ready"))try{if(I[0].contentWindow.document.location){k.width(E).height(9999);var H=I.contents().find("body");t&&H.css("overflow-x","hidden");B=H.outerHeight(!0)}}catch(K){}}else if("html5"===
h.type)E=g,B=p,jQuery(".esgbox-inner").addClass("html5video");else if(h.autoWidth||h.autoHeight)k.addClass("esgbox-tmp"),h.autoWidth||k.width(E),h.autoHeight||k.height(B),h.autoWidth&&(E=k.width()),h.autoHeight&&(B=k.height()),k.removeClass("esgbox-tmp");g=r(E);p=r(B);var G=E/B;l=r(F(l)?r(l,"w")-D:l);n=r(F(n)?r(n,"w")-D:n);m=r(F(m)?r(m,"h")-A:m);q=r(F(q)?r(q,"h")-A:q);H=n;var J=q;h.fitToView&&(n=Math.min(b.w-D,n),q=Math.min(b.h-A,q));D=b.w-v;x=b.h-x;h.aspectRatio?(g>n&&(g=n,p=r(g/G)),p>q&&(p=q,g=
r(p*G)),g<l&&(g=l,p=r(g/G)),p<m&&(p=m,g=r(p*G))):(g=Math.max(l,Math.min(g,n)),h.autoHeight&&"iframe"!==h.type&&(k.width(g),p=k.height()),p=Math.max(m,Math.min(p,q)));if(h.fitToView)if(k.width(g).height(p),f.width(g+w),b=f.width(),v=f.height(),h.aspectRatio)for(;(b>D||v>x)&&g>l&&p>m&&!(19<d++);)p=Math.max(m,Math.min(q,p-10)),g=r(p*G),g<l&&(g=l,p=r(g/G)),g>n&&(g=n,p=r(g/G)),k.width(g).height(p),f.width(g+w),b=f.width(),v=f.height();else g=Math.max(l,Math.min(g,g-(b-D))),p=Math.max(m,Math.min(p,p-(v-
x)));t&&"auto"===u&&p<B&&g+w+t<D&&(g+=t);k.width(g).height(p);f.width(g+w);b=f.width();v=f.height();d=(b>D||v>x)&&g>l&&p>m;g=h.aspectRatio?g<H&&p<J&&g<E&&p<B:(g<H||p<J)&&(g<E||p<B);c.extend(h,{dim:{width:z(b),height:z(v)},origWidth:E,origHeight:B,canShrink:d,canExpand:g,wPadding:w,hPadding:C,wrapSpace:v-e.outerHeight(!0),skinSpace:e.height()-p});!I&&h.autoHeight&&p>m&&p<q&&!g&&k.height("auto")},_getPosition:function(b){var d=a.current,c=a.getViewport(),e=d.margin,k=a.wrap.width()+e[1]+e[3],h=a.wrap.height()+
e[0]+e[2],e={position:"absolute",top:e[0],left:e[3]};d.autoCenter&&d.fixed&&!b&&h<=c.h&&k<=c.w?e.position="fixed":d.locked||(e.top+=c.y,e.left+=c.x);e.top=z(Math.max(e.top,e.top+(c.h-h)*d.topRatio));e.left=z(Math.max(e.left,e.left+(c.w-k)*d.leftRatio));return e},_afterZoomIn:function(){var b=a.current;b&&((a.isOpen=a.isOpened=!0,a.wrap.css("overflow","visible").addClass("esgbox-opened"),a.update(),(b.closeClick||b.nextClick&&1<a.group.length)&&a.inner.css("cursor","pointer").bind("click.fb",function(d){c(d.target).is("a")||
c(d.target).parent().is("a")||(d.preventDefault(),a[b.closeClick?"close":"next"]())}),b.closeBtn&&c(b.tpl.closeBtn).appendTo(a.skin).bind("click.fb",function(b){b.preventDefault();a.close()}),b.arrows&&1<a.group.length&&((b.loop||0<b.index)&&c(b.tpl.prev).appendTo(a.outer).bind("click.fb",a.prev),(b.loop||b.index<a.group.length-1)&&c(b.tpl.next).appendTo(a.outer).bind("click.fb",a.next)),a.trigger("afterShow"),b.loop||b.index!==b.group.length-1)?a.opts.autoPlay&&!a.player.isActive&&(a.opts.autoPlay=
!1,a.play()):a.play(!1))},_afterZoomOut:function(b){b=b||a.current;c(".esgbox-wrap").trigger("onReset").remove();c.extend(a,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});a.trigger("afterClose",b)}});a.transitions={getOrigPosition:function(){var b=a.current,c=b.element,f=b.orig,e={},k=50,h=50,g=b.hPadding,p=b.wPadding,l=a.getViewport();!f&&b.isDom&&c.is(":visible")&&(f=c.find("img:first"),f.length||(f=c));C(f)?(e=
f.offset(),f.is("img")&&(k=f.outerWidth(),h=f.outerHeight())):(e.top=l.y+(l.h-h)*b.topRatio,e.left=l.x+(l.w-k)*b.leftRatio);if("fixed"===a.wrap.css("position")||b.locked)e.top-=l.y,e.left-=l.x;return e={top:z(e.top-g*b.topRatio),left:z(e.left-p*b.leftRatio),width:z(k+p),height:z(h+g)}},step:function(b,c){var d=c.prop;var e=a.current;var k=e.wrapSpace,h=e.skinSpace;if("width"===d||"height"===d){var g=c.end===c.start?1:(b-c.start)/(c.end-c.start);a.isClosing&&(g=1-g);e="width"===d?e.wPadding:e.hPadding;
e=b-e;a.skin[d](r("width"===d?e:e-k*g));a.inner[d](r("width"===d?e:e-k*g-h*g))}},zoomIn:function(){var b=a.current,d=b.pos,f=b.openEffect,e="elastic"===f,k=c.extend({opacity:1},d);delete k.position;e?(d=this.getOrigPosition(),b.openOpacity&&(d.opacity=.1)):"fade"===f&&(d.opacity=.1);a.wrap.css(d).animate(k,{duration:"none"===f?0:b.openSpeed,easing:b.openEasing,step:e?this.step:null,complete:a._afterZoomIn})},zoomOut:function(){var b=a.current,c=b.closeEffect,f="elastic"===c,e={opacity:.1};f&&(e=this.getOrigPosition(),
b.closeOpacity&&(e.opacity=.1));a.wrap.animate(e,{duration:"none"===c?0:b.closeSpeed,easing:b.closeEasing,step:f?this.step:null,complete:a._afterZoomOut})},changeIn:function(){var b=a.current,c=b.nextEffect,f=b.pos,e={opacity:1},k=a.direction;f.opacity=.1;if("elastic"===c){var h="down"===k||"up"===k?"top":"left";"down"===k||"right"===k?(f[h]=z(r(f[h])-200),e[h]="+=200px"):(f[h]=z(r(f[h])+200),e[h]="-=200px")}"none"===c?a._afterZoomIn():a.wrap.css(f).animate(e,{duration:b.nextSpeed,easing:b.nextEasing,
complete:a._afterZoomIn})},changeOut:function(){var b=a.previous,d=b.prevEffect,f={opacity:.1},e=a.direction;"elastic"===d&&(f["down"===e||"up"===e?"top":"left"]=("up"===e||"left"===e?"-":"+")+"=200px");b.wrap.animate(f,{duration:"none"===d?0:b.prevSpeed,easing:b.prevEasing,complete:function(){c(this).trigger("onReset").remove()}})}};a.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!x,fixed:!0},overlay:null,fixed:!1,el:c("html"),create:function(b){b=c.extend({},this.defaults,
b);this.overlay&&this.close();this.overlay=c('<div class="esgbox-overlay"></div>').appendTo(a.coming?a.coming.parent:b.parent);this.fixed=!1;b.fixed&&a.defaults.fixed&&(this.overlay.addClass("esgbox-overlay-fixed"),this.fixed=!0)},open:function(b){var d=this;b=c.extend({},this.defaults,b);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(b);this.fixed||(u.bind("resize.overlay",c.proxy(this.update,this)),this.update());b.closeClick&&this.overlay.bind("click.overlay",
function(b){if(c(b.target).hasClass("esgbox-overlay"))return a.isActive?a.close():d.close(),!1});this.overlay.css(b.css).show()},close:function(){u.unbind("resize.overlay");if(this.el.hasClass("esgbox-lock")){c(".esgbox-margin").removeClass("esgbox-margin");var b=u.scrollTop();var a=u.scrollLeft();this.el.removeClass("esgbox-lock");u.scrollTop(b).scrollLeft(a)}c(".esgbox-overlay").remove().hide();c.extend(this,{overlay:null,fixed:!1})},update:function(){var b="100%";this.overlay.width(b).height("100%");
if(v){var a=Math.max(n.documentElement.offsetWidth,n.body.offsetWidth);t.width()>a&&(b=t.width())}else t.width()>u.width()&&(b=t.width());this.overlay.width(b).height(t.height())},onReady:function(b,a){var d=this.overlay;c(".esgbox-overlay").stop(!0,!0);d||this.create(b);b.locked&&this.fixed&&a.fixed&&(d||(this.margin=t.height()>u.height()?c("html").css("margin-right").replace("px",""):!1),a.locked=this.overlay.append(a.wrap),a.fixed=!1);!0===b.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(b,
a){if(a.locked){!1!==this.margin&&(c("*").filter(function(){return"fixed"===c(this).css("position")&&!c(this).hasClass("esgbox-overlay")&&!c(this).hasClass("esgbox-wrap")}).addClass("esgbox-margin"),this.el.addClass("esgbox-margin"));var d=u.scrollTop();var e=u.scrollLeft();this.el.addClass("esgbox-lock");u.scrollTop(d).scrollLeft(e)}this.open(b)},onUpdate:function(){this.fixed||this.update()},afterClose:function(b){this.overlay&&!a.coming&&this.overlay.fadeOut(b.speedOut,c.proxy(this.close,this))}};
a.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(b){var d=a.current,f=d.title,e=b.type;c.isFunction(f)&&(f=f.call(d.element,d));if(w(f)&&""!==c.trim(f)){d=c('<div class="esgbox-title esgbox-title-'+e+'-wrap">'+f+"</div>");switch(e){case "inside":e=a.skin;break;case "outside":e=a.wrap;break;case "over":e=a.inner;break;default:e=a.skin,d.appendTo("body"),v&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),a.current.margin[2]+=Math.abs(r(d.css("margin-bottom")))}d["top"===
b.position?"prependTo":"appendTo"](e)}}};c.fn.esgbox=function(b){var d=c(this),f=this.selector||"",e=function(e){var g=c(this).blur(),h=k;if(!(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||g.is(".esgbox-wrap"))){var l=b.groupAttr||"data-esgbox-group";var m=g.attr(l);m||(l="rel",m=g.get(0)[l]);m&&""!==m&&"nofollow"!==m&&(g=f.length?c(f):d,g=g.filter("["+l+'="'+m+'"]'),h=g.index(this));b.index=h;!1!==a.open(g,b)&&e.preventDefault()}};b=b||{};var k=b.index||0;f&&!1!==b.live?t.undelegate(f,"click.fb-start").delegate(f+
":not('.esgbox-item, .esgbox-nav')","click.fb-start",e):d.unbind("click.fb-start").bind("click.fb-start",e);this.filter("[data-esgbox-start=1]").trigger("click");return this};t.ready(function(){c.scrollbarWidth===m&&(c.scrollbarWidth=function(){var a=c('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});c.support.fixedPosition===m&&(c.support.fixedPosition=function(){var b=c('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
a=20===b[0].offsetTop||15===b[0].offsetTop;b.remove();return a}());c.extend(a.defaults,{scrollbarWidth:c.scrollbarWidth(),fixed:c.support.fixedPosition,parent:c("body")});var b=c(q).width();l.addClass("esgbox-lock-test");var d=c(q).width();l.removeClass("esgbox-lock-test");c("<style type='text/css'>.esgbox-margin{margin-right:"+(d-b)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
(function(q){var n=q.esgbox;n.helpers.buttons={defaults:{skipSingle:!1,position:"top",tpl:'<div id="esgbox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,
beforeLoad:function(c,m){c.skipSingle&&2>m.group.length?(m.helpers.buttons=!1,m.closeBtn=!0):m.margin["bottom"===c.position?2:0]+=30},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(c,m){var l=this.buttons;l||(this.list=q(c.tpl).addClass(c.position).appendTo("body"),l={prev:this.list.find(".btnPrev").click(n.prev),
next:this.list.find(".btnNext").click(n.next),play:this.list.find(".btnPlay").click(n.play),toggle:this.list.find(".btnToggle").click(n.toggle),close:this.list.find(".btnClose").click(n.close)});0<m.index||m.loop?l.prev.removeClass("btnDisabled"):l.prev.addClass("btnDisabled");m.loop||m.index<m.group.length-1?(l.next.removeClass("btnDisabled"),l.play.removeClass("btnDisabled")):(l.next.addClass("btnDisabled"),l.play.addClass("btnDisabled"));this.buttons=l;this.onUpdate(c,m)},onUpdate:function(c,m){if(this.buttons){var l=
this.buttons.toggle.removeClass("btnDisabled btnToggleOn");m.canShrink?l.addClass("btnToggleOn"):m.canExpand||l.addClass("btnDisabled")}},beforeClose:function(){this.list&&this.list.remove();this.buttons=this.list=null}}})(jQuery);
(function(q){var n=function(c,m,l){l=l||"";"object"===q.type(l)&&(l=q.param(l,!0));q.each(m,function(l,m){c=c.replace("$"+l,m||"")});l.length&&(c+=(0<c.indexOf("?")?"&":"?")+l);return c};q.esgbox.helpers.media={defaults:{youtube:{matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"opaque",enablejsapi:1},type:"iframe",url:"//www.youtube.com/embed/$3"},
vimeo:{matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},type:"iframe",url:"//player.vimeo.com/video/$1"},metacafe:{matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,params:{autoPlay:"yes"},type:"swf",url:function(c,m,l){l.swf.flashVars="playerVars="+q.param(m,!0);return"//www.metacafe.com/fplayer/"+c[1]+"/.swf"}},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},
type:"swf",url:"//www.dailymotion.com/swf/video/$1"},twitvid:{matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,params:{autoplay:0},type:"iframe",url:"//www.twitvid.com/embed.php?guid=$1"},twitpic:{matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,type:"image",url:"//twitpic.com/show/full/$1/"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},google_maps:{matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",url:function(c){return"//maps.google."+c[1]+"/"+c[3]+""+c[4]+"&output="+(0<c[4].indexOf("layer=c")?"svembed":"embed")}}},beforeLoad:function(c,m){var l=m.href||"",u=!1,t,a;for(t in c)if(c.hasOwnProperty(t)){var v=c[t];if(a=l.match(v.matcher)){u=v.type;l=q.extend(!0,{},v.params,m[t]||(q.isPlainObject(c[t])?c[t].params:null));l="function"===q.type(v.url)?v.url.call(this,a,l,m):n(v.url,a,l);break}}u&&(m.href=l,m.type=u,m.autoHeight=!1)}}})(jQuery);
(function(q){q.esgbox.helpers.thumbs={defaults:{width:50,height:50,position:"bottom",source:function(n){var c;n.element&&(c=q(n.element).find("img").attr("src"));!c&&"image"===n.type&&n.href&&(c=n.href);return c}},wrap:null,list:null,width:0,init:function(n,c){var m=this,l=n.width,u=n.height,t=n.source;var a="";for(var v=0;v<c.group.length;v++)a+='<li><a style="width:'+l+"px;height:"+u+'px;" href="javascript:jQuery.esgbox.jumpto('+v+');"></a></li>';this.wrap=q('<div id="esgbox-thumbs"></div>').addClass(n.position).appendTo("body");
this.list=q("<ul>"+a+"</ul>").appendTo(this.wrap);q.each(c.group,function(a){var n=t(c.group[a]);n&&q("<img />").load(function(){var c=this.width,n=this.height;if(m.list&&c&&n){var t=c/l;var r=n/u;var v=m.list.children().eq(a).find("a");1<=t&&1<=r&&(t>r?(c=Math.floor(c/r),n=u):(c=l,n=Math.floor(n/t)));q(this).css({width:c,height:n,top:Math.floor(u/2-n/2),left:Math.floor(l/2-c/2)});v.width(l).height(u);q(this).hide().appendTo(v).fadeIn(300)}}).attr("src",n)});this.width=this.list.children().eq(0).outerWidth(!0);
this.list.width(this.width*(c.group.length+1)).css("left",Math.floor(.5*q(window).width()-(c.index*this.width+.5*this.width)))},beforeLoad:function(n,c){2>c.group.length?c.helpers.thumbs=!1:c.margin["top"===n.position?0:2]+=n.height+15},afterShow:function(n,c){if(this.list)this.onUpdate(n,c);else this.init(n,c);this.list.children().removeClass("active").eq(c.index).addClass("active")},onUpdate:function(n,c){this.list&&(this.width=this.list.children().eq(0).outerWidth(!0),punchgs.TweenLite.set(this.list,
{width:this.width*(c.group.length+1)}),punchgs.TweenLite.to(this.list,.5,{ease:punchgs.Power3.easeInOut,left:Math.floor(.5*q(window).width()-(c.index*this.width+.5*this.width))}))},beforeClose:function(){this.wrap&&this.wrap.remove();this.list=this.wrap=null;this.width=0}}})(jQuery);