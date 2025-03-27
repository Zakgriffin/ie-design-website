/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION: () => (/* binding */ SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION),
/* harmony export */   body: () => (/* binding */ body),
/* harmony export */   bodySig: () => (/* binding */ bodySig),
/* harmony export */   ieBlue: () => (/* binding */ ieBlue),
/* harmony export */   ieGreen: () => (/* binding */ ieGreen)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");

const body = document.body;
const bodySig = (0,_signal__WEBPACK_IMPORTED_MODULE_0__.elementSignal)(body);
const ieBlue = "#609CCE";
const ieGreen = "#bfe021";
const SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION = 0.95;


/***/ }),

/***/ "./src/layout.ts":
/*!***********************!*\
  !*** ./src/layout.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignScrollTextSquare: () => (/* binding */ alignScrollTextSquare),
/* harmony export */   alignWithGap: () => (/* binding */ alignWithGap),
/* harmony export */   centerScaledX: () => (/* binding */ centerScaledX),
/* harmony export */   centerScaledY: () => (/* binding */ centerScaledY),
/* harmony export */   getScrollHeight: () => (/* binding */ getScrollHeight),
/* harmony export */   getScrollWidth: () => (/* binding */ getScrollWidth),
/* harmony export */   isLandscape: () => (/* binding */ isLandscape),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   notifyImageLoading: () => (/* binding */ notifyImageLoading),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   queueBeforeLayout: () => (/* binding */ queueBeforeLayout),
/* harmony export */   registerUpdateLayout: () => (/* binding */ registerUpdateLayout),
/* harmony export */   xAligningWithGaps: () => (/* binding */ xAligningWithGaps),
/* harmony export */   yAligningWithGaps: () => (/* binding */ yAligningWithGaps)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared */ "./src/shared.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let imageLoadingPromises = [];
let queuedBeforeLayout = [];
function px(pixels) {
    return pixels + "px";
}
function mapRange(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
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
        (0,_signal__WEBPACK_IMPORTED_MODULE_2__.effect)(updateLayoutImageWaiting, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
        _shared__WEBPACK_IMPORTED_MODULE_1__.onNavOptionClick.push(() => _constants__WEBPACK_IMPORTED_MODULE_0__.bodySig.unsubscribe(updateLayoutImageWaiting));
        updateLayoutImageWaiting();
    });
}
function queueBeforeLayout(event) {
    queuedBeforeLayout.push(event);
}
function notifyImageLoading(image) {
    imageLoadingPromises.push(image.decode());
}
function getScrollHeight() {
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return window.innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}
function getScrollWidth() {
    const SCROLL_WIDTH_PROPORTION = 1;
    return window.innerWidth * SCROLL_WIDTH_PROPORTION; // TODO this should just use actual scroll height
}
function alignWithGap(leftElement, rightElement, gap) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.clientWidth + gap);
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
function centerScaledY(element, scale) {
    const height = _shared__WEBPACK_IMPORTED_MODULE_1__.scrollContainer.clientHeight * scale;
    element.style.height = px(height);
    element.style.top = px((_shared__WEBPACK_IMPORTED_MODULE_1__.scrollContainer.clientHeight - height) / 2);
}
function centerScaledX(element, scale) {
    const width = _shared__WEBPACK_IMPORTED_MODULE_1__.scrollContainer.clientWidth * scale;
    element.style.width = px(width);
    if (element instanceof HTMLImageElement)
        element.style.height = px((width * element.naturalHeight) / element.naturalWidth);
    element.style.left = px((_shared__WEBPACK_IMPORTED_MODULE_1__.scrollContainer.clientWidth - width) / 2);
}
function isLandscape() {
    return window.innerWidth / window.innerHeight > 1;
}


/***/ }),

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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");



function addQuote(quoteText, authorText, titleText) {
    const quote = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)(quoteText);
    const author = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)(authorText);
    const title = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)(titleText);
    const openQuote = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("“");
    const closeQuote = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("”");
    return { quote, author, title, openQuote, closeQuote };
}
function styleQuote({ quote, author, title, openQuote, closeQuote }) {
    const widthScale = 0.75;
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(quote, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSizeScale: 0.032, widthScale, lineHeightScale: 0.065 });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(author, { letterSpacing: 0.2, fontWeight: 350, color: "#000000", fontSizeScale: 0.035, widthScale, lineHeightScale: 0.06 });
    author.style.textAlign = "right";
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(title, { letterSpacing: 0.15, fontWeight: 350, color: "#000000", fontSizeScale: 0.025, widthScale, lineHeightScale: 0.06 });
    title.style.textAlign = "right";
    const quoteTextDetails = { letterSpacing: 0.2, fontWeight: 350, color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieGreen, fontSizeScale: 0.15, widthScale: 0.05, lineHeightScale: 0.06 };
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(openQuote, quoteTextDetails);
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(closeQuote, quoteTextDetails);
}
function layoutQuote({ quote, author, title, openQuote, closeQuote }, nudge) {
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
    author.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft);
    title.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft);
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.yAligningWithGaps)([
        quote,
        0.04 * s,
        author,
        -0.015 * s,
        title,
    ]);
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset + 0.35 * s);
    }
    openQuote.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft - 0.07 * s);
    openQuote.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetTop + 0.05 * s);
    closeQuote.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft + quote.offsetWidth - nudge);
    closeQuote.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetTop + quote.offsetHeight - 0.01 * s);
}
function clickNavEvolution() {
    const evolution = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("evolution/evolution.svg");
    const evolutionHistory = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("evolution/evolution-history.svg");
    // const logoFull = addScrollImage("evolution/logo-full.svg");
    const promos = [];
    for (let i = 1; i <= 5; i++)
        promos.push((0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(`evolution/promo-${i}.jpg`));
    const quotes = [
        addQuote("Our annual promo is always grounded in our identity but it's fun to push limits and reinvent ourselves each year. The best part is <strong>hearing what our clients have to say.</strong>", "BETHLYN KRAKAUER", "Founder, i.e. design, inc."),
        addQuote("I love how you do stuff. I'm finding that these types of messages are really <strong>transforming relationships</strong> with people. They are just dreamy.", "DEBRA SCHATZKI", "Founder, BPP Wealth Solutions LLC"),
        addQuote("I see a lot of this special quality in your work. It's not just about being intentional. You always bring in an element of <strong>surprise and delight.</strong>", "JOSH KRAKAUER", "Founder, Sculpt"),
        addQuote("Your approach works so well because it is really <strong>personal</strong> and equally <strong>professional.</strong>", "ANN SULLIVAN", "Founder, Ann Sullivan Organizing"),
        addQuote("You truly understand the unique positioning of a prospective client and are able to <strong>tell their story</strong> exactly as it should be told.", "DAVID YUN", "Principal, Varident LLC"),
        addQuote("Beth is quite frankly one of the <strong>most talented designers</strong> that I have ever had the privilege to work with. She always has a special way of making everything she touches turn to gold!", "DAVID RUSH", "President, ENV"),
    ];
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.registerUpdateLayout)(() => {
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(evolution, 0.75);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(evolutionHistory, 0.3);
        for (const promo of promos)
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(promo, 1);
        for (const quote of quotes)
            styleQuote(quote);
        const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
        const items = [evolution, 0.2 * s, evolutionHistory];
        const maxLength = Math.max(quotes.length, promos.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < quotes.length)
                items.push(0.3 * s, quotes[i].quote);
            if (i < promos.length)
                items.push(0.3 * s, promos[i]);
        }
        const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.xAligningWithGaps)(items);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
        }
        for (const quote of quotes)
            layoutQuote(quote, 0.05 * s);
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");



const INSPIRATION_TILE_WIDTH_PROPORTION = 0.85;
function styleInspirationTile({ image, major, minor, readMore }) {
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(major, {
        letterSpacing: 0.6,
        fontWeight: 400,
        color: "#000000",
        fontSizeScale: 0.036,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.09,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(minor, {
        letterSpacing: 0.3,
        fontWeight: 350,
        color: "#000000",
        fontSizeScale: 0.027,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.05,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(readMore, {
        letterSpacing: 0.5,
        fontWeight: 400,
        color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieBlue,
        fontSizeScale: 0.03,
        widthScale: INSPIRATION_TILE_WIDTH_PROPORTION,
        lineHeightScale: 0.05,
    });
    const scrollHeight = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
    image.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(scrollHeight * 0.55);
}
function alignInspirationTile({ image, major, minor, readMore }) {
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
    major.style.left = image.style.left;
    minor.style.left = image.style.left;
    readMore.style.left = image.style.left;
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.yAligningWithGaps)([
        image,
        0.03 * s,
        major,
        -0.01 * s,
        minor,
        0.01 * s,
        readMore,
    ]);
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset + s * 0.15);
    }
}
function addInspirationTile(imageString, majorText, minorText) {
    const image = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(imageString);
    const major = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)(majorText);
    const minor = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)(minorText);
    const readMore = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("Read more");
    return { image, major, minor, readMore };
}
function clickNavInspiration() {
    const inspiration = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("inspiration/inspiration.svg");
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
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.registerUpdateLayout)(() => {
        const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(inspiration, 0.75);
        for (const tile of tiles)
            styleInspirationTile(tile);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(inspiration, tiles[0].image, s * 0.25);
        for (let i = 0; i < tiles.length - 1; i++)
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(tiles[i].image, tiles[i + 1].image, s * 0.1);
        for (const tile of tiles)
            alignInspirationTile(tile);
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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");



const majorScrollTextDetails = {
    letterSpacing: 2.2,
    fontWeight: 400,
    color: "#B3B3B3",
    fontSizeScale: 0.065,
    widthScale: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.09,
};
const minorScrollTextDetails = {
    letterSpacing: 0.2,
    fontWeight: 300,
    color: "#000000",
    fontSizeScale: 0.03,
    widthScale: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.05,
};
function clickNavView() {
    const home = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/home.svg");
    const horizon = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/horizon.jpg");
    const freshLook = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/fresh-look.svg");
    const greatBrands = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/great-brands.jpg");
    const textTile1 = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollTextSquare)("GREAT BRANDS DON'T JUST HAPPEN", "They require exploration, insight, and tenacity. We hunt for that magic spark that ignites innovation. We bring our extensive skills and experience to each project and give it our all. The result is clear, yet elevated communication that makes people stop, think, and often smile.", "Our studio location is profoundly inspiring. The magnificent view feeds our souls and keeps us inspired to do our best work. It's a place where creative people come together to collaborate and drill down to the heart of the matter. To solve problems and bring ideas to life. To create things worth remembering.");
    const insightClarity = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/insight-clarity.jpg");
    const textTile2 = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollTextSquare)("WE BRING VISION, INSIGHT, AND CLARITY TO EVERY PROJECT", "Successful design starts with identifying a client's needs, goals, and aspirations. Our objectivity shines light on what others have missed. We have the ability to see and interpret the inner workings, culture, and nuances of our client's world. We ask questions – lots of questions. Then listen until we gain the deep understanding necessary to build the solid foundation that any enduring brand needs.", "Our small but mighty team brings together a wide range of talents and perspectives, plus a nice list of awards. We throw our hearts into our work and are known for our fierce commitment to the trusted, long-term partnerships we form. For us, it's personal.");
    const skyward = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("view/skyward.jpg");
    const textTile3 = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollTextSquare)("WE SEE WORK IN A DIFFERENT LIGHT", "People like to ask about our design process. The truth is that the approach to each project varies, because each client and their needs are unique. Creative breakthroughs don't follow the clock. They can happen any time of day – or night. Whether an epiphany is illuminated in a scribble, a dream, or as the clouds roll by, we embrace the fact that each project takes on a life of its own.", "What's constant is our ability to listen and focus, to analyze and connect dots, and to remain curious. The most rewarding projects are with clients who value the balance between pushing forward and allowing time for the perfect solution to emerge. That's our happy place.");
    const textTiles = [textTile1, textTile2, textTile3];
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.registerUpdateLayout)(() => {
        const HOME_HORIZON_PAD = 0.2;
        const FRESH_LOOK_PAD = 0.13;
        const IMAGE_TEXT_SQUARE_PAD = 0.17;
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(home, 0.95);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(horizon, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(freshLook, 0.8);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(greatBrands, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(insightClarity, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(skyward, 1);
            for (const textTile of textTiles)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textTile, majorScrollTextDetails, minorScrollTextDetails);
            const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
            const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.xAligningWithGaps)([
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
                element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
            }
            for (const textTile of textTiles)
                (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignScrollTextSquare)(textTile, 20, 20);
        }
        else {
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(home, 0.95);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(horizon, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(freshLook, 0.8);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(greatBrands, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(insightClarity, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(skyward, 1);
            for (const textTile of textTiles)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textTile, majorScrollTextDetails, minorScrollTextDetails);
            for (const textTile of textTiles) {
                (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(textTile.major, 0.8);
                for (const minor of textTile.minors)
                    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(minor, 0.8);
            }
            const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollWidth)();
            const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.yAligningWithGaps)([
                //
                home,
                0.1 * s,
                horizon,
                0.1 * s,
                freshLook,
                0.1 * s,
                greatBrands,
                0.1 * s,
                textTile1.major,
                ...textTile1.minors,
                0.1 * s,
                insightClarity,
                0.1 * s,
                textTile2.major,
                ...textTile2.minors,
                0.1 * s,
                skyward,
                0.1 * s,
                textTile3.major,
                ...textTile3.minors,
            ]);
            for (const { element, offset } of elementAlignments) {
                element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
            }
        }
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
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");





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
        (0,_layout__WEBPACK_IMPORTED_MODULE_3__.centerScaledY)(image1, 1);
        (0,_layout__WEBPACK_IMPORTED_MODULE_3__.centerScaledY)(image2, 1);
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
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    for (const { textSquare, image1, image2 } of workDisplays) {
        items.push(
        //
        textSquare.major, 0.2 * s, image1, 0.15 * s, image2, 0.22 * s);
    }
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.xAligningWithGaps)(items);
    for (const { element, offset } of elementAlignments) {
        element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(offset);
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
        _constants__WEBPACK_IMPORTED_MODULE_4__.body.append(tabElement);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => _constants__WEBPACK_IMPORTED_MODULE_4__.body.removeChild(tabElement));
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
            const k = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.mapRange)(spring.position, 0, 1, BOTTOM(tabElement), TOP(tabElement));
            tabElement.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(k);
        }, [springSig, _constants__WEBPACK_IMPORTED_MODULE_4__.bodySig]);
        springSig.update();
        tabElement.onclick = () => {
            for (const workItem of workItems) {
                const { tabElement, spring, springSig } = workItem;
                spring.target = 1;
                tabElement.onmouseover = () => {
                    spring.target = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.mapRange)(window.innerHeight - tabElement.width, BOTTOM(tabElement), TOP(tabElement), 0, 1);
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                tabElement.onmouseleave = () => {
                    spring.target = 1;
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
            }
            populateWorkDisplays(workDisplays);
            _constants__WEBPACK_IMPORTED_MODULE_4__.bodySig.update(); // hm dont like this
        };
        const timeoutHandle = setTimeout(() => {
            spring.position = 1;
            tabElement.style.visibility = "visible";
            (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
        }, 80 * i);
        _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => clearInterval(timeoutHandle));
        workItems.push({ tabElement, spring, springSig });
    }
    (0,_layout__WEBPACK_IMPORTED_MODULE_3__.registerUpdateLayout)(() => {
        for (let i = 0; i < workItems.length; i++) {
            const { tabElement } = workItems[i];
            const start = 300;
            const end = window.innerWidth - 150;
            const width = (end - start) / (workItems.length * 2 - 1);
            const height = width * (tabElement.naturalHeight / tabElement.naturalWidth);
            const k = window.innerHeight * 0.8;
            if (height < k) {
                tabElement.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(width);
                tabElement.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(height);
            }
            else {
                tabElement.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(k);
                tabElement.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(k * (tabElement.naturalWidth / tabElement.naturalHeight));
            }
            tabElement.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.px)(start + i * width * 2);
            styleWorkDisplays(workDisplays);
            const s = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
            for (const workDisplay of workDisplays)
                (0,_layout__WEBPACK_IMPORTED_MODULE_3__.alignScrollTextSquare)(workDisplay.textSquare, 0.01 * s, 0.01 * s);
            layoutWorkDisplays(workDisplays);
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
/* harmony export */   addScrollImage: () => (/* binding */ addScrollImage),
/* harmony export */   addScrollText: () => (/* binding */ addScrollText),
/* harmony export */   addScrollTextSquare: () => (/* binding */ addScrollTextSquare),
/* harmony export */   connectNav: () => (/* binding */ connectNav),
/* harmony export */   evolutionNav: () => (/* binding */ evolutionNav),
/* harmony export */   g: () => (/* binding */ g),
/* harmony export */   inspirationNav: () => (/* binding */ inspirationNav),
/* harmony export */   logo: () => (/* binding */ logo),
/* harmony export */   navItems: () => (/* binding */ navItems),
/* harmony export */   onNavOptionClick: () => (/* binding */ onNavOptionClick),
/* harmony export */   scrollContainer: () => (/* binding */ scrollContainer),
/* harmony export */   spaceToFile: () => (/* binding */ spaceToFile),
/* harmony export */   styleScrollText: () => (/* binding */ styleScrollText),
/* harmony export */   styleScrollTextSquare: () => (/* binding */ styleScrollTextSquare),
/* harmony export */   viewNav: () => (/* binding */ viewNav),
/* harmony export */   workNav: () => (/* binding */ workNav)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");








const viewNav = g("nav-view");
const workNav = g("nav-work");
const inspirationNav = g("nav-inspiration");
const evolutionNav = g("nav-evolution");
const connectNav = g("nav-connect");
const navItems = [viewNav, workNav, inspirationNav, evolutionNav, connectNav];
const scrollContainer = g("scroll-container");
const logo = g("logo");
let onNavOptionClick = [];
function g(id) {
    return document.getElementById(id);
}
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    (0,_layout__WEBPACK_IMPORTED_MODULE_6__.notifyImageLoading)(scrollImage);
    (0,_layout__WEBPACK_IMPORTED_MODULE_6__.queueBeforeLayout)(() => {
        scrollContainer.appendChild(scrollImage);
        onNavOptionClick.push(() => scrollContainer.removeChild(scrollImage));
    });
    return scrollImage;
}
function clickAnyNav(navItem, f) {
    navItem.style.cursor = "pointer";
    navItem.onclick = () => {
        for (const u of onNavOptionClick)
            u();
        onNavOptionClick = [];
        for (const n of navItems) {
            n.style.color = "#808080";
        }
        navItem.style.color = "#000000";
        f();
    };
}
function addScrollText(text) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    (0,_layout__WEBPACK_IMPORTED_MODULE_6__.queueBeforeLayout)(() => {
        scrollContainer.append(scrollText);
    });
    onNavOptionClick.push(() => scrollContainer.removeChild(scrollText));
    return scrollText;
}
function styleScrollText(scrollText, s) {
    scrollText.style.fontFamily = "Spartan";
    scrollText.style.position = "absolute";
    scrollText.style.fontWeight = "" + s.fontWeight;
    scrollText.style.color = s.color;
    scrollText.style.letterSpacing = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(s.letterSpacing);
    const scrollHeight = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.getScrollHeight)();
    scrollText.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollHeight * s.fontSizeScale);
    scrollText.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollHeight * s.widthScale);
    scrollText.style.lineHeight = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollHeight * s.lineHeightScale);
}
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
function spaceToFile(s) {
    return s.replace(" ", "-");
}
(0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
    if ((0,_layout__WEBPACK_IMPORTED_MODULE_6__.isLandscape)()) {
        const leftAlign = 80;
        logo.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(55);
        logo.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(55);
        logo.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(leftAlign);
        logo.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(leftAlign / 2);
        function alignNavItem(navItem, nudge) {
            navItem.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(leftAlign);
            navItem.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(window.innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
        }
        alignNavItem(viewNav, -2);
        alignNavItem(workNav, -1);
        alignNavItem(inspirationNav, 0);
        alignNavItem(evolutionNav, 1);
        alignNavItem(connectNav, 2);
    }
    else {
        function goAway(element) {
            element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(-1000);
            element.style.right = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(-1000);
        }
        goAway(logo); // temporary
        goAway(viewNav);
        goAway(workNav);
        goAway(inspirationNav);
        goAway(evolutionNav);
        goAway(connectNav);
    }
}, [_constants__WEBPACK_IMPORTED_MODULE_7__.bodySig]);
(0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
    if ((0,_layout__WEBPACK_IMPORTED_MODULE_6__.isLandscape)()) {
        const x = 280;
        const scrollHeight = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.getScrollHeight)();
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollHeight);
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(window.innerWidth - x);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((window.innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(x);
    }
    else {
        const scrollWidth = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.getScrollWidth)();
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollWidth);
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(window.innerHeight);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((window.innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(0);
    }
}, [_constants__WEBPACK_IMPORTED_MODULE_7__.bodySig]);
// replace normal scroll behavior with xy behavior
scrollContainer.onwheel = (e) => e.preventDefault();
window.onwheel = (e) => {
    const deltaXY = e.deltaX + e.deltaY;
    scrollContainer.scrollBy({ left: deltaXY, top: deltaXY });
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
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared */ "./src/shared.ts");








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWhCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRywyQkFBMkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRywyQkFBMkIsRUFBRTtZQUNwSSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0IsT0FBTztTQUNWO1FBRUQscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFVBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7VUNuREQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQjtBQUVJO0FBQ0E7QUFDTztBQUNGO0FBQ0Y7QUFFUCIsInNvdXJjZXMiOlsid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvY29ubmVjdC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvaW5zcGlyYXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvdmlldy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy93b3JrLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NoYXJlZC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaWduYWwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc3ByaW5nLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWxlbWVudFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5leHBvcnQgY29uc3QgYm9keVNpZyA9IGVsZW1lbnRTaWduYWwoYm9keSk7XG5cbmV4cG9ydCBjb25zdCBpZUJsdWUgPSBcIiM2MDlDQ0VcIjtcbmV4cG9ydCBjb25zdCBpZUdyZWVuID0gXCIjYmZlMDIxXCI7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuOTU7XG4iLCJpbXBvcnQgeyBib2R5U2lnIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBvbk5hdk9wdGlvbkNsaWNrLCBzY3JvbGxDb250YWluZXIsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5pbnRlcmZhY2UgRWxlbWVudEFsaWdubWVudCB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbmxldCBpbWFnZUxvYWRpbmdQcm9taXNlczogUHJvbWlzZTx2b2lkPltdID0gW107XG5sZXQgcXVldWVkQmVmb3JlTGF5b3V0OiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwUmFuZ2UobjogbnVtYmVyLCBzdGFydDE6IG51bWJlciwgc3RvcDE6IG51bWJlciwgc3RhcnQyOiBudW1iZXIsIHN0b3AyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKChuIC0gc3RhcnQxKSAvIChzdG9wMSAtIHN0YXJ0MSkpICogKHN0b3AyIC0gc3RhcnQyKSArIHN0YXJ0Mjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IHVwZGF0ZUxheW91dEltYWdlV2FpdGluZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VMb2FkaW5nUHJvbWlzZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGltYWdlTG9hZGluZ0FwcGVuZCBvZiBxdWV1ZWRCZWZvcmVMYXlvdXQpIGltYWdlTG9hZGluZ0FwcGVuZCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBxdWV1ZWRCZWZvcmVMYXlvdXQgPSBbXTtcbiAgICAgICAgdXBkYXRlTGF5b3V0KCk7XG4gICAgfTtcbiAgICBlZmZlY3QodXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nLCBbYm9keVNpZ10pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dEltYWdlV2FpdGluZykpO1xuXG4gICAgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWV1ZUJlZm9yZUxheW91dChldmVudDogKCkgPT4gdm9pZCkge1xuICAgIHF1ZXVlZEJlZm9yZUxheW91dC5wdXNoKGV2ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmeUltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGltYWdlTG9hZGluZ1Byb21pc2VzLnB1c2goaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIGNvbnN0IFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuNztcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICogU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OOyAvLyBUT0RPIHRoaXMgc2hvdWxkIGp1c3QgdXNlIGFjdHVhbCBzY3JvbGwgaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxXaWR0aCgpIHtcbiAgICBjb25zdCBTQ1JPTExfV0lEVEhfUFJPUE9SVElPTiA9IDE7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICogU0NST0xMX1dJRFRIX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduV2l0aEdhcChsZWZ0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQsIGdhcDogbnVtYmVyKSB7XG4gICAgcmlnaHRFbGVtZW50LnN0eWxlLmxlZnQgPSBweChsZWZ0RWxlbWVudC5vZmZzZXRMZWZ0ICsgbGVmdEVsZW1lbnQuY2xpZW50V2lkdGggKyBnYXApO1xufVxuXG5mdW5jdGlvbiBheGlzQWxpZ25pbmdXaXRoR2FwcyhheGlzU2l6ZTogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGVsZW1lbnRPckdhcHM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSk6IFtFbGVtZW50QWxpZ25tZW50W10sIG51bWJlcl0gPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50QWxpZ25tZW50cyA9IFtdO1xuICAgICAgICBsZXQgcnVubmluZ1RvdGFsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50T3JHYXAgb2YgZWxlbWVudE9yR2Fwcykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRPckdhcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEFsaWdubWVudHMucHVzaCh7IGVsZW1lbnQ6IGVsZW1lbnRPckdhcCwgb2Zmc2V0OiBydW5uaW5nVG90YWwgfSk7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGF4aXNTaXplKGVsZW1lbnRPckdhcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBlbGVtZW50T3JHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtlbGVtZW50QWxpZ25tZW50cywgcnVubmluZ1RvdGFsXTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgeUFsaWduaW5nV2l0aEdhcHMgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuZXhwb3J0IGNvbnN0IHhBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50V2lkdGgpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IHlBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlclNjYWxlZFkoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBzY3JvbGxDb250YWluZXIuY2xpZW50SGVpZ2h0ICogc2NhbGU7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoKHNjcm9sbENvbnRhaW5lci5jbGllbnRIZWlnaHQgLSBoZWlnaHQpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJTY2FsZWRYKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgd2lkdGggPSBzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGggKiBzY2FsZTtcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweCgod2lkdGggKiBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpIC8gZWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KChzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGggLSB3aWR0aCkgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCA+IDE7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZDb25uZWN0KCkge31cbiIsImltcG9ydCB7IGllR3JlZW4gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjZW50ZXJTY2FsZWRZLCBnZXRTY3JvbGxIZWlnaHQsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeEFsaWduaW5nV2l0aEdhcHMsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIHN0eWxlU2Nyb2xsVGV4dCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuaW50ZXJmYWNlIFF1b3RlRGlzcGxheSB7XG4gICAgcXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGF1dGhvcjogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgdGl0bGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIG9wZW5RdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgY2xvc2VRdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFF1b3RlKHF1b3RlVGV4dDogc3RyaW5nLCBhdXRob3JUZXh0OiBzdHJpbmcsIHRpdGxlVGV4dDogc3RyaW5nKTogUXVvdGVEaXNwbGF5IHtcbiAgICBjb25zdCBxdW90ZSA9IGFkZFNjcm9sbFRleHQocXVvdGVUZXh0KTtcbiAgICBjb25zdCBhdXRob3IgPSBhZGRTY3JvbGxUZXh0KGF1dGhvclRleHQpO1xuICAgIGNvbnN0IHRpdGxlID0gYWRkU2Nyb2xsVGV4dCh0aXRsZVRleHQpO1xuICAgIGNvbnN0IG9wZW5RdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJxcIik7XG4gICAgY29uc3QgY2xvc2VRdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJ1cIik7XG5cbiAgICByZXR1cm4geyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlRGlzcGxheSkge1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemVTY2FsZTogMC4wMzIsIHdpZHRoU2NhbGUsIGxpbmVIZWlnaHRTY2FsZTogMC4wNjUgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplU2NhbGU6IDAuMDM1LCB3aWR0aFNjYWxlLCBsaW5lSGVpZ2h0U2NhbGU6IDAuMDYgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemVTY2FsZTogMC4wMjUsIHdpZHRoU2NhbGUsIGxpbmVIZWlnaHRTY2FsZTogMC4wNiB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplU2NhbGU6IDAuMTUsIHdpZHRoU2NhbGU6IDAuMDUsIGxpbmVIZWlnaHRTY2FsZTogMC4wNiB9O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlRGlzcGxheSwgbnVkZ2U6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGF1dGhvci5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG4gICAgdGl0bGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgcXVvdGUsIC8vXG4gICAgICAgIDAuMDQgKiBzLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIC0wLjAxNSAqIHMsXG4gICAgICAgIHRpdGxlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4zNSAqIHMpO1xuICAgIH1cblxuICAgIG9wZW5RdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCAtIDAuMDcgKiBzKTtcbiAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgIGNsb3NlUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgKyBxdW90ZS5vZmZzZXRXaWR0aCAtIG51ZGdlKTtcbiAgICBjbG9zZVF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIHF1b3RlLm9mZnNldEhlaWdodCAtIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2RXZvbHV0aW9uKCkge1xuICAgIGNvbnN0IGV2b2x1dGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi5zdmdcIik7XG4gICAgY29uc3QgZXZvbHV0aW9uSGlzdG9yeSA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi1oaXN0b3J5LnN2Z1wiKTtcbiAgICAvLyBjb25zdCBsb2dvRnVsbCA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2xvZ28tZnVsbC5zdmdcIik7XG5cbiAgICBjb25zdCBwcm9tb3M6IEhUTUxJbWFnZUVsZW1lbnRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykgcHJvbW9zLnB1c2goYWRkU2Nyb2xsSW1hZ2UoYGV2b2x1dGlvbi9wcm9tby0ke2l9LmpwZ2ApKTtcblxuICAgIGNvbnN0IHF1b3RlcyA9IFtcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIk91ciBhbm51YWwgcHJvbW8gaXMgYWx3YXlzIGdyb3VuZGVkIGluIG91ciBpZGVudGl0eSBidXQgaXQncyBmdW4gdG8gcHVzaCBsaW1pdHMgYW5kIHJlaW52ZW50IG91cnNlbHZlcyBlYWNoIHllYXIuIFRoZSBiZXN0IHBhcnQgaXMgPHN0cm9uZz5oZWFyaW5nIHdoYXQgb3VyIGNsaWVudHMgaGF2ZSB0byBzYXkuPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBcIkJFVEhMWU4gS1JBS0FVRVJcIixcbiAgICAgICAgICAgIFwiRm91bmRlciwgaS5lLiBkZXNpZ24sIGluYy5cIlxuICAgICAgICApLFxuICAgICAgICBhZGRRdW90ZShcIkkgbG92ZSBob3cgeW91IGRvIHN0dWZmLiBJJ20gZmluZGluZyB0aGF0IHRoZXNlIHR5cGVzIG9mIG1lc3NhZ2VzIGFyZSByZWFsbHkgPHN0cm9uZz50cmFuc2Zvcm1pbmcgcmVsYXRpb25zaGlwczwvc3Ryb25nPiB3aXRoIHBlb3BsZS4gVGhleSBhcmUganVzdCBkcmVhbXkuXCIsIFwiREVCUkEgU0NIQVRaS0lcIiwgXCJGb3VuZGVyLCBCUFAgV2VhbHRoIFNvbHV0aW9ucyBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBzZWUgYSBsb3Qgb2YgdGhpcyBzcGVjaWFsIHF1YWxpdHkgaW4geW91ciB3b3JrLiBJdCdzIG5vdCBqdXN0IGFib3V0IGJlaW5nIGludGVudGlvbmFsLiBZb3UgYWx3YXlzIGJyaW5nIGluIGFuIGVsZW1lbnQgb2YgPHN0cm9uZz5zdXJwcmlzZSBhbmQgZGVsaWdodC48L3N0cm9uZz5cIiwgXCJKT1NIIEtSQUtBVUVSXCIsIFwiRm91bmRlciwgU2N1bHB0XCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdXIgYXBwcm9hY2ggd29ya3Mgc28gd2VsbCBiZWNhdXNlIGl0IGlzIHJlYWxseSA8c3Ryb25nPnBlcnNvbmFsPC9zdHJvbmc+IGFuZCBlcXVhbGx5IDxzdHJvbmc+cHJvZmVzc2lvbmFsLjwvc3Ryb25nPlwiLCBcIkFOTiBTVUxMSVZBTlwiLCBcIkZvdW5kZXIsIEFubiBTdWxsaXZhbiBPcmdhbml6aW5nXCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdSB0cnVseSB1bmRlcnN0YW5kIHRoZSB1bmlxdWUgcG9zaXRpb25pbmcgb2YgYSBwcm9zcGVjdGl2ZSBjbGllbnQgYW5kIGFyZSBhYmxlIHRvIDxzdHJvbmc+dGVsbCB0aGVpciBzdG9yeTwvc3Ryb25nPiBleGFjdGx5IGFzIGl0IHNob3VsZCBiZSB0b2xkLlwiLCBcIkRBVklEIFlVTlwiLCBcIlByaW5jaXBhbCwgVmFyaWRlbnQgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiQmV0aCBpcyBxdWl0ZSBmcmFua2x5IG9uZSBvZiB0aGUgPHN0cm9uZz5tb3N0IHRhbGVudGVkIGRlc2lnbmVyczwvc3Ryb25nPiB0aGF0IEkgaGF2ZSBldmVyIGhhZCB0aGUgcHJpdmlsZWdlIHRvIHdvcmsgd2l0aC4gU2hlIGFsd2F5cyBoYXMgYSBzcGVjaWFsIHdheSBvZiBtYWtpbmcgZXZlcnl0aGluZyBzaGUgdG91Y2hlcyB0dXJuIHRvIGdvbGQhXCIsXG4gICAgICAgICAgICBcIkRBVklEIFJVU0hcIixcbiAgICAgICAgICAgIFwiUHJlc2lkZW50LCBFTlZcIlxuICAgICAgICApLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoZXZvbHV0aW9uLCAwLjc1KTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShldm9sdXRpb25IaXN0b3J5LCAwLjMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW9zKSBjZW50ZXJTY2FsZWRZKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtldm9sdXRpb24sIDAuMiAqIHMsIGV2b2x1dGlvbkhpc3RvcnldO1xuXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHF1b3Rlcy5sZW5ndGgsIHByb21vcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IHF1b3Rlcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcXVvdGVzW2ldLnF1b3RlKTtcbiAgICAgICAgICAgIGlmIChpIDwgcHJvbW9zLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBwcm9tb3NbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUsIDAuMDUgKiBzKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllQmx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduV2l0aEdhcCwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIHN0eWxlU2Nyb2xsVGV4dCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuY29uc3QgSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OID0gMC44NTtcblxuaW50ZXJmYWNlIEluc3BpcmF0aW9uVGlsZSB7XG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yOiBIVE1MRWxlbWVudDtcbiAgICByZWFkTW9yZTogSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNixcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDM2LFxuICAgICAgICB3aWR0aFNjYWxlOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04sXG4gICAgICAgIGxpbmVIZWlnaHRTY2FsZTogMC4wOSxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjMsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDM1MCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZVNjYWxlOiAwLjAyNyxcbiAgICAgICAgd2lkdGhTY2FsZTogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OLFxuICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQocmVhZE1vcmUsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC41LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBpZUJsdWUsXG4gICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDMsXG4gICAgICAgIHdpZHRoU2NhbGU6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTixcbiAgICAgICAgbGluZUhlaWdodFNjYWxlOiAwLjA1LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICogMC41NSk7XG59XG5cbmZ1bmN0aW9uIGFsaWduSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgbWFqb3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgbWlub3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgcmVhZE1vcmUuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xuICAgICAgICBpbWFnZSwgLy9cbiAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgIG1ham9yLFxuICAgICAgICAtMC4wMSAqIHMsXG4gICAgICAgIG1pbm9yLFxuICAgICAgICAwLjAxICogcyxcbiAgICAgICAgcmVhZE1vcmUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBzICogMC4xNSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRJbnNwaXJhdGlvblRpbGUoaW1hZ2VTdHJpbmc6IHN0cmluZywgbWFqb3JUZXh0OiBzdHJpbmcsIG1pbm9yVGV4dDogc3RyaW5nKTogSW5zcGlyYXRpb25UaWxlIHtcbiAgICBjb25zdCBpbWFnZSA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3RyaW5nKTtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vciA9IGFkZFNjcm9sbFRleHQobWlub3JUZXh0KTtcbiAgICBjb25zdCByZWFkTW9yZSA9IGFkZFNjcm9sbFRleHQoXCJSZWFkIG1vcmVcIik7XG5cbiAgICByZXR1cm4geyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZJbnNwaXJhdGlvbigpIHtcbiAgICBjb25zdCBpbnNwaXJhdGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiaW5zcGlyYXRpb24vaW5zcGlyYXRpb24uc3ZnXCIpO1xuXG4gICAgY29uc3QgdGlsZXMgPSBbXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3l1bWllLmpwZ1wiLCBcIlRIRSBTVEFSVCBPRiBTT01FVEhJTkcgWVVNLUlFXCIsIFwiV2UgYWx3YXlzIHdhbnRlZCB0byBkZXNpZ24gY2hvY29sYXRlIGJhcnMgYW5kIGZpbmFsbHkgZGlkIGl0LiBJbnRyb2R1Y2luZyBvdXIgc3dlZXQgbmV3IGJyYW5kLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vd29yZHMtaWRlYXMuanBnXCIsIFwiU0hBUkUgU09NRSBERVNJR04gTE9WRVwiLCBcIlRoZSBpLmUuIGRlc2lnbiBwcm9tbyBqb3VybmFscyBlbmNvdXJhZ2UgY2xpZW50cyB0byBza2V0Y2ggdGhlaXIgYmlnIGlkZWFzIGFuZCBjYXB0dXJlIHRoZWlyIGRyZWFtcy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Nvb2staWUuanBnXCIsIFwiR09UVEEgTE9WRSBBIENPT0stSUVcIiwgXCJIb3cgYSBzZWNyZXQgcmVjaXBlIHdvcmtzIHRvIGJyaW5nIHJlbGF0aW9uc2hpcHMgdG8gYSB3aG9sZSBuZXcgbGV2ZWwuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZW1peC5qcGdcIiwgXCJSRU1JWFwiLCBcIkEgYmVoaW5kLXRoZS1zY2VuZXMgbG9vayBhdCBob3cgd2UgdHJhbnNmb3JtZWQgY2xhc3NpYyBtZW1vcnkgY2FycmllcnMgaW50byBvYmplY3RzIG9mIGFydC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2tyZW1wYS5wbmdcIiwgXCJSRUJSQU5ESU5HIEEgRkFNSUxZIEJVU0lORVNTXCIsIFwiQSByZWZyZXNoIGZvciBhIDUwLXllYXIgbGVnYWN5LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZm90b3N0b3JpLmpwZ1wiLCBcIkJSQU5ESU5HIEZST00gVEhFIE5BTUUgVVBcIiwgXCJXaGVuIGEgY2xpZW50IGhhZCBhbiBpZGVhIGZvciBhIGJyYW5kIHNwaW5vZmYsIHdlIHRvb2sgaGVyIGNvbmNlcHQgdG8gcmVhbGl0eSBhbmQgbGF1bmNoZWQgdGhlIGJ1c2luZXNzIGluIGhpZ2ggc3R5bGUuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9pbnNwaXJlZC0yLWNyZWF0ZS5qcGdcIiwgXCJJTlNQSVJFRCAyIENSRUFURVwiLCBcIkEgcGFpbnRpbmcgaW5zcGlyZWQgYnkgdGhlIGkuZS4gZGVzaWduIGxvZ28gY29tYmluZXMgb2lsIHBhaW50cywgZ3JvdW5kIHVwIGNyYXlvbnMsIGFuZCBhIGxlZ28uXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mcm9tLWluc2lkZS5qcGdcIiwgXCJUSEUgVklFVyBGUk9NIElOU0lERVwiLCBcImkuZS4gZGVzaWduJ3MgbmV3IHN0dWRpbyB3YXMgMzAgeWVhcnMgaW4gdGhlIG1ha2luZy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlY29ubmVjdGluZy5qcGdcIiwgXCJSRUNPTk5FQ1RJTkdcIiwgXCJIb3cgdW5jZXJ0YWluIHRpbWVzIGxlZCB0byBhIGhvbWVjb21pbmcgZm9yIGkuZS4gZGVzaWduJ3Mgc2VuaW9yIGRlc2lnbmVyLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vbmV3LXN0dWRpby5qcGdcIiwgXCJORVcgU1RVRElPLiBORVcgVklFVy5cIiwgXCJIb3cgdGhlIG5lZWQgZm9yIGluc3BpcmF0aW9uIGZ1ZWxlZCB0aGUgYnVpbGRpbmcgb2YgYSBzdHVkaW8uXCIpLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjZW50ZXJTY2FsZWRZKGluc3BpcmF0aW9uLCAwLjc1KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHN0eWxlSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGFsaWduV2l0aEdhcChpbnNwaXJhdGlvbiwgdGlsZXNbMF0uaW1hZ2UsIHMgKiAwLjI1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggLSAxOyBpKyspIGFsaWduV2l0aEdhcCh0aWxlc1tpXS5pbWFnZSwgdGlsZXNbaSArIDFdLmltYWdlLCBzICogMC4xKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIGFsaWduSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgY2VudGVyU2NhbGVkWCwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRTY3JvbGxXaWR0aCwgaXNMYW5kc2NhcGUsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeEFsaWduaW5nV2l0aEdhcHMsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xyXG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xyXG5cclxuY29uc3QgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyA9IHtcclxuICAgIGxldHRlclNwYWNpbmc6IDIuMixcclxuICAgIGZvbnRXZWlnaHQ6IDQwMCxcclxuICAgIGNvbG9yOiBcIiNCM0IzQjNcIixcclxuICAgIGZvbnRTaXplU2NhbGU6IDAuMDY1LFxyXG4gICAgd2lkdGhTY2FsZTogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04sXHJcbiAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDksXHJcbn07XHJcblxyXG5jb25zdCBtaW5vclNjcm9sbFRleHREZXRhaWxzID0ge1xyXG4gICAgbGV0dGVyU3BhY2luZzogMC4yLFxyXG4gICAgZm9udFdlaWdodDogMzAwLFxyXG4gICAgY29sb3I6IFwiIzAwMDAwMFwiLFxyXG4gICAgZm9udFNpemVTY2FsZTogMC4wMyxcclxuICAgIHdpZHRoU2NhbGU6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OLFxyXG4gICAgbGluZUhlaWdodFNjYWxlOiAwLjA1LFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2VmlldygpIHtcclxuICAgIGNvbnN0IGhvbWUgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9tZS5zdmdcIik7XHJcbiAgICBjb25zdCBob3Jpem9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvcml6b24uanBnXCIpO1xyXG4gICAgY29uc3QgZnJlc2hMb29rID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2ZyZXNoLWxvb2suc3ZnXCIpO1xyXG4gICAgY29uc3QgZ3JlYXRCcmFuZHMgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZ3JlYXQtYnJhbmRzLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMSA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJHUkVBVCBCUkFORFMgRE9OJ1QgSlVTVCBIQVBQRU5cIixcclxuICAgICAgICBcIlRoZXkgcmVxdWlyZSBleHBsb3JhdGlvbiwgaW5zaWdodCwgYW5kIHRlbmFjaXR5LiBXZSBodW50IGZvciB0aGF0IG1hZ2ljIHNwYXJrIHRoYXQgaWduaXRlcyBpbm5vdmF0aW9uLiBXZSBicmluZyBvdXIgZXh0ZW5zaXZlIHNraWxscyBhbmQgZXhwZXJpZW5jZSB0byBlYWNoIHByb2plY3QgYW5kIGdpdmUgaXQgb3VyIGFsbC4gVGhlIHJlc3VsdCBpcyBjbGVhciwgeWV0IGVsZXZhdGVkIGNvbW11bmljYXRpb24gdGhhdCBtYWtlcyBwZW9wbGUgc3RvcCwgdGhpbmssIGFuZCBvZnRlbiBzbWlsZS5cIixcclxuICAgICAgICBcIk91ciBzdHVkaW8gbG9jYXRpb24gaXMgcHJvZm91bmRseSBpbnNwaXJpbmcuIFRoZSBtYWduaWZpY2VudCB2aWV3IGZlZWRzIG91ciBzb3VscyBhbmQga2VlcHMgdXMgaW5zcGlyZWQgdG8gZG8gb3VyIGJlc3Qgd29yay4gSXQncyBhIHBsYWNlIHdoZXJlIGNyZWF0aXZlIHBlb3BsZSBjb21lIHRvZ2V0aGVyIHRvIGNvbGxhYm9yYXRlIGFuZCBkcmlsbCBkb3duIHRvIHRoZSBoZWFydCBvZiB0aGUgbWF0dGVyLiBUbyBzb2x2ZSBwcm9ibGVtcyBhbmQgYnJpbmcgaWRlYXMgdG8gbGlmZS4gVG8gY3JlYXRlIHRoaW5ncyB3b3J0aCByZW1lbWJlcmluZy5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGluc2lnaHRDbGFyaXR5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2luc2lnaHQtY2xhcml0eS5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTIgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgQlJJTkcgVklTSU9OLCBJTlNJR0hULCBBTkQgQ0xBUklUWSBUTyBFVkVSWSBQUk9KRUNUXCIsXHJcbiAgICAgICAgXCJTdWNjZXNzZnVsIGRlc2lnbiBzdGFydHMgd2l0aCBpZGVudGlmeWluZyBhIGNsaWVudCdzIG5lZWRzLCBnb2FscywgYW5kIGFzcGlyYXRpb25zLiBPdXIgb2JqZWN0aXZpdHkgc2hpbmVzIGxpZ2h0IG9uIHdoYXQgb3RoZXJzIGhhdmUgbWlzc2VkLiBXZSBoYXZlIHRoZSBhYmlsaXR5IHRvIHNlZSBhbmQgaW50ZXJwcmV0IHRoZSBpbm5lciB3b3JraW5ncywgY3VsdHVyZSwgYW5kIG51YW5jZXMgb2Ygb3VyIGNsaWVudCdzIHdvcmxkLiBXZSBhc2sgcXVlc3Rpb25zIOKAkyBsb3RzIG9mIHF1ZXN0aW9ucy4gVGhlbiBsaXN0ZW4gdW50aWwgd2UgZ2FpbiB0aGUgZGVlcCB1bmRlcnN0YW5kaW5nIG5lY2Vzc2FyeSB0byBidWlsZCB0aGUgc29saWQgZm91bmRhdGlvbiB0aGF0IGFueSBlbmR1cmluZyBicmFuZCBuZWVkcy5cIixcclxuICAgICAgICBcIk91ciBzbWFsbCBidXQgbWlnaHR5IHRlYW0gYnJpbmdzIHRvZ2V0aGVyIGEgd2lkZSByYW5nZSBvZiB0YWxlbnRzIGFuZCBwZXJzcGVjdGl2ZXMsIHBsdXMgYSBuaWNlIGxpc3Qgb2YgYXdhcmRzLiBXZSB0aHJvdyBvdXIgaGVhcnRzIGludG8gb3VyIHdvcmsgYW5kIGFyZSBrbm93biBmb3Igb3VyIGZpZXJjZSBjb21taXRtZW50IHRvIHRoZSB0cnVzdGVkLCBsb25nLXRlcm0gcGFydG5lcnNoaXBzIHdlIGZvcm0uIEZvciB1cywgaXQncyBwZXJzb25hbC5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNreXdhcmQgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvc2t5d2FyZC5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTMgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgU0VFIFdPUksgSU4gQSBESUZGRVJFTlQgTElHSFRcIixcclxuICAgICAgICBcIlBlb3BsZSBsaWtlIHRvIGFzayBhYm91dCBvdXIgZGVzaWduIHByb2Nlc3MuIFRoZSB0cnV0aCBpcyB0aGF0IHRoZSBhcHByb2FjaCB0byBlYWNoIHByb2plY3QgdmFyaWVzLCBiZWNhdXNlIGVhY2ggY2xpZW50IGFuZCB0aGVpciBuZWVkcyBhcmUgdW5pcXVlLiBDcmVhdGl2ZSBicmVha3Rocm91Z2hzIGRvbid0IGZvbGxvdyB0aGUgY2xvY2suIFRoZXkgY2FuIGhhcHBlbiBhbnkgdGltZSBvZiBkYXkg4oCTIG9yIG5pZ2h0LiBXaGV0aGVyIGFuIGVwaXBoYW55IGlzIGlsbHVtaW5hdGVkIGluIGEgc2NyaWJibGUsIGEgZHJlYW0sIG9yIGFzIHRoZSBjbG91ZHMgcm9sbCBieSwgd2UgZW1icmFjZSB0aGUgZmFjdCB0aGF0IGVhY2ggcHJvamVjdCB0YWtlcyBvbiBhIGxpZmUgb2YgaXRzIG93bi5cIixcclxuICAgICAgICBcIldoYXQncyBjb25zdGFudCBpcyBvdXIgYWJpbGl0eSB0byBsaXN0ZW4gYW5kIGZvY3VzLCB0byBhbmFseXplIGFuZCBjb25uZWN0IGRvdHMsIGFuZCB0byByZW1haW4gY3VyaW91cy4gVGhlIG1vc3QgcmV3YXJkaW5nIHByb2plY3RzIGFyZSB3aXRoIGNsaWVudHMgd2hvIHZhbHVlIHRoZSBiYWxhbmNlIGJldHdlZW4gcHVzaGluZyBmb3J3YXJkIGFuZCBhbGxvd2luZyB0aW1lIGZvciB0aGUgcGVyZmVjdCBzb2x1dGlvbiB0byBlbWVyZ2UuIFRoYXQncyBvdXIgaGFwcHkgcGxhY2UuXCJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGV4dFRpbGVzID0gW3RleHRUaWxlMSwgdGV4dFRpbGUyLCB0ZXh0VGlsZTNdO1xyXG5cclxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGhvcml6b24sIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh0ZXh0VGlsZSwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIEhPTUVfSE9SSVpPTl9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTMubWFqb3IsXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlLCAyMCwgMjApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoZnJlc2hMb29rLCAwLjgpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoc2t5d2FyZCwgMSk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBzdHlsZVNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIG1ham9yU2Nyb2xsVGV4dERldGFpbHMsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHMpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlclNjYWxlZFgodGV4dFRpbGUubWFqb3IsIDAuOCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgY2VudGVyU2NhbGVkWChtaW5vciwgMC44KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbFdpZHRoKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICAwLjEgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIDAuMSAqIHMsXHJcbiAgICAgICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgICAgICAwLjEgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICAwLjEgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUxLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgLi4udGV4dFRpbGUxLm1pbm9ycyxcclxuICAgICAgICAgICAgICAgIDAuMSAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIDAuMSAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgICAgICAuLi50ZXh0VGlsZTIubWlub3JzLFxyXG4gICAgICAgICAgICAgICAgMC4xICogcyxcclxuICAgICAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgICAgICAwLjEgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgLi4udGV4dFRpbGUzLm1pbm9ycyxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgZWZmZWN0LCBTaWduYWwgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi4vc3ByaW5nXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgb25OYXZPcHRpb25DbGljaywgc3BhY2VUb0ZpbGUsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgVGV4dFNxdWFyZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcbmltcG9ydCB7IGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBtYXBSYW5nZSwgcHgsIHF1ZXVlQmVmb3JlTGF5b3V0LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeEFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBib2R5LCBib2R5U2lnIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5pbnRlcmZhY2UgV29ya0NvbnRlbnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBXb3JrRGlzcGxheSB7XG4gICAgdGV4dFNxdWFyZTogVGV4dFNxdWFyZTtcbiAgICBpbWFnZTE6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgaW1hZ2UyOiBIVE1MSW1hZ2VFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgV29ya0l0ZW0ge1xuICAgIHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc3ByaW5nOiBTcHJpbmc7XG4gICAgc3ByaW5nU2lnOiBTaWduYWw7XG59XG5cbmNvbnN0IHdvcmtDb250ZW50czogV29ya0NvbnRlbnRbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYmVyd3luXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkhhdmluZyBzcGVudCBoaXMgZW50aXJlIGNoaWxkaG9vZCBtYWtpbmcgZmlsbXMsIHRoaXMgY29tcGFueSdzIGZvdW5kZXIgbmFtZWQgaGlzIGFnZW5jeSBhZnRlciB0aGUgc3RyZWV0IG9uIHdoaWNoIGhlIHdhcyByYWlzZWQuIFdpdGggYSBoaXN0b3J5IGxpa2UgdGhhdCwgd2UgaGFkIHRvIGVsZXZhdGUgQmVyd3luIHRvIGxhbmRtYXJrIHN0YXR1cy4gVXNpbmcgY3VzdG9tIHBob3RvZ3JhcGh5IGFuZCBtYXN0ZXIgbWFuaXB1bGF0aW9uLCB3ZSBjcmVhdGVkIGEgZmxleGlibGUgc3RpY2tlciBzeXN0ZW0gdGhhdCBpcyBpbnRlcmNoYW5nZWFibGUgd2l0aCBtdWx0aS1jb2xvcmVkIHBhcGVyIHN0b2Nrcy4gRW1wbG95ZWVzIGFyZSBlbmNvdXJhZ2VkIHRvIGRlc2lnbiB0aGVpciBvd24gY29tbXVuaWNhdGlvbnMgYW5kIGdldCBhIGNvbXBsZXRlIHNlcmllcyBvZiBhd2FyZC13aW5uaW5nIGJ1c2luZXNzIGNhcmRzIHRvIGNob29zZSBmcm9tLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogRmlsbSwgVGVsZXZpc2lvbiwgVmlkZW8gUHJvZHVjdGlvblwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImsyIGtydXBwXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgYXdhcmQtd2lubmluZywgTmV3IFlvcmsgQ2l0eSBwdWJsaWMgcmVsYXRpb25zIGFuZCBtYXJrZXRpbmcgYWdlbmN5IGhhcyBhIHN1Y2Nlc3NmdWwgdHJhY2sgcmVjb3JkIGluIGlnbml0aW5nIGJyYW5kcyBmcm9tIHN0YXJ0LXVwcywgbmV3IGF1dGhvcnMsIGFuZCBjZWxlYnJpdGllcyBieSBjb25uZWN0aW5nIHRoZW0gd2l0aCBjdWx0dXJhbCB0cmVuZHMgYW5kIGluZmx1ZW5jZXJzLiBXaGVuIGl0IGNhbWUgdG8gcmVwcmVzZW50aW5nIHRoZWlyIGJyYW5kLCBLMiBjYW1lIHRvIHVzLiBCb2xkLCB2aWJyYW50LCBhbmQgZHluYW1pYywgdGhpcyB0aW1lbGVzcyBpZGVudGl0eSBzeXN0ZW0gcmVmbGVjdHMgdGhlIGZvdW5kZXIncyBmYXZvcml0ZSBjb2xvciBhbmQgdGhlIGNvbXBhbnkncyBlbmVyZ2V0aWMgY3VsdHVyZSBhbmQgZW52aXJvbm1lbnQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQdWJsaWMgUmVsYXRpb25zICYgTWFya2V0aW5nIGZvciBNZWRpYVwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIndoeW1cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiQWZ0ZXIgc3VjY2Vzc2Z1bGx5IGJyYW5kaW5nIHRoZWlyIGZpcnN0IGVhdGVyeSwgdGhpcyBjbGllbnQgcmV0dXJuZWQgdG8gdXMgdG8gcmVhbGl6ZSB0aGVpciBkcmVhbSBvZiBhbiB1cHNjYWxlLCBVcHBlciBXZXN0IFNpZGUgZWF0aW5nIGRlc3RpbmF0aW9uLlwiLFxuICAgICAgICAgICAgXCJUaGUgY3VzdG9tIGxldHRlcmZvcm0gaXMgYSB3aGltc2ljYWwgcGxheSBvbiB0aGVpciB1bmlxdWUgc3BlbGxpbmcgYW5kIGNhbiByZWFkIHVwc2lkZSBkb3duLiBUaGUgdmlicmFudCBjb2xvciBwYWxldHRlIHdhcyBkZXZlbG9wZWQgaW4gcGFydG5lcnNoaXAgd2l0aCB0aGUgaW50ZXJpb3IgYXJjaGl0ZWN0dXJlIHRlYW0gdG8gY3JlYXRlIGEgd2FybSBhbmQgZXhjaXRpbmcgYXRtb3NwaGVyZS4gVGhlIGN1c3RvbSBkaWUtY3V0IGVkZ2Ugb2YgdGhlIGlkZW50aXR5IHN5c3RlbSBtaW1pY3MgdGhlIGN1cnZlIG9mIHRoZSB1bmlxdWUsIHNob3djYXNlIGJhci5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFJlc3RhdXJhbnQgJiBCYXJcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJhbm4gc3VsbGl2YW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiQW5uIGRyZWFtZWQgb2YgYmVpbmcg4oCcdGhlIE9wcmFo4oCdIG9mIG9yZ2FuaXppbmcuIFdlIGVzdGFibGlzaGVkIGhlciBuYW1lIGFzIHRoZSBicmFuZCBhbmQgY3JlYXRlZCBhIHRhZ2xpbmUsIHdoaWNoIHJlZmxlY3RlZCB0aGUgcGVhY2Ugb2YgbWluZCB0aGF0IGhlciBjbGllbnRzIGdldCBmcm9tIGhhdmluZyBhbmQgbWFpbnRhaW5pbmcgYW4gb3JnYW5pemVkIGxpZmUuIFRoZSBzaW1wbGUgaWNvbiBzZXJpZXMgcmVwcmVzZW50cyBlYWNoIGFyZWEgb2YgZXhwZXJ0aXNlLiBBcyB0aGUgY29tcGFueSdzIHNlcnZpY2VzIGhhdmUgZXhwYW5kZWQgb3ZlciB0aGUgeWVhcnMsIHRoZSBpZGVudGl0eSBzeXN0ZW0gaGFzIGV2b2x2ZWQgYWxvbmcgd2l0aCBpdCBhbmQgcmVtYWlucyBhcyBmcmVzaCBhcyBpdCB3YXMgZGF5IG9uZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFByb2Zlc3Npb25hbCBPcmdhbml6aW5nXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwibG9hXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgcHJvZmVzc2lvbmFsIG1ha2UtdXAgYXJ0aXN0IHRlYW0gY2FtZSB0byB1cyB0byBicmFuZCB0aGVpciBwYXRlbnRlZCDigJx3YXRlcnNsaWRl4oCdIGV5ZSBwZW5jaWwuIENvbG9yIG5hbWVzIGxpa2Ug4oCcR2l2aW5nIEJhY2sgQmxhY2ss4oCdIHJlZmxlY3QgdGhlIGNvbXBhbnkncyBjb21taXRtZW50IHRvIHByb3ZpZGluZyBtYWtlb3ZlcnMgZm9yIHdvbWVuIGZhY2luZyBoZWFsdGggY2hhbGxlbmdlcy4gVGhlIHBsYXlmdWwgcGFja2FnaW5nIGVsZXZhdGVzIGEgc3RhcGxlIHByb2R1Y3QgdG8gZ2lmdCB3b3J0aHkgYW5kIGdlbmVyYXRlcyBhdHRlbnRpb24gaW4gYSBzYXR1cmF0ZWQgbWFya2V0IGJ5IGZseWluZyBhYm92ZSBpdHMgZGlzcGxheSBjYXNlLiBUaGUgbW90aWYgaG9sZHMgc3BlY2lhbCBtZWFuaW5nIGZvciB0aGUgZm91bmRlciB3aG8gc2hhcmVkIHdpdGggdXMgdGhhdCB0aGUgYnV0dGVyZmx5IGlzIGEgc2lnbiB0aGF0IGhlciBiZWxvdmVkIG1vdGhlciBpcyBzdGlsbCB3aXRoIGhlci5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEJlYXV0eSAmIENvc21ldGljc1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIndldFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIE1hc3RlciBBcmNoaXRlY3QgYW5kIHdvcmxkLXJlbm93bmVkIHNwYSBkZXNpZ25lciB1c2VkIGhpcyByZXB1dGF0aW9uIGFuZCBleHBlcnRpc2UgaW4gaHlkcm90aGVyYXB5IHRvIGxhdW5jaCBhbiBleGNsdXNpdmUgcHJvZHVjdCBsaW5lIGZvciBsdXh1cnkgaG90ZWxzIGFuZCByZXNvcnRzLiBBIHNvb3RoaW5nLCBtdXRlZCBjb2xvciBwYWxldHRlIHdhcyBkZXNpZ25lZCB0byByZWZsZWN0IHRoZSBzY2VudCBwcm9maWxlIG9mIGVhY2ggc2VyaWVzIG9mIHNjcnVicyBhbmQgbG90aW9ucy4gQXV0aGVudGljIHdhdGVyIHNwbGFzaCBwaG90b2dyYXBoeSBzZXQgdGhlIHRvbmUgdG8gcHJvbW90ZSB0aGUgaGVhbHRoIGJlbmVmaXRzIGFuZCBhcnQgb2YgYmF0aGluZy4gVGhlIHBhY2thZ2UgZGVzaWduIGV4cGFuZGVkIHRvIGdpZnQgYW5kIHRyYXZlbCBzZXRzIHRoYXQgaW52aXRlIGd1ZXN0cyB0byB0YWtlIHRoZSBsdXh1cnkgZXhwZXJpZW5jZSBob21lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogSGVhbHRoICYgV2VsbG5lc3MgU3Bhc1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImZlcnJhZ2Ftb1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUYXNrZWQgd2l0aCBtYXJrZXRpbmcgb2ZmaWNlIHNwYWNlIGFib3ZlIHRoaXMgbHV4dXJ5IGJyYW5kJ3MgRmlmdGggQXZlbnVlIGZsYWdzaGlwLCB3ZSBmYWNlZCB0aGUgY2hhbGxlbmdlIG9mIGFuIHVua25vd24sIHNpZGUgc3RyZWV0IGVudHJhbmNlLiBIYW5kZWQgbm90aGluZyBtb3JlIHRoYW4gYW4gYXJjaGl0ZWN0J3MgcmVuZGVyaW5nLCB3ZSBlbGVnYW50bHkgYnJhbmRlZCB0aGUgYWRkcmVzcywgY2FwdHVyZWQgdGhlIGVuZXJneSBvZiB0aGUgbG9jYXRpb24sIGFuZCBnZW5lcmF0ZWQgZW5vdWdoIGJ1enogdG8gZXhwYW5kIHRoZSB2aWV3aW5nIHBhcnR5IHRvIHR3byBkYXRlcyBieSBsdXJpbmcgYnJva2VycyB3aXRoIHRoZSBwcm9taXNlIG9mIGEgRmVycmFnYW1vIHRpZS4gVGhlIHJlc3VsdHMgd2VyZSBhIHF1aWNrIGNsb3NpbmcgYW5kIGEgZmVhdHVyZSBhcnRpY2xlIGluIENyYWluJ3MgTlkgQnVzaW5lc3MgY2l0aW5nIG91ciBpbm5vdmF0aW9uIGFuZCBzdWNjZXNzIGluIGEgY2hhbGxlbmdpbmcgcmVhbCBlc3RhdGUgbWFya2V0LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyaWVzOiBMdXh1cnkgRmFzaGlvbiwgUmVhbCBFc3RhdGVcIixcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcblxuZnVuY3Rpb24gc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgZm9yIChjb25zdCB7IHRleHRTcXVhcmUsIGltYWdlMSwgaW1hZ2UyIH0gb2Ygd29ya0Rpc3BsYXlzKSB7XG4gICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcbiAgICAgICAgICAgIHRleHRTcXVhcmUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogMi4yLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjMzMzMzMzXCIsXG4gICAgICAgICAgICAgICAgZm9udFNpemVTY2FsZTogMC4wNjUsXG4gICAgICAgICAgICAgICAgd2lkdGhTY2FsZTogMSxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6IDAuMixcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAzMDAsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiIzMzMzMzM1wiLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplU2NhbGU6IDAuMDMsXG4gICAgICAgICAgICAgICAgd2lkdGhTY2FsZTogMSxcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0U2NhbGU6IDAuMDUsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoaW1hZ2UxLCAxKTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShpbWFnZTIsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgZm9yIChjb25zdCB3b3JrQ29udGVudCBvZiB3b3JrQ29udGVudHMpIHtcbiAgICAgICAgY29uc3QgdGV4dFNxdWFyZSA9IGFkZFNjcm9sbFRleHRTcXVhcmUod29ya0NvbnRlbnQubmFtZS50b1VwcGVyQ2FzZSgpLCAuLi53b3JrQ29udGVudC5kZXNjcmlwdGlvbik7XG4gICAgICAgIGNvbnN0IGltYWdlMSA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzEuanBnYCk7XG4gICAgICAgIGNvbnN0IGltYWdlMiA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzIuanBnYCk7XG5cbiAgICAgICAgd29ya0Rpc3BsYXlzLnB1c2goeyB0ZXh0U3F1YXJlLCBpbWFnZTEsIGltYWdlMiB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGZvciAoY29uc3QgeyB0ZXh0U3F1YXJlLCBpbWFnZTEsIGltYWdlMiB9IG9mIHdvcmtEaXNwbGF5cykge1xuICAgICAgICBpdGVtcy5wdXNoKFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRleHRTcXVhcmUubWFqb3IsXG4gICAgICAgICAgICAwLjIgKiBzLFxuICAgICAgICAgICAgaW1hZ2UxLFxuICAgICAgICAgICAgMC4xNSAqIHMsXG4gICAgICAgICAgICBpbWFnZTIsXG4gICAgICAgICAgICAwLjIyICogc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB4QWxpZ25pbmdXaXRoR2FwcyhpdGVtcyk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdldvcmsoKSB7XG4gICAgY29uc3Qgd29ya0l0ZW1zOiBXb3JrSXRlbVtdID0gW107XG4gICAgY29uc3Qgd29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdID0gW107XG5cbiAgICBjb25zdCBCT1RUT00gPSAodGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkgPT4gKHdpbmRvdy5pbm5lckhlaWdodCAtIHRhYkVsZW1lbnQuY2xpZW50SGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgVE9QID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+IHdpbmRvdy5pbm5lckhlaWdodCAtIHRhYkVsZW1lbnQuY2xpZW50V2lkdGggLyAyO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrQ29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgd29ya0NvbnRlbnQgPSB3b3JrQ29udGVudHNbaV07XG5cbiAgICAgICAgY29uc3QgdGFiRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3JjID0gYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vdGFiLnBuZ2A7XG4gICAgICAgIGJvZHkuYXBwZW5kKHRhYkVsZW1lbnQpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gYm9keS5yZW1vdmVDaGlsZCh0YWJFbGVtZW50KSk7XG5cbiAgICAgICAgY29uc3Qgc3ByaW5nID0gbmV3IFNwcmluZygwKTtcbiAgICAgICAgY29uc3Qgc3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICBzcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTAwMCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAtMC4xO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMDtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrID0gbWFwUmFuZ2Uoc3ByaW5nLnBvc2l0aW9uLCAwLCAxLCBCT1RUT00odGFiRWxlbWVudCksIFRPUCh0YWJFbGVtZW50KSk7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnRvcCA9IHB4KGspO1xuICAgICAgICB9LCBbc3ByaW5nU2lnLCBib2R5U2lnXSk7XG4gICAgICAgIHNwcmluZ1NpZy51cGRhdGUoKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHdvcmtJdGVtIG9mIHdvcmtJdGVtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSA9IHdvcmtJdGVtO1xuICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSBtYXBSYW5nZSh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LndpZHRoLCBCT1RUT00odGFiRWxlbWVudCksIFRPUCh0YWJFbGVtZW50KSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb3B1bGF0ZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICAgICAgYm9keVNpZy51cGRhdGUoKTsgLy8gaG0gZG9udCBsaWtlIHRoaXNcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSAxO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGNsZWFySW50ZXJ2YWwodGltZW91dEhhbmRsZSkpO1xuXG4gICAgICAgIHdvcmtJdGVtcy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50IH0gPSB3b3JrSXRlbXNbaV07XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gd2luZG93LmlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrSXRlbXMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gd2luZG93LmlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGspIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChrKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoayAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcblxuICAgICAgICAgICAgc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0Rpc3BsYXkgb2Ygd29ya0Rpc3BsYXlzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUod29ya0Rpc3BsYXkudGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbiAgICAgICAgICAgIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcbmltcG9ydCB7IGNsaWNrTmF2Q29ubmVjdCB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcbmltcG9ydCB7IGNsaWNrTmF2RXZvbHV0aW9uIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdkluc3BpcmF0aW9uIH0gZnJvbSBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcbmltcG9ydCB7IGNsaWNrTmF2VmlldyB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcbmltcG9ydCB7IGNsaWNrTmF2V29yayB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcbmltcG9ydCB7IGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIGlzTGFuZHNjYXBlLCBub3RpZnlJbWFnZUxvYWRpbmcsIHB4LCBxdWV1ZUJlZm9yZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5pbnRlcmZhY2UgU2Nyb2xsVGV4dERldGFpbHMge1xuICAgIGxldHRlclNwYWNpbmc6IG51bWJlcjtcbiAgICBmb250V2VpZ2h0OiBudW1iZXI7XG4gICAgY29sb3I6IHN0cmluZztcblxuICAgIGZvbnRTaXplU2NhbGU6IG51bWJlcjtcbiAgICB3aWR0aFNjYWxlOiBudW1iZXI7XG4gICAgbGluZUhlaWdodFNjYWxlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNxdWFyZSB7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yczogSFRNTEVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGNvbnN0IHZpZXdOYXYgPSBnKFwibmF2LXZpZXdcIik7XG5leHBvcnQgY29uc3Qgd29ya05hdiA9IGcoXCJuYXYtd29ya1wiKTtcbmV4cG9ydCBjb25zdCBpbnNwaXJhdGlvbk5hdiA9IGcoXCJuYXYtaW5zcGlyYXRpb25cIik7XG5leHBvcnQgY29uc3QgZXZvbHV0aW9uTmF2ID0gZyhcIm5hdi1ldm9sdXRpb25cIik7XG5leHBvcnQgY29uc3QgY29ubmVjdE5hdiA9IGcoXCJuYXYtY29ubmVjdFwiKTtcblxuZXhwb3J0IGNvbnN0IG5hdkl0ZW1zID0gW3ZpZXdOYXYsIHdvcmtOYXYsIGluc3BpcmF0aW9uTmF2LCBldm9sdXRpb25OYXYsIGNvbm5lY3ROYXZdO1xuXG5leHBvcnQgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gZyhcInNjcm9sbC1jb250YWluZXJcIik7XG5cbmV4cG9ydCBjb25zdCBsb2dvID0gZyhcImxvZ29cIik7XG5cbmV4cG9ydCBsZXQgb25OYXZPcHRpb25DbGljazogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGcoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW1hZ2Uoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsSW1hZ2Uuc3JjID0gc3JjO1xuICAgIG5vdGlmeUltYWdlTG9hZGluZyhzY3JvbGxJbWFnZSk7XG4gICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxDb250YWluZXIuYXBwZW5kQ2hpbGQoc2Nyb2xsSW1hZ2UpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gc2Nyb2xsQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNjcm9sbEltYWdlKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsSW1hZ2U7XG59XG5cbmZ1bmN0aW9uIGNsaWNrQW55TmF2KG5hdkl0ZW06IEhUTUxFbGVtZW50LCBmOiAoKSA9PiB2b2lkKSB7XG4gICAgbmF2SXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcblxuICAgIG5hdkl0ZW0ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG9uTmF2T3B0aW9uQ2xpY2spIHUoKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljayA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBuYXZJdGVtcykge1xuICAgICAgICAgICAgbi5zdHlsZS5jb2xvciA9IFwiIzgwODA4MFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG4gICAgICAgIGYoKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc2Nyb2xsVGV4dC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHF1ZXVlQmVmb3JlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmFwcGVuZChzY3JvbGxUZXh0KTtcbiAgICB9KTtcbiAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gc2Nyb2xsQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNjcm9sbFRleHQpKTtcblxuICAgIHJldHVybiBzY3JvbGxUZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTY3JvbGxUZXh0KHNjcm9sbFRleHQ6IEhUTUxFbGVtZW50LCBzOiBTY3JvbGxUZXh0RGV0YWlscykge1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udEZhbWlseSA9IFwiU3BhcnRhblwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250V2VpZ2h0ID0gXCJcIiArIHMuZm9udFdlaWdodDtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmNvbG9yID0gcy5jb2xvcjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxldHRlclNwYWNpbmcgPSBweChzLmxldHRlclNwYWNpbmcpO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250U2l6ZSA9IHB4KHNjcm9sbEhlaWdodCAqIHMuZm9udFNpemVTY2FsZSk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS53aWR0aCA9IHB4KHNjcm9sbEhlaWdodCAqIHMud2lkdGhTY2FsZSk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5saW5lSGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICogcy5saW5lSGVpZ2h0U2NhbGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dFNxdWFyZShtYWpvclRleHQ6IHN0cmluZywgLi4ubWlub3JUZXh0czogc3RyaW5nW10pOiBUZXh0U3F1YXJlIHtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vcnMgPSBtaW5vclRleHRzLm1hcChhZGRTY3JvbGxUZXh0KTtcbiAgICByZXR1cm4geyBtYWpvciwgbWlub3JzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFRleHRTcXVhcmUsIG1ham9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscykge1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyk7XG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZVRvRmlsZShzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKFwiIFwiLCBcIi1cIik7XG59XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgY29uc3QgbGVmdEFsaWduID0gODA7XG4gICAgICAgIGxvZ28uc3R5bGUud2lkdGggPSBweCg1NSk7XG4gICAgICAgIGxvZ28uc3R5bGUuaGVpZ2h0ID0gcHgoNTUpO1xuICAgICAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgICAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KGxlZnRBbGlnbiAvIDIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFsaWduTmF2SXRlbShuYXZJdGVtOiBIVE1MRWxlbWVudCwgbnVkZ2U6IG51bWJlcikge1xuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgod2luZG93LmlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWxpZ25OYXZJdGVtKHZpZXdOYXYsIC0yKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKHdvcmtOYXYsIC0xKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGluc3BpcmF0aW9uTmF2LCAwKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGV2b2x1dGlvbk5hdiwgMSk7XG4gICAgICAgIGFsaWduTmF2SXRlbShjb25uZWN0TmF2LCAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmdW5jdGlvbiBnb0F3YXkoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KC0xMDAwKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucmlnaHQgPSBweCgtMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZ29Bd2F5KGxvZ28pOyAvLyB0ZW1wb3JhcnlcbiAgICAgICAgZ29Bd2F5KHZpZXdOYXYpO1xuICAgICAgICBnb0F3YXkod29ya05hdik7XG4gICAgICAgIGdvQXdheShpbnNwaXJhdGlvbk5hdik7XG4gICAgICAgIGdvQXdheShldm9sdXRpb25OYXYpO1xuICAgICAgICBnb0F3YXkoY29ubmVjdE5hdik7XG4gICAgfVxufSwgW2JvZHlTaWddKTtcblxuZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcHgod2luZG93LmlubmVyV2lkdGggLSB4KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KCh3aW5kb3cuaW5uZXJIZWlnaHQgLSBzY3JvbGxIZWlnaHQpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSBnZXRTY3JvbGxXaWR0aCgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChzY3JvbGxXaWR0aCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweCh3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUubGVmdCA9IHB4KCh3aW5kb3cuaW5uZXJXaWR0aCAtIHNjcm9sbFdpZHRoKSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoMCk7XG4gICAgfVxufSwgW2JvZHlTaWddKTtcblxuLy8gcmVwbGFjZSBub3JtYWwgc2Nyb2xsIGJlaGF2aW9yIHdpdGggeHkgYmVoYXZpb3JcbnNjcm9sbENvbnRhaW5lci5vbndoZWVsID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbndpbmRvdy5vbndoZWVsID0gKGUpID0+IHtcbiAgICBjb25zdCBkZWx0YVhZID0gZS5kZWx0YVggKyBlLmRlbHRhWTtcbiAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsQnkoeyBsZWZ0OiBkZWx0YVhZLCB0b3A6IGRlbHRhWFkgfSk7XG59O1xuXG5jbGlja0FueU5hdihsb2dvLCBjbGlja05hdlZpZXcpO1xuXG5jbGlja0FueU5hdih2aWV3TmF2LCBjbGlja05hdlZpZXcpO1xuY2xpY2tBbnlOYXYod29ya05hdiwgY2xpY2tOYXZXb3JrKTtcbmNsaWNrQW55TmF2KGluc3BpcmF0aW9uTmF2LCBjbGlja05hdkluc3BpcmF0aW9uKTtcbmNsaWNrQW55TmF2KGV2b2x1dGlvbk5hdiwgY2xpY2tOYXZFdm9sdXRpb24pO1xuY2xpY2tBbnlOYXYoY29ubmVjdE5hdiwgY2xpY2tOYXZDb25uZWN0KTtcblxuc2V0VGltZW91dCgoKSA9PiB2aWV3TmF2LmNsaWNrKCkpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgPSAwLjAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aWNrU3ByaW5nKCkge1xyXG4gICAgICAgIHNwcmluZy50aWNrKDEgLyA2MCk7XHJcbiAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ByaW5nLnRhcmdldCAtIHNwcmluZy5wb3NpdGlvbikgPCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgJiYgTWF0aC5hYnMoc3ByaW5nLnZlbG9jaXR5KSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSkge1xyXG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSBzcHJpbmcudGFyZ2V0O1xyXG4gICAgICAgICAgICBzcHJpbmcudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2tTcHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2tTcHJpbmcoKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vbGF5b3V0XCI7XHJcblxyXG5pbXBvcnQgXCIuL3BhZ2VzL3ZpZXdcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy93b3JrXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9ldm9sdXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9jb25uZWN0XCI7XHJcblxyXG5pbXBvcnQgXCIuL3NoYXJlZFwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=