# Task 3: TypeScript Type Inference

This example demonstrates how to use TypeScript's nullish coalescing operator (`??`) to handle missing `age` properties.


# Task 3: TypeScript Type Inference

## Requirements
1. **Function Definition**: Consider the following TypeScript function:
   ```typescript
   function getUserInfo(user: { name: string, age?: number }) {
     return {
       name: user.name,
       age: user.age ?? 'Age not provided'
     };
   }
