import { createSignal, onCleanup, onMount, Show, For, Switch, Match, createMemo } from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import createSharedTranslation from '@components/solidjs/common/sharedTranslation';
import { createStore, produce } from "solid-js/store";
import { AlertSuccessMessage, type ISuccess } from "@components/solidjs/common/alertSuccessMessage";
import { AlertErrorMessage } from "@components/solidjs/common/alertErrorMessage";
import { ErrorMessage, type IBackendError } from "@components/solidjs/common/errorMessage";
import productFacade from "@components/solidjs/facade/ProductFacade";
import productLineFacade from "@components/solidjs/facade/ProductLineFacade";

import { validateInputElement } from "@components/solidjs/common/InputValidityUtil";
import type { Product, ProductError, ProductLine, ProductLineError } from "@components/solidjs/model/Product";

export default function ModifyProductComponent(product: Product) {
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    const [formClassSig, setFormClassSig] = createSignal("");

    const { productLines, setProductLines } = productLineFacade;
    const { deleteProduct, fetchProducts, postProduct, putProduct } = productFacade;

    const [genError, setGenError] = createStore<IBackendError>({ error: '' })
    const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: '' })

    const [productError, setProductError] = createStore<ProductError>({ title: ""});

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
                setProductError(produce(e => { e.title = error; }));
                setGenError(produce(p => p.error = ''));
                if (error == "") {
                    setProductError(produce(p => p.title = e.target.value));

                    setProductLines(produce(productLines => {
                        let iPl: number = productLines.findIndex(s => s.id == product.product_line_id);
                        if(iPl != -1)
                        {
                            let productLine = productLines[iPl];
                            let iProd: number = productLine.products.findIndex(s => s.id == product.id);
                            if(iPl != -1)
                            {
                                productLine.products[iProd].title = e.target.value;
                            }
                        }
                    }));
                }
            }}
            value={product.title}
        />
        <div class="validator-hint">{productError.title}</div>
    </fieldset>

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
                deleteProduct(product, bearer.token)
                .then(function() { 
                    setGenSuccess(produce(e => e.success = getMessageWithParam('title-sucessfully-deleted', { "title": product.title })));

                    setProductLines(produce(pls => {
                        let iPl: number = pls.findIndex(s => s.id == product.id);
                        if(iPl != -1)
                        {
                            let productLine = productLines[iPl];
                            let iProd: number = pls[iPl].products.findIndex(s => s.id == product.id);
                            if(iProd != -1)
                            {
                                productLine.products.splice(iProd, 1);
                            }
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
                putProduct(product, bearer.token)
                .then(function() { 
                    setGenSuccess(produce(e => e.success = getMessageWithParam('title-sucessfully-added', { "title": product.title })));
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
