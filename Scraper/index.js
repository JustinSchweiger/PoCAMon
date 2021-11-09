import fetch from 'node-fetch';
import { JSDOM } from "jsdom";
import getData from "./getData.js";

(async () => {
    const response = await fetch(process.env.PKM_LIST_URL);
    const doc = new JSDOM(await response.text());
    const document = doc.window.document;
    getData(document);
})();
