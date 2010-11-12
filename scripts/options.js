jQuery(function($) {

  // Application list
  var apps = [
    {"title": "Gmail"},
    {"title": "Calendar"},
    {"title": "Documents"},
    {"title": "Reader"},
    {"title": "Web"},
    {"title": "Photos"},
    {"title": "Sites"},
    {"title": "Groups"},
    {"title": "Youtube"},
    {"title": "Voice"}
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
