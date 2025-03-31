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
                //
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
                    spring.target = (0,_layout__WEBPACK_IMPORTED_MODULE_3__.mapRange)(innerHeight - tabElement.width, BOTTOM(tabElement), TOP(tabElement), 0, 1);
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
            _shared__WEBPACK_IMPORTED_MODULE_2__.scrollContainer.scrollTo({ left: workDisplays[i].textSquare.major.scrollLeft });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvY29ubmVjdC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvaW5zcGlyYXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvdmlldy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy93b3JrLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NoYXJlZC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaWduYWwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc3ByaW5nLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWxlbWVudFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5leHBvcnQgY29uc3QgYm9keVNpZyA9IGVsZW1lbnRTaWduYWwoYm9keSk7XG5cbmV4cG9ydCBjb25zdCBpZUJsdWUgPSBcIiM2MDlDQ0VcIjtcbmV4cG9ydCBjb25zdCBpZUdyZWVuID0gXCIjYmZlMDIxXCI7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuOTU7XG4iLCJpbXBvcnQgeyBib2R5U2lnIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBvbk5hdk9wdGlvbkNsaWNrLCBzY3JvbGxDb250YWluZXIsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5pbnRlcmZhY2UgRWxlbWVudEFsaWdubWVudCB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbmxldCBpbWFnZUxvYWRpbmdQcm9taXNlczogUHJvbWlzZTx2b2lkPltdID0gW107XG5sZXQgcXVldWVkQmVmb3JlTGF5b3V0OiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwUmFuZ2UobjogbnVtYmVyLCBzdGFydDE6IG51bWJlciwgc3RvcDE6IG51bWJlciwgc3RhcnQyOiBudW1iZXIsIHN0b3AyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKChuIC0gc3RhcnQxKSAvIChzdG9wMSAtIHN0YXJ0MSkpICogKHN0b3AyIC0gc3RhcnQyKSArIHN0YXJ0Mjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IHVwZGF0ZUxheW91dEltYWdlV2FpdGluZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VMb2FkaW5nUHJvbWlzZXMpO1xuICAgICAgICBmb3IgKGNvbnN0IGltYWdlTG9hZGluZ0FwcGVuZCBvZiBxdWV1ZWRCZWZvcmVMYXlvdXQpIGltYWdlTG9hZGluZ0FwcGVuZCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBxdWV1ZWRCZWZvcmVMYXlvdXQgPSBbXTtcbiAgICAgICAgdXBkYXRlTGF5b3V0KCk7XG4gICAgfTtcbiAgICBlZmZlY3QodXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nLCBbYm9keVNpZ10pO1xuICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dEltYWdlV2FpdGluZykpO1xuXG4gICAgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWV1ZUJlZm9yZUxheW91dChldmVudDogKCkgPT4gdm9pZCkge1xuICAgIHF1ZXVlZEJlZm9yZUxheW91dC5wdXNoKGV2ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vdGlmeUltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGltYWdlTG9hZGluZ1Byb21pc2VzLnB1c2goaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIGNvbnN0IFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuNztcbiAgICByZXR1cm4gaW5uZXJIZWlnaHQgKiBTQ1JPTExfSEVJR0hUX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoKCkge1xuICAgIGNvbnN0IFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OID0gMTtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAqIFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OOyAvLyBUT0RPIHRoaXMgc2hvdWxkIGp1c3QgdXNlIGFjdHVhbCBzY3JvbGwgaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50LmNsaWVudFdpZHRoICsgZ2FwKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHlBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbmV4cG9ydCBjb25zdCB4QWxpZ25pbmdXaXRoR2FwcyA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50LmNsaWVudFdpZHRoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JUb01pbm9yR2FwOiBudW1iZXIsIGJldHdlZW5NaW5vcnNHYXA6IG51bWJlcikge1xuICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbXTtcblxuICAgIGl0ZW1zLnB1c2gobWFqb3IsIG1ham9yVG9NaW5vckdhcCk7XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBpdGVtcy5wdXNoKG1pbm9yLCBiZXR3ZWVuTWlub3JzR2FwKTtcbiAgICB9XG4gICAgaXRlbXMucG9wKCk7IC8vIHJlbW92ZSBmaW5hbCBnYXAsIG9ubHkgd2FudCBiZXR3ZWVuc1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCB0b3RhbEhlaWdodF0gPSB5QWxpZ25pbmdXaXRoR2FwcyhpdGVtcyk7XG4gICAgY29uc3QgZ3JvdXBUb3AgPSAoc2Nyb2xsSGVpZ2h0IC0gdG90YWxIZWlnaHQpIC8gMjtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KGdyb3VwVG9wICsgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBtaW5vci5zdHlsZS5sZWZ0ID0gbWFqb3Iuc3R5bGUubGVmdDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJTY2FsZWRZKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gc2Nyb2xsQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIHNjYWxlO1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCgoaGVpZ2h0ICogZWxlbWVudC5uYXR1cmFsV2lkdGgpIC8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0KTtcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KChzY3JvbGxDb250YWluZXIuY2xpZW50SGVpZ2h0IC0gaGVpZ2h0KSAvIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyU2NhbGVkWChlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IHdpZHRoID0gc2Nyb2xsQ29udGFpbmVyLmNsaWVudFdpZHRoICogc2NhbGU7XG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KHdpZHRoKTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoKHdpZHRoICogZWxlbWVudC5uYXR1cmFsSGVpZ2h0KSAvIGVsZW1lbnQubmF0dXJhbFdpZHRoKTtcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgoc2Nyb2xsQ29udGFpbmVyLmNsaWVudFdpZHRoIC0gd2lkdGgpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAvIGlubmVySGVpZ2h0ID4gMTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkNvbm5lY3QoKSB7fVxuIiwiaW1wb3J0IHsgaWVHcmVlbiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgc3R5bGVTY3JvbGxUZXh0IH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5pbnRlcmZhY2UgUXVvdGVEaXNwbGF5IHtcbiAgICBxdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgYXV0aG9yOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICB0aXRsZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgb3BlblF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBjbG9zZVF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkUXVvdGUocXVvdGVUZXh0OiBzdHJpbmcsIGF1dGhvclRleHQ6IHN0cmluZywgdGl0bGVUZXh0OiBzdHJpbmcpOiBRdW90ZURpc3BsYXkge1xuICAgIGNvbnN0IHF1b3RlID0gYWRkU2Nyb2xsVGV4dChxdW90ZVRleHQpO1xuICAgIGNvbnN0IGF1dGhvciA9IGFkZFNjcm9sbFRleHQoYXV0aG9yVGV4dCk7XG4gICAgY29uc3QgdGl0bGUgPSBhZGRTY3JvbGxUZXh0KHRpdGxlVGV4dCk7XG4gICAgY29uc3Qgb3BlblF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnFwiKTtcbiAgICBjb25zdCBjbG9zZVF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnVwiKTtcblxuICAgIHJldHVybiB7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGVEaXNwbGF5KSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMyICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2NSAqIHMgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplOiAwLjE1ICogcywgd2lkdGg6IDAuMDUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlRGlzcGxheSwgbnVkZ2U6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGF1dGhvci5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG4gICAgdGl0bGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgcXVvdGUsIC8vXG4gICAgICAgIDAuMDQgKiBzLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIC0wLjAxNSAqIHMsXG4gICAgICAgIHRpdGxlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4zNSAqIHMpO1xuICAgIH1cblxuICAgIG9wZW5RdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCAtIDAuMDcgKiBzKTtcbiAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgIGNsb3NlUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgKyBxdW90ZS5vZmZzZXRXaWR0aCAtIG51ZGdlKTtcbiAgICBjbG9zZVF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIHF1b3RlLm9mZnNldEhlaWdodCAtIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2RXZvbHV0aW9uKCkge1xuICAgIGNvbnN0IGV2b2x1dGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi5zdmdcIik7XG4gICAgY29uc3QgZXZvbHV0aW9uSGlzdG9yeSA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi1oaXN0b3J5LnN2Z1wiKTtcbiAgICAvLyBjb25zdCBsb2dvRnVsbCA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2xvZ28tZnVsbC5zdmdcIik7XG5cbiAgICBjb25zdCBwcm9tb3M6IEhUTUxJbWFnZUVsZW1lbnRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykgcHJvbW9zLnB1c2goYWRkU2Nyb2xsSW1hZ2UoYGV2b2x1dGlvbi9wcm9tby0ke2l9LmpwZ2ApKTtcblxuICAgIGNvbnN0IHF1b3RlcyA9IFtcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIk91ciBhbm51YWwgcHJvbW8gaXMgYWx3YXlzIGdyb3VuZGVkIGluIG91ciBpZGVudGl0eSBidXQgaXQncyBmdW4gdG8gcHVzaCBsaW1pdHMgYW5kIHJlaW52ZW50IG91cnNlbHZlcyBlYWNoIHllYXIuIFRoZSBiZXN0IHBhcnQgaXMgPHN0cm9uZz5oZWFyaW5nIHdoYXQgb3VyIGNsaWVudHMgaGF2ZSB0byBzYXkuPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBcIkJFVEhMWU4gS1JBS0FVRVJcIixcbiAgICAgICAgICAgIFwiRm91bmRlciwgaS5lLiBkZXNpZ24sIGluYy5cIlxuICAgICAgICApLFxuICAgICAgICBhZGRRdW90ZShcIkkgbG92ZSBob3cgeW91IGRvIHN0dWZmLiBJJ20gZmluZGluZyB0aGF0IHRoZXNlIHR5cGVzIG9mIG1lc3NhZ2VzIGFyZSByZWFsbHkgPHN0cm9uZz50cmFuc2Zvcm1pbmcgcmVsYXRpb25zaGlwczwvc3Ryb25nPiB3aXRoIHBlb3BsZS4gVGhleSBhcmUganVzdCBkcmVhbXkuXCIsIFwiREVCUkEgU0NIQVRaS0lcIiwgXCJGb3VuZGVyLCBCUFAgV2VhbHRoIFNvbHV0aW9ucyBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBzZWUgYSBsb3Qgb2YgdGhpcyBzcGVjaWFsIHF1YWxpdHkgaW4geW91ciB3b3JrLiBJdCdzIG5vdCBqdXN0IGFib3V0IGJlaW5nIGludGVudGlvbmFsLiBZb3UgYWx3YXlzIGJyaW5nIGluIGFuIGVsZW1lbnQgb2YgPHN0cm9uZz5zdXJwcmlzZSBhbmQgZGVsaWdodC48L3N0cm9uZz5cIiwgXCJKT1NIIEtSQUtBVUVSXCIsIFwiRm91bmRlciwgU2N1bHB0XCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdXIgYXBwcm9hY2ggd29ya3Mgc28gd2VsbCBiZWNhdXNlIGl0IGlzIHJlYWxseSA8c3Ryb25nPnBlcnNvbmFsPC9zdHJvbmc+IGFuZCBlcXVhbGx5IDxzdHJvbmc+cHJvZmVzc2lvbmFsLjwvc3Ryb25nPlwiLCBcIkFOTiBTVUxMSVZBTlwiLCBcIkZvdW5kZXIsIEFubiBTdWxsaXZhbiBPcmdhbml6aW5nXCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdSB0cnVseSB1bmRlcnN0YW5kIHRoZSB1bmlxdWUgcG9zaXRpb25pbmcgb2YgYSBwcm9zcGVjdGl2ZSBjbGllbnQgYW5kIGFyZSBhYmxlIHRvIDxzdHJvbmc+dGVsbCB0aGVpciBzdG9yeTwvc3Ryb25nPiBleGFjdGx5IGFzIGl0IHNob3VsZCBiZSB0b2xkLlwiLCBcIkRBVklEIFlVTlwiLCBcIlByaW5jaXBhbCwgVmFyaWRlbnQgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiQmV0aCBpcyBxdWl0ZSBmcmFua2x5IG9uZSBvZiB0aGUgPHN0cm9uZz5tb3N0IHRhbGVudGVkIGRlc2lnbmVyczwvc3Ryb25nPiB0aGF0IEkgaGF2ZSBldmVyIGhhZCB0aGUgcHJpdmlsZWdlIHRvIHdvcmsgd2l0aC4gU2hlIGFsd2F5cyBoYXMgYSBzcGVjaWFsIHdheSBvZiBtYWtpbmcgZXZlcnl0aGluZyBzaGUgdG91Y2hlcyB0dXJuIHRvIGdvbGQhXCIsXG4gICAgICAgICAgICBcIkRBVklEIFJVU0hcIixcbiAgICAgICAgICAgIFwiUHJlc2lkZW50LCBFTlZcIlxuICAgICAgICApLFxuICAgIF07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoZXZvbHV0aW9uLCAwLjc1KTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShldm9sdXRpb25IaXN0b3J5LCAwLjMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW9zKSBjZW50ZXJTY2FsZWRZKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtldm9sdXRpb24sIDAuMiAqIHMsIGV2b2x1dGlvbkhpc3RvcnldO1xuXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHF1b3Rlcy5sZW5ndGgsIHByb21vcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IHF1b3Rlcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcXVvdGVzW2ldLnF1b3RlKTtcbiAgICAgICAgICAgIGlmIChpIDwgcHJvbW9zLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBwcm9tb3NbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHhBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUsIDAuMDUgKiBzKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllQmx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduV2l0aEdhcCwgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHlBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIHN0eWxlU2Nyb2xsVGV4dCB9IGZyb20gXCIuLi9zaGFyZWRcIjtcblxuY29uc3QgSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OID0gMC44NTtcblxuaW50ZXJmYWNlIEluc3BpcmF0aW9uVGlsZSB7XG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yOiBIVE1MRWxlbWVudDtcbiAgICByZWFkTW9yZTogSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChtYWpvciwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjYsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICBmb250U2l6ZTogMC4wMzYgKiBzLFxuICAgICAgICB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcyxcbiAgICAgICAgbGluZUhlaWdodDogMC4wOSAqIHMsXG4gICAgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQobWlub3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC4zLFxuICAgICAgICBmb250V2VpZ2h0OiAzNTAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemU6IDAuMDI3ICogcyxcbiAgICAgICAgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsXG4gICAgICAgIGxpbmVIZWlnaHQ6IDAuMDUgKiBzLFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KHJlYWRNb3JlLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuNSxcbiAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICBjb2xvcjogaWVCbHVlLFxuICAgICAgICBmb250U2l6ZTogMC4wMyAqIHMsXG4gICAgICAgIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLFxuICAgICAgICBsaW5lSGVpZ2h0OiAwLjA1ICogcyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCAqIDAuNTUpO1xufVxuXG5mdW5jdGlvbiBhbGlnbkluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIG1ham9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIHJlYWRNb3JlLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgaW1hZ2UsIC8vXG4gICAgICAgIDAuMDMgKiBzLFxuICAgICAgICBtYWpvcixcbiAgICAgICAgLTAuMDEgKiBzLFxuICAgICAgICBtaW5vcixcbiAgICAgICAgMC4wMSAqIHMsXG4gICAgICAgIHJlYWRNb3JlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgcyAqIDAuMTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25UaWxlKGltYWdlU3RyaW5nOiBzdHJpbmcsIG1ham9yVGV4dDogc3RyaW5nLCBtaW5vclRleHQ6IHN0cmluZyk6IEluc3BpcmF0aW9uVGlsZSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhZGRTY3JvbGxJbWFnZShpbWFnZVN0cmluZyk7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3IgPSBhZGRTY3JvbGxUZXh0KG1pbm9yVGV4dCk7XG4gICAgY29uc3QgcmVhZE1vcmUgPSBhZGRTY3JvbGxUZXh0KFwiUmVhZCBtb3JlXCIpO1xuXG4gICAgcmV0dXJuIHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2SW5zcGlyYXRpb24oKSB7XG4gICAgY29uc3QgaW5zcGlyYXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImluc3BpcmF0aW9uL2luc3BpcmF0aW9uLnN2Z1wiKTtcblxuICAgIGNvbnN0IHRpbGVzID0gW1xuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi95dW1pZS5qcGdcIiwgXCJUSEUgU1RBUlQgT0YgU09NRVRISU5HIFlVTS1JRVwiLCBcIldlIGFsd2F5cyB3YW50ZWQgdG8gZGVzaWduIGNob2NvbGF0ZSBiYXJzIGFuZCBmaW5hbGx5IGRpZCBpdC4gSW50cm9kdWNpbmcgb3VyIHN3ZWV0IG5ldyBicmFuZC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3dvcmRzLWlkZWFzLmpwZ1wiLCBcIlNIQVJFIFNPTUUgREVTSUdOIExPVkVcIiwgXCJUaGUgaS5lLiBkZXNpZ24gcHJvbW8gam91cm5hbHMgZW5jb3VyYWdlIGNsaWVudHMgdG8gc2tldGNoIHRoZWlyIGJpZyBpZGVhcyBhbmQgY2FwdHVyZSB0aGVpciBkcmVhbXMuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9jb29rLWllLmpwZ1wiLCBcIkdPVFRBIExPVkUgQSBDT09LLUlFXCIsIFwiSG93IGEgc2VjcmV0IHJlY2lwZSB3b3JrcyB0byBicmluZyByZWxhdGlvbnNoaXBzIHRvIGEgd2hvbGUgbmV3IGxldmVsLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVtaXguanBnXCIsIFwiUkVNSVhcIiwgXCJBIGJlaGluZC10aGUtc2NlbmVzIGxvb2sgYXQgaG93IHdlIHRyYW5zZm9ybWVkIGNsYXNzaWMgbWVtb3J5IGNhcnJpZXJzIGludG8gb2JqZWN0cyBvZiBhcnQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9rcmVtcGEucG5nXCIsIFwiUkVCUkFORElORyBBIEZBTUlMWSBCVVNJTkVTU1wiLCBcIkEgcmVmcmVzaCBmb3IgYSA1MC15ZWFyIGxlZ2FjeS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2ZvdG9zdG9yaS5qcGdcIiwgXCJCUkFORElORyBGUk9NIFRIRSBOQU1FIFVQXCIsIFwiV2hlbiBhIGNsaWVudCBoYWQgYW4gaWRlYSBmb3IgYSBicmFuZCBzcGlub2ZmLCB3ZSB0b29rIGhlciBjb25jZXB0IHRvIHJlYWxpdHkgYW5kIGxhdW5jaGVkIHRoZSBidXNpbmVzcyBpbiBoaWdoIHN0eWxlLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vaW5zcGlyZWQtMi1jcmVhdGUuanBnXCIsIFwiSU5TUElSRUQgMiBDUkVBVEVcIiwgXCJBIHBhaW50aW5nIGluc3BpcmVkIGJ5IHRoZSBpLmUuIGRlc2lnbiBsb2dvIGNvbWJpbmVzIG9pbCBwYWludHMsIGdyb3VuZCB1cCBjcmF5b25zLCBhbmQgYSBsZWdvLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZnJvbS1pbnNpZGUuanBnXCIsIFwiVEhFIFZJRVcgRlJPTSBJTlNJREVcIiwgXCJpLmUuIGRlc2lnbidzIG5ldyBzdHVkaW8gd2FzIDMwIHllYXJzIGluIHRoZSBtYWtpbmcuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZWNvbm5lY3RpbmcuanBnXCIsIFwiUkVDT05ORUNUSU5HXCIsIFwiSG93IHVuY2VydGFpbiB0aW1lcyBsZWQgdG8gYSBob21lY29taW5nIGZvciBpLmUuIGRlc2lnbidzIHNlbmlvciBkZXNpZ25lci5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL25ldy1zdHVkaW8uanBnXCIsIFwiTkVXIFNUVURJTy4gTkVXIFZJRVcuXCIsIFwiSG93IHRoZSBuZWVkIGZvciBpbnNwaXJhdGlvbiBmdWVsZWQgdGhlIGJ1aWxkaW5nIG9mIGEgc3R1ZGlvLlwiKSxcbiAgICBdO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyU2NhbGVkWShpbnNwaXJhdGlvbiwgMC43NSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBzdHlsZUluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBhbGlnbldpdGhHYXAoaW5zcGlyYXRpb24sIHRpbGVzWzBdLmltYWdlLCBzICogMC4yNSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoIC0gMTsgaSsrKSBhbGlnbldpdGhHYXAodGlsZXNbaV0uaW1hZ2UsIHRpbGVzW2kgKyAxXS5pbWFnZSwgcyAqIDAuMSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBhbGlnbkluc3BpcmF0aW9uVGlsZSh0aWxlKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlclNjYWxlZFgsIGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIGlzTGFuZHNjYXBlLCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHhBbGlnbmluZ1dpdGhHYXBzLCB5QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9sYXlvdXRcIjtcclxuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHRTcXVhcmUsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgVGV4dFNxdWFyZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdlZpZXcoKSB7XHJcbiAgICBjb25zdCBob21lID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvbWUuc3ZnXCIpO1xyXG4gICAgY29uc3QgaG9yaXpvbiA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob3Jpem9uLmpwZ1wiKTtcclxuICAgIGNvbnN0IGZyZXNoTG9vayA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9mcmVzaC1sb29rLnN2Z1wiKTtcclxuICAgIGNvbnN0IGdyZWF0QnJhbmRzID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2dyZWF0LWJyYW5kcy5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTEgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiR1JFQVQgQlJBTkRTIERPTidUIEpVU1QgSEFQUEVOXCIsXHJcbiAgICAgICAgXCJUaGV5IHJlcXVpcmUgZXhwbG9yYXRpb24sIGluc2lnaHQsIGFuZCB0ZW5hY2l0eS4gV2UgaHVudCBmb3IgdGhhdCBtYWdpYyBzcGFyayB0aGF0IGlnbml0ZXMgaW5ub3ZhdGlvbi4gV2UgYnJpbmcgb3VyIGV4dGVuc2l2ZSBza2lsbHMgYW5kIGV4cGVyaWVuY2UgdG8gZWFjaCBwcm9qZWN0IGFuZCBnaXZlIGl0IG91ciBhbGwuIFRoZSByZXN1bHQgaXMgY2xlYXIsIHlldCBlbGV2YXRlZCBjb21tdW5pY2F0aW9uIHRoYXQgbWFrZXMgcGVvcGxlIHN0b3AsIHRoaW5rLCBhbmQgb2Z0ZW4gc21pbGUuXCIsXHJcbiAgICAgICAgXCJPdXIgc3R1ZGlvIGxvY2F0aW9uIGlzIHByb2ZvdW5kbHkgaW5zcGlyaW5nLiBUaGUgbWFnbmlmaWNlbnQgdmlldyBmZWVkcyBvdXIgc291bHMgYW5kIGtlZXBzIHVzIGluc3BpcmVkIHRvIGRvIG91ciBiZXN0IHdvcmsuIEl0J3MgYSBwbGFjZSB3aGVyZSBjcmVhdGl2ZSBwZW9wbGUgY29tZSB0b2dldGhlciB0byBjb2xsYWJvcmF0ZSBhbmQgZHJpbGwgZG93biB0byB0aGUgaGVhcnQgb2YgdGhlIG1hdHRlci4gVG8gc29sdmUgcHJvYmxlbXMgYW5kIGJyaW5nIGlkZWFzIHRvIGxpZmUuIFRvIGNyZWF0ZSB0aGluZ3Mgd29ydGggcmVtZW1iZXJpbmcuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBpbnNpZ2h0Q2xhcml0eSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9pbnNpZ2h0LWNsYXJpdHkuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUyID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIEJSSU5HIFZJU0lPTiwgSU5TSUdIVCwgQU5EIENMQVJJVFkgVE8gRVZFUlkgUFJPSkVDVFwiLFxyXG4gICAgICAgIFwiU3VjY2Vzc2Z1bCBkZXNpZ24gc3RhcnRzIHdpdGggaWRlbnRpZnlpbmcgYSBjbGllbnQncyBuZWVkcywgZ29hbHMsIGFuZCBhc3BpcmF0aW9ucy4gT3VyIG9iamVjdGl2aXR5IHNoaW5lcyBsaWdodCBvbiB3aGF0IG90aGVycyBoYXZlIG1pc3NlZC4gV2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBzZWUgYW5kIGludGVycHJldCB0aGUgaW5uZXIgd29ya2luZ3MsIGN1bHR1cmUsIGFuZCBudWFuY2VzIG9mIG91ciBjbGllbnQncyB3b3JsZC4gV2UgYXNrIHF1ZXN0aW9ucyDigJMgbG90cyBvZiBxdWVzdGlvbnMuIFRoZW4gbGlzdGVuIHVudGlsIHdlIGdhaW4gdGhlIGRlZXAgdW5kZXJzdGFuZGluZyBuZWNlc3NhcnkgdG8gYnVpbGQgdGhlIHNvbGlkIGZvdW5kYXRpb24gdGhhdCBhbnkgZW5kdXJpbmcgYnJhbmQgbmVlZHMuXCIsXHJcbiAgICAgICAgXCJPdXIgc21hbGwgYnV0IG1pZ2h0eSB0ZWFtIGJyaW5ncyB0b2dldGhlciBhIHdpZGUgcmFuZ2Ugb2YgdGFsZW50cyBhbmQgcGVyc3BlY3RpdmVzLCBwbHVzIGEgbmljZSBsaXN0IG9mIGF3YXJkcy4gV2UgdGhyb3cgb3VyIGhlYXJ0cyBpbnRvIG91ciB3b3JrIGFuZCBhcmUga25vd24gZm9yIG91ciBmaWVyY2UgY29tbWl0bWVudCB0byB0aGUgdHJ1c3RlZCwgbG9uZy10ZXJtIHBhcnRuZXJzaGlwcyB3ZSBmb3JtLiBGb3IgdXMsIGl0J3MgcGVyc29uYWwuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBza3l3YXJkID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L3NreXdhcmQuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUzID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIFNFRSBXT1JLIElOIEEgRElGRkVSRU5UIExJR0hUXCIsXHJcbiAgICAgICAgXCJQZW9wbGUgbGlrZSB0byBhc2sgYWJvdXQgb3VyIGRlc2lnbiBwcm9jZXNzLiBUaGUgdHJ1dGggaXMgdGhhdCB0aGUgYXBwcm9hY2ggdG8gZWFjaCBwcm9qZWN0IHZhcmllcywgYmVjYXVzZSBlYWNoIGNsaWVudCBhbmQgdGhlaXIgbmVlZHMgYXJlIHVuaXF1ZS4gQ3JlYXRpdmUgYnJlYWt0aHJvdWdocyBkb24ndCBmb2xsb3cgdGhlIGNsb2NrLiBUaGV5IGNhbiBoYXBwZW4gYW55IHRpbWUgb2YgZGF5IOKAkyBvciBuaWdodC4gV2hldGhlciBhbiBlcGlwaGFueSBpcyBpbGx1bWluYXRlZCBpbiBhIHNjcmliYmxlLCBhIGRyZWFtLCBvciBhcyB0aGUgY2xvdWRzIHJvbGwgYnksIHdlIGVtYnJhY2UgdGhlIGZhY3QgdGhhdCBlYWNoIHByb2plY3QgdGFrZXMgb24gYSBsaWZlIG9mIGl0cyBvd24uXCIsXHJcbiAgICAgICAgXCJXaGF0J3MgY29uc3RhbnQgaXMgb3VyIGFiaWxpdHkgdG8gbGlzdGVuIGFuZCBmb2N1cywgdG8gYW5hbHl6ZSBhbmQgY29ubmVjdCBkb3RzLCBhbmQgdG8gcmVtYWluIGN1cmlvdXMuIFRoZSBtb3N0IHJld2FyZGluZyBwcm9qZWN0cyBhcmUgd2l0aCBjbGllbnRzIHdobyB2YWx1ZSB0aGUgYmFsYW5jZSBiZXR3ZWVuIHB1c2hpbmcgZm9yd2FyZCBhbmQgYWxsb3dpbmcgdGltZSBmb3IgdGhlIHBlcmZlY3Qgc29sdXRpb24gdG8gZW1lcmdlLiBUaGF0J3Mgb3VyIGhhcHB5IHBsYWNlLlwiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRleHRUaWxlcyA9IFt0ZXh0VGlsZTEsIHRleHRUaWxlMiwgdGV4dFRpbGUzXTtcclxuXHJcbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgSE9NRV9IT1JJWk9OX1BBRCA9IDAuMjtcclxuICAgICAgICBjb25zdCBGUkVTSF9MT09LX1BBRCA9IDAuMTM7XHJcbiAgICAgICAgY29uc3QgSU1BR0VfVEVYVF9TUVVBUkVfUEFEID0gMC4xNztcclxuXHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShmcmVzaExvb2ssIDAuOCk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMi4yLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiNCM0IzQjNcIiwgZm9udFNpemU6IDAuMDY1ICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB4QWxpZ25pbmdXaXRoR2FwcyhbXHJcbiAgICAgICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICAgICAgSE9NRV9IT1JJWk9OX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBob3Jpem9uLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUxLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMy5tYWpvcixcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChmcmVzaExvb2ssIDAuODUpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogNCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA4ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgVEVYVF9USUxFX1dJRFRIID0gMC44NTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlclNjYWxlZFgodGV4dFRpbGUubWFqb3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgY2VudGVyU2NhbGVkWChtaW5vciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgTU9CSUxFX1BBRCA9IDAuMDg7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb2JpbGVUaWxlKHRleHRUaWxlOiBUZXh0U3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gW3RleHRUaWxlLm1ham9yLCAwLjAgKiBzXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSB4LnB1c2goMC4wNCAqIHMsIG1pbm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUxKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUyKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTMpLFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBlZmZlY3QsIFNpZ25hbCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IGFuaW1hdGVTcHJpbmcsIFNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBvbk5hdk9wdGlvbkNsaWNrLCBzY3JvbGxDb250YWluZXIsIHNwYWNlVG9GaWxlLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgbWFwUmFuZ2UsIHB4LCBxdWV1ZUJlZm9yZUxheW91dCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHhBbGlnbmluZ1dpdGhHYXBzIH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYm9keSwgYm9keVNpZyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuaW50ZXJmYWNlIFdvcmtDb250ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgV29ya0Rpc3BsYXkge1xuICAgIHRleHRTcXVhcmU6IFRleHRTcXVhcmU7XG4gICAgaW1hZ2UxOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltYWdlMjogSFRNTEltYWdlRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFdvcmtJdGVtIHtcbiAgICB0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNwcmluZzogU3ByaW5nO1xuICAgIHNwcmluZ1NpZzogU2lnbmFsO1xufVxuXG5jb25zdCB3b3JrQ29udGVudHM6IFdvcmtDb250ZW50W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmZ1bmN0aW9uIHN0eWxlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxuICAgICAgICAgICAgdGV4dFNxdWFyZSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMi4yLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDY1ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA5ICogcyB9LFxuICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzMzMzMzM1wiLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxuICAgICAgICApO1xuICAgICAgICBjZW50ZXJTY2FsZWRZKGltYWdlMSwgMSk7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoaW1hZ2UyLCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSkge1xuICAgIGZvciAoY29uc3Qgd29ya0NvbnRlbnQgb2Ygd29ya0NvbnRlbnRzKSB7XG4gICAgICAgIGNvbnN0IHRleHRTcXVhcmUgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKHdvcmtDb250ZW50Lm5hbWUudG9VcHBlckNhc2UoKSwgLi4ud29ya0NvbnRlbnQuZGVzY3JpcHRpb24pO1xuICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICBjb25zdCBpbWFnZTIgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8yLmpwZ2ApO1xuXG4gICAgICAgIHdvcmtEaXNwbGF5cy5wdXNoKHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBmb3IgKGNvbnN0IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfSBvZiB3b3JrRGlzcGxheXMpIHtcbiAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0ZXh0U3F1YXJlLm1ham9yLFxuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIGltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZXb3JrKCkge1xuICAgIGNvbnN0IHdvcmtJdGVtczogV29ya0l0ZW1bXSA9IFtdO1xuICAgIGNvbnN0IHdvcmtEaXNwbGF5czogV29ya0Rpc3BsYXlbXSA9IFtdO1xuXG4gICAgY29uc3QgQk9UVE9NID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+IChpbm5lckhlaWdodCAtIHRhYkVsZW1lbnQuY2xpZW50SGVpZ2h0KSAvIDI7XG4gICAgY29uc3QgVE9QID0gKHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQpID0+IGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC5jbGllbnRXaWR0aCAvIDI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgYm9keS5hcHBlbmQodGFiRWxlbWVudCk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBib2R5LnJlbW92ZUNoaWxkKHRhYkVsZW1lbnQpKTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxMDAwKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IC0wLjE7XG4gICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAwO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGsgPSBtYXBSYW5nZShzcHJpbmcucG9zaXRpb24sIDAsIDEsIEJPVFRPTSh0YWJFbGVtZW50KSwgVE9QKHRhYkVsZW1lbnQpKTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgoayk7XG4gICAgICAgIH0sIFtzcHJpbmdTaWcsIGJvZHlTaWddKTtcbiAgICAgICAgc3ByaW5nU2lnLnVwZGF0ZSgpO1xuXG4gICAgICAgIHRhYkVsZW1lbnQub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0l0ZW0gb2Ygd29ya0l0ZW1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50LCBzcHJpbmcsIHNwcmluZ1NpZyB9ID0gd29ya0l0ZW07XG4gICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IDE7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IG1hcFJhbmdlKGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCksIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGJvZHlTaWcudXBkYXRlKCk7IC8vIGhtIGRvbnQgbGlrZSB0aGlzXG4gICAgICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG8oeyBsZWZ0OiB3b3JrRGlzcGxheXNbaV0udGV4dFNxdWFyZS5tYWpvci5zY3JvbGxMZWZ0IH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IDE7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9LCA4MCAqIGkpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lb3V0SGFuZGxlKSk7XG5cbiAgICAgICAgd29ya0l0ZW1zLnB1c2goeyB0YWJFbGVtZW50LCBzcHJpbmcsIHNwcmluZ1NpZyB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya0l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQgfSA9IHdvcmtJdGVtc1tpXTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSAzMDA7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBpbm5lcldpZHRoIC0gMTUwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IChlbmQgLSBzdGFydCkgLyAod29ya0l0ZW1zLmxlbmd0aCAqIDIgLSAxKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogKHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCAvIHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoKTtcblxuICAgICAgICAgICAgY29uc3QgayA9IGlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGspIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChrKTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoayAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcblxuICAgICAgICAgICAgc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya0Rpc3BsYXkgb2Ygd29ya0Rpc3BsYXlzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUod29ya0Rpc3BsYXkudGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbiAgICAgICAgICAgIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcbmltcG9ydCB7IGNsaWNrTmF2Q29ubmVjdCB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcbmltcG9ydCB7IGNsaWNrTmF2RXZvbHV0aW9uIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdkluc3BpcmF0aW9uIH0gZnJvbSBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcbmltcG9ydCB7IGNsaWNrTmF2VmlldyB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcbmltcG9ydCB7IGNsaWNrTmF2V29yayB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcbmltcG9ydCB7IGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIGlzTGFuZHNjYXBlLCBub3RpZnlJbWFnZUxvYWRpbmcsIHB4LCBxdWV1ZUJlZm9yZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgYm9keSwgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5pbnRlcmZhY2UgU2Nyb2xsVGV4dERldGFpbHMge1xuICAgIGxldHRlclNwYWNpbmc6IG51bWJlcjtcbiAgICBmb250V2VpZ2h0OiBudW1iZXI7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgbGluZUhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTcXVhcmUge1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcnM6IEhUTUxFbGVtZW50W107XG59XG5cbmV4cG9ydCBjb25zdCB2aWV3TmF2ID0gZyhcIm5hdi12aWV3XCIpO1xuZXhwb3J0IGNvbnN0IHdvcmtOYXYgPSBnKFwibmF2LXdvcmtcIik7XG5leHBvcnQgY29uc3QgaW5zcGlyYXRpb25OYXYgPSBnKFwibmF2LWluc3BpcmF0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IGV2b2x1dGlvbk5hdiA9IGcoXCJuYXYtZXZvbHV0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IGNvbm5lY3ROYXYgPSBnKFwibmF2LWNvbm5lY3RcIik7XG5cbmV4cG9ydCBjb25zdCBuYXZJdGVtcyA9IFt2aWV3TmF2LCB3b3JrTmF2LCBpbnNwaXJhdGlvbk5hdiwgZXZvbHV0aW9uTmF2LCBjb25uZWN0TmF2XTtcblxuZXhwb3J0IGNvbnN0IHNjcm9sbENvbnRhaW5lciA9IGcoXCJzY3JvbGwtY29udGFpbmVyXCIpO1xuXG5leHBvcnQgY29uc3QgbG9nbyA9IGcoXCJsb2dvXCIpO1xuXG5leHBvcnQgbGV0IG9uTmF2T3B0aW9uQ2xpY2s6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBnKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpITtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbEltYWdlKHNyYzogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbEltYWdlLnNyYyA9IHNyYztcbiAgICBub3RpZnlJbWFnZUxvYWRpbmcoc2Nyb2xsSW1hZ2UpO1xuICAgIHF1ZXVlQmVmb3JlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmFwcGVuZENoaWxkKHNjcm9sbEltYWdlKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IHNjcm9sbENvbnRhaW5lci5yZW1vdmVDaGlsZChzY3JvbGxJbWFnZSkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNjcm9sbEltYWdlO1xufVxuXG5mdW5jdGlvbiBjbGlja0FueU5hdihuYXZJdGVtOiBIVE1MRWxlbWVudCwgZjogKCkgPT4gdm9pZCkge1xuICAgIG5hdkl0ZW0uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG5cbiAgICBuYXZJdGVtLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdSBvZiBvbk5hdk9wdGlvbkNsaWNrKSB1KCk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IG4gb2YgbmF2SXRlbXMpIHtcbiAgICAgICAgICAgIG4uc3R5bGUuY29sb3IgPSBcIiM4MDgwODBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hdkl0ZW0uc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIjtcblxuICAgICAgICBmKCk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHNjcm9sbFRleHQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5hcHBlbmQoc2Nyb2xsVGV4dCk7XG4gICAgfSk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IHNjcm9sbENvbnRhaW5lci5yZW1vdmVDaGlsZChzY3JvbGxUZXh0KSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcblxuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFNpemUgPSBweChzLmZvbnRTaXplKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLndpZHRoID0gcHgocy53aWR0aCk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5saW5lSGVpZ2h0ID0gcHgocy5saW5lSGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHRTcXVhcmUobWFqb3JUZXh0OiBzdHJpbmcsIC4uLm1pbm9yVGV4dHM6IHN0cmluZ1tdKTogVGV4dFNxdWFyZSB7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3JzID0gbWlub3JUZXh0cy5tYXAoYWRkU2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHsgbWFqb3IsIG1pbm9ycyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclNjcm9sbFRleHREZXRhaWxzOiBTY3JvbGxUZXh0RGV0YWlscywgbWlub3JTY3JvbGxUZXh0RGV0YWlsczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzdHlsZVNjcm9sbFRleHQobWFqb3IsIG1ham9yU2Nyb2xsVGV4dERldGFpbHMpO1xuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSBzdHlsZVNjcm9sbFRleHQobWlub3IsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BhY2VUb0ZpbGUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShcIiBcIiwgXCItXCIpO1xufVxuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XG4gICAgICAgIGNvbnN0IGxlZnRBbGlnbiA9IDgwO1xuICAgICAgICBsb2dvLnN0eWxlLndpZHRoID0gcHgoNTUpO1xuICAgICAgICBsb2dvLnN0eWxlLmhlaWdodCA9IHB4KDU1KTtcbiAgICAgICAgbG9nby5zdHlsZS5sZWZ0ID0gcHgobGVmdEFsaWduKTtcbiAgICAgICAgbG9nby5zdHlsZS50b3AgPSBweChsZWZ0QWxpZ24gLyAyKTtcblxuICAgICAgICBmdW5jdGlvbiBhbGlnbk5hdkl0ZW0obmF2SXRlbTogSFRNTEVsZW1lbnQsIG51ZGdlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUubGVmdCA9IHB4KGxlZnRBbGlnbik7XG4gICAgICAgICAgICBuYXZJdGVtLnN0eWxlLnRvcCA9IHB4KGlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWxpZ25OYXZJdGVtKHZpZXdOYXYsIC0yKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKHdvcmtOYXYsIC0xKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGluc3BpcmF0aW9uTmF2LCAwKTtcbiAgICAgICAgYWxpZ25OYXZJdGVtKGV2b2x1dGlvbk5hdiwgMSk7XG4gICAgICAgIGFsaWduTmF2SXRlbShjb25uZWN0TmF2LCAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmdW5jdGlvbiBnb0F3YXkoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KC0xMDAwKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucmlnaHQgPSBweCgtMTAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZ29Bd2F5KGxvZ28pOyAvLyB0ZW1wb3JhcnlcbiAgICAgICAgZ29Bd2F5KHZpZXdOYXYpO1xuICAgICAgICBnb0F3YXkod29ya05hdik7XG4gICAgICAgIGdvQXdheShpbnNwaXJhdGlvbk5hdik7XG4gICAgICAgIGdvQXdheShldm9sdXRpb25OYXYpO1xuICAgICAgICBnb0F3YXkoY29ubmVjdE5hdik7XG4gICAgfVxufSwgW2JvZHlTaWddKTtcblxuZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcHgoaW5uZXJXaWR0aCAtIHgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoKGlubmVySGVpZ2h0IC0gc2Nyb2xsSGVpZ2h0KSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUubGVmdCA9IHB4KHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gZ2V0U2Nyb2xsV2lkdGgoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcHgoc2Nyb2xsV2lkdGgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUubGVmdCA9IHB4KChpbm5lcldpZHRoIC0gc2Nyb2xsV2lkdGgpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS50b3AgPSBweCgwKTtcbiAgICB9XG59LCBbYm9keVNpZ10pO1xuXG4vLyByZXBsYWNlIG5vcm1hbCBzY3JvbGwgYmVoYXZpb3Igd2l0aCB4eSBiZWhhdmlvclxuLy8gc2Nyb2xsQ29udGFpbmVyLm9ud2hlZWwgPSAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gc2Nyb2xsQ29udGFpbmVyLm9udG91Y2htb3ZlID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcblxuLy8gb250b3VjaG1vdmUgPSAoZSkgPT4ge307XG4vLyBvbndoZWVsID0gKGUpID0+IHtcbi8vICAgICBjb25zdCBkZWx0YVhZID0gZS5kZWx0YVggKyBlLmRlbHRhWTtcbi8vICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsQnkoeyBsZWZ0OiBkZWx0YVhZLCB0b3A6IGRlbHRhWFkgfSk7XG4vLyB9O1xuXG5jbGlja0FueU5hdihsb2dvLCBjbGlja05hdlZpZXcpO1xuXG5jbGlja0FueU5hdih2aWV3TmF2LCBjbGlja05hdlZpZXcpO1xuY2xpY2tBbnlOYXYod29ya05hdiwgY2xpY2tOYXZXb3JrKTtcbmNsaWNrQW55TmF2KGluc3BpcmF0aW9uTmF2LCBjbGlja05hdkluc3BpcmF0aW9uKTtcbmNsaWNrQW55TmF2KGV2b2x1dGlvbk5hdiwgY2xpY2tOYXZFdm9sdXRpb24pO1xuY2xpY2tBbnlOYXYoY29ubmVjdE5hdiwgY2xpY2tOYXZDb25uZWN0KTtcblxuc2V0VGltZW91dCgoKSA9PiB2aWV3TmF2LmNsaWNrKCkpO1xuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgPSAwLjAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBmdW5jdGlvbiB0aWNrU3ByaW5nKCkge1xyXG4gICAgICAgIHNwcmluZy50aWNrKDEgLyA2MCk7XHJcbiAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ByaW5nLnRhcmdldCAtIHNwcmluZy5wb3NpdGlvbikgPCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgJiYgTWF0aC5hYnMoc3ByaW5nLnZlbG9jaXR5KSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSkge1xyXG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSBzcHJpbmcudGFyZ2V0O1xyXG4gICAgICAgICAgICBzcHJpbmcudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2tTcHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2tTcHJpbmcoKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vbGF5b3V0XCI7XHJcblxyXG5pbXBvcnQgXCIuL3BhZ2VzL3ZpZXdcIjtcclxuaW1wb3J0IFwiLi9wYWdlcy93b3JrXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvaW5zcGlyYXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9ldm9sdXRpb25cIjtcclxuaW1wb3J0IFwiLi9wYWdlcy9jb25uZWN0XCI7XHJcblxyXG5pbXBvcnQgXCIuL3NoYXJlZFwiO1xyXG5cclxuLy8gY29uc3Qgd2hhdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vIGNvbnN0IHdoYXQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4vLyAgICAgd2hhdC5zdHlsZS53aWR0aCA9IHNlbGYuaW5uZXJXaWR0aCAvIDIgKyBcInB4XCI7XHJcbi8vICAgICB3aGF0LnN0eWxlLmhlaWdodCA9IHNlbGYuaW5uZXJIZWlnaHQgLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdC5zdHlsZS5sZWZ0ID0gMCArIFwicHhcIjtcclxuXHJcbi8vICAgICB3aGF0Mi5zdHlsZS53aWR0aCA9IHNlbGYuaW5uZXJXaWR0aCAvIDIgKyBcInB4XCI7XHJcbi8vICAgICB3aGF0Mi5zdHlsZS5oZWlnaHQgPSBzZWxmLmlubmVySGVpZ2h0IC8gMiArIFwicHhcIjtcclxuLy8gICAgIHdoYXQyLnN0eWxlLmxlZnQgPSBzZWxmLmlubmVyV2lkdGggLyAyICsgXCJweFwiO1xyXG4vLyB9LCAxKTtcclxuLy8gd2hhdC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuLy8gd2hhdDIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbi8vIHdoYXQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XHJcbi8vIHdoYXQyLnN0eWxlLmJhY2tncm91bmQgPSBcImdyZWVuXCI7XHJcbi8vIHdoYXQuc3R5bGUuekluZGV4ID0gXCIxXCI7XHJcbi8vIHdoYXQyLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG5cclxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3aGF0KTtcclxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3aGF0Mik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==