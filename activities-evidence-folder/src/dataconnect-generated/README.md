# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyUser*](#getmyuser)
  - [*ListUsers*](#listusers)
  - [*GetClass*](#getclass)
  - [*ListClasses*](#listclasses)
  - [*GetAssessment*](#getassessment)
  - [*ListAssessments*](#listassessments)
  - [*GetSubmission*](#getsubmission)
  - [*ListMySubmissions*](#listmysubmissions)
  - [*GetResult*](#getresult)
  - [*ListResults*](#listresults)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateMyUser*](#updatemyuser)
  - [*DeleteMyUser*](#deletemyuser)
  - [*CreateClass*](#createclass)
  - [*UpdateClass*](#updateclass)
  - [*DeleteClass*](#deleteclass)
  - [*CreateAssessment*](#createassessment)
  - [*UpdateAssessment*](#updateassessment)
  - [*DeleteAssessment*](#deleteassessment)
  - [*CreateSubmission*](#createsubmission)
  - [*UpdateSubmission*](#updatesubmission)
  - [*DeleteSubmission*](#deletesubmission)
  - [*CreateResult*](#createresult)
  - [*UpdateResult*](#updateresult)
  - [*DeleteResult*](#deleteresult)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyUser
You can execute the `GetMyUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyUser(options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface GetMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserData, undefined>;
}
export const getMyUserRef: GetMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface GetMyUserRef {
  ...
  (dc: DataConnect): QueryRef<GetMyUserData, undefined>;
}
export const getMyUserRef: GetMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyUserRef:
```typescript
const name = getMyUserRef.operationName;
console.log(name);
```

### Variables
The `GetMyUser` query has no variables.
### Return Type
Recall that executing the `GetMyUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyUserData {
  user?: {
    fullName: string;
    email: string;
    role: string;
  };
}
```
### Using `GetMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyUser } from '@dataconnect/generated';


// Call the `getMyUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getMyUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetMyUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyUserRef } from '@dataconnect/generated';


// Call the `getMyUserRef()` function to get a reference to the query.
const ref = getMyUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    fullName: string;
    email: string;
    role: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetClass
You can execute the `GetClass` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getClass(vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface GetClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
}
export const getClassRef: GetClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getClass(dc: DataConnect, vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface GetClassRef {
  ...
  (dc: DataConnect, vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
}
export const getClassRef: GetClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getClassRef:
```typescript
const name = getClassRef.operationName;
console.log(name);
```

### Variables
The `GetClass` query requires an argument of type `GetClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetClassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetClass` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetClassData {
  class?: {
    className: string;
    gradeLevel: number;
    leadTeacher?: {
      fullName: string;
    };
  };
}
```
### Using `GetClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getClass, GetClassVariables } from '@dataconnect/generated';

// The `GetClass` query requires an argument of type `GetClassVariables`:
const getClassVars: GetClassVariables = {
  id: ..., 
};

// Call the `getClass()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getClass(getClassVars);
// Variables can be defined inline as well.
const { data } = await getClass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getClass(dataConnect, getClassVars);

console.log(data.class);

// Or, you can use the `Promise` API.
getClass(getClassVars).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

### Using `GetClass`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getClassRef, GetClassVariables } from '@dataconnect/generated';

// The `GetClass` query requires an argument of type `GetClassVariables`:
const getClassVars: GetClassVariables = {
  id: ..., 
};

// Call the `getClassRef()` function to get a reference to the query.
const ref = getClassRef(getClassVars);
// Variables can be defined inline as well.
const ref = getClassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getClassRef(dataConnect, getClassVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.class);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.class);
});
```

## ListClasses
You can execute the `ListClasses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface ListClassesRef {
  ...
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
}
export const listClassesRef: ListClassesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listClassesRef:
```typescript
const name = listClassesRef.operationName;
console.log(name);
```

### Variables
The `ListClasses` query has no variables.
### Return Type
Recall that executing the `ListClasses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListClassesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListClassesData {
  classes: ({
    className: string;
    gradeLevel: number;
  })[];
}
```
### Using `ListClasses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listClasses } from '@dataconnect/generated';


// Call the `listClasses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listClasses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listClasses(dataConnect);

console.log(data.classes);

// Or, you can use the `Promise` API.
listClasses().then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

### Using `ListClasses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listClassesRef } from '@dataconnect/generated';


// Call the `listClassesRef()` function to get a reference to the query.
const ref = listClassesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listClassesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.classes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.classes);
});
```

## GetAssessment
You can execute the `GetAssessment` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAssessment(vars: GetAssessmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssessmentData, GetAssessmentVariables>;

interface GetAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssessmentVariables): QueryRef<GetAssessmentData, GetAssessmentVariables>;
}
export const getAssessmentRef: GetAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssessment(dc: DataConnect, vars: GetAssessmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssessmentData, GetAssessmentVariables>;

interface GetAssessmentRef {
  ...
  (dc: DataConnect, vars: GetAssessmentVariables): QueryRef<GetAssessmentData, GetAssessmentVariables>;
}
export const getAssessmentRef: GetAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssessmentRef:
```typescript
const name = getAssessmentRef.operationName;
console.log(name);
```

### Variables
The `GetAssessment` query requires an argument of type `GetAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssessmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssessment` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAssessmentData {
  assessment?: {
    title: string;
    dueDate: DateString;
    author: {
      fullName: string;
    };
  };
}
```
### Using `GetAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssessment, GetAssessmentVariables } from '@dataconnect/generated';

// The `GetAssessment` query requires an argument of type `GetAssessmentVariables`:
const getAssessmentVars: GetAssessmentVariables = {
  id: ..., 
};

// Call the `getAssessment()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssessment(getAssessmentVars);
// Variables can be defined inline as well.
const { data } = await getAssessment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssessment(dataConnect, getAssessmentVars);

console.log(data.assessment);

// Or, you can use the `Promise` API.
getAssessment(getAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.assessment);
});
```

### Using `GetAssessment`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssessmentRef, GetAssessmentVariables } from '@dataconnect/generated';

// The `GetAssessment` query requires an argument of type `GetAssessmentVariables`:
const getAssessmentVars: GetAssessmentVariables = {
  id: ..., 
};

// Call the `getAssessmentRef()` function to get a reference to the query.
const ref = getAssessmentRef(getAssessmentVars);
// Variables can be defined inline as well.
const ref = getAssessmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssessmentRef(dataConnect, getAssessmentVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assessment);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assessment);
});
```

## ListAssessments
You can execute the `ListAssessments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAssessments(options?: ExecuteQueryOptions): QueryPromise<ListAssessmentsData, undefined>;

interface ListAssessmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssessmentsData, undefined>;
}
export const listAssessmentsRef: ListAssessmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssessments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssessmentsData, undefined>;

interface ListAssessmentsRef {
  ...
  (dc: DataConnect): QueryRef<ListAssessmentsData, undefined>;
}
export const listAssessmentsRef: ListAssessmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssessmentsRef:
```typescript
const name = listAssessmentsRef.operationName;
console.log(name);
```

### Variables
The `ListAssessments` query has no variables.
### Return Type
Recall that executing the `ListAssessments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssessmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAssessmentsData {
  assessments: ({
    title: string;
    dueDate: DateString;
  })[];
}
```
### Using `ListAssessments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssessments } from '@dataconnect/generated';


// Call the `listAssessments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssessments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssessments(dataConnect);

console.log(data.assessments);

// Or, you can use the `Promise` API.
listAssessments().then((response) => {
  const data = response.data;
  console.log(data.assessments);
});
```

### Using `ListAssessments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssessmentsRef } from '@dataconnect/generated';


// Call the `listAssessmentsRef()` function to get a reference to the query.
const ref = listAssessmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssessmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assessments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assessments);
});
```

## GetSubmission
You can execute the `GetSubmission` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSubmission(vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface GetSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
}
export const getSubmissionRef: GetSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSubmission(dc: DataConnect, vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface GetSubmissionRef {
  ...
  (dc: DataConnect, vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
}
export const getSubmissionRef: GetSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSubmissionRef:
```typescript
const name = getSubmissionRef.operationName;
console.log(name);
```

### Variables
The `GetSubmission` query requires an argument of type `GetSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSubmission` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSubmissionData {
  submission?: {
    score?: number | null;
    feedbackComments?: string | null;
    codeContent: string;
  };
}
```
### Using `GetSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSubmission, GetSubmissionVariables } from '@dataconnect/generated';

// The `GetSubmission` query requires an argument of type `GetSubmissionVariables`:
const getSubmissionVars: GetSubmissionVariables = {
  id: ..., 
};

// Call the `getSubmission()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSubmission(getSubmissionVars);
// Variables can be defined inline as well.
const { data } = await getSubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSubmission(dataConnect, getSubmissionVars);

console.log(data.submission);

// Or, you can use the `Promise` API.
getSubmission(getSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

### Using `GetSubmission`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSubmissionRef, GetSubmissionVariables } from '@dataconnect/generated';

// The `GetSubmission` query requires an argument of type `GetSubmissionVariables`:
const getSubmissionVars: GetSubmissionVariables = {
  id: ..., 
};

// Call the `getSubmissionRef()` function to get a reference to the query.
const ref = getSubmissionRef(getSubmissionVars);
// Variables can be defined inline as well.
const ref = getSubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSubmissionRef(dataConnect, getSubmissionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submission);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submission);
});
```

## ListMySubmissions
You can execute the `ListMySubmissions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface ListMySubmissionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
}
export const listMySubmissionsRef: ListMySubmissionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySubmissionsRef:
```typescript
const name = listMySubmissionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySubmissions` query has no variables.
### Return Type
Recall that executing the `ListMySubmissions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySubmissionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySubmissionsData {
  submissions: ({
    submissionDate: TimestampString;
    score?: number | null;
  })[];
}
```
### Using `ListMySubmissions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySubmissions } from '@dataconnect/generated';


// Call the `listMySubmissions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySubmissions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySubmissions(dataConnect);

console.log(data.submissions);

// Or, you can use the `Promise` API.
listMySubmissions().then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

### Using `ListMySubmissions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySubmissionsRef } from '@dataconnect/generated';


// Call the `listMySubmissionsRef()` function to get a reference to the query.
const ref = listMySubmissionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySubmissionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.submissions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.submissions);
});
```

## GetResult
You can execute the `GetResult` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getResult(vars: GetResultVariables, options?: ExecuteQueryOptions): QueryPromise<GetResultData, GetResultVariables>;

interface GetResultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetResultVariables): QueryRef<GetResultData, GetResultVariables>;
}
export const getResultRef: GetResultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getResult(dc: DataConnect, vars: GetResultVariables, options?: ExecuteQueryOptions): QueryPromise<GetResultData, GetResultVariables>;

interface GetResultRef {
  ...
  (dc: DataConnect, vars: GetResultVariables): QueryRef<GetResultData, GetResultVariables>;
}
export const getResultRef: GetResultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getResultRef:
```typescript
const name = getResultRef.operationName;
console.log(name);
```

### Variables
The `GetResult` query requires an argument of type `GetResultVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetResultVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetResult` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetResultData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetResultData {
  result?: {
    finalScore: number;
    status: string;
    learner: {
      fullName: string;
    };
  };
}
```
### Using `GetResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getResult, GetResultVariables } from '@dataconnect/generated';

// The `GetResult` query requires an argument of type `GetResultVariables`:
const getResultVars: GetResultVariables = {
  id: ..., 
};

// Call the `getResult()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getResult(getResultVars);
// Variables can be defined inline as well.
const { data } = await getResult({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getResult(dataConnect, getResultVars);

console.log(data.result);

// Or, you can use the `Promise` API.
getResult(getResultVars).then((response) => {
  const data = response.data;
  console.log(data.result);
});
```

### Using `GetResult`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getResultRef, GetResultVariables } from '@dataconnect/generated';

// The `GetResult` query requires an argument of type `GetResultVariables`:
const getResultVars: GetResultVariables = {
  id: ..., 
};

// Call the `getResultRef()` function to get a reference to the query.
const ref = getResultRef(getResultVars);
// Variables can be defined inline as well.
const ref = getResultRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getResultRef(dataConnect, getResultVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.result);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.result);
});
```

## ListResults
You can execute the `ListResults` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listResults(options?: ExecuteQueryOptions): QueryPromise<ListResultsData, undefined>;

interface ListResultsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListResultsData, undefined>;
}
export const listResultsRef: ListResultsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listResults(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListResultsData, undefined>;

interface ListResultsRef {
  ...
  (dc: DataConnect): QueryRef<ListResultsData, undefined>;
}
export const listResultsRef: ListResultsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listResultsRef:
```typescript
const name = listResultsRef.operationName;
console.log(name);
```

### Variables
The `ListResults` query has no variables.
### Return Type
Recall that executing the `ListResults` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListResultsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListResultsData {
  results: ({
    finalScore: number;
    status: string;
  })[];
}
```
### Using `ListResults`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listResults } from '@dataconnect/generated';


// Call the `listResults()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listResults();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listResults(dataConnect);

console.log(data.results);

// Or, you can use the `Promise` API.
listResults().then((response) => {
  const data = response.data;
  console.log(data.results);
});
```

### Using `ListResults`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listResultsRef } from '@dataconnect/generated';


// Call the `listResultsRef()` function to get a reference to the query.
const ref = listResultsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listResultsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.results);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.results);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  fullName: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  fullName: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ fullName: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  fullName: ..., 
  email: ..., 
  role: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ fullName: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateMyUser
You can execute the `UpdateMyUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyUser(vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface UpdateMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
}
export const updateMyUserRef: UpdateMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyUser(dc: DataConnect, vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface UpdateMyUserRef {
  ...
  (dc: DataConnect, vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
}
export const updateMyUserRef: UpdateMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyUserRef:
```typescript
const name = updateMyUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyUserVariables {
  fullName?: string | null;
  email?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyUser, UpdateMyUserVariables } from '@dataconnect/generated';

// The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`:
const updateMyUserVars: UpdateMyUserVariables = {
  fullName: ..., // optional
  email: ..., // optional
};

// Call the `updateMyUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyUser(updateMyUserVars);
// Variables can be defined inline as well.
const { data } = await updateMyUser({ fullName: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyUserVariables` argument.
const { data } = await updateMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyUser(dataConnect, updateMyUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateMyUser(updateMyUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateMyUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyUserRef, UpdateMyUserVariables } from '@dataconnect/generated';

// The `UpdateMyUser` mutation has an optional argument of type `UpdateMyUserVariables`:
const updateMyUserVars: UpdateMyUserVariables = {
  fullName: ..., // optional
  email: ..., // optional
};

// Call the `updateMyUserRef()` function to get a reference to the mutation.
const ref = updateMyUserRef(updateMyUserVars);
// Variables can be defined inline as well.
const ref = updateMyUserRef({ fullName: ..., email: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyUserVariables` argument.
const ref = updateMyUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyUserRef(dataConnect, updateMyUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteMyUser
You can execute the `DeleteMyUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMyUser(): MutationPromise<DeleteMyUserData, undefined>;

interface DeleteMyUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyUserData, undefined>;
}
export const deleteMyUserRef: DeleteMyUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMyUser(dc: DataConnect): MutationPromise<DeleteMyUserData, undefined>;

interface DeleteMyUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteMyUserData, undefined>;
}
export const deleteMyUserRef: DeleteMyUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMyUserRef:
```typescript
const name = deleteMyUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteMyUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteMyUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMyUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMyUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteMyUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMyUser } from '@dataconnect/generated';


// Call the `deleteMyUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMyUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMyUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteMyUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteMyUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMyUserRef } from '@dataconnect/generated';


// Call the `deleteMyUserRef()` function to get a reference to the mutation.
const ref = deleteMyUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMyUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateClass
You can execute the `CreateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface CreateClassRef {
  ...
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
}
export const createClassRef: CreateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createClassRef:
```typescript
const name = createClassRef.operationName;
console.log(name);
```

### Variables
The `CreateClass` mutation requires an argument of type `CreateClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateClassVariables {
  className: string;
  gradeLevel: number;
}
```
### Return Type
Recall that executing the `CreateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateClassData {
  class_insert: Class_Key;
}
```
### Using `CreateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createClass, CreateClassVariables } from '@dataconnect/generated';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  className: ..., 
  gradeLevel: ..., 
};

// Call the `createClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createClass(createClassVars);
// Variables can be defined inline as well.
const { data } = await createClass({ className: ..., gradeLevel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createClass(dataConnect, createClassVars);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
createClass(createClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

### Using `CreateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createClassRef, CreateClassVariables } from '@dataconnect/generated';

// The `CreateClass` mutation requires an argument of type `CreateClassVariables`:
const createClassVars: CreateClassVariables = {
  className: ..., 
  gradeLevel: ..., 
};

// Call the `createClassRef()` function to get a reference to the mutation.
const ref = createClassRef(createClassVars);
// Variables can be defined inline as well.
const ref = createClassRef({ className: ..., gradeLevel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createClassRef(dataConnect, createClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_insert);
});
```

## UpdateClass
You can execute the `UpdateClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface UpdateClassRef {
  ...
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
}
export const updateClassRef: UpdateClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateClassRef:
```typescript
const name = updateClassRef.operationName;
console.log(name);
```

### Variables
The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateClassVariables {
  id: UUIDString;
  className?: string | null;
}
```
### Return Type
Recall that executing the `UpdateClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateClassData {
  class_update?: Class_Key | null;
}
```
### Using `UpdateClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateClass, UpdateClassVariables } from '@dataconnect/generated';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  id: ..., 
  className: ..., // optional
};

// Call the `updateClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateClass(updateClassVars);
// Variables can be defined inline as well.
const { data } = await updateClass({ id: ..., className: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateClass(dataConnect, updateClassVars);

console.log(data.class_update);

// Or, you can use the `Promise` API.
updateClass(updateClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

### Using `UpdateClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateClassRef, UpdateClassVariables } from '@dataconnect/generated';

// The `UpdateClass` mutation requires an argument of type `UpdateClassVariables`:
const updateClassVars: UpdateClassVariables = {
  id: ..., 
  className: ..., // optional
};

// Call the `updateClassRef()` function to get a reference to the mutation.
const ref = updateClassRef(updateClassVars);
// Variables can be defined inline as well.
const ref = updateClassRef({ id: ..., className: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateClassRef(dataConnect, updateClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_update);
});
```

## DeleteClass
You can execute the `DeleteClass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface DeleteClassRef {
  ...
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
}
export const deleteClassRef: DeleteClassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteClassRef:
```typescript
const name = deleteClassRef.operationName;
console.log(name);
```

### Variables
The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteClassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteClass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteClassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteClassData {
  class_delete?: Class_Key | null;
}
```
### Using `DeleteClass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteClass, DeleteClassVariables } from '@dataconnect/generated';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  id: ..., 
};

// Call the `deleteClass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteClass(deleteClassVars);
// Variables can be defined inline as well.
const { data } = await deleteClass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteClass(dataConnect, deleteClassVars);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
deleteClass(deleteClassVars).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

### Using `DeleteClass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteClassRef, DeleteClassVariables } from '@dataconnect/generated';

// The `DeleteClass` mutation requires an argument of type `DeleteClassVariables`:
const deleteClassVars: DeleteClassVariables = {
  id: ..., 
};

// Call the `deleteClassRef()` function to get a reference to the mutation.
const ref = deleteClassRef(deleteClassVars);
// Variables can be defined inline as well.
const ref = deleteClassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteClassRef(dataConnect, deleteClassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.class_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.class_delete);
});
```

## CreateAssessment
You can execute the `CreateAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAssessment(vars: CreateAssessmentVariables): MutationPromise<CreateAssessmentData, CreateAssessmentVariables>;

interface CreateAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssessmentVariables): MutationRef<CreateAssessmentData, CreateAssessmentVariables>;
}
export const createAssessmentRef: CreateAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAssessment(dc: DataConnect, vars: CreateAssessmentVariables): MutationPromise<CreateAssessmentData, CreateAssessmentVariables>;

interface CreateAssessmentRef {
  ...
  (dc: DataConnect, vars: CreateAssessmentVariables): MutationRef<CreateAssessmentData, CreateAssessmentVariables>;
}
export const createAssessmentRef: CreateAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAssessmentRef:
```typescript
const name = createAssessmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAssessment` mutation requires an argument of type `CreateAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAssessmentVariables {
  title: string;
  description: string;
  dueDate: DateString;
}
```
### Return Type
Recall that executing the `CreateAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAssessmentData {
  assessment_insert: Assessment_Key;
}
```
### Using `CreateAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAssessment, CreateAssessmentVariables } from '@dataconnect/generated';

// The `CreateAssessment` mutation requires an argument of type `CreateAssessmentVariables`:
const createAssessmentVars: CreateAssessmentVariables = {
  title: ..., 
  description: ..., 
  dueDate: ..., 
};

// Call the `createAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAssessment(createAssessmentVars);
// Variables can be defined inline as well.
const { data } = await createAssessment({ title: ..., description: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAssessment(dataConnect, createAssessmentVars);

console.log(data.assessment_insert);

// Or, you can use the `Promise` API.
createAssessment(createAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.assessment_insert);
});
```

### Using `CreateAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAssessmentRef, CreateAssessmentVariables } from '@dataconnect/generated';

// The `CreateAssessment` mutation requires an argument of type `CreateAssessmentVariables`:
const createAssessmentVars: CreateAssessmentVariables = {
  title: ..., 
  description: ..., 
  dueDate: ..., 
};

// Call the `createAssessmentRef()` function to get a reference to the mutation.
const ref = createAssessmentRef(createAssessmentVars);
// Variables can be defined inline as well.
const ref = createAssessmentRef({ title: ..., description: ..., dueDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAssessmentRef(dataConnect, createAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assessment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assessment_insert);
});
```

## UpdateAssessment
You can execute the `UpdateAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAssessment(vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface UpdateAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
}
export const updateAssessmentRef: UpdateAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAssessment(dc: DataConnect, vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface UpdateAssessmentRef {
  ...
  (dc: DataConnect, vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
}
export const updateAssessmentRef: UpdateAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssessmentRef:
```typescript
const name = updateAssessmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAssessmentVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssessmentData {
  assessment_update?: Assessment_Key | null;
}
```
### Using `UpdateAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAssessment, UpdateAssessmentVariables } from '@dataconnect/generated';

// The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`:
const updateAssessmentVars: UpdateAssessmentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAssessment(updateAssessmentVars);
// Variables can be defined inline as well.
const { data } = await updateAssessment({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAssessment(dataConnect, updateAssessmentVars);

console.log(data.assessment_update);

// Or, you can use the `Promise` API.
updateAssessment(updateAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.assessment_update);
});
```

### Using `UpdateAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssessmentRef, UpdateAssessmentVariables } from '@dataconnect/generated';

// The `UpdateAssessment` mutation requires an argument of type `UpdateAssessmentVariables`:
const updateAssessmentVars: UpdateAssessmentVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateAssessmentRef()` function to get a reference to the mutation.
const ref = updateAssessmentRef(updateAssessmentVars);
// Variables can be defined inline as well.
const ref = updateAssessmentRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssessmentRef(dataConnect, updateAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assessment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assessment_update);
});
```

## DeleteAssessment
You can execute the `DeleteAssessment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAssessment(vars: DeleteAssessmentVariables): MutationPromise<DeleteAssessmentData, DeleteAssessmentVariables>;

interface DeleteAssessmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssessmentVariables): MutationRef<DeleteAssessmentData, DeleteAssessmentVariables>;
}
export const deleteAssessmentRef: DeleteAssessmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAssessment(dc: DataConnect, vars: DeleteAssessmentVariables): MutationPromise<DeleteAssessmentData, DeleteAssessmentVariables>;

interface DeleteAssessmentRef {
  ...
  (dc: DataConnect, vars: DeleteAssessmentVariables): MutationRef<DeleteAssessmentData, DeleteAssessmentVariables>;
}
export const deleteAssessmentRef: DeleteAssessmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAssessmentRef:
```typescript
const name = deleteAssessmentRef.operationName;
console.log(name);
```

### Variables
The `DeleteAssessment` mutation requires an argument of type `DeleteAssessmentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAssessmentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAssessment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAssessmentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAssessmentData {
  assessment_delete?: Assessment_Key | null;
}
```
### Using `DeleteAssessment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAssessment, DeleteAssessmentVariables } from '@dataconnect/generated';

// The `DeleteAssessment` mutation requires an argument of type `DeleteAssessmentVariables`:
const deleteAssessmentVars: DeleteAssessmentVariables = {
  id: ..., 
};

// Call the `deleteAssessment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAssessment(deleteAssessmentVars);
// Variables can be defined inline as well.
const { data } = await deleteAssessment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAssessment(dataConnect, deleteAssessmentVars);

console.log(data.assessment_delete);

// Or, you can use the `Promise` API.
deleteAssessment(deleteAssessmentVars).then((response) => {
  const data = response.data;
  console.log(data.assessment_delete);
});
```

### Using `DeleteAssessment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAssessmentRef, DeleteAssessmentVariables } from '@dataconnect/generated';

// The `DeleteAssessment` mutation requires an argument of type `DeleteAssessmentVariables`:
const deleteAssessmentVars: DeleteAssessmentVariables = {
  id: ..., 
};

// Call the `deleteAssessmentRef()` function to get a reference to the mutation.
const ref = deleteAssessmentRef(deleteAssessmentVars);
// Variables can be defined inline as well.
const ref = deleteAssessmentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAssessmentRef(dataConnect, deleteAssessmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assessment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assessment_delete);
});
```

## CreateSubmission
You can execute the `CreateSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSubmission(vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface CreateSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
}
export const createSubmissionRef: CreateSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSubmission(dc: DataConnect, vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface CreateSubmissionRef {
  ...
  (dc: DataConnect, vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
}
export const createSubmissionRef: CreateSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSubmissionRef:
```typescript
const name = createSubmissionRef.operationName;
console.log(name);
```

### Variables
The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSubmissionVariables {
  assessmentId: UUIDString;
  codeContent: string;
}
```
### Return Type
Recall that executing the `CreateSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSubmissionData {
  submission_insert: Submission_Key;
}
```
### Using `CreateSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSubmission, CreateSubmissionVariables } from '@dataconnect/generated';

// The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`:
const createSubmissionVars: CreateSubmissionVariables = {
  assessmentId: ..., 
  codeContent: ..., 
};

// Call the `createSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSubmission(createSubmissionVars);
// Variables can be defined inline as well.
const { data } = await createSubmission({ assessmentId: ..., codeContent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSubmission(dataConnect, createSubmissionVars);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
createSubmission(createSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

### Using `CreateSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSubmissionRef, CreateSubmissionVariables } from '@dataconnect/generated';

// The `CreateSubmission` mutation requires an argument of type `CreateSubmissionVariables`:
const createSubmissionVars: CreateSubmissionVariables = {
  assessmentId: ..., 
  codeContent: ..., 
};

// Call the `createSubmissionRef()` function to get a reference to the mutation.
const ref = createSubmissionRef(createSubmissionVars);
// Variables can be defined inline as well.
const ref = createSubmissionRef({ assessmentId: ..., codeContent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSubmissionRef(dataConnect, createSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_insert);
});
```

## UpdateSubmission
You can execute the `UpdateSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSubmission(vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface UpdateSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
}
export const updateSubmissionRef: UpdateSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSubmission(dc: DataConnect, vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface UpdateSubmissionRef {
  ...
  (dc: DataConnect, vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
}
export const updateSubmissionRef: UpdateSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSubmissionRef:
```typescript
const name = updateSubmissionRef.operationName;
console.log(name);
```

### Variables
The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSubmissionVariables {
  id: UUIDString;
  codeContent?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSubmissionData {
  submission_update?: Submission_Key | null;
}
```
### Using `UpdateSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSubmission, UpdateSubmissionVariables } from '@dataconnect/generated';

// The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`:
const updateSubmissionVars: UpdateSubmissionVariables = {
  id: ..., 
  codeContent: ..., // optional
};

// Call the `updateSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSubmission(updateSubmissionVars);
// Variables can be defined inline as well.
const { data } = await updateSubmission({ id: ..., codeContent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSubmission(dataConnect, updateSubmissionVars);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
updateSubmission(updateSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

### Using `UpdateSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSubmissionRef, UpdateSubmissionVariables } from '@dataconnect/generated';

// The `UpdateSubmission` mutation requires an argument of type `UpdateSubmissionVariables`:
const updateSubmissionVars: UpdateSubmissionVariables = {
  id: ..., 
  codeContent: ..., // optional
};

// Call the `updateSubmissionRef()` function to get a reference to the mutation.
const ref = updateSubmissionRef(updateSubmissionVars);
// Variables can be defined inline as well.
const ref = updateSubmissionRef({ id: ..., codeContent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSubmissionRef(dataConnect, updateSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_update);
});
```

## DeleteSubmission
You can execute the `DeleteSubmission` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface DeleteSubmissionRef {
  ...
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
}
export const deleteSubmissionRef: DeleteSubmissionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSubmissionRef:
```typescript
const name = deleteSubmissionRef.operationName;
console.log(name);
```

### Variables
The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSubmissionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSubmission` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSubmissionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}
```
### Using `DeleteSubmission`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSubmission, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmission()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSubmission(deleteSubmissionVars);
// Variables can be defined inline as well.
const { data } = await deleteSubmission({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSubmission(dataConnect, deleteSubmissionVars);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
deleteSubmission(deleteSubmissionVars).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

### Using `DeleteSubmission`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSubmissionRef, DeleteSubmissionVariables } from '@dataconnect/generated';

// The `DeleteSubmission` mutation requires an argument of type `DeleteSubmissionVariables`:
const deleteSubmissionVars: DeleteSubmissionVariables = {
  id: ..., 
};

// Call the `deleteSubmissionRef()` function to get a reference to the mutation.
const ref = deleteSubmissionRef(deleteSubmissionVars);
// Variables can be defined inline as well.
const ref = deleteSubmissionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSubmissionRef(dataConnect, deleteSubmissionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.submission_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.submission_delete);
});
```

## CreateResult
You can execute the `CreateResult` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createResult(vars: CreateResultVariables): MutationPromise<CreateResultData, CreateResultVariables>;

interface CreateResultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResultVariables): MutationRef<CreateResultData, CreateResultVariables>;
}
export const createResultRef: CreateResultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createResult(dc: DataConnect, vars: CreateResultVariables): MutationPromise<CreateResultData, CreateResultVariables>;

interface CreateResultRef {
  ...
  (dc: DataConnect, vars: CreateResultVariables): MutationRef<CreateResultData, CreateResultVariables>;
}
export const createResultRef: CreateResultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createResultRef:
```typescript
const name = createResultRef.operationName;
console.log(name);
```

### Variables
The `CreateResult` mutation requires an argument of type `CreateResultVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateResultVariables {
  assessmentId: UUIDString;
  learnerId: UUIDString;
  finalScore: number;
  status: string;
}
```
### Return Type
Recall that executing the `CreateResult` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateResultData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateResultData {
  result_insert: Result_Key;
}
```
### Using `CreateResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createResult, CreateResultVariables } from '@dataconnect/generated';

// The `CreateResult` mutation requires an argument of type `CreateResultVariables`:
const createResultVars: CreateResultVariables = {
  assessmentId: ..., 
  learnerId: ..., 
  finalScore: ..., 
  status: ..., 
};

// Call the `createResult()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createResult(createResultVars);
// Variables can be defined inline as well.
const { data } = await createResult({ assessmentId: ..., learnerId: ..., finalScore: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createResult(dataConnect, createResultVars);

console.log(data.result_insert);

// Or, you can use the `Promise` API.
createResult(createResultVars).then((response) => {
  const data = response.data;
  console.log(data.result_insert);
});
```

### Using `CreateResult`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createResultRef, CreateResultVariables } from '@dataconnect/generated';

// The `CreateResult` mutation requires an argument of type `CreateResultVariables`:
const createResultVars: CreateResultVariables = {
  assessmentId: ..., 
  learnerId: ..., 
  finalScore: ..., 
  status: ..., 
};

// Call the `createResultRef()` function to get a reference to the mutation.
const ref = createResultRef(createResultVars);
// Variables can be defined inline as well.
const ref = createResultRef({ assessmentId: ..., learnerId: ..., finalScore: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createResultRef(dataConnect, createResultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.result_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.result_insert);
});
```

## UpdateResult
You can execute the `UpdateResult` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateResult(vars: UpdateResultVariables): MutationPromise<UpdateResultData, UpdateResultVariables>;

interface UpdateResultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateResultVariables): MutationRef<UpdateResultData, UpdateResultVariables>;
}
export const updateResultRef: UpdateResultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateResult(dc: DataConnect, vars: UpdateResultVariables): MutationPromise<UpdateResultData, UpdateResultVariables>;

interface UpdateResultRef {
  ...
  (dc: DataConnect, vars: UpdateResultVariables): MutationRef<UpdateResultData, UpdateResultVariables>;
}
export const updateResultRef: UpdateResultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateResultRef:
```typescript
const name = updateResultRef.operationName;
console.log(name);
```

### Variables
The `UpdateResult` mutation requires an argument of type `UpdateResultVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateResultVariables {
  id: UUIDString;
  finalScore?: number | null;
}
```
### Return Type
Recall that executing the `UpdateResult` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateResultData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateResultData {
  result_update?: Result_Key | null;
}
```
### Using `UpdateResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateResult, UpdateResultVariables } from '@dataconnect/generated';

// The `UpdateResult` mutation requires an argument of type `UpdateResultVariables`:
const updateResultVars: UpdateResultVariables = {
  id: ..., 
  finalScore: ..., // optional
};

// Call the `updateResult()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateResult(updateResultVars);
// Variables can be defined inline as well.
const { data } = await updateResult({ id: ..., finalScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateResult(dataConnect, updateResultVars);

console.log(data.result_update);

// Or, you can use the `Promise` API.
updateResult(updateResultVars).then((response) => {
  const data = response.data;
  console.log(data.result_update);
});
```

### Using `UpdateResult`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateResultRef, UpdateResultVariables } from '@dataconnect/generated';

// The `UpdateResult` mutation requires an argument of type `UpdateResultVariables`:
const updateResultVars: UpdateResultVariables = {
  id: ..., 
  finalScore: ..., // optional
};

// Call the `updateResultRef()` function to get a reference to the mutation.
const ref = updateResultRef(updateResultVars);
// Variables can be defined inline as well.
const ref = updateResultRef({ id: ..., finalScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateResultRef(dataConnect, updateResultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.result_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.result_update);
});
```

## DeleteResult
You can execute the `DeleteResult` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteResult(vars: DeleteResultVariables): MutationPromise<DeleteResultData, DeleteResultVariables>;

interface DeleteResultRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteResultVariables): MutationRef<DeleteResultData, DeleteResultVariables>;
}
export const deleteResultRef: DeleteResultRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteResult(dc: DataConnect, vars: DeleteResultVariables): MutationPromise<DeleteResultData, DeleteResultVariables>;

interface DeleteResultRef {
  ...
  (dc: DataConnect, vars: DeleteResultVariables): MutationRef<DeleteResultData, DeleteResultVariables>;
}
export const deleteResultRef: DeleteResultRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteResultRef:
```typescript
const name = deleteResultRef.operationName;
console.log(name);
```

### Variables
The `DeleteResult` mutation requires an argument of type `DeleteResultVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteResultVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteResult` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteResultData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteResultData {
  result_delete?: Result_Key | null;
}
```
### Using `DeleteResult`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteResult, DeleteResultVariables } from '@dataconnect/generated';

// The `DeleteResult` mutation requires an argument of type `DeleteResultVariables`:
const deleteResultVars: DeleteResultVariables = {
  id: ..., 
};

// Call the `deleteResult()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteResult(deleteResultVars);
// Variables can be defined inline as well.
const { data } = await deleteResult({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteResult(dataConnect, deleteResultVars);

console.log(data.result_delete);

// Or, you can use the `Promise` API.
deleteResult(deleteResultVars).then((response) => {
  const data = response.data;
  console.log(data.result_delete);
});
```

### Using `DeleteResult`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteResultRef, DeleteResultVariables } from '@dataconnect/generated';

// The `DeleteResult` mutation requires an argument of type `DeleteResultVariables`:
const deleteResultVars: DeleteResultVariables = {
  id: ..., 
};

// Call the `deleteResultRef()` function to get a reference to the mutation.
const ref = deleteResultRef(deleteResultVars);
// Variables can be defined inline as well.
const ref = deleteResultRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteResultRef(dataConnect, deleteResultVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.result_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.result_delete);
});
```

