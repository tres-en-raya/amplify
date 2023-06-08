/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HistoryCreateFormInputValues = {
    ganador?: number;
    play?: string;
    email?: string;
    uid?: string;
};
export declare type HistoryCreateFormValidationValues = {
    ganador?: ValidationFunction<number>;
    play?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    uid?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HistoryCreateFormOverridesProps = {
    HistoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    uid?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HistoryCreateFormProps = React.PropsWithChildren<{
    overrides?: HistoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: HistoryCreateFormInputValues) => HistoryCreateFormInputValues;
    onSuccess?: (fields: HistoryCreateFormInputValues) => void;
    onError?: (fields: HistoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryCreateFormInputValues) => HistoryCreateFormInputValues;
    onValidate?: HistoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryCreateForm(props: HistoryCreateFormProps): React.ReactElement;
