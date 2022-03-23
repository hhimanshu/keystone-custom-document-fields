/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import {list} from '@keystone-6/core';

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
    text,
    relationship,
    password,
    timestamp,
    select,
} from '@keystone-6/core/fields';
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import {document} from '@keystone-6/fields-document';

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import {Lists} from '.keystone/types';
import * as path from "path";
import {componentBlocks} from './src/component-blocks';

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
    Document: list({
        fields: {
            content: document({
                ui: {
                    views: path.resolve("./src/component-blocks"),
                },
                componentBlocks,
                links: true,
                dividers: true,
                layouts: [
                    [1, 1],
                    [1, 1, 1],
                    [1, 1, 1, 1],
                    [2, 1],
                    [1, 2],
                    [1, 2, 1],
                ],
                formatting: {
                    inlineMarks: {
                        bold: true,
                        italic: true,
                        underline: true,
                        strikethrough: true,
                        code: true,
                        superscript: true,
                        subscript: true,
                        keyboard: true,
                    },
                    listTypes: true,
                    alignment: true,
                    headingLevels: [2, 3, 4, 5, 6],
                    blockTypes: true,
                    softBreaks: true,
                },
            }),
        },
    })
};
