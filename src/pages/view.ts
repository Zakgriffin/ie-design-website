import { SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION } from "../constants";
import { alignScrollTextSquare, centerScaledX, centerScaledY, getScrollHeight, getScrollWidth, isLandscape, px, registerUpdateLayout, xAligningWithGaps, yAligningWithGaps } from "../layout";
import { addScrollImage, addScrollTextSquare, styleScrollTextSquare } from "../shared";

const majorScrollTextDetails = {
    letterSpacing: 2.2,
    fontWeight: 400,
    color: "#B3B3B3",
    fontSizeScale: 0.065,
    widthScale: SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.09,
};

const minorScrollTextDetails = {
    letterSpacing: 0.2,
    fontWeight: 300,
    color: "#000000",
    fontSizeScale: 0.03,
    widthScale: SCROLL_TEXT_WIDTH_HEIGHT_PROPORTION,
    lineHeightScale: 0.05,
};

export function clickNavView() {
    const home = addScrollImage("view/home.svg");
    const horizon = addScrollImage("view/horizon.jpg");
    const freshLook = addScrollImage("view/fresh-look.svg");
    const greatBrands = addScrollImage("view/great-brands.jpg");
    const textTile1 = addScrollTextSquare(
        "GREAT BRANDS DON'T JUST HAPPEN",
        "They require exploration, insight, and tenacity. We hunt for that magic spark that ignites innovation. We bring our extensive skills and experience to each project and give it our all. The result is clear, yet elevated communication that makes people stop, think, and often smile.",
        "Our studio location is profoundly inspiring. The magnificent view feeds our souls and keeps us inspired to do our best work. It's a place where creative people come together to collaborate and drill down to the heart of the matter. To solve problems and bring ideas to life. To create things worth remembering."
    );
    const insightClarity = addScrollImage("view/insight-clarity.jpg");
    const textTile2 = addScrollTextSquare(
        "WE BRING VISION, INSIGHT, AND CLARITY TO EVERY PROJECT",
        "Successful design starts with identifying a client's needs, goals, and aspirations. Our objectivity shines light on what others have missed. We have the ability to see and interpret the inner workings, culture, and nuances of our client's world. We ask questions – lots of questions. Then listen until we gain the deep understanding necessary to build the solid foundation that any enduring brand needs.",
        "Our small but mighty team brings together a wide range of talents and perspectives, plus a nice list of awards. We throw our hearts into our work and are known for our fierce commitment to the trusted, long-term partnerships we form. For us, it's personal."
    );
    const skyward = addScrollImage("view/skyward.jpg");
    const textTile3 = addScrollTextSquare(
        "WE SEE WORK IN A DIFFERENT LIGHT",
        "People like to ask about our design process. The truth is that the approach to each project varies, because each client and their needs are unique. Creative breakthroughs don't follow the clock. They can happen any time of day – or night. Whether an epiphany is illuminated in a scribble, a dream, or as the clouds roll by, we embrace the fact that each project takes on a life of its own.",
        "What's constant is our ability to listen and focus, to analyze and connect dots, and to remain curious. The most rewarding projects are with clients who value the balance between pushing forward and allowing time for the perfect solution to emerge. That's our happy place."
    );

    const textTiles = [textTile1, textTile2, textTile3];

    registerUpdateLayout(() => {
        const HOME_HORIZON_PAD = 0.2;
        const FRESH_LOOK_PAD = 0.13;
        const IMAGE_TEXT_SQUARE_PAD = 0.17;

        if (isLandscape()) {
            centerScaledY(home, 0.95);
            centerScaledY(horizon, 1);
            centerScaledY(freshLook, 0.8);
            centerScaledY(greatBrands, 1);
            centerScaledY(insightClarity, 1);
            centerScaledY(skyward, 1);

            for (const textTile of textTiles) styleScrollTextSquare(textTile, majorScrollTextDetails, minorScrollTextDetails);

            const s = getScrollHeight();

            const [elementAlignments, _] = xAligningWithGaps([
                home,
                HOME_HORIZON_PAD * s,
                horizon,
                FRESH_LOOK_PAD * s,
                freshLook,
                FRESH_LOOK_PAD * s,
                greatBrands,
                IMAGE_TEXT_SQUARE_PAD * s,
                textTile1.major,
                IMAGE_TEXT_SQUARE_PAD * s,
                insightClarity,
                IMAGE_TEXT_SQUARE_PAD * s,
                textTile2.major,
                IMAGE_TEXT_SQUARE_PAD * s,
                skyward,
                IMAGE_TEXT_SQUARE_PAD * s,
                textTile3.major,
            ]);

            for (const { element, offset } of elementAlignments) {
                element.style.left = px(offset);
            }

            for (const textTile of textTiles) alignScrollTextSquare(textTile, 20, 20);
        } else {
            centerScaledX(home, 0.95);
            centerScaledX(horizon, 1);
            centerScaledX(freshLook, 0.8);
            centerScaledX(greatBrands, 1);
            centerScaledX(insightClarity, 1);
            centerScaledX(skyward, 1);
            for (const textTile of textTiles) styleScrollTextSquare(textTile, majorScrollTextDetails, minorScrollTextDetails);
            const s = getScrollWidth();

            const [elementAlignments, _] = yAligningWithGaps([
                //
                home,
                0.1 * s,
                horizon,
                0.1 * s,
                freshLook,
                0.1 * s,
                greatBrands,
                0.1 * s,
                textTile1.major,
                ...textTile1.minors,
                0.1 * s,
                insightClarity,
                0.1 * s,
                textTile2.major,
                ...textTile2.minors,
                0.1 * s,
                skyward,
                0.1 * s,
                textTile3.major,
                ...textTile3.minors,
            ]);
            for (const { element, offset } of elementAlignments) {
                element.style.top = px(offset);
            }

            for (const textTile of textTiles) {
                centerScaledX(textTile.major, 0.8);
                for (const minor of textTile.minors) centerScaledX(minor, 0.8);
            }
        }
    });
}
