"use strict";

// Functions for updating and setting up the views for all tools
var View = {

  // The mode, representing the current tool. Each tool has a string name that
  // the mode can be set to.
  mode: undefined,

  // Displays the given tool results data on the page. Renders the data using
  // the template for the appropriate mode, represented in the data argument
  // under the "mode" key. Animates any transitions between results and tools as
  // needed.
  render: function (mode, data) {
    // Update the current mode
    View.mode = mode;

    // Render the data with the appropriate template
    var results = _.template($("#" + mode + "-template").html(), data);

    // Set the result HTML on the page
    if ($(".results").is(":visible")) {
      $(".results").html(results);
    } else {
      $("#welcome").hide();
      $(".results").html(results);
      $(".results, .reload-button, .options").show();
    }

    // Animate tool transitions
    View.runTransitions();
  },

  // Animates tool transitions based on the current mode
  runTransitions: function () {
    if (View.mode === "from_list" || View.mode === "sort_list") {
      $(".options-header").show();
      $(".number-options").hide();
      $(".list-options").show();
    } else if (View.mode === "number") {
      $(".options-header").show();
      $(".list-options").hide();
      $(".number-options").show();
    } else {
      $(".list-options, .number-options, .options-header").hide();
    }
    $("#results-header").show();
  },

  // Repeats running the current tool with its current settings
  reload: function () {
    var result = Tools[View.mode]();
    View.render(View.mode, result);
  }

};

// Set up the page
$(".navbar-nav > li > a").click(function (event) {
  var mode = event.currentTarget.dataset.tool;
  View.render(mode, Tools[mode]());
});
$(".reload-button").click(View.reload);
Preloader.preload();
