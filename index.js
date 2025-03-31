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
let queuedBeforeLayouts = [];
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
            for (const queuedBeforeLayout of queuedBeforeLayouts)
                queuedBeforeLayout();
            imageLoadingPromises = [];
            queuedBeforeLayouts = [];
            updateLayout();
        });
        (0,_signal__WEBPACK_IMPORTED_MODULE_2__.effect)(updateLayoutImageWaiting, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
        _shared__WEBPACK_IMPORTED_MODULE_1__.onNavOptionClick.push(() => _constants__WEBPACK_IMPORTED_MODULE_0__.bodySig.unsubscribe(updateLayoutImageWaiting));
        updateLayoutImageWaiting();
    });
}
function queueBeforeLayout(event) {
    queuedBeforeLayouts.push(event);
}
function notifyImageLoading(image) {
    imageLoadingPromises.push(image.decode());
}
function getScrollHeight() {
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}
function getScrollWidth() {
    const SCROLL_WIDTH_PROPORTION = 1;
    return innerWidth * SCROLL_WIDTH_PROPORTION; // TODO this should just use actual scroll height
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
    if (element instanceof HTMLImageElement)
        element.style.width = px((height * element.naturalWidth) / element.naturalHeight);
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
    return innerWidth / innerHeight > 1;
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
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
    const widthScale = 0.75;
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(quote, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.032 * s, width: widthScale * s, lineHeight: 0.065 * s });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(author, { letterSpacing: 0.2, fontWeight: 350, color: "#000000", fontSize: 0.035 * s, width: widthScale * s, lineHeight: 0.06 * s });
    author.style.textAlign = "right";
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(title, { letterSpacing: 0.15, fontWeight: 350, color: "#000000", fontSize: 0.025 * s, width: widthScale * s, lineHeight: 0.06 * s });
    title.style.textAlign = "right";
    const quoteTextDetails = { letterSpacing: 0.2, fontWeight: 350, color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieGreen, fontSize: 0.15 * s, width: 0.05 * s, lineHeight: 0.06 * s };
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
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(major, {
        letterSpacing: 0.6,
        fontWeight: 400,
        color: "#000000",
        fontSize: 0.036 * s,
        width: INSPIRATION_TILE_WIDTH_PROPORTION * s,
        lineHeight: 0.09 * s,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(minor, {
        letterSpacing: 0.3,
        fontWeight: 350,
        color: "#000000",
        fontSize: 0.027 * s,
        width: INSPIRATION_TILE_WIDTH_PROPORTION * s,
        lineHeight: 0.05 * s,
    });
    (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollText)(readMore, {
        letterSpacing: 0.5,
        fontWeight: 400,
        color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieBlue,
        fontSize: 0.03 * s,
        width: INSPIRATION_TILE_WIDTH_PROPORTION * s,
        lineHeight: 0.05 * s,
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
            const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
            for (const textTile of textTiles)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textTile, { letterSpacing: 2.2, fontWeight: 400, color: "#B3B3B3", fontSize: 0.065 * s, width: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION * s, lineHeight: 0.09 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#000000", fontSize: 0.03 * s, width: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION * s, lineHeight: 0.05 * s });
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
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(freshLook, 0.85);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(greatBrands, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(insightClarity, 1);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(skyward, 1);
            const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollWidth)();
            for (const textTile of textTiles)
                (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textTile, { letterSpacing: 4, fontWeight: 350, color: "#B3B3B3", fontSize: 0.06 * s, width: 1 * s, lineHeight: 0.08 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#000000", fontSize: 0.028 * s, width: 1 * s, lineHeight: 0.05 * s });
            const TEXT_TILE_WIDTH = 0.85;
            for (const textTile of textTiles) {
                (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(textTile.major, TEXT_TILE_WIDTH);
                for (const minor of textTile.minors)
                    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledX)(minor, TEXT_TILE_WIDTH);
            }
            const MOBILE_PAD = 0.08;
            function mobileTile(textTile) {
                const x = [textTile.major, 0.0 * s];
                for (const minor of textTile.minors)
                    x.push(0.04 * s, minor);
                return x;
            }
            const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.yAligningWithGaps)([
                home,
                MOBILE_PAD * s,
                horizon,
                MOBILE_PAD * s,
                freshLook,
                MOBILE_PAD * s,
                greatBrands,
                MOBILE_PAD * s,
                ...mobileTile(textTile1),
                MOBILE_PAD * s,
                insightClarity,
                MOBILE_PAD * s,
                ...mobileTile(textTile2),
                MOBILE_PAD * s,
                skyward,
                MOBILE_PAD * s,
                ...mobileTile(textTile3),
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
    const s = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    for (const { textSquare, image1, image2 } of workDisplays) {
        (0,_shared__WEBPACK_IMPORTED_MODULE_2__.styleScrollTextSquare)(textSquare, { letterSpacing: 2.2, fontWeight: 400, color: "#333333", fontSize: 0.065 * s, width: 1 * s, lineHeight: 0.09 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#333333", fontSize: 0.03 * s, width: 1 * s, lineHeight: 0.05 * s });
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
    const BOTTOM = (tabElement) => (innerHeight - tabElement.clientHeight) / 2;
    const TOP = (tabElement) => innerHeight - tabElement.clientWidth / 2;
    for (let i = 0; i < workContents.length; i++) {
        const workContent = workContents[i];
        const tabElement = document.createElement("img");
        tabElement.style.position = "absolute";
        tabElement.style.visibility = "hidden";
        tabElement.src = `work/${(0,_shared__WEBPACK_IMPORTED_MODULE_2__.spaceToFile)(workContent.name)}/tab.png`;
        (0,_layout__WEBPACK_IMPORTED_MODULE_3__.notifyImageLoading)(tabElement);
        (0,_layout__WEBPACK_IMPORTED_MODULE_3__.queueBeforeLayout)(() => {
            _constants__WEBPACK_IMPORTED_MODULE_4__.body.appendChild(tabElement);
            _shared__WEBPACK_IMPORTED_MODULE_2__.onNavOptionClick.push(() => _constants__WEBPACK_IMPORTED_MODULE_4__.body.removeChild(tabElement));
        });
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
                tabElement.onmouseover = () => {
                    spring.target = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.mapRange)(innerHeight - tabElement.width, BOTTOM(tabElement), TOP(tabElement), 0, 1);
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                tabElement.onmouseleave = () => {
                    spring.target = 1;
                    (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
                };
                spring.target = 1;
                (0,_spring__WEBPACK_IMPORTED_MODULE_1__.animateSpring)(spring, springSig);
            }
            if (workDisplays.length == 0) {
                populateWorkDisplays(workDisplays);
                _constants__WEBPACK_IMPORTED_MODULE_4__.bodySig.update(); // hm dont like this
            }
            // TODO this doesn't work quite right yet
            setTimeout(() => {
                const scrollPosition = workDisplays[i].textSquare.major.offsetLeft;
                _shared__WEBPACK_IMPORTED_MODULE_2__.scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
            }, 100);
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
            const end = innerWidth - 150;
            const width = (end - start) / (workItems.length * 2 - 1);
            const height = width * (tabElement.naturalHeight / tabElement.naturalWidth);
            const k = innerHeight * 0.8;
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
scrollContainer.style.scrollbarColor = `${_constants__WEBPACK_IMPORTED_MODULE_7__.ieGreen} ${_constants__WEBPACK_IMPORTED_MODULE_7__.ieBlue}55`;
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
    scrollText.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(s.fontSize);
    scrollText.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(s.width);
    scrollText.style.lineHeight = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(s.lineHeight);
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
            navItem.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
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
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(innerWidth - x);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(x);
    }
    else {
        const scrollWidth = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.getScrollWidth)();
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(scrollWidth);
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(innerHeight);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(0);
    }
}, [_constants__WEBPACK_IMPORTED_MODULE_7__.bodySig]);
// replace normal scroll behavior with xy behavior
// scrollContainer.onwheel = (e) => e.preventDefault();
// scrollContainer.ontouchmove = (e) => e.preventDefault();
// ontouchmove = (e) => {};
// onwheel = (e) => {
//     const deltaXY = e.deltaX + e.deltaY;
//     scrollContainer.scrollBy({ left: deltaXY, top: deltaXY });
// };
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







// const what = document.createElement("div");
// const what2 = document.createElement("div");
// setInterval(() => {
//     what.style.width = self.innerWidth / 2 + "px";
//     what.style.height = self.innerHeight / 2 + "px";
//     what.style.left = 0 + "px";
//     what2.style.width = self.innerWidth / 2 + "px";
//     what2.style.height = self.innerHeight / 2 + "px";
//     what2.style.left = self.innerWidth / 2 + "px";
// }, 1);
// what.style.position = "absolute";
// what2.style.position = "absolute";
// what.style.background = "red";
// what2.style.background = "green";
// what.style.zIndex = "1";
// what2.style.zIndex = "1";
// document.body.appendChild(what);
// document.body.appendChild(what2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNPO0FBQ0Y7QUFDRjtBQUVQO0FBRWxCLDhDQUE4QztBQUM5QywrQ0FBK0M7QUFDL0Msc0JBQXNCO0FBQ3RCLHFEQUFxRDtBQUNyRCx1REFBdUQ7QUFDdkQsa0NBQWtDO0FBRWxDLHNEQUFzRDtBQUN0RCx3REFBd0Q7QUFDeEQscURBQXFEO0FBQ3JELFNBQVM7QUFDVCxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUU1QixtQ0FBbUM7QUFDbkMsb0NBQW9DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2xheW91dC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9jb25uZWN0LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2V2b2x1dGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9pbnNwaXJhdGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy92aWV3LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3dvcmsudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2hhcmVkLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NpZ25hbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zcHJpbmcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbGVtZW50U2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5cbmV4cG9ydCBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmV4cG9ydCBjb25zdCBib2R5U2lnID0gZWxlbWVudFNpZ25hbChib2R5KTtcblxuZXhwb3J0IGNvbnN0IGllQmx1ZSA9IFwiIzYwOUNDRVwiO1xuZXhwb3J0IGNvbnN0IGllR3JlZW4gPSBcIiNiZmUwMjFcIjtcblxuZXhwb3J0IGNvbnN0IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OID0gMC45NTtcbiIsImltcG9ydCB7IGJvZHlTaWcgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IG9uTmF2T3B0aW9uQ2xpY2ssIHNjcm9sbENvbnRhaW5lciwgVGV4dFNxdWFyZSB9IGZyb20gXCIuL3NoYXJlZFwiO1xuaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5cbmludGVyZmFjZSBFbGVtZW50QWxpZ25tZW50IHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn1cblxubGV0IGltYWdlTG9hZGluZ1Byb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcbmxldCBxdWV1ZWRCZWZvcmVMYXlvdXRzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwUmFuZ2UobjogbnVtYmVyLCBzdGFydDE6IG51bWJlciwgc3RvcDE6IG51bWJlciwgc3RhcnQyOiBudW1iZXIsIHN0b3AyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKChuIC0gc3RhcnQxKSAvIChzdG9wMSAtIHN0YXJ0MSkpICogKHN0b3AyIC0gc3RhcnQyKSArIHN0YXJ0Mjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IHVwZGF0ZUxheW91dEltYWdlV2FpdGluZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VMb2FkaW5nUHJvbWlzZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IHF1ZXVlZEJlZm9yZUxheW91dCBvZiBxdWV1ZWRCZWZvcmVMYXlvdXRzKSBxdWV1ZWRCZWZvcmVMYXlvdXQoKTtcbiAgICAgICAgaW1hZ2VMb2FkaW5nUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgcXVldWVkQmVmb3JlTGF5b3V0cyA9IFtdO1xuICAgICAgICB1cGRhdGVMYXlvdXQoKTtcbiAgICB9O1xuICAgIGVmZmVjdCh1cGRhdGVMYXlvdXRJbWFnZVdhaXRpbmcsIFtib2R5U2lnXSk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHlTaWcudW5zdWJzY3JpYmUodXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nKSk7XG5cbiAgICB1cGRhdGVMYXlvdXRJbWFnZVdhaXRpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlQmVmb3JlTGF5b3V0KGV2ZW50OiAoKSA9PiB2b2lkKSB7XG4gICAgcXVldWVkQmVmb3JlTGF5b3V0cy5wdXNoKGV2ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmeUltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGltYWdlTG9hZGluZ1Byb21pc2VzLnB1c2goaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIGNvbnN0IFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuNztcbiAgICByZXR1cm4gaW5uZXJIZWlnaHQgKiBTQ1JPTExfSEVJR0hUX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoKCkge1xuICAgIGNvbnN0IFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OID0gMTtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAqIFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OOyAvLyBUT0RPIHRoaXMgc2hvdWxkIGp1c3QgdXNlIGFjdHVhbCBzY3JvbGwgaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50LmNsaWVudFdpZHRoICsgZ2FwKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHlBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbmV4cG9ydCBjb25zdCB4QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudFdpZHRoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JUb01pbm9yR2FwOiBudW1iZXIsIGJldHdlZW5NaW5vcnNHYXA6IG51bWJlcikge1xuICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbXTtcblxuICAgIGl0ZW1zLnB1c2gobWFqb3IsIG1ham9yVG9NaW5vckdhcCk7XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBpdGVtcy5wdXNoKG1pbm9yLCBiZXR3ZWVuTWlub3JzR2FwKTtcbiAgICB9XG4gICAgaXRlbXMucG9wKCk7IC8vIHJlbW92ZSBmaW5hbCBnYXAsIG9ubHkgd2FudCBiZXR3ZWVuc1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCB0b3RhbEhlaWdodF0gPSB5QWxpZ25pbmdXaXRoR2FwcyhpdGVtcyk7XG4gICAgY29uc3QgZ3JvdXBUb3AgPSAoc2Nyb2xsSGVpZ2h0IC0gdG90YWxIZWlnaHQpIC8gMjtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KGdyb3VwVG9wICsgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBtaW5vci5zdHlsZS5sZWZ0ID0gbWFqb3Iuc3R5bGUubGVmdDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJTY2FsZWRZKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gc2Nyb2xsQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIHNjYWxlO1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCgoaGVpZ2h0ICogZWxlbWVudC5uYXR1cmFsV2lkdGgpIC8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0KTtcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KChzY3JvbGxDb250YWluZXIuY2xpZW50SGVpZ2h0IC0gaGVpZ2h0KSAvIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyU2NhbGVkWChlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IHdpZHRoID0gc2Nyb2xsQ29udGFpbmVyLmNsaWVudFdpZHRoICogc2NhbGU7XG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KHdpZHRoKTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoKHdpZHRoICogZWxlbWVudC5uYXR1cmFsSGVpZ2h0KSAvIGVsZW1lbnQubmF0dXJhbFdpZHRoKTtcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgoc2Nyb2xsQ29udGFpbmVyLmNsaWVudFdpZHRoIC0gd2lkdGgpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAvIGlubmVySGVpZ2h0ID4gMTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkNvbm5lY3QoKSB7fVxuIiwiaW1wb3J0IHsgaWVHcmVlbiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgc3R5bGVTY3JvbGxUZXh0IH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5pbnRlcmZhY2UgUXVvdGVEaXNwbGF5IHtcbiAgICBxdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgYXV0aG9yOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICB0aXRsZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgb3BlblF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBjbG9zZVF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkUXVvdGUocXVvdGVUZXh0OiBzdHJpbmcsIGF1dGhvclRleHQ6IHN0cmluZywgdGl0bGVUZXh0OiBzdHJpbmcpOiBRdW90ZURpc3BsYXkge1xuICAgIGNvbnN0IHF1b3RlID0gYWRkU2Nyb2xsVGV4dChxdW90ZVRleHQpO1xuICAgIGNvbnN0IGF1dGhvciA9IGFkZFNjcm9sbFRleHQoYXV0aG9yVGV4dCk7XG4gICAgY29uc3QgdGl0bGUgPSBhZGRTY3JvbGxUZXh0KHRpdGxlVGV4dCk7XG4gICAgY29uc3Qgb3BlblF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnFwiKTtcbiAgICBjb25zdCBjbG9zZVF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnVwiKTtcblxuICAgIHJldHVybiB7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGVEaXNwbGF5KSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMyICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2NSAqIHMgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplOiAwLjE1ICogcywgd2lkdGg6IDAuMDUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlRGlzcGxheSwgbnVkZ2U6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGF1dGhvci5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG4gICAgdGl0bGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgcXVvdGUsIC8vXG4gICAgICAgIDAuMDQgKiBzLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIC0wLjAxNSAqIHMsXG4gICAgICAgIHRpdGxlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4zNSAqIHMpO1xuICAgIH1cblxuICAgIG9wZW5RdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCAtIDAuMDcgKiBzKTtcbiAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgIGNsb3NlUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgKyBxdW90ZS5vZmZzZXRXaWR0aCAtIG51ZGdlKTtcbiAgICBjbG9zZVF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIHF1b3RlLm9mZnNldEhlaWdodCAtIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2RXZvbHV0aW9uKCkge1xuICAgIGNvbnN0IGV2b2x1dGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi5zdmdcIik7XG4gICAgY29uc3QgZXZvbHV0aW9uSGlzdG9yeSA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi1oaXN0b3J5LnN2Z1wiKTtcbiAgICAvLyBjb25zdCBsb2dvRnVsbCA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2xvZ28tZnVsbC5zdmdcIik7XG5cbiAgICBjb25zdCBwcm9tb3M6IEhUTUxJbWFnZUVsZW1lbnRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykgcHJvbW9zLnB1c2goYWRkU2Nyb2xsSW1hZ2UoYGV2b2x1dGlvbi9wcm9tby0ke2l9LmpwZ2ApKTtcblxuICAgIGNvbnN0IHF1b3RlcyA9IFtcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIk91ciBhbm51YWwgcHJvbW8gaXMgYWx3YXlzIGdyb3VuZGVkIGluIG91ciBpZGVudGl0eSBidXQgaXQncyBmdW4gdG8gcHVzaCBsaW1pdHMgYW5kIHJlaW52ZW50IG91cnNlbHZlcyBlYWNoIHllYXIuIFRoZSBiZXN0IHBhcnQgaXMgPHN0cm9uZz5oZWFyaW5nIHdoYXQgb3VyIGNsaWVudHMgaGF2ZSB0byBzYXkuPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBcIkJFVEhMWU4gS1JBS0FVRVJcIixcbiAgICAgICAgICAgIFwiRm91bmRlciwgaS5lLiBkZXNpZ24sIGluYy5cIlxuICAgICAgICApLFxuICAgICAgICBhZGRRdW90ZShcIkkgbG92ZSBob3cgeW91IGRvIHN0dWZmLiBJJ20gZmluZGluZyB0aGF0IHRoZXNlIHR5cGVzIG9mIG1lc3NhZ2VzIGFyZSByZWFsbHkgPHN0cm9uZz50cmFuc2Zvcm1pbmcgcmVsYXRpb25zaGlwczwvc3Ryb25nPiB3aXRoIHBlb3BsZS4gVGhleSBhcmUganVzdCBkcmVhbXkuXCIsIFwiREVCUkEgU0NIQVRaS0lcIiwgXCJGb3VuZGVyLCBCUFAgV2VhbHRoIFNvbHV0aW9ucyBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBzZWUgYSBsb3Qgb2YgdGhpcyBzcGVjaWFsIHF1YWxpdHkgaW4geW91ciB3b3JrLiBJdCdzIG5vdCBqdXN0IGFib3V0IGJlaW5nIGludGVudGlvbmFsLiBZb3UgYWx3YXlzIGJyaW5nIGluIGFuIGVsZW1lbnQgb2YgPHN0cm9uZz5zdXJwcmlzZSBhbmQgZGVsaWdodC48L3N0cm9uZz5cIiwgXCJKT1NIIEtSQUtBVUVSXCIsIFwiRm91bmRlciwgU2N1bHB0XCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdXIgYXBwcm9hY2ggd29ya3Mgc28gd2VsbCBiZWNhdXNlIGl0IGlzIHJlYWxseSA8c3Ryb25nPnBlcnNvbmFsPC9zdHJvbmc+IGFuZCBlcXVhbGx5IDxzdHJvbmc+cHJvZmVzc2lvbmFsLjwvc3Ryb25nPlwiLCBcIkFOTiBTVUxMSVZBTlwiLCBcIkZvdW5kZXIsIEFubiBTdWxsaXZhbiBPcmdhbml6aW5nXCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdSB0cnVseSB1bmRlcnN0YW5kIHRoZSB1bmlxdWUgcG9zaXRpb25pbmcgb2YgYSBwcm9zcGVjdGl2ZSBjbGllbnQgYW5kIGFyZSBhYmxlIHRvIDxzdHJvbmc+dGVsbCB0aGVpciBzdG9yeTwvc3Ryb25nPiBleGFjdGx5IGFzIGl0IHNob3VsZCBiZSB0b2xkLlwiLCBcIkRBVklEIFlVTlwiLCBcIlByaW5jaXBhbCwgVmFyaWRlbnQgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiQmV0aCBpcyBxdWl0ZSBmcmFua2x5IG9uZSBvZiB0aGUgPHN0cm9uZz5tb3N0IHRhbGVudGVkIGRlc2lnbmVyczwvc3Ryb25nPiB0aGF0IEkgaGF2ZSBldmVyIGhhZCB0aGUgcHJpdmlsZWdlIHRvIHdvcmsgd2l0aC4gU2hlIGFsd2F5cyBoYXMgYSBzcGVjaWFsIHdheSBvZiBtYWtpbmcgZXZlcnl0aGluZyBzaGUgdG91Y2hlcyB0dXJuIHRvIGdvbGQhXCIsXG4gICAgICAgICAgICBcIkRBVklEIFJVU0hcIixcbiAgICAgICAgICAgIFwiUHJlc2lkZW50LCBFTlZcIlxuICAgICAgICApLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoZXZvbHV0aW9uLCAwLjc1KTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShldm9sdXRpb25IaXN0b3J5LCAwLjMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW9zKSBjZW50ZXJTY2FsZWRZKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtldm9sdXRpb24sIDAuMiAqIHMsIGV2b2x1dGlvbkhpc3RvcnldO1xuXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHF1b3Rlcy5sZW5ndGgsIHByb21vcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IHF1b3Rlcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcXVvdGVzW2ldLnF1b3RlKTtcbiAgICAgICAgICAgIGlmIChpIDwgcHJvbW9zLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBwcm9tb3NbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUsIDAuMDUgKiBzKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllQmx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduV2l0aEdhcCwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIHN0eWxlU2Nyb2xsVGV4dCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuY29uc3QgSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OID0gMC44NTtcblxuaW50ZXJmYWNlIEluc3BpcmF0aW9uVGlsZSB7XG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yOiBIVE1MRWxlbWVudDtcbiAgICByZWFkTW9yZTogSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjYsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZTogMC4wMzYgKiBzLFxuICAgICAgICB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcyxcbiAgICAgICAgbGluZUhlaWdodDogMC4wOSAqIHMsXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQobWlub3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC4zLFxuICAgICAgICBmb250V2VpZ2h0OiAzNTAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemU6IDAuMDI3ICogcyxcbiAgICAgICAgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsXG4gICAgICAgIGxpbmVIZWlnaHQ6IDAuMDUgKiBzLFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KHJlYWRNb3JlLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNSxcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogaWVCbHVlLFxuICAgICAgICBmb250U2l6ZTogMC4wMyAqIHMsXG4gICAgICAgIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLFxuICAgICAgICBsaW5lSGVpZ2h0OiAwLjA1ICogcyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCAqIDAuNTUpO1xufVxuXG5mdW5jdGlvbiBhbGlnbkluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIG1ham9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIHJlYWRNb3JlLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgaW1hZ2UsIC8vXG4gICAgICAgIDAuMDMgKiBzLFxuICAgICAgICBtYWpvcixcbiAgICAgICAgLTAuMDEgKiBzLFxuICAgICAgICBtaW5vcixcbiAgICAgICAgMC4wMSAqIHMsXG4gICAgICAgIHJlYWRNb3JlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgcyAqIDAuMTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25UaWxlKGltYWdlU3RyaW5nOiBzdHJpbmcsIG1ham9yVGV4dDogc3RyaW5nLCBtaW5vclRleHQ6IHN0cmluZyk6IEluc3BpcmF0aW9uVGlsZSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhZGRTY3JvbGxJbWFnZShpbWFnZVN0cmluZyk7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3IgPSBhZGRTY3JvbGxUZXh0KG1pbm9yVGV4dCk7XG4gICAgY29uc3QgcmVhZE1vcmUgPSBhZGRTY3JvbGxUZXh0KFwiUmVhZCBtb3JlXCIpO1xuXG4gICAgcmV0dXJuIHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2SW5zcGlyYXRpb24oKSB7XG4gICAgY29uc3QgaW5zcGlyYXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImluc3BpcmF0aW9uL2luc3BpcmF0aW9uLnN2Z1wiKTtcblxuICAgIGNvbnN0IHRpbGVzID0gW1xuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi95dW1pZS5qcGdcIiwgXCJUSEUgU1RBUlQgT0YgU09NRVRISU5HIFlVTS1JRVwiLCBcIldlIGFsd2F5cyB3YW50ZWQgdG8gZGVzaWduIGNob2NvbGF0ZSBiYXJzIGFuZCBmaW5hbGx5IGRpZCBpdC4gSW50cm9kdWNpbmcgb3VyIHN3ZWV0IG5ldyBicmFuZC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3dvcmRzLWlkZWFzLmpwZ1wiLCBcIlNIQVJFIFNPTUUgREVTSUdOIExPVkVcIiwgXCJUaGUgaS5lLiBkZXNpZ24gcHJvbW8gam91cm5hbHMgZW5jb3VyYWdlIGNsaWVudHMgdG8gc2tldGNoIHRoZWlyIGJpZyBpZGVhcyBhbmQgY2FwdHVyZSB0aGVpciBkcmVhbXMuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9jb29rLWllLmpwZ1wiLCBcIkdPVFRBIExPVkUgQSBDT09LLUlFXCIsIFwiSG93IGEgc2VjcmV0IHJlY2lwZSB3b3JrcyB0byBicmluZyByZWxhdGlvbnNoaXBzIHRvIGEgd2hvbGUgbmV3IGxldmVsLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVtaXguanBnXCIsIFwiUkVNSVhcIiwgXCJBIGJlaGluZC10aGUtc2NlbmVzIGxvb2sgYXQgaG93IHdlIHRyYW5zZm9ybWVkIGNsYXNzaWMgbWVtb3J5IGNhcnJpZXJzIGludG8gb2JqZWN0cyBvZiBhcnQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9rcmVtcGEucG5nXCIsIFwiUkVCUkFORElORyBBIEZBTUlMWSBCVVNJTkVTU1wiLCBcIkEgcmVmcmVzaCBmb3IgYSA1MC15ZWFyIGxlZ2FjeS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2ZvdG9zdG9yaS5qcGdcIiwgXCJCUkFORElORyBGUk9NIFRIRSBOQU1FIFVQXCIsIFwiV2hlbiBhIGNsaWVudCBoYWQgYW4gaWRlYSBmb3IgYSBicmFuZCBzcGlub2ZmLCB3ZSB0b29rIGhlciBjb25jZXB0IHRvIHJlYWxpdHkgYW5kIGxhdW5jaGVkIHRoZSBidXNpbmVzcyBpbiBoaWdoIHN0eWxlLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vaW5zcGlyZWQtMi1jcmVhdGUuanBnXCIsIFwiSU5TUElSRUQgMiBDUkVBVEVcIiwgXCJBIHBhaW50aW5nIGluc3BpcmVkIGJ5IHRoZSBpLmUuIGRlc2lnbiBsb2dvIGNvbWJpbmVzIG9pbCBwYWludHMsIGdyb3VuZCB1cCBjcmF5b25zLCBhbmQgYSBsZWdvLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZnJvbS1pbnNpZGUuanBnXCIsIFwiVEhFIFZJRVcgRlJPTSBJTlNJREVcIiwgXCJpLmUuIGRlc2lnbidzIG5ldyBzdHVkaW8gd2FzIDMwIHllYXJzIGluIHRoZSBtYWtpbmcuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZWNvbm5lY3RpbmcuanBnXCIsIFwiUkVDT05ORUNUSU5HXCIsIFwiSG93IHVuY2VydGFpbiB0aW1lcyBsZWQgdG8gYSBob21lY29taW5nIGZvciBpLmUuIGRlc2lnbidzIHNlbmlvciBkZXNpZ25lci5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL25ldy1zdHVkaW8uanBnXCIsIFwiTkVXIFNUVURJTy4gTkVXIFZJRVcuXCIsIFwiSG93IHRoZSBuZWVkIGZvciBpbnNwaXJhdGlvbiBmdWVsZWQgdGhlIGJ1aWxkaW5nIG9mIGEgc3R1ZGlvLlwiKSxcbiAgICBdO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyU2NhbGVkWShpbnNwaXJhdGlvbiwgMC43NSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBzdHlsZUluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBhbGlnbldpdGhHYXAoaW5zcGlyYXRpb24sIHRpbGVzWzBdLmltYWdlLCBzICogMC4yNSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoIC0gMTsgaSsrKSBhbGlnbldpdGhHYXAodGlsZXNbaV0uaW1hZ2UsIHRpbGVzW2kgKyAxXS5pbWFnZSwgcyAqIDAuMSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBhbGlnbkluc3BpcmF0aW9uVGlsZSh0aWxlKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlclNjYWxlZFgsIGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIGlzTGFuZHNjYXBlLCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHhBbGlnbmluZ1dpdGhHYXBzLCB5QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9sYXlvdXRcIjtcclxuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHRTcXVhcmUsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgVGV4dFNxdWFyZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdlZpZXcoKSB7XHJcbiAgICBjb25zdCBob21lID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvbWUuc3ZnXCIpO1xyXG4gICAgY29uc3QgaG9yaXpvbiA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob3Jpem9uLmpwZ1wiKTtcclxuICAgIGNvbnN0IGZyZXNoTG9vayA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9mcmVzaC1sb29rLnN2Z1wiKTtcclxuICAgIGNvbnN0IGdyZWF0QnJhbmRzID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2dyZWF0LWJyYW5kcy5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTEgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiR1JFQVQgQlJBTkRTIERPTidUIEpVU1QgSEFQUEVOXCIsXHJcbiAgICAgICAgXCJUaGV5IHJlcXVpcmUgZXhwbG9yYXRpb24sIGluc2lnaHQsIGFuZCB0ZW5hY2l0eS4gV2UgaHVudCBmb3IgdGhhdCBtYWdpYyBzcGFyayB0aGF0IGlnbml0ZXMgaW5ub3ZhdGlvbi4gV2UgYnJpbmcgb3VyIGV4dGVuc2l2ZSBza2lsbHMgYW5kIGV4cGVyaWVuY2UgdG8gZWFjaCBwcm9qZWN0IGFuZCBnaXZlIGl0IG91ciBhbGwuIFRoZSByZXN1bHQgaXMgY2xlYXIsIHlldCBlbGV2YXRlZCBjb21tdW5pY2F0aW9uIHRoYXQgbWFrZXMgcGVvcGxlIHN0b3AsIHRoaW5rLCBhbmQgb2Z0ZW4gc21pbGUuXCIsXHJcbiAgICAgICAgXCJPdXIgc3R1ZGlvIGxvY2F0aW9uIGlzIHByb2ZvdW5kbHkgaW5zcGlyaW5nLiBUaGUgbWFnbmlmaWNlbnQgdmlldyBmZWVkcyBvdXIgc291bHMgYW5kIGtlZXBzIHVzIGluc3BpcmVkIHRvIGRvIG91ciBiZXN0IHdvcmsuIEl0J3MgYSBwbGFjZSB3aGVyZSBjcmVhdGl2ZSBwZW9wbGUgY29tZSB0b2dldGhlciB0byBjb2xsYWJvcmF0ZSBhbmQgZHJpbGwgZG93biB0byB0aGUgaGVhcnQgb2YgdGhlIG1hdHRlci4gVG8gc29sdmUgcHJvYmxlbXMgYW5kIGJyaW5nIGlkZWFzIHRvIGxpZmUuIFRvIGNyZWF0ZSB0aGluZ3Mgd29ydGggcmVtZW1iZXJpbmcuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBpbnNpZ2h0Q2xhcml0eSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9pbnNpZ2h0LWNsYXJpdHkuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUyID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIEJSSU5HIFZJU0lPTiwgSU5TSUdIVCwgQU5EIENMQVJJVFkgVE8gRVZFUlkgUFJPSkVDVFwiLFxyXG4gICAgICAgIFwiU3VjY2Vzc2Z1bCBkZXNpZ24gc3RhcnRzIHdpdGggaWRlbnRpZnlpbmcgYSBjbGllbnQncyBuZWVkcywgZ29hbHMsIGFuZCBhc3BpcmF0aW9ucy4gT3VyIG9iamVjdGl2aXR5IHNoaW5lcyBsaWdodCBvbiB3aGF0IG90aGVycyBoYXZlIG1pc3NlZC4gV2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBzZWUgYW5kIGludGVycHJldCB0aGUgaW5uZXIgd29ya2luZ3MsIGN1bHR1cmUsIGFuZCBudWFuY2VzIG9mIG91ciBjbGllbnQncyB3b3JsZC4gV2UgYXNrIHF1ZXN0aW9ucyDigJMgbG90cyBvZiBxdWVzdGlvbnMuIFRoZW4gbGlzdGVuIHVudGlsIHdlIGdhaW4gdGhlIGRlZXAgdW5kZXJzdGFuZGluZyBuZWNlc3NhcnkgdG8gYnVpbGQgdGhlIHNvbGlkIGZvdW5kYXRpb24gdGhhdCBhbnkgZW5kdXJpbmcgYnJhbmQgbmVlZHMuXCIsXHJcbiAgICAgICAgXCJPdXIgc21hbGwgYnV0IG1pZ2h0eSB0ZWFtIGJyaW5ncyB0b2dldGhlciBhIHdpZGUgcmFuZ2Ugb2YgdGFsZW50cyBhbmQgcGVyc3BlY3RpdmVzLCBwbHVzIGEgbmljZSBsaXN0IG9mIGF3YXJkcy4gV2UgdGhyb3cgb3VyIGhlYXJ0cyBpbnRvIG91ciB3b3JrIGFuZCBhcmUga25vd24gZm9yIG91ciBmaWVyY2UgY29tbWl0bWVudCB0byB0aGUgdHJ1c3RlZCwgbG9uZy10ZXJtIHBhcnRuZXJzaGlwcyB3ZSBmb3JtLiBGb3IgdXMsIGl0J3MgcGVyc29uYWwuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBza3l3YXJkID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L3NreXdhcmQuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUzID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIFNFRSBXT1JLIElOIEEgRElGRkVSRU5UIExJR0hUXCIsXHJcbiAgICAgICAgXCJQZW9wbGUgbGlrZSB0byBhc2sgYWJvdXQgb3VyIGRlc2lnbiBwcm9jZXNzLiBUaGUgdHJ1dGggaXMgdGhhdCB0aGUgYXBwcm9hY2ggdG8gZWFjaCBwcm9qZWN0IHZhcmllcywgYmVjYXVzZSBlYWNoIGNsaWVudCBhbmQgdGhlaXIgbmVlZHMgYXJlIHVuaXF1ZS4gQ3JlYXRpdmUgYnJlYWt0aHJvdWdocyBkb24ndCBmb2xsb3cgdGhlIGNsb2NrLiBUaGV5IGNhbiBoYXBwZW4gYW55IHRpbWUgb2YgZGF5IOKAkyBvciBuaWdodC4gV2hldGhlciBhbiBlcGlwaGFueSBpcyBpbGx1bWluYXRlZCBpbiBhIHNjcmliYmxlLCBhIGRyZWFtLCBvciBhcyB0aGUgY2xvdWRzIHJvbGwgYnksIHdlIGVtYnJhY2UgdGhlIGZhY3QgdGhhdCBlYWNoIHByb2plY3QgdGFrZXMgb24gYSBsaWZlIG9mIGl0cyBvd24uXCIsXHJcbiAgICAgICAgXCJXaGF0J3MgY29uc3RhbnQgaXMgb3VyIGFiaWxpdHkgdG8gbGlzdGVuIGFuZCBmb2N1cywgdG8gYW5hbHl6ZSBhbmQgY29ubmVjdCBkb3RzLCBhbmQgdG8gcmVtYWluIGN1cmlvdXMuIFRoZSBtb3N0IHJld2FyZGluZyBwcm9qZWN0cyBhcmUgd2l0aCBjbGllbnRzIHdobyB2YWx1ZSB0aGUgYmFsYW5jZSBiZXR3ZWVuIHB1c2hpbmcgZm9yd2FyZCBhbmQgYWxsb3dpbmcgdGltZSBmb3IgdGhlIHBlcmZlY3Qgc29sdXRpb24gdG8gZW1lcmdlLiBUaGF0J3Mgb3VyIGhhcHB5IHBsYWNlLlwiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRleHRUaWxlcyA9IFt0ZXh0VGlsZTEsIHRleHRUaWxlMiwgdGV4dFRpbGUzXTtcclxuXHJcbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgSE9NRV9IT1JJWk9OX1BBRCA9IDAuMjtcclxuICAgICAgICBjb25zdCBGUkVTSF9MT09LX1BBRCA9IDAuMTM7XHJcbiAgICAgICAgY29uc3QgSU1BR0VfVEVYVF9TUVVBUkVfUEFEID0gMC4xNztcclxuXHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShmcmVzaExvb2ssIDAuOCk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMi4yLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiNCM0IzQjNcIiwgZm9udFNpemU6IDAuMDY1ICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB4QWxpZ25pbmdXaXRoR2FwcyhbXHJcbiAgICAgICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICAgICAgSE9NRV9IT1JJWk9OX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBob3Jpem9uLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUxLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMy5tYWpvcixcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChmcmVzaExvb2ssIDAuODUpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogNCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA4ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgVEVYVF9USUxFX1dJRFRIID0gMC44NTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlclNjYWxlZFgodGV4dFRpbGUubWFqb3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgY2VudGVyU2NhbGVkWChtaW5vciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgTU9CSUxFX1BBRCA9IDAuMDg7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb2JpbGVUaWxlKHRleHRUaWxlOiBUZXh0U3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gW3RleHRUaWxlLm1ham9yLCAwLjAgKiBzXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSB4LnB1c2goMC4wNCAqIHMsIG1pbm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBncmVhdEJyYW5kcyxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTEpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTIpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMyksXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IGVmZmVjdCwgU2lnbmFsIH0gZnJvbSBcIi4uL3NpZ25hbFwiO1xuaW1wb3J0IHsgYW5pbWF0ZVNwcmluZywgU3ByaW5nIH0gZnJvbSBcIi4uL3NwcmluZ1wiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHRTcXVhcmUsIG9uTmF2T3B0aW9uQ2xpY2ssIHNjcm9sbENvbnRhaW5lciwgc3BhY2VUb0ZpbGUsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgVGV4dFNxdWFyZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcbmltcG9ydCB7IGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBtYXBSYW5nZSwgbm90aWZ5SW1hZ2VMb2FkaW5nLCBweCwgcXVldWVCZWZvcmVMYXlvdXQsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCB4QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IGJvZHksIGJvZHlTaWcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5cbmludGVyZmFjZSBXb3JrQ29udGVudCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIFdvcmtEaXNwbGF5IHtcbiAgICB0ZXh0U3F1YXJlOiBUZXh0U3F1YXJlO1xuICAgIGltYWdlMTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWFnZTI6IEhUTUxJbWFnZUVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBXb3JrSXRlbSB7XG4gICAgdGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgICBzcHJpbmc6IFNwcmluZztcbiAgICBzcHJpbmdTaWc6IFNpZ25hbDtcbn1cblxuY29uc3Qgd29ya0NvbnRlbnRzOiBXb3JrQ29udGVudFtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJiZXJ3eW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiSGF2aW5nIHNwZW50IGhpcyBlbnRpcmUgY2hpbGRob29kIG1ha2luZyBmaWxtcywgdGhpcyBjb21wYW55J3MgZm91bmRlciBuYW1lZCBoaXMgYWdlbmN5IGFmdGVyIHRoZSBzdHJlZXQgb24gd2hpY2ggaGUgd2FzIHJhaXNlZC4gV2l0aCBhIGhpc3RvcnkgbGlrZSB0aGF0LCB3ZSBoYWQgdG8gZWxldmF0ZSBCZXJ3eW4gdG8gbGFuZG1hcmsgc3RhdHVzLiBVc2luZyBjdXN0b20gcGhvdG9ncmFwaHkgYW5kIG1hc3RlciBtYW5pcHVsYXRpb24sIHdlIGNyZWF0ZWQgYSBmbGV4aWJsZSBzdGlja2VyIHN5c3RlbSB0aGF0IGlzIGludGVyY2hhbmdlYWJsZSB3aXRoIG11bHRpLWNvbG9yZWQgcGFwZXIgc3RvY2tzLiBFbXBsb3llZXMgYXJlIGVuY291cmFnZWQgdG8gZGVzaWduIHRoZWlyIG93biBjb21tdW5pY2F0aW9ucyBhbmQgZ2V0IGEgY29tcGxldGUgc2VyaWVzIG9mIGF3YXJkLXdpbm5pbmcgYnVzaW5lc3MgY2FyZHMgdG8gY2hvb3NlIGZyb20uXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBGaWxtLCBUZWxldmlzaW9uLCBWaWRlbyBQcm9kdWN0aW9uXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiazIga3J1cHBcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBhd2FyZC13aW5uaW5nLCBOZXcgWW9yayBDaXR5IHB1YmxpYyByZWxhdGlvbnMgYW5kIG1hcmtldGluZyBhZ2VuY3kgaGFzIGEgc3VjY2Vzc2Z1bCB0cmFjayByZWNvcmQgaW4gaWduaXRpbmcgYnJhbmRzIGZyb20gc3RhcnQtdXBzLCBuZXcgYXV0aG9ycywgYW5kIGNlbGVicml0aWVzIGJ5IGNvbm5lY3RpbmcgdGhlbSB3aXRoIGN1bHR1cmFsIHRyZW5kcyBhbmQgaW5mbHVlbmNlcnMuIFdoZW4gaXQgY2FtZSB0byByZXByZXNlbnRpbmcgdGhlaXIgYnJhbmQsIEsyIGNhbWUgdG8gdXMuIEJvbGQsIHZpYnJhbnQsIGFuZCBkeW5hbWljLCB0aGlzIHRpbWVsZXNzIGlkZW50aXR5IHN5c3RlbSByZWZsZWN0cyB0aGUgZm91bmRlcidzIGZhdm9yaXRlIGNvbG9yIGFuZCB0aGUgY29tcGFueSdzIGVuZXJnZXRpYyBjdWx0dXJlIGFuZCBlbnZpcm9ubWVudC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFB1YmxpYyBSZWxhdGlvbnMgJiBNYXJrZXRpbmcgZm9yIE1lZGlhXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2h5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBZnRlciBzdWNjZXNzZnVsbHkgYnJhbmRpbmcgdGhlaXIgZmlyc3QgZWF0ZXJ5LCB0aGlzIGNsaWVudCByZXR1cm5lZCB0byB1cyB0byByZWFsaXplIHRoZWlyIGRyZWFtIG9mIGFuIHVwc2NhbGUsIFVwcGVyIFdlc3QgU2lkZSBlYXRpbmcgZGVzdGluYXRpb24uXCIsXG4gICAgICAgICAgICBcIlRoZSBjdXN0b20gbGV0dGVyZm9ybSBpcyBhIHdoaW1zaWNhbCBwbGF5IG9uIHRoZWlyIHVuaXF1ZSBzcGVsbGluZyBhbmQgY2FuIHJlYWQgdXBzaWRlIGRvd24uIFRoZSB2aWJyYW50IGNvbG9yIHBhbGV0dGUgd2FzIGRldmVsb3BlZCBpbiBwYXJ0bmVyc2hpcCB3aXRoIHRoZSBpbnRlcmlvciBhcmNoaXRlY3R1cmUgdGVhbSB0byBjcmVhdGUgYSB3YXJtIGFuZCBleGNpdGluZyBhdG1vc3BoZXJlLiBUaGUgY3VzdG9tIGRpZS1jdXQgZWRnZSBvZiB0aGUgaWRlbnRpdHkgc3lzdGVtIG1pbWljcyB0aGUgY3VydmUgb2YgdGhlIHVuaXF1ZSwgc2hvd2Nhc2UgYmFyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUmVzdGF1cmFudCAmIEJhclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImFubiBzdWxsaXZhblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBbm4gZHJlYW1lZCBvZiBiZWluZyDigJx0aGUgT3ByYWjigJ0gb2Ygb3JnYW5pemluZy4gV2UgZXN0YWJsaXNoZWQgaGVyIG5hbWUgYXMgdGhlIGJyYW5kIGFuZCBjcmVhdGVkIGEgdGFnbGluZSwgd2hpY2ggcmVmbGVjdGVkIHRoZSBwZWFjZSBvZiBtaW5kIHRoYXQgaGVyIGNsaWVudHMgZ2V0IGZyb20gaGF2aW5nIGFuZCBtYWludGFpbmluZyBhbiBvcmdhbml6ZWQgbGlmZS4gVGhlIHNpbXBsZSBpY29uIHNlcmllcyByZXByZXNlbnRzIGVhY2ggYXJlYSBvZiBleHBlcnRpc2UuIEFzIHRoZSBjb21wYW55J3Mgc2VydmljZXMgaGF2ZSBleHBhbmRlZCBvdmVyIHRoZSB5ZWFycywgdGhlIGlkZW50aXR5IHN5c3RlbSBoYXMgZXZvbHZlZCBhbG9uZyB3aXRoIGl0IGFuZCByZW1haW5zIGFzIGZyZXNoIGFzIGl0IHdhcyBkYXkgb25lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHJvZmVzc2lvbmFsIE9yZ2FuaXppbmdcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJsb2FcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBwcm9mZXNzaW9uYWwgbWFrZS11cCBhcnRpc3QgdGVhbSBjYW1lIHRvIHVzIHRvIGJyYW5kIHRoZWlyIHBhdGVudGVkIOKAnHdhdGVyc2xpZGXigJ0gZXllIHBlbmNpbC4gQ29sb3IgbmFtZXMgbGlrZSDigJxHaXZpbmcgQmFjayBCbGFjayzigJ0gcmVmbGVjdCB0aGUgY29tcGFueSdzIGNvbW1pdG1lbnQgdG8gcHJvdmlkaW5nIG1ha2VvdmVycyBmb3Igd29tZW4gZmFjaW5nIGhlYWx0aCBjaGFsbGVuZ2VzLiBUaGUgcGxheWZ1bCBwYWNrYWdpbmcgZWxldmF0ZXMgYSBzdGFwbGUgcHJvZHVjdCB0byBnaWZ0IHdvcnRoeSBhbmQgZ2VuZXJhdGVzIGF0dGVudGlvbiBpbiBhIHNhdHVyYXRlZCBtYXJrZXQgYnkgZmx5aW5nIGFib3ZlIGl0cyBkaXNwbGF5IGNhc2UuIFRoZSBtb3RpZiBob2xkcyBzcGVjaWFsIG1lYW5pbmcgZm9yIHRoZSBmb3VuZGVyIHdobyBzaGFyZWQgd2l0aCB1cyB0aGF0IHRoZSBidXR0ZXJmbHkgaXMgYSBzaWduIHRoYXQgaGVyIGJlbG92ZWQgbW90aGVyIGlzIHN0aWxsIHdpdGggaGVyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogQmVhdXR5ICYgQ29zbWV0aWNzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2V0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgTWFzdGVyIEFyY2hpdGVjdCBhbmQgd29ybGQtcmVub3duZWQgc3BhIGRlc2lnbmVyIHVzZWQgaGlzIHJlcHV0YXRpb24gYW5kIGV4cGVydGlzZSBpbiBoeWRyb3RoZXJhcHkgdG8gbGF1bmNoIGFuIGV4Y2x1c2l2ZSBwcm9kdWN0IGxpbmUgZm9yIGx1eHVyeSBob3RlbHMgYW5kIHJlc29ydHMuIEEgc29vdGhpbmcsIG11dGVkIGNvbG9yIHBhbGV0dGUgd2FzIGRlc2lnbmVkIHRvIHJlZmxlY3QgdGhlIHNjZW50IHByb2ZpbGUgb2YgZWFjaCBzZXJpZXMgb2Ygc2NydWJzIGFuZCBsb3Rpb25zLiBBdXRoZW50aWMgd2F0ZXIgc3BsYXNoIHBob3RvZ3JhcGh5IHNldCB0aGUgdG9uZSB0byBwcm9tb3RlIHRoZSBoZWFsdGggYmVuZWZpdHMgYW5kIGFydCBvZiBiYXRoaW5nLiBUaGUgcGFja2FnZSBkZXNpZ24gZXhwYW5kZWQgdG8gZ2lmdCBhbmQgdHJhdmVsIHNldHMgdGhhdCBpbnZpdGUgZ3Vlc3RzIHRvIHRha2UgdGhlIGx1eHVyeSBleHBlcmllbmNlIGhvbWUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBIZWFsdGggJiBXZWxsbmVzcyBTcGFzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiZmVycmFnYW1vXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRhc2tlZCB3aXRoIG1hcmtldGluZyBvZmZpY2Ugc3BhY2UgYWJvdmUgdGhpcyBsdXh1cnkgYnJhbmQncyBGaWZ0aCBBdmVudWUgZmxhZ3NoaXAsIHdlIGZhY2VkIHRoZSBjaGFsbGVuZ2Ugb2YgYW4gdW5rbm93biwgc2lkZSBzdHJlZXQgZW50cmFuY2UuIEhhbmRlZCBub3RoaW5nIG1vcmUgdGhhbiBhbiBhcmNoaXRlY3QncyByZW5kZXJpbmcsIHdlIGVsZWdhbnRseSBicmFuZGVkIHRoZSBhZGRyZXNzLCBjYXB0dXJlZCB0aGUgZW5lcmd5IG9mIHRoZSBsb2NhdGlvbiwgYW5kIGdlbmVyYXRlZCBlbm91Z2ggYnV6eiB0byBleHBhbmQgdGhlIHZpZXdpbmcgcGFydHkgdG8gdHdvIGRhdGVzIGJ5IGx1cmluZyBicm9rZXJzIHdpdGggdGhlIHByb21pc2Ugb2YgYSBGZXJyYWdhbW8gdGllLiBUaGUgcmVzdWx0cyB3ZXJlIGEgcXVpY2sgY2xvc2luZyBhbmQgYSBmZWF0dXJlIGFydGljbGUgaW4gQ3JhaW4ncyBOWSBCdXNpbmVzcyBjaXRpbmcgb3VyIGlubm92YXRpb24gYW5kIHN1Y2Nlc3MgaW4gYSBjaGFsbGVuZ2luZyByZWFsIGVzdGF0ZSBtYXJrZXQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJpZXM6IEx1eHVyeSBGYXNoaW9uLCBSZWFsIEVzdGF0ZVwiLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuXG5mdW5jdGlvbiBzdHlsZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgZm9yIChjb25zdCB7IHRleHRTcXVhcmUsIGltYWdlMSwgaW1hZ2UyIH0gb2Ygd29ya0Rpc3BsYXlzKSB7XG4gICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcbiAgICAgICAgICAgIHRleHRTcXVhcmUsXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShpbWFnZTEsIDEpO1xuICAgICAgICBjZW50ZXJTY2FsZWRZKGltYWdlMiwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBmb3IgKGNvbnN0IHdvcmtDb250ZW50IG9mIHdvcmtDb250ZW50cykge1xuICAgICAgICBjb25zdCB0ZXh0U3F1YXJlID0gYWRkU2Nyb2xsVGV4dFNxdWFyZSh3b3JrQ29udGVudC5uYW1lLnRvVXBwZXJDYXNlKCksIC4uLndvcmtDb250ZW50LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgY29uc3QgaW1hZ2UxID0gYWRkU2Nyb2xsSW1hZ2UoYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vMS5qcGdgKTtcbiAgICAgICAgY29uc3QgaW1hZ2UyID0gYWRkU2Nyb2xsSW1hZ2UoYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vMi5qcGdgKTtcblxuICAgICAgICB3b3JrRGlzcGxheXMucHVzaCh7IHRleHRTcXVhcmUsIGltYWdlMSwgaW1hZ2UyIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbGF5b3V0V29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgZm9yIChjb25zdCB7IHRleHRTcXVhcmUsIGltYWdlMSwgaW1hZ2UyIH0gb2Ygd29ya0Rpc3BsYXlzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgdGV4dFNxdWFyZS5tYWpvcixcbiAgICAgICAgICAgIDAuMiAqIHMsXG4gICAgICAgICAgICBpbWFnZTEsXG4gICAgICAgICAgICAwLjE1ICogcyxcbiAgICAgICAgICAgIGltYWdlMixcbiAgICAgICAgICAgIDAuMjIgKiBzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2V29yaygpIHtcbiAgICBjb25zdCB3b3JrSXRlbXM6IFdvcmtJdGVtW10gPSBbXTtcbiAgICBjb25zdCB3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10gPSBbXTtcblxuICAgIGNvbnN0IEJPVFRPTSA9ICh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSA9PiAoaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LmNsaWVudEhlaWdodCkgLyAyO1xuICAgIGNvbnN0IFRPUCA9ICh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSA9PiBpbm5lckhlaWdodCAtIHRhYkVsZW1lbnQuY2xpZW50V2lkdGggLyAyO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrQ29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgd29ya0NvbnRlbnQgPSB3b3JrQ29udGVudHNbaV07XG5cbiAgICAgICAgY29uc3QgdGFiRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3JjID0gYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vdGFiLnBuZ2A7XG4gICAgICAgIG5vdGlmeUltYWdlTG9hZGluZyh0YWJFbGVtZW50KTtcbiAgICAgICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0YWJFbGVtZW50KTtcbiAgICAgICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5LnJlbW92ZUNoaWxkKHRhYkVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgc3ByaW5nID0gbmV3IFNwcmluZygwKTtcbiAgICAgICAgY29uc3Qgc3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICBzcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTAwMCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAtMC4xO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMDtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrID0gbWFwUmFuZ2Uoc3ByaW5nLnBvc2l0aW9uLCAwLCAxLCBCT1RUT00odGFiRWxlbWVudCksIFRPUCh0YWJFbGVtZW50KSk7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnRvcCA9IHB4KGspO1xuICAgICAgICB9LCBbc3ByaW5nU2lnLCBib2R5U2lnXSk7XG4gICAgICAgIHNwcmluZ1NpZy51cGRhdGUoKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHdvcmtJdGVtIG9mIHdvcmtJdGVtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSA9IHdvcmtJdGVtO1xuXG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IG1hcFJhbmdlKGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCksIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod29ya0Rpc3BsYXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgICAgICBib2R5U2lnLnVwZGF0ZSgpOyAvLyBobSBkb250IGxpa2UgdGhpc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPIHRoaXMgZG9lc24ndCB3b3JrIHF1aXRlIHJpZ2h0IHlldFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3b3JrRGlzcGxheXNbaV0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IHNjcm9sbFBvc2l0aW9uLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnBvc2l0aW9uID0gMTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH0sIDgwICogaSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcblxuICAgICAgICB3b3JrSXRlbXMucHVzaCh7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCB9ID0gd29ya0l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IDMwMDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrSXRlbXMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaykge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGspO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChrICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuXG4gICAgICAgICAgICBzdHlsZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrRGlzcGxheSBvZiB3b3JrRGlzcGxheXMpIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh3b3JrRGlzcGxheS50ZXh0U3F1YXJlLCAwLjAxICogcywgMC4wMSAqIHMpO1xuICAgICAgICAgICAgbGF5b3V0V29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5cyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuaW1wb3J0IHsgY2xpY2tOYXZDb25uZWN0IH0gZnJvbSBcIi4vcGFnZXMvY29ubmVjdFwiO1xuaW1wb3J0IHsgY2xpY2tOYXZFdm9sdXRpb24gfSBmcm9tIFwiLi9wYWdlcy9ldm9sdXRpb25cIjtcbmltcG9ydCB7IGNsaWNrTmF2SW5zcGlyYXRpb24gfSBmcm9tIFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xuaW1wb3J0IHsgY2xpY2tOYXZWaWV3IH0gZnJvbSBcIi4vcGFnZXMvdmlld1wiO1xuaW1wb3J0IHsgY2xpY2tOYXZXb3JrIH0gZnJvbSBcIi4vcGFnZXMvd29ya1wiO1xuaW1wb3J0IHsgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRTY3JvbGxXaWR0aCwgaXNMYW5kc2NhcGUsIG5vdGlmeUltYWdlTG9hZGluZywgcHgsIHF1ZXVlQmVmb3JlTGF5b3V0IH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBib2R5U2lnLCBpZUJsdWUsIGllR3JlZW4gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuaW50ZXJmYWNlIFNjcm9sbFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZm9udFNpemU6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGxpbmVIZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgY29uc3Qgdmlld05hdiA9IGcoXCJuYXYtdmlld1wiKTtcbmV4cG9ydCBjb25zdCB3b3JrTmF2ID0gZyhcIm5hdi13b3JrXCIpO1xuZXhwb3J0IGNvbnN0IGluc3BpcmF0aW9uTmF2ID0gZyhcIm5hdi1pbnNwaXJhdGlvblwiKTtcbmV4cG9ydCBjb25zdCBldm9sdXRpb25OYXYgPSBnKFwibmF2LWV2b2x1dGlvblwiKTtcbmV4cG9ydCBjb25zdCBjb25uZWN0TmF2ID0gZyhcIm5hdi1jb25uZWN0XCIpO1xuXG5leHBvcnQgY29uc3QgbmF2SXRlbXMgPSBbdmlld05hdiwgd29ya05hdiwgaW5zcGlyYXRpb25OYXYsIGV2b2x1dGlvbk5hdiwgY29ubmVjdE5hdl07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDb250YWluZXIgPSBnKFwic2Nyb2xsLWNvbnRhaW5lclwiKTtcbihzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJDb2xvciA9IGAke2llR3JlZW59ICR7aWVCbHVlfTU1YDtcblxuZXhwb3J0IGNvbnN0IGxvZ28gPSBnKFwibG9nb1wiKTtcblxuZXhwb3J0IGxldCBvbk5hdk9wdGlvbkNsaWNrOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gZyhpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxJbWFnZShzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IHNjcm9sbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBzY3JvbGxJbWFnZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxJbWFnZS5zcmMgPSBzcmM7XG4gICAgbm90aWZ5SW1hZ2VMb2FkaW5nKHNjcm9sbEltYWdlKTtcbiAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JvbGxJbWFnZSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxDb250YWluZXIucmVtb3ZlQ2hpbGQoc2Nyb2xsSW1hZ2UpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzY3JvbGxJbWFnZTtcbn1cblxuZnVuY3Rpb24gY2xpY2tBbnlOYXYobmF2SXRlbTogSFRNTEVsZW1lbnQsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBuYXZJdGVtLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgbmF2SXRlbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2Ygb25OYXZPcHRpb25DbGljaykgdSgpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5hdkl0ZW1zKSB7XG4gICAgICAgICAgICBuLnN0eWxlLmNvbG9yID0gXCIjODA4MDgwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBuYXZJdGVtLnN0eWxlLmNvbG9yID0gXCIjMDAwMDAwXCI7XG5cbiAgICAgICAgZigpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNjcm9sbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBzY3JvbGxUZXh0LmlubmVySFRNTCA9IHRleHQ7XG4gICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxDb250YWluZXIuYXBwZW5kKHNjcm9sbFRleHQpO1xuICAgIH0pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxDb250YWluZXIucmVtb3ZlQ2hpbGQoc2Nyb2xsVGV4dCkpO1xuXG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHQoc2Nyb2xsVGV4dDogSFRNTEVsZW1lbnQsIHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSBcIlwiICsgcy5mb250V2VpZ2h0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuY29sb3IgPSBzLmNvbG9yO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGV0dGVyU3BhY2luZyA9IHB4KHMubGV0dGVyU3BhY2luZyk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250U2l6ZSA9IHB4KHMuZm9udFNpemUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzLndpZHRoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzLmxpbmVIZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dFNxdWFyZShtYWpvclRleHQ6IHN0cmluZywgLi4ubWlub3JUZXh0czogc3RyaW5nW10pOiBUZXh0U3F1YXJlIHtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vcnMgPSBtaW5vclRleHRzLm1hcChhZGRTY3JvbGxUZXh0KTtcbiAgICByZXR1cm4geyBtYWpvciwgbWlub3JzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFRleHRTcXVhcmUsIG1ham9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscykge1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyk7XG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZVRvRmlsZShzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKFwiIFwiLCBcIi1cIik7XG59XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgY29uc3QgbGVmdEFsaWduID0gODA7XG4gICAgICAgIGxvZ28uc3R5bGUud2lkdGggPSBweCg1NSk7XG4gICAgICAgIGxvZ28uc3R5bGUuaGVpZ2h0ID0gcHgoNTUpO1xuICAgICAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgICAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KGxlZnRBbGlnbiAvIDIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFsaWduTmF2SXRlbShuYXZJdGVtOiBIVE1MRWxlbWVudCwgbnVkZ2U6IG51bWJlcikge1xuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgLyAyICsgbnVkZ2UgKiA1MCAtIG5hdkl0ZW0uY2xpZW50SGVpZ2h0IC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBhbGlnbk5hdkl0ZW0odmlld05hdiwgLTIpO1xuICAgICAgICBhbGlnbk5hdkl0ZW0od29ya05hdiwgLTEpO1xuICAgICAgICBhbGlnbk5hdkl0ZW0oaW5zcGlyYXRpb25OYXYsIDApO1xuICAgICAgICBhbGlnbk5hdkl0ZW0oZXZvbHV0aW9uTmF2LCAxKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGNvbm5lY3ROYXYsIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bmN0aW9uIGdvQXdheShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoLTEwMDApO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5yaWdodCA9IHB4KC0xMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBnb0F3YXkobG9nbyk7IC8vIHRlbXBvcmFyeVxuICAgICAgICBnb0F3YXkodmlld05hdik7XG4gICAgICAgIGdvQXdheSh3b3JrTmF2KTtcbiAgICAgICAgZ29Bd2F5KGluc3BpcmF0aW9uTmF2KTtcbiAgICAgICAgZ29Bd2F5KGV2b2x1dGlvbk5hdik7XG4gICAgICAgIGdvQXdheShjb25uZWN0TmF2KTtcbiAgICB9XG59LCBbYm9keVNpZ10pO1xuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XG4gICAgICAgIGNvbnN0IHggPSAyODA7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoIC0geCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS50b3AgPSBweCgoaW5uZXJIZWlnaHQgLSBzY3JvbGxIZWlnaHQpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSBnZXRTY3JvbGxXaWR0aCgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChzY3JvbGxXaWR0aCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweChpbm5lckhlaWdodCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoKGlubmVyV2lkdGggLSBzY3JvbGxXaWR0aCkgLyAyKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KDApO1xuICAgIH1cbn0sIFtib2R5U2lnXSk7XG5cbi8vIHJlcGxhY2Ugbm9ybWFsIHNjcm9sbCBiZWhhdmlvciB3aXRoIHh5IGJlaGF2aW9yXG4vLyBzY3JvbGxDb250YWluZXIub253aGVlbCA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyBzY3JvbGxDb250YWluZXIub250b3VjaG1vdmUgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4vLyBvbnRvdWNobW92ZSA9IChlKSA9PiB7fTtcbi8vIG9ud2hlZWwgPSAoZSkgPT4ge1xuLy8gICAgIGNvbnN0IGRlbHRhWFkgPSBlLmRlbHRhWCArIGUuZGVsdGFZO1xuLy8gICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxCeSh7IGxlZnQ6IGRlbHRhWFksIHRvcDogZGVsdGFYWSB9KTtcbi8vIH07XG5cbmNsaWNrQW55TmF2KGxvZ28sIGNsaWNrTmF2Vmlldyk7XG5cbmNsaWNrQW55TmF2KHZpZXdOYXYsIGNsaWNrTmF2Vmlldyk7XG5jbGlja0FueU5hdih3b3JrTmF2LCBjbGlja05hdldvcmspO1xuY2xpY2tBbnlOYXYoaW5zcGlyYXRpb25OYXYsIGNsaWNrTmF2SW5zcGlyYXRpb24pO1xuY2xpY2tBbnlOYXYoZXZvbHV0aW9uTmF2LCBjbGlja05hdkV2b2x1dGlvbik7XG5jbGlja0FueU5hdihjb25uZWN0TmF2LCBjbGlja05hdkNvbm5lY3QpO1xuXG5zZXRUaW1lb3V0KCgpID0+IHZpZXdOYXYuY2xpY2soKSk7XG4iLCJleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgIHN1YnNjcmliZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICAgIHN1YnNjcmliZShzdWJzY3JpYmVyOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmliZXJzLmZpbHRlcigocykgPT4gcyAhPT0gc3Vic2NyaWJlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3QoZnVuYzogKCkgPT4gdm9pZCwgb2JzZXJ2ZWRTaWduYWxzOiBTaWduYWxbXSkge1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG8pID0+IG8uc3Vic2NyaWJlKGZ1bmMpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kPFQ+KGZ1bmM6ICgpID0+IFQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pOiBbVCwgU2lnbmFsXSB7XHJcbiAgICBjb25zdCBzaWduYWwgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBjb25zdCBvYmogPSBmdW5jKCk7XHJcbiAgICBvYnNlcnZlZFNpZ25hbHMuZm9yRWFjaCgob2JzZXJ2ZWRTaWduYWwpID0+XHJcbiAgICAgICAgb2JzZXJ2ZWRTaWduYWwuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvYmogYXMgb2JqZWN0LCBmdW5jKCkpO1xyXG4gICAgICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgICByZXR1cm4gW29iaiwgc2lnbmFsXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRTaWduYWwoZWxlbWVudDogRWxlbWVudCkge1xyXG4gICAgY29uc3QgZWxlbWVudE9icyA9IG5ldyBTaWduYWwoKTtcclxuICAgIG5ldyBSZXNpemVPYnNlcnZlcigoXykgPT4ge1xyXG4gICAgICAgIGVsZW1lbnRPYnMudXBkYXRlKCk7XHJcbiAgICB9KS5vYnNlcnZlKGVsZW1lbnQpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnRPYnM7XHJcbn1cclxuIiwiaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaW5nIHtcclxuICAgIHBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICB0YXJnZXQ6IG51bWJlcjtcclxuICAgIHZlbG9jaXR5ID0gMDtcclxuICAgIGRhbXBpbmcgPSAwO1xyXG4gICAgc3RpZmZuZXNzID0gMDtcclxuICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgLy8gbXgnJyAtIGJ4JyA9IGt4XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2soZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFjY2VsZXJhdGlvbiA9IHRoaXMuc3RpZmZuZXNzICogKHRoaXMudGFyZ2V0IC0gdGhpcy5wb3NpdGlvbikgLSB0aGlzLmRhbXBpbmcgKiB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgKz0gYWNjZWxlcmF0aW9uICogZHQ7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiArPSB0aGlzLnZlbG9jaXR5ICogZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RpZmZuZXNzQ3JpdGljYWwoc3RpZmZuZXNzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0aWZmbmVzcyA9IHN0aWZmbmVzcztcclxuICAgICAgICB0aGlzLmRhbXBpbmcgPSBNYXRoLnNxcnQoNCAqIHN0aWZmbmVzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSA9IDAuMDE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVNwcmluZyhzcHJpbmc6IFNwcmluZywgc2lnbmFsOiBTaWduYWwpIHtcclxuICAgIGlmIChzcHJpbmcuaXNBbmltYXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRpY2tTcHJpbmcoKSB7XHJcbiAgICAgICAgc3ByaW5nLnRpY2soMSAvIDYwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGlja1NwcmluZygpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9sYXlvdXRcIjtcclxuXHJcbmltcG9ydCBcIi4vcGFnZXMvdmlld1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL3dvcmtcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcclxuXHJcbmltcG9ydCBcIi4vc2hhcmVkXCI7XHJcblxyXG4vLyBjb25zdCB3aGF0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gY29uc3Qgd2hhdDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbi8vICAgICB3aGF0LnN0eWxlLndpZHRoID0gc2VsZi5pbm5lcldpZHRoIC8gMiArIFwicHhcIjtcclxuLy8gICAgIHdoYXQuc3R5bGUuaGVpZ2h0ID0gc2VsZi5pbm5lckhlaWdodCAvIDIgKyBcInB4XCI7XHJcbi8vICAgICB3aGF0LnN0eWxlLmxlZnQgPSAwICsgXCJweFwiO1xyXG5cclxuLy8gICAgIHdoYXQyLnN0eWxlLndpZHRoID0gc2VsZi5pbm5lcldpZHRoIC8gMiArIFwicHhcIjtcclxuLy8gICAgIHdoYXQyLnN0eWxlLmhlaWdodCA9IHNlbGYuaW5uZXJIZWlnaHQgLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdDIuc3R5bGUubGVmdCA9IHNlbGYuaW5uZXJXaWR0aCAvIDIgKyBcInB4XCI7XHJcbi8vIH0sIDEpO1xyXG4vLyB3aGF0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4vLyB3aGF0Mi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuLy8gd2hhdC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZWRcIjtcclxuLy8gd2hhdDIuc3R5bGUuYmFja2dyb3VuZCA9IFwiZ3JlZW5cIjtcclxuLy8gd2hhdC5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuLy8gd2hhdDIuc3R5bGUuekluZGV4ID0gXCIxXCI7XHJcblxyXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdoYXQpO1xyXG4vLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdoYXQyKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9