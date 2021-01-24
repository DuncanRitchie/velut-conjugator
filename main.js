const buttonClearInputs = document.getElementById("clear-inputs");
const buttonLoadSampleData = document.getElementById("load-sample-data");
const textareaInput = document.getElementById("textarea-input");
const buttonGenerateSelectDeclensionsTable = document.getElementById("generate-select-declensions-table");
const textBeforeTable = document.getElementById("text-before-table");
const tbody = document.getElementById("tbody");
const declensionsDataList = document.getElementById("declension-descriptions");
const textBySelectDeclensions = document.getElementById("text-by-select-declensions");
const tickboxIncludeStressedEndings = document.getElementById("include-stressed-endings");
const tickboxCombineLemmata = document.getElementById("combine-lemmata");
const tickboxOutputLemma = document.getElementById("output-lemma");
const buttonDecline = document.getElementById("decline");
const textareaOutput = document.getElementById("textarea-output");
const textByCopyToClipboard = document.getElementById("text-by-copy-to-clipboard");
const buttonCopyToClipboard = document.getElementById("copy-to-clipboard");

const sampleData = "terra Ariadnē corvus cerebrum fīlius officium puer(n) avis cōnsul amor/amōris genus/generis animal/animālis manus/manūs cornū diēs probus(adj) signifer[n] signifer[adj] tenāx/tenācis(adj) probē(adv) tenāciter cōnstanter libenter";

//// "Parts of speech" may optionally appear in lemmata on velut in square brackets (eg ‘amīcus[n]’ is a noun & ‘amīcus[adj]’ is an adjective); "adv" means adverb and "prn" means proper noun (which has the same declensions as noun).
//// "Principal part ending" is the ending that will trigger the schema being automatically assigned for a lemma.
const schemata = [
    {
        "Description":           "1st, noun, Latin-style",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["a","ae","am","ā","ās","īs"],
        "Stressed endings":      ["ārum"],
        "Principal part ending": "a",
    },
    {
        "Description":           "1st, noun, Greek-style",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["ē","ēs","ēn","ae","ās","īs"],
        "Stressed endings":      ["ārum"],
        "Principal part ending": "ē",
    },
    {
        "Description":           "2nd, noun, masculine/feminine, -ius",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["ius","iī","ī","iō","ium","iōs","iīs"],
        "Stressed endings":      ["iōrum"],
        "Principal part ending": "ius",
    },
    {
        "Description":           "2nd, noun, masculine/feminine, -us",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["us","ī","e","ō","um","ōs","īs"],
        "Stressed endings":      ["ōrum"],
        "Principal part ending": "us",
    },
    {
        "Description":           "2nd, noun, neuter, -ium",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["ium","iī","ī","iō","ium","ia","iīs"],
        "Stressed endings":      ["iōrum"],
        "Principal part ending": "ium",
    },
    {
        "Description":           "2nd, noun, neuter, -um",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["um","ī","ō","um","a","īs"],
        "Stressed endings":      ["ōrum"],
        "Principal part ending": "um",
    },
    {
        "Description":           "3rd, noun, masculine/feminine, consonant stem",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["","is","em","ī","e","ēs","um","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, masculine/feminine, -i stem",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["","is","em","ī","ēs","ium","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, neuter, consonant stem",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["","is","ī","a","um","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, noun, neuter, -i stem",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["","is","ī","ia","ium","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "is",
    },
    {
        "Description":           "4th, noun, -us nominative",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["us","ūs","um","uī","ū","uum","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "ūs",
    },
    {
        "Description":           "4th, noun, -ū nominative",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["ū","ūs","ua","uum","ibus"],
        "Stressed endings":      [],
        "Principal part ending": "ū",
    },
    {
        "Description":           "5th, noun",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["ēs","em","ē"],
        "Stressed endings":      ["ēī","ērum","ēbus"],
        "Principal part ending": "ēs",
    },
    {
        "Description":           "Adverb, -ē",
        "Parts of speech":       ["adv"],
        "Unstressed endings":    ["ē","ius"],
        "Stressed endings":      ["issimē"],
        "Principal part ending": "ē",
    },
    {
        "Description":           "Adverb, -iter",
        "Parts of speech":       ["adv"],
        "Unstressed endings":    ["iter","ius"],
        "Stressed endings":      ["issimē"],
        "Principal part ending": "iter",
    },
    {
        "Description":           "Adverb, -nter",
        "Parts of speech":       ["adv"],
        "Unstressed endings":    ["nter","ntius"],
        "Stressed endings":      ["ntissimē"],
        "Principal part ending": "nter",
    },
    {
        "Description":           "1st/2nd, adjective, -us",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["us","ī","e","ō","um","ōs","a","ae","am","ā","ās","īs","ior","ius"],
        "Stressed endings":      ["ārum","ōrum","iōris","iōrem","iōrī","iōre","iōrēs","iōrum","iōribus","issimus","issimī","issime","issimō","issimum","issimōs","issima","issimae","issimam","issimā","issimās","issimīs","issimārum","issimōrum"],
        "Principal part ending": "us",
    },
    {
        "Description":           "1st/2nd, adjective, -er/erī",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["er","erī","ere","erō","erum","erōs","era","erae","eram","erā","erās","erīs"],
        "Stressed endings":      ["erārum","erōrum"],
        "Principal part ending": "er",
    },
    {
        "Description":           "1st/2nd, adjective, -er/rī",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["er","rī","re","rō","rum","rōs","ra","rae","ram","rā","rās","rīs"],
        "Stressed endings":      ["rārum","rōrum"],
        "Principal part ending": "er",
    },
    {
        "Description":           "3rd, adjective, -āns nominative singular",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["āns","antis","ante","antem","antī","antēs","antia","antium","antibus","antior","antius"],
        "Stressed endings":      ["antiōris","antiōrem","antiōrī","antiōre","antiōrēs","antiōrum","antiōribus","antissimus","antissimī","antissime","antissimō","antissimum","antissimōs","antissima","antissimae","antissimam","antissimā","antissimās","antissimīs","antissimārum","antissimōrum"],
        "Principal part ending": "antis",
    },
    {
        "Description":           "3rd, adjective, -ēns nominative singular",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["ēns","entis","ente","entem","entī","entēs","entia","entium","entibus","entior","entius"],
        "Stressed endings":      ["entiōris","entiōrem","entiōrī","entiōre","entiōrēs","entiōrum","entiōribus","entissimus","entissimī","entissime","entissimō","entissimum","entissimōs","entissima","entissimae","entissimam","entissimā","entissimās","entissimīs","entissimārum","entissimōrum"],
        "Principal part ending": "entis",
    },
    {
        "Description":           "3rd, adjective, one-form nominative singular",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["","is","em","ī","ēs","ia","ium","ibus","ior","ius"],
        "Stressed endings":      ["iōris","iōrem","iōrī","iōre","iōrēs","iōrum","iōribus","issimus","issimī","issime","issimō","issimum","issimōs","issima","issimae","issimam","issimā","issimās","issimīs","issimārum","issimōrum"],
        "Principal part ending": "is",
    },
    {
        "Description":           "3rd, adjective, two-form nominative singular",
        "Parts of speech":       ["adj"],
        "Unstressed endings":    ["","is","e","em","ī","ēs","ia","ium","ibus","ior","ius"],
        "Stressed endings":      ["iōris","iōrem","iōrī","iōre","iōrēs","iōrum","iōribus","issimus","issimī","issime","issimō","issimum","issimōs","issima","issimae","issimam","issimā","issimās","issimīs","issimārum","issimōrum"],
        "Principal part ending": "is",
    },
    {
        "Description":           "2nd, noun, -er/-erī",
        "Parts of speech":       ["n","prn"],
        "Unstressed endings":    ["er","erī","ere","erō","erum","erōs","erīs"],
        "Stressed endings":      ["erōrum"],
        "Principal part ending": "er",
    },
]

const getDescriptionsFromSchemata = () => {
    return schemata.map(schema => {
        return schema.Description;
    })
}

const getSchemaDescriptionForPrincipalParts = (principalParts) => {
    // console.log("principalParts", principalParts);
    const textInBrackets = getTextInBrackets(principalParts);
    // console.log("textInBrackets", textInBrackets);
    const withoutBrackets = getSubstringBeforeRoundBracket(getSubstringBeforeSquareBracket(principalParts));
    // console.log("withoutBrackets", withoutBrackets);

    const filteredSchemata = textInBrackets === ""
                           ? schemata
                           : schemata.filter(schema => {
                               return schema["Parts of speech"].includes(textInBrackets);
                            });
    // console.log("filteredSchemata", filteredSchemata);

    const find = filteredSchemata.find(schema => {
        return withoutBrackets.endsWith(schema["Principal part ending"]);
    })

    return find?.Description ?? "3rd, noun, masculine/feminine, consonant stem";
}

const getSchemaFromDescription = (declensionDescription) => {
    for (let i = 0; i < schemata.length; i++) {
        if (schemata[i].Description === declensionDescription) {
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

const getSubstringBeforeSquareBracket = (string) => {
    return getSubstringBeforeTerminator(string, "[");
}

const getSubstringBeforeRoundBracket = (string) => {
    return getSubstringBeforeTerminator(string, "(");
}

//// Removes any instance of `terminator` and any characters before it from `string`.
//// Eg, ("Duncan Ritchie is a software dev"," ") => "dev"
//// Eg, ("Duncan Ritchie"," ") => "Ritchie"
//// Eg, ("velut"," ") => "velut"
const getSubstringAfterTerminator = (string, terminator) => {
    return string.substr(string.indexOf(terminator) + 1);
}

//// Eg, "probē(adv)" => "adv"
//// Eg, "amīcus[adj]" => "adj"
//// Eg, "tenāciter" => ""
const getTextInBrackets = (inputString) => {
    //// Return the empty string if input doesn’t contain brackets.
    if (!inputString.includes("[")
     && !inputString.includes("(")) {
        return "";
    }
    //// Otherwise, we remove text before and after brackets.
    let output = inputString;

    if (output.includes("[")) {
        output = output.substr(output.indexOf("[") + 1);
        output = getSubstringBeforeTerminator(output, "]");
    }
    else if (output.includes("(")) {
        output = output.substr(output.indexOf("(") + 1);
        output = getSubstringBeforeTerminator(output, ")");
    }

    return output;
}

//// ("amor/amōris", "is") => "amōr"
//// ("cōnsul", "is") => "cōnsul"
//// ("avis", "is") => "av"
//// ("hiātus", "ūs") => "hiāt"
const getStemFromPrincipalParts = (principalParts, principalPartEnding) => {
    let output = principalParts;

    //// If `output` contains a slash, remove anything up to it.
    output = getSubstringAfterTerminator(output, "/");

    //// If either parameter contains an opening square or round bracket, remove it and anything after it.
    output = getSubstringBeforeSquareBracket(output);
    output = getSubstringBeforeRoundBracket(output);

    //// If `output` ends with the ending, remove the ending.
    if (output.endsWith(principalPartEnding)) {
        output = output.substr(0, output.length - principalPartEnding.length);
    }

    //// Handle 4th declension nouns in -us/-ūs correctly.
    else if (principalPartEnding === "ūs" && output.endsWith("us")) {
        return output.substr(0, output.length - 2);
    }
    return output;
}

//// "amor/amōris" => "amor"
//// "cōnsul" => "cōnsul"
//// "avis" => "avis"
//// "probus[adj]" => "probus"
//// "tenāx/tenācis[adj]" => "tenāx"
const getLemmaFromPrincipalParts = (principalParts) => {
    let output = principalParts;
    //// If `principalParts` contains a slash or opening round bracket, the lemma is anything up to it.
    output = getSubstringBeforeSlash(output);
    output = getSubstringBeforeRoundBracket(output);
    //// Otherwise, the lemma is the entirity of `principalParts`.
    return output;
}

const getPrincipalPartsFromInput = () => {
    if (!textareaInput.value) {
        return [];
    }

    const principalPartsArray = textareaInput.value
        .split(/[\s,;\.]+/)
        .filter(string => { return string !== ""; });
    return principalPartsArray;
}

const refreshDataList = () => {
    declensionsDataList.innerHTML = "";
    getDescriptionsFromSchemata().map(description => {
        const newOption = document.createElement("option");
        newOption.value = description;
        declensionsDataList.append(newOption);
    });
}

const clearInputs = () => {
    textareaInput.value = "";
    textBeforeTable.textContent = "";
    tbody.innerHTML = "";
    textareaOutput.value = "";
    clearTextMessages();
}

const generateSelectDeclensionsTable = () => {
    const principalPartsArray = getPrincipalPartsFromInput();

    let innerHtml = "";
    principalPartsArray.map(principalPart => {
        const declensionDescription = getSchemaDescriptionForPrincipalParts(principalPart);

        innerHtml = `${innerHtml}
        <tr>
        <td lang="la">
        ${principalPart}
        </td>
        <td>
        <input id="declension-input-${principalPart}" list="declension-descriptions" value="${declensionDescription}"/>
        </td>
        </tr>`;
    });

    tbody.innerHTML = innerHtml;
    announceDeclensionsTable();
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
const displayDeclinedOutput = (arrayOfFormObjects) => {
    const getDisplayString = tickboxOutputLemma.checked
                            ? object => `${object.Form}\t${object.Lemmata.join(" ")}`
                            : object => `${object.Form}`;
    
    textareaOutput.value = arrayOfFormObjects
        .map(getDisplayString)
        .join("\n");
}

const decline = () => {
    const countLemmata = tbody.children.length;
    const includeStressedEndings = tickboxIncludeStressedEndings.checked;
    let declinedForms = [];
    const pushToDeclinedForms = (form, lemma) => {
        declinedForms.push({Form: form, Lemma: lemma});
    }

    for (let i = 0; i < countLemmata; i++) {
        const principalParts = tbody.children[i].children[0].textContent.trim();
        const declensionDescription = tbody.children[i].children[1].children[0].value;
        const schema = getSchemaFromDescription(declensionDescription);
        const stem = getStemFromPrincipalParts(principalParts, schema["Principal part ending"]);
        const lemma = getLemmaFromPrincipalParts(principalParts);

        schema["Unstressed endings"].map(ending => {
            //// If `ending` is the empty string, we are looking at the lemma of the 3rd declension.
            //// If the lemma is the same as the genitive singular (eg “avis”) we don’t push it as a form, to avoid duplicates.
            //// If the lemma is different to the genitive singular (eg “rēx/rēgis” or “genus/generis”), we push the lemma.
            if (ending === "") {
                if (lemma !== `${stem}is`) {
                    pushToDeclinedForms(lemma, lemma);
                }
            }
            else {
                const form = `${stem}${ending}`;
                pushToDeclinedForms(form, lemma);
            }
        })

        if (includeStressedEndings) {
            schema["Stressed endings"].map(ending => {
                const form = `${stem}${ending}`;
                pushToDeclinedForms(form, lemma);
            })
        }
    }

    //console.log("declinedForms", declinedForms);
    const noDuplicates = removeDuplicateFormLemmaObjects(declinedForms);

    const objectsWithLemmataArrays = tickboxCombineLemmata.checked
                                    ? generateFormObjectsWithLemmataArrays(noDuplicates)
                                    : convertFormLemmaObjectsToFormLemmataObjects(noDuplicates);
    displayDeclinedOutput(objectsWithLemmataArrays);
}

const clearTextMessages = () => {
    textBySelectDeclensions.textContent = "";
    textByCopyToClipboard.textContent = "";
}

const announceDeclensionsTable = () => {
    clearTextMessages();
    textBeforeTable.textContent = "The table below describes how this page will decline your words. You can edit the right-hand column before clicking “Decline”.";
}

const warnOfEmptyInput = () => {
    clearTextMessages();
    textBySelectDeclensions.textContent = "Nothing to decline!";
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

buttonGenerateSelectDeclensionsTable.addEventListener("click", () => {
    if (textareaInput.value === "") {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        generateSelectDeclensionsTable();
    }
});

buttonDecline.addEventListener("click", () => {
    if (textareaInput.value === "" || tbody.children.length === 0) {
        warnOfEmptyInput();
    }
    else {
        clearTextMessages();
        decline()
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
