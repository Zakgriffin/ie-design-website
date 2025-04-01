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
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./spring */ "./src/spring.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









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
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
function pluh() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("logo-full.svg"); // Assuming 'my-icon.svg' is in your public folder
        const svgContent = yield response.text();
        const svg = new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement;
        svg.style.position = "absolute";
        svg.style.opacity = "0";
        _constants__WEBPACK_IMPORTED_MODULE_7__.body.appendChild(svg);
        svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(innerHeight * 0.4);
        yield sleep(1000);
        const svgSpring = new _spring__WEBPACK_IMPORTED_MODULE_8__.Spring(0);
        svgSpring.setStiffnessCritical(50);
        const svgSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
        const blue = svg.getElementById("blue-square");
        (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
            svg.style.opacity = "" + svgSpring.position;
            svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((1.3 - svgSpring.position) * innerHeight);
            svg.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((innerHeight - svg.scrollHeight) / 2);
            svg.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)((innerWidth - svg.scrollWidth) / 2);
        }, [svgSpringSig]);
        svgSpring.target = 1;
        (0,_spring__WEBPACK_IMPORTED_MODULE_8__.animateSpring)(svgSpring, svgSpringSig);
        yield sleep(1000);
        const d = "design";
        function opacityOut(element) {
            const letterSpring = new _spring__WEBPACK_IMPORTED_MODULE_8__.Spring(1);
            letterSpring.setStiffnessCritical(150);
            const letterSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
            (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(() => {
                element.style.opacity = "" + letterSpring.position;
            }, [letterSpringSig]);
            letterSpring.target = 0;
            (0,_spring__WEBPACK_IMPORTED_MODULE_8__.animateSpring)(letterSpring, letterSpringSig);
        }
        for (let i = 0; i < d.length; i++) {
            const designLetter = svg.getElementById("design-" + d[i]);
            opacityOut(designLetter);
            yield sleep(200);
        }
        const l = ["big-i", "dot-1", "big-e", "dot-2"];
        for (let i = 0; i < l.length; i++) {
            const designLetter = svg.getElementById(l[i]);
            opacityOut(designLetter);
            yield sleep(200);
        }
        yield sleep(1000);
        svgSpring.target = 0;
        (0,_spring__WEBPACK_IMPORTED_MODULE_8__.animateSpring)(svgSpring, svgSpringSig);
        yield sleep(1000);
        _constants__WEBPACK_IMPORTED_MODULE_7__.body.removeChild(svg);
        viewNav.click();
    });
}
pluh();


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
    let lastMillis = 0;
    requestAnimationFrame(firstFrame);
    function firstFrame(millis) {
        lastMillis = millis;
        tickSpring(millis);
    }
    function tickSpring(millis) {
        const step = millis - lastMillis;
        lastMillis = millis;
        spring.tick(step / 1000);
        signal.update();
        if (Math.abs(spring.target - spring.position) < DEFAULT_ANIMATION_TOLERANCE && Math.abs(spring.velocity) < DEFAULT_ANIMATION_TOLERANCE) {
            spring.position = spring.target;
            spring.velocity = 0;
            spring.isAnimating = false;
            return;
        }
        requestAnimationFrame(tickSpring);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ087QUFDRjtBQUNGO0FBRVA7QUFFbEIsOENBQThDO0FBQzlDLCtDQUErQztBQUMvQyxzQkFBc0I7QUFDdEIscURBQXFEO0FBQ3JELHVEQUF1RDtBQUN2RCxrQ0FBa0M7QUFFbEMsc0RBQXNEO0FBQ3RELHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQsU0FBUztBQUNULG9DQUFvQztBQUNwQyxxQ0FBcUM7QUFDckMsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0IsNEJBQTRCO0FBRTVCLG1DQUFtQztBQUNuQyxvQ0FBb0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvbGF5b3V0LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvZXZvbHV0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2luc3BpcmF0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvd29yay50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaGFyZWQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2lnbmFsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NwcmluZy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVsZW1lbnRTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuZXhwb3J0IGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuZXhwb3J0IGNvbnN0IGJvZHlTaWcgPSBlbGVtZW50U2lnbmFsKGJvZHkpO1xuXG5leHBvcnQgY29uc3QgaWVCbHVlID0gXCIjNjA5Q0NFXCI7XG5leHBvcnQgY29uc3QgaWVHcmVlbiA9IFwiI2JmZTAyMVwiO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gPSAwLjk1O1xuIiwiaW1wb3J0IHsgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgb25OYXZPcHRpb25DbGljaywgc2Nyb2xsQ29udGFpbmVyLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuaW50ZXJmYWNlIEVsZW1lbnRBbGlnbm1lbnQge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5sZXQgaW1hZ2VMb2FkaW5nUHJvbWlzZXM6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xubGV0IHF1ZXVlZEJlZm9yZUxheW91dHM6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBweChwaXhlbHM6IG51bWJlcikge1xuICAgIHJldHVybiBwaXhlbHMgKyBcInB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBSYW5nZShuOiBudW1iZXIsIHN0YXJ0MTogbnVtYmVyLCBzdG9wMTogbnVtYmVyLCBzdGFydDI6IG51bWJlciwgc3RvcDI6IG51bWJlcikge1xuICAgIHJldHVybiAoKG4gLSBzdGFydDEpIC8gKHN0b3AxIC0gc3RhcnQxKSkgKiAoc3RvcDIgLSBzdGFydDIpICsgc3RhcnQyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVcGRhdGVMYXlvdXQodXBkYXRlTGF5b3V0OiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChpbWFnZUxvYWRpbmdQcm9taXNlcyk7XG4gICAgICAgIGZvciAoY29uc3QgcXVldWVkQmVmb3JlTGF5b3V0IG9mIHF1ZXVlZEJlZm9yZUxheW91dHMpIHF1ZXVlZEJlZm9yZUxheW91dCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBxdWV1ZWRCZWZvcmVMYXlvdXRzID0gW107XG4gICAgICAgIHVwZGF0ZUxheW91dCgpO1xuICAgIH07XG4gICAgZWZmZWN0KHVwZGF0ZUxheW91dEltYWdlV2FpdGluZywgW2JvZHlTaWddKTtcbiAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gYm9keVNpZy51bnN1YnNjcmliZSh1cGRhdGVMYXlvdXRJbWFnZVdhaXRpbmcpKTtcblxuICAgIHVwZGF0ZUxheW91dEltYWdlV2FpdGluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVldWVCZWZvcmVMYXlvdXQoZXZlbnQ6ICgpID0+IHZvaWQpIHtcbiAgICBxdWV1ZWRCZWZvcmVMYXlvdXRzLnB1c2goZXZlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5SW1hZ2VMb2FkaW5nKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgaW1hZ2VMb2FkaW5nUHJvbWlzZXMucHVzaChpbWFnZS5kZWNvZGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgY29uc3QgU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OID0gMC43O1xuICAgIHJldHVybiBpbm5lckhlaWdodCAqIFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTjsgLy8gVE9ETyB0aGlzIHNob3VsZCBqdXN0IHVzZSBhY3R1YWwgc2Nyb2xsIGhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGgoKSB7XG4gICAgY29uc3QgU0NST0xMX1dJRFRIX1BST1BPUlRJT04gPSAxO1xuICAgIHJldHVybiBpbm5lcldpZHRoICogU0NST0xMX1dJRFRIX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduV2l0aEdhcChsZWZ0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQsIGdhcDogbnVtYmVyKSB7XG4gICAgcmlnaHRFbGVtZW50LnN0eWxlLmxlZnQgPSBweChsZWZ0RWxlbWVudC5vZmZzZXRMZWZ0ICsgbGVmdEVsZW1lbnQuY2xpZW50V2lkdGggKyBnYXApO1xufVxuXG5mdW5jdGlvbiBheGlzQWxpZ25pbmdXaXRoR2FwcyhheGlzU2l6ZTogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGVsZW1lbnRPckdhcHM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSk6IFtFbGVtZW50QWxpZ25tZW50W10sIG51bWJlcl0gPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50QWxpZ25tZW50cyA9IFtdO1xuICAgICAgICBsZXQgcnVubmluZ1RvdGFsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50T3JHYXAgb2YgZWxlbWVudE9yR2Fwcykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRPckdhcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEFsaWdubWVudHMucHVzaCh7IGVsZW1lbnQ6IGVsZW1lbnRPckdhcCwgb2Zmc2V0OiBydW5uaW5nVG90YWwgfSk7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGF4aXNTaXplKGVsZW1lbnRPckdhcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBlbGVtZW50T3JHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtlbGVtZW50QWxpZ25tZW50cywgcnVubmluZ1RvdGFsXTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgeUFsaWduaW5nV2l0aEdhcHMgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuZXhwb3J0IGNvbnN0IHhBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50V2lkdGgpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IHlBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlclNjYWxlZFkoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBzY3JvbGxDb250YWluZXIuY2xpZW50SGVpZ2h0ICogc2NhbGU7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KChoZWlnaHQgKiBlbGVtZW50Lm5hdHVyYWxXaWR0aCkgLyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoKHNjcm9sbENvbnRhaW5lci5jbGllbnRIZWlnaHQgLSBoZWlnaHQpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJTY2FsZWRYKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3Qgd2lkdGggPSBzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGggKiBzY2FsZTtcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweCgod2lkdGggKiBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpIC8gZWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KChzY3JvbGxDb250YWluZXIuY2xpZW50V2lkdGggLSB3aWR0aCkgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xuICAgIHJldHVybiBpbm5lcldpZHRoIC8gaW5uZXJIZWlnaHQgPiAxO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2Q29ubmVjdCgpIHt9XG4iLCJpbXBvcnQgeyBpZUdyZWVuIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHhBbGlnbmluZ1dpdGhHYXBzLCB5QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0LCBzdHlsZVNjcm9sbFRleHQgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmludGVyZmFjZSBRdW90ZURpc3BsYXkge1xuICAgIHF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBhdXRob3I6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIHRpdGxlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBvcGVuUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGNsb3NlUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRRdW90ZShxdW90ZVRleHQ6IHN0cmluZywgYXV0aG9yVGV4dDogc3RyaW5nLCB0aXRsZVRleHQ6IHN0cmluZyk6IFF1b3RlRGlzcGxheSB7XG4gICAgY29uc3QgcXVvdGUgPSBhZGRTY3JvbGxUZXh0KHF1b3RlVGV4dCk7XG4gICAgY29uc3QgYXV0aG9yID0gYWRkU2Nyb2xsVGV4dChhdXRob3JUZXh0KTtcbiAgICBjb25zdCB0aXRsZSA9IGFkZFNjcm9sbFRleHQodGl0bGVUZXh0KTtcbiAgICBjb25zdCBvcGVuUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCcXCIpO1xuICAgIGNvbnN0IGNsb3NlUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCdXCIpO1xuXG4gICAgcmV0dXJuIHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVF1b3RlKHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9OiBRdW90ZURpc3BsYXkpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3Qgd2lkdGhTY2FsZSA9IDAuNzU7XG4gICAgc3R5bGVTY3JvbGxUZXh0KHF1b3RlLCB7IGxldHRlclNwYWNpbmc6IDAuMTgsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMzIgKiBzLCB3aWR0aDogd2lkdGhTY2FsZSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDY1ICogcyB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChhdXRob3IsIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDM1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICBhdXRob3Iuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KHRpdGxlLCB7IGxldHRlclNwYWNpbmc6IDAuMTUsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjUgKiBzLCB3aWR0aDogd2lkdGhTY2FsZSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDYgKiBzIH0pO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIGNvbnN0IHF1b3RlVGV4dERldGFpbHMgPSB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogaWVHcmVlbiwgZm9udFNpemU6IDAuMTUgKiBzLCB3aWR0aDogMC4wNSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDYgKiBzIH07XG4gICAgc3R5bGVTY3JvbGxUZXh0KG9wZW5RdW90ZSwgcXVvdGVUZXh0RGV0YWlscyk7XG4gICAgc3R5bGVTY3JvbGxUZXh0KGNsb3NlUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xufVxuXG5mdW5jdGlvbiBsYXlvdXRRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGVEaXNwbGF5LCBudWRnZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgYXV0aG9yLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0KTtcbiAgICB0aXRsZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xuICAgICAgICBxdW90ZSwgLy9cbiAgICAgICAgMC4wNCAqIHMsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgLTAuMDE1ICogcyxcbiAgICAgICAgdGl0bGUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyAwLjM1ICogcyk7XG4gICAgfVxuXG4gICAgb3BlblF1b3RlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0IC0gMC4wNyAqIHMpO1xuICAgIG9wZW5RdW90ZS5zdHlsZS50b3AgPSBweChxdW90ZS5vZmZzZXRUb3AgKyAwLjA1ICogcyk7XG4gICAgY2xvc2VRdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCArIHF1b3RlLm9mZnNldFdpZHRoIC0gbnVkZ2UpO1xuICAgIGNsb3NlUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgcXVvdGUub2Zmc2V0SGVpZ2h0IC0gMC4wMSAqIHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZFdm9sdXRpb24oKSB7XG4gICAgY29uc3QgZXZvbHV0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLnN2Z1wiKTtcbiAgICBjb25zdCBldm9sdXRpb25IaXN0b3J5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLWhpc3Rvcnkuc3ZnXCIpO1xuICAgIC8vIGNvbnN0IGxvZ29GdWxsID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vbG9nby1mdWxsLnN2Z1wiKTtcblxuICAgIGNvbnN0IHByb21vczogSFRNTEltYWdlRWxlbWVudFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSBwcm9tb3MucHVzaChhZGRTY3JvbGxJbWFnZShgZXZvbHV0aW9uL3Byb21vLSR7aX0uanBnYCkpO1xuXG4gICAgY29uc3QgcXVvdGVzID0gW1xuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiT3VyIGFubnVhbCBwcm9tbyBpcyBhbHdheXMgZ3JvdW5kZWQgaW4gb3VyIGlkZW50aXR5IGJ1dCBpdCdzIGZ1biB0byBwdXNoIGxpbWl0cyBhbmQgcmVpbnZlbnQgb3Vyc2VsdmVzIGVhY2ggeWVhci4gVGhlIGJlc3QgcGFydCBpcyA8c3Ryb25nPmhlYXJpbmcgd2hhdCBvdXIgY2xpZW50cyBoYXZlIHRvIHNheS48L3N0cm9uZz5cIixcbiAgICAgICAgICAgIFwiQkVUSExZTiBLUkFLQVVFUlwiLFxuICAgICAgICAgICAgXCJGb3VuZGVyLCBpLmUuIGRlc2lnbiwgaW5jLlwiXG4gICAgICAgICksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBsb3ZlIGhvdyB5b3UgZG8gc3R1ZmYuIEknbSBmaW5kaW5nIHRoYXQgdGhlc2UgdHlwZXMgb2YgbWVzc2FnZXMgYXJlIHJlYWxseSA8c3Ryb25nPnRyYW5zZm9ybWluZyByZWxhdGlvbnNoaXBzPC9zdHJvbmc+IHdpdGggcGVvcGxlLiBUaGV5IGFyZSBqdXN0IGRyZWFteS5cIiwgXCJERUJSQSBTQ0hBVFpLSVwiLCBcIkZvdW5kZXIsIEJQUCBXZWFsdGggU29sdXRpb25zIExMQ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJJIHNlZSBhIGxvdCBvZiB0aGlzIHNwZWNpYWwgcXVhbGl0eSBpbiB5b3VyIHdvcmsuIEl0J3Mgbm90IGp1c3QgYWJvdXQgYmVpbmcgaW50ZW50aW9uYWwuIFlvdSBhbHdheXMgYnJpbmcgaW4gYW4gZWxlbWVudCBvZiA8c3Ryb25nPnN1cnByaXNlIGFuZCBkZWxpZ2h0Ljwvc3Ryb25nPlwiLCBcIkpPU0ggS1JBS0FVRVJcIiwgXCJGb3VuZGVyLCBTY3VscHRcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91ciBhcHByb2FjaCB3b3JrcyBzbyB3ZWxsIGJlY2F1c2UgaXQgaXMgcmVhbGx5IDxzdHJvbmc+cGVyc29uYWw8L3N0cm9uZz4gYW5kIGVxdWFsbHkgPHN0cm9uZz5wcm9mZXNzaW9uYWwuPC9zdHJvbmc+XCIsIFwiQU5OIFNVTExJVkFOXCIsIFwiRm91bmRlciwgQW5uIFN1bGxpdmFuIE9yZ2FuaXppbmdcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91IHRydWx5IHVuZGVyc3RhbmQgdGhlIHVuaXF1ZSBwb3NpdGlvbmluZyBvZiBhIHByb3NwZWN0aXZlIGNsaWVudCBhbmQgYXJlIGFibGUgdG8gPHN0cm9uZz50ZWxsIHRoZWlyIHN0b3J5PC9zdHJvbmc+IGV4YWN0bHkgYXMgaXQgc2hvdWxkIGJlIHRvbGQuXCIsIFwiREFWSUQgWVVOXCIsIFwiUHJpbmNpcGFsLCBWYXJpZGVudCBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFxuICAgICAgICAgICAgXCJCZXRoIGlzIHF1aXRlIGZyYW5rbHkgb25lIG9mIHRoZSA8c3Ryb25nPm1vc3QgdGFsZW50ZWQgZGVzaWduZXJzPC9zdHJvbmc+IHRoYXQgSSBoYXZlIGV2ZXIgaGFkIHRoZSBwcml2aWxlZ2UgdG8gd29yayB3aXRoLiBTaGUgYWx3YXlzIGhhcyBhIHNwZWNpYWwgd2F5IG9mIG1ha2luZyBldmVyeXRoaW5nIHNoZSB0b3VjaGVzIHR1cm4gdG8gZ29sZCFcIixcbiAgICAgICAgICAgIFwiREFWSUQgUlVTSFwiLFxuICAgICAgICAgICAgXCJQcmVzaWRlbnQsIEVOVlwiXG4gICAgICAgICksXG4gICAgXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY2VudGVyU2NhbGVkWShldm9sdXRpb24sIDAuNzUpO1xuICAgICAgICBjZW50ZXJTY2FsZWRZKGV2b2x1dGlvbkhpc3RvcnksIDAuMyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9tbyBvZiBwcm9tb3MpIGNlbnRlclNjYWxlZFkocHJvbW8sIDEpO1xuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3Rlcykgc3R5bGVRdW90ZShxdW90ZSk7XG5cbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW2V2b2x1dGlvbiwgMC4yICogcywgZXZvbHV0aW9uSGlzdG9yeV07XG5cbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgocXVvdGVzLmxlbmd0aCwgcHJvbW9zLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIDwgcXVvdGVzLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBxdW90ZXNbaV0ucXVvdGUpO1xuICAgICAgICAgICAgaWYgKGkgPCBwcm9tb3MubGVuZ3RoKSBpdGVtcy5wdXNoKDAuMyAqIHMsIHByb21vc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgcXVvdGUgb2YgcXVvdGVzKSBsYXlvdXRRdW90ZShxdW90ZSwgMC4wNSAqIHMpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaWVCbHVlIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25XaXRoR2FwLCBjZW50ZXJTY2FsZWRZLCBnZXRTY3JvbGxIZWlnaHQsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgc3R5bGVTY3JvbGxUZXh0IH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5jb25zdCBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gPSAwLjg1O1xuXG5pbnRlcmZhY2UgSW5zcGlyYXRpb25UaWxlIHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3I6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRNb3JlOiBIVE1MRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gc3R5bGVJbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNixcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplOiAwLjAzNiAqIHMsXG4gICAgICAgIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLFxuICAgICAgICBsaW5lSGVpZ2h0OiAwLjA5ICogcyxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjMsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDM1MCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZTogMC4wMjcgKiBzLFxuICAgICAgICB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcyxcbiAgICAgICAgbGluZUhlaWdodDogMC4wNSAqIHMsXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQocmVhZE1vcmUsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC41LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBpZUJsdWUsXG4gICAgICAgIGZvbnRTaXplOiAwLjAzICogcyxcbiAgICAgICAgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsXG4gICAgICAgIGxpbmVIZWlnaHQ6IDAuMDUgKiBzLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICogMC41NSk7XG59XG5cbmZ1bmN0aW9uIGFsaWduSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgbWFqb3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgbWlub3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgcmVhZE1vcmUuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xuICAgICAgICBpbWFnZSwgLy9cbiAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgIG1ham9yLFxuICAgICAgICAtMC4wMSAqIHMsXG4gICAgICAgIG1pbm9yLFxuICAgICAgICAwLjAxICogcyxcbiAgICAgICAgcmVhZE1vcmUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBzICogMC4xNSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRJbnNwaXJhdGlvblRpbGUoaW1hZ2VTdHJpbmc6IHN0cmluZywgbWFqb3JUZXh0OiBzdHJpbmcsIG1pbm9yVGV4dDogc3RyaW5nKTogSW5zcGlyYXRpb25UaWxlIHtcbiAgICBjb25zdCBpbWFnZSA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3RyaW5nKTtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vciA9IGFkZFNjcm9sbFRleHQobWlub3JUZXh0KTtcbiAgICBjb25zdCByZWFkTW9yZSA9IGFkZFNjcm9sbFRleHQoXCJSZWFkIG1vcmVcIik7XG5cbiAgICByZXR1cm4geyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZJbnNwaXJhdGlvbigpIHtcbiAgICBjb25zdCBpbnNwaXJhdGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiaW5zcGlyYXRpb24vaW5zcGlyYXRpb24uc3ZnXCIpO1xuXG4gICAgY29uc3QgdGlsZXMgPSBbXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3l1bWllLmpwZ1wiLCBcIlRIRSBTVEFSVCBPRiBTT01FVEhJTkcgWVVNLUlFXCIsIFwiV2UgYWx3YXlzIHdhbnRlZCB0byBkZXNpZ24gY2hvY29sYXRlIGJhcnMgYW5kIGZpbmFsbHkgZGlkIGl0LiBJbnRyb2R1Y2luZyBvdXIgc3dlZXQgbmV3IGJyYW5kLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vd29yZHMtaWRlYXMuanBnXCIsIFwiU0hBUkUgU09NRSBERVNJR04gTE9WRVwiLCBcIlRoZSBpLmUuIGRlc2lnbiBwcm9tbyBqb3VybmFscyBlbmNvdXJhZ2UgY2xpZW50cyB0byBza2V0Y2ggdGhlaXIgYmlnIGlkZWFzIGFuZCBjYXB0dXJlIHRoZWlyIGRyZWFtcy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Nvb2staWUuanBnXCIsIFwiR09UVEEgTE9WRSBBIENPT0stSUVcIiwgXCJIb3cgYSBzZWNyZXQgcmVjaXBlIHdvcmtzIHRvIGJyaW5nIHJlbGF0aW9uc2hpcHMgdG8gYSB3aG9sZSBuZXcgbGV2ZWwuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZW1peC5qcGdcIiwgXCJSRU1JWFwiLCBcIkEgYmVoaW5kLXRoZS1zY2VuZXMgbG9vayBhdCBob3cgd2UgdHJhbnNmb3JtZWQgY2xhc3NpYyBtZW1vcnkgY2FycmllcnMgaW50byBvYmplY3RzIG9mIGFydC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2tyZW1wYS5wbmdcIiwgXCJSRUJSQU5ESU5HIEEgRkFNSUxZIEJVU0lORVNTXCIsIFwiQSByZWZyZXNoIGZvciBhIDUwLXllYXIgbGVnYWN5LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZm90b3N0b3JpLmpwZ1wiLCBcIkJSQU5ESU5HIEZST00gVEhFIE5BTUUgVVBcIiwgXCJXaGVuIGEgY2xpZW50IGhhZCBhbiBpZGVhIGZvciBhIGJyYW5kIHNwaW5vZmYsIHdlIHRvb2sgaGVyIGNvbmNlcHQgdG8gcmVhbGl0eSBhbmQgbGF1bmNoZWQgdGhlIGJ1c2luZXNzIGluIGhpZ2ggc3R5bGUuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9pbnNwaXJlZC0yLWNyZWF0ZS5qcGdcIiwgXCJJTlNQSVJFRCAyIENSRUFURVwiLCBcIkEgcGFpbnRpbmcgaW5zcGlyZWQgYnkgdGhlIGkuZS4gZGVzaWduIGxvZ28gY29tYmluZXMgb2lsIHBhaW50cywgZ3JvdW5kIHVwIGNyYXlvbnMsIGFuZCBhIGxlZ28uXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mcm9tLWluc2lkZS5qcGdcIiwgXCJUSEUgVklFVyBGUk9NIElOU0lERVwiLCBcImkuZS4gZGVzaWduJ3MgbmV3IHN0dWRpbyB3YXMgMzAgeWVhcnMgaW4gdGhlIG1ha2luZy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlY29ubmVjdGluZy5qcGdcIiwgXCJSRUNPTk5FQ1RJTkdcIiwgXCJIb3cgdW5jZXJ0YWluIHRpbWVzIGxlZCB0byBhIGhvbWVjb21pbmcgZm9yIGkuZS4gZGVzaWduJ3Mgc2VuaW9yIGRlc2lnbmVyLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vbmV3LXN0dWRpby5qcGdcIiwgXCJORVcgU1RVRElPLiBORVcgVklFVy5cIiwgXCJIb3cgdGhlIG5lZWQgZm9yIGluc3BpcmF0aW9uIGZ1ZWxlZCB0aGUgYnVpbGRpbmcgb2YgYSBzdHVkaW8uXCIpLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjZW50ZXJTY2FsZWRZKGluc3BpcmF0aW9uLCAwLjc1KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHN0eWxlSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGFsaWduV2l0aEdhcChpbnNwaXJhdGlvbiwgdGlsZXNbMF0uaW1hZ2UsIHMgKiAwLjI1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggLSAxOyBpKyspIGFsaWduV2l0aEdhcCh0aWxlc1tpXS5pbWFnZSwgdGlsZXNbaSArIDFdLmltYWdlLCBzICogMC4xKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIGFsaWduSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgY2VudGVyU2NhbGVkWCwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRTY3JvbGxXaWR0aCwgaXNMYW5kc2NhcGUsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeEFsaWduaW5nV2l0aEdhcHMsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xyXG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2VmlldygpIHtcclxuICAgIGNvbnN0IGhvbWUgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9tZS5zdmdcIik7XHJcbiAgICBjb25zdCBob3Jpem9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvcml6b24uanBnXCIpO1xyXG4gICAgY29uc3QgZnJlc2hMb29rID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2ZyZXNoLWxvb2suc3ZnXCIpO1xyXG4gICAgY29uc3QgZ3JlYXRCcmFuZHMgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZ3JlYXQtYnJhbmRzLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMSA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJHUkVBVCBCUkFORFMgRE9OJ1QgSlVTVCBIQVBQRU5cIixcclxuICAgICAgICBcIlRoZXkgcmVxdWlyZSBleHBsb3JhdGlvbiwgaW5zaWdodCwgYW5kIHRlbmFjaXR5LiBXZSBodW50IGZvciB0aGF0IG1hZ2ljIHNwYXJrIHRoYXQgaWduaXRlcyBpbm5vdmF0aW9uLiBXZSBicmluZyBvdXIgZXh0ZW5zaXZlIHNraWxscyBhbmQgZXhwZXJpZW5jZSB0byBlYWNoIHByb2plY3QgYW5kIGdpdmUgaXQgb3VyIGFsbC4gVGhlIHJlc3VsdCBpcyBjbGVhciwgeWV0IGVsZXZhdGVkIGNvbW11bmljYXRpb24gdGhhdCBtYWtlcyBwZW9wbGUgc3RvcCwgdGhpbmssIGFuZCBvZnRlbiBzbWlsZS5cIixcclxuICAgICAgICBcIk91ciBzdHVkaW8gbG9jYXRpb24gaXMgcHJvZm91bmRseSBpbnNwaXJpbmcuIFRoZSBtYWduaWZpY2VudCB2aWV3IGZlZWRzIG91ciBzb3VscyBhbmQga2VlcHMgdXMgaW5zcGlyZWQgdG8gZG8gb3VyIGJlc3Qgd29yay4gSXQncyBhIHBsYWNlIHdoZXJlIGNyZWF0aXZlIHBlb3BsZSBjb21lIHRvZ2V0aGVyIHRvIGNvbGxhYm9yYXRlIGFuZCBkcmlsbCBkb3duIHRvIHRoZSBoZWFydCBvZiB0aGUgbWF0dGVyLiBUbyBzb2x2ZSBwcm9ibGVtcyBhbmQgYnJpbmcgaWRlYXMgdG8gbGlmZS4gVG8gY3JlYXRlIHRoaW5ncyB3b3J0aCByZW1lbWJlcmluZy5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGluc2lnaHRDbGFyaXR5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2luc2lnaHQtY2xhcml0eS5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTIgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgQlJJTkcgVklTSU9OLCBJTlNJR0hULCBBTkQgQ0xBUklUWSBUTyBFVkVSWSBQUk9KRUNUXCIsXHJcbiAgICAgICAgXCJTdWNjZXNzZnVsIGRlc2lnbiBzdGFydHMgd2l0aCBpZGVudGlmeWluZyBhIGNsaWVudCdzIG5lZWRzLCBnb2FscywgYW5kIGFzcGlyYXRpb25zLiBPdXIgb2JqZWN0aXZpdHkgc2hpbmVzIGxpZ2h0IG9uIHdoYXQgb3RoZXJzIGhhdmUgbWlzc2VkLiBXZSBoYXZlIHRoZSBhYmlsaXR5IHRvIHNlZSBhbmQgaW50ZXJwcmV0IHRoZSBpbm5lciB3b3JraW5ncywgY3VsdHVyZSwgYW5kIG51YW5jZXMgb2Ygb3VyIGNsaWVudCdzIHdvcmxkLiBXZSBhc2sgcXVlc3Rpb25zIOKAkyBsb3RzIG9mIHF1ZXN0aW9ucy4gVGhlbiBsaXN0ZW4gdW50aWwgd2UgZ2FpbiB0aGUgZGVlcCB1bmRlcnN0YW5kaW5nIG5lY2Vzc2FyeSB0byBidWlsZCB0aGUgc29saWQgZm91bmRhdGlvbiB0aGF0IGFueSBlbmR1cmluZyBicmFuZCBuZWVkcy5cIixcclxuICAgICAgICBcIk91ciBzbWFsbCBidXQgbWlnaHR5IHRlYW0gYnJpbmdzIHRvZ2V0aGVyIGEgd2lkZSByYW5nZSBvZiB0YWxlbnRzIGFuZCBwZXJzcGVjdGl2ZXMsIHBsdXMgYSBuaWNlIGxpc3Qgb2YgYXdhcmRzLiBXZSB0aHJvdyBvdXIgaGVhcnRzIGludG8gb3VyIHdvcmsgYW5kIGFyZSBrbm93biBmb3Igb3VyIGZpZXJjZSBjb21taXRtZW50IHRvIHRoZSB0cnVzdGVkLCBsb25nLXRlcm0gcGFydG5lcnNoaXBzIHdlIGZvcm0uIEZvciB1cywgaXQncyBwZXJzb25hbC5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNreXdhcmQgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvc2t5d2FyZC5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTMgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgU0VFIFdPUksgSU4gQSBESUZGRVJFTlQgTElHSFRcIixcclxuICAgICAgICBcIlBlb3BsZSBsaWtlIHRvIGFzayBhYm91dCBvdXIgZGVzaWduIHByb2Nlc3MuIFRoZSB0cnV0aCBpcyB0aGF0IHRoZSBhcHByb2FjaCB0byBlYWNoIHByb2plY3QgdmFyaWVzLCBiZWNhdXNlIGVhY2ggY2xpZW50IGFuZCB0aGVpciBuZWVkcyBhcmUgdW5pcXVlLiBDcmVhdGl2ZSBicmVha3Rocm91Z2hzIGRvbid0IGZvbGxvdyB0aGUgY2xvY2suIFRoZXkgY2FuIGhhcHBlbiBhbnkgdGltZSBvZiBkYXkg4oCTIG9yIG5pZ2h0LiBXaGV0aGVyIGFuIGVwaXBoYW55IGlzIGlsbHVtaW5hdGVkIGluIGEgc2NyaWJibGUsIGEgZHJlYW0sIG9yIGFzIHRoZSBjbG91ZHMgcm9sbCBieSwgd2UgZW1icmFjZSB0aGUgZmFjdCB0aGF0IGVhY2ggcHJvamVjdCB0YWtlcyBvbiBhIGxpZmUgb2YgaXRzIG93bi5cIixcclxuICAgICAgICBcIldoYXQncyBjb25zdGFudCBpcyBvdXIgYWJpbGl0eSB0byBsaXN0ZW4gYW5kIGZvY3VzLCB0byBhbmFseXplIGFuZCBjb25uZWN0IGRvdHMsIGFuZCB0byByZW1haW4gY3VyaW91cy4gVGhlIG1vc3QgcmV3YXJkaW5nIHByb2plY3RzIGFyZSB3aXRoIGNsaWVudHMgd2hvIHZhbHVlIHRoZSBiYWxhbmNlIGJldHdlZW4gcHVzaGluZyBmb3J3YXJkIGFuZCBhbGxvd2luZyB0aW1lIGZvciB0aGUgcGVyZmVjdCBzb2x1dGlvbiB0byBlbWVyZ2UuIFRoYXQncyBvdXIgaGFwcHkgcGxhY2UuXCJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGV4dFRpbGVzID0gW3RleHRUaWxlMSwgdGV4dFRpbGUyLCB0ZXh0VGlsZTNdO1xyXG5cclxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGhvcml6b24sIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpXHJcbiAgICAgICAgICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAyLjIsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiI0IzQjNCM1wiLCBmb250U2l6ZTogMC4wNjUgKiBzLCB3aWR0aDogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA5ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKFtcclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICBIT01FX0hPUklaT05fUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgICAgICBGUkVTSF9MT09LX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgICAgICBGUkVTSF9MT09LX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBncmVhdEJyYW5kcyxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTEubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUyLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh0ZXh0VGlsZSwgMjAsIDIwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGhvcml6b24sIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGZyZXNoTG9vaywgMC44NSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxXaWR0aCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpXHJcbiAgICAgICAgICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiA0LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiNCM0IzQjNcIiwgZm9udFNpemU6IDAuMDYgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDggKiBzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjggKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBURVhUX1RJTEVfV0lEVEggPSAwLjg1O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyU2NhbGVkWCh0ZXh0VGlsZS5tYWpvciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSBjZW50ZXJTY2FsZWRYKG1pbm9yLCBURVhUX1RJTEVfV0lEVEgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBNT0JJTEVfUEFEID0gMC4wODtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vYmlsZVRpbGUodGV4dFRpbGU6IFRleHRTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBbdGV4dFRpbGUubWFqb3IsIDAuMCAqIHNdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtaW5vciBvZiB0ZXh0VGlsZS5taW5vcnMpIHgucHVzaCgwLjA0ICogcywgbWlub3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB5QWxpZ25pbmdXaXRoR2FwcyhbXHJcbiAgICAgICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBob3Jpem9uLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMSksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMiksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUzKSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgZWZmZWN0LCBTaWduYWwgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi4vc3ByaW5nXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgb25OYXZPcHRpb25DbGljaywgc2Nyb2xsQ29udGFpbmVyLCBzcGFjZVRvRmlsZSwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuaW1wb3J0IHsgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBjZW50ZXJTY2FsZWRZLCBnZXRTY3JvbGxIZWlnaHQsIG1hcFJhbmdlLCBub3RpZnlJbWFnZUxvYWRpbmcsIHB4LCBxdWV1ZUJlZm9yZUxheW91dCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHhBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYm9keSwgYm9keVNpZyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuaW50ZXJmYWNlIFdvcmtDb250ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgV29ya0Rpc3BsYXkge1xuICAgIHRleHRTcXVhcmU6IFRleHRTcXVhcmU7XG4gICAgaW1hZ2UxOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltYWdlMjogSFRNTEltYWdlRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFdvcmtJdGVtIHtcbiAgICB0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNwcmluZzogU3ByaW5nO1xuICAgIHNwcmluZ1NpZzogU2lnbmFsO1xufVxuXG5jb25zdCB3b3JrQ29udGVudHM6IFdvcmtDb250ZW50W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmZ1bmN0aW9uIHN0eWxlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxuICAgICAgICAgICAgdGV4dFNxdWFyZSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMi4yLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDY1ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA5ICogcyB9LFxuICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzMzMzMzM1wiLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxuICAgICAgICApO1xuICAgICAgICBjZW50ZXJTY2FsZWRZKGltYWdlMSwgMSk7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoaW1hZ2UyLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGZvciAoY29uc3Qgd29ya0NvbnRlbnQgb2Ygd29ya0NvbnRlbnRzKSB7XG4gICAgICAgIGNvbnN0IHRleHRTcXVhcmUgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKHdvcmtDb250ZW50Lm5hbWUudG9VcHBlckNhc2UoKSwgLi4ud29ya0NvbnRlbnQuZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICBjb25zdCBpbWFnZTIgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8yLmpwZ2ApO1xuXG4gICAgICAgIHdvcmtEaXNwbGF5cy5wdXNoKHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0ZXh0U3F1YXJlLm1ham9yLFxuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIGltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZXb3JrKCkge1xuICAgIGNvbnN0IHdvcmtJdGVtczogV29ya0l0ZW1bXSA9IFtdO1xuICAgIGNvbnN0IHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSA9IFtdO1xuXG4gICAgY29uc3QgQk9UVE9NID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+IChpbm5lckhlaWdodCAtIHRhYkVsZW1lbnQuY2xpZW50SGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgVE9QID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+IGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC5jbGllbnRXaWR0aCAvIDI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgbm90aWZ5SW1hZ2VMb2FkaW5nKHRhYkVsZW1lbnQpO1xuICAgICAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRhYkVsZW1lbnQpO1xuICAgICAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGJvZHkucmVtb3ZlQ2hpbGQodGFiRWxlbWVudCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxMDAwKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IC0wLjE7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAwO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGsgPSBtYXBSYW5nZShzcHJpbmcucG9zaXRpb24sIDAsIDEsIEJPVFRPTSh0YWJFbGVtZW50KSwgVE9QKHRhYkVsZW1lbnQpKTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgoayk7XG4gICAgICAgIH0sIFtzcHJpbmdTaWcsIGJvZHlTaWddKTtcbiAgICAgICAgc3ByaW5nU2lnLnVwZGF0ZSgpO1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0l0ZW0gb2Ygd29ya0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50LCBzcHJpbmcsIHNwcmluZ1NpZyB9ID0gd29ya0l0ZW07XG5cbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gbWFwUmFuZ2UoaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50LndpZHRoLCBCT1RUT00odGFiRWxlbWVudCksIFRPUCh0YWJFbGVtZW50KSwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDE7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3b3JrRGlzcGxheXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICAgICAgICAgIGJvZHlTaWcudXBkYXRlKCk7IC8vIGhtIGRvbnQgbGlrZSB0aGlzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gdGhpcyBkb2Vzbid0IHdvcmsgcXVpdGUgcmlnaHQgeWV0XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdvcmtEaXNwbGF5c1tpXS50ZXh0U3F1YXJlLm1ham9yLm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvKHsgbGVmdDogc2Nyb2xsUG9zaXRpb24sIGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSAxO1xuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IGNsZWFySW50ZXJ2YWwodGltZW91dEhhbmRsZSkpO1xuXG4gICAgICAgIHdvcmtJdGVtcy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50IH0gPSB3b3JrSXRlbXNbaV07XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gaW5uZXJXaWR0aCAtIDE1MDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSAoZW5kIC0gc3RhcnQpIC8gKHdvcmtJdGVtcy5sZW5ndGggKiAyIC0gMSk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB3aWR0aCAqICh0YWJFbGVtZW50Lm5hdHVyYWxIZWlnaHQgLyB0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGsgPSBpbm5lckhlaWdodCAqIDAuODtcbiAgICAgICAgICAgIGlmIChoZWlnaHQgPCBrKSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KHdpZHRoKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoayk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KGsgKiAodGFiRWxlbWVudC5uYXR1cmFsV2lkdGggLyB0YWJFbGVtZW50Lm5hdHVyYWxIZWlnaHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KHN0YXJ0ICsgaSAqIHdpZHRoICogMik7XG5cbiAgICAgICAgICAgIHN0eWxlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5cyk7XG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHdvcmtEaXNwbGF5IG9mIHdvcmtEaXNwbGF5cykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHdvcmtEaXNwbGF5LnRleHRTcXVhcmUsIDAuMDEgKiBzLCAwLjAxICogcyk7XG4gICAgICAgICAgICBsYXlvdXRXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZWZmZWN0LCBTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcbmltcG9ydCB7IGNsaWNrTmF2Q29ubmVjdCB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcbmltcG9ydCB7IGNsaWNrTmF2RXZvbHV0aW9uIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdkluc3BpcmF0aW9uIH0gZnJvbSBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcbmltcG9ydCB7IGNsaWNrTmF2VmlldyB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcbmltcG9ydCB7IGNsaWNrTmF2V29yayB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcbmltcG9ydCB7IGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIGlzTGFuZHNjYXBlLCBub3RpZnlJbWFnZUxvYWRpbmcsIHB4LCBxdWV1ZUJlZm9yZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgYm9keSwgYm9keVNpZywgaWVCbHVlLCBpZUdyZWVuIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi9zcHJpbmdcIjtcblxuaW50ZXJmYWNlIFNjcm9sbFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZm9udFNpemU6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGxpbmVIZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgY29uc3Qgdmlld05hdiA9IGcoXCJuYXYtdmlld1wiKTtcbmV4cG9ydCBjb25zdCB3b3JrTmF2ID0gZyhcIm5hdi13b3JrXCIpO1xuZXhwb3J0IGNvbnN0IGluc3BpcmF0aW9uTmF2ID0gZyhcIm5hdi1pbnNwaXJhdGlvblwiKTtcbmV4cG9ydCBjb25zdCBldm9sdXRpb25OYXYgPSBnKFwibmF2LWV2b2x1dGlvblwiKTtcbmV4cG9ydCBjb25zdCBjb25uZWN0TmF2ID0gZyhcIm5hdi1jb25uZWN0XCIpO1xuXG5leHBvcnQgY29uc3QgbmF2SXRlbXMgPSBbdmlld05hdiwgd29ya05hdiwgaW5zcGlyYXRpb25OYXYsIGV2b2x1dGlvbk5hdiwgY29ubmVjdE5hdl07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDb250YWluZXIgPSBnKFwic2Nyb2xsLWNvbnRhaW5lclwiKTtcbihzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJDb2xvciA9IGAke2llR3JlZW59ICR7aWVCbHVlfTU1YDtcblxuZXhwb3J0IGNvbnN0IGxvZ28gPSBnKFwibG9nb1wiKTtcblxuZXhwb3J0IGxldCBvbk5hdk9wdGlvbkNsaWNrOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gZyhpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxJbWFnZShzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IHNjcm9sbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBzY3JvbGxJbWFnZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxJbWFnZS5zcmMgPSBzcmM7XG4gICAgbm90aWZ5SW1hZ2VMb2FkaW5nKHNjcm9sbEltYWdlKTtcbiAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JvbGxJbWFnZSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxDb250YWluZXIucmVtb3ZlQ2hpbGQoc2Nyb2xsSW1hZ2UpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzY3JvbGxJbWFnZTtcbn1cblxuZnVuY3Rpb24gY2xpY2tBbnlOYXYobmF2SXRlbTogSFRNTEVsZW1lbnQsIGY6ICgpID0+IHZvaWQpIHtcbiAgICBuYXZJdGVtLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgbmF2SXRlbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHUgb2Ygb25OYXZPcHRpb25DbGljaykgdSgpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrID0gW107XG5cbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5hdkl0ZW1zKSB7XG4gICAgICAgICAgICBuLnN0eWxlLmNvbG9yID0gXCIjODA4MDgwXCI7XG4gICAgICAgIH1cblxuICAgICAgICBuYXZJdGVtLnN0eWxlLmNvbG9yID0gXCIjMDAwMDAwXCI7XG5cbiAgICAgICAgZigpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNjcm9sbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBzY3JvbGxUZXh0LmlubmVySFRNTCA9IHRleHQ7XG4gICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxDb250YWluZXIuYXBwZW5kKHNjcm9sbFRleHQpO1xuICAgIH0pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBzY3JvbGxDb250YWluZXIucmVtb3ZlQ2hpbGQoc2Nyb2xsVGV4dCkpO1xuXG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHQoc2Nyb2xsVGV4dDogSFRNTEVsZW1lbnQsIHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSBcIlwiICsgcy5mb250V2VpZ2h0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuY29sb3IgPSBzLmNvbG9yO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGV0dGVyU3BhY2luZyA9IHB4KHMubGV0dGVyU3BhY2luZyk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250U2l6ZSA9IHB4KHMuZm9udFNpemUpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzLndpZHRoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzLmxpbmVIZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dFNxdWFyZShtYWpvclRleHQ6IHN0cmluZywgLi4ubWlub3JUZXh0czogc3RyaW5nW10pOiBUZXh0U3F1YXJlIHtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vcnMgPSBtaW5vclRleHRzLm1hcChhZGRTY3JvbGxUZXh0KTtcbiAgICByZXR1cm4geyBtYWpvciwgbWlub3JzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFRleHRTcXVhcmUsIG1ham9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzLCBtaW5vclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscykge1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwgbWFqb3JTY3JvbGxUZXh0RGV0YWlscyk7XG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHN0eWxlU2Nyb2xsVGV4dChtaW5vciwgbWlub3JTY3JvbGxUZXh0RGV0YWlscyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZVRvRmlsZShzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKFwiIFwiLCBcIi1cIik7XG59XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgY29uc3QgbGVmdEFsaWduID0gODA7XG4gICAgICAgIGxvZ28uc3R5bGUud2lkdGggPSBweCg1NSk7XG4gICAgICAgIGxvZ28uc3R5bGUuaGVpZ2h0ID0gcHgoNTUpO1xuICAgICAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgICAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KGxlZnRBbGlnbiAvIDIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFsaWduTmF2SXRlbShuYXZJdGVtOiBIVE1MRWxlbWVudCwgbnVkZ2U6IG51bWJlcikge1xuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgLyAyICsgbnVkZ2UgKiA1MCAtIG5hdkl0ZW0uY2xpZW50SGVpZ2h0IC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBhbGlnbk5hdkl0ZW0odmlld05hdiwgLTIpO1xuICAgICAgICBhbGlnbk5hdkl0ZW0od29ya05hdiwgLTEpO1xuICAgICAgICBhbGlnbk5hdkl0ZW0oaW5zcGlyYXRpb25OYXYsIDApO1xuICAgICAgICBhbGlnbk5hdkl0ZW0oZXZvbHV0aW9uTmF2LCAxKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGNvbm5lY3ROYXYsIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bmN0aW9uIGdvQXdheShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoLTEwMDApO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5yaWdodCA9IHB4KC0xMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBnb0F3YXkobG9nbyk7IC8vIHRlbXBvcmFyeVxuICAgICAgICBnb0F3YXkodmlld05hdik7XG4gICAgICAgIGdvQXdheSh3b3JrTmF2KTtcbiAgICAgICAgZ29Bd2F5KGluc3BpcmF0aW9uTmF2KTtcbiAgICAgICAgZ29Bd2F5KGV2b2x1dGlvbk5hdik7XG4gICAgICAgIGdvQXdheShjb25uZWN0TmF2KTtcbiAgICB9XG59LCBbYm9keVNpZ10pO1xuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XG4gICAgICAgIGNvbnN0IHggPSAyODA7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoIC0geCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS50b3AgPSBweCgoaW5uZXJIZWlnaHQgLSBzY3JvbGxIZWlnaHQpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSBnZXRTY3JvbGxXaWR0aCgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChzY3JvbGxXaWR0aCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweChpbm5lckhlaWdodCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoKGlubmVyV2lkdGggLSBzY3JvbGxXaWR0aCkgLyAyKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KDApO1xuICAgIH1cbn0sIFtib2R5U2lnXSk7XG5cbi8vIHJlcGxhY2Ugbm9ybWFsIHNjcm9sbCBiZWhhdmlvciB3aXRoIHh5IGJlaGF2aW9yXG4vLyBzY3JvbGxDb250YWluZXIub253aGVlbCA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyBzY3JvbGxDb250YWluZXIub250b3VjaG1vdmUgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4vLyBvbnRvdWNobW92ZSA9IChlKSA9PiB7fTtcbi8vIG9ud2hlZWwgPSAoZSkgPT4ge1xuLy8gICAgIGNvbnN0IGRlbHRhWFkgPSBlLmRlbHRhWCArIGUuZGVsdGFZO1xuLy8gICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxCeSh7IGxlZnQ6IGRlbHRhWFksIHRvcDogZGVsdGFYWSB9KTtcbi8vIH07XG5cbmNsaWNrQW55TmF2KGxvZ28sIGNsaWNrTmF2Vmlldyk7XG5cbmNsaWNrQW55TmF2KHZpZXdOYXYsIGNsaWNrTmF2Vmlldyk7XG5jbGlja0FueU5hdih3b3JrTmF2LCBjbGlja05hdldvcmspO1xuY2xpY2tBbnlOYXYoaW5zcGlyYXRpb25OYXYsIGNsaWNrTmF2SW5zcGlyYXRpb24pO1xuY2xpY2tBbnlOYXYoZXZvbHV0aW9uTmF2LCBjbGlja05hdkV2b2x1dGlvbik7XG5jbGlja0FueU5hdihjb25uZWN0TmF2LCBjbGlja05hdkNvbm5lY3QpO1xuXG5jb25zdCBzbGVlcCA9IChkZWxheTogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheSkpO1xuXG5hc3luYyBmdW5jdGlvbiBwbHVoKCkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJsb2dvLWZ1bGwuc3ZnXCIpOyAvLyBBc3N1bWluZyAnbXktaWNvbi5zdmcnIGlzIGluIHlvdXIgcHVibGljIGZvbGRlclxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG5cbiAgICBjb25zdCBzdmcgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHN2Z0NvbnRlbnQsIFwiaW1hZ2Uvc3ZnK3htbFwiKS5kb2N1bWVudEVsZW1lbnQgYXMgdW5rbm93biBhcyBTVkdTVkdFbGVtZW50O1xuICAgIHN2Zy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzdmcuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSBweChpbm5lckhlaWdodCAqIDAuNCk7XG5cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcblxuICAgIGNvbnN0IHN2Z1NwcmluZyA9IG5ldyBTcHJpbmcoMCk7XG4gICAgc3ZnU3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDUwKTtcbiAgICBjb25zdCBzdmdTcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG5cbiAgICBjb25zdCBibHVlID0gc3ZnLmdldEVsZW1lbnRCeUlkKFwiYmx1ZS1zcXVhcmVcIikgYXMgU1ZHRWxlbWVudDtcblxuICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHN2Zy5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIHN2Z1NwcmluZy5wb3NpdGlvbjtcbiAgICAgICAgc3ZnLnN0eWxlLmhlaWdodCA9IHB4KCgxLjMgLSBzdmdTcHJpbmcucG9zaXRpb24pICogaW5uZXJIZWlnaHQpO1xuICAgICAgICBzdmcuc3R5bGUudG9wID0gcHgoKGlubmVySGVpZ2h0IC0gc3ZnLnNjcm9sbEhlaWdodCkgLyAyKTtcbiAgICAgICAgc3ZnLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHN2Zy5zY3JvbGxXaWR0aCkgLyAyKTtcbiAgICB9LCBbc3ZnU3ByaW5nU2lnXSk7XG5cbiAgICBzdmdTcHJpbmcudGFyZ2V0ID0gMTtcbiAgICBhbmltYXRlU3ByaW5nKHN2Z1NwcmluZywgc3ZnU3ByaW5nU2lnKTtcblxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgIGNvbnN0IGQgPSBcImRlc2lnblwiO1xuXG4gICAgZnVuY3Rpb24gb3BhY2l0eU91dChlbGVtZW50OiBTVkdFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGxldHRlclNwcmluZyA9IG5ldyBTcHJpbmcoMSk7XG4gICAgICAgIGxldHRlclNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxNTApO1xuICAgICAgICBjb25zdCBsZXR0ZXJTcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiXCIgKyBsZXR0ZXJTcHJpbmcucG9zaXRpb247XG4gICAgICAgIH0sIFtsZXR0ZXJTcHJpbmdTaWddKTtcblxuICAgICAgICBsZXR0ZXJTcHJpbmcudGFyZ2V0ID0gMDtcbiAgICAgICAgYW5pbWF0ZVNwcmluZyhsZXR0ZXJTcHJpbmcsIGxldHRlclNwcmluZ1NpZyk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZXNpZ25MZXR0ZXIgPSBzdmcuZ2V0RWxlbWVudEJ5SWQoXCJkZXNpZ24tXCIgKyBkW2ldKSBhcyBTVkdFbGVtZW50O1xuICAgICAgICBvcGFjaXR5T3V0KGRlc2lnbkxldHRlcik7XG4gICAgICAgIGF3YWl0IHNsZWVwKDIwMCk7XG4gICAgfVxuICAgIGNvbnN0IGwgPSBbXCJiaWctaVwiLCBcImRvdC0xXCIsIFwiYmlnLWVcIiwgXCJkb3QtMlwiXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGVzaWduTGV0dGVyID0gc3ZnLmdldEVsZW1lbnRCeUlkKGxbaV0pIGFzIFNWR0VsZW1lbnQ7XG4gICAgICAgIG9wYWNpdHlPdXQoZGVzaWduTGV0dGVyKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcbiAgICB9XG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XG5cbiAgICBzdmdTcHJpbmcudGFyZ2V0ID0gMDtcbiAgICBhbmltYXRlU3ByaW5nKHN2Z1NwcmluZywgc3ZnU3ByaW5nU2lnKTtcblxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQoc3ZnKTtcblxuICAgIHZpZXdOYXYuY2xpY2soKTtcbn1cblxucGx1aCgpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgPSAwLjAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBsZXQgbGFzdE1pbGxpcyA9IDA7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmlyc3RGcmFtZSk7XHJcbiAgICBmdW5jdGlvbiBmaXJzdEZyYW1lKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGFzdE1pbGxpcyA9IG1pbGxpcztcclxuICAgICAgICB0aWNrU3ByaW5nKG1pbGxpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGlja1NwcmluZyhtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtaWxsaXMgLSBsYXN0TWlsbGlzO1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcblxyXG4gICAgICAgIHNwcmluZy50aWNrKHN0ZXAgLyAxMDAwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2xheW91dFwiO1xyXG5cclxuaW1wb3J0IFwiLi9wYWdlcy92aWV3XCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvd29ya1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvY29ubmVjdFwiO1xyXG5cclxuaW1wb3J0IFwiLi9zaGFyZWRcIjtcclxuXHJcbi8vIGNvbnN0IHdoYXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyBjb25zdCB3aGF0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vIHNldEludGVydmFsKCgpID0+IHtcclxuLy8gICAgIHdoYXQuc3R5bGUud2lkdGggPSBzZWxmLmlubmVyV2lkdGggLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdC5zdHlsZS5oZWlnaHQgPSBzZWxmLmlubmVySGVpZ2h0IC8gMiArIFwicHhcIjtcclxuLy8gICAgIHdoYXQuc3R5bGUubGVmdCA9IDAgKyBcInB4XCI7XHJcblxyXG4vLyAgICAgd2hhdDIuc3R5bGUud2lkdGggPSBzZWxmLmlubmVyV2lkdGggLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdDIuc3R5bGUuaGVpZ2h0ID0gc2VsZi5pbm5lckhlaWdodCAvIDIgKyBcInB4XCI7XHJcbi8vICAgICB3aGF0Mi5zdHlsZS5sZWZ0ID0gc2VsZi5pbm5lcldpZHRoIC8gMiArIFwicHhcIjtcclxuLy8gfSwgMSk7XHJcbi8vIHdoYXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbi8vIHdoYXQyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4vLyB3aGF0LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xyXG4vLyB3aGF0Mi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJncmVlblwiO1xyXG4vLyB3aGF0LnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4vLyB3aGF0Mi5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuXHJcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod2hhdCk7XHJcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod2hhdDIpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=