function updateClock() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var currentTime = hours + ":" + minutes;
  $(".time").html(currentTime);
}



var getTopZIndex = function() {
  var allDivs = $('.window');
  var topZindex = 0;
  var topDivId;
  allDivs.each(function() {
    var currentZindex = parseInt($(this).css('z-index'));
    if (currentZindex > topZindex) {
      topZindex = currentZindex;
      topDivId = this.id;
    }
  });
  return topZindex;

};

var openWindow = function(id) {
  $("#" + id).show();
  $("#" + id).css('z-index', getTopZIndex() + 1);
};

//Dynamically create start bar button and unhide program window already loaded in dom 
var createProgram = function(id, title, url) {
  $("#startbutton").after("<span class='program' id='start-bar-" + id + "' >" + title + "</span>");
  $("#start-bar-" + id).css('background-image');
  var content = '<div class="window ui-widget" id="' + id + '">' +
    '<div class="window-inner">' +
    '<div class="window-header">' +
    '<p>' + title + '</p>' +
    ' <div class="window-icon close" ></div>' +
    ' <div class="window-icon maximise" ></div>' +
    ' <div class="window-icon minimise" ></div>' +
    '</div>' +
    '<div class="window-content" id="' + id + '-content">' +
    '<iframe width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
  '</div>' +
  '</div>' +
  '</div>';
  $(".desktop").after(content);
  $(".window").draggable({
    handle: ".window-header",
    cursor: "move",
    containment: "window",
    stack: ".window"
  });
  $(".window").resizable({
    handles: "n, e, s, w, ne, se, sw, nw",
    minHeight: 250,
    minWidth: 350
  });
  // Prevent windows from moving on sibling being resized or closed
  $(".window").css({
    position: "absolute"
  });
  openWindow(id);
};

var isWindowMaximised = function(id) {
  var targetId = $("#" + id);
  console.log("desktop width " + $(window).width());
  console.log("window width " + targetId.outerWidth());
  if (targetId.outerWidth() < $(window).width()) {
    return false;
  } else //(targetId.outerWidth() $(window).width) 
  {
    return true;
  }
}

var isWindowOpen = function(id) {

  if ($("#start-bar-" + id).length > 0) {
    return true;
    console.log("window open");
  } else {
    return false;
    console.log("window does not exist");

  }
};

var closeProgram = function(id) {
  $("#start-bar-" + id).remove();
  $("#" + id).remove();
};

var minimiseProgram = function(id) {
  $("#start-bar" + id).toggleClass("focused");
};

var maximiseWindow = function(id) {
  var targetId = $("#" + id);

  var originalPos = {
    left: targetId.position().left,
    top: targetId.position().top,
    width: targetId.width(),
    height: targetId.height()
  };

  targetId.draggable("disable");
  targetId.resizable("disable");

  targetId.data("top", originalPos.top);
  targetId.data("left", originalPos.left);
  targetId.data("height", originalPos.height);
  targetId.data("width", originalPos.width);

  targetId.css({
    top: 0,
    left: 0,
    width: $(window).width(),
    height: $(window).height() - 38
  });

};

var unMaximiseWindow = function(id) {
  var targetId = $("#" + id);

  targetId.draggable("enable");
  targetId.resizable("enable");

  targetId.css({
    top: targetId.data("top"),
    left: targetId.data("left"),
    width: targetId.data("width"),
    height: targetId.data("height")
  })
}





$(document).ready(function() {

updateClock();
setInterval(function(){updateClock()}, 10000);
  // toggle start menu 
  $("#startbutton").click(function() {
    $("#startbutton").toggleClass("startbutton-on");
    $('#menu').toggle();
  });

  // close start menu if desktop clicked
  $(".desktop").click(function() {
    // Depress windows start button animation 
    $("#startbutton").removeClass("startbutton-on");
    // hide start menu 
    $('#menu').hide();
  });

  // bind event listeners to programs in task
  $(".startbar").on("click", ".program", function(event) {
    // identify program id that is currently clicked
    var id = $(this).attr('id');
    var windowId = id.substring(10);
    console.log(windowId);
    // is program window currently open? 
    if ($("#" + windowId).is(':visible')) {
      // window is open
      console.log(windowId + " is visible")
      var z = getTopZIndex();
      var windowZ = $("#" + windowId).css("z-index");
      console.log(windowZ)
        // is window top of stack on desktop?
      if ($("#" + windowId).css("z-index") == z) {
        // window is at the top
        console.log(windowId + " is at top of stack")
          // minimise window
        $("#" + windowId).hide();
      }
      if ($("#" + windowId).css("z-index") < z) {
        // window is open, but not at top. 
        console.log("else condition fired pepe show");
        // bring window to front
        openWindow(windowId);
      }
    } else {
      // window is minimised, open window, bring to front of stack.  
      openWindow(windowId);
    }
  });

  // bind closeProgram function to all windows. 
  $(document.body).on("click", ".close", function(event) {
    var target = $(this).parent().parent().parent();
    //console.log(target.attr('id'));
    var targetId = target.attr('id');
    closeProgram(targetId);
  });

  $(document.body).on("click", ".minimise", function(event) {
    var target = $(this).parent().parent().parent();
    console.log(target.attr('id'));
    var targetId = target.attr('id');
    $("#" + targetId).hide();
  });

  $(document.body).on("click", ".maximise", function(event) {
    var target = $(this).parent().parent().parent();
    var targetId = target.attr('id');
    console.log(targetId);
    if (!isWindowMaximised(targetId)) {
      maximiseWindow(targetId);
      console.log("maximising window");
    } else if (isWindowMaximised(targetId)) {
      unMaximiseWindow(targetId);
      console.log("unmaximise window");
    } else {
      console.log("error");
    }
  });

  // bring window to front of stack when clicked. 
  $(document.body).on("click", ".window", function(event) {
    var target = $(this).attr('id');
    var z = getTopZIndex();
    $("#" + target).css("z-index", z + 1);
  });

  $("#menu").on("click", ".launch", function(event) {
    console.log($(this).data("launch"));
    var targetId = $(this).data("launch");
    var title = $(this).data("title");
    var url = $(this).data("url");
    if (!isWindowOpen(targetId)) {
      createProgram(targetId, title, url);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
    } else {
      openWindow(targetId);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
      console.log("program already exists... opening window")
    }
  });

  

  

});
