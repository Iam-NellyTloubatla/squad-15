import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Assessment_Key {
  id: UUIDString;
  __typename?: 'Assessment_Key';
}

export interface Class_Key {
  id: UUIDString;
  __typename?: 'Class_Key';
}

export interface CreateAssessmentData {
  assessment_insert: Assessment_Key;
}

export interface CreateAssessmentVariables {
  title: string;
  description: string;
  dueDate: DateString;
}

export interface CreateClassData {
  class_insert: Class_Key;
}

export interface CreateClassVariables {
  className: string;
  gradeLevel: number;
}

export interface CreateResultData {
  result_insert: Result_Key;
}

export interface CreateResultVariables {
  assessmentId: UUIDString;
  learnerId: UUIDString;
  finalScore: number;
  status: string;
}

export interface CreateSubmissionData {
  submission_insert: Submission_Key;
}

export interface CreateSubmissionVariables {
  assessmentId: UUIDString;
  codeContent: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  fullName: string;
  email: string;
  role: string;
}

export interface DeleteAssessmentData {
  assessment_delete?: Assessment_Key | null;
}

export interface DeleteAssessmentVariables {
  id: UUIDString;
}

export interface DeleteClassData {
  class_delete?: Class_Key | null;
}

export interface DeleteClassVariables {
  id: UUIDString;
}

export interface DeleteMyUserData {
  user_delete?: User_Key | null;
}

export interface DeleteResultData {
  result_delete?: Result_Key | null;
}

export interface DeleteResultVariables {
  id: UUIDString;
}

export interface DeleteSubmissionData {
  submission_delete?: Submission_Key | null;
}

export interface DeleteSubmissionVariables {
  id: UUIDString;
}

export interface GetAssessmentData {
  assessment?: {
    title: string;
    dueDate: DateString;
    author: {
      fullName: string;
    };
  };
}

export interface GetAssessmentVariables {
  id: UUIDString;
}

export interface GetClassData {
  class?: {
    className: string;
    gradeLevel: number;
    leadTeacher?: {
      fullName: string;
    };
  };
}

export interface GetClassVariables {
  id: UUIDString;
}

export interface GetMyUserData {
  user?: {
    fullName: string;
    email: string;
    role: string;
  };
}

export interface GetResultData {
  result?: {
    finalScore: number;
    status: string;
    learner: {
      fullName: string;
    };
  };
}

export interface GetResultVariables {
  id: UUIDString;
}

export interface GetSubmissionData {
  submission?: {
    score?: number | null;
    feedbackComments?: string | null;
    codeContent: string;
  };
}

export interface GetSubmissionVariables {
  id: UUIDString;
}

export interface ListAssessmentsData {
  assessments: ({
    title: string;
    dueDate: DateString;
  })[];
}

export interface ListClassesData {
  classes: ({
    className: string;
    gradeLevel: number;
  })[];
}

export interface ListMySubmissionsData {
  submissions: ({
    submissionDate: TimestampString;
    score?: number | null;
  })[];
}

export interface ListResultsData {
  results: ({
    finalScore: number;
    status: string;
  })[];
}

export interface ListUsersData {
  users: ({
    fullName: string;
    email: string;
    role: string;
  })[];
}

export interface Result_Key {
  id: UUIDString;
  __typename?: 'Result_Key';
}

export interface Submission_Key {
  id: UUIDString;
  __typename?: 'Submission_Key';
}

export interface UpdateAssessmentData {
  assessment_update?: Assessment_Key | null;
}

export interface UpdateAssessmentVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateClassData {
  class_update?: Class_Key | null;
}

export interface UpdateClassVariables {
  id: UUIDString;
  className?: string | null;
}

export interface UpdateMyUserData {
  user_update?: User_Key | null;
}

export interface UpdateMyUserVariables {
  fullName?: string | null;
  email?: string | null;
}

export interface UpdateResultData {
  result_update?: Result_Key | null;
}

export interface UpdateResultVariables {
  id: UUIDString;
  finalScore?: number | null;
}

export interface UpdateSubmissionData {
  submission_update?: Submission_Key | null;
}

export interface UpdateSubmissionVariables {
  id: UUIDString;
  codeContent?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyUserVariables): MutationRef<UpdateMyUserData, UpdateMyUserVariables>;
  operationName: string;
}
export const updateMyUserRef: UpdateMyUserRef;

export function updateMyUser(vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;
export function updateMyUser(dc: DataConnect, vars?: UpdateMyUserVariables): MutationPromise<UpdateMyUserData, UpdateMyUserVariables>;

interface DeleteMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteMyUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteMyUserData, undefined>;
  operationName: string;
}
export const deleteMyUserRef: DeleteMyUserRef;

export function deleteMyUser(): MutationPromise<DeleteMyUserData, undefined>;
export function deleteMyUser(dc: DataConnect): MutationPromise<DeleteMyUserData, undefined>;

interface GetMyUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyUserData, undefined>;
  operationName: string;
}
export const getMyUserRef: GetMyUserRef;

export function getMyUser(options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;
export function getMyUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateClassVariables): MutationRef<CreateClassData, CreateClassVariables>;
  operationName: string;
}
export const createClassRef: CreateClassRef;

export function createClass(vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;
export function createClass(dc: DataConnect, vars: CreateClassVariables): MutationPromise<CreateClassData, CreateClassVariables>;

interface UpdateClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateClassVariables): MutationRef<UpdateClassData, UpdateClassVariables>;
  operationName: string;
}
export const updateClassRef: UpdateClassRef;

export function updateClass(vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;
export function updateClass(dc: DataConnect, vars: UpdateClassVariables): MutationPromise<UpdateClassData, UpdateClassVariables>;

interface DeleteClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteClassVariables): MutationRef<DeleteClassData, DeleteClassVariables>;
  operationName: string;
}
export const deleteClassRef: DeleteClassRef;

export function deleteClass(vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;
export function deleteClass(dc: DataConnect, vars: DeleteClassVariables): MutationPromise<DeleteClassData, DeleteClassVariables>;

interface GetClassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetClassVariables): QueryRef<GetClassData, GetClassVariables>;
  operationName: string;
}
export const getClassRef: GetClassRef;

export function getClass(vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;
export function getClass(dc: DataConnect, vars: GetClassVariables, options?: ExecuteQueryOptions): QueryPromise<GetClassData, GetClassVariables>;

interface ListClassesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListClassesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListClassesData, undefined>;
  operationName: string;
}
export const listClassesRef: ListClassesRef;

export function listClasses(options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;
export function listClasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListClassesData, undefined>;

interface CreateAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssessmentVariables): MutationRef<CreateAssessmentData, CreateAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAssessmentVariables): MutationRef<CreateAssessmentData, CreateAssessmentVariables>;
  operationName: string;
}
export const createAssessmentRef: CreateAssessmentRef;

export function createAssessment(vars: CreateAssessmentVariables): MutationPromise<CreateAssessmentData, CreateAssessmentVariables>;
export function createAssessment(dc: DataConnect, vars: CreateAssessmentVariables): MutationPromise<CreateAssessmentData, CreateAssessmentVariables>;

interface UpdateAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssessmentVariables): MutationRef<UpdateAssessmentData, UpdateAssessmentVariables>;
  operationName: string;
}
export const updateAssessmentRef: UpdateAssessmentRef;

export function updateAssessment(vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;
export function updateAssessment(dc: DataConnect, vars: UpdateAssessmentVariables): MutationPromise<UpdateAssessmentData, UpdateAssessmentVariables>;

interface DeleteAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssessmentVariables): MutationRef<DeleteAssessmentData, DeleteAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAssessmentVariables): MutationRef<DeleteAssessmentData, DeleteAssessmentVariables>;
  operationName: string;
}
export const deleteAssessmentRef: DeleteAssessmentRef;

export function deleteAssessment(vars: DeleteAssessmentVariables): MutationPromise<DeleteAssessmentData, DeleteAssessmentVariables>;
export function deleteAssessment(dc: DataConnect, vars: DeleteAssessmentVariables): MutationPromise<DeleteAssessmentData, DeleteAssessmentVariables>;

interface GetAssessmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssessmentVariables): QueryRef<GetAssessmentData, GetAssessmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssessmentVariables): QueryRef<GetAssessmentData, GetAssessmentVariables>;
  operationName: string;
}
export const getAssessmentRef: GetAssessmentRef;

export function getAssessment(vars: GetAssessmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssessmentData, GetAssessmentVariables>;
export function getAssessment(dc: DataConnect, vars: GetAssessmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssessmentData, GetAssessmentVariables>;

interface ListAssessmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssessmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAssessmentsData, undefined>;
  operationName: string;
}
export const listAssessmentsRef: ListAssessmentsRef;

export function listAssessments(options?: ExecuteQueryOptions): QueryPromise<ListAssessmentsData, undefined>;
export function listAssessments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssessmentsData, undefined>;

interface CreateSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSubmissionVariables): MutationRef<CreateSubmissionData, CreateSubmissionVariables>;
  operationName: string;
}
export const createSubmissionRef: CreateSubmissionRef;

export function createSubmission(vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;
export function createSubmission(dc: DataConnect, vars: CreateSubmissionVariables): MutationPromise<CreateSubmissionData, CreateSubmissionVariables>;

interface UpdateSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSubmissionVariables): MutationRef<UpdateSubmissionData, UpdateSubmissionVariables>;
  operationName: string;
}
export const updateSubmissionRef: UpdateSubmissionRef;

export function updateSubmission(vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;
export function updateSubmission(dc: DataConnect, vars: UpdateSubmissionVariables): MutationPromise<UpdateSubmissionData, UpdateSubmissionVariables>;

interface DeleteSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSubmissionVariables): MutationRef<DeleteSubmissionData, DeleteSubmissionVariables>;
  operationName: string;
}
export const deleteSubmissionRef: DeleteSubmissionRef;

export function deleteSubmission(vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;
export function deleteSubmission(dc: DataConnect, vars: DeleteSubmissionVariables): MutationPromise<DeleteSubmissionData, DeleteSubmissionVariables>;

interface GetSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSubmissionVariables): QueryRef<GetSubmissionData, GetSubmissionVariables>;
  operationName: string;
}
export const getSubmissionRef: GetSubmissionRef;

export function getSubmission(vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;
export function getSubmission(dc: DataConnect, vars: GetSubmissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionData, GetSubmissionVariables>;

interface ListMySubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySubmissionsData, undefined>;
  operationName: string;
}
export const listMySubmissionsRef: ListMySubmissionsRef;

export function listMySubmissions(options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;
export function listMySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySubmissionsData, undefined>;

interface CreateResultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateResultVariables): MutationRef<CreateResultData, CreateResultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateResultVariables): MutationRef<CreateResultData, CreateResultVariables>;
  operationName: string;
}
export const createResultRef: CreateResultRef;

export function createResult(vars: CreateResultVariables): MutationPromise<CreateResultData, CreateResultVariables>;
export function createResult(dc: DataConnect, vars: CreateResultVariables): MutationPromise<CreateResultData, CreateResultVariables>;

interface UpdateResultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateResultVariables): MutationRef<UpdateResultData, UpdateResultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateResultVariables): MutationRef<UpdateResultData, UpdateResultVariables>;
  operationName: string;
}
export const updateResultRef: UpdateResultRef;

export function updateResult(vars: UpdateResultVariables): MutationPromise<UpdateResultData, UpdateResultVariables>;
export function updateResult(dc: DataConnect, vars: UpdateResultVariables): MutationPromise<UpdateResultData, UpdateResultVariables>;

interface DeleteResultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteResultVariables): MutationRef<DeleteResultData, DeleteResultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteResultVariables): MutationRef<DeleteResultData, DeleteResultVariables>;
  operationName: string;
}
export const deleteResultRef: DeleteResultRef;

export function deleteResult(vars: DeleteResultVariables): MutationPromise<DeleteResultData, DeleteResultVariables>;
export function deleteResult(dc: DataConnect, vars: DeleteResultVariables): MutationPromise<DeleteResultData, DeleteResultVariables>;

interface GetResultRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetResultVariables): QueryRef<GetResultData, GetResultVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetResultVariables): QueryRef<GetResultData, GetResultVariables>;
  operationName: string;
}
export const getResultRef: GetResultRef;

export function getResult(vars: GetResultVariables, options?: ExecuteQueryOptions): QueryPromise<GetResultData, GetResultVariables>;
export function getResult(dc: DataConnect, vars: GetResultVariables, options?: ExecuteQueryOptions): QueryPromise<GetResultData, GetResultVariables>;

interface ListResultsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListResultsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListResultsData, undefined>;
  operationName: string;
}
export const listResultsRef: ListResultsRef;

export function listResults(options?: ExecuteQueryOptions): QueryPromise<ListResultsData, undefined>;
export function listResults(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListResultsData, undefined>;

