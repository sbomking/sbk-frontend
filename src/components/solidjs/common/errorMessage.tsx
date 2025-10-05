export interface IBackendError {
    error?: string,
}

export const ErrorMessage = (props: IBackendError) => <div class="invalid-feedback">{props.error}</div>;
