import fetch from 'node-fetch';
import { JSDOM } from "jsdom";
import getData from "./getData.js";

(async () => {
    const response = await fetch('https://www.pokewiki.de/Rangliste_der_Pok%C3%A9mon_der_1._Generation');
    const doc = new JSDOM(await response.text());
    const document = doc.window.document;
    getData(document);
})();
