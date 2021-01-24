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
        "Principal part endings": ["ō","āre","āvī","ātum"],
    },
    {
        "Description":           "2nd, non-deponent",
        "Unstressed endings":    {
            "Present stem":      ["eō","ēs","et","ent","eor","eam","eās","eat","eant","ear","ē","ēns"],
            "Perfect stem":      ["ī","it","imus","eram","erās","erat","erant","erō","eris","erit","erint","erim","erīs"],
            "Supine stem":       ["um","ū","us","a","ī","ae","ō","īs","am","ōs","ās","ā","e"],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["eō","ēre","ī","um"],
    },
    {
        "Description":           "3rd, non-deponent",
        "Unstressed endings":    {
            "Present stem":      ["ō","is","it","imus","itis","unt","am","ēs","et","ent","or","eris","ere","itur","imur","ar","ās","at","ant","erem","erēs","eret","erent","erer","e","ite","itō","itor","ī","ēns"],
            "Perfect stem":      ["ī","it","imus","eram","erās","erat","erant","erō","eris","erit","erint","erim","erīs"],
            "Supine stem":       ["um","ū","us","a","ī","ae","ō","īs","am","ōs","ās","ā","e"],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["ō","ere","ī","um"],
    },
    {
        "Description":           "4th, non-deponent",
        "Unstressed endings":    {
            "Present stem":      ["iō","īs","it","iunt","iam","iēs","iet","ient","ior","iar","iās","iat","iant","ī","iēns"],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["iō","īre","īvī","ītum"],
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
        "Principal part endings": ["or","ārī","ātum"],
    },
    {
        "Description":           "2nd, deponent",
        "Unstressed endings":    {
            "Present stem":      ["eor","ear","ēns"],
            "Perfect stem":      [],
            "Supine stem":       ["um","ū","us","a","ī","ae","ō","īs","am","ōs","ās","ā","e"],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["eor","ērī","um"],
    },
    {
        "Description":           "4th, deponent",
        "Unstressed endings":    {
            "Present stem":      ["ior","iar","iēns"],
            "Perfect stem":      [],
            "Supine stem":       ["um","ū","us","a","ī","ae","ō","īs","am","ōs","ās","ā","e"],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["iōr","īrī","um"],
    },
    {
        "Description":           "3rd, deponent",
        "Unstressed endings":    {
            "Present stem":      ["or","eris","ere","itur","imur","ar","erer","itor","ī","ēns"],
            "Perfect stem":      [],
            "Supine stem":       ["um","ū","us","a","ī","ae","ō","īs","am","ōs","ās","ā","e"],
        },
        "Stressed endings":      {
            "Present stem":      [],
            "Perfect stem":      [],
            "Supine stem":       [],
        },
        "Principal part endings": ["or","ī","um"],
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
        "Principal part endings": [],
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
        "Principal part endings": [],
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForPrincipalParts = (principalParts) => {
    const find = schemata.find(schema => {
        return principalParts[1].endsWith(schema["Principal part endings"][1]);
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

const getStemsFromPrincipalParts = (principalParts, principalPartEndings) => {
    let output = [];
    for (let i = 0; i < principalParts.length; i++) {
        output.push(principalParts[i].substr(0, principalParts[i].length - principalPartEndings[i].length))
    }
    return output;
}

//// Assumes the first principal part is the lemma.
const getLemmaFromPrincipalParts = (principalParts) => {
    return principalParts[0];
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

//// By “system” I mean one of three descriptions of stems that endings may be added onto.
//// Deponent verbs have two and non-deponent verbs have three.
//// These are also the keys of the "Unstressed endings" and "Stressed endings" objects in `schemata`.
const getSystems = (principalParts) => {
    if (principalParts.length === 3) {
        return ["Present stem","Supine stem"];
    }
    else {
        return ["Present stem","Perfect stem","Supine stem"];
    }
}

const getStemFromStems = (stems, system) => {
    //// Deponent verbs have three principal parts.
    if (stems.length === 3) {
        if (system === "Present stem") {
            return stems[0];
        }
        if (system === "Supine stem") {
            return stems[2];
        }
    }
    //// Non-deponent verbs have four principal parts.
    else {
        if (system === "Present stem") {
            return stems[0];
        }
        if (system === "Perfect stem") {
            return stems[2];
        }
        if (system === "Supine stem") {
            return stems[3];
        }
    }
}

const conjugate = () => {
    const countLemmata = tbody.children.length;
    const includeStressedEndings = tickboxIncludeStressedEndings.checked;
    let conjugatedForms = [];
    const pushToConjugatedForms = (form, lemma) => {
        conjugatedForms.push({Form: form, Lemma: lemma});
    }

    for (let i = 0; i < countLemmata; i++) {
        const principalParts = tbody.children[i].children[0].textContent.trim().split(", ");
        console.log("principalParts", principalParts);
        const conjugationDescription = tbody.children[i].children[1].children[0].value;
        console.log("conjugationDescription", conjugationDescription);
        const schema = getSchemaFromDescription(conjugationDescription);
        console.log("schema", schema);
        const stems = getStemsFromPrincipalParts(principalParts, schema["Principal part endings"]);
        console.log("stems", stems);
        const lemma = getLemmaFromPrincipalParts(principalParts);
        console.log("lemma", lemma);

        const systems = getSystems(stems);
        systems
            .forEach(system => {
                    schema["Unstressed endings"][system].forEach(ending => {
                        const form = `${getStemFromStems(stems, system)}${ending}`;
                        pushToConjugatedForms(form, lemma);
                    });
                });

        if (includeStressedEndings) {
            systems
            .forEach(system => {
                    schema["Stressed endings"][system].forEach(ending => {
                        const form = `${getStemFromStems(stems, system)}${ending}`;
                        pushToConjugatedForms(form, lemma);
                    });
                });
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
