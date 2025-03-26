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

function addQuote(quoteText, authorText, titleText) {
    const quote = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)(quoteText);
    const author = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)(authorText);
    const title = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)(titleText);
    const openQuote = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)("“");
    const closeQuote = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollText)("”");
    return { quote, author, title, openQuote, closeQuote };
}
function styleQuote({ quote, author, title, openQuote, closeQuote }) {
    const widthScale = 0.75;
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(quote, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSizeScale: 0.032, widthScale, lineHeightScale: 0.065 });
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(author, { letterSpacing: 0.2, fontWeight: 350, color: "#000000", fontSizeScale: 0.035, widthScale, lineHeightScale: 0.06 });
    author.style.textAlign = "right";
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(title, { letterSpacing: 0.15, fontWeight: 350, color: "#000000", fontSizeScale: 0.025, widthScale, lineHeightScale: 0.06 });
    title.style.textAlign = "right";
    const quoteTextDetails = { letterSpacing: 0.2, fontWeight: 350, color: _shared__WEBPACK_IMPORTED_MODULE_0__.ieGreen, fontSizeScale: 0.15, widthScale: 0.05, lineHeightScale: 0.06 };
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(openQuote, quoteTextDetails);
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.styleScrollText)(closeQuote, quoteTextDetails);
}
function layoutQuote({ quote, author, title, openQuote, closeQuote }, nudge) {
    const s = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
    author.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetLeft);
    title.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetLeft);
    const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.yAligningWithGaps)([
        quote,
        0.04 * s,
        author,
        -0.015 * s,
        title,
    ]);
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(offset + 0.35 * s);
    }
    openQuote.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetLeft - 0.07 * s);
    openQuote.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetTop + 0.05 * s);
    closeQuote.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetLeft + quote.offsetWidth - nudge);
    closeQuote.style.top = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(quote.offsetTop + quote.offsetHeight - 0.01 * s);
}
function clickNavEvolution() {
    const evolution = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/evolution.svg");
    const evolutionHistory = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/evolution-history.svg");
    // const logoFull = addScrollImage("evolution/logo-full.svg");
    const promos = [
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/promo-1.jpg"),
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/promo-2.jpg"),
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/promo-3.jpg"),
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/promo-4.jpg"),
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.addScrollImage)("evolution/promo-5.jpg"),
    ];
    const quotes = [
        addQuote("Our annual promo is always grounded in our identity but it's fun to push limits and reinvent ourselves each year. The best part is <strong>hearing what our clients have to say.</strong>", "BETHLYN KRAKAUER", "Founder, i.e. design, inc."),
        addQuote("I love how you do stuff. I'm finding that these types of messages are really <strong>transforming relationships</strong> with people. They are just dreamy.", "DEBRA SCHATZKI", "Founder, BPP Wealth Solutions LLC"),
        addQuote("I see a lot of this special quality in your work. It's not just about being intentional. You always bring in an element of <strong>surprise and delight.</strong>", "JOSH KRAKAUER", "Founder, Sculpt"),
        addQuote("Your approach works so well because it is really <strong>personal</strong> and equally <strong>professional.</strong>", "ANN SULLIVAN", "Founder, Ann Sullivan Organizing"),
        addQuote("You truly understand the unique positioning of a prospective client and are able to <strong>tell their story</strong> exactly as it should be told.", "DAVID YUN", "Principal, Varident LLC"),
        addQuote("Beth is quite frankly one of the <strong>most talented designers</strong> that I have ever had the privilege to work with. She always has a special way of making everything she touches turn to gold!", "DAVID RUSH", "President, ENV"),
    ];
    (0,_shared__WEBPACK_IMPORTED_MODULE_0__.registerUpdateLayout)(() => {
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(evolution, 0.75);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(evolutionHistory, 0.3);
        for (const promo of promos)
            (0,_shared__WEBPACK_IMPORTED_MODULE_0__.centerImageScaled)(promo, 1);
        for (const quote of quotes)
            styleQuote(quote);
        const s = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
        const items = [
            evolution,
            0.2 * s,
            evolutionHistory,
        ];
        const maxLength = Math.max(quotes.length, promos.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < quotes.length)
                items.push(0.3 * s, quotes[i].quote);
            if (i < promos.length)
                items.push(0.3 * s, promos[i]);
        }
        const [elementAlignments, _] = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.xAligningWithGaps)(items);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_shared__WEBPACK_IMPORTED_MODULE_0__.px)(offset);
        }
        for (const quote of quotes)
            layoutQuote(quote, 0.05 * s);
        (0,_shared__WEBPACK_IMPORTED_MODULE_0__.setMaxScroll)(quotes[quotes.length - 1].quote);
    });
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
            (0,_shared__WEBPACK_IMPORTED_MODULE_2__.queueBeforeLayout)(() => {
                setTimeout(() => (0,_shared__WEBPACK_IMPORTED_MODULE_2__.setScroll)(workDisplays[i].textSquare.major.offsetLeft));
            });
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
/* harmony export */   ieGreen: () => (/* binding */ ieGreen),
/* harmony export */   inspirationNav: () => (/* binding */ inspirationNav),
/* harmony export */   logo: () => (/* binding */ logo),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   navItems: () => (/* binding */ navItems),
/* harmony export */   onNavOptionClick: () => (/* binding */ onNavOptionClick),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   queueBeforeLayout: () => (/* binding */ queueBeforeLayout),
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
const ieGreen = "#bfe021";
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
function queueBeforeLayout(event) {
    queuedBeforeLayout.push(event);
}
function notifyImageLoading(image) {
    imageLoadingPromises.push(image.decode());
}
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    notifyImageLoading(scrollImage);
    queueBeforeLayout(() => {
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
    queueBeforeLayout(() => {
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
let queuedBeforeLayout = [];
function registerUpdateLayout(updateLayout) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateLayoutImageWaiting = () => __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(imageLoadingPromises);
            for (const imageLoadingAppend of queuedBeforeLayout)
                imageLoadingAppend();
            imageLoadingPromises = [];
            queuedBeforeLayout = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzNCLE9BQU87U0FDVjtRQUVELHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxVQUFVLEVBQUUsQ0FBQztBQUNqQixDQUFDOzs7Ozs7O1VDbkREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05zQjtBQUNBO0FBQ087QUFDRjtBQUNGO0FBRVAiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9jb25uZWN0LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2V2b2x1dGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9pbnNwaXJhdGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy92aWV3LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3dvcmsudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2hhcmVkLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NpZ25hbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zcHJpbmcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZDb25uZWN0KCkge31cbiIsImltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0LCBjZW50ZXJJbWFnZVNjYWxlZCwgZ2V0U2Nyb2xsSGVpZ2h0LCBpZUdyZWVuLCBweCwgcXVldWVCZWZvcmVMYXlvdXQsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCBzY3JvbGxhYmxlSXRlbXMsIHNldE1heFNjcm9sbCwgc3R5bGVTY3JvbGxUZXh0LCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmludGVyZmFjZSBRdW90ZURpc3BsYXkge1xuICAgIHF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBhdXRob3I6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIHRpdGxlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBvcGVuUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGNsb3NlUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRRdW90ZShxdW90ZVRleHQ6IHN0cmluZywgYXV0aG9yVGV4dDogc3RyaW5nLCB0aXRsZVRleHQ6IHN0cmluZyk6IFF1b3RlRGlzcGxheSB7XG4gICAgY29uc3QgcXVvdGUgPSBhZGRTY3JvbGxUZXh0KHF1b3RlVGV4dCk7XG4gICAgY29uc3QgYXV0aG9yID0gYWRkU2Nyb2xsVGV4dChhdXRob3JUZXh0KTtcbiAgICBjb25zdCB0aXRsZSA9IGFkZFNjcm9sbFRleHQodGl0bGVUZXh0KTtcbiAgICBjb25zdCBvcGVuUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCcXCIpO1xuICAgIGNvbnN0IGNsb3NlUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCdXCIpO1xuXG4gICAgcmV0dXJuIHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVF1b3RlKHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9OiBRdW90ZURpc3BsYXkpIHtcbiAgICBjb25zdCB3aWR0aFNjYWxlID0gMC43NTtcbiAgICBzdHlsZVNjcm9sbFRleHQocXVvdGUsIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplU2NhbGU6IDAuMDMyLCB3aWR0aFNjYWxlLCBsaW5lSGVpZ2h0U2NhbGU6IDAuMDY1IH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KGF1dGhvciwgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZVNjYWxlOiAwLjAzNSwgd2lkdGhTY2FsZSwgbGluZUhlaWdodFNjYWxlOiAwLjA2IH0pO1xuICAgIGF1dGhvci5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQodGl0bGUsIHsgbGV0dGVyU3BhY2luZzogMC4xNSwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplU2NhbGU6IDAuMDI1LCB3aWR0aFNjYWxlLCBsaW5lSGVpZ2h0U2NhbGU6IDAuMDYgfSk7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuXG4gICAgY29uc3QgcXVvdGVUZXh0RGV0YWlscyA9IHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBpZUdyZWVuLCBmb250U2l6ZVNjYWxlOiAwLjE1LCB3aWR0aFNjYWxlOiAwLjA1LCBsaW5lSGVpZ2h0U2NhbGU6IDAuMDYgfTtcbiAgICBzdHlsZVNjcm9sbFRleHQob3BlblF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbiAgICBzdHlsZVNjcm9sbFRleHQoY2xvc2VRdW90ZSwgcXVvdGVUZXh0RGV0YWlscyk7XG59XG5cbmZ1bmN0aW9uIGxheW91dFF1b3RlKHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9OiBRdW90ZURpc3BsYXksIG51ZGdlOiBudW1iZXIpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBhdXRob3Iuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuICAgIHRpdGxlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0KTtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB5QWxpZ25pbmdXaXRoR2FwcyhbXG4gICAgICAgIHF1b3RlLCAvL1xuICAgICAgICAwLjA0ICogcyxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICAtMC4wMTUgKiBzLFxuICAgICAgICB0aXRsZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIDAuMzUgKiBzKTtcbiAgICB9XG5cbiAgICBvcGVuUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgLSAwLjA3ICogcyk7XG4gICAgb3BlblF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIDAuMDUgKiBzKTtcbiAgICBjbG9zZVF1b3RlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0ICsgcXVvdGUub2Zmc2V0V2lkdGggLSBudWRnZSk7XG4gICAgY2xvc2VRdW90ZS5zdHlsZS50b3AgPSBweChxdW90ZS5vZmZzZXRUb3AgKyBxdW90ZS5vZmZzZXRIZWlnaHQgLSAwLjAxICogcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkV2b2x1dGlvbigpIHtcbiAgICBjb25zdCBldm9sdXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9ldm9sdXRpb24uc3ZnXCIpO1xuICAgIGNvbnN0IGV2b2x1dGlvbkhpc3RvcnkgPSBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9ldm9sdXRpb24taGlzdG9yeS5zdmdcIik7XG4gICAgLy8gY29uc3QgbG9nb0Z1bGwgPSBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9sb2dvLWZ1bGwuc3ZnXCIpO1xuXG4gICAgY29uc3QgcHJvbW9zID0gW1xuICAgICAgICBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9wcm9tby0xLmpwZ1wiKSwgLy9cbiAgICAgICAgYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vcHJvbW8tMi5qcGdcIiksXG4gICAgICAgIGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL3Byb21vLTMuanBnXCIpLFxuICAgICAgICBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9wcm9tby00LmpwZ1wiKSxcbiAgICAgICAgYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vcHJvbW8tNS5qcGdcIiksXG4gICAgXTtcblxuICAgIGNvbnN0IHF1b3RlcyA9IFtcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIk91ciBhbm51YWwgcHJvbW8gaXMgYWx3YXlzIGdyb3VuZGVkIGluIG91ciBpZGVudGl0eSBidXQgaXQncyBmdW4gdG8gcHVzaCBsaW1pdHMgYW5kIHJlaW52ZW50IG91cnNlbHZlcyBlYWNoIHllYXIuIFRoZSBiZXN0IHBhcnQgaXMgPHN0cm9uZz5oZWFyaW5nIHdoYXQgb3VyIGNsaWVudHMgaGF2ZSB0byBzYXkuPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBcIkJFVEhMWU4gS1JBS0FVRVJcIixcbiAgICAgICAgICAgIFwiRm91bmRlciwgaS5lLiBkZXNpZ24sIGluYy5cIlxuICAgICAgICApLFxuICAgICAgICBhZGRRdW90ZShcIkkgbG92ZSBob3cgeW91IGRvIHN0dWZmLiBJJ20gZmluZGluZyB0aGF0IHRoZXNlIHR5cGVzIG9mIG1lc3NhZ2VzIGFyZSByZWFsbHkgPHN0cm9uZz50cmFuc2Zvcm1pbmcgcmVsYXRpb25zaGlwczwvc3Ryb25nPiB3aXRoIHBlb3BsZS4gVGhleSBhcmUganVzdCBkcmVhbXkuXCIsIFwiREVCUkEgU0NIQVRaS0lcIiwgXCJGb3VuZGVyLCBCUFAgV2VhbHRoIFNvbHV0aW9ucyBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBzZWUgYSBsb3Qgb2YgdGhpcyBzcGVjaWFsIHF1YWxpdHkgaW4geW91ciB3b3JrLiBJdCdzIG5vdCBqdXN0IGFib3V0IGJlaW5nIGludGVudGlvbmFsLiBZb3UgYWx3YXlzIGJyaW5nIGluIGFuIGVsZW1lbnQgb2YgPHN0cm9uZz5zdXJwcmlzZSBhbmQgZGVsaWdodC48L3N0cm9uZz5cIiwgXCJKT1NIIEtSQUtBVUVSXCIsIFwiRm91bmRlciwgU2N1bHB0XCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdXIgYXBwcm9hY2ggd29ya3Mgc28gd2VsbCBiZWNhdXNlIGl0IGlzIHJlYWxseSA8c3Ryb25nPnBlcnNvbmFsPC9zdHJvbmc+IGFuZCBlcXVhbGx5IDxzdHJvbmc+cHJvZmVzc2lvbmFsLjwvc3Ryb25nPlwiLCBcIkFOTiBTVUxMSVZBTlwiLCBcIkZvdW5kZXIsIEFubiBTdWxsaXZhbiBPcmdhbml6aW5nXCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdSB0cnVseSB1bmRlcnN0YW5kIHRoZSB1bmlxdWUgcG9zaXRpb25pbmcgb2YgYSBwcm9zcGVjdGl2ZSBjbGllbnQgYW5kIGFyZSBhYmxlIHRvIDxzdHJvbmc+dGVsbCB0aGVpciBzdG9yeTwvc3Ryb25nPiBleGFjdGx5IGFzIGl0IHNob3VsZCBiZSB0b2xkLlwiLCBcIkRBVklEIFlVTlwiLCBcIlByaW5jaXBhbCwgVmFyaWRlbnQgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiQmV0aCBpcyBxdWl0ZSBmcmFua2x5IG9uZSBvZiB0aGUgPHN0cm9uZz5tb3N0IHRhbGVudGVkIGRlc2lnbmVyczwvc3Ryb25nPiB0aGF0IEkgaGF2ZSBldmVyIGhhZCB0aGUgcHJpdmlsZWdlIHRvIHdvcmsgd2l0aC4gU2hlIGFsd2F5cyBoYXMgYSBzcGVjaWFsIHdheSBvZiBtYWtpbmcgZXZlcnl0aGluZyBzaGUgdG91Y2hlcyB0dXJuIHRvIGdvbGQhXCIsXG4gICAgICAgICAgICBcIkRBVklEIFJVU0hcIixcbiAgICAgICAgICAgIFwiUHJlc2lkZW50LCBFTlZcIlxuICAgICAgICApLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGV2b2x1dGlvbiwgMC43NSk7XG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGV2b2x1dGlvbkhpc3RvcnksIDAuMyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9tbyBvZiBwcm9tb3MpIGNlbnRlckltYWdlU2NhbGVkKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtcbiAgICAgICAgICAgIGV2b2x1dGlvbiwgLy9cbiAgICAgICAgICAgIDAuMiAqIHMsXG4gICAgICAgICAgICBldm9sdXRpb25IaXN0b3J5LFxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHF1b3Rlcy5sZW5ndGgsIHByb21vcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IHF1b3Rlcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcXVvdGVzW2ldLnF1b3RlKTtcbiAgICAgICAgICAgIGlmIChpIDwgcHJvbW9zLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBwcm9tb3NbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUsIDAuMDUgKiBzKTtcblxuICAgICAgICBzZXRNYXhTY3JvbGwocXVvdGVzW3F1b3Rlcy5sZW5ndGggLSAxXS5xdW90ZSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgYWxpZ25XaXRoR2FwLCBib2R5U2lnLCBjZW50ZXJJbWFnZVNjYWxlZCwgZ2V0U2Nyb2xsSGVpZ2h0LCBpZUJsdWUsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgc2V0TWF4U2Nyb2xsLCBzdHlsZVNjcm9sbFRleHQsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5jb25zdCBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gPSAwLjg1O1xuXG5pbnRlcmZhY2UgSW5zcGlyYXRpb25UaWxlIHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3I6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRNb3JlOiBIVE1MRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gc3R5bGVJbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBzdHlsZVNjcm9sbFRleHQobWFqb3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC42LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMzYsXG4gICAgICAgIHdpZHRoU2NhbGU6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTixcbiAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA5LFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuMyxcbiAgICAgICAgZm9udFdlaWdodDogMzUwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDI3LFxuICAgICAgICB3aWR0aFNjYWxlOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04sXG4gICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChyZWFkTW9yZSwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjUsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IGllQmx1ZSxcbiAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMyxcbiAgICAgICAgd2lkdGhTY2FsZTogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OLFxuICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKiAwLjU1KTtcbn1cblxuZnVuY3Rpb24gYWxpZ25JbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBtYWpvci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICBtaW5vci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICByZWFkTW9yZS5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB5QWxpZ25pbmdXaXRoR2FwcyhbXG4gICAgICAgIGltYWdlLCAvL1xuICAgICAgICAwLjAzICogcyxcbiAgICAgICAgbWFqb3IsXG4gICAgICAgIC0wLjAxICogcyxcbiAgICAgICAgbWlub3IsXG4gICAgICAgIDAuMDEgKiBzLFxuICAgICAgICByZWFkTW9yZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIHMgKiAwLjE1KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uVGlsZShpbWFnZVN0cmluZzogc3RyaW5nLCBtYWpvclRleHQ6IHN0cmluZywgbWlub3JUZXh0OiBzdHJpbmcpOiBJbnNwaXJhdGlvblRpbGUge1xuICAgIGNvbnN0IGltYWdlID0gYWRkU2Nyb2xsSW1hZ2UoaW1hZ2VTdHJpbmcpO1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9yID0gYWRkU2Nyb2xsVGV4dChtaW5vclRleHQpO1xuICAgIGNvbnN0IHJlYWRNb3JlID0gYWRkU2Nyb2xsVGV4dChcIlJlYWQgbW9yZVwiKTtcblxuICAgIHJldHVybiB7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkluc3BpcmF0aW9uKCkge1xuICAgIGNvbnN0IGluc3BpcmF0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJpbnNwaXJhdGlvbi9pbnNwaXJhdGlvbi5zdmdcIik7XG5cbiAgICBjb25zdCB0aWxlcyA9IFtcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24veXVtaWUuanBnXCIsIFwiVEhFIFNUQVJUIE9GIFNPTUVUSElORyBZVU0tSUVcIiwgXCJXZSBhbHdheXMgd2FudGVkIHRvIGRlc2lnbiBjaG9jb2xhdGUgYmFycyBhbmQgZmluYWxseSBkaWQgaXQuIEludHJvZHVjaW5nIG91ciBzd2VldCBuZXcgYnJhbmQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi93b3Jkcy1pZGVhcy5qcGdcIiwgXCJTSEFSRSBTT01FIERFU0lHTiBMT1ZFXCIsIFwiVGhlIGkuZS4gZGVzaWduIHByb21vIGpvdXJuYWxzIGVuY291cmFnZSBjbGllbnRzIHRvIHNrZXRjaCB0aGVpciBiaWcgaWRlYXMgYW5kIGNhcHR1cmUgdGhlaXIgZHJlYW1zLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vY29vay1pZS5qcGdcIiwgXCJHT1RUQSBMT1ZFIEEgQ09PSy1JRVwiLCBcIkhvdyBhIHNlY3JldCByZWNpcGUgd29ya3MgdG8gYnJpbmcgcmVsYXRpb25zaGlwcyB0byBhIHdob2xlIG5ldyBsZXZlbC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlbWl4LmpwZ1wiLCBcIlJFTUlYXCIsIFwiQSBiZWhpbmQtdGhlLXNjZW5lcyBsb29rIGF0IGhvdyB3ZSB0cmFuc2Zvcm1lZCBjbGFzc2ljIG1lbW9yeSBjYXJyaWVycyBpbnRvIG9iamVjdHMgb2YgYXJ0LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24va3JlbXBhLnBuZ1wiLCBcIlJFQlJBTkRJTkcgQSBGQU1JTFkgQlVTSU5FU1NcIiwgXCJBIHJlZnJlc2ggZm9yIGEgNTAteWVhciBsZWdhY3kuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mb3Rvc3RvcmkuanBnXCIsIFwiQlJBTkRJTkcgRlJPTSBUSEUgTkFNRSBVUFwiLCBcIldoZW4gYSBjbGllbnQgaGFkIGFuIGlkZWEgZm9yIGEgYnJhbmQgc3Bpbm9mZiwgd2UgdG9vayBoZXIgY29uY2VwdCB0byByZWFsaXR5IGFuZCBsYXVuY2hlZCB0aGUgYnVzaW5lc3MgaW4gaGlnaCBzdHlsZS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2luc3BpcmVkLTItY3JlYXRlLmpwZ1wiLCBcIklOU1BJUkVEIDIgQ1JFQVRFXCIsIFwiQSBwYWludGluZyBpbnNwaXJlZCBieSB0aGUgaS5lLiBkZXNpZ24gbG9nbyBjb21iaW5lcyBvaWwgcGFpbnRzLCBncm91bmQgdXAgY3JheW9ucywgYW5kIGEgbGVnby5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Zyb20taW5zaWRlLmpwZ1wiLCBcIlRIRSBWSUVXIEZST00gSU5TSURFXCIsIFwiaS5lLiBkZXNpZ24ncyBuZXcgc3R1ZGlvIHdhcyAzMCB5ZWFycyBpbiB0aGUgbWFraW5nLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVjb25uZWN0aW5nLmpwZ1wiLCBcIlJFQ09OTkVDVElOR1wiLCBcIkhvdyB1bmNlcnRhaW4gdGltZXMgbGVkIHRvIGEgaG9tZWNvbWluZyBmb3IgaS5lLiBkZXNpZ24ncyBzZW5pb3IgZGVzaWduZXIuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9uZXctc3R1ZGlvLmpwZ1wiLCBcIk5FVyBTVFVESU8uIE5FVyBWSUVXLlwiLCBcIkhvdyB0aGUgbmVlZCBmb3IgaW5zcGlyYXRpb24gZnVlbGVkIHRoZSBidWlsZGluZyBvZiBhIHN0dWRpby5cIiksXG4gICAgXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGluc3BpcmF0aW9uLCAwLjc1KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHN0eWxlSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGFsaWduV2l0aEdhcChpbnNwaXJhdGlvbiwgdGlsZXNbMF0uaW1hZ2UsIHMgKiAwLjI1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggLSAxOyBpKyspIGFsaWduV2l0aEdhcCh0aWxlc1tpXS5pbWFnZSwgdGlsZXNbaSArIDFdLmltYWdlLCBzICogMC4xKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIGFsaWduSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIHNldE1heFNjcm9sbCh0aWxlc1t0aWxlcy5sZW5ndGggLSAxXS5pbWFnZSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBhZGRTY3JvbGxUZXh0U3F1YXJlLCBnZXRTY3JvbGxIZWlnaHQsIHB4LCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiwgeEFsaWduaW5nV2l0aEdhcHMsIGNlbnRlckltYWdlU2NhbGVkLCBhZGRTY3JvbGxJbWFnZSwgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCBzZXRNYXhTY3JvbGwgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XHJcblxyXG5jb25zdCBtYWpvclNjcm9sbFRleHREZXRhaWxzID0ge1xyXG4gICAgbGV0dGVyU3BhY2luZzogMi4yLFxyXG4gICAgZm9udFdlaWdodDogNDAwLFxyXG4gICAgY29sb3I6IFwiI0IzQjNCM1wiLFxyXG4gICAgZm9udFNpemVTY2FsZTogMC4wNjUsXHJcbiAgICB3aWR0aFNjYWxlOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTixcclxuICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcclxufTtcclxuXHJcbmNvbnN0IG1pbm9yU2Nyb2xsVGV4dERldGFpbHMgPSB7XHJcbiAgICBsZXR0ZXJTcGFjaW5nOiAwLjIsXHJcbiAgICBmb250V2VpZ2h0OiAzMDAsXHJcbiAgICBjb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICBmb250U2l6ZVNjYWxlOiAwLjAzLFxyXG4gICAgd2lkdGhTY2FsZTogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04sXHJcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZWaWV3KCkge1xyXG4gICAgY29uc3QgaG9tZSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob21lLnN2Z1wiKTtcclxuICAgIGNvbnN0IGhvcml6b24gPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9yaXpvbi5qcGdcIik7XHJcbiAgICBjb25zdCBmcmVzaExvb2sgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZnJlc2gtbG9vay5zdmdcIik7XHJcbiAgICBjb25zdCBncmVhdEJyYW5kcyA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ncmVhdC1icmFuZHMuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUxID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIkdSRUFUIEJSQU5EUyBET04nVCBKVVNUIEhBUFBFTlwiLFxyXG4gICAgICAgIFwiVGhleSByZXF1aXJlIGV4cGxvcmF0aW9uLCBpbnNpZ2h0LCBhbmQgdGVuYWNpdHkuIFdlIGh1bnQgZm9yIHRoYXQgbWFnaWMgc3BhcmsgdGhhdCBpZ25pdGVzIGlubm92YXRpb24uIFdlIGJyaW5nIG91ciBleHRlbnNpdmUgc2tpbGxzIGFuZCBleHBlcmllbmNlIHRvIGVhY2ggcHJvamVjdCBhbmQgZ2l2ZSBpdCBvdXIgYWxsLiBUaGUgcmVzdWx0IGlzIGNsZWFyLCB5ZXQgZWxldmF0ZWQgY29tbXVuaWNhdGlvbiB0aGF0IG1ha2VzIHBlb3BsZSBzdG9wLCB0aGluaywgYW5kIG9mdGVuIHNtaWxlLlwiLFxyXG4gICAgICAgIFwiT3VyIHN0dWRpbyBsb2NhdGlvbiBpcyBwcm9mb3VuZGx5IGluc3BpcmluZy4gVGhlIG1hZ25pZmljZW50IHZpZXcgZmVlZHMgb3VyIHNvdWxzIGFuZCBrZWVwcyB1cyBpbnNwaXJlZCB0byBkbyBvdXIgYmVzdCB3b3JrLiBJdCdzIGEgcGxhY2Ugd2hlcmUgY3JlYXRpdmUgcGVvcGxlIGNvbWUgdG9nZXRoZXIgdG8gY29sbGFib3JhdGUgYW5kIGRyaWxsIGRvd24gdG8gdGhlIGhlYXJ0IG9mIHRoZSBtYXR0ZXIuIFRvIHNvbHZlIHByb2JsZW1zIGFuZCBicmluZyBpZGVhcyB0byBsaWZlLiBUbyBjcmVhdGUgdGhpbmdzIHdvcnRoIHJlbWVtYmVyaW5nLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW5zaWdodENsYXJpdHkgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaW5zaWdodC1jbGFyaXR5LmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMiA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBCUklORyBWSVNJT04sIElOU0lHSFQsIEFORCBDTEFSSVRZIFRPIEVWRVJZIFBST0pFQ1RcIixcclxuICAgICAgICBcIlN1Y2Nlc3NmdWwgZGVzaWduIHN0YXJ0cyB3aXRoIGlkZW50aWZ5aW5nIGEgY2xpZW50J3MgbmVlZHMsIGdvYWxzLCBhbmQgYXNwaXJhdGlvbnMuIE91ciBvYmplY3Rpdml0eSBzaGluZXMgbGlnaHQgb24gd2hhdCBvdGhlcnMgaGF2ZSBtaXNzZWQuIFdlIGhhdmUgdGhlIGFiaWxpdHkgdG8gc2VlIGFuZCBpbnRlcnByZXQgdGhlIGlubmVyIHdvcmtpbmdzLCBjdWx0dXJlLCBhbmQgbnVhbmNlcyBvZiBvdXIgY2xpZW50J3Mgd29ybGQuIFdlIGFzayBxdWVzdGlvbnMg4oCTIGxvdHMgb2YgcXVlc3Rpb25zLiBUaGVuIGxpc3RlbiB1bnRpbCB3ZSBnYWluIHRoZSBkZWVwIHVuZGVyc3RhbmRpbmcgbmVjZXNzYXJ5IHRvIGJ1aWxkIHRoZSBzb2xpZCBmb3VuZGF0aW9uIHRoYXQgYW55IGVuZHVyaW5nIGJyYW5kIG5lZWRzLlwiLFxyXG4gICAgICAgIFwiT3VyIHNtYWxsIGJ1dCBtaWdodHkgdGVhbSBicmluZ3MgdG9nZXRoZXIgYSB3aWRlIHJhbmdlIG9mIHRhbGVudHMgYW5kIHBlcnNwZWN0aXZlcywgcGx1cyBhIG5pY2UgbGlzdCBvZiBhd2FyZHMuIFdlIHRocm93IG91ciBoZWFydHMgaW50byBvdXIgd29yayBhbmQgYXJlIGtub3duIGZvciBvdXIgZmllcmNlIGNvbW1pdG1lbnQgdG8gdGhlIHRydXN0ZWQsIGxvbmctdGVybSBwYXJ0bmVyc2hpcHMgd2UgZm9ybS4gRm9yIHVzLCBpdCdzIHBlcnNvbmFsLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc2t5d2FyZCA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9za3l3YXJkLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMyA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBTRUUgV09SSyBJTiBBIERJRkZFUkVOVCBMSUdIVFwiLFxyXG4gICAgICAgIFwiUGVvcGxlIGxpa2UgdG8gYXNrIGFib3V0IG91ciBkZXNpZ24gcHJvY2Vzcy4gVGhlIHRydXRoIGlzIHRoYXQgdGhlIGFwcHJvYWNoIHRvIGVhY2ggcHJvamVjdCB2YXJpZXMsIGJlY2F1c2UgZWFjaCBjbGllbnQgYW5kIHRoZWlyIG5lZWRzIGFyZSB1bmlxdWUuIENyZWF0aXZlIGJyZWFrdGhyb3VnaHMgZG9uJ3QgZm9sbG93IHRoZSBjbG9jay4gVGhleSBjYW4gaGFwcGVuIGFueSB0aW1lIG9mIGRheSDigJMgb3IgbmlnaHQuIFdoZXRoZXIgYW4gZXBpcGhhbnkgaXMgaWxsdW1pbmF0ZWQgaW4gYSBzY3JpYmJsZSwgYSBkcmVhbSwgb3IgYXMgdGhlIGNsb3VkcyByb2xsIGJ5LCB3ZSBlbWJyYWNlIHRoZSBmYWN0IHRoYXQgZWFjaCBwcm9qZWN0IHRha2VzIG9uIGEgbGlmZSBvZiBpdHMgb3duLlwiLFxyXG4gICAgICAgIFwiV2hhdCdzIGNvbnN0YW50IGlzIG91ciBhYmlsaXR5IHRvIGxpc3RlbiBhbmQgZm9jdXMsIHRvIGFuYWx5emUgYW5kIGNvbm5lY3QgZG90cywgYW5kIHRvIHJlbWFpbiBjdXJpb3VzLiBUaGUgbW9zdCByZXdhcmRpbmcgcHJvamVjdHMgYXJlIHdpdGggY2xpZW50cyB3aG8gdmFsdWUgdGhlIGJhbGFuY2UgYmV0d2VlbiBwdXNoaW5nIGZvcndhcmQgYW5kIGFsbG93aW5nIHRpbWUgZm9yIHRoZSBwZXJmZWN0IHNvbHV0aW9uIHRvIGVtZXJnZS4gVGhhdCdzIG91ciBoYXBweSBwbGFjZS5cIlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0VGlsZXMgPSBbdGV4dFRpbGUxLCB0ZXh0VGlsZTIsIHRleHRUaWxlM107XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGhvcml6b24sIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICBjZW50ZXJJbWFnZVNjYWxlZChncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgIGNlbnRlckltYWdlU2NhbGVkKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlLCBtYWpvclNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG5cclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICBIT01FX0hPUklaT05fUEFEICogcyxcclxuICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcblxyXG4gICAgICAgIHNldE1heFNjcm9sbCh0ZXh0VGlsZTMubWFqb3IpO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgZWZmZWN0LCBTaWduYWwgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi4vc3ByaW5nXCI7XG5pbXBvcnQge1xuICAgIGFkZFNjcm9sbEltYWdlLFxuICAgIGFkZFNjcm9sbFRleHRTcXVhcmUsXG4gICAgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLFxuICAgIGJvZHksXG4gICAgYm9keVNpZyxcbiAgICBjZW50ZXJJbWFnZVNjYWxlZCxcbiAgICBnZXRTY3JvbGxIZWlnaHQsXG4gICAgbWFwUmFuZ2UsXG4gICAgb25OYXZPcHRpb25DbGljayxcbiAgICBweCxcbiAgICBxdWV1ZUJlZm9yZUxheW91dCxcbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCxcbiAgICBzZXRNYXhTY3JvbGwsXG4gICAgc2V0U2Nyb2xsLFxuICAgIHNwYWNlVG9GaWxlLFxuICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSxcbiAgICBUZXh0U3F1YXJlLFxuICAgIHhBbGlnbmluZ1dpdGhHYXBzLFxufSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmludGVyZmFjZSBXb3JrQ29udGVudCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIFdvcmtEaXNwbGF5IHtcbiAgICB0ZXh0U3F1YXJlOiBUZXh0U3F1YXJlO1xuICAgIGltYWdlMTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWFnZTI6IEhUTUxJbWFnZUVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBXb3JrSXRlbSB7XG4gICAgdGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBzcHJpbmc6IFNwcmluZztcbiAgICBzcHJpbmdTaWc6IFNpZ25hbDtcbn1cblxuY29uc3Qgd29ya0NvbnRlbnRzOiBXb3JrQ29udGVudFtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJiZXJ3eW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiSGF2aW5nIHNwZW50IGhpcyBlbnRpcmUgY2hpbGRob29kIG1ha2luZyBmaWxtcywgdGhpcyBjb21wYW55J3MgZm91bmRlciBuYW1lZCBoaXMgYWdlbmN5IGFmdGVyIHRoZSBzdHJlZXQgb24gd2hpY2ggaGUgd2FzIHJhaXNlZC4gV2l0aCBhIGhpc3RvcnkgbGlrZSB0aGF0LCB3ZSBoYWQgdG8gZWxldmF0ZSBCZXJ3eW4gdG8gbGFuZG1hcmsgc3RhdHVzLiBVc2luZyBjdXN0b20gcGhvdG9ncmFwaHkgYW5kIG1hc3RlciBtYW5pcHVsYXRpb24sIHdlIGNyZWF0ZWQgYSBmbGV4aWJsZSBzdGlja2VyIHN5c3RlbSB0aGF0IGlzIGludGVyY2hhbmdlYWJsZSB3aXRoIG11bHRpLWNvbG9yZWQgcGFwZXIgc3RvY2tzLiBFbXBsb3llZXMgYXJlIGVuY291cmFnZWQgdG8gZGVzaWduIHRoZWlyIG93biBjb21tdW5pY2F0aW9ucyBhbmQgZ2V0IGEgY29tcGxldGUgc2VyaWVzIG9mIGF3YXJkLXdpbm5pbmcgYnVzaW5lc3MgY2FyZHMgdG8gY2hvb3NlIGZyb20uXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBGaWxtLCBUZWxldmlzaW9uLCBWaWRlbyBQcm9kdWN0aW9uXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiazIga3J1cHBcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBhd2FyZC13aW5uaW5nLCBOZXcgWW9yayBDaXR5IHB1YmxpYyByZWxhdGlvbnMgYW5kIG1hcmtldGluZyBhZ2VuY3kgaGFzIGEgc3VjY2Vzc2Z1bCB0cmFjayByZWNvcmQgaW4gaWduaXRpbmcgYnJhbmRzIGZyb20gc3RhcnQtdXBzLCBuZXcgYXV0aG9ycywgYW5kIGNlbGVicml0aWVzIGJ5IGNvbm5lY3RpbmcgdGhlbSB3aXRoIGN1bHR1cmFsIHRyZW5kcyBhbmQgaW5mbHVlbmNlcnMuIFdoZW4gaXQgY2FtZSB0byByZXByZXNlbnRpbmcgdGhlaXIgYnJhbmQsIEsyIGNhbWUgdG8gdXMuIEJvbGQsIHZpYnJhbnQsIGFuZCBkeW5hbWljLCB0aGlzIHRpbWVsZXNzIGlkZW50aXR5IHN5c3RlbSByZWZsZWN0cyB0aGUgZm91bmRlcidzIGZhdm9yaXRlIGNvbG9yIGFuZCB0aGUgY29tcGFueSdzIGVuZXJnZXRpYyBjdWx0dXJlIGFuZCBlbnZpcm9ubWVudC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFB1YmxpYyBSZWxhdGlvbnMgJiBNYXJrZXRpbmcgZm9yIE1lZGlhXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2h5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBZnRlciBzdWNjZXNzZnVsbHkgYnJhbmRpbmcgdGhlaXIgZmlyc3QgZWF0ZXJ5LCB0aGlzIGNsaWVudCByZXR1cm5lZCB0byB1cyB0byByZWFsaXplIHRoZWlyIGRyZWFtIG9mIGFuIHVwc2NhbGUsIFVwcGVyIFdlc3QgU2lkZSBlYXRpbmcgZGVzdGluYXRpb24uXCIsXG4gICAgICAgICAgICBcIlRoZSBjdXN0b20gbGV0dGVyZm9ybSBpcyBhIHdoaW1zaWNhbCBwbGF5IG9uIHRoZWlyIHVuaXF1ZSBzcGVsbGluZyBhbmQgY2FuIHJlYWQgdXBzaWRlIGRvd24uIFRoZSB2aWJyYW50IGNvbG9yIHBhbGV0dGUgd2FzIGRldmVsb3BlZCBpbiBwYXJ0bmVyc2hpcCB3aXRoIHRoZSBpbnRlcmlvciBhcmNoaXRlY3R1cmUgdGVhbSB0byBjcmVhdGUgYSB3YXJtIGFuZCBleGNpdGluZyBhdG1vc3BoZXJlLiBUaGUgY3VzdG9tIGRpZS1jdXQgZWRnZSBvZiB0aGUgaWRlbnRpdHkgc3lzdGVtIG1pbWljcyB0aGUgY3VydmUgb2YgdGhlIHVuaXF1ZSwgc2hvd2Nhc2UgYmFyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUmVzdGF1cmFudCAmIEJhclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImFubiBzdWxsaXZhblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBbm4gZHJlYW1lZCBvZiBiZWluZyDigJx0aGUgT3ByYWjigJ0gb2Ygb3JnYW5pemluZy4gV2UgZXN0YWJsaXNoZWQgaGVyIG5hbWUgYXMgdGhlIGJyYW5kIGFuZCBjcmVhdGVkIGEgdGFnbGluZSwgd2hpY2ggcmVmbGVjdGVkIHRoZSBwZWFjZSBvZiBtaW5kIHRoYXQgaGVyIGNsaWVudHMgZ2V0IGZyb20gaGF2aW5nIGFuZCBtYWludGFpbmluZyBhbiBvcmdhbml6ZWQgbGlmZS4gVGhlIHNpbXBsZSBpY29uIHNlcmllcyByZXByZXNlbnRzIGVhY2ggYXJlYSBvZiBleHBlcnRpc2UuIEFzIHRoZSBjb21wYW55J3Mgc2VydmljZXMgaGF2ZSBleHBhbmRlZCBvdmVyIHRoZSB5ZWFycywgdGhlIGlkZW50aXR5IHN5c3RlbSBoYXMgZXZvbHZlZCBhbG9uZyB3aXRoIGl0IGFuZCByZW1haW5zIGFzIGZyZXNoIGFzIGl0IHdhcyBkYXkgb25lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHJvZmVzc2lvbmFsIE9yZ2FuaXppbmdcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJsb2FcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBwcm9mZXNzaW9uYWwgbWFrZS11cCBhcnRpc3QgdGVhbSBjYW1lIHRvIHVzIHRvIGJyYW5kIHRoZWlyIHBhdGVudGVkIOKAnHdhdGVyc2xpZGXigJ0gZXllIHBlbmNpbC4gQ29sb3IgbmFtZXMgbGlrZSDigJxHaXZpbmcgQmFjayBCbGFjayzigJ0gcmVmbGVjdCB0aGUgY29tcGFueSdzIGNvbW1pdG1lbnQgdG8gcHJvdmlkaW5nIG1ha2VvdmVycyBmb3Igd29tZW4gZmFjaW5nIGhlYWx0aCBjaGFsbGVuZ2VzLiBUaGUgcGxheWZ1bCBwYWNrYWdpbmcgZWxldmF0ZXMgYSBzdGFwbGUgcHJvZHVjdCB0byBnaWZ0IHdvcnRoeSBhbmQgZ2VuZXJhdGVzIGF0dGVudGlvbiBpbiBhIHNhdHVyYXRlZCBtYXJrZXQgYnkgZmx5aW5nIGFib3ZlIGl0cyBkaXNwbGF5IGNhc2UuIFRoZSBtb3RpZiBob2xkcyBzcGVjaWFsIG1lYW5pbmcgZm9yIHRoZSBmb3VuZGVyIHdobyBzaGFyZWQgd2l0aCB1cyB0aGF0IHRoZSBidXR0ZXJmbHkgaXMgYSBzaWduIHRoYXQgaGVyIGJlbG92ZWQgbW90aGVyIGlzIHN0aWxsIHdpdGggaGVyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogQmVhdXR5ICYgQ29zbWV0aWNzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2V0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgTWFzdGVyIEFyY2hpdGVjdCBhbmQgd29ybGQtcmVub3duZWQgc3BhIGRlc2lnbmVyIHVzZWQgaGlzIHJlcHV0YXRpb24gYW5kIGV4cGVydGlzZSBpbiBoeWRyb3RoZXJhcHkgdG8gbGF1bmNoIGFuIGV4Y2x1c2l2ZSBwcm9kdWN0IGxpbmUgZm9yIGx1eHVyeSBob3RlbHMgYW5kIHJlc29ydHMuIEEgc29vdGhpbmcsIG11dGVkIGNvbG9yIHBhbGV0dGUgd2FzIGRlc2lnbmVkIHRvIHJlZmxlY3QgdGhlIHNjZW50IHByb2ZpbGUgb2YgZWFjaCBzZXJpZXMgb2Ygc2NydWJzIGFuZCBsb3Rpb25zLiBBdXRoZW50aWMgd2F0ZXIgc3BsYXNoIHBob3RvZ3JhcGh5IHNldCB0aGUgdG9uZSB0byBwcm9tb3RlIHRoZSBoZWFsdGggYmVuZWZpdHMgYW5kIGFydCBvZiBiYXRoaW5nLiBUaGUgcGFja2FnZSBkZXNpZ24gZXhwYW5kZWQgdG8gZ2lmdCBhbmQgdHJhdmVsIHNldHMgdGhhdCBpbnZpdGUgZ3Vlc3RzIHRvIHRha2UgdGhlIGx1eHVyeSBleHBlcmllbmNlIGhvbWUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBIZWFsdGggJiBXZWxsbmVzcyBTcGFzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiZmVycmFnYW1vXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRhc2tlZCB3aXRoIG1hcmtldGluZyBvZmZpY2Ugc3BhY2UgYWJvdmUgdGhpcyBsdXh1cnkgYnJhbmQncyBGaWZ0aCBBdmVudWUgZmxhZ3NoaXAsIHdlIGZhY2VkIHRoZSBjaGFsbGVuZ2Ugb2YgYW4gdW5rbm93biwgc2lkZSBzdHJlZXQgZW50cmFuY2UuIEhhbmRlZCBub3RoaW5nIG1vcmUgdGhhbiBhbiBhcmNoaXRlY3QncyByZW5kZXJpbmcsIHdlIGVsZWdhbnRseSBicmFuZGVkIHRoZSBhZGRyZXNzLCBjYXB0dXJlZCB0aGUgZW5lcmd5IG9mIHRoZSBsb2NhdGlvbiwgYW5kIGdlbmVyYXRlZCBlbm91Z2ggYnV6eiB0byBleHBhbmQgdGhlIHZpZXdpbmcgcGFydHkgdG8gdHdvIGRhdGVzIGJ5IGx1cmluZyBicm9rZXJzIHdpdGggdGhlIHByb21pc2Ugb2YgYSBGZXJyYWdhbW8gdGllLiBUaGUgcmVzdWx0cyB3ZXJlIGEgcXVpY2sgY2xvc2luZyBhbmQgYSBmZWF0dXJlIGFydGljbGUgaW4gQ3JhaW4ncyBOWSBCdXNpbmVzcyBjaXRpbmcgb3VyIGlubm92YXRpb24gYW5kIHN1Y2Nlc3MgaW4gYSBjaGFsbGVuZ2luZyByZWFsIGVzdGF0ZSBtYXJrZXQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJpZXM6IEx1eHVyeSBGYXNoaW9uLCBSZWFsIEVzdGF0ZVwiLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuXG5mdW5jdGlvbiBzdHlsZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxuICAgICAgICAgICAgdGV4dFNxdWFyZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAyLjIsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiMzMzMzMzNcIixcbiAgICAgICAgICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjA2NSxcbiAgICAgICAgICAgICAgICB3aWR0aFNjYWxlOiAxLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogMC4yLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjMzMzMzMzXCIsXG4gICAgICAgICAgICAgICAgZm9udFNpemVTY2FsZTogMC4wMyxcbiAgICAgICAgICAgICAgICB3aWR0aFNjYWxlOiAxLFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW1hZ2UxLCAxKTtcbiAgICAgICAgY2VudGVySW1hZ2VTY2FsZWQoaW1hZ2UyLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGZvciAoY29uc3Qgd29ya0NvbnRlbnQgb2Ygd29ya0NvbnRlbnRzKSB7XG4gICAgICAgIGNvbnN0IHRleHRTcXVhcmUgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKHdvcmtDb250ZW50Lm5hbWUudG9VcHBlckNhc2UoKSwgLi4ud29ya0NvbnRlbnQuZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICBjb25zdCBpbWFnZTIgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8yLmpwZ2ApO1xuXG4gICAgICAgIHdvcmtEaXNwbGF5cy5wdXNoKHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0ZXh0U3F1YXJlLm1ham9yLFxuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIGltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZXb3JrKCkge1xuICAgIGNvbnN0IHdvcmtJdGVtczogV29ya0l0ZW1bXSA9IFtdO1xuICAgIGNvbnN0IHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSA9IFtdO1xuXG4gICAgY29uc3QgQk9UVE9NID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIGNvbnN0IFRPUCA9ICh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSA9PiB3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudFdpZHRoIC8gMjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya0NvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmtDb250ZW50ID0gd29ya0NvbnRlbnRzW2ldO1xuXG4gICAgICAgIGNvbnN0IHRhYkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0YWJFbGVtZW50LnNyYyA9IGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9L3RhYi5wbmdgO1xuICAgICAgICBib2R5LmFwcGVuZCh0YWJFbGVtZW50KTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHkucmVtb3ZlQ2hpbGQodGFiRWxlbWVudCkpO1xuXG4gICAgICAgIGNvbnN0IHNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XG4gICAgICAgIGNvbnN0IHNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcbiAgICAgICAgc3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDEwMDApO1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gLTAuMTtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDA7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgayA9IG1hcFJhbmdlKHNwcmluZy5wb3NpdGlvbiwgMCwgMSwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCkpO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS50b3AgPSBweChrKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZywgYm9keVNpZ10pO1xuICAgICAgICBzcHJpbmdTaWcudXBkYXRlKCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrSXRlbSBvZiB3b3JrSXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0gPSB3b3JrSXRlbTtcbiAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gbWFwUmFuZ2Uod2luZG93LmlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCksIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGJvZHlTaWcudXBkYXRlKCk7IC8vIGhtIGRvbnQgbGlrZSB0aGlzXG5cbiAgICAgICAgICAgIHF1ZXVlQmVmb3JlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFNjcm9sbCh3b3JrRGlzcGxheXNbaV0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSAxO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGNsZWFySW50ZXJ2YWwodGltZW91dEhhbmRsZSkpO1xuXG4gICAgICAgIHdvcmtJdGVtcy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50IH0gPSB3b3JrSXRlbXNbaV07XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gd2luZG93LmlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrSXRlbXMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gd2luZG93LmlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGspIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChrKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoayAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcblxuICAgICAgICAgICAgc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0Rpc3BsYXkgb2Ygd29ya0Rpc3BsYXlzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUod29ya0Rpc3BsYXkudGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbiAgICAgICAgICAgIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuXG4gICAgICAgICAgICBpZiAod29ya0Rpc3BsYXlzLmxlbmd0aCkgc2V0TWF4U2Nyb2xsKHdvcmtEaXNwbGF5c1t3b3JrRGlzcGxheXMubGVuZ3RoIC0gMV0uaW1hZ2UyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCBlbGVtZW50U2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBjbGlja05hdkNvbm5lY3QgfSBmcm9tIFwiLi9wYWdlcy9jb25uZWN0XCI7XG5pbXBvcnQgeyBjbGlja05hdkV2b2x1dGlvbiB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xuaW1wb3J0IHsgY2xpY2tOYXZJbnNwaXJhdGlvbiB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdlZpZXcgfSBmcm9tIFwiLi9wYWdlcy92aWV3XCI7XG5pbXBvcnQgeyBjbGlja05hdldvcmsgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XG5cbmV4cG9ydCBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmV4cG9ydCBjb25zdCBib2R5U2lnID0gZWxlbWVudFNpZ25hbChib2R5KTtcblxuZXhwb3J0IGNvbnN0IGllQmx1ZSA9IFwiIzYwOUNDRVwiO1xuZXhwb3J0IGNvbnN0IGllR3JlZW4gPSBcIiNiZmUwMjFcIjtcblxuZXhwb3J0IGNvbnN0IHZpZXdOYXYgPSBnKFwibmF2LXZpZXdcIik7XG5leHBvcnQgY29uc3Qgd29ya05hdiA9IGcoXCJuYXYtd29ya1wiKTtcbmV4cG9ydCBjb25zdCBpbnNwaXJhdGlvbk5hdiA9IGcoXCJuYXYtaW5zcGlyYXRpb25cIik7XG5leHBvcnQgY29uc3QgZXZvbHV0aW9uTmF2ID0gZyhcIm5hdi1ldm9sdXRpb25cIik7XG5leHBvcnQgY29uc3QgY29ubmVjdE5hdiA9IGcoXCJuYXYtY29ubmVjdFwiKTtcblxuZXhwb3J0IGNvbnN0IG5hdkl0ZW1zID0gW3ZpZXdOYXYsIHdvcmtOYXYsIGluc3BpcmF0aW9uTmF2LCBldm9sdXRpb25OYXYsIGNvbm5lY3ROYXZdO1xuXG5leHBvcnQgY29uc3Qgc2Nyb2xsQ2xpcCA9IGcoXCJzY3JvbGwtY2xpcFwiKTtcbmV4cG9ydCBjb25zdCBzY3JvbGxhYmxlSXRlbXMgPSBnKFwic2Nyb2xsYWJsZS1pdGVtc1wiKTtcblxuZXhwb3J0IGNvbnN0IGxvZ28gPSBnKFwibG9nb1wiKTtcblxuZXhwb3J0IGNvbnN0IGdsb2JhbFNWRyA9IGcoXCJnbG9iYWwtc3ZnXCIpO1xuXG5leHBvcnQgY29uc3Qgc2xlZXAgPSAobXM6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcblxuZXhwb3J0IGNvbnN0IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OID0gMC45NTtcblxuZXhwb3J0IGxldCBvbk5hdk9wdGlvbkNsaWNrOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5pbnRlcmZhY2UgRWxlbWVudEFsaWdubWVudCB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpITtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB4KHBpeGVsczogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHBpeGVscyArIFwicHhcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0dXBpZEFzcGVjdEdhcmJhZ2UoZWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIC8vIGkgZnVja2luZyBoYXRlIHRoaXMgbGF5b3V0IGVuZ2luZVxuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCgoZWxlbWVudC5uYXR1cmFsV2lkdGggLyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpICogZWxlbWVudC5jbGllbnRIZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVySW1hZ2VTY2FsZWQoaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBzY3JvbGxDbGlwLmNsaWVudEhlaWdodCAqIHNjYWxlO1xuICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodCk7XG4gICAgc3R1cGlkQXNwZWN0R2FyYmFnZShpbWFnZSk7XG4gICAgaW1hZ2Uuc3R5bGUudG9wID0gcHgoKHNjcm9sbENsaXAuY2xpZW50SGVpZ2h0IC0gaGVpZ2h0KSAvIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVldWVCZWZvcmVMYXlvdXQoZXZlbnQ6ICgpID0+IHZvaWQpIHtcbiAgICBxdWV1ZWRCZWZvcmVMYXlvdXQucHVzaChldmVudCk7XG59XG5cbmZ1bmN0aW9uIG5vdGlmeUltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGltYWdlTG9hZGluZ1Byb21pc2VzLnB1c2goaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW1hZ2Uoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsSW1hZ2Uuc3JjID0gc3JjO1xuICAgIG5vdGlmeUltYWdlTG9hZGluZyhzY3JvbGxJbWFnZSk7XG4gICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxhYmxlSXRlbXMuYXBwZW5kQ2hpbGQoc2Nyb2xsSW1hZ2UpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gc2Nyb2xsYWJsZUl0ZW1zLnJlbW92ZUNoaWxkKHNjcm9sbEltYWdlKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsSW1hZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBSYW5nZShuOiBudW1iZXIsIHN0YXJ0MTogbnVtYmVyLCBzdG9wMTogbnVtYmVyLCBzdGFydDI6IG51bWJlciwgc3RvcDI6IG51bWJlcikge1xuICAgIHJldHVybiAoKG4gLSBzdGFydDEpIC8gKHN0b3AxIC0gc3RhcnQxKSkgKiAoc3RvcDIgLSBzdGFydDIpICsgc3RhcnQyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIC8vIHJldHVybiBzY3JvbGxhYmxlSXRlbXMuY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuNztcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICogU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OOyAvLyBUT0RPIHRoaXMgc2hvdWxkIGp1c3QgdXNlIGFjdHVhbCBzY3JvbGwgaGVpZ2h0XG59XG5cbmZ1bmN0aW9uIGNsaWNrQW55TmF2KG5hdkl0ZW06IEhUTUxFbGVtZW50LCBmOiAoKSA9PiB2b2lkKSB7XG4gICAgbmF2SXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcblxuICAgIG5hdkl0ZW0ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgc2Nyb2xsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG9uTmF2T3B0aW9uQ2xpY2spIHUoKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljayA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBuYXZJdGVtcykge1xuICAgICAgICAgICAgbi5zdHlsZS5jb2xvciA9IFwiIzgwODA4MFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG4gICAgICAgIGYoKTtcblxuICAgICAgICBzY3JvbGwgPSAwO1xuICAgICAgICB1cGRhdGVTY3JvbGwoKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyVmVydGljYWwoaXRlbTogSFRNTEVsZW1lbnQsIHk6IG51bWJlcikge1xuICAgIHJldHVybiB5IC0gaXRlbS5jbGllbnRIZWlnaHQgLyAyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25XaXRoR2FwKGxlZnRFbGVtZW50OiBIVE1MRWxlbWVudCwgcmlnaHRFbGVtZW50OiBIVE1MRWxlbWVudCwgZ2FwOiBudW1iZXIpIHtcbiAgICByaWdodEVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KGxlZnRFbGVtZW50Lm9mZnNldExlZnQgKyBsZWZ0RWxlbWVudC5jbGllbnRXaWR0aCArIGdhcCk7XG59XG5cbmludGVyZmFjZSBTY3JvbGxUZXh0RGV0YWlscyB7XG4gICAgbGV0dGVyU3BhY2luZzogbnVtYmVyO1xuICAgIGZvbnRXZWlnaHQ6IG51bWJlcjtcbiAgICBjb2xvcjogc3RyaW5nO1xuXG4gICAgZm9udFNpemVTY2FsZTogbnVtYmVyO1xuICAgIHdpZHRoU2NhbGU6IG51bWJlcjtcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHNjcm9sbFRleHQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbGFibGVJdGVtcy5hcHBlbmQoc2Nyb2xsVGV4dCk7XG4gICAgfSk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IHNjcm9sbGFibGVJdGVtcy5yZW1vdmVDaGlsZChzY3JvbGxUZXh0KSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFNpemUgPSBweChzY3JvbGxIZWlnaHQgKiBzLmZvbnRTaXplU2NhbGUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzY3JvbGxIZWlnaHQgKiBzLndpZHRoU2NhbGUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGluZUhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCAqIHMubGluZUhlaWdodFNjYWxlKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHlBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbmV4cG9ydCBjb25zdCB4QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudFdpZHRoKTtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dFNxdWFyZShtYWpvclRleHQ6IHN0cmluZywgLi4ubWlub3JUZXh0czogc3RyaW5nW10pOiBUZXh0U3F1YXJlIHtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vcnMgPSBtaW5vclRleHRzLm1hcChhZGRTY3JvbGxUZXh0KTtcbiAgICByZXR1cm4geyBtYWpvciwgbWlub3JzIH07XG59XG5cbmludGVyZmFjZSBTY3JvbGxUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBTY3JvbGxUZXh0U3F1YXJlLCBtYWpvclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlsczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzdHlsZVNjcm9sbFRleHQobWFqb3IsIG1ham9yU2Nyb2xsVGV4dERldGFpbHMpO1xuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSBzdHlsZVNjcm9sbFRleHQobWlub3IsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHMpO1xufVxuXG5sZXQgaW1hZ2VMb2FkaW5nUHJvbWlzZXM6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xubGV0IHF1ZXVlZEJlZm9yZUxheW91dDogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IHVwZGF0ZUxheW91dEltYWdlV2FpdGluZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VMb2FkaW5nUHJvbWlzZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGltYWdlTG9hZGluZ0FwcGVuZCBvZiBxdWV1ZWRCZWZvcmVMYXlvdXQpIGltYWdlTG9hZGluZ0FwcGVuZCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBxdWV1ZWRCZWZvcmVMYXlvdXQgPSBbXTtcbiAgICAgICAgdXBkYXRlTGF5b3V0KCk7XG4gICAgfTtcbiAgICBlZmZlY3QodXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nLCBbYm9keVNpZ10pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dEltYWdlV2FpdGluZykpO1xuXG4gICAgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnblNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFNjcm9sbFRleHRTcXVhcmUsIG1ham9yVG9NaW5vckdhcDogbnVtYmVyLCBiZXR3ZWVuTWlub3JzR2FwOiBudW1iZXIpIHtcbiAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW107XG5cbiAgICBpdGVtcy5wdXNoKG1ham9yLCBtYWpvclRvTWlub3JHYXApO1xuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgaXRlbXMucHVzaChtaW5vciwgYmV0d2Vlbk1pbm9yc0dhcCk7XG4gICAgfVxuICAgIGl0ZW1zLnBvcCgpOyAvLyByZW1vdmUgZmluYWwgZ2FwLCBvbmx5IHdhbnQgYmV0d2VlbnNcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgdG90YWxIZWlnaHRdID0geUFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuICAgIGNvbnN0IGdyb3VwVG9wID0gKHNjcm9sbEhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDI7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChncm91cFRvcCArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgbWlub3Iuc3R5bGUubGVmdCA9IG1ham9yLnN0eWxlLmxlZnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhY2VUb0ZpbGUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShcIiBcIiwgXCItXCIpO1xufVxuXG4vLyByZWFsIHN0dWZmXG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbGVmdEFsaWduID0gODA7XG4gICAgbG9nby5zdHlsZS53aWR0aCA9IHB4KDU1KTtcbiAgICBsb2dvLnN0eWxlLmhlaWdodCA9IHB4KDU1KTtcbiAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgIGxvZ28uc3R5bGUudG9wID0gcHgobGVmdEFsaWduIC8gMik7XG5cbiAgICBmdW5jdGlvbiBhbGlnbk5hdkl0ZW0obmF2SXRlbTogSFRNTEVsZW1lbnQsIG51ZGdlOiBudW1iZXIpIHtcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgbmF2SXRlbS5zdHlsZS50b3AgPSBweCh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyICsgbnVkZ2UgKiA1MCAtIG5hdkl0ZW0uY2xpZW50SGVpZ2h0IC8gMik7XG4gICAgfVxuXG4gICAgYWxpZ25OYXZJdGVtKHZpZXdOYXYsIC0yKTtcbiAgICBhbGlnbk5hdkl0ZW0od29ya05hdiwgLTEpO1xuICAgIGFsaWduTmF2SXRlbShpbnNwaXJhdGlvbk5hdiwgMCk7XG4gICAgYWxpZ25OYXZJdGVtKGV2b2x1dGlvbk5hdiwgMSk7XG4gICAgYWxpZ25OYXZJdGVtKGNvbm5lY3ROYXYsIDIpO1xufSwgW2JvZHlTaWddKTtcblxuZWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgc2Nyb2xsQ2xpcC5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUud2lkdGggPSBweCh3aW5kb3cuaW5uZXJXaWR0aCAtIHgpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUudG9wID0gcHgoY2VudGVyVmVydGljYWwoc2Nyb2xsQ2xpcCwgd2luZG93LmlubmVySGVpZ2h0IC8gMikpO1xuICAgIHNjcm9sbENsaXAuc3R5bGUubGVmdCA9IHB4KHgpO1xuXG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLndpZHRoID0gcHgoMTAwKTtcbiAgICBzY3JvbGxhYmxlSXRlbXMuc3R5bGUuaGVpZ2h0ID0gcHgoMTAwKTtcbn0sIFtib2R5U2lnXSk7XG5cbmxldCBzY3JvbGwgPSAwO1xuXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGwoKSB7XG4gICAgc2Nyb2xsYWJsZUl0ZW1zLnN0eWxlLmxlZnQgPSBweCgtc2Nyb2xsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbChzOiBudW1iZXIpIHtcbiAgICBzY3JvbGwgPSBzO1xuICAgIHVwZGF0ZVNjcm9sbCgpO1xufVxuXG5sZXQgbWF4U2Nyb2xsID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1heFNjcm9sbChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIG1heFNjcm9sbCA9IGVsZW1lbnQub2Zmc2V0TGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggLSBzY3JvbGxDbGlwLm9mZnNldFdpZHRoICsgMTAwO1xufVxud2luZG93Lm9ud2hlZWwgPSAoZSkgPT4ge1xuICAgIHNjcm9sbCArPSBlLmRlbHRhWCArIGUuZGVsdGFZO1xuICAgIGlmIChzY3JvbGwgPCAwKSBzY3JvbGwgPSAwO1xuICAgIGlmIChzY3JvbGwgPiBtYXhTY3JvbGwpIHNjcm9sbCA9IG1heFNjcm9sbDtcbiAgICB1cGRhdGVTY3JvbGwoKTtcbn07XG5cbmNsaWNrQW55TmF2KGxvZ28sIGNsaWNrTmF2Vmlldyk7XG5cbmNsaWNrQW55TmF2KHZpZXdOYXYsIGNsaWNrTmF2Vmlldyk7XG5jbGlja0FueU5hdih3b3JrTmF2LCBjbGlja05hdldvcmspO1xuY2xpY2tBbnlOYXYoaW5zcGlyYXRpb25OYXYsIGNsaWNrTmF2SW5zcGlyYXRpb24pO1xuY2xpY2tBbnlOYXYoZXZvbHV0aW9uTmF2LCBjbGlja05hdkV2b2x1dGlvbik7XG5jbGlja0FueU5hdihjb25uZWN0TmF2LCBjbGlja05hdkNvbm5lY3QpO1xuXG5zZXRUaW1lb3V0KCgpID0+IHZpZXdOYXYuY2xpY2soKSk7XG4iLCJleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgIHN1YnNjcmliZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICAgIHN1YnNjcmliZShzdWJzY3JpYmVyOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmliZXJzLmZpbHRlcigocykgPT4gcyAhPT0gc3Vic2NyaWJlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3QoZnVuYzogKCkgPT4gdm9pZCwgb2JzZXJ2ZWRTaWduYWxzOiBTaWduYWxbXSkge1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG8pID0+IG8uc3Vic2NyaWJlKGZ1bmMpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kPFQ+KGZ1bmM6ICgpID0+IFQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pOiBbVCwgU2lnbmFsXSB7XHJcbiAgICBjb25zdCBzaWduYWwgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBjb25zdCBvYmogPSBmdW5jKCk7XHJcbiAgICBvYnNlcnZlZFNpZ25hbHMuZm9yRWFjaCgob2JzZXJ2ZWRTaWduYWwpID0+XHJcbiAgICAgICAgb2JzZXJ2ZWRTaWduYWwuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvYmogYXMgb2JqZWN0LCBmdW5jKCkpO1xyXG4gICAgICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgICByZXR1cm4gW29iaiwgc2lnbmFsXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRTaWduYWwoZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgY29uc3QgZWxlbWVudE9icyA9IG5ldyBTaWduYWwoKTtcclxuICAgIG5ldyBSZXNpemVPYnNlcnZlcigoXykgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRPYnMudXBkYXRlKCk7XHJcbiAgICB9KS5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRPYnM7XHJcbn1cclxuIiwiaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaW5nIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICB0YXJnZXQ6IG51bWJlcjtcclxuICAgIHZlbG9jaXR5ID0gMDtcclxuICAgIGRhbXBpbmcgPSAwO1xyXG4gICAgc3RpZmZuZXNzID0gMDtcclxuICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gbXgnJyAtIGJ4JyA9IGt4XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2soZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFjY2VsZXJhdGlvbiA9IHRoaXMuc3RpZmZuZXNzICogKHRoaXMudGFyZ2V0IC0gdGhpcy5wb3NpdGlvbikgLSB0aGlzLmRhbXBpbmcgKiB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgKz0gYWNjZWxlcmF0aW9uICogZHQ7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiArPSB0aGlzLnZlbG9jaXR5ICogZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RpZmZuZXNzQ3JpdGljYWwoc3RpZmZuZXNzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0aWZmbmVzcyA9IHN0aWZmbmVzcztcclxuICAgICAgICB0aGlzLmRhbXBpbmcgPSBNYXRoLnNxcnQoNCAqIHN0aWZmbmVzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSA9IDAuMDE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVNwcmluZyhzcHJpbmc6IFNwcmluZywgc2lnbmFsOiBTaWduYWwpIHtcclxuICAgIGlmIChzcHJpbmcuaXNBbmltYXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRpY2tTcHJpbmcoKSB7XHJcbiAgICAgICAgc3ByaW5nLnRpY2soMSAvIDYwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGlja1NwcmluZygpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9wYWdlcy92aWV3XCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvd29ya1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvY29ubmVjdFwiO1xyXG5cclxuaW1wb3J0IFwiLi9zaGFyZWRcIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9