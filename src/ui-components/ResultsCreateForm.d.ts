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
export declare type ResultsCreateFormInputValues = {
    ganador?: string;
    play?: number;
    email?: string;
    sub?: string;
    createTime?: number;
};
export declare type ResultsCreateFormValidationValues = {
    ganador?: ValidationFunction<string>;
    play?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    createTime?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResultsCreateFormOverridesProps = {
    ResultsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    createTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResultsCreateFormProps = React.PropsWithChildren<{
    overrides?: ResultsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ResultsCreateFormInputValues) => ResultsCreateFormInputValues;
    onSuccess?: (fields: ResultsCreateFormInputValues) => void;
    onError?: (fields: ResultsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResultsCreateFormInputValues) => ResultsCreateFormInputValues;
    onValidate?: ResultsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ResultsCreateForm(props: ResultsCreateFormProps): React.ReactElement;
