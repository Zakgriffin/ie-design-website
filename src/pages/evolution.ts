import { ieGreen } from "../constants";
import { aligningWithGapsX, aligningWithGapsY, px, setHeight } from "../layout";
import { registerUpdateLayout } from "../page";
import { addScrollImage, addScrollText, centerWithinScrollY, getScrollHeight, styleScrollText } from "../scroll";

interface Quote {
    quote: HTMLParagraphElement;
    author: HTMLParagraphElement;
    title: HTMLParagraphElement;
    openQuote: HTMLParagraphElement;
    closeQuote: HTMLParagraphElement;
}

function addQuote(quoteText: string, authorText: string, titleText: string): Quote {
    const quote = addScrollText(quoteText);
    const author = addScrollText(authorText);
    const title = addScrollText(titleText);
    const openQuote = addScrollText("“");
    const closeQuote = addScrollText("”");

    return { quote, author, title, openQuote, closeQuote };
}

function styleQuote({ quote, author, title, openQuote, closeQuote }: Quote) {
    const s = getScrollHeight();
    const widthScale = 0.75;
    styleScrollText(quote, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.032 * s, width: widthScale * s, lineHeight: 0.065 * s });

    styleScrollText(author, { letterSpacing: 0.2, fontWeight: 350, color: "#000000", fontSize: 0.035 * s, width: widthScale * s, lineHeight: 0.06 * s });
    author.style.textAlign = "right";

    styleScrollText(title, { letterSpacing: 0.15, fontWeight: 350, color: "#000000", fontSize: 0.025 * s, width: widthScale * s, lineHeight: 0.06 * s });
    title.style.textAlign = "right";

    const quoteTextDetails = { letterSpacing: 0.2, fontWeight: 350, color: ieGreen, fontSize: 0.15 * s, width: 0.05 * s, lineHeight: 0.06 * s };
    styleScrollText(openQuote, quoteTextDetails);
    styleScrollText(closeQuote, quoteTextDetails);
}

function layoutQuote({ quote, author, title, openQuote, closeQuote }: Quote, nudge: number) {
    const s = getScrollHeight();

    author.style.left = px(quote.offsetLeft);
    title.style.left = px(quote.offsetLeft);

    const [elementAlignments, _] = aligningWithGapsY([
        quote, //
        0.04 * s,
        author,
        -0.015 * s,
        title,
    ]);

    for (const { element, offset } of elementAlignments) {
        element.style.top = px(offset + 0.35 * s);
    }

    openQuote.style.left = px(quote.offsetLeft - 0.07 * s);
    openQuote.style.top = px(quote.offsetTop + 0.05 * s);
    closeQuote.style.left = px(quote.offsetLeft + quote.offsetWidth - nudge);
    closeQuote.style.top = px(quote.offsetTop + quote.offsetHeight - 0.01 * s);
}

export function addEvolutionPage() {
    const evolution = addScrollImage("evolution/evolution.svg");
    const evolutionHistory = addScrollImage("evolution/evolution-history.svg");
    const logoFull = addScrollImage("logo-full.svg");

    const promos: HTMLImageElement[] = [];
    for (let i = 1; i <= 5; i++) promos.push(addScrollImage(`evolution/promo-${i}.jpg`));

    const quotes = [
        addQuote(
            "Our annual promo is always grounded in our identity but it's fun to push limits and reinvent ourselves each year. The best part is <strong>hearing what our clients have to say.</strong>",
            "BETHLYN KRAKAUER",
            "Founder, i.e. design, inc."
        ),
        addQuote("I love how you do stuff. I'm finding that these types of messages are really <strong>transforming relationships</strong> with people. They are just dreamy.", "DEBRA SCHATZKI", "Founder, BPP Wealth Solutions LLC"),
        addQuote("I see a lot of this special quality in your work. It's not just about being intentional. You always bring in an element of <strong>surprise and delight.</strong>", "JOSH KRAKAUER", "Founder, Sculpt"),
        addQuote("Your approach works so well because it is really <strong>personal</strong> and equally <strong>professional.</strong>", "ANN SULLIVAN", "Founder, Ann Sullivan Organizing"),
        addQuote("You truly understand the unique positioning of a prospective client and are able to <strong>tell their story</strong> exactly as it should be told.", "DAVID YUN", "Principal, Varident LLC"),
        addQuote(
            "Beth is quite frankly one of the <strong>most talented designers</strong> that I have ever had the privilege to work with. She always has a special way of making everything she touches turn to gold!",
            "DAVID RUSH",
            "President, ENV"
        ),
    ];

    registerUpdateLayout(() => {
        const s = getScrollHeight();

        centerWithinScrollY(evolution, 0.75);
        setHeight(evolutionHistory, 0.3 * s);
        setHeight(logoFull, 0.45 * s);

        for (const promo of promos) centerWithinScrollY(promo, 1);
        for (const quote of quotes) styleQuote(quote);

        const items: (HTMLElement | number)[] = [evolution, 0.2 * s, evolutionHistory];

        const maxLength = Math.max(quotes.length, promos.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < quotes.length) items.push(0.3 * s, quotes[i].quote);
            if (i < promos.length) items.push(0.3 * s, promos[i]);
        }

        const [elementAlignments, _] = aligningWithGapsX(items);

        for (const { element, offset } of elementAlignments) {
            element.style.left = px(offset);
        }

        evolutionHistory.style.top = px(evolution.offsetTop + evolution.offsetHeight - evolutionHistory.offsetHeight);

        logoFull.style.left = px(evolutionHistory.offsetLeft + (evolutionHistory.offsetWidth - logoFull.offsetWidth) / 2);
        logoFull.style.top = px(evolutionHistory.offsetTop - logoFull.offsetHeight - 0.1 * s);

        for (const quote of quotes) layoutQuote(quote, 0.05 * s);
    });
}
