---
title: "Promise Helpers"
sidebar_position: 8
sidebar_label: "Promise Helpers"
---

## Overview

To make operations with promises in views easier, Gauntlet provides set of helper hooks

## `usePromise`

Helper to run promises in a context of React view

### Example

TODO isLoading in views

UsePromiseTestBasic
UsePromiseTestExecuteFalse
UsePromiseTestRevalidate
UsePromiseTestAbortableRevalidate
UsePromiseTestMutate
UsePromiseTestMutateOptimistic
UsePromiseTestMutateOptimisticRollback
UsePromiseTestMutateNoRevalidate
UsePromiseTestThrow

### Api Reference

TODO type

## `useCachedPromise`

Helper to run promises with caching done automatically

The main difference from `usePromise` is that the state stored in session storage.
So it is reused from previous time this entrypoint view was opened, but not since before the plugin is restarted

Follows "stale-while-revalidate" caching strategy

### Example

UseCachedPromiseBasic
UseCachedPromiseInitialState

### Api Reference

TODO type

## `useFetch`

Helper to run `fetch()` with caching done automatically.

Uses `useCachedPromise` internally, so all parameters from it are exposed in this hook as well

The state stored in session storage

Follows "stale-while-revalidate" caching strategy

### Example

UseFetchBasic
UseFetchMap

### Api Reference

TODO type
