import { interlaced } from "./util";

interface ElementAlignment {
    element: HTMLElement;
    offset: number;
}

export interface TextDetails {
    letterSpacing: number;
    fontWeight: number;
    color: string;
    fontSize: number;
    width?: number;
    lineHeight: number;
}

export function px(pixels: number) {
    return pixels + "px";
}

export function alignWithGap(leftElement: HTMLElement, rightElement: HTMLElement, gap: number) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.offsetWidth + gap);
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

// ZZZZ want a short hand for common simple use
export const aligningWithGapsY = axisAligningWithGaps((element) => element.offsetHeight);
export const aligningWithGapsX = axisAligningWithGaps((element) => element.offsetWidth);

export function setWidth(element: HTMLElement, width: number) {
    element.style.width = px(width);
    if (element instanceof HTMLImageElement) element.style.height = px((width * element.naturalHeight) / element.naturalWidth);
}
export function setHeight(element: HTMLElement, height: number) {
    element.style.height = px(height);
    if (element instanceof HTMLImageElement) element.style.width = px((height * element.naturalWidth) / element.naturalHeight);
}

export function isLandscape() {
    return innerWidth / innerHeight > 1;
}

export function yCenterWithGap(elements: HTMLElement[], gap: number, center: number) {
    const elementsWithGaps = interlaced(elements, gap);
    const [elementAlignments, totalHeight] = aligningWithGapsY(elementsWithGaps);

    for (const { element, offset } of elementAlignments) {
        element.style.top = px(offset + center - totalHeight / 2);
    }
}

export function centerElement(element: HTMLElement) {
    element.style.left = px(innerWidth / 2 - element.offsetWidth / 2);
}

export function styleText(scrollText: HTMLElement, s: TextDetails) {
    scrollText.style.fontFamily = "Spartan";
    scrollText.style.position = "absolute";
    scrollText.style.fontWeight = "" + s.fontWeight;
    scrollText.style.color = s.color;
    scrollText.style.letterSpacing = px(s.letterSpacing);
    scrollText.style.fontSize = px(s.fontSize);
    if (s.width) scrollText.style.width = px(s.width);
    scrollText.style.lineHeight = px(s.lineHeight);
}
