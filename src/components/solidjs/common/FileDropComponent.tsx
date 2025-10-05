import { type Component, createSignal } from "solid-js";
import createSharedTranslation from "@components/solidjs/common/sharedTranslation";

// Component State
export function createFileDrop() {
  const [fileSig, setFileSig] = createSignal<File>();
  const [inputFileClassSig, setInputFileClassSig] = createSignal<string>("");
  const [previewSrcSig, setPreviewSrcSig] = createSignal<string>("");
  const [instanceIdSig, setInstanceIdSig] = createSignal<number>(0);

  function updateFile(file: File) {
    setFileSig(file);
    previewFile(file);
  }

  function previewFile(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      if (typeof reader.result === "string") {
        setPreviewSrcSig(reader.result);
      }
    };
  }

  return {
    fileSig,
    setFileSig,
    updateFile,
    inputFileClassSig,
    setInputFileClassSig,
    instanceIdSig,
    setInstanceIdSig,
    previewSrcSig,
  };
}

// Component Props
export type FileDropProps = ReturnType<typeof createFileDrop>;

//<FileDropComponent divisionId={[divisionId, setDivisionId]} />
//export function FileDropComponent(props: {divisionId: Signal<number>, esFn: () => void}) {
//  const [divisionId, setDivisionId] = props.divisionId;

// Component
export const FileDropComponent: Component<FileDropProps> = (props) => {
  let dropAreaFile: HTMLInputElement | undefined;
  let file: File;
  const { getMessage } = createSharedTranslation;

  function handleDrop(e: DragEvent) {
    let dt = e.dataTransfer!;
    let files = dt.files;

    file = files![0];
    props.updateFile(file);
  }

  function handleFiles(target: EventTarget & HTMLInputElement) {
    file = (target as HTMLInputElement).files![0];
    props.updateFile(file);
  }

  return (
    <>
      <div
        id={`dropArea{props.instanceIdSig()}`}
        class={`drop-area ${props.inputFileClassSig()}`}
        ref={dropAreaFile}
        on:dragenter={(e) => props.setInputFileClassSig("highlight")}
        on:dragover={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.setInputFileClassSig("highlight");
        }}
        on:dragleave={(e) => props.setInputFileClassSig("")}
        on:drop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.setInputFileClassSig("");
          handleDrop(e);
        }}
      >
        <input
          id={`fileElem${props.instanceIdSig()}`}
          type="file"
          class={`file-input ${props.inputFileClassSig()}`}
          multiple
          accept="json/*"
          onChange={(e) => handleFiles(e.target)}
        />
        <label
          class="button file-label"
          for={`fileElem${props.instanceIdSig()}`}
        >
          {getMessage("file-drop-drag-or-click-to-browse")}
        </label>
      </div>

      <div class="d-flex-center-col">
        <img src={props.previewSrcSig()} class="img-height " />
      </div>
    </>
  );
};
