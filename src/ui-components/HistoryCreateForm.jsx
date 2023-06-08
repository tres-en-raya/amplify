/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { History } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HistoryCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    ganador: "",
    play: "",
    email: "",
    uid: "",
  };
  const [ganador, setGanador] = React.useState(initialValues.ganador);
  const [play, setPlay] = React.useState(initialValues.play);
  const [email, setEmail] = React.useState(initialValues.email);
  const [uid, setUid] = React.useState(initialValues.uid);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setGanador(initialValues.ganador);
    setPlay(initialValues.play);
    setEmail(initialValues.email);
    setUid(initialValues.uid);
    setErrors({});
  };
  const validations = {
    ganador: [{ type: "Required" }],
    play: [],
    email: [],
    uid: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          ganador,
          play,
          email,
          uid,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new History(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "HistoryCreateForm")}
      {...rest}
    >
      <TextField
        label="Ganador"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={ganador}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ganador: value,
              play,
              email,
              uid,
            };
            const result = onChange(modelFields);
            value = result?.ganador ?? value;
          }
          if (errors.ganador?.hasError) {
            runValidationTasks("ganador", value);
          }
          setGanador(value);
        }}
        onBlur={() => runValidationTasks("ganador", ganador)}
        errorMessage={errors.ganador?.errorMessage}
        hasError={errors.ganador?.hasError}
        {...getOverrideProps(overrides, "ganador")}
      ></TextField>
      <TextField
        label="Play"
        isRequired={false}
        isReadOnly={false}
        value={play}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ganador,
              play: value,
              email,
              uid,
            };
            const result = onChange(modelFields);
            value = result?.play ?? value;
          }
          if (errors.play?.hasError) {
            runValidationTasks("play", value);
          }
          setPlay(value);
        }}
        onBlur={() => runValidationTasks("play", play)}
        errorMessage={errors.play?.errorMessage}
        hasError={errors.play?.hasError}
        {...getOverrideProps(overrides, "play")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ganador,
              play,
              email: value,
              uid,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Uid"
        isRequired={false}
        isReadOnly={false}
        value={uid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ganador,
              play,
              email,
              uid: value,
            };
            const result = onChange(modelFields);
            value = result?.uid ?? value;
          }
          if (errors.uid?.hasError) {
            runValidationTasks("uid", value);
          }
          setUid(value);
        }}
        onBlur={() => runValidationTasks("uid", uid)}
        errorMessage={errors.uid?.errorMessage}
        hasError={errors.uid?.hasError}
        {...getOverrideProps(overrides, "uid")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
