function goToId(idName){if(focus!=""){$(window).on("load",function(){var a=$('a[href="#'+idName+'"]');if(a.length){a.parent().addClass('show');a.click();}});}}function getURLParameter(name){return decodeURI((RegExp(name+'='+'(.+?)(&|$)').exec(location.search)||[,null])[1]);}function hideURLParams(){var hide=['id'];for(var h in hide){if(getURLParameter(h)){history.replaceState(null,document.getElementsByTagName("title")[0].innerHTML,window.location.pathname);}}}function check(e){tecla=(document.all)?e.keyCode:e.which;if(tecla==8){return true;}patron=/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]{1,20}$/;tecla_final=String.fromCharCode(tecla);return patron.test(tecla_final);}function feedSpan(t,type){$(t).val($(t).val().toString().toUpperCase());var id=$(t).attr('id');$('#'+id+'-span').html($(t).val().length>=1?$(t).val():'{'+type+'}');}