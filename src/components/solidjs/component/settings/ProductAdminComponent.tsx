import { createSignal, onCleanup, onMount, Show, For, Switch, Match, createMemo } from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import createSharedTranslation from '@components/solidjs/common/sharedTranslation';
import { createStore, produce } from "solid-js/store";
import productLineFacade from "@components/solidjs/facade/ProductLineFacade";
import AddProductLineComponent from "@components/solidjs/component/settings/ProductLine/AddProductLine";
import { ErrorMessage, type IBackendError } from "@components/solidjs/common/errorMessage";
import { validateInputElement } from "@components/solidjs/common/InputValidityUtil";
import type { ISuccess } from "@components/solidjs/common/alertSuccessMessage";
import type { UserManager } from "oidc-client-ts";
import { oidcts } from "@components/solidjs/common/oidc";
import type { Product, ProductLine } from "@components/solidjs/model/Product";
import ModifyProductLineComponent from "./ProductLine/ModifyProductLine";
import ModifyProductComponent from "./Product/ModifyProducts";

export default function ProductAdminComponent/*<ITournamentId>*/(/*category: ClCategory*/) {
    let mgr: UserManager;
    let lang = document.documentElement.lang;
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    const { productLines, setProductLines, fetchProductLines } = productLineFacade;

    const [formClassSig, setFormClassSig] = createSignal("");
    
    const [showAddProductLineSig, setShowAddProductLineSig] = createSignal(false);

    const [genError, setGenError] = createStore<IBackendError>({ error: '' })
    const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: '' })

    //onCleanup(() => console.log('CleanUp for ModifyCategory component'));
    onMount(async () => {
        mgr = await oidcts('settings');
        await loadMessage('product_line.ftl', lang);

        let [res_product_lines] = await Promise.all([
            fetchProductLines(bearer.token)
        ]);
        setProductLines(
			produce((p) => {
				p.splice(0, p.length);
				p.push(...res_product_lines);
		}));
    });

return (
<>
<div class="d-flex-center-col">
    {/* 
    <h2>Products</h2>

    <div role="tablist" class="tabs tabs-border">
        <a role="tab" class="tab">Aviation</a>
        <a role="tab" class="tab tab-active">Road</a>
        <a role="tab" class="tab">Transversal</a>
        <a role="tab" class="tab">Security</a>
        <a role="tab" class="tab">Shipping</a>
    </div>

    <Show when={showAddProductLineSig() == true}>
        <div class="d-flex mb-2">
            <div class="tile-container">
                <div class="tile-title tile-americano-title">
                    <div class="text-2xl font-bold">{getMessage('add-a-product-line')}</div>
                </div>

                <div class="tile-content">
                    <AddProductLineComponent />
                </div>
            </div>
        </div>
        <br />
    </Show>

    <Show when={showAddProductLineSig() == false}>
        <button type="button" class="btn btn-primary grow mb-2" onClick={e => {setShowAddProductLineSig(true);}}>
            Add a product line
        </button>
    </Show>
*/}
    <h2>Products</h2>
    <div class="d-flex-center-col">
        <div class="flex flex-wrap mt-5 gap-4 mb-4">
            <For each={productLines}fallback={
                <div>No productline...</div>
            }>
            {(productLine: ProductLine, index) => { 
            return (<>
            <div class="tile">
                <h2 class="flex justify-center p-2">{productLine.title}</h2>

                <For each={productLine.products} fallback={
                    <div>No product...</div>
                }>
                {(product: Product, index) => { 
                return (<>
                <div class="tile">
                    <h2 class="flex justify-center p-2">{product.title}</h2>
                    <ModifyProductComponent {...product} />
                </div>
                </>
                )}}
                </For>
                {/*<ModifyProductLineComponent {...productLine} />*/}
            </div>
            {/* 
            <div class="tile-container">
                <div class="tile-title">
                    <div class="text-2xl font-bold">{productLine.title}</div>
                </div>
                <div class="tile-content">
                    <ModifyProductLineComponent {...productLine} />
                </div>
            </div>
            */}
            </>
            )}}
            </For>
        </div>
    </div>
</div>
</>
);}
