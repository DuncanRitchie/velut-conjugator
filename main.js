const buttonClearInputs = document.getElementById("clear-inputs");
const buttonLoadSampleData = document.getElementById("load-sample-data");
const textareaInput = document.getElementById("textarea-input");
const buttonGenerateSelectConjugationsTable = document.getElementById("generate-select-conjugations-table");
const textBeforeTable = document.getElementById("text-before-table");
const tbody = document.getElementById("tbody");
const conjugationsDataList = document.getElementById("conjugation-descriptions");
const textBySelectConjugations = document.getElementById("text-by-select-conjugations");
const tickboxIncludeStressedEndings = document.getElementById("include-stressed-endings");
const tickboxCombineLemmata = document.getElementById("combine-lemmata");
const tickboxOutputLemma = document.getElementById("output-lemma");
const buttonConjugate = document.getElementById("conjugate");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

const sampleData = "amō amāre amāvī amātum; cubō cubāre cubuī cubitum; doceō docēre docuī doctum; tangō tangere tetigī tāctum; audiō audīre audīvī audītum; hortor hortārī hortātum; vereor verērī veritum; loquor loquī locūtum; potior potīrī potītum; orior orīrī ortum";

const schemata = [
    {
        "Description":           "1st, non-deponent",
        "Unstressed endings":    {
            "Present stem":      ["ō","ās","at","ant","or","em","ēs","et","ent","er","ā","āns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "āre",
    },
    {
        "Description":           "2nd, non-deponent",
        "Unstressed endings":    {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "ēre",
    },
    {
        "Description":           "3rd, non-deponent",
        "Unstressed endings":    {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "ere",
    },
    {
        "Description":           "4th, non-deponent",
        "Unstressed endings":    {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "īre",
    },
    {
        "Description":           "1st, deponent",
        "Unstressed endings":    {
            "Present stem":      ["or","er","āns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "ārī",
    },
    {
        "Description":           "2nd, deponent",
        "Unstressed endings":    {
            "Present stem":      ["eō","ēs","et","ent","ē","ēns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "ērī",
    },
    {
        "Description":           "4th, deponent",
        "Unstressed endings":    {
            "Present stem":      ["ior","iēns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "īrī",
    },
    {
        "Description":           "3rd, deponent",
        "Unstressed endings":    {
            "Present stem":      ["or","eris","ere","itur","imur","ēns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "ī",
    },
    {
        "Description":           "",
        "Unstressed endings":    {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "",
    },
    {
        "Description":           "",
        "Unstressed endings":    {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Infinitive ending":     "",
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForPrincipalParts = (principalParts) => {
    const find = schemata.find(schema => {
        return principalParts[1].endsWith(schema["Infinitive ending"]);
    })

    return find?.Description ?? "1st, -āvī perfect";
}

const getSchemaFromDescription = (conjugationDescription) => {
    for (let i = 0; i < schemata.length; i++) {
        if (schemata[i].Description === conjugationDescription) {
            return schemata[i];
        }
    }
}

//// Removes any instance of `terminator` and any characters after it from `string`.
//// Eg, ("Duncan Ritchie is a software dev"," ") => "Duncan"
//// Eg, ("Duncan Ritchie"," ") => "Duncan"
//// Eg, ("velut"," ") => "velut"
const getSubstringBeforeTerminator = (string, terminator) => {
    if (string.includes(terminator)) {
        return string.substr(0, string.indexOf(terminator));
    }
    return string;
}

const getSubstringBeforeSlash = (string) => {
    return getSubstringBeforeTerminator(string, "/");
}

//// Removes any instance of `terminator` and any characters before it from `string`.
//// Eg, ("Duncan Ritchie is a software dev"," ") => "dev"
//// Eg, ("Duncan Ritchie"," ") => "Ritchie"
//// Eg, ("velut"," ") => "velut"
const getSubstringAfterTerminator = (string, terminator) => {
    return string.substr(string.indexOf(terminator) + 1);
}

//// ("amor/amōris", "is") => "amōr"
//// ("cōnsul", "is") => "cōnsul"
//// ("avis", "is") => "av"
//// ("hiātus", "ūs") => "hiāt"
const getStemFromPrincipalParts = (principalParts, principalPartEnding) => {
    let output = principalParts;

    // //// If `output` contains a slash, remove anything up to it.
    // output = getSubstringAfterTerminator(output, "/");

    // //// If `output` ends with the ending, remove the ending.
    // if (output.endsWith(principalPartEnding)) {
    //     output = output.substr(0, output.length - principalPartEnding.length);
    // }

    // //// Handle 4th conjugation nouns in -us/-ūs correctly.
    // else if (principalPartEnding === "ūs" && output.endsWith("us")) {
    //     return output.substr(0, output.length - 2);
    // }
    return output;
}

//// "amor/amōris" => "amor"
//// "cōnsul" => "cōnsul"
//// "avis" => "avis"
const getLemmaFromPrincipalParts = (principalParts) => {
    let output = principalParts;
    //// If `principalParts` contains a slash, the lemma is anything up to it.
    output = getSubstringBeforeSlash(output);
    //// Otherwise, the lemma is the entirity of `principalParts`.
    return output;
}

//// Eg ("amō amāre, amāvī ,amātum") => ["amō","amāre","amāvī","amātum"]
const getPrincipalPartsFromOneVerbString = (partsAsString) => {
    return partsAsString
        .split(/[ ,\/]+/)
        .filter(string => { return string !== ""; });
}

//// Returns an array of arrays, eg [["amō","amāre","amāvī","amātum"],["loquor","loquī","locūtum"]]
const getPrincipalPartsFromInput = () => {
    if (!textareaInput.value) {
        return [];
    }

    const principalPartsArray = textareaInput.value
        .split(/[\t;\.]+/)
        .filter(string => { return string !== ""; })
        .map(getPrincipalPartsFromOneVerbString);
    return principalPartsArray;
}

const refreshDataList = () => {
    conjugationsDataList.innerHTML = "";
    getDescriptionsFromSchemata().map(description => {
        const newOption = document.createElement("option");
        newOption.value = description;
        conjugationsDataList.append(newOption);
    });
}

const clearInputs = () => {
    textareaInput.value = "";
    textBeforeTable.textContent = "";
    tbody.innerHTML = "";
    textareaOutput.value = "";
    clearTextMessages();
}

const generateSelectConjugationsTable = () => {
    const principalPartsArray = getPrincipalPartsFromInput();

    let innerHtml = "";
    principalPartsArray.map(principalPartsArray => {
        const conjugationDescription = getSchemaDescriptionForPrincipalParts(principalPartsArray);
        const principalPartsPretty = principalPartsArray.join(", ");

        innerHtml = `${innerHtml}
        <tr>
        <td lang="la">
        ${principalPartsPretty}
        </td>
        <td>
        <input list="conjugation-descriptions" value="${conjugationDescription}"/>
        </td>
        </tr>`;
    });

    tbody.innerHTML = innerHtml;
    announceConjugationsTable();
}

//// Removes duplicates from an array of objects, assuming each object has a Form and a Lemma string field.
const removeDuplicateFormLemmaObjects = (arrayOfFormObjects) => {
    let output = [];

    arrayOfFormObjects.forEach(inputObject => {
        //// If any object in the input does not already exist in `output`, we add it.
        const matchInOutput = output.find(outputObject => {
            return (
                outputObject.Form === inputObject.Form
                && outputObject.Lemma === inputObject.Lemma
            );
        })
        if (!matchInOutput) {
            output.push(inputObject);
        }
    })

    return output;
}

//// If given an array of objects with Form and Lemma string fields, this returns the array with all the lemmata for each distinct Form combined into a Lemmata array for each object.
//// Eg, [{Form: "a", Lemma: "b"}, {Form: "a", Lemma: "c"}] => [{Form: "a", Lemmata ["b", "c"]}]
const generateFormObjectsWithLemmataArrays = (arrayOfFormObjects) => {
    let output = [];

    arrayOfFormObjects.forEach(inputObject => {
        //// Look for a match for `inputObject` in `output`.
        let matchAlreadyInOutput = output.find(outputObject => {
            return outputObject.Form === inputObject.Form; 
        })
        //// If there’s a match, add the new lemma to the match’s array of lemmata.
        if (matchAlreadyInOutput) {
            matchAlreadyInOutput.Lemmata.push(inputObject.Lemma);
        }
        //// If there’s no match, add a new object to `output` for the new form.
        else {
            output.push({
                Form: inputObject.Form,
                Lemmata: [ inputObject.Lemma ],
            })
        }
    })

    return output;
}

//// Does not perform any duplicate checks.
//// Eg, [{Form: "a", Lemma: "b"}, {Form: "a", Lemma: "c"}] => [{Form: "a", Lemmata ["b"]}, {Form: "a", Lemmata: ["c"]}]
const convertFormLemmaObjectsToFormLemmataObjects = (arrayOfFormObjects) => {
    let output = [];
    arrayOfFormObjects.forEach(inputObject => {
        output.push({
            Form: inputObject.Form,
            Lemmata: [ inputObject.Lemma ]
        });
    })
    return output;
}

//// Input should be an array of objects like {Form: "a", Lemmata: ["b", "c"]}
const displayConjugatedOutput = (arrayOfFormObjects) => {
    const getDisplayString = tickboxOutputLemma.checked
                            ? object => `${object.Form}\t${object.Lemmata.join(" ")}`
                            : object => `${object.Form}`;
    
    textareaOutput.value = arrayOfFormObjects
        .map(getDisplayString)
        .join("\n");
}

const conjugate = () => {
    const countLemmata = tbody.children.length;
    const includeStressedEndings = tickboxIncludeStressedEndings.checked;
    let conjugatedForms = [];
    const pushToConjugatedForms = (form, lemma) => {
        conjugatedForms.push({Form: form, Lemma: lemma});
    }

    for (let i = 0; i < countLemmata; i++) {
        const principalParts = tbody.children[i].children[0].textContent.trim();
        const conjugationDescription = tbody.children[i].children[1].children[0].value;
        const schema = getSchemaFromDescription(conjugationDescription);
        const stem = getStemFromPrincipalParts(principalParts, schema["Principal part ending"]);
        const lemma = getLemmaFromPrincipalParts(principalParts);

        schema["Unstressed endings"].map(ending => {
            //// If `ending` is the empty string, we are looking at the lemma of the 3rd conjugation.
            //// If the lemma is the same as the genitive singular (eg “avis”) we don’t push it as a form, to avoid duplicates.
            //// If the lemma is different to the genitive singular (eg “rēx/rēgis” or “genus/generis”), we push the lemma.
            if (ending === "") {
                if (lemma !== `${stem}is`) {
                    pushToConjugatedForms(lemma, lemma);
                }
            }
            else {
                const form = `${stem}${ending}`;
                pushToConjugatedForms(form, lemma);
            }
        })

        if (includeStressedEndings) {
            schema["Stressed endings"].map(ending => {
                const form = `${stem}${ending}`;
                pushToConjugatedForms(form, lemma);
            })
        }
    }

    //console.log("conjugatedForms", conjugatedForms);
    const noDuplicates = removeDuplicateFormLemmaObjects(conjugatedForms);

    const objectsWithLemmataArrays = tickboxCombineLemmata.checked
                                    ? generateFormObjectsWithLemmataArrays(noDuplicates)
                                    : convertFormLemmaObjectsToFormLemmataObjects(noDuplicates);
    displayConjugatedOutput(objectsWithLemmataArrays);
}

const clearTextMessages = () => {
    textBySelectConjugations.textContent = "";
    textByCopyToClipboard.textContent = "";
}

const announceConjugationsTable = () => {
    clearTextMessages();
    textBeforeTable.textContent = "The table below describes how this page will conjugate your words. You can edit the right-hand column before clicking “Conjugate”.";
}

const warnOfEmptyInput = () => {
    clearTextMessages();
    textBySelectConjugations.textContent = "Nothing to conjugate!";
}

const warnOfEmptyOutput = () => {
    clearTextMessages();
    textByCopyToClipboard.textContent = "Nothing to copy or download!";
}

const copyToClipboard = () => {
    clearTextMessages();
    textByCopyToClipboard.textContent = "Copying to clipboard...";
    textareaOutput.select();
    document.execCommand("copy");
    textByCopyToClipboard.textContent = "Copied!";
}




refreshDataList();

buttonClearInputs.addEventListener("click", ()=>{
    clearInputs();
});

buttonLoadSampleData.addEventListener("click", ()=>{
    textareaInput.value = sampleData;
    clearTextMessages();
});

buttonGenerateSelectConjugationsTable.addEventListener("click", () => {
    if (textareaInput.value === "") {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        generateSelectConjugationsTable();
    }
});

buttonConjugate.addEventListener("click", () => {
    if (textareaInput.value === "" || tbody.children.length === 0) {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        conjugate()
    };
});

buttonCopyToClipboard.addEventListener("click", () => {
    if (textareaOutput.value === "") {
        warnOfEmptyOutput();
    }
    else {
        clearTextMessages();
        copyToClipboard();
    }
});
