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
window.onresize = bodySig.update;
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
/* harmony export */   centerElementX: () => (/* binding */ centerElementX),
/* harmony export */   centerElementY: () => (/* binding */ centerElementY),
/* harmony export */   centerWithGapY: () => (/* binding */ centerWithGapY),
/* harmony export */   isLandscape: () => (/* binding */ isLandscape),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   setHeight: () => (/* binding */ setHeight),
/* harmony export */   setWidth: () => (/* binding */ setWidth),
/* harmony export */   styleText: () => (/* binding */ styleText)
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
function centerWithGapY(elements, gap, center) {
    const elementsWithGaps = (0,_util__WEBPACK_IMPORTED_MODULE_0__.interlaced)(elements, gap);
    const [elementAlignments, totalHeight] = aligningWithGapsY(elementsWithGaps);
    for (const { element, offset } of elementAlignments) {
        element.style.top = px(offset + center - totalHeight / 2);
    }
}
function centerElementX(element) {
    element.style.left = px(innerWidth / 2 - element.offsetWidth / 2);
}
function centerElementY(element) {
    element.style.top = px(innerHeight / 2 - element.offsetHeight / 2);
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

/***/ "./src/modal.ts":
/*!**********************!*\
  !*** ./src/modal.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spring */ "./src/spring.ts");




class Modal {
    constructor(color, onOpen, onAnimate, onClose) {
        this.onAnimate = onAnimate;
        this.isOpening = false;
        this.onLayout = () => { };
        this.beginOpen = () => {
            const escapeKeyListener = (e) => {
                if (e.key === "Escape") {
                    this.beginClose();
                    document.removeEventListener("keydown", escapeKeyListener);
                }
            };
            document.addEventListener("keydown", escapeKeyListener);
            this.spring.target = 1;
            (0,_spring__WEBPACK_IMPORTED_MODULE_3__.animateSpring)(this.spring, this.springSig);
            this.isOpening = true;
        };
        this.beginClose = () => {
            this.spring.target = 0;
            (0,_spring__WEBPACK_IMPORTED_MODULE_3__.animateSpring)(this.spring, this.springSig);
            this.isOpening = false;
        };
        this.spring = new _spring__WEBPACK_IMPORTED_MODULE_3__.Spring(0);
        this.spring.setStiffnessCritical(120);
        this.springSig = new _signal__WEBPACK_IMPORTED_MODULE_2__.Signal();
        this.spring.onUnrest = () => {
            if (this.spring.position === 0)
                openModal();
        };
        let closeModal;
        this.spring.onRest = () => {
            if (this.spring.position === 0 && closeModal)
                closeModal();
        };
        const openModal = () => {
            const backdrop = document.createElement("div");
            backdrop.style.position = "fixed";
            backdrop.style.backgroundColor = color;
            _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(backdrop);
            onOpen(backdrop);
            const animate = () => {
                const time = this.spring.position;
                backdrop.style.opacity = time + "";
                backdrop.style.pointerEvents = time > 0.9 ? "all" : "none";
                this.onAnimate(time);
            };
            (0,_signal__WEBPACK_IMPORTED_MODULE_2__.effect)(animate, [this.springSig]);
            const layoutModal = () => {
                backdrop.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth);
                backdrop.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight);
                this.onLayout();
            };
            (0,_signal__WEBPACK_IMPORTED_MODULE_2__.effect)(layoutModal, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
            closeModal = () => {
                _constants__WEBPACK_IMPORTED_MODULE_0__.bodySig.unsubscribe(layoutModal);
                this.springSig.unsubscribe(animate);
                _constants__WEBPACK_IMPORTED_MODULE_0__.body.removeChild(backdrop);
                onClose();
            };
        };
        this.onAnimate(0);
    }
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
function createTimelineLine() {
    const timelineLine = document.createElement("div");
    timelineLine.style.position = "absolute";
    timelineLine.style.backgroundColor = _constants__WEBPACK_IMPORTED_MODULE_0__.gray;
    timelineLine.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(1);
    (0,_page__WEBPACK_IMPORTED_MODULE_2__.appendChildForPage)(_scroll__WEBPACK_IMPORTED_MODULE_3__.scrollContainer, timelineLine);
    return timelineLine;
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
    const timelineItems = [
        { element: evolution, offsetFactor: 0.06 },
        { element: evolutionHistory, offsetFactor: 0.06 },
        ...quotes.map((q) => ({ element: q.quote, offsetFactor: 0.2 })),
        ...promos.map((o) => ({ element: o, offsetFactor: -0.001 })),
    ];
    const timelines = timelineItems.map((timelineItem) => {
        const timelineLine = createTimelineLine();
        return { timelineLine, timelineItem };
    });
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
        for (const { timelineLine, timelineItem } of timelines) {
            const { element, offsetFactor } = timelineItem;
            const offset = s * offsetFactor;
            timelineLine.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(element.offsetLeft + element.offsetWidth / 2);
            timelineLine.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(element.offsetTop + element.offsetHeight + offset);
            timelineLine.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(_scroll__WEBPACK_IMPORTED_MODULE_3__.scrollContainer.offsetHeight - (element.offsetTop + element.offsetHeight) - offset);
        }
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
/* harmony export */   addHomeSVG: () => (/* binding */ addHomeSVG),
/* harmony export */   addViewPage: () => (/* binding */ addViewPage),
/* harmony export */   homeAnimated: () => (/* binding */ homeAnimated)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../page */ "./src/page.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scroll */ "./src/scroll.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/util.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let homeAnimated;
function addHomeSVG() {
    return __awaiter(this, void 0, void 0, function* () {
        homeAnimated = document.createElement("div");
        homeAnimated.style.position = "absolute";
        const homeSvg = yield (0,_util__WEBPACK_IMPORTED_MODULE_4__.fetchSVG)("view/home.svg");
        homeAnimated.appendChild(homeSvg);
        (0,_page__WEBPACK_IMPORTED_MODULE_2__.registerUpdateLayout)(() => {
            if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
                const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.getScrollHeight)();
                const height = s * 0.95;
                homeSvg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(height);
                homeAnimated.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((s - height) / 2);
            }
        });
        return homeSvg;
    });
}
function addViewPage() {
    const home = (0,_scroll__WEBPACK_IMPORTED_MODULE_3__.addScrollImage)("view/home.svg");
    if (homeAnimated)
        home.style.visibility = "hidden";
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
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./src/modal.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/util.ts");






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
    (0,_page__WEBPACK_IMPORTED_MODULE_3__.appendChildForPage)(scrollContainer, scrollPadding);
    return scrollPadding;
}
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    scrollImage.style.cursor = "pointer";
    scrollImage.onclick = () => {
        const bigImage = document.createElement("img");
        bigImage.src = src;
        bigImage.style.position = "absolute";
        bigImage.style.filter = `drop-shadow(0px 0px 15px ${_constants__WEBPACK_IMPORTED_MODULE_0__.ieBlue})`;
        const sz = 60;
        const exitButton = (0,_util__WEBPACK_IMPORTED_MODULE_5__.createIconSVG)(sz);
        const makeExitButtonLine = (0,_util__WEBPACK_IMPORTED_MODULE_5__.makeLine)(exitButton, 12);
        const exitButtonLine1 = makeExitButtonLine();
        const exitButtonLine2 = makeExitButtonLine();
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.setAttributes)(exitButtonLine1, { x1: 0, y1: 0, x2: sz, y2: sz });
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.setAttributes)(exitButtonLine2, { x1: 0, y1: sz, x2: sz, y2: 0 });
        exitButton.style.stroke = _constants__WEBPACK_IMPORTED_MODULE_0__.gray;
        const fullscreenButton = (0,_util__WEBPACK_IMPORTED_MODULE_5__.createIconSVG)(sz);
        const makeFullscreenButtonPolyline = (0,_util__WEBPACK_IMPORTED_MODULE_5__.makePolyline)(fullscreenButton, 12);
        const fullscreenButtonPolyline1 = makeFullscreenButtonPolyline();
        function toPolyline(list) {
            return list.map((point) => point.join(",")).join(" ");
        }
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.setAttributes)(fullscreenButtonPolyline1, {
            points: toPolyline([
                [0, 0],
                [0, sz],
                [sz, sz],
            ]),
        });
        fullscreenButton.style.stroke = _constants__WEBPACK_IMPORTED_MODULE_0__.gray;
        const imageModal = new _modal__WEBPACK_IMPORTED_MODULE_2__.Modal("#ffffffee", (backdrop) => {
            backdrop.appendChild(bigImage);
            backdrop.appendChild(exitButton);
            backdrop.appendChild(fullscreenButton);
        }, (time) => {
            bigImage.style.opacity = time + "";
        }, () => { });
        imageModal.beginOpen();
        exitButton.onclick = imageModal.beginClose;
        fullscreenButton.onclick = () => bigImage.requestFullscreen();
        (0,_page__WEBPACK_IMPORTED_MODULE_3__.registerUpdateLayout)(() => {
            const size = 15;
            const fromEdge = 15;
            exitButton.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
            exitButton.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
            exitButton.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth - size - fromEdge);
            exitButton.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(fromEdge);
            fullscreenButton.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
            fullscreenButton.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
            fullscreenButton.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth - size - fromEdge - size * 2);
            fullscreenButton.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(fromEdge);
            const height = innerHeight * 0.9;
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(bigImage, height);
            const minWidth = innerWidth * 0.9;
            if (bigImage.offsetWidth > minWidth) {
                (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setWidth)(bigImage, minWidth);
            }
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerElementX)(bigImage);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerElementY)(bigImage);
        });
    };
    (0,_page__WEBPACK_IMPORTED_MODULE_3__.awaitLayoutForImageLoading)(scrollImage);
    (0,_page__WEBPACK_IMPORTED_MODULE_3__.appendChildForPage)(scrollContainer, scrollImage);
    return scrollImage;
}
function addScrollText(text) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    (0,_page__WEBPACK_IMPORTED_MODULE_3__.appendChildForPage)(scrollContainer, scrollText);
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
(0,_signal__WEBPACK_IMPORTED_MODULE_4__.effect)(() => {
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
/* harmony export */   animateSpring: () => (/* binding */ animateSpring),
/* harmony export */   animateWithSpring: () => (/* binding */ animateWithSpring)
/* harmony export */ });
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

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
            signal.update();
            spring.onRest();
            return;
        }
        requestAnimationFrame(tickSpring);
    }
}
function animateWithSpring(stiffness, overTime) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            const spring = new Spring(0);
            const springSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
            spring.setStiffnessCritical(stiffness);
            spring.target = 1;
            const animate = () => overTime(spring.position);
            spring.onRest = () => {
                springSig.unsubscribe(animate);
                resolve();
            };
            (0,_signal__WEBPACK_IMPORTED_MODULE_0__.effect)(animate, [springSig]);
            animateSpring(spring, springSig);
        });
    });
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
/* harmony export */   createIconSVG: () => (/* binding */ createIconSVG),
/* harmony export */   fetchSVG: () => (/* binding */ fetchSVG),
/* harmony export */   getElementByIdSVG: () => (/* binding */ getElementByIdSVG),
/* harmony export */   interlaced: () => (/* binding */ interlaced),
/* harmony export */   makeLine: () => (/* binding */ makeLine),
/* harmony export */   makePolyline: () => (/* binding */ makePolyline),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   setAttributes: () => (/* binding */ setAttributes),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   spaceToFile: () => (/* binding */ spaceToFile)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function fetchSVG(fetchString) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(fetchString);
        const svgContent = yield response.text();
        return new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement;
    });
}
function getElementByIdSVG(svg, id) {
    return svg.getElementById(id);
}
function createIconSVG(localSize) {
    const icon = createElementSVG("svg");
    const pad = 4;
    icon.style.position = "absolute";
    icon.style.cursor = "pointer";
    icon.setAttribute("viewBox", `${-pad} ${-pad} ${localSize + 2 * pad} ${localSize + 2 * pad}`);
    return icon;
}
const makeLine = (svg, strokeWidth) => () => {
    const line = createElementSVG("line");
    setAttributes(line, { "stroke-width": strokeWidth });
    svg.appendChild(line);
    return line;
};
const makePolyline = (svg, strokeWidth) => () => {
    const line = createElementSVG("polyline");
    setAttributes(line, { "stroke-width": strokeWidth, fill: "none" });
    svg.appendChild(line);
    return line;
};


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
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ "./src/modal.ts");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page */ "./src/page.ts");
/* harmony import */ var _pages_connect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/connect */ "./src/pages/connect.ts");
/* harmony import */ var _pages_evolution__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/evolution */ "./src/pages/evolution.ts");
/* harmony import */ var _pages_inspiration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/inspiration */ "./src/pages/inspiration.ts");
/* harmony import */ var _pages_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/view */ "./src/pages/view.ts");
/* harmony import */ var _pages_work__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/work */ "./src/pages/work.ts");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scroll */ "./src/scroll.ts");
/* harmony import */ var _signal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./signal */ "./src/signal.ts");
/* harmony import */ var _spring__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./spring */ "./src/spring.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./util */ "./src/util.ts");
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
// work page
// image click
// hit end of scroll, next page
// simpler rectangle scroll bar
// "view" start animation
// envelope lower
// random color on hover for svg art?
// nav sidebar hover style
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
        const svg = yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.fetchSVG)("logo-full.svg");
        svg.style.position = "absolute";
        svg.style.opacity = "0";
        _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(svg);
        svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight * 0.4);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(1000);
        const svgSpring = new _spring__WEBPACK_IMPORTED_MODULE_11__.Spring(0);
        svgSpring.setStiffnessCritical(80);
        const svgSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_10__.Signal();
        (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
            svg.style.opacity = "" + svgSpring.position;
            svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((1.3 - svgSpring.position) * innerHeight);
            svg.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((innerHeight - svg.scrollHeight) / 2);
            svg.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((innerWidth - svg.scrollWidth) / 2);
        }, [svgSpringSig]);
        svgSpring.target = 1;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(svgSpring, svgSpringSig);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(1000);
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
            const designLetter = (0,_util__WEBPACK_IMPORTED_MODULE_12__.getElementByIdSVG)(svg, "design-" + d[i]);
            opacityOut(designLetter);
            yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(120);
        }
        const l = ["big-i", "dot-1", "big-e", "dot-2"];
        for (let i = 0; i < l.length; i++) {
            const designLetter = (0,_util__WEBPACK_IMPORTED_MODULE_12__.getElementByIdSVG)(svg, l[i]);
            opacityOut(designLetter);
            yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(120);
        }
        yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(1000);
        svgSpring.target = 0;
        (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateSpring)(svgSpring, svgSpringSig);
        yield (0,_util__WEBPACK_IMPORTED_MODULE_12__.sleep)(500);
        _constants__WEBPACK_IMPORTED_MODULE_0__.body.removeChild(svg);
    });
}
function addNavItems() {
    for (const [pageName, addPage] of Object.entries(pages)) {
        const navItem = document.createElement("span");
        navItem.innerText = pageName.toUpperCase();
        navItem.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
        navItem.style.position = "absolute";
        navItem.style.fontFamily = "Spartan";
        navItem.style.color = _constants__WEBPACK_IMPORTED_MODULE_0__.gray;
        navItem.style.fontWeight = "500";
        navItem.style.cursor = "pointer";
        navItem.style.whiteSpace = "nowrap";
        navItem.onclick = () => {
            (0,_page__WEBPACK_IMPORTED_MODULE_3__.cleanLastPage)();
            addPage();
            navItem.style.color = "#000000";
            _page__WEBPACK_IMPORTED_MODULE_3__.pageCleanups.add(() => (navItem.style.color = _constants__WEBPACK_IMPORTED_MODULE_0__.gray));
            // history.pushState({}, "", "/#/" + pageName);
        };
        _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(navItem);
        navItemFromString[pageName] = navItem;
    }
    const navItems = Object.values(navItemFromString);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
            const s = (0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getScrollHeight)();
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerWithGapY)(navItems, 0.06 * s, window.innerHeight / 2);
            for (const navItem of navItems) {
                navItem.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(edgeAlignX());
                navItem.style.visibility = "visible";
                navItem.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(s * 0.025);
            }
        }
        else {
            for (const navItem of navItems)
                navItem.style.visibility = "hidden";
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
}
function animateHomeIE() {
    return __awaiter(this, void 0, void 0, function* () {
        const homeSvg = yield (0,_pages_view__WEBPACK_IMPORTED_MODULE_7__.addHomeSVG)();
        const rest = (0,_util__WEBPACK_IMPORTED_MODULE_12__.getElementByIdSVG)(homeSvg, "rest");
        rest.style.opacity = "0";
        const ie = (0,_util__WEBPACK_IMPORTED_MODULE_12__.getElementByIdSVG)(homeSvg, "ie");
        ie.style.opacity = "0";
        yield (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateWithSpring)(8, (time) => (ie.style.opacity = time + ""));
        yield (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateWithSpring)(10, (time) => (rest.style.opacity = time + ""));
    });
}
function addHeaderBar() {
    const headerBar = document.createElement("div");
    headerBar.style.position = "absolute";
    headerBar.style.background = "white";
    _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(headerBar);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        headerBar.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth);
        headerBar.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)());
    }, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
}
function addMenuButton() {
    const sz = 60;
    const menuButton = (0,_util__WEBPACK_IMPORTED_MODULE_12__.createIconSVG)(sz);
    menuButton.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    const menuLine = (0,_util__WEBPACK_IMPORTED_MODULE_12__.makeLine)(menuButton, 4);
    const line1 = menuLine();
    const line2 = menuLine();
    const line3 = menuLine();
    const menuModal = new _modal__WEBPACK_IMPORTED_MODULE_2__.Modal("#000000ee", (backdrop) => {
        const menuPageNavs = [];
        for (const [pageName, navItem] of Object.entries(navItemFromString)) {
            const menuPageNav = document.createElement("span");
            menuPageNav.style.position = "absolute";
            menuPageNav.innerText = pageName.toUpperCase();
            menuPageNav.style.fontFamily = "Spartan";
            menuPageNav.style.fontWeight = "500";
            menuPageNav.style.cursor = "pointer";
            (0,_util__WEBPACK_IMPORTED_MODULE_12__.colorOnHover)(menuPageNav, _constants__WEBPACK_IMPORTED_MODULE_0__.gray, "white");
            menuPageNav.onclick = () => {
                menuModal.beginClose();
                navItem.click();
            };
            backdrop.appendChild(menuPageNav);
            menuPageNavs.push(menuPageNav);
        }
        menuModal.onLayout = () => {
            for (const menuPageNav of menuPageNavs) {
                menuPageNav.style.fontSize = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight * 0.05);
                (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerElementX)(menuPageNav);
            }
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerWithGapY)(menuPageNavs, innerHeight * 0.08, innerHeight / 2);
        };
        menuButton.style.zIndex = "1";
    }, (time) => {
        const s = time * sz;
        (0,_util__WEBPACK_IMPORTED_MODULE_12__.setAttributes)(line1, { x1: 0, y1: 0, x2: sz, y2: s });
        line2.style.opacity = (sz - s) / sz + "";
        (0,_util__WEBPACK_IMPORTED_MODULE_12__.setAttributes)(line2, { x1: 0, y1: sz / 2, x2: sz, y2: sz / 2 });
        (0,_util__WEBPACK_IMPORTED_MODULE_12__.setAttributes)(line3, { x1: 0, y1: sz, x2: sz, y2: sz - s });
    }, () => {
        menuButton.style.zIndex = "0";
    });
    menuButton.style.stroke = "#bbbbbb"; // ZZZZ onclose mix with escape key
    menuButton.onclick = () => {
        if (menuModal.isOpening) {
            menuButton.style.stroke = "#bbbbbb";
            menuModal.beginClose();
        }
        else {
            menuButton.style.stroke = _constants__WEBPACK_IMPORTED_MODULE_0__.gray;
            menuModal.beginOpen();
        }
    };
    _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(menuButton);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        const size = headerIconSize();
        menuButton.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
        menuButton.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
        menuButton.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerWidth - size - edgeAlignX());
        menuButton.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() - size) / 2);
    }, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
}
function addLogo() {
    const logo = document.createElement("img");
    logo.style.animation = (0,_constants__WEBPACK_IMPORTED_MODULE_0__.fadeInAnimation)();
    logo.style.position = "absolute";
    logo.style.cursor = "pointer";
    logo.src = "logo.svg";
    _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(logo);
    logo.onclick = () => __awaiter(this, void 0, void 0, function* () {
        navItemFromString.view.click();
        const pulse = document.createElement("div");
        pulse.style.position = "absolute";
        pulse.style.background = _constants__WEBPACK_IMPORTED_MODULE_0__.ieGreen;
        pulse.style.pointerEvents = "none";
        _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(pulse);
        yield (0,_spring__WEBPACK_IMPORTED_MODULE_11__.animateWithSpring)(40, (time) => {
            const out = 30;
            pulse.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(logo.offsetLeft - time * out);
            pulse.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(logo.offsetTop - time * out);
            pulse.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(logo.offsetWidth + time * 2 * out);
            pulse.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(logo.offsetHeight + time * 2 * out);
            pulse.style.opacity = 1 - time + "";
        });
        _constants__WEBPACK_IMPORTED_MODULE_0__.body.removeChild(pulse);
    });
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        const size = headerIconSize();
        logo.style.width = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
        logo.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(size);
        logo.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(edgeAlignX());
        logo.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(((0,_scroll__WEBPACK_IMPORTED_MODULE_9__.getHeaderBarHeight)() - size) / 2);
    }, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
}
function addCopyright() {
    const copyright = document.createElement("span");
    copyright.style.position = "absolute";
    copyright.innerText = "©2025 i.e. design, inc.";
    copyright.style.whiteSpace = "nowrap";
    _constants__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(copyright);
    (0,_signal__WEBPACK_IMPORTED_MODULE_10__.effect)(() => {
        if ((0,_layout__WEBPACK_IMPORTED_MODULE_1__.isLandscape)()) {
            copyright.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(edgeAlignX());
            copyright.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(innerHeight * 0.9);
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.styleText)(copyright, { letterSpacing: 0.3, fontWeight: 500, color: _constants__WEBPACK_IMPORTED_MODULE_0__.gray, fontSize: 0.012 * innerHeight, lineHeight: 20 });
            copyright.style.visibility = "visible";
        }
        else {
            // ZZZZ need to do something here
            copyright.style.visibility = "hidden";
        }
    }, [_constants__WEBPACK_IMPORTED_MODULE_0__.bodySig]);
}
function setup() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const pageName = location.hash.substring("#/".length);
        // if (pageName === "") await animateIntro();
        // await animateHomeIE();
        addNavItems();
        addHeaderBar();
        addMenuButton();
        addLogo();
        addCopyright();
        const pageNavItem = (_a = navItemFromString[pageName]) !== null && _a !== void 0 ? _a : navItemFromString.view;
        pageNavItem.click();
    });
}
setup();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUM7UUFDVixZQUFZLEVBQUUsQ0FBQztRQUVmLE1BQU0sV0FBVyxHQUFHLHVCQUFpQixDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDMUUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDOztDQUN2QjtBQUNELEtBQUssRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2xheW91dC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9tb2RhbC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2Nvbm5lY3QudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvZXZvbHV0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL2luc3BpcmF0aW9uLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3BhZ2VzL3ZpZXcudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvd29yay50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zY3JvbGwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc2lnbmFsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NwcmluZy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNMYW5kc2NhcGUgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5leHBvcnQgY29uc3QgYm9keVNpZyA9IG5ldyBTaWduYWwoKTtcbndpbmRvdy5vbnJlc2l6ZSA9IGJvZHlTaWcudXBkYXRlO1xuXG5leHBvcnQgY29uc3QgaWVCbHVlID0gXCIjNjA5Q0NFXCI7XG5leHBvcnQgY29uc3QgaWVHcmVlbiA9IFwiI2JmZTAyMVwiO1xuZXhwb3J0IGNvbnN0IGdyYXkgPSBcIiM4MDgwODBcIjtcblxuZXhwb3J0IGNvbnN0IGZhZGVJbkFuaW1hdGlvbiA9ICgpID0+IGBmYWRlSW4ke2lzTGFuZHNjYXBlKCkgPyBcIlhcIiA6IFwiWVwifSBlYXNlIDAuNnNgO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX1RFWFRfV0lEVEhfSEVJR0hUX1BST1BPUlRJT04gPSAwLjk1O1xuIiwiaW1wb3J0IHsgaW50ZXJsYWNlZCB9IGZyb20gXCIuL3V0aWxcIjtcblxuaW50ZXJmYWNlIEVsZW1lbnRBbGlnbm1lbnQge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHREZXRhaWxzIHtcbiAgICBsZXR0ZXJTcGFjaW5nOiBudW1iZXI7XG4gICAgZm9udFdlaWdodDogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgZm9udFNpemU6IG51bWJlcjtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBsaW5lSGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBweChwaXhlbHM6IG51bWJlcikge1xuICAgIHJldHVybiBwaXhlbHMgKyBcInB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGlnbldpdGhHYXAobGVmdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBnYXA6IG51bWJlcikge1xuICAgIHJpZ2h0RWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgobGVmdEVsZW1lbnQub2Zmc2V0TGVmdCArIGxlZnRFbGVtZW50Lm9mZnNldFdpZHRoICsgZ2FwKTtcbn1cblxuZnVuY3Rpb24gYXhpc0FsaWduaW5nV2l0aEdhcHMoYXhpc1NpemU6IChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gbnVtYmVyKSB7XG4gICAgcmV0dXJuIChlbGVtZW50T3JHYXBzOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10pOiBbRWxlbWVudEFsaWdubWVudFtdLCBudW1iZXJdID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFsaWdubWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHJ1bm5pbmdUb3RhbCA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudE9yR2FwIG9mIGVsZW1lbnRPckdhcHMpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50T3JHYXAgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRBbGlnbm1lbnRzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50T3JHYXAsIG9mZnNldDogcnVubmluZ1RvdGFsIH0pO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBheGlzU2l6ZShlbGVtZW50T3JHYXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBydW5uaW5nVG90YWwgKz0gZWxlbWVudE9yR2FwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZWxlbWVudEFsaWdubWVudHMsIHJ1bm5pbmdUb3RhbF07XG4gICAgfTtcbn1cblxuLy8gWlpaWiB3YW50IGEgc2hvcnQgaGFuZCBmb3IgY29tbW9uIHNpbXBsZSB1c2VcbmV4cG9ydCBjb25zdCBhbGlnbmluZ1dpdGhHYXBzWSA9IGF4aXNBbGlnbmluZ1dpdGhHYXBzKChlbGVtZW50KSA9PiBlbGVtZW50Lm9mZnNldEhlaWdodCk7XG5leHBvcnQgY29uc3QgYWxpZ25pbmdXaXRoR2Fwc1ggPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5vZmZzZXRXaWR0aCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCwgd2lkdGg6IG51bWJlcikge1xuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSBlbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KCh3aWR0aCAqIGVsZW1lbnQubmF0dXJhbEhlaWdodCkgLyBlbGVtZW50Lm5hdHVyYWxXaWR0aCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0SGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBoZWlnaHQ6IG51bWJlcikge1xuICAgIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoaGVpZ2h0KTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUud2lkdGggPSBweCgoaGVpZ2h0ICogZWxlbWVudC5uYXR1cmFsV2lkdGgpIC8gZWxlbWVudC5uYXR1cmFsSGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xuICAgIHJldHVybiBpbm5lcldpZHRoIC8gaW5uZXJIZWlnaHQgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyV2l0aEdhcFkoZWxlbWVudHM6IEhUTUxFbGVtZW50W10sIGdhcDogbnVtYmVyLCBjZW50ZXI6IG51bWJlcikge1xuICAgIGNvbnN0IGVsZW1lbnRzV2l0aEdhcHMgPSBpbnRlcmxhY2VkKGVsZW1lbnRzLCBnYXApO1xuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgdG90YWxIZWlnaHRdID0gYWxpZ25pbmdXaXRoR2Fwc1koZWxlbWVudHNXaXRoR2Fwcyk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyBjZW50ZXIgLSB0b3RhbEhlaWdodCAvIDIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckVsZW1lbnRYKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAvIDIgLSBlbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJFbGVtZW50WShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoaW5uZXJIZWlnaHQgLyAyIC0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRTaXplID0gcHgocy5mb250U2l6ZSk7XG4gICAgaWYgKHMud2lkdGgpIHNjcm9sbFRleHQuc3R5bGUud2lkdGggPSBweChzLndpZHRoKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmxpbmVIZWlnaHQgPSBweChzLmxpbmVIZWlnaHQpO1xufVxuIiwiaW1wb3J0IHsgYm9keSwgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcHggfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IGVmZmVjdCwgU2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBhbmltYXRlU3ByaW5nLCBTcHJpbmcgfSBmcm9tIFwiLi9zcHJpbmdcIjtcblxuZXhwb3J0IGNsYXNzIE1vZGFsIHtcbiAgICBpc09wZW5pbmcgPSBmYWxzZTtcbiAgICBzcHJpbmc6IFNwcmluZztcbiAgICBzcHJpbmdTaWc6IFNpZ25hbDtcblxuICAgIG9uTGF5b3V0ID0gKCkgPT4ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xvcjogc3RyaW5nLCBvbk9wZW46IChiYWNrZHJvcDogSFRNTEVsZW1lbnQpID0+IHZvaWQsIHByaXZhdGUgb25BbmltYXRlOiAodGltZTogbnVtYmVyKSA9PiB2b2lkLCBvbkNsb3NlOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuc3ByaW5nID0gbmV3IFNwcmluZygwKTtcbiAgICAgICAgdGhpcy5zcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTIwKTtcbiAgICAgICAgdGhpcy5zcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG5cbiAgICAgICAgdGhpcy5zcHJpbmcub25VbnJlc3QgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcHJpbmcucG9zaXRpb24gPT09IDApIG9wZW5Nb2RhbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBjbG9zZU1vZGFsOiAoKSA9PiB2b2lkIHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNwcmluZy5vblJlc3QgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zcHJpbmcucG9zaXRpb24gPT09IDAgJiYgY2xvc2VNb2RhbCkgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9wZW5Nb2RhbCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGJhY2tkcm9wKTtcblxuICAgICAgICAgICAgb25PcGVuKGJhY2tkcm9wKTtcblxuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5zcHJpbmcucG9zaXRpb247XG4gICAgICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUub3BhY2l0eSA9IHRpbWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLnBvaW50ZXJFdmVudHMgPSB0aW1lID4gMC45ID8gXCJhbGxcIiA6IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMub25BbmltYXRlKHRpbWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZWZmZWN0KGFuaW1hdGUsIFt0aGlzLnNwcmluZ1NpZ10pO1xuXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS53aWR0aCA9IHB4KGlubmVyV2lkdGgpO1xuICAgICAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25MYXlvdXQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGVmZmVjdChsYXlvdXRNb2RhbCwgW2JvZHlTaWddKTtcblxuICAgICAgICAgICAgY2xvc2VNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBib2R5U2lnLnVuc3Vic2NyaWJlKGxheW91dE1vZGFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcmluZ1NpZy51bnN1YnNjcmliZShhbmltYXRlKTtcbiAgICAgICAgICAgICAgICBib2R5LnJlbW92ZUNoaWxkKGJhY2tkcm9wKTtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uQW5pbWF0ZSgwKTtcbiAgICB9XG5cbiAgICBiZWdpbk9wZW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVzY2FwZUtleUxpc3RlbmVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5DbG9zZSgpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGVzY2FwZUtleUxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBlc2NhcGVLZXlMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5zcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgYW5pbWF0ZVNwcmluZyh0aGlzLnNwcmluZywgdGhpcy5zcHJpbmdTaWcpO1xuICAgICAgICB0aGlzLmlzT3BlbmluZyA9IHRydWU7XG4gICAgfTtcblxuICAgIGJlZ2luQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3ByaW5nLnRhcmdldCA9IDA7XG4gICAgICAgIGFuaW1hdGVTcHJpbmcodGhpcy5zcHJpbmcsIHRoaXMuc3ByaW5nU2lnKTtcbiAgICAgICAgdGhpcy5pc09wZW5pbmcgPSBmYWxzZTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgYm9keVNpZyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgZWZmZWN0IH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5cbmV4cG9ydCBjb25zdCBwYWdlQ2xlYW51cHMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmNvbnN0IGF3YWl0QmVmb3JlTGF5b3V0cyA9IG5ldyBTZXQ8UHJvbWlzZTx2b2lkPj4oKTtcbmNvbnN0IGJlZm9yZUxheW91dHMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhd2FpdExheW91dEZvckltYWdlTG9hZGluZyhpbWFnZTogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGF3YWl0QmVmb3JlTGF5b3V0cy5hZGQoaW1hZ2UuZGVjb2RlKCkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVcGRhdGVMYXlvdXQodXBkYXRlTGF5b3V0OiAoKSA9PiB2b2lkKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoYXdhaXRCZWZvcmVMYXlvdXRzKTtcbiAgICBhd2FpdEJlZm9yZUxheW91dHMuY2xlYXIoKTtcbiAgICBydW5BbGxBbmRDbGVhcihiZWZvcmVMYXlvdXRzKTtcblxuICAgIGVmZmVjdCh1cGRhdGVMYXlvdXQsIFtib2R5U2lnXSk7XG4gICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBib2R5U2lnLnVuc3Vic2NyaWJlKHVwZGF0ZUxheW91dCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGRGb3JQYWdlKHBhcmVudDogSFRNTEVsZW1lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCkge1xuICAgIGJlZm9yZUxheW91dHMuYWRkKCgpID0+IHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuTGFzdFBhZ2UoKSB7XG4gICAgcnVuQWxsQW5kQ2xlYXIocGFnZUNsZWFudXBzKTtcbn1cblxuZnVuY3Rpb24gcnVuQWxsQW5kQ2xlYXIoc2V0OiBTZXQ8KCkgPT4gdm9pZD4pIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2V0KSBpdGVtKCk7XG4gICAgc2V0LmNsZWFyKCk7XG59XG4iLCJpbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgYWxpZ25pbmdXaXRoR2Fwc1ksIHB4LCBzZXRXaWR0aCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJVcGRhdGVMYXlvdXQgfSBmcm9tIFwiLi4vcGFnZVwiO1xuaW1wb3J0IHsgYWRkU2Nyb2xsSW1hZ2UsIGFkZFNjcm9sbFRleHQsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCB9IGZyb20gXCIuLi9zY3JvbGxcIjtcblxuZnVuY3Rpb24gYWRkSWNvbihpbWFnZVNyYzogc3RyaW5nLCBjbGlja0xpbms6IHN0cmluZykge1xuICAgIGNvbnN0IGljb24gPSBhZGRTY3JvbGxJbWFnZShpbWFnZVNyYyk7XG4gICAgaWNvbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICBpY29uLm9uY2xpY2sgPSAoKSA9PiB3aW5kb3cub3BlbihjbGlja0xpbmspO1xuICAgIHJldHVybiBpY29uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29ubmVjdFBhZ2UoKSB7XG4gICAgY29uc3QgY29ubmVjdCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9jb25uZWN0LnN2Z1wiKTtcbiAgICBjb25zdCB0ZXh0cyA9IFtcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIk91ciBjbGllbnRzIGxvb2sgdG8gdXMgZm9yIG1vcmUgdGhhbiBhd2FyZC13aW5uaW5nIGRlc2lnbi4gVGhleSB2YWx1ZSBvdXIgcm9sZSBhcyB0cnVzdGVkIGFkdmlzb3IsIHN1cHBvcnQsIGFuZCBjb25maWRhbnQuXCIpLFxuICAgICAgICBhZGRTY3JvbGxUZXh0KFwiV2UgbG9vayBmb3Igc3luZXJneSBhbmQgY29tcGF0aWJpbGl0eSBpbiBldmVyeSByZWxhdGlvbnNoaXAgd2UgYnVpbGQgc28gdGhlIHdvcmsgZXhwZXJpZW5jZSBkb2VzbuKAmXQgZmVlbCBsaWtlIHdvcmsgYXQgYWxsLlwiKSxcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIklmIHlvdXIgZ3V0IGlzIHRlbGxpbmcgeW91IHdlIHNob3VsZCBjb25uZWN0LCBub3cgaXMgdGhlIHBlcmZlY3QgdGltZSB0byBlbWFpbC5cIiksXG4gICAgXTtcbiAgICBjb25zdCBsZXRzTWVldCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9sZXRzLW1lZXQuanBnXCIpO1xuICAgIGNvbnN0IHdobyA9IGFkZFNjcm9sbFRleHQoXCJCZXRobHluIEtyYWthdWVyLCBGb3VuZGVyIGFuZCBDcmVhdGl2ZSBEaXJlY3RvclwiKTtcblxuICAgIGNvbnN0IGluc3RhZ3JhbUljb24gPSBhZGRJY29uKFwiY29ubmVjdC9pbnN0YWdyYW0taWNvbi5zdmdcIiwgXCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2llZGVzaWduaW5jXCIpO1xuICAgIGNvbnN0IGxpbmtlZGluSWNvbiA9IGFkZEljb24oXCJjb25uZWN0L2xpbmtlZGluLWljb24uc3ZnXCIsIFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvaS1lLWRlc2lnbi1pbmNcIik7XG4gICAgY29uc3QgbWFpbEljb24gPSBhZGRJY29uKFwiY29ubmVjdC9tYWlsLWljb24uc3ZnXCIsIFwibWFpbHRvOmJldGhAaWUtZGVzaWduLmNvbVwiKTtcblxuICAgIGNvbnN0IGljb25zID0gW2luc3RhZ3JhbUljb24sIGxpbmtlZGluSWNvbiwgbWFpbEljb25dO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSAwLjU1ICogcztcbiAgICAgICAgc2V0V2lkdGgoY29ubmVjdCwgd2lkdGgpO1xuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGxldHNNZWV0LCAwLjgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykgc3R5bGVUZXh0KHRleHQsIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcbiAgICAgICAgc3R5bGVUZXh0KHdobywgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xuICAgICAgICAgICAgY29ubmVjdCwgLy9cbiAgICAgICAgICAgIDAuMDkgKiBzLFxuICAgICAgICAgICAgdGV4dHNbMF0sXG4gICAgICAgICAgICAwLjAzICogcyxcbiAgICAgICAgICAgIHRleHRzWzFdLFxuICAgICAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgICAgICB0ZXh0c1syXSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIDAuMDUgKiBzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldHNNZWV0LnN0eWxlLmxlZnQgPSBweChjb25uZWN0Lm9mZnNldExlZnQgKyBjb25uZWN0Lm9mZnNldFdpZHRoICsgMC4xNSAqIHMpO1xuXG4gICAgICAgIHdoby5zdHlsZS5sZWZ0ID0gcHgobGV0c01lZXQub2Zmc2V0TGVmdCk7XG4gICAgICAgIHdoby5zdHlsZS50b3AgPSBweChsZXRzTWVldC5vZmZzZXRUb3AgKyBsZXRzTWVldC5vZmZzZXRIZWlnaHQgKyAwLjA0ICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBpY29uIG9mIGljb25zKSB7XG4gICAgICAgICAgICBpY29uLndpZHRoID0gcyAqIDAuMDU1O1xuICAgICAgICAgICAgY29uc3QgbGFzdFRleHQgPSB0ZXh0c1t0ZXh0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGljb24uc3R5bGUudG9wID0gcHgobGFzdFRleHQub2Zmc2V0VG9wICsgbGFzdFRleHQub2Zmc2V0SGVpZ2h0ICsgMC4wMyAqIHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFtpY29uQWxpZ25tZW50cywgX19dID0gYWxpZ25pbmdXaXRoR2Fwc1goW2luc3RhZ3JhbUljb24sIDAuMDMgKiBzLCBsaW5rZWRpbkljb24sIDAuMDMgKiBzLCBtYWlsSWNvbl0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBpY29uQWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZ3JheSwgaWVHcmVlbiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGFsaWduaW5nV2l0aEdhcHNYLCBhbGlnbmluZ1dpdGhHYXBzWSwgcHgsIHNldEhlaWdodCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4uL2xheW91dFwiO1xuaW1wb3J0IHsgYXBwZW5kQ2hpbGRGb3JQYWdlLCByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsUGFkZGluZywgYWRkU2Nyb2xsVGV4dCwgY2VudGVyV2l0aGluU2Nyb2xsWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBzY3JvbGxDb250YWluZXIgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5cbmludGVyZmFjZSBRdW90ZSB7XG4gICAgcXVvdGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIGF1dGhvcjogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgdGl0bGU6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgIG9wZW5RdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgY2xvc2VRdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFF1b3RlKHF1b3RlVGV4dDogc3RyaW5nLCBhdXRob3JUZXh0OiBzdHJpbmcsIHRpdGxlVGV4dDogc3RyaW5nKTogUXVvdGUge1xuICAgIGNvbnN0IHF1b3RlID0gYWRkU2Nyb2xsVGV4dChxdW90ZVRleHQpO1xuICAgIHF1b3RlLnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7IC8vIGNhbid0IGFuaW1hdGUgaW4gb3RoZXJ3aXNlIGNsb3NlIHF1b3RlIGJvdW5kaW5nIGJveCBzaGl0IGdldHMgY29uZnVzZWRcbiAgICBjb25zdCBhdXRob3IgPSBhZGRTY3JvbGxUZXh0KGF1dGhvclRleHQpO1xuICAgIGNvbnN0IHRpdGxlID0gYWRkU2Nyb2xsVGV4dCh0aXRsZVRleHQpO1xuICAgIGNvbnN0IG9wZW5RdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJxcIik7XG4gICAgY29uc3QgY2xvc2VRdW90ZSA9IGFkZFNjcm9sbFRleHQoXCLigJ1cIik7XG5cbiAgICByZXR1cm4geyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMyICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2NSAqIHMgfSk7XG5cbiAgICBzdHlsZVRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplOiAwLjE1ICogcywgd2lkdGg6IDAuMDUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9O1xuICAgIHN0eWxlVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgYXV0aG9yLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0KTtcbiAgICB0aXRsZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG5cbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xuICAgICAgICBxdW90ZSwgLy9cbiAgICAgICAgMC4wNCAqIHMsXG4gICAgICAgIGF1dGhvcixcbiAgICAgICAgLTAuMDE1ICogcyxcbiAgICAgICAgdGl0bGUsXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyAwLjM1ICogcyk7XG4gICAgfVxuXG4gICAgLy8gdGhpcyBpcyBzb3J0YSBqYW5rLiBhZ2FpbiwgY2xvc2UgcXVvdGUgYm91bmRpbmcgYm94IGdldHMgY29uZnVzZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMocXVvdGUpO1xuICAgICAgICBjb25zdCByZWN0cyA9IHJhbmdlLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lclJlY3QgPSBzY3JvbGxDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGxhc3RUZXh0TGluZVJlY3QgPSByZWN0c1tyZWN0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3QgbGFzdFJlY3RMZWZ0ID0gbGFzdFRleHRMaW5lUmVjdC5sZWZ0IC0gc2Nyb2xsQ29udGFpbmVyUmVjdC5sZWZ0ICsgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgb3BlblF1b3RlLnN0eWxlLmxlZnQgPSBweChxdW90ZS5vZmZzZXRMZWZ0IC0gMC4wNyAqIHMpO1xuICAgICAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgICAgICBjbG9zZVF1b3RlLnN0eWxlLmxlZnQgPSBweChsYXN0UmVjdExlZnQgKyBsYXN0VGV4dExpbmVSZWN0LndpZHRoKTtcbiAgICAgICAgY2xvc2VRdW90ZS5zdHlsZS50b3AgPSBweChxdW90ZS5vZmZzZXRUb3AgKyBxdW90ZS5vZmZzZXRIZWlnaHQgLSAwLjAxICogcyk7XG4gICAgfSwgMTAwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGltZWxpbmVMaW5lKCkge1xuICAgIGNvbnN0IHRpbWVsaW5lTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGltZWxpbmVMaW5lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHRpbWVsaW5lTGluZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBncmF5O1xuICAgIHRpbWVsaW5lTGluZS5zdHlsZS53aWR0aCA9IHB4KDEpO1xuICAgIGFwcGVuZENoaWxkRm9yUGFnZShzY3JvbGxDb250YWluZXIsIHRpbWVsaW5lTGluZSk7XG4gICAgcmV0dXJuIHRpbWVsaW5lTGluZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2b2x1dGlvblBhZ2UoKSB7XG4gICAgY29uc3QgZXZvbHV0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLnN2Z1wiKTtcbiAgICBjb25zdCBldm9sdXRpb25IaXN0b3J5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJldm9sdXRpb24vZXZvbHV0aW9uLWhpc3Rvcnkuc3ZnXCIpO1xuICAgIGNvbnN0IGxvZ29GdWxsID0gYWRkU2Nyb2xsSW1hZ2UoXCJsb2dvLWZ1bGwuc3ZnXCIpO1xuXG4gICAgY29uc3QgcHJvbW9zOiBIVE1MSW1hZ2VFbGVtZW50W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHByb21vcy5wdXNoKGFkZFNjcm9sbEltYWdlKGBldm9sdXRpb24vcHJvbW8tJHtpfS5qcGdgKSk7XG5cbiAgICBjb25zdCBxdW90ZXMgPSBbXG4gICAgICAgIGFkZFF1b3RlKFxuICAgICAgICAgICAgXCJPdXIgYW5udWFsIHByb21vIGlzIGFsd2F5cyBncm91bmRlZCBpbiBvdXIgaWRlbnRpdHkgYnV0IGl0J3MgZnVuIHRvIHB1c2ggbGltaXRzIGFuZCByZWludmVudCBvdXJzZWx2ZXMgZWFjaCB5ZWFyLiBUaGUgYmVzdCBwYXJ0IGlzIDxzdHJvbmc+aGVhcmluZyB3aGF0IG91ciBjbGllbnRzIGhhdmUgdG8gc2F5Ljwvc3Ryb25nPlwiLFxuICAgICAgICAgICAgXCJCRVRITFlOIEtSQUtBVUVSXCIsXG4gICAgICAgICAgICBcIkZvdW5kZXIsIGkuZS4gZGVzaWduLCBpbmMuXCJcbiAgICAgICAgKSxcbiAgICAgICAgYWRkUXVvdGUoXCJJIGxvdmUgaG93IHlvdSBkbyBzdHVmZi4gSSdtIGZpbmRpbmcgdGhhdCB0aGVzZSB0eXBlcyBvZiBtZXNzYWdlcyBhcmUgcmVhbGx5IDxzdHJvbmc+dHJhbnNmb3JtaW5nIHJlbGF0aW9uc2hpcHM8L3N0cm9uZz4gd2l0aCBwZW9wbGUuIFRoZXkgYXJlIGp1c3QgZHJlYW15LlwiLCBcIkRFQlJBIFNDSEFUWktJXCIsIFwiRm91bmRlciwgQlBQIFdlYWx0aCBTb2x1dGlvbnMgTExDXCIpLFxuICAgICAgICBhZGRRdW90ZShcIkkgc2VlIGEgbG90IG9mIHRoaXMgc3BlY2lhbCBxdWFsaXR5IGluIHlvdXIgd29yay4gSXQncyBub3QganVzdCBhYm91dCBiZWluZyBpbnRlbnRpb25hbC4gWW91IGFsd2F5cyBicmluZyBpbiBhbiBlbGVtZW50IG9mIDxzdHJvbmc+c3VycHJpc2UgYW5kIGRlbGlnaHQuPC9zdHJvbmc+XCIsIFwiSk9TSCBLUkFLQVVFUlwiLCBcIkZvdW5kZXIsIFNjdWxwdFwiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJZb3VyIGFwcHJvYWNoIHdvcmtzIHNvIHdlbGwgYmVjYXVzZSBpdCBpcyByZWFsbHkgPHN0cm9uZz5wZXJzb25hbDwvc3Ryb25nPiBhbmQgZXF1YWxseSA8c3Ryb25nPnByb2Zlc3Npb25hbC48L3N0cm9uZz5cIiwgXCJBTk4gU1VMTElWQU5cIiwgXCJGb3VuZGVyLCBBbm4gU3VsbGl2YW4gT3JnYW5pemluZ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJZb3UgdHJ1bHkgdW5kZXJzdGFuZCB0aGUgdW5pcXVlIHBvc2l0aW9uaW5nIG9mIGEgcHJvc3BlY3RpdmUgY2xpZW50IGFuZCBhcmUgYWJsZSB0byA8c3Ryb25nPnRlbGwgdGhlaXIgc3Rvcnk8L3N0cm9uZz4gZXhhY3RseSBhcyBpdCBzaG91bGQgYmUgdG9sZC5cIiwgXCJEQVZJRCBZVU5cIiwgXCJQcmluY2lwYWwsIFZhcmlkZW50IExMQ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXG4gICAgICAgICAgICBcIkJldGggaXMgcXVpdGUgZnJhbmtseSBvbmUgb2YgdGhlIDxzdHJvbmc+bW9zdCB0YWxlbnRlZCBkZXNpZ25lcnM8L3N0cm9uZz4gdGhhdCBJIGhhdmUgZXZlciBoYWQgdGhlIHByaXZpbGVnZSB0byB3b3JrIHdpdGguIFNoZSBhbHdheXMgaGFzIGEgc3BlY2lhbCB3YXkgb2YgbWFraW5nIGV2ZXJ5dGhpbmcgc2hlIHRvdWNoZXMgdHVybiB0byBnb2xkIVwiLFxuICAgICAgICAgICAgXCJEQVZJRCBSVVNIXCIsXG4gICAgICAgICAgICBcIlByZXNpZGVudCwgRU5WXCJcbiAgICAgICAgKSxcbiAgICBdO1xuXG4gICAgY29uc3QgdGltZWxpbmVJdGVtcyA9IFtcbiAgICAgICAgeyBlbGVtZW50OiBldm9sdXRpb24sIG9mZnNldEZhY3RvcjogMC4wNiB9LCAvL1xuICAgICAgICB7IGVsZW1lbnQ6IGV2b2x1dGlvbkhpc3RvcnksIG9mZnNldEZhY3RvcjogMC4wNiB9LFxuICAgICAgICAuLi5xdW90ZXMubWFwKChxKSA9PiAoeyBlbGVtZW50OiBxLnF1b3RlLCBvZmZzZXRGYWN0b3I6IDAuMiB9KSksXG4gICAgICAgIC4uLnByb21vcy5tYXAoKG8pID0+ICh7IGVsZW1lbnQ6IG8sIG9mZnNldEZhY3RvcjogLTAuMDAxIH0pKSxcbiAgICBdO1xuICAgIGNvbnN0IHRpbWVsaW5lcyA9IHRpbWVsaW5lSXRlbXMubWFwKCh0aW1lbGluZUl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgdGltZWxpbmVMaW5lID0gY3JlYXRlVGltZWxpbmVMaW5lKCk7XG4gICAgICAgIHJldHVybiB7IHRpbWVsaW5lTGluZSwgdGltZWxpbmVJdGVtIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gYWRkU2Nyb2xsUGFkZGluZygpO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShldm9sdXRpb24sIDAuNzUpO1xuICAgICAgICBzZXRIZWlnaHQoZXZvbHV0aW9uSGlzdG9yeSwgMC4zICogcyk7XG4gICAgICAgIHNldEhlaWdodChsb2dvRnVsbCwgMC40NSAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvbW8gb2YgcHJvbW9zKSBjZW50ZXJXaXRoaW5TY3JvbGxZKHByb21vLCAxKTtcbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIHN0eWxlUXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zOiAoSFRNTEVsZW1lbnQgfCBudW1iZXIpW10gPSBbZXZvbHV0aW9uLCAwLjIgKiBzLCBldm9sdXRpb25IaXN0b3J5XTtcblxuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heChxdW90ZXMubGVuZ3RoLCBwcm9tb3MubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPCBxdW90ZXMubGVuZ3RoKSBpdGVtcy5wdXNoKDAuMyAqIHMsIHF1b3Rlc1tpXS5xdW90ZSk7XG4gICAgICAgICAgICBpZiAoaSA8IHByb21vcy5sZW5ndGgpIGl0ZW1zLnB1c2goMC4zICogcywgcHJvbW9zW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtcy5wdXNoKDAuMiAqIHMsIHNjcm9sbFBhZGRpbmcpO1xuXG4gICAgICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSBhbGlnbmluZ1dpdGhHYXBzWChpdGVtcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZvbHV0aW9uSGlzdG9yeS5zdHlsZS50b3AgPSBweChldm9sdXRpb24ub2Zmc2V0VG9wICsgZXZvbHV0aW9uLm9mZnNldEhlaWdodCAtIGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICBsb2dvRnVsbC5zdHlsZS5sZWZ0ID0gcHgoZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRMZWZ0ICsgKGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0V2lkdGggLSBsb2dvRnVsbC5vZmZzZXRXaWR0aCkgLyAyKTtcbiAgICAgICAgbG9nb0Z1bGwuc3R5bGUudG9wID0gcHgoZXZvbHV0aW9uSGlzdG9yeS5vZmZzZXRUb3AgLSBsb2dvRnVsbC5vZmZzZXRIZWlnaHQgLSAwLjEgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHF1b3RlIG9mIHF1b3RlcykgbGF5b3V0UXVvdGUocXVvdGUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyB0aW1lbGluZUxpbmUsIHRpbWVsaW5lSXRlbSB9IG9mIHRpbWVsaW5lcykge1xuICAgICAgICAgICAgY29uc3QgeyBlbGVtZW50LCBvZmZzZXRGYWN0b3IgfSA9IHRpbWVsaW5lSXRlbTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHMgKiBvZmZzZXRGYWN0b3I7XG4gICAgICAgICAgICB0aW1lbGluZUxpbmUuc3R5bGUubGVmdCA9IHB4KGVsZW1lbnQub2Zmc2V0TGVmdCArIGVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKTtcbiAgICAgICAgICAgIHRpbWVsaW5lTGluZS5zdHlsZS50b3AgPSBweChlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgb2Zmc2V0KTtcbiAgICAgICAgICAgIHRpbWVsaW5lTGluZS5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxDb250YWluZXIub2Zmc2V0SGVpZ2h0IC0gKGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQpIC0gb2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgaWVCbHVlIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25XaXRoR2FwLCBhbGlnbmluZ1dpdGhHYXBzWSwgcHgsIHN0eWxlVGV4dCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxQYWRkaW5nLCBhZGRTY3JvbGxUZXh0LCBjZW50ZXJXaXRoaW5TY3JvbGxZLCBnZXRTY3JvbGxIZWlnaHQgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5cbmNvbnN0IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiA9IDAuODU7XG5cbmludGVyZmFjZSBJbnNwaXJhdGlvblRpbGUge1xuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcjogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZE1vcmU6IEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBzdHlsZUluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIHN0eWxlVGV4dChtYWpvciwgeyBsZXR0ZXJTcGFjaW5nOiAwLjYsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMzYgKiBzLCB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSk7XG4gICAgc3R5bGVUZXh0KG1pbm9yLCB7IGxldHRlclNwYWNpbmc6IDAuMywgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyNyAqIHMsIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcbiAgICBzdHlsZVRleHQocmVhZE1vcmUsIHsgbGV0dGVyU3BhY2luZzogMC41LCBmb250V2VpZ2h0OiA0MDAsIGNvbG9yOiBpZUJsdWUsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH0pO1xuXG4gICAgaW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gcHgoMC41NSAqIHMpO1xufVxuXG5mdW5jdGlvbiBhbGlnbkluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIG1ham9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuICAgIHJlYWRNb3JlLnN0eWxlLmxlZnQgPSBpbWFnZS5zdHlsZS5sZWZ0O1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNZKFtcbiAgICAgICAgaW1hZ2UsIC8vXG4gICAgICAgIDAuMDMgKiBzLFxuICAgICAgICBtYWpvcixcbiAgICAgICAgLTAuMDEgKiBzLFxuICAgICAgICBtaW5vcixcbiAgICAgICAgMC4wMSAqIHMsXG4gICAgICAgIHJlYWRNb3JlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgcyAqIDAuMTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkSW5zcGlyYXRpb25UaWxlKGltYWdlU3RyaW5nOiBzdHJpbmcsIG1ham9yVGV4dDogc3RyaW5nLCBtaW5vclRleHQ6IHN0cmluZyk6IEluc3BpcmF0aW9uVGlsZSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhZGRTY3JvbGxJbWFnZShpbWFnZVN0cmluZyk7XG4gICAgY29uc3QgbWFqb3IgPSBhZGRTY3JvbGxUZXh0KG1ham9yVGV4dCk7XG4gICAgY29uc3QgbWlub3IgPSBhZGRTY3JvbGxUZXh0KG1pbm9yVGV4dCk7XG4gICAgY29uc3QgcmVhZE1vcmUgPSBhZGRTY3JvbGxUZXh0KFwiUmVhZCBtb3JlXCIpO1xuXG4gICAgcmV0dXJuIHsgaW1hZ2UsIG1ham9yLCBtaW5vciwgcmVhZE1vcmUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uUGFnZSgpIHtcbiAgICBjb25zdCBpbnNwaXJhdGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiaW5zcGlyYXRpb24vaW5zcGlyYXRpb24uc3ZnXCIpO1xuXG4gICAgY29uc3QgdGlsZXMgPSBbXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3l1bWllLmpwZ1wiLCBcIlRIRSBTVEFSVCBPRiBTT01FVEhJTkcgWVVNLUlFXCIsIFwiV2UgYWx3YXlzIHdhbnRlZCB0byBkZXNpZ24gY2hvY29sYXRlIGJhcnMgYW5kIGZpbmFsbHkgZGlkIGl0LiBJbnRyb2R1Y2luZyBvdXIgc3dlZXQgbmV3IGJyYW5kLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vd29yZHMtaWRlYXMuanBnXCIsIFwiU0hBUkUgU09NRSBERVNJR04gTE9WRVwiLCBcIlRoZSBpLmUuIGRlc2lnbiBwcm9tbyBqb3VybmFscyBlbmNvdXJhZ2UgY2xpZW50cyB0byBza2V0Y2ggdGhlaXIgYmlnIGlkZWFzIGFuZCBjYXB0dXJlIHRoZWlyIGRyZWFtcy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Nvb2staWUuanBnXCIsIFwiR09UVEEgTE9WRSBBIENPT0stSUVcIiwgXCJIb3cgYSBzZWNyZXQgcmVjaXBlIHdvcmtzIHRvIGJyaW5nIHJlbGF0aW9uc2hpcHMgdG8gYSB3aG9sZSBuZXcgbGV2ZWwuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9yZW1peC5qcGdcIiwgXCJSRU1JWFwiLCBcIkEgYmVoaW5kLXRoZS1zY2VuZXMgbG9vayBhdCBob3cgd2UgdHJhbnNmb3JtZWQgY2xhc3NpYyBtZW1vcnkgY2FycmllcnMgaW50byBvYmplY3RzIG9mIGFydC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2tyZW1wYS5wbmdcIiwgXCJSRUJSQU5ESU5HIEEgRkFNSUxZIEJVU0lORVNTXCIsIFwiQSByZWZyZXNoIGZvciBhIDUwLXllYXIgbGVnYWN5LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vZm90b3N0b3JpLmpwZ1wiLCBcIkJSQU5ESU5HIEZST00gVEhFIE5BTUUgVVBcIiwgXCJXaGVuIGEgY2xpZW50IGhhZCBhbiBpZGVhIGZvciBhIGJyYW5kIHNwaW5vZmYsIHdlIHRvb2sgaGVyIGNvbmNlcHQgdG8gcmVhbGl0eSBhbmQgbGF1bmNoZWQgdGhlIGJ1c2luZXNzIGluIGhpZ2ggc3R5bGUuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9pbnNwaXJlZC0yLWNyZWF0ZS5qcGdcIiwgXCJJTlNQSVJFRCAyIENSRUFURVwiLCBcIkEgcGFpbnRpbmcgaW5zcGlyZWQgYnkgdGhlIGkuZS4gZGVzaWduIGxvZ28gY29tYmluZXMgb2lsIHBhaW50cywgZ3JvdW5kIHVwIGNyYXlvbnMsIGFuZCBhIGxlZ28uXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mcm9tLWluc2lkZS5qcGdcIiwgXCJUSEUgVklFVyBGUk9NIElOU0lERVwiLCBcImkuZS4gZGVzaWduJ3MgbmV3IHN0dWRpbyB3YXMgMzAgeWVhcnMgaW4gdGhlIG1ha2luZy5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlY29ubmVjdGluZy5qcGdcIiwgXCJSRUNPTk5FQ1RJTkdcIiwgXCJIb3cgdW5jZXJ0YWluIHRpbWVzIGxlZCB0byBhIGhvbWVjb21pbmcgZm9yIGkuZS4gZGVzaWduJ3Mgc2VuaW9yIGRlc2lnbmVyLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vbmV3LXN0dWRpby5qcGdcIiwgXCJORVcgU1RVRElPLiBORVcgVklFVy5cIiwgXCJIb3cgdGhlIG5lZWQgZm9yIGluc3BpcmF0aW9uIGZ1ZWxlZCB0aGUgYnVpbGRpbmcgb2YgYSBzdHVkaW8uXCIpLFxuICAgIF07XG5cbiAgICBjb25zdCBzY3JvbGxQYWRkaW5nID0gYWRkU2Nyb2xsUGFkZGluZygpO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShpbnNwaXJhdGlvbiwgMC43NSk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBzdHlsZUluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBhbGlnbldpdGhHYXAoaW5zcGlyYXRpb24sIHRpbGVzWzBdLmltYWdlLCAwLjI1ICogcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoIC0gMTsgaSsrKSBhbGlnbldpdGhHYXAodGlsZXNbaV0uaW1hZ2UsIHRpbGVzW2kgKyAxXS5pbWFnZSwgMC4xICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCB0aWxlIG9mIHRpbGVzKSBhbGlnbkluc3BpcmF0aW9uVGlsZSh0aWxlKTtcblxuICAgICAgICBjb25zdCBsYXN0SW1hZ2UgPSB0aWxlc1t0aWxlcy5sZW5ndGggLSAxXS5pbWFnZTtcbiAgICAgICAgc2Nyb2xsUGFkZGluZy5zdHlsZS5sZWZ0ID0gcHgobGFzdEltYWdlLm9mZnNldExlZnQgKyBsYXN0SW1hZ2Uub2Zmc2V0V2lkdGggKyAwLjEgKiBzKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IFNDUk9MTF9URVhUX1dJRFRIX0hFSUdIVF9QUk9QT1JUSU9OIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgYWxpZ25pbmdXaXRoR2Fwc1ksIGlzTGFuZHNjYXBlLCBweCB9IGZyb20gXCIuLi9sYXlvdXRcIjtcclxuaW1wb3J0IHsgYXBwZW5kQ2hpbGRGb3JQYWdlLCByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuLi9wYWdlXCI7XHJcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxQYWRkaW5nLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlcldpdGhpblNjcm9sbFgsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgZ2V0U2Nyb2xsV2lkdGgsIHNjcm9sbENvbnRhaW5lciwgc3R5bGVTY3JvbGxUZXh0U3F1YXJlLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4uL3Njcm9sbFwiO1xyXG5pbXBvcnQgeyBmZXRjaFNWRyB9IGZyb20gXCIuLi91dGlsXCI7XHJcblxyXG5leHBvcnQgbGV0IGhvbWVBbmltYXRlZDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkSG9tZVNWRygpIHtcclxuICAgIGhvbWVBbmltYXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBob21lQW5pbWF0ZWQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBjb25zdCBob21lU3ZnID0gYXdhaXQgZmV0Y2hTVkcoXCJ2aWV3L2hvbWUuc3ZnXCIpO1xyXG4gICAgaG9tZUFuaW1hdGVkLmFwcGVuZENoaWxkKGhvbWVTdmcpO1xyXG5cclxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHMgKiAwLjk1O1xyXG4gICAgICAgICAgICBob21lU3ZnLnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodCk7XHJcbiAgICAgICAgICAgIGhvbWVBbmltYXRlZC5zdHlsZS50b3AgPSBweCgocyAtIGhlaWdodCkgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaG9tZVN2ZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFZpZXdQYWdlKCkge1xyXG4gICAgY29uc3QgaG9tZSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob21lLnN2Z1wiKTtcclxuICAgIGlmIChob21lQW5pbWF0ZWQpIGhvbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbiAgICBjb25zdCBob3Jpem9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2hvcml6b24uanBnXCIpO1xyXG4gICAgY29uc3QgZnJlc2hMb29rID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2ZyZXNoLWxvb2suc3ZnXCIpO1xyXG4gICAgY29uc3QgZ3JlYXRCcmFuZHMgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZ3JlYXQtYnJhbmRzLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMSA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJHUkVBVCBCUkFORFMgRE9OJ1QgSlVTVCBIQVBQRU5cIixcclxuICAgICAgICBcIlRoZXkgcmVxdWlyZSBleHBsb3JhdGlvbiwgaW5zaWdodCwgYW5kIHRlbmFjaXR5LiBXZSBodW50IGZvciB0aGF0IG1hZ2ljIHNwYXJrIHRoYXQgaWduaXRlcyBpbm5vdmF0aW9uLiBXZSBicmluZyBvdXIgZXh0ZW5zaXZlIHNraWxscyBhbmQgZXhwZXJpZW5jZSB0byBlYWNoIHByb2plY3QgYW5kIGdpdmUgaXQgb3VyIGFsbC4gVGhlIHJlc3VsdCBpcyBjbGVhciwgeWV0IGVsZXZhdGVkIGNvbW11bmljYXRpb24gdGhhdCBtYWtlcyBwZW9wbGUgc3RvcCwgdGhpbmssIGFuZCBvZnRlbiBzbWlsZS5cIixcclxuICAgICAgICBcIk91ciBzdHVkaW8gbG9jYXRpb24gaXMgcHJvZm91bmRseSBpbnNwaXJpbmcuIFRoZSBtYWduaWZpY2VudCB2aWV3IGZlZWRzIG91ciBzb3VscyBhbmQga2VlcHMgdXMgaW5zcGlyZWQgdG8gZG8gb3VyIGJlc3Qgd29yay4gSXQncyBhIHBsYWNlIHdoZXJlIGNyZWF0aXZlIHBlb3BsZSBjb21lIHRvZ2V0aGVyIHRvIGNvbGxhYm9yYXRlIGFuZCBkcmlsbCBkb3duIHRvIHRoZSBoZWFydCBvZiB0aGUgbWF0dGVyLiBUbyBzb2x2ZSBwcm9ibGVtcyBhbmQgYnJpbmcgaWRlYXMgdG8gbGlmZS4gVG8gY3JlYXRlIHRoaW5ncyB3b3J0aCByZW1lbWJlcmluZy5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IGluc2lnaHRDbGFyaXR5ID0gYWRkU2Nyb2xsSW1hZ2UoXCJ2aWV3L2luc2lnaHQtY2xhcml0eS5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTIgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgQlJJTkcgVklTSU9OLCBJTlNJR0hULCBBTkQgQ0xBUklUWSBUTyBFVkVSWSBQUk9KRUNUXCIsXHJcbiAgICAgICAgXCJTdWNjZXNzZnVsIGRlc2lnbiBzdGFydHMgd2l0aCBpZGVudGlmeWluZyBhIGNsaWVudCdzIG5lZWRzLCBnb2FscywgYW5kIGFzcGlyYXRpb25zLiBPdXIgb2JqZWN0aXZpdHkgc2hpbmVzIGxpZ2h0IG9uIHdoYXQgb3RoZXJzIGhhdmUgbWlzc2VkLiBXZSBoYXZlIHRoZSBhYmlsaXR5IHRvIHNlZSBhbmQgaW50ZXJwcmV0IHRoZSBpbm5lciB3b3JraW5ncywgY3VsdHVyZSwgYW5kIG51YW5jZXMgb2Ygb3VyIGNsaWVudCdzIHdvcmxkLiBXZSBhc2sgcXVlc3Rpb25zIOKAkyBsb3RzIG9mIHF1ZXN0aW9ucy4gVGhlbiBsaXN0ZW4gdW50aWwgd2UgZ2FpbiB0aGUgZGVlcCB1bmRlcnN0YW5kaW5nIG5lY2Vzc2FyeSB0byBidWlsZCB0aGUgc29saWQgZm91bmRhdGlvbiB0aGF0IGFueSBlbmR1cmluZyBicmFuZCBuZWVkcy5cIixcclxuICAgICAgICBcIk91ciBzbWFsbCBidXQgbWlnaHR5IHRlYW0gYnJpbmdzIHRvZ2V0aGVyIGEgd2lkZSByYW5nZSBvZiB0YWxlbnRzIGFuZCBwZXJzcGVjdGl2ZXMsIHBsdXMgYSBuaWNlIGxpc3Qgb2YgYXdhcmRzLiBXZSB0aHJvdyBvdXIgaGVhcnRzIGludG8gb3VyIHdvcmsgYW5kIGFyZSBrbm93biBmb3Igb3VyIGZpZXJjZSBjb21taXRtZW50IHRvIHRoZSB0cnVzdGVkLCBsb25nLXRlcm0gcGFydG5lcnNoaXBzIHdlIGZvcm0uIEZvciB1cywgaXQncyBwZXJzb25hbC5cIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNreXdhcmQgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvc2t5d2FyZC5qcGdcIik7XHJcbiAgICBjb25zdCB0ZXh0VGlsZTMgPSBhZGRTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgIFwiV0UgU0VFIFdPUksgSU4gQSBESUZGRVJFTlQgTElHSFRcIixcclxuICAgICAgICBcIlBlb3BsZSBsaWtlIHRvIGFzayBhYm91dCBvdXIgZGVzaWduIHByb2Nlc3MuIFRoZSB0cnV0aCBpcyB0aGF0IHRoZSBhcHByb2FjaCB0byBlYWNoIHByb2plY3QgdmFyaWVzLCBiZWNhdXNlIGVhY2ggY2xpZW50IGFuZCB0aGVpciBuZWVkcyBhcmUgdW5pcXVlLiBDcmVhdGl2ZSBicmVha3Rocm91Z2hzIGRvbid0IGZvbGxvdyB0aGUgY2xvY2suIFRoZXkgY2FuIGhhcHBlbiBhbnkgdGltZSBvZiBkYXkg4oCTIG9yIG5pZ2h0LiBXaGV0aGVyIGFuIGVwaXBoYW55IGlzIGlsbHVtaW5hdGVkIGluIGEgc2NyaWJibGUsIGEgZHJlYW0sIG9yIGFzIHRoZSBjbG91ZHMgcm9sbCBieSwgd2UgZW1icmFjZSB0aGUgZmFjdCB0aGF0IGVhY2ggcHJvamVjdCB0YWtlcyBvbiBhIGxpZmUgb2YgaXRzIG93bi5cIixcclxuICAgICAgICBcIldoYXQncyBjb25zdGFudCBpcyBvdXIgYWJpbGl0eSB0byBsaXN0ZW4gYW5kIGZvY3VzLCB0byBhbmFseXplIGFuZCBjb25uZWN0IGRvdHMsIGFuZCB0byByZW1haW4gY3VyaW91cy4gVGhlIG1vc3QgcmV3YXJkaW5nIHByb2plY3RzIGFyZSB3aXRoIGNsaWVudHMgd2hvIHZhbHVlIHRoZSBiYWxhbmNlIGJldHdlZW4gcHVzaGluZyBmb3J3YXJkIGFuZCBhbGxvd2luZyB0aW1lIGZvciB0aGUgcGVyZmVjdCBzb2x1dGlvbiB0byBlbWVyZ2UuIFRoYXQncyBvdXIgaGFwcHkgcGxhY2UuXCJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGV4dFRpbGVzID0gW3RleHRUaWxlMSwgdGV4dFRpbGUyLCB0ZXh0VGlsZTNdO1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBhZGRTY3JvbGxQYWRkaW5nKCk7XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IEhPTUVfSE9SSVpPTl9QQUQgPSAwLjI7XHJcbiAgICAgICAgY29uc3QgRlJFU0hfTE9PS19QQUQgPSAwLjEzO1xyXG4gICAgICAgIGNvbnN0IElNQUdFX1RFWFRfU1FVQVJFX1BBRCA9IDAuMTc7XHJcblxyXG4gICAgICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoZnJlc2hMb29rLCAwLjgpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWShpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFkoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcylcclxuICAgICAgICAgICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0VGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1goW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIEhPTUVfSE9SSVpPTl9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTMubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsUGFkZGluZyxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSBhbGlnblNjcm9sbFRleHRTcXVhcmUodGV4dFRpbGUsIDIwLCAyMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChob21lLCAwLjk1KTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChob3Jpem9uLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChmcmVzaExvb2ssIDAuODUpO1xyXG4gICAgICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxYKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWChpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKVxyXG4gICAgICAgICAgICAgICAgc3R5bGVTY3JvbGxUZXh0U3F1YXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRUaWxlLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogNCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA4ICogcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgVEVYVF9USUxFX1dJRFRIID0gMC44NTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB0ZXh0VGlsZSBvZiB0ZXh0VGlsZXMpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlcldpdGhpblNjcm9sbFgodGV4dFRpbGUubWFqb3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgY2VudGVyV2l0aGluU2Nyb2xsWChtaW5vciwgVEVYVF9USUxFX1dJRFRIKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgTU9CSUxFX1BBRCA9IDAuMDg7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtb2JpbGVUaWxlKHRleHRUaWxlOiBUZXh0U3F1YXJlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gW3RleHRUaWxlLm1ham9yLCAwLjAgKiBzXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWlub3Igb2YgdGV4dFRpbGUubWlub3JzKSB4LnB1c2goMC4wNCAqIHMsIG1pbm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0gYWxpZ25pbmdXaXRoR2Fwc1koW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZnJlc2hMb29rLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBncmVhdEJyYW5kcyxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTEpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTIpLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBza3l3YXJkLFxyXG4gICAgICAgICAgICAgICAgTU9CSUxFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICAuLi5tb2JpbGVUaWxlKHRleHRUaWxlMyksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHNjcm9sbFBhZGRpbmcsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHNwYWNlVG9GaWxlIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB7IGJvZHkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbmluZ1dpdGhHYXBzWCwgcHggfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhcHBlbmRDaGlsZEZvclBhZ2UsIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nLCBwYWdlQ2xlYW51cHMsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0IH0gZnJvbSBcIi4uL3BhZ2VcIjtcbmltcG9ydCB7IFRleHRTcXVhcmUsIGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlcldpdGhpblNjcm9sbFksIGdldFNjcm9sbEhlaWdodCwgc2Nyb2xsQ29udGFpbmVyLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2Nyb2xsXCI7XG5pbXBvcnQgeyBTaWduYWwsIGVmZmVjdCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IFNwcmluZywgYW5pbWF0ZVNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcblxuaW50ZXJmYWNlIFdvcmtDb250ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZ1tdO1xufVxuXG5pbnRlcmZhY2UgV29ya0l0ZW0ge1xuICAgIHRleHRTcXVhcmU6IFRleHRTcXVhcmU7XG4gICAgaW1hZ2UxOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIGltYWdlMjogSFRNTEltYWdlRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIFdvcmtUYWIge1xuICAgIHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc3ByaW5nOiBTcHJpbmc7XG4gICAgc3ByaW5nU2lnOiBTaWduYWw7XG4gICAgd29ya0l0ZW06IFdvcmtJdGVtO1xufVxuXG5jb25zdCB3b3JrQ29udGVudHM6IFdvcmtDb250ZW50W10gPSBbXG4gICAge1xuICAgICAgICBuYW1lOiBcImJlcnd5blwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJIYXZpbmcgc3BlbnQgaGlzIGVudGlyZSBjaGlsZGhvb2QgbWFraW5nIGZpbG1zLCB0aGlzIGNvbXBhbnkncyBmb3VuZGVyIG5hbWVkIGhpcyBhZ2VuY3kgYWZ0ZXIgdGhlIHN0cmVldCBvbiB3aGljaCBoZSB3YXMgcmFpc2VkLiBXaXRoIGEgaGlzdG9yeSBsaWtlIHRoYXQsIHdlIGhhZCB0byBlbGV2YXRlIEJlcnd5biB0byBsYW5kbWFyayBzdGF0dXMuIFVzaW5nIGN1c3RvbSBwaG90b2dyYXBoeSBhbmQgbWFzdGVyIG1hbmlwdWxhdGlvbiwgd2UgY3JlYXRlZCBhIGZsZXhpYmxlIHN0aWNrZXIgc3lzdGVtIHRoYXQgaXMgaW50ZXJjaGFuZ2VhYmxlIHdpdGggbXVsdGktY29sb3JlZCBwYXBlciBzdG9ja3MuIEVtcGxveWVlcyBhcmUgZW5jb3VyYWdlZCB0byBkZXNpZ24gdGhlaXIgb3duIGNvbW11bmljYXRpb25zIGFuZCBnZXQgYSBjb21wbGV0ZSBzZXJpZXMgb2YgYXdhcmQtd2lubmluZyBidXNpbmVzcyBjYXJkcyB0byBjaG9vc2UgZnJvbS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEZpbG0sIFRlbGV2aXNpb24sIFZpZGVvIFByb2R1Y3Rpb25cIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJrMiBrcnVwcFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIGF3YXJkLXdpbm5pbmcsIE5ldyBZb3JrIENpdHkgcHVibGljIHJlbGF0aW9ucyBhbmQgbWFya2V0aW5nIGFnZW5jeSBoYXMgYSBzdWNjZXNzZnVsIHRyYWNrIHJlY29yZCBpbiBpZ25pdGluZyBicmFuZHMgZnJvbSBzdGFydC11cHMsIG5ldyBhdXRob3JzLCBhbmQgY2VsZWJyaXRpZXMgYnkgY29ubmVjdGluZyB0aGVtIHdpdGggY3VsdHVyYWwgdHJlbmRzIGFuZCBpbmZsdWVuY2Vycy4gV2hlbiBpdCBjYW1lIHRvIHJlcHJlc2VudGluZyB0aGVpciBicmFuZCwgSzIgY2FtZSB0byB1cy4gQm9sZCwgdmlicmFudCwgYW5kIGR5bmFtaWMsIHRoaXMgdGltZWxlc3MgaWRlbnRpdHkgc3lzdGVtIHJlZmxlY3RzIHRoZSBmb3VuZGVyJ3MgZmF2b3JpdGUgY29sb3IgYW5kIHRoZSBjb21wYW55J3MgZW5lcmdldGljIGN1bHR1cmUgYW5kIGVudmlyb25tZW50LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogUHVibGljIFJlbGF0aW9ucyAmIE1hcmtldGluZyBmb3IgTWVkaWFcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3aHltXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFmdGVyIHN1Y2Nlc3NmdWxseSBicmFuZGluZyB0aGVpciBmaXJzdCBlYXRlcnksIHRoaXMgY2xpZW50IHJldHVybmVkIHRvIHVzIHRvIHJlYWxpemUgdGhlaXIgZHJlYW0gb2YgYW4gdXBzY2FsZSwgVXBwZXIgV2VzdCBTaWRlIGVhdGluZyBkZXN0aW5hdGlvbi5cIixcbiAgICAgICAgICAgIFwiVGhlIGN1c3RvbSBsZXR0ZXJmb3JtIGlzIGEgd2hpbXNpY2FsIHBsYXkgb24gdGhlaXIgdW5pcXVlIHNwZWxsaW5nIGFuZCBjYW4gcmVhZCB1cHNpZGUgZG93bi4gVGhlIHZpYnJhbnQgY29sb3IgcGFsZXR0ZSB3YXMgZGV2ZWxvcGVkIGluIHBhcnRuZXJzaGlwIHdpdGggdGhlIGludGVyaW9yIGFyY2hpdGVjdHVyZSB0ZWFtIHRvIGNyZWF0ZSBhIHdhcm0gYW5kIGV4Y2l0aW5nIGF0bW9zcGhlcmUuIFRoZSBjdXN0b20gZGllLWN1dCBlZGdlIG9mIHRoZSBpZGVudGl0eSBzeXN0ZW0gbWltaWNzIHRoZSBjdXJ2ZSBvZiB0aGUgdW5pcXVlLCBzaG93Y2FzZSBiYXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBSZXN0YXVyYW50ICYgQmFyXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYW5uIHN1bGxpdmFuXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkFubiBkcmVhbWVkIG9mIGJlaW5nIOKAnHRoZSBPcHJhaOKAnSBvZiBvcmdhbml6aW5nLiBXZSBlc3RhYmxpc2hlZCBoZXIgbmFtZSBhcyB0aGUgYnJhbmQgYW5kIGNyZWF0ZWQgYSB0YWdsaW5lLCB3aGljaCByZWZsZWN0ZWQgdGhlIHBlYWNlIG9mIG1pbmQgdGhhdCBoZXIgY2xpZW50cyBnZXQgZnJvbSBoYXZpbmcgYW5kIG1haW50YWluaW5nIGFuIG9yZ2FuaXplZCBsaWZlLiBUaGUgc2ltcGxlIGljb24gc2VyaWVzIHJlcHJlc2VudHMgZWFjaCBhcmVhIG9mIGV4cGVydGlzZS4gQXMgdGhlIGNvbXBhbnkncyBzZXJ2aWNlcyBoYXZlIGV4cGFuZGVkIG92ZXIgdGhlIHllYXJzLCB0aGUgaWRlbnRpdHkgc3lzdGVtIGhhcyBldm9sdmVkIGFsb25nIHdpdGggaXQgYW5kIHJlbWFpbnMgYXMgZnJlc2ggYXMgaXQgd2FzIGRheSBvbmUuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQcm9mZXNzaW9uYWwgT3JnYW5pemluZ1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImxvYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIHByb2Zlc3Npb25hbCBtYWtlLXVwIGFydGlzdCB0ZWFtIGNhbWUgdG8gdXMgdG8gYnJhbmQgdGhlaXIgcGF0ZW50ZWQg4oCcd2F0ZXJzbGlkZeKAnSBleWUgcGVuY2lsLiBDb2xvciBuYW1lcyBsaWtlIOKAnEdpdmluZyBCYWNrIEJsYWNrLOKAnSByZWZsZWN0IHRoZSBjb21wYW55J3MgY29tbWl0bWVudCB0byBwcm92aWRpbmcgbWFrZW92ZXJzIGZvciB3b21lbiBmYWNpbmcgaGVhbHRoIGNoYWxsZW5nZXMuIFRoZSBwbGF5ZnVsIHBhY2thZ2luZyBlbGV2YXRlcyBhIHN0YXBsZSBwcm9kdWN0IHRvIGdpZnQgd29ydGh5IGFuZCBnZW5lcmF0ZXMgYXR0ZW50aW9uIGluIGEgc2F0dXJhdGVkIG1hcmtldCBieSBmbHlpbmcgYWJvdmUgaXRzIGRpc3BsYXkgY2FzZS4gVGhlIG1vdGlmIGhvbGRzIHNwZWNpYWwgbWVhbmluZyBmb3IgdGhlIGZvdW5kZXIgd2hvIHNoYXJlZCB3aXRoIHVzIHRoYXQgdGhlIGJ1dHRlcmZseSBpcyBhIHNpZ24gdGhhdCBoZXIgYmVsb3ZlZCBtb3RoZXIgaXMgc3RpbGwgd2l0aCBoZXIuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBCZWF1dHkgJiBDb3NtZXRpY3NcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJ3ZXRcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGhpcyBNYXN0ZXIgQXJjaGl0ZWN0IGFuZCB3b3JsZC1yZW5vd25lZCBzcGEgZGVzaWduZXIgdXNlZCBoaXMgcmVwdXRhdGlvbiBhbmQgZXhwZXJ0aXNlIGluIGh5ZHJvdGhlcmFweSB0byBsYXVuY2ggYW4gZXhjbHVzaXZlIHByb2R1Y3QgbGluZSBmb3IgbHV4dXJ5IGhvdGVscyBhbmQgcmVzb3J0cy4gQSBzb290aGluZywgbXV0ZWQgY29sb3IgcGFsZXR0ZSB3YXMgZGVzaWduZWQgdG8gcmVmbGVjdCB0aGUgc2NlbnQgcHJvZmlsZSBvZiBlYWNoIHNlcmllcyBvZiBzY3J1YnMgYW5kIGxvdGlvbnMuIEF1dGhlbnRpYyB3YXRlciBzcGxhc2ggcGhvdG9ncmFwaHkgc2V0IHRoZSB0b25lIHRvIHByb21vdGUgdGhlIGhlYWx0aCBiZW5lZml0cyBhbmQgYXJ0IG9mIGJhdGhpbmcuIFRoZSBwYWNrYWdlIGRlc2lnbiBleHBhbmRlZCB0byBnaWZ0IGFuZCB0cmF2ZWwgc2V0cyB0aGF0IGludml0ZSBndWVzdHMgdG8gdGFrZSB0aGUgbHV4dXJ5IGV4cGVyaWVuY2UgaG9tZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEhlYWx0aCAmIFdlbGxuZXNzIFNwYXNcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJmZXJyYWdhbW9cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiVGFza2VkIHdpdGggbWFya2V0aW5nIG9mZmljZSBzcGFjZSBhYm92ZSB0aGlzIGx1eHVyeSBicmFuZCdzIEZpZnRoIEF2ZW51ZSBmbGFnc2hpcCwgd2UgZmFjZWQgdGhlIGNoYWxsZW5nZSBvZiBhbiB1bmtub3duLCBzaWRlIHN0cmVldCBlbnRyYW5jZS4gSGFuZGVkIG5vdGhpbmcgbW9yZSB0aGFuIGFuIGFyY2hpdGVjdCdzIHJlbmRlcmluZywgd2UgZWxlZ2FudGx5IGJyYW5kZWQgdGhlIGFkZHJlc3MsIGNhcHR1cmVkIHRoZSBlbmVyZ3kgb2YgdGhlIGxvY2F0aW9uLCBhbmQgZ2VuZXJhdGVkIGVub3VnaCBidXp6IHRvIGV4cGFuZCB0aGUgdmlld2luZyBwYXJ0eSB0byB0d28gZGF0ZXMgYnkgbHVyaW5nIGJyb2tlcnMgd2l0aCB0aGUgcHJvbWlzZSBvZiBhIEZlcnJhZ2FtbyB0aWUuIFRoZSByZXN1bHRzIHdlcmUgYSBxdWljayBjbG9zaW5nIGFuZCBhIGZlYXR1cmUgYXJ0aWNsZSBpbiBDcmFpbidzIE5ZIEJ1c2luZXNzIGNpdGluZyBvdXIgaW5ub3ZhdGlvbiBhbmQgc3VjY2VzcyBpbiBhIGNoYWxsZW5naW5nIHJlYWwgZXN0YXRlIG1hcmtldC5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cmllczogTHV4dXJ5IEZhc2hpb24sIFJlYWwgRXN0YXRlXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbl07XG5cbmZ1bmN0aW9uIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzOiBXb3JrVGFiW10pIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcbiAgICAgICAgICAgIHdvcmtJdGVtLnRleHRTcXVhcmUsXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOSAqIHMgfSxcbiAgICAgICAgICAgIHsgbGV0dGVyU3BhY2luZzogMC4yLCBmb250V2VpZ2h0OiAzMDAsIGNvbG9yOiBcIiMzMzMzMzNcIiwgZm9udFNpemU6IDAuMDMgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cbiAgICAgICAgKTtcbiAgICAgICAgY2VudGVyV2l0aGluU2Nyb2xsWSh3b3JrSXRlbS5pbWFnZTEsIDEpO1xuICAgICAgICBjZW50ZXJXaXRoaW5TY3JvbGxZKHdvcmtJdGVtLmltYWdlMiwgMSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnM6IFdvcmtUYWJbXSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgIGNvbnN0IHsgd29ya0l0ZW0gfSA9IHdvcmtUYWI7XG4gICAgICAgIGl0ZW1zLnB1c2goXG4gICAgICAgICAgICB3b3JrSXRlbS50ZXh0U3F1YXJlLm1ham9yLCAvL1xuICAgICAgICAgICAgMC4yICogcyxcbiAgICAgICAgICAgIHdvcmtJdGVtLmltYWdlMSxcbiAgICAgICAgICAgIDAuMTUgKiBzLFxuICAgICAgICAgICAgd29ya0l0ZW0uaW1hZ2UyLFxuICAgICAgICAgICAgMC4yMiAqIHNcbiAgICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IGFsaWduaW5nV2l0aEdhcHNYKGl0ZW1zKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZSwgMC4wMSAqIHMsIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFdvcmtQYWdlKCkge1xuICAgIGNvbnN0IHdvcmtUYWJzOiBXb3JrVGFiW10gPSBbXTtcblxuICAgIC8vIGZ1bmN0aW9uIHRhYkFsaWdubWVudCh0YWJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgLy8gICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGFiRWxlbWVudFNpemUodGFiRWxlbWVudCk7XG5cbiAgICAvLyAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAgIGNlbnRlcmVkOiAoKSA9PiAoaW5uZXJIZWlnaHQgLSBoZWlnaHQpIC8gMixcbiAgICAvLyAgICAgICAgIGhhbGZTcXVhcmU6ICgpID0+IGlubmVySGVpZ2h0IC0gd2lkdGggLyAyLFxuICAgIC8vICAgICAgICAgc3F1YXJlOiAoKSA9PiBpbm5lckhlaWdodCAtIHdpZHRoLFxuICAgIC8vICAgICB9O1xuICAgIC8vIH1cblxuICAgIChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwibm9uZVwiO1xuICAgIHBhZ2VDbGVhbnVwcy5hZGQoKCkgPT4gKChzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJXaWR0aCA9IFwiXCIpKTtcblxuICAgIGxldCB0YWJzU2hvd2luZyA9IHRydWU7XG4gICAgbGV0IGN1cnJlbnRXb3JrSXRlbTogV29ya0l0ZW0gfCB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtDb250ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcblxuICAgICAgICBjb25zdCB0YWJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgdGFiRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdGFiRWxlbWVudC5zcmMgPSBgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS90YWIucG5nYDtcbiAgICAgICAgYXdhaXRMYXlvdXRGb3JJbWFnZUxvYWRpbmcodGFiRWxlbWVudCk7XG4gICAgICAgIGFwcGVuZENoaWxkRm9yUGFnZShib2R5LCB0YWJFbGVtZW50KTtcblxuICAgICAgICBjb25zdCBzcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgICAgICBjb25zdCBzcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCgzMDApO1xuXG4gICAgICAgIGxldCBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGFiUG9zaXRpb25zKCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0U3ByaW5nVGFyZ2V0KHRhcmdldDogbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtUYWIuc3ByaW5nLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyh3b3JrVGFiLnNwcmluZywgd29ya1RhYi5zcHJpbmdTaWcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YWJzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkKSBzZXRTcHJpbmdUYXJnZXQoMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzZXRTcHJpbmdUYXJnZXQoMjAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3ZlcmVkIHx8IGN1cnJlbnRXb3JrSXRlbSA9PT0gd29ya1RhYi53b3JrSXRlbSkgc2V0U3ByaW5nVGFyZ2V0KDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2V0U3ByaW5nVGFyZ2V0KDQwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGlzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpc0hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZVRhYlBvc2l0aW9ucygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIG9uRmlyc3RDbGljaygpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya1RhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrQ29udGVudCA9IHdvcmtDb250ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0U3F1YXJlID0gYWRkU2Nyb2xsVGV4dFNxdWFyZSh3b3JrQ29udGVudC5uYW1lLnRvVXBwZXJDYXNlKCksIC4uLndvcmtDb250ZW50LmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZTEgPSBhZGRTY3JvbGxJbWFnZShgd29yay8ke3NwYWNlVG9GaWxlKHdvcmtDb250ZW50Lm5hbWUpfS8xLmpwZ2ApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlMiA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzIuanBnYCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrVGFic1tpXS53b3JrSXRlbSA9IHsgdGV4dFNxdWFyZSwgaW1hZ2UxLCBpbWFnZTIgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgd29ya1RhYiBvZiB3b3JrVGFicykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SW1hZ2UgPSB3b3JrVGFiLndvcmtJdGVtLmltYWdlMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0IDwgbGFzdEltYWdlLm9mZnNldExlZnQgKyBsYXN0SW1hZ2Uub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXb3JrSXRlbSA9IHdvcmtUYWIud29ya0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RXb3JrVGFiKHdvcmtUYWI6IFdvcmtUYWIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdvcmtUYWIud29ya0l0ZW0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IHNjcm9sbFBvc2l0aW9uLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrVGFiIG9mIHdvcmtUYWJzKSB3b3JrVGFiLnRhYkVsZW1lbnQub25jbGljayA9ICgpID0+IHNlbGVjdFdvcmtUYWIod29ya1RhYik7XG5cbiAgICAgICAgICAgIHRhYnNTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVUYWJQb3NpdGlvbnMoKTtcblxuICAgICAgICAgICAgYXdhaXQgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0eWxlV29ya0l0ZW1zKHdvcmtUYWJzKTtcbiAgICAgICAgICAgICAgICBsYXlvdXRXb3JrSXRlbXMod29ya1RhYnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGVjdFdvcmtUYWIod29ya1RhYnNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbmNsaWNrID0gb25GaXJzdENsaWNrO1xuXG4gICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgLy8gc3ByaW5nLnBvc2l0aW9uID0gaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAvLyBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgfSwgODAgKiBpKTtcbiAgICAgICAgcGFnZUNsZWFudXBzLmFkZCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcblxuICAgICAgICB3b3JrVGFicy5wdXNoKHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcsIHdvcmtJdGVtOiB1bmRlZmluZWQgfSk7XG5cbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudG9wID0gcHgoc3ByaW5nLnBvc2l0aW9uKTtcbiAgICAgICAgfSwgW3NwcmluZ1NpZ10pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAzMDA7XG4gICAgICAgIGNvbnN0IGVuZCA9IGlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgY29uc3QgYW55VGFiRWxlbWVudCA9IHdvcmtUYWJzWzBdLnRhYkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrVGFicy5sZW5ndGggKiAyIC0gMSk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogKGFueVRhYkVsZW1lbnQubmF0dXJhbEhlaWdodCAvIGFueVRhYkVsZW1lbnQubmF0dXJhbFdpZHRoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYkVsZW1lbnQgfSA9IHdvcmtUYWJzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHRMb3dlckxpbWl0ID0gaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaGVpZ2h0TG93ZXJMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGhlaWdodExvd2VyTGltaXQpO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChoZWlnaHRMb3dlckxpbWl0ICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmtUYWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3b3JrVGFic1tpXS50YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBib2R5LCBib2R5U2lnLCBmYWRlSW5BbmltYXRpb24sIGdyYXksIGllQmx1ZSwgaWVHcmVlbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYWxpZ25pbmdXaXRoR2Fwc1ksIGNlbnRlckVsZW1lbnRYLCBjZW50ZXJFbGVtZW50WSwgaXNMYW5kc2NhcGUsIHB4LCBzZXRIZWlnaHQsIHNldFdpZHRoLCBzdHlsZVRleHQsIFRleHREZXRhaWxzIH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gXCIuL21vZGFsXCI7XG5pbXBvcnQgeyBhcHBlbmRDaGlsZEZvclBhZ2UsIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nLCByZWdpc3RlclVwZGF0ZUxheW91dCB9IGZyb20gXCIuL3BhZ2VcIjtcbmltcG9ydCB7IGVmZmVjdCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuaW1wb3J0IHsgY3JlYXRlSWNvblNWRywgbWFrZUxpbmUsIG1ha2VQb2x5bGluZSwgc2V0QXR0cmlidXRlcyB9IGZyb20gXCIuL3V0aWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0U3F1YXJlIHtcbiAgICBtYWpvcjogSFRNTEVsZW1lbnQ7XG4gICAgbWlub3JzOiBIVE1MRWxlbWVudFtdO1xufVxuXG5leHBvcnQgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnNjcm9sbENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsQ29udGFpbmVyKTtcbihzY3JvbGxDb250YWluZXIuc3R5bGUgYXMgYW55KS5zY3JvbGxiYXJDb2xvciA9IGAke2llR3JlZW59ICR7aWVCbHVlfTU1YDtcblxuc2Nyb2xsQ29udGFpbmVyLm9ud2hlZWwgPSAoZSkgPT4ge1xuICAgIGlmIChpc0xhbmRzY2FwZSgpICYmICFlLnNoaWZ0S2V5KSBzY3JvbGxDb250YWluZXIuc2Nyb2xsQnkoeyBsZWZ0OiBlLmRlbHRhWSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRIZWFkZXJCYXJIZWlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgcmV0dXJuIChpbm5lckhlaWdodCAtIGdldFNjcm9sbEhlaWdodCgpKSAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlubmVySGVpZ2h0ICogMC4xO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxQYWRkaW5nKCkge1xuICAgIGNvbnN0IHNjcm9sbFBhZGRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNjcm9sbFBhZGRpbmcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsUGFkZGluZy5zdHlsZS53aWR0aCA9IHB4KDEpOyAvLyBhbnkgbm9uemVybyB0aGlja25lc3MgaXMgZW5vdWdoIHRvIGV4dGVuZCBzY3JvbGxDb250YWluZXJcbiAgICBzY3JvbGxQYWRkaW5nLnN0eWxlLmhlaWdodCA9IHB4KDEpO1xuICAgIGFwcGVuZENoaWxkRm9yUGFnZShzY3JvbGxDb250YWluZXIsIHNjcm9sbFBhZGRpbmcpO1xuICAgIHJldHVybiBzY3JvbGxQYWRkaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW1hZ2Uoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsSW1hZ2Uuc3JjID0gc3JjO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuXG4gICAgc2Nyb2xsSW1hZ2Uub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYmlnSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBiaWdJbWFnZS5zcmMgPSBzcmM7XG4gICAgICAgIGJpZ0ltYWdlLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICBiaWdJbWFnZS5zdHlsZS5maWx0ZXIgPSBgZHJvcC1zaGFkb3coMHB4IDBweCAxNXB4ICR7aWVCbHVlfSlgO1xuXG4gICAgICAgIGNvbnN0IHN6ID0gNjA7XG4gICAgICAgIGNvbnN0IGV4aXRCdXR0b24gPSBjcmVhdGVJY29uU1ZHKHN6KTtcbiAgICAgICAgY29uc3QgbWFrZUV4aXRCdXR0b25MaW5lID0gbWFrZUxpbmUoZXhpdEJ1dHRvbiwgMTIpO1xuICAgICAgICBjb25zdCBleGl0QnV0dG9uTGluZTEgPSBtYWtlRXhpdEJ1dHRvbkxpbmUoKTtcbiAgICAgICAgY29uc3QgZXhpdEJ1dHRvbkxpbmUyID0gbWFrZUV4aXRCdXR0b25MaW5lKCk7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoZXhpdEJ1dHRvbkxpbmUxLCB7IHgxOiAwLCB5MTogMCwgeDI6IHN6LCB5Mjogc3ogfSk7XG4gICAgICAgIHNldEF0dHJpYnV0ZXMoZXhpdEJ1dHRvbkxpbmUyLCB7IHgxOiAwLCB5MTogc3osIHgyOiBzeiwgeTI6IDAgfSk7XG4gICAgICAgIGV4aXRCdXR0b24uc3R5bGUuc3Ryb2tlID0gZ3JheTtcblxuICAgICAgICBjb25zdCBmdWxsc2NyZWVuQnV0dG9uID0gY3JlYXRlSWNvblNWRyhzeik7XG4gICAgICAgIGNvbnN0IG1ha2VGdWxsc2NyZWVuQnV0dG9uUG9seWxpbmUgPSBtYWtlUG9seWxpbmUoZnVsbHNjcmVlbkJ1dHRvbiwgMTIpO1xuICAgICAgICBjb25zdCBmdWxsc2NyZWVuQnV0dG9uUG9seWxpbmUxID0gbWFrZUZ1bGxzY3JlZW5CdXR0b25Qb2x5bGluZSgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvUG9seWxpbmUobGlzdDogbnVtYmVyW11bXSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QubWFwKChwb2ludCkgPT4gcG9pbnQuam9pbihcIixcIikpLmpvaW4oXCIgXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0QXR0cmlidXRlcyhmdWxsc2NyZWVuQnV0dG9uUG9seWxpbmUxLCB7XG4gICAgICAgICAgICBwb2ludHM6IHRvUG9seWxpbmUoW1xuICAgICAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgICAgICBbMCwgc3pdLFxuICAgICAgICAgICAgICAgIFtzeiwgc3pdLFxuICAgICAgICAgICAgXSksXG4gICAgICAgIH0pO1xuICAgICAgICBmdWxsc2NyZWVuQnV0dG9uLnN0eWxlLnN0cm9rZSA9IGdyYXk7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VNb2RhbCA9IG5ldyBNb2RhbChcbiAgICAgICAgICAgIFwiI2ZmZmZmZmVlXCIsXG4gICAgICAgICAgICAoYmFja2Ryb3ApID0+IHtcbiAgICAgICAgICAgICAgICBiYWNrZHJvcC5hcHBlbmRDaGlsZChiaWdJbWFnZSk7XG4gICAgICAgICAgICAgICAgYmFja2Ryb3AuYXBwZW5kQ2hpbGQoZXhpdEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgYmFja2Ryb3AuYXBwZW5kQ2hpbGQoZnVsbHNjcmVlbkJ1dHRvbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHRpbWUpID0+IHtcbiAgICAgICAgICAgICAgICBiaWdJbWFnZS5zdHlsZS5vcGFjaXR5ID0gdGltZSArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge31cbiAgICAgICAgKTtcbiAgICAgICAgaW1hZ2VNb2RhbC5iZWdpbk9wZW4oKTtcbiAgICAgICAgZXhpdEJ1dHRvbi5vbmNsaWNrID0gaW1hZ2VNb2RhbC5iZWdpbkNsb3NlO1xuICAgICAgICBmdWxsc2NyZWVuQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBiaWdJbWFnZS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuXG4gICAgICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpemUgPSAxNTtcbiAgICAgICAgICAgIGNvbnN0IGZyb21FZGdlID0gMTU7XG5cbiAgICAgICAgICAgIGV4aXRCdXR0b24uc3R5bGUud2lkdGggPSBweChzaXplKTtcbiAgICAgICAgICAgIGV4aXRCdXR0b24uc3R5bGUuaGVpZ2h0ID0gcHgoc2l6ZSk7XG4gICAgICAgICAgICBleGl0QnV0dG9uLnN0eWxlLmxlZnQgPSBweChpbm5lcldpZHRoIC0gc2l6ZSAtIGZyb21FZGdlKTtcbiAgICAgICAgICAgIGV4aXRCdXR0b24uc3R5bGUudG9wID0gcHgoZnJvbUVkZ2UpO1xuXG4gICAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uLnN0eWxlLndpZHRoID0gcHgoc2l6ZSk7XG4gICAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uLnN0eWxlLmhlaWdodCA9IHB4KHNpemUpO1xuICAgICAgICAgICAgZnVsbHNjcmVlbkJ1dHRvbi5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAtIHNpemUgLSBmcm9tRWRnZSAtIHNpemUgKiAyKTtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5CdXR0b24uc3R5bGUudG9wID0gcHgoZnJvbUVkZ2UpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBpbm5lckhlaWdodCAqIDAuOTtcbiAgICAgICAgICAgIHNldEhlaWdodChiaWdJbWFnZSwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnN0IG1pbldpZHRoID0gaW5uZXJXaWR0aCAqIDAuOTtcbiAgICAgICAgICAgIGlmIChiaWdJbWFnZS5vZmZzZXRXaWR0aCA+IG1pbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgc2V0V2lkdGgoYmlnSW1hZ2UsIG1pbldpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbnRlckVsZW1lbnRYKGJpZ0ltYWdlKTtcbiAgICAgICAgICAgIGNlbnRlckVsZW1lbnRZKGJpZ0ltYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGF3YWl0TGF5b3V0Rm9ySW1hZ2VMb2FkaW5nKHNjcm9sbEltYWdlKTtcbiAgICBhcHBlbmRDaGlsZEZvclBhZ2Uoc2Nyb2xsQ29udGFpbmVyLCBzY3JvbGxJbWFnZSk7XG4gICAgcmV0dXJuIHNjcm9sbEltYWdlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsVGV4dCh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBzY3JvbGxUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc2Nyb2xsVGV4dC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIHNjcm9sbFRleHQuc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XG4gICAgYXBwZW5kQ2hpbGRGb3JQYWdlKHNjcm9sbENvbnRhaW5lciwgc2Nyb2xsVGV4dCk7XG4gICAgcmV0dXJuIHNjcm9sbFRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0U3F1YXJlKG1ham9yVGV4dDogc3RyaW5nLCAuLi5taW5vclRleHRzOiBzdHJpbmdbXSk6IFRleHRTcXVhcmUge1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9ycyA9IG1pbm9yVGV4dHMubWFwKGFkZFNjcm9sbFRleHQpO1xuICAgIHJldHVybiB7IG1ham9yLCBtaW5vcnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JUZXh0RGV0YWlsczogVGV4dERldGFpbHMsIG1pbm9yVGV4dERldGFpbHM6IFRleHREZXRhaWxzKSB7XG4gICAgc3R5bGVUZXh0KG1ham9yLCBtYWpvclRleHREZXRhaWxzKTtcbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykgc3R5bGVUZXh0KG1pbm9yLCBtaW5vclRleHREZXRhaWxzKTtcbn1cblxuZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICBjb25zdCB4ID0gMjgwO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICBjb25zdCB1bmRlclNjcm9sbENvbnRhaW5lciA9IChpbm5lckhlaWdodCAtIHNjcm9sbEhlaWdodCkgLyAyO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcHgoc2Nyb2xsSGVpZ2h0ICsgdW5kZXJTY3JvbGxDb250YWluZXIpOyAvLyBwbGFjZSBzY3JvbGwgYmFyIGF0IGJvdHRvbSBvZiBwYWdlXG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KGlubmVyV2lkdGggLSB4KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KChpbm5lckhlaWdodCAtIHNjcm9sbEhlaWdodCkgLyAyKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCh4KTtcblxuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJzY3JvbGxcIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gZ2V0U2Nyb2xsV2lkdGgoKTtcbiAgICAgICAgY29uc3QgaGVhZGVyQmFySGVpZ2h0ID0gZ2V0SGVhZGVyQmFySGVpZ2h0KCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KHNjcm9sbFdpZHRoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0IC0gaGVhZGVyQmFySGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHNjcm9sbFdpZHRoKSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoaGVhZGVyQmFySGVpZ2h0KTtcblxuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJoaWRkZW5cIjtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxMZWZ0ID0gMDtcbiAgICB9XG59LCBbYm9keVNpZ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0KCkge1xuICAgIC8vIHJldHVybiBpbm5lckhlaWdodCAqIDAuNztcbiAgICByZXR1cm4gMS4wMiAqIGlubmVySGVpZ2h0IC0gMC4wMDA0ODUgKiBpbm5lckhlaWdodCAqIGlubmVySGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGgoKSB7XG4gICAgY29uc3QgU0NST0xMX1dJRFRIX1BST1BPUlRJT04gPSAxO1xuICAgIHJldHVybiBpbm5lcldpZHRoICogU0NST0xMX1dJRFRIX1BST1BPUlRJT047XG59XG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IGFsaWduaW5nV2l0aEdhcHNZKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlcldpdGhpblNjcm9sbFkoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcyAqIHNjYWxlO1xuICAgIHNldEhlaWdodChlbGVtZW50LCBoZWlnaHQpO1xuICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoKHMgLSBoZWlnaHQpIC8gMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJXaXRoaW5TY3JvbGxYKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbFdpZHRoKCk7XG4gICAgY29uc3Qgd2lkdGggPSBzICogc2NhbGU7XG4gICAgc2V0V2lkdGgoZWxlbWVudCwgd2lkdGgpO1xuICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KChzIC0gd2lkdGgpIC8gMik7XG59XG4iLCJleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgIHN1YnNjcmliZXJzID0gbmV3IFNldDwoKSA9PiB2b2lkPigpO1xyXG5cclxuICAgIHN1YnNjcmliZSA9IChzdWJzY3JpYmVyOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5hZGQoc3Vic2NyaWJlcik7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHMoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVuc3Vic2NyaWJlID0gKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpID0+IHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmRlbGV0ZShzdWJzY3JpYmVyKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZmZlY3QoZnVuYzogKCkgPT4gdm9pZCwgb2JzZXJ2ZWRTaWduYWxzOiBTaWduYWxbXSkge1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG8pID0+IG8uc3Vic2NyaWJlKGZ1bmMpKTtcclxuICAgIGZ1bmMoKTtcclxufVxyXG4iLCJpbXBvcnQgeyBlZmZlY3QsIFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIG9uUmVzdCA9ICgpID0+IHt9O1xyXG4gICAgb25VbnJlc3QgPSAoKSA9PiB7fTtcclxuXHJcbiAgICAvLyBteCcnIC0gYngnID0ga3hcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBpbml0aWFsVmFsdWU7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBpbml0aWFsVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGljayhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYWNjZWxlcmF0aW9uID0gdGhpcy5zdGlmZm5lc3MgKiAodGhpcy50YXJnZXQgLSB0aGlzLnBvc2l0aW9uKSAtIHRoaXMuZGFtcGluZyAqIHRoaXMudmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSArPSBhY2NlbGVyYXRpb24gKiBkdDtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uICs9IHRoaXMudmVsb2NpdHkgKiBkdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGlmZm5lc3NDcml0aWNhbChzdGlmZm5lc3M6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc3RpZmZuZXNzID0gc3RpZmZuZXNzO1xyXG4gICAgICAgIHRoaXMuZGFtcGluZyA9IE1hdGguc3FydCg0ICogc3RpZmZuZXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFID0gMC4wMTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3ByaW5nKHNwcmluZzogU3ByaW5nLCBzaWduYWw6IFNpZ25hbCkge1xyXG4gICAgaWYgKHNwcmluZy5pc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IHRydWU7XHJcbiAgICBzcHJpbmcub25VbnJlc3QoKTtcclxuICAgIFxyXG4gICAgbGV0IGxhc3RNaWxsaXMgPSAwO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZpcnN0RnJhbWUpO1xyXG4gICAgZnVuY3Rpb24gZmlyc3RGcmFtZShtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcbiAgICAgICAgdGlja1NwcmluZyhtaWxsaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB0aWNrU3ByaW5nKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RlcCA9IG1pbGxpcyAtIGxhc3RNaWxsaXM7XHJcbiAgICAgICAgbGFzdE1pbGxpcyA9IG1pbGxpcztcclxuXHJcbiAgICAgICAgc3ByaW5nLnRpY2soc3RlcCAvIDEwMDApO1xyXG4gICAgICAgIHNpZ25hbC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHNwcmluZy50YXJnZXQgLSBzcHJpbmcucG9zaXRpb24pIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFICYmIE1hdGguYWJzKHNwcmluZy52ZWxvY2l0eSkgPCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UpIHtcclxuICAgICAgICAgICAgc3ByaW5nLnBvc2l0aW9uID0gc3ByaW5nLnRhcmdldDtcclxuICAgICAgICAgICAgc3ByaW5nLnZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNpZ25hbC51cGRhdGUoKTtcclxuICAgICAgICAgICAgc3ByaW5nLm9uUmVzdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhbmltYXRlV2l0aFNwcmluZyhzdGlmZm5lc3M6IG51bWJlciwgb3ZlclRpbWU6ICh0aW1lOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XHJcbiAgICAgICAgY29uc3Qgc3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgICAgIHNwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbChzdGlmZm5lc3MpO1xyXG4gICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBhbmltYXRlID0gKCkgPT4gb3ZlclRpbWUoc3ByaW5nLnBvc2l0aW9uKTtcclxuICAgICAgICBzcHJpbmcub25SZXN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHJpbmdTaWcudW5zdWJzY3JpYmUoYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGVmZmVjdChhbmltYXRlLCBbc3ByaW5nU2lnXSk7XHJcblxyXG4gICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgZmFkZUluQW5pbWF0aW9uIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBjb25zdCBzbGVlcCA9IChkZWxheTogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBkZWxheSkpO1xuXG5leHBvcnQgZnVuY3Rpb24gc3BhY2VUb0ZpbGUoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShcIiBcIiwgXCItXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFNWRzxLIGV4dGVuZHMga2V5b2YgU1ZHRWxlbWVudFRhZ05hbWVNYXA+KHF1YWxpZmllZE5hbWU6IEspIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgcXVhbGlmaWVkTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmxhY2VkPFQsIFdpdGhpbj4oaXRlbXM6IFRbXSwgd2l0aGluOiBXaXRoaW4pIHtcbiAgICBjb25zdCBpdGVtc0ludGVybGFjZWQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgaXRlbXNJbnRlcmxhY2VkLnB1c2goaXRlbSk7XG4gICAgICAgIGl0ZW1zSW50ZXJsYWNlZC5wdXNoKHdpdGhpbik7XG4gICAgfVxuICAgIGl0ZW1zSW50ZXJsYWNlZC5wb3AoKTtcbiAgICByZXR1cm4gaXRlbXNJbnRlcmxhY2VkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwUmFuZ2UobjogbnVtYmVyLCBzdGFydDE6IG51bWJlciwgc3RvcDE6IG51bWJlciwgc3RhcnQyOiBudW1iZXIsIHN0b3AyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKChuIC0gc3RhcnQxKSAvIChzdG9wMSAtIHN0YXJ0MSkpICogKHN0b3AyIC0gc3RhcnQyKSArIHN0YXJ0Mjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yT25Ib3ZlcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29sb3I6IHN0cmluZywgaG92ZXJDb2xvcjogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuICAgIGVsZW1lbnQub25tb3VzZW92ZXIgPSAoKSA9PiAoZWxlbWVudC5zdHlsZS5jb2xvciA9IGhvdmVyQ29sb3IpO1xuICAgIGVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4gKGVsZW1lbnQuc3R5bGUuY29sb3IgPSBjb2xvcik7XG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJjb2xvciAwLjJzIGVhc2Utb3V0XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4pIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFNWRyhmZXRjaFN0cmluZzogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChmZXRjaFN0cmluZyk7XG4gICAgY29uc3Qgc3ZnQ29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICByZXR1cm4gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdmdDb250ZW50LCBcImltYWdlL3N2Zyt4bWxcIikuZG9jdW1lbnRFbGVtZW50IGFzIHVua25vd24gYXMgU1ZHU1ZHRWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRCeUlkU1ZHKHN2ZzogU1ZHU1ZHRWxlbWVudCwgaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBzdmcuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIFNWR0VsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJY29uU1ZHKGxvY2FsU2l6ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgaWNvbiA9IGNyZWF0ZUVsZW1lbnRTVkcoXCJzdmdcIik7XG4gICAgY29uc3QgcGFkID0gNDtcbiAgICBpY29uLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGljb24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgaWNvbi5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIGAkey1wYWR9ICR7LXBhZH0gJHtsb2NhbFNpemUgKyAyICogcGFkfSAke2xvY2FsU2l6ZSArIDIgKiBwYWR9YCk7XG4gICAgcmV0dXJuIGljb247XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlTGluZSA9IChzdmc6IFNWR1NWR0VsZW1lbnQsIHN0cm9rZVdpZHRoOiBudW1iZXIpID0+ICgpID0+IHtcbiAgICBjb25zdCBsaW5lID0gY3JlYXRlRWxlbWVudFNWRyhcImxpbmVcIik7XG4gICAgc2V0QXR0cmlidXRlcyhsaW5lLCB7IFwic3Ryb2tlLXdpZHRoXCI6IHN0cm9rZVdpZHRoIH0pO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICByZXR1cm4gbGluZTtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlUG9seWxpbmUgPSAoc3ZnOiBTVkdTVkdFbGVtZW50LCBzdHJva2VXaWR0aDogbnVtYmVyKSA9PiAoKSA9PiB7XG4gICAgY29uc3QgbGluZSA9IGNyZWF0ZUVsZW1lbnRTVkcoXCJwb2x5bGluZVwiKTtcbiAgICBzZXRBdHRyaWJ1dGVzKGxpbmUsIHsgXCJzdHJva2Utd2lkdGhcIjogc3Ryb2tlV2lkdGgsIGZpbGw6IFwibm9uZVwiIH0pO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICByZXR1cm4gbGluZTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGJvZHksIGJvZHlTaWcsIGZhZGVJbkFuaW1hdGlvbiwgZ3JheSwgaWVHcmVlbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBjZW50ZXJFbGVtZW50WCwgY2VudGVyV2l0aEdhcFksIGlzTGFuZHNjYXBlLCBweCwgc3R5bGVUZXh0IH0gZnJvbSBcIi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSBcIi4vbW9kYWxcIjtcclxuaW1wb3J0IHsgY2xlYW5MYXN0UGFnZSwgcGFnZUNsZWFudXBzIH0gZnJvbSBcIi4vcGFnZVwiO1xyXG5pbXBvcnQgeyBhZGRDb25uZWN0UGFnZSB9IGZyb20gXCIuL3BhZ2VzL2Nvbm5lY3RcIjtcclxuaW1wb3J0IHsgYWRkRXZvbHV0aW9uUGFnZSB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xyXG5pbXBvcnQgeyBhZGRJbnNwaXJhdGlvblBhZ2UgfSBmcm9tIFwiLi9wYWdlcy9pbnNwaXJhdGlvblwiO1xyXG5pbXBvcnQgeyBhZGRIb21lU1ZHLCBhZGRWaWV3UGFnZSB9IGZyb20gXCIuL3BhZ2VzL3ZpZXdcIjtcclxuaW1wb3J0IHsgYWRkV29ya1BhZ2UgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XHJcbmltcG9ydCB7IGdldEhlYWRlckJhckhlaWdodCwgZ2V0U2Nyb2xsSGVpZ2h0IH0gZnJvbSBcIi4vc2Nyb2xsXCI7XHJcbmltcG9ydCB7IFNpZ25hbCwgZWZmZWN0IH0gZnJvbSBcIi4vc2lnbmFsXCI7XHJcbmltcG9ydCB7IFNwcmluZywgYW5pbWF0ZVNwcmluZywgYW5pbWF0ZVdpdGhTcHJpbmcgfSBmcm9tIFwiLi9zcHJpbmdcIjtcclxuaW1wb3J0IHsgY29sb3JPbkhvdmVyLCBjcmVhdGVJY29uU1ZHLCBmZXRjaFNWRywgZ2V0RWxlbWVudEJ5SWRTVkcsIG1ha2VMaW5lLCBzZXRBdHRyaWJ1dGVzLCBzbGVlcCB9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbi8vIFRPRE9cclxuLy8gbW9iaWxlIGxheW91dHNcclxuLy8gYmxvZyBwYWdlc1xyXG4vLyB3b3JrIHBhZ2VcclxuLy8gaW1hZ2UgY2xpY2tcclxuLy8gaGl0IGVuZCBvZiBzY3JvbGwsIG5leHQgcGFnZVxyXG4vLyBzaW1wbGVyIHJlY3RhbmdsZSBzY3JvbGwgYmFyXHJcbi8vIFwidmlld1wiIHN0YXJ0IGFuaW1hdGlvblxyXG4vLyBlbnZlbG9wZSBsb3dlclxyXG4vLyByYW5kb20gY29sb3Igb24gaG92ZXIgZm9yIHN2ZyBhcnQ/XHJcbi8vIG5hdiBzaWRlYmFyIGhvdmVyIHN0eWxlXHJcblxyXG5jb25zdCBwYWdlcyA9IHtcclxuICAgIHZpZXc6IGFkZFZpZXdQYWdlLFxyXG4gICAgd29yazogYWRkV29ya1BhZ2UsXHJcbiAgICBpbnNwaXJhdGlvbjogYWRkSW5zcGlyYXRpb25QYWdlLFxyXG4gICAgZXZvbHV0aW9uOiBhZGRFdm9sdXRpb25QYWdlLFxyXG4gICAgY29ubmVjdDogYWRkQ29ubmVjdFBhZ2UsXHJcbn07XHJcblxyXG5jb25zdCBuYXZJdGVtRnJvbVN0cmluZzogUmVjb3JkPHN0cmluZywgSFRNTEVsZW1lbnQ+ID0ge307XHJcblxyXG5jb25zdCBlZGdlQWxpZ25YID0gKCkgPT4gaW5uZXJIZWlnaHQgKiAwLjE7XHJcbmNvbnN0IGhlYWRlckljb25TaXplID0gKCkgPT4gZ2V0SGVhZGVyQmFySGVpZ2h0KCkgKiAwLjQ7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhbmltYXRlSW50cm8oKSB7XHJcbiAgICAvLyBaWlpaIGNsZWFuIHRoaXMgdXBcclxuICAgIGNvbnN0IHN2ZyA9IGF3YWl0IGZldGNoU1ZHKFwibG9nby1mdWxsLnN2Z1wiKTtcclxuICAgIHN2Zy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIHN2Zy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICBib2R5LmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgc3ZnLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0ICogMC40KTtcclxuXHJcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcclxuXHJcbiAgICBjb25zdCBzdmdTcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xyXG4gICAgc3ZnU3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDgwKTtcclxuICAgIGNvbnN0IHN2Z1NwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcclxuXHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHN2Zy5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIHN2Z1NwcmluZy5wb3NpdGlvbjtcclxuICAgICAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoKDEuMyAtIHN2Z1NwcmluZy5wb3NpdGlvbikgKiBpbm5lckhlaWdodCk7XHJcbiAgICAgICAgc3ZnLnN0eWxlLnRvcCA9IHB4KChpbm5lckhlaWdodCAtIHN2Zy5zY3JvbGxIZWlnaHQpIC8gMik7XHJcbiAgICAgICAgc3ZnLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHN2Zy5zY3JvbGxXaWR0aCkgLyAyKTtcclxuICAgIH0sIFtzdmdTcHJpbmdTaWddKTtcclxuXHJcbiAgICBzdmdTcHJpbmcudGFyZ2V0ID0gMTtcclxuICAgIGFuaW1hdGVTcHJpbmcoc3ZnU3ByaW5nLCBzdmdTcHJpbmdTaWcpO1xyXG5cclxuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG4gICAgY29uc3QgZCA9IFwiZGVzaWduXCI7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BhY2l0eU91dChlbGVtZW50OiBTVkdFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyU3ByaW5nID0gbmV3IFNwcmluZygxKTtcclxuICAgICAgICBsZXR0ZXJTcHJpbmcuc2V0U3RpZmZuZXNzQ3JpdGljYWwoMTUwKTtcclxuICAgICAgICBjb25zdCBsZXR0ZXJTcHJpbmdTaWcgPSBuZXcgU2lnbmFsKCk7XHJcblxyXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiXCIgKyBsZXR0ZXJTcHJpbmcucG9zaXRpb247XHJcbiAgICAgICAgfSwgW2xldHRlclNwcmluZ1NpZ10pO1xyXG5cclxuICAgICAgICBsZXR0ZXJTcHJpbmcudGFyZ2V0ID0gMDtcclxuICAgICAgICBhbmltYXRlU3ByaW5nKGxldHRlclNwcmluZywgbGV0dGVyU3ByaW5nU2lnKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IGdldEVsZW1lbnRCeUlkU1ZHKHN2ZywgXCJkZXNpZ24tXCIgKyBkW2ldKTtcclxuICAgICAgICBvcGFjaXR5T3V0KGRlc2lnbkxldHRlcik7XHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMTIwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGwgPSBbXCJiaWctaVwiLCBcImRvdC0xXCIsIFwiYmlnLWVcIiwgXCJkb3QtMlwiXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IGdldEVsZW1lbnRCeUlkU1ZHKHN2ZywgbFtpXSk7XHJcbiAgICAgICAgb3BhY2l0eU91dChkZXNpZ25MZXR0ZXIpO1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKDEyMCk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcclxuXHJcbiAgICBzdmdTcHJpbmcudGFyZ2V0ID0gMDtcclxuICAgIGFuaW1hdGVTcHJpbmcoc3ZnU3ByaW5nLCBzdmdTcHJpbmdTaWcpO1xyXG5cclxuICAgIGF3YWl0IHNsZWVwKDUwMCk7XHJcbiAgICBib2R5LnJlbW92ZUNoaWxkKHN2Zyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE5hdkl0ZW1zKCkge1xyXG4gICAgZm9yIChjb25zdCBbcGFnZU5hbWUsIGFkZFBhZ2VdIG9mIE9iamVjdC5lbnRyaWVzKHBhZ2VzKSkge1xyXG4gICAgICAgIGNvbnN0IG5hdkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBuYXZJdGVtLmlubmVyVGV4dCA9IHBhZ2VOYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIG5hdkl0ZW0uc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgbmF2SXRlbS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICBuYXZJdGVtLnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcclxuICAgICAgICBuYXZJdGVtLnN0eWxlLmNvbG9yID0gZ3JheTtcclxuICAgICAgICBuYXZJdGVtLnN0eWxlLmZvbnRXZWlnaHQgPSBcIjUwMFwiO1xyXG4gICAgICAgIG5hdkl0ZW0uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgICAgbmF2SXRlbS5zdHlsZS53aGl0ZVNwYWNlID0gXCJub3dyYXBcIjtcclxuXHJcbiAgICAgICAgbmF2SXRlbS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhbkxhc3RQYWdlKCk7XHJcbiAgICAgICAgICAgIGFkZFBhZ2UoKTtcclxuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICBwYWdlQ2xlYW51cHMuYWRkKCgpID0+IChuYXZJdGVtLnN0eWxlLmNvbG9yID0gZ3JheSkpO1xyXG4gICAgICAgICAgICAvLyBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgXCJcIiwgXCIvIy9cIiArIHBhZ2VOYW1lKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKG5hdkl0ZW0pO1xyXG5cclxuICAgICAgICBuYXZJdGVtRnJvbVN0cmluZ1twYWdlTmFtZV0gPSBuYXZJdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5hdkl0ZW1zID0gT2JqZWN0LnZhbHVlcyhuYXZJdGVtRnJvbVN0cmluZyk7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBjZW50ZXJXaXRoR2FwWShuYXZJdGVtcywgMC4wNiAqIHMsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBuYXZJdGVtIG9mIG5hdkl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnN0eWxlLmxlZnQgPSBweChlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnN0eWxlLmZvbnRTaXplID0gcHgocyAqIDAuMDI1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmF2SXRlbSBvZiBuYXZJdGVtcykgbmF2SXRlbS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9LCBbYm9keVNpZ10pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhbmltYXRlSG9tZUlFKCkge1xyXG4gICAgY29uc3QgaG9tZVN2ZyA9IGF3YWl0IGFkZEhvbWVTVkcoKTtcclxuXHJcbiAgICBjb25zdCByZXN0ID0gZ2V0RWxlbWVudEJ5SWRTVkcoaG9tZVN2ZywgXCJyZXN0XCIpO1xyXG4gICAgcmVzdC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcbiAgICBjb25zdCBpZSA9IGdldEVsZW1lbnRCeUlkU1ZHKGhvbWVTdmcsIFwiaWVcIik7XHJcbiAgICBpZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblxyXG4gICAgYXdhaXQgYW5pbWF0ZVdpdGhTcHJpbmcoOCwgKHRpbWUpID0+IChpZS5zdHlsZS5vcGFjaXR5ID0gdGltZSArIFwiXCIpKTtcclxuICAgIGF3YWl0IGFuaW1hdGVXaXRoU3ByaW5nKDEwLCAodGltZSkgPT4gKHJlc3Quc3R5bGUub3BhY2l0eSA9IHRpbWUgKyBcIlwiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEhlYWRlckJhcigpIHtcclxuICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBoZWFkZXJCYXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICBoZWFkZXJCYXIuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcclxuXHJcbiAgICBib2R5LmFwcGVuZENoaWxkKGhlYWRlckJhcik7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBoZWFkZXJCYXIuc3R5bGUud2lkdGggPSBweChpbm5lcldpZHRoKTtcclxuICAgICAgICBoZWFkZXJCYXIuc3R5bGUuaGVpZ2h0ID0gcHgoZ2V0SGVhZGVyQmFySGVpZ2h0KCkpO1xyXG4gICAgfSwgW2JvZHlTaWddKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTWVudUJ1dHRvbigpIHtcclxuICAgIGNvbnN0IHN6ID0gNjA7XHJcbiAgICBjb25zdCBtZW51QnV0dG9uID0gY3JlYXRlSWNvblNWRyhzeik7XHJcbiAgICBtZW51QnV0dG9uLnN0eWxlLmFuaW1hdGlvbiA9IGZhZGVJbkFuaW1hdGlvbigpO1xyXG4gICAgY29uc3QgbWVudUxpbmUgPSBtYWtlTGluZShtZW51QnV0dG9uLCA0KTtcclxuICAgIGNvbnN0IGxpbmUxID0gbWVudUxpbmUoKTtcclxuICAgIGNvbnN0IGxpbmUyID0gbWVudUxpbmUoKTtcclxuICAgIGNvbnN0IGxpbmUzID0gbWVudUxpbmUoKTtcclxuXHJcbiAgICBjb25zdCBtZW51TW9kYWwgPSBuZXcgTW9kYWwoXHJcbiAgICAgICAgXCIjMDAwMDAwZWVcIixcclxuICAgICAgICAoYmFja2Ryb3ApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVudVBhZ2VOYXZzOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgW3BhZ2VOYW1lLCBuYXZJdGVtXSBvZiBPYmplY3QuZW50cmllcyhuYXZJdGVtRnJvbVN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnVQYWdlTmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgICAgIG1lbnVQYWdlTmF2LmlubmVyVGV4dCA9IHBhZ2VOYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250RmFtaWx5ID0gXCJTcGFydGFuXCI7XHJcbiAgICAgICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250V2VpZ2h0ID0gXCI1MDBcIjtcclxuICAgICAgICAgICAgICAgIG1lbnVQYWdlTmF2LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgY29sb3JPbkhvdmVyKG1lbnVQYWdlTmF2LCBncmF5LCBcIndoaXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1lbnVQYWdlTmF2Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudU1vZGFsLmJlZ2luQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZJdGVtLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGJhY2tkcm9wLmFwcGVuZENoaWxkKG1lbnVQYWdlTmF2KTtcclxuICAgICAgICAgICAgICAgIG1lbnVQYWdlTmF2cy5wdXNoKG1lbnVQYWdlTmF2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVudU1vZGFsLm9uTGF5b3V0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtZW51UGFnZU5hdiBvZiBtZW51UGFnZU5hdnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZW51UGFnZU5hdi5zdHlsZS5mb250U2l6ZSA9IHB4KGlubmVySGVpZ2h0ICogMC4wNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyRWxlbWVudFgobWVudVBhZ2VOYXYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2VudGVyV2l0aEdhcFkobWVudVBhZ2VOYXZzLCBpbm5lckhlaWdodCAqIDAuMDgsIGlubmVySGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBtZW51QnV0dG9uLnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRpbWUgKiBzejtcclxuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lMSwgeyB4MTogMCwgeTE6IDAsIHgyOiBzeiwgeTI6IHMgfSk7XHJcbiAgICAgICAgICAgIGxpbmUyLnN0eWxlLm9wYWNpdHkgPSAoc3ogLSBzKSAvIHN6ICsgXCJcIjtcclxuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyhsaW5lMiwgeyB4MTogMCwgeTE6IHN6IC8gMiwgeDI6IHN6LCB5Mjogc3ogLyAyIH0pO1xyXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKGxpbmUzLCB7IHgxOiAwLCB5MTogc3osIHgyOiBzeiwgeTI6IHN6IC0gcyB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS56SW5kZXggPSBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIG1lbnVCdXR0b24uc3R5bGUuc3Ryb2tlID0gXCIjYmJiYmJiXCI7IC8vIFpaWlogb25jbG9zZSBtaXggd2l0aCBlc2NhcGUga2V5XHJcbiAgICBtZW51QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1lbnVNb2RhbC5pc09wZW5pbmcpIHtcclxuICAgICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5zdHJva2UgPSBcIiNiYmJiYmJcIjtcclxuICAgICAgICAgICAgbWVudU1vZGFsLmJlZ2luQ2xvc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZW51QnV0dG9uLnN0eWxlLnN0cm9rZSA9IGdyYXk7XHJcbiAgICAgICAgICAgIG1lbnVNb2RhbC5iZWdpbk9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVudUJ1dHRvbik7XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBzaXplID0gaGVhZGVySWNvblNpemUoKTtcclxuICAgICAgICBtZW51QnV0dG9uLnN0eWxlLndpZHRoID0gcHgoc2l6ZSk7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5oZWlnaHQgPSBweChzaXplKTtcclxuXHJcbiAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5sZWZ0ID0gcHgoaW5uZXJXaWR0aCAtIHNpemUgLSBlZGdlQWxpZ25YKCkpO1xyXG4gICAgICAgIG1lbnVCdXR0b24uc3R5bGUudG9wID0gcHgoKGdldEhlYWRlckJhckhlaWdodCgpIC0gc2l6ZSkgLyAyKTtcclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZExvZ28oKSB7XHJcbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgIGxvZ28uc3R5bGUuYW5pbWF0aW9uID0gZmFkZUluQW5pbWF0aW9uKCk7XHJcbiAgICBsb2dvLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgbG9nby5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgIGxvZ28uc3JjID0gXCJsb2dvLnN2Z1wiO1xyXG4gICAgYm9keS5hcHBlbmRDaGlsZChsb2dvKTtcclxuXHJcbiAgICBsb2dvLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbmF2SXRlbUZyb21TdHJpbmcudmlldy5jbGljaygpO1xyXG5cclxuICAgICAgICBjb25zdCBwdWxzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUuYmFja2dyb3VuZCA9IGllR3JlZW47XHJcbiAgICAgICAgcHVsc2Uuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQocHVsc2UpO1xyXG5cclxuICAgICAgICBhd2FpdCBhbmltYXRlV2l0aFNwcmluZyg0MCwgKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3V0ID0gMzA7XHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLmxlZnQgPSBweChsb2dvLm9mZnNldExlZnQgLSB0aW1lICogb3V0KTtcclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUudG9wID0gcHgobG9nby5vZmZzZXRUb3AgLSB0aW1lICogb3V0KTtcclxuXHJcbiAgICAgICAgICAgIHB1bHNlLnN0eWxlLndpZHRoID0gcHgobG9nby5vZmZzZXRXaWR0aCArIHRpbWUgKiAyICogb3V0KTtcclxuICAgICAgICAgICAgcHVsc2Uuc3R5bGUuaGVpZ2h0ID0gcHgobG9nby5vZmZzZXRIZWlnaHQgKyB0aW1lICogMiAqIG91dCk7XHJcblxyXG4gICAgICAgICAgICBwdWxzZS5zdHlsZS5vcGFjaXR5ID0gMSAtIHRpbWUgKyBcIlwiO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBib2R5LnJlbW92ZUNoaWxkKHB1bHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgZWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBzaXplID0gaGVhZGVySWNvblNpemUoKTtcclxuICAgICAgICBsb2dvLnN0eWxlLndpZHRoID0gcHgoc2l6ZSk7XHJcbiAgICAgICAgbG9nby5zdHlsZS5oZWlnaHQgPSBweChzaXplKTtcclxuXHJcbiAgICAgICAgbG9nby5zdHlsZS5sZWZ0ID0gcHgoZWRnZUFsaWduWCgpKTtcclxuICAgICAgICBsb2dvLnN0eWxlLnRvcCA9IHB4KChnZXRIZWFkZXJCYXJIZWlnaHQoKSAtIHNpemUpIC8gMik7XHJcbiAgICB9LCBbYm9keVNpZ10pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDb3B5cmlnaHQoKSB7XHJcbiAgICBjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGNvcHlyaWdodC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIGNvcHlyaWdodC5pbm5lclRleHQgPSBcIsKpMjAyNSBpLmUuIGRlc2lnbiwgaW5jLlwiO1xyXG4gICAgY29weXJpZ2h0LnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcFwiO1xyXG5cclxuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29weXJpZ2h0KTtcclxuXHJcbiAgICBlZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgICAgIGNvcHlyaWdodC5zdHlsZS5sZWZ0ID0gcHgoZWRnZUFsaWduWCgpKTtcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLnRvcCA9IHB4KGlubmVySGVpZ2h0ICogMC45KTtcclxuICAgICAgICAgICAgc3R5bGVUZXh0KGNvcHlyaWdodCwgeyBsZXR0ZXJTcGFjaW5nOiAwLjMsIGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IGdyYXksIGZvbnRTaXplOiAwLjAxMiAqIGlubmVySGVpZ2h0LCBsaW5lSGVpZ2h0OiAyMCB9KTtcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBaWlpaIG5lZWQgdG8gZG8gc29tZXRoaW5nIGhlcmVcclxuICAgICAgICAgICAgY29weXJpZ2h0LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtib2R5U2lnXSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgY29uc3QgcGFnZU5hbWUgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyhcIiMvXCIubGVuZ3RoKTtcclxuICAgIC8vIGlmIChwYWdlTmFtZSA9PT0gXCJcIikgYXdhaXQgYW5pbWF0ZUludHJvKCk7XHJcblxyXG4gICAgLy8gYXdhaXQgYW5pbWF0ZUhvbWVJRSgpO1xyXG5cclxuICAgIGFkZE5hdkl0ZW1zKCk7XHJcbiAgICBhZGRIZWFkZXJCYXIoKTtcclxuICAgIGFkZE1lbnVCdXR0b24oKTtcclxuICAgIGFkZExvZ28oKTtcclxuICAgIGFkZENvcHlyaWdodCgpO1xyXG5cclxuICAgIGNvbnN0IHBhZ2VOYXZJdGVtID0gbmF2SXRlbUZyb21TdHJpbmdbcGFnZU5hbWVdID8/IG5hdkl0ZW1Gcm9tU3RyaW5nLnZpZXc7XHJcbiAgICBwYWdlTmF2SXRlbS5jbGljaygpO1xyXG59XHJcbnNldHVwKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==