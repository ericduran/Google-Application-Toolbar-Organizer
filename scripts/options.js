jQuery(function($) {

  // Application list
  var apps = [
    {"title": "Gmail", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Calendar", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Documents", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Reader", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Web", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Photos", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Sites", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Groups", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Youtube", "url": "https://www.google.com/calendar/render?tab=mc"},
    {"title": "Voice", "url": "https://www.google.com/calendar/render?tab=mc"}
  ];
  
  // Populate the select list with the applications
  $.each(apps, function(index, app) {
    $("#applications").each(function() {
      $(this).append($("<option>").html(app.title));
    });
  });

  // Activate the bsmSelect plugin
  $("#applications").bsmSelect({
    animate: true,
    highlight: true,
    plugins: [$.bsmSelect.plugins.sortable(),$.bsmSelect.plugins.compatibility()]
  });
  
  // We'll check for local changes, if not select the default options
  var selected = restore_options();
  if (selected) {
    var selected = selected.split(',');
    $(selected).each(function(index, title) {
      $("option:contains("+title+")").attr('selected', 'selected').parent().change();
    });
  }
  else{
    // Select the defaults
    $("option::lt(6)").attr('selected', 'selected');
  }

  $("#save").click(function() {
    // Get the current values, in the current order
    var selected = [];
    $("#bsmListbsmContainer0 li span").each(function(index, value) {
      selected.push($(value).text());
    });
    // Push this to the local storage
    localStorage["gato_selected"] = selected;
    
    //Now some visual 
    $('.bsmSelect').after(
      $('<span>').addClass('bsmHighlight')
      .text('Save')
      .fadeIn('fast')
      .delay(100)
      .fadeOut('slow', function() { $(this).remove(); })
    );
    return false;
  });
});

// Restores from localStorage.
function restore_options() {
  var selected = localStorage["gato_selected"];
  if (!selected) {
    return;
  }else{
    return selected;
  }
}
