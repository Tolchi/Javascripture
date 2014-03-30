/*globals javascripture*/function getOffsetChapter(e,t){var n=e.book,r=e.chapter,i={},s=parseInt(r,10)+t,o=s-1,u;if(javascripture.data.english[n]&&javascripture.data.english[n][o]!==undefined){i.book=n;i.chapter=s}else $.each(bible.Data.books,function(e,r){if(r[0]===n){u=e+t;if(bible.Data.books[u]!==undefined){i.book=bible.Data.books[u][0];t>0?i.chapter=1:i.chapter=bible.Data.verses[u].length}}});return i}javascripture.modules.reference={load:function(e){var t=this,n=e.book,r=e.chapter,i=e.verse;"undefined"==typeof i&&(e.verse=1);var s=n;typeof r!="undefined"&&(s+=" "+r);typeof i!="undefined"&&(s+=":"+i);$("head title").text(s);var o=$('<div class="three-references" />'),u=getOffsetChapter(e,-1),a=getOffsetChapter(e,1);if(u.book){o.data("prev",u);o.append(t.getChapterText(u))}o.append(t.getChapterText(e));if(a.book){o.data("next",a);o.append(t.getChapterText(a))}$.fn.waypoint&&$(".reference").waypoint("destroy");$("#verse").html(o);maintainState(n,r,i);return this},scrollToVerse:function(e,t){undefined===t&&(t=0);$(document).scrollTop(0);t-=$(".dock").height();$("html").hasClass("reading-mode")&&(t-=50);e.length>0&&$(document).scrollTo(e,{offset:t});$(document).trigger("createWayPoint")},getAnchoringData:function(e){var t="#current",n=0,r=$(document).scrollTop(),i;if(e){e==="prev"&&(i=$(".reference:first-child ol.wrapper li:first-child"));e==="next"&&(i=$(".reference:last-child ol.wrapper li:last-child"));t="#"+i.attr("id");n=r-i.offset().top+$(".dock").height()}return[n,t]},anchorReference:function(e){var t=e[1],n=e[0],r=$(t);t===".current-verse"&&(verseHeight=r.height(),n=-$(window).height()/2+verseHeight);if(r.length===0){r=$("#"+jsonCollection.currentId);n=-$("[data-role=header]").height()}this.scrollToVerse(r,n)},getFamily:function(e){return javascripture.data.strongsObjectWithFamilies[e]?javascripture.data.strongsObjectWithFamilies[e].family:e},getReferenceFromUrl:function(){var e=window.location.hash.split("&"),t={};if(e.length>1){t.book=e[0].split("=")[1],t.chapter=parseInt(e[1].split("=")[1],10),t.verse=1;e[2]&&(t.verse=parseInt(e[2].split("=")[1],10))}return t},loadReferenceFromHash:function(){var e=window.location.hash;if(e.indexOf("search")>-1){var t=e.split("=")[1];setTimeout(function(){createSearchReferencesPanel({lemma:t})})}else{var n=e.split("&");if(n.length>1){var r=n[0].split("=")[1],i=parseInt(n[1].split("=")[1],10),s=1;n[2]&&(s=parseInt(n[2].split("=")[1],10));localStorage&&(localStorage.reference=[r,i,s]);javascripture.modules.reference.load({book:r,chapter:i,verse:s}).scrollToVerse($("#current"))}}},getChapterText:function(e){var t=this,n=e.book,r=e.chapter,i=e.verse,s=r-1,o=i-1,u=!1,a='<div class="reference frequencyAnalysis" data-book="'+n+'" data-chapter="'+r+'"><h1>'+n+" "+r+"</h1>";a+='<ol class="wrapper">';var f,l;if(javascripture.data.hebrew[n]){f=javascripture.data.hebrew;testament="hebrew"}else{f=javascripture.data.greek;testament="greek"}javascripture.data.english[n][s]&&$.each(javascripture.data.english[n][s],function(e,i){a+='<li id="'+n.replace(/ /gi,"_")+"_"+r+"_"+(e+1)+'"';e===o&&(a+=' class="current"');a+='data-verse="'+(e+1)+'">';a+='<div class="wrapper"';e===o&&(a+=' id="current"');if(e===o-5){a+=' id="context"';u=!0}a+=">";a+='<div class="english">';javascripture.modules.versionSelector.getVersion()==="lc"?$.each(f[n][s][e],function(e,n){n&&(a+=t.createWordString(n,"english",testament))}):$.each(javascripture.data.english[n][s][e],function(e,n){n&&(a+=t.createWordString(n,"english",testament))});a+="</div>";if(f[n]&&f[n][s][e]){a+="<div class='original "+testament+"'>";$.each(f[n][s][e],function(e,n){n&&(a+=t.createWordString(n,testament,testament))});a+="</div>"}a+="</div>";a+="</li>"});a+="</ol>";a+="</div>";return a},createWordString:function(e,t,n){var r=this,i="",s=[];if(typeof e[1]=="undefined")return"<span>"+e[0]+"</span> ";lemma=e[1];if(lemma){lemmaArray=lemma.split(" ");$.each(lemmaArray,function(e,t){s.push(javascripture.modules.reference.getFamily(t))})}i+="<span";i+=' class="'+s.join(" ")+'"';i+=' title="'+lemma;e[2]&&(i+=" "+e[2]);i+='"';i+=' data-word="'+e[0]+'"';i+=' data-lemma="'+e[1]+'"';i+=' data-language="'+n+'"';i+=' data-range="verse"';i+=' data-family="'+s.join(" ")+'"';e[2]&&(i+=' data-morph="'+e[2]+'"');i+=">";javascripture.modules.versionSelector.getVersion()==="lc"&&t==="english"?i+=javascripture.modules.translateLiterally.getWord(e):i+=e[0];i+="</span> ";return i}};