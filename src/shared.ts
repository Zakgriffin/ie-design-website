import { effect, Signal } from "./signal";
import { clickNavConnect } from "./pages/connect";
import { clickNavEvolution } from "./pages/evolution";
import { clickNavInspiration } from "./pages/inspiration";
import { clickNavView } from "./pages/view";
import { clickNavWork } from "./pages/work";
import { getScrollHeight, getScrollWidth, isLandscape, px, TextSquare } from "./layout";
import { body, bodySig, FADE_IN_ANIMATION, ieBlue, ieGreen } from "./constants";
import { animateSpring, Spring } from "./spring";

interface ScrollTextDetails {
    letterSpacing: number;
    fontWeight: number;
    color: string;
    fontSize: number;
    width: number;
    lineHeight: number;
}

export const scrollContainer = document.getElementById("scroll-container");
(scrollContainer.style as any).scrollbarColor = `${ieGreen} ${ieBlue}55`;

scrollContainer.onwheel = (e) => {
    console.log("test");
    scrollContainer.scrollBy({ left: e.deltaY });
};

const pages = {
    view: clickNavView,
    work: clickNavWork,
    inspiration: clickNavInspiration,
    evolution: clickNavEvolution,
    connect: clickNavConnect,
};

export let cleanUpLastPages: (() => void)[] = [];

let imageLoadingPromises: Promise<void>[] = [];
let queuedBeforeLayouts: (() => void)[] = [];
let updateLayouts: (() => void)[] = [];

async function runUpdateLayouts() {
    if (waitingOnImages) return;

    if (imageLoadingPromises.length) {
        waitingOnImages = true;
        await Promise.all(imageLoadingPromises);
        waitingOnImages = false;

        for (const queuedBeforeLayout of queuedBeforeLayouts) queuedBeforeLayout();

        imageLoadingPromises = [];
        queuedBeforeLayouts = [];
    }

    for (const updateLayout of updateLayouts) updateLayout();
}

export async function registerUpdateLayout(updateLayout: () => void) {
    updateLayouts.push(updateLayout);
    await runUpdateLayouts();
}

let waitingOnImages = false;
export function initializeUpdateLayout() {
    effect(runUpdateLayouts, [bodySig]);
}

export function queueBeforeLayout(event: () => void) {
    queuedBeforeLayouts.push(event);
}

export function notifyImageLoading(image: HTMLImageElement) {
    imageLoadingPromises.push(image.decode());
}

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = FADE_IN_ANIMATION;
    notifyImageLoading(scrollImage);
    queueBeforeLayout(() => {
        scrollContainer.appendChild(scrollImage);
        cleanUpLastPages.push(() => scrollContainer.removeChild(scrollImage));
    });

    return scrollImage;
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = FADE_IN_ANIMATION;
    queueBeforeLayout(() => {
        scrollContainer.append(scrollText);
        cleanUpLastPages.push(() => scrollContainer.removeChild(scrollText));
    });

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
}

function createElementSVG<K extends keyof SVGElementTagNameMap>(qualifiedName: K) {
    return document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
}

function addHeaderBar() {
    const menuButton = createElementSVG("svg");
    menuButton.style.position = "absolute";
    menuButton.style.cursor = "pointer";
    const size = 60;
    const strokeWidth = 4;
    menuButton.setAttribute("viewBox", `0 0 ${size} ${size}`);

    function menuLine(y: number) {
        const line = createElementSVG("line");
        line.setAttribute("stroke-width", strokeWidth + "");
        line.setAttribute("x1", 0 + "");
        line.setAttribute("y1", y + "");
        line.setAttribute("x2", size + "");
        line.setAttribute("y2", y + "");
        line.setAttribute("stroke", "#bbbbbb");
        menuButton.appendChild(line);
    }
    menuLine(strokeWidth / 2 + 1);
    menuLine(size / 2);
    menuLine(size - strokeWidth / 2 - 1);

    menuButton.onclick = () => {
        const menu = document.createElement("div");
        menu.style.position = "fixed";
        menu.style.backgroundColor = "#000000ee";
        menu.style.width = px(innerWidth);
        menu.style.height = px(innerHeight);
        body.appendChild(menu);

        let i = 0;
        for (const [pageName, _] of Object.entries(pages)) {
            const menuPageNav = document.createElement("span");
            menuPageNav.style.position = "absolute";
            menuPageNav.innerText = pageName.toUpperCase();
            menuPageNav.style.color = "white";
            menuPageNav.style.fontFamily = "Spartan";
            menuPageNav.style.fontSize = px(innerHeight * 0.05);
            menuPageNav.style.fontWeight = "500";
            menuPageNav.style.top = px(i * 200);
            body.appendChild(menuPageNav);
            i++;
        }
    };

    body.appendChild(menuButton);

    return menuButton;
}

function addMainElements() {
    const menuButton = addHeaderBar();
    const navElementFromString: Record<string, HTMLElement> = {};

    for (const [pageName, click] of Object.entries(pages)) {
        const navElement = document.createElement("div");
        navElement.innerHTML = pageName.toUpperCase();

        navElement.style.animation = FADE_IN_ANIMATION;
        navElement.style.position = "absolute";
        navElement.style.fontFamily = "Spartan";
        navElement.style.color = "#808080";
        navElement.style.fontSize = px(13);
        navElement.style.fontWeight = "500";
        navElement.style.cursor = "pointer";

        navElement.onclick = () => {
            for (const cleanUpLastPage of cleanUpLastPages) cleanUpLastPage();
            cleanUpLastPages = [];
            updateLayouts = [];

            for (const navElement of Object.values(navElements)) navElement.style.color = "#808080";
            navElement.style.color = "#000000";

            click();
            // history.pushState({}, "", "/#/" + pageName);
        };

        body.appendChild(navElement);

        navElementFromString[pageName] = navElement;
    }

    const navElements = Object.values(navElementFromString);

    effect(() => {
        const size = innerWidth * 0.03;
        menuButton.style.width = px(size);
        menuButton.style.height = px(size);
        const fromEdge = innerWidth * 0.02;
        menuButton.style.left = px(innerWidth - size - fromEdge);
        menuButton.style.top = px(fromEdge);

        if (isLandscape()) {
            const leftAlign = 80;
            // logo.style.width = px(55);
            // logo.style.height = px(55);
            // logo.style.left = px(leftAlign);
            // logo.style.top = px(leftAlign / 2);

            function alignNavItem(navItem: HTMLElement, nudge: number) {
                navItem.style.left = px(leftAlign);
                navItem.style.top = px(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
            }

            for (let i = 0; i < navElements.length; i++) alignNavItem(navElements[i], i - 2);
        } else {
            function goAway(element: HTMLElement) {
                element.style.left = px(-1000);
                element.style.right = px(-1000);
            }

            for (let i = 0; i < navElements.length; i++) goAway(navElements[i]);
        }
    }, [bodySig]);

    const pageNavElement = navElementFromString[pageName] ?? navElementFromString.view;
    pageNavElement.click();
}

const pageName = location.hash.substring("#/".length);

async function setup() {
    initializeUpdateLayout();
    // if (pageName === "") await animateIntro();
    addMainElements();
}
setup();
