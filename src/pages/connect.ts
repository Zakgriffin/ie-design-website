import { centerScaledY, getScrollHeight, px, registerUpdateLayout, setWidth, xAligningWithGaps, yAligningWithGaps } from "../layout";
import { addScrollImage, addScrollText, styleScrollText } from "../shared";

function addIcon(imageSrc: string, clickLink: string) {
    const icon = addScrollImage(imageSrc);
    icon.style.cursor = "pointer";
    icon.onclick = () => window.open(clickLink);
    return icon;
}

export function clickNavConnect() {
    const connect = addScrollImage("connect/connect.svg");
    const texts = [
        addScrollText("Our clients look to us for more than award-winning design. They value our role as trusted advisor, support, and confidant."),
        addScrollText("We look for synergy and compatibility in every relationship we build so the work experience doesn’t feel like work at all."),
        addScrollText("If your gut is telling you we should connect, now is the perfect time to email."),
    ];
    const letsMeet = addScrollImage("connect/lets-meet.jpg");
    const who = addScrollText("Bethlyn Krakauer, Founder and Creative Director");

    const instagramIcon = addIcon("connect/instagram-icon.svg", "https://www.instagram.com/iedesigninc");
    const linkedinIcon = addIcon("connect/linkedin-icon.svg", "https://www.linkedin.com/company/i-e-design-inc");
    const mailIcon = addIcon("connect/mail-icon.svg", "mailto:beth@ie-design.com");

    const icons = [instagramIcon, linkedinIcon, mailIcon];

    registerUpdateLayout(() => {
        const s = getScrollHeight();

        const width = 0.55 * s;
        setWidth(connect, width);
        centerScaledY(letsMeet, 0.8);

        for (const text of texts) styleScrollText(text, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width, lineHeight: 0.05 * s });
        styleScrollText(who, { letterSpacing: 0.18, fontWeight: 350, color: "#000000", fontSize: 0.028 * s, width: 1 * s, lineHeight: 0.05 * s });

        const [elementAlignments, _] = yAligningWithGaps([
            //
            connect,
            0.09 * s,
            texts[0],
            0.03 * s,
            texts[1],
            0.03 * s,
            texts[2],
        ]);

        for (const { element, offset } of elementAlignments) {
            element.style.top = px(offset + 0.05 * s);
        }

        letsMeet.style.left = px(connect.offsetLeft + connect.offsetWidth + 0.15 * s);

        who.style.left = px(letsMeet.offsetLeft);
        who.style.top = px(letsMeet.offsetTop + letsMeet.offsetHeight + 0.04 * s);

        for (const icon of icons) {
            icon.width = s * 0.055;
            const lastText = texts[texts.length - 1];
            icon.style.top = px(lastText.offsetTop + lastText.offsetHeight + 0.03 * s);
        }
        const [iconAlignments, __] = xAligningWithGaps([instagramIcon, 0.03 * s, linkedinIcon, 0.03 * s, mailIcon]);

        for (const { element, offset } of iconAlignments) {
            element.style.left = px(offset);
        }
    });
}
