import { body, bodySig, fadeInAnimation, gray, ieBlue, ieGreen } from "./constants";
import { aligningWithGapsY, centerElementX, centerElementY, isLandscape, px, setHeight, setWidth, styleText, TextDetails } from "./layout";
import { Modal } from "./modal";
import { appendChildForPage, awaitLayoutForImageLoading, registerUpdateLayout } from "./page";
import { effect } from "./signal";
import { createIconSVG, makeLine, setAttributes } from "./util";

export interface TextSquare {
    major: HTMLElement;
    minors: HTMLElement[];
}

export const scrollContainer = document.createElement("div");
scrollContainer.style.position = "absolute";
body.appendChild(scrollContainer);
(scrollContainer.style as any).scrollbarColor = `${ieGreen} ${ieBlue}55`;

scrollContainer.onwheel = (e) => {
    if (isLandscape() && !e.shiftKey) scrollContainer.scrollBy({ left: e.deltaY });
};

export const getHeaderBarHeight = () => {
    if (isLandscape()) {
        return (innerHeight - getScrollHeight()) / 2;
    } else {
        return innerHeight * 0.1;
    }
};

export function addScrollPadding() {
    const scrollPadding = document.createElement("div");
    scrollPadding.style.position = "absolute";
    scrollPadding.style.width = px(1); // any nonzero thickness is enough to extend scrollContainer
    scrollPadding.style.height = px(1);
    appendChildForPage(scrollContainer, scrollPadding);
    return scrollPadding;
}

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = fadeInAnimation();
    scrollImage.style.cursor = "pointer";

    scrollImage.onclick = () => {
        const bigImage = document.createElement("img");
        bigImage.src = src;
        bigImage.style.position = "absolute";
        bigImage.style.filter = `drop-shadow(0px 0px 15px ${ieBlue})`;

        const exitButton = createIconSVG(60);
        const exitLine = makeLine(exitButton, 12);
        const line1 = exitLine();
        const line2 = exitLine();
        exitButton.style.stroke = gray;

        setAttributes(line1, { x1: 0, y1: 0, x2: 60, y2: 60 });
        setAttributes(line2, { x1: 0, y1: 60, x2: 60, y2: 0 });

        const imageModal = new Modal(
            "#ffffffee",
            (backdrop) => {
                backdrop.appendChild(bigImage);
                backdrop.appendChild(exitButton);
            },
            (time) => {
                bigImage.style.opacity = time + "";
            },
            () => {}
        );
        imageModal.beginOpen();
        exitButton.onclick = imageModal.beginClose;

        registerUpdateLayout(() => {
            const size = 15;
            const fromEdge = 15;
            exitButton.style.width = px(size);
            exitButton.style.height = px(size);
            exitButton.style.left = px(innerWidth - size - fromEdge);
            exitButton.style.top = px(fromEdge);

            const height = innerHeight * 0.9;
            setHeight(bigImage, height);
            const minWidth = innerWidth * 0.9;
            if (bigImage.offsetWidth > minWidth) {
                setWidth(bigImage, minWidth);
            }
            centerElementX(bigImage);
            centerElementY(bigImage);
        });
    };

    awaitLayoutForImageLoading(scrollImage);
    appendChildForPage(scrollContainer, scrollImage);
    return scrollImage;
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = fadeInAnimation();
    appendChildForPage(scrollContainer, scrollText);
    return scrollText;
}

export function addScrollTextSquare(majorText: string, ...minorTexts: string[]): TextSquare {
    const major = addScrollText(majorText);
    const minors = minorTexts.map(addScrollText);
    return { major, minors };
}

export function styleScrollTextSquare({ major, minors }: TextSquare, majorTextDetails: TextDetails, minorTextDetails: TextDetails) {
    styleText(major, majorTextDetails);
    for (const minor of minors) styleText(minor, minorTextDetails);
}

effect(() => {
    if (isLandscape()) {
        const x = 280;

        const scrollHeight = getScrollHeight();
        const underScrollContainer = (innerHeight - scrollHeight) / 2;
        scrollContainer.style.height = px(scrollHeight + underScrollContainer); // place scroll bar at bottom of page
        scrollContainer.style.width = px(innerWidth - x);
        scrollContainer.style.top = px((innerHeight - scrollHeight) / 2);
        scrollContainer.style.left = px(x);

        scrollContainer.style.overflowX = "scroll";
        scrollContainer.style.overflowY = "hidden";
        scrollContainer.scrollTop = 0;
    } else {
        const scrollWidth = getScrollWidth();
        const headerBarHeight = getHeaderBarHeight();
        scrollContainer.style.width = px(scrollWidth);
        scrollContainer.style.height = px(innerHeight - headerBarHeight);
        scrollContainer.style.left = px((innerWidth - scrollWidth) / 2);
        scrollContainer.style.top = px(headerBarHeight);

        scrollContainer.style.overflowX = "hidden";
        scrollContainer.style.overflowY = "scroll";
        scrollContainer.scrollLeft = 0;
    }
}, [bodySig]);

export function getScrollHeight() {
    // return innerHeight * 0.7;
    return 1.02 * innerHeight - 0.000485 * innerHeight * innerHeight;
}

export function getScrollWidth() {
    const SCROLL_WIDTH_PROPORTION = 1;
    return innerWidth * SCROLL_WIDTH_PROPORTION;
}
export function alignScrollTextSquare({ major, minors }: TextSquare, majorToMinorGap: number, betweenMinorsGap: number) {
    const items: (HTMLElement | number)[] = [];

    items.push(major, majorToMinorGap);

    for (const minor of minors) {
        items.push(minor, betweenMinorsGap);
    }
    items.pop(); // remove final gap, only want betweens

    const scrollHeight = getScrollHeight();
    const [elementAlignments, totalHeight] = aligningWithGapsY(items);
    const groupTop = (scrollHeight - totalHeight) / 2;

    for (const { element, offset } of elementAlignments) {
        element.style.top = px(groupTop + offset);
    }

    for (const minor of minors) {
        minor.style.left = major.style.left;
    }
}

export function centerWithinScrollY(element: HTMLElement, scale: number) {
    const s = getScrollHeight();
    const height = s * scale;
    setHeight(element, height);
    element.style.top = px((s - height) / 2);
}

export function centerWithinScrollX(element: HTMLElement, scale: number) {
    const s = getScrollWidth();
    const width = s * scale;
    setWidth(element, width);
    element.style.left = px((s - width) / 2);
}
