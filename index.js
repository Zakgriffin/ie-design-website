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
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.registerUpdateLayout)(() => {
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(home, 0.95);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(horizon, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(freshLook, 0.8);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(greatBrands, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(insightClarity, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(skyward, 1);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollTextSquare)(textTile1, majorScrollTextDetails, minorScrollTextDetails);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollTextSquare)(textTile2, majorScrollTextDetails, minorScrollTextDetails);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollTextSquare)(textTile3, majorScrollTextDetails, minorScrollTextDetails);
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
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignScrollTextSquare)(textTile1, 20, 20);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignScrollTextSquare)(textTile2, 20, 20);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.alignScrollTextSquare)(textTile3, 20, 20);
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



const workItems = [
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
// const addScrollTextSquareForWork = alignScrollTextSquare(
//     {
//         letterSpacing: 2.2,
//         fontWeight: 400,
//         color: "#333333",
//         fontSizeScale: 0.065,
//         widthScale: 1,
//         lineHeightScale: 0.09,
//     },
//     20,
//     {
//         letterSpacing: 0.2,
//         fontWeight: 300,
//         color: "#333333",
//         fontSizeScale: 0.03,
//         widthScale: 1,
//         lineHeightScale: 0.05,
//     },
//     20
// );
function clickedAnyTab() {
    const items = [];
    const s = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.getScrollHeight)();
    for (const item of workItems) {
        const tile = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollTextSquare)(item.name.toUpperCase(), ...item.description);
        items.push(
        //
        tile.major, 0.2 * s, (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(`work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(item.name)}/1.jpg`), 0.15 * s, (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(`work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(item.name)}/2.jpg`), 0.22 * s);
    }
    (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
        const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.xAligningWithGaps)(items);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)(offset);
        }
    }, [_shared__WEBPACK_IMPORTED_MODULE_2__.bodySig]);
}
function clickNavWork() {
    const workTabs = [];
    for (let i = 0; i < workItems.length; i++) {
        const workItem = workItems[i];
        const tabElement = document.createElement("img");
        tabElement.style.position = "absolute";
        tabElement.style.visibility = "hidden";
        tabElement.src = `work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(workItem.name)}/tab.png`;
        _shared__WEBPACK_IMPORTED_MODULE_2__.body.append(tabElement);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => _shared__WEBPACK_IMPORTED_MODULE_2__.body.removeChild(tabElement));
        const spring = new _spring__WEBPACK_IMPORTED_MODULE_1__.Spring(0);
        const springSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
        spring.setStiffnessCritical(1000);
        tabElement.onmouseover = () => {
            spring.target = -0.1;
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig, 0.01);
        };
        tabElement.onmouseleave = () => {
            spring.target = 0;
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig, 0.01);
        };
        (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
            tabElement.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.px)((0,_shared__WEBPACK_IMPORTED_MODULE_2__.mapRange)(spring.position, 0, 1, (window.innerHeight - tabElement.clientHeight) / 2, window.innerHeight - tabElement.width / 2));
        }, [springSig, _shared__WEBPACK_IMPORTED_MODULE_2__.bodySig]);
        springSig.update();
        tabElement.onclick = () => {
            for (const { tabElement, spring, springSig } of workTabs) {
                spring.stiffness = 800;
                spring.target = 1;
                tabElement.onmouseover = () => { };
                tabElement.onmouseleave = () => { };
                (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig, 0.01);
            }
            clickedAnyTab();
        };
        workTabs.push({ tabElement, spring, springSig });
        const timeoutHandle = setTimeout(() => {
            spring.position = 1;
            tabElement.style.visibility = "visible";
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig, 0.01);
        }, 80 * i);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => clearInterval(timeoutHandle));
    }
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
        for (let i = 0; i < workTabs.length; i++) {
            const { tabElement } = workTabs[i];
            const start = 300;
            const end = window.innerWidth - 150;
            const width = (end - start) / (workTabs.length * 2 - 1);
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
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   spaceToFile: () => (/* binding */ spaceToFile),
/* harmony export */   stupidAspectGarbage: () => (/* binding */ stupidAspectGarbage),
/* harmony export */   styleScrollText: () => (/* binding */ styleScrollText),
/* harmony export */   styleScrollTextSquare: () => (/* binding */ styleScrollTextSquare),
/* harmony export */   viewNav: () => (/* binding */ viewNav),
/* harmony export */   waiting: () => (/* binding */ waiting),
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
let waiting = 0;
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    waiting++;
    scrollImage.onload = () => waiting--;
    scrollableItems.append(scrollImage);
    onNavOptionClick.push(() => scrollableItems.removeChild(scrollImage));
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
    scrollableItems.append(scrollText);
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
function registerUpdateLayout(updateLayout) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(updateLayout, [bodySig]);
        onNavOptionClick.push(() => bodySig.unsubscribe(updateLayout));
        // TODO this is abolute disgusting garbage. need to wait for images to load
        const guh = () => {
            if (waiting) {
                setTimeout(guh);
            }
            else {
                updateLayout();
            }
        };
        guh();
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
function animateSpring(spring, signal, tolerance) {
    if (spring.isAnimating)
        return;
    spring.isAnimating = true;
    function tickSpring() {
        spring.tick(1 / 60);
        signal.update();
        if (Math.abs(spring.target - spring.position) < tolerance && Math.abs(spring.velocity) < tolerance) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0Y7QUFDRjtBQUVQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvY29ubmVjdC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvaW5zcGlyYXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvdmlldy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy93b3JrLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NoYXJlZC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaWduYWwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc3ByaW5nLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2Q29ubmVjdCgpIHt9XG4iLCJpbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2RXZvbHV0aW9uKCkge1xuICAgIC8vIGNvbnN0IGJyYW5kQnVpbHQgPSBhZGRTY3JvbGxJbWFnZShcImJyYW5kLWJ1aWx0LnN2Z1wiKTtcbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0LCBhbGlnbldpdGhHYXAsIGJvZHlTaWcsIGNlbnRlckltYWdlU2NhbGVkLCBnZXRTY3JvbGxIZWlnaHQsIGllQmx1ZSwgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCBzZXRNYXhTY3JvbGwsIHN0eWxlU2Nyb2xsVGV4dCwgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmNvbnN0IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiA9IDAuODU7XG5cbmludGVyZmFjZSBJbnNwaXJhdGlvblRpbGUge1xuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcjogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZE1vcmU6IEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBzdHlsZUluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjYsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjAzNixcbiAgICAgICAgd2lkdGhTY2FsZTogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OLFxuICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDksXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQobWlub3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC4zLFxuICAgICAgICBmb250V2VpZ2h0OiAzNTAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMjcsXG4gICAgICAgIHdpZHRoU2NhbGU6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTixcbiAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA1LFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KHJlYWRNb3JlLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNSxcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogaWVCbHVlLFxuICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjAzLFxuICAgICAgICB3aWR0aFNjYWxlOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04sXG4gICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCAqIDAuNTUpO1xufVxuXG5mdW5jdGlvbiBhbGlnbkluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIG1ham9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIHJlYWRNb3JlLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgaW1hZ2UsIC8vXG4gICAgICAgIDAuMDMgKiBzLFxuICAgICAgICBtYWpvcixcbiAgICAgICAgLTAuMDEgKiBzLFxuICAgICAgICBtaW5vcixcbiAgICAgICAgMC4wMSAqIHMsXG4gICAgICAgIHJlYWRNb3JlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgcyAqIDAuMTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25UaWxlKGltYWdlU3RyaW5nOiBzdHJpbmcsIG1ham9yVGV4dDogc3RyaW5nLCBtaW5vclRleHQ6IHN0cmluZyk6IEluc3BpcmF0aW9uVGlsZSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhZGRTY3JvbGxJbWFnZShpbWFnZVN0cmluZyk7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3IgPSBhZGRTY3JvbGxUZXh0KG1pbm9yVGV4dCk7XG4gICAgY29uc3QgcmVhZE1vcmUgPSBhZGRTY3JvbGxUZXh0KFwiUmVhZCBtb3JlXCIpO1xuXG4gICAgcmV0dXJuIHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2SW5zcGlyYXRpb24oKSB7XG4gICAgY29uc3QgaW5zcGlyYXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImluc3BpcmF0aW9uL2luc3BpcmF0aW9uLnN2Z1wiKTtcblxuICAgIGNvbnN0IHRpbGVzID0gW1xuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi95dW1pZS5qcGdcIiwgXCJUSEUgU1RBUlQgT0YgU09NRVRISU5HIFlVTS1JRVwiLCBcIldlIGFsd2F5cyB3YW50ZWQgdG8gZGVzaWduIGNob2NvbGF0ZSBiYXJzIGFuZCBmaW5hbGx5IGRpZCBpdC4gSW50cm9kdWNpbmcgb3VyIHN3ZWV0IG5ldyBicmFuZC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3dvcmRzLWlkZWFzLmpwZ1wiLCBcIlNIQVJFIFNPTUUgREVTSUdOIExPVkVcIiwgXCJUaGUgaS5lLiBkZXNpZ24gcHJvbW8gam91cm5hbHMgZW5jb3VyYWdlIGNsaWVudHMgdG8gc2tldGNoIHRoZWlyIGJpZyBpZGVhcyBhbmQgY2FwdHVyZSB0aGVpciBkcmVhbXMuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9jb29rLWllLmpwZ1wiLCBcIkdPVFRBIExPVkUgQSBDT09LLUlFXCIsIFwiSG93IGEgc2VjcmV0IHJlY2lwZSB3b3JrcyB0byBicmluZyByZWxhdGlvbnNoaXBzIHRvIGEgd2hvbGUgbmV3IGxldmVsLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVtaXguanBnXCIsIFwiUkVNSVhcIiwgXCJBIGJlaGluZC10aGUtc2NlbmVzIGxvb2sgYXQgaG93IHdlIHRyYW5zZm9ybWVkIGNsYXNzaWMgbWVtb3J5IGNhcnJpZXJzIGludG8gb2JqZWN0cyBvZiBhcnQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9rcmVtcGEucG5nXCIsIFwiUkVCUkFORElORyBBIEZBTUlMWSBCVVNJTkVTU1wiLCBcIkEgcmVmcmVzaCBmb3IgYSA1MC15ZWFyIGxlZ2FjeS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2ZvdG9zdG9yaS5qcGdcIiwgXCJCUkFORElORyBGUk9NIFRIRSBOQU1FIFVQXCIsIFwiV2hlbiBhIGNsaWVudCBoYWQgYW4gaWRlYSBmb3IgYSBicmFuZCBzcGlub2ZmLCB3ZSB0b29rIGhlciBjb25jZXB0IHRvIHJlYWxpdHkgYW5kIGxhdW5jaGVkIHRoZSBidXNpbmVzcyBpbiBoaWdoIHN0eWxlLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vaW5zcGlyZWQtMi1jcmVhdGUuanBnXCIsIFwiSU5TUElSRUQgMiBDUkVBVEVcIiwgXCJBIHBhaW50aW5nIGluc3BpcmVkIGJ5IHRoZSBpLmUuIGRlc2lnbiBsb2dvIGNvbWJpbmVzIG9pbCBwYWludHMsIGdyb3VuZCB1cCBjcmF5b25zLCBhbmQgYSBsZWdvLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZnJvbS1pbnNpZGUuanBnXCIsIFwiVEhFIFZJRVcgRlJPTSBJTlNJREVcIiwgXCJpLmUuIGRlc2lnbidzIG5ldyBzdHVkaW8gd2FzIDMwIHllYXJzIGluIHRoZSBtYWtpbmcuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZWNvbm5lY3RpbmcuanBnXCIsIFwiUkVDT05ORUNUSU5HXCIsIFwiSG93IHVuY2VydGFpbiB0aW1lcyBsZWQgdG8gYSBob21lY29taW5nIGZvciBpLmUuIGRlc2lnbidzIHNlbmlvciBkZXNpZ25lci5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL25ldy1zdHVkaW8uanBnXCIsIFwiTkVXIFNUVURJTy4gTkVXIFZJRVcuXCIsIFwiSG93IHRoZSBuZWVkIGZvciBpbnNwaXJhdGlvbiBmdWVsZWQgdGhlIGJ1aWxkaW5nIG9mIGEgc3R1ZGlvLlwiKSxcbiAgICBdO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW5zcGlyYXRpb24sIDAuNzUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgc3R5bGVJbnNwaXJhdGlvblRpbGUodGlsZSk7XG5cbiAgICAgICAgYWxpZ25XaXRoR2FwKGluc3BpcmF0aW9uLCB0aWxlc1swXS5pbWFnZSwgcyAqIDAuMjUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aCAtIDE7IGkrKykgYWxpZ25XaXRoR2FwKHRpbGVzW2ldLmltYWdlLCB0aWxlc1tpICsgMV0uaW1hZ2UsIHMgKiAwLjEpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgYWxpZ25JbnNwaXJhdGlvblRpbGUodGlsZSk7XG5cbiAgICAgICAgc2V0TWF4U2Nyb2xsKHRpbGVzW3RpbGVzLmxlbmd0aCAtIDFdLmltYWdlKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGFkZFNjcm9sbFRleHRTcXVhcmUsIGdldFNjcm9sbEhlaWdodCwgcHgsIFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OLCB4QWxpZ25pbmdXaXRoR2FwcywgY2VudGVySW1hZ2VTY2FsZWQsIGFkZFNjcm9sbEltYWdlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHNldE1heFNjcm9sbCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcclxuXHJcbmNvbnN0IG1ham9yU2Nyb2xsVGV4dERldGFpbHMgPSB7XHJcbiAgICBsZXR0ZXJTcGFjaW5nOiAyLjIsXHJcbiAgICBmb250V2VpZ2h0OiA0MDAsXHJcbiAgICBjb2xvcjogXCIjQjNCM0IzXCIsXHJcbiAgICBmb250U2l6ZVNjYWxlOiAwLjA2NSxcclxuICAgIHdpZHRoU2NhbGU6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OLFxyXG4gICAgbGluZUhlaWdodFNjYWxlOiAwLjA5LFxyXG59O1xyXG5cclxuY29uc3QgbWlub3JTY3JvbGxUZXh0RGV0YWlscyA9IHtcclxuICAgIGxldHRlclNwYWNpbmc6IDAuMixcclxuICAgIGZvbnRXZWlnaHQ6IDMwMCxcclxuICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcclxuICAgIGZvbnRTaXplU2NhbGU6IDAuMDMsXHJcbiAgICB3aWR0aFNjYWxlOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTixcclxuICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdlZpZXcoKSB7XHJcbiAgICBjb25zdCBob21lID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvbWUuc3ZnXCIpO1xyXG4gICAgY29uc3QgaG9yaXpvbiA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob3Jpem9uLmpwZ1wiKTtcclxuICAgIGNvbnN0IGZyZXNoTG9vayA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9mcmVzaC1sb29rLnN2Z1wiKTtcclxuICAgIGNvbnN0IGdyZWF0QnJhbmRzID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2dyZWF0LWJyYW5kcy5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTEgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiR1JFQVQgQlJBTkRTIERPTidUIEpVU1QgSEFQUEVOXCIsXHJcbiAgICAgICAgXCJUaGV5IHJlcXVpcmUgZXhwbG9yYXRpb24sIGluc2lnaHQsIGFuZCB0ZW5hY2l0eS4gV2UgaHVudCBmb3IgdGhhdCBtYWdpYyBzcGFyayB0aGF0IGlnbml0ZXMgaW5ub3ZhdGlvbi4gV2UgYnJpbmcgb3VyIGV4dGVuc2l2ZSBza2lsbHMgYW5kIGV4cGVyaWVuY2UgdG8gZWFjaCBwcm9qZWN0IGFuZCBnaXZlIGl0IG91ciBhbGwuIFRoZSByZXN1bHQgaXMgY2xlYXIsIHlldCBlbGV2YXRlZCBjb21tdW5pY2F0aW9uIHRoYXQgbWFrZXMgcGVvcGxlIHN0b3AsIHRoaW5rLCBhbmQgb2Z0ZW4gc21pbGUuXCIsXHJcbiAgICAgICAgXCJPdXIgc3R1ZGlvIGxvY2F0aW9uIGlzIHByb2ZvdW5kbHkgaW5zcGlyaW5nLiBUaGUgbWFnbmlmaWNlbnQgdmlldyBmZWVkcyBvdXIgc291bHMgYW5kIGtlZXBzIHVzIGluc3BpcmVkIHRvIGRvIG91ciBiZXN0IHdvcmsuIEl0J3MgYSBwbGFjZSB3aGVyZSBjcmVhdGl2ZSBwZW9wbGUgY29tZSB0b2dldGhlciB0byBjb2xsYWJvcmF0ZSBhbmQgZHJpbGwgZG93biB0byB0aGUgaGVhcnQgb2YgdGhlIG1hdHRlci4gVG8gc29sdmUgcHJvYmxlbXMgYW5kIGJyaW5nIGlkZWFzIHRvIGxpZmUuIFRvIGNyZWF0ZSB0aGluZ3Mgd29ydGggcmVtZW1iZXJpbmcuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBpbnNpZ2h0Q2xhcml0eSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9pbnNpZ2h0LWNsYXJpdHkuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUyID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIEJSSU5HIFZJU0lPTiwgSU5TSUdIVCwgQU5EIENMQVJJVFkgVE8gRVZFUlkgUFJPSkVDVFwiLFxyXG4gICAgICAgIFwiU3VjY2Vzc2Z1bCBkZXNpZ24gc3RhcnRzIHdpdGggaWRlbnRpZnlpbmcgYSBjbGllbnQncyBuZWVkcywgZ29hbHMsIGFuZCBhc3BpcmF0aW9ucy4gT3VyIG9iamVjdGl2aXR5IHNoaW5lcyBsaWdodCBvbiB3aGF0IG90aGVycyBoYXZlIG1pc3NlZC4gV2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBzZWUgYW5kIGludGVycHJldCB0aGUgaW5uZXIgd29ya2luZ3MsIGN1bHR1cmUsIGFuZCBudWFuY2VzIG9mIG91ciBjbGllbnQncyB3b3JsZC4gV2UgYXNrIHF1ZXN0aW9ucyDigJMgbG90cyBvZiBxdWVzdGlvbnMuIFRoZW4gbGlzdGVuIHVudGlsIHdlIGdhaW4gdGhlIGRlZXAgdW5kZXJzdGFuZGluZyBuZWNlc3NhcnkgdG8gYnVpbGQgdGhlIHNvbGlkIGZvdW5kYXRpb24gdGhhdCBhbnkgZW5kdXJpbmcgYnJhbmQgbmVlZHMuXCIsXHJcbiAgICAgICAgXCJPdXIgc21hbGwgYnV0IG1pZ2h0eSB0ZWFtIGJyaW5ncyB0b2dldGhlciBhIHdpZGUgcmFuZ2Ugb2YgdGFsZW50cyBhbmQgcGVyc3BlY3RpdmVzLCBwbHVzIGEgbmljZSBsaXN0IG9mIGF3YXJkcy4gV2UgdGhyb3cgb3VyIGhlYXJ0cyBpbnRvIG91ciB3b3JrIGFuZCBhcmUga25vd24gZm9yIG91ciBmaWVyY2UgY29tbWl0bWVudCB0byB0aGUgdHJ1c3RlZCwgbG9uZy10ZXJtIHBhcnRuZXJzaGlwcyB3ZSBmb3JtLiBGb3IgdXMsIGl0J3MgcGVyc29uYWwuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBza3l3YXJkID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L3NreXdhcmQuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUzID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIFNFRSBXT1JLIElOIEEgRElGRkVSRU5UIExJR0hUXCIsXHJcbiAgICAgICAgXCJQZW9wbGUgbGlrZSB0byBhc2sgYWJvdXQgb3VyIGRlc2lnbiBwcm9jZXNzLiBUaGUgdHJ1dGggaXMgdGhhdCB0aGUgYXBwcm9hY2ggdG8gZWFjaCBwcm9qZWN0IHZhcmllcywgYmVjYXVzZSBlYWNoIGNsaWVudCBhbmQgdGhlaXIgbmVlZHMgYXJlIHVuaXF1ZS4gQ3JlYXRpdmUgYnJlYWt0aHJvdWdocyBkb24ndCBmb2xsb3cgdGhlIGNsb2NrLiBUaGV5IGNhbiBoYXBwZW4gYW55IHRpbWUgb2YgZGF5IOKAkyBvciBuaWdodC4gV2hldGhlciBhbiBlcGlwaGFueSBpcyBpbGx1bWluYXRlZCBpbiBhIHNjcmliYmxlLCBhIGRyZWFtLCBvciBhcyB0aGUgY2xvdWRzIHJvbGwgYnksIHdlIGVtYnJhY2UgdGhlIGZhY3QgdGhhdCBlYWNoIHByb2plY3QgdGFrZXMgb24gYSBsaWZlIG9mIGl0cyBvd24uXCIsXHJcbiAgICAgICAgXCJXaGF0J3MgY29uc3RhbnQgaXMgb3VyIGFiaWxpdHkgdG8gbGlzdGVuIGFuZCBmb2N1cywgdG8gYW5hbHl6ZSBhbmQgY29ubmVjdCBkb3RzLCBhbmQgdG8gcmVtYWluIGN1cmlvdXMuIFRoZSBtb3N0IHJld2FyZGluZyBwcm9qZWN0cyBhcmUgd2l0aCBjbGllbnRzIHdobyB2YWx1ZSB0aGUgYmFsYW5jZSBiZXR3ZWVuIHB1c2hpbmcgZm9yd2FyZCBhbmQgYWxsb3dpbmcgdGltZSBmb3IgdGhlIHBlcmZlY3Qgc29sdXRpb24gdG8gZW1lcmdlLiBUaGF0J3Mgb3VyIGhhcHB5IHBsYWNlLlwiXHJcbiAgICApO1xyXG5cclxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChob21lLCAwLjk1KTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChob3Jpem9uLCAxKTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChmcmVzaExvb2ssIDAuOCk7XHJcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlMSwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XHJcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlMiwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XHJcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlMywgbWFqb3JTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgSE9NRV9IT1JJWk9OX1BBRCA9IDAuMjtcclxuICAgICAgICBjb25zdCBGUkVTSF9MT09LX1BBRCA9IDAuMTM7XHJcbiAgICAgICAgY29uc3QgSU1BR0VfVEVYVF9TUVVBUkVfUEFEID0gMC4xNztcclxuXHJcbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKFtcclxuICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgSE9NRV9IT1JJWk9OX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICBGUkVTSF9MT09LX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICB0ZXh0VGlsZTEubWFqb3IsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMy5tYWpvcixcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUxLCAyMCwgMjApO1xyXG4gICAgICAgIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh0ZXh0VGlsZTIsIDIwLCAyMCk7XHJcbiAgICAgICAgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlMywgMjAsIDIwKTtcclxuXHJcbiAgICAgICAgc2V0TWF4U2Nyb2xsKHRleHRUaWxlMy5tYWpvcik7XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBlZmZlY3QsIFNpZ25hbCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IGFuaW1hdGVTcHJpbmcsIFNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBib2R5LCBib2R5U2lnLCBjZW50ZXJWZXJ0aWNhbCwgZ2V0U2Nyb2xsSGVpZ2h0LCBtYXBSYW5nZSwgb25OYXZPcHRpb25DbGljaywgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCBzcGFjZVRvRmlsZSwgc3R1cGlkQXNwZWN0R2FyYmFnZSwgeEFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmludGVyZmFjZSBXb3JrSXRlbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdbXTtcbn1cblxuY29uc3Qgd29ya0l0ZW1zOiBXb3JrSXRlbVtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJiZXJ3eW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiSGF2aW5nIHNwZW50IGhpcyBlbnRpcmUgY2hpbGRob29kIG1ha2luZyBmaWxtcywgdGhpcyBjb21wYW55J3MgZm91bmRlciBuYW1lZCBoaXMgYWdlbmN5IGFmdGVyIHRoZSBzdHJlZXQgb24gd2hpY2ggaGUgd2FzIHJhaXNlZC4gV2l0aCBhIGhpc3RvcnkgbGlrZSB0aGF0LCB3ZSBoYWQgdG8gZWxldmF0ZSBCZXJ3eW4gdG8gbGFuZG1hcmsgc3RhdHVzLiBVc2luZyBjdXN0b20gcGhvdG9ncmFwaHkgYW5kIG1hc3RlciBtYW5pcHVsYXRpb24sIHdlIGNyZWF0ZWQgYSBmbGV4aWJsZSBzdGlja2VyIHN5c3RlbSB0aGF0IGlzIGludGVyY2hhbmdlYWJsZSB3aXRoIG11bHRpLWNvbG9yZWQgcGFwZXIgc3RvY2tzLiBFbXBsb3llZXMgYXJlIGVuY291cmFnZWQgdG8gZGVzaWduIHRoZWlyIG93biBjb21tdW5pY2F0aW9ucyBhbmQgZ2V0IGEgY29tcGxldGUgc2VyaWVzIG9mIGF3YXJkLXdpbm5pbmcgYnVzaW5lc3MgY2FyZHMgdG8gY2hvb3NlIGZyb20uXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBGaWxtLCBUZWxldmlzaW9uLCBWaWRlbyBQcm9kdWN0aW9uXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiazIga3J1cHBcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBhd2FyZC13aW5uaW5nLCBOZXcgWW9yayBDaXR5IHB1YmxpYyByZWxhdGlvbnMgYW5kIG1hcmtldGluZyBhZ2VuY3kgaGFzIGEgc3VjY2Vzc2Z1bCB0cmFjayByZWNvcmQgaW4gaWduaXRpbmcgYnJhbmRzIGZyb20gc3RhcnQtdXBzLCBuZXcgYXV0aG9ycywgYW5kIGNlbGVicml0aWVzIGJ5IGNvbm5lY3RpbmcgdGhlbSB3aXRoIGN1bHR1cmFsIHRyZW5kcyBhbmQgaW5mbHVlbmNlcnMuIFdoZW4gaXQgY2FtZSB0byByZXByZXNlbnRpbmcgdGhlaXIgYnJhbmQsIEsyIGNhbWUgdG8gdXMuIEJvbGQsIHZpYnJhbnQsIGFuZCBkeW5hbWljLCB0aGlzIHRpbWVsZXNzIGlkZW50aXR5IHN5c3RlbSByZWZsZWN0cyB0aGUgZm91bmRlcidzIGZhdm9yaXRlIGNvbG9yIGFuZCB0aGUgY29tcGFueSdzIGVuZXJnZXRpYyBjdWx0dXJlIGFuZCBlbnZpcm9ubWVudC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFB1YmxpYyBSZWxhdGlvbnMgJiBNYXJrZXRpbmcgZm9yIE1lZGlhXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2h5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBZnRlciBzdWNjZXNzZnVsbHkgYnJhbmRpbmcgdGhlaXIgZmlyc3QgZWF0ZXJ5LCB0aGlzIGNsaWVudCByZXR1cm5lZCB0byB1cyB0byByZWFsaXplIHRoZWlyIGRyZWFtIG9mIGFuIHVwc2NhbGUsIFVwcGVyIFdlc3QgU2lkZSBlYXRpbmcgZGVzdGluYXRpb24uXCIsXG4gICAgICAgICAgICBcIlRoZSBjdXN0b20gbGV0dGVyZm9ybSBpcyBhIHdoaW1zaWNhbCBwbGF5IG9uIHRoZWlyIHVuaXF1ZSBzcGVsbGluZyBhbmQgY2FuIHJlYWQgdXBzaWRlIGRvd24uIFRoZSB2aWJyYW50IGNvbG9yIHBhbGV0dGUgd2FzIGRldmVsb3BlZCBpbiBwYXJ0bmVyc2hpcCB3aXRoIHRoZSBpbnRlcmlvciBhcmNoaXRlY3R1cmUgdGVhbSB0byBjcmVhdGUgYSB3YXJtIGFuZCBleGNpdGluZyBhdG1vc3BoZXJlLiBUaGUgY3VzdG9tIGRpZS1jdXQgZWRnZSBvZiB0aGUgaWRlbnRpdHkgc3lzdGVtIG1pbWljcyB0aGUgY3VydmUgb2YgdGhlIHVuaXF1ZSwgc2hvd2Nhc2UgYmFyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUmVzdGF1cmFudCAmIEJhclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImFubiBzdWxsaXZhblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBbm4gZHJlYW1lZCBvZiBiZWluZyDigJx0aGUgT3ByYWjigJ0gb2Ygb3JnYW5pemluZy4gV2UgZXN0YWJsaXNoZWQgaGVyIG5hbWUgYXMgdGhlIGJyYW5kIGFuZCBjcmVhdGVkIGEgdGFnbGluZSwgd2hpY2ggcmVmbGVjdGVkIHRoZSBwZWFjZSBvZiBtaW5kIHRoYXQgaGVyIGNsaWVudHMgZ2V0IGZyb20gaGF2aW5nIGFuZCBtYWludGFpbmluZyBhbiBvcmdhbml6ZWQgbGlmZS4gVGhlIHNpbXBsZSBpY29uIHNlcmllcyByZXByZXNlbnRzIGVhY2ggYXJlYSBvZiBleHBlcnRpc2UuIEFzIHRoZSBjb21wYW55J3Mgc2VydmljZXMgaGF2ZSBleHBhbmRlZCBvdmVyIHRoZSB5ZWFycywgdGhlIGlkZW50aXR5IHN5c3RlbSBoYXMgZXZvbHZlZCBhbG9uZyB3aXRoIGl0IGFuZCByZW1haW5zIGFzIGZyZXNoIGFzIGl0IHdhcyBkYXkgb25lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHJvZmVzc2lvbmFsIE9yZ2FuaXppbmdcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJsb2FcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBwcm9mZXNzaW9uYWwgbWFrZS11cCBhcnRpc3QgdGVhbSBjYW1lIHRvIHVzIHRvIGJyYW5kIHRoZWlyIHBhdGVudGVkIOKAnHdhdGVyc2xpZGXigJ0gZXllIHBlbmNpbC4gQ29sb3IgbmFtZXMgbGlrZSDigJxHaXZpbmcgQmFjayBCbGFjayzigJ0gcmVmbGVjdCB0aGUgY29tcGFueSdzIGNvbW1pdG1lbnQgdG8gcHJvdmlkaW5nIG1ha2VvdmVycyBmb3Igd29tZW4gZmFjaW5nIGhlYWx0aCBjaGFsbGVuZ2VzLiBUaGUgcGxheWZ1bCBwYWNrYWdpbmcgZWxldmF0ZXMgYSBzdGFwbGUgcHJvZHVjdCB0byBnaWZ0IHdvcnRoeSBhbmQgZ2VuZXJhdGVzIGF0dGVudGlvbiBpbiBhIHNhdHVyYXRlZCBtYXJrZXQgYnkgZmx5aW5nIGFib3ZlIGl0cyBkaXNwbGF5IGNhc2UuIFRoZSBtb3RpZiBob2xkcyBzcGVjaWFsIG1lYW5pbmcgZm9yIHRoZSBmb3VuZGVyIHdobyBzaGFyZWQgd2l0aCB1cyB0aGF0IHRoZSBidXR0ZXJmbHkgaXMgYSBzaWduIHRoYXQgaGVyIGJlbG92ZWQgbW90aGVyIGlzIHN0aWxsIHdpdGggaGVyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogQmVhdXR5ICYgQ29zbWV0aWNzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2V0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgTWFzdGVyIEFyY2hpdGVjdCBhbmQgd29ybGQtcmVub3duZWQgc3BhIGRlc2lnbmVyIHVzZWQgaGlzIHJlcHV0YXRpb24gYW5kIGV4cGVydGlzZSBpbiBoeWRyb3RoZXJhcHkgdG8gbGF1bmNoIGFuIGV4Y2x1c2l2ZSBwcm9kdWN0IGxpbmUgZm9yIGx1eHVyeSBob3RlbHMgYW5kIHJlc29ydHMuIEEgc29vdGhpbmcsIG11dGVkIGNvbG9yIHBhbGV0dGUgd2FzIGRlc2lnbmVkIHRvIHJlZmxlY3QgdGhlIHNjZW50IHByb2ZpbGUgb2YgZWFjaCBzZXJpZXMgb2Ygc2NydWJzIGFuZCBsb3Rpb25zLiBBdXRoZW50aWMgd2F0ZXIgc3BsYXNoIHBob3RvZ3JhcGh5IHNldCB0aGUgdG9uZSB0byBwcm9tb3RlIHRoZSBoZWFsdGggYmVuZWZpdHMgYW5kIGFydCBvZiBiYXRoaW5nLiBUaGUgcGFja2FnZSBkZXNpZ24gZXhwYW5kZWQgdG8gZ2lmdCBhbmQgdHJhdmVsIHNldHMgdGhhdCBpbnZpdGUgZ3Vlc3RzIHRvIHRha2UgdGhlIGx1eHVyeSBleHBlcmllbmNlIGhvbWUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBIZWFsdGggJiBXZWxsbmVzcyBTcGFzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiZmVycmFnYW1vXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRhc2tlZCB3aXRoIG1hcmtldGluZyBvZmZpY2Ugc3BhY2UgYWJvdmUgdGhpcyBsdXh1cnkgYnJhbmQncyBGaWZ0aCBBdmVudWUgZmxhZ3NoaXAsIHdlIGZhY2VkIHRoZSBjaGFsbGVuZ2Ugb2YgYW4gdW5rbm93biwgc2lkZSBzdHJlZXQgZW50cmFuY2UuIEhhbmRlZCBub3RoaW5nIG1vcmUgdGhhbiBhbiBhcmNoaXRlY3QncyByZW5kZXJpbmcsIHdlIGVsZWdhbnRseSBicmFuZGVkIHRoZSBhZGRyZXNzLCBjYXB0dXJlZCB0aGUgZW5lcmd5IG9mIHRoZSBsb2NhdGlvbiwgYW5kIGdlbmVyYXRlZCBlbm91Z2ggYnV6eiB0byBleHBhbmQgdGhlIHZpZXdpbmcgcGFydHkgdG8gdHdvIGRhdGVzIGJ5IGx1cmluZyBicm9rZXJzIHdpdGggdGhlIHByb21pc2Ugb2YgYSBGZXJyYWdhbW8gdGllLiBUaGUgcmVzdWx0cyB3ZXJlIGEgcXVpY2sgY2xvc2luZyBhbmQgYSBmZWF0dXJlIGFydGljbGUgaW4gQ3JhaW4ncyBOWSBCdXNpbmVzcyBjaXRpbmcgb3VyIGlubm92YXRpb24gYW5kIHN1Y2Nlc3MgaW4gYSBjaGFsbGVuZ2luZyByZWFsIGVzdGF0ZSBtYXJrZXQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJpZXM6IEx1eHVyeSBGYXNoaW9uLCBSZWFsIEVzdGF0ZVwiLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuLy8gY29uc3QgYWRkU2Nyb2xsVGV4dFNxdWFyZUZvcldvcmsgPSBhbGlnblNjcm9sbFRleHRTcXVhcmUoXG4vLyAgICAge1xuLy8gICAgICAgICBsZXR0ZXJTcGFjaW5nOiAyLjIsXG4vLyAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbi8vICAgICAgICAgY29sb3I6IFwiIzMzMzMzM1wiLFxuLy8gICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjA2NSxcbi8vICAgICAgICAgd2lkdGhTY2FsZTogMSxcbi8vICAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA5LFxuLy8gICAgIH0sXG4vLyAgICAgMjAsXG4vLyAgICAge1xuLy8gICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjIsXG4vLyAgICAgICAgIGZvbnRXZWlnaHQ6IDMwMCxcbi8vICAgICAgICAgY29sb3I6IFwiIzMzMzMzM1wiLFxuLy8gICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjAzLFxuLy8gICAgICAgICB3aWR0aFNjYWxlOiAxLFxuLy8gICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4vLyAgICAgfSxcbi8vICAgICAyMFxuLy8gKTtcblxuZnVuY3Rpb24gY2xpY2tlZEFueVRhYigpIHtcbiAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW107XG5cbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHdvcmtJdGVtcykge1xuICAgICAgICBjb25zdCB0aWxlID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShpdGVtLm5hbWUudG9VcHBlckNhc2UoKSwgLi4uaXRlbS5kZXNjcmlwdGlvbik7XG4gICAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgdGlsZS5tYWpvcixcbiAgICAgICAgICAgIDAuMiAqIHMsXG4gICAgICAgICAgICBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKGl0ZW0ubmFtZSl9LzEuanBnYCksXG4gICAgICAgICAgICAwLjE1ICogcyxcbiAgICAgICAgICAgIGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUoaXRlbS5uYW1lKX0vMi5qcGdgKSxcbiAgICAgICAgICAgIDAuMjIgKiBzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9LCBbYm9keVNpZ10pO1xufVxuXG5pbnRlcmZhY2UgV29ya1RhYiB7XG4gICAgdGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBzcHJpbmc6IFNwcmluZztcbiAgICBzcHJpbmdTaWc6IFNpZ25hbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2V29yaygpIHtcbiAgICBjb25zdCB3b3JrVGFiczogV29ya1RhYltdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrSXRlbSA9IHdvcmtJdGVtc1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtJdGVtLm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgYm9keS5hcHBlbmQodGFiRWxlbWVudCk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5LnJlbW92ZUNoaWxkKHRhYkVsZW1lbnQpKTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxMDAwKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IC0wLjE7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnLCAwLjAxKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAwO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZywgMC4wMSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgobWFwUmFuZ2Uoc3ByaW5nLnBvc2l0aW9uLCAwLCAxLCAod2luZG93LmlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC5jbGllbnRIZWlnaHQpIC8gMiwgd2luZG93LmlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCAvIDIpKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZywgYm9keVNpZ10pO1xuICAgICAgICBzcHJpbmdTaWcudXBkYXRlKCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0gb2Ygd29ya1RhYnMpIHtcbiAgICAgICAgICAgICAgICBzcHJpbmcuc3RpZmZuZXNzID0gODAwO1xuICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcsIDAuMDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGlja2VkQW55VGFiKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd29ya1RhYnMucHVzaCh7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0pO1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IDE7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcsIDAuMDEpO1xuICAgICAgICB9LCA4MCAqIGkpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lb3V0SGFuZGxlKSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQgfSA9IHdvcmtUYWJzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IDMwMDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gMTUwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IChlbmQgLSBzdGFydCkgLyAod29ya1RhYnMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gd2luZG93LmlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGspIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChrKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoayAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCBlbGVtZW50U2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBjbGlja05hdkNvbm5lY3QgfSBmcm9tIFwiLi9wYWdlcy9jb25uZWN0XCI7XG5pbXBvcnQgeyBjbGlja05hdkV2b2x1dGlvbiB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xuaW1wb3J0IHsgY2xpY2tOYXZJbnNwaXJhdGlvbiB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdlZpZXcgfSBmcm9tIFwiLi9wYWdlcy92aWV3XCI7XG5pbXBvcnQgeyBjbGlja05hdldvcmsgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XG5cbmV4cG9ydCBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmV4cG9ydCBjb25zdCBib2R5U2lnID0gZWxlbWVudFNpZ25hbChib2R5KTtcblxuZXhwb3J0IGNvbnN0IGllQmx1ZSA9IFwiIzYwOUNDRVwiO1xuXG5leHBvcnQgY29uc3Qgdmlld05hdiA9IGcoXCJuYXYtdmlld1wiKTtcbmV4cG9ydCBjb25zdCB3b3JrTmF2ID0gZyhcIm5hdi13b3JrXCIpO1xuZXhwb3J0IGNvbnN0IGluc3BpcmF0aW9uTmF2ID0gZyhcIm5hdi1pbnNwaXJhdGlvblwiKTtcbmV4cG9ydCBjb25zdCBldm9sdXRpb25OYXYgPSBnKFwibmF2LWV2b2x1dGlvblwiKTtcbmV4cG9ydCBjb25zdCBjb25uZWN0TmF2ID0gZyhcIm5hdi1jb25uZWN0XCIpO1xuXG5leHBvcnQgY29uc3QgbmF2SXRlbXMgPSBbdmlld05hdiwgd29ya05hdiwgaW5zcGlyYXRpb25OYXYsIGV2b2x1dGlvbk5hdiwgY29ubmVjdE5hdl07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDbGlwID0gZyhcInNjcm9sbC1jbGlwXCIpO1xuZXhwb3J0IGNvbnN0IHNjcm9sbGFibGVJdGVtcyA9IGcoXCJzY3JvbGxhYmxlLWl0ZW1zXCIpO1xuXG5leHBvcnQgY29uc3QgbG9nbyA9IGcoXCJsb2dvXCIpO1xuXG5leHBvcnQgY29uc3QgZ2xvYmFsU1ZHID0gZyhcImdsb2JhbC1zdmdcIik7XG5cbmV4cG9ydCBjb25zdCBzbGVlcCA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gPSAwLjk1O1xuXG5leHBvcnQgbGV0IG9uTmF2T3B0aW9uQ2xpY2s6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbmludGVyZmFjZSBFbGVtZW50QWxpZ25tZW50IHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb2ludCB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGcoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R1cGlkQXNwZWN0R2FyYmFnZShlbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgLy8gaSBmdWNraW5nIGhhdGUgdGhpcyBsYXlvdXQgZW5naW5lXG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KChlbGVtZW50Lm5hdHVyYWxXaWR0aCAvIGVsZW1lbnQubmF0dXJhbEhlaWdodCkgKiBlbGVtZW50LmNsaWVudEhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJJbWFnZVNjYWxlZChpbWFnZTogSFRNTEltYWdlRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IGhlaWdodCA9IHNjcm9sbENsaXAuY2xpZW50SGVpZ2h0ICogc2NhbGU7XG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBzdHVwaWRBc3BlY3RHYXJiYWdlKGltYWdlKTtcbiAgICBpbWFnZS5zdHlsZS50b3AgPSBweCgoc2Nyb2xsQ2xpcC5jbGllbnRIZWlnaHQgLSBoZWlnaHQpIC8gMik7XG59XG5cbmV4cG9ydCBsZXQgd2FpdGluZyA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxJbWFnZShzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IHNjcm9sbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBzY3JvbGxJbWFnZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxJbWFnZS5zcmMgPSBzcmM7XG4gICAgd2FpdGluZysrO1xuICAgIHNjcm9sbEltYWdlLm9ubG9hZCA9ICgpID0+IHdhaXRpbmctLTtcbiAgICBzY3JvbGxhYmxlSXRlbXMuYXBwZW5kKHNjcm9sbEltYWdlKTtcbiAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gc2Nyb2xsYWJsZUl0ZW1zLnJlbW92ZUNoaWxkKHNjcm9sbEltYWdlKSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsSW1hZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBSYW5nZShuOiBudW1iZXIsIHN0YXJ0MTogbnVtYmVyLCBzdG9wMTogbnVtYmVyLCBzdGFydDI6IG51bWJlciwgc3RvcDI6IG51bWJlcikge1xuICAgIHJldHVybiAoKG4gLSBzdGFydDEpIC8gKHN0b3AxIC0gc3RhcnQxKSkgKiAoc3RvcDIgLSBzdGFydDIpICsgc3RhcnQyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIC8vIHJldHVybiBzY3JvbGxhYmxlSXRlbXMuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuNztcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICogU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OOyAvLyBUT0RPIHRoaXMgc2hvdWxkIGp1c3QgdXNlIGFjdHVhbCBzY3JvbGwgaGVpZ2h0XG59XG5cbmZ1bmN0aW9uIGNsaWNrQW55TmF2KG5hdkl0ZW06IEhUTUxFbGVtZW50LCBmOiAoKSA9PiB2b2lkKSB7XG4gICAgbmF2SXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcblxuICAgIG5hdkl0ZW0ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgc2Nyb2xsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG9uTmF2T3B0aW9uQ2xpY2spIHUoKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljayA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBuYXZJdGVtcykge1xuICAgICAgICAgICAgbi5zdHlsZS5jb2xvciA9IFwiIzgwODA4MFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG4gICAgICAgIGYoKTtcblxuICAgICAgICBzY3JvbGwgPSAwO1xuICAgICAgICB1cGRhdGVTY3JvbGwoKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyVmVydGljYWwoaXRlbTogSFRNTEVsZW1lbnQsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB5IC0gaXRlbS5jbGllbnRIZWlnaHQgLyAyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25XaXRoR2FwKGxlZnRFbGVtZW50OiBIVE1MRWxlbWVudCwgcmlnaHRFbGVtZW50OiBIVE1MRWxlbWVudCwgZ2FwOiBudW1iZXIpIHtcbiAgICByaWdodEVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KGxlZnRFbGVtZW50Lm9mZnNldExlZnQgKyBsZWZ0RWxlbWVudC5jbGllbnRXaWR0aCArIGdhcCk7XG59XG5cbmludGVyZmFjZSBTY3JvbGxUZXh0RGV0YWlscyB7XG4gICAgbGV0dGVyU3BhY2luZzogbnVtYmVyO1xuICAgIGZvbnRXZWlnaHQ6IG51bWJlcjtcbiAgICBjb2xvcjogc3RyaW5nO1xuXG4gICAgZm9udFNpemVTY2FsZTogbnVtYmVyO1xuICAgIHdpZHRoU2NhbGU6IG51bWJlcjtcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHNjcm9sbFRleHQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICBzY3JvbGxhYmxlSXRlbXMuYXBwZW5kKHNjcm9sbFRleHQpO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxhYmxlSXRlbXMucmVtb3ZlQ2hpbGQoc2Nyb2xsVGV4dCkpO1xuXG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHQoc2Nyb2xsVGV4dDogSFRNTEVsZW1lbnQsIHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSBcIlwiICsgcy5mb250V2VpZ2h0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuY29sb3IgPSBzLmNvbG9yO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGV0dGVyU3BhY2luZyA9IHB4KHMubGV0dGVyU3BhY2luZyk7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRTaXplID0gcHgoc2Nyb2xsSGVpZ2h0ICogcy5mb250U2l6ZVNjYWxlKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLndpZHRoID0gcHgoc2Nyb2xsSGVpZ2h0ICogcy53aWR0aFNjYWxlKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKiBzLmxpbmVIZWlnaHRTY2FsZSk7XG59XG5cbmZ1bmN0aW9uIGF4aXNBbGlnbmluZ1dpdGhHYXBzKGF4aXNTaXplOiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IG51bWJlcikge1xuICAgIHJldHVybiAoZWxlbWVudE9yR2FwczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdKTogW0VsZW1lbnRBbGlnbm1lbnRbXSwgbnVtYmVyXSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRBbGlnbm1lbnRzID0gW107XG4gICAgICAgIGxldCBydW5uaW5nVG90YWwgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnRPckdhcCBvZiBlbGVtZW50T3JHYXBzKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudE9yR2FwIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50QWxpZ25tZW50cy5wdXNoKHsgZWxlbWVudDogZWxlbWVudE9yR2FwLCBvZmZzZXQ6IHJ1bm5pbmdUb3RhbCB9KTtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gYXhpc1NpemUoZWxlbWVudE9yR2FwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGVsZW1lbnRPckdhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2VsZW1lbnRBbGlnbm1lbnRzLCBydW5uaW5nVG90YWxdO1xuICAgIH07XG59XG5cbmV4cG9ydCBjb25zdCB5QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudEhlaWdodCk7XG5leHBvcnQgY29uc3QgeEFsaWduaW5nV2l0aEdhcHMgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5jbGllbnRXaWR0aCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0U3F1YXJlKG1ham9yVGV4dDogc3RyaW5nLCAuLi5taW5vclRleHRzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9ycyA9IG1pbm9yVGV4dHMubWFwKGFkZFNjcm9sbFRleHQpO1xuICAgIHJldHVybiB7IG1ham9yLCBtaW5vcnMgfTtcbn1cblxuaW50ZXJmYWNlIFNjcm9sbFRleHRTcXVhcmUge1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcnM6IEhUTUxFbGVtZW50W107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFNjcm9sbFRleHRTcXVhcmUsIG1ham9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscykge1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyk7XG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlclVwZGF0ZUxheW91dCh1cGRhdGVMYXlvdXQ6ICgpID0+IHZvaWQpIHtcbiAgICBlZmZlY3QodXBkYXRlTGF5b3V0LCBbYm9keVNpZ10pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dCkpO1xuXG4gICAgLy8gVE9ETyB0aGlzIGlzIGFib2x1dGUgZGlzZ3VzdGluZyBnYXJiYWdlLiBuZWVkIHRvIHdhaXQgZm9yIGltYWdlcyB0byBsb2FkXG4gICAgY29uc3QgZ3VoID0gKCkgPT4ge1xuICAgICAgICBpZiAod2FpdGluZykge1xuICAgICAgICAgICAgc2V0VGltZW91dChndWgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXBkYXRlTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGd1aCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBTY3JvbGxUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IHlBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlVG9GaWxlKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoXCIgXCIsIFwiLVwiKTtcbn1cblxuLy8gcmVhbCBzdHVmZlxuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxlZnRBbGlnbiA9IDgwO1xuICAgIGxvZ28uc3R5bGUud2lkdGggPSBweCg1NSk7XG4gICAgbG9nby5zdHlsZS5oZWlnaHQgPSBweCg1NSk7XG4gICAgbG9nby5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KGxlZnRBbGlnbiAvIDIpO1xuXG4gICAgZnVuY3Rpb24gYWxpZ25OYXZJdGVtKG5hdkl0ZW06IEhUTUxFbGVtZW50LCBudWRnZTogbnVtYmVyKSB7XG4gICAgICAgIG5hdkl0ZW0uc3R5bGUubGVmdCA9IHB4KGxlZnRBbGlnbik7XG4gICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgod2luZG93LmlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xuICAgIH1cblxuICAgIGFsaWduTmF2SXRlbSh2aWV3TmF2LCAtMik7XG4gICAgYWxpZ25OYXZJdGVtKHdvcmtOYXYsIC0xKTtcbiAgICBhbGlnbk5hdkl0ZW0oaW5zcGlyYXRpb25OYXYsIDApO1xuICAgIGFsaWduTmF2SXRlbShldm9sdXRpb25OYXYsIDEpO1xuICAgIGFsaWduTmF2SXRlbShjb25uZWN0TmF2LCAyKTtcbn0sIFtib2R5U2lnXSk7XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgeCA9IDI4MDtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0KTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLndpZHRoID0gcHgod2luZG93LmlubmVyV2lkdGggLSB4KTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLnRvcCA9IHB4KGNlbnRlclZlcnRpY2FsKHNjcm9sbENsaXAsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpKTtcbiAgICBzY3JvbGxDbGlwLnN0eWxlLmxlZnQgPSBweCh4KTtcblxuICAgIHNjcm9sbGFibGVJdGVtcy5zdHlsZS53aWR0aCA9IHB4KDEwMCk7XG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLmhlaWdodCA9IHB4KDEwMCk7XG59LCBbYm9keVNpZ10pO1xuXG5sZXQgc2Nyb2xsID0gMDtcblxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsKCkge1xuICAgIHNjcm9sbGFibGVJdGVtcy5zdHlsZS5sZWZ0ID0gcHgoLXNjcm9sbCk7XG59XG5cbmxldCBtYXhTY3JvbGwgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF4U2Nyb2xsKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbWF4U2Nyb2xsID0gZWxlbWVudC5vZmZzZXRMZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCAtIHNjcm9sbENsaXAub2Zmc2V0V2lkdGggKyAxMDA7XG59XG53aW5kb3cub253aGVlbCA9IChlKSA9PiB7XG4gICAgc2Nyb2xsICs9IGUuZGVsdGFYICsgZS5kZWx0YVk7XG4gICAgaWYgKHNjcm9sbCA8IDApIHNjcm9sbCA9IDA7XG4gICAgaWYgKHNjcm9sbCA+IG1heFNjcm9sbCkgc2Nyb2xsID0gbWF4U2Nyb2xsO1xuICAgIHVwZGF0ZVNjcm9sbCgpO1xufTtcblxuY2xpY2tBbnlOYXYobG9nbywgY2xpY2tOYXZWaWV3KTtcblxuY2xpY2tBbnlOYXYodmlld05hdiwgY2xpY2tOYXZWaWV3KTtcbmNsaWNrQW55TmF2KHdvcmtOYXYsIGNsaWNrTmF2V29yayk7XG5jbGlja0FueU5hdihpbnNwaXJhdGlvbk5hdiwgY2xpY2tOYXZJbnNwaXJhdGlvbik7XG5jbGlja0FueU5hdihldm9sdXRpb25OYXYsIGNsaWNrTmF2RXZvbHV0aW9uKTtcbmNsaWNrQW55TmF2KGNvbm5lY3ROYXYsIGNsaWNrTmF2Q29ubmVjdCk7XG5cbnNldFRpbWVvdXQoKCkgPT4gdmlld05hdi5jbGljaygpKTtcbiIsImV4cG9ydCBjbGFzcyBTaWduYWwge1xyXG4gICAgc3Vic2NyaWJlcnM6ICgoKSA9PiB2b2lkKVtdID0gW107XHJcblxyXG4gICAgc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgocykgPT4gcygpKTtcclxuICAgIH1cclxuXHJcbiAgICB1bnN1YnNjcmliZShzdWJzY3JpYmVyOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycyA9IHRoaXMuc3Vic2NyaWJlcnMuZmlsdGVyKChzKSA9PiBzICE9PSBzdWJzY3JpYmVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdChmdW5jOiAoKSA9PiB2b2lkLCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKSB7XHJcbiAgICBvYnNlcnZlZFNpZ25hbHMuZm9yRWFjaCgobykgPT4gby5zdWJzY3JpYmUoZnVuYykpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYm91bmQ8VD4oZnVuYzogKCkgPT4gVCwgb2JzZXJ2ZWRTaWduYWxzOiBTaWduYWxbXSk6IFtULCBTaWduYWxdIHtcclxuICAgIGNvbnN0IHNpZ25hbCA9IG5ldyBTaWduYWwoKTtcclxuICAgIGNvbnN0IG9iaiA9IGZ1bmMoKTtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvYnNlcnZlZFNpZ25hbCkgPT5cclxuICAgICAgICBvYnNlcnZlZFNpZ25hbC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKG9iaiBhcyBvYmplY3QsIGZ1bmMoKSk7XHJcbiAgICAgICAgICAgIHNpZ25hbC51cGRhdGUoKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICAgIHJldHVybiBbb2JqLCBzaWduYWxdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudFNpZ25hbChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICBjb25zdCBlbGVtZW50T2JzID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgbmV3IFJlc2l6ZU9ic2VydmVyKChfKSA9PiB7XHJcbiAgICAgICAgZWxlbWVudE9icy51cGRhdGUoKTtcclxuICAgIH0pLm9ic2VydmUoZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudE9icztcclxufVxyXG4iLCJpbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpbmcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIHRhcmdldDogbnVtYmVyO1xyXG4gICAgdmVsb2NpdHkgPSAwO1xyXG4gICAgZGFtcGluZyA9IDA7XHJcbiAgICBzdGlmZm5lc3MgPSAwO1xyXG4gICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBteCcnIC0gYngnID0ga3hcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBpbml0aWFsVmFsdWU7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBpbml0aWFsVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGljayhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjZWxlcmF0aW9uID0gdGhpcy5zdGlmZm5lc3MgKiAodGhpcy50YXJnZXQgLSB0aGlzLnBvc2l0aW9uKSAtIHRoaXMuZGFtcGluZyAqIHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSArPSBhY2NlbGVyYXRpb24gKiBkdDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IHRoaXMudmVsb2NpdHkgKiBkdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGlmZm5lc3NDcml0aWNhbChzdGlmZm5lc3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RpZmZuZXNzID0gc3RpZmZuZXNzO1xyXG4gICAgICAgIHRoaXMuZGFtcGluZyA9IE1hdGguc3FydCg0ICogc3RpZmZuZXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsLCB0b2xlcmFuY2U6IG51bWJlcikge1xyXG4gICAgaWYgKHNwcmluZy5pc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IHRydWU7XHJcblxyXG4gICAgZnVuY3Rpb24gdGlja1NwcmluZygpIHtcclxuICAgICAgICBzcHJpbmcudGljaygxIC8gNjApO1xyXG4gICAgICAgIHNpZ25hbC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHNwcmluZy50YXJnZXQgLSBzcHJpbmcucG9zaXRpb24pIDwgdG9sZXJhbmNlICYmIE1hdGguYWJzKHNwcmluZy52ZWxvY2l0eSkgPCB0b2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgc3ByaW5nLnBvc2l0aW9uID0gc3ByaW5nLnRhcmdldDtcclxuICAgICAgICAgICAgc3ByaW5nLnZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrU3ByaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrU3ByaW5nKCk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3BhZ2VzL3ZpZXdcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy93b3JrXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9ldm9sdXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9jb25uZWN0XCI7XHJcblxyXG5pbXBvcnQgXCIuL3NoYXJlZFwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=