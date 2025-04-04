import { effect, Signal } from "./signal";
import { clickNavConnect } from "./pages/connect";
import { clickNavEvolution } from "./pages/evolution";
import { clickNavInspiration } from "./pages/inspiration";
import { clickNavView } from "./pages/view";
import { clickNavWork } from "./pages/work";
import { getScrollHeight, getScrollWidth, isLandscape, notifyImageLoading, px, queueBeforeLayout } from "./layout";
import { body, bodySig, ieBlue, ieGreen } from "./constants";
import { animateSpring, Spring } from "./spring";

interface ScrollTextDetails {
    letterSpacing: number;
    fontWeight: number;
    color: string;
    fontSize: number;
    width: number;
    lineHeight: number;
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
(scrollContainer.style as any).scrollbarColor = `${ieGreen} ${ieBlue}55`;

export const logo = g("logo");

export let onNavOptionClick: (() => void)[] = [];

export function g(id: string) {
    return document.getElementById(id)!;
}

const FADE_IN_ANIMATION = "fadeIn ease 0.6s";

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = FADE_IN_ANIMATION;
    notifyImageLoading(scrollImage);
    queueBeforeLayout(() => {
        scrollContainer.appendChild(scrollImage);
        onNavOptionClick.push(() => scrollContainer.removeChild(scrollImage));
    });

    return scrollImage;
}

function clickAnyNav(navItem: HTMLElement, f: () => void, pageName: string) {
    navItem.style.cursor = "pointer";

    navItem.onclick = () => {
        for (const u of onNavOptionClick) u();
        onNavOptionClick = [];

        for (const n of navItems) {
            n.style.color = "#808080";
        }

        navItem.style.color = "#000000";

        f();
        window.history.pushState({}, "", "/#/" + pageName);
    };
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = FADE_IN_ANIMATION;
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
    scrollText.style.fontSize = px(s.fontSize);
    scrollText.style.width = px(s.width);
    scrollText.style.lineHeight = px(s.lineHeight);
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
            navItem.style.top = px(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
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
        scrollContainer.style.height = px(0.85 * innerHeight);
        scrollContainer.style.width = px(innerWidth - x);
        scrollContainer.style.top = px((innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = px(x);
    } else {
        const scrollWidth = getScrollWidth();
        scrollContainer.style.width = px(scrollWidth);
        scrollContainer.style.height = px(innerHeight);
        scrollContainer.style.left = px((innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = px(0);
    }
}, [bodySig]);

// replace normal scroll behavior with xy behavior
// scrollContainer.onwheel = (e) => e.preventDefault();
// scrollContainer.ontouchmove = (e) => e.preventDefault();

// ontouchmove = (e) => {};
// onwheel = (e) => {
//     const deltaXY = e.deltaX + e.deltaY;
//     scrollContainer.scrollBy({ left: deltaXY, top: deltaXY });
// };

const pages: Record<string, { navElement: HTMLElement; click: () => void }> = {
    view: { click: clickNavView, navElement: viewNav },
    work: { click: clickNavWork, navElement: workNav },
    inspiration: { click: clickNavInspiration, navElement: inspirationNav },
    evolution: { click: clickNavEvolution, navElement: evolutionNav },
    connect: { click: clickNavConnect, navElement: connectNav },
};

for (const [pageName, page] of Object.entries(pages)) clickAnyNav(page.navElement, page.click, pageName);

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

async function animateIntro() {
    const response = await fetch("logo-full.svg");
    const svgContent = await response.text();

    const svg = new DOMParser().parseFromString(svgContent, "image/svg+xml").documentElement as unknown as SVGSVGElement;
    svg.style.position = "absolute";
    svg.style.opacity = "0";
    body.appendChild(svg);

    svg.style.height = px(innerHeight * 0.4);

    await sleep(1000);

    const svgSpring = new Spring(0);
    svgSpring.setStiffnessCritical(80);
    const svgSpringSig = new Signal();

    effect(() => {
        svg.style.opacity = "" + svgSpring.position;
        svg.style.height = px((1.3 - svgSpring.position) * innerHeight);
        svg.style.top = px((innerHeight - svg.scrollHeight) / 2);
        svg.style.left = px((innerWidth - svg.scrollWidth) / 2);
    }, [svgSpringSig]);

    svgSpring.target = 1;
    animateSpring(svgSpring, svgSpringSig);

    await sleep(1000);
    const d = "design";

    function opacityOut(element: SVGElement) {
        const letterSpring = new Spring(1);
        letterSpring.setStiffnessCritical(150);
        const letterSpringSig = new Signal();

        effect(() => {
            element.style.opacity = "" + letterSpring.position;
        }, [letterSpringSig]);

        letterSpring.target = 0;
        animateSpring(letterSpring, letterSpringSig);
    }
    for (let i = 0; i < d.length; i++) {
        const designLetter = svg.getElementById("design-" + d[i]) as SVGElement;
        opacityOut(designLetter);
        await sleep(120);
    }
    const l = ["big-i", "dot-1", "big-e", "dot-2"];
    for (let i = 0; i < l.length; i++) {
        const designLetter = svg.getElementById(l[i]) as SVGElement;
        opacityOut(designLetter);
        await sleep(120);
    }
    await sleep(1000);

    svgSpring.target = 0;
    animateSpring(svgSpring, svgSpringSig);

    await sleep(500);
    body.removeChild(svg);

    viewNav.click();
}

const hash = window.location.hash.substring(2);
if (hash === "") animateIntro();
else {
    const page = pages[hash] || pages["view"];
    setTimeout(() => page.click());
}
