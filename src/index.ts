import { colorOnHover, createElementSVG, setAttributes, sleep } from "../util";
import { FADE_IN_ANIMATION, body, bodySig } from "./constants";
import { centerElement, isLandscape, px, yCenterWithGap } from "./layout";
import { cleanLastPage } from "./page";
import { addConnectPage } from "./pages/connect";
import { addEvolutionPage } from "./pages/evolution";
import { addInspirationPage } from "./pages/inspiration";
import { addViewPage } from "./pages/view";
import { addWorkPage } from "./pages/work";
import { scrollContainer } from "./scroll";
import { Signal, effect } from "./signal";
import { Spring, animateSpring } from "./spring";

// TODO
// strange second scrollbar on mobile
// mobile layouts
// blog pages
// mobile menu
// timeline
// fade in direction
// space at end of scroll container
// nav item styling
// connect logo squares
// end quotes
// work page
// logo top left
// image click

const pages = {
    view: addViewPage,
    work: addWorkPage,
    inspiration: addInspirationPage,
    evolution: addEvolutionPage,
    connect: addConnectPage,
};

const navElementFromString: Record<string, HTMLElement> = {};

async function animateIntro() {
    // ZZZZ clean this up
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

function addMenuButton() {
    const menuGray = "#808080";
    const menuButton = createElementSVG("svg");
    menuButton.style.position = "absolute";
    menuButton.style.cursor = "pointer";
    menuButton.style.zIndex = "1";
    const size = 60;
    const strokeWidth = 4;
    const pad = 4;
    menuButton.setAttribute("viewBox", `${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`);

    function menuLine(y: number) {
        const line = createElementSVG("line");
        setAttributes(line, { "stroke-width": strokeWidth });
        menuButton.appendChild(line);
        return line;
    }
    const line1 = menuLine(strokeWidth / 2 + 1);
    const line2 = menuLine(size / 2);
    const line3 = menuLine(size - strokeWidth / 2 - 1);

    const menuSpring = new Spring(0);
    menuSpring.setStiffnessCritical(120);
    const menuSpringSig = new Signal();
    effect(() => {
        const s = menuSpring.position * size;
        setAttributes(line1, { x1: 0, y1: 0, x2: size, y2: s });
        line2.style.opacity = (size - s) / size + "";
        setAttributes(line2, { x1: 0, y1: size / 2, x2: size, y2: size / 2 });
        setAttributes(line3, { x1: 0, y1: size, x2: size, y2: size - s });
    }, [menuSpringSig]);

    let isOpeningMenu = false;

    menuButton.onclick = () => {
        if (isOpeningMenu) beginCloseMenu();
        else beginOpenMenu();
    };

    menuSpring.onUnrest = () => {
        if (menuSpring.position === 0) openMenu();
    };

    let closeMenu: () => void | undefined;
    menuSpring.onRest = () => {
        if (menuSpring.position === 0 && closeMenu) closeMenu();
    };

    function beginOpenMenu() {
        menuButton.style.stroke = menuGray;
        menuSpring.target = 1;
        animateSpring(menuSpring, menuSpringSig);
        isOpeningMenu = true;
    }

    function beginCloseMenu() {
        menuButton.style.stroke = "#bbbbbb";
        menuSpring.target = 0;
        animateSpring(menuSpring, menuSpringSig);
        isOpeningMenu = false;
    }

    beginCloseMenu();

    function openMenu() {
        const menu = document.createElement("div");
        menu.style.position = "fixed";
        menu.style.backgroundColor = "#000000ee";
        menu.style.pointerEvents = "none";
        body.appendChild(menu);

        const menuPageNavs: HTMLElement[] = [];
        for (const [pageName, navElement] of Object.entries(navElementFromString)) {
            const menuPageNav = document.createElement("span");
            menuPageNav.style.position = "absolute";
            menuPageNav.innerText = pageName.toUpperCase();
            menuPageNav.style.fontFamily = "Spartan";
            menuPageNav.style.fontWeight = "500";
            menuPageNav.style.cursor = "pointer";
            colorOnHover(menuPageNav, menuGray, "white");

            menuPageNav.onclick = () => {
                beginCloseMenu();
                navElement.click();
            };

            body.appendChild(menuPageNav);
            menuPageNavs.push(menuPageNav);
        }

        function animateMenuOpacity() {
            for (const e of [menu, ...menuPageNavs]) e.style.opacity = menuSpring.position + "";
        }

        effect(animateMenuOpacity, [menuSpringSig]);

        const layoutMenu = () => {
            menu.style.width = px(innerWidth);
            menu.style.height = px(innerHeight);

            for (const menuPageNav of menuPageNavs) {
                menuPageNav.style.fontSize = px(innerHeight * 0.05);
                centerElement(menuPageNav);
            }
            yCenterWithGap(menuPageNavs, innerHeight * 0.08, innerHeight / 2);
        };

        effect(layoutMenu, [bodySig]);
        layoutMenu();

        closeMenu = () => {
            bodySig.unsubscribe(layoutMenu);
            menuSpringSig.unsubscribe(animateMenuOpacity);
            for (const menuPageNav of menuPageNavs) body.removeChild(menuPageNav);
            body.removeChild(menu);
        };
    }

    body.appendChild(menuButton);

    effect(() => {
        const size = innerHeight * 0.05;
        menuButton.style.width = px(size);
        menuButton.style.height = px(size);

        const fromEdge =scrollContainer.offsetTop / 2 - size / 2;
        menuButton.style.left = px(innerWidth - size - fromEdge);
        menuButton.style.top = px(fromEdge);
    }, [bodySig]);
}

function addNavItems() {
    for (const [pageName, addPage] of Object.entries(pages)) {
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
            cleanLastPage();

            for (const navElement of Object.values(navElements)) navElement.style.color = "#808080";
            navElement.style.color = "#000000";

            addPage();
            // history.pushState({}, "", "/#/" + pageName);
        };

        body.appendChild(navElement);

        navElementFromString[pageName] = navElement;
    }

    const navElements = Object.values(navElementFromString);

    effect(() => {
        if (isLandscape()) {
            const leftAlign = 80;

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
}

async function setup() {
    // if (pageName === "") await animateIntro();
    addMenuButton();
    addNavItems();

    const pageName = location.hash.substring("#/".length);
    const pageNavElement = navElementFromString[pageName] ?? navElementFromString.view;
    pageNavElement.click();
}
setup();
