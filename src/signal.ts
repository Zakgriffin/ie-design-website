export class Signal {
    subscribers: (() => void)[] = [];

    subscribe(subscriber: () => void) {
        this.subscribers.push(subscriber);
    }

    update() {
        this.subscribers.forEach((s) => s());
    }

    unsubscribe(subscriber: () => void) {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    }
}

export function effect(func: () => void, observedSignals: Signal[]) {
    observedSignals.forEach((o) => o.subscribe(func));
}

export function bound<T>(func: () => T, observedSignals: Signal[]): [T, Signal] {
    const signal = new Signal();
    const obj = func();
    observedSignals.forEach((observedSignal) =>
        observedSignal.subscribe(() => {
            Object.assign(obj as object, func());
            signal.update();
        })
    );
    return [obj, signal];
}

export function elementSignal(element: Element) {
    const elementObs = new Signal();
    new ResizeObserver((_) => {
        elementObs.update();
    }).observe(element);
    return elementObs;
}
