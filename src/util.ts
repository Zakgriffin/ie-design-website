export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function spaceToFile(s: string) {
    return s.replace(" ", "-");
}

export function createElementSVG<K extends keyof SVGElementTagNameMap>(qualifiedName: K) {
    return document.createElementNS("http://www.w3.org/2000/svg", qualifiedName);
}

export function interlaced<T, Within>(items: T[], within: Within) {
    const itemsInterlaced = [];
    for (const item of items) {
        itemsInterlaced.push(item);
        itemsInterlaced.push(within);
    }
    itemsInterlaced.pop();
    return itemsInterlaced;
}

export function mapRange(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function colorOnHover(element: HTMLElement, color: string, hoverColor: string) {
    element.style.color = color;
    element.onmouseover = () => (element.style.color = hoverColor);
    element.onmouseleave = () => (element.style.color = color);
    element.style.transition = "color 0.2s ease-out";
}

export function setAttributes(element: Element, attributes: Record<string, any>) {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
}
