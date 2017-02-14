// // If js is activated, hide images to make them appear later

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

if ( window.width < 700) {
    var waypoint_intro = new Waypoint({
      element: document.getElementById('intro'),
      handler: function() {
        right0.classList.add("appear-right");
      },
      offset: 200
    })

    var waypoint_connect = new Waypoint({
      element: document.getElementById('connect'),
      handler: function() {
        left0.classList.add("appear-left");
        right1.classList.add("appear-right");
      },
      offset: 100
    })

    var waypoint_use = new Waypoint({
      element: document.getElementById('use'),
      handler: function() {
        left1.classList.add("appear-left");
        right2.classList.add("appear-right");
      }
    })

    var waypoint_features = new Waypoint({
      element: document.getElementById('touch'),
      handler: function() {
        left2.classList.add("appear-left");
      }
    })

} else {
    // $(document).ready(function() {
    //     pageUnits = '%';
    //     colUnits = '%';
    //     pagewidth = 90;
    //     columns = 10;
    //     columnwidth = 7.3;
    //     gutterwidth = 3;
    //     pagetopmargin = 35;
    //     rowheight = 25.6;
    //     gridonload = 'off';
    //     makehugrid();
    //     setgridonload();
    // });

    var waypoint_intro = new Waypoint({
      element: document.getElementById('intro'),
      handler: function() {
        right0.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_connect = new Waypoint({
      element: document.getElementById('connect'),
      handler: function() {
        left0.classList.add("appear-left");
        right1.classList.add("appear-right");
      },
      offset: 100
    })

    var waypoint_use = new Waypoint({
      element: document.getElementById('use'),
      handler: function() {
        left1.classList.add("appear-left");
        right2.classList.add("appear-right");
      },
      offset: 300
    })

    var waypoint_features = new Waypoint({
      element: document.getElementById('touch'),
      handler: function() {
        left2.classList.add("appear-left");
      },
      offset: 300
    })
};

// Change product image with scroll
// Change BG color with scroll

var egg = document.getElementById('product');
var connectTitle = document.getElementById('connect');
var connectP = document.getElementsByClassName('connect__text');

connectTitle.classList.add("section__title--white");
for (i = 0; i < connectP.length; i++) {
    connectP[i].classList.add("text--white");
}

window.addEventListener("scroll", function() {
    egg.style.opacity = 1 - (window.scrollY / 750);
    console.log(egg.style.opacity);

    if (window.scrollY > 700 && window.scrollY < 3000) {
        document.getElementById("html").style.backgroundColor = "#ff433d";
    } else if (window.scrollY > 1400) {
        document.getElementById("html").style.backgroundColor = "pink"; 
    } else {
        document.getElementById("html").style.backgroundColor = "#ffbe32";
    }
});