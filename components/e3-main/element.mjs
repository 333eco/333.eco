import "//cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js";
import { THONLY } from 'https://thonly.org/global.mjs';
import kiitos from "./kiitos.mjs";
import template from './template.mjs';

class E3Main extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        window.addEventListener("hashchange", event => this.#render(false));
    }

    async connectedCallback() {
        await import(`${THONLY}/components/tl-main/tl-kiitos/element.mjs`);
        await import(`${THONLY}/components/tl-main/tl-robot/element.mjs`);
        this.#render(true);
        this.#animate();
    }

    #render(refresh) {
        const page = window.location.hash.substring(1);
        this.shadowRoot.querySelectorAll('header, main, footer').forEach(element => element.style.display = 'none');
        
        if (page) {
            this.shadowRoot.querySelector('tl-kiitos').render(kiitos[page]);
            this.shadowRoot.querySelector('main').style.display = 'block';
            this.shadowRoot.querySelector('footer').style.display = 'block';
        } else {
            const a = this.shadowRoot.querySelector('a');
            a.href = "https://me.thonly.net/#333";
            a.firstElementChild.innerHTML = "<b>Follow</b> for real-time updates!";
            this.shadowRoot.querySelector('header').style.display = 'block';
        }
        
        this.style.display = 'block';
        if (refresh) setTimeout(() => document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }), 300)
        else document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }

    #animate() {
        /* Variables */

        var svg = this.shadowRoot.querySelector("#svg");
        var bg = this.shadowRoot.querySelector("#background");
        var sun = this.shadowRoot.querySelector("#sun");
        var filter = this.shadowRoot.querySelector("#filter");

        // Sky
        var sky = this.shadowRoot.querySelector("#sky");
        var clouds = this.shadowRoot.querySelectorAll(".cloud");
        var planeGroup = this.shadowRoot.querySelector("#planegroup");
        var planetrail = this.shadowRoot.querySelectorAll("#trail line");

        // Land
        var bgMountain = this.shadowRoot.querySelector("#mountain_far");
        var landC = this.shadowRoot.querySelector("#landcontainer");
        var land = this.shadowRoot.querySelector("#land");

        // Mountains
        var mountains = this.shadowRoot.querySelector("#mountains");
        var mountainS = this.shadowRoot.querySelector("#mountain_small");
        var mountainL = this.shadowRoot.querySelector("#mountain_big");

        // Ground
        var road = this.shadowRoot.querySelector("#road");
        var roadLine = this.shadowRoot.querySelectorAll("#road line");
        var grass = this.shadowRoot.querySelector("#grass");
        var soil = this.shadowRoot.querySelector("#soil");
        var grassSoil = this.shadowRoot.querySelectorAll("#grass, #soil");

        // Trees
        var trees = this.shadowRoot.querySelectorAll(".tree");
        var leaves = this.shadowRoot.querySelectorAll(".tree ellipse, .tree ellipse + path, .tree polygon");

        // Buildings
        var buildings = this.shadowRoot.querySelectorAll("#buildings > g");
        var church = this.shadowRoot.querySelector("#church");
        var hospital = this.shadowRoot.querySelector("#hospital");
            var cross = this.shadowRoot.querySelector("#cross");
        var store = this.shadowRoot.querySelector("#store");
        var houseS = this.shadowRoot.querySelector("#house_small");
            var windoorL = this.shadowRoot.querySelector("#window_top_3 > rect:nth-child(3)");
            var windoorR = this.shadowRoot.querySelector("#window_top_3 > rect:nth-child(2)");
        var houseB = this.shadowRoot.querySelector("#house_large");
            var chimney = this.shadowRoot.querySelector("#chimney_3");

        /* Superhero */

        var sprMan = this.shadowRoot.querySelector("#superman");

        // Bird logo
        var bird = this.shadowRoot.querySelector("#bird_1");
        var birdbody = this.shadowRoot.querySelector("#body_2");
        var wingL = this.shadowRoot.querySelector("#wing_left_1");
        var wingR = this.shadowRoot.querySelector("#wing_right_1");

        // Face
        var eyeL = this.shadowRoot.querySelectorAll("#eye_left_1 circle");
        var eyeR = this.shadowRoot.querySelectorAll("#eye_right_1 circle");

        // Clothes
        var cape = this.shadowRoot.querySelectorAll("#cape_1");
        var mask = this.shadowRoot.querySelector("#mask_1");
        var maskBlink = this.shadowRoot.querySelectorAll("#maskLight path, #maskLight polygon");

        /* Timelines + Animations */

        /* Sky Animations */

        // Clouds
        var tlClouds = new TimelineMax({
            repeat: -1
        });

        tlClouds.from(clouds, 45, {x: 850, opacity: 0.2, ease: Power0.easeNone})
        .to(clouds, 45, {x: -850, ease: Power0.easeNone});

        var tlClouds2 = new TimelineMax({
            repeat: -1
        });

        tlClouds2.to(clouds, 3, {opacity: 0.5, y: 5})
        .to(clouds, 3, {opacity: 0.2, y: 0});

        // Plane
        var tlPlane = new TimelineMax({
            repeat: -1,
            delay: 6 + Math.random() * 3,
            repeatDelay: 5 + Math.random() * 30
        });

        tlPlane.from(planeGroup, 5, {x: -800, ease: Power0.easeNone})
        .to(planeGroup, 5, {x: 800, ease: Power0.easeNone});

        // Land
        var tlLand = new TimelineMax({
            repeat: -1
        });

        tlLand.to(landC, 2, {y: 5, ease: Power1.easeInOut})
        .to(landC, 2, {y: 0, ease: Power1.easeInOut});

        var tlCreateLand = new TimelineMax({
            delay: 2
        });

        tlCreateLand.from(road, 2, {x: -820, ease: Elastic.easeOut.config(1, 0.3)})
        .from(grassSoil, 0.5, {y:200, ease: Bounce.easeOut}, "-=0.5");

        // Mountains
        var tlMountainFall = new TimelineMax({
            delay: 3.8
        });

        tlMountainFall.from(mountains, 1, {y: -800, ease: Power3.easeIn})
        .from(mountainS, 2, {scale: 0.8, transformOrigin: "50% 100%", ease: Elastic.easeOut.config(1, 0.2)})
        .from(mountainL, 2, {scale: 0.8, transformOrigin: "50% 100%", ease: Elastic.easeOut.config(1, 0.3)}, "-=2")
        .to(land, 2, {y: 5, ease: Elastic.easeOut.config(2.5, 0.1)}, "-=2")
        .to(land, 1, {y: 0});

        // Buildings
        var tlBuildings = new TimelineMax({
            delay: 7
        });

        tlBuildings.staggerFrom(buildings, 2, {y: -500, delay:0.5, transformOrigin: "50% 50%", ease:Bounce.easeOut, force3D:true}, -0.2);

        // Hospital
        var tlHospitalCross = new TimelineMax({
            delay: 14 + Math.random()*4,
            repeat: -1,
            repeatDelay: 5 + Math.random()*7
        });

        tlHospitalCross.to(cross, 3, {rotation: (Math.floor(Math.random() * (12 - 2 + 1)) + 2)*360, transformOrigin: "50% 50%", ease: Power2.easeInOut});

        // Small house
        var tlSmHWindow = new TimelineMax({
            repeat: -1
        });

        tlSmHWindow.to(windoorL, 2, {transform: "rotateY(160deg)", transformOrigin: "100% 50%", delay: 10})
        .to(windoorR, 2, {transform: "rotateY(-160deg)", transformOrigin: "0% 50%"}, "-=2")
        .to(windoorL, 2, {transform: "rotateY(0deg)", transformOrigin: "100% 50%", delay: 10})
        .to(windoorR, 2, {transform: "rotateY(0deg)", transformOrigin: "0% 50%"}, "-=2");

        // Trees
        var tlTrees = new TimelineMax({
            delay: 4.5
        });

        tlTrees.from(trees, 2, {scale: 0, transformOrigin: "50% 100%"})
        .from(leaves, 2, {scale: 0.2, transformOrigin: "50% 100%"}, "-=1");

        /* Superhero! */

        // Bird logo
        var tlBird = new TimelineMax({
            repeat: -1,
            yoyo: true
        });

        tlBird.to(wingL, 2, {rotation:10, transformOrigin: "80% 65%", ease: Elastic.easeInOut.config(1, 0.75)})
        .to(bird, 2, {y:3, scale: 0.8, transformOrigin: "50% 50%"}, "-=2")
        .to(wingR, 2, {rotation: -10, transformOrigin: "20% 60%", ease: Elastic.easeInOut.config(1, 0.75)}, "-=2")
        .to(wingL, 2, {rotation:-10, transformOrigin: "80% 65%", ease: Elastic.easeInOut.config(1, 0.75)})
        .to(wingR, 2, {rotation: 10, transformOrigin: "20% 60%", ease: Elastic.easeInOut.config(1, 0.75)}, "-=2")
        .to(bird, 2, {y:0, scale: 1, transformOrigin: "50% 50%"}, "-=2");

        // Eyes
        var tlEye = new TimelineMax({
            repeat: -1,
            repeatDelay: 4 + Math.random()*2
        });

        tlEye.from(eyeL, 0.1, {attr: {r:0}})
        .from(eyeR, 0.1, {attr: {r:0}}, "-=.1");

        // Mask
        var tlMaskBlink = new TimelineMax({
            repeat: -1,
            repeatDelay: 6 + Math.random()*3
        });

        tlMaskBlink.to(maskBlink, 0.5, {attr:{opacity: 0.8}, ease: Power4.easeIn})
        .to(maskBlink, 0.5, {attr:{opacity: 0.5}, ease: Power3.easeOut});

        // Cape
        var tlCape = new TimelineMax({
            repeat: -1
        });

        tlCape.set(cape, {y:4});

        tlCape.from(cape, 2, {rotation: -10, transformOrigin: "70% 20%", ease: Power2.easeIn})
        .to(cape, 4, {rotation: 15, transformOrigin: "70% 20%", ease: Elastic.easeOut})
        .to(leaves, 1, {rotation: "-5", transformOrigin: "50% 100%", ease: Elastic.easeInOut.config(2, 0.25)}, "-=4.5")
        .to(cape, 2, {rotation: -10, transformOrigin: "70% 20%", ease: Power3.easeInout})
        .to(leaves, 0.8, {rotation: 0, transformOrigin: "50% 100%", ease: Elastic.easeOut.config(0.5, 0.25)}, "-=2");

        // Superman Movement
        var tlSuperman = new TimelineMax({
            delay: 5 + Math.random()*5
        });

        tlSuperman.set(sprMan, {rotation: 90, transformOrigin: "50% 50%", scale: 0.1, x: -150});
        tlSuperman.to(sprMan, 0.5, {x: 1250, scale: 0.25, ease: Power0.easeNone})
        .to(sprMan, 0.1, {rotation: -90, y:150})
        .to(sprMan, 1.5, {delay: 1.5, x:-350, scale: 0.4, ease: Power0.easeNone})
        .to(sprMan, 0.1, {rotation: 90, x: -150})
        .to(sprMan, 3, {delay: 1, x: 350, scale: 0.6, rotation: 0, ease: Elastic.easeOut.config(1, 0.75)})
        .to(sprMan, 5, {y: 321, ease: Power4.easeInOut}, "-=2.5");

        // Day & Night cycle
        var currentdate = new Date();
        var theHour = currentdate.getHours();
        var day = false;
        var sunUp = 8;
        var sunDown = 18;
        var sunTime = 0;

        if (theHour >= sunUp && theHour <= sunDown) {
            TweenMax.to(bg, 2, {fill : "#FAAF41"});
            TweenMax.to(sun, 4, {fill : "#F7CF52"});
            TweenMax.to(filter, 0.1, {x:1000}); // Move the filter so onClicks can be used by day
            day = true;
        } else {
            TweenMax.to(bg, 2.5, {fill : "#2C3E50"});
            TweenMax.to(sun, 2.5, {fill : "#ECF0F1"});
            TweenMax.to(filter, 2.5, {opacity : 0.2});
        }

        var sunAndMoon = new TimelineMax({
            
        });

        sunAndMoon.to(sun, 5, {bezier:[{cx: 100, cy: 250}, {cx: 400, cy: 50} ,{cx: 700, cy: 210}], ease:Power1.easeInOut});
        if (day) {
            sunTime = ((theHour - sunUp) / (sunDown - sunUp));
        } else {
            if (theHour > sunDown) {
                sunTime = (theHour - sunDown) / ((24 - sunDown) + sunUp);
            } else {
                sunTime = (theHour + (sunUp-2)) / ((24 - sunDown) + sunUp);
            }
        }
        sunAndMoon.progress(sunTime);
        sunAndMoon.pause();

        // Chimney Smoke (Thnx Ju5tu5!)
        for (var i = 0; i < 500; i++) {
        var drop = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        drop.setAttributeNS(null, "class", "smoke");
        drop.setAttributeNS(null, "r", 2 + Math.random() * 3);
        drop.setAttributeNS(null, "fill", "rgba(127, 140, 141," + (Math.random() - 0.5) + ")");
            houseB.insertBefore(drop, houseB.childNodes[0]);
        }

        var smoke = this.shadowRoot.querySelectorAll('.smoke');
        TweenMax.set(smoke, {
        x: 697,
        y: 350
        });

        var tlSmoke = new TimelineMax({
            
        });

        for (var i = 0; i < smoke.length; i++) {
        tlSmoke.to(smoke[i], 4.5, {
            repeat: -1, physics2D: {velocity: 75 + Math.random() * 50, angle: -83, acceleration: 50, accelerationAngle: 180}, opacity: 0}, i*0.1);
        }
        tlSmoke.pause();

        chimney.addEventListener("click", function(){
            if (tlSmoke.paused()) {
                tlSmoke.play();
            } else {
                TweenMax.to(smoke, 2, {opacity: 0});
                setTimeout(function(){
                    tlSmoke.progress(0);
                    tlSmoke.pause();
                    TweenMax.to(smoke, 0.1, {opacity: 1});
                }, 2000);
            }
        });
    }
}

customElements.define("e3-main", E3Main);