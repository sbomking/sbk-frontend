import { createSignal, onCleanup, onMount, Show, For, Switch, Match, createMemo } from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import productLineFacade from "@components/solidjs/facade/ProductLineFacade";
import createSharedTranslation from '@components/solidjs/common/sharedTranslation';
import { createStore, produce } from "solid-js/store";
import { AlertSuccessMessage, type ISuccess } from "@components/solidjs/common/alertSuccessMessage";
import { AlertErrorMessage } from "@components/solidjs/common/alertErrorMessage";
import { ErrorMessage, type IBackendError } from "@components/solidjs/common/errorMessage";
import { validateInputElement } from "@components/solidjs/common/InputValidityUtil";
import type { PoProductLine, ProductLineError } from "@components/solidjs/model/Product";

export default function AddProductLineComponent/*<ITournamentId>*/(/*props: ITournamentId*/) {
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    const [formClassSig, setFormClassSig] = createSignal("");

    const [genError, setGenError] = createStore<IBackendError>({ error: '' })
    const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: '' })

    const { productLines, setProductLines, deleteProductLine, fetchProductLines, postProductLine, putProductLine } = productLineFacade;
    const [newProductLine, setNewProductLine] = createStore<PoProductLine>({title: ""});
    const [productLineError, setProductLineError] = createStore<ProductLineError>({ title: ""});

    onCleanup(() => console.log('CleanUp for AddProductLineComponent component'));
    onMount(async () => {
        /*
        let genRequired = getMessage('gen-required');
        setProductLineError(produce(e => {
            e.gender = genRequired;
            e.team_size = genRequired;
            e.title = genRequired;
        }));

        if(matchRules.length > 0) {
            let matchRuleId = matchRules.at(0);
            setNewCategory(produce(c => {
                c.knockouts[0].match_rule_id = matchRuleId != undefined ? matchRuleId.id : -1;
                c.group_phase_rules[0].match_rule_id = matchRuleId != undefined ? matchRuleId.id : -1;
                
            }));
        }

        setMergedKnockout(produce(p => p.push(...mergeKnockoutInterface(newCategory))));
        console.log(mergedKnockout.length);
        */
    });


return (
<form class={formClassSig()}>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">{getMessage('title')}</legend>
        <input id="pl_title" class="input validator" type="text" 
            required minLength={1} maxLength={30} size={30}
            placeholder={getMessage('title')} onChange={e => {
                let error = validateInputElement(e.target);
                setProductLineError(produce(e => { e.title = error; }));
                setGenError(produce(p => p.error = ''));
                if (error == "") {
                    setNewProductLine(produce(p => p.title = e.target.value));
                }
            }}
            value={newProductLine.title}
        />
        <div class="validator-hint">{productLineError.title}</div>
    </fieldset>

    <Show when={genError.error != ''}>
        <AlertErrorMessage error={genError.error} />
    </Show>
    <Show when={genSuccess.success != ''}>
        <AlertSuccessMessage success={genSuccess.success} />
    </Show>

    <div class="d-flex" style="flex-wrap:wrap;">
    <button type="button" class="btn btn-accent w-100 mt-3" onClick={e => {
        setGenError(produce(p => p.error = ''));
        setGenSuccess(produce(e => e.success = ''));
        
        let valid = e.currentTarget.form?.checkValidity();
        setFormClassSig('was-validated');

        if(valid)
        {
            postProductLine(newProductLine, bearer.token)
            .then(function(entity) { 
                setGenSuccess(produce(e => e.success = getMessageWithParam('title-sucessfully-added', { "title": entity.title })));
                
                setProductLines(produce(pls => {
                    pls.push(entity);
                    pls.sort((a, b) => a.title.localeCompare(b.title));
                }));

                setNewProductLine(produce(t => {
                    t.title = '';
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
    }}>{getMessage('add-a-product-line')}</button>
    </div>
</form>
);}
