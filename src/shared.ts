import { effect } from "./signal";
import { clickNavConnect } from "./pages/connect";
import { clickNavEvolution } from "./pages/evolution";
import { clickNavInspiration } from "./pages/inspiration";
import { clickNavView } from "./pages/view";
import { clickNavWork } from "./pages/work";
import { getScrollHeight, getScrollWidth, isLandscape, notifyImageLoading, px, queueBeforeLayout } from "./layout";
import { bodySig } from "./constants";

interface ScrollTextDetails {
    letterSpacing: number;
    fontWeight: number;
    color: string;

    fontSizeScale: number;
    widthScale: number;
    lineHeightScale: number;
}

export interface TextSquare {
    major: HTMLElement;
    minors: HTMLElement[];
}

export const viewNav = g("nav-view");
export const workNav = g("nav-work");
export const inspirationNav = g("nav-inspiration");
export const evolutionNav = g("nav-evolution");
export const connectNav = g("nav-connect");

export const navItems = [viewNav, workNav, inspirationNav, evolutionNav, connectNav];

export const scrollContainer = g("scroll-container");

export const logo = g("logo");

export let onNavOptionClick: (() => void)[] = [];

export function g(id: string) {
    return document.getElementById(id)!;
}

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    notifyImageLoading(scrollImage);
    queueBeforeLayout(() => {
        scrollContainer.appendChild(scrollImage);
        onNavOptionClick.push(() => scrollContainer.removeChild(scrollImage));
    });

    return scrollImage;
}

function clickAnyNav(navItem: HTMLElement, f: () => void) {
    navItem.style.cursor = "pointer";

    navItem.onclick = () => {
        for (const u of onNavOptionClick) u();
        onNavOptionClick = [];

        for (const n of navItems) {
            n.style.color = "#808080";
        }

        navItem.style.color = "#000000";

        f();
    };
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    queueBeforeLayout(() => {
        scrollContainer.append(scrollText);
    });
    onNavOptionClick.push(() => scrollContainer.removeChild(scrollText));

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

export function addScrollTextSquare(majorText: string, ...minorTexts: string[]): TextSquare {
    const major = addScrollText(majorText);
    const minors = minorTexts.map(addScrollText);
    return { major, minors };
}

export function styleScrollTextSquare({ major, minors }: TextSquare, majorScrollTextDetails: ScrollTextDetails, minorScrollTextDetails: ScrollTextDetails) {
    styleScrollText(major, majorScrollTextDetails);
    for (const minor of minors) styleScrollText(minor, minorScrollTextDetails);
}

export function spaceToFile(s: string) {
    return s.replace(" ", "-");
}

effect(() => {
    if (isLandscape()) {
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
    } else {
        function goAway(element: HTMLElement) {
            element.style.left = px(-1000);
            element.style.right = px(-1000);
        }
        goAway(logo); // temporary
        goAway(viewNav);
        goAway(workNav);
        goAway(inspirationNav);
        goAway(evolutionNav);
        goAway(connectNav);
    }
}, [bodySig]);

effect(() => {
    if (isLandscape()) {
        const x = 280;

        const scrollHeight = getScrollHeight();
        scrollContainer.style.height = px(scrollHeight);
        scrollContainer.style.width = px(window.innerWidth - x);
        scrollContainer.style.top = px((window.innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = px(x);
    } else {
        const scrollWidth = getScrollWidth();
        scrollContainer.style.width = px(scrollWidth);
        scrollContainer.style.height = px(window.innerHeight);
        scrollContainer.style.left = px((window.innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = px(0);
    }
}, [bodySig]);

// replace normal scroll behavior with xy behavior
scrollContainer.onwheel = (e) => e.preventDefault();
window.onwheel = (e) => {
    const deltaXY = e.deltaX + e.deltaY;
    scrollContainer.scrollBy({ left: deltaXY, top: deltaXY });
};

clickAnyNav(logo, clickNavView);

clickAnyNav(viewNav, clickNavView);
clickAnyNav(workNav, clickNavWork);
clickAnyNav(inspirationNav, clickNavInspiration);
clickAnyNav(evolutionNav, clickNavEvolution);
clickAnyNav(connectNav, clickNavConnect);

setTimeout(() => viewNav.click());
