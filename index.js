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
/* harmony export */   fadeInAnimation: () => (/* binding */ fadeInAnimation),
/* harmony export */   gray: () => (/* binding */ gray),
/* harmony export */   ieBlue: () => (/* binding */ ieBlue),
/* harmony export */   ieGreen: () => (/* binding */ ieGreen)
/* harmony export */ });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");


const body = document.body;
const bodySig = (0,_signal__WEBPACK_IMPORTED_MODULE_1__.elementSignal)(body);
const ieBlue = "#609CCE";
const ieGreen = "#bfe021";
const gray = "#808080";
const fadeInAnimation = () => `fadeIn${(0,_layout__WEBPACK_IMPORTED_MODULE_0__.isLandscape)() ? "X" : "Y"} ease 0.6s`;
const SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION = 0.95;


/***/ }),

/***/ "./src/layout.ts":
/*!***********************!*\
  !*** ./src/layout.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignWithGap: () => (/* binding */ alignWithGap),
/* harmony export */   aligningWithGapsX: () => (/* binding */ aligningWithGapsX),
/* harmony export */   aligningWithGapsY: () => (/* binding */ aligningWithGapsY),
/* harmony export */   centerElement: () => (/* binding */ centerElement),
/* harmony export */   isLandscape: () => (/* binding */ isLandscape),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   setHeight: () => (/* binding */ setHeight),
/* harmony export */   setWidth: () => (/* binding */ setWidth),
/* harmony export */   styleText: () => (/* binding */ styleText),
/* harmony export */   yCenterWithGap: () => (/* binding */ yCenterWithGap)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

function px(pixels) {
    return pixels + "px";
}
function alignWithGap(leftElement, rightElement, gap) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.offsetWidth + gap);
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
// ZZZZ want a short hand for common simple use
const aligningWithGapsY = axisAligningWithGaps((element) => element.offsetHeight);
const aligningWithGapsX = axisAligningWithGaps((element) => element.offsetWidth);
function setWidth(element, width) {
    element.style.width = px(width);
    if (element instanceof HTMLImageElement)
        element.style.height = px((width * element.naturalHeight) / element.naturalWidth);
}
function setHeight(element, height) {
    element.style.height = px(height);
    if (element instanceof HTMLImageElement)
        element.style.width = px((height * element.naturalWidth) / element.naturalHeight);
}
function isLandscape() {
    return innerWidth / innerHeight > 1;
}
function yCenterWithGap(elements, gap, center) {
    const elementsWithGaps = (0,_util__WEBPACK_IMPORTED_MODULE_0__.interlaced)(elements, gap);
    const [elementAlignments, totalHeight] = aligningWithGapsY(elementsWithGaps);
    for (const { element, offset } of elementAlignments) {
        element.style.top = px(offset + center - totalHeight / 2);
    }
}
function centerElement(element) {
    element.style.left = px(innerWidth / 2 - element.offsetWidth / 2);
}
function styleText(scrollText, s) {
    scrollText.style.fontFamily = "Spartan";
    scrollText.style.position = "absolute";
    scrollText.style.fontWeight = "" + s.fontWeight;
    scrollText.style.color = s.color;
    scrollText.style.letterSpacing = px(s.letterSpacing);
    scrollText.style.fontSize = px(s.fontSize);
    if (s.width)
        scrollText.style.width = px(s.width);
    scrollText.style.lineHeight = px(s.lineHeight);
}


/***/ }),

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendChildForPage: () => (/* binding */ appendChildForPage),
/* harmony export */   awaitLayoutForImageLoading: () => (/* binding */ awaitLayoutForImageLoading),
/* harmony export */   cleanLastPage: () => (/* binding */ cleanLastPage),
/* harmony export */   pageCleanups: () => (/* binding */ pageCleanups),
/* harmony export */   registerUpdateLayout: () => (/* binding */ registerUpdateLayout)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const pageCleanups = new Set();
const awaitBeforeLayouts = new Set();
const beforeLayouts = new Set();
function awaitLayoutForImageLoading(image) {
    awaitBeforeLayouts.add(image.decode());
}
function registerUpdateLayout(updateLayout) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(awaitBeforeLayouts);
        awaitBeforeLayouts.clear();
        runAllAndClear(beforeLayouts);
        (0,_signal__WEBPACK_IMPORTED_MODULE_1__.effect)(updateLayout, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
        pageCleanups.add(() => _constants__WEBPACK_IMPORTED_MODULE_0__.bodySig.unsubscribe(updateLayout));
        updateLayout();
    });
}
function appendChildForPage(parent, child) {
    beforeLayouts.add(() => {
        parent.appendChild(child);
        pageCleanups.add(() => parent.removeChild(child));
    });
}
function cleanLastPage() {
    runAllAndClear(pageCleanups);
}
function runAllAndClear(set) {
    for (const item of set)
        item();
    set.clear();
}


/***/ }),

/***/ "./src/pages/connect.ts":
/*!******************************!*\
  !*** ./src/pages/connect.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addConnectPage: () => (/* binding */ addConnectPage)
/* harmony export */ });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");



function addIcon(imageSrc, clickLink) {
    const icon = (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)(imageSrc);
    icon.style.cursor = "pointer";
    icon.onclick = () => window.open(clickLink);
    return icon;
}
function addConnectPage() {
    const connect = (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("connect/connect.svg");
    const texts = [
        (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("Our clients look to us for more than award-winning design. They value our role as trusted advisor, support, and confidant."),
        (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("We look for synergy and compatibility in every relationship we build so the work experience doesn’t feel like work at all."),
        (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("If your gut is telling you we should connect, now is the perfect time to email."),
    ];
    const letsMeet = (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("connect/lets-meet.jpg");
    const who = (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.addScrollText)("Bethlyn Krakauer, Founder and Creative Director");
    const instagramIcon = addIcon("connect/instagram-icon.svg", "https://www.instagram.com/iedesigninc");
    const linkedinIcon = addIcon("connect/linkedin-icon.svg", "https://www.linkedin.com/company/i-e-design-inc");
    const mailIcon = addIcon("connect/mail-icon.svg", "mailto:beth@ie-design.com");
    const icons = [instagramIcon, linkedinIcon, mailIcon];
    (0,_page__WEBPACK_IMPORTED_MODULE_1__.registerUpdateLayout)(() => {
        const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.getScrollHeight)();
        const width = 0.55 * s;
        (0,_layout__WEBPACK_IMPORTED_MODULE_0__.setWidth)(connect, width);
        (0,_scroll__WEBPACK_IMPORTED_MODULE_2__.centerWithinScrollY)(letsMeet, 0.8);
        for (const text of texts)
            (0,_layout__WEBPACK_IMPORTED_MODULE_0__.styleText)(text, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width, lineHeight: 0.05 * s });
        (0,_layout__WEBPACK_IMPORTED_MODULE_0__.styleText)(who, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width: 1 * s, lineHeight: 0.05 * s });
        const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.aligningWithGapsY)([
            connect,
            0.09 * s,
            texts[0],
            0.03 * s,
            texts[1],
            0.03 * s,
            texts[2],
        ]);
        for (const { element, offset } of elementAlignments) {
            element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(offset + 0.05 * s);
        }
        letsMeet.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(connect.offsetLeft + connect.offsetWidth + 0.15 * s);
        who.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(letsMeet.offsetLeft);
        who.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(letsMeet.offsetTop + letsMeet.offsetHeight + 0.04 * s);
        for (const icon of icons) {
            icon.width = s * 0.055;
            const lastText = texts[texts.length - 1];
            icon.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(lastText.offsetTop + lastText.offsetHeight + 0.03 * s);
        }
        const [iconAlignments, __] = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.aligningWithGapsX)([instagramIcon, 0.03 * s, linkedinIcon, 0.03 * s, mailIcon]);
        for (const { element, offset } of iconAlignments) {
            element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.px)(offset);
        }
    });
}


/***/ }),

/***/ "./src/pages/evolution.ts":
/*!********************************!*\
  !*** ./src/pages/evolution.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addEvolutionPage: () => (/* binding */ addEvolutionPage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");




function addQuote(quoteText, authorText, titleText) {
    const quote = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)(quoteText);
    quote.style.animation = ""; // can't animate in otherwise close quote bounding box shit gets confused
    const author = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)(authorText);
    const title = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)(titleText);
    const openQuote = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)("“");
    const closeQuote = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)("”");
    return { quote, author, title, openQuote, closeQuote };
}
function styleQuote({ quote, author, title, openQuote, closeQuote }) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    const widthScale = 0.75;
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(quote, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.032 * s, width: widthScale * s, lineHeight: 0.065 * s });
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(author, { letterSpacing: 0.2, fontWeight: 350, color: "#000000", fontSize: 0.035 * s, width: widthScale * s, lineHeight: 0.06 * s });
    author.style.textAlign = "right";
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(title, { letterSpacing: 0.15, fontWeight: 350, color: "#000000", fontSize: 0.025 * s, width: widthScale * s, lineHeight: 0.06 * s });
    title.style.textAlign = "right";
    const quoteTextDetails = { letterSpacing: 0.2, fontWeight: 350, color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieGreen, fontSize: 0.15 * s, width: 0.05 * s, lineHeight: 0.06 * s };
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(openQuote, quoteTextDetails);
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(closeQuote, quoteTextDetails);
}
function layoutQuote({ quote, author, title, openQuote, closeQuote }) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    author.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft);
    title.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft);
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsY)([
        quote,
        0.04 * s,
        author,
        -0.015 * s,
        title,
    ]);
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset + 0.35 * s);
    }
    // this is sorta jank. again, close quote bounding box gets confused
    setTimeout(() => {
        const range = document.createRange();
        range.selectNodeContents(quote);
        const rects = range.getClientRects();
        const scrollContainerRect = _scroll__WEBPACK_IMPORTED_MODULE_3__.scrollContainer.getBoundingClientRect();
        const lastTextLineRect = rects[rects.length - 1];
        const lastRectLeft = lastTextLineRect.left - scrollContainerRect.left + _scroll__WEBPACK_IMPORTED_MODULE_3__.scrollContainer.scrollLeft;
        openQuote.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetLeft - 0.07 * s);
        openQuote.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetTop + 0.05 * s);
        closeQuote.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(lastRectLeft + lastTextLineRect.width);
        closeQuote.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(quote.offsetTop + quote.offsetHeight - 0.01 * s);
    }, 100);
}
function addEvolutionPage() {
    const evolution = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("evolution/evolution.svg");
    const evolutionHistory = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("evolution/evolution-history.svg");
    const logoFull = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("logo-full.svg");
    const promos = [];
    for (let i = 1; i <= 5; i++)
        promos.push((0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)(`evolution/promo-${i}.jpg`));
    const quotes = [
        addQuote("Our annual promo is always grounded in our identity but it's fun to push limits and reinvent ourselves each year. The best part is <strong>hearing what our clients have to say.</strong>", "BETHLYN KRAKAUER", "Founder, i.e. design, inc."),
        addQuote("I love how you do stuff. I'm finding that these types of messages are really <strong>transforming relationships</strong> with people. They are just dreamy.", "DEBRA SCHATZKI", "Founder, BPP Wealth Solutions LLC"),
        addQuote("I see a lot of this special quality in your work. It's not just about being intentional. You always bring in an element of <strong>surprise and delight.</strong>", "JOSH KRAKAUER", "Founder, Sculpt"),
        addQuote("Your approach works so well because it is really <strong>personal</strong> and equally <strong>professional.</strong>", "ANN SULLIVAN", "Founder, Ann Sullivan Organizing"),
        addQuote("You truly understand the unique positioning of a prospective client and are able to <strong>tell their story</strong> exactly as it should be told.", "DAVID YUN", "Principal, Varident LLC"),
        addQuote("Beth is quite frankly one of the <strong>most talented designers</strong> that I have ever had the privilege to work with. She always has a special way of making everything she touches turn to gold!", "DAVID RUSH", "President, ENV"),
    ];
    const scrollPadding = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollPadding)();
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
        const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
        (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(evolution, 0.75);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(evolutionHistory, 0.3 * s);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(logoFull, 0.45 * s);
        for (const promo of promos)
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(promo, 1);
        for (const quote of quotes)
            styleQuote(quote);
        const items = [evolution, 0.2 * s, evolutionHistory];
        const maxLength = Math.max(quotes.length, promos.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < quotes.length)
                items.push(0.3 * s, quotes[i].quote);
            if (i < promos.length)
                items.push(0.3 * s, promos[i]);
        }
        items.push(0.2 * s, scrollPadding);
        const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsX)(items);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
        }
        evolutionHistory.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolution.offsetTop + evolution.offsetHeight - evolutionHistory.offsetHeight);
        logoFull.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolutionHistory.offsetLeft + (evolutionHistory.offsetWidth - logoFull.offsetWidth) / 2);
        logoFull.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolutionHistory.offsetTop - logoFull.offsetHeight - 0.1 * s);
        for (const quote of quotes)
            layoutQuote(quote);
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
/* harmony export */   addInspirationPage: () => (/* binding */ addInspirationPage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");




const INSPIRATION_TILE_WIDTH_PROPORTION = 0.85;
function styleInspirationTile({ image, major, minor, readMore }) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(major, { letterSpacing: 0.6, fontWeight: 400, color: "#000000", fontSize: 0.036 * s, width: INSPIRATION_TILE_WIDTH_PROPORTION * s, lineHeight: 0.09 * s });
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(minor, { letterSpacing: 0.3, fontWeight: 350, color: "#000000", fontSize: 0.027 * s, width: INSPIRATION_TILE_WIDTH_PROPORTION * s, lineHeight: 0.05 * s });
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(readMore, { letterSpacing: 0.5, fontWeight: 400, color: _constants__WEBPACK_IMPORTED_MODULE_0__.ieBlue, fontSize: 0.03 * s, width: INSPIRATION_TILE_WIDTH_PROPORTION * s, lineHeight: 0.05 * s });
    image.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(0.55 * s);
}
function alignInspirationTile({ image, major, minor, readMore }) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
    major.style.left = image.style.left;
    minor.style.left = image.style.left;
    readMore.style.left = image.style.left;
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsY)([
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
    const image = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)(imageString);
    const major = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)(majorText);
    const minor = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)(minorText);
    const readMore = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollText)("Read more");
    return { image, major, minor, readMore };
}
function addInspirationPage() {
    const inspiration = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("inspiration/inspiration.svg");
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
    const scrollPadding = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollPadding)();
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
        const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
        (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(inspiration, 0.75);
        for (const tile of tiles)
            styleInspirationTile(tile);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(inspiration, tiles[0].image, 0.25 * s);
        for (let i = 0; i < tiles.length - 1; i++)
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(tiles[i].image, tiles[i + 1].image, 0.1 * s);
        for (const tile of tiles)
            alignInspirationTile(tile);
        const lastImage = tiles[tiles.length - 1].image;
        scrollPadding.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(lastImage.offsetLeft + lastImage.offsetWidth + 0.1 * s);
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
/* harmony export */   addViewPage: () => (/* binding */ addViewPage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");




function addViewPage() {
    const home = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/home.svg");
    const horizon = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/horizon.jpg");
    const freshLook = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/fresh-look.svg");
    const greatBrands = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/great-brands.jpg");
    const textTile1 = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollTextSquare)("GREAT BRANDS DON'T JUST HAPPEN", "They require exploration, insight, and tenacity. We hunt for that magic spark that ignites innovation. We bring our extensive skills and experience to each project and give it our all. The result is clear, yet elevated communication that makes people stop, think, and often smile.", "Our studio location is profoundly inspiring. The magnificent view feeds our souls and keeps us inspired to do our best work. It's a place where creative people come together to collaborate and drill down to the heart of the matter. To solve problems and bring ideas to life. To create things worth remembering.");
    const insightClarity = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/insight-clarity.jpg");
    const textTile2 = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollTextSquare)("WE BRING VISION, INSIGHT, AND CLARITY TO EVERY PROJECT", "Successful design starts with identifying a client's needs, goals, and aspirations. Our objectivity shines light on what others have missed. We have the ability to see and interpret the inner workings, culture, and nuances of our client's world. We ask questions – lots of questions. Then listen until we gain the deep understanding necessary to build the solid foundation that any enduring brand needs.", "Our small but mighty team brings together a wide range of talents and perspectives, plus a nice list of awards. We throw our hearts into our work and are known for our fierce commitment to the trusted, long-term partnerships we form. For us, it's personal.");
    const skyward = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/skyward.jpg");
    const textTile3 = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollTextSquare)("WE SEE WORK IN A DIFFERENT LIGHT", "People like to ask about our design process. The truth is that the approach to each project varies, because each client and their needs are unique. Creative breakthroughs don't follow the clock. They can happen any time of day – or night. Whether an epiphany is illuminated in a scribble, a dream, or as the clouds roll by, we embrace the fact that each project takes on a life of its own.", "What's constant is our ability to listen and focus, to analyze and connect dots, and to remain curious. The most rewarding projects are with clients who value the balance between pushing forward and allowing time for the perfect solution to emerge. That's our happy place.");
    const textTiles = [textTile1, textTile2, textTile3];
    const scrollPadding = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollPadding)();
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
        const HOME_HORIZON_PAD = 0.2;
        const FRESH_LOOK_PAD = 0.13;
        const IMAGE_TEXT_SQUARE_PAD = 0.17;
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(home, 0.95);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(horizon, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(freshLook, 0.8);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(greatBrands, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(insightClarity, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollY)(skyward, 1);
            const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
            for (const textTile of textTiles)
                (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.styleScrollTextSquare)(textTile, { letterSpacing: 2.2, fontWeight: 400, color: "#B3B3B3", fontSize: 0.065 * s, width: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION * s, lineHeight: 0.09 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#000000", fontSize: 0.03 * s, width: _constants__WEBPACK_IMPORTED_MODULE_0__.SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION * s, lineHeight: 0.05 * s });
            const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsX)([
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
                IMAGE_TEXT_SQUARE_PAD * s,
                scrollPadding,
            ]);
            for (const { element, offset } of elementAlignments) {
                element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
            }
            for (const textTile of textTiles)
                (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.alignScrollTextSquare)(textTile, 20, 20);
        }
        else {
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(home, 0.95);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(horizon, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(freshLook, 0.85);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(greatBrands, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(insightClarity, 1);
            (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(skyward, 1);
            const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollWidth)();
            for (const textTile of textTiles)
                (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.styleScrollTextSquare)(textTile, { letterSpacing: 4, fontWeight: 350, color: "#B3B3B3", fontSize: 0.06 * s, width: 1 * s, lineHeight: 0.08 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#000000", fontSize: 0.028 * s, width: 1 * s, lineHeight: 0.05 * s });
            const TEXT_TILE_WIDTH = 0.85;
            for (const textTile of textTiles) {
                (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(textTile.major, TEXT_TILE_WIDTH);
                for (const minor of textTile.minors)
                    (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.centerWithinScrollX)(minor, TEXT_TILE_WIDTH);
            }
            const MOBILE_PAD = 0.08;
            function mobileTile(textTile) {
                const x = [textTile.major, 0.0 * s];
                for (const minor of textTile.minors)
                    x.push(0.04 * s, minor);
                return x;
            }
            const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsY)([
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
                scrollPadding,
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
/* harmony export */   addWorkPage: () => (/* binding */ addWorkPage)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./src/util.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../signal */ "./src/signal.ts");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../spring */ "./src/spring.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







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
function styleWorkItems(workTabs) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.getScrollHeight)();
    for (const workTab of workTabs) {
        const { workItem } = workTab;
        (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.styleScrollTextSquare)(workItem.textSquare, { letterSpacing: 2.2, fontWeight: 400, color: "#333333", fontSize: 0.065 * s, width: 1 * s, lineHeight: 0.09 * s }, { letterSpacing: 0.2, fontWeight: 300, color: "#333333", fontSize: 0.03 * s, width: 1 * s, lineHeight: 0.05 * s });
        (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.centerWithinScrollY)(workItem.image1, 1);
        (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.centerWithinScrollY)(workItem.image2, 1);
    }
}
function layoutWorkItems(workTabs) {
    const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.getScrollHeight)();
    const items = [];
    for (const workTab of workTabs) {
        const { workItem } = workTab;
        items.push(workItem.textSquare.major, //
        0.2 * s, workItem.image1, 0.15 * s, workItem.image2, 0.22 * s);
    }
    const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.aligningWithGapsX)(items);
    for (const { element, offset } of elementAlignments) {
        element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(offset);
    }
    for (const workTab of workTabs)
        (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.alignScrollTextSquare)(workTab.workItem.textSquare, 0.01 * s, 0.01 * s);
}
function addWorkPage() {
    const workTabs = [];
    // function tabAlignment(tabElement: HTMLImageElement) {
    //     const { width, height } = tabElementSize(tabElement);
    //     return {
    //         centered: () => (innerHeight - height) / 2,
    //         halfSquare: () => innerHeight - width / 2,
    //         square: () => innerHeight - width,
    //     };
    // }
    _scroll__WEBPACK_IMPORTED_MODULE_4__.scrollContainer.style.scrollbarWidth = "none";
    _page__WEBPACK_IMPORTED_MODULE_3__.pageCleanups.add(() => (_scroll__WEBPACK_IMPORTED_MODULE_4__.scrollContainer.style.scrollbarWidth = ""));
    let tabsShowing = true;
    let currentWorkItem;
    for (let i = 0; i < workContents.length; i++) {
        const workContent = workContents[i];
        const tabElement = document.createElement("img");
        tabElement.style.position = "absolute";
        tabElement.style.visibility = "hidden";
        tabElement.src = `work/${(0,_util__WEBPACK_IMPORTED_MODULE_0__.spaceToFile)(workContent.name)}/tab.png`;
        (0,_page__WEBPACK_IMPORTED_MODULE_3__.awaitLayoutForImageLoading)(tabElement);
        (0,_page__WEBPACK_IMPORTED_MODULE_3__.appendChildForPage)(_constants__WEBPACK_IMPORTED_MODULE_1__.body, tabElement);
        const spring = new _spring__WEBPACK_IMPORTED_MODULE_6__.Spring(0);
        const springSig = new _signal__WEBPACK_IMPORTED_MODULE_5__.Signal();
        spring.setStiffnessCritical(300);
        let isHovered = false;
        function updateTabPositions() {
            for (const workTab of workTabs) {
                function setSpringTarget(target) {
                    workTab.spring.target = target;
                    (0,_spring__WEBPACK_IMPORTED_MODULE_6__.animateSpring)(workTab.spring, workTab.springSig);
                }
                if (tabsShowing) {
                    if (isHovered)
                        setSpringTarget(100);
                    else
                        setSpringTarget(200);
                }
                else {
                    if (isHovered || currentWorkItem === workTab.workItem)
                        setSpringTarget(300);
                    else
                        setSpringTarget(400);
                }
            }
        }
        tabElement.onmouseover = () => {
            isHovered = true;
            updateTabPositions();
        };
        tabElement.onmouseleave = () => {
            isHovered = false;
            updateTabPositions();
        };
        function onFirstClick() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < workTabs.length; i++) {
                    const workContent = workContents[i];
                    const textSquare = (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.addScrollTextSquare)(workContent.name.toUpperCase(), ...workContent.description);
                    const image1 = (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.addScrollImage)(`work/${(0,_util__WEBPACK_IMPORTED_MODULE_0__.spaceToFile)(workContent.name)}/1.jpg`);
                    const image2 = (0,_scroll__WEBPACK_IMPORTED_MODULE_4__.addScrollImage)(`work/${(0,_util__WEBPACK_IMPORTED_MODULE_0__.spaceToFile)(workContent.name)}/2.jpg`);
                    workTabs[i].workItem = { textSquare, image1, image2 };
                }
                _scroll__WEBPACK_IMPORTED_MODULE_4__.scrollContainer.addEventListener("scroll", () => {
                    for (const workTab of workTabs) {
                        const lastImage = workTab.workItem.image2;
                        if (_scroll__WEBPACK_IMPORTED_MODULE_4__.scrollContainer.scrollLeft < lastImage.offsetLeft + lastImage.offsetWidth) {
                            currentWorkItem = workTab.workItem;
                            break;
                        }
                    }
                    updateTabPositions();
                });
                function selectWorkTab(workTab) {
                    const scrollPosition = workTab.workItem.textSquare.major.offsetLeft;
                    _scroll__WEBPACK_IMPORTED_MODULE_4__.scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
                }
                for (const workTab of workTabs)
                    workTab.tabElement.onclick = () => selectWorkTab(workTab);
                tabsShowing = false;
                updateTabPositions();
                yield (0,_page__WEBPACK_IMPORTED_MODULE_3__.registerUpdateLayout)(() => {
                    styleWorkItems(workTabs);
                    layoutWorkItems(workTabs);
                });
                selectWorkTab(workTabs[i]);
            });
        }
        tabElement.onclick = onFirstClick;
        const timeoutHandle = setTimeout(() => {
            tabElement.style.visibility = "visible";
            // spring.position = innerHeight;
            // animateSpring(spring, springSig);
        }, 80 * i);
        _page__WEBPACK_IMPORTED_MODULE_3__.pageCleanups.add(() => clearInterval(timeoutHandle));
        workTabs.push({ tabElement, spring, springSig, workItem: undefined });
        (0,_signal__WEBPACK_IMPORTED_MODULE_5__.effect)(() => {
            tabElement.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(spring.position);
        }, [springSig]);
    }
    (0,_page__WEBPACK_IMPORTED_MODULE_3__.registerUpdateLayout)(() => {
        const start = 300;
        const end = innerWidth - 150;
        const anyTabElement = workTabs[0].tabElement;
        const width = (end - start) / (workTabs.length * 2 - 1);
        const height = width * (anyTabElement.naturalHeight / anyTabElement.naturalWidth);
        for (let i = 0; i < workTabs.length; i++) {
            const { tabElement } = workTabs[i];
            const heightLowerLimit = innerHeight * 0.8;
            if (height < heightLowerLimit) {
                tabElement.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(width);
                tabElement.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(height);
            }
            else {
                tabElement.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(heightLowerLimit);
                tabElement.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(heightLowerLimit * (tabElement.naturalWidth / tabElement.naturalHeight));
            }
        }
        for (let i = 0; i < workTabs.length; i++) {
            workTabs[i].tabElement.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(start + i * width * 2);
        }
    });
}


/***/ }),

/***/ "./src/scroll.ts":
/*!***********************!*\
  !*** ./src/scroll.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addScrollImage: () => (/* binding */ addScrollImage),
/* harmony export */   addScrollPadding: () => (/* binding */ addScrollPadding),
/* harmony export */   addScrollText: () => (/* binding */ addScrollText),
/* harmony export */   addScrollTextSquare: () => (/* binding */ addScrollTextSquare),
/* harmony export */   alignScrollTextSquare: () => (/* binding */ alignScrollTextSquare),
/* harmony export */   centerWithinScrollX: () => (/* binding */ centerWithinScrollX),
/* harmony export */   centerWithinScrollY: () => (/* binding */ centerWithinScrollY),
/* harmony export */   getScrollHeight: () => (/* binding */ getScrollHeight),
/* harmony export */   getScrollWidth: () => (/* binding */ getScrollWidth),
/* harmony export */   scrollContainer: () => (/* binding */ scrollContainer),
/* harmony export */   styleScrollTextSquare: () => (/* binding */ styleScrollTextSquare)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");




const scrollContainer = document.createElement("div");
scrollContainer.style.position = "absolute";
_constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(scrollContainer);
scrollContainer.style.scrollbarColor = `${_constants__WEBPACK_IMPORTED_MODULE_0__.ieGreen} ${_constants__WEBPACK_IMPORTED_MODULE_0__.ieBlue}55`;
scrollContainer.onwheel = (e) => {
    scrollContainer.scrollBy({ left: e.deltaY });
};
function addScrollPadding() {
    const scrollPadding = document.createElement("div");
    scrollPadding.style.position = "absolute";
    scrollPadding.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(1); // any nonzero thickness is enough to extend scrollContainer
    scrollPadding.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(1);
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.appendChildForPage)(scrollContainer, scrollPadding);
    return scrollPadding;
}
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.awaitLayoutForImageLoading)(scrollImage);
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.appendChildForPage)(scrollContainer, scrollImage);
    return scrollImage;
}
function addScrollText(text) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.appendChildForPage)(scrollContainer, scrollText);
    return scrollText;
}
function addScrollTextSquare(majorText, ...minorTexts) {
    const major = addScrollText(majorText);
    const minors = minorTexts.map(addScrollText);
    return { major, minors };
}
function styleScrollTextSquare({ major, minors }, majorTextDetails, minorTextDetails) {
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(major, majorTextDetails);
    for (const minor of minors)
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(minor, minorTextDetails);
}
(0,_signal__WEBPACK_IMPORTED_MODULE_3__.effect)(() => {
    if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
        const x = 280;
        const scrollHeight = getScrollHeight();
        const underScrollContainer = (innerHeight - scrollHeight) / 2;
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(scrollHeight + underScrollContainer); // place scroll bar at bottom of page
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth - x);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(x);
        scrollContainer.style.overflowX = "scroll";
        scrollContainer.style.overflowY = "hidden";
        scrollContainer.scrollTop = 0;
    }
    else {
        const scrollWidth = getScrollWidth();
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(scrollWidth);
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(0);
        scrollContainer.style.overflowX = "hidden";
        scrollContainer.style.overflowY = "scroll";
        scrollContainer.scrollLeft = 0;
    }
}, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
function getScrollHeight() {
    // return innerHeight * 0.7;
    return 1.02 * innerHeight - 0.000485 * innerHeight * innerHeight;
}
function getScrollWidth() {
    const SCROLL_WIDTH_PROPORTION = 1;
    return innerWidth * SCROLL_WIDTH_PROPORTION;
}
function alignScrollTextSquare({ major, minors }, majorToMinorGap, betweenMinorsGap) {
    const items = [];
    items.push(major, majorToMinorGap);
    for (const minor of minors) {
        items.push(minor, betweenMinorsGap);
    }
    items.pop(); // remove final gap, only want betweens
    const scrollHeight = getScrollHeight();
    const [elementAlignments, totalHeight] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.aligningWithGapsY)(items);
    const groupTop = (scrollHeight - totalHeight) / 2;
    for (const { element, offset } of elementAlignments) {
        element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(groupTop + offset);
    }
    for (const minor of minors) {
        minor.style.left = major.style.left;
    }
}
function centerWithinScrollY(element, scale) {
    const s = getScrollHeight();
    const height = s * scale;
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(element, height);
    element.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((s - height) / 2);
}
function centerWithinScrollX(element, scale) {
    const s = getScrollWidth();
    const width = s * scale;
    (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setWidth)(element, width);
    element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((s - width) / 2);
}


/***/ }),

/***/ "./src/signal.ts":
/*!***********************!*\
  !*** ./src/signal.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signal: () => (/* binding */ Signal),
/* harmony export */   effect: () => (/* binding */ effect),
/* harmony export */   elementSignal: () => (/* binding */ elementSignal)
/* harmony export */ });
class Signal {
    constructor() {
        this.subscribers = new Set();
    }
    subscribe(subscriber) {
        this.subscribers.add(subscriber);
    }
    update() {
        this.subscribers.forEach((s) => s());
    }
    unsubscribe(subscriber) {
        this.subscribers.delete(subscriber);
    }
}
function effect(func, observedSignals) {
    observedSignals.forEach((o) => o.subscribe(func));
    func();
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
        this.onRest = () => { };
        this.onUnrest = () => { };
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
    spring.onUnrest();
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
            spring.onRest();
            return;
        }
        requestAnimationFrame(tickSpring);
    }
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorOnHover: () => (/* binding */ colorOnHover),
/* harmony export */   createElementSVG: () => (/* binding */ createElementSVG),
/* harmony export */   interlaced: () => (/* binding */ interlaced),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   setAttributes: () => (/* binding */ setAttributes),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   spaceToFile: () => (/* binding */ spaceToFile)
/* harmony export */ });
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
function spaceToFile(s) {
    return s.replace(" ", "-");
}
function createElementSVG(qualifiedName) {
    return document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
}
function interlaced(items, within) {
    const itemsInterlaced = [];
    for (const item of items) {
        itemsInterlaced.push(item);
        itemsInterlaced.push(within);
    }
    itemsInterlaced.pop();
    return itemsInterlaced;
}
function mapRange(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
function colorOnHover(element, color, hoverColor) {
    element.style.color = color;
    element.onmouseover = () => (element.style.color = hoverColor);
    element.onmouseleave = () => (element.style.color = color);
    element.style.transition = "color 0.2s ease-out";
}
function setAttributes(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
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
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scroll */ "./src/scroll.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./spring */ "./src/spring.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};












// TODO
// strange second scrollbar on mobile
// mobile layouts
// blog pages
// timeline
// nav item styling
// work page
// image click
// hit end of scroll, next page
// simpler rectangle scroll bar
// "view" start animation
const pages = {
    view: _pages_view__WEBPACK_IMPORTED_MODULE_7__.addViewPage,
    work: _pages_work__WEBPACK_IMPORTED_MODULE_8__.addWorkPage,
    inspiration: _pages_inspiration__WEBPACK_IMPORTED_MODULE_6__.addInspirationPage,
    evolution: _pages_evolution__WEBPACK_IMPORTED_MODULE_5__.addEvolutionPage,
    connect: _pages_connect__WEBPACK_IMPORTED_MODULE_4__.addConnectPage,
};
const navElementFromString = {};
const edgeAlignX = () => innerHeight * 0.1;
const edgeAlignY = () => innerHeight * 0.1;
const headerIconSize = () => innerHeight * 0.06;
function animateIntro() {
    return __awaiter(this, void 0, void 0, function* () {
        // ZZZZ clean this up
        const response = yield fetch("logo-full.svg");
        const svgContent = yield response.text();
        const svg = new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement;
        svg.style.position = "absolute";
        svg.style.opacity = "0";
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(svg);
        svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight * 0.4);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(1000);
        const svgSpring = new _spring__WEBPACK_IMPORTED_MODULE_11__.Spring(0);
        svgSpring.setStiffnessCritical(80);
        const svgSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_10__.Signal();
        (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
            svg.style.opacity = "" + svgSpring.position;
            svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)((1.3 - svgSpring.position) * innerHeight);
            svg.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)((innerHeight - svg.scrollHeight) / 2);
            svg.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)((innerWidth - svg.scrollWidth) / 2);
        }, [svgSpringSig]);
        svgSpring.target = 1;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(svgSpring, svgSpringSig);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(1000);
        const d = "design";
        function opacityOut(element) {
            const letterSpring = new _spring__WEBPACK_IMPORTED_MODULE_11__.Spring(1);
            letterSpring.setStiffnessCritical(150);
            const letterSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_10__.Signal();
            (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
                element.style.opacity = "" + letterSpring.position;
            }, [letterSpringSig]);
            letterSpring.target = 0;
            (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(letterSpring, letterSpringSig);
        }
        for (let i = 0; i < d.length; i++) {
            const designLetter = svg.getElementById("design-" + d[i]);
            opacityOut(designLetter);
            yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(120);
        }
        const l = ["big-i", "dot-1", "big-e", "dot-2"];
        for (let i = 0; i < l.length; i++) {
            const designLetter = svg.getElementById(l[i]);
            opacityOut(designLetter);
            yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(120);
        }
        yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(1000);
        svgSpring.target = 0;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(svgSpring, svgSpringSig);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_0__.sleep)(500);
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.removeChild(svg);
    });
}
function addMenuButton() {
    const menuButton = (0,_util__WEBPACK_IMPORTED_MODULE_0__.createElementSVG)("svg");
    menuButton.style.position = "absolute";
    menuButton.style.cursor = "pointer";
    menuButton.style.zIndex = "1";
    menuButton.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.fadeInAnimation)();
    const strokeWidth = 4;
    const pad = 4;
    const sz = 60;
    menuButton.setAttribute("viewBox", `${-pad} ${-pad} ${sz + 2 * pad} ${sz + 2 * pad}`);
    function menuLine(y) {
        const line = (0,_util__WEBPACK_IMPORTED_MODULE_0__.createElementSVG)("line");
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.setAttributes)(line, { "stroke-width": strokeWidth });
        menuButton.appendChild(line);
        return line;
    }
    const line1 = menuLine(strokeWidth / 2 + 1);
    const line2 = menuLine(sz / 2);
    const line3 = menuLine(sz - strokeWidth / 2 - 1);
    const menuSpring = new _spring__WEBPACK_IMPORTED_MODULE_11__.Spring(0);
    menuSpring.setStiffnessCritical(120);
    const menuSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_10__.Signal();
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        const s = menuSpring.position * sz;
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.setAttributes)(line1, { x1: 0, y1: 0, x2: sz, y2: s });
        line2.style.opacity = (sz - s) / sz + "";
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.setAttributes)(line2, { x1: 0, y1: sz / 2, x2: sz, y2: sz / 2 });
        (0,_util__WEBPACK_IMPORTED_MODULE_0__.setAttributes)(line3, { x1: 0, y1: sz, x2: sz, y2: sz - s });
    }, [menuSpringSig]);
    let isOpeningMenu = false;
    menuButton.onclick = () => {
        if (isOpeningMenu)
            beginCloseMenu();
        else
            beginOpenMenu();
    };
    menuSpring.onUnrest = () => {
        if (menuSpring.position === 0)
            openMenu();
    };
    let closeMenu;
    menuSpring.onRest = () => {
        if (menuSpring.position === 0 && closeMenu)
            closeMenu();
    };
    function beginOpenMenu() {
        menuButton.style.stroke = _constants__WEBPACK_IMPORTED_MODULE_1__.gray;
        menuSpring.target = 1;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(menuSpring, menuSpringSig);
        isOpeningMenu = true;
    }
    function beginCloseMenu() {
        menuButton.style.stroke = "#bbbbbb";
        menuSpring.target = 0;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(menuSpring, menuSpringSig);
        isOpeningMenu = false;
    }
    beginCloseMenu();
    function openMenu() {
        const menu = document.createElement("div");
        menu.style.position = "fixed";
        menu.style.backgroundColor = "#000000ee";
        menu.style.pointerEvents = "none";
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(menu);
        const menuPageNavs = [];
        for (const [pageName, navElement] of Object.entries(navElementFromString)) {
            const menuPageNav = document.createElement("span");
            menuPageNav.style.position = "absolute";
            menuPageNav.innerText = pageName.toUpperCase();
            menuPageNav.style.fontFamily = "Spartan";
            menuPageNav.style.fontWeight = "500";
            menuPageNav.style.cursor = "pointer";
            (0,_util__WEBPACK_IMPORTED_MODULE_0__.colorOnHover)(menuPageNav, _constants__WEBPACK_IMPORTED_MODULE_1__.gray, "white");
            menuPageNav.onclick = () => {
                beginCloseMenu();
                navElement.click();
            };
            _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(menuPageNav);
            menuPageNavs.push(menuPageNav);
        }
        function animateMenuOpacity() {
            for (const e of [menu, ...menuPageNavs])
                e.style.opacity = menuSpring.position + "";
        }
        (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(animateMenuOpacity, [menuSpringSig]);
        const layoutMenu = () => {
            menu.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerWidth);
            menu.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight);
            for (const menuPageNav of menuPageNavs) {
                menuPageNav.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight * 0.05);
                (0,_layout__WEBPACK_IMPORTED_MODULE_2__.centerElement)(menuPageNav);
            }
            (0,_layout__WEBPACK_IMPORTED_MODULE_2__.yCenterWithGap)(menuPageNavs, innerHeight * 0.08, innerHeight / 2);
        };
        (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(layoutMenu, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
        closeMenu = () => {
            _constants__WEBPACK_IMPORTED_MODULE_1__.bodySig.unsubscribe(layoutMenu);
            menuSpringSig.unsubscribe(animateMenuOpacity);
            for (const menuPageNav of menuPageNavs)
                _constants__WEBPACK_IMPORTED_MODULE_1__.body.removeChild(menuPageNav);
            _constants__WEBPACK_IMPORTED_MODULE_1__.body.removeChild(menu);
        };
    }
    _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(menuButton);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        const size = headerIconSize();
        menuButton.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(size);
        menuButton.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(size);
        const fromEdge = _scroll__WEBPACK_IMPORTED_MODULE_9__.scrollContainer.offsetTop / 2 - size / 2;
        menuButton.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerWidth - size - edgeAlignX());
        menuButton.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(fromEdge);
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function addNavItems() {
    for (const [pageName, addPage] of Object.entries(pages)) {
        const navElement = document.createElement("div");
        navElement.innerHTML = pageName.toUpperCase();
        navElement.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.fadeInAnimation)();
        navElement.style.position = "absolute";
        navElement.style.fontFamily = "Spartan";
        navElement.style.color = _constants__WEBPACK_IMPORTED_MODULE_1__.gray;
        navElement.style.fontWeight = "500";
        navElement.style.cursor = "pointer";
        navElement.onclick = () => {
            (0,_page__WEBPACK_IMPORTED_MODULE_3__.cleanLastPage)();
            for (const navElement of Object.values(navElements))
                navElement.style.color = _constants__WEBPACK_IMPORTED_MODULE_1__.gray;
            navElement.style.color = "#000000";
            addPage();
            // history.pushState({}, "", "/#/" + pageName);
        };
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(navElement);
        navElementFromString[pageName] = navElement;
    }
    const navElements = Object.values(navElementFromString);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_2__.isLandscape)()) {
            const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getScrollHeight)();
            function alignNavItem(navItem, nudge) {
                navItem.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
                navItem.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
            }
            for (let i = 0; i < navElements.length; i++) {
                const navItem = navElements[i];
                alignNavItem(navItem, i - 2);
                navItem.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(s * 0.025);
            }
        }
        else {
            function goAway(element) {
                element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(-1000);
                element.style.right = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(-1000);
            }
            for (let i = 0; i < navElements.length; i++)
                goAway(navElements[i]);
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function addLogo() {
    const logo = document.createElement("img");
    logo.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.fadeInAnimation)();
    logo.style.position = "absolute";
    logo.style.cursor = "pointer";
    logo.src = "logo.svg";
    _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(logo);
    logo.onclick = () => {
        navElementFromString.view.click();
        const pulse = document.createElement("div");
        pulse.style.position = "absolute";
        pulse.style.background = _constants__WEBPACK_IMPORTED_MODULE_1__.ieGreen;
        pulse.style.pointerEvents = "none";
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(pulse);
        const pulseSpring = new _spring__WEBPACK_IMPORTED_MODULE_11__.Spring(0);
        pulseSpring.setStiffnessCritical(40);
        const pulseSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_10__.Signal();
        pulseSpring.target = 1;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(pulseSpring, pulseSpringSig);
        function animatePulse() {
            const s = pulseSpring.position;
            const out = 30;
            pulse.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(logo.offsetLeft - s * out);
            pulse.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(logo.offsetTop - s * out);
            pulse.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(logo.offsetWidth + s * 2 * out);
            pulse.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(logo.offsetHeight + s * 2 * out);
            pulse.style.opacity = 1 - s + "";
        }
        pulseSpring.onRest = () => {
            pulseSpringSig.unsubscribe(animatePulse);
            _constants__WEBPACK_IMPORTED_MODULE_1__.body.removeChild(pulse);
        };
        (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(animatePulse, [pulseSpringSig]);
    };
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        const size = headerIconSize();
        logo.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(size);
        logo.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(size);
        const fromTop = _scroll__WEBPACK_IMPORTED_MODULE_9__.scrollContainer.offsetTop / 2 - size / 2;
        logo.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
        logo.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(fromTop);
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function addCopyright() {
    const copyright = document.createElement("span");
    copyright.style.position = "absolute";
    copyright.innerText = "©2025 i.e. design, inc.";
    (0,_layout__WEBPACK_IMPORTED_MODULE_2__.styleText)(copyright, { letterSpacing: 0.3, fontWeight: 500, color: _constants__WEBPACK_IMPORTED_MODULE_1__.gray, fontSize: 10, lineHeight: 20 });
    _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(copyright);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_2__.isLandscape)()) {
            copyright.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
            copyright.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight * 0.9);
        }
        else {
            // ZZZZ do it
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function setup() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const pageName = location.hash.substring("#/".length);
        // if (pageName === "") await animateIntro();
        addMenuButton();
        addNavItems();
        addLogo();
        addCopyright();
        const pageNavElement = (_a = navElementFromString[pageName]) !== null && _a !== void 0 ? _a : navElementFromString.view;
        pageNavElement.click();
    });
}
setup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXpHLDRDQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTVCLGdEQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1IsSUFBSSxvREFBVyxFQUFFLEVBQUU7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRywyQ0FBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsMkNBQUUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNILGFBQWE7U0FDaEI7SUFDTCxDQUFDLEVBQUUsQ0FBQywrQ0FBTyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBZSxLQUFLOzs7UUFDaEIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELDZDQUE2QztRQUM3QyxhQUFhLEVBQUUsQ0FBQztRQUNoQixXQUFXLEVBQUUsQ0FBQztRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWSxFQUFFLENBQUM7UUFFZixNQUFNLGNBQWMsR0FBRywwQkFBb0IsQ0FBQyxRQUFRLENBQUMsbUNBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBQ25GLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Q0FDMUI7QUFDRCxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZS50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9jb25uZWN0LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2V2b2x1dGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9pbnNwaXJhdGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy92aWV3LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3dvcmsudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2Nyb2xsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NpZ25hbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zcHJpbmcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzTGFuZHNjYXBlIH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBlbGVtZW50U2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5cbmV4cG9ydCBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbmV4cG9ydCBjb25zdCBib2R5U2lnID0gZWxlbWVudFNpZ25hbChib2R5KTtcblxuZXhwb3J0IGNvbnN0IGllQmx1ZSA9IFwiIzYwOUNDRVwiO1xuZXhwb3J0IGNvbnN0IGllR3JlZW4gPSBcIiNiZmUwMjFcIjtcbmV4cG9ydCBjb25zdCBncmF5ID0gXCIjODA4MDgwXCI7XG5cbmV4cG9ydCBjb25zdCBmYWRlSW5BbmltYXRpb24gPSAoKSA9PiBgZmFkZUluJHtpc0xhbmRzY2FwZSgpID8gXCJYXCIgOiBcIllcIn0gZWFzZSAwLjZzYDtcblxuZXhwb3J0IGNvbnN0IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OID0gMC45NTtcbiIsImltcG9ydCB7IGludGVybGFjZWQgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmludGVyZmFjZSBFbGVtZW50QWxpZ25tZW50IHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZXh0RGV0YWlscyB7XG4gICAgbGV0dGVyU3BhY2luZzogbnVtYmVyO1xuICAgIGZvbnRXZWlnaHQ6IG51bWJlcjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgbGluZUhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHgocGl4ZWxzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGl4ZWxzICsgXCJweFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25XaXRoR2FwKGxlZnRFbGVtZW50OiBIVE1MRWxlbWVudCwgcmlnaHRFbGVtZW50OiBIVE1MRWxlbWVudCwgZ2FwOiBudW1iZXIpIHtcbiAgICByaWdodEVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KGxlZnRFbGVtZW50Lm9mZnNldExlZnQgKyBsZWZ0RWxlbWVudC5vZmZzZXRXaWR0aCArIGdhcCk7XG59XG5cbmZ1bmN0aW9uIGF4aXNBbGlnbmluZ1dpdGhHYXBzKGF4aXNTaXplOiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IG51bWJlcikge1xuICAgIHJldHVybiAoZWxlbWVudE9yR2FwczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdKTogW0VsZW1lbnRBbGlnbm1lbnRbXSwgbnVtYmVyXSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRBbGlnbm1lbnRzID0gW107XG4gICAgICAgIGxldCBydW5uaW5nVG90YWwgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnRPckdhcCBvZiBlbGVtZW50T3JHYXBzKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudE9yR2FwIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50QWxpZ25tZW50cy5wdXNoKHsgZWxlbWVudDogZWxlbWVudE9yR2FwLCBvZmZzZXQ6IHJ1bm5pbmdUb3RhbCB9KTtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gYXhpc1NpemUoZWxlbWVudE9yR2FwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGVsZW1lbnRPckdhcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2VsZW1lbnRBbGlnbm1lbnRzLCBydW5uaW5nVG90YWxdO1xuICAgIH07XG59XG5cbi8vIFpaWlogd2FudCBhIHNob3J0IGhhbmQgZm9yIGNvbW1vbiBzaW1wbGUgdXNlXG5leHBvcnQgY29uc3QgYWxpZ25pbmdXaXRoR2Fwc1kgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuZXhwb3J0IGNvbnN0IGFsaWduaW5nV2l0aEdhcHNYID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQub2Zmc2V0V2lkdGgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQsIHdpZHRoOiBudW1iZXIpIHtcbiAgICBlbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweCgod2lkdGggKiBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpIC8gZWxlbWVudC5uYXR1cmFsV2lkdGgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldEhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodCk7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSBlbGVtZW50LnN0eWxlLndpZHRoID0gcHgoKGhlaWdodCAqIGVsZW1lbnQubmF0dXJhbFdpZHRoKSAvIGVsZW1lbnQubmF0dXJhbEhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xhbmRzY2FwZSgpIHtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAvIGlubmVySGVpZ2h0ID4gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHlDZW50ZXJXaXRoR2FwKGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdLCBnYXA6IG51bWJlciwgY2VudGVyOiBudW1iZXIpIHtcbiAgICBjb25zdCBlbGVtZW50c1dpdGhHYXBzID0gaW50ZXJsYWNlZChlbGVtZW50cywgZ2FwKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IGFsaWduaW5nV2l0aEdhcHNZKGVsZW1lbnRzV2l0aEdhcHMpO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgY2VudGVyIC0gdG90YWxIZWlnaHQgLyAyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAvIDIgLSBlbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVRleHQoc2Nyb2xsVGV4dDogSFRNTEVsZW1lbnQsIHM6IFRleHREZXRhaWxzKSB7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSBcIlwiICsgcy5mb250V2VpZ2h0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuY29sb3IgPSBzLmNvbG9yO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGV0dGVyU3BhY2luZyA9IHB4KHMubGV0dGVyU3BhY2luZyk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250U2l6ZSA9IHB4KHMuZm9udFNpemUpO1xuICAgIGlmIChzLndpZHRoKSBzY3JvbGxUZXh0LnN0eWxlLndpZHRoID0gcHgocy53aWR0aCk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5saW5lSGVpZ2h0ID0gcHgocy5saW5lSGVpZ2h0KTtcbn1cbiIsImltcG9ydCB7IGJvZHlTaWcgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgcGFnZUNsZWFudXBzID0gbmV3IFNldDwoKSA9PiB2b2lkPigpO1xuXG5jb25zdCBhd2FpdEJlZm9yZUxheW91dHMgPSBuZXcgU2V0PFByb21pc2U8dm9pZD4+KCk7XG5jb25zdCBiZWZvcmVMYXlvdXRzID0gbmV3IFNldDwoKSA9PiB2b2lkPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcoaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICBhd2FpdEJlZm9yZUxheW91dHMuYWRkKGltYWdlLmRlY29kZSgpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KHVwZGF0ZUxheW91dDogKCkgPT4gdm9pZCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGF3YWl0QmVmb3JlTGF5b3V0cyk7XG4gICAgYXdhaXRCZWZvcmVMYXlvdXRzLmNsZWFyKCk7XG4gICAgcnVuQWxsQW5kQ2xlYXIoYmVmb3JlTGF5b3V0cyk7XG5cbiAgICBlZmZlY3QodXBkYXRlTGF5b3V0LCBbYm9keVNpZ10pO1xuICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gYm9keVNpZy51bnN1YnNjcmliZSh1cGRhdGVMYXlvdXQpKTtcblxuICAgIHVwZGF0ZUxheW91dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGRGb3JQYWdlKHBhcmVudDogSFRNTEVsZW1lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCkge1xuICAgIGJlZm9yZUxheW91dHMuYWRkKCgpID0+IHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuTGFzdFBhZ2UoKSB7XG4gICAgcnVuQWxsQW5kQ2xlYXIocGFnZUNsZWFudXBzKTtcbn1cblxuZnVuY3Rpb24gcnVuQWxsQW5kQ2xlYXIoc2V0OiBTZXQ8KCkgPT4gdm9pZD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2V0KSBpdGVtKCk7XG4gICAgc2V0LmNsZWFyKCk7XG59XG4iLCJpbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgYWxpZ25pbmdXaXRoR2Fwc1ksIHB4LCBzZXRXaWR0aCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJVcGRhdGVMYXlvdXQgfSBmcm9tIFwiLi4vcGFnZVwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCB9IGZyb20gXCIuLi9zY3JvbGxcIjtcblxuZnVuY3Rpb24gYWRkSWNvbihpbWFnZVNyYzogc3RyaW5nLCBjbGlja0xpbms6IHN0cmluZykge1xuICAgIGNvbnN0IGljb24gPSBhZGRTY3JvbGxJbWFnZShpbWFnZVNyYyk7XG4gICAgaWNvbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICBpY29uLm9uY2xpY2sgPSAoKSA9PiB3aW5kb3cub3BlbihjbGlja0xpbmspO1xuICAgIHJldHVybiBpY29uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29ubmVjdFBhZ2UoKSB7XG4gICAgY29uc3QgY29ubmVjdCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9jb25uZWN0LnN2Z1wiKTtcbiAgICBjb25zdCB0ZXh0cyA9IFtcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIk91ciBjbGllbnRzIGxvb2sgdG8gdXMgZm9yIG1vcmUgdGhhbiBhd2FyZC13aW5uaW5nIGRlc2lnbi4gVGhleSB2YWx1ZSBvdXIgcm9sZSBhcyB0cnVzdGVkIGFkdmlzb3IsIHN1cHBvcnQsIGFuZCBjb25maWRhbnQuXCIpLFxuICAgICAgICBhZGRTY3JvbGxUZXh0KFwiV2UgbG9vayBmb3Igc3luZXJneSBhbmQgY29tcGF0aWJpbGl0eSBpbiBldmVyeSByZWxhdGlvbnNoaXAgd2UgYnVpbGQgc28gdGhlIHdvcmsgZXhwZXJpZW5jZSBkb2VzbuKAmXQgZmVlbCBsaWtlIHdvcmsgYXQgYWxsLlwiKSxcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIklmIHlvdXIgZ3V0IGlzIHRlbGxpbmcgeW91IHdlIHNob3VsZCBjb25uZWN0LCBub3cgaXMgdGhlIHBlcmZlY3QgdGltZSB0byBlbWFpbC5cIiksXG4gICAgXTtcbiAgICBjb25zdCBsZXRzTWVldCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9sZXRzLW1lZXQuanBnXCIpO1xuICAgIGNvbnN0IHdobyA9IGFkZFNjcm9sbFRleHQoXCJCZXRobHluIEtyYWthdWVyLCBGb3VuZGVyIGFuZCBDcmVhdGl2ZSBEaXJlY3RvclwiKTtcblxuICAgIGNvbnN0IGluc3RhZ3JhbUljb24gPSBhZGRJY29uKFwiY29ubmVjdC9pbnN0YWdyYW0taWNvbi5zdmdcIiwgXCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2llZGVzaWduaW5jXCIpO1xuICAgIGNvbnN0IGxpbmtlZGluSWNvbiA9IGFkZEljb24oXCJjb25uZWN0L2xpbmtlZGluLWljb24uc3ZnXCIsIFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvaS1lLWRlc2lnbi1pbmNcIik7XG4gICAgY29uc3QgbWFpbEljb24gPSBhZGRJY29uKFwiY29ubmVjdC9tYWlsLWljb24uc3ZnXCIsIFwibWFpbHRvOmJldGhAaWUtZGVzaWduLmNvbVwiKTtcblxuICAgIGNvbnN0IGljb25zID0gW2luc3RhZ3JhbUljb24sIGxpbmtlZGluSWNvbiwgbWFpbEljb25dO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSAwLjU1ICogcztcbiAgICAgICAgc2V0V2lkdGgoY29ubmVjdCwgd2lkdGgpO1xuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGxldHNNZWV0LCAwLjgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykgc3R5bGVUZXh0KHRleHQsIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcbiAgICAgICAgc3R5bGVUZXh0KHdobywgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xuICAgICAgICAgICAgY29ubmVjdCwgLy9cbiAgICAgICAgICAgIDAuMDkgKiBzLFxuICAgICAgICAgICAgdGV4dHNbMF0sXG4gICAgICAgICAgICAwLjAzICogcyxcbiAgICAgICAgICAgIHRleHRzWzFdLFxuICAgICAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgICAgICB0ZXh0c1syXSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIDAuMDUgKiBzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldHNNZWV0LnN0eWxlLmxlZnQgPSBweChjb25uZWN0Lm9mZnNldExlZnQgKyBjb25uZWN0Lm9mZnNldFdpZHRoICsgMC4xNSAqIHMpO1xuXG4gICAgICAgIHdoby5zdHlsZS5sZWZ0ID0gcHgobGV0c01lZXQub2Zmc2V0TGVmdCk7XG4gICAgICAgIHdoby5zdHlsZS50b3AgPSBweChsZXRzTWVldC5vZmZzZXRUb3AgKyBsZXRzTWVldC5vZmZzZXRIZWlnaHQgKyAwLjA0ICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpY29uIG9mIGljb25zKSB7XG4gICAgICAgICAgICBpY29uLndpZHRoID0gcyAqIDAuMDU1O1xuICAgICAgICAgICAgY29uc3QgbGFzdFRleHQgPSB0ZXh0c1t0ZXh0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGljb24uc3R5bGUudG9wID0gcHgobGFzdFRleHQub2Zmc2V0VG9wICsgbGFzdFRleHQub2Zmc2V0SGVpZ2h0ICsgMC4wMyAqIHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtpY29uQWxpZ25tZW50cywgX19dID0gYWxpZ25pbmdXaXRoR2Fwc1goW2luc3RhZ3JhbUljb24sIDAuMDMgKiBzLCBsaW5rZWRpbkljb24sIDAuMDMgKiBzLCBtYWlsSWNvbl0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBpY29uQWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaWVHcmVlbiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduaW5nV2l0aEdhcHNYLCBhbGlnbmluZ1dpdGhHYXBzWSwgcHgsIHNldEhlaWdodCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJVcGRhdGVMYXlvdXQgfSBmcm9tIFwiLi4vcGFnZVwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFBhZGRpbmcsIGFkZFNjcm9sbFRleHQsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgc2Nyb2xsQ29udGFpbmVyIH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xuXG5pbnRlcmZhY2UgUXVvdGUge1xuICAgIHF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBhdXRob3I6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIHRpdGxlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBvcGVuUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGNsb3NlUXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBhZGRRdW90ZShxdW90ZVRleHQ6IHN0cmluZywgYXV0aG9yVGV4dDogc3RyaW5nLCB0aXRsZVRleHQ6IHN0cmluZyk6IFF1b3RlIHtcbiAgICBjb25zdCBxdW90ZSA9IGFkZFNjcm9sbFRleHQocXVvdGVUZXh0KTtcbiAgICBxdW90ZS5zdHlsZS5hbmltYXRpb24gPSBcIlwiOyAvLyBjYW4ndCBhbmltYXRlIGluIG90aGVyd2lzZSBjbG9zZSBxdW90ZSBib3VuZGluZyBib3ggc2hpdCBnZXRzIGNvbmZ1c2VkXG4gICAgY29uc3QgYXV0aG9yID0gYWRkU2Nyb2xsVGV4dChhdXRob3JUZXh0KTtcbiAgICBjb25zdCB0aXRsZSA9IGFkZFNjcm9sbFRleHQodGl0bGVUZXh0KTtcbiAgICBjb25zdCBvcGVuUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCcXCIpO1xuICAgIGNvbnN0IGNsb3NlUXVvdGUgPSBhZGRTY3JvbGxUZXh0KFwi4oCdXCIpO1xuXG4gICAgcmV0dXJuIHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVF1b3RlKHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9OiBRdW90ZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCB3aWR0aFNjYWxlID0gMC43NTtcbiAgICBzdHlsZVRleHQocXVvdGUsIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzMiAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNjUgKiBzIH0pO1xuXG4gICAgc3R5bGVUZXh0KGF1dGhvciwgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMzUgKiBzLCB3aWR0aDogd2lkdGhTY2FsZSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDYgKiBzIH0pO1xuICAgIGF1dGhvci5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBzdHlsZVRleHQodGl0bGUsIHsgbGV0dGVyU3BhY2luZzogMC4xNSwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuXG4gICAgY29uc3QgcXVvdGVUZXh0RGV0YWlscyA9IHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBpZUdyZWVuLCBmb250U2l6ZTogMC4xNSAqIHMsIHdpZHRoOiAwLjA1ICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfTtcbiAgICBzdHlsZVRleHQob3BlblF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbiAgICBzdHlsZVRleHQoY2xvc2VRdW90ZSwgcXVvdGVUZXh0RGV0YWlscyk7XG59XG5cbmZ1bmN0aW9uIGxheW91dFF1b3RlKHsgcXVvdGUsIGF1dGhvciwgdGl0bGUsIG9wZW5RdW90ZSwgY2xvc2VRdW90ZSB9OiBRdW90ZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGF1dGhvci5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG4gICAgdGl0bGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNZKFtcbiAgICAgICAgcXVvdGUsIC8vXG4gICAgICAgIDAuMDQgKiBzLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIC0wLjAxNSAqIHMsXG4gICAgICAgIHRpdGxlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4zNSAqIHMpO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgc29ydGEgamFuay4gYWdhaW4sIGNsb3NlIHF1b3RlIGJvdW5kaW5nIGJveCBnZXRzIGNvbmZ1c2VkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHF1b3RlKTtcbiAgICAgICAgY29uc3QgcmVjdHMgPSByYW5nZS5nZXRDbGllbnRSZWN0cygpO1xuICAgICAgICBjb25zdCBzY3JvbGxDb250YWluZXJSZWN0ID0gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBsYXN0VGV4dExpbmVSZWN0ID0gcmVjdHNbcmVjdHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnN0IGxhc3RSZWN0TGVmdCA9IGxhc3RUZXh0TGluZVJlY3QubGVmdCAtIHNjcm9sbENvbnRhaW5lclJlY3QubGVmdCArIHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIG9wZW5RdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCAtIDAuMDcgKiBzKTtcbiAgICAgICAgb3BlblF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIDAuMDUgKiBzKTtcbiAgICAgICAgY2xvc2VRdW90ZS5zdHlsZS5sZWZ0ID0gcHgobGFzdFJlY3RMZWZ0ICsgbGFzdFRleHRMaW5lUmVjdC53aWR0aCk7XG4gICAgICAgIGNsb3NlUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgcXVvdGUub2Zmc2V0SGVpZ2h0IC0gMC4wMSAqIHMpO1xuICAgIH0sIDEwMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdm9sdXRpb25QYWdlKCkge1xuICAgIGNvbnN0IGV2b2x1dGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi5zdmdcIik7XG4gICAgY29uc3QgZXZvbHV0aW9uSGlzdG9yeSA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi1oaXN0b3J5LnN2Z1wiKTtcbiAgICBjb25zdCBsb2dvRnVsbCA9IGFkZFNjcm9sbEltYWdlKFwibG9nby1mdWxsLnN2Z1wiKTtcblxuICAgIGNvbnN0IHByb21vczogSFRNTEltYWdlRWxlbWVudFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSBwcm9tb3MucHVzaChhZGRTY3JvbGxJbWFnZShgZXZvbHV0aW9uL3Byb21vLSR7aX0uanBnYCkpO1xuXG4gICAgY29uc3QgcXVvdGVzID0gW1xuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiT3VyIGFubnVhbCBwcm9tbyBpcyBhbHdheXMgZ3JvdW5kZWQgaW4gb3VyIGlkZW50aXR5IGJ1dCBpdCdzIGZ1biB0byBwdXNoIGxpbWl0cyBhbmQgcmVpbnZlbnQgb3Vyc2VsdmVzIGVhY2ggeWVhci4gVGhlIGJlc3QgcGFydCBpcyA8c3Ryb25nPmhlYXJpbmcgd2hhdCBvdXIgY2xpZW50cyBoYXZlIHRvIHNheS48L3N0cm9uZz5cIixcbiAgICAgICAgICAgIFwiQkVUSExZTiBLUkFLQVVFUlwiLFxuICAgICAgICAgICAgXCJGb3VuZGVyLCBpLmUuIGRlc2lnbiwgaW5jLlwiXG4gICAgICAgICksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBsb3ZlIGhvdyB5b3UgZG8gc3R1ZmYuIEknbSBmaW5kaW5nIHRoYXQgdGhlc2UgdHlwZXMgb2YgbWVzc2FnZXMgYXJlIHJlYWxseSA8c3Ryb25nPnRyYW5zZm9ybWluZyByZWxhdGlvbnNoaXBzPC9zdHJvbmc+IHdpdGggcGVvcGxlLiBUaGV5IGFyZSBqdXN0IGRyZWFteS5cIiwgXCJERUJSQSBTQ0hBVFpLSVwiLCBcIkZvdW5kZXIsIEJQUCBXZWFsdGggU29sdXRpb25zIExMQ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJJIHNlZSBhIGxvdCBvZiB0aGlzIHNwZWNpYWwgcXVhbGl0eSBpbiB5b3VyIHdvcmsuIEl0J3Mgbm90IGp1c3QgYWJvdXQgYmVpbmcgaW50ZW50aW9uYWwuIFlvdSBhbHdheXMgYnJpbmcgaW4gYW4gZWxlbWVudCBvZiA8c3Ryb25nPnN1cnByaXNlIGFuZCBkZWxpZ2h0Ljwvc3Ryb25nPlwiLCBcIkpPU0ggS1JBS0FVRVJcIiwgXCJGb3VuZGVyLCBTY3VscHRcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91ciBhcHByb2FjaCB3b3JrcyBzbyB3ZWxsIGJlY2F1c2UgaXQgaXMgcmVhbGx5IDxzdHJvbmc+cGVyc29uYWw8L3N0cm9uZz4gYW5kIGVxdWFsbHkgPHN0cm9uZz5wcm9mZXNzaW9uYWwuPC9zdHJvbmc+XCIsIFwiQU5OIFNVTExJVkFOXCIsIFwiRm91bmRlciwgQW5uIFN1bGxpdmFuIE9yZ2FuaXppbmdcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91IHRydWx5IHVuZGVyc3RhbmQgdGhlIHVuaXF1ZSBwb3NpdGlvbmluZyBvZiBhIHByb3NwZWN0aXZlIGNsaWVudCBhbmQgYXJlIGFibGUgdG8gPHN0cm9uZz50ZWxsIHRoZWlyIHN0b3J5PC9zdHJvbmc+IGV4YWN0bHkgYXMgaXQgc2hvdWxkIGJlIHRvbGQuXCIsIFwiREFWSUQgWVVOXCIsIFwiUHJpbmNpcGFsLCBWYXJpZGVudCBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFxuICAgICAgICAgICAgXCJCZXRoIGlzIHF1aXRlIGZyYW5rbHkgb25lIG9mIHRoZSA8c3Ryb25nPm1vc3QgdGFsZW50ZWQgZGVzaWduZXJzPC9zdHJvbmc+IHRoYXQgSSBoYXZlIGV2ZXIgaGFkIHRoZSBwcml2aWxlZ2UgdG8gd29yayB3aXRoLiBTaGUgYWx3YXlzIGhhcyBhIHNwZWNpYWwgd2F5IG9mIG1ha2luZyBldmVyeXRoaW5nIHNoZSB0b3VjaGVzIHR1cm4gdG8gZ29sZCFcIixcbiAgICAgICAgICAgIFwiREFWSUQgUlVTSFwiLFxuICAgICAgICAgICAgXCJQcmVzaWRlbnQsIEVOVlwiXG4gICAgICAgICksXG4gICAgXTtcblxuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBhZGRTY3JvbGxQYWRkaW5nKCk7XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGV2b2x1dGlvbiwgMC43NSk7XG4gICAgICAgIHNldEhlaWdodChldm9sdXRpb25IaXN0b3J5LCAwLjMgKiBzKTtcbiAgICAgICAgc2V0SGVpZ2h0KGxvZ29GdWxsLCAwLjQ1ICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9tbyBvZiBwcm9tb3MpIGNlbnRlcldpdGhpblNjcm9sbFkocHJvbW8sIDEpO1xuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3Rlcykgc3R5bGVRdW90ZShxdW90ZSk7XG5cbiAgICAgICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtldm9sdXRpb24sIDAuMiAqIHMsIGV2b2x1dGlvbkhpc3RvcnldO1xuXG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHF1b3Rlcy5sZW5ndGgsIHByb21vcy5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA8IHF1b3Rlcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcXVvdGVzW2ldLnF1b3RlKTtcbiAgICAgICAgICAgIGlmIChpIDwgcHJvbW9zLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBwcm9tb3NbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1zLnB1c2goMC4yICogcywgc2Nyb2xsUGFkZGluZyk7XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNYKGl0ZW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBldm9sdXRpb25IaXN0b3J5LnN0eWxlLnRvcCA9IHB4KGV2b2x1dGlvbi5vZmZzZXRUb3AgKyBldm9sdXRpb24ub2Zmc2V0SGVpZ2h0IC0gZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgIGxvZ29GdWxsLnN0eWxlLmxlZnQgPSBweChldm9sdXRpb25IaXN0b3J5Lm9mZnNldExlZnQgKyAoZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRXaWR0aCAtIGxvZ29GdWxsLm9mZnNldFdpZHRoKSAvIDIpO1xuICAgICAgICBsb2dvRnVsbC5zdHlsZS50b3AgPSBweChldm9sdXRpb25IaXN0b3J5Lm9mZnNldFRvcCAtIGxvZ29GdWxsLm9mZnNldEhlaWdodCAtIDAuMSAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcXVvdGUgb2YgcXVvdGVzKSBsYXlvdXRRdW90ZShxdW90ZSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBpZUJsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbldpdGhHYXAsIGFsaWduaW5nV2l0aEdhcHNZLCBweCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJVcGRhdGVMYXlvdXQgfSBmcm9tIFwiLi4vcGFnZVwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFBhZGRpbmcsIGFkZFNjcm9sbFRleHQsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCB9IGZyb20gXCIuLi9zY3JvbGxcIjtcblxuY29uc3QgSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OID0gMC44NTtcblxuaW50ZXJmYWNlIEluc3BpcmF0aW9uVGlsZSB7XG4gICAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yOiBIVE1MRWxlbWVudDtcbiAgICByZWFkTW9yZTogSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHN0eWxlSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgc3R5bGVUZXh0KG1ham9yLCB7IGxldHRlclNwYWNpbmc6IDAuNiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNiAqIHMsIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA5ICogcyB9KTtcbiAgICBzdHlsZVRleHQobWlub3IsIHsgbGV0dGVyU3BhY2luZzogMC4zLCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI3ICogcywgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH0pO1xuICAgIHN0eWxlVGV4dChyZWFkTW9yZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjUsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IGllQmx1ZSwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfSk7XG5cbiAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSBweCgwLjU1ICogcyk7XG59XG5cbmZ1bmN0aW9uIGFsaWduSW5zcGlyYXRpb25UaWxlKHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTogSW5zcGlyYXRpb25UaWxlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgbWFqb3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgbWlub3Iuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG4gICAgcmVhZE1vcmUuc3R5bGUubGVmdCA9IGltYWdlLnN0eWxlLmxlZnQ7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xuICAgICAgICBpbWFnZSwgLy9cbiAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgIG1ham9yLFxuICAgICAgICAtMC4wMSAqIHMsXG4gICAgICAgIG1pbm9yLFxuICAgICAgICAwLjAxICogcyxcbiAgICAgICAgcmVhZE1vcmUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBzICogMC4xNSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRJbnNwaXJhdGlvblRpbGUoaW1hZ2VTdHJpbmc6IHN0cmluZywgbWFqb3JUZXh0OiBzdHJpbmcsIG1pbm9yVGV4dDogc3RyaW5nKTogSW5zcGlyYXRpb25UaWxlIHtcbiAgICBjb25zdCBpbWFnZSA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3RyaW5nKTtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vciA9IGFkZFNjcm9sbFRleHQobWlub3JUZXh0KTtcbiAgICBjb25zdCByZWFkTW9yZSA9IGFkZFNjcm9sbFRleHQoXCJSZWFkIG1vcmVcIik7XG5cbiAgICByZXR1cm4geyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25QYWdlKCkge1xuICAgIGNvbnN0IGluc3BpcmF0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJpbnNwaXJhdGlvbi9pbnNwaXJhdGlvbi5zdmdcIik7XG5cbiAgICBjb25zdCB0aWxlcyA9IFtcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24veXVtaWUuanBnXCIsIFwiVEhFIFNUQVJUIE9GIFNPTUVUSElORyBZVU0tSUVcIiwgXCJXZSBhbHdheXMgd2FudGVkIHRvIGRlc2lnbiBjaG9jb2xhdGUgYmFycyBhbmQgZmluYWxseSBkaWQgaXQuIEludHJvZHVjaW5nIG91ciBzd2VldCBuZXcgYnJhbmQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi93b3Jkcy1pZGVhcy5qcGdcIiwgXCJTSEFSRSBTT01FIERFU0lHTiBMT1ZFXCIsIFwiVGhlIGkuZS4gZGVzaWduIHByb21vIGpvdXJuYWxzIGVuY291cmFnZSBjbGllbnRzIHRvIHNrZXRjaCB0aGVpciBiaWcgaWRlYXMgYW5kIGNhcHR1cmUgdGhlaXIgZHJlYW1zLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vY29vay1pZS5qcGdcIiwgXCJHT1RUQSBMT1ZFIEEgQ09PSy1JRVwiLCBcIkhvdyBhIHNlY3JldCByZWNpcGUgd29ya3MgdG8gYnJpbmcgcmVsYXRpb25zaGlwcyB0byBhIHdob2xlIG5ldyBsZXZlbC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlbWl4LmpwZ1wiLCBcIlJFTUlYXCIsIFwiQSBiZWhpbmQtdGhlLXNjZW5lcyBsb29rIGF0IGhvdyB3ZSB0cmFuc2Zvcm1lZCBjbGFzc2ljIG1lbW9yeSBjYXJyaWVycyBpbnRvIG9iamVjdHMgb2YgYXJ0LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24va3JlbXBhLnBuZ1wiLCBcIlJFQlJBTkRJTkcgQSBGQU1JTFkgQlVTSU5FU1NcIiwgXCJBIHJlZnJlc2ggZm9yIGEgNTAteWVhciBsZWdhY3kuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mb3Rvc3RvcmkuanBnXCIsIFwiQlJBTkRJTkcgRlJPTSBUSEUgTkFNRSBVUFwiLCBcIldoZW4gYSBjbGllbnQgaGFkIGFuIGlkZWEgZm9yIGEgYnJhbmQgc3Bpbm9mZiwgd2UgdG9vayBoZXIgY29uY2VwdCB0byByZWFsaXR5IGFuZCBsYXVuY2hlZCB0aGUgYnVzaW5lc3MgaW4gaGlnaCBzdHlsZS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2luc3BpcmVkLTItY3JlYXRlLmpwZ1wiLCBcIklOU1BJUkVEIDIgQ1JFQVRFXCIsIFwiQSBwYWludGluZyBpbnNwaXJlZCBieSB0aGUgaS5lLiBkZXNpZ24gbG9nbyBjb21iaW5lcyBvaWwgcGFpbnRzLCBncm91bmQgdXAgY3JheW9ucywgYW5kIGEgbGVnby5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Zyb20taW5zaWRlLmpwZ1wiLCBcIlRIRSBWSUVXIEZST00gSU5TSURFXCIsIFwiaS5lLiBkZXNpZ24ncyBuZXcgc3R1ZGlvIHdhcyAzMCB5ZWFycyBpbiB0aGUgbWFraW5nLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVjb25uZWN0aW5nLmpwZ1wiLCBcIlJFQ09OTkVDVElOR1wiLCBcIkhvdyB1bmNlcnRhaW4gdGltZXMgbGVkIHRvIGEgaG9tZWNvbWluZyBmb3IgaS5lLiBkZXNpZ24ncyBzZW5pb3IgZGVzaWduZXIuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9uZXctc3R1ZGlvLmpwZ1wiLCBcIk5FVyBTVFVESU8uIE5FVyBWSUVXLlwiLCBcIkhvdyB0aGUgbmVlZCBmb3IgaW5zcGlyYXRpb24gZnVlbGVkIHRoZSBidWlsZGluZyBvZiBhIHN0dWRpby5cIiksXG4gICAgXTtcblxuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBhZGRTY3JvbGxQYWRkaW5nKCk7XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGluc3BpcmF0aW9uLCAwLjc1KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHN0eWxlSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGFsaWduV2l0aEdhcChpbnNwaXJhdGlvbiwgdGlsZXNbMF0uaW1hZ2UsIDAuMjUgKiBzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggLSAxOyBpKyspIGFsaWduV2l0aEdhcCh0aWxlc1tpXS5pbWFnZSwgdGlsZXNbaSArIDFdLmltYWdlLCAwLjEgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIGFsaWduSW5zcGlyYXRpb25UaWxlKHRpbGUpO1xuXG4gICAgICAgIGNvbnN0IGxhc3RJbWFnZSA9IHRpbGVzW3RpbGVzLmxlbmd0aCAtIDFdLmltYWdlO1xuICAgICAgICBzY3JvbGxQYWRkaW5nLnN0eWxlLmxlZnQgPSBweChsYXN0SW1hZ2Uub2Zmc2V0TGVmdCArIGxhc3RJbWFnZS5vZmZzZXRXaWR0aCArIDAuMSAqIHMpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGFsaWduaW5nV2l0aEdhcHNYLCBhbGlnbmluZ1dpdGhHYXBzWSwgaXNMYW5kc2NhcGUsIHB4IH0gZnJvbSBcIi4uL2xheW91dFwiO1xyXG5pbXBvcnQgeyByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XHJcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxQYWRkaW5nLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlcldpdGhpblNjcm9sbFgsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIHNjcm9sbENvbnRhaW5lciwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFZpZXdQYWdlKCkge1xyXG4gICAgY29uc3QgaG9tZSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob21lLnN2Z1wiKTtcclxuICAgIGNvbnN0IGhvcml6b24gPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9yaXpvbi5qcGdcIik7XHJcbiAgICBjb25zdCBmcmVzaExvb2sgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZnJlc2gtbG9vay5zdmdcIik7XHJcbiAgICBjb25zdCBncmVhdEJyYW5kcyA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ncmVhdC1icmFuZHMuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUxID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIkdSRUFUIEJSQU5EUyBET04nVCBKVVNUIEhBUFBFTlwiLFxyXG4gICAgICAgIFwiVGhleSByZXF1aXJlIGV4cGxvcmF0aW9uLCBpbnNpZ2h0LCBhbmQgdGVuYWNpdHkuIFdlIGh1bnQgZm9yIHRoYXQgbWFnaWMgc3BhcmsgdGhhdCBpZ25pdGVzIGlubm92YXRpb24uIFdlIGJyaW5nIG91ciBleHRlbnNpdmUgc2tpbGxzIGFuZCBleHBlcmllbmNlIHRvIGVhY2ggcHJvamVjdCBhbmQgZ2l2ZSBpdCBvdXIgYWxsLiBUaGUgcmVzdWx0IGlzIGNsZWFyLCB5ZXQgZWxldmF0ZWQgY29tbXVuaWNhdGlvbiB0aGF0IG1ha2VzIHBlb3BsZSBzdG9wLCB0aGluaywgYW5kIG9mdGVuIHNtaWxlLlwiLFxyXG4gICAgICAgIFwiT3VyIHN0dWRpbyBsb2NhdGlvbiBpcyBwcm9mb3VuZGx5IGluc3BpcmluZy4gVGhlIG1hZ25pZmljZW50IHZpZXcgZmVlZHMgb3VyIHNvdWxzIGFuZCBrZWVwcyB1cyBpbnNwaXJlZCB0byBkbyBvdXIgYmVzdCB3b3JrLiBJdCdzIGEgcGxhY2Ugd2hlcmUgY3JlYXRpdmUgcGVvcGxlIGNvbWUgdG9nZXRoZXIgdG8gY29sbGFib3JhdGUgYW5kIGRyaWxsIGRvd24gdG8gdGhlIGhlYXJ0IG9mIHRoZSBtYXR0ZXIuIFRvIHNvbHZlIHByb2JsZW1zIGFuZCBicmluZyBpZGVhcyB0byBsaWZlLiBUbyBjcmVhdGUgdGhpbmdzIHdvcnRoIHJlbWVtYmVyaW5nLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW5zaWdodENsYXJpdHkgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaW5zaWdodC1jbGFyaXR5LmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMiA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBCUklORyBWSVNJT04sIElOU0lHSFQsIEFORCBDTEFSSVRZIFRPIEVWRVJZIFBST0pFQ1RcIixcclxuICAgICAgICBcIlN1Y2Nlc3NmdWwgZGVzaWduIHN0YXJ0cyB3aXRoIGlkZW50aWZ5aW5nIGEgY2xpZW50J3MgbmVlZHMsIGdvYWxzLCBhbmQgYXNwaXJhdGlvbnMuIE91ciBvYmplY3Rpdml0eSBzaGluZXMgbGlnaHQgb24gd2hhdCBvdGhlcnMgaGF2ZSBtaXNzZWQuIFdlIGhhdmUgdGhlIGFiaWxpdHkgdG8gc2VlIGFuZCBpbnRlcnByZXQgdGhlIGlubmVyIHdvcmtpbmdzLCBjdWx0dXJlLCBhbmQgbnVhbmNlcyBvZiBvdXIgY2xpZW50J3Mgd29ybGQuIFdlIGFzayBxdWVzdGlvbnMg4oCTIGxvdHMgb2YgcXVlc3Rpb25zLiBUaGVuIGxpc3RlbiB1bnRpbCB3ZSBnYWluIHRoZSBkZWVwIHVuZGVyc3RhbmRpbmcgbmVjZXNzYXJ5IHRvIGJ1aWxkIHRoZSBzb2xpZCBmb3VuZGF0aW9uIHRoYXQgYW55IGVuZHVyaW5nIGJyYW5kIG5lZWRzLlwiLFxyXG4gICAgICAgIFwiT3VyIHNtYWxsIGJ1dCBtaWdodHkgdGVhbSBicmluZ3MgdG9nZXRoZXIgYSB3aWRlIHJhbmdlIG9mIHRhbGVudHMgYW5kIHBlcnNwZWN0aXZlcywgcGx1cyBhIG5pY2UgbGlzdCBvZiBhd2FyZHMuIFdlIHRocm93IG91ciBoZWFydHMgaW50byBvdXIgd29yayBhbmQgYXJlIGtub3duIGZvciBvdXIgZmllcmNlIGNvbW1pdG1lbnQgdG8gdGhlIHRydXN0ZWQsIGxvbmctdGVybSBwYXJ0bmVyc2hpcHMgd2UgZm9ybS4gRm9yIHVzLCBpdCdzIHBlcnNvbmFsLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc2t5d2FyZCA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9za3l3YXJkLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMyA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBTRUUgV09SSyBJTiBBIERJRkZFUkVOVCBMSUdIVFwiLFxyXG4gICAgICAgIFwiUGVvcGxlIGxpa2UgdG8gYXNrIGFib3V0IG91ciBkZXNpZ24gcHJvY2Vzcy4gVGhlIHRydXRoIGlzIHRoYXQgdGhlIGFwcHJvYWNoIHRvIGVhY2ggcHJvamVjdCB2YXJpZXMsIGJlY2F1c2UgZWFjaCBjbGllbnQgYW5kIHRoZWlyIG5lZWRzIGFyZSB1bmlxdWUuIENyZWF0aXZlIGJyZWFrdGhyb3VnaHMgZG9uJ3QgZm9sbG93IHRoZSBjbG9jay4gVGhleSBjYW4gaGFwcGVuIGFueSB0aW1lIG9mIGRheSDigJMgb3IgbmlnaHQuIFdoZXRoZXIgYW4gZXBpcGhhbnkgaXMgaWxsdW1pbmF0ZWQgaW4gYSBzY3JpYmJsZSwgYSBkcmVhbSwgb3IgYXMgdGhlIGNsb3VkcyByb2xsIGJ5LCB3ZSBlbWJyYWNlIHRoZSBmYWN0IHRoYXQgZWFjaCBwcm9qZWN0IHRha2VzIG9uIGEgbGlmZSBvZiBpdHMgb3duLlwiLFxyXG4gICAgICAgIFwiV2hhdCdzIGNvbnN0YW50IGlzIG91ciBhYmlsaXR5IHRvIGxpc3RlbiBhbmQgZm9jdXMsIHRvIGFuYWx5emUgYW5kIGNvbm5lY3QgZG90cywgYW5kIHRvIHJlbWFpbiBjdXJpb3VzLiBUaGUgbW9zdCByZXdhcmRpbmcgcHJvamVjdHMgYXJlIHdpdGggY2xpZW50cyB3aG8gdmFsdWUgdGhlIGJhbGFuY2UgYmV0d2VlbiBwdXNoaW5nIGZvcndhcmQgYW5kIGFsbG93aW5nIHRpbWUgZm9yIHRoZSBwZXJmZWN0IHNvbHV0aW9uIHRvIGVtZXJnZS4gVGhhdCdzIG91ciBoYXBweSBwbGFjZS5cIlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0VGlsZXMgPSBbdGV4dFRpbGUxLCB0ZXh0VGlsZTIsIHRleHRUaWxlM107XHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsUGFkZGluZyA9IGFkZFNjcm9sbFBhZGRpbmcoKTtcclxuXHJcbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgSE9NRV9IT1JJWk9OX1BBRCA9IDAuMjtcclxuICAgICAgICBjb25zdCBGUkVTSF9MT09LX1BBRCA9IDAuMTM7XHJcbiAgICAgICAgY29uc3QgSU1BR0VfVEVYVF9TUVVBUkVfUEFEID0gMC4xNztcclxuXHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShmcmVzaExvb2ssIDAuOCk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMi4yLCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiNCM0IzQjNcIiwgZm9udFNpemU6IDAuMDY1ICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWChbXHJcbiAgICAgICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICAgICAgSE9NRV9IT1JJWk9OX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBob3Jpem9uLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgRlJFU0hfTE9PS19QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUxLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMi5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMy5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxQYWRkaW5nLFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh0ZXh0VGlsZSwgMjAsIDIwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGhvcml6b24sIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGZyZXNoTG9vaywgMC44NSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoZ3JlYXRCcmFuZHMsIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGluc2lnaHRDbGFyaXR5LCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChza3l3YXJkLCAxKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxXaWR0aCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpXHJcbiAgICAgICAgICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiA0LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiNCM0IzQjNcIiwgZm9udFNpemU6IDAuMDYgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDggKiBzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjggKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBURVhUX1RJTEVfV0lEVEggPSAwLjg1O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWCh0ZXh0VGlsZS5tYWpvciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSBjZW50ZXJXaXRoaW5TY3JvbGxYKG1pbm9yLCBURVhUX1RJTEVfV0lEVEgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBNT0JJTEVfUEFEID0gMC4wODtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1vYmlsZVRpbGUodGV4dFRpbGU6IFRleHRTcXVhcmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBbdGV4dFRpbGUubWFqb3IsIDAuMCAqIHNdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtaW5vciBvZiB0ZXh0VGlsZS5taW5vcnMpIHgucHVzaCgwLjA0ICogcywgbWlub3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWShbXHJcbiAgICAgICAgICAgICAgICBob21lLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBob3Jpem9uLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMSksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGluc2lnaHRDbGFyaXR5LFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMiksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUzKSxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFBhZGRpbmcsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHNwYWNlVG9GaWxlIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB7IGJvZHkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgcHggfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhcHBlbmRDaGlsZEZvclBhZ2UsIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nLCBwYWdlQ2xlYW51cHMsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRTcXVhcmUsIGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgc2Nyb2xsQ29udGFpbmVyLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5pbXBvcnQgeyBTaWduYWwsIGVmZmVjdCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IFNwcmluZywgYW5pbWF0ZVNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcblxuaW50ZXJmYWNlIFdvcmtDb250ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgV29ya0l0ZW0ge1xuICAgIHRleHRTcXVhcmU6IFRleHRTcXVhcmU7XG4gICAgaW1hZ2UxOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltYWdlMjogSFRNTEltYWdlRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFdvcmtUYWIge1xuICAgIHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc3ByaW5nOiBTcHJpbmc7XG4gICAgc3ByaW5nU2lnOiBTaWduYWw7XG4gICAgd29ya0l0ZW06IFdvcmtJdGVtO1xufVxuXG5jb25zdCB3b3JrQ29udGVudHM6IFdvcmtDb250ZW50W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmZ1bmN0aW9uIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzOiBXb3JrVGFiW10pIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcbiAgICAgICAgICAgIHdvcmtJdGVtLnRleHRTcXVhcmUsXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWSh3b3JrSXRlbS5pbWFnZTEsIDEpO1xuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKHdvcmtJdGVtLmltYWdlMiwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnM6IFdvcmtUYWJbXSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgICAgICB3b3JrSXRlbS50ZXh0U3F1YXJlLm1ham9yLCAvL1xuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIHdvcmtJdGVtLmltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgd29ya0l0ZW0uaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNYKGl0ZW1zKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFdvcmtQYWdlKCkge1xuICAgIGNvbnN0IHdvcmtUYWJzOiBXb3JrVGFiW10gPSBbXTtcblxuICAgIC8vIGZ1bmN0aW9uIHRhYkFsaWdubWVudCh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgLy8gICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGFiRWxlbWVudFNpemUodGFiRWxlbWVudCk7XG5cbiAgICAvLyAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAgIGNlbnRlcmVkOiAoKSA9PiAoaW5uZXJIZWlnaHQgLSBoZWlnaHQpIC8gMixcbiAgICAvLyAgICAgICAgIGhhbGZTcXVhcmU6ICgpID0+IGlubmVySGVpZ2h0IC0gd2lkdGggLyAyLFxuICAgIC8vICAgICAgICAgc3F1YXJlOiAoKSA9PiBpbm5lckhlaWdodCAtIHdpZHRoLFxuICAgIC8vICAgICB9O1xuICAgIC8vIH1cblxuICAgIChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwibm9uZVwiO1xuICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gKChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwiXCIpKTtcblxuICAgIGxldCB0YWJzU2hvd2luZyA9IHRydWU7XG4gICAgbGV0IGN1cnJlbnRXb3JrSXRlbTogV29ya0l0ZW0gfCB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcodGFiRWxlbWVudCk7XG4gICAgICAgIGFwcGVuZENoaWxkRm9yUGFnZShib2R5LCB0YWJFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgzMDApO1xuXG4gICAgICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGFiUG9zaXRpb25zKCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0U3ByaW5nVGFyZ2V0KHRhcmdldDogbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtUYWIuc3ByaW5nLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyh3b3JrVGFiLnNwcmluZywgd29ya1RhYi5zcHJpbmdTaWcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YWJzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkKSBzZXRTcHJpbmdUYXJnZXQoMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzZXRTcHJpbmdUYXJnZXQoMjAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkIHx8IGN1cnJlbnRXb3JrSXRlbSA9PT0gd29ya1RhYi53b3JrSXRlbSkgc2V0U3ByaW5nVGFyZ2V0KDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0U3ByaW5nVGFyZ2V0KDQwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZVRhYlBvc2l0aW9ucygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIG9uRmlyc3RDbGljaygpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0U3F1YXJlID0gYWRkU2Nyb2xsVGV4dFNxdWFyZSh3b3JrQ29udGVudC5uYW1lLnRvVXBwZXJDYXNlKCksIC4uLndvcmtDb250ZW50LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlMiA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzIuanBnYCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrVGFic1tpXS53b3JrSXRlbSA9IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SW1hZ2UgPSB3b3JrVGFiLndvcmtJdGVtLmltYWdlMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0IDwgbGFzdEltYWdlLm9mZnNldExlZnQgKyBsYXN0SW1hZ2Uub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXb3JrSXRlbSA9IHdvcmtUYWIud29ya0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RXb3JrVGFiKHdvcmtUYWI6IFdvcmtUYWIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IHNjcm9sbFBvc2l0aW9uLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB3b3JrVGFiLnRhYkVsZW1lbnQub25jbGljayA9ICgpID0+IHNlbGVjdFdvcmtUYWIod29ya1RhYik7XG5cbiAgICAgICAgICAgIHRhYnNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcblxuICAgICAgICAgICAgYXdhaXQgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzKTtcbiAgICAgICAgICAgICAgICBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGVjdFdvcmtUYWIod29ya1RhYnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gb25GaXJzdENsaWNrO1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgLy8gc3ByaW5nLnBvc2l0aW9uID0gaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAvLyBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcblxuICAgICAgICB3b3JrVGFicy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcsIHdvcmtJdGVtOiB1bmRlZmluZWQgfSk7XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgoc3ByaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZ10pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAzMDA7XG4gICAgICAgIGNvbnN0IGVuZCA9IGlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgY29uc3QgYW55VGFiRWxlbWVudCA9IHdvcmtUYWJzWzBdLnRhYkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrVGFicy5sZW5ndGggKiAyIC0gMSk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogKGFueVRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCAvIGFueVRhYkVsZW1lbnQubmF0dXJhbFdpZHRoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQgfSA9IHdvcmtUYWJzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHRMb3dlckxpbWl0ID0gaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaGVpZ2h0TG93ZXJMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodExvd2VyTGltaXQpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChoZWlnaHRMb3dlckxpbWl0ICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3b3JrVGFic1tpXS50YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBib2R5LCBib2R5U2lnLCBmYWRlSW5BbmltYXRpb24sIGllQmx1ZSwgaWVHcmVlbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1ksIGlzTGFuZHNjYXBlLCBweCwgc2V0SGVpZ2h0LCBzZXRXaWR0aCwgc3R5bGVUZXh0LCBUZXh0RGV0YWlscyB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGRGb3JQYWdlLCBhd2FpdExheW91dEZvckltYWdlTG9hZGluZyB9IGZyb20gXCIuL3BhZ2VcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTcXVhcmUge1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcnM6IEhUTUxFbGVtZW50W107XG59XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxDb250YWluZXIpO1xuKHNjcm9sbENvbnRhaW5lci5zdHlsZSBhcyBhbnkpLnNjcm9sbGJhckNvbG9yID0gYCR7aWVHcmVlbn0gJHtpZUJsdWV9NTVgO1xuXG5zY3JvbGxDb250YWluZXIub253aGVlbCA9IChlKSA9PiB7XG4gICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbEJ5KHsgbGVmdDogZS5kZWx0YVkgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsUGFkZGluZygpIHtcbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzY3JvbGxQYWRkaW5nLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFBhZGRpbmcuc3R5bGUud2lkdGggPSBweCgxKTsgLy8gYW55IG5vbnplcm8gdGhpY2tuZXNzIGlzIGVub3VnaCB0byBleHRlbmQgc2Nyb2xsQ29udGFpbmVyXG4gICAgc2Nyb2xsUGFkZGluZy5zdHlsZS5oZWlnaHQgPSBweCgxKTtcbiAgICBhcHBlbmRDaGlsZEZvclBhZ2Uoc2Nyb2xsQ29udGFpbmVyLCBzY3JvbGxQYWRkaW5nKTtcbiAgICByZXR1cm4gc2Nyb2xsUGFkZGluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbEltYWdlKHNyYzogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3Qgc2Nyb2xsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbEltYWdlLnNyYyA9IHNyYztcbiAgICBzY3JvbGxJbWFnZS5zdHlsZS5hbmltYXRpb24gPSBmYWRlSW5BbmltYXRpb24oKTtcbiAgICBhd2FpdExheW91dEZvckltYWdlTG9hZGluZyhzY3JvbGxJbWFnZSk7XG4gICAgYXBwZW5kQ2hpbGRGb3JQYWdlKHNjcm9sbENvbnRhaW5lciwgc2Nyb2xsSW1hZ2UpO1xuICAgIHJldHVybiBzY3JvbGxJbWFnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHQodGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Nyb2xsVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHNjcm9sbFRleHQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xuICAgIGFwcGVuZENoaWxkRm9yUGFnZShzY3JvbGxDb250YWluZXIsIHNjcm9sbFRleHQpO1xuICAgIHJldHVybiBzY3JvbGxUZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dFNxdWFyZShtYWpvclRleHQ6IHN0cmluZywgLi4ubWlub3JUZXh0czogc3RyaW5nW10pOiBUZXh0U3F1YXJlIHtcbiAgICBjb25zdCBtYWpvciA9IGFkZFNjcm9sbFRleHQobWFqb3JUZXh0KTtcbiAgICBjb25zdCBtaW5vcnMgPSBtaW5vclRleHRzLm1hcChhZGRTY3JvbGxUZXh0KTtcbiAgICByZXR1cm4geyBtYWpvciwgbWlub3JzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFRleHRTcXVhcmUsIG1ham9yVGV4dERldGFpbHM6IFRleHREZXRhaWxzLCBtaW5vclRleHREZXRhaWxzOiBUZXh0RGV0YWlscykge1xuICAgIHN0eWxlVGV4dChtYWpvciwgbWFqb3JUZXh0RGV0YWlscyk7XG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHN0eWxlVGV4dChtaW5vciwgbWlub3JUZXh0RGV0YWlscyk7XG59XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgY29uc3QgeCA9IDI4MDtcblxuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgdW5kZXJTY3JvbGxDb250YWluZXIgPSAoaW5uZXJIZWlnaHQgLSBzY3JvbGxIZWlnaHQpIC8gMjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KHNjcm9sbEhlaWdodCArIHVuZGVyU2Nyb2xsQ29udGFpbmVyKTsgLy8gcGxhY2Ugc2Nyb2xsIGJhciBhdCBib3R0b20gb2YgcGFnZVxuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoIC0geCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS50b3AgPSBweCgoaW5uZXJIZWlnaHQgLSBzY3JvbGxIZWlnaHQpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcHgoeCk7XG5cbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WCA9IFwic2Nyb2xsXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSBcImhpZGRlblwiO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IGdldFNjcm9sbFdpZHRoKCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KHNjcm9sbFdpZHRoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHNjcm9sbFdpZHRoKSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoMCk7XG5cbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WCA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCA9IDA7XG4gICAgfVxufSwgW2JvZHlTaWddKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCgpIHtcbiAgICAvLyByZXR1cm4gaW5uZXJIZWlnaHQgKiAwLjc7XG4gICAgcmV0dXJuIDEuMDIgKiBpbm5lckhlaWdodCAtIDAuMDAwNDg1ICogaW5uZXJIZWlnaHQgKiBpbm5lckhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoKCkge1xuICAgIGNvbnN0IFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OID0gMTtcbiAgICByZXR1cm4gaW5uZXJXaWR0aCAqIFNDUk9MTF9XSURUSF9QUk9QT1JUSU9OO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JUb01pbm9yR2FwOiBudW1iZXIsIGJldHdlZW5NaW5vcnNHYXA6IG51bWJlcikge1xuICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbXTtcblxuICAgIGl0ZW1zLnB1c2gobWFqb3IsIG1ham9yVG9NaW5vckdhcCk7XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBpdGVtcy5wdXNoKG1pbm9yLCBiZXR3ZWVuTWlub3JzR2FwKTtcbiAgICB9XG4gICAgaXRlbXMucG9wKCk7IC8vIHJlbW92ZSBmaW5hbCBnYXAsIG9ubHkgd2FudCBiZXR3ZWVuc1xuXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCB0b3RhbEhlaWdodF0gPSBhbGlnbmluZ1dpdGhHYXBzWShpdGVtcyk7XG4gICAgY29uc3QgZ3JvdXBUb3AgPSAoc2Nyb2xsSGVpZ2h0IC0gdG90YWxIZWlnaHQpIC8gMjtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KGdyb3VwVG9wICsgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykge1xuICAgICAgICBtaW5vci5zdHlsZS5sZWZ0ID0gbWFqb3Iuc3R5bGUubGVmdDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJXaXRoaW5TY3JvbGxZKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IGhlaWdodCA9IHMgKiBzY2FsZTtcbiAgICBzZXRIZWlnaHQoZWxlbWVudCwgaGVpZ2h0KTtcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KChzIC0gaGVpZ2h0KSAvIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyV2l0aGluU2Nyb2xsWChlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxXaWR0aCgpO1xuICAgIGNvbnN0IHdpZHRoID0gcyAqIHNjYWxlO1xuICAgIHNldFdpZHRoKGVsZW1lbnQsIHdpZHRoKTtcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgocyAtIHdpZHRoKSAvIDIpO1xufVxuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVycyA9IG5ldyBTZXQ8KCkgPT4gdm9pZD4oKTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuYWRkKHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZGVsZXRlKHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbiAgICBmdW5jKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIG9uUmVzdCA9ICgpID0+IHt9O1xyXG4gICAgb25VbnJlc3QgPSAoKSA9PiB7fTtcclxuXHJcbiAgICAvLyBteCcnIC0gYngnID0ga3hcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBpbml0aWFsVmFsdWU7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBpbml0aWFsVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGljayhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjZWxlcmF0aW9uID0gdGhpcy5zdGlmZm5lc3MgKiAodGhpcy50YXJnZXQgLSB0aGlzLnBvc2l0aW9uKSAtIHRoaXMuZGFtcGluZyAqIHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSArPSBhY2NlbGVyYXRpb24gKiBkdDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IHRoaXMudmVsb2NpdHkgKiBkdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGlmZm5lc3NDcml0aWNhbChzdGlmZm5lc3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RpZmZuZXNzID0gc3RpZmZuZXNzO1xyXG4gICAgICAgIHRoaXMuZGFtcGluZyA9IE1hdGguc3FydCg0ICogc3RpZmZuZXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFID0gMC4wMTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3ByaW5nKHNwcmluZzogU3ByaW5nLCBzaWduYWw6IFNpZ25hbCkge1xyXG4gICAgaWYgKHNwcmluZy5pc0FuaW1hdGluZykgcmV0dXJuO1xyXG4gICAgXHJcbiAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgc3ByaW5nLm9uVW5yZXN0KClcclxuXHJcbiAgICBsZXQgbGFzdE1pbGxpcyA9IDA7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmlyc3RGcmFtZSk7XHJcbiAgICBmdW5jdGlvbiBmaXJzdEZyYW1lKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGFzdE1pbGxpcyA9IG1pbGxpcztcclxuICAgICAgICB0aWNrU3ByaW5nKG1pbGxpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGlja1NwcmluZyhtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtaWxsaXMgLSBsYXN0TWlsbGlzO1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcblxyXG4gICAgICAgIHNwcmluZy50aWNrKHN0ZXAgLyAxMDAwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzcHJpbmcub25SZXN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrU3ByaW5nKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3Qgc2xlZXAgPSAoZGVsYXk6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlVG9GaWxlKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoXCIgXCIsIFwiLVwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRTVkc8SyBleHRlbmRzIGtleW9mIFNWR0VsZW1lbnRUYWdOYW1lTWFwPihxdWFsaWZpZWROYW1lOiBLKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHF1YWxpZmllZE5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJsYWNlZDxULCBXaXRoaW4+KGl0ZW1zOiBUW10sIHdpdGhpbjogV2l0aGluKSB7XG4gICAgY29uc3QgaXRlbXNJbnRlcmxhY2VkID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGl0ZW1zSW50ZXJsYWNlZC5wdXNoKGl0ZW0pO1xuICAgICAgICBpdGVtc0ludGVybGFjZWQucHVzaCh3aXRoaW4pO1xuICAgIH1cbiAgICBpdGVtc0ludGVybGFjZWQucG9wKCk7XG4gICAgcmV0dXJuIGl0ZW1zSW50ZXJsYWNlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFJhbmdlKG46IG51bWJlciwgc3RhcnQxOiBudW1iZXIsIHN0b3AxOiBudW1iZXIsIHN0YXJ0MjogbnVtYmVyLCBzdG9wMjogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgobiAtIHN0YXJ0MSkgLyAoc3RvcDEgLSBzdGFydDEpKSAqIChzdG9wMiAtIHN0YXJ0MikgKyBzdGFydDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvck9uSG92ZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbG9yOiBzdHJpbmcsIGhvdmVyQ29sb3I6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICBlbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4gKGVsZW1lbnQuc3R5bGUuY29sb3IgPSBob3ZlckNvbG9yKTtcbiAgICBlbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IChlbGVtZW50LnN0eWxlLmNvbG9yID0gY29sb3IpO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiY29sb3IgMC4ycyBlYXNlLW91dFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb2xvck9uSG92ZXIsIGNyZWF0ZUVsZW1lbnRTVkcsIHNldEF0dHJpYnV0ZXMsIHNsZWVwIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBib2R5LCBib2R5U2lnLCBmYWRlSW5BbmltYXRpb24sIGdyYXksIGllR3JlZW4gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgY2VudGVyRWxlbWVudCwgaXNMYW5kc2NhcGUsIHB4LCBzdHlsZVRleHQsIHlDZW50ZXJXaXRoR2FwIH0gZnJvbSBcIi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7IGNsZWFuTGFzdFBhZ2UgfSBmcm9tIFwiLi9wYWdlXCI7XHJcbmltcG9ydCB7IGFkZENvbm5lY3RQYWdlIH0gZnJvbSBcIi4vcGFnZXMvY29ubmVjdFwiO1xyXG5pbXBvcnQgeyBhZGRFdm9sdXRpb25QYWdlIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XHJcbmltcG9ydCB7IGFkZEluc3BpcmF0aW9uUGFnZSB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XHJcbmltcG9ydCB7IGFkZFZpZXdQYWdlIH0gZnJvbSBcIi4vcGFnZXMvdmlld1wiO1xyXG5pbXBvcnQgeyBhZGRXb3JrUGFnZSB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcclxuaW1wb3J0IHsgZ2V0U2Nyb2xsSGVpZ2h0LCBzY3JvbGxDb250YWluZXIgfSBmcm9tIFwiLi9zY3JvbGxcIjtcclxuaW1wb3J0IHsgU2lnbmFsLCBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcclxuaW1wb3J0IHsgU3ByaW5nLCBhbmltYXRlU3ByaW5nIH0gZnJvbSBcIi4vc3ByaW5nXCI7XHJcblxyXG4vLyBUT0RPXHJcbi8vIHN0cmFuZ2Ugc2Vjb25kIHNjcm9sbGJhciBvbiBtb2JpbGVcclxuLy8gbW9iaWxlIGxheW91dHNcclxuLy8gYmxvZyBwYWdlc1xyXG4vLyB0aW1lbGluZVxyXG4vLyBuYXYgaXRlbSBzdHlsaW5nXHJcbi8vIHdvcmsgcGFnZVxyXG4vLyBpbWFnZSBjbGlja1xyXG4vLyBoaXQgZW5kIG9mIHNjcm9sbCwgbmV4dCBwYWdlXHJcbi8vIHNpbXBsZXIgcmVjdGFuZ2xlIHNjcm9sbCBiYXJcclxuLy8gXCJ2aWV3XCIgc3RhcnQgYW5pbWF0aW9uXHJcblxyXG5jb25zdCBwYWdlcyA9IHtcclxuICAgIHZpZXc6IGFkZFZpZXdQYWdlLFxyXG4gICAgd29yazogYWRkV29ya1BhZ2UsXHJcbiAgICBpbnNwaXJhdGlvbjogYWRkSW5zcGlyYXRpb25QYWdlLFxyXG4gICAgZXZvbHV0aW9uOiBhZGRFdm9sdXRpb25QYWdlLFxyXG4gICAgY29ubmVjdDogYWRkQ29ubmVjdFBhZ2UsXHJcbn07XHJcblxyXG5jb25zdCBuYXZFbGVtZW50RnJvbVN0cmluZzogUmVjb3JkPHN0cmluZywgSFRNTEVsZW1lbnQ+ID0ge307XHJcblxyXG5jb25zdCBlZGdlQWxpZ25YID0gKCkgPT4gaW5uZXJIZWlnaHQgKiAwLjE7XHJcbmNvbnN0IGVkZ2VBbGlnblkgPSAoKSA9PiBpbm5lckhlaWdodCAqIDAuMTtcclxuY29uc3QgaGVhZGVySWNvblNpemUgPSAoKSA9PiBpbm5lckhlaWdodCAqIDAuMDY7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhbmltYXRlSW50cm8oKSB7XHJcbiAgICAvLyBaWlpaIGNsZWFuIHRoaXMgdXBcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJsb2dvLWZ1bGwuc3ZnXCIpO1xyXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuXHJcbiAgICBjb25zdCBzdmcgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHN2Z0NvbnRlbnQsIFwiaW1hZ2Uvc3ZnK3htbFwiKS5kb2N1bWVudEVsZW1lbnQgYXMgdW5rbm93biBhcyBTVkdTVkdFbGVtZW50O1xyXG4gICAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcbiAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQgKiAwLjQpO1xyXG5cclxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG5cclxuICAgIGNvbnN0IHN2Z1NwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICBzdmdTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoODApO1xyXG4gICAgY29uc3Qgc3ZnU3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIlwiICsgc3ZnU3ByaW5nLnBvc2l0aW9uO1xyXG4gICAgICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSBweCgoMS4zIC0gc3ZnU3ByaW5nLnBvc2l0aW9uKSAqIGlubmVySGVpZ2h0KTtcclxuICAgICAgICBzdmcuc3R5bGUudG9wID0gcHgoKGlubmVySGVpZ2h0IC0gc3ZnLnNjcm9sbEhlaWdodCkgLyAyKTtcclxuICAgICAgICBzdmcuc3R5bGUubGVmdCA9IHB4KChpbm5lcldpZHRoIC0gc3ZnLnNjcm9sbFdpZHRoKSAvIDIpO1xyXG4gICAgfSwgW3N2Z1NwcmluZ1NpZ10pO1xyXG5cclxuICAgIHN2Z1NwcmluZy50YXJnZXQgPSAxO1xyXG4gICAgYW5pbWF0ZVNwcmluZyhzdmdTcHJpbmcsIHN2Z1NwcmluZ1NpZyk7XHJcblxyXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XHJcbiAgICBjb25zdCBkID0gXCJkZXNpZ25cIjtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGFjaXR5T3V0KGVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJTcHJpbmcgPSBuZXcgU3ByaW5nKDEpO1xyXG4gICAgICAgIGxldHRlclNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxNTApO1xyXG4gICAgICAgIGNvbnN0IGxldHRlclNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIGxldHRlclNwcmluZy5wb3NpdGlvbjtcclxuICAgICAgICB9LCBbbGV0dGVyU3ByaW5nU2lnXSk7XHJcblxyXG4gICAgICAgIGxldHRlclNwcmluZy50YXJnZXQgPSAwO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcobGV0dGVyU3ByaW5nLCBsZXR0ZXJTcHJpbmdTaWcpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZGVzaWduTGV0dGVyID0gc3ZnLmdldEVsZW1lbnRCeUlkKFwiZGVzaWduLVwiICsgZFtpXSkgYXMgU1ZHRWxlbWVudDtcclxuICAgICAgICBvcGFjaXR5T3V0KGRlc2lnbkxldHRlcik7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTIwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGwgPSBbXCJiaWctaVwiLCBcImRvdC0xXCIsIFwiYmlnLWVcIiwgXCJkb3QtMlwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IHN2Zy5nZXRFbGVtZW50QnlJZChsW2ldKSBhcyBTVkdFbGVtZW50O1xyXG4gICAgICAgIG9wYWNpdHlPdXQoZGVzaWduTGV0dGVyKTtcclxuICAgICAgICBhd2FpdCBzbGVlcCgxMjApO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XHJcblxyXG4gICAgc3ZnU3ByaW5nLnRhcmdldCA9IDA7XHJcbiAgICBhbmltYXRlU3ByaW5nKHN2Z1NwcmluZywgc3ZnU3ByaW5nU2lnKTtcclxuXHJcbiAgICBhd2FpdCBzbGVlcCg1MDApO1xyXG4gICAgYm9keS5yZW1vdmVDaGlsZChzdmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNZW51QnV0dG9uKCkge1xyXG4gICAgY29uc3QgbWVudUJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnRTVkcoXCJzdmdcIik7XHJcbiAgICBtZW51QnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgbWVudUJ1dHRvbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIG1lbnVCdXR0b24uc3R5bGUuekluZGV4ID0gXCIxXCI7XHJcbiAgICBtZW51QnV0dG9uLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSA0O1xyXG4gICAgY29uc3QgcGFkID0gNDtcclxuICAgIGNvbnN0IHN6ID0gNjA7XHJcbiAgICBtZW51QnV0dG9uLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgYCR7LXBhZH0gJHstcGFkfSAke3N6ICsgMiAqIHBhZH0gJHtzeiArIDIgKiBwYWR9YCk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVudUxpbmUoeTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgbGluZSA9IGNyZWF0ZUVsZW1lbnRTVkcoXCJsaW5lXCIpO1xyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMobGluZSwgeyBcInN0cm9rZS13aWR0aFwiOiBzdHJva2VXaWR0aCB9KTtcclxuICAgICAgICBtZW51QnV0dG9uLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHJldHVybiBsaW5lO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbGluZTEgPSBtZW51TGluZShzdHJva2VXaWR0aCAvIDIgKyAxKTtcclxuICAgIGNvbnN0IGxpbmUyID0gbWVudUxpbmUoc3ogLyAyKTtcclxuICAgIGNvbnN0IGxpbmUzID0gbWVudUxpbmUoc3ogLSBzdHJva2VXaWR0aCAvIDIgLSAxKTtcclxuXHJcbiAgICBjb25zdCBtZW51U3ByaW5nID0gbmV3IFNwcmluZygwKTtcclxuICAgIG1lbnVTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTIwKTtcclxuICAgIGNvbnN0IG1lbnVTcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHMgPSBtZW51U3ByaW5nLnBvc2l0aW9uICogc3o7XHJcbiAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lMSwgeyB4MTogMCwgeTE6IDAsIHgyOiBzeiwgeTI6IHMgfSk7XHJcbiAgICAgICAgbGluZTIuc3R5bGUub3BhY2l0eSA9IChzeiAtIHMpIC8gc3ogKyBcIlwiO1xyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMobGluZTIsIHsgeDE6IDAsIHkxOiBzeiAvIDIsIHgyOiBzeiwgeTI6IHN6IC8gMiB9KTtcclxuICAgICAgICBzZXRBdHRyaWJ1dGVzKGxpbmUzLCB7IHgxOiAwLCB5MTogc3osIHgyOiBzeiwgeTI6IHN6IC0gcyB9KTtcclxuICAgIH0sIFttZW51U3ByaW5nU2lnXSk7XHJcblxyXG4gICAgbGV0IGlzT3BlbmluZ01lbnUgPSBmYWxzZTtcclxuXHJcbiAgICBtZW51QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzT3BlbmluZ01lbnUpIGJlZ2luQ2xvc2VNZW51KCk7XHJcbiAgICAgICAgZWxzZSBiZWdpbk9wZW5NZW51KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIG1lbnVTcHJpbmcub25VbnJlc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lbnVTcHJpbmcucG9zaXRpb24gPT09IDApIG9wZW5NZW51KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBjbG9zZU1lbnU6ICgpID0+IHZvaWQgfCB1bmRlZmluZWQ7XHJcbiAgICBtZW51U3ByaW5nLm9uUmVzdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAobWVudVNwcmluZy5wb3NpdGlvbiA9PT0gMCAmJiBjbG9zZU1lbnUpIGNsb3NlTWVudSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBiZWdpbk9wZW5NZW51KCkge1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUuc3Ryb2tlID0gZ3JheTtcclxuICAgICAgICBtZW51U3ByaW5nLnRhcmdldCA9IDE7XHJcbiAgICAgICAgYW5pbWF0ZVNwcmluZyhtZW51U3ByaW5nLCBtZW51U3ByaW5nU2lnKTtcclxuICAgICAgICBpc09wZW5pbmdNZW51ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBiZWdpbkNsb3NlTWVudSgpIHtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLnN0cm9rZSA9IFwiI2JiYmJiYlwiO1xyXG4gICAgICAgIG1lbnVTcHJpbmcudGFyZ2V0ID0gMDtcclxuICAgICAgICBhbmltYXRlU3ByaW5nKG1lbnVTcHJpbmcsIG1lbnVTcHJpbmdTaWcpO1xyXG4gICAgICAgIGlzT3BlbmluZ01lbnUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBiZWdpbkNsb3NlTWVudSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5NZW51KCkge1xyXG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG1lbnUuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgICAgICAgbWVudS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwMDBlZVwiO1xyXG4gICAgICAgIG1lbnUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVudSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lbnVQYWdlTmF2czogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgW3BhZ2VOYW1lLCBuYXZFbGVtZW50XSBvZiBPYmplY3QuZW50cmllcyhuYXZFbGVtZW50RnJvbVN0cmluZykpIHtcclxuICAgICAgICAgICAgY29uc3QgbWVudVBhZ2VOYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2LmlubmVyVGV4dCA9IHBhZ2VOYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYuc3R5bGUuZm9udFdlaWdodCA9IFwiNTAwXCI7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICBjb2xvck9uSG92ZXIobWVudVBhZ2VOYXYsIGdyYXksIFwid2hpdGVcIik7XHJcblxyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYmVnaW5DbG9zZU1lbnUoKTtcclxuICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xpY2soKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVudVBhZ2VOYXYpO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdnMucHVzaChtZW51UGFnZU5hdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhbmltYXRlTWVudU9wYWNpdHkoKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiBbbWVudSwgLi4ubWVudVBhZ2VOYXZzXSkgZS5zdHlsZS5vcGFjaXR5ID0gbWVudVNwcmluZy5wb3NpdGlvbiArIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlZmZlY3QoYW5pbWF0ZU1lbnVPcGFjaXR5LCBbbWVudVNwcmluZ1NpZ10pO1xyXG5cclxuICAgICAgICBjb25zdCBsYXlvdXRNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBtZW51LnN0eWxlLndpZHRoID0gcHgoaW5uZXJXaWR0aCk7XHJcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBtZW51UGFnZU5hdiBvZiBtZW51UGFnZU5hdnMpIHtcclxuICAgICAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLmZvbnRTaXplID0gcHgoaW5uZXJIZWlnaHQgKiAwLjA1KTtcclxuICAgICAgICAgICAgICAgIGNlbnRlckVsZW1lbnQobWVudVBhZ2VOYXYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHlDZW50ZXJXaXRoR2FwKG1lbnVQYWdlTmF2cywgaW5uZXJIZWlnaHQgKiAwLjA4LCBpbm5lckhlaWdodCAvIDIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGVmZmVjdChsYXlvdXRNZW51LCBbYm9keVNpZ10pO1xyXG5cclxuICAgICAgICBjbG9zZU1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGJvZHlTaWcudW5zdWJzY3JpYmUobGF5b3V0TWVudSk7XHJcbiAgICAgICAgICAgIG1lbnVTcHJpbmdTaWcudW5zdWJzY3JpYmUoYW5pbWF0ZU1lbnVPcGFjaXR5KTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtZW51UGFnZU5hdiBvZiBtZW51UGFnZU5hdnMpIGJvZHkucmVtb3ZlQ2hpbGQobWVudVBhZ2VOYXYpO1xyXG4gICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKG1lbnUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYm9keS5hcHBlbmRDaGlsZChtZW51QnV0dG9uKTtcclxuXHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBoZWFkZXJJY29uU2l6ZSgpO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUud2lkdGggPSBweChzaXplKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLmhlaWdodCA9IHB4KHNpemUpO1xyXG5cclxuICAgICAgICBjb25zdCBmcm9tRWRnZSA9IHNjcm9sbENvbnRhaW5lci5vZmZzZXRUb3AgLyAyIC0gc2l6ZSAvIDI7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAtIHNpemUgLSBlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUudG9wID0gcHgoZnJvbUVkZ2UpO1xyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTmF2SXRlbXMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYWdlTmFtZSwgYWRkUGFnZV0gb2YgT2JqZWN0LmVudHJpZXMocGFnZXMpKSB7XHJcbiAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbmF2RWxlbWVudC5pbm5lckhUTUwgPSBwYWdlTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICBuYXZFbGVtZW50LnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgICAgIG5hdkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5jb2xvciA9IGdyYXk7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcclxuICAgICAgICBuYXZFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cclxuICAgICAgICBuYXZFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFuTGFzdFBhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmF2RWxlbWVudCBvZiBPYmplY3QudmFsdWVzKG5hdkVsZW1lbnRzKSkgbmF2RWxlbWVudC5zdHlsZS5jb2xvciA9IGdyYXk7XHJcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIjtcclxuXHJcbiAgICAgICAgICAgIGFkZFBhZ2UoKTtcclxuICAgICAgICAgICAgLy8gaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIFwiLyMvXCIgKyBwYWdlTmFtZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcclxuXHJcbiAgICAgICAgbmF2RWxlbWVudEZyb21TdHJpbmdbcGFnZU5hbWVdID0gbmF2RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuYXZFbGVtZW50cyA9IE9iamVjdC52YWx1ZXMobmF2RWxlbWVudEZyb21TdHJpbmcpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBhbGlnbk5hdkl0ZW0obmF2SXRlbTogSFRNTEVsZW1lbnQsIG51ZGdlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUubGVmdCA9IHB4KGVkZ2VBbGlnblgoKSk7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnN0eWxlLnRvcCA9IHB4KGlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdkVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gbmF2RWxlbWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBhbGlnbk5hdkl0ZW0obmF2SXRlbSwgaSAtIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUuZm9udFNpemUgPSBweChzICogMC4wMjUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ29Bd2F5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgtMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gcHgoLTEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdkVsZW1lbnRzLmxlbmd0aDsgaSsrKSBnb0F3YXkobmF2RWxlbWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExvZ28oKSB7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIGxvZ28uc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XHJcbiAgICBsb2dvLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgbG9nby5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGxvZ28uc3JjID0gXCJsb2dvLnN2Z1wiO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChsb2dvKTtcclxuXHJcbiAgICBsb2dvLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbmF2RWxlbWVudEZyb21TdHJpbmcudmlldy5jbGljaygpO1xyXG5cclxuICAgICAgICBjb25zdCBwdWxzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUuYmFja2dyb3VuZCA9IGllR3JlZW47XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQocHVsc2UpO1xyXG5cclxuICAgICAgICBjb25zdCBwdWxzZVNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICAgICAgcHVsc2VTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoNDApO1xyXG4gICAgICAgIGNvbnN0IHB1bHNlU3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG5cclxuICAgICAgICBwdWxzZVNwcmluZy50YXJnZXQgPSAxO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcocHVsc2VTcHJpbmcsIHB1bHNlU3ByaW5nU2lnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZVB1bHNlKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gcHVsc2VTcHJpbmcucG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IG91dCA9IDMwO1xyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS5sZWZ0ID0gcHgobG9nby5vZmZzZXRMZWZ0IC0gcyAqIG91dCk7XHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLnRvcCA9IHB4KGxvZ28ub2Zmc2V0VG9wIC0gcyAqIG91dCk7XHJcblxyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS53aWR0aCA9IHB4KGxvZ28ub2Zmc2V0V2lkdGggKyBzICogMiAqIG91dCk7XHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLmhlaWdodCA9IHB4KGxvZ28ub2Zmc2V0SGVpZ2h0ICsgcyAqIDIgKiBvdXQpO1xyXG5cclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUub3BhY2l0eSA9IDEgLSBzICsgXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1bHNlU3ByaW5nLm9uUmVzdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcHVsc2VTcHJpbmdTaWcudW5zdWJzY3JpYmUoYW5pbWF0ZVB1bHNlKTtcclxuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChwdWxzZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWZmZWN0KGFuaW1hdGVQdWxzZSwgW3B1bHNlU3ByaW5nU2lnXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGhlYWRlckljb25TaXplKCk7XHJcbiAgICAgICAgbG9nby5zdHlsZS53aWR0aCA9IHB4KHNpemUpO1xyXG4gICAgICAgIGxvZ28uc3R5bGUuaGVpZ2h0ID0gcHgoc2l6ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZyb21Ub3AgPSBzY3JvbGxDb250YWluZXIub2Zmc2V0VG9wIC8gMiAtIHNpemUgLyAyO1xyXG4gICAgICAgIGxvZ28uc3R5bGUubGVmdCA9IHB4KGVkZ2VBbGlnblgoKSk7XHJcbiAgICAgICAgbG9nby5zdHlsZS50b3AgPSBweChmcm9tVG9wKTtcclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENvcHlyaWdodCgpIHtcclxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgY29weXJpZ2h0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgY29weXJpZ2h0LmlubmVyVGV4dCA9IFwiwqkyMDI1IGkuZS4gZGVzaWduLCBpbmMuXCI7XHJcblxyXG4gICAgc3R5bGVUZXh0KGNvcHlyaWdodCwgeyBsZXR0ZXJTcGFjaW5nOiAwLjMsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IGdyYXksIGZvbnRTaXplOiAxMCwgbGluZUhlaWdodDogMjAgfSk7XHJcblxyXG4gICAgYm9keS5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLmxlZnQgPSBweChlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgICAgICBjb3B5cmlnaHQuc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgKiAwLjkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFpaWlogZG8gaXRcclxuICAgICAgICB9XHJcbiAgICB9LCBbYm9keVNpZ10pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZXR1cCgpIHtcclxuICAgIGNvbnN0IHBhZ2VOYW1lID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoXCIjL1wiLmxlbmd0aCk7XHJcbiAgICAvLyBpZiAocGFnZU5hbWUgPT09IFwiXCIpIGF3YWl0IGFuaW1hdGVJbnRybygpO1xyXG4gICAgYWRkTWVudUJ1dHRvbigpO1xyXG4gICAgYWRkTmF2SXRlbXMoKTtcclxuICAgIGFkZExvZ28oKTtcclxuICAgIGFkZENvcHlyaWdodCgpO1xyXG5cclxuICAgIGNvbnN0IHBhZ2VOYXZFbGVtZW50ID0gbmF2RWxlbWVudEZyb21TdHJpbmdbcGFnZU5hbWVdID8/IG5hdkVsZW1lbnRGcm9tU3RyaW5nLnZpZXc7XHJcbiAgICBwYWdlTmF2RWxlbWVudC5jbGljaygpO1xyXG59XHJcbnNldHVwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==