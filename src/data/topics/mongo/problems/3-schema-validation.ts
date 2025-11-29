import { Problem, Difficulty } from '@/types';

export const mongoSchemaValidation: Omit<Problem, 'status' | 'isStarred' | 'notes'>[] = [
  {
    id: 'mongo-schema-validation',
    title: 'Schema Validation',
    description: 'Define a JSON schema for a `products` collection where `name` is a required string and `price` is a required number.',
    difficulty: Difficulty.Medium,
    category: 'Validation',
    group: 'Step 3: Schema Validation',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/schema-validation/',
    starterCode: `const schema = {
  $jsonSchema: {
    // Your code here
  }
};`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('bsonType: "object"') && userCode.includes('required: [') && userCode.includes('name') && userCode.includes('price');
      return [{
        input: 'Code Check',
        expected: 'Schema with required fields',
        actual: passed ? 'Correctly implemented' : 'Missing required fields or type',
        passed
      }];
    },
  },
  {
    id: 'mongoose-schema',
    title: 'Mongoose Schema',
    description: 'Create a Mongoose schema for a `Post` with `title` (String, required) and `body` (String).',
    difficulty: Difficulty.Easy,
    category: 'Validation',
    group: 'Step 3: Schema Validation',
    docsUrl: 'https://mongoosejs.com/docs/guide.html',
    starterCode: `const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('title: {') && userCode.includes('type: String') && userCode.includes('required: true');
      return [{
        input: 'Code Check',
        expected: 'Mongoose schema defined',
        actual: passed ? 'Correctly implemented' : 'Missing schema definition',
        passed
      }];
    },
  },
  {
    id: 'mongo-validation-level',
    title: 'Validation Level',
    description: 'Create a collection "posts" with `validationLevel` set to "strict".',
    difficulty: Difficulty.Medium,
    category: 'Schema Validation',
    group: 'Step 3: Schema Validation',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/schema-validation/#validation-level',
    starterCode: `db.createCollection("posts", {
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('validationLevel: "strict"') || userCode.includes("validationLevel: 'strict'");
      return [{
        input: 'Code Check',
        expected: 'validationLevel: strict',
        actual: passed ? 'Correctly implemented' : 'Missing validationLevel',
        passed
      }];
    },
  },
  {
    id: 'mongo-validation-action',
    title: 'Validation Action',
    description: 'Create a collection "logs" with `validationAction` set to "warn".',
    difficulty: Difficulty.Medium,
    category: 'Schema Validation',
    group: 'Step 3: Schema Validation',
    docsUrl: 'https://www.mongodb.com/docs/manual/core/schema-validation/#validation-action',
    starterCode: `db.createCollection("logs", {
  // Your code here
})`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('validationAction: "warn"') || userCode.includes("validationAction: 'warn'");
      return [{
        input: 'Code Check',
        expected: 'validationAction: warn',
        actual: passed ? 'Correctly implemented' : 'Missing validationAction',
        passed
      }];
    },
  },
  {
    id: 'mongoose-required',
    title: 'Mongoose Required Field',
    description: 'Define a Mongoose schema where the `username` field is a required string.',
    difficulty: Difficulty.Easy,
    category: 'Schema Validation',
    group: 'Step 3: Schema Validation',
    docsUrl: 'https://mongoosejs.com/docs/validation.html#required-validators-on-nested-objects',
    starterCode: `const schema = new mongoose.Schema({
  // Your code here
});`,
    testCases: [],
    solutionCheck: (userCode: string) => {
      const passed = userCode.includes('required: true') && userCode.includes('String');
      return [{
        input: 'Code Check',
        expected: 'Required string field',
        actual: passed ? 'Correctly implemented' : 'Missing required or type',
        passed
      }];
    },
  }
];
