import {
  createSignal,
  onCleanup,
  onMount,
  Show,
  For,
  Switch,
  Match,
  createMemo,
  type JSX,
} from "solid-js";
import createSharedClaims from "@components/solidjs/common/sharedClaims";
import createSharedTranslation from "@components/solidjs/common/sharedTranslation";
import { createStore, produce } from "solid-js/store";
import productLineFacade from "@components/solidjs/facade/ProductLineFacade";
import type { UserManager } from "oidc-client-ts";
import { oidcts } from "@components/solidjs/common/oidc";
import AddProductLineComponent from "@components/solidjs/component/settings/ProductLine/AddProductLine";
import type { Product, ProductLine } from "@components/solidjs/model/Product";
import { postFormData } from "@components/solidjs/common/FetchWsUtil";
import type { IBackendError } from "@components/solidjs/common/errorMessage";
import type { ISuccess } from "@components/solidjs/common/alertSuccessMessage";

export default function ProductLineComponent /*<ITournamentId>*/(/*category: ClCategory*/) {
  let mgr: UserManager;
  let lang = document.documentElement.lang;
  const { loadMessage, getMessage, getMessageWithParam } =
    createSharedTranslation;
  const { claims, bearer, fillClaims, emptyClaims } = createSharedClaims;
  const { productLines, setProductLines, fetchProductLines } =
    productLineFacade;

  //sbom file
  let dropAreaFile: HTMLInputElement | undefined;
  let file: File;

  const [inputFileClassSig, setInputFileClassSig] = createSignal<string>("");
  const [productLineIdSig, setProductLineIdSig] = createSignal<number>(-1);

  const [genError, setGenError] = createStore<IBackendError>({ error: "" });
  const [genSuccess, setGenSuccess] = createStore<ISuccess>({ success: "" });

  onCleanup(() => console.log("CleanUp for ProductLineComponent component"));
  onMount(async () => {
    mgr = await oidcts("product_line");
    await loadMessage("product_line.ftl", lang);

    let [res_product_lines] = await Promise.all([
      fetchProductLines(bearer.token),
    ]);
    setProductLines(
      produce((p) => {
        p.splice(0, p.length);
        p.push(...res_product_lines);
      }),
    );

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id != null) {
      setProductLineIdSig(Number(id));
    }

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropAreaFile!.addEventListener(eventName, preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropAreaFile!.addEventListener(
        eventName,
        setInputFileClassSig("highlight"),
        false,
      );
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropAreaFile!.addEventListener(
        eventName,
        setInputFileClassSig(""),
        false,
      );
    });

    dropAreaFile!.addEventListener("drop", handleDrop, false);
  });
  /*
    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        ClData.file = file;
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img);
        }
    }
    */

  function previewFile(uniqueFile: any) {
    file = uniqueFile;
  }

  function preventDefaults(e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    e.preventDefault();
    e.stopPropagation();
  }

  const handler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    // currentTarget: EventTarget & HTMLInputElement
    console.log(event.currentTarget.value);

    const file = (event.target as HTMLInputElement).files![0];
    console.log(file.name);
  };

  function handleFiles(target: EventTarget & HTMLInputElement) {
    file = (target as HTMLInputElement).files![0];
  }

  /*
    const filehandlerdddd: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        // currentTarget: EventTarget & HTMLInputElement
        console.log(event.currentTarget.value);
    }

    const filehandlerddd: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (event) => {
        // currentTarget: EventTarget & HTMLInputElement
        console.log(event.currentTarget.value);
    }

    const filehandlerd: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        // currentTarget: EventTarget & HTMLInputElement
        console.log(event.currentTarget.value);
      }

    const filehandlerdd: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (event) => {
        // currentTarget: EventTarget & HTMLInputElement
        console.log(event.currentTarget.value);

        const file = (event.target as HTMLInputElement).files![0];
        console.log(file.name);
    }

    const filehandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        // currentTarget: EventTarget & HTMLInputElement
        console.log(event.currentTarget.value);

        const file = (event.target as HTMLInputElement).files![0];
        console.log(file.name);
    }
    */
  /*
    Argument of type 'Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }'
    is not assignable to parameter of type 'InputEvent & { currentTarget: HTMLInputElement; target: Element; }'.
    */

  /*
    function handleFiles(files: any[]) {

        if(files.length == 1)
        {
            files = [...files];
            files.forEach(previewFile);
        }
    }
    */

  function handleDrop(e: { dataTransfer: any }) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
  }
  /*
    let filesDone = 0
    let filesToDo = 0
    let progressBar = document.getElementById('progress-bar')
    function initializeProgress(numfiles) {
      progressBar.value = 0
      filesDone = 0
      filesToDo = numfiles
    }

    function progressDone() {
      filesDone++
      progressBar.value = filesDone / filesToDo * 100
    }
    */

  return (
    <>
      <Show when={productLineIdSig() == -1}>
        <div class="d-flex-center-col mt-1 pl-1 pr-1">
          <h2 class="mt-2 mb-2">Product Line</h2>
        </div>
        <div class="d-flex-center-col">
          <div class="flex flex-wrap mt-5 gap-4">
            <For each={productLines}>
              {(productLine: ProductLine, index) => {
                return (
                  <>
                    <div class="tile">
                      <figure class="text-center">
                        <a href={`/product_line?id=${productLine.id}`}>
                          <span class="icon-rectangle-wide" />
                        </a>
                      </figure>
                      <h2 class="flex justify-center p-2">
                        {productLine.title}
                      </h2>
                      <p class="tile-desc">
                        Vulnerability 50 critical 300 medium Licences
                        <svg
                          class="fill-customSecondary"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#svgarrow"></use>
                        </svg>
                        70 violations. Compliant or non compliant
                      </p>

                      <div class="flex">
                        <a href={`/product_line?id=${productLine.id}`}>
                          <button type="button" class="btn btn-primary grow">
                            Browse the products
                          </button>
                        </a>
                      </div>
                    </div>
                  </>
                );
              }}
            </For>
          </div>
        </div>
      </Show>

      <Show when={productLineIdSig() != -1}>
        <For each={productLines.filter((pl) => pl.id == productLineIdSig())}>
          {(productLine: ProductLine, index) => {
            return (
              <>
                <div class="d-flex-center-col mt-1 pl-1 pr-1">
                  <h2 class="mt-2 mb-2">{productLine.title}</h2>
                </div>
                <a class="link" href="/product_line">
                  Go back to product lines
                </a>
                <div>
                  {/* highlight */}
                  <div id="drop-area" class="is-invalid" ref={dropAreaFile}>
                    {/* accept="image/*"
                onChange={e => handleFiles(this.files)}
                onchange="handleFiles(this.files)"
                */}

                    <input
                      type="file"
                      id="fileElem"
                      class="file-input"
                      multiple
                      accept="json/*"
                      onChange={(e) => handleFiles(e.target)}
                    />
                    <label class="button file-label" for="fileElem">
                      Drag and drop ou cliquez pour parcourir
                    </label>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary grow"
                    onclick={(e) => {
                      let formData = new FormData();
                      formData.append("file", file);

                      postFormData<Object>("v1/scan", formData, bearer.token)
                        .then(function (e) {
                          setGenError(produce((p) => (p.error = "")));
                          setGenSuccess(
                            produce((e) => (e.success = "Blabla added")),
                          );
                          /*
                    setNewTeam(produce(p => {
                        p.title = " ";
                        p.new_participants.splice(0, p.new_participants.length);
                    }));
                    */
                        })
                        .catch(function (error: Error) {
                          setGenSuccess(produce((e) => (e.success = "")));
                          setGenError(
                            produce((p) => (p.error = error.message)),
                          );
                        });
                    }}
                  >
                    Upload sbom (spdx,cdx,swid,dsdx)
                  </button>
                </div>
                OpenSCA database.
                <div class="d-flex-center-col">
                  <div class="flex flex-wrap mt-5 gap-4">
                    <For each={productLine.products}>
                      {(product: Product, index) => {
                        return (
                          <>
                            <div class="tile">
                              {/*
                        <figure class="text-center">
                            <a href={`/product_line?id=${productLine.id}`}>
                                <span class="icon-rectangle-wide"/>
                            </a>
                        </figure>
                        */}
                              <h2 class="flex justify-center p-2">
                                {product.title}
                              </h2>
                              <p class="tile-desc">
                                TODO add badge from daisy ui? Vulnerability 50
                                critical 300 medium Licences
                                <svg
                                  class="fill-customSecondary"
                                  viewBox="0 0 512 512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <use href="#svgarrow"></use>
                                </svg>
                                70 violations. Compliant or non compliant
                              </p>

                              <button
                                type="button"
                                class="btn btn-primary grow"
                              >
                                REPORT sarif
                              </button>
                              <div class="flex">
                                <a href={`/product_line?id=${productLine.id}`}>
                                  <button
                                    type="button"
                                    class="btn btn-primary grow"
                                  >
                                    Browse the products
                                  </button>
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      }}
                    </For>
                  </div>
                </div>
              </>
            );
          }}
        </For>
      </Show>
    </>
  );
}
