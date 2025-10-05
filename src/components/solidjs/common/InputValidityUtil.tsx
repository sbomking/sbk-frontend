import createSharedTranslation from '@solidjs/common/sharedTranslation';
import type { FluentVariable } from '@fluent/bundle';

export function validateInputElement(target: EventTarget & HTMLInputElement): string {
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    let valid = target.checkValidity();

    console.log(target.validationMessage);
    console.log("Checkvalidity: " + valid);

    target.setCustomValidity("");

    console.log("In validity!!");

    if (target.validity.rangeUnderflow)
    {
        let param : Record<string, FluentVariable> = { "min": target.min };
        let minError = getMessageWithParam('gen-min-size', param);
        target.setCustomValidity(minError);
        target.reportValidity();
        return minError;
    }
    if (target.validity.rangeOverflow)
    {
        let param : Record<string, FluentVariable> = { "max": target.max };
        let maxError = getMessageWithParam('gen-max-size', param);
        target.setCustomValidity(maxError);
        target.reportValidity();
        return maxError;
    }

    if (target.validity.tooShort) {
        let minLength: number = Number(target.getAttribute('minLength'));
        let param: Record<string, FluentVariable> = { "gen-min-lenght": minLength };
        let minLengthError = getMessageWithParam('gen-min-length', param);
        target.setCustomValidity(minLengthError);
        target.reportValidity();
        return minLengthError;
    }

    if (target.validity.valueMissing) {
        let genRequired = getMessage('gen-required');
        target.setCustomValidity(genRequired);
        target.reportValidity();
        return genRequired;
    }

    return "";
}
