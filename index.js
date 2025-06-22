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
const bodySig = new _signal__WEBPACK_IMPORTED_MODULE_1__.Signal();
window.onresize = () => bodySig.update();
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
                MOBILE_PAD * s,
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
/* harmony export */   getHeaderBarHeight: () => (/* binding */ getHeaderBarHeight),
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
    if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)() && !e.shiftKey)
        scrollContainer.scrollBy({ left: e.deltaY });
};
const getHeaderBarHeight = () => {
    if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
        return (innerHeight - getScrollHeight()) / 2;
    }
    else {
        return innerHeight * 0.1;
    }
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
        const headerBarHeight = getHeaderBarHeight();
        scrollContainer.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(scrollWidth);
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight - headerBarHeight);
        scrollContainer.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(headerBarHeight);
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
/* harmony export */   effect: () => (/* binding */ effect)
/* harmony export */ });
class Signal {
    constructor() {
        this.subscribers = new Set();
        this.subscribe = (subscriber) => {
            this.subscribers.add(subscriber);
        };
        this.update = () => {
            this.subscribers.forEach((s) => s());
        };
        this.unsubscribe = (subscriber) => {
            this.subscribers.delete(subscriber);
        };
    }
}
function effect(func, observedSignals) {
    observedSignals.forEach((o) => o.subscribe(func));
    func();
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
const navItemFromString = {};
const edgeAlignX = () => innerHeight * 0.1;
const headerIconSize = () => (0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() * 0.4;
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
function addNavItems() {
    for (const [pageName, addPage] of Object.entries(pages)) {
        const navItem = document.createElement("span");
        navItem.innerText = pageName.toUpperCase();
        navItem.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_1__.fadeInAnimation)();
        navItem.style.position = "absolute";
        navItem.style.fontFamily = "Spartan";
        navItem.style.color = _constants__WEBPACK_IMPORTED_MODULE_1__.gray;
        navItem.style.fontWeight = "500";
        navItem.style.cursor = "pointer";
        navItem.style.whiteSpace = "nowrap";
        navItem.onclick = () => {
            (0,_page__WEBPACK_IMPORTED_MODULE_3__.cleanLastPage)();
            for (const navItem of Object.values(navItems))
                navItem.style.color = _constants__WEBPACK_IMPORTED_MODULE_1__.gray;
            navItem.style.color = "#000000";
            addPage();
            // history.pushState({}, "", "/#/" + pageName);
        };
        _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(navItem);
        navItemFromString[pageName] = navItem;
    }
    const navItems = Object.values(navItemFromString);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_2__.isLandscape)()) {
            const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getScrollHeight)();
            function alignNavItem(navItem, nudge) {
                navItem.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
                navItem.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
            }
            for (let i = 0; i < navItems.length; i++) {
                const navItem = navItems[i];
                navItem.style.visibility = "visible";
                alignNavItem(navItem, i - 2);
                navItem.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(s * 0.025);
            }
        }
        else {
            for (const navItem of navItems)
                navItem.style.visibility = "hidden";
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function addHeaderBar() {
    const headerBar = document.createElement("div");
    headerBar.style.position = "absolute";
    headerBar.style.background = "white";
    _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(headerBar);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        headerBar.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerWidth);
        headerBar.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)());
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
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
        for (const [pageName, navItem] of Object.entries(navItemFromString)) {
            const menuPageNav = document.createElement("span");
            menuPageNav.style.position = "absolute";
            menuPageNav.innerText = pageName.toUpperCase();
            menuPageNav.style.fontFamily = "Spartan";
            menuPageNav.style.fontWeight = "500";
            menuPageNav.style.cursor = "pointer";
            (0,_util__WEBPACK_IMPORTED_MODULE_0__.colorOnHover)(menuPageNav, _constants__WEBPACK_IMPORTED_MODULE_1__.gray, "white");
            menuPageNav.onclick = () => {
                beginCloseMenu();
                navItem.click();
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
        menuButton.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerWidth - size - edgeAlignX());
        menuButton.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() - size) / 2);
        _layout__WEBPACK_IMPORTED_MODULE_2__.centerElement;
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
        navItemFromString.view.click();
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
        logo.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
        logo.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() - size) / 2);
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function addCopyright() {
    const copyright = document.createElement("span");
    copyright.style.position = "absolute";
    copyright.innerText = "©2025 i.e. design, inc.";
    copyright.style.whiteSpace = "nowrap";
    (0,_layout__WEBPACK_IMPORTED_MODULE_2__.styleText)(copyright, { letterSpacing: 0.3, fontWeight: 500, color: _constants__WEBPACK_IMPORTED_MODULE_1__.gray, fontSize: 10, lineHeight: 20 });
    _constants__WEBPACK_IMPORTED_MODULE_1__.body.appendChild(copyright);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_2__.isLandscape)()) {
            copyright.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
            copyright.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(innerHeight * 0.9);
        }
        else {
            // ZZZZ need to do something here
            copyright.style.visibility = "hidden";
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_1__.bodySig]);
}
function setup() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const pageName = location.hash.substring("#/".length);
        // if (pageName === "") await animateIntro();
        addNavItems();
        addHeaderBar();
        addMenuButton();
        addLogo();
        addCopyright();
        const pagenavItem = (_a = navItemFromString[pageName]) !== null && _a !== void 0 ? _a : navItemFromString.view;
        pagenavItem.click();
    });
}
setup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDZDQUE2QztRQUM3QyxXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBRSxDQUFDO1FBQ2YsYUFBYSxFQUFFLENBQUM7UUFDaEIsT0FBTyxFQUFFLENBQUM7UUFDVixZQUFZLEVBQUUsQ0FBQztRQUVmLE1BQU0sV0FBVyxHQUFHLHVCQUFpQixDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDMUUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDOztDQUN2QjtBQUNELEtBQUssRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2xheW91dC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvZXZvbHV0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2luc3BpcmF0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvd29yay50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zY3JvbGwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2lnbmFsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NwcmluZy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNMYW5kc2NhcGUgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5leHBvcnQgY29uc3QgYm9keVNpZyA9IG5ldyBTaWduYWwoKTtcbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IGJvZHlTaWcudXBkYXRlKCk7XG5cbmV4cG9ydCBjb25zdCBpZUJsdWUgPSBcIiM2MDlDQ0VcIjtcbmV4cG9ydCBjb25zdCBpZUdyZWVuID0gXCIjYmZlMDIxXCI7XG5leHBvcnQgY29uc3QgZ3JheSA9IFwiIzgwODA4MFwiO1xuXG5leHBvcnQgY29uc3QgZmFkZUluQW5pbWF0aW9uID0gKCkgPT4gYGZhZGVJbiR7aXNMYW5kc2NhcGUoKSA/IFwiWFwiIDogXCJZXCJ9IGVhc2UgMC42c2A7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuOTU7XG4iLCJpbXBvcnQgeyBpbnRlcmxhY2VkIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5pbnRlcmZhY2UgRWxlbWVudEFsaWdubWVudCB7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgb2Zmc2V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dERldGFpbHMge1xuICAgIGxldHRlclNwYWNpbmc6IG51bWJlcjtcbiAgICBmb250V2VpZ2h0OiBudW1iZXI7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBmb250U2l6ZTogbnVtYmVyO1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGxpbmVIZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB4KHBpeGVsczogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHBpeGVscyArIFwicHhcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduV2l0aEdhcChsZWZ0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQsIGdhcDogbnVtYmVyKSB7XG4gICAgcmlnaHRFbGVtZW50LnN0eWxlLmxlZnQgPSBweChsZWZ0RWxlbWVudC5vZmZzZXRMZWZ0ICsgbGVmdEVsZW1lbnQub2Zmc2V0V2lkdGggKyBnYXApO1xufVxuXG5mdW5jdGlvbiBheGlzQWxpZ25pbmdXaXRoR2FwcyhheGlzU2l6ZTogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGVsZW1lbnRPckdhcHM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSk6IFtFbGVtZW50QWxpZ25tZW50W10sIG51bWJlcl0gPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50QWxpZ25tZW50cyA9IFtdO1xuICAgICAgICBsZXQgcnVubmluZ1RvdGFsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50T3JHYXAgb2YgZWxlbWVudE9yR2Fwcykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRPckdhcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEFsaWdubWVudHMucHVzaCh7IGVsZW1lbnQ6IGVsZW1lbnRPckdhcCwgb2Zmc2V0OiBydW5uaW5nVG90YWwgfSk7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGF4aXNTaXplKGVsZW1lbnRPckdhcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBlbGVtZW50T3JHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtlbGVtZW50QWxpZ25tZW50cywgcnVubmluZ1RvdGFsXTtcbiAgICB9O1xufVxuXG4vLyBaWlpaIHdhbnQgYSBzaG9ydCBoYW5kIGZvciBjb21tb24gc2ltcGxlIHVzZVxuZXhwb3J0IGNvbnN0IGFsaWduaW5nV2l0aEdhcHNZID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbmV4cG9ydCBjb25zdCBhbGlnbmluZ1dpdGhHYXBzWCA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50Lm9mZnNldFdpZHRoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB3aWR0aDogbnVtYmVyKSB7XG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KHdpZHRoKTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoKHdpZHRoICogZWxlbWVudC5uYXR1cmFsSGVpZ2h0KSAvIGVsZW1lbnQubmF0dXJhbFdpZHRoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KChoZWlnaHQgKiBlbGVtZW50Lm5hdHVyYWxXaWR0aCkgLyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMYW5kc2NhcGUoKSB7XG4gICAgcmV0dXJuIGlubmVyV2lkdGggLyBpbm5lckhlaWdodCA+IDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB5Q2VudGVyV2l0aEdhcChlbGVtZW50czogSFRNTEVsZW1lbnRbXSwgZ2FwOiBudW1iZXIsIGNlbnRlcjogbnVtYmVyKSB7XG4gICAgY29uc3QgZWxlbWVudHNXaXRoR2FwcyA9IGludGVybGFjZWQoZWxlbWVudHMsIGdhcCk7XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCB0b3RhbEhlaWdodF0gPSBhbGlnbmluZ1dpdGhHYXBzWShlbGVtZW50c1dpdGhHYXBzKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIGNlbnRlciAtIHRvdGFsSGVpZ2h0IC8gMik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KGlubmVyV2lkdGggLyAyIC0gZWxlbWVudC5vZmZzZXRXaWR0aCAvIDIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVUZXh0KHNjcm9sbFRleHQ6IEhUTUxFbGVtZW50LCBzOiBUZXh0RGV0YWlscykge1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udEZhbWlseSA9IFwiU3BhcnRhblwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5mb250V2VpZ2h0ID0gXCJcIiArIHMuZm9udFdlaWdodDtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmNvbG9yID0gcy5jb2xvcjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxldHRlclNwYWNpbmcgPSBweChzLmxldHRlclNwYWNpbmcpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFNpemUgPSBweChzLmZvbnRTaXplKTtcbiAgICBpZiAocy53aWR0aCkgc2Nyb2xsVGV4dC5zdHlsZS53aWR0aCA9IHB4KHMud2lkdGgpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGluZUhlaWdodCA9IHB4KHMubGluZUhlaWdodCk7XG59XG4iLCJpbXBvcnQgeyBib2R5U2lnIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuZXhwb3J0IGNvbnN0IHBhZ2VDbGVhbnVwcyA9IG5ldyBTZXQ8KCkgPT4gdm9pZD4oKTtcblxuY29uc3QgYXdhaXRCZWZvcmVMYXlvdXRzID0gbmV3IFNldDxQcm9taXNlPHZvaWQ+PigpO1xuY29uc3QgYmVmb3JlTGF5b3V0cyA9IG5ldyBTZXQ8KCkgPT4gdm9pZD4oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgYXdhaXRCZWZvcmVMYXlvdXRzLmFkZChpbWFnZS5kZWNvZGUoKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlclVwZGF0ZUxheW91dCh1cGRhdGVMYXlvdXQ6ICgpID0+IHZvaWQpIHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChhd2FpdEJlZm9yZUxheW91dHMpO1xuICAgIGF3YWl0QmVmb3JlTGF5b3V0cy5jbGVhcigpO1xuICAgIHJ1bkFsbEFuZENsZWFyKGJlZm9yZUxheW91dHMpO1xuXG4gICAgZWZmZWN0KHVwZGF0ZUxheW91dCwgW2JvZHlTaWddKTtcbiAgICBwYWdlQ2xlYW51cHMuYWRkKCgpID0+IGJvZHlTaWcudW5zdWJzY3JpYmUodXBkYXRlTGF5b3V0KSk7XG5cbiAgICB1cGRhdGVMYXlvdXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENoaWxkRm9yUGFnZShwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpIHtcbiAgICBiZWZvcmVMYXlvdXRzLmFkZCgoKSA9PiB7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbkxhc3RQYWdlKCkge1xuICAgIHJ1bkFsbEFuZENsZWFyKHBhZ2VDbGVhbnVwcyk7XG59XG5cbmZ1bmN0aW9uIHJ1bkFsbEFuZENsZWFyKHNldDogU2V0PCgpID0+IHZvaWQ+KSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHNldCkgaXRlbSgpO1xuICAgIHNldC5jbGVhcigpO1xufVxuIiwiaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1gsIGFsaWduaW5nV2l0aEdhcHNZLCBweCwgc2V0V2lkdGgsIHN0eWxlVGV4dCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0LCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5cbmZ1bmN0aW9uIGFkZEljb24oaW1hZ2VTcmM6IHN0cmluZywgY2xpY2tMaW5rOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpY29uID0gYWRkU2Nyb2xsSW1hZ2UoaW1hZ2VTcmMpO1xuICAgIGljb24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgaWNvbi5vbmNsaWNrID0gKCkgPT4gd2luZG93Lm9wZW4oY2xpY2tMaW5rKTtcbiAgICByZXR1cm4gaWNvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbm5lY3RQYWdlKCkge1xuICAgIGNvbnN0IGNvbm5lY3QgPSBhZGRTY3JvbGxJbWFnZShcImNvbm5lY3QvY29ubmVjdC5zdmdcIik7XG4gICAgY29uc3QgdGV4dHMgPSBbXG4gICAgICAgIGFkZFNjcm9sbFRleHQoXCJPdXIgY2xpZW50cyBsb29rIHRvIHVzIGZvciBtb3JlIHRoYW4gYXdhcmQtd2lubmluZyBkZXNpZ24uIFRoZXkgdmFsdWUgb3VyIHJvbGUgYXMgdHJ1c3RlZCBhZHZpc29yLCBzdXBwb3J0LCBhbmQgY29uZmlkYW50LlwiKSxcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIldlIGxvb2sgZm9yIHN5bmVyZ3kgYW5kIGNvbXBhdGliaWxpdHkgaW4gZXZlcnkgcmVsYXRpb25zaGlwIHdlIGJ1aWxkIHNvIHRoZSB3b3JrIGV4cGVyaWVuY2UgZG9lc27igJl0IGZlZWwgbGlrZSB3b3JrIGF0IGFsbC5cIiksXG4gICAgICAgIGFkZFNjcm9sbFRleHQoXCJJZiB5b3VyIGd1dCBpcyB0ZWxsaW5nIHlvdSB3ZSBzaG91bGQgY29ubmVjdCwgbm93IGlzIHRoZSBwZXJmZWN0IHRpbWUgdG8gZW1haWwuXCIpLFxuICAgIF07XG4gICAgY29uc3QgbGV0c01lZXQgPSBhZGRTY3JvbGxJbWFnZShcImNvbm5lY3QvbGV0cy1tZWV0LmpwZ1wiKTtcbiAgICBjb25zdCB3aG8gPSBhZGRTY3JvbGxUZXh0KFwiQmV0aGx5biBLcmFrYXVlciwgRm91bmRlciBhbmQgQ3JlYXRpdmUgRGlyZWN0b3JcIik7XG5cbiAgICBjb25zdCBpbnN0YWdyYW1JY29uID0gYWRkSWNvbihcImNvbm5lY3QvaW5zdGFncmFtLWljb24uc3ZnXCIsIFwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9pZWRlc2lnbmluY1wiKTtcbiAgICBjb25zdCBsaW5rZWRpbkljb24gPSBhZGRJY29uKFwiY29ubmVjdC9saW5rZWRpbi1pY29uLnN2Z1wiLCBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9jb21wYW55L2ktZS1kZXNpZ24taW5jXCIpO1xuICAgIGNvbnN0IG1haWxJY29uID0gYWRkSWNvbihcImNvbm5lY3QvbWFpbC1pY29uLnN2Z1wiLCBcIm1haWx0bzpiZXRoQGllLWRlc2lnbi5jb21cIik7XG5cbiAgICBjb25zdCBpY29ucyA9IFtpbnN0YWdyYW1JY29uLCBsaW5rZWRpbkljb24sIG1haWxJY29uXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNvbnN0IHdpZHRoID0gMC41NSAqIHM7XG4gICAgICAgIHNldFdpZHRoKGNvbm5lY3QsIHdpZHRoKTtcbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShsZXRzTWVldCwgMC44KTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRleHQgb2YgdGV4dHMpIHN0eWxlVGV4dCh0ZXh0LCB7IGxldHRlclNwYWNpbmc6IDAuMTgsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjggKiBzLCB3aWR0aCwgbGluZUhlaWdodDogMC4wNSAqIHMgfSk7XG4gICAgICAgIHN0eWxlVGV4dCh3aG8sIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfSk7XG5cbiAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNZKFtcbiAgICAgICAgICAgIGNvbm5lY3QsIC8vXG4gICAgICAgICAgICAwLjA5ICogcyxcbiAgICAgICAgICAgIHRleHRzWzBdLFxuICAgICAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgICAgICB0ZXh0c1sxXSxcbiAgICAgICAgICAgIDAuMDMgKiBzLFxuICAgICAgICAgICAgdGV4dHNbMl0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyAwLjA1ICogcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXRzTWVldC5zdHlsZS5sZWZ0ID0gcHgoY29ubmVjdC5vZmZzZXRMZWZ0ICsgY29ubmVjdC5vZmZzZXRXaWR0aCArIDAuMTUgKiBzKTtcblxuICAgICAgICB3aG8uc3R5bGUubGVmdCA9IHB4KGxldHNNZWV0Lm9mZnNldExlZnQpO1xuICAgICAgICB3aG8uc3R5bGUudG9wID0gcHgobGV0c01lZXQub2Zmc2V0VG9wICsgbGV0c01lZXQub2Zmc2V0SGVpZ2h0ICsgMC4wNCAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgaWNvbiBvZiBpY29ucykge1xuICAgICAgICAgICAgaWNvbi53aWR0aCA9IHMgKiAwLjA1NTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RUZXh0ID0gdGV4dHNbdGV4dHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpY29uLnN0eWxlLnRvcCA9IHB4KGxhc3RUZXh0Lm9mZnNldFRvcCArIGxhc3RUZXh0Lm9mZnNldEhlaWdodCArIDAuMDMgKiBzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbaWNvbkFsaWdubWVudHMsIF9fXSA9IGFsaWduaW5nV2l0aEdhcHNYKFtpbnN0YWdyYW1JY29uLCAwLjAzICogcywgbGlua2VkaW5JY29uLCAwLjAzICogcywgbWFpbEljb25dKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgaWNvbkFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllR3JlZW4gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgYWxpZ25pbmdXaXRoR2Fwc1ksIHB4LCBzZXRIZWlnaHQsIHN0eWxlVGV4dCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxQYWRkaW5nLCBhZGRTY3JvbGxUZXh0LCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQsIHNjcm9sbENvbnRhaW5lciB9IGZyb20gXCIuLi9zY3JvbGxcIjtcblxuaW50ZXJmYWNlIFF1b3RlIHtcbiAgICBxdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgYXV0aG9yOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICB0aXRsZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgb3BlblF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBjbG9zZVF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkUXVvdGUocXVvdGVUZXh0OiBzdHJpbmcsIGF1dGhvclRleHQ6IHN0cmluZywgdGl0bGVUZXh0OiBzdHJpbmcpOiBRdW90ZSB7XG4gICAgY29uc3QgcXVvdGUgPSBhZGRTY3JvbGxUZXh0KHF1b3RlVGV4dCk7XG4gICAgcXVvdGUuc3R5bGUuYW5pbWF0aW9uID0gXCJcIjsgLy8gY2FuJ3QgYW5pbWF0ZSBpbiBvdGhlcndpc2UgY2xvc2UgcXVvdGUgYm91bmRpbmcgYm94IHNoaXQgZ2V0cyBjb25mdXNlZFxuICAgIGNvbnN0IGF1dGhvciA9IGFkZFNjcm9sbFRleHQoYXV0aG9yVGV4dCk7XG4gICAgY29uc3QgdGl0bGUgPSBhZGRTY3JvbGxUZXh0KHRpdGxlVGV4dCk7XG4gICAgY29uc3Qgb3BlblF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnFwiKTtcbiAgICBjb25zdCBjbG9zZVF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnVwiKTtcblxuICAgIHJldHVybiB7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3Qgd2lkdGhTY2FsZSA9IDAuNzU7XG4gICAgc3R5bGVUZXh0KHF1b3RlLCB7IGxldHRlclNwYWNpbmc6IDAuMTgsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMzIgKiBzLCB3aWR0aDogd2lkdGhTY2FsZSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDY1ICogcyB9KTtcblxuICAgIHN0eWxlVGV4dChhdXRob3IsIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDM1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICBhdXRob3Iuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiO1xuXG4gICAgc3R5bGVUZXh0KHRpdGxlLCB7IGxldHRlclNwYWNpbmc6IDAuMTUsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjUgKiBzLCB3aWR0aDogd2lkdGhTY2FsZSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDYgKiBzIH0pO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIGNvbnN0IHF1b3RlVGV4dERldGFpbHMgPSB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogaWVHcmVlbiwgZm9udFNpemU6IDAuMTUgKiBzLCB3aWR0aDogMC4wNSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDYgKiBzIH07XG4gICAgc3R5bGVUZXh0KG9wZW5RdW90ZSwgcXVvdGVUZXh0RGV0YWlscyk7XG4gICAgc3R5bGVUZXh0KGNsb3NlUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xufVxuXG5mdW5jdGlvbiBsYXlvdXRRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBhdXRob3Iuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuICAgIHRpdGxlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0KTtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWShbXG4gICAgICAgIHF1b3RlLCAvL1xuICAgICAgICAwLjA0ICogcyxcbiAgICAgICAgYXV0aG9yLFxuICAgICAgICAtMC4wMTUgKiBzLFxuICAgICAgICB0aXRsZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIDAuMzUgKiBzKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvcnRhIGphbmsuIGFnYWluLCBjbG9zZSBxdW90ZSBib3VuZGluZyBib3ggZ2V0cyBjb25mdXNlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhxdW90ZSk7XG4gICAgICAgIGNvbnN0IHJlY3RzID0gcmFuZ2UuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyUmVjdCA9IHNjcm9sbENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgbGFzdFRleHRMaW5lUmVjdCA9IHJlY3RzW3JlY3RzLmxlbmd0aCAtIDFdO1xuICAgICAgICBjb25zdCBsYXN0UmVjdExlZnQgPSBsYXN0VGV4dExpbmVSZWN0LmxlZnQgLSBzY3JvbGxDb250YWluZXJSZWN0LmxlZnQgKyBzY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdDtcblxuICAgICAgICBvcGVuUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgLSAwLjA3ICogcyk7XG4gICAgICAgIG9wZW5RdW90ZS5zdHlsZS50b3AgPSBweChxdW90ZS5vZmZzZXRUb3AgKyAwLjA1ICogcyk7XG4gICAgICAgIGNsb3NlUXVvdGUuc3R5bGUubGVmdCA9IHB4KGxhc3RSZWN0TGVmdCArIGxhc3RUZXh0TGluZVJlY3Qud2lkdGgpO1xuICAgICAgICBjbG9zZVF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIHF1b3RlLm9mZnNldEhlaWdodCAtIDAuMDEgKiBzKTtcbiAgICB9LCAxMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZvbHV0aW9uUGFnZSgpIHtcbiAgICBjb25zdCBldm9sdXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9ldm9sdXRpb24uc3ZnXCIpO1xuICAgIGNvbnN0IGV2b2x1dGlvbkhpc3RvcnkgPSBhZGRTY3JvbGxJbWFnZShcImV2b2x1dGlvbi9ldm9sdXRpb24taGlzdG9yeS5zdmdcIik7XG4gICAgY29uc3QgbG9nb0Z1bGwgPSBhZGRTY3JvbGxJbWFnZShcImxvZ28tZnVsbC5zdmdcIik7XG5cbiAgICBjb25zdCBwcm9tb3M6IEhUTUxJbWFnZUVsZW1lbnRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykgcHJvbW9zLnB1c2goYWRkU2Nyb2xsSW1hZ2UoYGV2b2x1dGlvbi9wcm9tby0ke2l9LmpwZ2ApKTtcblxuICAgIGNvbnN0IHF1b3RlcyA9IFtcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIk91ciBhbm51YWwgcHJvbW8gaXMgYWx3YXlzIGdyb3VuZGVkIGluIG91ciBpZGVudGl0eSBidXQgaXQncyBmdW4gdG8gcHVzaCBsaW1pdHMgYW5kIHJlaW52ZW50IG91cnNlbHZlcyBlYWNoIHllYXIuIFRoZSBiZXN0IHBhcnQgaXMgPHN0cm9uZz5oZWFyaW5nIHdoYXQgb3VyIGNsaWVudHMgaGF2ZSB0byBzYXkuPC9zdHJvbmc+XCIsXG4gICAgICAgICAgICBcIkJFVEhMWU4gS1JBS0FVRVJcIixcbiAgICAgICAgICAgIFwiRm91bmRlciwgaS5lLiBkZXNpZ24sIGluYy5cIlxuICAgICAgICApLFxuICAgICAgICBhZGRRdW90ZShcIkkgbG92ZSBob3cgeW91IGRvIHN0dWZmLiBJJ20gZmluZGluZyB0aGF0IHRoZXNlIHR5cGVzIG9mIG1lc3NhZ2VzIGFyZSByZWFsbHkgPHN0cm9uZz50cmFuc2Zvcm1pbmcgcmVsYXRpb25zaGlwczwvc3Ryb25nPiB3aXRoIHBlb3BsZS4gVGhleSBhcmUganVzdCBkcmVhbXkuXCIsIFwiREVCUkEgU0NIQVRaS0lcIiwgXCJGb3VuZGVyLCBCUFAgV2VhbHRoIFNvbHV0aW9ucyBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBzZWUgYSBsb3Qgb2YgdGhpcyBzcGVjaWFsIHF1YWxpdHkgaW4geW91ciB3b3JrLiBJdCdzIG5vdCBqdXN0IGFib3V0IGJlaW5nIGludGVudGlvbmFsLiBZb3UgYWx3YXlzIGJyaW5nIGluIGFuIGVsZW1lbnQgb2YgPHN0cm9uZz5zdXJwcmlzZSBhbmQgZGVsaWdodC48L3N0cm9uZz5cIiwgXCJKT1NIIEtSQUtBVUVSXCIsIFwiRm91bmRlciwgU2N1bHB0XCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdXIgYXBwcm9hY2ggd29ya3Mgc28gd2VsbCBiZWNhdXNlIGl0IGlzIHJlYWxseSA8c3Ryb25nPnBlcnNvbmFsPC9zdHJvbmc+IGFuZCBlcXVhbGx5IDxzdHJvbmc+cHJvZmVzc2lvbmFsLjwvc3Ryb25nPlwiLCBcIkFOTiBTVUxMSVZBTlwiLCBcIkZvdW5kZXIsIEFubiBTdWxsaXZhbiBPcmdhbml6aW5nXCIpLFxuICAgICAgICBhZGRRdW90ZShcIllvdSB0cnVseSB1bmRlcnN0YW5kIHRoZSB1bmlxdWUgcG9zaXRpb25pbmcgb2YgYSBwcm9zcGVjdGl2ZSBjbGllbnQgYW5kIGFyZSBhYmxlIHRvIDxzdHJvbmc+dGVsbCB0aGVpciBzdG9yeTwvc3Ryb25nPiBleGFjdGx5IGFzIGl0IHNob3VsZCBiZSB0b2xkLlwiLCBcIkRBVklEIFlVTlwiLCBcIlByaW5jaXBhbCwgVmFyaWRlbnQgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiQmV0aCBpcyBxdWl0ZSBmcmFua2x5IG9uZSBvZiB0aGUgPHN0cm9uZz5tb3N0IHRhbGVudGVkIGRlc2lnbmVyczwvc3Ryb25nPiB0aGF0IEkgaGF2ZSBldmVyIGhhZCB0aGUgcHJpdmlsZWdlIHRvIHdvcmsgd2l0aC4gU2hlIGFsd2F5cyBoYXMgYSBzcGVjaWFsIHdheSBvZiBtYWtpbmcgZXZlcnl0aGluZyBzaGUgdG91Y2hlcyB0dXJuIHRvIGdvbGQhXCIsXG4gICAgICAgICAgICBcIkRBVklEIFJVU0hcIixcbiAgICAgICAgICAgIFwiUHJlc2lkZW50LCBFTlZcIlxuICAgICAgICApLFxuICAgIF07XG5cbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gYWRkU2Nyb2xsUGFkZGluZygpO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShldm9sdXRpb24sIDAuNzUpO1xuICAgICAgICBzZXRIZWlnaHQoZXZvbHV0aW9uSGlzdG9yeSwgMC4zICogcyk7XG4gICAgICAgIHNldEhlaWdodChsb2dvRnVsbCwgMC40NSAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW9zKSBjZW50ZXJXaXRoaW5TY3JvbGxZKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbZXZvbHV0aW9uLCAwLjIgKiBzLCBldm9sdXRpb25IaXN0b3J5XTtcblxuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heChxdW90ZXMubGVuZ3RoLCBwcm9tb3MubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPCBxdW90ZXMubGVuZ3RoKSBpdGVtcy5wdXNoKDAuMyAqIHMsIHF1b3Rlc1tpXS5xdW90ZSk7XG4gICAgICAgICAgICBpZiAoaSA8IHByb21vcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcHJvbW9zW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtcy5wdXNoKDAuMiAqIHMsIHNjcm9sbFBhZGRpbmcpO1xuXG4gICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWChpdGVtcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZvbHV0aW9uSGlzdG9yeS5zdHlsZS50b3AgPSBweChldm9sdXRpb24ub2Zmc2V0VG9wICsgZXZvbHV0aW9uLm9mZnNldEhlaWdodCAtIGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICBsb2dvRnVsbC5zdHlsZS5sZWZ0ID0gcHgoZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRMZWZ0ICsgKGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0V2lkdGggLSBsb2dvRnVsbC5vZmZzZXRXaWR0aCkgLyAyKTtcbiAgICAgICAgbG9nb0Z1bGwuc3R5bGUudG9wID0gcHgoZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRUb3AgLSBsb2dvRnVsbC5vZmZzZXRIZWlnaHQgLSAwLjEgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaWVCbHVlIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25XaXRoR2FwLCBhbGlnbmluZ1dpdGhHYXBzWSwgcHgsIHN0eWxlVGV4dCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxQYWRkaW5nLCBhZGRTY3JvbGxUZXh0LCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5cbmNvbnN0IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiA9IDAuODU7XG5cbmludGVyZmFjZSBJbnNwaXJhdGlvblRpbGUge1xuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcjogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZE1vcmU6IEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBzdHlsZUluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIHN0eWxlVGV4dChtYWpvciwgeyBsZXR0ZXJTcGFjaW5nOiAwLjYsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMzYgKiBzLCB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSk7XG4gICAgc3R5bGVUZXh0KG1pbm9yLCB7IGxldHRlclNwYWNpbmc6IDAuMywgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyNyAqIHMsIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcbiAgICBzdHlsZVRleHQocmVhZE1vcmUsIHsgbGV0dGVyU3BhY2luZzogMC41LCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBpZUJsdWUsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH0pO1xuXG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoMC41NSAqIHMpO1xufVxuXG5mdW5jdGlvbiBhbGlnbkluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIG1ham9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIHJlYWRNb3JlLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNZKFtcbiAgICAgICAgaW1hZ2UsIC8vXG4gICAgICAgIDAuMDMgKiBzLFxuICAgICAgICBtYWpvcixcbiAgICAgICAgLTAuMDEgKiBzLFxuICAgICAgICBtaW5vcixcbiAgICAgICAgMC4wMSAqIHMsXG4gICAgICAgIHJlYWRNb3JlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgcyAqIDAuMTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25UaWxlKGltYWdlU3RyaW5nOiBzdHJpbmcsIG1ham9yVGV4dDogc3RyaW5nLCBtaW5vclRleHQ6IHN0cmluZyk6IEluc3BpcmF0aW9uVGlsZSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhZGRTY3JvbGxJbWFnZShpbWFnZVN0cmluZyk7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3IgPSBhZGRTY3JvbGxUZXh0KG1pbm9yVGV4dCk7XG4gICAgY29uc3QgcmVhZE1vcmUgPSBhZGRTY3JvbGxUZXh0KFwiUmVhZCBtb3JlXCIpO1xuXG4gICAgcmV0dXJuIHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uUGFnZSgpIHtcbiAgICBjb25zdCBpbnNwaXJhdGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiaW5zcGlyYXRpb24vaW5zcGlyYXRpb24uc3ZnXCIpO1xuXG4gICAgY29uc3QgdGlsZXMgPSBbXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3l1bWllLmpwZ1wiLCBcIlRIRSBTVEFSVCBPRiBTT01FVEhJTkcgWVVNLUlFXCIsIFwiV2UgYWx3YXlzIHdhbnRlZCB0byBkZXNpZ24gY2hvY29sYXRlIGJhcnMgYW5kIGZpbmFsbHkgZGlkIGl0LiBJbnRyb2R1Y2luZyBvdXIgc3dlZXQgbmV3IGJyYW5kLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vd29yZHMtaWRlYXMuanBnXCIsIFwiU0hBUkUgU09NRSBERVNJR04gTE9WRVwiLCBcIlRoZSBpLmUuIGRlc2lnbiBwcm9tbyBqb3VybmFscyBlbmNvdXJhZ2UgY2xpZW50cyB0byBza2V0Y2ggdGhlaXIgYmlnIGlkZWFzIGFuZCBjYXB0dXJlIHRoZWlyIGRyZWFtcy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Nvb2staWUuanBnXCIsIFwiR09UVEEgTE9WRSBBIENPT0stSUVcIiwgXCJIb3cgYSBzZWNyZXQgcmVjaXBlIHdvcmtzIHRvIGJyaW5nIHJlbGF0aW9uc2hpcHMgdG8gYSB3aG9sZSBuZXcgbGV2ZWwuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZW1peC5qcGdcIiwgXCJSRU1JWFwiLCBcIkEgYmVoaW5kLXRoZS1zY2VuZXMgbG9vayBhdCBob3cgd2UgdHJhbnNmb3JtZWQgY2xhc3NpYyBtZW1vcnkgY2FycmllcnMgaW50byBvYmplY3RzIG9mIGFydC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2tyZW1wYS5wbmdcIiwgXCJSRUJSQU5ESU5HIEEgRkFNSUxZIEJVU0lORVNTXCIsIFwiQSByZWZyZXNoIGZvciBhIDUwLXllYXIgbGVnYWN5LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZm90b3N0b3JpLmpwZ1wiLCBcIkJSQU5ESU5HIEZST00gVEhFIE5BTUUgVVBcIiwgXCJXaGVuIGEgY2xpZW50IGhhZCBhbiBpZGVhIGZvciBhIGJyYW5kIHNwaW5vZmYsIHdlIHRvb2sgaGVyIGNvbmNlcHQgdG8gcmVhbGl0eSBhbmQgbGF1bmNoZWQgdGhlIGJ1c2luZXNzIGluIGhpZ2ggc3R5bGUuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9pbnNwaXJlZC0yLWNyZWF0ZS5qcGdcIiwgXCJJTlNQSVJFRCAyIENSRUFURVwiLCBcIkEgcGFpbnRpbmcgaW5zcGlyZWQgYnkgdGhlIGkuZS4gZGVzaWduIGxvZ28gY29tYmluZXMgb2lsIHBhaW50cywgZ3JvdW5kIHVwIGNyYXlvbnMsIGFuZCBhIGxlZ28uXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mcm9tLWluc2lkZS5qcGdcIiwgXCJUSEUgVklFVyBGUk9NIElOU0lERVwiLCBcImkuZS4gZGVzaWduJ3MgbmV3IHN0dWRpbyB3YXMgMzAgeWVhcnMgaW4gdGhlIG1ha2luZy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlY29ubmVjdGluZy5qcGdcIiwgXCJSRUNPTk5FQ1RJTkdcIiwgXCJIb3cgdW5jZXJ0YWluIHRpbWVzIGxlZCB0byBhIGhvbWVjb21pbmcgZm9yIGkuZS4gZGVzaWduJ3Mgc2VuaW9yIGRlc2lnbmVyLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vbmV3LXN0dWRpby5qcGdcIiwgXCJORVcgU1RVRElPLiBORVcgVklFVy5cIiwgXCJIb3cgdGhlIG5lZWQgZm9yIGluc3BpcmF0aW9uIGZ1ZWxlZCB0aGUgYnVpbGRpbmcgb2YgYSBzdHVkaW8uXCIpLFxuICAgIF07XG5cbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gYWRkU2Nyb2xsUGFkZGluZygpO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShpbnNwaXJhdGlvbiwgMC43NSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBzdHlsZUluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBhbGlnbldpdGhHYXAoaW5zcGlyYXRpb24sIHRpbGVzWzBdLmltYWdlLCAwLjI1ICogcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoIC0gMTsgaSsrKSBhbGlnbldpdGhHYXAodGlsZXNbaV0uaW1hZ2UsIHRpbGVzW2kgKyAxXS5pbWFnZSwgMC4xICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBhbGlnbkluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBjb25zdCBsYXN0SW1hZ2UgPSB0aWxlc1t0aWxlcy5sZW5ndGggLSAxXS5pbWFnZTtcbiAgICAgICAgc2Nyb2xsUGFkZGluZy5zdHlsZS5sZWZ0ID0gcHgobGFzdEltYWdlLm9mZnNldExlZnQgKyBsYXN0SW1hZ2Uub2Zmc2V0V2lkdGggKyAwLjEgKiBzKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgYWxpZ25pbmdXaXRoR2Fwc1ksIGlzTGFuZHNjYXBlLCBweCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcclxuaW1wb3J0IHsgcmVnaXN0ZXJVcGRhdGVMYXlvdXQgfSBmcm9tIFwiLi4vcGFnZVwiO1xyXG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsUGFkZGluZywgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBjZW50ZXJXaXRoaW5TY3JvbGxYLCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQsIGdldFNjcm9sbFdpZHRoLCBzY3JvbGxDb250YWluZXIsIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSwgVGV4dFNxdWFyZSB9IGZyb20gXCIuLi9zY3JvbGxcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRWaWV3UGFnZSgpIHtcclxuICAgIGNvbnN0IGhvbWUgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9tZS5zdmdcIik7XHJcbiAgICBjb25zdCBob3Jpem9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvcml6b24uanBnXCIpO1xyXG4gICAgY29uc3QgZnJlc2hMb29rID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2ZyZXNoLWxvb2suc3ZnXCIpO1xyXG4gICAgY29uc3QgZ3JlYXRCcmFuZHMgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZ3JlYXQtYnJhbmRzLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMSA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJHUkVBVCBCUkFORFMgRE9OJ1QgSlVTVCBIQVBQRU5cIixcclxuICAgICAgICBcIlRoZXkgcmVxdWlyZSBleHBsb3JhdGlvbiwgaW5zaWdodCwgYW5kIHRlbmFjaXR5LiBXZSBodW50IGZvciB0aGF0IG1hZ2ljIHNwYXJrIHRoYXQgaWduaXRlcyBpbm5vdmF0aW9uLiBXZSBicmluZyBvdXIgZXh0ZW5zaXZlIHNraWxscyBhbmQgZXhwZXJpZW5jZSB0byBlYWNoIHByb2plY3QgYW5kIGdpdmUgaXQgb3VyIGFsbC4gVGhlIHJlc3VsdCBpcyBjbGVhciwgeWV0IGVsZXZhdGVkIGNvbW11bmljYXRpb24gdGhhdCBtYWtlcyBwZW9wbGUgc3RvcCwgdGhpbmssIGFuZCBvZnRlbiBzbWlsZS5cIixcclxuICAgICAgICBcIk91ciBzdHVkaW8gbG9jYXRpb24gaXMgcHJvZm91bmRseSBpbnNwaXJpbmcuIFRoZSBtYWduaWZpY2VudCB2aWV3IGZlZWRzIG91ciBzb3VscyBhbmQga2VlcHMgdXMgaW5zcGlyZWQgdG8gZG8gb3VyIGJlc3Qgd29yay4gSXQncyBhIHBsYWNlIHdoZXJlIGNyZWF0aXZlIHBlb3BsZSBjb21lIHRvZ2V0aGVyIHRvIGNvbGxhYm9yYXRlIGFuZCBkcmlsbCBkb3duIHRvIHRoZSBoZWFydCBvZiB0aGUgbWF0dGVyLiBUbyBzb2x2ZSBwcm9ibGVtcyBhbmQgYnJpbmcgaWRlYXMgdG8gbGlmZS4gVG8gY3JlYXRlIHRoaW5ncyB3b3J0aCByZW1lbWJlcmluZy5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGluc2lnaHRDbGFyaXR5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2luc2lnaHQtY2xhcml0eS5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTIgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgQlJJTkcgVklTSU9OLCBJTlNJR0hULCBBTkQgQ0xBUklUWSBUTyBFVkVSWSBQUk9KRUNUXCIsXHJcbiAgICAgICAgXCJTdWNjZXNzZnVsIGRlc2lnbiBzdGFydHMgd2l0aCBpZGVudGlmeWluZyBhIGNsaWVudCdzIG5lZWRzLCBnb2FscywgYW5kIGFzcGlyYXRpb25zLiBPdXIgb2JqZWN0aXZpdHkgc2hpbmVzIGxpZ2h0IG9uIHdoYXQgb3RoZXJzIGhhdmUgbWlzc2VkLiBXZSBoYXZlIHRoZSBhYmlsaXR5IHRvIHNlZSBhbmQgaW50ZXJwcmV0IHRoZSBpbm5lciB3b3JraW5ncywgY3VsdHVyZSwgYW5kIG51YW5jZXMgb2Ygb3VyIGNsaWVudCdzIHdvcmxkLiBXZSBhc2sgcXVlc3Rpb25zIOKAkyBsb3RzIG9mIHF1ZXN0aW9ucy4gVGhlbiBsaXN0ZW4gdW50aWwgd2UgZ2FpbiB0aGUgZGVlcCB1bmRlcnN0YW5kaW5nIG5lY2Vzc2FyeSB0byBidWlsZCB0aGUgc29saWQgZm91bmRhdGlvbiB0aGF0IGFueSBlbmR1cmluZyBicmFuZCBuZWVkcy5cIixcclxuICAgICAgICBcIk91ciBzbWFsbCBidXQgbWlnaHR5IHRlYW0gYnJpbmdzIHRvZ2V0aGVyIGEgd2lkZSByYW5nZSBvZiB0YWxlbnRzIGFuZCBwZXJzcGVjdGl2ZXMsIHBsdXMgYSBuaWNlIGxpc3Qgb2YgYXdhcmRzLiBXZSB0aHJvdyBvdXIgaGVhcnRzIGludG8gb3VyIHdvcmsgYW5kIGFyZSBrbm93biBmb3Igb3VyIGZpZXJjZSBjb21taXRtZW50IHRvIHRoZSB0cnVzdGVkLCBsb25nLXRlcm0gcGFydG5lcnNoaXBzIHdlIGZvcm0uIEZvciB1cywgaXQncyBwZXJzb25hbC5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNreXdhcmQgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvc2t5d2FyZC5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTMgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgU0VFIFdPUksgSU4gQSBESUZGRVJFTlQgTElHSFRcIixcclxuICAgICAgICBcIlBlb3BsZSBsaWtlIHRvIGFzayBhYm91dCBvdXIgZGVzaWduIHByb2Nlc3MuIFRoZSB0cnV0aCBpcyB0aGF0IHRoZSBhcHByb2FjaCB0byBlYWNoIHByb2plY3QgdmFyaWVzLCBiZWNhdXNlIGVhY2ggY2xpZW50IGFuZCB0aGVpciBuZWVkcyBhcmUgdW5pcXVlLiBDcmVhdGl2ZSBicmVha3Rocm91Z2hzIGRvbid0IGZvbGxvdyB0aGUgY2xvY2suIFRoZXkgY2FuIGhhcHBlbiBhbnkgdGltZSBvZiBkYXkg4oCTIG9yIG5pZ2h0LiBXaGV0aGVyIGFuIGVwaXBoYW55IGlzIGlsbHVtaW5hdGVkIGluIGEgc2NyaWJibGUsIGEgZHJlYW0sIG9yIGFzIHRoZSBjbG91ZHMgcm9sbCBieSwgd2UgZW1icmFjZSB0aGUgZmFjdCB0aGF0IGVhY2ggcHJvamVjdCB0YWtlcyBvbiBhIGxpZmUgb2YgaXRzIG93bi5cIixcclxuICAgICAgICBcIldoYXQncyBjb25zdGFudCBpcyBvdXIgYWJpbGl0eSB0byBsaXN0ZW4gYW5kIGZvY3VzLCB0byBhbmFseXplIGFuZCBjb25uZWN0IGRvdHMsIGFuZCB0byByZW1haW4gY3VyaW91cy4gVGhlIG1vc3QgcmV3YXJkaW5nIHByb2plY3RzIGFyZSB3aXRoIGNsaWVudHMgd2hvIHZhbHVlIHRoZSBiYWxhbmNlIGJldHdlZW4gcHVzaGluZyBmb3J3YXJkIGFuZCBhbGxvd2luZyB0aW1lIGZvciB0aGUgcGVyZmVjdCBzb2x1dGlvbiB0byBlbWVyZ2UuIFRoYXQncyBvdXIgaGFwcHkgcGxhY2UuXCJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGV4dFRpbGVzID0gW3RleHRUaWxlMSwgdGV4dFRpbGUyLCB0ZXh0VGlsZTNdO1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBhZGRTY3JvbGxQYWRkaW5nKCk7XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IEhPTUVfSE9SSVpPTl9QQUQgPSAwLjI7XHJcbiAgICAgICAgY29uc3QgRlJFU0hfTE9PS19QQUQgPSAwLjEzO1xyXG4gICAgICAgIGNvbnN0IElNQUdFX1RFWFRfU1FVQVJFX1BBRCA9IDAuMTc7XHJcblxyXG4gICAgICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoZnJlc2hMb29rLCAwLjgpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcylcclxuICAgICAgICAgICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0VGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1goW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIEhPTUVfSE9SSVpPTl9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTMubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsUGFkZGluZyxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChmcmVzaExvb2ssIDAuODUpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogNCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA4ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgVEVYVF9USUxFX1dJRFRIID0gMC44NTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgodGV4dFRpbGUubWFqb3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgY2VudGVyV2l0aGluU2Nyb2xsWChtaW5vciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgTU9CSUxFX1BBRCA9IDAuMDg7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb2JpbGVUaWxlKHRleHRUaWxlOiBUZXh0U3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gW3RleHRUaWxlLm1ham9yLCAwLjAgKiBzXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSB4LnB1c2goMC4wNCAqIHMsIG1pbm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBncmVhdEJyYW5kcyxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTEpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTIpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMyksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFBhZGRpbmcsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHNwYWNlVG9GaWxlIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB7IGJvZHkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgcHggfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhcHBlbmRDaGlsZEZvclBhZ2UsIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nLCBwYWdlQ2xlYW51cHMsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRTcXVhcmUsIGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgc2Nyb2xsQ29udGFpbmVyLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5pbXBvcnQgeyBTaWduYWwsIGVmZmVjdCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IFNwcmluZywgYW5pbWF0ZVNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcblxuaW50ZXJmYWNlIFdvcmtDb250ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgV29ya0l0ZW0ge1xuICAgIHRleHRTcXVhcmU6IFRleHRTcXVhcmU7XG4gICAgaW1hZ2UxOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltYWdlMjogSFRNTEltYWdlRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFdvcmtUYWIge1xuICAgIHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc3ByaW5nOiBTcHJpbmc7XG4gICAgc3ByaW5nU2lnOiBTaWduYWw7XG4gICAgd29ya0l0ZW06IFdvcmtJdGVtO1xufVxuXG5jb25zdCB3b3JrQ29udGVudHM6IFdvcmtDb250ZW50W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmZ1bmN0aW9uIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzOiBXb3JrVGFiW10pIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcbiAgICAgICAgICAgIHdvcmtJdGVtLnRleHRTcXVhcmUsXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWSh3b3JrSXRlbS5pbWFnZTEsIDEpO1xuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKHdvcmtJdGVtLmltYWdlMiwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnM6IFdvcmtUYWJbXSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgICAgICB3b3JrSXRlbS50ZXh0U3F1YXJlLm1ham9yLCAvL1xuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIHdvcmtJdGVtLmltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgd29ya0l0ZW0uaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNYKGl0ZW1zKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFdvcmtQYWdlKCkge1xuICAgIGNvbnN0IHdvcmtUYWJzOiBXb3JrVGFiW10gPSBbXTtcblxuICAgIC8vIGZ1bmN0aW9uIHRhYkFsaWdubWVudCh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgLy8gICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGFiRWxlbWVudFNpemUodGFiRWxlbWVudCk7XG5cbiAgICAvLyAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAgIGNlbnRlcmVkOiAoKSA9PiAoaW5uZXJIZWlnaHQgLSBoZWlnaHQpIC8gMixcbiAgICAvLyAgICAgICAgIGhhbGZTcXVhcmU6ICgpID0+IGlubmVySGVpZ2h0IC0gd2lkdGggLyAyLFxuICAgIC8vICAgICAgICAgc3F1YXJlOiAoKSA9PiBpbm5lckhlaWdodCAtIHdpZHRoLFxuICAgIC8vICAgICB9O1xuICAgIC8vIH1cblxuICAgIChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwibm9uZVwiO1xuICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gKChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwiXCIpKTtcblxuICAgIGxldCB0YWJzU2hvd2luZyA9IHRydWU7XG4gICAgbGV0IGN1cnJlbnRXb3JrSXRlbTogV29ya0l0ZW0gfCB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcodGFiRWxlbWVudCk7XG4gICAgICAgIGFwcGVuZENoaWxkRm9yUGFnZShib2R5LCB0YWJFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgzMDApO1xuXG4gICAgICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGFiUG9zaXRpb25zKCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0U3ByaW5nVGFyZ2V0KHRhcmdldDogbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtUYWIuc3ByaW5nLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyh3b3JrVGFiLnNwcmluZywgd29ya1RhYi5zcHJpbmdTaWcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YWJzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkKSBzZXRTcHJpbmdUYXJnZXQoMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzZXRTcHJpbmdUYXJnZXQoMjAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkIHx8IGN1cnJlbnRXb3JrSXRlbSA9PT0gd29ya1RhYi53b3JrSXRlbSkgc2V0U3ByaW5nVGFyZ2V0KDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0U3ByaW5nVGFyZ2V0KDQwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZVRhYlBvc2l0aW9ucygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIG9uRmlyc3RDbGljaygpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0U3F1YXJlID0gYWRkU2Nyb2xsVGV4dFNxdWFyZSh3b3JrQ29udGVudC5uYW1lLnRvVXBwZXJDYXNlKCksIC4uLndvcmtDb250ZW50LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlMiA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzIuanBnYCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrVGFic1tpXS53b3JrSXRlbSA9IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SW1hZ2UgPSB3b3JrVGFiLndvcmtJdGVtLmltYWdlMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0IDwgbGFzdEltYWdlLm9mZnNldExlZnQgKyBsYXN0SW1hZ2Uub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXb3JrSXRlbSA9IHdvcmtUYWIud29ya0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RXb3JrVGFiKHdvcmtUYWI6IFdvcmtUYWIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IHNjcm9sbFBvc2l0aW9uLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB3b3JrVGFiLnRhYkVsZW1lbnQub25jbGljayA9ICgpID0+IHNlbGVjdFdvcmtUYWIod29ya1RhYik7XG5cbiAgICAgICAgICAgIHRhYnNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcblxuICAgICAgICAgICAgYXdhaXQgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzKTtcbiAgICAgICAgICAgICAgICBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGVjdFdvcmtUYWIod29ya1RhYnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gb25GaXJzdENsaWNrO1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgLy8gc3ByaW5nLnBvc2l0aW9uID0gaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAvLyBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcblxuICAgICAgICB3b3JrVGFicy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcsIHdvcmtJdGVtOiB1bmRlZmluZWQgfSk7XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgoc3ByaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZ10pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAzMDA7XG4gICAgICAgIGNvbnN0IGVuZCA9IGlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgY29uc3QgYW55VGFiRWxlbWVudCA9IHdvcmtUYWJzWzBdLnRhYkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrVGFicy5sZW5ndGggKiAyIC0gMSk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogKGFueVRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCAvIGFueVRhYkVsZW1lbnQubmF0dXJhbFdpZHRoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQgfSA9IHdvcmtUYWJzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHRMb3dlckxpbWl0ID0gaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaGVpZ2h0TG93ZXJMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodExvd2VyTGltaXQpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChoZWlnaHRMb3dlckxpbWl0ICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3b3JrVGFic1tpXS50YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBib2R5LCBib2R5U2lnLCBmYWRlSW5BbmltYXRpb24sIGllQmx1ZSwgaWVHcmVlbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1ksIGlzTGFuZHNjYXBlLCBweCwgc2V0SGVpZ2h0LCBzZXRXaWR0aCwgc3R5bGVUZXh0LCBUZXh0RGV0YWlscyB9IGZyb20gXCIuL2xheW91dFwiO1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGRGb3JQYWdlLCBhd2FpdExheW91dEZvckltYWdlTG9hZGluZyB9IGZyb20gXCIuL3BhZ2VcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRTcXVhcmUge1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcnM6IEhUTUxFbGVtZW50W107XG59XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxDb250YWluZXIpO1xuKHNjcm9sbENvbnRhaW5lci5zdHlsZSBhcyBhbnkpLnNjcm9sbGJhckNvbG9yID0gYCR7aWVHcmVlbn0gJHtpZUJsdWV9NTVgO1xuXG5zY3JvbGxDb250YWluZXIub253aGVlbCA9IChlKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkgJiYgIWUuc2hpZnRLZXkpIHNjcm9sbENvbnRhaW5lci5zY3JvbGxCeSh7IGxlZnQ6IGUuZGVsdGFZIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEhlYWRlckJhckhlaWdodCA9ICgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICByZXR1cm4gKGlubmVySGVpZ2h0IC0gZ2V0U2Nyb2xsSGVpZ2h0KCkpIC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW5uZXJIZWlnaHQgKiAwLjE7XG4gICAgfVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFBhZGRpbmcoKSB7XG4gICAgY29uc3Qgc2Nyb2xsUGFkZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2Nyb2xsUGFkZGluZy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxQYWRkaW5nLnN0eWxlLndpZHRoID0gcHgoMSk7IC8vIGFueSBub256ZXJvIHRoaWNrbmVzcyBpcyBlbm91Z2ggdG8gZXh0ZW5kIHNjcm9sbENvbnRhaW5lclxuICAgIHNjcm9sbFBhZGRpbmcuc3R5bGUuaGVpZ2h0ID0gcHgoMSk7XG4gICAgYXBwZW5kQ2hpbGRGb3JQYWdlKHNjcm9sbENvbnRhaW5lciwgc2Nyb2xsUGFkZGluZyk7XG4gICAgcmV0dXJuIHNjcm9sbFBhZGRpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxJbWFnZShzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IHNjcm9sbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBzY3JvbGxJbWFnZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBzY3JvbGxJbWFnZS5zcmMgPSBzcmM7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XG4gICAgYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcoc2Nyb2xsSW1hZ2UpO1xuICAgIGFwcGVuZENoaWxkRm9yUGFnZShzY3JvbGxDb250YWluZXIsIHNjcm9sbEltYWdlKTtcbiAgICByZXR1cm4gc2Nyb2xsSW1hZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNjcm9sbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBzY3JvbGxUZXh0LmlubmVySFRNTCA9IHRleHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5hbmltYXRpb24gPSBmYWRlSW5BbmltYXRpb24oKTtcbiAgICBhcHBlbmRDaGlsZEZvclBhZ2Uoc2Nyb2xsQ29udGFpbmVyLCBzY3JvbGxUZXh0KTtcbiAgICByZXR1cm4gc2Nyb2xsVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjcm9sbFRleHRTcXVhcmUobWFqb3JUZXh0OiBzdHJpbmcsIC4uLm1pbm9yVGV4dHM6IHN0cmluZ1tdKTogVGV4dFNxdWFyZSB7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3JzID0gbWlub3JUZXh0cy5tYXAoYWRkU2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHsgbWFqb3IsIG1pbm9ycyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRleHREZXRhaWxzOiBUZXh0RGV0YWlscywgbWlub3JUZXh0RGV0YWlsczogVGV4dERldGFpbHMpIHtcbiAgICBzdHlsZVRleHQobWFqb3IsIG1ham9yVGV4dERldGFpbHMpO1xuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSBzdHlsZVRleHQobWlub3IsIG1pbm9yVGV4dERldGFpbHMpO1xufVxuXG5lZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XG4gICAgICAgIGNvbnN0IHggPSAyODA7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIGNvbnN0IHVuZGVyU2Nyb2xsQ29udGFpbmVyID0gKGlubmVySGVpZ2h0IC0gc2Nyb2xsSGVpZ2h0KSAvIDI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKyB1bmRlclNjcm9sbENvbnRhaW5lcik7IC8vIHBsYWNlIHNjcm9sbCBiYXIgYXQgYm90dG9tIG9mIHBhZ2VcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcHgoaW5uZXJXaWR0aCAtIHgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoKGlubmVySGVpZ2h0IC0gc2Nyb2xsSGVpZ2h0KSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUubGVmdCA9IHB4KHgpO1xuXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1ggPSBcInNjcm9sbFwiO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJoaWRkZW5cIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsV2lkdGggPSBnZXRTY3JvbGxXaWR0aCgpO1xuICAgICAgICBjb25zdCBoZWFkZXJCYXJIZWlnaHQgPSBnZXRIZWFkZXJCYXJIZWlnaHQoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcHgoc2Nyb2xsV2lkdGgpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQgLSBoZWFkZXJCYXJIZWlnaHQpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUubGVmdCA9IHB4KChpbm5lcldpZHRoIC0gc2Nyb2xsV2lkdGgpIC8gMik7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS50b3AgPSBweChoZWFkZXJCYXJIZWlnaHQpO1xuXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1ggPSBcImhpZGRlblwiO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbExlZnQgPSAwO1xuICAgIH1cbn0sIFtib2R5U2lnXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgLy8gcmV0dXJuIGlubmVySGVpZ2h0ICogMC43O1xuICAgIHJldHVybiAxLjAyICogaW5uZXJIZWlnaHQgLSAwLjAwMDQ4NSAqIGlubmVySGVpZ2h0ICogaW5uZXJIZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxXaWR0aCgpIHtcbiAgICBjb25zdCBTQ1JPTExfV0lEVEhfUFJPUE9SVElPTiA9IDE7XG4gICAgcmV0dXJuIGlubmVyV2lkdGggKiBTQ1JPTExfV0lEVEhfUFJPUE9SVElPTjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbGlnblNjcm9sbFRleHRTcXVhcmUoeyBtYWpvciwgbWlub3JzIH06IFRleHRTcXVhcmUsIG1ham9yVG9NaW5vckdhcDogbnVtYmVyLCBiZXR3ZWVuTWlub3JzR2FwOiBudW1iZXIpIHtcbiAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW107XG5cbiAgICBpdGVtcy5wdXNoKG1ham9yLCBtYWpvclRvTWlub3JHYXApO1xuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgaXRlbXMucHVzaChtaW5vciwgYmV0d2Vlbk1pbm9yc0dhcCk7XG4gICAgfVxuICAgIGl0ZW1zLnBvcCgpOyAvLyByZW1vdmUgZmluYWwgZ2FwLCBvbmx5IHdhbnQgYmV0d2VlbnNcblxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgdG90YWxIZWlnaHRdID0gYWxpZ25pbmdXaXRoR2Fwc1koaXRlbXMpO1xuICAgIGNvbnN0IGdyb3VwVG9wID0gKHNjcm9sbEhlaWdodCAtIHRvdGFsSGVpZ2h0KSAvIDI7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChncm91cFRvcCArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBtaW5vciBvZiBtaW5vcnMpIHtcbiAgICAgICAgbWlub3Iuc3R5bGUubGVmdCA9IG1ham9yLnN0eWxlLmxlZnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyV2l0aGluU2Nyb2xsWShlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBzICogc2NhbGU7XG4gICAgc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCk7XG4gICAgZWxlbWVudC5zdHlsZS50b3AgPSBweCgocyAtIGhlaWdodCkgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlcldpdGhpblNjcm9sbFgoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcbiAgICBjb25zdCB3aWR0aCA9IHMgKiBzY2FsZTtcbiAgICBzZXRXaWR0aChlbGVtZW50LCB3aWR0aCk7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoKHMgLSB3aWR0aCkgLyAyKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBTaWduYWwge1xyXG4gICAgc3Vic2NyaWJlcnMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XHJcblxyXG4gICAgc3Vic2NyaWJlID0gKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmFkZChzdWJzY3JpYmVyKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaCgocykgPT4gcygpKTtcclxuICAgIH07XHJcblxyXG4gICAgdW5zdWJzY3JpYmUgPSAoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZGVsZXRlKHN1YnNjcmliZXIpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVmZmVjdChmdW5jOiAoKSA9PiB2b2lkLCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKSB7XHJcbiAgICBvYnNlcnZlZFNpZ25hbHMuZm9yRWFjaCgobykgPT4gby5zdWJzY3JpYmUoZnVuYykpO1xyXG4gICAgZnVuYygpO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIG9uUmVzdCA9ICgpID0+IHt9O1xyXG4gICAgb25VbnJlc3QgPSAoKSA9PiB7fTtcclxuXHJcbiAgICAvLyBteCcnIC0gYngnID0ga3hcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBpbml0aWFsVmFsdWU7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBpbml0aWFsVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGljayhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjZWxlcmF0aW9uID0gdGhpcy5zdGlmZm5lc3MgKiAodGhpcy50YXJnZXQgLSB0aGlzLnBvc2l0aW9uKSAtIHRoaXMuZGFtcGluZyAqIHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSArPSBhY2NlbGVyYXRpb24gKiBkdDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IHRoaXMudmVsb2NpdHkgKiBkdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGlmZm5lc3NDcml0aWNhbChzdGlmZm5lc3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RpZmZuZXNzID0gc3RpZmZuZXNzO1xyXG4gICAgICAgIHRoaXMuZGFtcGluZyA9IE1hdGguc3FydCg0ICogc3RpZmZuZXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFID0gMC4wMTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3ByaW5nKHNwcmluZzogU3ByaW5nLCBzaWduYWw6IFNpZ25hbCkge1xyXG4gICAgaWYgKHNwcmluZy5pc0FuaW1hdGluZykgcmV0dXJuO1xyXG4gICAgXHJcbiAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgc3ByaW5nLm9uVW5yZXN0KClcclxuXHJcbiAgICBsZXQgbGFzdE1pbGxpcyA9IDA7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmlyc3RGcmFtZSk7XHJcbiAgICBmdW5jdGlvbiBmaXJzdEZyYW1lKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGFzdE1pbGxpcyA9IG1pbGxpcztcclxuICAgICAgICB0aWNrU3ByaW5nKG1pbGxpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGlja1NwcmluZyhtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtaWxsaXMgLSBsYXN0TWlsbGlzO1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcblxyXG4gICAgICAgIHNwcmluZy50aWNrKHN0ZXAgLyAxMDAwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzcHJpbmcub25SZXN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrU3ByaW5nKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3Qgc2xlZXAgPSAoZGVsYXk6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlVG9GaWxlKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoXCIgXCIsIFwiLVwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRTVkc8SyBleHRlbmRzIGtleW9mIFNWR0VsZW1lbnRUYWdOYW1lTWFwPihxdWFsaWZpZWROYW1lOiBLKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHF1YWxpZmllZE5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJsYWNlZDxULCBXaXRoaW4+KGl0ZW1zOiBUW10sIHdpdGhpbjogV2l0aGluKSB7XG4gICAgY29uc3QgaXRlbXNJbnRlcmxhY2VkID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgIGl0ZW1zSW50ZXJsYWNlZC5wdXNoKGl0ZW0pO1xuICAgICAgICBpdGVtc0ludGVybGFjZWQucHVzaCh3aXRoaW4pO1xuICAgIH1cbiAgICBpdGVtc0ludGVybGFjZWQucG9wKCk7XG4gICAgcmV0dXJuIGl0ZW1zSW50ZXJsYWNlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFJhbmdlKG46IG51bWJlciwgc3RhcnQxOiBudW1iZXIsIHN0b3AxOiBudW1iZXIsIHN0YXJ0MjogbnVtYmVyLCBzdG9wMjogbnVtYmVyKSB7XG4gICAgcmV0dXJuICgobiAtIHN0YXJ0MSkgLyAoc3RvcDEgLSBzdGFydDEpKSAqIChzdG9wMiAtIHN0YXJ0MikgKyBzdGFydDI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvck9uSG92ZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbG9yOiBzdHJpbmcsIGhvdmVyQ29sb3I6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICBlbGVtZW50Lm9ubW91c2VvdmVyID0gKCkgPT4gKGVsZW1lbnQuc3R5bGUuY29sb3IgPSBob3ZlckNvbG9yKTtcbiAgICBlbGVtZW50Lm9ubW91c2VsZWF2ZSA9ICgpID0+IChlbGVtZW50LnN0eWxlLmNvbG9yID0gY29sb3IpO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiY29sb3IgMC4ycyBlYXNlLW91dFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb2xvck9uSG92ZXIsIGNyZWF0ZUVsZW1lbnRTVkcsIHNldEF0dHJpYnV0ZXMsIHNsZWVwIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBib2R5LCBib2R5U2lnLCBmYWRlSW5BbmltYXRpb24sIGdyYXksIGllR3JlZW4gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgY2VudGVyRWxlbWVudCwgaXNMYW5kc2NhcGUsIHB4LCBzdHlsZVRleHQsIHlDZW50ZXJXaXRoR2FwIH0gZnJvbSBcIi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7IGNsZWFuTGFzdFBhZ2UgfSBmcm9tIFwiLi9wYWdlXCI7XHJcbmltcG9ydCB7IGFkZENvbm5lY3RQYWdlIH0gZnJvbSBcIi4vcGFnZXMvY29ubmVjdFwiO1xyXG5pbXBvcnQgeyBhZGRFdm9sdXRpb25QYWdlIH0gZnJvbSBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XHJcbmltcG9ydCB7IGFkZEluc3BpcmF0aW9uUGFnZSB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XHJcbmltcG9ydCB7IGFkZFZpZXdQYWdlIH0gZnJvbSBcIi4vcGFnZXMvdmlld1wiO1xyXG5pbXBvcnQgeyBhZGRXb3JrUGFnZSB9IGZyb20gXCIuL3BhZ2VzL3dvcmtcIjtcclxuaW1wb3J0IHsgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRIZWFkZXJCYXJIZWlnaHQsIHNjcm9sbENvbnRhaW5lciB9IGZyb20gXCIuL3Njcm9sbFwiO1xyXG5pbXBvcnQgeyBTaWduYWwsIGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5pbXBvcnQgeyBTcHJpbmcsIGFuaW1hdGVTcHJpbmcgfSBmcm9tIFwiLi9zcHJpbmdcIjtcclxuXHJcbi8vIFRPRE9cclxuLy8gbW9iaWxlIGxheW91dHNcclxuLy8gYmxvZyBwYWdlc1xyXG4vLyB0aW1lbGluZVxyXG4vLyBuYXYgaXRlbSBzdHlsaW5nXHJcbi8vIHdvcmsgcGFnZVxyXG4vLyBpbWFnZSBjbGlja1xyXG4vLyBoaXQgZW5kIG9mIHNjcm9sbCwgbmV4dCBwYWdlXHJcbi8vIHNpbXBsZXIgcmVjdGFuZ2xlIHNjcm9sbCBiYXJcclxuLy8gXCJ2aWV3XCIgc3RhcnQgYW5pbWF0aW9uXHJcblxyXG5jb25zdCBwYWdlcyA9IHtcclxuICAgIHZpZXc6IGFkZFZpZXdQYWdlLFxyXG4gICAgd29yazogYWRkV29ya1BhZ2UsXHJcbiAgICBpbnNwaXJhdGlvbjogYWRkSW5zcGlyYXRpb25QYWdlLFxyXG4gICAgZXZvbHV0aW9uOiBhZGRFdm9sdXRpb25QYWdlLFxyXG4gICAgY29ubmVjdDogYWRkQ29ubmVjdFBhZ2UsXHJcbn07XHJcblxyXG5jb25zdCBuYXZJdGVtRnJvbVN0cmluZzogUmVjb3JkPHN0cmluZywgSFRNTEVsZW1lbnQ+ID0ge307XHJcblxyXG5jb25zdCBlZGdlQWxpZ25YID0gKCkgPT4gaW5uZXJIZWlnaHQgKiAwLjE7XHJcbmNvbnN0IGhlYWRlckljb25TaXplID0gKCkgPT4gZ2V0SGVhZGVyQmFySGVpZ2h0KCkgKiAwLjQ7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhbmltYXRlSW50cm8oKSB7XHJcbiAgICAvLyBaWlpaIGNsZWFuIHRoaXMgdXBcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJsb2dvLWZ1bGwuc3ZnXCIpO1xyXG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuXHJcbiAgICBjb25zdCBzdmcgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHN2Z0NvbnRlbnQsIFwiaW1hZ2Uvc3ZnK3htbFwiKS5kb2N1bWVudEVsZW1lbnQgYXMgdW5rbm93biBhcyBTVkdTVkdFbGVtZW50O1xyXG4gICAgc3ZnLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcbiAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQgKiAwLjQpO1xyXG5cclxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG5cclxuICAgIGNvbnN0IHN2Z1NwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICBzdmdTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoODApO1xyXG4gICAgY29uc3Qgc3ZnU3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIlwiICsgc3ZnU3ByaW5nLnBvc2l0aW9uO1xyXG4gICAgICAgIHN2Zy5zdHlsZS5oZWlnaHQgPSBweCgoMS4zIC0gc3ZnU3ByaW5nLnBvc2l0aW9uKSAqIGlubmVySGVpZ2h0KTtcclxuICAgICAgICBzdmcuc3R5bGUudG9wID0gcHgoKGlubmVySGVpZ2h0IC0gc3ZnLnNjcm9sbEhlaWdodCkgLyAyKTtcclxuICAgICAgICBzdmcuc3R5bGUubGVmdCA9IHB4KChpbm5lcldpZHRoIC0gc3ZnLnNjcm9sbFdpZHRoKSAvIDIpO1xyXG4gICAgfSwgW3N2Z1NwcmluZ1NpZ10pO1xyXG5cclxuICAgIHN2Z1NwcmluZy50YXJnZXQgPSAxO1xyXG4gICAgYW5pbWF0ZVNwcmluZyhzdmdTcHJpbmcsIHN2Z1NwcmluZ1NpZyk7XHJcblxyXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XHJcbiAgICBjb25zdCBkID0gXCJkZXNpZ25cIjtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGFjaXR5T3V0KGVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJTcHJpbmcgPSBuZXcgU3ByaW5nKDEpO1xyXG4gICAgICAgIGxldHRlclNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxNTApO1xyXG4gICAgICAgIGNvbnN0IGxldHRlclNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuXHJcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIGxldHRlclNwcmluZy5wb3NpdGlvbjtcclxuICAgICAgICB9LCBbbGV0dGVyU3ByaW5nU2lnXSk7XHJcblxyXG4gICAgICAgIGxldHRlclNwcmluZy50YXJnZXQgPSAwO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcobGV0dGVyU3ByaW5nLCBsZXR0ZXJTcHJpbmdTaWcpO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZGVzaWduTGV0dGVyID0gc3ZnLmdldEVsZW1lbnRCeUlkKFwiZGVzaWduLVwiICsgZFtpXSkgYXMgU1ZHRWxlbWVudDtcclxuICAgICAgICBvcGFjaXR5T3V0KGRlc2lnbkxldHRlcik7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTIwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGwgPSBbXCJiaWctaVwiLCBcImRvdC0xXCIsIFwiYmlnLWVcIiwgXCJkb3QtMlwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IHN2Zy5nZXRFbGVtZW50QnlJZChsW2ldKSBhcyBTVkdFbGVtZW50O1xyXG4gICAgICAgIG9wYWNpdHlPdXQoZGVzaWduTGV0dGVyKTtcclxuICAgICAgICBhd2FpdCBzbGVlcCgxMjApO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XHJcblxyXG4gICAgc3ZnU3ByaW5nLnRhcmdldCA9IDA7XHJcbiAgICBhbmltYXRlU3ByaW5nKHN2Z1NwcmluZywgc3ZnU3ByaW5nU2lnKTtcclxuXHJcbiAgICBhd2FpdCBzbGVlcCg1MDApO1xyXG4gICAgYm9keS5yZW1vdmVDaGlsZChzdmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGROYXZJdGVtcygpIHtcclxuICAgIGZvciAoY29uc3QgW3BhZ2VOYW1lLCBhZGRQYWdlXSBvZiBPYmplY3QuZW50cmllcyhwYWdlcykpIHtcclxuICAgICAgICBjb25zdCBuYXZJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgbmF2SXRlbS5pbm5lclRleHQgPSBwYWdlTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICBuYXZJdGVtLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgICAgIG5hdkl0ZW0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XHJcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IGdyYXk7XHJcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcclxuICAgICAgICBuYXZJdGVtLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgIG5hdkl0ZW0uc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7XHJcblxyXG4gICAgICAgIG5hdkl0ZW0ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYW5MYXN0UGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBuYXZJdGVtIG9mIE9iamVjdC52YWx1ZXMobmF2SXRlbXMpKSBuYXZJdGVtLnN0eWxlLmNvbG9yID0gZ3JheTtcclxuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xyXG5cclxuICAgICAgICAgICAgYWRkUGFnZSgpO1xyXG4gICAgICAgICAgICAvLyBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgXCIvIy9cIiArIHBhZ2VOYW1lKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKG5hdkl0ZW0pO1xyXG5cclxuICAgICAgICBuYXZJdGVtRnJvbVN0cmluZ1twYWdlTmFtZV0gPSBuYXZJdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5hdkl0ZW1zID0gT2JqZWN0LnZhbHVlcyhuYXZJdGVtRnJvbVN0cmluZyk7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFsaWduTmF2SXRlbShuYXZJdGVtOiBIVE1MRWxlbWVudCwgbnVkZ2U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5sZWZ0ID0gcHgoZWRnZUFsaWduWCgpKTtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgLyAyICsgbnVkZ2UgKiA1MCAtIG5hdkl0ZW0uY2xpZW50SGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmF2SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBuYXZJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICAgICAgYWxpZ25OYXZJdGVtKG5hdkl0ZW0sIGkgLSAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnN0eWxlLmZvbnRTaXplID0gcHgocyAqIDAuMDI1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmF2SXRlbSBvZiBuYXZJdGVtcykgbmF2SXRlbS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9LCBbYm9keVNpZ10pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRIZWFkZXJCYXIoKSB7XHJcbiAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaGVhZGVyQmFyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgaGVhZGVyQmFyLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XHJcblxyXG4gICAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXJCYXIpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaGVhZGVyQmFyLnN0eWxlLndpZHRoID0gcHgoaW5uZXJXaWR0aCk7XHJcbiAgICAgICAgaGVhZGVyQmFyLnN0eWxlLmhlaWdodCA9IHB4KGdldEhlYWRlckJhckhlaWdodCgpKTtcclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE1lbnVCdXR0b24oKSB7XHJcbiAgICBjb25zdCBtZW51QnV0dG9uID0gY3JlYXRlRWxlbWVudFNWRyhcInN2Z1wiKTtcclxuICAgIG1lbnVCdXR0b24uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBtZW51QnV0dG9uLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgbWVudUJ1dHRvbi5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuICAgIG1lbnVCdXR0b24uc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XHJcbiAgICBjb25zdCBzdHJva2VXaWR0aCA9IDQ7XHJcbiAgICBjb25zdCBwYWQgPSA0O1xyXG4gICAgY29uc3Qgc3ogPSA2MDtcclxuICAgIG1lbnVCdXR0b24uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBgJHstcGFkfSAkey1wYWR9ICR7c3ogKyAyICogcGFkfSAke3N6ICsgMiAqIHBhZH1gKTtcclxuXHJcbiAgICBmdW5jdGlvbiBtZW51TGluZSh5OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBsaW5lID0gY3JlYXRlRWxlbWVudFNWRyhcImxpbmVcIik7XHJcbiAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lLCB7IFwic3Ryb2tlLXdpZHRoXCI6IHN0cm9rZVdpZHRoIH0pO1xyXG4gICAgICAgIG1lbnVCdXR0b24uYXBwZW5kQ2hpbGQobGluZSk7XHJcbiAgICAgICAgcmV0dXJuIGxpbmU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsaW5lMSA9IG1lbnVMaW5lKHN0cm9rZVdpZHRoIC8gMiArIDEpO1xyXG4gICAgY29uc3QgbGluZTIgPSBtZW51TGluZShzeiAvIDIpO1xyXG4gICAgY29uc3QgbGluZTMgPSBtZW51TGluZShzeiAtIHN0cm9rZVdpZHRoIC8gMiAtIDEpO1xyXG5cclxuICAgIGNvbnN0IG1lbnVTcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xyXG4gICAgbWVudVNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgxMjApO1xyXG4gICAgY29uc3QgbWVudVNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcyA9IG1lbnVTcHJpbmcucG9zaXRpb24gKiBzejtcclxuICAgICAgICBzZXRBdHRyaWJ1dGVzKGxpbmUxLCB7IHgxOiAwLCB5MTogMCwgeDI6IHN6LCB5MjogcyB9KTtcclxuICAgICAgICBsaW5lMi5zdHlsZS5vcGFjaXR5ID0gKHN6IC0gcykgLyBzeiArIFwiXCI7XHJcbiAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lMiwgeyB4MTogMCwgeTE6IHN6IC8gMiwgeDI6IHN6LCB5Mjogc3ogLyAyIH0pO1xyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMobGluZTMsIHsgeDE6IDAsIHkxOiBzeiwgeDI6IHN6LCB5Mjogc3ogLSBzIH0pO1xyXG4gICAgfSwgW21lbnVTcHJpbmdTaWddKTtcclxuXHJcbiAgICBsZXQgaXNPcGVuaW5nTWVudSA9IGZhbHNlO1xyXG5cclxuICAgIG1lbnVCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoaXNPcGVuaW5nTWVudSkgYmVnaW5DbG9zZU1lbnUoKTtcclxuICAgICAgICBlbHNlIGJlZ2luT3Blbk1lbnUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbWVudVNwcmluZy5vblVucmVzdCA9ICgpID0+IHtcclxuICAgICAgICBpZiAobWVudVNwcmluZy5wb3NpdGlvbiA9PT0gMCkgb3Blbk1lbnUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGNsb3NlTWVudTogKCkgPT4gdm9pZCB8IHVuZGVmaW5lZDtcclxuICAgIG1lbnVTcHJpbmcub25SZXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChtZW51U3ByaW5nLnBvc2l0aW9uID09PSAwICYmIGNsb3NlTWVudSkgY2xvc2VNZW51KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGJlZ2luT3Blbk1lbnUoKSB7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5zdHJva2UgPSBncmF5O1xyXG4gICAgICAgIG1lbnVTcHJpbmcudGFyZ2V0ID0gMTtcclxuICAgICAgICBhbmltYXRlU3ByaW5nKG1lbnVTcHJpbmcsIG1lbnVTcHJpbmdTaWcpO1xyXG4gICAgICAgIGlzT3BlbmluZ01lbnUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJlZ2luQ2xvc2VNZW51KCkge1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUuc3Ryb2tlID0gXCIjYmJiYmJiXCI7XHJcbiAgICAgICAgbWVudVNwcmluZy50YXJnZXQgPSAwO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcobWVudVNwcmluZywgbWVudVNwcmluZ1NpZyk7XHJcbiAgICAgICAgaXNPcGVuaW5nTWVudSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJlZ2luQ2xvc2VNZW51KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1lbnUoKSB7XHJcbiAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbWVudS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgICAgICBtZW51LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzAwMDAwMGVlXCI7XHJcbiAgICAgICAgbWVudS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChtZW51KTtcclxuXHJcbiAgICAgICAgY29uc3QgbWVudVBhZ2VOYXZzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBbcGFnZU5hbWUsIG5hdkl0ZW1dIG9mIE9iamVjdC5lbnRyaWVzKG5hdkl0ZW1Gcm9tU3RyaW5nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtZW51UGFnZU5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYuaW5uZXJUZXh0ID0gcGFnZU5hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYuc3R5bGUuZm9udEZhbWlseSA9IFwiU3BhcnRhblwiO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgICAgIGNvbG9yT25Ib3ZlcihtZW51UGFnZU5hdiwgZ3JheSwgXCJ3aGl0ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiZWdpbkNsb3NlTWVudSgpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5jbGljaygpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChtZW51UGFnZU5hdik7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2cy5wdXNoKG1lbnVQYWdlTmF2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVNZW51T3BhY2l0eSgpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIFttZW51LCAuLi5tZW51UGFnZU5hdnNdKSBlLnN0eWxlLm9wYWNpdHkgPSBtZW51U3ByaW5nLnBvc2l0aW9uICsgXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVmZmVjdChhbmltYXRlTWVudU9wYWNpdHksIFttZW51U3ByaW5nU2lnXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxheW91dE1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnUuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoKTtcclxuICAgICAgICAgICAgbWVudS5zdHlsZS5oZWlnaHQgPSBweChpbm5lckhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lbnVQYWdlTmF2IG9mIG1lbnVQYWdlTmF2cykge1xyXG4gICAgICAgICAgICAgICAgbWVudVBhZ2VOYXYuc3R5bGUuZm9udFNpemUgPSBweChpbm5lckhlaWdodCAqIDAuMDUpO1xyXG4gICAgICAgICAgICAgICAgY2VudGVyRWxlbWVudChtZW51UGFnZU5hdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeUNlbnRlcldpdGhHYXAobWVudVBhZ2VOYXZzLCBpbm5lckhlaWdodCAqIDAuMDgsIGlubmVySGVpZ2h0IC8gMik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWZmZWN0KGxheW91dE1lbnUsIFtib2R5U2lnXSk7XHJcblxyXG4gICAgICAgIGNsb3NlTWVudSA9ICgpID0+IHtcclxuICAgICAgICAgICAgYm9keVNpZy51bnN1YnNjcmliZShsYXlvdXRNZW51KTtcclxuICAgICAgICAgICAgbWVudVNwcmluZ1NpZy51bnN1YnNjcmliZShhbmltYXRlTWVudU9wYWNpdHkpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lbnVQYWdlTmF2IG9mIG1lbnVQYWdlTmF2cykgYm9keS5yZW1vdmVDaGlsZChtZW51UGFnZU5hdik7XHJcbiAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQobWVudSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBib2R5LmFwcGVuZENoaWxkKG1lbnVCdXR0b24pO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGhlYWRlckljb25TaXplKCk7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS53aWR0aCA9IHB4KHNpemUpO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUuaGVpZ2h0ID0gcHgoc2l6ZSk7XHJcblxyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUubGVmdCA9IHB4KGlubmVyV2lkdGggLSBzaXplIC0gZWRnZUFsaWduWCgpKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLnRvcCA9IHB4KChnZXRIZWFkZXJCYXJIZWlnaHQoKSAtIHNpemUpIC8gMik7XHJcblxyXG4gICAgICAgIGNlbnRlckVsZW1lbnQ7XHJcbiAgICB9LCBbYm9keVNpZ10pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRMb2dvKCkge1xyXG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICBsb2dvLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgbG9nby5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIGxvZ28uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBsb2dvLnNyYyA9IFwibG9nby5zdmdcIjtcclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobG9nbyk7XHJcblxyXG4gICAgbG9nby5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIG5hdkl0ZW1Gcm9tU3RyaW5nLnZpZXcuY2xpY2soKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHVsc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHB1bHNlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHB1bHNlLnN0eWxlLmJhY2tncm91bmQgPSBpZUdyZWVuO1xyXG4gICAgICAgIHB1bHNlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHB1bHNlKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHVsc2VTcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xyXG4gICAgICAgIHB1bHNlU3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDQwKTtcclxuICAgICAgICBjb25zdCBwdWxzZVNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuXHJcbiAgICAgICAgcHVsc2VTcHJpbmcudGFyZ2V0ID0gMTtcclxuICAgICAgICBhbmltYXRlU3ByaW5nKHB1bHNlU3ByaW5nLCBwdWxzZVNwcmluZ1NpZyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVQdWxzZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHB1bHNlU3ByaW5nLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBvdXQgPSAzMDtcclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUubGVmdCA9IHB4KGxvZ28ub2Zmc2V0TGVmdCAtIHMgKiBvdXQpO1xyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS50b3AgPSBweChsb2dvLm9mZnNldFRvcCAtIHMgKiBvdXQpO1xyXG5cclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUud2lkdGggPSBweChsb2dvLm9mZnNldFdpZHRoICsgcyAqIDIgKiBvdXQpO1xyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS5oZWlnaHQgPSBweChsb2dvLm9mZnNldEhlaWdodCArIHMgKiAyICogb3V0KTtcclxuXHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLm9wYWNpdHkgPSAxIC0gcyArIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWxzZVNwcmluZy5vblJlc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHB1bHNlU3ByaW5nU2lnLnVuc3Vic2NyaWJlKGFuaW1hdGVQdWxzZSk7XHJcbiAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQocHVsc2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGVmZmVjdChhbmltYXRlUHVsc2UsIFtwdWxzZVNwcmluZ1NpZ10pO1xyXG4gICAgfTtcclxuXHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNpemUgPSBoZWFkZXJJY29uU2l6ZSgpO1xyXG4gICAgICAgIGxvZ28uc3R5bGUud2lkdGggPSBweChzaXplKTtcclxuICAgICAgICBsb2dvLnN0eWxlLmhlaWdodCA9IHB4KHNpemUpO1xyXG5cclxuICAgICAgICBsb2dvLnN0eWxlLmxlZnQgPSBweChlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgIGxvZ28uc3R5bGUudG9wID0gcHgoKGdldEhlYWRlckJhckhlaWdodCgpIC0gc2l6ZSkgLyAyKTtcclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENvcHlyaWdodCgpIHtcclxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgY29weXJpZ2h0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgY29weXJpZ2h0LmlubmVyVGV4dCA9IFwiwqkyMDI1IGkuZS4gZGVzaWduLCBpbmMuXCI7XHJcbiAgICBjb3B5cmlnaHQuc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7XHJcblxyXG4gICAgc3R5bGVUZXh0KGNvcHlyaWdodCwgeyBsZXR0ZXJTcGFjaW5nOiAwLjMsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IGdyYXksIGZvbnRTaXplOiAxMCwgbGluZUhlaWdodDogMjAgfSk7XHJcblxyXG4gICAgYm9keS5hcHBlbmRDaGlsZChjb3B5cmlnaHQpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLmxlZnQgPSBweChlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgICAgICBjb3B5cmlnaHQuc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgKiAwLjkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFpaWlogbmVlZCB0byBkbyBzb21ldGhpbmcgaGVyZVxyXG4gICAgICAgICAgICBjb3B5cmlnaHQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICBjb25zdCBwYWdlTmFtZSA9IGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKFwiIy9cIi5sZW5ndGgpO1xyXG4gICAgLy8gaWYgKHBhZ2VOYW1lID09PSBcIlwiKSBhd2FpdCBhbmltYXRlSW50cm8oKTtcclxuICAgIGFkZE5hdkl0ZW1zKCk7XHJcbiAgICBhZGRIZWFkZXJCYXIoKTtcclxuICAgIGFkZE1lbnVCdXR0b24oKTtcclxuICAgIGFkZExvZ28oKTtcclxuICAgIGFkZENvcHlyaWdodCgpO1xyXG5cclxuICAgIGNvbnN0IHBhZ2VuYXZJdGVtID0gbmF2SXRlbUZyb21TdHJpbmdbcGFnZU5hbWVdID8/IG5hdkl0ZW1Gcm9tU3RyaW5nLnZpZXc7XHJcbiAgICBwYWdlbmF2SXRlbS5jbGljaygpO1xyXG59XHJcbnNldHVwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==