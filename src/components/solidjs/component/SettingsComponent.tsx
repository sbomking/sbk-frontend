import { createSignal, onCleanup, onMount, Show, For, Switch, Match, createMemo } from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import createSharedTranslation from '@components/solidjs/common/sharedTranslation';
import { createStore, produce } from "solid-js/store";
import { ErrorMessage, type IBackendError } from "@components/solidjs/common/errorMessage";
import { validateInputElement } from "@components/solidjs/common/InputValidityUtil";
import type { ISuccess } from "@components/solidjs/common/alertSuccessMessage";
import type { UserManager } from "oidc-client-ts";
import { oidcts } from "@components/solidjs/common//oidc";

export default function SettingsComponent/*<ITournamentId>*/(/*category: ClCategory*/) {
    let mgr: UserManager;
    let lang = document.documentElement.lang;
    const { loadMessage, getMessage, getMessageWithParam } = createSharedTranslation;
    const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
    
    const [formClassSig, setFormClassSig] = createSignal("");
    
    const [genError, setGenError] = createStore<IBackendError>({ error: '' })
    const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: '' })

    //onCleanup(() => console.log('CleanUp for ModifyCategory component'));
    onMount(async () => {
        mgr = await oidcts('settings');
        await loadMessage('settings.ftl', lang);
    });

return (
<>
<svg
	version="2.0"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 512 512"
	class="fill-customSecondary hidden"
>
	<path
		id="svgarrow"
		d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
	>
	</path>
</svg>

<div class="d-flex-center-col">
	<div class="flex flex-wrap mt-5 gap-4">
		<div class="tile mt-4">
			<figure class="text-center">
				<a href="/settings/productline">
					<span class="icon-newspaper"/>
				</a>
			</figure>
			<h2 class="flex justify-center p-2">Product line</h2>
			<p class="tile-desc mb-4 mt-4">
				Create a new product line, edit and delete.
			</p>

			<div class="ml-1 mb-2">
				<li class="mb-4 flex">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-customSecondary"><use href="#svgarrow"></use></svg>
					</div>
					<span>...</span>
				</li>
				<li class="mb-4 flex">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fill-customSecondary"><use href="#svgarrow"></use></svg>
					</div>
					<span>...</span>
				</li>
			</div>

			<div class="flex">
				<a href="/settings/productline">
					<button type="button" class="btn btn-primary grow">
					Product line
					</button>
				</a>
			</div>
		</div>

		<div class="tile mt-4">
			<figure class="text-center">
				<a href="/settings/product">
					<span class="icon-newspaper"/>
				</a>
			</figure>
			<h2 class="flex justify-center p-2">Product</h2>
			<p class="tile-desc mb-4 mt-4">
				Create a new product, edit and delete.
			</p>
			<div class="flex">
				<a href="/settings/product">
					<button type="button" class="btn btn-primary grow">
					Product
					</button>
				</a>
			</div>
		</div>
	</div>
</div>
</>
);}
