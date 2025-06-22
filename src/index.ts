import { colorOnHover, createElementSVG, setAttributes, sleep } from "./util";
import { body, bodySig, fadeInAnimation, gray, ieGreen } from "./constants";
import { centerElement, isLandscape, px, styleText, yCenterWithGap } from "./layout";
import { cleanLastPage } from "./page";
import { addConnectPage } from "./pages/connect";
import { addEvolutionPage } from "./pages/evolution";
import { addInspirationPage } from "./pages/inspiration";
import { addViewPage } from "./pages/view";
import { addWorkPage } from "./pages/work";
import { getScrollHeight, getHeaderBarHeight, scrollContainer } from "./scroll";
import { Signal, effect } from "./signal";
import { Spring, animateSpring } from "./spring";

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
    view: addViewPage,
    work: addWorkPage,
    inspiration: addInspirationPage,
    evolution: addEvolutionPage,
    connect: addConnectPage,
};

const navElementFromString: Record<string, HTMLElement> = {};

const edgeAlignX = () => innerHeight * 0.1;
const headerIconSize = () => getHeaderBarHeight() * 0.4;

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

function addNavItems() {
    for (const [pageName, addPage] of Object.entries(pages)) {
        const navElement = document.createElement("div");
        navElement.innerHTML = pageName.toUpperCase();

        navElement.style.animation = fadeInAnimation();
        navElement.style.position = "absolute";
        navElement.style.fontFamily = "Spartan";
        navElement.style.color = gray;
        navElement.style.fontWeight = "500";
        navElement.style.cursor = "pointer";

        navElement.onclick = () => {
            cleanLastPage();

            for (const navElement of Object.values(navElements)) navElement.style.color = gray;
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
            const s = getScrollHeight();
            function alignNavItem(navItem: HTMLElement, nudge: number) {
                navItem.style.left = px(edgeAlignX());
                navItem.style.top = px(innerHeight / 2 + nudge * 50 - navItem.clientHeight / 2);
            }

            for (let i = 0; i < navElements.length; i++) {
                const navItem = navElements[i];
                alignNavItem(navItem, i - 2);

                navItem.style.fontSize = px(s * 0.025);
            }
        } else {
            function goAway(element: HTMLElement) {
                element.style.left = px(-1000);
                element.style.right = px(-1000);
            }

            for (let i = 0; i < navElements.length; i++) goAway(navElements[i]);
        }
    }, [bodySig]);
}

function addHeaderBar() {
    const headerBar = document.createElement("div");
    headerBar.style.position = "absolute";
    headerBar.style.background = "white";

    body.appendChild(headerBar);

    effect(() => {
        headerBar.style.width = px(innerWidth);
        headerBar.style.height = px(getHeaderBarHeight());
    }, [bodySig]);
}

function addMenuButton() {
    const menuButton = createElementSVG("svg");
    menuButton.style.position = "absolute";
    menuButton.style.cursor = "pointer";
    menuButton.style.zIndex = "1";
    menuButton.style.animation = fadeInAnimation();
    const strokeWidth = 4;
    const pad = 4;
    const sz = 60;
    menuButton.setAttribute("viewBox", `${-pad} ${-pad} ${sz + 2 * pad} ${sz + 2 * pad}`);

    function menuLine(y: number) {
        const line = createElementSVG("line");
        setAttributes(line, { "stroke-width": strokeWidth });
        menuButton.appendChild(line);
        return line;
    }
    const line1 = menuLine(strokeWidth / 2 + 1);
    const line2 = menuLine(sz / 2);
    const line3 = menuLine(sz - strokeWidth / 2 - 1);

    const menuSpring = new Spring(0);
    menuSpring.setStiffnessCritical(120);
    const menuSpringSig = new Signal();
    effect(() => {
        const s = menuSpring.position * sz;
        setAttributes(line1, { x1: 0, y1: 0, x2: sz, y2: s });
        line2.style.opacity = (sz - s) / sz + "";
        setAttributes(line2, { x1: 0, y1: sz / 2, x2: sz, y2: sz / 2 });
        setAttributes(line3, { x1: 0, y1: sz, x2: sz, y2: sz - s });
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
        menuButton.style.stroke = gray;
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
            colorOnHover(menuPageNav, gray, "white");

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

        closeMenu = () => {
            bodySig.unsubscribe(layoutMenu);
            menuSpringSig.unsubscribe(animateMenuOpacity);
            for (const menuPageNav of menuPageNavs) body.removeChild(menuPageNav);
            body.removeChild(menu);
        };
    }

    body.appendChild(menuButton);

    effect(() => {
        const size = headerIconSize();
        menuButton.style.width = px(size);
        menuButton.style.height = px(size);

        menuButton.style.left = px(innerWidth - size - edgeAlignX());
        menuButton.style.top = px((getHeaderBarHeight() - size) / 2);

        centerElement;
    }, [bodySig]);
}

function addLogo() {
    const logo = document.createElement("img");
    logo.style.animation = fadeInAnimation();
    logo.style.position = "absolute";
    logo.style.cursor = "pointer";
    logo.src = "logo.svg";
    body.appendChild(logo);

    logo.onclick = () => {
        navElementFromString.view.click();

        const pulse = document.createElement("div");
        pulse.style.position = "absolute";
        pulse.style.background = ieGreen;
        pulse.style.pointerEvents = "none";
        body.appendChild(pulse);

        const pulseSpring = new Spring(0);
        pulseSpring.setStiffnessCritical(40);
        const pulseSpringSig = new Signal();

        pulseSpring.target = 1;
        animateSpring(pulseSpring, pulseSpringSig);

        function animatePulse() {
            const s = pulseSpring.position;
            const out = 30;
            pulse.style.left = px(logo.offsetLeft - s * out);
            pulse.style.top = px(logo.offsetTop - s * out);

            pulse.style.width = px(logo.offsetWidth + s * 2 * out);
            pulse.style.height = px(logo.offsetHeight + s * 2 * out);

            pulse.style.opacity = 1 - s + "";
        }

        pulseSpring.onRest = () => {
            pulseSpringSig.unsubscribe(animatePulse);
            body.removeChild(pulse);
        };

        effect(animatePulse, [pulseSpringSig]);
    };

    effect(() => {
        const size = headerIconSize();
        logo.style.width = px(size);
        logo.style.height = px(size);

        logo.style.left = px(edgeAlignX());
        logo.style.top = px((getHeaderBarHeight() - size) / 2);
    }, [bodySig]);
}

function addCopyright() {
    const copyright = document.createElement("span");
    copyright.style.position = "absolute";
    copyright.innerText = "©2025 i.e. design, inc.";

    styleText(copyright, { letterSpacing: 0.3, fontWeight: 500, color: gray, fontSize: 10, lineHeight: 20 });

    body.appendChild(copyright);

    effect(() => {
        if (isLandscape()) {
            copyright.style.left = px(edgeAlignX());
            copyright.style.top = px(innerHeight * 0.9);
        } else {
            copyright.style.left = px(edgeAlignX());
            copyright.style.top = px(scrollContainer.offsetHeight);
        }
    }, [bodySig]);
}

async function setup() {
    const pageName = location.hash.substring("#/".length);
    // if (pageName === "") await animateIntro();
    addNavItems();
    addHeaderBar();
    addMenuButton();
    addLogo();
    addCopyright();

    const pageNavElement = navElementFromString[pageName] ?? navElementFromString.view;
    pageNavElement.click();
}
setup();
