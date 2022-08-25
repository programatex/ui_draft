class MAKE {
    async get() {
        const article = location.hash.substring(1);
        console.log(article);

        const articleRes = await fetch(`./article/${article}.md`, {
            method: "GET",
            headers: {
                "Catch-Control": "max-age=3600"
            }
        });

        if (articleRes.status !== 200 && articleRes.status !== 300) {
            const errormsg = await articleRes.text();
            console.error(errormsg);
            const data = `# ${articleRes.status.toString()} Article not found\nSorry, "${article}" page was not found`;
            return [data, "not found,Not Found,0"];
        }

        const data = await articleRes.text();

        let info = "";
        const articleListRes = await fetch("./articles.txt", {
            method: "GET",
            headers: {
                "Catch-Control": "max-age=7200"
            }
        });
        const artcs = (await articleListRes.text()).replace(/\r/g, "").split("\n");
        for (let i = 0; i < artcs.length; i++) {
            if (artcs[i].startsWith(article) && artcs[i].length > 0) {
                info = artcs[i];
            }
        }
        console.log(info, article);

        return [data, info];
    }
    async makehtml() {
        let get = await this.get();

        let data = get[0];
        let info = get[1];

        let d = data.replace(/\r/g, "").split("\n");
        let title = "";
        let elm = document.createElement("div");
        let index = [];
        let id = 0;
        elm.addEventListener("click", closePanel);
        elm.id = "page"
        let p = 0;
        while (p < d.length) { // main
            let part = document.createElement("div");
            if (d[p].startsWith("# ")) {
                part = document.createElement("h1");
                part.innerHTML = this.escapeHTML(d[p].slice(2));
                part.className = "page";
                part.id = "i" + id.toString();
                index.push([1, part.innerHTML, id]);
                id++;

                if (title == "") {
                    title = this.escapeHTML(d[p].slice(2));
                    part.className = "page pagetitle";
                    if (info.split(",")[2] != "0") {
                        let pelm = document.createElement("p");
                        pelm.innerHTML = "書きかけの記事です"
                        if (info.split(",")[2] == "2") {
                            pelm.innerHTML = "変更予定のある記事です"
                        }
                        pelm.className = "page";
                        pelm.className = "page writtingpage";
                        let cmsg = document.createElement("div");
                        cmsg.className = "page writtingpage";
                        cmsg.appendChild(pelm);
                        elm.appendChild(cmsg);
                    }
                }
                elm.appendChild(part);
            }
            else if (d[p].startsWith("## ")) {
                part = document.createElement("h2");
                part.innerHTML = this.escapeHTML(d[p].slice(3));
                part.className = "page";
                part.id = "i" + id.toString();
                index.push([2, part.innerHTML, id]);
                id++;
                elm.appendChild(part);
            }
            else {
                let pelm = document.createElement("p");
                pelm.className = "page";
                while (true) {
                    if (p >= d.length || d[p].startsWith("## ") || d[p].startsWith("# ")) {
                        if (pelm.innerHTML.length > 0) {
                            part.appendChild(pelm);
                        }
                        p--;
                        break;
                    }
                    if (d[p].startsWith("```")) {
                        let preelm = document.createElement("pre");
                        preelm.className = "page";
                        let langname = ""
                        if (d[p].length > 3) {
                            langname = d[p].substring(3).split(" ")[0]
                            let pelm = document.createElement("p");
                            pelm.className = "page lang";
                            pelm.innerHTML = langname
                            preelm.appendChild(pelm);
                        }
                        let codeelm = document.createElement("code");
                        codeelm.className = "page";
                        p++;
                        while (true) {
                            if (p >= d.length || d[p].startsWith("```")) {
                                break;
                            }
                            codeelm.innerHTML += this.escapeHTML(d[p]) + "\n";
                            p++;
                        }
                        if (pelm.innerHTML.length > 0) {
                            part.appendChild(pelm);
                        }

                        if (langname=="js") {
                            part.appendChild(jshighlight(codeelm.innerText));
                        }
                        else if (langname=="math") {
                            let mth = document.createElement("math");
                            mth.className = "mathml"
                            mth.innerHTML = codeelm.innerText;
                            part.appendChild(mth);
                        }
                        else {
                            preelm.appendChild(codeelm);
                            part.appendChild(preelm);
                        }

                        pelm = document.createElement("p");
                        pelm.className = "page";
                    }
                    else {
                        pelm.innerHTML += this.escapeHTML(d[p]).replace(/\ \ /g, "<br>");
                    }
                    p++;
                }
                if (part.children.length > 0) {
                    part.className = "page";
                    elm.appendChild(part);
                }
            }
            p++;
        }
        console.log(index);
        let ielm = document.createElement("ul");
        ielm.className = "panellist";
        ielm.id = "index";
        for (let i = 0; i < index.length; i++) {
            let lielm = document.createElement("li");
            let buttonelm = document.createElement("button");
            lielm.className = "panellist";
            buttonelm.className = "panellist";
            buttonelm.addEventListener("click", function () { jump("i" + index[i][2]) });

            buttonelm.innerHTML = index[i][1];

            lielm.appendChild(buttonelm);
            ielm.appendChild(lielm);
        }
        if (title != "") {
            title = title + " - ";
        }

        return { "main": elm, "index": ielm, "title": title , "data": data};
    }
    escapeHTML(str) { // https://qiita.com/hrdaya/items/4beebbdb57009b405d2d
        return str
            .replace(/&esc;/g, '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
}
