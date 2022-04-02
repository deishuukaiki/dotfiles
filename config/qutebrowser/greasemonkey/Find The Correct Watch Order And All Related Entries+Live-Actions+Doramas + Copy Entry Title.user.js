// ==UserScript==
// @name         Find The Correct Watch Order And All Related Entries+Live-Actions+Doramas + Copy Entry Title
// @namespace    Search for Live-Actions\Doramas\All Related Entries + Correct Watch Order + Copy Entry Title
// @version      2.0.0.33
// @description  The script shows you the Correct Watch Order And All Related Entries. The script can also auto find if an anime has any Live-Action or Dorama adaptations, and the script can Copy The Anime/Manga Title.
// @author       hacker09
// @include      https://myanimelist.net/forum/?topicid=1863965
// @include      https://myanimelist.net/forum/?topicid=1890672
// @include      /^https:\/\/myanimelist\.net\/((anime|manga)(id=)?(\.php\?id=)?)(\/)?([\d]+)/
// @exclude      https://myanimelist.net/anime/genre/*
// @exclude      https://myanimelist.net/anime/producer/*
// @icon         https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://myanimelist.net&size=64
// @run-at       document-end
// @grant        none
// ==/UserScript==

//The lines below are the beginning of the function
(function() {
  'use strict';
  if (location.href === 'https://myanimelist.net/forum/?topicid=1890672') //If the user is on the Tampermonkey Guide Index
  { //Starts the if condition
    if (document.querySelector("a.header-profile-link").innerText === 'hacker09' || '_cjessop19_') //Check the script user MAL username
    { //Starts the if condition
      $("b:contains('Guides available:')")[0].insertAdjacentHTML('afterEnd', '<div style="cursor: pointer;"><b>Guides available:</b><br><b id="IncorrectlyAddedStep1">Step 1: Click here to check for anime ids that were incorrectly added.</b><br><br><b id="CheckForMissingLinksStep2"> Step 2: Click here to check for anime entries that the tampermonkey guide index is missing</b><br></div>'); //Add 3 clickable texts below the Tampermonkey Guide Index "Guides available" text

      $("b:contains('Guides available:')")[0].innerText = ''; //Remove the default "Guides available" text

      document.querySelector("#IncorrectlyAddedStep1").onclick = function() { //Detects the mouse click on the Step 1 text and starts the function to Check For Missing Links
        var IncorrectlyAddedAnimeIDs = document.querySelector("div.clearfix.word-break").firstChild.innerText.match(/\| \d+ ?\||\|\d+ \|/gi); //Gets all the anime ids that were added incorrectly
        if (IncorrectlyAddedAnimeIDs === null) //If there's no anime ids that were added incorrectly
        { //Starts the if condition
          document.querySelector("#IncorrectlyAddedStep1").innerText = document.querySelector("#IncorrectlyAddedStep1").innerText + "\nDone! There's no anime ids to be fixed! You may now Click on Step 2 if wanted."; //Shows a message
        } //Finishes the if condition
        else { //Starts the else condition
          document.querySelector("#IncorrectlyAddedStep1").innerText = document.querySelector("#IncorrectlyAddedStep1").innerText + '\nYou must fix these anime ids before clicking on step 2!\n' + IncorrectlyAddedAnimeIDs; //Add a text to the end of the IncorrectlyAdded text and add the anime ids that were incorrectly added when the process is finished
        } //Finishes the else condition
      }; //Finishes the IncorrectlyAdded onclick function

      document.querySelector("#CheckForMissingLinksStep2").onclick = function() { //Detects the mouse click on the Step 2 text and starts the function to Check For Missing Links
        var ChiakiIDSArray = []; //Creates a new blank global array
        var GuideIndexIDS = []; //Creates a new blank global array
        var GuideIndexIDSmatches = document.querySelector("div.clearfix.word-break").firstChild.innerText.match(/(?:\|\b\d+)/gi); //Creates a new variable to hold the whole text of the first post on the topic
        var match; //Creates a new blank variable
        for (match in GuideIndexIDSmatches) //For every anime id existent on the GuideIndexIDSmatches text content
        { //Starts the for condition
          GuideIndexIDS.push(GuideIndexIDSmatches[match].replace(/(?:\|)/gi, '')); //Remove the first | symbol in front of the anime id numbers
        } //Finishes the for condition
        document.querySelector("#CheckForMissingLinksStep2").innerText = document.querySelector("#CheckForMissingLinksStep2").innerText + '\nFinished getting all anime ids on this page!\n'; //Add a text to the end of the Step 2 text when the process is finished

        async function GetChiakiIDS() { //Creates a new function
          while (true) { //While the if condition returns true
            var match; //Creates a new blank variable
            var matches = document.querySelector("div.clearfix.word-break").firstChild.innerText.match(/(?:\|\b\d+)/gi); //Get all the anime ids on the MAL page
            for (match in matches) //For all anime ids on the MAL page
            { //Starts the for condition
              var FetchChiaki = matches[match].replace(/(?:\|)/gi, ' https://api.allorigins.win/raw?url=https://chiaki.site/?/tools/watch_order/id/'); //Creates a variable to fetch chiaki.site
              const html = await (await fetch(FetchChiaki)).text(); //Gets the fetch response
              var ChiakiDocument = new DOMParser().parseFromString(html, 'text/html'); //Parses the fetch response

              for (const ChiakiAnimeIDS of ChiakiDocument.querySelectorAll('span.uk-text-muted.uk-text-small > a:nth-child(1)')) { //For every anime entry links existent on the chiaki.site
                ChiakiIDSArray.push(ChiakiAnimeIDS.href.match(/\d+/)[0]); //Get only the anime id of every anime entry links existent on the chiaki.site
              } //Finishes the for condition
            } //Finishes the for condition
            if (ChiakiDocument.body.innerText.search('Watch') > -1) { //If the text Watch was found on the chiaki.site document
              document.querySelector("#CheckForMissingLinksStep2").innerText = document.querySelector("#CheckForMissingLinksStep2").innerText + '  Finished fetching chiaki!\n'; //Add a text to the end of the Step 2 text when the process is finished

              var FinalArray = ChiakiIDSArray.filter(d => !GuideIndexIDS.includes(d)); //Get the ids that chiaki.site has and the Guide is missing
              if (FinalArray.length === 0) //If there's no missing entries on the tampermonkey guide index
              { //Starts the if condition
                document.querySelector("#CheckForMissingLinksStep2").innerText = document.querySelector("#CheckForMissingLinksStep2").innerText + '  Finished comparing the anime ids on this page with all the anime ids that chiaki.site has!\nThe Tampermonkey Guide has no missing entries!\n'; //Add a text to the end of the Step 2 text when the process is finished
              } //Finishes the if condition
              else //If the tampermonkey guide index has missing entries
              { //Starts the else condition
                var GuideMissingIds = document.createElement("div"); //Creates a div element
                FinalArray.forEach(function(AnimeID) { //For every anime id that the guide index is missing
                  GuideMissingIds.innerHTML += GuideMissingIds.innerHTML = '<br><a href="' + `https://myanimelist.net/anime/${AnimeID}` + '">' + `https://myanimelist.net/anime/${AnimeID}` + '</a>'; //Add to the GuideMissingIds div a line break + the anime link with the link as text too
                }); //Finishes the foreach condition

                document.querySelector("#CheckForMissingLinksStep2").innerText = document.querySelector("#CheckForMissingLinksStep2").innerText + '  Finished comparing the anime ids on this page with all the anime ids that chiaki.site has!\nYou can see which entries are missing in the Tampermonkey Guide below:\n'; //Add a text to the end of the Step 2 text when the process is finished
                document.querySelector("#CheckForMissingLinksStep2").appendChild(GuideMissingIds); //Shows the links that the Tampermonkey Guide Index is missing
              } //Finishes the else condition
              return; //Return true
            } //Finishes the if condition
            await new Promise(resolve => setTimeout(resolve, 1000)); //Wait 1 sec before fetching chiaki.site again
          } //Finishes the while condition
        } //Finishes the async GetChiakiIDS function
        GetChiakiIDS(); //Starts the async GetChiakiIDS function
      }; //Finishes the Step 2 onclick function
    } //Finishes the if condition

  } //Finishes the if condition //***************************************************************************************************************************************************************************
  if (location.href === 'https://myanimelist.net/forum/?topicid=1863965') //If the user is on the Official Guidex Index
  { //Starts the if condition

    $("b:contains('Guides available:')")[0].insertAdjacentHTML('afterEnd', '(Click on the letter you want to jump to.)<br><div style="cursor: pointer;"><b id="GoToA">Guides available: A</b> | <b id="GoToB">B</b> | <b id="GoToC">C</b> | <b id="GoToD">D</b> | <b id="GoToE">E</b> | <b id="GoToF">F</b> | <b id="GoToG">G</b> | <b id="GoToH">H</b> | <b id="GoToI">I</b> | <b id="GoToJ">J</b> | <b id="GoToK">K</b> | <b id="GoToL">L</b> | <b id="GoToM">M</b> | <b id="GoToN">N</b> | <b id="GoToO">O</b> | <b id="GoToP">P</b> | <b id="GoToQ">Q</b> | <b id="GoToR">R</b> | <b id="GoToS">S</b> | <b id="GoToT">T</b> | <b id="GoToU">U</b> | <b id="GoToV">V</b> | <b id="GoToW">W</b> | <b id="GoToX">X</b> | <b id="GoToY">Y</b> | <b id="GoToZ">Z</b><div>'); //Add some information and the clickable letter to the "Guide Index" text

    $("b:contains('Guides available:')")[0].innerText = ''; //Remove the default "Guide Index" text

    var start = 'A'.charCodeAt(0); //Create a new variable
    var last = 'Z'.charCodeAt(0); //Create a new variable
    for (let i = start; i <= last; ++i) { //For every charCode
      var letter = String.fromCharCode(i); //Get the letter
      document.querySelector("b#GoTo" + letter).onclick = function() { //Detects the mouse click on the letter and starts the function to jump to this letter
        document.querySelectorAll("b")[i - 37].scrollIntoView(); //Scroll the page until the letter can be seen
      }; //Finishes the function
    } //Finishes the for condition
    //***************************************************************************************************************************************************************************
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() { //Run this function every time the user scrolls the page
      if (document.documentElement.scrollTop > 250) { //If the page was scrolled a lit bit down
        document.querySelector("#topBtn").style.display = "block"; //Show the go to top button
      } else { //If the page was not scrolled down
        document.querySelector("#topBtn").style.display = "none"; //Hide the go to top button
      } //Finishes the else condition
    }; //Finishes the onscroll advent listener
    document.body.insertAdjacentHTML("afterend", '<style>#topBtn {display: none;position: fixed;bottom: 20px;right: 30px;z-index: 99;font-size: 18px;border: none;outline: none;background-color: #2e51a2;color: white;cursor: pointer;padding: 15px;border-radius: 4px;}</style><button onclick="document.documentElement.scrollTop = 0;" id="topBtn" title="Go to top" style="transform: rotate(90deg); display: none;">&lt;</button>'); //Adds the scroll up button to the page
  } //Finishes the if condition //***************************************************************************************************************************************************************************
  if (location.href !== 'https://myanimelist.net/forum/?topicid=1863965' || 'https://myanimelist.net/forum/?topicid=1890672') //If the user isn't on any Guide Index
  { //Starts the if condition

    setTimeout(function() { //Starts the settimeout function (FIX for https://greasyfork.org/en/scripts/407591-anime-torrent-search-links )
      if (document.querySelector("a[href*='bakabt.me']") !== null) //If the link bakabt.me exists on the page
      { //Starts the if condition
        document.querySelectorAll("a[href*='Click+To']").forEach(link => link.href = link.href.split('%3Ca')[0]); //Fix the broken links
      } //Finishes the if condition
    }, 500); //Finishes the settimeout function

    var titleElem = document.querySelector("[itemprop*='name']"); //Select the entry title element
    var titleText = titleElem.innerText.split('\n')[0]; //Select the entry romaji title text
    var findButton = document.createElement("a"); //Creates an "a" element to show a button later
    var copyButton = document.createElement("a"); //Creates an "a" element so the button will appear
    var chiakiButton = document.createElement("a"); //Creates an "a" element so the button will appear
    var animeid = location.pathname.match(/\d+/) === null ? location.search.match(/\d+/)[0] : location.pathname.match(/\d+/)[0]; //Get the anime id to add on the chiaki website url
    var ChiakiFranchiseTitle, ChiakiFranchiseTitleWithSymbols, response2, html2, MyDramaListDocument, response3, html3, MyDramaListText, MyDramaListCheck, MalClubText, ChiakiDocument, FranchiseHasTVType, Websites, LineBeak, Space, AnimeLinks; //Make these variables global

    if (document.querySelector(".title-name") !== null) //On anime pages ".title-name" usually exists. If this element exists
    { //Starts the if condition
      titleElem = document.querySelector(".title-name"); //Select the entry title element
      titleText = document.querySelector(".title-name").textContent; //Select the entry title text
    } //Finishes the if condition
    if (document.querySelector(".title-english") !== null && document.querySelector(".title-name") === null) //On manga pages ".title-name" usually doesn't exists
    { //Starts the if condition
      var SaveEngTitle = document.querySelector(".title-english").innerText; //Save the english title to a variable
      document.querySelector("[itemprop*='name']").firstElementChild.remove(); //Remove Line Break <br>
      document.querySelector(".title-english").remove(); //Remove the Eng title
      setTimeout(function() { //Starts the setTimeout
        titleElem.insertAdjacentHTML('beforeend', '<br><span class="title-english">' + SaveEngTitle + '</span>'); //ReAdd the english title and line break to the page when the script finishes
      }, 0); //Finishes the setTimeout
    } //Finishes the if condition

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(titleText); //Copy the entry title with symbols
    }); //Detect the single mouse click
    copyButton.addEventListener("dblclick", () => {
      navigator.clipboard.writeText(titleText.replace(/[^a-zA-Z0-9]+/g, " ")); //Copy the entry title without symbols
    }); //Detect the double mouse click
    copyButton.setAttribute("title", "1 Click To Copy Entry Title (+ Symbols)\n2 Clicks To Copy Entry Title (Without Symbols)"); //Detects a mouse hover on the button and shows a explanation text
    copyButton.setAttribute("style", "cursor: pointer;margin-left: 13px;height: 10px;width: 10px;background-size: cover;display: inline-block;transform: scale(1.8);vertical-align: top;margin-top: 7px;"); //The CSS for the copy button
    titleElem.appendChild(copyButton); //Append the button close to the title element
    copyButton.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBhcOBQkNughZAAADCUlEQVRIx6XWS2hcVRzH8c90Jklji5qkmKipolFb2iBDQSw+KhXBRbEKLYqIiCi+4kLoJrgQfKAgiChN8UEXCr6KFVxUcFFQa6TpWDNGKUpcqKAMTU2lNdpEZ66LmTtz53FnbvQ3i5lz7r3f+/v//mcOJyWibPlrk11uNiCJin70lgnHIY909OoQ3GSvrc5KhGOFftdb53OnKCDT4G/Ey9bhmO8UpTrgAqtsMuRWcx7xt3pgpdzTcqY879cE/gJpV3nVqB1edwQ1D5X8unQJ/JWw4LIeskfKmD35msMKrtd6a2WiL6rTvBm/hfFXn5u1aKX+8kwmgrvauC3ObpPckq894wDZCjIvSyCIdinUdd52m34Z6dhPr8322hkx0aSwKed6yqUCn/jIHy09lgx7zGqDduP9msvWwM2uwQH3OhFb8HoPWk17ZAjcqEfRm2VcqzdnyVSdR5CNCjPsxVI8rlJ0LfxBu8tZxgHLSrXBcUIhMho0YUcnYHsd94ZSZHyeF1wZl2E0q3i9YpX7DVZsZFzsdjMdgNhgq+66mcC0Q0oWPO0dl+kSWONZQ0aJLutWwDVec23TbMF2OQRmzVYKHjcU6XwscGV5W2xQv75ow7KkpRrdtQb+4nF36GqYnTQpkZqBgX32N3Q/8E8yXOumUFRsNZ1NAFzOOvzPDm+0XXdz3CAlcNh7lpIDz/eS0bYm7vazT5OXHLTOL6JSuzuaHRaMuUVP25Knlpdh4jWXrOT/qdbrsLvNiwKLywOucJc7G3abeuAhLzodGQ/oxp9xwAs96ZK2Vd1gysdV3AXukXbGsbgMF/zUIaaCuervDd61DV84HOdw3gO26InFleRNV0cjRvCDJ/weB1TdQpOo5KTPPCcXTkSBqfLum+9IydbuznnUt87UnguB8+hxuYPJNikMG8D3viwPQxsh8KiT+oyZkUtwcuUi4/ootyJaUwic9oH7jNrvKwsdgIGMja7AER82XkxVM1lrwrZl/RW/8bDJxszTVE7/pxy0aNg5CaCBOfvschR15xP+BXLUxMa/tU5OAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTIzVDE0OjA1OjAzKzAwOjAw5sMT7QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yM1QxNDowNTowMyswMDowMJeeq1EAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC)"; //The copy button image converted to DATA URI
    //********************************************************************************************************************************************************************
    if (window.location.pathname.split('/')[1] === 'anime') // Show the buttons to search for adaptations, and the chiaki site button only if the user is in an anime entry
    { //Starts the if function
      var ChiakiTextData = []; //Creates a new blank array
      var ChiakiAnimeIDSArray = []; //Creates a new blank array

      async function GetAnimeTitle() //Creates a function to Process and Get the Anime Title
      { //Starts the function
        if (ChiakiFranchiseTitle !== titleText) //If we haven't changed (yet) the franchise title we got from chiaki to the entry title
        { //Starts the if condition
          const response = await fetch('https://api.allorigins.win/raw?url=https://chiaki.site/?/tools/watch_order/id/' + animeid); //Fetch
          const html = await response.text(); //Gets the fetch response
          ChiakiDocument = new DOMParser().parseFromString(html, 'text/html'); //Parses the fetch response
          ChiakiFranchiseTitle = ChiakiDocument.querySelector("h2").innerText.split(' Watch Order')[0].replace(/[^a-zA-Z0-9]+/g, " ").trim(); //Get the anime title on the h2 element and remove the Watch Order text, and remove any symbols that the title might have, also removes the first and last whitespaces if existent
          ChiakiFranchiseTitleWithSymbols = ChiakiDocument.querySelector("h2").innerText.split(' Watch Order')[0].trim(); //Get the anime title on the h2 element (with symbols) and remove the Watch Order text, also removes the first and last whitespaces if existent
          FranchiseHasTVType = false; //Define the variable as false
          if ([...ChiakiDocument.querySelectorAll('span.uk-text-muted.uk-text-small')].find(e => e.innerText.includes('TV')) !== null) { //Starts the if condition
            FranchiseHasTVType = true; //Define the variable as true
          } //Finishes the if condition
        } //Finishes the if condition

        response2 = await fetch("https://api.allorigins.win/raw?url=https://mydramalist.com/search?q=" + ChiakiFranchiseTitle); //Fetch
        html2 = await response2.text(); //Gets the fetch response
        MyDramaListDocument = new DOMParser().parseFromString(html2, 'text/html'); //Parses the fetch response

        if (MyDramaListDocument.body.innerText.search(' found for: ') > -1) //If MyDramaList returned any results
        { //Starts the if condition
          MyDramaListText = '\nMyDramaList'; //Display to the user that MyDramaList website will be opened if Ok is clicked
          MyDramaListCheck = '👍 Found on MyDramaList.'; //Display the confirmation that the anime has adaptations found on MyDramaList
        } //Finishes the if condition
        else { //Starts the else condition
          MyDramaListText = ''; //Display to the user that MyDramaList Won't be opened if Ok is clicked
          MyDramaListCheck = '✖ NOT Found on MyDramaList.'; //Display the confirmation that the anime doesn't have any adaptations found on MyDramaList
        } //Finishes the else condition

        Websites = ''; //Creates a new blank variable
        LineBeak = ''; //Creates a new blank variable
        Space = ' '; //Creates a variable to add spaces to the text
        if (MyDramaListCheck.match('NOT') === null) //If MyDramaList returned any results
        { //Starts the if condition
          Websites = ' the following websites:\n'; //Display a message in plural
          LineBeak = '\n'; //Creates a variable to add Line Breaks to the text
          Space = ''; //Creates a new blank variable
        } //Finishes the if condition
        //*************************************************************************************************************************************************
        var TextElement = ChiakiDocument.querySelectorAll("span.uk-text-muted.uk-text-small"); //Creates a variable to loop through the elements after
        for (var i = 0; i < TextElement.length; i++) { //Starts the for condition

          AnimeLinks = ChiakiDocument.querySelectorAll("span.uk-text-muted.uk-text-small > a:nth-child(1)")[i].href.match(/\d+/)[0]; //Store the anime links in a variable
          ChiakiAnimeIDSArray.push(AnimeLinks); //Add All Anime Links on chiaki to an Array

          var TotalRawDuration = TextElement[i].textContent.split("×")[1].split("|")[0].trim(); //Creates a variable to hold the total unprocessed times
          var ALLChiakiTitles = ChiakiDocument.querySelectorAll("span.wo_title")[i].innerText; //Creates a variable to get all the anime titles on chiaki site
          var TotalEpisodes = TextElement[i].textContent.split("|")[2].match(/\d+|\?/g)[0]; //Creates a variable to hold the total episodes
          var EpisodeType = TextElement[i].textContent.split("|")[1].trim(); //Creates a variable to get the episode types
          var eps = ' eps'; //Create a variable called eps
          var Duration = ''; //Creates a blank variable
          var PerEp = ' per ep'; //Create a variable called PerEp
          if (TotalEpisodes === '1') { //If the entry has only 1 ep
            eps = ' ' + EpisodeType; //Change the variable called eps
            PerEp = ''; //Change the variable called PerEp
          } //Finishes the if condition
          if (EpisodeType !== 'TV') { //If the entry type isn't TV
            if (TotalEpisodes !== '1') { //If the entry doesn't have only 1 ep
              eps = ' ' + EpisodeType + 's'; //Change the variable called eps
            } //Finishes the if condition
            Duration = ' of ' + TotalRawDuration + PerEp; //Defines the Duration variable if the episode type isn't TV
          } //Finishes the if condition
          ChiakiTextData.push(ALLChiakiTitles + ',, ' + TotalEpisodes + eps + Duration + ',\n'); //Add Everything to an Array
        } //Finishes the for condition
      } //Finishes the async GetAnimeTitle function
      GetAnimeTitle(); //Call the GetAnimeTitle function

      copyButton.addEventListener("contextmenu", (e) => {
        navigator.clipboard.writeText(ChiakiTextData.join('').trim()); //Copy the array to the clipboard
        e.preventDefault(); //Don't show the right click default contextmenu
      }); //Detect the mouse right click
      copyButton.setAttribute("title", "1 Click To Copy Entry Title (+ Symbols)\n2 Clicks To Copy Entry Title (Without Symbols)\n\nRight click to Copy ALL Entry Titles In The Correct Watch Order With EP Numbers, Duration Times and Entry Types"); //Detects a mouse hover on the button and shows a explanation text

      findButton.addEventListener("click", () => { //Detect the mouse click and search for the anime title
        if (confirm('If you want to search using the Entry Title instead of the Franchise Title\nPress OK')) //Show the confimation alert box text
        { //Starts the if condition
          ChiakiFranchiseTitle = titleText; //Change the Franchise title we got from chiaki to the entry title (to seach on mydramalist)
          ChiakiFranchiseTitleWithSymbols = titleText; //Change the Franchise title we got from chiaki to the entry title (to search on the mal club)
          GetAnimeTitle(); //Call the GetAnimeTitle function to fetch the mydramalist website using the entry title
        } //Finishes the if condition

        async function CheckWithAMALClub() //Creates a function to Check With A MAL Club
        { //Starts the function
          if (FranchiseHasTVType === true) //If the Franchise has at least 1 entry that the type is TV
          { //Starts the if condition
            const response = await fetch('https://myanimelist.net/clubs.php?cid=5450'); //Fetch
            const html = await response.text(); //Gets the fetch response
            const newDocument = new DOMParser().parseFromString(html, 'text/html'); //Parses the fetch response

            newDocument.body.innerText.search(ChiakiFranchiseTitleWithSymbols) > -1 ? MalClubText = '👍 Found on the [[ Live Action Adaptations ]] MAL Club' : MalClubText = '✖ NOT found on the [[ Live Action Adaptations ]] MAL Club'; //If the title is found on the MALClub, display the confirmation whether or not the anime has adaptations found on the MALClub

            var IMDBAsianWiki = 'IMDB and AsianWiki'; //Create a new variable txt
            if (MyDramaListCheck.match('👍') !== null || MalClubText.match('👍') !== null) //If mydramalist or the mal club returned any results
            { //Starts the if condition
              IMDBAsianWiki = 'IMDB\nAsianWiki'; //Change the variable txt
            } //Finishes the if condition

            if (confirm('Franchise Title: ' + ChiakiFranchiseTitle + '\n\n' + MyDramaListCheck + '\n' + MalClubText + '\n\nDo you want to open' + Websites + Space + IMDBAsianWiki + MyDramaListText + LineBeak + Space + 'to confirm that information and get more detailed info?')) //Show the confimation alert box text
            { //Starts the if condition
              window.open("https://www.imdb.com/find?s=tt&q=" + ChiakiFranchiseTitle + "&ref_=nv_sr_sm", "_blank"); //Open IMDB on a new tab
              if (MyDramaListCheck.match('NOT') === null) {
                window.open("https://mydramalist.com/search?q=" + ChiakiFranchiseTitle, "_blank"); //Open MyDramaList on a new tab
              } //Open MyDramaList on a new tab only if any results were found on the website
              window.open("http://asianwiki.com/index.php?title=Special%3ASearch&search=" + ChiakiFranchiseTitle, "_blank"); //Open AsianWiki on a new tab
            } //Finishes the if condition
          } //Finishes the if condition
          else //If the anime doesn't have any entry type = TV
          { //Starts the else condition
            alert("This Franchise doesn't even have any TV type entries, it's very likely that there's no adaptations of any kind for this Franchise, so there's no need to search."); //Show a message to the user
          } //Finishes the else condition
        } //Finishes the async function
        CheckWithAMALClub(); //Calls the function CheckWithAMALClub
      }); //Finishes the advent listener
      findButton.setAttribute("title", "Search for Live-Actions/Doramas"); //Detects a mouse hover on the button and show the text Find Live-Actions
      findButton.setAttribute("style", "cursor: pointer;margin-left: 15px;height: 10px;width: 10px;background-size: cover;display: inline-block;transform: scale(1.8);vertical-align: top;margin-top: 7px;"); //The CSS for the findButton
      titleElem.appendChild(findButton); //Append the button close to the title element
      findButton.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBhcOEyPKmXRYAAACrElEQVRIx+3U32uVdRzA8de2s01d82wQ2GhotNYYSgqlzhSpIVhasF1IkP9ABbsLcdqFuIu6KOxyN120C5EIEemHlLSIkOEyWkRSHofb9NDaGQo7nZ7mtm8X6WmLneec7XTp+7n58nwe3t/P5/t5Pl8eUC4VBSMN2rRpUitr3FXXRavfZqMjhmSF/DPlU4clV5Nhwit6bXbHZd8Z85ekVjttk/CFE4ZWlttaJ0Wy+m1XveQAXnZBMOHQSnQJJy1I6cY6B7zrvDOeuBdd7y05GV2lCw+LpOzGbhfMCiKjduTjlXpErtlSmm6Tn2R1o9stwVde86wWVUtqeE8woKYU4RFBP3a5KedogZ42+9GMvcV1DYbcsd0anwiOx/yhbwpOFRfulPWlavtEvtEY8+VTpg1rWD5YmV+1qXPFXc+p9bHbMcIbUh7TVEzYhDG0mzMSW0tOWr2HiwlrESFlyGiscEGkqlCfE/lVFkn0WWsqVlil3l25YsJxtCIrK56kjW77vVjJV2XsuNfdpPoYYZsWv/qtmPC6y7bag6QB78fMQpd1LvqjmDByWsIb6s3JmBYK6LZ5Vdo5JbDe54JjqFlydS2m0TlBXyk66DAh6/VFeS+lQb9g0IZShRyS8ae3l52Drc4KfvB0zJwvQ5drgit6tHtIpQoJjTq8Y0Iw6BknfKDV4x4pVbnFgBnBpG+d8aGzvjcjuKXPBgmnBSlpP+speNb/ocZepwybEpmVkzboeP6e3mzMghHTZh0rVflPC9rt0alDi7pF7580acSjXnJzpcrlaZaS8SIO/j/KCkfNG/dCXtm76E5YFWv0mTORzzJr//1Q1aqEcy4JDnjeLz5TZ79RX5cjZN4l8w7qVGefTT4yXF7RUK3XjCC4qPnfAy6HhE67TDovXX5+D7jP32Dw0Zd65WyaAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTIzVDE0OjE5OjI4KzAwOjAwfVN/JAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0yM1QxNDoxOToyOCswMDowMAwOx5gAAAAASUVORK5CYII=)"; //The find button image converted to DATA URI
      //********************************************************************************************************************************************************************
      chiakiButton.addEventListener('mousedown', function(e) { //Detects when the user middle clicks on the chiakiButton
        if (e.button === 1) { //Starts the if condition If the middle mouse button was clicked
          (async () => { //Creates a function to check if the guide index has this anime watch order and Starts the function
            const response = await (await fetch('https://myanimelist.net/forum/?topicid=1890672')).text(); //Fetch
            const GuideIndexnewDocument = new DOMParser().parseFromString(response, 'text/html'); //Parses the fetch response
            var GuideIndexLinkElement = [...GuideIndexnewDocument.querySelectorAll('b')].find(e => e.innerText.includes('|' + animeid + '|')); //Gets the topic element that probably has the link of the Franchise and adds that to a variable

            if (GuideIndexLinkElement !== undefined) //If the anime id was found on the guide index
            { //Starts the if condition
              if (GuideIndexLinkElement.previousElementSibling.innerText.match('あ') !== null) //If the anime name has the あ symbol in it on the guide index
              { //Starts the if condition
                alert('Recommended watch order:\nBroadcast order.'); //Shows an alert
              } //Finishes the if condition
              else //If the anime name doesn't have the あ symbol in it on the guide index
              { //Starts the if condition
                alert('Recommended watch order:\nAEGC Guide Order.'); //Shows a text
              } //Finishes the if condition
              window.open(GuideIndexLinkElement.previousElementSibling.href, "_blank"); //Opens the GuideIndexLink on a new tab, and specifies that the GuideIndexLink should be opened on a new tab
            } //Finishes the if condition
            else //If the anime id was NOT found on the guide index
            { //Starts the else condition
              var NotFoundMessage = document.createElement("a"); //Creates an a element
              NotFoundMessage.innerHTML = "<br>Not found on the AEGC Club!<br>Only chiaki.site will be opened.<br>"; //Defines the element text
              NotFoundMessage.setAttribute("style", "font-size: 80%;text-decoration: none;"); //Set the css for the button
              titleElem.appendChild(NotFoundMessage); //Append the NotFoundMessage close to the title element
              setTimeout(function() {
                window.open("https://chiaki.site/?/tools/watch_order/id/" + animeid, "_blank");
              }, 1000); //Opens chiaki.site on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise and specifies that chiaki.site should be opened on a new tab
            } //Finishes the else condition

            var GuideIndexIDSmatches = GuideIndexnewDocument.querySelector("div.clearfix.word-break").firstChild.innerText.match(/(?:\|\b\d+)/gi); //Creates a new variable to hold the whole text of the first post on the topic
            var GuideIndexIDS = []; //Creates a new blank array
            var match; //Creates a new blank variable
            for (match in GuideIndexIDSmatches) //For every anime id existent on the GuideIndexIDSmatches text content
            { //Starts the for condition
              GuideIndexIDS.push(GuideIndexIDSmatches[match].replace(/(?:\|)/gi, '')); //Remove the first | symbol in front of the anime id numbers
            } //Finishes the for condition
            var FinalArray = ChiakiAnimeIDSArray.filter(d => !GuideIndexIDS.includes(d)); //Get the ids that chiaki.site has and the Guide is missing
            var GuideMissingIds = document.createElement("div"); //Creates a div element
            GuideMissingIds.setAttribute("style", "font-size: 80%;display: none;"); //Set the css for the button
            FinalArray.forEach(function(AnimeID) { //For every anime id that the guide index is missing
              GuideMissingIds.innerHTML += GuideMissingIds.innerHTML = '<br><a href="' + `https://myanimelist.net/anime/${AnimeID}` + '">' + `https://myanimelist.net/anime/${AnimeID}` + '</a>'; //Add to the GuideMissingIds div a line break + the anime link with the link as text too
            }); //Finishes the foreach condition

            if (FinalArray.length !== 0) //If there's at least 1 missing id on the guide index
            { //Starts the if condition
              var LinksButton = document.createElement("button"); //Creates a button element
              LinksButton.innerHTML = 'Show AEGC Club Missing Links'; //Defines the element text
              LinksButton.setAttribute("style", "margin-left: 10px;"); //Set the css for the button
              LinksButton.onclick = function() { //Detects the mouse click on the Show Links Button
                if (GuideMissingIds.style.display === "none") { //If the Show missing links button is hidden
                  GuideMissingIds.style.display = ''; //Show the missing links button
                  LinksButton.innerHTML = 'Hide AEGC Club Missing Links'; //Defines the element text
                } else { //If the Show missing links button is being shown
                  GuideMissingIds.style.display = "none"; //Hide the missing links button
                  LinksButton.innerHTML = 'Show AEGC Club Missing Links'; //Defines the element text
                } //Finishes the else condition
              }; //FInishes the onclick advent listener
              titleElem.appendChild(LinksButton); //Display the button to show the ids that chiaki.site has and the Guide is missing
              titleElem.appendChild(GuideMissingIds); //Display the ids that chiaki.site has and the Guide is missing
            } //Finishes the if condition

            if (FinalArray.length === ChiakiAnimeIDSArray.length) //If the guide index is missing the exact same amount of total links that chiaki has for the franchise
            { //Starts the if condition
              LinksButton.remove(); //Remove the button that shows the missing links
            } //Finishes the if condition

            if (GuideIndexLinkElement !== undefined && FinalArray.length === ChiakiAnimeIDSArray.length - 1) //If the anime id was found on the guide index and the missing links is equal all of the chiaki.site total links -1
            { //Starts the if condition
              LinksButton.remove(); //Remove the button that shows the missing links
              var TwoFranchises = document.createElement("a"); //Creates an a element
              TwoFranchises.innerHTML = "<br>It seems that this entry is related to 2 Anime Franchises.<br>Both chiaki.site and the AEGC Club will be opened."; //Defines the element text
              TwoFranchises.setAttribute("style", "font-size: 80%;text-decoration: none;"); //Set the css for the button
              titleElem.appendChild(TwoFranchises); //Append the NotFoundMessage close to the title element

              window.open("https://chiaki.site/?/tools/watch_order/id/" + animeid, "_blank"); //Opens chiaki.site on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise and specifies that chiaki.site should be opened on a new tab
            } //Finishes the if condition

            var MatchDupsRegex = new RegExp('(?:\\|' + animeid + '\\|)', 'gi'); //Creates a new variable to add the anime id to an regex variable
            if (GuideIndexnewDocument.querySelector("div.clearfix.word-break").firstChild.innerText.match(MatchDupsRegex).length > 1) //If 2 identical anime ids were found on the guide index
            { //Starts the if condition
              var OtherFranchiseMessage = document.createElement("a"); //Creates an a element
              OtherFranchiseMessage.innerHTML = "<br>According to the AEGC club this entry also has another related entry that chiaki.site consider as being from another franchise."; //Defines the element text
              OtherFranchiseMessage.setAttribute("style", "font-size: 80%;text-decoration: none;"); //Set the css for the button
              titleElem.appendChild(OtherFranchiseMessage); //Append the OtherFranchiseMessage close to the title element
            } //Finishes the if condition

          })(); //Finishes the async function

          e.preventDefault(); //Prevent the default middle button action from executing
        } //Finishes the if condition
      }); //Finishes the mousedown advent listener

      var MangaOnlyFranchise = false; //Creates a new global variable
    } //Finishes the if condition

    chiakiButton.setAttribute("title", "Click to Find Related Entries + Correct Watch Order\nMiddle Click to to Find Related Entries + Correct Watch Order on chiaki.site and on the AEGC Club\nRight Click to Find Related Entries + Correct Watch Order. (Including mangas,one shot's, Light Novels etc...)"); //Detects a mouse hover on the button and shows some text info
    chiakiButton.setAttribute("style", "cursor: pointer;margin-left: 15px;height: 10px;width: 10px;background-size: cover;display: inline-block;transform: scale(1.8);vertical-align: top;margin-top: 7px;"); //The CSS for the chiakiButton
    chiakiButton.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAeFBMVEUAAADfceLecePYcefycdTMcfHZcefPce7tcdfQce3tcdffceLQce3tcdfeceLmcdziceDycdPLcfDYceflcd3KcfHycdPzcdPUce3tcdricePxtPDlkev0w/Pjg+ftf97ae+v10fboqvLvourvm+ftieHkm+/ah+6xZFdBAAAAGHRSTlMAFypl7u3s3t21tYlzc/Dv6MPCwsKJiWWHdugpAAAA1klEQVQY013Q2XLCMAwFUMehCQkJe4sW2wlZyv//YWVVzAD3yT5zNV6cxndNDVA3nXfPFOX5CzTVpSzMvpWMd8WHERDtVUs1U8mxlDPOLz3N1bvuvziOMIZAKREeetcAPCZmDpAip3kZCFtXg1Q4hpHCPXKcecCtk9HfKd6nKaWMLIgZH7kZkjRlIYYynrtMRIGXNfKCMt4YSuZZWMZb11UAlJIYDuuKOOCmd/5id8ZnTl6eWb3b5pY/ZLdXI7OfwqkeDczsk68Ho9NNzOL7div3a3uv2z/lrx6iZfibGQAAAABJRU5ErkJggg==)"; //The chiaki.site button favicon converted to DATA URI


    if (window.location.pathname.split('/')[1] === 'manga') //If the user is in an manga entry
    { //Starts the if function
      if (document.querySelector("table.anime_detail_related_anime") === null) { //Starts the if condition
        AnimeLinks = document.getElementsByTagName('a'); //Creates a variable to hold all links elements on the page
      } //Finishes the if condition
      else //If the opened page has any Alternative versions:, Spin-offs:, Adaptations: or Other: links elements on the page
      { //Starts the else condition
        AnimeLinks = document.querySelector("table.anime_detail_related_anime").querySelectorAll('a'); //Creates a variable to hold all Alternative versions:, Spin-offs:, Adaptations: and Other: links elements on the page
      } //Finishes the else condition

      MangaOnlyFranchise = true; //If the actual loaded page is manga let's consider the franchise as if it didn't have any anime adaptations
      for (var i = 0; i < AnimeLinks.length; i++) { //Loop through all links elements on the page
        if (AnimeLinks[i].href.match(/^https:\/\/myanimelist\.net\/anime\/[\d]+(\/.*)?/) !== null) //If the link is anime
        { //Starts the if condition
          animeid = AnimeLinks[i].href.match(/\d+/)[0]; //Try to get 1 anime id of the franchise
          MangaOnlyFranchise = false; //If the script found 1 anime id for the franchise change the variable to true
          break; //After the first anime id of the franchise was found stop the for loop condition
        } //Finishes the if condition
      } //Finishes  the for loop condition

    } //Finishes the if condition

    if (MangaOnlyFranchise === false) //If the manga entry HAS anime entries on MAL
    { //Starts the if function
      chiakiButton.addEventListener("click", (e) => { //Detect the mouse click
        window.open("https://chiaki.site/?/tools/watch_order/id/" + animeid, "_blank"); //Opens chiaki.site on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise and specifies that chiaki.site should be opened on a new tab
      }); //Finishes the addEventListener click

      chiakiButton.addEventListener("contextmenu", (e) => {
        window.open("http://www.relatedanime.com/anime/" + animeid, "_blank"); //Open relatedanime.com on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise, including mangas,one shot's, Light Novels and these things...
        e.preventDefault(); //Don't show the right click default contextmenu
      }); //Detect the mouse right click

      chiakiButton.setAttribute("title", "Click to Find Related Entries + Correct Watch Order\nRight Click to Find Related Entries + Correct Watch Order. (Including mangas,one shot's, Light Novels etc...)"); //Detects a mouse hover on the button and shows some text info

    } //Finishes the if condition

    if (MangaOnlyFranchise === true) //If the manga entry has NO anime entries on MAL
    { //Starts the if function
      chiakiButton.addEventListener("click", (e) => { //Detect the mouse click
        window.open("http://www.relatedanime.com/manga/" + animeid, "_blank"); //Detects the mouse click, and Open relatedanime.com on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise, including mangas,one shot's, Light Novels and these things...
      }); //Finishes the addEventListener click

      chiakiButton.addEventListener("contextmenu", (e) => {
        window.open("http://www.relatedanime.com/manga/" + animeid, "_blank"); //Open relatedanime.com on a new tab to show all the related anime entries on MAL on the correct watch order for the anime franchise, including mangas,one shot's, Light Novels and these things...
        e.preventDefault(); //Don't show the right click default contextmenu
      }); //Detect the mouse right click

      chiakiButton.setAttribute("title", "Click to Find Related Entries + Correct Watch Order. (Including mangas,one shot's, Light Novels etc...)\nRight Click to Find Related Entries + Correct Watch Order. (Including mangas,one shot's, Light Novels etc...)"); //Detects a mouse hover on the button and shows some text info
      chiakiButton.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAFY0lEQVQ4T13M2W9cVwEH4N85Z2bunX3xLB5fj8dbHCfNQpw00DjQEKApopsQbUkpVEK8VIAK6lsleIYnxCK1VAWV0ge6gtSqahtFiVCakjZJ6zb1GDupZ7wk9izXs9y5d+4959zDK/D9AR/B/1m5chn/+NNzmNw1g/HSaObSRwuPh6Khk3fN719759xFfWXdVIYx8sSj3/9BQ0Sj2KrV4AuB7KgBKQTIf2dSSvz+5z9DOB5DvjBcbDbqv7748cL3po00Pb67hNKkgTeu1fns9N7z88fnn7MYe3d4uNgGAOV62Ons/G94/q9/gWma0MPhYmVp+c/mTutuz+0hEqQIEooDB3dDGvtw6mvfgMY9T0Yil5U7uK5cTwlN+3jg+2eIY1kIhEJQnMMdOIhlhsizv/zFb/rtrSf2jTIkYgF0dyx0NnpY2urBHhrDj596CkahAGVZIIwBjg2l6ZC6vkn63c5JyljW5zwISvuVCxfI1fNnn43yVtYkDPU+gdnuoVXfRjxA0Hc5Ttw+p07/8Ee9SDwVhfQZ0TSQcBhwbBApZZ8AOnZ2iC+EWFn8zHnl5ZcSDdME08IAgFAwALPdQcs0QZXCIzM53HegZMuZgz1MHWuzVGYmEAoRdDqgACIEoOAe4a16sPrvpUR34EFwgawehLQtON0OhJRwHQf2YID36n30nE6ENRfe60jxuNJCbYTDUIyCisFgUQkO36zAXHgLq9VVtDttDGwLE2kdnLs4WEwhojwo5SMb1VHvOag0bUiX6lFNOxQIaQm4LpTvg3p2/wXZ7Uqx+BE2qk24UsG1bZRSEUwMJ3Bkt4E+93D6K/uRZICmfHhc4J/b1sDVYzdC3HqMAEzZfUgpNylX6mWfsQovlLBmC9xqNGHZNorZNFbWm/jyoRnc+615FMojKI8Mo9N1kIxqKORyQXe7fsfGa8+PbT39B6BeR5/zN2k6nV/tO85ZMnoIsUAQnU4bSgpUanW8v9LAleVNTBzai13zh3H6sXtw6tgeTI7mVVHAry/VjgS2N1IfvPAiLv/xGauxVHmTvvHM78L/OnMm6YM6u4xhGMkYjJFif6JckA/cPQcjn4BiFAgGsO+2Cdx73wlQPbK1fm1t2e4M0G30sOMMcO3ceZ2+8rc52rSd5I3V6nLlyqXlwsGjePDrd+Lhb97VkbHUUjYTVcfvvB1EKcheFywRA8sMtf1ApGbM7o0b5SmM3HYU5fExzGaSgeio8Qh1fdXlvvi77K8tasaYu+sLMzh6/Iv5UG586OqN+ltbjmjyZmPgrtfgrFaxeWOrZqVLH2xM783F98wicf9DOPzQg5jMpGQA9DV6sgz7p8eSjakUqbo+eZ34CszrBWKRyPD7607xxUX+7tsLtz6t3+yBXK9iqc13V9Ol7262rbCIpUASSQhNM2Uu3+dHDq9Rw+5jcNMa15vdm1yP/8oXbIOt1ZDJDEESOvdJF99ZbNO5eCaF0NQYcuNFnWh6HskhBOdOQDEG/Y5jT7NTp54n5fIGhWBQKmQKHvwwk0198rnLLsp4HsV0GonhMTDLDGl6jIniNLp6Hm6shFi+AC1XgA8KwgKC5vKX1VdP/pYVR65Stl0D3V5bvb7VvPTkq2cjL9U62VZxBiOFHLLGOJIHDgOJDMzwJFraNHwtBS0eAyEMUvogkUiDe15F5/JzSP8W7T38JPrf/gnOfelRDMWiuZrFJz8ze95QJqlyVIEJCUCg5Qg4JASb+1DSh7Jt+AA45xdurSyvOu028qNl0PzsfhT2HIAI6YAWTiGkJapt69NwMtGbyqfAWk0EiYue64FCgQxsCNcDlQLEdYXbrL9u5ApeIBgEAPwHGyeoH88NGw4AAAAASUVORK5CYII=)"; //The chiaki.site button favicon changed to the relatedanime.com favicon converted to DATA URI
    } //Finishes the if condition

    titleElem.appendChild(chiakiButton); //Append the chiaki.site button close to the title element
  } //Finishes the if condition
})(); //Finishes the whole function