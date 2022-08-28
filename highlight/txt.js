function txttokenaize(c) {
    let p = 0;
    let token = []
    while (p<c.length) {
        if (c[p]==" ") {
            let scomment = p
            while (c[p]==" ") {
                p++;
            }
            token.push(["BLANK",c.slice(scomment,p)])
            continue;
        }
        else if (c[p]=="\n") {
            p+=1;
            token.push(["CR","\n"])
            continue;
        }

        token.push(["TXT",c[p]]);
        p++;
    }
    token.push(["EOF",""])
    return token;
}
function txthighlight(code,lang="") {
    codearea = document.createElement("div")
    codearea.className = "highlightbody"
    outelm = document.createElement("div")
    outelm.className = "codearea"
    tokens = txttokenaize(code)
    outelm.innerHTML = "";
    for (let t=0;t<tokens.length;t++) {
        thistoken = document.createElement("pre")
        thistoken.innerHTML += tokens[t][1]
        thistoken.className = "txt " + tokens[t][0]
        outelm.append(thistoken)
    }
    langtag = document.createElement("p")
    langtag.className = "txt langtag"
    if (lang.length>0) {
        langtag.innerHTML = `txt - ${lang}`
    }
    else {
        langtag.innerHTML = `txt`
    }
    codearea.appendChild(langtag)
    codearea.appendChild(outelm)
    return codearea
}