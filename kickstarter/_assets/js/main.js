// If js is activated, hide images to make them appear later

var images = document.getElementsByClassName("animated_img");

for (i = 0; i < images.length; i++) {
  images[i].classList.remove("appear-left");
  images[i].classList.remove("appear-right");
}

var left0 = document.getElementsByClassName("img__left")[0];
var right0 = document.getElementsByClassName("img__right")[0];
var left1 = document.getElementsByClassName("img__left")[1];
var right1 = document.getElementsByClassName("img__right")[1];
var left2 = document.getElementsByClassName("img__left")[2];
var right2 = document.getElementsByClassName("img__right")[2];
var left3 = document.getElementsByClassName("img__left")[3];
var right3 = document.getElementsByClassName("img__right")[3];
var left4 = document.getElementsByClassName("img__left")[4];
var right4 = document.getElementsByClassName("img__right")[4];

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
        gridonload = 'off';
        makehugrid();
        setgridonload();
    }); 

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

    var waypoint_touch = new Waypoint({
      element: document.getElementById('heat'),
      handler: function() {
        left3.classList.add("appear-left");
        right3.classList.add("appear-right");
      }
    })

    var waypoint_touch = new Waypoint({
      element: document.getElementById('material'),
      handler: function() {
        left4.classList.add("appear-left");
        right4.classList.add("appear-right");
      }
    })

} else {
    $(document).ready(function() {
        pageUnits = '%';
        colUnits = '%';
        pagewidth = 90;
        columns = 10;
        columnwidth = 7.3;
        gutterwidth = 3;
        pagetopmargin = 35;
        rowheight = 25.6;
        gridonload = 'off';
        makehugrid();
        setgridonload();
    });

    var waypoint_connect = new Waypoint({
      element: document.getElementById('connect'),
      handler: function() {
        left0.classList.add("appear-left");
        right0.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_use = new Waypoint({
      element: document.getElementById('use'),
      handler: function() {
        left1.classList.add("appear-left");
        right1.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_touch = new Waypoint({
      element: document.getElementById('touch'),
      handler: function() {
        left2.classList.add("appear-left");
        right2.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_touch = new Waypoint({
      element: document.getElementById('heat'),
      handler: function() {
        left3.classList.add("appear-left");
        right3.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_touch = new Waypoint({
      element: document.getElementById('material'),
      handler: function() {
        left4.classList.add("appear-left");
        right4.classList.add("appear-right");
      },
      offset: 300
    })
};

// Change product image with scroll

var egg = document.getElementById('product');

window.addEventListener("scroll", function() {
    if (window.scrollY < 700) {
        egg.src = "_assets/images/egg.png";
    } else if (window.scrollY > 700) {
        egg.src = "_assets/images/egg-connected.png";
    }
});