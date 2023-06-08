/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Results } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ResultsUpdateFormInputValues = {
    ganador?: string;
    play?: number;
    email?: string;
    sub?: string;
    createTime?: number;
};
export declare type ResultsUpdateFormValidationValues = {
    ganador?: ValidationFunction<string>;
    play?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    createTime?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ResultsUpdateFormOverridesProps = {
    ResultsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    createTime?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ResultsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ResultsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    results?: Results;
    onSubmit?: (fields: ResultsUpdateFormInputValues) => ResultsUpdateFormInputValues;
    onSuccess?: (fields: ResultsUpdateFormInputValues) => void;
    onError?: (fields: ResultsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ResultsUpdateFormInputValues) => ResultsUpdateFormInputValues;
    onValidate?: ResultsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ResultsUpdateForm(props: ResultsUpdateFormProps): React.ReactElement;
