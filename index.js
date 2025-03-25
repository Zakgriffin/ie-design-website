/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/connect.ts":
/*!******************************!*\
  !*** ./src/pages/connect.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickNavConnect: () => (/* binding */ clickNavConnect)
/* harmony export */ });
function clickNavConnect() { }


/***/ }),

/***/ "./src/pages/evolution.ts":
/*!********************************!*\
  !*** ./src/pages/evolution.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickNavEvolution: () => (/* binding */ clickNavEvolution)
/* harmony export */ });
function clickNavEvolution() {
    // const brandBuilt = addScrollImage("brand-built.svg");
}


/***/ }),

/***/ "./src/pages/inspiration.ts":
/*!**********************************!*\
  !*** ./src/pages/inspiration.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickNavInspiration: () => (/* binding */ clickNavInspiration)
/* harmony export */ });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");

const INSPIRATION_TILE_WIDTH_PROPORTION = 0.85;
function styleInspirationTile({ image, major, minor, readMore }) {
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(major, {
        letterSpacing: 0.6,
        fontWeight: 400,
        color: "#000000",
        fontSizeScale: 0.036,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.09,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(minor, {
        letterSpacing: 0.3,
        fontWeight: 350,
        color: "#000000",
        fontSizeScale: 0.027,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.05,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(readMore, {
        letterSpacing: 0.5,
        fontWeight: 400,
        color: _shared__WEBPACK_IMPORTED_MODULE_0__.ieBlue,
        fontSizeScale: 0.03,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.05,
    });
    const scrollHeight = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
    image.style.height = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(scrollHeight * 0.55);
}
function alignInspirationTile({ image, major, minor, readMore }) {
    const s = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
    major.style.left = image.style.left;
    minor.style.left = image.style.left;
    readMore.style.left = image.style.left;
    const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.yAligningWithGaps)([
        image,
        0.03 * s,
        major,
        -0.01 * s,
        minor,
        0.01 * s,
        readMore,
    ]);
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(offset + s * 0.15);
    }
}
function addInspirationTile(imageString, majorText, minorText) {
    const image = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)(imageString);
    const major = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)(majorText);
    const minor = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)(minorText);
    const readMore = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)("Read more");
    return { image, major, minor, readMore };
}
function clickNavInspiration() {
    const inspiration = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("inspiration/inspiration.svg");
    const tiles = [
        addInspirationTile("inspiration/yumie.jpg", "THE START OF SOMETHING YUM-IE", "We always wanted to design chocolate bars and finally did it. Introducing our sweet new brand."),
        addInspirationTile("inspiration/words-ideas.jpg", "SHARE SOME DESIGN LOVE", "The i.e. design promo journals encourage clients to sketch their big ideas and capture their dreams."),
        addInspirationTile("inspiration/cook-ie.jpg", "GOTTA LOVE A COOK-IE", "How a secret recipe works to bring relationships to a whole new level."),
        addInspirationTile("inspiration/remix.jpg", "REMIX", "A behind-the-scenes look at how we transformed classic memory carriers into objects of art."),
        addInspirationTile("inspiration/krempa.png", "REBRANDING A FAMILY BUSINESS", "A refresh for a 50-year legacy."),
        addInspirationTile("inspiration/fotostori.jpg", "BRANDING FROM THE NAME UP", "When a client had an idea for a brand spinoff, we took her concept to reality and launched the business in high style."),
        addInspirationTile("inspiration/inspired-2-create.jpg", "INSPIRED 2 CREATE", "A painting inspired by the i.e. design logo combines oil paints, ground up crayons, and a lego."),
        addInspirationTile("inspiration/from-inside.jpg", "THE VIEW FROM INSIDE", "i.e. design's new studio was 30 years in the making."),
        addInspirationTile("inspiration/reconnecting.jpg", "RECONNECTING", "How uncertain times led to a homecoming for i.e. design's senior designer."),
        addInspirationTile("inspiration/new-studio.jpg", "NEW STUDIO. NEW VIEW.", "How the need for inspiration fueled the building of a studio."),
    ];
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.registerUpdateLayout)(() => {
        const s = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(inspiration, 0.75);
        for (const tile of tiles)
            styleInspirationTile(tile);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignWithGap)(inspiration, tiles[0].image, s * 0.25);
        for (let i = 0; i < tiles.length - 1; i++)
            (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignWithGap)(tiles[i].image, tiles[i + 1].image, s * 0.1);
        for (const tile of tiles)
            alignInspirationTile(tile);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.setMaxScroll)(tiles[tiles.length - 1].image);
    });
}


/***/ }),

/***/ "./src/pages/view.ts":
/*!***************************!*\
  !*** ./src/pages/view.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickNavView: () => (/* binding */ clickNavView)
/* harmony export */ });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");

const majorScrollTextDetails = {
    letterSpacing: 2.2,
    fontWeight: 400,
    color: "#B3B3B3",
    fontSizeScale: 0.065,
    widthScale: _shared__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.09,
};
const minorScrollTextDetails = {
    letterSpacing: 0.2,
    fontWeight: 300,
    color: "#000000",
    fontSizeScale: 0.03,
    widthScale: _shared__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.05,
};
function clickNavView() {
    const home = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/home.svg");
    const horizon = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/horizon.jpg");
    const freshLook = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/fresh-look.svg");
    const greatBrands = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/great-brands.jpg");
    const textTile1 = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollTextSquare)("GREAT BRANDS DON'T JUST HAPPEN", "They require exploration, insight, and tenacity. We hunt for that magic spark that ignites innovation. We bring our extensive skills and experience to each project and give it our all. The result is clear, yet elevated communication that makes people stop, think, and often smile.", "Our studio location is profoundly inspiring. The magnificent view feeds our souls and keeps us inspired to do our best work. It's a place where creative people come together to collaborate and drill down to the heart of the matter. To solve problems and bring ideas to life. To create things worth remembering.");
    const insightClarity = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/insight-clarity.jpg");
    const textTile2 = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollTextSquare)("WE BRING VISION, INSIGHT, AND CLARITY TO EVERY PROJECT", "Successful design starts with identifying a client's needs, goals, and aspirations. Our objectivity shines light on what others have missed. We have the ability to see and interpret the inner workings, culture, and nuances of our client's world. We ask questions – lots of questions. Then listen until we gain the deep understanding necessary to build the solid foundation that any enduring brand needs.", "Our small but mighty team brings together a wide range of talents and perspectives, plus a nice list of awards. We throw our hearts into our work and are known for our fierce commitment to the trusted, long-term partnerships we form. For us, it's personal.");
    const skyward = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("view/skyward.jpg");
    const textTile3 = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollTextSquare)("WE SEE WORK IN A DIFFERENT LIGHT", "People like to ask about our design process. The truth is that the approach to each project varies, because each client and their needs are unique. Creative breakthroughs don't follow the clock. They can happen any time of day – or night. Whether an epiphany is illuminated in a scribble, a dream, or as the clouds roll by, we embrace the fact that each project takes on a life of its own.", "What's constant is our ability to listen and focus, to analyze and connect dots, and to remain curious. The most rewarding projects are with clients who value the balance between pushing forward and allowing time for the perfect solution to emerge. That's our happy place.");
    const textTiles = [textTile1, textTile2, textTile3];
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.registerUpdateLayout)(() => {
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(home, 0.95);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(horizon, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(freshLook, 0.8);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(greatBrands, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(insightClarity, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(skyward, 1);
        for (const textTile of textTiles)
            (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollTextSquare)(textTile, majorScrollTextDetails, minorScrollTextDetails);
        const s = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
        const HOME_HORIZON_PAD = 0.2;
        const FRESH_LOOK_PAD = 0.13;
        const IMAGE_TEXT_SQUARE_PAD = 0.17;
        const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.xAligningWithGaps)([
            home,
            HOME_HORIZON_PAD * s,
            horizon,
            FRESH_LOOK_PAD * s,
            freshLook,
            FRESH_LOOK_PAD * s,
            greatBrands,
            IMAGE_TEXT_SQUARE_PAD * s,
            textTile1.major,
            IMAGE_TEXT_SQUARE_PAD * s,
            insightClarity,
            IMAGE_TEXT_SQUARE_PAD * s,
            textTile2.major,
            IMAGE_TEXT_SQUARE_PAD * s,
            skyward,
            IMAGE_TEXT_SQUARE_PAD * s,
            textTile3.major,
        ]);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(offset);
        }
        for (const textTile of textTiles)
            (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignScrollTextSquare)(textTile, 20, 20);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.setMaxScroll)(textTile3.major);
    });
}


/***/ }),

/***/ "./src/pages/work.ts":
/*!***************************!*\
  !*** ./src/pages/work.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickNavWork: () => (/* binding */ clickNavWork)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../signal */ "./src/signal.ts");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../spring */ "./src/spring.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");



const workContents = [
    {
        name: "berwyn",
        description: [
            "Having spent his entire childhood making films, this company's founder named his agency after the street on which he was raised. With a history like that, we had to elevate Berwyn to landmark status. Using custom photography and master manipulation, we created a flexible sticker system that is interchangeable with multi-colored paper stocks. Employees are encouraged to design their own communications and get a complete series of award-winning business cards to choose from.",
            "Industry: Film, Television, Video Production",
        ],
    },
    {
        name: "k2 krupp",
        description: [
            "This award-winning, New York City public relations and marketing agency has a successful track record in igniting brands from start-ups, new authors, and celebrities by connecting them with cultural trends and influencers. When it came to representing their brand, K2 came to us. Bold, vibrant, and dynamic, this timeless identity system reflects the founder's favorite color and the company's energetic culture and environment.",
            "Industry: Public Relations & Marketing for Media",
        ],
    },
    {
        name: "whym",
        description: [
            "After successfully branding their first eatery, this client returned to us to realize their dream of an upscale, Upper West Side eating destination.",
            "The custom letterform is a whimsical play on their unique spelling and can read upside down. The vibrant color palette was developed in partnership with the interior architecture team to create a warm and exciting atmosphere. The custom die-cut edge of the identity system mimics the curve of the unique, showcase bar.",
            "Industry: Restaurant & Bar",
        ],
    },
    {
        name: "ann sullivan",
        description: [
            "Ann dreamed of being “the Oprah” of organizing. We established her name as the brand and created a tagline, which reflected the peace of mind that her clients get from having and maintaining an organized life. The simple icon series represents each area of expertise. As the company's services have expanded over the years, the identity system has evolved along with it and remains as fresh as it was day one.",
            "Industry: Professional Organizing",
        ],
    },
    {
        name: "loa",
        description: [
            "This professional make-up artist team came to us to brand their patented “waterslide” eye pencil. Color names like “Giving Back Black,” reflect the company's commitment to providing makeovers for women facing health challenges. The playful packaging elevates a staple product to gift worthy and generates attention in a saturated market by flying above its display case. The motif holds special meaning for the founder who shared with us that the butterfly is a sign that her beloved mother is still with her.",
            "Industry: Beauty & Cosmetics",
        ],
    },
    {
        name: "wet",
        description: [
            "This Master Architect and world-renowned spa designer used his reputation and expertise in hydrotherapy to launch an exclusive product line for luxury hotels and resorts. A soothing, muted color palette was designed to reflect the scent profile of each series of scrubs and lotions. Authentic water splash photography set the tone to promote the health benefits and art of bathing. The package design expanded to gift and travel sets that invite guests to take the luxury experience home.",
            "Industry: Health & Wellness Spas",
        ],
    },
    {
        name: "ferragamo",
        description: [
            "Tasked with marketing office space above this luxury brand's Fifth Avenue flagship, we faced the challenge of an unknown, side street entrance. Handed nothing more than an architect's rendering, we elegantly branded the address, captured the energy of the location, and generated enough buzz to expand the viewing party to two dates by luring brokers with the promise of a Ferragamo tie. The results were a quick closing and a feature article in Crain's NY Business citing our innovation and success in a challenging real estate market.",
            "Industries: Luxury Fashion, Real Estate",
        ],
    },
];
function styleWorkDisplays(workDisplays) {
    for (const { textSquare, image1, image2 } of workDisplays) {
        (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textSquare, {
            letterSpacing: 2.2,
            fontWeight: 400,
            color: "#333333",
            fontSizeScale: 0.065,
            widthScale: 1,
            lineHeightScale: 0.09,
        }, {
            letterSpacing: 0.2,
            fontWeight: 300,
            color: "#333333",
            fontSizeScale: 0.03,
            widthScale: 1,
            lineHeightScale: 0.05,
        });
        (0,_shared__WEBPACK_IMPORTED_MODULE_2__.centerImageScaled)(image1, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_2__.centerImageScaled)(image2, 1);
    }
}
function populateWorkDisplays(workDisplays) {
    for (const workContent of workContents) {
        const textSquare = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollTextSquare)(workContent.name.toUpperCase(), ...workContent.description);
        const image1 = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(`work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(workContent.name)}/1.jpg`);
        const image2 = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(`work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(workContent.name)}/2.jpg`);
        workDisplays.push({ textSquare, image1, image2 });
    }
}
function layoutWorkDisplays(workDisplays) {
    const items = [];
    const s = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.getScrollHeight)();
    for (const { textSquare, image1, image2 } of workDisplays) {
        items.push(
        //
        textSquare.major, 0.2 * s, image1, 0.15 * s, image2, 0.22 * s);
    }
    const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.xAligningWithGaps)(items);
    for (const { element, offset } of elementAlignments) {
        element.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(offset);
    }
}
function clickNavWork() {
    const workItems = [];
    const workDisplays = [];
    const BOTTOM = (tabElement) => (window.innerHeight - tabElement.clientHeight) / 2;
    const TOP = (tabElement) => window.innerHeight - tabElement.clientWidth / 2;
    for (let i = 0; i < workContents.length; i++) {
        const workContent = workContents[i];
        const tabElement = document.createElement("img");
        tabElement.style.position = "absolute";
        tabElement.style.visibility = "hidden";
        tabElement.src = `work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(workContent.name)}/tab.png`;
        _shared__WEBPACK_IMPORTED_MODULE_2__.body.append(tabElement);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => _shared__WEBPACK_IMPORTED_MODULE_2__.body.removeChild(tabElement));
        const spring = new _spring__WEBPACK_IMPORTED_MODULE_1__.Spring(0);
        const springSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
        spring.setStiffnessCritical(1000);
        tabElement.onmouseover = () => {
            spring.target = -0.1;
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
        };
        tabElement.onmouseleave = () => {
            spring.target = 0;
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
        };
        (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
            const k = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.mapRange)(spring.position, 0, 1, BOTTOM(tabElement), TOP(tabElement));
            tabElement.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(k);
        }, [springSig, _shared__WEBPACK_IMPORTED_MODULE_2__.bodySig]);
        springSig.update();
        tabElement.onclick = () => {
            for (const workItem of workItems) {
                const { tabElement, spring, springSig } = workItem;
                spring.setStiffnessCritical(800);
                spring.target = 1;
                tabElement.onmouseover = () => {
                    spring.target = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.mapRange)(window.innerHeight - tabElement.width, BOTTOM(tabElement), TOP(tabElement), 0, 1);
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                tabElement.onmouseleave = () => {
                    spring.target = 1;
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
            }
            populateWorkDisplays(workDisplays);
            _shared__WEBPACK_IMPORTED_MODULE_2__.bodySig.update(); // hm dont like this
            (0,_shared__WEBPACK_IMPORTED_MODULE_2__.setScroll)(workDisplays[i].textSquare.major.offsetLeft);
        };
        const timeoutHandle = setTimeout(() => {
            spring.position = 1;
            tabElement.style.visibility = "visible";
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
        }, 80 * i);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => clearInterval(timeoutHandle));
        workItems.push({ tabElement, spring, springSig });
    }
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
        for (let i = 0; i < workItems.length; i++) {
            const { tabElement } = workItems[i];
            const start = 300;
            const end = window.innerWidth - 150;
            const width = (end - start) / (workItems.length * 2 - 1);
            const height = width * (tabElement.naturalHeight / tabElement.naturalWidth);
            const k = window.innerHeight * 0.8;
            if (height < k) {
                tabElement.style.width = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(width);
                tabElement.style.height = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(height);
            }
            else {
                tabElement.style.height = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(k);
                tabElement.style.width = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(k * (tabElement.naturalWidth / tabElement.naturalHeight));
            }
            tabElement.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(start + i * width * 2);
            styleWorkDisplays(workDisplays);
            const s = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.getScrollHeight)();
            for (const workDisplay of workDisplays)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.alignScrollTextSquare)(workDisplay.textSquare, 0.01 * s, 0.01 * s);
            layoutWorkDisplays(workDisplays);
            if (workDisplays.length)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.setMaxScroll)(workDisplays[workDisplays.length - 1].image2);
        }
    });
}


/***/ }),

/***/ "./src/shared.ts":
/*!***********************!*\
  !*** ./src/shared.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION: () => (/* binding */ SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION),
/* harmony export */   addScrollImage: () => (/* binding */ addScrollImage),
/* harmony export */   addScrollText: () => (/* binding */ addScrollText),
/* harmony export */   addScrollTextSquare: () => (/* binding */ addScrollTextSquare),
/* harmony export */   alignScrollTextSquare: () => (/* binding */ alignScrollTextSquare),
/* harmony export */   alignWithGap: () => (/* binding */ alignWithGap),
/* harmony export */   body: () => (/* binding */ body),
/* harmony export */   bodySig: () => (/* binding */ bodySig),
/* harmony export */   centerImageScaled: () => (/* binding */ centerImageScaled),
/* harmony export */   centerVertical: () => (/* binding */ centerVertical),
/* harmony export */   connectNav: () => (/* binding */ connectNav),
/* harmony export */   evolutionNav: () => (/* binding */ evolutionNav),
/* harmony export */   g: () => (/* binding */ g),
/* harmony export */   getScrollHeight: () => (/* binding */ getScrollHeight),
/* harmony export */   globalSVG: () => (/* binding */ globalSVG),
/* harmony export */   ieBlue: () => (/* binding */ ieBlue),
/* harmony export */   inspirationNav: () => (/* binding */ inspirationNav),
/* harmony export */   logo: () => (/* binding */ logo),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   navItems: () => (/* binding */ navItems),
/* harmony export */   onNavOptionClick: () => (/* binding */ onNavOptionClick),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   registerUpdateLayout: () => (/* binding */ registerUpdateLayout),
/* harmony export */   scrollClip: () => (/* binding */ scrollClip),
/* harmony export */   scrollableItems: () => (/* binding */ scrollableItems),
/* harmony export */   setMaxScroll: () => (/* binding */ setMaxScroll),
/* harmony export */   setScroll: () => (/* binding */ setScroll),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   spaceToFile: () => (/* binding */ spaceToFile),
/* harmony export */   stupidAspectGarbage: () => (/* binding */ stupidAspectGarbage),
/* harmony export */   styleScrollText: () => (/* binding */ styleScrollText),
/* harmony export */   styleScrollTextSquare: () => (/* binding */ styleScrollTextSquare),
/* harmony export */   viewNav: () => (/* binding */ viewNav),
/* harmony export */   workNav: () => (/* binding */ workNav),
/* harmony export */   xAligningWithGaps: () => (/* binding */ xAligningWithGaps),
/* harmony export */   yAligningWithGaps: () => (/* binding */ yAligningWithGaps)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const body = document.body;
const bodySig = (0,_signal__WEBPACK_IMPORTED_MODULE_0__.elementSignal)(body);
const ieBlue = "#609CCE";
const viewNav = g("nav-view");
const workNav = g("nav-work");
const inspirationNav = g("nav-inspiration");
const evolutionNav = g("nav-evolution");
const connectNav = g("nav-connect");
const navItems = [viewNav, workNav, inspirationNav, evolutionNav, connectNav];
const scrollClip = g("scroll-clip");
const scrollableItems = g("scrollable-items");
const logo = g("logo");
const globalSVG = g("global-svg");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION = 0.95;
let onNavOptionClick = [];
function g(id) {
    return document.getElementById(id);
}
function px(pixels) {
    return pixels + "px";
}
function stupidAspectGarbage(element) {
    // i fucking hate this layout engine
    element.style.width = px((element.naturalWidth / element.naturalHeight) * element.clientHeight);
}
function centerImageScaled(image, scale) {
    const height = scrollClip.clientHeight * scale;
    image.style.height = px(height);
    stupidAspectGarbage(image);
    image.style.top = px((scrollClip.clientHeight - height) / 2);
}
function appendImageSmart(element, append) {
    if (element instanceof HTMLImageElement)
        imageLoadingPromises.push(element.decode());
    imageLoadingAppends.push(append);
}
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    appendImageSmart(scrollImage, () => {
        scrollableItems.appendChild(scrollImage);
        onNavOptionClick.push(() => scrollableItems.removeChild(scrollImage));
    });
    return scrollImage;
}
function mapRange(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
function getScrollHeight() {
    // return scrollableItems.clientHeight;
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return window.innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}
function clickAnyNav(navItem, f) {
    navItem.style.cursor = "pointer";
    navItem.onclick = () => {
        scroll = 0;
        for (const u of onNavOptionClick)
            u();
        onNavOptionClick = [];
        for (const n of navItems) {
            n.style.color = "#808080";
        }
        navItem.style.color = "#000000";
        f();
        scroll = 0;
        updateScroll();
    };
}
function centerVertical(item, y) {
    return y - item.clientHeight / 2;
}
function alignWithGap(leftElement, rightElement, gap) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.clientWidth + gap);
}
function addScrollText(text) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    appendImageSmart(scrollText, () => {
        scrollableItems.append(scrollText);
    });
    onNavOptionClick.push(() => scrollableItems.removeChild(scrollText));
    return scrollText;
}
function styleScrollText(scrollText, s) {
    scrollText.style.fontFamily = "Spartan";
    scrollText.style.position = "absolute";
    scrollText.style.fontWeight = "" + s.fontWeight;
    scrollText.style.color = s.color;
    scrollText.style.letterSpacing = px(s.letterSpacing);
    const scrollHeight = getScrollHeight();
    scrollText.style.fontSize = px(scrollHeight * s.fontSizeScale);
    scrollText.style.width = px(scrollHeight * s.widthScale);
    scrollText.style.lineHeight = px(scrollHeight * s.lineHeightScale);
}
function axisAligningWithGaps(axisSize) {
    return (elementOrGaps) => {
        const elementAlignments = [];
        let runningTotal = 0;
        for (const elementOrGap of elementOrGaps) {
            if (elementOrGap instanceof HTMLElement) {
                elementAlignments.push({ element: elementOrGap, offset: runningTotal });
                runningTotal += axisSize(elementOrGap);
            }
            else {
                runningTotal += elementOrGap;
            }
        }
        return [elementAlignments, runningTotal];
    };
}
const yAligningWithGaps = axisAligningWithGaps((element) => element.clientHeight);
const xAligningWithGaps = axisAligningWithGaps((element) => element.clientWidth);
function addScrollTextSquare(majorText, ...minorTexts) {
    const major = addScrollText(majorText);
    const minors = minorTexts.map(addScrollText);
    return { major, minors };
}
function styleScrollTextSquare({ major, minors }, majorScrollTextDetails, minorScrollTextDetails) {
    styleScrollText(major, majorScrollTextDetails);
    for (const minor of minors)
        styleScrollText(minor, minorScrollTextDetails);
}
let imageLoadingPromises = [];
let imageLoadingAppends = [];
function registerUpdateLayout(updateLayout) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateLayoutImageWaiting = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(imageLoadingPromises);
            for (const imageLoadingAppend of imageLoadingAppends)
                imageLoadingAppend();
            imageLoadingPromises = [];
            imageLoadingAppends = [];
            updateLayout();
        });
        (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(updateLayoutImageWaiting, [bodySig]);
        onNavOptionClick.push(() => bodySig.unsubscribe(updateLayoutImageWaiting));
        updateLayoutImageWaiting();
    });
}
function alignScrollTextSquare({ major, minors }, majorToMinorGap, betweenMinorsGap) {
    const items = [];
    items.push(major, majorToMinorGap);
    for (const minor of minors) {
        items.push(minor, betweenMinorsGap);
    }
    items.pop(); // remove final gap, only want betweens
    const scrollHeight = getScrollHeight();
    const [elementAlignments, totalHeight] = yAligningWithGaps(items);
    const groupTop = (scrollHeight - totalHeight) / 2;
    for (const { element, offset } of elementAlignments) {
        element.style.top = px(groupTop + offset);
    }
    for (const minor of minors) {
        minor.style.left = major.style.left;
    }
}
function spaceToFile(s) {
    return s.replace(" ", "-");
}
// real stuff
(0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
    const leftAlign = 80;
    logo.style.width = px(55);
    logo.style.height = px(55);
    logo.style.left = px(leftAlign);
    logo.style.top = px(leftAlign / 2);
    function alignNavItem(navItem, nudge) {
        navItem.style.left = px(leftAlign);
        navItem.style.top = px(window.innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
    }
    alignNavItem(viewNav, -2);
    alignNavItem(workNav, -1);
    alignNavItem(inspirationNav, 0);
    alignNavItem(evolutionNav, 1);
    alignNavItem(connectNav, 2);
}, [bodySig]);
(0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
    const x = 280;
    const scrollHeight = getScrollHeight();
    scrollClip.style.height = px(scrollHeight);
    scrollClip.style.width = px(window.innerWidth - x);
    scrollClip.style.top = px(centerVertical(scrollClip, window.innerHeight / 2));
    scrollClip.style.left = px(x);
    scrollableItems.style.width = px(100);
    scrollableItems.style.height = px(100);
}, [bodySig]);
let scroll = 0;
function updateScroll() {
    scrollableItems.style.left = px(-scroll);
}
function setScroll(s) {
    scroll = s;
    updateScroll();
}
let maxScroll = 0;
function setMaxScroll(element) {
    maxScroll = element.offsetLeft + element.offsetWidth - scrollClip.offsetWidth + 100;
}
window.onwheel = (e) => {
    scroll += e.deltaX + e.deltaY;
    if (scroll < 0)
        scroll = 0;
    if (scroll > maxScroll)
        scroll = maxScroll;
    updateScroll();
};
clickAnyNav(logo, _pages_view__WEBPACK_IMPORTED_MODULE_4__.clickNavView);
clickAnyNav(viewNav, _pages_view__WEBPACK_IMPORTED_MODULE_4__.clickNavView);
clickAnyNav(workNav, _pages_work__WEBPACK_IMPORTED_MODULE_5__.clickNavWork);
clickAnyNav(inspirationNav, _pages_inspiration__WEBPACK_IMPORTED_MODULE_3__.clickNavInspiration);
clickAnyNav(evolutionNav, _pages_evolution__WEBPACK_IMPORTED_MODULE_2__.clickNavEvolution);
clickAnyNav(connectNav, _pages_connect__WEBPACK_IMPORTED_MODULE_1__.clickNavConnect);
setTimeout(() => viewNav.click());


/***/ }),

/***/ "./src/signal.ts":
/*!***********************!*\
  !*** ./src/signal.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signal: () => (/* binding */ Signal),
/* harmony export */   bound: () => (/* binding */ bound),
/* harmony export */   effect: () => (/* binding */ effect),
/* harmony export */   elementSignal: () => (/* binding */ elementSignal)
/* harmony export */ });
class Signal {
    constructor() {
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    update() {
        this.subscribers.forEach((s) => s());
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    }
}
function effect(func, observedSignals) {
    observedSignals.forEach((o) => o.subscribe(func));
}
function bound(func, observedSignals) {
    const signal = new Signal();
    const obj = func();
    observedSignals.forEach((observedSignal) => observedSignal.subscribe(() => {
        Object.assign(obj, func());
        signal.update();
    }));
    return [obj, signal];
}
function elementSignal(element) {
    const elementObs = new Signal();
    new ResizeObserver((_) => {
        elementObs.update();
    }).observe(element);
    return elementObs;
}


/***/ }),

/***/ "./src/spring.ts":
/*!***********************!*\
  !*** ./src/spring.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Spring: () => (/* binding */ Spring),
/* harmony export */   animateSpring: () => (/* binding */ animateSpring)
/* harmony export */ });
class Spring {
    // mx'' - bx' = kx
    constructor(initialValue) {
        this.velocity = 0;
        this.damping = 0;
        this.stiffness = 0;
        this.isAnimating = false;
        this.position = initialValue;
        this.target = initialValue;
    }
    tick(dt) {
        const acceleration = this.stiffness * (this.target - this.position) - this.damping * this.velocity;
        this.velocity += acceleration * dt;
        this.position += this.velocity * dt;
    }
    setStiffnessCritical(stiffness) {
        this.stiffness = stiffness;
        this.damping = Math.sqrt(4 * stiffness);
    }
}
const DEFAULT_ANIMATION_TOLERANCE = 0.01;
function animateSpring(spring, signal) {
    if (spring.isAnimating)
        return;
    spring.isAnimating = true;
    function tickSpring() {
        spring.tick(1 / 60);
        signal.update();
        if (Math.abs(spring.target - spring.position) < DEFAULT_ANIMATION_TOLERANCE && Math.abs(spring.velocity) < DEFAULT_ANIMATION_TOLERANCE) {
            spring.position = spring.target;
            spring.velocity = 0;
            spring.isAnimating = false;
            return;
        }
        requestAnimationFrame(tickSpring);
    }
    tickSpring();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared */ "./src/shared.ts");







})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTLGVBQWUsS0FBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNFN0IsU0FBUyxpQkFBaUI7SUFDN0Isd0RBQXdEO0FBQzVELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNId007QUFFek0sTUFBTSxpQ0FBaUMsR0FBRyxJQUFJLENBQUM7QUFTL0MsU0FBUyxvQkFBb0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBbUI7SUFDNUUsd0RBQWUsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsYUFBYSxFQUFFLEdBQUc7UUFDbEIsVUFBVSxFQUFFLEdBQUc7UUFDZixLQUFLLEVBQUUsU0FBUztRQUNoQixhQUFhLEVBQUUsS0FBSztRQUNwQixVQUFVLEVBQUUsaUNBQWlDO1FBQzdDLGVBQWUsRUFBRSxJQUFJO0tBQ3hCLENBQUMsQ0FBQztJQUVILHdEQUFlLENBQUMsS0FBSyxFQUFFO1FBQ25CLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLFVBQVUsRUFBRSxHQUFHO1FBQ2YsS0FBSyxFQUFFLFNBQVM7UUFDaEIsYUFBYSxFQUFFLEtBQUs7UUFDcEIsVUFBVSxFQUFFLGlDQUFpQztRQUM3QyxlQUFlLEVBQUUsSUFBSTtLQUN4QixDQUFDLENBQUM7SUFFSCx3REFBZSxDQUFDLFFBQVEsRUFBRTtRQUN0QixhQUFhLEVBQUUsR0FBRztRQUNsQixVQUFVLEVBQUUsR0FBRztRQUNmLEtBQUssRUFBRSwyQ0FBTTtRQUNiLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFVBQVUsRUFBRSxpQ0FBaUM7UUFDN0MsZUFBZSxFQUFFLElBQUk7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxZQUFZLEdBQUcsd0RBQWUsRUFBRSxDQUFDO0lBQ3ZDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLDJDQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFtQjtJQUM1RSxNQUFNLENBQUMsR0FBRyx3REFBZSxFQUFFLENBQUM7SUFFNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDcEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFFdkMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxHQUFHLDBEQUFpQixDQUFDO1FBQzdDLEtBQUs7UUFDTCxJQUFJLEdBQUcsQ0FBQztRQUNSLEtBQUs7UUFDTCxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsS0FBSztRQUNMLElBQUksR0FBRyxDQUFDO1FBQ1IsUUFBUTtLQUNYLENBQUMsQ0FBQztJQUVILEtBQUssTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxpQkFBaUIsRUFBRTtRQUNqRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRywyQ0FBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDN0M7QUFDTCxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxXQUFtQixFQUFFLFNBQWlCLEVBQUUsU0FBaUI7SUFDakYsTUFBTSxLQUFLLEdBQUcsdURBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxNQUFNLEtBQUssR0FBRyxzREFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLHNEQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsTUFBTSxRQUFRLEdBQUcsc0RBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU1QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDN0MsQ0FBQztBQUVNLFNBQVMsbUJBQW1CO0lBQy9CLE1BQU0sV0FBVyxHQUFHLHVEQUFjLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUVsRSxNQUFNLEtBQUssR0FBRztRQUNWLGtCQUFrQixDQUFDLHVCQUF1QixFQUFFLCtCQUErQixFQUFFLGdHQUFnRyxDQUFDO1FBQzlLLGtCQUFrQixDQUFDLDZCQUE2QixFQUFFLHdCQUF3QixFQUFFLHNHQUFzRyxDQUFDO1FBQ25MLGtCQUFrQixDQUFDLHlCQUF5QixFQUFFLHNCQUFzQixFQUFFLHdFQUF3RSxDQUFDO1FBQy9JLGtCQUFrQixDQUFDLHVCQUF1QixFQUFFLE9BQU8sRUFBRSw2RkFBNkYsQ0FBQztRQUNuSixrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxpQ0FBaUMsQ0FBQztRQUMvRyxrQkFBa0IsQ0FBQywyQkFBMkIsRUFBRSwyQkFBMkIsRUFBRSx3SEFBd0gsQ0FBQztRQUN0TSxrQkFBa0IsQ0FBQyxtQ0FBbUMsRUFBRSxtQkFBbUIsRUFBRSxpR0FBaUcsQ0FBQztRQUMvSyxrQkFBa0IsQ0FBQyw2QkFBNkIsRUFBRSxzQkFBc0IsRUFBRSxzREFBc0QsQ0FBQztRQUNqSSxrQkFBa0IsQ0FBQyw4QkFBOEIsRUFBRSxjQUFjLEVBQUUsNEVBQTRFLENBQUM7UUFDaEosa0JBQWtCLENBQUMsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUUsK0RBQStELENBQUM7S0FDN0ksQ0FBQztJQUVGLDZEQUFvQixDQUFDLEdBQUcsRUFBRTtRQUN0QixNQUFNLENBQUMsR0FBRyx3REFBZSxFQUFFLENBQUM7UUFFNUIsMERBQWlCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSztZQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELHFEQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFBRSxxREFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRXJHLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSztZQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJELHFEQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDekdpUDtBQUVsUCxNQUFNLHNCQUFzQixHQUFHO0lBQzNCLGFBQWEsRUFBRSxHQUFHO0lBQ2xCLFVBQVUsRUFBRSxHQUFHO0lBQ2YsS0FBSyxFQUFFLFNBQVM7SUFDaEIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsVUFBVSxFQUFFLHdFQUFtQztJQUMvQyxlQUFlLEVBQUUsSUFBSTtDQUN4QixDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBRztJQUMzQixhQUFhLEVBQUUsR0FBRztJQUNsQixVQUFVLEVBQUUsR0FBRztJQUNmLEtBQUssRUFBRSxTQUFTO0lBQ2hCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFVBQVUsRUFBRSx3RUFBbUM7SUFDL0MsZUFBZSxFQUFFLElBQUk7Q0FDeEIsQ0FBQztBQUVLLFNBQVMsWUFBWTtJQUN4QixNQUFNLElBQUksR0FBRyx1REFBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sT0FBTyxHQUFHLHVEQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNuRCxNQUFNLFNBQVMsR0FBRyx1REFBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEQsTUFBTSxXQUFXLEdBQUcsdURBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzVELE1BQU0sU0FBUyxHQUFHLDREQUFtQixDQUNqQyxnQ0FBZ0MsRUFDaEMsMFJBQTBSLEVBQzFSLHdUQUF3VCxDQUMzVCxDQUFDO0lBQ0YsTUFBTSxjQUFjLEdBQUcsdURBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sU0FBUyxHQUFHLDREQUFtQixDQUNqQyx3REFBd0QsRUFDeEQscVpBQXFaLEVBQ3JaLGtRQUFrUSxDQUNyUSxDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUcsdURBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sU0FBUyxHQUFHLDREQUFtQixDQUNqQyxrQ0FBa0MsRUFDbEMsdVlBQXVZLEVBQ3ZZLGtSQUFrUixDQUNyUixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXBELDZEQUFvQixDQUFDLEdBQUcsRUFBRTtRQUN0QiwwREFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsMERBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLDBEQUFpQixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQywwREFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsMERBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLDBEQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5QixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVM7WUFBRSw4REFBcUIsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVsSCxNQUFNLENBQUMsR0FBRyx3REFBZSxFQUFFLENBQUM7UUFFNUIsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFDN0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsR0FBRywwREFBaUIsQ0FBQztZQUM3QyxJQUFJO1lBQ0osZ0JBQWdCLEdBQUcsQ0FBQztZQUNwQixPQUFPO1lBQ1AsY0FBYyxHQUFHLENBQUM7WUFDbEIsU0FBUztZQUNULGNBQWMsR0FBRyxDQUFDO1lBQ2xCLFdBQVc7WUFDWCxxQkFBcUIsR0FBRyxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxLQUFLO1lBQ2YscUJBQXFCLEdBQUcsQ0FBQztZQUN6QixjQUFjO1lBQ2QscUJBQXFCLEdBQUcsQ0FBQztZQUN6QixTQUFTLENBQUMsS0FBSztZQUNmLHFCQUFxQixHQUFHLENBQUM7WUFDekIsT0FBTztZQUNQLHFCQUFxQixHQUFHLENBQUM7WUFDekIsU0FBUyxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLGlCQUFpQixFQUFFO1lBQ2pELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLDJDQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFFRCxLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVM7WUFBRSw4REFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTFFLHFEQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekYwQztBQUNPO0FBbUIvQjtBQW1CbkIsTUFBTSxZQUFZLEdBQWtCO0lBQ2hDO1FBQ0ksSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUU7WUFDVCwrZEFBK2Q7WUFDL2QsOENBQThDO1NBQ2pEO0tBQ0o7SUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLFdBQVcsRUFBRTtZQUNULDhhQUE4YTtZQUM5YSxrREFBa0Q7U0FDckQ7S0FDSjtJQUNEO1FBQ0ksSUFBSSxFQUFFLE1BQU07UUFDWixXQUFXLEVBQUU7WUFDVCxzSkFBc0o7WUFDdEosZ1VBQWdVO1lBQ2hVLDRCQUE0QjtTQUMvQjtLQUNKO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsY0FBYztRQUNwQixXQUFXLEVBQUU7WUFDVCwyWkFBMlo7WUFDM1osbUNBQW1DO1NBQ3RDO0tBQ0o7SUFDRDtRQUNJLElBQUksRUFBRSxLQUFLO1FBQ1gsV0FBVyxFQUFFO1lBQ1QsK2ZBQStmO1lBQy9mLDhCQUE4QjtTQUNqQztLQUNKO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsS0FBSztRQUNYLFdBQVcsRUFBRTtZQUNULDBlQUEwZTtZQUMxZSxrQ0FBa0M7U0FDckM7S0FDSjtJQUNEO1FBQ0ksSUFBSSxFQUFFLFdBQVc7UUFDakIsV0FBVyxFQUFFO1lBQ1QsMGhCQUEwaEI7WUFDMWhCLHlDQUF5QztTQUM1QztLQUNKO0NBQ0osQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsWUFBMkI7SUFDbEQsS0FBSyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxZQUFZLEVBQUU7UUFDdkQsOERBQXFCLENBQ2pCLFVBQVUsRUFDVjtZQUNJLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsVUFBVSxFQUFFLENBQUM7WUFDYixlQUFlLEVBQUUsSUFBSTtTQUN4QixFQUNEO1lBQ0ksYUFBYSxFQUFFLEdBQUc7WUFDbEIsVUFBVSxFQUFFLEdBQUc7WUFDZixLQUFLLEVBQUUsU0FBUztZQUNoQixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsQ0FBQztZQUNiLGVBQWUsRUFBRSxJQUFJO1NBQ3hCLENBQ0osQ0FBQztRQUNGLDBEQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QiwwREFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDaEM7QUFDTCxDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxZQUEyQjtJQUNyRCxLQUFLLE1BQU0sV0FBVyxJQUFJLFlBQVksRUFBRTtRQUNwQyxNQUFNLFVBQVUsR0FBRyw0REFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25HLE1BQU0sTUFBTSxHQUFHLHVEQUFjLENBQUMsUUFBUSxvREFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsTUFBTSxNQUFNLEdBQUcsdURBQWMsQ0FBQyxRQUFRLG9EQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3RSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3JEO0FBQ0wsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsWUFBMkI7SUFDbkQsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLE1BQU0sQ0FBQyxHQUFHLHdEQUFlLEVBQUUsQ0FBQztJQUU1QixLQUFLLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLFlBQVksRUFBRTtRQUN2RCxLQUFLLENBQUMsSUFBSTtRQUNOLEVBQUU7UUFDRixVQUFVLENBQUMsS0FBSyxFQUNoQixHQUFHLEdBQUcsQ0FBQyxFQUNQLE1BQU0sRUFDTixJQUFJLEdBQUcsQ0FBQyxFQUNSLE1BQU0sRUFDTixJQUFJLEdBQUcsQ0FBQyxDQUNYLENBQUM7S0FDTDtJQUVELE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsR0FBRywwREFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4RCxLQUFLLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksaUJBQWlCLEVBQUU7UUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsMkNBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNuQztBQUNMLENBQUM7QUFFTSxTQUFTLFlBQVk7SUFDeEIsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sWUFBWSxHQUFrQixFQUFFLENBQUM7SUFFdkMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxVQUE0QixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRyxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQTRCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFFOUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUN2QyxVQUFVLENBQUMsR0FBRyxHQUFHLFFBQVEsb0RBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNqRSx5Q0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixxREFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMseUNBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUUxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDJDQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSwyQ0FBTSxFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDckIsc0RBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRUYsVUFBVSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7WUFDM0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbEIsc0RBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRUYsK0NBQU0sQ0FBQyxHQUFHLEVBQUU7WUFDUixNQUFNLENBQUMsR0FBRyxpREFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0UsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsMkNBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsNENBQU8sQ0FBQyxDQUFDLENBQUM7UUFDekIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRW5CLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFO2dCQUM5QixNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxRQUFRLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO29CQUMxQixNQUFNLENBQUMsTUFBTSxHQUFHLGlEQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzRyxzREFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFO29CQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsc0RBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQztnQkFDRixzREFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNwQztZQUVELG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLDRDQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7WUFFdEMsa0RBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUN4QyxzREFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gscURBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRTFELFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7S0FDckQ7SUFFRCw2REFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFFcEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU1RSxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUNuQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsMkNBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsMkNBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDSCxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRywyQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRywyQ0FBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDekY7WUFDRCxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRywyQ0FBRSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWxELGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxHQUFHLHdEQUFlLEVBQUUsQ0FBQztZQUM1QixLQUFLLE1BQU0sV0FBVyxJQUFJLFlBQVk7Z0JBQUUsOERBQXFCLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVqQyxJQUFJLFlBQVksQ0FBQyxNQUFNO2dCQUFFLHFEQUFZLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkY7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFBnRDtBQUNDO0FBQ0k7QUFDSTtBQUNkO0FBQ0E7QUFFckMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUMzQixNQUFNLE9BQU8sR0FBRyxzREFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXBDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUV6QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4QyxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFcEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFOUUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2QixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFbEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEYsTUFBTSxtQ0FBbUMsR0FBRyxJQUFJLENBQUM7QUFFakQsSUFBSSxnQkFBZ0IsR0FBbUIsRUFBRSxDQUFDO0FBWTFDLFNBQVMsQ0FBQyxDQUFDLEVBQVU7SUFDeEIsT0FBTyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBRSxDQUFDO0FBQ3hDLENBQUM7QUFFTSxTQUFTLEVBQUUsQ0FBQyxNQUFjO0lBQzdCLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQztBQUN6QixDQUFDO0FBRU0sU0FBUyxtQkFBbUIsQ0FBQyxPQUF5QjtJQUN6RCxvQ0FBb0M7SUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BHLENBQUM7QUFFTSxTQUFTLGlCQUFpQixDQUFDLEtBQXVCLEVBQUUsS0FBYTtJQUNwRSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUMvQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLE1BQWtCO0lBQzlELElBQUksT0FBTyxZQUFZLGdCQUFnQjtRQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNyRixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVNLFNBQVMsY0FBYyxDQUFDLEdBQVc7SUFDdEMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDeEMsV0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdEIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtRQUMvQixlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRU0sU0FBUyxRQUFRLENBQUMsQ0FBUyxFQUFFLE1BQWMsRUFBRSxLQUFhLEVBQUUsTUFBYyxFQUFFLEtBQWE7SUFDNUYsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3pFLENBQUM7QUFFTSxTQUFTLGVBQWU7SUFDM0IsdUNBQXVDO0lBQ3ZDLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLGlEQUFpRDtBQUMzRyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBb0IsRUFBRSxDQUFhO0lBQ3BELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUVqQyxPQUFPLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNuQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsS0FBSyxNQUFNLENBQUMsSUFBSSxnQkFBZ0I7WUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFdEIsS0FBSyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQzdCO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBRWhDLENBQUMsRUFBRSxDQUFDO1FBRUosTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFlBQVksRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTSxTQUFTLGNBQWMsQ0FBQyxJQUFpQixFQUFFLENBQVM7SUFDdkQsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVNLFNBQVMsWUFBWSxDQUFDLFdBQXdCLEVBQUUsWUFBeUIsRUFBRSxHQUFXO0lBQ3pGLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDekYsQ0FBQztBQVlNLFNBQVMsYUFBYSxDQUFDLElBQVk7SUFDdEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUM1QixnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO1FBQzlCLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRXJFLE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFFTSxTQUFTLGVBQWUsQ0FBQyxVQUF1QixFQUFFLENBQW9CO0lBQ3pFLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUN4QyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDaEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJELE1BQU0sWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLFFBQTBDO0lBQ3BFLE9BQU8sQ0FBQyxhQUF1QyxFQUFnQyxFQUFFO1FBQzdFLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRTtZQUN0QyxJQUFJLFlBQVksWUFBWSxXQUFXLEVBQUU7Z0JBQ3JDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQ3hFLFlBQVksSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsWUFBWSxJQUFJLFlBQVksQ0FBQzthQUNoQztTQUNKO1FBQ0QsT0FBTyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFTSxNQUFNLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEYsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBT2pGLFNBQVMsbUJBQW1CLENBQUMsU0FBaUIsRUFBRSxHQUFHLFVBQW9CO0lBQzFFLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQU9NLFNBQVMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQixFQUFFLHNCQUF5QyxFQUFFLHNCQUF5QztJQUMzSixlQUFlLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNO1FBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9FLENBQUM7QUFFRCxJQUFJLG9CQUFvQixHQUFvQixFQUFFLENBQUM7QUFDL0MsSUFBSSxtQkFBbUIsR0FBbUIsRUFBRSxDQUFDO0FBRXRDLFNBQWUsb0JBQW9CLENBQUMsWUFBd0I7O1FBQy9ELE1BQU0sd0JBQXdCLEdBQUcsR0FBUyxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssTUFBTSxrQkFBa0IsSUFBSSxtQkFBbUI7Z0JBQUUsa0JBQWtCLEVBQUUsQ0FBQztZQUMzRSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7WUFDMUIsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLFlBQVksRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBQztRQUNGLCtDQUFNLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUUzRSx3QkFBd0IsRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FBQTtBQUVNLFNBQVMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFvQixFQUFFLGVBQXVCLEVBQUUsZ0JBQXdCO0lBQ3hILE1BQU0sS0FBSyxHQUE2QixFQUFFLENBQUM7SUFFM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFbkMsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztLQUN2QztJQUNELEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHVDQUF1QztJQUVwRCxNQUFNLFlBQVksR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxELEtBQUssTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxpQkFBaUIsRUFBRTtRQUNqRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0tBQzdDO0lBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDdkM7QUFDTCxDQUFDO0FBRU0sU0FBUyxXQUFXLENBQUMsQ0FBUztJQUNqQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxhQUFhO0FBRWIsK0NBQU0sQ0FBQyxHQUFHLEVBQUU7SUFDUixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVuQyxTQUFTLFlBQVksQ0FBQyxPQUFvQixFQUFFLEtBQWE7UUFDckQsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUVkLCtDQUFNLENBQUMsR0FBRyxFQUFFO0lBQ1IsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRWQsTUFBTSxZQUFZLEdBQUcsZUFBZSxFQUFFLENBQUM7SUFDdkMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25ELFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUIsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRWQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsU0FBUyxZQUFZO0lBQ2pCLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFTSxTQUFTLFNBQVMsQ0FBQyxDQUFTO0lBQy9CLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDWCxZQUFZLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBRVgsU0FBUyxZQUFZLENBQUMsT0FBb0I7SUFDN0MsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN4RixDQUFDO0FBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ25CLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDOUIsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsSUFBSSxNQUFNLEdBQUcsU0FBUztRQUFFLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDM0MsWUFBWSxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBRUYsV0FBVyxDQUFDLElBQUksRUFBRSxxREFBWSxDQUFDLENBQUM7QUFFaEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxxREFBWSxDQUFDLENBQUM7QUFDbkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxxREFBWSxDQUFDLENBQUM7QUFDbkMsV0FBVyxDQUFDLGNBQWMsRUFBRSxtRUFBbUIsQ0FBQyxDQUFDO0FBQ2pELFdBQVcsQ0FBQyxZQUFZLEVBQUUsK0RBQWlCLENBQUMsQ0FBQztBQUM3QyxXQUFXLENBQUMsVUFBVSxFQUFFLDJEQUFlLENBQUMsQ0FBQztBQUV6QyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlTM0IsTUFBTSxNQUFNO0lBQW5CO1FBQ0ksZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO0lBYXJDLENBQUM7SUFYRyxTQUFTLENBQUMsVUFBc0I7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsV0FBVyxDQUFDLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0o7QUFFTSxTQUFTLE1BQU0sQ0FBQyxJQUFnQixFQUFFLGVBQXlCO0lBQzlELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRU0sU0FBUyxLQUFLLENBQUksSUFBYSxFQUFFLGVBQXlCO0lBQzdELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7SUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbkIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQ3ZDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFTSxTQUFTLGFBQWEsQ0FBQyxPQUFnQjtJQUMxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQixPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDcENNLE1BQU0sTUFBTTtJQVFmLGtCQUFrQjtJQUVsQixZQUFZLFlBQW9CO1FBUGhDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBVTtRQUNYLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkcsSUFBSSxDQUFDLFFBQVEsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELG9CQUFvQixDQUFDLFNBQWlCO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBRUQsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUM7QUFFbEMsU0FBUyxhQUFhLENBQUMsTUFBYyxFQUFFLE1BQWM7SUFDeEQsSUFBSSxNQUFNLENBQUMsV0FBVztRQUFFLE9BQU87SUFFL0IsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFFMUIsU0FBUyxVQUFVO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWhCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRywyQkFBMkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRywyQkFBMkIsRUFBRTtZQUNwSSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0IsT0FBTztTQUNWO1FBRUQscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFVBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7VUNuREQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnNCO0FBQ0E7QUFDTztBQUNGO0FBQ0Y7QUFFUCIsInNvdXJjZXMiOlsid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvZXZvbHV0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2luc3BpcmF0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvd29yay50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaGFyZWQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2lnbmFsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NwcmluZy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkNvbm5lY3QoKSB7fVxuIiwiaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkV2b2x1dGlvbigpIHtcbiAgICAvLyBjb25zdCBicmFuZEJ1aWx0ID0gYWRkU2Nyb2xsSW1hZ2UoXCJicmFuZC1idWlsdC5zdmdcIik7XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgYWxpZ25XaXRoR2FwLCBib2R5U2lnLCBjZW50ZXJJbWFnZVNjYWxlZCwgZ2V0U2Nyb2xsSGVpZ2h0LCBpZUJsdWUsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgc2V0TWF4U2Nyb2xsLCBzdHlsZVNjcm9sbFRleHQsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5jb25zdCBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gPSAwLjg1O1xuXG5pbnRlcmZhY2UgSW5zcGlyYXRpb25UaWxlIHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3I6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRNb3JlOiBIVE1MRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gc3R5bGVJbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBzdHlsZVNjcm9sbFRleHQobWFqb3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC42LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMzYsXG4gICAgICAgIHdpZHRoU2NhbGU6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTixcbiAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA5LFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuMyxcbiAgICAgICAgZm9udFdlaWdodDogMzUwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDI3LFxuICAgICAgICB3aWR0aFNjYWxlOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04sXG4gICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChyZWFkTW9yZSwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjUsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IGllQmx1ZSxcbiAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMyxcbiAgICAgICAgd2lkdGhTY2FsZTogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OLFxuICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKiAwLjU1KTtcbn1cblxuZnVuY3Rpb24gYWxpZ25JbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBtYWpvci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICBtaW5vci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICByZWFkTW9yZS5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB5QWxpZ25pbmdXaXRoR2FwcyhbXG4gICAgICAgIGltYWdlLCAvL1xuICAgICAgICAwLjAzICogcyxcbiAgICAgICAgbWFqb3IsXG4gICAgICAgIC0wLjAxICogcyxcbiAgICAgICAgbWlub3IsXG4gICAgICAgIDAuMDEgKiBzLFxuICAgICAgICByZWFkTW9yZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIHMgKiAwLjE1KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uVGlsZShpbWFnZVN0cmluZzogc3RyaW5nLCBtYWpvclRleHQ6IHN0cmluZywgbWlub3JUZXh0OiBzdHJpbmcpOiBJbnNwaXJhdGlvblRpbGUge1xuICAgIGNvbnN0IGltYWdlID0gYWRkU2Nyb2xsSW1hZ2UoaW1hZ2VTdHJpbmcpO1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9yID0gYWRkU2Nyb2xsVGV4dChtaW5vclRleHQpO1xuICAgIGNvbnN0IHJlYWRNb3JlID0gYWRkU2Nyb2xsVGV4dChcIlJlYWQgbW9yZVwiKTtcblxuICAgIHJldHVybiB7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkluc3BpcmF0aW9uKCkge1xuICAgIGNvbnN0IGluc3BpcmF0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJpbnNwaXJhdGlvbi9pbnNwaXJhdGlvbi5zdmdcIik7XG5cbiAgICBjb25zdCB0aWxlcyA9IFtcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24veXVtaWUuanBnXCIsIFwiVEhFIFNUQVJUIE9GIFNPTUVUSElORyBZVU0tSUVcIiwgXCJXZSBhbHdheXMgd2FudGVkIHRvIGRlc2lnbiBjaG9jb2xhdGUgYmFycyBhbmQgZmluYWxseSBkaWQgaXQuIEludHJvZHVjaW5nIG91ciBzd2VldCBuZXcgYnJhbmQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi93b3Jkcy1pZGVhcy5qcGdcIiwgXCJTSEFSRSBTT01FIERFU0lHTiBMT1ZFXCIsIFwiVGhlIGkuZS4gZGVzaWduIHByb21vIGpvdXJuYWxzIGVuY291cmFnZSBjbGllbnRzIHRvIHNrZXRjaCB0aGVpciBiaWcgaWRlYXMgYW5kIGNhcHR1cmUgdGhlaXIgZHJlYW1zLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vY29vay1pZS5qcGdcIiwgXCJHT1RUQSBMT1ZFIEEgQ09PSy1JRVwiLCBcIkhvdyBhIHNlY3JldCByZWNpcGUgd29ya3MgdG8gYnJpbmcgcmVsYXRpb25zaGlwcyB0byBhIHdob2xlIG5ldyBsZXZlbC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlbWl4LmpwZ1wiLCBcIlJFTUlYXCIsIFwiQSBiZWhpbmQtdGhlLXNjZW5lcyBsb29rIGF0IGhvdyB3ZSB0cmFuc2Zvcm1lZCBjbGFzc2ljIG1lbW9yeSBjYXJyaWVycyBpbnRvIG9iamVjdHMgb2YgYXJ0LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24va3JlbXBhLnBuZ1wiLCBcIlJFQlJBTkRJTkcgQSBGQU1JTFkgQlVTSU5FU1NcIiwgXCJBIHJlZnJlc2ggZm9yIGEgNTAteWVhciBsZWdhY3kuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mb3Rvc3RvcmkuanBnXCIsIFwiQlJBTkRJTkcgRlJPTSBUSEUgTkFNRSBVUFwiLCBcIldoZW4gYSBjbGllbnQgaGFkIGFuIGlkZWEgZm9yIGEgYnJhbmQgc3Bpbm9mZiwgd2UgdG9vayBoZXIgY29uY2VwdCB0byByZWFsaXR5IGFuZCBsYXVuY2hlZCB0aGUgYnVzaW5lc3MgaW4gaGlnaCBzdHlsZS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2luc3BpcmVkLTItY3JlYXRlLmpwZ1wiLCBcIklOU1BJUkVEIDIgQ1JFQVRFXCIsIFwiQSBwYWludGluZyBpbnNwaXJlZCBieSB0aGUgaS5lLiBkZXNpZ24gbG9nbyBjb21iaW5lcyBvaWwgcGFpbnRzLCBncm91bmQgdXAgY3JheW9ucywgYW5kIGEgbGVnby5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Zyb20taW5zaWRlLmpwZ1wiLCBcIlRIRSBWSUVXIEZST00gSU5TSURFXCIsIFwiaS5lLiBkZXNpZ24ncyBuZXcgc3R1ZGlvIHdhcyAzMCB5ZWFycyBpbiB0aGUgbWFraW5nLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVjb25uZWN0aW5nLmpwZ1wiLCBcIlJFQ09OTkVDVElOR1wiLCBcIkhvdyB1bmNlcnRhaW4gdGltZXMgbGVkIHRvIGEgaG9tZWNvbWluZyBmb3IgaS5lLiBkZXNpZ24ncyBzZW5pb3IgZGVzaWduZXIuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9uZXctc3R1ZGlvLmpwZ1wiLCBcIk5FVyBTVFVESU8uIE5FVyBWSUVXLlwiLCBcIkhvdyB0aGUgbmVlZCBmb3IgaW5zcGlyYXRpb24gZnVlbGVkIHRoZSBidWlsZGluZyBvZiBhIHN0dWRpby5cIiksXG4gICAgXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGluc3BpcmF0aW9uLCAwLjc1KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHN0eWxlSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGFsaWduV2l0aEdhcChpbnNwaXJhdGlvbiwgdGlsZXNbMF0uaW1hZ2UsIHMgKiAwLjI1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggLSAxOyBpKyspIGFsaWduV2l0aEdhcCh0aWxlc1tpXS5pbWFnZSwgdGlsZXNbaSArIDFdLmltYWdlLCBzICogMC4xKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIGFsaWduSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIHNldE1heFNjcm9sbCh0aWxlc1t0aWxlcy5sZW5ndGggLSAxXS5pbWFnZSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBhZGRTY3JvbGxUZXh0U3F1YXJlLCBnZXRTY3JvbGxIZWlnaHQsIHB4LCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiwgeEFsaWduaW5nV2l0aEdhcHMsIGNlbnRlckltYWdlU2NhbGVkLCBhZGRTY3JvbGxJbWFnZSwgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCBzZXRNYXhTY3JvbGwgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XHJcblxyXG5jb25zdCBtYWpvclNjcm9sbFRleHREZXRhaWxzID0ge1xyXG4gICAgbGV0dGVyU3BhY2luZzogMi4yLFxyXG4gICAgZm9udFdlaWdodDogNDAwLFxyXG4gICAgY29sb3I6IFwiI0IzQjNCM1wiLFxyXG4gICAgZm9udFNpemVTY2FsZTogMC4wNjUsXHJcbiAgICB3aWR0aFNjYWxlOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTixcclxuICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcclxufTtcclxuXHJcbmNvbnN0IG1pbm9yU2Nyb2xsVGV4dERldGFpbHMgPSB7XHJcbiAgICBsZXR0ZXJTcGFjaW5nOiAwLjIsXHJcbiAgICBmb250V2VpZ2h0OiAzMDAsXHJcbiAgICBjb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICBmb250U2l6ZVNjYWxlOiAwLjAzLFxyXG4gICAgd2lkdGhTY2FsZTogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04sXHJcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZWaWV3KCkge1xyXG4gICAgY29uc3QgaG9tZSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob21lLnN2Z1wiKTtcclxuICAgIGNvbnN0IGhvcml6b24gPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9yaXpvbi5qcGdcIik7XHJcbiAgICBjb25zdCBmcmVzaExvb2sgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZnJlc2gtbG9vay5zdmdcIik7XHJcbiAgICBjb25zdCBncmVhdEJyYW5kcyA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ncmVhdC1icmFuZHMuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUxID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIkdSRUFUIEJSQU5EUyBET04nVCBKVVNUIEhBUFBFTlwiLFxyXG4gICAgICAgIFwiVGhleSByZXF1aXJlIGV4cGxvcmF0aW9uLCBpbnNpZ2h0LCBhbmQgdGVuYWNpdHkuIFdlIGh1bnQgZm9yIHRoYXQgbWFnaWMgc3BhcmsgdGhhdCBpZ25pdGVzIGlubm92YXRpb24uIFdlIGJyaW5nIG91ciBleHRlbnNpdmUgc2tpbGxzIGFuZCBleHBlcmllbmNlIHRvIGVhY2ggcHJvamVjdCBhbmQgZ2l2ZSBpdCBvdXIgYWxsLiBUaGUgcmVzdWx0IGlzIGNsZWFyLCB5ZXQgZWxldmF0ZWQgY29tbXVuaWNhdGlvbiB0aGF0IG1ha2VzIHBlb3BsZSBzdG9wLCB0aGluaywgYW5kIG9mdGVuIHNtaWxlLlwiLFxyXG4gICAgICAgIFwiT3VyIHN0dWRpbyBsb2NhdGlvbiBpcyBwcm9mb3VuZGx5IGluc3BpcmluZy4gVGhlIG1hZ25pZmljZW50IHZpZXcgZmVlZHMgb3VyIHNvdWxzIGFuZCBrZWVwcyB1cyBpbnNwaXJlZCB0byBkbyBvdXIgYmVzdCB3b3JrLiBJdCdzIGEgcGxhY2Ugd2hlcmUgY3JlYXRpdmUgcGVvcGxlIGNvbWUgdG9nZXRoZXIgdG8gY29sbGFib3JhdGUgYW5kIGRyaWxsIGRvd24gdG8gdGhlIGhlYXJ0IG9mIHRoZSBtYXR0ZXIuIFRvIHNvbHZlIHByb2JsZW1zIGFuZCBicmluZyBpZGVhcyB0byBsaWZlLiBUbyBjcmVhdGUgdGhpbmdzIHdvcnRoIHJlbWVtYmVyaW5nLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW5zaWdodENsYXJpdHkgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaW5zaWdodC1jbGFyaXR5LmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMiA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBCUklORyBWSVNJT04sIElOU0lHSFQsIEFORCBDTEFSSVRZIFRPIEVWRVJZIFBST0pFQ1RcIixcclxuICAgICAgICBcIlN1Y2Nlc3NmdWwgZGVzaWduIHN0YXJ0cyB3aXRoIGlkZW50aWZ5aW5nIGEgY2xpZW50J3MgbmVlZHMsIGdvYWxzLCBhbmQgYXNwaXJhdGlvbnMuIE91ciBvYmplY3Rpdml0eSBzaGluZXMgbGlnaHQgb24gd2hhdCBvdGhlcnMgaGF2ZSBtaXNzZWQuIFdlIGhhdmUgdGhlIGFiaWxpdHkgdG8gc2VlIGFuZCBpbnRlcnByZXQgdGhlIGlubmVyIHdvcmtpbmdzLCBjdWx0dXJlLCBhbmQgbnVhbmNlcyBvZiBvdXIgY2xpZW50J3Mgd29ybGQuIFdlIGFzayBxdWVzdGlvbnMg4oCTIGxvdHMgb2YgcXVlc3Rpb25zLiBUaGVuIGxpc3RlbiB1bnRpbCB3ZSBnYWluIHRoZSBkZWVwIHVuZGVyc3RhbmRpbmcgbmVjZXNzYXJ5IHRvIGJ1aWxkIHRoZSBzb2xpZCBmb3VuZGF0aW9uIHRoYXQgYW55IGVuZHVyaW5nIGJyYW5kIG5lZWRzLlwiLFxyXG4gICAgICAgIFwiT3VyIHNtYWxsIGJ1dCBtaWdodHkgdGVhbSBicmluZ3MgdG9nZXRoZXIgYSB3aWRlIHJhbmdlIG9mIHRhbGVudHMgYW5kIHBlcnNwZWN0aXZlcywgcGx1cyBhIG5pY2UgbGlzdCBvZiBhd2FyZHMuIFdlIHRocm93IG91ciBoZWFydHMgaW50byBvdXIgd29yayBhbmQgYXJlIGtub3duIGZvciBvdXIgZmllcmNlIGNvbW1pdG1lbnQgdG8gdGhlIHRydXN0ZWQsIGxvbmctdGVybSBwYXJ0bmVyc2hpcHMgd2UgZm9ybS4gRm9yIHVzLCBpdCdzIHBlcnNvbmFsLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc2t5d2FyZCA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9za3l3YXJkLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMyA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBTRUUgV09SSyBJTiBBIERJRkZFUkVOVCBMSUdIVFwiLFxyXG4gICAgICAgIFwiUGVvcGxlIGxpa2UgdG8gYXNrIGFib3V0IG91ciBkZXNpZ24gcHJvY2Vzcy4gVGhlIHRydXRoIGlzIHRoYXQgdGhlIGFwcHJvYWNoIHRvIGVhY2ggcHJvamVjdCB2YXJpZXMsIGJlY2F1c2UgZWFjaCBjbGllbnQgYW5kIHRoZWlyIG5lZWRzIGFyZSB1bmlxdWUuIENyZWF0aXZlIGJyZWFrdGhyb3VnaHMgZG9uJ3QgZm9sbG93IHRoZSBjbG9jay4gVGhleSBjYW4gaGFwcGVuIGFueSB0aW1lIG9mIGRheSDigJMgb3IgbmlnaHQuIFdoZXRoZXIgYW4gZXBpcGhhbnkgaXMgaWxsdW1pbmF0ZWQgaW4gYSBzY3JpYmJsZSwgYSBkcmVhbSwgb3IgYXMgdGhlIGNsb3VkcyByb2xsIGJ5LCB3ZSBlbWJyYWNlIHRoZSBmYWN0IHRoYXQgZWFjaCBwcm9qZWN0IHRha2VzIG9uIGEgbGlmZSBvZiBpdHMgb3duLlwiLFxyXG4gICAgICAgIFwiV2hhdCdzIGNvbnN0YW50IGlzIG91ciBhYmlsaXR5IHRvIGxpc3RlbiBhbmQgZm9jdXMsIHRvIGFuYWx5emUgYW5kIGNvbm5lY3QgZG90cywgYW5kIHRvIHJlbWFpbiBjdXJpb3VzLiBUaGUgbW9zdCByZXdhcmRpbmcgcHJvamVjdHMgYXJlIHdpdGggY2xpZW50cyB3aG8gdmFsdWUgdGhlIGJhbGFuY2UgYmV0d2VlbiBwdXNoaW5nIGZvcndhcmQgYW5kIGFsbG93aW5nIHRpbWUgZm9yIHRoZSBwZXJmZWN0IHNvbHV0aW9uIHRvIGVtZXJnZS4gVGhhdCdzIG91ciBoYXBweSBwbGFjZS5cIlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0VGlsZXMgPSBbdGV4dFRpbGUxLCB0ZXh0VGlsZTIsIHRleHRUaWxlM107XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvcml6b24sIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlLCBtYWpvclNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG5cclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICBIT01FX0hPUklaT05fUEFEICogcyxcclxuICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcblxyXG4gICAgICAgIHNldE1heFNjcm9sbCh0ZXh0VGlsZTMubWFqb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgZWZmZWN0LCBTaWduYWwgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi4vc3ByaW5nXCI7XG5pbXBvcnQge1xuICAgIGFkZFNjcm9sbEltYWdlLFxuICAgIGFkZFNjcm9sbFRleHRTcXVhcmUsXG4gICAgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLFxuICAgIGJvZHksXG4gICAgYm9keVNpZyxcbiAgICBjZW50ZXJJbWFnZVNjYWxlZCxcbiAgICBnZXRTY3JvbGxIZWlnaHQsXG4gICAgbWFwUmFuZ2UsXG4gICAgb25OYXZPcHRpb25DbGljayxcbiAgICBweCxcbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCxcbiAgICBzZXRNYXhTY3JvbGwsXG4gICAgc2V0U2Nyb2xsLFxuICAgIHNwYWNlVG9GaWxlLFxuICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSxcbiAgICBUZXh0U3F1YXJlLFxuICAgIHhBbGlnbmluZ1dpdGhHYXBzLFxufSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmludGVyZmFjZSBXb3JrQ29udGVudCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIFdvcmtEaXNwbGF5IHtcbiAgICB0ZXh0U3F1YXJlOiBUZXh0U3F1YXJlO1xuICAgIGltYWdlMTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWFnZTI6IEhUTUxJbWFnZUVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBXb3JrSXRlbSB7XG4gICAgdGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBzcHJpbmc6IFNwcmluZztcbiAgICBzcHJpbmdTaWc6IFNpZ25hbDtcbn1cblxuY29uc3Qgd29ya0NvbnRlbnRzOiBXb3JrQ29udGVudFtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJiZXJ3eW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiSGF2aW5nIHNwZW50IGhpcyBlbnRpcmUgY2hpbGRob29kIG1ha2luZyBmaWxtcywgdGhpcyBjb21wYW55J3MgZm91bmRlciBuYW1lZCBoaXMgYWdlbmN5IGFmdGVyIHRoZSBzdHJlZXQgb24gd2hpY2ggaGUgd2FzIHJhaXNlZC4gV2l0aCBhIGhpc3RvcnkgbGlrZSB0aGF0LCB3ZSBoYWQgdG8gZWxldmF0ZSBCZXJ3eW4gdG8gbGFuZG1hcmsgc3RhdHVzLiBVc2luZyBjdXN0b20gcGhvdG9ncmFwaHkgYW5kIG1hc3RlciBtYW5pcHVsYXRpb24sIHdlIGNyZWF0ZWQgYSBmbGV4aWJsZSBzdGlja2VyIHN5c3RlbSB0aGF0IGlzIGludGVyY2hhbmdlYWJsZSB3aXRoIG11bHRpLWNvbG9yZWQgcGFwZXIgc3RvY2tzLiBFbXBsb3llZXMgYXJlIGVuY291cmFnZWQgdG8gZGVzaWduIHRoZWlyIG93biBjb21tdW5pY2F0aW9ucyBhbmQgZ2V0IGEgY29tcGxldGUgc2VyaWVzIG9mIGF3YXJkLXdpbm5pbmcgYnVzaW5lc3MgY2FyZHMgdG8gY2hvb3NlIGZyb20uXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBGaWxtLCBUZWxldmlzaW9uLCBWaWRlbyBQcm9kdWN0aW9uXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiazIga3J1cHBcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBhd2FyZC13aW5uaW5nLCBOZXcgWW9yayBDaXR5IHB1YmxpYyByZWxhdGlvbnMgYW5kIG1hcmtldGluZyBhZ2VuY3kgaGFzIGEgc3VjY2Vzc2Z1bCB0cmFjayByZWNvcmQgaW4gaWduaXRpbmcgYnJhbmRzIGZyb20gc3RhcnQtdXBzLCBuZXcgYXV0aG9ycywgYW5kIGNlbGVicml0aWVzIGJ5IGNvbm5lY3RpbmcgdGhlbSB3aXRoIGN1bHR1cmFsIHRyZW5kcyBhbmQgaW5mbHVlbmNlcnMuIFdoZW4gaXQgY2FtZSB0byByZXByZXNlbnRpbmcgdGhlaXIgYnJhbmQsIEsyIGNhbWUgdG8gdXMuIEJvbGQsIHZpYnJhbnQsIGFuZCBkeW5hbWljLCB0aGlzIHRpbWVsZXNzIGlkZW50aXR5IHN5c3RlbSByZWZsZWN0cyB0aGUgZm91bmRlcidzIGZhdm9yaXRlIGNvbG9yIGFuZCB0aGUgY29tcGFueSdzIGVuZXJnZXRpYyBjdWx0dXJlIGFuZCBlbnZpcm9ubWVudC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFB1YmxpYyBSZWxhdGlvbnMgJiBNYXJrZXRpbmcgZm9yIE1lZGlhXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2h5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBZnRlciBzdWNjZXNzZnVsbHkgYnJhbmRpbmcgdGhlaXIgZmlyc3QgZWF0ZXJ5LCB0aGlzIGNsaWVudCByZXR1cm5lZCB0byB1cyB0byByZWFsaXplIHRoZWlyIGRyZWFtIG9mIGFuIHVwc2NhbGUsIFVwcGVyIFdlc3QgU2lkZSBlYXRpbmcgZGVzdGluYXRpb24uXCIsXG4gICAgICAgICAgICBcIlRoZSBjdXN0b20gbGV0dGVyZm9ybSBpcyBhIHdoaW1zaWNhbCBwbGF5IG9uIHRoZWlyIHVuaXF1ZSBzcGVsbGluZyBhbmQgY2FuIHJlYWQgdXBzaWRlIGRvd24uIFRoZSB2aWJyYW50IGNvbG9yIHBhbGV0dGUgd2FzIGRldmVsb3BlZCBpbiBwYXJ0bmVyc2hpcCB3aXRoIHRoZSBpbnRlcmlvciBhcmNoaXRlY3R1cmUgdGVhbSB0byBjcmVhdGUgYSB3YXJtIGFuZCBleGNpdGluZyBhdG1vc3BoZXJlLiBUaGUgY3VzdG9tIGRpZS1jdXQgZWRnZSBvZiB0aGUgaWRlbnRpdHkgc3lzdGVtIG1pbWljcyB0aGUgY3VydmUgb2YgdGhlIHVuaXF1ZSwgc2hvd2Nhc2UgYmFyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUmVzdGF1cmFudCAmIEJhclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImFubiBzdWxsaXZhblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBbm4gZHJlYW1lZCBvZiBiZWluZyDigJx0aGUgT3ByYWjigJ0gb2Ygb3JnYW5pemluZy4gV2UgZXN0YWJsaXNoZWQgaGVyIG5hbWUgYXMgdGhlIGJyYW5kIGFuZCBjcmVhdGVkIGEgdGFnbGluZSwgd2hpY2ggcmVmbGVjdGVkIHRoZSBwZWFjZSBvZiBtaW5kIHRoYXQgaGVyIGNsaWVudHMgZ2V0IGZyb20gaGF2aW5nIGFuZCBtYWludGFpbmluZyBhbiBvcmdhbml6ZWQgbGlmZS4gVGhlIHNpbXBsZSBpY29uIHNlcmllcyByZXByZXNlbnRzIGVhY2ggYXJlYSBvZiBleHBlcnRpc2UuIEFzIHRoZSBjb21wYW55J3Mgc2VydmljZXMgaGF2ZSBleHBhbmRlZCBvdmVyIHRoZSB5ZWFycywgdGhlIGlkZW50aXR5IHN5c3RlbSBoYXMgZXZvbHZlZCBhbG9uZyB3aXRoIGl0IGFuZCByZW1haW5zIGFzIGZyZXNoIGFzIGl0IHdhcyBkYXkgb25lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHJvZmVzc2lvbmFsIE9yZ2FuaXppbmdcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJsb2FcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBwcm9mZXNzaW9uYWwgbWFrZS11cCBhcnRpc3QgdGVhbSBjYW1lIHRvIHVzIHRvIGJyYW5kIHRoZWlyIHBhdGVudGVkIOKAnHdhdGVyc2xpZGXigJ0gZXllIHBlbmNpbC4gQ29sb3IgbmFtZXMgbGlrZSDigJxHaXZpbmcgQmFjayBCbGFjayzigJ0gcmVmbGVjdCB0aGUgY29tcGFueSdzIGNvbW1pdG1lbnQgdG8gcHJvdmlkaW5nIG1ha2VvdmVycyBmb3Igd29tZW4gZmFjaW5nIGhlYWx0aCBjaGFsbGVuZ2VzLiBUaGUgcGxheWZ1bCBwYWNrYWdpbmcgZWxldmF0ZXMgYSBzdGFwbGUgcHJvZHVjdCB0byBnaWZ0IHdvcnRoeSBhbmQgZ2VuZXJhdGVzIGF0dGVudGlvbiBpbiBhIHNhdHVyYXRlZCBtYXJrZXQgYnkgZmx5aW5nIGFib3ZlIGl0cyBkaXNwbGF5IGNhc2UuIFRoZSBtb3RpZiBob2xkcyBzcGVjaWFsIG1lYW5pbmcgZm9yIHRoZSBmb3VuZGVyIHdobyBzaGFyZWQgd2l0aCB1cyB0aGF0IHRoZSBidXR0ZXJmbHkgaXMgYSBzaWduIHRoYXQgaGVyIGJlbG92ZWQgbW90aGVyIGlzIHN0aWxsIHdpdGggaGVyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogQmVhdXR5ICYgQ29zbWV0aWNzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2V0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgTWFzdGVyIEFyY2hpdGVjdCBhbmQgd29ybGQtcmVub3duZWQgc3BhIGRlc2lnbmVyIHVzZWQgaGlzIHJlcHV0YXRpb24gYW5kIGV4cGVydGlzZSBpbiBoeWRyb3RoZXJhcHkgdG8gbGF1bmNoIGFuIGV4Y2x1c2l2ZSBwcm9kdWN0IGxpbmUgZm9yIGx1eHVyeSBob3RlbHMgYW5kIHJlc29ydHMuIEEgc29vdGhpbmcsIG11dGVkIGNvbG9yIHBhbGV0dGUgd2FzIGRlc2lnbmVkIHRvIHJlZmxlY3QgdGhlIHNjZW50IHByb2ZpbGUgb2YgZWFjaCBzZXJpZXMgb2Ygc2NydWJzIGFuZCBsb3Rpb25zLiBBdXRoZW50aWMgd2F0ZXIgc3BsYXNoIHBob3RvZ3JhcGh5IHNldCB0aGUgdG9uZSB0byBwcm9tb3RlIHRoZSBoZWFsdGggYmVuZWZpdHMgYW5kIGFydCBvZiBiYXRoaW5nLiBUaGUgcGFja2FnZSBkZXNpZ24gZXhwYW5kZWQgdG8gZ2lmdCBhbmQgdHJhdmVsIHNldHMgdGhhdCBpbnZpdGUgZ3Vlc3RzIHRvIHRha2UgdGhlIGx1eHVyeSBleHBlcmllbmNlIGhvbWUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBIZWFsdGggJiBXZWxsbmVzcyBTcGFzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiZmVycmFnYW1vXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRhc2tlZCB3aXRoIG1hcmtldGluZyBvZmZpY2Ugc3BhY2UgYWJvdmUgdGhpcyBsdXh1cnkgYnJhbmQncyBGaWZ0aCBBdmVudWUgZmxhZ3NoaXAsIHdlIGZhY2VkIHRoZSBjaGFsbGVuZ2Ugb2YgYW4gdW5rbm93biwgc2lkZSBzdHJlZXQgZW50cmFuY2UuIEhhbmRlZCBub3RoaW5nIG1vcmUgdGhhbiBhbiBhcmNoaXRlY3QncyByZW5kZXJpbmcsIHdlIGVsZWdhbnRseSBicmFuZGVkIHRoZSBhZGRyZXNzLCBjYXB0dXJlZCB0aGUgZW5lcmd5IG9mIHRoZSBsb2NhdGlvbiwgYW5kIGdlbmVyYXRlZCBlbm91Z2ggYnV6eiB0byBleHBhbmQgdGhlIHZpZXdpbmcgcGFydHkgdG8gdHdvIGRhdGVzIGJ5IGx1cmluZyBicm9rZXJzIHdpdGggdGhlIHByb21pc2Ugb2YgYSBGZXJyYWdhbW8gdGllLiBUaGUgcmVzdWx0cyB3ZXJlIGEgcXVpY2sgY2xvc2luZyBhbmQgYSBmZWF0dXJlIGFydGljbGUgaW4gQ3JhaW4ncyBOWSBCdXNpbmVzcyBjaXRpbmcgb3VyIGlubm92YXRpb24gYW5kIHN1Y2Nlc3MgaW4gYSBjaGFsbGVuZ2luZyByZWFsIGVzdGF0ZSBtYXJrZXQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJpZXM6IEx1eHVyeSBGYXNoaW9uLCBSZWFsIEVzdGF0ZVwiLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuXG5mdW5jdGlvbiBzdHlsZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxuICAgICAgICAgICAgdGV4dFNxdWFyZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAyLjIsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMzMzMzMzNcIixcbiAgICAgICAgICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjA2NSxcbiAgICAgICAgICAgICAgICB3aWR0aFNjYWxlOiAxLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogMC4yLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjMzMzMzMzXCIsXG4gICAgICAgICAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMyxcbiAgICAgICAgICAgICAgICB3aWR0aFNjYWxlOiAxLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW1hZ2UxLCAxKTtcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW1hZ2UyLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGZvciAoY29uc3Qgd29ya0NvbnRlbnQgb2Ygd29ya0NvbnRlbnRzKSB7XG4gICAgICAgIGNvbnN0IHRleHRTcXVhcmUgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKHdvcmtDb250ZW50Lm5hbWUudG9VcHBlckNhc2UoKSwgLi4ud29ya0NvbnRlbnQuZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICBjb25zdCBpbWFnZTIgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8yLmpwZ2ApO1xuXG4gICAgICAgIHdvcmtEaXNwbGF5cy5wdXNoKHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0ZXh0U3F1YXJlLm1ham9yLFxuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIGltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZXb3JrKCkge1xuICAgIGNvbnN0IHdvcmtJdGVtczogV29ya0l0ZW1bXSA9IFtdO1xuICAgIGNvbnN0IHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSA9IFtdO1xuXG4gICAgY29uc3QgQk9UVE9NID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIGNvbnN0IFRPUCA9ICh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSA9PiB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudFdpZHRoIC8gMjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya0NvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmtDb250ZW50ID0gd29ya0NvbnRlbnRzW2ldO1xuXG4gICAgICAgIGNvbnN0IHRhYkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0YWJFbGVtZW50LnNyYyA9IGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9L3RhYi5wbmdgO1xuICAgICAgICBib2R5LmFwcGVuZCh0YWJFbGVtZW50KTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHkucmVtb3ZlQ2hpbGQodGFiRWxlbWVudCkpO1xuXG4gICAgICAgIGNvbnN0IHNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XG4gICAgICAgIGNvbnN0IHNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcbiAgICAgICAgc3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDEwMDApO1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gLTAuMTtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDA7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgayA9IG1hcFJhbmdlKHNwcmluZy5wb3NpdGlvbiwgMCwgMSwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCkpO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS50b3AgPSBweChrKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZywgYm9keVNpZ10pO1xuICAgICAgICBzcHJpbmdTaWcudXBkYXRlKCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrSXRlbSBvZiB3b3JrSXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0gPSB3b3JrSXRlbTtcbiAgICAgICAgICAgICAgICBzcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoODAwKTtcbiAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gbWFwUmFuZ2Uod2luZG93LmlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCksIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGJvZHlTaWcudXBkYXRlKCk7IC8vIGhtIGRvbnQgbGlrZSB0aGlzXG5cbiAgICAgICAgICAgIHNldFNjcm9sbCh3b3JrRGlzcGxheXNbaV0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSAxO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGNsZWFySW50ZXJ2YWwodGltZW91dEhhbmRsZSkpO1xuXG4gICAgICAgIHdvcmtJdGVtcy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50IH0gPSB3b3JrSXRlbXNbaV07XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gd2luZG93LmlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrSXRlbXMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gd2luZG93LmlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGspIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChrKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoayAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcblxuICAgICAgICAgICAgc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0Rpc3BsYXkgb2Ygd29ya0Rpc3BsYXlzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUod29ya0Rpc3BsYXkudGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbiAgICAgICAgICAgIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuXG4gICAgICAgICAgICBpZiAod29ya0Rpc3BsYXlzLmxlbmd0aCkgc2V0TWF4U2Nyb2xsKHdvcmtEaXNwbGF5c1t3b3JrRGlzcGxheXMubGVuZ3RoIC0gMV0uaW1hZ2UyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCBlbGVtZW50U2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBjbGlja05hdkNvbm5lY3QgfSBmcm9tIFwiLi9wYWdlcy9jb25uZWN0XCI7XG5pbXBvcnQgeyBjbGlja05hdkV2b2x1dGlvbiB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xuaW1wb3J0IHsgY2xpY2tOYXZJbnNwaXJhdGlvbiB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdlZpZXcgfSBmcm9tIFwiLi9wYWdlcy92aWV3XCI7XG5pbXBvcnQgeyBjbGlja05hdldvcmsgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XG5cbmV4cG9ydCBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmV4cG9ydCBjb25zdCBib2R5U2lnID0gZWxlbWVudFNpZ25hbChib2R5KTtcblxuZXhwb3J0IGNvbnN0IGllQmx1ZSA9IFwiIzYwOUNDRVwiO1xuXG5leHBvcnQgY29uc3Qgdmlld05hdiA9IGcoXCJuYXYtdmlld1wiKTtcbmV4cG9ydCBjb25zdCB3b3JrTmF2ID0gZyhcIm5hdi13b3JrXCIpO1xuZXhwb3J0IGNvbnN0IGluc3BpcmF0aW9uTmF2ID0gZyhcIm5hdi1pbnNwaXJhdGlvblwiKTtcbmV4cG9ydCBjb25zdCBldm9sdXRpb25OYXYgPSBnKFwibmF2LWV2b2x1dGlvblwiKTtcbmV4cG9ydCBjb25zdCBjb25uZWN0TmF2ID0gZyhcIm5hdi1jb25uZWN0XCIpO1xuXG5leHBvcnQgY29uc3QgbmF2SXRlbXMgPSBbdmlld05hdiwgd29ya05hdiwgaW5zcGlyYXRpb25OYXYsIGV2b2x1dGlvbk5hdiwgY29ubmVjdE5hdl07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDbGlwID0gZyhcInNjcm9sbC1jbGlwXCIpO1xuZXhwb3J0IGNvbnN0IHNjcm9sbGFibGVJdGVtcyA9IGcoXCJzY3JvbGxhYmxlLWl0ZW1zXCIpO1xuXG5leHBvcnQgY29uc3QgbG9nbyA9IGcoXCJsb2dvXCIpO1xuXG5leHBvcnQgY29uc3QgZ2xvYmFsU1ZHID0gZyhcImdsb2JhbC1zdmdcIik7XG5cbmV4cG9ydCBjb25zdCBzbGVlcCA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gPSAwLjk1O1xuXG5leHBvcnQgbGV0IG9uTmF2T3B0aW9uQ2xpY2s6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbmludGVyZmFjZSBFbGVtZW50QWxpZ25tZW50IHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGcoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R1cGlkQXNwZWN0R2FyYmFnZShlbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgLy8gaSBmdWNraW5nIGhhdGUgdGhpcyBsYXlvdXQgZW5naW5lXG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KChlbGVtZW50Lm5hdHVyYWxXaWR0aCAvIGVsZW1lbnQubmF0dXJhbEhlaWdodCkgKiBlbGVtZW50LmNsaWVudEhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJJbWFnZVNjYWxlZChpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IGhlaWdodCA9IHNjcm9sbENsaXAuY2xpZW50SGVpZ2h0ICogc2NhbGU7XG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBzdHVwaWRBc3BlY3RHYXJiYWdlKGltYWdlKTtcbiAgICBpbWFnZS5zdHlsZS50b3AgPSBweCgoc2Nyb2xsQ2xpcC5jbGllbnRIZWlnaHQgLSBoZWlnaHQpIC8gMik7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEltYWdlU21hcnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGFwcGVuZDogKCkgPT4gdm9pZCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgaW1hZ2VMb2FkaW5nUHJvbWlzZXMucHVzaChlbGVtZW50LmRlY29kZSgpKTtcbiAgICBpbWFnZUxvYWRpbmdBcHBlbmRzLnB1c2goYXBwZW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbEltYWdlKHNyYzogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbEltYWdlLnNyYyA9IHNyYztcbiAgICBhcHBlbmRJbWFnZVNtYXJ0KHNjcm9sbEltYWdlLCAoKSA9PiB7XG4gICAgICAgIHNjcm9sbGFibGVJdGVtcy5hcHBlbmRDaGlsZChzY3JvbGxJbWFnZSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxhYmxlSXRlbXMucmVtb3ZlQ2hpbGQoc2Nyb2xsSW1hZ2UpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzY3JvbGxJbWFnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFJhbmdlKG46IG51bWJlciwgc3RhcnQxOiBudW1iZXIsIHN0b3AxOiBudW1iZXIsIHN0YXJ0MjogbnVtYmVyLCBzdG9wMjogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgobiAtIHN0YXJ0MSkgLyAoc3RvcDEgLSBzdGFydDEpKSAqIChzdG9wMiAtIHN0YXJ0MikgKyBzdGFydDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgLy8gcmV0dXJuIHNjcm9sbGFibGVJdGVtcy5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OID0gMC43O1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgKiBTQ1JPTExfSEVJR0hUX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZnVuY3Rpb24gY2xpY2tBbnlOYXYobmF2SXRlbTogSFRNTEVsZW1lbnQsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBuYXZJdGVtLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgbmF2SXRlbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBzY3JvbGwgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2Ygb25OYXZPcHRpb25DbGljaykgdSgpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5hdkl0ZW1zKSB7XG4gICAgICAgICAgICBuLnN0eWxlLmNvbG9yID0gXCIjODA4MDgwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBuYXZJdGVtLnN0eWxlLmNvbG9yID0gXCIjMDAwMDAwXCI7XG5cbiAgICAgICAgZigpO1xuXG4gICAgICAgIHNjcm9sbCA9IDA7XG4gICAgICAgIHVwZGF0ZVNjcm9sbCgpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJWZXJ0aWNhbChpdGVtOiBIVE1MRWxlbWVudCwgeTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHkgLSBpdGVtLmNsaWVudEhlaWdodCAvIDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50LmNsaWVudFdpZHRoICsgZ2FwKTtcbn1cblxuaW50ZXJmYWNlIFNjcm9sbFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG5cbiAgICBmb250U2l6ZVNjYWxlOiBudW1iZXI7XG4gICAgd2lkdGhTY2FsZTogbnVtYmVyO1xuICAgIGxpbmVIZWlnaHRTY2FsZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc2Nyb2xsVGV4dC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIGFwcGVuZEltYWdlU21hcnQoc2Nyb2xsVGV4dCwgKCkgPT4ge1xuICAgICAgICBzY3JvbGxhYmxlSXRlbXMuYXBwZW5kKHNjcm9sbFRleHQpO1xuICAgIH0pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxhYmxlSXRlbXMucmVtb3ZlQ2hpbGQoc2Nyb2xsVGV4dCkpO1xuXG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHQoc2Nyb2xsVGV4dDogSFRNTEVsZW1lbnQsIHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSBcIlwiICsgcy5mb250V2VpZ2h0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuY29sb3IgPSBzLmNvbG9yO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGV0dGVyU3BhY2luZyA9IHB4KHMubGV0dGVyU3BhY2luZyk7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRTaXplID0gcHgoc2Nyb2xsSGVpZ2h0ICogcy5mb250U2l6ZVNjYWxlKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLndpZHRoID0gcHgoc2Nyb2xsSGVpZ2h0ICogcy53aWR0aFNjYWxlKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKiBzLmxpbmVIZWlnaHRTY2FsZSk7XG59XG5cbmZ1bmN0aW9uIGF4aXNBbGlnbmluZ1dpdGhHYXBzKGF4aXNTaXplOiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IG51bWJlcikge1xuICAgIHJldHVybiAoZWxlbWVudE9yR2FwczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdKTogW0VsZW1lbnRBbGlnbm1lbnRbXSwgbnVtYmVyXSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRBbGlnbm1lbnRzID0gW107XG4gICAgICAgIGxldCBydW5uaW5nVG90YWwgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnRPckdhcCBvZiBlbGVtZW50T3JHYXBzKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudE9yR2FwIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50QWxpZ25tZW50cy5wdXNoKHsgZWxlbWVudDogZWxlbWVudE9yR2FwLCBvZmZzZXQ6IHJ1bm5pbmdUb3RhbCB9KTtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gYXhpc1NpemUoZWxlbWVudE9yR2FwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGVsZW1lbnRPckdhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2VsZW1lbnRBbGlnbm1lbnRzLCBydW5uaW5nVG90YWxdO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB5QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudEhlaWdodCk7XG5leHBvcnQgY29uc3QgeEFsaWduaW5nV2l0aEdhcHMgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5jbGllbnRXaWR0aCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNxdWFyZSB7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yczogSFRNTEVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHRTcXVhcmUobWFqb3JUZXh0OiBzdHJpbmcsIC4uLm1pbm9yVGV4dHM6IHN0cmluZ1tdKTogVGV4dFNxdWFyZSB7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3JzID0gbWlub3JUZXh0cy5tYXAoYWRkU2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHsgbWFqb3IsIG1pbm9ycyB9O1xufVxuXG5pbnRlcmZhY2UgU2Nyb2xsVGV4dFNxdWFyZSB7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yczogSFRNTEVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogU2Nyb2xsVGV4dFNxdWFyZSwgbWFqb3JTY3JvbGxUZXh0RGV0YWlsczogU2Nyb2xsVGV4dERldGFpbHMsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCBtYWpvclNjcm9sbFRleHREZXRhaWxzKTtcbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcbn1cblxubGV0IGltYWdlTG9hZGluZ1Byb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcbmxldCBpbWFnZUxvYWRpbmdBcHBlbmRzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVcGRhdGVMYXlvdXQodXBkYXRlTGF5b3V0OiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChpbWFnZUxvYWRpbmdQcm9taXNlcyk7XG4gICAgICAgIGZvciAoY29uc3QgaW1hZ2VMb2FkaW5nQXBwZW5kIG9mIGltYWdlTG9hZGluZ0FwcGVuZHMpIGltYWdlTG9hZGluZ0FwcGVuZCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBpbWFnZUxvYWRpbmdBcHBlbmRzID0gW107XG4gICAgICAgIHVwZGF0ZUxheW91dCgpO1xuICAgIH07XG4gICAgZWZmZWN0KHVwZGF0ZUxheW91dEltYWdlV2FpdGluZywgW2JvZHlTaWddKTtcbiAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gYm9keVNpZy51bnN1YnNjcmliZSh1cGRhdGVMYXlvdXRJbWFnZVdhaXRpbmcpKTtcblxuICAgIHVwZGF0ZUxheW91dEltYWdlV2FpdGluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBTY3JvbGxUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IHlBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlVG9GaWxlKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoXCIgXCIsIFwiLVwiKTtcbn1cblxuLy8gcmVhbCBzdHVmZlxuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxlZnRBbGlnbiA9IDgwO1xuICAgIGxvZ28uc3R5bGUud2lkdGggPSBweCg1NSk7XG4gICAgbG9nby5zdHlsZS5oZWlnaHQgPSBweCg1NSk7XG4gICAgbG9nby5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KGxlZnRBbGlnbiAvIDIpO1xuXG4gICAgZnVuY3Rpb24gYWxpZ25OYXZJdGVtKG5hdkl0ZW06IEhUTUxFbGVtZW50LCBudWRnZTogbnVtYmVyKSB7XG4gICAgICAgIG5hdkl0ZW0uc3R5bGUubGVmdCA9IHB4KGxlZnRBbGlnbik7XG4gICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgod2luZG93LmlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIGFsaWduTmF2SXRlbSh2aWV3TmF2LCAtMik7XG4gICAgYWxpZ25OYXZJdGVtKHdvcmtOYXYsIC0xKTtcbiAgICBhbGlnbk5hdkl0ZW0oaW5zcGlyYXRpb25OYXYsIDApO1xuICAgIGFsaWduTmF2SXRlbShldm9sdXRpb25OYXYsIDEpO1xuICAgIGFsaWduTmF2SXRlbShjb25uZWN0TmF2LCAyKTtcbn0sIFtib2R5U2lnXSk7XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgeCA9IDI4MDtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0KTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLndpZHRoID0gcHgod2luZG93LmlubmVyV2lkdGggLSB4KTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLnRvcCA9IHB4KGNlbnRlclZlcnRpY2FsKHNjcm9sbENsaXAsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpKTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLmxlZnQgPSBweCh4KTtcblxuICAgIHNjcm9sbGFibGVJdGVtcy5zdHlsZS53aWR0aCA9IHB4KDEwMCk7XG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLmhlaWdodCA9IHB4KDEwMCk7XG59LCBbYm9keVNpZ10pO1xuXG5sZXQgc2Nyb2xsID0gMDtcblxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsKCkge1xuICAgIHNjcm9sbGFibGVJdGVtcy5zdHlsZS5sZWZ0ID0gcHgoLXNjcm9sbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTY3JvbGwoczogbnVtYmVyKSB7XG4gICAgc2Nyb2xsID0gcztcbiAgICB1cGRhdGVTY3JvbGwoKTtcbn1cblxubGV0IG1heFNjcm9sbCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNYXhTY3JvbGwoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBtYXhTY3JvbGwgPSBlbGVtZW50Lm9mZnNldExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoIC0gc2Nyb2xsQ2xpcC5vZmZzZXRXaWR0aCArIDEwMDtcbn1cbndpbmRvdy5vbndoZWVsID0gKGUpID0+IHtcbiAgICBzY3JvbGwgKz0gZS5kZWx0YVggKyBlLmRlbHRhWTtcbiAgICBpZiAoc2Nyb2xsIDwgMCkgc2Nyb2xsID0gMDtcbiAgICBpZiAoc2Nyb2xsID4gbWF4U2Nyb2xsKSBzY3JvbGwgPSBtYXhTY3JvbGw7XG4gICAgdXBkYXRlU2Nyb2xsKCk7XG59O1xuXG5jbGlja0FueU5hdihsb2dvLCBjbGlja05hdlZpZXcpO1xuXG5jbGlja0FueU5hdih2aWV3TmF2LCBjbGlja05hdlZpZXcpO1xuY2xpY2tBbnlOYXYod29ya05hdiwgY2xpY2tOYXZXb3JrKTtcbmNsaWNrQW55TmF2KGluc3BpcmF0aW9uTmF2LCBjbGlja05hdkluc3BpcmF0aW9uKTtcbmNsaWNrQW55TmF2KGV2b2x1dGlvbk5hdiwgY2xpY2tOYXZFdm9sdXRpb24pO1xuY2xpY2tBbnlOYXYoY29ubmVjdE5hdiwgY2xpY2tOYXZDb25uZWN0KTtcblxuc2V0VGltZW91dCgoKSA9PiB2aWV3TmF2LmNsaWNrKCkpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgPSAwLjAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aWNrU3ByaW5nKCkge1xyXG4gICAgICAgIHNwcmluZy50aWNrKDEgLyA2MCk7XHJcbiAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ByaW5nLnRhcmdldCAtIHNwcmluZy5wb3NpdGlvbikgPCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgJiYgTWF0aC5hYnMoc3ByaW5nLnZlbG9jaXR5KSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSkge1xyXG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSBzcHJpbmcudGFyZ2V0O1xyXG4gICAgICAgICAgICBzcHJpbmcudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2tTcHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2tTcHJpbmcoKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vcGFnZXMvdmlld1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL3dvcmtcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcclxuXHJcbmltcG9ydCBcIi4vc2hhcmVkXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==