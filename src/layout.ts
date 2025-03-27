import { bodySig } from "./constants";
import { onNavOptionClick, scrollContainer, TextSquare } from "./shared";
import { effect } from "./signal";

interface ElementAlignment {
    element: HTMLElement;
    offset: number;
}

let imageLoadingPromises: Promise<void>[] = [];
let queuedBeforeLayout: (() => void)[] = [];

export function px(pixels: number) {
    return pixels + "px";
}

export function mapRange(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export async function registerUpdateLayout(updateLayout: () => void) {
    const updateLayoutImageWaiting = async () => {
        await Promise.all(imageLoadingPromises);
        for (const imageLoadingAppend of queuedBeforeLayout) imageLoadingAppend();
        imageLoadingPromises = [];
        queuedBeforeLayout = [];
        updateLayout();
    };
    effect(updateLayoutImageWaiting, [bodySig]);
    onNavOptionClick.push(() => bodySig.unsubscribe(updateLayoutImageWaiting));

    updateLayoutImageWaiting();
}

export function queueBeforeLayout(event: () => void) {
    queuedBeforeLayout.push(event);
}

export function notifyImageLoading(image: HTMLImageElement) {
    imageLoadingPromises.push(image.decode());
}

export function getScrollHeight() {
    const SCROLL_HEIGHT_PROPORTION = 0.7;
    return window.innerHeight * SCROLL_HEIGHT_PROPORTION; // TODO this should just use actual scroll height
}

export function alignWithGap(leftElement: HTMLElement, rightElement: HTMLElement, gap: number) {
    rightElement.style.left = px(leftElement.offsetLeft + leftElement.clientWidth + gap);
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

export function alignScrollTextSquare({ major, minors }: TextSquare, majorToMinorGap: number, betweenMinorsGap: number) {
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

export function centerImageScaled(image: HTMLImageElement, scale: number) {
    const height = scrollContainer.clientHeight * scale;
    image.style.height = px(height);
    image.style.top = px((scrollContainer.clientHeight - height) / 2);
}
