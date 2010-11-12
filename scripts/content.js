/**
 * Author: Eric J. Duran
 */
 
chrome.extension.sendRequest({localstorage: "gato_selected"}, function(response) {
  if (!response.gato_selected) {
    return; // No local changes, so leave it alone.
  }
  else {
    var apps = response.gato_selected.split(','); // split out the list of sites
    // Flip it that way we can prepend them later and it'll be in the correct order
    apps.reverse();
    
    var url = location.href; // We'll used this for checking
    var baseURL = url.substring(0, url.indexOf('/', 14)); // get the base url
    
    // Sadly google is not consitant, so we have a couple of different cases.
    // I'm sure they'll be more so I'll probably want to abstract this out eventually.
    if ($('#gbar').length != 0) {
      if ($('#gbar nobr').length != 0) {
        var gbar = $('#gbar nobr');
        gbar.parent().find("nobr > b").remove();
        gbar.parent().find("nobr > a").remove(":not('.gb3')");
      }
      else {
        var gbar = $('#gbar');
        $('#gbar > b').remove();
        $("#gbar > a").remove(":not('.gb3')");
      }
    }
    else {
      var gbar = $("#canvas_frame").contents().find("nobr");
      gbar.parent().find("nobr > b").remove();
      gbar.parent().find("nobr > a").remove(":not('.gb3')");
    }

    //generate the links.
    for(var i in apps) {
      // https://mail.google.com
      var href = getURL(apps[i]);
      var baseHref =  href.substring(0, href.indexOf('/', 14));
      if (baseHref == baseURL) {
        var text = $('<b>').addClass('gb1').text(apps[i]);
        gbar.prepend(text);
      }else {
        var link = $('<a>').addClass("gb1 qq")
        .addClass("gb1 qq")
        .attr("target", '_blank')
        .attr("href", href)
        .text(apps[i]);
        gbar.prepend(link);
      }
    }
  }
});

// Current supported apps.
var apps = {
  "Gmail" : "https://mail.google.com/",
  "Calendar" : "https://www.google.com/calendar/",
  "Documents" : "https://docs.google.com/",
  "Reader" : "https://www.google.com/reader/",
  "Web" : "http://www.google.com/webhp?tab=mw",
  "Photos" : "http://picasaweb.google.com/",
  "Sites" : "https://sites.google.com",
  "Groups" : "http://http://groups.google.com/",
  "Youtube" : "http://www.youtube.com/",
  "Voice" : "https://www.google.com/voice",
};

function getURL(appName) {
  return apps[appName];
}

