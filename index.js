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
/* harmony export */   setHeight: () => (/* binding */ setHeight),
/* harmony export */   setWidth: () => (/* binding */ setWidth),
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
const yAligningWithGaps = axisAligningWithGaps((element) => element.offsetHeight);
const xAligningWithGaps = axisAligningWithGaps((element) => element.offsetWidth);
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
function centerScaledY(element, scale) {
    const s = getScrollHeight();
    const height = s * scale;
    setHeight(element, height);
    element.style.top = px((s - height) / 2);
}
function centerScaledX(element, scale) {
    const s = getScrollWidth();
    const width = s * scale;
    setWidth(element, width);
    element.style.left = px((s - width) / 2);
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
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layout */ "./src/layout.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared */ "./src/shared.ts");


function addIcon(imageSrc, clickLink) {
    const icon = (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollImage)(imageSrc);
    icon.style.cursor = "pointer";
    icon.onclick = () => window.open(clickLink);
    return icon;
}
function clickNavConnect() {
    const connect = (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollImage)("connect/connect.svg");
    const texts = [
        (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollText)("Our clients look to us for more than award-winning design. They value our role as trusted advisor, support, and confidant."),
        (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollText)("We look for synergy and compatibility in every relationship we build so the work experience doesn’t feel like work at all."),
        (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollText)("If your gut is telling you we should connect, now is the perfect time to email."),
    ];
    const letsMeet = (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollImage)("connect/lets-meet.jpg");
    const who = (0,_shared__WEBPACK_IMPORTED_MODULE_1__.addScrollText)("Bethlyn Krakauer, Founder and Creative Director");
    const instagramIcon = addIcon("connect/instagram-icon.svg", "https://www.instagram.com/iedesigninc");
    const linkedinIcon = addIcon("connect/linkedin-icon.svg", "https://www.linkedin.com/company/i-e-design-inc");
    const mailIcon = addIcon("connect/mail-icon.svg", "mailto:beth@ie-design.com");
    const icons = [instagramIcon, linkedinIcon, mailIcon];
    (0,_layout__WEBPACK_IMPORTED_MODULE_0__.registerUpdateLayout)(() => {
        const s = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.getScrollHeight)();
        const width = 0.55 * s;
        (0,_layout__WEBPACK_IMPORTED_MODULE_0__.setWidth)(connect, width);
        (0,_layout__WEBPACK_IMPORTED_MODULE_0__.centerScaledY)(letsMeet, 0.8);
        for (const text of texts)
            (0,_shared__WEBPACK_IMPORTED_MODULE_1__.styleScrollText)(text, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width, lineHeight: 0.05 * s });
        (0,_shared__WEBPACK_IMPORTED_MODULE_1__.styleScrollText)(who, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width: 1 * s, lineHeight: 0.05 * s });
        const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.yAligningWithGaps)([
            //
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
        const [iconAlignments, __] = (0,_layout__WEBPACK_IMPORTED_MODULE_0__.xAligningWithGaps)([instagramIcon, 0.03 * s, linkedinIcon, 0.03 * s, mailIcon]);
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
    const logoFull = (0,_shared__WEBPACK_IMPORTED_MODULE_2__.addScrollImage)("logo-full.svg");
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
        const s = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.getScrollHeight)();
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(evolution, 0.75);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(evolutionHistory, 0.3 * s);
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.setHeight)(logoFull, 0.45 * s);
        for (const promo of promos)
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.centerScaledY)(promo, 1);
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
        const [elementAlignments, _] = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.xAligningWithGaps)(items);
        for (const { element, offset } of elementAlignments) {
            element.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(offset);
        }
        evolutionHistory.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolution.offsetTop + evolution.offsetHeight - evolutionHistory.offsetHeight);
        logoFull.style.left = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolutionHistory.offsetLeft + (evolutionHistory.offsetWidth - logoFull.offsetWidth) / 2);
        logoFull.style.top = (0,_layout__WEBPACK_IMPORTED_MODULE_1__.px)(evolutionHistory.offsetTop - logoFull.offsetHeight - 0.1 * s);
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
        (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(inspiration, tiles[0].image, 0.25 * s);
        for (let i = 0; i < tiles.length - 1; i++)
            (0,_layout__WEBPACK_IMPORTED_MODULE_1__.alignWithGap)(tiles[i].image, tiles[i + 1].image, 0.1 * s);
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
    const BOTTOM = (tabElement) => (innerHeight - tabElement.offsetHeight) / 2;
    const TOP = (tabElement) => innerHeight - tabElement.offsetWidth / 2;
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
        spring.setStiffnessCritical(300);
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
const FADE_IN_ANIMATION = "fadeIn ease 0.6s";
function addScrollImage(src) {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = FADE_IN_ANIMATION;
    (0,_layout__WEBPACK_IMPORTED_MODULE_6__.notifyImageLoading)(scrollImage);
    (0,_layout__WEBPACK_IMPORTED_MODULE_6__.queueBeforeLayout)(() => {
        scrollContainer.appendChild(scrollImage);
        onNavOptionClick.push(() => scrollContainer.removeChild(scrollImage));
    });
    return scrollImage;
}
function clickAnyNav(navItem, f, pageName) {
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
        window.history.pushState({}, "", "/#/" + pageName);
    };
}
function addScrollText(text) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = FADE_IN_ANIMATION;
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
        scrollContainer.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(0.85 * innerHeight);
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
const pages = {
    view: { click: _pages_view__WEBPACK_IMPORTED_MODULE_4__.clickNavView, navElement: viewNav },
    work: { click: _pages_work__WEBPACK_IMPORTED_MODULE_5__.clickNavWork, navElement: workNav },
    inspiration: { click: _pages_inspiration__WEBPACK_IMPORTED_MODULE_3__.clickNavInspiration, navElement: inspirationNav },
    evolution: { click: _pages_evolution__WEBPACK_IMPORTED_MODULE_2__.clickNavEvolution, navElement: evolutionNav },
    connect: { click: _pages_connect__WEBPACK_IMPORTED_MODULE_1__.clickNavConnect, navElement: connectNav },
};
for (const [pageName, page] of Object.entries(pages))
    clickAnyNav(page.navElement, page.click, pageName);
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
function animateIntro() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("logo-full.svg");
        const svgContent = yield response.text();
        const svg = new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement;
        svg.style.position = "absolute";
        svg.style.opacity = "0";
        _constants__WEBPACK_IMPORTED_MODULE_7__.body.appendChild(svg);
        svg.style.height = (0,_layout__WEBPACK_IMPORTED_MODULE_6__.px)(innerHeight * 0.4);
        yield sleep(1000);
        const svgSpring = new _spring__WEBPACK_IMPORTED_MODULE_8__.Spring(0);
        svgSpring.setStiffnessCritical(80);
        const svgSpringSig = new _signal__WEBPACK_IMPORTED_MODULE_0__.Signal();
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
            yield sleep(120);
        }
        const l = ["big-i", "dot-1", "big-e", "dot-2"];
        for (let i = 0; i < l.length; i++) {
            const designLetter = svg.getElementById(l[i]);
            opacityOut(designLetter);
            yield sleep(120);
        }
        yield sleep(1000);
        svgSpring.target = 0;
        (0,_spring__WEBPACK_IMPORTED_MODULE_8__.animateSpring)(svgSpring, svgSpringSig);
        yield sleep(500);
        _constants__WEBPACK_IMPORTED_MODULE_7__.body.removeChild(svg);
        viewNav.click();
    });
}
const hash = window.location.hash.substring(2);
if (hash === "")
    animateIntro();
else {
    const page = pages[hash] || pages["view"];
    setTimeout(() => page.navElement.click());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7Ozs7Ozs7VUMzREQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQjtBQUVJO0FBQ0E7QUFDTztBQUNGO0FBQ0Y7QUFFUDtBQUVsQiw4Q0FBOEM7QUFDOUMsK0NBQStDO0FBQy9DLHNCQUFzQjtBQUN0QixxREFBcUQ7QUFDckQsdURBQXVEO0FBQ3ZELGtDQUFrQztBQUVsQyxzREFBc0Q7QUFDdEQsd0RBQXdEO0FBQ3hELHFEQUFxRDtBQUNyRCxTQUFTO0FBQ1Qsb0NBQW9DO0FBQ3BDLHFDQUFxQztBQUNyQyxpQ0FBaUM7QUFDakMsb0NBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFFNUIsbUNBQW1DO0FBQ25DLG9DQUFvQyIsInNvdXJjZXMiOlsid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9sYXlvdXQudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvY29ubmVjdC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy9ldm9sdXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvaW5zcGlyYXRpb24udHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvcGFnZXMvdmlldy50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9wYWdlcy93b3JrLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlLy4vc3JjL3NoYXJlZC50cyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS8uL3NyYy9zaWduYWwudHMiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvc3ByaW5nLnRzIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pZS1kZXNpZ24td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2llLWRlc2lnbi13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaWUtZGVzaWduLXdlYnNpdGUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWxlbWVudFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xuXG5leHBvcnQgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5leHBvcnQgY29uc3QgYm9keVNpZyA9IGVsZW1lbnRTaWduYWwoYm9keSk7XG5cbmV4cG9ydCBjb25zdCBpZUJsdWUgPSBcIiM2MDlDQ0VcIjtcbmV4cG9ydCBjb25zdCBpZUdyZWVuID0gXCIjYmZlMDIxXCI7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiA9IDAuOTU7XG4iLCJpbXBvcnQgeyBib2R5U2lnIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBvbk5hdk9wdGlvbkNsaWNrLCBUZXh0U3F1YXJlIH0gZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBlZmZlY3QgfSBmcm9tIFwiLi9zaWduYWxcIjtcblxuaW50ZXJmYWNlIEVsZW1lbnRBbGlnbm1lbnQge1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG9mZnNldDogbnVtYmVyO1xufVxuXG5sZXQgaW1hZ2VMb2FkaW5nUHJvbWlzZXM6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xubGV0IHF1ZXVlZEJlZm9yZUxheW91dHM6ICgoKSA9PiB2b2lkKVtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBweChwaXhlbHM6IG51bWJlcikge1xuICAgIHJldHVybiBwaXhlbHMgKyBcInB4XCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBSYW5nZShuOiBudW1iZXIsIHN0YXJ0MTogbnVtYmVyLCBzdG9wMTogbnVtYmVyLCBzdGFydDI6IG51bWJlciwgc3RvcDI6IG51bWJlcikge1xuICAgIHJldHVybiAoKG4gLSBzdGFydDEpIC8gKHN0b3AxIC0gc3RhcnQxKSkgKiAoc3RvcDIgLSBzdGFydDIpICsgc3RhcnQyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJVcGRhdGVMYXlvdXQodXBkYXRlTGF5b3V0OiAoKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgdXBkYXRlTGF5b3V0SW1hZ2VXYWl0aW5nID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChpbWFnZUxvYWRpbmdQcm9taXNlcyk7XG4gICAgICAgIGZvciAoY29uc3QgcXVldWVkQmVmb3JlTGF5b3V0IG9mIHF1ZXVlZEJlZm9yZUxheW91dHMpIHF1ZXVlZEJlZm9yZUxheW91dCgpO1xuICAgICAgICBpbWFnZUxvYWRpbmdQcm9taXNlcyA9IFtdO1xuICAgICAgICBxdWV1ZWRCZWZvcmVMYXlvdXRzID0gW107XG4gICAgICAgIHVwZGF0ZUxheW91dCgpO1xuICAgIH07XG4gICAgZWZmZWN0KHVwZGF0ZUxheW91dEltYWdlV2FpdGluZywgW2JvZHlTaWddKTtcbiAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gYm9keVNpZy51bnN1YnNjcmliZSh1cGRhdGVMYXlvdXRJbWFnZVdhaXRpbmcpKTtcblxuICAgIHVwZGF0ZUxheW91dEltYWdlV2FpdGluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcXVldWVCZWZvcmVMYXlvdXQoZXZlbnQ6ICgpID0+IHZvaWQpIHtcbiAgICBxdWV1ZWRCZWZvcmVMYXlvdXRzLnB1c2goZXZlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5SW1hZ2VMb2FkaW5nKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgaW1hZ2VMb2FkaW5nUHJvbWlzZXMucHVzaChpbWFnZS5kZWNvZGUoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgY29uc3QgU0NST0xMX0hFSUdIVF9QUk9QT1JUSU9OID0gMC43O1xuICAgIHJldHVybiBpbm5lckhlaWdodCAqIFNDUk9MTF9IRUlHSFRfUFJPUE9SVElPTjsgLy8gVE9ETyB0aGlzIHNob3VsZCBqdXN0IHVzZSBhY3R1YWwgc2Nyb2xsIGhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGgoKSB7XG4gICAgY29uc3QgU0NST0xMX1dJRFRIX1BST1BPUlRJT04gPSAxO1xuICAgIHJldHVybiBpbm5lcldpZHRoICogU0NST0xMX1dJRFRIX1BST1BPUlRJT047IC8vIFRPRE8gdGhpcyBzaG91bGQganVzdCB1c2UgYWN0dWFsIHNjcm9sbCBoZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduV2l0aEdhcChsZWZ0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJpZ2h0RWxlbWVudDogSFRNTEVsZW1lbnQsIGdhcDogbnVtYmVyKSB7XG4gICAgcmlnaHRFbGVtZW50LnN0eWxlLmxlZnQgPSBweChsZWZ0RWxlbWVudC5vZmZzZXRMZWZ0ICsgbGVmdEVsZW1lbnQub2Zmc2V0V2lkdGggKyBnYXApO1xufVxuXG5mdW5jdGlvbiBheGlzQWxpZ25pbmdXaXRoR2FwcyhheGlzU2l6ZTogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGVsZW1lbnRPckdhcHM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSk6IFtFbGVtZW50QWxpZ25tZW50W10sIG51bWJlcl0gPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50QWxpZ25tZW50cyA9IFtdO1xuICAgICAgICBsZXQgcnVubmluZ1RvdGFsID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50T3JHYXAgb2YgZWxlbWVudE9yR2Fwcykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRPckdhcCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudEFsaWdubWVudHMucHVzaCh7IGVsZW1lbnQ6IGVsZW1lbnRPckdhcCwgb2Zmc2V0OiBydW5uaW5nVG90YWwgfSk7XG4gICAgICAgICAgICAgICAgcnVubmluZ1RvdGFsICs9IGF4aXNTaXplKGVsZW1lbnRPckdhcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmdUb3RhbCArPSBlbGVtZW50T3JHYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtlbGVtZW50QWxpZ25tZW50cywgcnVubmluZ1RvdGFsXTtcbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgeUFsaWduaW5nV2l0aEdhcHMgPSBheGlzQWxpZ25pbmdXaXRoR2FwcygoZWxlbWVudCkgPT4gZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuZXhwb3J0IGNvbnN0IHhBbGlnbmluZ1dpdGhHYXBzID0gYXhpc0FsaWduaW5nV2l0aEdhcHMoKGVsZW1lbnQpID0+IGVsZW1lbnQub2Zmc2V0V2lkdGgpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHsgbWFqb3IsIG1pbm9ycyB9OiBUZXh0U3F1YXJlLCBtYWpvclRvTWlub3JHYXA6IG51bWJlciwgYmV0d2Vlbk1pbm9yc0dhcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXRlbXM6IChIVE1MRWxlbWVudCB8IG51bWJlcilbXSA9IFtdO1xuXG4gICAgaXRlbXMucHVzaChtYWpvciwgbWFqb3JUb01pbm9yR2FwKTtcblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobWlub3IsIGJldHdlZW5NaW5vcnNHYXApO1xuICAgIH1cbiAgICBpdGVtcy5wb3AoKTsgLy8gcmVtb3ZlIGZpbmFsIGdhcCwgb25seSB3YW50IGJldHdlZW5zXG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIHRvdGFsSGVpZ2h0XSA9IHlBbGlnbmluZ1dpdGhHYXBzKGl0ZW1zKTtcbiAgICBjb25zdCBncm91cFRvcCA9IChzY3JvbGxIZWlnaHQgLSB0b3RhbEhlaWdodCkgLyAyO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgoZ3JvdXBUb3AgKyBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgbWlub3Igb2YgbWlub3JzKSB7XG4gICAgICAgIG1pbm9yLnN0eWxlLmxlZnQgPSBtYWpvci5zdHlsZS5sZWZ0O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB3aWR0aDogbnVtYmVyKSB7XG4gICAgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KHdpZHRoKTtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcHgoKHdpZHRoICogZWxlbWVudC5uYXR1cmFsSGVpZ2h0KSAvIGVsZW1lbnQubmF0dXJhbFdpZHRoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkgZWxlbWVudC5zdHlsZS53aWR0aCA9IHB4KChoZWlnaHQgKiBlbGVtZW50Lm5hdHVyYWxXaWR0aCkgLyBlbGVtZW50Lm5hdHVyYWxIZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2VudGVyU2NhbGVkWShlbGVtZW50OiBIVE1MRWxlbWVudCwgc2NhbGU6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBjb25zdCBoZWlnaHQgPSBzICogc2NhbGU7XG4gICAgc2V0SGVpZ2h0KGVsZW1lbnQsIGhlaWdodCk7XG4gICAgZWxlbWVudC5zdHlsZS50b3AgPSBweCgocyAtIGhlaWdodCkgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlclNjYWxlZFgoZWxlbWVudDogSFRNTEVsZW1lbnQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsV2lkdGgoKTtcbiAgICBjb25zdCB3aWR0aCA9IHMgKiBzY2FsZTtcbiAgICBzZXRXaWR0aChlbGVtZW50LCB3aWR0aCk7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgoKHMgLSB3aWR0aCkgLyAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGFuZHNjYXBlKCkge1xuICAgIHJldHVybiBpbm5lcldpZHRoIC8gaW5uZXJIZWlnaHQgPiAxO1xufVxuIiwiaW1wb3J0IHsgY2VudGVyU2NhbGVkWSwgZ2V0U2Nyb2xsSGVpZ2h0LCBweCwgcmVnaXN0ZXJVcGRhdGVMYXlvdXQsIHNldFdpZHRoLCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgc3R5bGVTY3JvbGxUZXh0IH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5mdW5jdGlvbiBhZGRJY29uKGltYWdlU3JjOiBzdHJpbmcsIGNsaWNrTGluazogc3RyaW5nKSB7XG4gICAgY29uc3QgaWNvbiA9IGFkZFNjcm9sbEltYWdlKGltYWdlU3JjKTtcbiAgICBpY29uLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIGljb24ub25jbGljayA9ICgpID0+IHdpbmRvdy5vcGVuKGNsaWNrTGluayk7XG4gICAgcmV0dXJuIGljb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkNvbm5lY3QoKSB7XG4gICAgY29uc3QgY29ubmVjdCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9jb25uZWN0LnN2Z1wiKTtcbiAgICBjb25zdCB0ZXh0cyA9IFtcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIk91ciBjbGllbnRzIGxvb2sgdG8gdXMgZm9yIG1vcmUgdGhhbiBhd2FyZC13aW5uaW5nIGRlc2lnbi4gVGhleSB2YWx1ZSBvdXIgcm9sZSBhcyB0cnVzdGVkIGFkdmlzb3IsIHN1cHBvcnQsIGFuZCBjb25maWRhbnQuXCIpLFxuICAgICAgICBhZGRTY3JvbGxUZXh0KFwiV2UgbG9vayBmb3Igc3luZXJneSBhbmQgY29tcGF0aWJpbGl0eSBpbiBldmVyeSByZWxhdGlvbnNoaXAgd2UgYnVpbGQgc28gdGhlIHdvcmsgZXhwZXJpZW5jZSBkb2VzbuKAmXQgZmVlbCBsaWtlIHdvcmsgYXQgYWxsLlwiKSxcbiAgICAgICAgYWRkU2Nyb2xsVGV4dChcIklmIHlvdXIgZ3V0IGlzIHRlbGxpbmcgeW91IHdlIHNob3VsZCBjb25uZWN0LCBub3cgaXMgdGhlIHBlcmZlY3QgdGltZSB0byBlbWFpbC5cIiksXG4gICAgXTtcbiAgICBjb25zdCBsZXRzTWVldCA9IGFkZFNjcm9sbEltYWdlKFwiY29ubmVjdC9sZXRzLW1lZXQuanBnXCIpO1xuICAgIGNvbnN0IHdobyA9IGFkZFNjcm9sbFRleHQoXCJCZXRobHluIEtyYWthdWVyLCBGb3VuZGVyIGFuZCBDcmVhdGl2ZSBEaXJlY3RvclwiKTtcblxuICAgIGNvbnN0IGluc3RhZ3JhbUljb24gPSBhZGRJY29uKFwiY29ubmVjdC9pbnN0YWdyYW0taWNvbi5zdmdcIiwgXCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2llZGVzaWduaW5jXCIpO1xuICAgIGNvbnN0IGxpbmtlZGluSWNvbiA9IGFkZEljb24oXCJjb25uZWN0L2xpbmtlZGluLWljb24uc3ZnXCIsIFwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkvaS1lLWRlc2lnbi1pbmNcIik7XG4gICAgY29uc3QgbWFpbEljb24gPSBhZGRJY29uKFwiY29ubmVjdC9tYWlsLWljb24uc3ZnXCIsIFwibWFpbHRvOmJldGhAaWUtZGVzaWduLmNvbVwiKTtcblxuICAgIGNvbnN0IGljb25zID0gW2luc3RhZ3JhbUljb24sIGxpbmtlZGluSWNvbiwgbWFpbEljb25dO1xuXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSAwLjU1ICogcztcbiAgICAgICAgc2V0V2lkdGgoY29ubmVjdCwgd2lkdGgpO1xuICAgICAgICBjZW50ZXJTY2FsZWRZKGxldHNNZWV0LCAwLjgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGV4dCBvZiB0ZXh0cykgc3R5bGVTY3JvbGxUZXh0KHRleHQsIHsgbGV0dGVyU3BhY2luZzogMC4xOCwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcbiAgICAgICAgc3R5bGVTY3JvbGxUZXh0KHdobywgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI4ICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9KTtcblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geUFsaWduaW5nV2l0aEdhcHMoW1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGNvbm5lY3QsXG4gICAgICAgICAgICAwLjA5ICogcyxcbiAgICAgICAgICAgIHRleHRzWzBdLFxuICAgICAgICAgICAgMC4wMyAqIHMsXG4gICAgICAgICAgICB0ZXh0c1sxXSxcbiAgICAgICAgICAgIDAuMDMgKiBzLFxuICAgICAgICAgICAgdGV4dHNbMl0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBweChvZmZzZXQgKyAwLjA1ICogcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXRzTWVldC5zdHlsZS5sZWZ0ID0gcHgoY29ubmVjdC5vZmZzZXRMZWZ0ICsgY29ubmVjdC5vZmZzZXRXaWR0aCArIDAuMTUgKiBzKTtcblxuICAgICAgICB3aG8uc3R5bGUubGVmdCA9IHB4KGxldHNNZWV0Lm9mZnNldExlZnQpO1xuICAgICAgICB3aG8uc3R5bGUudG9wID0gcHgobGV0c01lZXQub2Zmc2V0VG9wICsgbGV0c01lZXQub2Zmc2V0SGVpZ2h0ICsgMC4wNCAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgaWNvbiBvZiBpY29ucykge1xuICAgICAgICAgICAgaWNvbi53aWR0aCA9IHMgKiAwLjA1NTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RUZXh0ID0gdGV4dHNbdGV4dHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpY29uLnN0eWxlLnRvcCA9IHB4KGxhc3RUZXh0Lm9mZnNldFRvcCArIGxhc3RUZXh0Lm9mZnNldEhlaWdodCArIDAuMDMgKiBzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbaWNvbkFsaWdubWVudHMsIF9fXSA9IHhBbGlnbmluZ1dpdGhHYXBzKFtpbnN0YWdyYW1JY29uLCAwLjAzICogcywgbGlua2VkaW5JY29uLCAwLjAzICogcywgbWFpbEljb25dKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgaWNvbkFsaWdubWVudHMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IHB4KG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGllR3JlZW4gfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBjZW50ZXJTY2FsZWRZLCBnZXRTY3JvbGxIZWlnaHQsIHB4LCByZWdpc3RlclVwZGF0ZUxheW91dCwgc2V0SGVpZ2h0LCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBhZGRTY3JvbGxJbWFnZSwgYWRkU2Nyb2xsVGV4dCwgc3R5bGVTY3JvbGxUZXh0IH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuXG5pbnRlcmZhY2UgUXVvdGVEaXNwbGF5IHtcbiAgICBxdW90ZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgYXV0aG9yOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICB0aXRsZTogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgb3BlblF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbiAgICBjbG9zZVF1b3RlOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkUXVvdGUocXVvdGVUZXh0OiBzdHJpbmcsIGF1dGhvclRleHQ6IHN0cmluZywgdGl0bGVUZXh0OiBzdHJpbmcpOiBRdW90ZURpc3BsYXkge1xuICAgIGNvbnN0IHF1b3RlID0gYWRkU2Nyb2xsVGV4dChxdW90ZVRleHQpO1xuICAgIGNvbnN0IGF1dGhvciA9IGFkZFNjcm9sbFRleHQoYXV0aG9yVGV4dCk7XG4gICAgY29uc3QgdGl0bGUgPSBhZGRTY3JvbGxUZXh0KHRpdGxlVGV4dCk7XG4gICAgY29uc3Qgb3BlblF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnFwiKTtcbiAgICBjb25zdCBjbG9zZVF1b3RlID0gYWRkU2Nyb2xsVGV4dChcIuKAnVwiKTtcblxuICAgIHJldHVybiB7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVRdW90ZSh7IHF1b3RlLCBhdXRob3IsIHRpdGxlLCBvcGVuUXVvdGUsIGNsb3NlUXVvdGUgfTogUXVvdGVEaXNwbGF5KSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGNvbnN0IHdpZHRoU2NhbGUgPSAwLjc1O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChxdW90ZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE4LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDMyICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2NSAqIHMgfSk7XG5cbiAgICBzdHlsZVNjcm9sbFRleHQoYXV0aG9yLCB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzUwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAzNSAqIHMsIHdpZHRoOiB3aWR0aFNjYWxlICogcywgbGluZUhlaWdodDogMC4wNiAqIHMgfSk7XG4gICAgYXV0aG9yLnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dCh0aXRsZSwgeyBsZXR0ZXJTcGFjaW5nOiAwLjE1LCBmb250V2VpZ2h0OiAzNTAsIGNvbG9yOiBcIiMwMDAwMDBcIiwgZm9udFNpemU6IDAuMDI1ICogcywgd2lkdGg6IHdpZHRoU2NhbGUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9KTtcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG5cbiAgICBjb25zdCBxdW90ZVRleHREZXRhaWxzID0geyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IGllR3JlZW4sIGZvbnRTaXplOiAwLjE1ICogcywgd2lkdGg6IDAuMDUgKiBzLCBsaW5lSGVpZ2h0OiAwLjA2ICogcyB9O1xuICAgIHN0eWxlU2Nyb2xsVGV4dChvcGVuUXVvdGUsIHF1b3RlVGV4dERldGFpbHMpO1xuICAgIHN0eWxlU2Nyb2xsVGV4dChjbG9zZVF1b3RlLCBxdW90ZVRleHREZXRhaWxzKTtcbn1cblxuZnVuY3Rpb24gbGF5b3V0UXVvdGUoeyBxdW90ZSwgYXV0aG9yLCB0aXRsZSwgb3BlblF1b3RlLCBjbG9zZVF1b3RlIH06IFF1b3RlRGlzcGxheSwgbnVkZ2U6IG51bWJlcikge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGF1dGhvci5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCk7XG4gICAgdGl0bGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQpO1xuXG4gICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcbiAgICAgICAgcXVvdGUsIC8vXG4gICAgICAgIDAuMDQgKiBzLFxuICAgICAgICBhdXRob3IsXG4gICAgICAgIC0wLjAxNSAqIHMsXG4gICAgICAgIHRpdGxlLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gcHgob2Zmc2V0ICsgMC4zNSAqIHMpO1xuICAgIH1cblxuICAgIG9wZW5RdW90ZS5zdHlsZS5sZWZ0ID0gcHgocXVvdGUub2Zmc2V0TGVmdCAtIDAuMDcgKiBzKTtcbiAgICBvcGVuUXVvdGUuc3R5bGUudG9wID0gcHgocXVvdGUub2Zmc2V0VG9wICsgMC4wNSAqIHMpO1xuICAgIGNsb3NlUXVvdGUuc3R5bGUubGVmdCA9IHB4KHF1b3RlLm9mZnNldExlZnQgKyBxdW90ZS5vZmZzZXRXaWR0aCAtIG51ZGdlKTtcbiAgICBjbG9zZVF1b3RlLnN0eWxlLnRvcCA9IHB4KHF1b3RlLm9mZnNldFRvcCArIHF1b3RlLm9mZnNldEhlaWdodCAtIDAuMDEgKiBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsaWNrTmF2RXZvbHV0aW9uKCkge1xuICAgIGNvbnN0IGV2b2x1dGlvbiA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi5zdmdcIik7XG4gICAgY29uc3QgZXZvbHV0aW9uSGlzdG9yeSA9IGFkZFNjcm9sbEltYWdlKFwiZXZvbHV0aW9uL2V2b2x1dGlvbi1oaXN0b3J5LnN2Z1wiKTtcbiAgICBjb25zdCBsb2dvRnVsbCA9IGFkZFNjcm9sbEltYWdlKFwibG9nby1mdWxsLnN2Z1wiKTtcblxuICAgIGNvbnN0IHByb21vczogSFRNTEltYWdlRWxlbWVudFtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSBwcm9tb3MucHVzaChhZGRTY3JvbGxJbWFnZShgZXZvbHV0aW9uL3Byb21vLSR7aX0uanBnYCkpO1xuXG4gICAgY29uc3QgcXVvdGVzID0gW1xuICAgICAgICBhZGRRdW90ZShcbiAgICAgICAgICAgIFwiT3VyIGFubnVhbCBwcm9tbyBpcyBhbHdheXMgZ3JvdW5kZWQgaW4gb3VyIGlkZW50aXR5IGJ1dCBpdCdzIGZ1biB0byBwdXNoIGxpbWl0cyBhbmQgcmVpbnZlbnQgb3Vyc2VsdmVzIGVhY2ggeWVhci4gVGhlIGJlc3QgcGFydCBpcyA8c3Ryb25nPmhlYXJpbmcgd2hhdCBvdXIgY2xpZW50cyBoYXZlIHRvIHNheS48L3N0cm9uZz5cIixcbiAgICAgICAgICAgIFwiQkVUSExZTiBLUkFLQVVFUlwiLFxuICAgICAgICAgICAgXCJGb3VuZGVyLCBpLmUuIGRlc2lnbiwgaW5jLlwiXG4gICAgICAgICksXG4gICAgICAgIGFkZFF1b3RlKFwiSSBsb3ZlIGhvdyB5b3UgZG8gc3R1ZmYuIEknbSBmaW5kaW5nIHRoYXQgdGhlc2UgdHlwZXMgb2YgbWVzc2FnZXMgYXJlIHJlYWxseSA8c3Ryb25nPnRyYW5zZm9ybWluZyByZWxhdGlvbnNoaXBzPC9zdHJvbmc+IHdpdGggcGVvcGxlLiBUaGV5IGFyZSBqdXN0IGRyZWFteS5cIiwgXCJERUJSQSBTQ0hBVFpLSVwiLCBcIkZvdW5kZXIsIEJQUCBXZWFsdGggU29sdXRpb25zIExMQ1wiKSxcbiAgICAgICAgYWRkUXVvdGUoXCJJIHNlZSBhIGxvdCBvZiB0aGlzIHNwZWNpYWwgcXVhbGl0eSBpbiB5b3VyIHdvcmsuIEl0J3Mgbm90IGp1c3QgYWJvdXQgYmVpbmcgaW50ZW50aW9uYWwuIFlvdSBhbHdheXMgYnJpbmcgaW4gYW4gZWxlbWVudCBvZiA8c3Ryb25nPnN1cnByaXNlIGFuZCBkZWxpZ2h0Ljwvc3Ryb25nPlwiLCBcIkpPU0ggS1JBS0FVRVJcIiwgXCJGb3VuZGVyLCBTY3VscHRcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91ciBhcHByb2FjaCB3b3JrcyBzbyB3ZWxsIGJlY2F1c2UgaXQgaXMgcmVhbGx5IDxzdHJvbmc+cGVyc29uYWw8L3N0cm9uZz4gYW5kIGVxdWFsbHkgPHN0cm9uZz5wcm9mZXNzaW9uYWwuPC9zdHJvbmc+XCIsIFwiQU5OIFNVTExJVkFOXCIsIFwiRm91bmRlciwgQW5uIFN1bGxpdmFuIE9yZ2FuaXppbmdcIiksXG4gICAgICAgIGFkZFF1b3RlKFwiWW91IHRydWx5IHVuZGVyc3RhbmQgdGhlIHVuaXF1ZSBwb3NpdGlvbmluZyBvZiBhIHByb3NwZWN0aXZlIGNsaWVudCBhbmQgYXJlIGFibGUgdG8gPHN0cm9uZz50ZWxsIHRoZWlyIHN0b3J5PC9zdHJvbmc+IGV4YWN0bHkgYXMgaXQgc2hvdWxkIGJlIHRvbGQuXCIsIFwiREFWSUQgWVVOXCIsIFwiUHJpbmNpcGFsLCBWYXJpZGVudCBMTENcIiksXG4gICAgICAgIGFkZFF1b3RlKFxuICAgICAgICAgICAgXCJCZXRoIGlzIHF1aXRlIGZyYW5rbHkgb25lIG9mIHRoZSA8c3Ryb25nPm1vc3QgdGFsZW50ZWQgZGVzaWduZXJzPC9zdHJvbmc+IHRoYXQgSSBoYXZlIGV2ZXIgaGFkIHRoZSBwcml2aWxlZ2UgdG8gd29yayB3aXRoLiBTaGUgYWx3YXlzIGhhcyBhIHNwZWNpYWwgd2F5IG9mIG1ha2luZyBldmVyeXRoaW5nIHNoZSB0b3VjaGVzIHR1cm4gdG8gZ29sZCFcIixcbiAgICAgICAgICAgIFwiREFWSUQgUlVTSFwiLFxuICAgICAgICAgICAgXCJQcmVzaWRlbnQsIEVOVlwiXG4gICAgICAgICksXG4gICAgXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlclNjYWxlZFkoZXZvbHV0aW9uLCAwLjc1KTtcbiAgICAgICAgc2V0SGVpZ2h0KGV2b2x1dGlvbkhpc3RvcnksIDAuMyAqIHMpO1xuICAgICAgICBzZXRIZWlnaHQobG9nb0Z1bGwsIDAuNDUgKiBzKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb21vIG9mIHByb21vcykgY2VudGVyU2NhbGVkWShwcm9tbywgMSk7XG4gICAgICAgIGZvciAoY29uc3QgcXVvdGUgb2YgcXVvdGVzKSBzdHlsZVF1b3RlKHF1b3RlKTtcblxuICAgICAgICBjb25zdCBpdGVtczogKEhUTUxFbGVtZW50IHwgbnVtYmVyKVtdID0gW2V2b2x1dGlvbiwgMC4yICogcywgZXZvbHV0aW9uSGlzdG9yeV07XG5cbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgocXVvdGVzLmxlbmd0aCwgcHJvbW9zLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIDwgcXVvdGVzLmxlbmd0aCkgaXRlbXMucHVzaCgwLjMgKiBzLCBxdW90ZXNbaV0ucXVvdGUpO1xuICAgICAgICAgICAgaWYgKGkgPCBwcm9tb3MubGVuZ3RoKSBpdGVtcy5wdXNoKDAuMyAqIHMsIHByb21vc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoaXRlbXMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2b2x1dGlvbkhpc3Rvcnkuc3R5bGUudG9wID0gcHgoZXZvbHV0aW9uLm9mZnNldFRvcCArIGV2b2x1dGlvbi5vZmZzZXRIZWlnaHQgLSBldm9sdXRpb25IaXN0b3J5Lm9mZnNldEhlaWdodCk7XG5cbiAgICAgICAgbG9nb0Z1bGwuc3R5bGUubGVmdCA9IHB4KGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0TGVmdCArIChldm9sdXRpb25IaXN0b3J5Lm9mZnNldFdpZHRoIC0gbG9nb0Z1bGwub2Zmc2V0V2lkdGgpIC8gMik7XG4gICAgICAgIGxvZ29GdWxsLnN0eWxlLnRvcCA9IHB4KGV2b2x1dGlvbkhpc3Rvcnkub2Zmc2V0VG9wIC0gbG9nb0Z1bGwub2Zmc2V0SGVpZ2h0IC0gMC4xICogcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBxdW90ZSBvZiBxdW90ZXMpIGxheW91dFF1b3RlKHF1b3RlLCAwLjA1ICogcyk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBpZUJsdWUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBhbGlnbldpdGhHYXAsIGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCB5QWxpZ25pbmdXaXRoR2FwcyB9IGZyb20gXCIuLi9sYXlvdXRcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0LCBzdHlsZVNjcm9sbFRleHQgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5cbmNvbnN0IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiA9IDAuODU7XG5cbmludGVyZmFjZSBJbnNwaXJhdGlvblRpbGUge1xuICAgIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIG1ham9yOiBIVE1MRWxlbWVudDtcbiAgICBtaW5vcjogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZE1vcmU6IEhUTUxFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBzdHlsZUluc3BpcmF0aW9uVGlsZSh7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH06IEluc3BpcmF0aW9uVGlsZSkge1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBzdHlsZVNjcm9sbFRleHQobWFqb3IsIHtcbiAgICAgICAgbGV0dGVyU3BhY2luZzogMC42LFxuICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgIGNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgZm9udFNpemU6IDAuMDM2ICogcyxcbiAgICAgICAgd2lkdGg6IElOU1BJUkFUSU9OX1RJTEVfV0lEVEhfUFJPUE9SVElPTiAqIHMsXG4gICAgICAgIGxpbmVIZWlnaHQ6IDAuMDkgKiBzLFxuICAgIH0pO1xuXG4gICAgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCB7XG4gICAgICAgIGxldHRlclNwYWNpbmc6IDAuMyxcbiAgICAgICAgZm9udFdlaWdodDogMzUwLFxuICAgICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgIGZvbnRTaXplOiAwLjAyNyAqIHMsXG4gICAgICAgIHdpZHRoOiBJTlNQSVJBVElPTl9USUxFX1dJRFRIX1BST1BPUlRJT04gKiBzLFxuICAgICAgICBsaW5lSGVpZ2h0OiAwLjA1ICogcyxcbiAgICB9KTtcblxuICAgIHN0eWxlU2Nyb2xsVGV4dChyZWFkTW9yZSwge1xuICAgICAgICBsZXR0ZXJTcGFjaW5nOiAwLjUsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgY29sb3I6IGllQmx1ZSxcbiAgICAgICAgZm9udFNpemU6IDAuMDMgKiBzLFxuICAgICAgICB3aWR0aDogSU5TUElSQVRJT05fVElMRV9XSURUSF9QUk9QT1JUSU9OICogcyxcbiAgICAgICAgbGluZUhlaWdodDogMC4wNSAqIHMsXG4gICAgfSk7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSBweChzY3JvbGxIZWlnaHQgKiAwLjU1KTtcbn1cblxuZnVuY3Rpb24gYWxpZ25JbnNwaXJhdGlvblRpbGUoeyBpbWFnZSwgbWFqb3IsIG1pbm9yLCByZWFkTW9yZSB9OiBJbnNwaXJhdGlvblRpbGUpIHtcbiAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICBtYWpvci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICBtaW5vci5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcbiAgICByZWFkTW9yZS5zdHlsZS5sZWZ0ID0gaW1hZ2Uuc3R5bGUubGVmdDtcblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB5QWxpZ25pbmdXaXRoR2FwcyhbXG4gICAgICAgIGltYWdlLCAvL1xuICAgICAgICAwLjAzICogcyxcbiAgICAgICAgbWFqb3IsXG4gICAgICAgIC0wLjAxICogcyxcbiAgICAgICAgbWlub3IsXG4gICAgICAgIDAuMDEgKiBzLFxuICAgICAgICByZWFkTW9yZSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgeyBlbGVtZW50LCBvZmZzZXQgfSBvZiBlbGVtZW50QWxpZ25tZW50cykge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCArIHMgKiAwLjE1KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZEluc3BpcmF0aW9uVGlsZShpbWFnZVN0cmluZzogc3RyaW5nLCBtYWpvclRleHQ6IHN0cmluZywgbWlub3JUZXh0OiBzdHJpbmcpOiBJbnNwaXJhdGlvblRpbGUge1xuICAgIGNvbnN0IGltYWdlID0gYWRkU2Nyb2xsSW1hZ2UoaW1hZ2VTdHJpbmcpO1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9yID0gYWRkU2Nyb2xsVGV4dChtaW5vclRleHQpO1xuICAgIGNvbnN0IHJlYWRNb3JlID0gYWRkU2Nyb2xsVGV4dChcIlJlYWQgbW9yZVwiKTtcblxuICAgIHJldHVybiB7IGltYWdlLCBtYWpvciwgbWlub3IsIHJlYWRNb3JlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdkluc3BpcmF0aW9uKCkge1xuICAgIGNvbnN0IGluc3BpcmF0aW9uID0gYWRkU2Nyb2xsSW1hZ2UoXCJpbnNwaXJhdGlvbi9pbnNwaXJhdGlvbi5zdmdcIik7XG5cbiAgICBjb25zdCB0aWxlcyA9IFtcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24veXVtaWUuanBnXCIsIFwiVEhFIFNUQVJUIE9GIFNPTUVUSElORyBZVU0tSUVcIiwgXCJXZSBhbHdheXMgd2FudGVkIHRvIGRlc2lnbiBjaG9jb2xhdGUgYmFycyBhbmQgZmluYWxseSBkaWQgaXQuIEludHJvZHVjaW5nIG91ciBzd2VldCBuZXcgYnJhbmQuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi93b3Jkcy1pZGVhcy5qcGdcIiwgXCJTSEFSRSBTT01FIERFU0lHTiBMT1ZFXCIsIFwiVGhlIGkuZS4gZGVzaWduIHByb21vIGpvdXJuYWxzIGVuY291cmFnZSBjbGllbnRzIHRvIHNrZXRjaCB0aGVpciBiaWcgaWRlYXMgYW5kIGNhcHR1cmUgdGhlaXIgZHJlYW1zLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vY29vay1pZS5qcGdcIiwgXCJHT1RUQSBMT1ZFIEEgQ09PSy1JRVwiLCBcIkhvdyBhIHNlY3JldCByZWNpcGUgd29ya3MgdG8gYnJpbmcgcmVsYXRpb25zaGlwcyB0byBhIHdob2xlIG5ldyBsZXZlbC5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL3JlbWl4LmpwZ1wiLCBcIlJFTUlYXCIsIFwiQSBiZWhpbmQtdGhlLXNjZW5lcyBsb29rIGF0IGhvdyB3ZSB0cmFuc2Zvcm1lZCBjbGFzc2ljIG1lbW9yeSBjYXJyaWVycyBpbnRvIG9iamVjdHMgb2YgYXJ0LlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24va3JlbXBhLnBuZ1wiLCBcIlJFQlJBTkRJTkcgQSBGQU1JTFkgQlVTSU5FU1NcIiwgXCJBIHJlZnJlc2ggZm9yIGEgNTAteWVhciBsZWdhY3kuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9mb3Rvc3RvcmkuanBnXCIsIFwiQlJBTkRJTkcgRlJPTSBUSEUgTkFNRSBVUFwiLCBcIldoZW4gYSBjbGllbnQgaGFkIGFuIGlkZWEgZm9yIGEgYnJhbmQgc3Bpbm9mZiwgd2UgdG9vayBoZXIgY29uY2VwdCB0byByZWFsaXR5IGFuZCBsYXVuY2hlZCB0aGUgYnVzaW5lc3MgaW4gaGlnaCBzdHlsZS5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2luc3BpcmVkLTItY3JlYXRlLmpwZ1wiLCBcIklOU1BJUkVEIDIgQ1JFQVRFXCIsIFwiQSBwYWludGluZyBpbnNwaXJlZCBieSB0aGUgaS5lLiBkZXNpZ24gbG9nbyBjb21iaW5lcyBvaWwgcGFpbnRzLCBncm91bmQgdXAgY3JheW9ucywgYW5kIGEgbGVnby5cIiksXG4gICAgICAgIGFkZEluc3BpcmF0aW9uVGlsZShcImluc3BpcmF0aW9uL2Zyb20taW5zaWRlLmpwZ1wiLCBcIlRIRSBWSUVXIEZST00gSU5TSURFXCIsIFwiaS5lLiBkZXNpZ24ncyBuZXcgc3R1ZGlvIHdhcyAzMCB5ZWFycyBpbiB0aGUgbWFraW5nLlwiKSxcbiAgICAgICAgYWRkSW5zcGlyYXRpb25UaWxlKFwiaW5zcGlyYXRpb24vcmVjb25uZWN0aW5nLmpwZ1wiLCBcIlJFQ09OTkVDVElOR1wiLCBcIkhvdyB1bmNlcnRhaW4gdGltZXMgbGVkIHRvIGEgaG9tZWNvbWluZyBmb3IgaS5lLiBkZXNpZ24ncyBzZW5pb3IgZGVzaWduZXIuXCIpLFxuICAgICAgICBhZGRJbnNwaXJhdGlvblRpbGUoXCJpbnNwaXJhdGlvbi9uZXctc3R1ZGlvLmpwZ1wiLCBcIk5FVyBTVFVESU8uIE5FVyBWSUVXLlwiLCBcIkhvdyB0aGUgbmVlZCBmb3IgaW5zcGlyYXRpb24gZnVlbGVkIHRoZSBidWlsZGluZyBvZiBhIHN0dWRpby5cIiksXG4gICAgXTtcblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgIGNlbnRlclNjYWxlZFkoaW5zcGlyYXRpb24sIDAuNzUpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgc3R5bGVJbnNwaXJhdGlvblRpbGUodGlsZSk7XG5cbiAgICAgICAgYWxpZ25XaXRoR2FwKGluc3BpcmF0aW9uLCB0aWxlc1swXS5pbWFnZSwgMC4yNSAqIHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aCAtIDE7IGkrKykgYWxpZ25XaXRoR2FwKHRpbGVzW2ldLmltYWdlLCB0aWxlc1tpICsgMV0uaW1hZ2UsIDAuMSAqIHMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgdGlsZSBvZiB0aWxlcykgYWxpZ25JbnNwaXJhdGlvblRpbGUodGlsZSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgYWxpZ25TY3JvbGxUZXh0U3F1YXJlLCBjZW50ZXJTY2FsZWRYLCBjZW50ZXJTY2FsZWRZLCBnZXRTY3JvbGxIZWlnaHQsIGdldFNjcm9sbFdpZHRoLCBpc0xhbmRzY2FwZSwgcHgsIHJlZ2lzdGVyVXBkYXRlTGF5b3V0LCB4QWxpZ25pbmdXaXRoR2FwcywgeUFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XHJcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xpY2tOYXZWaWV3KCkge1xyXG4gICAgY29uc3QgaG9tZSA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ob21lLnN2Z1wiKTtcclxuICAgIGNvbnN0IGhvcml6b24gPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaG9yaXpvbi5qcGdcIik7XHJcbiAgICBjb25zdCBmcmVzaExvb2sgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvZnJlc2gtbG9vay5zdmdcIik7XHJcbiAgICBjb25zdCBncmVhdEJyYW5kcyA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9ncmVhdC1icmFuZHMuanBnXCIpO1xyXG4gICAgY29uc3QgdGV4dFRpbGUxID0gYWRkU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICBcIkdSRUFUIEJSQU5EUyBET04nVCBKVVNUIEhBUFBFTlwiLFxyXG4gICAgICAgIFwiVGhleSByZXF1aXJlIGV4cGxvcmF0aW9uLCBpbnNpZ2h0LCBhbmQgdGVuYWNpdHkuIFdlIGh1bnQgZm9yIHRoYXQgbWFnaWMgc3BhcmsgdGhhdCBpZ25pdGVzIGlubm92YXRpb24uIFdlIGJyaW5nIG91ciBleHRlbnNpdmUgc2tpbGxzIGFuZCBleHBlcmllbmNlIHRvIGVhY2ggcHJvamVjdCBhbmQgZ2l2ZSBpdCBvdXIgYWxsLiBUaGUgcmVzdWx0IGlzIGNsZWFyLCB5ZXQgZWxldmF0ZWQgY29tbXVuaWNhdGlvbiB0aGF0IG1ha2VzIHBlb3BsZSBzdG9wLCB0aGluaywgYW5kIG9mdGVuIHNtaWxlLlwiLFxyXG4gICAgICAgIFwiT3VyIHN0dWRpbyBsb2NhdGlvbiBpcyBwcm9mb3VuZGx5IGluc3BpcmluZy4gVGhlIG1hZ25pZmljZW50IHZpZXcgZmVlZHMgb3VyIHNvdWxzIGFuZCBrZWVwcyB1cyBpbnNwaXJlZCB0byBkbyBvdXIgYmVzdCB3b3JrLiBJdCdzIGEgcGxhY2Ugd2hlcmUgY3JlYXRpdmUgcGVvcGxlIGNvbWUgdG9nZXRoZXIgdG8gY29sbGFib3JhdGUgYW5kIGRyaWxsIGRvd24gdG8gdGhlIGhlYXJ0IG9mIHRoZSBtYXR0ZXIuIFRvIHNvbHZlIHByb2JsZW1zIGFuZCBicmluZyBpZGVhcyB0byBsaWZlLiBUbyBjcmVhdGUgdGhpbmdzIHdvcnRoIHJlbWVtYmVyaW5nLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW5zaWdodENsYXJpdHkgPSBhZGRTY3JvbGxJbWFnZShcInZpZXcvaW5zaWdodC1jbGFyaXR5LmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMiA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBCUklORyBWSVNJT04sIElOU0lHSFQsIEFORCBDTEFSSVRZIFRPIEVWRVJZIFBST0pFQ1RcIixcclxuICAgICAgICBcIlN1Y2Nlc3NmdWwgZGVzaWduIHN0YXJ0cyB3aXRoIGlkZW50aWZ5aW5nIGEgY2xpZW50J3MgbmVlZHMsIGdvYWxzLCBhbmQgYXNwaXJhdGlvbnMuIE91ciBvYmplY3Rpdml0eSBzaGluZXMgbGlnaHQgb24gd2hhdCBvdGhlcnMgaGF2ZSBtaXNzZWQuIFdlIGhhdmUgdGhlIGFiaWxpdHkgdG8gc2VlIGFuZCBpbnRlcnByZXQgdGhlIGlubmVyIHdvcmtpbmdzLCBjdWx0dXJlLCBhbmQgbnVhbmNlcyBvZiBvdXIgY2xpZW50J3Mgd29ybGQuIFdlIGFzayBxdWVzdGlvbnMg4oCTIGxvdHMgb2YgcXVlc3Rpb25zLiBUaGVuIGxpc3RlbiB1bnRpbCB3ZSBnYWluIHRoZSBkZWVwIHVuZGVyc3RhbmRpbmcgbmVjZXNzYXJ5IHRvIGJ1aWxkIHRoZSBzb2xpZCBmb3VuZGF0aW9uIHRoYXQgYW55IGVuZHVyaW5nIGJyYW5kIG5lZWRzLlwiLFxyXG4gICAgICAgIFwiT3VyIHNtYWxsIGJ1dCBtaWdodHkgdGVhbSBicmluZ3MgdG9nZXRoZXIgYSB3aWRlIHJhbmdlIG9mIHRhbGVudHMgYW5kIHBlcnNwZWN0aXZlcywgcGx1cyBhIG5pY2UgbGlzdCBvZiBhd2FyZHMuIFdlIHRocm93IG91ciBoZWFydHMgaW50byBvdXIgd29yayBhbmQgYXJlIGtub3duIGZvciBvdXIgZmllcmNlIGNvbW1pdG1lbnQgdG8gdGhlIHRydXN0ZWQsIGxvbmctdGVybSBwYXJ0bmVyc2hpcHMgd2UgZm9ybS4gRm9yIHVzLCBpdCdzIHBlcnNvbmFsLlwiXHJcbiAgICApO1xyXG4gICAgY29uc3Qgc2t5d2FyZCA9IGFkZFNjcm9sbEltYWdlKFwidmlldy9za3l3YXJkLmpwZ1wiKTtcclxuICAgIGNvbnN0IHRleHRUaWxlMyA9IGFkZFNjcm9sbFRleHRTcXVhcmUoXHJcbiAgICAgICAgXCJXRSBTRUUgV09SSyBJTiBBIERJRkZFUkVOVCBMSUdIVFwiLFxyXG4gICAgICAgIFwiUGVvcGxlIGxpa2UgdG8gYXNrIGFib3V0IG91ciBkZXNpZ24gcHJvY2Vzcy4gVGhlIHRydXRoIGlzIHRoYXQgdGhlIGFwcHJvYWNoIHRvIGVhY2ggcHJvamVjdCB2YXJpZXMsIGJlY2F1c2UgZWFjaCBjbGllbnQgYW5kIHRoZWlyIG5lZWRzIGFyZSB1bmlxdWUuIENyZWF0aXZlIGJyZWFrdGhyb3VnaHMgZG9uJ3QgZm9sbG93IHRoZSBjbG9jay4gVGhleSBjYW4gaGFwcGVuIGFueSB0aW1lIG9mIGRheSDigJMgb3IgbmlnaHQuIFdoZXRoZXIgYW4gZXBpcGhhbnkgaXMgaWxsdW1pbmF0ZWQgaW4gYSBzY3JpYmJsZSwgYSBkcmVhbSwgb3IgYXMgdGhlIGNsb3VkcyByb2xsIGJ5LCB3ZSBlbWJyYWNlIHRoZSBmYWN0IHRoYXQgZWFjaCBwcm9qZWN0IHRha2VzIG9uIGEgbGlmZSBvZiBpdHMgb3duLlwiLFxyXG4gICAgICAgIFwiV2hhdCdzIGNvbnN0YW50IGlzIG91ciBhYmlsaXR5IHRvIGxpc3RlbiBhbmQgZm9jdXMsIHRvIGFuYWx5emUgYW5kIGNvbm5lY3QgZG90cywgYW5kIHRvIHJlbWFpbiBjdXJpb3VzLiBUaGUgbW9zdCByZXdhcmRpbmcgcHJvamVjdHMgYXJlIHdpdGggY2xpZW50cyB3aG8gdmFsdWUgdGhlIGJhbGFuY2UgYmV0d2VlbiBwdXNoaW5nIGZvcndhcmQgYW5kIGFsbG93aW5nIHRpbWUgZm9yIHRoZSBwZXJmZWN0IHNvbHV0aW9uIHRvIGVtZXJnZS4gVGhhdCdzIG91ciBoYXBweSBwbGFjZS5cIlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0VGlsZXMgPSBbdGV4dFRpbGUxLCB0ZXh0VGlsZTIsIHRleHRUaWxlM107XHJcblxyXG4gICAgcmVnaXN0ZXJVcGRhdGVMYXlvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IEhPTUVfSE9SSVpPTl9QQUQgPSAwLjI7XHJcbiAgICAgICAgY29uc3QgRlJFU0hfTE9PS19QQUQgPSAwLjEzO1xyXG4gICAgICAgIGNvbnN0IElNQUdFX1RFWFRfU1FVQVJFX1BBRCA9IDAuMTc7XHJcblxyXG4gICAgICAgIGlmIChpc0xhbmRzY2FwZSgpKSB7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoZnJlc2hMb29rLCAwLjgpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRZKGdyZWF0QnJhbmRzLCAxKTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWShpbnNpZ2h0Q2xhcml0eSwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFkoc2t5d2FyZCwgMSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzID0gZ2V0U2Nyb2xsSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcylcclxuICAgICAgICAgICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0VGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDIuMiwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogXCIjQjNCM0IzXCIsIGZvbnRTaXplOiAwLjA2NSAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAwLjIsIGZvbnRXZWlnaHQ6IDMwMCwgY29sb3I6IFwiIzAwMDAwMFwiLCBmb250U2l6ZTogMC4wMyAqIHMsIHdpZHRoOiBTQ1JPTExfVEVYVF9XSURUSF9IRUlHSFRfUFJPUE9SVElPTiAqIHMsIGxpbmVIZWlnaHQ6IDAuMDUgKiBzIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZWxlbWVudEFsaWdubWVudHMsIF9dID0geEFsaWduaW5nV2l0aEdhcHMoW1xyXG4gICAgICAgICAgICAgICAgaG9tZSxcclxuICAgICAgICAgICAgICAgIEhPTUVfSE9SSVpPTl9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbixcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIEZSRVNIX0xPT0tfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGdyZWF0QnJhbmRzLFxyXG4gICAgICAgICAgICAgICAgSU1BR0VfVEVYVF9TUVVBUkVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIHRleHRUaWxlMS5tYWpvcixcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICBpbnNpZ2h0Q2xhcml0eSxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTIubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBJTUFHRV9URVhUX1NRVUFSRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIElNQUdFX1RFWFRfU1FVQVJFX1BBRCAqIHMsXHJcbiAgICAgICAgICAgICAgICB0ZXh0VGlsZTMubWFqb3IsXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweChvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcykgYWxpZ25TY3JvbGxUZXh0U3F1YXJlKHRleHRUaWxlLCAyMCwgMjApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoaG9tZSwgMC45NSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoaG9yaXpvbiwgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoZnJlc2hMb29rLCAwLjg1KTtcclxuICAgICAgICAgICAgY2VudGVyU2NhbGVkWChncmVhdEJyYW5kcywgMSk7XHJcbiAgICAgICAgICAgIGNlbnRlclNjYWxlZFgoaW5zaWdodENsYXJpdHksIDEpO1xyXG4gICAgICAgICAgICBjZW50ZXJTY2FsZWRYKHNreXdhcmQsIDEpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbFdpZHRoKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRleHRUaWxlIG9mIHRleHRUaWxlcylcclxuICAgICAgICAgICAgICAgIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZShcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0VGlsZSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDQsIGZvbnRXZWlnaHQ6IDM1MCwgY29sb3I6IFwiI0IzQjNCM1wiLCBmb250U2l6ZTogMC4wNiAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wOCAqIHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMDAwMDAwXCIsIGZvbnRTaXplOiAwLjAyOCAqIHMsIHdpZHRoOiAxICogcywgbGluZUhlaWdodDogMC4wNSAqIHMgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFRFWFRfVElMRV9XSURUSCA9IDAuODU7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGV4dFRpbGUgb2YgdGV4dFRpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJTY2FsZWRYKHRleHRUaWxlLm1ham9yLCBURVhUX1RJTEVfV0lEVEgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBtaW5vciBvZiB0ZXh0VGlsZS5taW5vcnMpIGNlbnRlclNjYWxlZFgobWlub3IsIFRFWFRfVElMRV9XSURUSCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IE1PQklMRV9QQUQgPSAwLjA4O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbW9iaWxlVGlsZSh0ZXh0VGlsZTogVGV4dFNxdWFyZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IFt0ZXh0VGlsZS5tYWpvciwgMC4wICogc107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIHRleHRUaWxlLm1pbm9ycykgeC5wdXNoKDAuMDQgKiBzLCBtaW5vcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgW2VsZW1lbnRBbGlnbm1lbnRzLCBfXSA9IHlBbGlnbmluZ1dpdGhHYXBzKFtcclxuICAgICAgICAgICAgICAgIGhvbWUsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGhvcml6b24sXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIGZyZXNoTG9vayxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgZ3JlYXRCcmFuZHMsXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUxKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgaW5zaWdodENsYXJpdHksXHJcbiAgICAgICAgICAgICAgICBNT0JJTEVfUEFEICogcyxcclxuICAgICAgICAgICAgICAgIC4uLm1vYmlsZVRpbGUodGV4dFRpbGUyKSxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgc2t5d2FyZCxcclxuICAgICAgICAgICAgICAgIE1PQklMRV9QQUQgKiBzLFxyXG4gICAgICAgICAgICAgICAgLi4ubW9iaWxlVGlsZSh0ZXh0VGlsZTMpLFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB7IGVsZW1lbnQsIG9mZnNldCB9IG9mIGVsZW1lbnRBbGlnbm1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IHB4KG9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBlZmZlY3QsIFNpZ25hbCB9IGZyb20gXCIuLi9zaWduYWxcIjtcbmltcG9ydCB7IGFuaW1hdGVTcHJpbmcsIFNwcmluZyB9IGZyb20gXCIuLi9zcHJpbmdcIjtcbmltcG9ydCB7IGFkZFNjcm9sbEltYWdlLCBhZGRTY3JvbGxUZXh0U3F1YXJlLCBvbk5hdk9wdGlvbkNsaWNrLCBzY3JvbGxDb250YWluZXIsIHNwYWNlVG9GaWxlLCBzdHlsZVNjcm9sbFRleHRTcXVhcmUsIFRleHRTcXVhcmUgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBhbGlnblNjcm9sbFRleHRTcXVhcmUsIGNlbnRlclNjYWxlZFksIGdldFNjcm9sbEhlaWdodCwgbWFwUmFuZ2UsIG5vdGlmeUltYWdlTG9hZGluZywgcHgsIHF1ZXVlQmVmb3JlTGF5b3V0LCByZWdpc3RlclVwZGF0ZUxheW91dCwgeEFsaWduaW5nV2l0aEdhcHMgfSBmcm9tIFwiLi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBib2R5LCBib2R5U2lnIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5pbnRlcmZhY2UgV29ya0NvbnRlbnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBXb3JrRGlzcGxheSB7XG4gICAgdGV4dFNxdWFyZTogVGV4dFNxdWFyZTtcbiAgICBpbWFnZTE6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgaW1hZ2UyOiBIVE1MSW1hZ2VFbGVtZW50O1xufVxuXG5pbnRlcmZhY2UgV29ya0l0ZW0ge1xuICAgIHRhYkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgc3ByaW5nOiBTcHJpbmc7XG4gICAgc3ByaW5nU2lnOiBTaWduYWw7XG59XG5cbmNvbnN0IHdvcmtDb250ZW50czogV29ya0NvbnRlbnRbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiYmVyd3luXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIkhhdmluZyBzcGVudCBoaXMgZW50aXJlIGNoaWxkaG9vZCBtYWtpbmcgZmlsbXMsIHRoaXMgY29tcGFueSdzIGZvdW5kZXIgbmFtZWQgaGlzIGFnZW5jeSBhZnRlciB0aGUgc3RyZWV0IG9uIHdoaWNoIGhlIHdhcyByYWlzZWQuIFdpdGggYSBoaXN0b3J5IGxpa2UgdGhhdCwgd2UgaGFkIHRvIGVsZXZhdGUgQmVyd3luIHRvIGxhbmRtYXJrIHN0YXR1cy4gVXNpbmcgY3VzdG9tIHBob3RvZ3JhcGh5IGFuZCBtYXN0ZXIgbWFuaXB1bGF0aW9uLCB3ZSBjcmVhdGVkIGEgZmxleGlibGUgc3RpY2tlciBzeXN0ZW0gdGhhdCBpcyBpbnRlcmNoYW5nZWFibGUgd2l0aCBtdWx0aS1jb2xvcmVkIHBhcGVyIHN0b2Nrcy4gRW1wbG95ZWVzIGFyZSBlbmNvdXJhZ2VkIHRvIGRlc2lnbiB0aGVpciBvd24gY29tbXVuaWNhdGlvbnMgYW5kIGdldCBhIGNvbXBsZXRlIHNlcmllcyBvZiBhd2FyZC13aW5uaW5nIGJ1c2luZXNzIGNhcmRzIHRvIGNob29zZSBmcm9tLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogRmlsbSwgVGVsZXZpc2lvbiwgVmlkZW8gUHJvZHVjdGlvblwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImsyIGtydXBwXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgYXdhcmQtd2lubmluZywgTmV3IFlvcmsgQ2l0eSBwdWJsaWMgcmVsYXRpb25zIGFuZCBtYXJrZXRpbmcgYWdlbmN5IGhhcyBhIHN1Y2Nlc3NmdWwgdHJhY2sgcmVjb3JkIGluIGlnbml0aW5nIGJyYW5kcyBmcm9tIHN0YXJ0LXVwcywgbmV3IGF1dGhvcnMsIGFuZCBjZWxlYnJpdGllcyBieSBjb25uZWN0aW5nIHRoZW0gd2l0aCBjdWx0dXJhbCB0cmVuZHMgYW5kIGluZmx1ZW5jZXJzLiBXaGVuIGl0IGNhbWUgdG8gcmVwcmVzZW50aW5nIHRoZWlyIGJyYW5kLCBLMiBjYW1lIHRvIHVzLiBCb2xkLCB2aWJyYW50LCBhbmQgZHluYW1pYywgdGhpcyB0aW1lbGVzcyBpZGVudGl0eSBzeXN0ZW0gcmVmbGVjdHMgdGhlIGZvdW5kZXIncyBmYXZvcml0ZSBjb2xvciBhbmQgdGhlIGNvbXBhbnkncyBlbmVyZ2V0aWMgY3VsdHVyZSBhbmQgZW52aXJvbm1lbnQuXCIsXG4gICAgICAgICAgICBcIkluZHVzdHJ5OiBQdWJsaWMgUmVsYXRpb25zICYgTWFya2V0aW5nIGZvciBNZWRpYVwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIndoeW1cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiQWZ0ZXIgc3VjY2Vzc2Z1bGx5IGJyYW5kaW5nIHRoZWlyIGZpcnN0IGVhdGVyeSwgdGhpcyBjbGllbnQgcmV0dXJuZWQgdG8gdXMgdG8gcmVhbGl6ZSB0aGVpciBkcmVhbSBvZiBhbiB1cHNjYWxlLCBVcHBlciBXZXN0IFNpZGUgZWF0aW5nIGRlc3RpbmF0aW9uLlwiLFxuICAgICAgICAgICAgXCJUaGUgY3VzdG9tIGxldHRlcmZvcm0gaXMgYSB3aGltc2ljYWwgcGxheSBvbiB0aGVpciB1bmlxdWUgc3BlbGxpbmcgYW5kIGNhbiByZWFkIHVwc2lkZSBkb3duLiBUaGUgdmlicmFudCBjb2xvciBwYWxldHRlIHdhcyBkZXZlbG9wZWQgaW4gcGFydG5lcnNoaXAgd2l0aCB0aGUgaW50ZXJpb3IgYXJjaGl0ZWN0dXJlIHRlYW0gdG8gY3JlYXRlIGEgd2FybSBhbmQgZXhjaXRpbmcgYXRtb3NwaGVyZS4gVGhlIGN1c3RvbSBkaWUtY3V0IGVkZ2Ugb2YgdGhlIGlkZW50aXR5IHN5c3RlbSBtaW1pY3MgdGhlIGN1cnZlIG9mIHRoZSB1bmlxdWUsIHNob3djYXNlIGJhci5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFJlc3RhdXJhbnQgJiBCYXJcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJhbm4gc3VsbGl2YW5cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgIFwiQW5uIGRyZWFtZWQgb2YgYmVpbmcg4oCcdGhlIE9wcmFo4oCdIG9mIG9yZ2FuaXppbmcuIFdlIGVzdGFibGlzaGVkIGhlciBuYW1lIGFzIHRoZSBicmFuZCBhbmQgY3JlYXRlZCBhIHRhZ2xpbmUsIHdoaWNoIHJlZmxlY3RlZCB0aGUgcGVhY2Ugb2YgbWluZCB0aGF0IGhlciBjbGllbnRzIGdldCBmcm9tIGhhdmluZyBhbmQgbWFpbnRhaW5pbmcgYW4gb3JnYW5pemVkIGxpZmUuIFRoZSBzaW1wbGUgaWNvbiBzZXJpZXMgcmVwcmVzZW50cyBlYWNoIGFyZWEgb2YgZXhwZXJ0aXNlLiBBcyB0aGUgY29tcGFueSdzIHNlcnZpY2VzIGhhdmUgZXhwYW5kZWQgb3ZlciB0aGUgeWVhcnMsIHRoZSBpZGVudGl0eSBzeXN0ZW0gaGFzIGV2b2x2ZWQgYWxvbmcgd2l0aCBpdCBhbmQgcmVtYWlucyBhcyBmcmVzaCBhcyBpdCB3YXMgZGF5IG9uZS5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IFByb2Zlc3Npb25hbCBPcmdhbml6aW5nXCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwibG9hXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICBcIlRoaXMgcHJvZmVzc2lvbmFsIG1ha2UtdXAgYXJ0aXN0IHRlYW0gY2FtZSB0byB1cyB0byBicmFuZCB0aGVpciBwYXRlbnRlZCDigJx3YXRlcnNsaWRl4oCdIGV5ZSBwZW5jaWwuIENvbG9yIG5hbWVzIGxpa2Ug4oCcR2l2aW5nIEJhY2sgQmxhY2ss4oCdIHJlZmxlY3QgdGhlIGNvbXBhbnkncyBjb21taXRtZW50IHRvIHByb3ZpZGluZyBtYWtlb3ZlcnMgZm9yIHdvbWVuIGZhY2luZyBoZWFsdGggY2hhbGxlbmdlcy4gVGhlIHBsYXlmdWwgcGFja2FnaW5nIGVsZXZhdGVzIGEgc3RhcGxlIHByb2R1Y3QgdG8gZ2lmdCB3b3J0aHkgYW5kIGdlbmVyYXRlcyBhdHRlbnRpb24gaW4gYSBzYXR1cmF0ZWQgbWFya2V0IGJ5IGZseWluZyBhYm92ZSBpdHMgZGlzcGxheSBjYXNlLiBUaGUgbW90aWYgaG9sZHMgc3BlY2lhbCBtZWFuaW5nIGZvciB0aGUgZm91bmRlciB3aG8gc2hhcmVkIHdpdGggdXMgdGhhdCB0aGUgYnV0dGVyZmx5IGlzIGEgc2lnbiB0aGF0IGhlciBiZWxvdmVkIG1vdGhlciBpcyBzdGlsbCB3aXRoIGhlci5cIixcbiAgICAgICAgICAgIFwiSW5kdXN0cnk6IEJlYXV0eSAmIENvc21ldGljc1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIndldFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUaGlzIE1hc3RlciBBcmNoaXRlY3QgYW5kIHdvcmxkLXJlbm93bmVkIHNwYSBkZXNpZ25lciB1c2VkIGhpcyByZXB1dGF0aW9uIGFuZCBleHBlcnRpc2UgaW4gaHlkcm90aGVyYXB5IHRvIGxhdW5jaCBhbiBleGNsdXNpdmUgcHJvZHVjdCBsaW5lIGZvciBsdXh1cnkgaG90ZWxzIGFuZCByZXNvcnRzLiBBIHNvb3RoaW5nLCBtdXRlZCBjb2xvciBwYWxldHRlIHdhcyBkZXNpZ25lZCB0byByZWZsZWN0IHRoZSBzY2VudCBwcm9maWxlIG9mIGVhY2ggc2VyaWVzIG9mIHNjcnVicyBhbmQgbG90aW9ucy4gQXV0aGVudGljIHdhdGVyIHNwbGFzaCBwaG90b2dyYXBoeSBzZXQgdGhlIHRvbmUgdG8gcHJvbW90ZSB0aGUgaGVhbHRoIGJlbmVmaXRzIGFuZCBhcnQgb2YgYmF0aGluZy4gVGhlIHBhY2thZ2UgZGVzaWduIGV4cGFuZGVkIHRvIGdpZnQgYW5kIHRyYXZlbCBzZXRzIHRoYXQgaW52aXRlIGd1ZXN0cyB0byB0YWtlIHRoZSBsdXh1cnkgZXhwZXJpZW5jZSBob21lLlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyeTogSGVhbHRoICYgV2VsbG5lc3MgU3Bhc1wiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcImZlcnJhZ2Ftb1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgXCJUYXNrZWQgd2l0aCBtYXJrZXRpbmcgb2ZmaWNlIHNwYWNlIGFib3ZlIHRoaXMgbHV4dXJ5IGJyYW5kJ3MgRmlmdGggQXZlbnVlIGZsYWdzaGlwLCB3ZSBmYWNlZCB0aGUgY2hhbGxlbmdlIG9mIGFuIHVua25vd24sIHNpZGUgc3RyZWV0IGVudHJhbmNlLiBIYW5kZWQgbm90aGluZyBtb3JlIHRoYW4gYW4gYXJjaGl0ZWN0J3MgcmVuZGVyaW5nLCB3ZSBlbGVnYW50bHkgYnJhbmRlZCB0aGUgYWRkcmVzcywgY2FwdHVyZWQgdGhlIGVuZXJneSBvZiB0aGUgbG9jYXRpb24sIGFuZCBnZW5lcmF0ZWQgZW5vdWdoIGJ1enogdG8gZXhwYW5kIHRoZSB2aWV3aW5nIHBhcnR5IHRvIHR3byBkYXRlcyBieSBsdXJpbmcgYnJva2VycyB3aXRoIHRoZSBwcm9taXNlIG9mIGEgRmVycmFnYW1vIHRpZS4gVGhlIHJlc3VsdHMgd2VyZSBhIHF1aWNrIGNsb3NpbmcgYW5kIGEgZmVhdHVyZSBhcnRpY2xlIGluIENyYWluJ3MgTlkgQnVzaW5lc3MgY2l0aW5nIG91ciBpbm5vdmF0aW9uIGFuZCBzdWNjZXNzIGluIGEgY2hhbGxlbmdpbmcgcmVhbCBlc3RhdGUgbWFya2V0LlwiLFxuICAgICAgICAgICAgXCJJbmR1c3RyaWVzOiBMdXh1cnkgRmFzaGlvbiwgUmVhbCBFc3RhdGVcIixcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcblxuZnVuY3Rpb24gc3R5bGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgIGZvciAoY29uc3QgeyB0ZXh0U3F1YXJlLCBpbWFnZTEsIGltYWdlMiB9IG9mIHdvcmtEaXNwbGF5cykge1xuICAgICAgICBzdHlsZVNjcm9sbFRleHRTcXVhcmUoXG4gICAgICAgICAgICB0ZXh0U3F1YXJlLFxuICAgICAgICAgICAgeyBsZXR0ZXJTcGFjaW5nOiAyLjIsIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IFwiIzMzMzMzM1wiLCBmb250U2l6ZTogMC4wNjUgKiBzLCB3aWR0aDogMSAqIHMsIGxpbmVIZWlnaHQ6IDAuMDkgKiBzIH0sXG4gICAgICAgICAgICB7IGxldHRlclNwYWNpbmc6IDAuMiwgZm9udFdlaWdodDogMzAwLCBjb2xvcjogXCIjMzMzMzMzXCIsIGZvbnRTaXplOiAwLjAzICogcywgd2lkdGg6IDEgKiBzLCBsaW5lSGVpZ2h0OiAwLjA1ICogcyB9XG4gICAgICAgICk7XG4gICAgICAgIGNlbnRlclNjYWxlZFkoaW1hZ2UxLCAxKTtcbiAgICAgICAgY2VudGVyU2NhbGVkWShpbWFnZTIsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdKSB7XG4gICAgZm9yIChjb25zdCB3b3JrQ29udGVudCBvZiB3b3JrQ29udGVudHMpIHtcbiAgICAgICAgY29uc3QgdGV4dFNxdWFyZSA9IGFkZFNjcm9sbFRleHRTcXVhcmUod29ya0NvbnRlbnQubmFtZS50b1VwcGVyQ2FzZSgpLCAuLi53b3JrQ29udGVudC5kZXNjcmlwdGlvbik7XG4gICAgICAgIGNvbnN0IGltYWdlMSA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzEuanBnYCk7XG4gICAgICAgIGNvbnN0IGltYWdlMiA9IGFkZFNjcm9sbEltYWdlKGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9LzIuanBnYCk7XG5cbiAgICAgICAgd29ya0Rpc3BsYXlzLnB1c2goeyB0ZXh0U3F1YXJlLCBpbWFnZTEsIGltYWdlMiB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxheW91dFdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXM6IFdvcmtEaXNwbGF5W10pIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGNvbnN0IHMgPSBnZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgIGZvciAoY29uc3QgeyB0ZXh0U3F1YXJlLCBpbWFnZTEsIGltYWdlMiB9IG9mIHdvcmtEaXNwbGF5cykge1xuICAgICAgICBpdGVtcy5wdXNoKFxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRleHRTcXVhcmUubWFqb3IsXG4gICAgICAgICAgICAwLjIgKiBzLFxuICAgICAgICAgICAgaW1hZ2UxLFxuICAgICAgICAgICAgMC4xNSAqIHMsXG4gICAgICAgICAgICBpbWFnZTIsXG4gICAgICAgICAgICAwLjIyICogc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IFtlbGVtZW50QWxpZ25tZW50cywgX10gPSB4QWxpZ25pbmdXaXRoR2FwcyhpdGVtcyk7XG5cbiAgICBmb3IgKGNvbnN0IHsgZWxlbWVudCwgb2Zmc2V0IH0gb2YgZWxlbWVudEFsaWdubWVudHMpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gcHgob2Zmc2V0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGlja05hdldvcmsoKSB7XG4gICAgY29uc3Qgd29ya0l0ZW1zOiBXb3JrSXRlbVtdID0gW107XG4gICAgY29uc3Qgd29ya0Rpc3BsYXlzOiBXb3JrRGlzcGxheVtdID0gW107XG5cbiAgICBjb25zdCBCT1RUT00gPSAodGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkgPT4gKGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC5vZmZzZXRIZWlnaHQpIC8gMjtcbiAgICBjb25zdCBUT1AgPSAodGFiRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkgPT4gaW5uZXJIZWlnaHQgLSB0YWJFbGVtZW50Lm9mZnNldFdpZHRoIC8gMjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya0NvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmtDb250ZW50ID0gd29ya0NvbnRlbnRzW2ldO1xuXG4gICAgICAgIGNvbnN0IHRhYkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB0YWJFbGVtZW50LnNyYyA9IGB3b3JrLyR7c3BhY2VUb0ZpbGUod29ya0NvbnRlbnQubmFtZSl9L3RhYi5wbmdgO1xuICAgICAgICBub3RpZnlJbWFnZUxvYWRpbmcodGFiRWxlbWVudCk7XG4gICAgICAgIHF1ZXVlQmVmb3JlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGFiRWxlbWVudCk7XG4gICAgICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gYm9keS5yZW1vdmVDaGlsZCh0YWJFbGVtZW50KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNwcmluZyA9IG5ldyBTcHJpbmcoMCk7XG4gICAgICAgIGNvbnN0IHNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcbiAgICAgICAgc3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDMwMCk7XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAtMC4xO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMDtcbiAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrID0gbWFwUmFuZ2Uoc3ByaW5nLnBvc2l0aW9uLCAwLCAxLCBCT1RUT00odGFiRWxlbWVudCksIFRPUCh0YWJFbGVtZW50KSk7XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLnRvcCA9IHB4KGspO1xuICAgICAgICB9LCBbc3ByaW5nU2lnLCBib2R5U2lnXSk7XG4gICAgICAgIHNwcmluZ1NpZy51cGRhdGUoKTtcblxuICAgICAgICB0YWJFbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHdvcmtJdGVtIG9mIHdvcmtJdGVtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCwgc3ByaW5nLCBzcHJpbmdTaWcgfSA9IHdvcmtJdGVtO1xuXG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3ByaW5nLnRhcmdldCA9IG1hcFJhbmdlKGlubmVySGVpZ2h0IC0gdGFiRWxlbWVudC53aWR0aCwgQk9UVE9NKHRhYkVsZW1lbnQpLCBUT1AodGFiRWxlbWVudCksIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU3ByaW5nKHNwcmluZywgc3ByaW5nU2lnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzcHJpbmcudGFyZ2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHNwcmluZy50YXJnZXQgPSAxO1xuICAgICAgICAgICAgICAgIGFuaW1hdGVTcHJpbmcoc3ByaW5nLCBzcHJpbmdTaWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAod29ya0Rpc3BsYXlzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVXb3JrRGlzcGxheXMod29ya0Rpc3BsYXlzKTtcbiAgICAgICAgICAgICAgICBib2R5U2lnLnVwZGF0ZSgpOyAvLyBobSBkb250IGxpa2UgdGhpc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPIHRoaXMgZG9lc24ndCB3b3JrIHF1aXRlIHJpZ2h0IHlldFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB3b3JrRGlzcGxheXNbaV0udGV4dFNxdWFyZS5tYWpvci5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUbyh7IGxlZnQ6IHNjcm9sbFBvc2l0aW9uLCBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3ByaW5nLnBvc2l0aW9uID0gMTtcbiAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgYW5pbWF0ZVNwcmluZyhzcHJpbmcsIHNwcmluZ1NpZyk7XG4gICAgICAgIH0sIDgwICogaSk7XG4gICAgICAgIG9uTmF2T3B0aW9uQ2xpY2sucHVzaCgoKSA9PiBjbGVhckludGVydmFsKHRpbWVvdXRIYW5kbGUpKTtcblxuICAgICAgICB3b3JrSXRlbXMucHVzaCh7IHRhYkVsZW1lbnQsIHNwcmluZywgc3ByaW5nU2lnIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBkYXRlTGF5b3V0KCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JrSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdGFiRWxlbWVudCB9ID0gd29ya0l0ZW1zW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IDMwMDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGlubmVyV2lkdGggLSAxNTA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gKGVuZCAtIHN0YXJ0KSAvICh3b3JrSXRlbXMubGVuZ3RoICogMiAtIDEpO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gd2lkdGggKiAodGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0IC8gdGFiRWxlbWVudC5uYXR1cmFsV2lkdGgpO1xuXG4gICAgICAgICAgICBjb25zdCBrID0gaW5uZXJIZWlnaHQgKiAwLjg7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0IDwgaykge1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweCh3aWR0aCk7XG4gICAgICAgICAgICAgICAgdGFiRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBweChoZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHB4KGspO1xuICAgICAgICAgICAgICAgIHRhYkVsZW1lbnQuc3R5bGUud2lkdGggPSBweChrICogKHRhYkVsZW1lbnQubmF0dXJhbFdpZHRoIC8gdGFiRWxlbWVudC5uYXR1cmFsSGVpZ2h0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJFbGVtZW50LnN0eWxlLmxlZnQgPSBweChzdGFydCArIGkgKiB3aWR0aCAqIDIpO1xuXG4gICAgICAgICAgICBzdHlsZVdvcmtEaXNwbGF5cyh3b3JrRGlzcGxheXMpO1xuICAgICAgICAgICAgY29uc3QgcyA9IGdldFNjcm9sbEhlaWdodCgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB3b3JrRGlzcGxheSBvZiB3b3JrRGlzcGxheXMpIGFsaWduU2Nyb2xsVGV4dFNxdWFyZSh3b3JrRGlzcGxheS50ZXh0U3F1YXJlLCAwLjAxICogcywgMC4wMSAqIHMpO1xuICAgICAgICAgICAgbGF5b3V0V29ya0Rpc3BsYXlzKHdvcmtEaXNwbGF5cyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImltcG9ydCB7IGVmZmVjdCwgU2lnbmFsIH0gZnJvbSBcIi4vc2lnbmFsXCI7XG5pbXBvcnQgeyBjbGlja05hdkNvbm5lY3QgfSBmcm9tIFwiLi9wYWdlcy9jb25uZWN0XCI7XG5pbXBvcnQgeyBjbGlja05hdkV2b2x1dGlvbiB9IGZyb20gXCIuL3BhZ2VzL2V2b2x1dGlvblwiO1xuaW1wb3J0IHsgY2xpY2tOYXZJbnNwaXJhdGlvbiB9IGZyb20gXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XG5pbXBvcnQgeyBjbGlja05hdlZpZXcgfSBmcm9tIFwiLi9wYWdlcy92aWV3XCI7XG5pbXBvcnQgeyBjbGlja05hdldvcmsgfSBmcm9tIFwiLi9wYWdlcy93b3JrXCI7XG5pbXBvcnQgeyBnZXRTY3JvbGxIZWlnaHQsIGdldFNjcm9sbFdpZHRoLCBpc0xhbmRzY2FwZSwgbm90aWZ5SW1hZ2VMb2FkaW5nLCBweCwgcXVldWVCZWZvcmVMYXlvdXQgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IGJvZHksIGJvZHlTaWcsIGllQmx1ZSwgaWVHcmVlbiB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVNwcmluZywgU3ByaW5nIH0gZnJvbSBcIi4vc3ByaW5nXCI7XG5cbmludGVyZmFjZSBTY3JvbGxUZXh0RGV0YWlscyB7XG4gICAgbGV0dGVyU3BhY2luZzogbnVtYmVyO1xuICAgIGZvbnRXZWlnaHQ6IG51bWJlcjtcbiAgICBjb2xvcjogc3RyaW5nO1xuICAgIGZvbnRTaXplOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBsaW5lSGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dFNxdWFyZSB7XG4gICAgbWFqb3I6IEhUTUxFbGVtZW50O1xuICAgIG1pbm9yczogSFRNTEVsZW1lbnRbXTtcbn1cblxuZXhwb3J0IGNvbnN0IHZpZXdOYXYgPSBnKFwibmF2LXZpZXdcIik7XG5leHBvcnQgY29uc3Qgd29ya05hdiA9IGcoXCJuYXYtd29ya1wiKTtcbmV4cG9ydCBjb25zdCBpbnNwaXJhdGlvbk5hdiA9IGcoXCJuYXYtaW5zcGlyYXRpb25cIik7XG5leHBvcnQgY29uc3QgZXZvbHV0aW9uTmF2ID0gZyhcIm5hdi1ldm9sdXRpb25cIik7XG5leHBvcnQgY29uc3QgY29ubmVjdE5hdiA9IGcoXCJuYXYtY29ubmVjdFwiKTtcblxuZXhwb3J0IGNvbnN0IG5hdkl0ZW1zID0gW3ZpZXdOYXYsIHdvcmtOYXYsIGluc3BpcmF0aW9uTmF2LCBldm9sdXRpb25OYXYsIGNvbm5lY3ROYXZdO1xuXG5leHBvcnQgY29uc3Qgc2Nyb2xsQ29udGFpbmVyID0gZyhcInNjcm9sbC1jb250YWluZXJcIik7XG4oc2Nyb2xsQ29udGFpbmVyLnN0eWxlIGFzIGFueSkuc2Nyb2xsYmFyQ29sb3IgPSBgJHtpZUdyZWVufSAke2llQmx1ZX01NWA7XG5cbmV4cG9ydCBjb25zdCBsb2dvID0gZyhcImxvZ29cIik7XG5cbmV4cG9ydCBsZXQgb25OYXZPcHRpb25DbGljazogKCgpID0+IHZvaWQpW10gPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGcoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkhO1xufVxuXG5jb25zdCBGQURFX0lOX0FOSU1BVElPTiA9IFwiZmFkZUluIGVhc2UgMC42c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2Nyb2xsSW1hZ2Uoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBzY3JvbGxJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgc2Nyb2xsSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc2Nyb2xsSW1hZ2Uuc3JjID0gc3JjO1xuICAgIHNjcm9sbEltYWdlLnN0eWxlLmFuaW1hdGlvbiA9IEZBREVfSU5fQU5JTUFUSU9OO1xuICAgIG5vdGlmeUltYWdlTG9hZGluZyhzY3JvbGxJbWFnZSk7XG4gICAgcXVldWVCZWZvcmVMYXlvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxDb250YWluZXIuYXBwZW5kQ2hpbGQoc2Nyb2xsSW1hZ2UpO1xuICAgICAgICBvbk5hdk9wdGlvbkNsaWNrLnB1c2goKCkgPT4gc2Nyb2xsQ29udGFpbmVyLnJlbW92ZUNoaWxkKHNjcm9sbEltYWdlKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsSW1hZ2U7XG59XG5cbmZ1bmN0aW9uIGNsaWNrQW55TmF2KG5hdkl0ZW06IEhUTUxFbGVtZW50LCBmOiAoKSA9PiB2b2lkLCBwYWdlTmFtZTogc3RyaW5nKSB7XG4gICAgbmF2SXRlbS5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcblxuICAgIG5hdkl0ZW0ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB1IG9mIG9uTmF2T3B0aW9uQ2xpY2spIHUoKTtcbiAgICAgICAgb25OYXZPcHRpb25DbGljayA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBuYXZJdGVtcykge1xuICAgICAgICAgICAgbi5zdHlsZS5jb2xvciA9IFwiIzgwODA4MFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbmF2SXRlbS5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG4gICAgICAgIGYoKTtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCBcIi8jL1wiICsgcGFnZU5hbWUpO1xuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNjcm9sbFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBzY3JvbGxUZXh0LmlubmVySFRNTCA9IHRleHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5hbmltYXRpb24gPSBGQURFX0lOX0FOSU1BVElPTjtcbiAgICBxdWV1ZUJlZm9yZUxheW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5hcHBlbmQoc2Nyb2xsVGV4dCk7XG4gICAgfSk7XG4gICAgb25OYXZPcHRpb25DbGljay5wdXNoKCgpID0+IHNjcm9sbENvbnRhaW5lci5yZW1vdmVDaGlsZChzY3JvbGxUZXh0KSk7XG5cbiAgICByZXR1cm4gc2Nyb2xsVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dChzY3JvbGxUZXh0OiBIVE1MRWxlbWVudCwgczogU2Nyb2xsVGV4dERldGFpbHMpIHtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIlNwYXJ0YW5cIjtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHNjcm9sbFRleHQuc3R5bGUuZm9udFdlaWdodCA9IFwiXCIgKyBzLmZvbnRXZWlnaHQ7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5jb2xvciA9IHMuY29sb3I7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gcHgocy5sZXR0ZXJTcGFjaW5nKTtcbiAgICBzY3JvbGxUZXh0LnN0eWxlLmZvbnRTaXplID0gcHgocy5mb250U2l6ZSk7XG4gICAgc2Nyb2xsVGV4dC5zdHlsZS53aWR0aCA9IHB4KHMud2lkdGgpO1xuICAgIHNjcm9sbFRleHQuc3R5bGUubGluZUhlaWdodCA9IHB4KHMubGluZUhlaWdodCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY3JvbGxUZXh0U3F1YXJlKG1ham9yVGV4dDogc3RyaW5nLCAuLi5taW5vclRleHRzOiBzdHJpbmdbXSk6IFRleHRTcXVhcmUge1xuICAgIGNvbnN0IG1ham9yID0gYWRkU2Nyb2xsVGV4dChtYWpvclRleHQpO1xuICAgIGNvbnN0IG1pbm9ycyA9IG1pbm9yVGV4dHMubWFwKGFkZFNjcm9sbFRleHQpO1xuICAgIHJldHVybiB7IG1ham9yLCBtaW5vcnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlU2Nyb2xsVGV4dFNxdWFyZSh7IG1ham9yLCBtaW5vcnMgfTogVGV4dFNxdWFyZSwgbWFqb3JTY3JvbGxUZXh0RGV0YWlsczogU2Nyb2xsVGV4dERldGFpbHMsIG1pbm9yU2Nyb2xsVGV4dERldGFpbHM6IFNjcm9sbFRleHREZXRhaWxzKSB7XG4gICAgc3R5bGVTY3JvbGxUZXh0KG1ham9yLCBtYWpvclNjcm9sbFRleHREZXRhaWxzKTtcbiAgICBmb3IgKGNvbnN0IG1pbm9yIG9mIG1pbm9ycykgc3R5bGVTY3JvbGxUZXh0KG1pbm9yLCBtaW5vclNjcm9sbFRleHREZXRhaWxzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwYWNlVG9GaWxlKHM6IHN0cmluZykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoXCIgXCIsIFwiLVwiKTtcbn1cblxuZWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICBjb25zdCBsZWZ0QWxpZ24gPSA4MDtcbiAgICAgICAgbG9nby5zdHlsZS53aWR0aCA9IHB4KDU1KTtcbiAgICAgICAgbG9nby5zdHlsZS5oZWlnaHQgPSBweCg1NSk7XG4gICAgICAgIGxvZ28uc3R5bGUubGVmdCA9IHB4KGxlZnRBbGlnbik7XG4gICAgICAgIGxvZ28uc3R5bGUudG9wID0gcHgobGVmdEFsaWduIC8gMik7XG5cbiAgICAgICAgZnVuY3Rpb24gYWxpZ25OYXZJdGVtKG5hdkl0ZW06IEhUTUxFbGVtZW50LCBudWRnZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBuYXZJdGVtLnN0eWxlLmxlZnQgPSBweChsZWZ0QWxpZ24pO1xuICAgICAgICAgICAgbmF2SXRlbS5zdHlsZS50b3AgPSBweChpbm5lckhlaWdodCAvIDIgKyBudWRnZSAqIDUwIC0gbmF2SXRlbS5jbGllbnRIZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFsaWduTmF2SXRlbSh2aWV3TmF2LCAtMik7XG4gICAgICAgIGFsaWduTmF2SXRlbSh3b3JrTmF2LCAtMSk7XG4gICAgICAgIGFsaWduTmF2SXRlbShpbnNwaXJhdGlvbk5hdiwgMCk7XG4gICAgICAgIGFsaWduTmF2SXRlbShldm9sdXRpb25OYXYsIDEpO1xuICAgICAgICBhbGlnbk5hdkl0ZW0oY29ubmVjdE5hdiwgMik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnVuY3Rpb24gZ29Bd2F5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBweCgtMTAwMCk7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gcHgoLTEwMDApO1xuICAgICAgICB9XG4gICAgICAgIGdvQXdheShsb2dvKTsgLy8gdGVtcG9yYXJ5XG4gICAgICAgIGdvQXdheSh2aWV3TmF2KTtcbiAgICAgICAgZ29Bd2F5KHdvcmtOYXYpO1xuICAgICAgICBnb0F3YXkoaW5zcGlyYXRpb25OYXYpO1xuICAgICAgICBnb0F3YXkoZXZvbHV0aW9uTmF2KTtcbiAgICAgICAgZ29Bd2F5KGNvbm5lY3ROYXYpO1xuICAgIH1cbn0sIFtib2R5U2lnXSk7XG5cbmVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgY29uc3QgeCA9IDI4MDtcblxuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBnZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KDAuODUgKiBpbm5lckhlaWdodCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KGlubmVyV2lkdGggLSB4KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHB4KChpbm5lckhlaWdodCAtIHNjcm9sbEhlaWdodCkgLyAyKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCh4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY3JvbGxXaWR0aCA9IGdldFNjcm9sbFdpZHRoKCk7XG4gICAgICAgIHNjcm9sbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHB4KHNjcm9sbFdpZHRoKTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHB4KGlubmVySGVpZ2h0KTtcbiAgICAgICAgc2Nyb2xsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBweCgoaW5uZXJXaWR0aCAtIHNjcm9sbFdpZHRoKSAvIDIpO1xuICAgICAgICBzY3JvbGxDb250YWluZXIuc3R5bGUudG9wID0gcHgoMCk7XG4gICAgfVxufSwgW2JvZHlTaWddKTtcblxuLy8gcmVwbGFjZSBub3JtYWwgc2Nyb2xsIGJlaGF2aW9yIHdpdGggeHkgYmVoYXZpb3Jcbi8vIHNjcm9sbENvbnRhaW5lci5vbndoZWVsID0gKGUpID0+IGUucHJldmVudERlZmF1bHQoKTtcbi8vIHNjcm9sbENvbnRhaW5lci5vbnRvdWNobW92ZSA9IChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbi8vIG9udG91Y2htb3ZlID0gKGUpID0+IHt9O1xuLy8gb253aGVlbCA9IChlKSA9PiB7XG4vLyAgICAgY29uc3QgZGVsdGFYWSA9IGUuZGVsdGFYICsgZS5kZWx0YVk7XG4vLyAgICAgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbEJ5KHsgbGVmdDogZGVsdGFYWSwgdG9wOiBkZWx0YVhZIH0pO1xuLy8gfTtcblxuY29uc3QgcGFnZXM6IFJlY29yZDxzdHJpbmcsIHsgbmF2RWxlbWVudDogSFRNTEVsZW1lbnQ7IGNsaWNrOiAoKSA9PiB2b2lkIH0+ID0ge1xuICAgIHZpZXc6IHsgY2xpY2s6IGNsaWNrTmF2VmlldywgbmF2RWxlbWVudDogdmlld05hdiB9LFxuICAgIHdvcms6IHsgY2xpY2s6IGNsaWNrTmF2V29yaywgbmF2RWxlbWVudDogd29ya05hdiB9LFxuICAgIGluc3BpcmF0aW9uOiB7IGNsaWNrOiBjbGlja05hdkluc3BpcmF0aW9uLCBuYXZFbGVtZW50OiBpbnNwaXJhdGlvbk5hdiB9LFxuICAgIGV2b2x1dGlvbjogeyBjbGljazogY2xpY2tOYXZFdm9sdXRpb24sIG5hdkVsZW1lbnQ6IGV2b2x1dGlvbk5hdiB9LFxuICAgIGNvbm5lY3Q6IHsgY2xpY2s6IGNsaWNrTmF2Q29ubmVjdCwgbmF2RWxlbWVudDogY29ubmVjdE5hdiB9LFxufTtcblxuZm9yIChjb25zdCBbcGFnZU5hbWUsIHBhZ2VdIG9mIE9iamVjdC5lbnRyaWVzKHBhZ2VzKSkgY2xpY2tBbnlOYXYocGFnZS5uYXZFbGVtZW50LCBwYWdlLmNsaWNrLCBwYWdlTmFtZSk7XG5cbmNvbnN0IHNsZWVwID0gKGRlbGF5OiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGFuaW1hdGVJbnRybygpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwibG9nby1mdWxsLnN2Z1wiKTtcbiAgICBjb25zdCBzdmdDb250ZW50ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgY29uc3Qgc3ZnID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdmdDb250ZW50LCBcImltYWdlL3N2Zyt4bWxcIikuZG9jdW1lbnRFbGVtZW50IGFzIHVua25vd24gYXMgU1ZHU1ZHRWxlbWVudDtcbiAgICBzdmcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICBib2R5LmFwcGVuZENoaWxkKHN2Zyk7XG5cbiAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoaW5uZXJIZWlnaHQgKiAwLjQpO1xuXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XG5cbiAgICBjb25zdCBzdmdTcHJpbmcgPSBuZXcgU3ByaW5nKDApO1xuICAgIHN2Z1NwcmluZy5zZXRTdGlmZm5lc3NDcml0aWNhbCg4MCk7XG4gICAgY29uc3Qgc3ZnU3ByaW5nU2lnID0gbmV3IFNpZ25hbCgpO1xuXG4gICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgc3ZnLnN0eWxlLm9wYWNpdHkgPSBcIlwiICsgc3ZnU3ByaW5nLnBvc2l0aW9uO1xuICAgICAgICBzdmcuc3R5bGUuaGVpZ2h0ID0gcHgoKDEuMyAtIHN2Z1NwcmluZy5wb3NpdGlvbikgKiBpbm5lckhlaWdodCk7XG4gICAgICAgIHN2Zy5zdHlsZS50b3AgPSBweCgoaW5uZXJIZWlnaHQgLSBzdmcuc2Nyb2xsSGVpZ2h0KSAvIDIpO1xuICAgICAgICBzdmcuc3R5bGUubGVmdCA9IHB4KChpbm5lcldpZHRoIC0gc3ZnLnNjcm9sbFdpZHRoKSAvIDIpO1xuICAgIH0sIFtzdmdTcHJpbmdTaWddKTtcblxuICAgIHN2Z1NwcmluZy50YXJnZXQgPSAxO1xuICAgIGFuaW1hdGVTcHJpbmcoc3ZnU3ByaW5nLCBzdmdTcHJpbmdTaWcpO1xuXG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgY29uc3QgZCA9IFwiZGVzaWduXCI7XG5cbiAgICBmdW5jdGlvbiBvcGFjaXR5T3V0KGVsZW1lbnQ6IFNWR0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGV0dGVyU3ByaW5nID0gbmV3IFNwcmluZygxKTtcbiAgICAgICAgbGV0dGVyU3ByaW5nLnNldFN0aWZmbmVzc0NyaXRpY2FsKDE1MCk7XG4gICAgICAgIGNvbnN0IGxldHRlclNwcmluZ1NpZyA9IG5ldyBTaWduYWwoKTtcblxuICAgICAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCJcIiArIGxldHRlclNwcmluZy5wb3NpdGlvbjtcbiAgICAgICAgfSwgW2xldHRlclNwcmluZ1NpZ10pO1xuXG4gICAgICAgIGxldHRlclNwcmluZy50YXJnZXQgPSAwO1xuICAgICAgICBhbmltYXRlU3ByaW5nKGxldHRlclNwcmluZywgbGV0dGVyU3ByaW5nU2lnKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlc2lnbkxldHRlciA9IHN2Zy5nZXRFbGVtZW50QnlJZChcImRlc2lnbi1cIiArIGRbaV0pIGFzIFNWR0VsZW1lbnQ7XG4gICAgICAgIG9wYWNpdHlPdXQoZGVzaWduTGV0dGVyKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMTIwKTtcbiAgICB9XG4gICAgY29uc3QgbCA9IFtcImJpZy1pXCIsIFwiZG90LTFcIiwgXCJiaWctZVwiLCBcImRvdC0yXCJdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZXNpZ25MZXR0ZXIgPSBzdmcuZ2V0RWxlbWVudEJ5SWQobFtpXSkgYXMgU1ZHRWxlbWVudDtcbiAgICAgICAgb3BhY2l0eU91dChkZXNpZ25MZXR0ZXIpO1xuICAgICAgICBhd2FpdCBzbGVlcCgxMjApO1xuICAgIH1cbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcblxuICAgIHN2Z1NwcmluZy50YXJnZXQgPSAwO1xuICAgIGFuaW1hdGVTcHJpbmcoc3ZnU3ByaW5nLCBzdmdTcHJpbmdTaWcpO1xuXG4gICAgYXdhaXQgc2xlZXAoNTAwKTtcbiAgICBib2R5LnJlbW92ZUNoaWxkKHN2Zyk7XG5cbiAgICB2aWV3TmF2LmNsaWNrKCk7XG59XG5cbmNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMik7XG5pZiAoaGFzaCA9PT0gXCJcIikgYW5pbWF0ZUludHJvKCk7XG5lbHNlIHtcbiAgICBjb25zdCBwYWdlID0gcGFnZXNbaGFzaF0gfHwgcGFnZXNbXCJ2aWV3XCJdO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcGFnZS5uYXZFbGVtZW50LmNsaWNrKCkpO1xufVxuIiwiZXhwb3J0IGNsYXNzIFNpZ25hbCB7XHJcbiAgICBzdWJzY3JpYmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuXHJcbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVuc3Vic2NyaWJlKHN1YnNjcmliZXI6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVycy5maWx0ZXIoKHMpID0+IHMgIT09IHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWZmZWN0KGZ1bmM6ICgpID0+IHZvaWQsIG9ic2VydmVkU2lnbmFsczogU2lnbmFsW10pIHtcclxuICAgIG9ic2VydmVkU2lnbmFscy5mb3JFYWNoKChvKSA9PiBvLnN1YnNjcmliZShmdW5jKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBib3VuZDxUPihmdW5jOiAoKSA9PiBULCBvYnNlcnZlZFNpZ25hbHM6IFNpZ25hbFtdKTogW1QsIFNpZ25hbF0ge1xyXG4gICAgY29uc3Qgc2lnbmFsID0gbmV3IFNpZ25hbCgpO1xyXG4gICAgY29uc3Qgb2JqID0gZnVuYygpO1xyXG4gICAgb2JzZXJ2ZWRTaWduYWxzLmZvckVhY2goKG9ic2VydmVkU2lnbmFsKSA9PlxyXG4gICAgICAgIG9ic2VydmVkU2lnbmFsLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob2JqIGFzIG9iamVjdCwgZnVuYygpKTtcclxuICAgICAgICAgICAgc2lnbmFsLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtvYmosIHNpZ25hbF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50U2lnbmFsKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnRPYnMgPSBuZXcgU2lnbmFsKCk7XHJcbiAgICBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcclxuICAgICAgICBlbGVtZW50T2JzLnVwZGF0ZSgpO1xyXG4gICAgfSkub2JzZXJ2ZShlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50T2JzO1xyXG59XHJcbiIsImltcG9ydCB7IFNpZ25hbCB9IGZyb20gXCIuL3NpZ25hbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNwcmluZyB7XHJcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgdGFyZ2V0OiBudW1iZXI7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBkYW1waW5nID0gMDtcclxuICAgIHN0aWZmbmVzcyA9IDA7XHJcbiAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG14JycgLSBieCcgPSBreFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGluaXRpYWxWYWx1ZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGluaXRpYWxWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aWNrKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhY2NlbGVyYXRpb24gPSB0aGlzLnN0aWZmbmVzcyAqICh0aGlzLnRhcmdldCAtIHRoaXMucG9zaXRpb24pIC0gdGhpcy5kYW1waW5nICogdGhpcy52ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IGFjY2VsZXJhdGlvbiAqIGR0O1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gKz0gdGhpcy52ZWxvY2l0eSAqIGR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0aWZmbmVzc0NyaXRpY2FsKHN0aWZmbmVzczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGlmZm5lc3MgPSBzdGlmZm5lc3M7XHJcbiAgICAgICAgdGhpcy5kYW1waW5nID0gTWF0aC5zcXJ0KDQgKiBzdGlmZm5lc3MpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0FOSU1BVElPTl9UT0xFUkFOQ0UgPSAwLjAxO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTcHJpbmcoc3ByaW5nOiBTcHJpbmcsIHNpZ25hbDogU2lnbmFsKSB7XHJcbiAgICBpZiAoc3ByaW5nLmlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc3ByaW5nLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICBsZXQgbGFzdE1pbGxpcyA9IDA7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmlyc3RGcmFtZSk7XHJcbiAgICBmdW5jdGlvbiBmaXJzdEZyYW1lKG1pbGxpczogbnVtYmVyKSB7XHJcbiAgICAgICAgbGFzdE1pbGxpcyA9IG1pbGxpcztcclxuICAgICAgICB0aWNrU3ByaW5nKG1pbGxpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGlja1NwcmluZyhtaWxsaXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHN0ZXAgPSBtaWxsaXMgLSBsYXN0TWlsbGlzO1xyXG4gICAgICAgIGxhc3RNaWxsaXMgPSBtaWxsaXM7XHJcblxyXG4gICAgICAgIHNwcmluZy50aWNrKHN0ZXAgLyAxMDAwKTtcclxuICAgICAgICBzaWduYWwudXBkYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhzcHJpbmcudGFyZ2V0IC0gc3ByaW5nLnBvc2l0aW9uKSA8IERFRkFVTFRfQU5JTUFUSU9OX1RPTEVSQU5DRSAmJiBNYXRoLmFicyhzcHJpbmcudmVsb2NpdHkpIDwgREVGQVVMVF9BTklNQVRJT05fVE9MRVJBTkNFKSB7XHJcbiAgICAgICAgICAgIHNwcmluZy5wb3NpdGlvbiA9IHNwcmluZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHNwcmluZy52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHNwcmluZy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGlja1NwcmluZyk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2xheW91dFwiO1xyXG5cclxuaW1wb3J0IFwiLi9wYWdlcy92aWV3XCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvd29ya1wiO1xyXG5pbXBvcnQgXCIuL3BhZ2VzL2luc3BpcmF0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvZXZvbHV0aW9uXCI7XHJcbmltcG9ydCBcIi4vcGFnZXMvY29ubmVjdFwiO1xyXG5cclxuaW1wb3J0IFwiLi9zaGFyZWRcIjtcclxuXHJcbi8vIGNvbnN0IHdoYXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4vLyBjb25zdCB3aGF0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vIHNldEludGVydmFsKCgpID0+IHtcclxuLy8gICAgIHdoYXQuc3R5bGUud2lkdGggPSBzZWxmLmlubmVyV2lkdGggLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdC5zdHlsZS5oZWlnaHQgPSBzZWxmLmlubmVySGVpZ2h0IC8gMiArIFwicHhcIjtcclxuLy8gICAgIHdoYXQuc3R5bGUubGVmdCA9IDAgKyBcInB4XCI7XHJcblxyXG4vLyAgICAgd2hhdDIuc3R5bGUud2lkdGggPSBzZWxmLmlubmVyV2lkdGggLyAyICsgXCJweFwiO1xyXG4vLyAgICAgd2hhdDIuc3R5bGUuaGVpZ2h0ID0gc2VsZi5pbm5lckhlaWdodCAvIDIgKyBcInB4XCI7XHJcbi8vICAgICB3aGF0Mi5zdHlsZS5sZWZ0ID0gc2VsZi5pbm5lcldpZHRoIC8gMiArIFwicHhcIjtcclxuLy8gfSwgMSk7XHJcbi8vIHdoYXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbi8vIHdoYXQyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4vLyB3aGF0LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xyXG4vLyB3aGF0Mi5zdHlsZS5iYWNrZ3JvdW5kID0gXCJncmVlblwiO1xyXG4vLyB3aGF0LnN0eWxlLnpJbmRleCA9IFwiMVwiO1xyXG4vLyB3aGF0Mi5zdHlsZS56SW5kZXggPSBcIjFcIjtcclxuXHJcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod2hhdCk7XHJcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod2hhdDIpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=