import { createSignal, onCleanup, onMount, Show, For, Switch, Match, createMemo } from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import createSharedTranslation from '@components/solidjs/common/sharedTranslation';
import { createStore, produce } from "solid-js/store";
import { AlertSuccessMessage, type ISuccess } from "@components/solidjs/common/alertSuccessMessage";
import { AlertErrorMessage } from "@components/solidjs/common/alertErrorMessage";
import { ErrorMessage, type IBackendError } from "@components/solidjs/common/errorMessage";
import productLineFacade from "@components/solidjs/facade/ProductLineFacade";

import { validateInputElement } from "@components/solidjs/common/InputValidityUtil";
import type { ProductLine, ProductLineError } from "@components/solidjs/model/Product";

export default function ModifyProductLineComponent/*<ITournamentId>*/(productLine: ProductLine) {
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    const [formClassSig, setFormClassSig] = createSignal("");

    const { productLines, setProductLines, deleteProductLine, fetchProductLines, postProductLine, putProductLine } = productLineFacade;

    const [genError, setGenError] = createStore<IBackendError>({ error: '' })
    const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: '' })

    const [productLineError, setProductLineError] = createStore<ProductLineError>({ title: ""});

    onCleanup(() => console.log('CleanUp for ModifyCategory component'));
    onMount(async () => {

    });

return (
<>            
<form class={formClassSig()}>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">{getMessage('title')}</legend>
        <input id="pl_title" class="input validator" type="text" 
            required minLength={1} maxLength={30} size={30}
            placeholder="Title" onChange={e => {
                let error = validateInputElement(e.target);
                setProductLineError(produce(e => { e.title = error; }));
                setGenError(produce(p => p.error = ''));
                if (error == "") {
                    setProductLineError(produce(p => p.title = e.target.value));

                    setProductLines(produce(productLines => {
                        let iPl: number = productLines.findIndex(s => s.id == productLine.id);
                        if(iPl != -1)
                        {
                            let productLine = productLines[iPl];
                            productLine.title = e.target.value;
                        }
                    }));
                }
            }}
            value={productLine.title}
        />
        <div class="validator-hint">{productLineError.title}</div>
    </fieldset>

    <div>
        Products : {productLine.products.length}
    </div>

    <Show when={genError.error != ''}>
        <AlertErrorMessage error={genError.error} />
    </Show>
    <Show when={genSuccess.success != ''}>
        <AlertSuccessMessage success={genSuccess.success} />
    </Show>

    <div class="d-flex" style="flex-wrap:wrap;">
        <button type="button" class="btn btn-error mt-3 mr-2" onClick={e => {
            setGenError(produce(p => p.error = ''));
            setGenSuccess(produce(e => e.success = ''));
            
            let valid = e.currentTarget.form?.checkValidity();
            setFormClassSig('was-validated');

            if(valid)
            {
                deleteProductLine(productLine, bearer.token)
                .then(function() { 
                    setGenSuccess(produce(e => e.success = getMessageWithParam('title-sucessfully-deleted', { "title": productLine.title })));

                    setProductLines(produce(pls => {
                        let iPl: number = pls.findIndex(s => s.id == productLine.id);
                        if(iPl != -1)
                        {
                            pls.splice(iPl, 1);
                        }
                    }));
                })
                .catch(function(error: Error) {
                    setGenError(produce(p => p.error = error.message));
                });
            }
            else {
                //e.currentTarget.form?.reportValidity();
                setGenError(produce(p => p.error = 'Please fill out the form'));
            }
        }}>{getMessage('delete-a-product-line')}</button>

        <button type="button" class="btn btn-primary mt-3" onClick={e => {
            setGenError(produce(p => p.error = ''));
            setGenSuccess(produce(e => e.success = ''));
            
            let valid = e.currentTarget.form?.checkValidity();
            setFormClassSig('was-validated');

            if(valid)
            {
                putProductLine(productLine, bearer.token)
                .then(function() { 
                    setGenSuccess(produce(e => e.success = getMessageWithParam('title-sucessfully-added', { "title": productLine.title })));
                })
                .catch(function(error: Error) {
                    setGenError(produce(p => p.error = error.message));
                });
            }
            else {
                //e.currentTarget.form?.reportValidity();
                setGenError(produce(p => p.error = 'Please fill out the form'));
            }
        }}>{getMessage('modify-a-product-line')}</button>
    </div>
</form>
</>
);}
