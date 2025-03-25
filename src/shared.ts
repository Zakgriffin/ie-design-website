import { effect, elementSignal } from "./signal";
import { clickNavConnect } from "./pages/connect";
import { clickNavEvolution } from "./pages/evolution";
import { clickNavInspiration } from "./pages/inspiration";
import { clickNavView } from "./pages/view";
import { clickNavWork } from "./pages/work";

export const body = document.body;
export const bodySig = elementSignal(body);

export const ieBlue = "#609CCE";

export const viewNav = g("nav-view");
export const workNav = g("nav-work");
export const inspirationNav = g("nav-inspiration");
export const evolutionNav = g("nav-evolution");
export const connectNav = g("nav-connect");

export const navItems = [viewNav, workNav, inspirationNav, evolutionNav, connectNav];

export const scrollClip = g("scroll-clip");
export const scrollableItems = g("scrollable-items");

export const logo = g("logo");

export const globalSVG = g("global-svg");

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION = 0.95;

export let onNavOptionClick: (() => void)[] = [];

interface ElementAlignment {
    element: HTMLElement;
    offset: number;
}

export interface Point {
    x: number;
    y: number;
}

export function g(id: string) {
    return document.getElementById(id)!;
}

export function px(pixels: number) {
    return pixels + "px";
}

export function stupidAspectGarbage(element: HTMLImageElement) {
    // i fucking hate this layout engine
    element.style.width = px((element.naturalWidth / element.naturalHeight) * element.clientHeight);
}

export function centerImageScaled(image: HTMLImageElement, scale: number) {
    const height = scrollClip.clientHeight * scale;
    image.style.height = px(height);
    stupidAspectGarbage(image);
    image.style.top = px((scrollClip.clientHeight - height) / 2);
}

export let waiting = 0;

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    waiting++;
    scrollImage.onload = () => waiting--;
    scrollableItems.append(scrollImage);
    onNavOptionClick.push(() => scrollableItems.removeChild(scrollImage));

    return scrollImage;
}

export function mapRange(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function getScrollHeight() {
    // return scrollableItems.clientHeight;
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return window.innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}

function clickAnyNav(navItem: HTMLElement, f: () => void) {
    navItem.style.cursor = "pointer";

    navItem.onclick = () => {
        scroll = 0;
        for (const u of onNavOptionClick) u();
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

export function centerVertical(item: HTMLElement, y: number) {
    return y - item.clientHeight / 2;
}

export function alignWithGap(leftElement: HTMLElement, rightElement: HTMLElement, gap: number) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.clientWidth + gap);
}

interface ScrollTextDetails {
    letterSpacing: number;
    fontWeight: number;
    color: string;

    fontSizeScale: number;
    widthScale: number;
    lineHeightScale: number;
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollableItems.append(scrollText);
    onNavOptionClick.push(() => scrollableItems.removeChild(scrollText));

    return scrollText;
}

export function styleScrollText(scrollText: HTMLElement, s: ScrollTextDetails) {
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

function axisAligningWithGaps(axisSize: (element: HTMLElement) => number) {
    return (elementOrGaps: (HTMLElement | number)[]): [ElementAlignment[], number] => {
        const elementAlignments = [];
        let runningTotal = 0;
        for (const elementOrGap of elementOrGaps) {
            if (elementOrGap instanceof HTMLElement) {
                elementAlignments.push({ element: elementOrGap, offset: runningTotal });
                runningTotal += axisSize(elementOrGap);
            } else {
                runningTotal += elementOrGap;
            }
        }
        return [elementAlignments, runningTotal];
    };
}

export const yAligningWithGaps = axisAligningWithGaps((element) => element.clientHeight);
export const xAligningWithGaps = axisAligningWithGaps((element) => element.clientWidth);

export function addScrollTextSquare(majorText: string, ...minorTexts: string[]) {
    const major = addScrollText(majorText);
    const minors = minorTexts.map(addScrollText);
    return { major, minors };
}

interface ScrollTextSquare {
    major: HTMLElement;
    minors: HTMLElement[];
}

export function styleScrollTextSquare({ major, minors }: ScrollTextSquare, majorScrollTextDetails: ScrollTextDetails, minorScrollTextDetails: ScrollTextDetails) {
    styleScrollText(major, majorScrollTextDetails);
    for (const minor of minors) styleScrollText(minor, minorScrollTextDetails);
}

export async function registerUpdateLayout(updateLayout: () => void) {
    effect(updateLayout, [bodySig]);
    onNavOptionClick.push(() => bodySig.unsubscribe(updateLayout));

    // TODO this is abolute disgusting garbage. need to wait for images to load
    const guh = () => {
        if (waiting) {
            setTimeout(guh);
        } else {
            updateLayout();
        }
    };
    guh();
}

export function alignScrollTextSquare({ major, minors }: ScrollTextSquare, majorToMinorGap: number, betweenMinorsGap: number) {
    const items: (HTMLElement | number)[] = [];

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

export function spaceToFile(s: string) {
    return s.replace(" ", "-");
}

// real stuff

effect(() => {
    const leftAlign = 80;
    logo.style.width = px(55);
    logo.style.height = px(55);
    logo.style.left = px(leftAlign);
    logo.style.top = px(leftAlign / 2);

    function alignNavItem(navItem: HTMLElement, nudge: number) {
        navItem.style.left = px(leftAlign);
        navItem.style.top = px(window.innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
    }

    alignNavItem(viewNav, -2);
    alignNavItem(workNav, -1);
    alignNavItem(inspirationNav, 0);
    alignNavItem(evolutionNav, 1);
    alignNavItem(connectNav, 2);
}, [bodySig]);

effect(() => {
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

let maxScroll = 0;

export function setMaxScroll(element: HTMLElement) {
    maxScroll = element.offsetLeft + element.offsetWidth - scrollClip.offsetWidth + 100;
}
window.onwheel = (e) => {
    scroll += e.deltaX + e.deltaY;
    if (scroll < 0) scroll = 0;
    if (scroll > maxScroll) scroll = maxScroll;
    updateScroll();
};

clickAnyNav(logo, clickNavView);

clickAnyNav(viewNav, clickNavView);
clickAnyNav(workNav, clickNavWork);
clickAnyNav(inspirationNav, clickNavInspiration);
clickAnyNav(evolutionNav, clickNavEvolution);
clickAnyNav(connectNav, clickNavConnect);

setTimeout(() => viewNav.click());
