// ==UserScript==
// @name         Hackernews best button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  show best button in hackernews
// @author       You
// @match        https://news.ycombinator.com/*
// @exclude      https://news.ycombinator.com/best*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("pagetop")[0].innerHTML = document.getElementsByClassName("pagetop")[0].innerHTML + '\n|\n<a href="best">best</a>'
})();