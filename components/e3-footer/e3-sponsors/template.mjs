import { ECO333 as ORIGIN, THONLY } from "https://thonly.org/global.mjs";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THONLY}/components/tl-footer/tl-donors/shadow.css">
    <link rel="stylesheet" href="${ORIGIN}/components/e3-footer/e3-sponsors/shadow.css">
    <h5>Sponsors</h5>
    <ul class="donors">
        <li><a href="https://github.com/heartbank"><img src="https://github.com/heartbank.png?size=100"></a></li>
        <li><a href="https://github.com/siliconwat"><img src="https://github.com/siliconwat.png?size=100"></a></li>
        <li><a href="https://github.com/thonlymetaverse"><img src="https://github.com/thonlymetaverse.png?size=100"></a></li>
        <li><a href="https://github.com/333eco"><img src="https://github.com/333eco.png?size=100"></a></li>
    </ul>
`;

export default template;