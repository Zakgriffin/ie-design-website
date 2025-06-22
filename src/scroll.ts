import { FADE_IN_ANIMATION, bodySig, ieBlue, ieGreen } from "./constants";
import { aligningWithGapsY, isLandscape, px, setHeight, setWidth } from "./layout";
import { appendChildForPage, awaitLayoutForImageLoading } from "./page";
import { effect } from "./signal";

export interface TextSquare {
    major: HTMLElement;
    minors: HTMLElement[];
}

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
    scrollContainer.scrollBy({ left: e.deltaY });
};

export function addScrollImage(src: string): HTMLImageElement {
    const scrollImage = document.createElement("img");
    scrollImage.style.position = "absolute";
    scrollImage.src = src;
    scrollImage.style.animation = FADE_IN_ANIMATION;
    awaitLayoutForImageLoading(scrollImage);
    appendChildForPage(scrollContainer, scrollImage);

    return scrollImage;
}

export function addScrollText(text: string) {
    const scrollText = document.createElement("p");
    scrollText.innerHTML = text;
    scrollText.style.animation = FADE_IN_ANIMATION;
    appendChildForPage(scrollContainer, scrollText);
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

export function getScrollHeight() {
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}

export function getScrollWidth() {
    const SCROLL_WIDTH_PROPORTION = 1;
    return innerWidth * SCROLL_WIDTH_PROPORTION; // TODO this should just use actual scroll height
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
