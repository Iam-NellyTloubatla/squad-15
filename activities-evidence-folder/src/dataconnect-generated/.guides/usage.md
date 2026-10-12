# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateMyUser, deleteMyUser, getMyUser, listUsers, createClass, updateClass, deleteClass, getClass, listClasses } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateMyUser:  For variables, look at type UpdateMyUserVars in ../index.d.ts
const { data } = await UpdateMyUser(dataConnect, updateMyUserVars);

// Operation DeleteMyUser: 
const { data } = await DeleteMyUser(dataConnect);

// Operation GetMyUser: 
const { data } = await GetMyUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateClass:  For variables, look at type CreateClassVars in ../index.d.ts
const { data } = await CreateClass(dataConnect, createClassVars);

// Operation UpdateClass:  For variables, look at type UpdateClassVars in ../index.d.ts
const { data } = await UpdateClass(dataConnect, updateClassVars);

// Operation DeleteClass:  For variables, look at type DeleteClassVars in ../index.d.ts
const { data } = await DeleteClass(dataConnect, deleteClassVars);

// Operation GetClass:  For variables, look at type GetClassVars in ../index.d.ts
const { data } = await GetClass(dataConnect, getClassVars);

// Operation ListClasses: 
const { data } = await ListClasses(dataConnect);


```