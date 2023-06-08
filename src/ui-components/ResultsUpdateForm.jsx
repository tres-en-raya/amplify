/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Results } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ResultsUpdateForm(props) {
  const {
    id: idProp,
    results: resultsModelProp,
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
    sub: "",
    createTime: "",
  };
  const [ganador, setGanador] = React.useState(initialValues.ganador);
  const [play, setPlay] = React.useState(initialValues.play);
  const [email, setEmail] = React.useState(initialValues.email);
  const [sub, setSub] = React.useState(initialValues.sub);
  const [createTime, setCreateTime] = React.useState(initialValues.createTime);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = resultsRecord
      ? { ...initialValues, ...resultsRecord }
      : initialValues;
    setGanador(cleanValues.ganador);
    setPlay(cleanValues.play);
    setEmail(cleanValues.email);
    setSub(cleanValues.sub);
    setCreateTime(cleanValues.createTime);
    setErrors({});
  };
  const [resultsRecord, setResultsRecord] = React.useState(resultsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Results, idProp)
        : resultsModelProp;
      setResultsRecord(record);
    };
    queryData();
  }, [idProp, resultsModelProp]);
  React.useEffect(resetStateValues, [resultsRecord]);
  const validations = {
    ganador: [],
    play: [],
    email: [],
    sub: [],
    createTime: [{ type: "Required" }],
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
  const convertTimeStampToDate = (ts) => {
    if (Math.abs(Date.now() - ts) < Math.abs(Date.now() - ts * 1000)) {
      return new Date(ts);
    }
    return new Date(ts * 1000);
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          sub,
          createTime,
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
          await DataStore.save(
            Results.copyOf(resultsRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ResultsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Ganador"
        isRequired={false}
        isReadOnly={false}
        value={ganador}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ganador: value,
              play,
              email,
              sub,
              createTime,
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
        type="number"
        step="any"
        value={play}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              ganador,
              play: value,
              email,
              sub,
              createTime,
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
              sub,
              createTime,
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
        label="Sub"
        isRequired={false}
        isReadOnly={false}
        value={sub}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ganador,
              play,
              email,
              sub: value,
              createTime,
            };
            const result = onChange(modelFields);
            value = result?.sub ?? value;
          }
          if (errors.sub?.hasError) {
            runValidationTasks("sub", value);
          }
          setSub(value);
        }}
        onBlur={() => runValidationTasks("sub", sub)}
        errorMessage={errors.sub?.errorMessage}
        hasError={errors.sub?.hasError}
        {...getOverrideProps(overrides, "sub")}
      ></TextField>
      <TextField
        label="Create time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createTime && convertToLocal(convertTimeStampToDate(createTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              ganador,
              play,
              email,
              sub,
              createTime: value,
            };
            const result = onChange(modelFields);
            value = result?.createTime ?? value;
          }
          if (errors.createTime?.hasError) {
            runValidationTasks("createTime", value);
          }
          setCreateTime(value);
        }}
        onBlur={() => runValidationTasks("createTime", createTime)}
        errorMessage={errors.createTime?.errorMessage}
        hasError={errors.createTime?.hasError}
        {...getOverrideProps(overrides, "createTime")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || resultsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || resultsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
