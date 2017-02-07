if ( $(window).width() < 700) {      
    $(document).ready(function() {
        pageUnits = '%';
        colUnits = '%';
        pagewidth = 90;
        columns = 2;
        columnwidth = 50;
        gutterwidth = 0;
        pagetopmargin = 35;
        rowheight = 25.6;
        gridonload = 'on';
        makehugrid();
        setgridonload();
    }); 
} else{
    $(document).ready(function() {
        pageUnits = '%';
        colUnits = '%';
        pagewidth = 90;
        columns = 4;
        columnwidth = 22;
        gutterwidth = 4;
        pagetopmargin = 35;
        rowheight = 25.6;
        gridonload = 'on';
        makehugrid();
        setgridonload();
    });
};

var left0 = document.getElementsByClassName("img__left")[0];
var right0 = document.getElementsByClassName("img__right")[0];
var left1 = document.getElementsByClassName("img__left")[1];
var right1 = document.getElementsByClassName("img__right")[1];
var left2 = document.getElementsByClassName("img__left")[2];
var right2 = document.getElementsByClassName("img__right")[2];


var waypoint_connect = new Waypoint({
  element: document.getElementById('connect'),
  handler: function() {
    left0.classList.add("appear-left");
    right0.classList.add("appear-right");
  },
  offset: 200
})

var waypoint_use = new Waypoint({
  element: document.getElementById('use'),
  handler: function() {
    left1.classList.add("appear-left");
    right1.classList.add("appear-right");
  }
})

var waypoint_touch = new Waypoint({
  element: document.getElementById('touch'),
  handler: function() {
    left2.classList.add("appear-left");
    right2.classList.add("appear-right");
  }
})