// ==UserScript==
// @name         Hackernews best button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  show best button in hackernews
// @author       You
// @match        https://news.ycombinator.com/*
// @exclude      https://news.ycombinator.com/best*
// @exclude      https://news.ycombinator.com/submit*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let pagetoparray = document.getElementsByClassName("pagetop")[0].innerHTML.split('|');
    if (pagetoparray[7]) {
        pagetoparray[8] = pagetoparray[7];
    }
    pagetoparray[7] = ' <a href="best">best</a> '
    document.getElementsByClassName("pagetop")[0].innerHTML = pagetoparray.join('|')
})();