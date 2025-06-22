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
const navElementFromString = {};
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
        logo.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
        logo.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() - size) / 2);
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
            copyright.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(edgeAlignX());
            copyright.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_2__.px)(_scroll__WEBPACK_IMPORTED_MODULE_9__.scrollContainer.offsetHeight);
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
        const pageNavElement = (_a = navElementFromString[pageName]) !== null && _a !== void 0 ? _a : navElementFromString.view;
        pageNavElement.click();
    });
}
setup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO1NBQzFEO0lBQ0wsQ0FBQyxFQUFFLENBQUMsK0NBQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQWUsS0FBSzs7O1FBQ2hCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCw2Q0FBNkM7UUFDN0MsV0FBVyxFQUFFLENBQUM7UUFDZCxZQUFZLEVBQUUsQ0FBQztRQUNmLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWSxFQUFFLENBQUM7UUFFZixNQUFNLGNBQWMsR0FBRywwQkFBb0IsQ0FBQyxRQUFRLENBQUMsbUNBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDO1FBQ25GLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Q0FDMUI7QUFDRCxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZS50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9jb25uZWN0LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2V2b2x1dGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9pbnNwaXJhdGlvbi50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy92aWV3LnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3dvcmsudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2Nyb2xsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NpZ25hbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zcHJpbmcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzTGFuZHNjYXBlIH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuZXhwb3J0IGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuZXhwb3J0IGNvbnN0IGJvZHlTaWcgPSBuZXcgU2lnbmFsKCk7XG53aW5kb3cub25yZXNpemUgPSAoKSA9PiBib2R5U2lnLnVwZGF0ZSgpO1xuXG5leHBvcnQgY29uc3QgaWVCbHVlID0gXCIjNjA5Q0NFXCI7XG5leHBvcnQgY29uc3QgaWVHcmVlbiA9IFwiI2JmZTAyMVwiO1xuZXhwb3J0IGNvbnN0IGdyYXkgPSBcIiM4MDgwODBcIjtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbkFuaW1hdGlvbiA9ICgpID0+IGBmYWRlSW4ke2lzTGFuZHNjYXBlKCkgPyBcIlhcIiA6IFwiWVwifSBlYXNlIDAuNnNgO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gPSAwLjk1O1xuIiwiaW1wb3J0IHsgaW50ZXJsYWNlZCB9IGZyb20gXCIuL3V0aWxcIjtcblxuaW50ZXJmYWNlIEVsZW1lbnRBbGlnbm1lbnQge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZm9udFNpemU6IG51bWJlcjtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBsaW5lSGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweChwaXhlbHM6IG51bWJlcikge1xuICAgIHJldHVybiBwaXhlbHMgKyBcInB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50Lm9mZnNldFdpZHRoICsgZ2FwKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuLy8gWlpaWiB3YW50IGEgc2hvcnQgaGFuZCBmb3IgY29tbW9uIHNpbXBsZSB1c2VcbmV4cG9ydCBjb25zdCBhbGlnbmluZ1dpdGhHYXBzWSA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50Lm9mZnNldEhlaWdodCk7XG5leHBvcnQgY29uc3QgYWxpZ25pbmdXaXRoR2Fwc1ggPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5vZmZzZXRXaWR0aCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCwgd2lkdGg6IG51bWJlcikge1xuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KCh3aWR0aCAqIGVsZW1lbnQubmF0dXJhbEhlaWdodCkgLyBlbGVtZW50Lm5hdHVyYWxXaWR0aCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0SGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBoZWlnaHQ6IG51bWJlcikge1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCgoaGVpZ2h0ICogZWxlbWVudC5uYXR1cmFsV2lkdGgpIC8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xuICAgIHJldHVybiBpbm5lcldpZHRoIC8gaW5uZXJIZWlnaHQgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geUNlbnRlcldpdGhHYXAoZWxlbWVudHM6IEhUTUxFbGVtZW50W10sIGdhcDogbnVtYmVyLCBjZW50ZXI6IG51bWJlcikge1xuICAgIGNvbnN0IGVsZW1lbnRzV2l0aEdhcHMgPSBpbnRlcmxhY2VkKGVsZW1lbnRzLCBnYXApO1xuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgdG90YWxIZWlnaHRdID0gYWxpZ25pbmdXaXRoR2Fwc1koZWxlbWVudHNXaXRoR2Fwcyk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBjZW50ZXIgLSB0b3RhbEhlaWdodCAvIDIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChpbm5lcldpZHRoIC8gMiAtIGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRTaXplID0gcHgocy5mb250U2l6ZSk7XG4gICAgaWYgKHMud2lkdGgpIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzLndpZHRoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzLmxpbmVIZWlnaHQpO1xufVxuIiwiaW1wb3J0IHsgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5cbmV4cG9ydCBjb25zdCBwYWdlQ2xlYW51cHMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmNvbnN0IGF3YWl0QmVmb3JlTGF5b3V0cyA9IG5ldyBTZXQ8UHJvbWlzZTx2b2lkPj4oKTtcbmNvbnN0IGJlZm9yZUxheW91dHMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdExheW91dEZvckltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGF3YWl0QmVmb3JlTGF5b3V0cy5hZGQoaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVcGRhdGVMYXlvdXQodXBkYXRlTGF5b3V0OiAoKSA9PiB2b2lkKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoYXdhaXRCZWZvcmVMYXlvdXRzKTtcbiAgICBhd2FpdEJlZm9yZUxheW91dHMuY2xlYXIoKTtcbiAgICBydW5BbGxBbmRDbGVhcihiZWZvcmVMYXlvdXRzKTtcblxuICAgIGVmZmVjdCh1cGRhdGVMYXlvdXQsIFtib2R5U2lnXSk7XG4gICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dCkpO1xuXG4gICAgdXBkYXRlTGF5b3V0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZEZvclBhZ2UocGFyZW50OiBIVE1MRWxlbWVudCwgY2hpbGQ6IEhUTUxFbGVtZW50KSB7XG4gICAgYmVmb3JlTGF5b3V0cy5hZGQoKCkgPT4ge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICBwYWdlQ2xlYW51cHMuYWRkKCgpID0+IHBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCkpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5MYXN0UGFnZSgpIHtcbiAgICBydW5BbGxBbmRDbGVhcihwYWdlQ2xlYW51cHMpO1xufVxuXG5mdW5jdGlvbiBydW5BbGxBbmRDbGVhcihzZXQ6IFNldDwoKSA9PiB2b2lkPikge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBzZXQpIGl0ZW0oKTtcbiAgICBzZXQuY2xlYXIoKTtcbn1cbiIsImltcG9ydCB7IGFsaWduaW5nV2l0aEdhcHNYLCBhbGlnbmluZ1dpdGhHYXBzWSwgcHgsIHNldFdpZHRoLCBzdHlsZVRleHQgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgY2VudGVyV2l0aGluU2Nyb2xsWSwgZ2V0U2Nyb2xsSGVpZ2h0IH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xuXG5mdW5jdGlvbiBhZGRJY29uKGltYWdlU3JjOiBzdHJpbmcsIGNsaWNrTGluazogc3RyaW5nKSB7XG4gICAgY29uc3QgaWNvbiA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3JjKTtcbiAgICBpY29uLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIGljb24ub25jbGljayA9ICgpID0+IHdpbmRvdy5vcGVuKGNsaWNrTGluayk7XG4gICAgcmV0dXJuIGljb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDb25uZWN0UGFnZSgpIHtcbiAgICBjb25zdCBjb25uZWN0ID0gYWRkU2Nyb2xsSW1hZ2UoXCJjb25uZWN0L2Nvbm5lY3Quc3ZnXCIpO1xuICAgIGNvbnN0IHRleHRzID0gW1xuICAgICAgICBhZGRTY3JvbGxUZXh0KFwiT3VyIGNsaWVudHMgbG9vayB0byB1cyBmb3IgbW9yZSB0aGFuIGF3YXJkLXdpbm5pbmcgZGVzaWduLiBUaGV5IHZhbHVlIG91ciByb2xlIGFzIHRydXN0ZWQgYWR2aXNvciwgc3VwcG9ydCwgYW5kIGNvbmZpZGFudC5cIiksXG4gICAgICAgIGFkZFNjcm9sbFRleHQoXCJXZSBsb29rIGZvciBzeW5lcmd5IGFuZCBjb21wYXRpYmlsaXR5IGluIGV2ZXJ5IHJlbGF0aW9uc2hpcCB3ZSBidWlsZCBzbyB0aGUgd29yayBleHBlcmllbmNlIGRvZXNu4oCZdCBmZWVsIGxpa2Ugd29yayBhdCBhbGwuXCIpLFxuICAgICAgICBhZGRTY3JvbGxUZXh0KFwiSWYgeW91ciBndXQgaXMgdGVsbGluZyB5b3Ugd2Ugc2hvdWxkIGNvbm5lY3QsIG5vdyBpcyB0aGUgcGVyZmVjdCB0aW1lIHRvIGVtYWlsLlwiKSxcbiAgICBdO1xuICAgIGNvbnN0IGxldHNNZWV0ID0gYWRkU2Nyb2xsSW1hZ2UoXCJjb25uZWN0L2xldHMtbWVldC5qcGdcIik7XG4gICAgY29uc3Qgd2hvID0gYWRkU2Nyb2xsVGV4dChcIkJldGhseW4gS3Jha2F1ZXIsIEZvdW5kZXIgYW5kIENyZWF0aXZlIERpcmVjdG9yXCIpO1xuXG4gICAgY29uc3QgaW5zdGFncmFtSWNvbiA9IGFkZEljb24oXCJjb25uZWN0L2luc3RhZ3JhbS1pY29uLnN2Z1wiLCBcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vaWVkZXNpZ25pbmNcIik7XG4gICAgY29uc3QgbGlua2VkaW5JY29uID0gYWRkSWNvbihcImNvbm5lY3QvbGlua2VkaW4taWNvbi5zdmdcIiwgXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vY29tcGFueS9pLWUtZGVzaWduLWluY1wiKTtcbiAgICBjb25zdCBtYWlsSWNvbiA9IGFkZEljb24oXCJjb25uZWN0L21haWwtaWNvbi5zdmdcIiwgXCJtYWlsdG86YmV0aEBpZS1kZXNpZ24uY29tXCIpO1xuXG4gICAgY29uc3QgaWNvbnMgPSBbaW5zdGFncmFtSWNvbiwgbGlua2VkaW5JY29uLCBtYWlsSWNvbl07XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICBjb25zdCB3aWR0aCA9IDAuNTUgKiBzO1xuICAgICAgICBzZXRXaWR0aChjb25uZWN0LCB3aWR0aCk7XG4gICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkobGV0c01lZXQsIDAuOCk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0ZXh0IG9mIHRleHRzKSBzdHlsZVRleHQodGV4dCwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGgsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH0pO1xuICAgICAgICBzdHlsZVRleHQod2hvLCB7IGxldHRlclNwYWNpbmc6IDAuMTgsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjggKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH0pO1xuXG4gICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWShbXG4gICAgICAgICAgICBjb25uZWN0LCAvL1xuICAgICAgICAgICAgMC4wOSAqIHMsXG4gICAgICAgICAgICB0ZXh0c1swXSxcbiAgICAgICAgICAgIDAuMDMgKiBzLFxuICAgICAgICAgICAgdGV4dHNbMV0sXG4gICAgICAgICAgICAwLjAzICogcyxcbiAgICAgICAgICAgIHRleHRzWzJdLFxuICAgICAgICBdKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4wNSAqIHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0c01lZXQuc3R5bGUubGVmdCA9IHB4KGNvbm5lY3Qub2Zmc2V0TGVmdCArIGNvbm5lY3Qub2Zmc2V0V2lkdGggKyAwLjE1ICogcyk7XG5cbiAgICAgICAgd2hvLnN0eWxlLmxlZnQgPSBweChsZXRzTWVldC5vZmZzZXRMZWZ0KTtcbiAgICAgICAgd2hvLnN0eWxlLnRvcCA9IHB4KGxldHNNZWV0Lm9mZnNldFRvcCArIGxldHNNZWV0Lm9mZnNldEhlaWdodCArIDAuMDQgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGljb24gb2YgaWNvbnMpIHtcbiAgICAgICAgICAgIGljb24ud2lkdGggPSBzICogMC4wNTU7XG4gICAgICAgICAgICBjb25zdCBsYXN0VGV4dCA9IHRleHRzW3RleHRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWNvbi5zdHlsZS50b3AgPSBweChsYXN0VGV4dC5vZmZzZXRUb3AgKyBsYXN0VGV4dC5vZmZzZXRIZWlnaHQgKyAwLjAzICogcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW2ljb25BbGlnbm1lbnRzLCBfX10gPSBhbGlnbmluZ1dpdGhHYXBzWChbaW5zdGFncmFtSWNvbiwgMC4wMyAqIHMsIGxpbmtlZGluSWNvbiwgMC4wMyAqIHMsIG1haWxJY29uXSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGljb25BbGlnbm1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBpZUdyZWVuIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1gsIGFsaWduaW5nV2l0aEdhcHNZLCBweCwgc2V0SGVpZ2h0LCBzdHlsZVRleHQgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsUGFkZGluZywgYWRkU2Nyb2xsVGV4dCwgY2VudGVyV2l0aGluU2Nyb2xsWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBzY3JvbGxDb250YWluZXIgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5cbmludGVyZmFjZSBRdW90ZSB7XG4gICAgcXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGF1dGhvcjogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgdGl0bGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIG9wZW5RdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgY2xvc2VRdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFF1b3RlKHF1b3RlVGV4dDogc3RyaW5nLCBhdXRob3JUZXh0OiBzdHJpbmcsIHRpdGxlVGV4dDogc3RyaW5nKTogUXVvdGUge1xuICAgIGNvbnN0IHF1b3RlID0gYWRkU2Nyb2xsVGV4dChxdW90ZVRleHQpO1xuICAgIHF1b3RlLnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7IC8vIGNhbid0IGFuaW1hdGUgaW4gb3RoZXJ3aXNlIGNsb3NlIHF1b3RlIGJvdW5kaW5nIGJveCBzaGl0IGdldHMgY29uZnVzZWRcbiAgICBjb25zdCBhdXRob3IgPSBhZGRTY3JvbGxUZXh0KGF1dGhvclRleHQpO1xuICAgIGNvbnN0IHRpdGxlID0gYWRkU2Nyb2xsVGV4dCh0aXRsZVRleHQpO1xuICAgIGNvbnN0IG9wZW5RdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJxcIik7XG4gICAgY29uc3QgY2xvc2VRdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJ1cIik7XG5cbiAgICByZXR1cm4geyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMyICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2NSAqIHMgfSk7XG5cbiAgICBzdHlsZVRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplOiAwLjE1ICogcywgd2lkdGg6IDAuMDUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9O1xuICAgIHN0eWxlVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgYXV0aG9yLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0KTtcbiAgICB0aXRsZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xuICAgICAgICBxdW90ZSwgLy9cbiAgICAgICAgMC4wNCAqIHMsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgLTAuMDE1ICogcyxcbiAgICAgICAgdGl0bGUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyAwLjM1ICogcyk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzb3J0YSBqYW5rLiBhZ2FpbiwgY2xvc2UgcXVvdGUgYm91bmRpbmcgYm94IGdldHMgY29uZnVzZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMocXVvdGUpO1xuICAgICAgICBjb25zdCByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lclJlY3QgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGxhc3RUZXh0TGluZVJlY3QgPSByZWN0c1tyZWN0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgbGFzdFJlY3RMZWZ0ID0gbGFzdFRleHRMaW5lUmVjdC5sZWZ0IC0gc2Nyb2xsQ29udGFpbmVyUmVjdC5sZWZ0ICsgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgb3BlblF1b3RlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0IC0gMC4wNyAqIHMpO1xuICAgICAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgICAgICBjbG9zZVF1b3RlLnN0eWxlLmxlZnQgPSBweChsYXN0UmVjdExlZnQgKyBsYXN0VGV4dExpbmVSZWN0LndpZHRoKTtcbiAgICAgICAgY2xvc2VRdW90ZS5zdHlsZS50b3AgPSBweChxdW90ZS5vZmZzZXRUb3AgKyBxdW90ZS5vZmZzZXRIZWlnaHQgLSAwLjAxICogcyk7XG4gICAgfSwgMTAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2b2x1dGlvblBhZ2UoKSB7XG4gICAgY29uc3QgZXZvbHV0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLnN2Z1wiKTtcbiAgICBjb25zdCBldm9sdXRpb25IaXN0b3J5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLWhpc3Rvcnkuc3ZnXCIpO1xuICAgIGNvbnN0IGxvZ29GdWxsID0gYWRkU2Nyb2xsSW1hZ2UoXCJsb2dvLWZ1bGwuc3ZnXCIpO1xuXG4gICAgY29uc3QgcHJvbW9zOiBIVE1MSW1hZ2VFbGVtZW50W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHByb21vcy5wdXNoKGFkZFNjcm9sbEltYWdlKGBldm9sdXRpb24vcHJvbW8tJHtpfS5qcGdgKSk7XG5cbiAgICBjb25zdCBxdW90ZXMgPSBbXG4gICAgICAgIGFkZFF1b3RlKFxuICAgICAgICAgICAgXCJPdXIgYW5udWFsIHByb21vIGlzIGFsd2F5cyBncm91bmRlZCBpbiBvdXIgaWRlbnRpdHkgYnV0IGl0J3MgZnVuIHRvIHB1c2ggbGltaXRzIGFuZCByZWludmVudCBvdXJzZWx2ZXMgZWFjaCB5ZWFyLiBUaGUgYmVzdCBwYXJ0IGlzIDxzdHJvbmc+aGVhcmluZyB3aGF0IG91ciBjbGllbnRzIGhhdmUgdG8gc2F5Ljwvc3Ryb25nPlwiLFxuICAgICAgICAgICAgXCJCRVRITFlOIEtSQUtBVUVSXCIsXG4gICAgICAgICAgICBcIkZvdW5kZXIsIGkuZS4gZGVzaWduLCBpbmMuXCJcbiAgICAgICAgKSxcbiAgICAgICAgYWRkUXVvdGUoXCJJIGxvdmUgaG93IHlvdSBkbyBzdHVmZi4gSSdtIGZpbmRpbmcgdGhhdCB0aGVzZSB0eXBlcyBvZiBtZXNzYWdlcyBhcmUgcmVhbGx5IDxzdHJvbmc+dHJhbnNmb3JtaW5nIHJlbGF0aW9uc2hpcHM8L3N0cm9uZz4gd2l0aCBwZW9wbGUuIFRoZXkgYXJlIGp1c3QgZHJlYW15LlwiLCBcIkRFQlJBIFNDSEFUWktJXCIsIFwiRm91bmRlciwgQlBQIFdlYWx0aCBTb2x1dGlvbnMgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcIkkgc2VlIGEgbG90IG9mIHRoaXMgc3BlY2lhbCBxdWFsaXR5IGluIHlvdXIgd29yay4gSXQncyBub3QganVzdCBhYm91dCBiZWluZyBpbnRlbnRpb25hbC4gWW91IGFsd2F5cyBicmluZyBpbiBhbiBlbGVtZW50IG9mIDxzdHJvbmc+c3VycHJpc2UgYW5kIGRlbGlnaHQuPC9zdHJvbmc+XCIsIFwiSk9TSCBLUkFLQVVFUlwiLCBcIkZvdW5kZXIsIFNjdWxwdFwiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJZb3VyIGFwcHJvYWNoIHdvcmtzIHNvIHdlbGwgYmVjYXVzZSBpdCBpcyByZWFsbHkgPHN0cm9uZz5wZXJzb25hbDwvc3Ryb25nPiBhbmQgZXF1YWxseSA8c3Ryb25nPnByb2Zlc3Npb25hbC48L3N0cm9uZz5cIiwgXCJBTk4gU1VMTElWQU5cIiwgXCJGb3VuZGVyLCBBbm4gU3VsbGl2YW4gT3JnYW5pemluZ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJZb3UgdHJ1bHkgdW5kZXJzdGFuZCB0aGUgdW5pcXVlIHBvc2l0aW9uaW5nIG9mIGEgcHJvc3BlY3RpdmUgY2xpZW50IGFuZCBhcmUgYWJsZSB0byA8c3Ryb25nPnRlbGwgdGhlaXIgc3Rvcnk8L3N0cm9uZz4gZXhhY3RseSBhcyBpdCBzaG91bGQgYmUgdG9sZC5cIiwgXCJEQVZJRCBZVU5cIiwgXCJQcmluY2lwYWwsIFZhcmlkZW50IExMQ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIkJldGggaXMgcXVpdGUgZnJhbmtseSBvbmUgb2YgdGhlIDxzdHJvbmc+bW9zdCB0YWxlbnRlZCBkZXNpZ25lcnM8L3N0cm9uZz4gdGhhdCBJIGhhdmUgZXZlciBoYWQgdGhlIHByaXZpbGVnZSB0byB3b3JrIHdpdGguIFNoZSBhbHdheXMgaGFzIGEgc3BlY2lhbCB3YXkgb2YgbWFraW5nIGV2ZXJ5dGhpbmcgc2hlIHRvdWNoZXMgdHVybiB0byBnb2xkIVwiLFxuICAgICAgICAgICAgXCJEQVZJRCBSVVNIXCIsXG4gICAgICAgICAgICBcIlByZXNpZGVudCwgRU5WXCJcbiAgICAgICAgKSxcbiAgICBdO1xuXG4gICAgY29uc3Qgc2Nyb2xsUGFkZGluZyA9IGFkZFNjcm9sbFBhZGRpbmcoKTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoZXZvbHV0aW9uLCAwLjc1KTtcbiAgICAgICAgc2V0SGVpZ2h0KGV2b2x1dGlvbkhpc3RvcnksIDAuMyAqIHMpO1xuICAgICAgICBzZXRIZWlnaHQobG9nb0Z1bGwsIDAuNDUgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb21vIG9mIHByb21vcykgY2VudGVyV2l0aGluU2Nyb2xsWShwcm9tbywgMSk7XG4gICAgICAgIGZvciAoY29uc3QgcXVvdGUgb2YgcXVvdGVzKSBzdHlsZVF1b3RlKHF1b3RlKTtcblxuICAgICAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW2V2b2x1dGlvbiwgMC4yICogcywgZXZvbHV0aW9uSGlzdG9yeV07XG5cbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgocXVvdGVzLmxlbmd0aCwgcHJvbW9zLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIDwgcXVvdGVzLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBxdW90ZXNbaV0ucXVvdGUpO1xuICAgICAgICAgICAgaWYgKGkgPCBwcm9tb3MubGVuZ3RoKSBpdGVtcy5wdXNoKDAuMyAqIHMsIHByb21vc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbXMucHVzaCgwLjIgKiBzLCBzY3JvbGxQYWRkaW5nKTtcblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1goaXRlbXMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2b2x1dGlvbkhpc3Rvcnkuc3R5bGUudG9wID0gcHgoZXZvbHV0aW9uLm9mZnNldFRvcCArIGV2b2x1dGlvbi5vZmZzZXRIZWlnaHQgLSBldm9sdXRpb25IaXN0b3J5Lm9mZnNldEhlaWdodCk7XG5cbiAgICAgICAgbG9nb0Z1bGwuc3R5bGUubGVmdCA9IHB4KGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0TGVmdCArIChldm9sdXRpb25IaXN0b3J5Lm9mZnNldFdpZHRoIC0gbG9nb0Z1bGwub2Zmc2V0V2lkdGgpIC8gMik7XG4gICAgICAgIGxvZ29GdWxsLnN0eWxlLnRvcCA9IHB4KGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0VG9wIC0gbG9nb0Z1bGwub2Zmc2V0SGVpZ2h0IC0gMC4xICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIGxheW91dFF1b3RlKHF1b3RlKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllQmx1ZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduV2l0aEdhcCwgYWxpZ25pbmdXaXRoR2Fwc1ksIHB4LCBzdHlsZVRleHQgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsUGFkZGluZywgYWRkU2Nyb2xsVGV4dCwgY2VudGVyV2l0aGluU2Nyb2xsWSwgZ2V0U2Nyb2xsSGVpZ2h0IH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xuXG5jb25zdCBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gPSAwLjg1O1xuXG5pbnRlcmZhY2UgSW5zcGlyYXRpb25UaWxlIHtcbiAgICBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3I6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRNb3JlOiBIVE1MRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gc3R5bGVJbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBzdHlsZVRleHQobWFqb3IsIHsgbGV0dGVyU3BhY2luZzogMC42LCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDM2ICogcywgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0pO1xuICAgIHN0eWxlVGV4dChtaW5vciwgeyBsZXR0ZXJTcGFjaW5nOiAwLjMsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMjcgKiBzLCB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfSk7XG4gICAgc3R5bGVUZXh0KHJlYWRNb3JlLCB7IGxldHRlclNwYWNpbmc6IDAuNSwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogaWVCbHVlLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcblxuICAgIGltYWdlLnN0eWxlLmhlaWdodCA9IHB4KDAuNTUgKiBzKTtcbn1cblxuZnVuY3Rpb24gYWxpZ25JbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBtYWpvci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICBtaW5vci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICByZWFkTW9yZS5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWShbXG4gICAgICAgIGltYWdlLCAvL1xuICAgICAgICAwLjAzICogcyxcbiAgICAgICAgbWFqb3IsXG4gICAgICAgIC0wLjAxICogcyxcbiAgICAgICAgbWlub3IsXG4gICAgICAgIDAuMDEgKiBzLFxuICAgICAgICByZWFkTW9yZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIHMgKiAwLjE1KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uVGlsZShpbWFnZVN0cmluZzogc3RyaW5nLCBtYWpvclRleHQ6IHN0cmluZywgbWlub3JUZXh0OiBzdHJpbmcpOiBJbnNwaXJhdGlvblRpbGUge1xuICAgIGNvbnN0IGltYWdlID0gYWRkU2Nyb2xsSW1hZ2UoaW1hZ2VTdHJpbmcpO1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9yID0gYWRkU2Nyb2xsVGV4dChtaW5vclRleHQpO1xuICAgIGNvbnN0IHJlYWRNb3JlID0gYWRkU2Nyb2xsVGV4dChcIlJlYWQgbW9yZVwiKTtcblxuICAgIHJldHVybiB7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbnNwaXJhdGlvblBhZ2UoKSB7XG4gICAgY29uc3QgaW5zcGlyYXRpb24gPSBhZGRTY3JvbGxJbWFnZShcImluc3BpcmF0aW9uL2luc3BpcmF0aW9uLnN2Z1wiKTtcblxuICAgIGNvbnN0IHRpbGVzID0gW1xuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi95dW1pZS5qcGdcIiwgXCJUSEUgU1RBUlQgT0YgU09NRVRISU5HIFlVTS1JRVwiLCBcIldlIGFsd2F5cyB3YW50ZWQgdG8gZGVzaWduIGNob2NvbGF0ZSBiYXJzIGFuZCBmaW5hbGx5IGRpZCBpdC4gSW50cm9kdWNpbmcgb3VyIHN3ZWV0IG5ldyBicmFuZC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3dvcmRzLWlkZWFzLmpwZ1wiLCBcIlNIQVJFIFNPTUUgREVTSUdOIExPVkVcIiwgXCJUaGUgaS5lLiBkZXNpZ24gcHJvbW8gam91cm5hbHMgZW5jb3VyYWdlIGNsaWVudHMgdG8gc2tldGNoIHRoZWlyIGJpZyBpZGVhcyBhbmQgY2FwdHVyZSB0aGVpciBkcmVhbXMuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9jb29rLWllLmpwZ1wiLCBcIkdPVFRBIExPVkUgQSBDT09LLUlFXCIsIFwiSG93IGEgc2VjcmV0IHJlY2lwZSB3b3JrcyB0byBicmluZyByZWxhdGlvbnNoaXBzIHRvIGEgd2hvbGUgbmV3IGxldmVsLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVtaXguanBnXCIsIFwiUkVNSVhcIiwgXCJBIGJlaGluZC10aGUtc2NlbmVzIGxvb2sgYXQgaG93IHdlIHRyYW5zZm9ybWVkIGNsYXNzaWMgbWVtb3J5IGNhcnJpZXJzIGludG8gb2JqZWN0cyBvZiBhcnQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9rcmVtcGEucG5nXCIsIFwiUkVCUkFORElORyBBIEZBTUlMWSBCVVNJTkVTU1wiLCBcIkEgcmVmcmVzaCBmb3IgYSA1MC15ZWFyIGxlZ2FjeS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2ZvdG9zdG9yaS5qcGdcIiwgXCJCUkFORElORyBGUk9NIFRIRSBOQU1FIFVQXCIsIFwiV2hlbiBhIGNsaWVudCBoYWQgYW4gaWRlYSBmb3IgYSBicmFuZCBzcGlub2ZmLCB3ZSB0b29rIGhlciBjb25jZXB0IHRvIHJlYWxpdHkgYW5kIGxhdW5jaGVkIHRoZSBidXNpbmVzcyBpbiBoaWdoIHN0eWxlLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vaW5zcGlyZWQtMi1jcmVhdGUuanBnXCIsIFwiSU5TUElSRUQgMiBDUkVBVEVcIiwgXCJBIHBhaW50aW5nIGluc3BpcmVkIGJ5IHRoZSBpLmUuIGRlc2lnbiBsb2dvIGNvbWJpbmVzIG9pbCBwYWludHMsIGdyb3VuZCB1cCBjcmF5b25zLCBhbmQgYSBsZWdvLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZnJvbS1pbnNpZGUuanBnXCIsIFwiVEhFIFZJRVcgRlJPTSBJTlNJREVcIiwgXCJpLmUuIGRlc2lnbidzIG5ldyBzdHVkaW8gd2FzIDMwIHllYXJzIGluIHRoZSBtYWtpbmcuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZWNvbm5lY3RpbmcuanBnXCIsIFwiUkVDT05ORUNUSU5HXCIsIFwiSG93IHVuY2VydGFpbiB0aW1lcyBsZWQgdG8gYSBob21lY29taW5nIGZvciBpLmUuIGRlc2lnbidzIHNlbmlvciBkZXNpZ25lci5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL25ldy1zdHVkaW8uanBnXCIsIFwiTkVXIFNUVURJTy4gTkVXIFZJRVcuXCIsIFwiSG93IHRoZSBuZWVkIGZvciBpbnNwaXJhdGlvbiBmdWVsZWQgdGhlIGJ1aWxkaW5nIG9mIGEgc3R1ZGlvLlwiKSxcbiAgICBdO1xuXG4gICAgY29uc3Qgc2Nyb2xsUGFkZGluZyA9IGFkZFNjcm9sbFBhZGRpbmcoKTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaW5zcGlyYXRpb24sIDAuNzUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgc3R5bGVJbnNwaXJhdGlvblRpbGUodGlsZSk7XG5cbiAgICAgICAgYWxpZ25XaXRoR2FwKGluc3BpcmF0aW9uLCB0aWxlc1swXS5pbWFnZSwgMC4yNSAqIHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aCAtIDE7IGkrKykgYWxpZ25XaXRoR2FwKHRpbGVzW2ldLmltYWdlLCB0aWxlc1tpICsgMV0uaW1hZ2UsIDAuMSAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgYWxpZ25JbnNwaXJhdGlvblRpbGUodGlsZSk7XG5cbiAgICAgICAgY29uc3QgbGFzdEltYWdlID0gdGlsZXNbdGlsZXMubGVuZ3RoIC0gMV0uaW1hZ2U7XG4gICAgICAgIHNjcm9sbFBhZGRpbmcuc3R5bGUubGVmdCA9IHB4KGxhc3RJbWFnZS5vZmZzZXRMZWZ0ICsgbGFzdEltYWdlLm9mZnNldFdpZHRoICsgMC4xICogcyk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1gsIGFsaWduaW5nV2l0aEdhcHNZLCBpc0xhbmRzY2FwZSwgcHggfSBmcm9tIFwiLi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7IHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcclxuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFBhZGRpbmcsIGFkZFNjcm9sbFRleHRTcXVhcmUsIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSwgY2VudGVyV2l0aGluU2Nyb2xsWCwgY2VudGVyV2l0aGluU2Nyb2xsWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRTY3JvbGxXaWR0aCwgc2Nyb2xsQ29udGFpbmVyLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkVmlld1BhZ2UoKSB7XHJcbiAgICBjb25zdCBob21lID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvbWUuc3ZnXCIpO1xyXG4gICAgY29uc3QgaG9yaXpvbiA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob3Jpem9uLmpwZ1wiKTtcclxuICAgIGNvbnN0IGZyZXNoTG9vayA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9mcmVzaC1sb29rLnN2Z1wiKTtcclxuICAgIGNvbnN0IGdyZWF0QnJhbmRzID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2dyZWF0LWJyYW5kcy5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTEgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiR1JFQVQgQlJBTkRTIERPTidUIEpVU1QgSEFQUEVOXCIsXHJcbiAgICAgICAgXCJUaGV5IHJlcXVpcmUgZXhwbG9yYXRpb24sIGluc2lnaHQsIGFuZCB0ZW5hY2l0eS4gV2UgaHVudCBmb3IgdGhhdCBtYWdpYyBzcGFyayB0aGF0IGlnbml0ZXMgaW5ub3ZhdGlvbi4gV2UgYnJpbmcgb3VyIGV4dGVuc2l2ZSBza2lsbHMgYW5kIGV4cGVyaWVuY2UgdG8gZWFjaCBwcm9qZWN0IGFuZCBnaXZlIGl0IG91ciBhbGwuIFRoZSByZXN1bHQgaXMgY2xlYXIsIHlldCBlbGV2YXRlZCBjb21tdW5pY2F0aW9uIHRoYXQgbWFrZXMgcGVvcGxlIHN0b3AsIHRoaW5rLCBhbmQgb2Z0ZW4gc21pbGUuXCIsXHJcbiAgICAgICAgXCJPdXIgc3R1ZGlvIGxvY2F0aW9uIGlzIHByb2ZvdW5kbHkgaW5zcGlyaW5nLiBUaGUgbWFnbmlmaWNlbnQgdmlldyBmZWVkcyBvdXIgc291bHMgYW5kIGtlZXBzIHVzIGluc3BpcmVkIHRvIGRvIG91ciBiZXN0IHdvcmsuIEl0J3MgYSBwbGFjZSB3aGVyZSBjcmVhdGl2ZSBwZW9wbGUgY29tZSB0b2dldGhlciB0byBjb2xsYWJvcmF0ZSBhbmQgZHJpbGwgZG93biB0byB0aGUgaGVhcnQgb2YgdGhlIG1hdHRlci4gVG8gc29sdmUgcHJvYmxlbXMgYW5kIGJyaW5nIGlkZWFzIHRvIGxpZmUuIFRvIGNyZWF0ZSB0aGluZ3Mgd29ydGggcmVtZW1iZXJpbmcuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBpbnNpZ2h0Q2xhcml0eSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9pbnNpZ2h0LWNsYXJpdHkuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUyID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIEJSSU5HIFZJU0lPTiwgSU5TSUdIVCwgQU5EIENMQVJJVFkgVE8gRVZFUlkgUFJPSkVDVFwiLFxyXG4gICAgICAgIFwiU3VjY2Vzc2Z1bCBkZXNpZ24gc3RhcnRzIHdpdGggaWRlbnRpZnlpbmcgYSBjbGllbnQncyBuZWVkcywgZ29hbHMsIGFuZCBhc3BpcmF0aW9ucy4gT3VyIG9iamVjdGl2aXR5IHNoaW5lcyBsaWdodCBvbiB3aGF0IG90aGVycyBoYXZlIG1pc3NlZC4gV2UgaGF2ZSB0aGUgYWJpbGl0eSB0byBzZWUgYW5kIGludGVycHJldCB0aGUgaW5uZXIgd29ya2luZ3MsIGN1bHR1cmUsIGFuZCBudWFuY2VzIG9mIG91ciBjbGllbnQncyB3b3JsZC4gV2UgYXNrIHF1ZXN0aW9ucyDigJMgbG90cyBvZiBxdWVzdGlvbnMuIFRoZW4gbGlzdGVuIHVudGlsIHdlIGdhaW4gdGhlIGRlZXAgdW5kZXJzdGFuZGluZyBuZWNlc3NhcnkgdG8gYnVpbGQgdGhlIHNvbGlkIGZvdW5kYXRpb24gdGhhdCBhbnkgZW5kdXJpbmcgYnJhbmQgbmVlZHMuXCIsXHJcbiAgICAgICAgXCJPdXIgc21hbGwgYnV0IG1pZ2h0eSB0ZWFtIGJyaW5ncyB0b2dldGhlciBhIHdpZGUgcmFuZ2Ugb2YgdGFsZW50cyBhbmQgcGVyc3BlY3RpdmVzLCBwbHVzIGEgbmljZSBsaXN0IG9mIGF3YXJkcy4gV2UgdGhyb3cgb3VyIGhlYXJ0cyBpbnRvIG91ciB3b3JrIGFuZCBhcmUga25vd24gZm9yIG91ciBmaWVyY2UgY29tbWl0bWVudCB0byB0aGUgdHJ1c3RlZCwgbG9uZy10ZXJtIHBhcnRuZXJzaGlwcyB3ZSBmb3JtLiBGb3IgdXMsIGl0J3MgcGVyc29uYWwuXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBza3l3YXJkID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L3NreXdhcmQuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUzID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIldFIFNFRSBXT1JLIElOIEEgRElGRkVSRU5UIExJR0hUXCIsXHJcbiAgICAgICAgXCJQZW9wbGUgbGlrZSB0byBhc2sgYWJvdXQgb3VyIGRlc2lnbiBwcm9jZXNzLiBUaGUgdHJ1dGggaXMgdGhhdCB0aGUgYXBwcm9hY2ggdG8gZWFjaCBwcm9qZWN0IHZhcmllcywgYmVjYXVzZSBlYWNoIGNsaWVudCBhbmQgdGhlaXIgbmVlZHMgYXJlIHVuaXF1ZS4gQ3JlYXRpdmUgYnJlYWt0aHJvdWdocyBkb24ndCBmb2xsb3cgdGhlIGNsb2NrLiBUaGV5IGNhbiBoYXBwZW4gYW55IHRpbWUgb2YgZGF5IOKAkyBvciBuaWdodC4gV2hldGhlciBhbiBlcGlwaGFueSBpcyBpbGx1bWluYXRlZCBpbiBhIHNjcmliYmxlLCBhIGRyZWFtLCBvciBhcyB0aGUgY2xvdWRzIHJvbGwgYnksIHdlIGVtYnJhY2UgdGhlIGZhY3QgdGhhdCBlYWNoIHByb2plY3QgdGFrZXMgb24gYSBsaWZlIG9mIGl0cyBvd24uXCIsXHJcbiAgICAgICAgXCJXaGF0J3MgY29uc3RhbnQgaXMgb3VyIGFiaWxpdHkgdG8gbGlzdGVuIGFuZCBmb2N1cywgdG8gYW5hbHl6ZSBhbmQgY29ubmVjdCBkb3RzLCBhbmQgdG8gcmVtYWluIGN1cmlvdXMuIFRoZSBtb3N0IHJld2FyZGluZyBwcm9qZWN0cyBhcmUgd2l0aCBjbGllbnRzIHdobyB2YWx1ZSB0aGUgYmFsYW5jZSBiZXR3ZWVuIHB1c2hpbmcgZm9yd2FyZCBhbmQgYWxsb3dpbmcgdGltZSBmb3IgdGhlIHBlcmZlY3Qgc29sdXRpb24gdG8gZW1lcmdlLiBUaGF0J3Mgb3VyIGhhcHB5IHBsYWNlLlwiXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHRleHRUaWxlcyA9IFt0ZXh0VGlsZTEsIHRleHRUaWxlMiwgdGV4dFRpbGUzXTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gYWRkU2Nyb2xsUGFkZGluZygpO1xyXG5cclxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBIT01FX0hPUklaT05fUEFEID0gMC4yO1xyXG4gICAgICAgIGNvbnN0IEZSRVNIX0xPT0tfUEFEID0gMC4xMztcclxuICAgICAgICBjb25zdCBJTUFHRV9URVhUX1NRVUFSRV9QQUQgPSAwLjE3O1xyXG5cclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGhvbWUsIDAuOTUpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGhvcml6b24sIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGZyZXNoTG9vaywgMC44KTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpXHJcbiAgICAgICAgICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFRpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAyLjIsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiI0IzQjNCM1wiLCBmb250U2l6ZTogMC4wNjUgKiBzLCB3aWR0aDogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA5ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNYKFtcclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICBIT01FX0hPUklaT05fUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgICAgICBGUkVTSF9MT09LX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBmcmVzaExvb2ssXHJcbiAgICAgICAgICAgICAgICBGUkVTSF9MT09LX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBncmVhdEJyYW5kcyxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTEubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUyLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNreXdhcmQsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRpbGUzLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFBhZGRpbmcsXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlLCAyMCwgMjApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoZnJlc2hMb29rLCAwLjg1KTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbFdpZHRoKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcylcclxuICAgICAgICAgICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0VGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDQsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiI0IzQjNCM1wiLCBmb250U2l6ZTogMC4wNiAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOCAqIHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFRFWFRfVElMRV9XSURUSCA9IDAuODU7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKHRleHRUaWxlLm1ham9yLCBURVhUX1RJTEVfV0lEVEgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtaW5vciBvZiB0ZXh0VGlsZS5taW5vcnMpIGNlbnRlcldpdGhpblNjcm9sbFgobWlub3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IE1PQklMRV9QQUQgPSAwLjA4O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW9iaWxlVGlsZSh0ZXh0VGlsZTogVGV4dFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IFt0ZXh0VGlsZS5tYWpvciwgMC4wICogc107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgeC5wdXNoKDAuMDQgKiBzLCBtaW5vcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNZKFtcclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUxKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUyKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTMpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxQYWRkaW5nLFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBzcGFjZVRvRmlsZSB9IGZyb20gXCIuLi91dGlsXCI7XG5pbXBvcnQgeyBib2R5IH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1gsIHB4IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGRGb3JQYWdlLCBhd2FpdExheW91dEZvckltYWdlTG9hZGluZywgcGFnZUNsZWFudXBzLCByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XG5pbXBvcnQgeyBUZXh0U3F1YXJlLCBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dFNxdWFyZSwgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQsIHNjcm9sbENvbnRhaW5lciwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xuaW1wb3J0IHsgU2lnbmFsLCBlZmZlY3QgfSBmcm9tIFwiLi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBTcHJpbmcsIGFuaW1hdGVTcHJpbmcgfSBmcm9tIFwiLi4vc3ByaW5nXCI7XG5cbmludGVyZmFjZSBXb3JrQ29udGVudCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdbXTtcbn1cblxuaW50ZXJmYWNlIFdvcmtJdGVtIHtcbiAgICB0ZXh0U3F1YXJlOiBUZXh0U3F1YXJlO1xuICAgIGltYWdlMTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBpbWFnZTI6IEhUTUxJbWFnZUVsZW1lbnQ7XG59XG5cbmludGVyZmFjZSBXb3JrVGFiIHtcbiAgICB0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHNwcmluZzogU3ByaW5nO1xuICAgIHNwcmluZ1NpZzogU2lnbmFsO1xuICAgIHdvcmtJdGVtOiBXb3JrSXRlbTtcbn1cblxuY29uc3Qgd29ya0NvbnRlbnRzOiBXb3JrQ29udGVudFtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogXCJiZXJ3eW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiSGF2aW5nIHNwZW50IGhpcyBlbnRpcmUgY2hpbGRob29kIG1ha2luZyBmaWxtcywgdGhpcyBjb21wYW55J3MgZm91bmRlciBuYW1lZCBoaXMgYWdlbmN5IGFmdGVyIHRoZSBzdHJlZXQgb24gd2hpY2ggaGUgd2FzIHJhaXNlZC4gV2l0aCBhIGhpc3RvcnkgbGlrZSB0aGF0LCB3ZSBoYWQgdG8gZWxldmF0ZSBCZXJ3eW4gdG8gbGFuZG1hcmsgc3RhdHVzLiBVc2luZyBjdXN0b20gcGhvdG9ncmFwaHkgYW5kIG1hc3RlciBtYW5pcHVsYXRpb24sIHdlIGNyZWF0ZWQgYSBmbGV4aWJsZSBzdGlja2VyIHN5c3RlbSB0aGF0IGlzIGludGVyY2hhbmdlYWJsZSB3aXRoIG11bHRpLWNvbG9yZWQgcGFwZXIgc3RvY2tzLiBFbXBsb3llZXMgYXJlIGVuY291cmFnZWQgdG8gZGVzaWduIHRoZWlyIG93biBjb21tdW5pY2F0aW9ucyBhbmQgZ2V0IGEgY29tcGxldGUgc2VyaWVzIG9mIGF3YXJkLXdpbm5pbmcgYnVzaW5lc3MgY2FyZHMgdG8gY2hvb3NlIGZyb20uXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBGaWxtLCBUZWxldmlzaW9uLCBWaWRlbyBQcm9kdWN0aW9uXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiazIga3J1cHBcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBhd2FyZC13aW5uaW5nLCBOZXcgWW9yayBDaXR5IHB1YmxpYyByZWxhdGlvbnMgYW5kIG1hcmtldGluZyBhZ2VuY3kgaGFzIGEgc3VjY2Vzc2Z1bCB0cmFjayByZWNvcmQgaW4gaWduaXRpbmcgYnJhbmRzIGZyb20gc3RhcnQtdXBzLCBuZXcgYXV0aG9ycywgYW5kIGNlbGVicml0aWVzIGJ5IGNvbm5lY3RpbmcgdGhlbSB3aXRoIGN1bHR1cmFsIHRyZW5kcyBhbmQgaW5mbHVlbmNlcnMuIFdoZW4gaXQgY2FtZSB0byByZXByZXNlbnRpbmcgdGhlaXIgYnJhbmQsIEsyIGNhbWUgdG8gdXMuIEJvbGQsIHZpYnJhbnQsIGFuZCBkeW5hbWljLCB0aGlzIHRpbWVsZXNzIGlkZW50aXR5IHN5c3RlbSByZWZsZWN0cyB0aGUgZm91bmRlcidzIGZhdm9yaXRlIGNvbG9yIGFuZCB0aGUgY29tcGFueSdzIGVuZXJnZXRpYyBjdWx0dXJlIGFuZCBlbnZpcm9ubWVudC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFB1YmxpYyBSZWxhdGlvbnMgJiBNYXJrZXRpbmcgZm9yIE1lZGlhXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2h5bVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBZnRlciBzdWNjZXNzZnVsbHkgYnJhbmRpbmcgdGhlaXIgZmlyc3QgZWF0ZXJ5LCB0aGlzIGNsaWVudCByZXR1cm5lZCB0byB1cyB0byByZWFsaXplIHRoZWlyIGRyZWFtIG9mIGFuIHVwc2NhbGUsIFVwcGVyIFdlc3QgU2lkZSBlYXRpbmcgZGVzdGluYXRpb24uXCIsXG4gICAgICAgICAgICBcIlRoZSBjdXN0b20gbGV0dGVyZm9ybSBpcyBhIHdoaW1zaWNhbCBwbGF5IG9uIHRoZWlyIHVuaXF1ZSBzcGVsbGluZyBhbmQgY2FuIHJlYWQgdXBzaWRlIGRvd24uIFRoZSB2aWJyYW50IGNvbG9yIHBhbGV0dGUgd2FzIGRldmVsb3BlZCBpbiBwYXJ0bmVyc2hpcCB3aXRoIHRoZSBpbnRlcmlvciBhcmNoaXRlY3R1cmUgdGVhbSB0byBjcmVhdGUgYSB3YXJtIGFuZCBleGNpdGluZyBhdG1vc3BoZXJlLiBUaGUgY3VzdG9tIGRpZS1jdXQgZWRnZSBvZiB0aGUgaWRlbnRpdHkgc3lzdGVtIG1pbWljcyB0aGUgY3VydmUgb2YgdGhlIHVuaXF1ZSwgc2hvd2Nhc2UgYmFyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUmVzdGF1cmFudCAmIEJhclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImFubiBzdWxsaXZhblwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJBbm4gZHJlYW1lZCBvZiBiZWluZyDigJx0aGUgT3ByYWjigJ0gb2Ygb3JnYW5pemluZy4gV2UgZXN0YWJsaXNoZWQgaGVyIG5hbWUgYXMgdGhlIGJyYW5kIGFuZCBjcmVhdGVkIGEgdGFnbGluZSwgd2hpY2ggcmVmbGVjdGVkIHRoZSBwZWFjZSBvZiBtaW5kIHRoYXQgaGVyIGNsaWVudHMgZ2V0IGZyb20gaGF2aW5nIGFuZCBtYWludGFpbmluZyBhbiBvcmdhbml6ZWQgbGlmZS4gVGhlIHNpbXBsZSBpY29uIHNlcmllcyByZXByZXNlbnRzIGVhY2ggYXJlYSBvZiBleHBlcnRpc2UuIEFzIHRoZSBjb21wYW55J3Mgc2VydmljZXMgaGF2ZSBleHBhbmRlZCBvdmVyIHRoZSB5ZWFycywgdGhlIGlkZW50aXR5IHN5c3RlbSBoYXMgZXZvbHZlZCBhbG9uZyB3aXRoIGl0IGFuZCByZW1haW5zIGFzIGZyZXNoIGFzIGl0IHdhcyBkYXkgb25lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHJvZmVzc2lvbmFsIE9yZ2FuaXppbmdcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJsb2FcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBwcm9mZXNzaW9uYWwgbWFrZS11cCBhcnRpc3QgdGVhbSBjYW1lIHRvIHVzIHRvIGJyYW5kIHRoZWlyIHBhdGVudGVkIOKAnHdhdGVyc2xpZGXigJ0gZXllIHBlbmNpbC4gQ29sb3IgbmFtZXMgbGlrZSDigJxHaXZpbmcgQmFjayBCbGFjayzigJ0gcmVmbGVjdCB0aGUgY29tcGFueSdzIGNvbW1pdG1lbnQgdG8gcHJvdmlkaW5nIG1ha2VvdmVycyBmb3Igd29tZW4gZmFjaW5nIGhlYWx0aCBjaGFsbGVuZ2VzLiBUaGUgcGxheWZ1bCBwYWNrYWdpbmcgZWxldmF0ZXMgYSBzdGFwbGUgcHJvZHVjdCB0byBnaWZ0IHdvcnRoeSBhbmQgZ2VuZXJhdGVzIGF0dGVudGlvbiBpbiBhIHNhdHVyYXRlZCBtYXJrZXQgYnkgZmx5aW5nIGFib3ZlIGl0cyBkaXNwbGF5IGNhc2UuIFRoZSBtb3RpZiBob2xkcyBzcGVjaWFsIG1lYW5pbmcgZm9yIHRoZSBmb3VuZGVyIHdobyBzaGFyZWQgd2l0aCB1cyB0aGF0IHRoZSBidXR0ZXJmbHkgaXMgYSBzaWduIHRoYXQgaGVyIGJlbG92ZWQgbW90aGVyIGlzIHN0aWxsIHdpdGggaGVyLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogQmVhdXR5ICYgQ29zbWV0aWNzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwid2V0XCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgTWFzdGVyIEFyY2hpdGVjdCBhbmQgd29ybGQtcmVub3duZWQgc3BhIGRlc2lnbmVyIHVzZWQgaGlzIHJlcHV0YXRpb24gYW5kIGV4cGVydGlzZSBpbiBoeWRyb3RoZXJhcHkgdG8gbGF1bmNoIGFuIGV4Y2x1c2l2ZSBwcm9kdWN0IGxpbmUgZm9yIGx1eHVyeSBob3RlbHMgYW5kIHJlc29ydHMuIEEgc29vdGhpbmcsIG11dGVkIGNvbG9yIHBhbGV0dGUgd2FzIGRlc2lnbmVkIHRvIHJlZmxlY3QgdGhlIHNjZW50IHByb2ZpbGUgb2YgZWFjaCBzZXJpZXMgb2Ygc2NydWJzIGFuZCBsb3Rpb25zLiBBdXRoZW50aWMgd2F0ZXIgc3BsYXNoIHBob3RvZ3JhcGh5IHNldCB0aGUgdG9uZSB0byBwcm9tb3RlIHRoZSBoZWFsdGggYmVuZWZpdHMgYW5kIGFydCBvZiBiYXRoaW5nLiBUaGUgcGFja2FnZSBkZXNpZ24gZXhwYW5kZWQgdG8gZ2lmdCBhbmQgdHJhdmVsIHNldHMgdGhhdCBpbnZpdGUgZ3Vlc3RzIHRvIHRha2UgdGhlIGx1eHVyeSBleHBlcmllbmNlIGhvbWUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBIZWFsdGggJiBXZWxsbmVzcyBTcGFzXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiZmVycmFnYW1vXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRhc2tlZCB3aXRoIG1hcmtldGluZyBvZmZpY2Ugc3BhY2UgYWJvdmUgdGhpcyBsdXh1cnkgYnJhbmQncyBGaWZ0aCBBdmVudWUgZmxhZ3NoaXAsIHdlIGZhY2VkIHRoZSBjaGFsbGVuZ2Ugb2YgYW4gdW5rbm93biwgc2lkZSBzdHJlZXQgZW50cmFuY2UuIEhhbmRlZCBub3RoaW5nIG1vcmUgdGhhbiBhbiBhcmNoaXRlY3QncyByZW5kZXJpbmcsIHdlIGVsZWdhbnRseSBicmFuZGVkIHRoZSBhZGRyZXNzLCBjYXB0dXJlZCB0aGUgZW5lcmd5IG9mIHRoZSBsb2NhdGlvbiwgYW5kIGdlbmVyYXRlZCBlbm91Z2ggYnV6eiB0byBleHBhbmQgdGhlIHZpZXdpbmcgcGFydHkgdG8gdHdvIGRhdGVzIGJ5IGx1cmluZyBicm9rZXJzIHdpdGggdGhlIHByb21pc2Ugb2YgYSBGZXJyYWdhbW8gdGllLiBUaGUgcmVzdWx0cyB3ZXJlIGEgcXVpY2sgY2xvc2luZyBhbmQgYSBmZWF0dXJlIGFydGljbGUgaW4gQ3JhaW4ncyBOWSBCdXNpbmVzcyBjaXRpbmcgb3VyIGlubm92YXRpb24gYW5kIHN1Y2Nlc3MgaW4gYSBjaGFsbGVuZ2luZyByZWFsIGVzdGF0ZSBtYXJrZXQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJpZXM6IEx1eHVyeSBGYXNoaW9uLCBSZWFsIEVzdGF0ZVwiLFxuICAgICAgICBdLFxuICAgIH0sXG5dO1xuXG5mdW5jdGlvbiBzdHlsZVdvcmtJdGVtcyh3b3JrVGFiczogV29ya1RhYltdKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICBjb25zdCB7IHdvcmtJdGVtIH0gPSB3b3JrVGFiO1xuICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXG4gICAgICAgICAgICB3b3JrSXRlbS50ZXh0U3F1YXJlLFxuICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAyLjIsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiIzMzMzMzM1wiLCBmb250U2l6ZTogMC4wNjUgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0sXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XG4gICAgICAgICk7XG4gICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkod29ya0l0ZW0uaW1hZ2UxLCAxKTtcbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWSh3b3JrSXRlbS5pbWFnZTIsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbGF5b3V0V29ya0l0ZW1zKHdvcmtUYWJzOiBXb3JrVGFiW10pIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICBjb25zdCB7IHdvcmtJdGVtIH0gPSB3b3JrVGFiO1xuICAgICAgICBpdGVtcy5wdXNoKFxuICAgICAgICAgICAgd29ya0l0ZW0udGV4dFNxdWFyZS5tYWpvciwgLy9cbiAgICAgICAgICAgIDAuMiAqIHMsXG4gICAgICAgICAgICB3b3JrSXRlbS5pbWFnZTEsXG4gICAgICAgICAgICAwLjE1ICogcyxcbiAgICAgICAgICAgIHdvcmtJdGVtLmltYWdlMixcbiAgICAgICAgICAgIDAuMjIgKiBzXG4gICAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWChpdGVtcyk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHdvcmtUYWIgb2Ygd29ya1RhYnMpIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh3b3JrVGFiLndvcmtJdGVtLnRleHRTcXVhcmUsIDAuMDEgKiBzLCAwLjAxICogcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRXb3JrUGFnZSgpIHtcbiAgICBjb25zdCB3b3JrVGFiczogV29ya1RhYltdID0gW107XG5cbiAgICAvLyBmdW5jdGlvbiB0YWJBbGlnbm1lbnQodGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIC8vICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRhYkVsZW1lbnRTaXplKHRhYkVsZW1lbnQpO1xuXG4gICAgLy8gICAgIHJldHVybiB7XG4gICAgLy8gICAgICAgICBjZW50ZXJlZDogKCkgPT4gKGlubmVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIsXG4gICAgLy8gICAgICAgICBoYWxmU3F1YXJlOiAoKSA9PiBpbm5lckhlaWdodCAtIHdpZHRoIC8gMixcbiAgICAvLyAgICAgICAgIHNxdWFyZTogKCkgPT4gaW5uZXJIZWlnaHQgLSB3aWR0aCxcbiAgICAvLyAgICAgfTtcbiAgICAvLyB9XG5cbiAgICAoc2Nyb2xsQ29udGFpbmVyLnN0eWxlIGFzIGFueSkuc2Nyb2xsYmFyV2lkdGggPSBcIm5vbmVcIjtcbiAgICBwYWdlQ2xlYW51cHMuYWRkKCgpID0+ICgoc2Nyb2xsQ29udGFpbmVyLnN0eWxlIGFzIGFueSkuc2Nyb2xsYmFyV2lkdGggPSBcIlwiKSk7XG5cbiAgICBsZXQgdGFic1Nob3dpbmcgPSB0cnVlO1xuICAgIGxldCBjdXJyZW50V29ya0l0ZW06IFdvcmtJdGVtIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrQ29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgd29ya0NvbnRlbnQgPSB3b3JrQ29udGVudHNbaV07XG5cbiAgICAgICAgY29uc3QgdGFiRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHRhYkVsZW1lbnQuc3JjID0gYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vdGFiLnBuZ2A7XG4gICAgICAgIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nKHRhYkVsZW1lbnQpO1xuICAgICAgICBhcHBlbmRDaGlsZEZvclBhZ2UoYm9keSwgdGFiRWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgc3ByaW5nID0gbmV3IFNwcmluZygwKTtcbiAgICAgICAgY29uc3Qgc3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICBzcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMzAwKTtcblxuICAgICAgICBsZXQgaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRhYlBvc2l0aW9ucygpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldFNwcmluZ1RhcmdldCh0YXJnZXQ6IG51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICB3b3JrVGFiLnNwcmluZy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcod29ya1RhYi5zcHJpbmcsIHdvcmtUYWIuc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFic1Nob3dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSG92ZXJlZCkgc2V0U3ByaW5nVGFyZ2V0KDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0U3ByaW5nVGFyZ2V0KDIwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSG92ZXJlZCB8fCBjdXJyZW50V29ya0l0ZW0gPT09IHdvcmtUYWIud29ya0l0ZW0pIHNldFNwcmluZ1RhcmdldCgzMDApO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHNldFNwcmluZ1RhcmdldCg0MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBpc0hvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlVGFiUG9zaXRpb25zKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgaXNIb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBhc3luYyBmdW5jdGlvbiBvbkZpcnN0Q2xpY2soKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya0NvbnRlbnQgPSB3b3JrQ29udGVudHNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dFNxdWFyZSA9IGFkZFNjcm9sbFRleHRTcXVhcmUod29ya0NvbnRlbnQubmFtZS50b1VwcGVyQ2FzZSgpLCAuLi53b3JrQ29udGVudC5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UxID0gYWRkU2Nyb2xsSW1hZ2UoYHdvcmsvJHtzcGFjZVRvRmlsZSh3b3JrQ29udGVudC5uYW1lKX0vMS5qcGdgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZTIgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8yLmpwZ2ApO1xuXG4gICAgICAgICAgICAgICAgd29ya1RhYnNbaV0ud29ya0l0ZW0gPSB7IHRleHRTcXVhcmUsIGltYWdlMSwgaW1hZ2UyIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHdvcmtUYWIgb2Ygd29ya1RhYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEltYWdlID0gd29ya1RhYi53b3JrSXRlbS5pbWFnZTI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCA8IGxhc3RJbWFnZS5vZmZzZXRMZWZ0ICsgbGFzdEltYWdlLm9mZnNldFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50V29ya0l0ZW0gPSB3b3JrVGFiLndvcmtJdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiUG9zaXRpb25zKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0V29ya1RhYih3b3JrVGFiOiBXb3JrVGFiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3b3JrVGFiLndvcmtJdGVtLnRleHRTcXVhcmUubWFqb3Iub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG8oeyBsZWZ0OiBzY3JvbGxQb3NpdGlvbiwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykgd29ya1RhYi50YWJFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiBzZWxlY3RXb3JrVGFiKHdvcmtUYWIpO1xuXG4gICAgICAgICAgICB0YWJzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlVGFiUG9zaXRpb25zKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdHlsZVdvcmtJdGVtcyh3b3JrVGFicyk7XG4gICAgICAgICAgICAgICAgbGF5b3V0V29ya0l0ZW1zKHdvcmtUYWJzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxlY3RXb3JrVGFiKHdvcmtUYWJzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYkVsZW1lbnQub25jbGljayA9IG9uRmlyc3RDbGljaztcblxuICAgICAgICBjb25zdCB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgIC8vIHNwcmluZy5wb3NpdGlvbiA9IGlubmVySGVpZ2h0O1xuICAgICAgICAgICAgLy8gYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH0sIDgwICogaSk7XG4gICAgICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lb3V0SGFuZGxlKSk7XG5cbiAgICAgICAgd29ya1RhYnMucHVzaCh7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnLCB3b3JrSXRlbTogdW5kZWZpbmVkIH0pO1xuXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnRvcCA9IHB4KHNwcmluZy5wb3NpdGlvbik7XG4gICAgICAgIH0sIFtzcHJpbmdTaWddKTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwZGF0ZUxheW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gMzAwO1xuICAgICAgICBjb25zdCBlbmQgPSBpbm5lcldpZHRoIC0gMTUwO1xuXG4gICAgICAgIGNvbnN0IGFueVRhYkVsZW1lbnQgPSB3b3JrVGFic1swXS50YWJFbGVtZW50O1xuICAgICAgICBjb25zdCB3aWR0aCA9IChlbmQgLSBzdGFydCkgLyAod29ya1RhYnMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICBjb25zdCBoZWlnaHQgPSB3aWR0aCAqIChhbnlUYWJFbGVtZW50Lm5hdHVyYWxIZWlnaHQgLyBhbnlUYWJFbGVtZW50Lm5hdHVyYWxXaWR0aCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgeyB0YWJFbGVtZW50IH0gPSB3b3JrVGFic1tpXTtcblxuICAgICAgICAgICAgY29uc3QgaGVpZ2h0TG93ZXJMaW1pdCA9IGlubmVySGVpZ2h0ICogMC44O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IGhlaWdodExvd2VyTGltaXQpIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgod2lkdGgpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHRMb3dlckxpbWl0KTtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLndpZHRoID0gcHgoaGVpZ2h0TG93ZXJMaW1pdCAqICh0YWJFbGVtZW50Lm5hdHVyYWxXaWR0aCAvIHRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrVGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgd29ya1RhYnNbaV0udGFiRWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoc3RhcnQgKyBpICogd2lkdGggKiAyKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgYm9keSwgYm9keVNpZywgZmFkZUluQW5pbWF0aW9uLCBpZUJsdWUsIGllR3JlZW4gfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduaW5nV2l0aEdhcHNZLCBpc0xhbmRzY2FwZSwgcHgsIHNldEhlaWdodCwgc2V0V2lkdGgsIHN0eWxlVGV4dCwgVGV4dERldGFpbHMgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IGFwcGVuZENoaWxkRm9yUGFnZSwgYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcgfSBmcm9tIFwiLi9wYWdlXCI7XG5pbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnNjcm9sbENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsQ29udGFpbmVyKTtcbihzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJDb2xvciA9IGAke2llR3JlZW59ICR7aWVCbHVlfTU1YDtcblxuc2Nyb2xsQ29udGFpbmVyLm9ud2hlZWwgPSAoZSkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpICYmICFlLnNoaWZ0S2V5KSBzY3JvbGxDb250YWluZXIuc2Nyb2xsQnkoeyBsZWZ0OiBlLmRlbHRhWSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRIZWFkZXJCYXJIZWlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgcmV0dXJuIChpbm5lckhlaWdodCAtIGdldFNjcm9sbEhlaWdodCgpKSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlubmVySGVpZ2h0ICogMC4xO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxQYWRkaW5nKCkge1xuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNjcm9sbFBhZGRpbmcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsUGFkZGluZy5zdHlsZS53aWR0aCA9IHB4KDEpOyAvLyBhbnkgbm9uemVybyB0aGlja25lc3MgaXMgZW5vdWdoIHRvIGV4dGVuZCBzY3JvbGxDb250YWluZXJcbiAgICBzY3JvbGxQYWRkaW5nLnN0eWxlLmhlaWdodCA9IHB4KDEpO1xuICAgIGFwcGVuZENoaWxkRm9yUGFnZShzY3JvbGxDb250YWluZXIsIHNjcm9sbFBhZGRpbmcpO1xuICAgIHJldHVybiBzY3JvbGxQYWRkaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW1hZ2Uoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsSW1hZ2Uuc3JjID0gc3JjO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xuICAgIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nKHNjcm9sbEltYWdlKTtcbiAgICBhcHBlbmRDaGlsZEZvclBhZ2Uoc2Nyb2xsQ29udGFpbmVyLCBzY3JvbGxJbWFnZSk7XG4gICAgcmV0dXJuIHNjcm9sbEltYWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc2Nyb2xsVGV4dC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XG4gICAgYXBwZW5kQ2hpbGRGb3JQYWdlKHNjcm9sbENvbnRhaW5lciwgc2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0U3F1YXJlKG1ham9yVGV4dDogc3RyaW5nLCAuLi5taW5vclRleHRzOiBzdHJpbmdbXSk6IFRleHRTcXVhcmUge1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9ycyA9IG1pbm9yVGV4dHMubWFwKGFkZFNjcm9sbFRleHQpO1xuICAgIHJldHVybiB7IG1ham9yLCBtaW5vcnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JUZXh0RGV0YWlsczogVGV4dERldGFpbHMsIG1pbm9yVGV4dERldGFpbHM6IFRleHREZXRhaWxzKSB7XG4gICAgc3R5bGVUZXh0KG1ham9yLCBtYWpvclRleHREZXRhaWxzKTtcbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykgc3R5bGVUZXh0KG1pbm9yLCBtaW5vclRleHREZXRhaWxzKTtcbn1cblxuZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICBjb25zdCB1bmRlclNjcm9sbENvbnRhaW5lciA9IChpbm5lckhlaWdodCAtIHNjcm9sbEhlaWdodCkgLyAyO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICsgdW5kZXJTY3JvbGxDb250YWluZXIpOyAvLyBwbGFjZSBzY3JvbGwgYmFyIGF0IGJvdHRvbSBvZiBwYWdlXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KGlubmVyV2lkdGggLSB4KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KChpbm5lckhlaWdodCAtIHNjcm9sbEhlaWdodCkgLyAyKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCh4KTtcblxuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJzY3JvbGxcIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gZ2V0U2Nyb2xsV2lkdGgoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyQmFySGVpZ2h0ID0gZ2V0SGVhZGVyQmFySGVpZ2h0KCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KHNjcm9sbFdpZHRoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0IC0gaGVhZGVyQmFySGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHNjcm9sbFdpZHRoKSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoaGVhZGVyQmFySGVpZ2h0KTtcblxuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJoaWRkZW5cIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0ID0gMDtcbiAgICB9XG59LCBbYm9keVNpZ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIC8vIHJldHVybiBpbm5lckhlaWdodCAqIDAuNztcbiAgICByZXR1cm4gMS4wMiAqIGlubmVySGVpZ2h0IC0gMC4wMDA0ODUgKiBpbm5lckhlaWdodCAqIGlubmVySGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGgoKSB7XG4gICAgY29uc3QgU0NST0xMX1dJRFRIX1BST1BPUlRJT04gPSAxO1xuICAgIHJldHVybiBpbm5lcldpZHRoICogU0NST0xMX1dJRFRIX1BST1BPUlRJT047XG59XG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IGFsaWduaW5nV2l0aEdhcHNZKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlcldpdGhpblNjcm9sbFkoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcyAqIHNjYWxlO1xuICAgIHNldEhlaWdodChlbGVtZW50LCBoZWlnaHQpO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoKHMgLSBoZWlnaHQpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJXaXRoaW5TY3JvbGxYKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbFdpZHRoKCk7XG4gICAgY29uc3Qgd2lkdGggPSBzICogc2NhbGU7XG4gICAgc2V0V2lkdGgoZWxlbWVudCwgd2lkdGgpO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KChzIC0gd2lkdGgpIC8gMik7XG59XG4iLCJleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgIHN1YnNjcmliZXJzID0gbmV3IFNldDwoKSA9PiB2b2lkPigpO1xyXG5cclxuICAgIHN1YnNjcmliZSA9IChzdWJzY3JpYmVyOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5hZGQoc3Vic2NyaWJlcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHMoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVuc3Vic2NyaWJlID0gKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmRlbGV0ZShzdWJzY3JpYmVyKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3QoZnVuYzogKCkgPT4gdm9pZCwgb2JzZXJ2ZWRTaWduYWxzOiBTaWduYWxbXSkge1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG8pID0+IG8uc3Vic2NyaWJlKGZ1bmMpKTtcclxuICAgIGZ1bmMoKTtcclxufVxyXG4iLCJpbXBvcnQgeyBTaWduYWwgfSBmcm9tIFwiLi9zaWduYWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpbmcge1xyXG4gICAgcG9zaXRpb246IG51bWJlcjtcclxuICAgIHRhcmdldDogbnVtYmVyO1xyXG4gICAgdmVsb2NpdHkgPSAwO1xyXG4gICAgZGFtcGluZyA9IDA7XHJcbiAgICBzdGlmZm5lc3MgPSAwO1xyXG4gICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBvblJlc3QgPSAoKSA9PiB7fTtcclxuICAgIG9uVW5yZXN0ID0gKCkgPT4ge307XHJcblxyXG4gICAgLy8gbXgnJyAtIGJ4JyA9IGt4XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRpY2soZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGFjY2VsZXJhdGlvbiA9IHRoaXMuc3RpZmZuZXNzICogKHRoaXMudGFyZ2V0IC0gdGhpcy5wb3NpdGlvbikgLSB0aGlzLmRhbXBpbmcgKiB0aGlzLnZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgKz0gYWNjZWxlcmF0aW9uICogZHQ7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiArPSB0aGlzLnZlbG9jaXR5ICogZHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RpZmZuZXNzQ3JpdGljYWwoc3RpZmZuZXNzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnN0aWZmbmVzcyA9IHN0aWZmbmVzcztcclxuICAgICAgICB0aGlzLmRhbXBpbmcgPSBNYXRoLnNxcnQoNCAqIHN0aWZmbmVzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSA9IDAuMDE7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVNwcmluZyhzcHJpbmc6IFNwcmluZywgc2lnbmFsOiBTaWduYWwpIHtcclxuICAgIGlmIChzcHJpbmcuaXNBbmltYXRpbmcpIHJldHVybjtcclxuICAgIFxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgIHNwcmluZy5vblVucmVzdCgpXHJcblxyXG4gICAgbGV0IGxhc3RNaWxsaXMgPSAwO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZpcnN0RnJhbWUpO1xyXG4gICAgZnVuY3Rpb24gZmlyc3RGcmFtZShtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcbiAgICAgICAgdGlja1NwcmluZyhtaWxsaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRpY2tTcHJpbmcobWlsbGlzOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzdGVwID0gbWlsbGlzIC0gbGFzdE1pbGxpcztcclxuICAgICAgICBsYXN0TWlsbGlzID0gbWlsbGlzO1xyXG5cclxuICAgICAgICBzcHJpbmcudGljayhzdGVwIC8gMTAwMCk7XHJcbiAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ByaW5nLnRhcmdldCAtIHNwcmluZy5wb3NpdGlvbikgPCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgJiYgTWF0aC5hYnMoc3ByaW5nLnZlbG9jaXR5KSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSkge1xyXG4gICAgICAgICAgICBzcHJpbmcucG9zaXRpb24gPSBzcHJpbmcudGFyZ2V0O1xyXG4gICAgICAgICAgICBzcHJpbmcudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICBzcHJpbmcuaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3ByaW5nLm9uUmVzdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHNsZWVwID0gKGRlbGF5OiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZVRvRmlsZShzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKFwiIFwiLCBcIi1cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50U1ZHPEsgZXh0ZW5kcyBrZXlvZiBTVkdFbGVtZW50VGFnTmFtZU1hcD4ocXVhbGlmaWVkTmFtZTogSykge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBxdWFsaWZpZWROYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVybGFjZWQ8VCwgV2l0aGluPihpdGVtczogVFtdLCB3aXRoaW46IFdpdGhpbikge1xuICAgIGNvbnN0IGl0ZW1zSW50ZXJsYWNlZCA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICBpdGVtc0ludGVybGFjZWQucHVzaChpdGVtKTtcbiAgICAgICAgaXRlbXNJbnRlcmxhY2VkLnB1c2god2l0aGluKTtcbiAgICB9XG4gICAgaXRlbXNJbnRlcmxhY2VkLnBvcCgpO1xuICAgIHJldHVybiBpdGVtc0ludGVybGFjZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBSYW5nZShuOiBudW1iZXIsIHN0YXJ0MTogbnVtYmVyLCBzdG9wMTogbnVtYmVyLCBzdGFydDI6IG51bWJlciwgc3RvcDI6IG51bWJlcikge1xuICAgIHJldHVybiAoKG4gLSBzdGFydDEpIC8gKHN0b3AxIC0gc3RhcnQxKSkgKiAoc3RvcDIgLSBzdGFydDIpICsgc3RhcnQyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JPbkhvdmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb2xvcjogc3RyaW5nLCBob3ZlckNvbG9yOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gY29sb3I7XG4gICAgZWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IChlbGVtZW50LnN0eWxlLmNvbG9yID0gaG92ZXJDb2xvcik7XG4gICAgZWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiAoZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yKTtcbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcImNvbG9yIDAuMnMgZWFzZS1vdXRcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29sb3JPbkhvdmVyLCBjcmVhdGVFbGVtZW50U1ZHLCBzZXRBdHRyaWJ1dGVzLCBzbGVlcCB9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHsgYm9keSwgYm9keVNpZywgZmFkZUluQW5pbWF0aW9uLCBncmF5LCBpZUdyZWVuIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IGNlbnRlckVsZW1lbnQsIGlzTGFuZHNjYXBlLCBweCwgc3R5bGVUZXh0LCB5Q2VudGVyV2l0aEdhcCB9IGZyb20gXCIuL2xheW91dFwiO1xyXG5pbXBvcnQgeyBjbGVhbkxhc3RQYWdlIH0gZnJvbSBcIi4vcGFnZVwiO1xyXG5pbXBvcnQgeyBhZGRDb25uZWN0UGFnZSB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcclxuaW1wb3J0IHsgYWRkRXZvbHV0aW9uUGFnZSB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xyXG5pbXBvcnQgeyBhZGRJbnNwaXJhdGlvblBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xyXG5pbXBvcnQgeyBhZGRWaWV3UGFnZSB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcclxuaW1wb3J0IHsgYWRkV29ya1BhZ2UgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XHJcbmltcG9ydCB7IGdldFNjcm9sbEhlaWdodCwgZ2V0SGVhZGVyQmFySGVpZ2h0LCBzY3JvbGxDb250YWluZXIgfSBmcm9tIFwiLi9zY3JvbGxcIjtcclxuaW1wb3J0IHsgU2lnbmFsLCBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcclxuaW1wb3J0IHsgU3ByaW5nLCBhbmltYXRlU3ByaW5nIH0gZnJvbSBcIi4vc3ByaW5nXCI7XHJcblxyXG4vLyBUT0RPXHJcbi8vIG1vYmlsZSBsYXlvdXRzXHJcbi8vIGJsb2cgcGFnZXNcclxuLy8gdGltZWxpbmVcclxuLy8gbmF2IGl0ZW0gc3R5bGluZ1xyXG4vLyB3b3JrIHBhZ2VcclxuLy8gaW1hZ2UgY2xpY2tcclxuLy8gaGl0IGVuZCBvZiBzY3JvbGwsIG5leHQgcGFnZVxyXG4vLyBzaW1wbGVyIHJlY3RhbmdsZSBzY3JvbGwgYmFyXHJcbi8vIFwidmlld1wiIHN0YXJ0IGFuaW1hdGlvblxyXG5cclxuY29uc3QgcGFnZXMgPSB7XHJcbiAgICB2aWV3OiBhZGRWaWV3UGFnZSxcclxuICAgIHdvcms6IGFkZFdvcmtQYWdlLFxyXG4gICAgaW5zcGlyYXRpb246IGFkZEluc3BpcmF0aW9uUGFnZSxcclxuICAgIGV2b2x1dGlvbjogYWRkRXZvbHV0aW9uUGFnZSxcclxuICAgIGNvbm5lY3Q6IGFkZENvbm5lY3RQYWdlLFxyXG59O1xyXG5cclxuY29uc3QgbmF2RWxlbWVudEZyb21TdHJpbmc6IFJlY29yZDxzdHJpbmcsIEhUTUxFbGVtZW50PiA9IHt9O1xyXG5cclxuY29uc3QgZWRnZUFsaWduWCA9ICgpID0+IGlubmVySGVpZ2h0ICogMC4xO1xyXG5jb25zdCBoZWFkZXJJY29uU2l6ZSA9ICgpID0+IGdldEhlYWRlckJhckhlaWdodCgpICogMC40O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gYW5pbWF0ZUludHJvKCkge1xyXG4gICAgLy8gWlpaWiBjbGVhbiB0aGlzIHVwXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwibG9nby1mdWxsLnN2Z1wiKTtcclxuICAgIGNvbnN0IHN2Z0NvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcblxyXG4gICAgY29uc3Qgc3ZnID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdmdDb250ZW50LCBcImltYWdlL3N2Zyt4bWxcIikuZG9jdW1lbnRFbGVtZW50IGFzIHVua25vd24gYXMgU1ZHU1ZHRWxlbWVudDtcclxuICAgIHN2Zy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIHN2Zy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgc3ZnLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0ICogMC40KTtcclxuXHJcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcclxuXHJcbiAgICBjb25zdCBzdmdTcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xyXG4gICAgc3ZnU3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDgwKTtcclxuICAgIGNvbnN0IHN2Z1NwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuXHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHN2Zy5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIHN2Z1NwcmluZy5wb3NpdGlvbjtcclxuICAgICAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoKDEuMyAtIHN2Z1NwcmluZy5wb3NpdGlvbikgKiBpbm5lckhlaWdodCk7XHJcbiAgICAgICAgc3ZnLnN0eWxlLnRvcCA9IHB4KChpbm5lckhlaWdodCAtIHN2Zy5zY3JvbGxIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgc3ZnLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHN2Zy5zY3JvbGxXaWR0aCkgLyAyKTtcclxuICAgIH0sIFtzdmdTcHJpbmdTaWddKTtcclxuXHJcbiAgICBzdmdTcHJpbmcudGFyZ2V0ID0gMTtcclxuICAgIGFuaW1hdGVTcHJpbmcoc3ZnU3ByaW5nLCBzdmdTcHJpbmdTaWcpO1xyXG5cclxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG4gICAgY29uc3QgZCA9IFwiZGVzaWduXCI7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BhY2l0eU91dChlbGVtZW50OiBTVkdFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyU3ByaW5nID0gbmV3IFNwcmluZygxKTtcclxuICAgICAgICBsZXR0ZXJTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTUwKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJTcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiXCIgKyBsZXR0ZXJTcHJpbmcucG9zaXRpb247XHJcbiAgICAgICAgfSwgW2xldHRlclNwcmluZ1NpZ10pO1xyXG5cclxuICAgICAgICBsZXR0ZXJTcHJpbmcudGFyZ2V0ID0gMDtcclxuICAgICAgICBhbmltYXRlU3ByaW5nKGxldHRlclNwcmluZywgbGV0dGVyU3ByaW5nU2lnKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IHN2Zy5nZXRFbGVtZW50QnlJZChcImRlc2lnbi1cIiArIGRbaV0pIGFzIFNWR0VsZW1lbnQ7XHJcbiAgICAgICAgb3BhY2l0eU91dChkZXNpZ25MZXR0ZXIpO1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKDEyMCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsID0gW1wiYmlnLWlcIiwgXCJkb3QtMVwiLCBcImJpZy1lXCIsIFwiZG90LTJcIl07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBkZXNpZ25MZXR0ZXIgPSBzdmcuZ2V0RWxlbWVudEJ5SWQobFtpXSkgYXMgU1ZHRWxlbWVudDtcclxuICAgICAgICBvcGFjaXR5T3V0KGRlc2lnbkxldHRlcik7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTIwKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG5cclxuICAgIHN2Z1NwcmluZy50YXJnZXQgPSAwO1xyXG4gICAgYW5pbWF0ZVNwcmluZyhzdmdTcHJpbmcsIHN2Z1NwcmluZ1NpZyk7XHJcblxyXG4gICAgYXdhaXQgc2xlZXAoNTAwKTtcclxuICAgIGJvZHkucmVtb3ZlQ2hpbGQoc3ZnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTmF2SXRlbXMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IFtwYWdlTmFtZSwgYWRkUGFnZV0gb2YgT2JqZWN0LmVudHJpZXMocGFnZXMpKSB7XHJcbiAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbmF2RWxlbWVudC5pbm5lckhUTUwgPSBwYWdlTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICBuYXZFbGVtZW50LnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgICAgIG5hdkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5jb2xvciA9IGdyYXk7XHJcbiAgICAgICAgbmF2RWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcclxuICAgICAgICBuYXZFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cclxuICAgICAgICBuYXZFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFuTGFzdFBhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmF2RWxlbWVudCBvZiBPYmplY3QudmFsdWVzKG5hdkVsZW1lbnRzKSkgbmF2RWxlbWVudC5zdHlsZS5jb2xvciA9IGdyYXk7XHJcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIjtcclxuXHJcbiAgICAgICAgICAgIGFkZFBhZ2UoKTtcclxuICAgICAgICAgICAgLy8gaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIFwiLyMvXCIgKyBwYWdlTmFtZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChuYXZFbGVtZW50KTtcclxuXHJcbiAgICAgICAgbmF2RWxlbWVudEZyb21TdHJpbmdbcGFnZU5hbWVdID0gbmF2RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuYXZFbGVtZW50cyA9IE9iamVjdC52YWx1ZXMobmF2RWxlbWVudEZyb21TdHJpbmcpO1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBhbGlnbk5hdkl0ZW0obmF2SXRlbTogSFRNTEVsZW1lbnQsIG51ZGdlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUubGVmdCA9IHB4KGVkZ2VBbGlnblgoKSk7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnN0eWxlLnRvcCA9IHB4KGlubmVySGVpZ2h0IC8gMiArIG51ZGdlICogNTAgLSBuYXZJdGVtLmNsaWVudEhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdkVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJdGVtID0gbmF2RWxlbWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBhbGlnbk5hdkl0ZW0obmF2SXRlbSwgaSAtIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc3R5bGUuZm9udFNpemUgPSBweChzICogMC4wMjUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ29Bd2F5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgtMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gcHgoLTEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hdkVsZW1lbnRzLmxlbmd0aDsgaSsrKSBnb0F3YXkobmF2RWxlbWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEhlYWRlckJhcigpIHtcclxuICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBoZWFkZXJCYXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBoZWFkZXJCYXIuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuXHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGhlYWRlckJhcik7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBoZWFkZXJCYXIuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoKTtcclxuICAgICAgICBoZWFkZXJCYXIuc3R5bGUuaGVpZ2h0ID0gcHgoZ2V0SGVhZGVyQmFySGVpZ2h0KCkpO1xyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTWVudUJ1dHRvbigpIHtcclxuICAgIGNvbnN0IG1lbnVCdXR0b24gPSBjcmVhdGVFbGVtZW50U1ZHKFwic3ZnXCIpO1xyXG4gICAgbWVudUJ1dHRvbi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIG1lbnVCdXR0b24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICBtZW51QnV0dG9uLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4gICAgbWVudUJ1dHRvbi5zdHlsZS5hbmltYXRpb24gPSBmYWRlSW5BbmltYXRpb24oKTtcclxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gNDtcclxuICAgIGNvbnN0IHBhZCA9IDQ7XHJcbiAgICBjb25zdCBzeiA9IDYwO1xyXG4gICAgbWVudUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIGAkey1wYWR9ICR7LXBhZH0gJHtzeiArIDIgKiBwYWR9ICR7c3ogKyAyICogcGFkfWApO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1lbnVMaW5lKHk6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGxpbmUgPSBjcmVhdGVFbGVtZW50U1ZHKFwibGluZVwiKTtcclxuICAgICAgICBzZXRBdHRyaWJ1dGVzKGxpbmUsIHsgXCJzdHJva2Utd2lkdGhcIjogc3Ryb2tlV2lkdGggfSk7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5hcHBlbmRDaGlsZChsaW5lKTtcclxuICAgICAgICByZXR1cm4gbGluZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmUxID0gbWVudUxpbmUoc3Ryb2tlV2lkdGggLyAyICsgMSk7XHJcbiAgICBjb25zdCBsaW5lMiA9IG1lbnVMaW5lKHN6IC8gMik7XHJcbiAgICBjb25zdCBsaW5lMyA9IG1lbnVMaW5lKHN6IC0gc3Ryb2tlV2lkdGggLyAyIC0gMSk7XHJcblxyXG4gICAgY29uc3QgbWVudVNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICBtZW51U3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDEyMCk7XHJcbiAgICBjb25zdCBtZW51U3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBzID0gbWVudVNwcmluZy5wb3NpdGlvbiAqIHN6O1xyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMobGluZTEsIHsgeDE6IDAsIHkxOiAwLCB4Mjogc3osIHkyOiBzIH0pO1xyXG4gICAgICAgIGxpbmUyLnN0eWxlLm9wYWNpdHkgPSAoc3ogLSBzKSAvIHN6ICsgXCJcIjtcclxuICAgICAgICBzZXRBdHRyaWJ1dGVzKGxpbmUyLCB7IHgxOiAwLCB5MTogc3ogLyAyLCB4Mjogc3osIHkyOiBzeiAvIDIgfSk7XHJcbiAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lMywgeyB4MTogMCwgeTE6IHN6LCB4Mjogc3osIHkyOiBzeiAtIHMgfSk7XHJcbiAgICB9LCBbbWVudVNwcmluZ1NpZ10pO1xyXG5cclxuICAgIGxldCBpc09wZW5pbmdNZW51ID0gZmFsc2U7XHJcblxyXG4gICAgbWVudUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc09wZW5pbmdNZW51KSBiZWdpbkNsb3NlTWVudSgpO1xyXG4gICAgICAgIGVsc2UgYmVnaW5PcGVuTWVudSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtZW51U3ByaW5nLm9uVW5yZXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChtZW51U3ByaW5nLnBvc2l0aW9uID09PSAwKSBvcGVuTWVudSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY2xvc2VNZW51OiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xyXG4gICAgbWVudVNwcmluZy5vblJlc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lbnVTcHJpbmcucG9zaXRpb24gPT09IDAgJiYgY2xvc2VNZW51KSBjbG9zZU1lbnUoKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gYmVnaW5PcGVuTWVudSgpIHtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLnN0cm9rZSA9IGdyYXk7XHJcbiAgICAgICAgbWVudVNwcmluZy50YXJnZXQgPSAxO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcobWVudVNwcmluZywgbWVudVNwcmluZ1NpZyk7XHJcbiAgICAgICAgaXNPcGVuaW5nTWVudSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYmVnaW5DbG9zZU1lbnUoKSB7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5zdHJva2UgPSBcIiNiYmJiYmJcIjtcclxuICAgICAgICBtZW51U3ByaW5nLnRhcmdldCA9IDA7XHJcbiAgICAgICAgYW5pbWF0ZVNwcmluZyhtZW51U3ByaW5nLCBtZW51U3ByaW5nU2lnKTtcclxuICAgICAgICBpc09wZW5pbmdNZW51ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYmVnaW5DbG9zZU1lbnUoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTWVudSgpIHtcclxuICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBtZW51LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICAgIG1lbnUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwMDAwZWVcIjtcclxuICAgICAgICBtZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKG1lbnUpO1xyXG5cclxuICAgICAgICBjb25zdCBtZW51UGFnZU5hdnM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IFtwYWdlTmFtZSwgbmF2RWxlbWVudF0gb2YgT2JqZWN0LmVudHJpZXMobmF2RWxlbWVudEZyb21TdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lbnVQYWdlTmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5pbm5lclRleHQgPSBwYWdlTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XHJcbiAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xyXG4gICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgICAgICAgY29sb3JPbkhvdmVyKG1lbnVQYWdlTmF2LCBncmF5LCBcIndoaXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgbWVudVBhZ2VOYXYub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJlZ2luQ2xvc2VNZW51KCk7XHJcbiAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKG1lbnVQYWdlTmF2KTtcclxuICAgICAgICAgICAgbWVudVBhZ2VOYXZzLnB1c2gobWVudVBhZ2VOYXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZU1lbnVPcGFjaXR5KCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgW21lbnUsIC4uLm1lbnVQYWdlTmF2c10pIGUuc3R5bGUub3BhY2l0eSA9IG1lbnVTcHJpbmcucG9zaXRpb24gKyBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWZmZWN0KGFuaW1hdGVNZW51T3BhY2l0eSwgW21lbnVTcHJpbmdTaWddKTtcclxuXHJcbiAgICAgICAgY29uc3QgbGF5b3V0TWVudSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5zdHlsZS53aWR0aCA9IHB4KGlubmVyV2lkdGgpO1xyXG4gICAgICAgICAgICBtZW51LnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVudVBhZ2VOYXYgb2YgbWVudVBhZ2VOYXZzKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250U2l6ZSA9IHB4KGlubmVySGVpZ2h0ICogMC4wNSk7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJFbGVtZW50KG1lbnVQYWdlTmF2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB5Q2VudGVyV2l0aEdhcChtZW51UGFnZU5hdnMsIGlubmVySGVpZ2h0ICogMC4wOCwgaW5uZXJIZWlnaHQgLyAyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBlZmZlY3QobGF5b3V0TWVudSwgW2JvZHlTaWddKTtcclxuXHJcbiAgICAgICAgY2xvc2VNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBib2R5U2lnLnVuc3Vic2NyaWJlKGxheW91dE1lbnUpO1xyXG4gICAgICAgICAgICBtZW51U3ByaW5nU2lnLnVuc3Vic2NyaWJlKGFuaW1hdGVNZW51T3BhY2l0eSk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVudVBhZ2VOYXYgb2YgbWVudVBhZ2VOYXZzKSBib2R5LnJlbW92ZUNoaWxkKG1lbnVQYWdlTmF2KTtcclxuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChtZW51KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVudUJ1dHRvbik7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBzaXplID0gaGVhZGVySWNvblNpemUoKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLndpZHRoID0gcHgoc2l6ZSk7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5oZWlnaHQgPSBweChzaXplKTtcclxuXHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAtIHNpemUgLSBlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUudG9wID0gcHgoKGdldEhlYWRlckJhckhlaWdodCgpIC0gc2l6ZSkgLyAyKTtcclxuXHJcbiAgICAgICAgY2VudGVyRWxlbWVudDtcclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExvZ28oKSB7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIGxvZ28uc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XHJcbiAgICBsb2dvLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgbG9nby5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGxvZ28uc3JjID0gXCJsb2dvLnN2Z1wiO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChsb2dvKTtcclxuXHJcbiAgICBsb2dvLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbmF2RWxlbWVudEZyb21TdHJpbmcudmlldy5jbGljaygpO1xyXG5cclxuICAgICAgICBjb25zdCBwdWxzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUuYmFja2dyb3VuZCA9IGllR3JlZW47XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQocHVsc2UpO1xyXG5cclxuICAgICAgICBjb25zdCBwdWxzZVNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICAgICAgcHVsc2VTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoNDApO1xyXG4gICAgICAgIGNvbnN0IHB1bHNlU3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG5cclxuICAgICAgICBwdWxzZVNwcmluZy50YXJnZXQgPSAxO1xyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcocHVsc2VTcHJpbmcsIHB1bHNlU3ByaW5nU2lnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYW5pbWF0ZVB1bHNlKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gcHVsc2VTcHJpbmcucG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IG91dCA9IDMwO1xyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS5sZWZ0ID0gcHgobG9nby5vZmZzZXRMZWZ0IC0gcyAqIG91dCk7XHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLnRvcCA9IHB4KGxvZ28ub2Zmc2V0VG9wIC0gcyAqIG91dCk7XHJcblxyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS53aWR0aCA9IHB4KGxvZ28ub2Zmc2V0V2lkdGggKyBzICogMiAqIG91dCk7XHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLmhlaWdodCA9IHB4KGxvZ28ub2Zmc2V0SGVpZ2h0ICsgcyAqIDIgKiBvdXQpO1xyXG5cclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUub3BhY2l0eSA9IDEgLSBzICsgXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1bHNlU3ByaW5nLm9uUmVzdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgcHVsc2VTcHJpbmdTaWcudW5zdWJzY3JpYmUoYW5pbWF0ZVB1bHNlKTtcclxuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChwdWxzZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWZmZWN0KGFuaW1hdGVQdWxzZSwgW3B1bHNlU3ByaW5nU2lnXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IGhlYWRlckljb25TaXplKCk7XHJcbiAgICAgICAgbG9nby5zdHlsZS53aWR0aCA9IHB4KHNpemUpO1xyXG4gICAgICAgIGxvZ28uc3R5bGUuaGVpZ2h0ID0gcHgoc2l6ZSk7XHJcblxyXG4gICAgICAgIGxvZ28uc3R5bGUubGVmdCA9IHB4KGVkZ2VBbGlnblgoKSk7XHJcbiAgICAgICAgbG9nby5zdHlsZS50b3AgPSBweCgoZ2V0SGVhZGVyQmFySGVpZ2h0KCkgLSBzaXplKSAvIDIpO1xyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ29weXJpZ2h0KCkge1xyXG4gICAgY29uc3QgY29weXJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBjb3B5cmlnaHQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBjb3B5cmlnaHQuaW5uZXJUZXh0ID0gXCLCqTIwMjUgaS5lLiBkZXNpZ24sIGluYy5cIjtcclxuXHJcbiAgICBzdHlsZVRleHQoY29weXJpZ2h0LCB7IGxldHRlclNwYWNpbmc6IDAuMywgZm9udFdlaWdodDogNTAwLCBjb2xvcjogZ3JheSwgZm9udFNpemU6IDEwLCBsaW5lSGVpZ2h0OiAyMCB9KTtcclxuXHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjb3B5cmlnaHQuc3R5bGUubGVmdCA9IHB4KGVkZ2VBbGlnblgoKSk7XHJcbiAgICAgICAgICAgIGNvcHlyaWdodC5zdHlsZS50b3AgPSBweChpbm5lckhlaWdodCAqIDAuOSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLmxlZnQgPSBweChlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgICAgICBjb3B5cmlnaHQuc3R5bGUudG9wID0gcHgoc2Nyb2xsQ29udGFpbmVyLm9mZnNldEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICBjb25zdCBwYWdlTmFtZSA9IGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKFwiIy9cIi5sZW5ndGgpO1xyXG4gICAgLy8gaWYgKHBhZ2VOYW1lID09PSBcIlwiKSBhd2FpdCBhbmltYXRlSW50cm8oKTtcclxuICAgIGFkZE5hdkl0ZW1zKCk7XHJcbiAgICBhZGRIZWFkZXJCYXIoKTtcclxuICAgIGFkZE1lbnVCdXR0b24oKTtcclxuICAgIGFkZExvZ28oKTtcclxuICAgIGFkZENvcHlyaWdodCgpO1xyXG5cclxuICAgIGNvbnN0IHBhZ2VOYXZFbGVtZW50ID0gbmF2RWxlbWVudEZyb21TdHJpbmdbcGFnZU5hbWVdID8/IG5hdkVsZW1lbnRGcm9tU3RyaW5nLnZpZXc7XHJcbiAgICBwYWdlTmF2RWxlbWVudC5jbGljaygpO1xyXG59XHJcbnNldHVwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==