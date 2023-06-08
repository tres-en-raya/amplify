/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { History } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type HistoryUpdateFormInputValues = {
    ganador?: number;
    play?: string;
    email?: string;
    uid?: string;
};
export declare type HistoryUpdateFormValidationValues = {
    ganador?: ValidationFunction<number>;
    play?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    uid?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type HistoryUpdateFormOverridesProps = {
    HistoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    uid?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type HistoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: HistoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    history?: History;
    onSubmit?: (fields: HistoryUpdateFormInputValues) => HistoryUpdateFormInputValues;
    onSuccess?: (fields: HistoryUpdateFormInputValues) => void;
    onError?: (fields: HistoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: HistoryUpdateFormInputValues) => HistoryUpdateFormInputValues;
    onValidate?: HistoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function HistoryUpdateForm(props: HistoryUpdateFormProps): React.ReactElement;
