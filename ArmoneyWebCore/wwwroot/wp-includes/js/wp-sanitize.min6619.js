!function(){window.wp=window.wp||{},wp.sanitize={stripTags:function(a){a=a||"";var b=a.replace(/<!--[\s\S]*?(-->|$)/g,"").replace(/<(script|style)[^>]*>[\s\S]*?(<\/\1>|$)/gi,"").replace(/<\/?[a-z][\s\S]*?(>|$)/gi,"");return b!==a?wp.sanitize.stripTags(b):b},stripTagsAndEncodeText:function(a){var b=wp.sanitize.stripTags(a),c=document.createElement("textarea");try{c.textContent=b,b=wp.sanitize.stripTags(c.value)}catch(d){}return b}}}();