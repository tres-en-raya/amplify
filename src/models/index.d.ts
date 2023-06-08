import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<History, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ganador?: number | null;
  readonly created_at?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<History, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ganador?: number | null;
  readonly created_at?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type History = LazyLoading extends LazyLoadingDisabled ? EagerHistory : LazyHistory

export declare const History: (new (init: ModelInit<History>) => History) & {
  copyOf(source: History, mutator: (draft: MutableModel<History>) => MutableModel<History> | void): History;
}