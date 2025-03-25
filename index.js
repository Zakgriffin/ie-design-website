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
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");

function clickNavEvolution() {
    const brandBuilt = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("brand-built.svg");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOc0I7QUFDQTtBQUNPO0FBQ0Y7QUFDRjtBQUVQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWUtd2Vic2l0ZS12Mi8uL3NyYy9wYWdlcy9jb25uZWN0LnRzIiwid2VicGFjazovL2llLXdlYnNpdGUtdjIvLi9zcmMvcGFnZXMvZXZvbHV0aW9uLnRzIiwid2VicGFjazovL2llLXdlYnNpdGUtdjIvLi9zcmMvcGFnZXMvaW5zcGlyYXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtd2Vic2l0ZS12Mi8uL3NyYy9wYWdlcy92aWV3LnRzIiwid2VicGFjazovL2llLXdlYnNpdGUtdjIvLi9zcmMvcGFnZXMvd29yay50cyIsIndlYnBhY2s6Ly9pZS13ZWJzaXRlLXYyLy4vc3JjL3NoYXJlZC50cyIsIndlYnBhY2s6Ly9pZS13ZWJzaXRlLXYyLy4vc3JjL3NpZ25hbC50cyIsIndlYnBhY2s6Ly9pZS13ZWJzaXRlLXYyLy4vc3JjL3NwcmluZy50cyIsIndlYnBhY2s6Ly9pZS13ZWJzaXRlLXYyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLXdlYnNpdGUtdjIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2llLXdlYnNpdGUtdjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pZS13ZWJzaXRlLXYyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtd2Vic2l0ZS12Mi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZDb25uZWN0KCkge31cbiIsImltcG9ydCB7IGFkZFNjcm9sbEltYWdlIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZFdm9sdXRpb24oKSB7XG4gICAgY29uc3QgYnJhbmRCdWlsdCA9IGFkZFNjcm9sbEltYWdlKFwiYnJhbmQtYnVpbHQuc3ZnXCIpO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSBcIi4uL3NpZ25hbFwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIGFsaWduV2l0aEdhcCwgYm9keVNpZywgY2VudGVySW1hZ2VTY2FsZWQsIGdldFNjcm9sbEhlaWdodCwgaWVCbHVlLCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHNldE1heFNjcm9sbCwgc3R5bGVTY3JvbGxUZXh0LCB5QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuY29uc3QgSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OID0gMC44NTtcblxuaW50ZXJmYWNlIEluc3BpcmF0aW9uVGlsZSB7XG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yOiBIVE1MRWxlbWVudDtcbiAgICByZWFkTW9yZTogSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNixcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDM2LFxuICAgICAgICB3aWR0aFNjYWxlOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04sXG4gICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjMsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDM1MCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjAyNyxcbiAgICAgICAgd2lkdGhTY2FsZTogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OLFxuICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQocmVhZE1vcmUsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC41LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBpZUJsdWUsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDMsXG4gICAgICAgIHdpZHRoU2NhbGU6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTixcbiAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA1LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICogMC41NSk7XG59XG5cbmZ1bmN0aW9uIGFsaWduSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgbWFqb3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgbWlub3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgcmVhZE1vcmUuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xuICAgICAgICBpbWFnZSwgLy9cbiAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgIG1ham9yLFxuICAgICAgICAtMC4wMSAqIHMsXG4gICAgICAgIG1pbm9yLFxuICAgICAgICAwLjAxICogcyxcbiAgICAgICAgcmVhZE1vcmUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBzICogMC4xNSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRJbnNwaXJhdGlvblRpbGUoaW1hZ2VTdHJpbmc6IHN0cmluZywgbWFqb3JUZXh0OiBzdHJpbmcsIG1pbm9yVGV4dDogc3RyaW5nKTogSW5zcGlyYXRpb25UaWxlIHtcbiAgICBjb25zdCBpbWFnZSA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3RyaW5nKTtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vciA9IGFkZFNjcm9sbFRleHQobWlub3JUZXh0KTtcbiAgICBjb25zdCByZWFkTW9yZSA9IGFkZFNjcm9sbFRleHQoXCJSZWFkIG1vcmVcIik7XG5cbiAgICByZXR1cm4geyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZJbnNwaXJhdGlvbigpIHtcbiAgICBjb25zdCBpbnNwaXJhdGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiaW5zcGlyYXRpb24vaW5zcGlyYXRpb24uc3ZnXCIpO1xuXG4gICAgY29uc3QgdGlsZXMgPSBbXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3l1bWllLmpwZ1wiLCBcIlRIRSBTVEFSVCBPRiBTT01FVEhJTkcgWVVNLUlFXCIsIFwiV2UgYWx3YXlzIHdhbnRlZCB0byBkZXNpZ24gY2hvY29sYXRlIGJhcnMgYW5kIGZpbmFsbHkgZGlkIGl0LiBJbnRyb2R1Y2luZyBvdXIgc3dlZXQgbmV3IGJyYW5kLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vd29yZHMtaWRlYXMuanBnXCIsIFwiU0hBUkUgU09NRSBERVNJR04gTE9WRVwiLCBcIlRoZSBpLmUuIGRlc2lnbiBwcm9tbyBqb3VybmFscyBlbmNvdXJhZ2UgY2xpZW50cyB0byBza2V0Y2ggdGhlaXIgYmlnIGlkZWFzIGFuZCBjYXB0dXJlIHRoZWlyIGRyZWFtcy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Nvb2staWUuanBnXCIsIFwiR09UVEEgTE9WRSBBIENPT0stSUVcIiwgXCJIb3cgYSBzZWNyZXQgcmVjaXBlIHdvcmtzIHRvIGJyaW5nIHJlbGF0aW9uc2hpcHMgdG8gYSB3aG9sZSBuZXcgbGV2ZWwuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZW1peC5qcGdcIiwgXCJSRU1JWFwiLCBcIkEgYmVoaW5kLXRoZS1zY2VuZXMgbG9vayBhdCBob3cgd2UgdHJhbnNmb3JtZWQgY2xhc3NpYyBtZW1vcnkgY2FycmllcnMgaW50byBvYmplY3RzIG9mIGFydC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2tyZW1wYS5wbmdcIiwgXCJSRUJSQU5ESU5HIEEgRkFNSUxZIEJVU0lORVNTXCIsIFwiQSByZWZyZXNoIGZvciBhIDUwLXllYXIgbGVnYWN5LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZm90b3N0b3JpLmpwZ1wiLCBcIkJSQU5ESU5HIEZST00gVEhFIE5BTUUgVVBcIiwgXCJXaGVuIGEgY2xpZW50IGhhZCBhbiBpZGVhIGZvciBhIGJyYW5kIHNwaW5vZmYsIHdlIHRvb2sgaGVyIGNvbmNlcHQgdG8gcmVhbGl0eSBhbmQgbGF1bmNoZWQgdGhlIGJ1c2luZXNzIGluIGhpZ2ggc3R5bGUuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9pbnNwaXJlZC0yLWNyZWF0ZS5qcGdcIiwgXCJJTlNQSVJFRCAyIENSRUFURVwiLCBcIkEgcGFpbnRpbmcgaW5zcGlyZWQgYnkgdGhlIGkuZS4gZGVzaWduIGxvZ28gY29tYmluZXMgb2lsIHBhaW50cywgZ3JvdW5kIHVwIGNyYXlvbnMsIGFuZCBhIGxlZ28uXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mcm9tLWluc2lkZS5qcGdcIiwgXCJUSEUgVklFVyBGUk9NIElOU0lERVwiLCBcImkuZS4gZGVzaWduJ3MgbmV3IHN0dWRpbyB3YXMgMzAgeWVhcnMgaW4gdGhlIG1ha2luZy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlY29ubmVjdGluZy5qcGdcIiwgXCJSRUNPTk5FQ1RJTkdcIiwgXCJIb3cgdW5jZXJ0YWluIHRpbWVzIGxlZCB0byBhIGhvbWVjb21pbmcgZm9yIGkuZS4gZGVzaWduJ3Mgc2VuaW9yIGRlc2lnbmVyLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vbmV3LXN0dWRpby5qcGdcIiwgXCJORVcgU1RVRElPLiBORVcgVklFVy5cIiwgXCJIb3cgdGhlIG5lZWQgZm9yIGluc3BpcmF0aW9uIGZ1ZWxlZCB0aGUgYnVpbGRpbmcgb2YgYSBzdHVkaW8uXCIpLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChpbnNwaXJhdGlvbiwgMC43NSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBzdHlsZUluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBhbGlnbldpdGhHYXAoaW5zcGlyYXRpb24sIHRpbGVzWzBdLmltYWdlLCBzICogMC4yNSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoIC0gMTsgaSsrKSBhbGlnbldpdGhHYXAodGlsZXNbaV0uaW1hZ2UsIHRpbGVzW2kgKyAxXS5pbWFnZSwgcyAqIDAuMSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBhbGlnbkluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBzZXRNYXhTY3JvbGwodGlsZXNbdGlsZXMubGVuZ3RoIC0gMV0uaW1hZ2UpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04sIHhBbGlnbmluZ1dpdGhHYXBzLCBjZW50ZXJJbWFnZVNjYWxlZCwgYWRkU2Nyb2xsSW1hZ2UsIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlLCByZWdpc3RlclVwZGF0ZUxheW91dCwgc2V0TWF4U2Nyb2xsIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xyXG5cclxuY29uc3QgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyA9IHtcclxuICAgIGxldHRlclNwYWNpbmc6IDIuMixcclxuICAgIGZvbnRXZWlnaHQ6IDQwMCxcclxuICAgIGNvbG9yOiBcIiNCM0IzQjNcIixcclxuICAgIGZvbnRTaXplU2NhbGU6IDAuMDY1LFxyXG4gICAgd2lkdGhTY2FsZTogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04sXHJcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDksXHJcbn07XHJcblxyXG5jb25zdCBtaW5vclNjcm9sbFRleHREZXRhaWxzID0ge1xyXG4gICAgbGV0dGVyU3BhY2luZzogMC4yLFxyXG4gICAgZm9udFdlaWdodDogMzAwLFxyXG4gICAgY29sb3I6IFwiIzAwMDAwMFwiLFxyXG4gICAgZm9udFNpemVTY2FsZTogMC4wMyxcclxuICAgIHdpZHRoU2NhbGU6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OLFxyXG4gICAgbGluZUhlaWdodFNjYWxlOiAwLjA1LFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2VmlldygpIHtcclxuICAgIGNvbnN0IGhvbWUgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9tZS5zdmdcIik7XHJcbiAgICBjb25zdCBob3Jpem9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvcml6b24uanBnXCIpO1xyXG4gICAgY29uc3QgZnJlc2hMb29rID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2ZyZXNoLWxvb2suc3ZnXCIpO1xyXG4gICAgY29uc3QgZ3JlYXRCcmFuZHMgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZ3JlYXQtYnJhbmRzLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMSA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJHUkVBVCBCUkFORFMgRE9OJ1QgSlVTVCBIQVBQRU5cIixcclxuICAgICAgICBcIlRoZXkgcmVxdWlyZSBleHBsb3JhdGlvbiwgaW5zaWdodCwgYW5kIHRlbmFjaXR5LiBXZSBodW50IGZvciB0aGF0IG1hZ2ljIHNwYXJrIHRoYXQgaWduaXRlcyBpbm5vdmF0aW9uLiBXZSBicmluZyBvdXIgZXh0ZW5zaXZlIHNraWxscyBhbmQgZXhwZXJpZW5jZSB0byBlYWNoIHByb2plY3QgYW5kIGdpdmUgaXQgb3VyIGFsbC4gVGhlIHJlc3VsdCBpcyBjbGVhciwgeWV0IGVsZXZhdGVkIGNvbW11bmljYXRpb24gdGhhdCBtYWtlcyBwZW9wbGUgc3RvcCwgdGhpbmssIGFuZCBvZnRlbiBzbWlsZS5cIixcclxuICAgICAgICBcIk91ciBzdHVkaW8gbG9jYXRpb24gaXMgcHJvZm91bmRseSBpbnNwaXJpbmcuIFRoZSBtYWduaWZpY2VudCB2aWV3IGZlZWRzIG91ciBzb3VscyBhbmQga2VlcHMgdXMgaW5zcGlyZWQgdG8gZG8gb3VyIGJlc3Qgd29yay4gSXQncyBhIHBsYWNlIHdoZXJlIGNyZWF0aXZlIHBlb3BsZSBjb21lIHRvZ2V0aGVyIHRvIGNvbGxhYm9yYXRlIGFuZCBkcmlsbCBkb3duIHRvIHRoZSBoZWFydCBvZiB0aGUgbWF0dGVyLiBUbyBzb2x2ZSBwcm9ibGVtcyBhbmQgYnJpbmcgaWRlYXMgdG8gbGlmZS4gVG8gY3JlYXRlIHRoaW5ncyB3b3J0aCByZW1lbWJlcmluZy5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGluc2lnaHRDbGFyaXR5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2luc2lnaHQtY2xhcml0eS5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTIgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgQlJJTkcgVklTSU9OLCBJTlNJR0hULCBBTkQgQ0xBUklUWSBUTyBFVkVSWSBQUk9KRUNUXCIsXHJcbiAgICAgICAgXCJTdWNjZXNzZnVsIGRlc2lnbiBzdGFydHMgd2l0aCBpZGVudGlmeWluZyBhIGNsaWVudCdzIG5lZWRzLCBnb2FscywgYW5kIGFzcGlyYXRpb25zLiBPdXIgb2JqZWN0aXZpdHkgc2hpbmVzIGxpZ2h0IG9uIHdoYXQgb3RoZXJzIGhhdmUgbWlzc2VkLiBXZSBoYXZlIHRoZSBhYmlsaXR5IHRvIHNlZSBhbmQgaW50ZXJwcmV0IHRoZSBpbm5lciB3b3JraW5ncywgY3VsdHVyZSwgYW5kIG51YW5jZXMgb2Ygb3VyIGNsaWVudCdzIHdvcmxkLiBXZSBhc2sgcXVlc3Rpb25zIOKAkyBsb3RzIG9mIHF1ZXN0aW9ucy4gVGhlbiBsaXN0ZW4gdW50aWwgd2UgZ2FpbiB0aGUgZGVlcCB1bmRlcnN0YW5kaW5nIG5lY2Vzc2FyeSB0byBidWlsZCB0aGUgc29saWQgZm91bmRhdGlvbiB0aGF0IGFueSBlbmR1cmluZyBicmFuZCBuZWVkcy5cIixcclxuICAgICAgICBcIk91ciBzbWFsbCBidXQgbWlnaHR5IHRlYW0gYnJpbmdzIHRvZ2V0aGVyIGEgd2lkZSByYW5nZSBvZiB0YWxlbnRzIGFuZCBwZXJzcGVjdGl2ZXMsIHBsdXMgYSBuaWNlIGxpc3Qgb2YgYXdhcmRzLiBXZSB0aHJvdyBvdXIgaGVhcnRzIGludG8gb3VyIHdvcmsgYW5kIGFyZSBrbm93biBmb3Igb3VyIGZpZXJjZSBjb21taXRtZW50IHRvIHRoZSB0cnVzdGVkLCBsb25nLXRlcm0gcGFydG5lcnNoaXBzIHdlIGZvcm0uIEZvciB1cywgaXQncyBwZXJzb25hbC5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNreXdhcmQgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvc2t5d2FyZC5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTMgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgU0VFIFdPUksgSU4gQSBESUZGRVJFTlQgTElHSFRcIixcclxuICAgICAgICBcIlBlb3BsZSBsaWtlIHRvIGFzayBhYm91dCBvdXIgZGVzaWduIHByb2Nlc3MuIFRoZSB0cnV0aCBpcyB0aGF0IHRoZSBhcHByb2FjaCB0byBlYWNoIHByb2plY3QgdmFyaWVzLCBiZWNhdXNlIGVhY2ggY2xpZW50IGFuZCB0aGVpciBuZWVkcyBhcmUgdW5pcXVlLiBDcmVhdGl2ZSBicmVha3Rocm91Z2hzIGRvbid0IGZvbGxvdyB0aGUgY2xvY2suIFRoZXkgY2FuIGhhcHBlbiBhbnkgdGltZSBvZiBkYXkg4oCTIG9yIG5pZ2h0LiBXaGV0aGVyIGFuIGVwaXBoYW55IGlzIGlsbHVtaW5hdGVkIGluIGEgc2NyaWJibGUsIGEgZHJlYW0sIG9yIGFzIHRoZSBjbG91ZHMgcm9sbCBieSwgd2UgZW1icmFjZSB0aGUgZmFjdCB0aGF0IGVhY2ggcHJvamVjdCB0YWtlcyBvbiBhIGxpZmUgb2YgaXRzIG93bi5cIixcclxuICAgICAgICBcIldoYXQncyBjb25zdGFudCBpcyBvdXIgYWJpbGl0eSB0byBsaXN0ZW4gYW5kIGZvY3VzLCB0byBhbmFseXplIGFuZCBjb25uZWN0IGRvdHMsIGFuZCB0byByZW1haW4gY3VyaW91cy4gVGhlIG1vc3QgcmV3YXJkaW5nIHByb2plY3RzIGFyZSB3aXRoIGNsaWVudHMgd2hvIHZhbHVlIHRoZSBiYWxhbmNlIGJldHdlZW4gcHVzaGluZyBmb3J3YXJkIGFuZCBhbGxvd2luZyB0aW1lIGZvciB0aGUgcGVyZmVjdCBzb2x1dGlvbiB0byBlbWVyZ2UuIFRoYXQncyBvdXIgaGFwcHkgcGxhY2UuXCJcclxuICAgICk7XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvcml6b24sIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUxLCBtYWpvclNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcclxuICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUyLCBtYWpvclNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcclxuICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUzLCBtYWpvclNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG5cclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICBIT01FX0hPUklaT05fUEFEICogcyxcclxuICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh0ZXh0VGlsZTEsIDIwLCAyMCk7XHJcbiAgICAgICAgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlMiwgMjAsIDIwKTtcclxuICAgICAgICBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUzLCAyMCwgMjApO1xyXG5cclxuICAgICAgICBzZXRNYXhTY3JvbGwodGV4dFRpbGUzLm1ham9yKTtcclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IGVmZmVjdCwgU2lnbmFsIH0gZnJvbSBcIi4uL3NpZ25hbFwiO1xuaW1wb3J0IHsgYW5pbWF0ZVNwcmluZywgU3ByaW5nIH0gZnJvbSBcIi4uL3NwcmluZ1wiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHRTcXVhcmUsIGJvZHksIGJvZHlTaWcsIGNlbnRlclZlcnRpY2FsLCBnZXRTY3JvbGxIZWlnaHQsIG1hcFJhbmdlLCBvbk5hdk9wdGlvbkNsaWNrLCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHNwYWNlVG9GaWxlLCBzdHVwaWRBc3BlY3RHYXJiYWdlLCB4QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuaW50ZXJmYWNlIFdvcmtJdGVtIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5jb25zdCB3b3JrSXRlbXM6IFdvcmtJdGVtW10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG4vLyBjb25zdCBhZGRTY3JvbGxUZXh0U3F1YXJlRm9yV29yayA9IGFsaWduU2Nyb2xsVGV4dFNxdWFyZShcbi8vICAgICB7XG4vLyAgICAgICAgIGxldHRlclNwYWNpbmc6IDIuMixcbi8vICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuLy8gICAgICAgICBjb2xvcjogXCIjMzMzMzMzXCIsXG4vLyAgICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDY1LFxuLy8gICAgICAgICB3aWR0aFNjYWxlOiAxLFxuLy8gICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDksXG4vLyAgICAgfSxcbi8vICAgICAyMCxcbi8vICAgICB7XG4vLyAgICAgICAgIGxldHRlclNwYWNpbmc6IDAuMixcbi8vICAgICAgICAgZm9udFdlaWdodDogMzAwLFxuLy8gICAgICAgICBjb2xvcjogXCIjMzMzMzMzXCIsXG4vLyAgICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDMsXG4vLyAgICAgICAgIHdpZHRoU2NhbGU6IDEsXG4vLyAgICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbi8vICAgICB9LFxuLy8gICAgIDIwXG4vLyApO1xuXG5mdW5jdGlvbiBjbGlja2VkQW55VGFiKCkge1xuICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbXTtcblxuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygd29ya0l0ZW1zKSB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKGl0ZW0ubmFtZS50b1VwcGVyQ2FzZSgpLCAuLi5pdGVtLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0aWxlLm1ham9yLFxuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUoaXRlbS5uYW1lKX0vMS5qcGdgKSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgYWRkU2Nyb2xsSW1hZ2UoYHdvcmsvJHtzcGFjZVRvRmlsZShpdGVtLm5hbWUpfS8yLmpwZ2ApLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH0sIFtib2R5U2lnXSk7XG59XG5cbmludGVyZmFjZSBXb3JrVGFiIHtcbiAgICB0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNwcmluZzogU3ByaW5nO1xuICAgIHNwcmluZ1NpZzogU2lnbmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZXb3JrKCkge1xuICAgIGNvbnN0IHdvcmtUYWJzOiBXb3JrVGFiW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya0l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmtJdGVtID0gd29ya0l0ZW1zW2ldO1xuXG4gICAgICAgIGNvbnN0IHRhYkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0YWJFbGVtZW50LnNyYyA9IGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0l0ZW0ubmFtZSl9L3RhYi5wbmdgO1xuICAgICAgICBib2R5LmFwcGVuZCh0YWJFbGVtZW50KTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHkucmVtb3ZlQ2hpbGQodGFiRWxlbWVudCkpO1xuXG4gICAgICAgIGNvbnN0IHNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XG4gICAgICAgIGNvbnN0IHNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcbiAgICAgICAgc3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDEwMDApO1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gLTAuMTtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcsIDAuMDEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDA7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnLCAwLjAxKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS50b3AgPSBweChtYXBSYW5nZShzcHJpbmcucG9zaXRpb24sIDAsIDEsICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LndpZHRoIC8gMikpO1xuICAgICAgICB9LCBbc3ByaW5nU2lnLCBib2R5U2lnXSk7XG4gICAgICAgIHNwcmluZ1NpZy51cGRhdGUoKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSBvZiB3b3JrVGFicykge1xuICAgICAgICAgICAgICAgIHNwcmluZy5zdGlmZm5lc3MgPSA4MDA7XG4gICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDE7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge307XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZywgMC4wMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsaWNrZWRBbnlUYWIoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB3b3JrVGFicy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSk7XG5cbiAgICAgICAgY29uc3QgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnBvc2l0aW9uID0gMTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZywgMC4wMSk7XG4gICAgICAgIH0sIDgwICogaSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCB9ID0gd29ya1RhYnNbaV07XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gd2luZG93LmlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrVGFicy5sZW5ndGggKiAyIC0gMSk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aWR0aCAqICh0YWJFbGVtZW50Lm5hdHVyYWxIZWlnaHQgLyB0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGsgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaykge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGspO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChrICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QsIGVsZW1lbnRTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcbmltcG9ydCB7IGNsaWNrTmF2Q29ubmVjdCB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcbmltcG9ydCB7IGNsaWNrTmF2RXZvbHV0aW9uIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdkluc3BpcmF0aW9uIH0gZnJvbSBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcbmltcG9ydCB7IGNsaWNrTmF2VmlldyB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcbmltcG9ydCB7IGNsaWNrTmF2V29yayB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcblxuZXhwb3J0IGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuZXhwb3J0IGNvbnN0IGJvZHlTaWcgPSBlbGVtZW50U2lnbmFsKGJvZHkpO1xuXG5leHBvcnQgY29uc3QgaWVCbHVlID0gXCIjNjA5Q0NFXCI7XG5cbmV4cG9ydCBjb25zdCB2aWV3TmF2ID0gZyhcIm5hdi12aWV3XCIpO1xuZXhwb3J0IGNvbnN0IHdvcmtOYXYgPSBnKFwibmF2LXdvcmtcIik7XG5leHBvcnQgY29uc3QgaW5zcGlyYXRpb25OYXYgPSBnKFwibmF2LWluc3BpcmF0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IGV2b2x1dGlvbk5hdiA9IGcoXCJuYXYtZXZvbHV0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IGNvbm5lY3ROYXYgPSBnKFwibmF2LWNvbm5lY3RcIik7XG5cbmV4cG9ydCBjb25zdCBuYXZJdGVtcyA9IFt2aWV3TmF2LCB3b3JrTmF2LCBpbnNwaXJhdGlvbk5hdiwgZXZvbHV0aW9uTmF2LCBjb25uZWN0TmF2XTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbENsaXAgPSBnKFwic2Nyb2xsLWNsaXBcIik7XG5leHBvcnQgY29uc3Qgc2Nyb2xsYWJsZUl0ZW1zID0gZyhcInNjcm9sbGFibGUtaXRlbXNcIik7XG5cbmV4cG9ydCBjb25zdCBsb2dvID0gZyhcImxvZ29cIik7XG5cbmV4cG9ydCBjb25zdCBnbG9iYWxTVkcgPSBnKFwiZ2xvYmFsLXN2Z1wiKTtcblxuZXhwb3J0IGNvbnN0IHNsZWVwID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuOTU7XG5cbmV4cG9ydCBsZXQgb25OYXZPcHRpb25DbGljazogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuaW50ZXJmYWNlIEVsZW1lbnRBbGlnbm1lbnQge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZyhpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweChwaXhlbHM6IG51bWJlcikge1xuICAgIHJldHVybiBwaXhlbHMgKyBcInB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHVwaWRBc3BlY3RHYXJiYWdlKGVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAvLyBpIGZ1Y2tpbmcgaGF0ZSB0aGlzIGxheW91dCBlbmdpbmVcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gcHgoKGVsZW1lbnQubmF0dXJhbFdpZHRoIC8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0KSAqIGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckltYWdlU2NhbGVkKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gc2Nyb2xsQ2xpcC5jbGllbnRIZWlnaHQgKiBzY2FsZTtcbiAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgIHN0dXBpZEFzcGVjdEdhcmJhZ2UoaW1hZ2UpO1xuICAgIGltYWdlLnN0eWxlLnRvcCA9IHB4KChzY3JvbGxDbGlwLmNsaWVudEhlaWdodCAtIGhlaWdodCkgLyAyKTtcbn1cblxuZXhwb3J0IGxldCB3YWl0aW5nID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbEltYWdlKHNyYzogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbEltYWdlLnNyYyA9IHNyYztcbiAgICB3YWl0aW5nKys7XG4gICAgc2Nyb2xsSW1hZ2Uub25sb2FkID0gKCkgPT4gd2FpdGluZy0tO1xuICAgIHNjcm9sbGFibGVJdGVtcy5hcHBlbmQoc2Nyb2xsSW1hZ2UpO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxhYmxlSXRlbXMucmVtb3ZlQ2hpbGQoc2Nyb2xsSW1hZ2UpKTtcblxuICAgIHJldHVybiBzY3JvbGxJbWFnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFJhbmdlKG46IG51bWJlciwgc3RhcnQxOiBudW1iZXIsIHN0b3AxOiBudW1iZXIsIHN0YXJ0MjogbnVtYmVyLCBzdG9wMjogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgobiAtIHN0YXJ0MSkgLyAoc3RvcDEgLSBzdGFydDEpKSAqIChzdG9wMiAtIHN0YXJ0MikgKyBzdGFydDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgLy8gcmV0dXJuIHNjcm9sbGFibGVJdGVtcy5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3QgU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OID0gMC43O1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgKiBTQ1JPTExfSEVJR0hUX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZnVuY3Rpb24gY2xpY2tBbnlOYXYobmF2SXRlbTogSFRNTEVsZW1lbnQsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBuYXZJdGVtLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgbmF2SXRlbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBzY3JvbGwgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2Ygb25OYXZPcHRpb25DbGljaykgdSgpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5hdkl0ZW1zKSB7XG4gICAgICAgICAgICBuLnN0eWxlLmNvbG9yID0gXCIjODA4MDgwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBuYXZJdGVtLnN0eWxlLmNvbG9yID0gXCIjMDAwMDAwXCI7XG5cbiAgICAgICAgZigpO1xuXG4gICAgICAgIHNjcm9sbCA9IDA7XG4gICAgICAgIHVwZGF0ZVNjcm9sbCgpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJWZXJ0aWNhbChpdGVtOiBIVE1MRWxlbWVudCwgeTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHkgLSBpdGVtLmNsaWVudEhlaWdodCAvIDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50LmNsaWVudFdpZHRoICsgZ2FwKTtcbn1cblxuaW50ZXJmYWNlIFNjcm9sbFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG5cbiAgICBmb250U2l6ZVNjYWxlOiBudW1iZXI7XG4gICAgd2lkdGhTY2FsZTogbnVtYmVyO1xuICAgIGxpbmVIZWlnaHRTY2FsZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc2Nyb2xsVGV4dC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHNjcm9sbGFibGVJdGVtcy5hcHBlbmQoc2Nyb2xsVGV4dCk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IHNjcm9sbGFibGVJdGVtcy5yZW1vdmVDaGlsZChzY3JvbGxUZXh0KSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFNpemUgPSBweChzY3JvbGxIZWlnaHQgKiBzLmZvbnRTaXplU2NhbGUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzY3JvbGxIZWlnaHQgKiBzLndpZHRoU2NhbGUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGluZUhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCAqIHMubGluZUhlaWdodFNjYWxlKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHlBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbmV4cG9ydCBjb25zdCB4QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudFdpZHRoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHRTcXVhcmUobWFqb3JUZXh0OiBzdHJpbmcsIC4uLm1pbm9yVGV4dHM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3JzID0gbWlub3JUZXh0cy5tYXAoYWRkU2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHsgbWFqb3IsIG1pbm9ycyB9O1xufVxuXG5pbnRlcmZhY2UgU2Nyb2xsVGV4dFNxdWFyZSB7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yczogSFRNTEVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogU2Nyb2xsVGV4dFNxdWFyZSwgbWFqb3JTY3JvbGxUZXh0RGV0YWlsczogU2Nyb2xsVGV4dERldGFpbHMsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCBtYWpvclNjcm9sbFRleHREZXRhaWxzKTtcbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGVmZmVjdCh1cGRhdGVMYXlvdXQsIFtib2R5U2lnXSk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHlTaWcudW5zdWJzY3JpYmUodXBkYXRlTGF5b3V0KSk7XG5cbiAgICAvLyBUT0RPIHRoaXMgaXMgYWJvbHV0ZSBkaXNndXN0aW5nIGdhcmJhZ2UuIG5lZWQgdG8gd2FpdCBmb3IgaW1hZ2VzIHRvIGxvYWRcbiAgICBjb25zdCBndWggPSAoKSA9PiB7XG4gICAgICAgIGlmICh3YWl0aW5nKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGd1aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cGRhdGVMYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZ3VoKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnblNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFNjcm9sbFRleHRTcXVhcmUsIG1ham9yVG9NaW5vckdhcDogbnVtYmVyLCBiZXR3ZWVuTWlub3JzR2FwOiBudW1iZXIpIHtcbiAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW107XG5cbiAgICBpdGVtcy5wdXNoKG1ham9yLCBtYWpvclRvTWlub3JHYXApO1xuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgaXRlbXMucHVzaChtaW5vciwgYmV0d2Vlbk1pbm9yc0dhcCk7XG4gICAgfVxuICAgIGl0ZW1zLnBvcCgpOyAvLyByZW1vdmUgZmluYWwgZ2FwLCBvbmx5IHdhbnQgYmV0d2VlbnNcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgdG90YWxIZWlnaHRdID0geUFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuICAgIGNvbnN0IGdyb3VwVG9wID0gKHNjcm9sbEhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDI7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChncm91cFRvcCArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgbWlub3Iuc3R5bGUubGVmdCA9IG1ham9yLnN0eWxlLmxlZnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhY2VUb0ZpbGUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShcIiBcIiwgXCItXCIpO1xufVxuXG4vLyByZWFsIHN0dWZmXG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbGVmdEFsaWduID0gODA7XG4gICAgbG9nby5zdHlsZS53aWR0aCA9IHB4KDU1KTtcbiAgICBsb2dvLnN0eWxlLmhlaWdodCA9IHB4KDU1KTtcbiAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgIGxvZ28uc3R5bGUudG9wID0gcHgobGVmdEFsaWduIC8gMik7XG5cbiAgICBmdW5jdGlvbiBhbGlnbk5hdkl0ZW0obmF2SXRlbTogSFRNTEVsZW1lbnQsIG51ZGdlOiBudW1iZXIpIHtcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgbmF2SXRlbS5zdHlsZS50b3AgPSBweCh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyICsgbnVkZ2UgKiA1MCAtIG5hdkl0ZW0uY2xpZW50SGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgYWxpZ25OYXZJdGVtKHZpZXdOYXYsIC0yKTtcbiAgICBhbGlnbk5hdkl0ZW0od29ya05hdiwgLTEpO1xuICAgIGFsaWduTmF2SXRlbShpbnNwaXJhdGlvbk5hdiwgMCk7XG4gICAgYWxpZ25OYXZJdGVtKGV2b2x1dGlvbk5hdiwgMSk7XG4gICAgYWxpZ25OYXZJdGVtKGNvbm5lY3ROYXYsIDIpO1xufSwgW2JvZHlTaWddKTtcblxuZWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgc2Nyb2xsQ2xpcC5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUud2lkdGggPSBweCh3aW5kb3cuaW5uZXJXaWR0aCAtIHgpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUudG9wID0gcHgoY2VudGVyVmVydGljYWwoc2Nyb2xsQ2xpcCwgd2luZG93LmlubmVySGVpZ2h0IC8gMikpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUubGVmdCA9IHB4KHgpO1xuXG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLndpZHRoID0gcHgoMTAwKTtcbiAgICBzY3JvbGxhYmxlSXRlbXMuc3R5bGUuaGVpZ2h0ID0gcHgoMTAwKTtcbn0sIFtib2R5U2lnXSk7XG5cbmxldCBzY3JvbGwgPSAwO1xuXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGwoKSB7XG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLmxlZnQgPSBweCgtc2Nyb2xsKTtcbn1cblxubGV0IG1heFNjcm9sbCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNYXhTY3JvbGwoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBtYXhTY3JvbGwgPSBlbGVtZW50Lm9mZnNldExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoIC0gc2Nyb2xsQ2xpcC5vZmZzZXRXaWR0aCArIDEwMDtcbn1cbndpbmRvdy5vbndoZWVsID0gKGUpID0+IHtcbiAgICBzY3JvbGwgKz0gZS5kZWx0YVggKyBlLmRlbHRhWTtcbiAgICBpZiAoc2Nyb2xsIDwgMCkgc2Nyb2xsID0gMDtcbiAgICBpZiAoc2Nyb2xsID4gbWF4U2Nyb2xsKSBzY3JvbGwgPSBtYXhTY3JvbGw7XG4gICAgdXBkYXRlU2Nyb2xsKCk7XG59O1xuXG5jbGlja0FueU5hdihsb2dvLCBjbGlja05hdlZpZXcpO1xuXG5jbGlja0FueU5hdih2aWV3TmF2LCBjbGlja05hdlZpZXcpO1xuY2xpY2tBbnlOYXYod29ya05hdiwgY2xpY2tOYXZXb3JrKTtcbmNsaWNrQW55TmF2KGluc3BpcmF0aW9uTmF2LCBjbGlja05hdkluc3BpcmF0aW9uKTtcbmNsaWNrQW55TmF2KGV2b2x1dGlvbk5hdiwgY2xpY2tOYXZFdm9sdXRpb24pO1xuY2xpY2tBbnlOYXYoY29ubmVjdE5hdiwgY2xpY2tOYXZDb25uZWN0KTtcblxuc2V0VGltZW91dCgoKSA9PiB2aWV3TmF2LmNsaWNrKCkpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVNwcmluZyhzcHJpbmc6IFNwcmluZywgc2lnbmFsOiBTaWduYWwsIHRvbGVyYW5jZTogbnVtYmVyKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aWNrU3ByaW5nKCkge1xyXG4gICAgICAgIHNwcmluZy50aWNrKDEgLyA2MCk7XHJcbiAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ByaW5nLnRhcmdldCAtIHNwcmluZy5wb3NpdGlvbikgPCB0b2xlcmFuY2UgJiYgTWF0aC5hYnMoc3ByaW5nLnZlbG9jaXR5KSA8IHRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSBzcHJpbmcudGFyZ2V0O1xyXG4gICAgICAgICAgICBzcHJpbmcudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2tTcHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2tTcHJpbmcoKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vcGFnZXMvdmlld1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL3dvcmtcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcclxuXHJcbmltcG9ydCBcIi4vc2hhcmVkXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==