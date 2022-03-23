import React from "react";
import {FieldContainer, FieldLabel} from "@keystone-ui/fields";
import {
    component, FormField,
} from "@keystone-6/fields-document/component-blocks";

const files = ({label}: { label: string }): FormField<Array<string>, undefined> => {
    return {
        kind: "form",
        Input({value, onChange, autoFocus}) {
            return (
                <FieldContainer>
                    <FieldLabel>{label}</FieldLabel>
                    <div>
                        {value?.map((file) => (
                            <img width="200" src={`http://127.0.0.1:8787/${file}`} key={file}/>
                        ))}
                    </div>
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={async (e) => {
                                e.preventDefault();
                                if (e.target.files?.length === 1) {
                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    const res = await fetch("/api/upload", {method: "POST", body: formData});
                                    if (res.ok) {
                                        const json = await res.json();
                                        onChange([...value, json.filename]);
                                    }
                                }
                            }}
                        />
                    </div>
                </FieldContainer>
            );
        },
        options: undefined,
        defaultValue: [],
        validate(value) {
            return Array.isArray(value) && value.every((value) => typeof value === "string");
        },
    };
};

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
    files: component({
        label: "Files",
        chromeless: false,
        props: {
            files: files({
                label: "Files",
            }),
        },
        component: ({files: {value}}) => {
            return (
                <>
                    {value?.map((file) => (
                        <img width="200" src={`http://127.0.0.1:8787/${file}`} key={file}/>
                    ))}
                </>
            );
        },
    }),
};