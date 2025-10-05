import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { FluentBundle, FluentResource, type FluentVariable } from "@fluent/bundle";

function createSharedTranslation() {
    let [messageBundle, setMessageBundle] = createStore<FluentBundle>(new FluentBundle('en'));

    const loadMessage = async (filename: string, lang: string) =>
    {
        let translation_object: string = await fetchTranslationsFor(filename, lang);
        let resource = new FluentResource(translation_object);
        let fluentBundle = new FluentBundle(lang);

        let errors = fluentBundle.addResource(resource);
        if (errors.length) {
            // Syntax errors are per-message and don't break the whole resource
            console.log(errors);
        }
        else
        {
            setMessageBundle(fluentBundle);
        }
        //console.log('Message loaded');
        /*
        let paragraph = bundlex.getMessage("paragraph");
        if (paragraph.value) {
            bundlex.formatPattern(paragraph.value, { name: "Anna" });
            console.log(bundlex.formatPattern(paragraph.value, { name: "Anna" }));
        // → "Welcome, Anna, to Foo 3000!"
        }
        */

        //{messageBundle.getMessage("paragraph")?.value} - {messageBundle.formatPattern(messageBundle.getMessage("paragraph")?.value, {name: "Anna"})}
    }

    function getMessage(key: string) {
        let value = '';
        let message = messageBundle.getMessage(key);
        if(message !== undefined && message.value != undefined)
        {
            value = message.value.toString();
        }
        return value;
    }

    function getMessageWithParam(key: string, param: Record<string, FluentVariable>) {
        let value = '';
        let message = messageBundle.getMessage(key);
        if(message !== undefined && message.value != undefined)
        {
            //FOR DEBUGGING PURPOSE I CAN PASS AN ARRAY OF ERROR TO GET THE ERROR BACK
            value = messageBundle.formatPattern(message.value, param);
        }
        return value;
    }

    async function fetchTranslationsFor(filename: string, newLocale: string) {
        const response = await fetch(`/lang/${newLocale}/${filename}`);
        return response.text();
    }

    return { loadMessage, getMessage, getMessageWithParam };
}


export default createRoot(createSharedTranslation);