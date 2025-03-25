import { effect, Signal } from "../signal";
import { animateSpring, Spring } from "../spring";
import {
    addScrollImage,
    addScrollTextSquare,
    alignScrollTextSquare,
    body,
    bodySig,
    centerImageScaled,
    getScrollHeight,
    mapRange,
    onNavOptionClick,
    px,
    registerUpdateLayout,
    setMaxScroll,
    spaceToFile,
    styleScrollTextSquare,
    TextSquare,
    xAligningWithGaps,
} from "../shared";

interface WorkItem {
    name: string;
    description: string[];
}

interface WorkDisplay {
    textSquare: TextSquare;
    image1: HTMLImageElement;
    image2: HTMLImageElement;
}

interface WorkTab {
    tabElement: HTMLImageElement;
    spring: Spring;
    springSig: Signal;
}

const workItems: WorkItem[] = [
    {
        name: "berwyn",
        description: [
            "Having spent his entire childhood making films, this company's founder named his agency after the street on which he was raised. With a history like that, we had to elevate Berwyn to landmark status. Using custom photography and master manipulation, we created a flexible sticker system that is interchangeable with multi-colored paper stocks. Employees are encouraged to design their own communications and get a complete series of award-winning business cards to choose from.",
            "Industry: Film, Television, Video Production",
        ],
    },
    {
        name: "k2 krupp",
        description: [
            "This award-winning, New York City public relations and marketing agency has a successful track record in igniting brands from start-ups, new authors, and celebrities by connecting them with cultural trends and influencers. When it came to representing their brand, K2 came to us. Bold, vibrant, and dynamic, this timeless identity system reflects the founder's favorite color and the company's energetic culture and environment.",
            "Industry: Public Relations & Marketing for Media",
        ],
    },
    {
        name: "whym",
        description: [
            "After successfully branding their first eatery, this client returned to us to realize their dream of an upscale, Upper West Side eating destination.",
            "The custom letterform is a whimsical play on their unique spelling and can read upside down. The vibrant color palette was developed in partnership with the interior architecture team to create a warm and exciting atmosphere. The custom die-cut edge of the identity system mimics the curve of the unique, showcase bar.",
            "Industry: Restaurant & Bar",
        ],
    },
    {
        name: "ann sullivan",
        description: [
            "Ann dreamed of being “the Oprah” of organizing. We established her name as the brand and created a tagline, which reflected the peace of mind that her clients get from having and maintaining an organized life. The simple icon series represents each area of expertise. As the company's services have expanded over the years, the identity system has evolved along with it and remains as fresh as it was day one.",
            "Industry: Professional Organizing",
        ],
    },
    {
        name: "loa",
        description: [
            "This professional make-up artist team came to us to brand their patented “waterslide” eye pencil. Color names like “Giving Back Black,” reflect the company's commitment to providing makeovers for women facing health challenges. The playful packaging elevates a staple product to gift worthy and generates attention in a saturated market by flying above its display case. The motif holds special meaning for the founder who shared with us that the butterfly is a sign that her beloved mother is still with her.",
            "Industry: Beauty & Cosmetics",
        ],
    },
    {
        name: "wet",
        description: [
            "This Master Architect and world-renowned spa designer used his reputation and expertise in hydrotherapy to launch an exclusive product line for luxury hotels and resorts. A soothing, muted color palette was designed to reflect the scent profile of each series of scrubs and lotions. Authentic water splash photography set the tone to promote the health benefits and art of bathing. The package design expanded to gift and travel sets that invite guests to take the luxury experience home.",
            "Industry: Health & Wellness Spas",
        ],
    },
    {
        name: "ferragamo",
        description: [
            "Tasked with marketing office space above this luxury brand's Fifth Avenue flagship, we faced the challenge of an unknown, side street entrance. Handed nothing more than an architect's rendering, we elegantly branded the address, captured the energy of the location, and generated enough buzz to expand the viewing party to two dates by luring brokers with the promise of a Ferragamo tie. The results were a quick closing and a feature article in Crain's NY Business citing our innovation and success in a challenging real estate market.",
            "Industries: Luxury Fashion, Real Estate",
        ],
    },
];

function styleWorkDisplays(workDisplays: WorkDisplay[]) {
    for (const workDisplay of workDisplays) {
        styleScrollTextSquare(
            workDisplay.textSquare,
            {
                letterSpacing: 2.2,
                fontWeight: 400,
                color: "#333333",
                fontSizeScale: 0.065,
                widthScale: 1,
                lineHeightScale: 0.09,
            },
            {
                letterSpacing: 0.2,
                fontWeight: 300,
                color: "#333333",
                fontSizeScale: 0.03,
                widthScale: 1,
                lineHeightScale: 0.05,
            }
        );
        centerImageScaled(workDisplay.image1, 1);
        centerImageScaled(workDisplay.image2, 1);
    }
}

function populateWorkDisplays(workDisplays: WorkDisplay[]) {
    for (const item of workItems) {
        const textSquare = addScrollTextSquare(item.name.toUpperCase(), ...item.description);
        const image1 = addScrollImage(`work/${spaceToFile(item.name)}/1.jpg`);
        const image2 = addScrollImage(`work/${spaceToFile(item.name)}/2.jpg`);

        workDisplays.push({ textSquare, image1, image2 });
    }
}

function layoutWorkDisplays(workDisplays: WorkDisplay[]) {
    const items = [];
    const s = getScrollHeight();

    for (const { textSquare, image1, image2 } of workDisplays) {
        items.push(
            //
            textSquare.major,
            0.2 * s,
            image1,
            0.15 * s,
            image2,
            0.22 * s
        );
    }

    const [elementAlignments, _] = xAligningWithGaps(items);

    for (const { element, offset } of elementAlignments) {
        element.style.left = px(offset);
    }
}

export function clickNavWork() {
    const workTabs: WorkTab[] = [];

    const workDisplays: WorkDisplay[] = [];

    for (let i = 0; i < workItems.length; i++) {
        const workItem = workItems[i];

        const tabElement = document.createElement("img");
        tabElement.style.position = "absolute";
        tabElement.style.visibility = "hidden";
        tabElement.src = `work/${spaceToFile(workItem.name)}/tab.png`;
        body.append(tabElement);
        onNavOptionClick.push(() => body.removeChild(tabElement));

        const spring = new Spring(0);
        const springSig = new Signal();
        spring.setStiffnessCritical(1000);

        tabElement.onmouseover = () => {
            spring.target = -0.1;
            animateSpring(spring, springSig, 0.01);
        };

        tabElement.onmouseleave = () => {
            spring.target = 0;
            animateSpring(spring, springSig, 0.01);
        };

        effect(() => {
            tabElement.style.top = px(mapRange(spring.position, 0, 1, (window.innerHeight - tabElement.clientHeight) / 2, window.innerHeight - tabElement.width / 2));
        }, [springSig, bodySig]);
        springSig.update();

        tabElement.onclick = () => {
            for (const { tabElement, spring, springSig } of workTabs) {
                spring.stiffness = 800;
                spring.target = 1;
                tabElement.onmouseover = () => {};
                tabElement.onmouseleave = () => {};
                animateSpring(spring, springSig, 0.01);
            }

            populateWorkDisplays(workDisplays);
            bodySig.update(); // hm dont like this
        };

        workTabs.push({ tabElement, spring, springSig });

        const timeoutHandle = setTimeout(() => {
            spring.position = 1;
            tabElement.style.visibility = "visible";
            animateSpring(spring, springSig, 0.01);
        }, 80 * i);
        onNavOptionClick.push(() => clearInterval(timeoutHandle));
    }

    registerUpdateLayout(() => {
        for (let i = 0; i < workTabs.length; i++) {
            const { tabElement } = workTabs[i];

            const start = 300;
            const end = window.innerWidth - 150;

            const width = (end - start) / (workTabs.length * 2 - 1);
            const height = width * (tabElement.naturalHeight / tabElement.naturalWidth);

            const k = window.innerHeight * 0.8;
            if (height < k) {
                tabElement.style.width = px(width);
                tabElement.style.height = px(height);
            } else {
                tabElement.style.height = px(k);
                tabElement.style.width = px(k * (tabElement.naturalWidth / tabElement.naturalHeight));
            }
            tabElement.style.left = px(start + i * width * 2);

            styleWorkDisplays(workDisplays);
            const s = getScrollHeight();
            for (const workDisplay of workDisplays) alignScrollTextSquare(workDisplay.textSquare, 0.01 * s, 0.01 * s);
            layoutWorkDisplays(workDisplays);

            if (workDisplays.length) setMaxScroll(workDisplays[workDisplays.length - 1].image2);
        }
    });
}
