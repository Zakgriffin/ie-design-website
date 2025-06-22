export class Signal {
    subscribers = new Set<() => void>();

    subscribe(subscriber: () => void) {
        this.subscribers.add(subscriber);
    }

    update() {
        this.subscribers.forEach((s) => s());
    }

    unsubscribe(subscriber: () => void) {
        this.subscribers.delete(subscriber)
    }
}

export function effect(func: () => void, observedSignals: Signal[]) {
    observedSignals.forEach((o) => o.subscribe(func));
}

export function elementSignal(element: Element) {
    const elementObs = new Signal();
    new ResizeObserver((_) => {
        elementObs.update();
    }).observe(element);
    return elementObs;
}