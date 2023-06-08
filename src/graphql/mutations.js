/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createScore = /* GraphQL */ `
  mutation createScore(
    $input: CreateScoresInput!
    $condition: ModelScoresConditionInput
  ) {
    createScores(input: $input, condition: $condition) {
      id
      ganador
      play
      email
      createdAt
    }
  }
`;
export const updateHistory = /* GraphQL */ `
  mutation UpdateHistory(
    $input: UpdateHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    updateHistory(input: $input, condition: $condition) {
      id
      ganador
      play
      createdAt
    }
  }
`;
export const deleteHistory = /* GraphQL */ `
  mutation DeleteHistory(
    $input: DeleteHistoryInput!
    $condition: ModelHistoryConditionInput
  ) {
    deleteHistory(input: $input, condition: $condition) {
      id
      email
      ganador
      play
      createdAt
    }
  }
`;
