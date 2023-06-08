/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Scores } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ScoresUpdateFormInputValues = {
    ganador?: string;
    play?: number;
    email?: string;
};
export declare type ScoresUpdateFormValidationValues = {
    ganador?: ValidationFunction<string>;
    play?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ScoresUpdateFormOverridesProps = {
    ScoresUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ganador?: PrimitiveOverrideProps<TextFieldProps>;
    play?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ScoresUpdateFormProps = React.PropsWithChildren<{
    overrides?: ScoresUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    scores?: Scores;
    onSubmit?: (fields: ScoresUpdateFormInputValues) => ScoresUpdateFormInputValues;
    onSuccess?: (fields: ScoresUpdateFormInputValues) => void;
    onError?: (fields: ScoresUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ScoresUpdateFormInputValues) => ScoresUpdateFormInputValues;
    onValidate?: ScoresUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ScoresUpdateForm(props: ScoresUpdateFormProps): React.ReactElement;
