// ==UserScript==
// @name Eruda
// @version 1.0
// @description DevTools
// @author Z7
// @match */*
// ==/UserScript==
(function(){var script=document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script);script.onload=function(){eruda.init()}})();
