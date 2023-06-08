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
export declare type ScoresCreateFormInputValues = {
    ganador?: string;
    play?: number;
    email?: string;
};
export declare type ScoresCreateFormValidationValues = {
    ganador?: ValidationFunction<string>;
    play?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScoresCreateFormOverridesProps = {
    ScoresCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScoresCreateFormProps = React.PropsWithChildren<{
    overrides?: ScoresCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ScoresCreateFormInputValues) => ScoresCreateFormInputValues;
    onSuccess?: (fields: ScoresCreateFormInputValues) => void;
    onError?: (fields: ScoresCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScoresCreateFormInputValues) => ScoresCreateFormInputValues;
    onValidate?: ScoresCreateFormValidationValues;
} & React.CSSProperties>;
export default function ScoresCreateForm(props: ScoresCreateFormProps): React.ReactElement;
