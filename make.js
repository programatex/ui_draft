class MAKE {
    async get() {
        const article = location.hash.substring(1);

        const articleRes = await fetch(`/article/${article}.md`, {
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
        const articleListRes = await fetch("/article/articles.txt", {
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

        return { "info": info, "data": data};
    }
    async getdatas() {
        let get = await this.get();

        let data = get.data;
        let info = get.info;

        let d = data.replace(/\r/g, "").split("\n");
        let title = "";
        let index = [];
        let id = 0;
        let p = 0;
        while (p < d.length) { // main
            if (d[p].startsWith("# ")) {
                index.push([1, d[p].slice(2), id]);
                id++;

                if (title == "") {
                    title = d[p].slice(2);
                }
            }
            else if (d[p].startsWith("## ")) {
                index.push([2, d[p].slice(3), id]);
                id++;
            }
            p++;
        }
        let ielm = document.createElement("ul");
        ielm.className = "panellist";
        ielm.id = "index";
        for (let i = 0; i < index.length; i++) {
            let lielm = document.createElement("li");
            let buttonelm = document.createElement("button");
            lielm.className = "panellist";
            buttonelm.className = "panellist";
            buttonelm.addEventListener("click", function () { jump(index[i][1]) });
            buttonelm.innerHTML = index[i][1];
            lielm.appendChild(buttonelm);
            ielm.appendChild(lielm);
        }
        if (title != "") {
            title = title + " - ";
        }

        return {"index": ielm, "title": title , "data": data, "info": info};
    }
    async makehtml() {
        let get = await this.get();

        let data = get.data;
        let info = get.info;

        let d = data.replace(/\r/g, "").split("\n");
        let title = "";
        let elm = document.createElement("div");
        let index = [];
        let id = 0;
        elm.id = "page";
        let p = 0;
        while (p < d.length) { // main
            let part = document.createElement("div");
            if (d[p].startsWith("# ")) {
                part = document.createElement("h1");
                part.innerText = d[p].slice(2);
                part.className = "page";
                part.id = "i" + id.toString();
                index.push([1, part.innerHTML, id]);
                id++;

                if (title == "") {
                    title = this.escapeHTML(d[p].slice(2));
                    part.className = "page pagetitle";
                    if (info.split(",")[2] != "0") {
                        let pelm = document.createElement("p");
                        pelm.innerText = "書きかけの記事です";
                        if (info.split(",")[2] == "2") {
                            pelm.innerText = "変更予定のある記事です";
                        }
                        pelm.className = "page";
                        pelm.className = "page writingpage";
                        let cmsg = document.createElement("div");
                        cmsg.className = "page writingpage";
                        cmsg.appendChild(pelm);
                        elm.appendChild(cmsg);
                    }
                }
                elm.appendChild(part);
            }
            else if (d[p].startsWith("## ")) {
                part = document.createElement("h2");
                part.innerText = d[p].slice(3);
                part.className = "page";
                part.id = "i" + id.toString();
                index.push([2, part.innerText, id]);
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
                            pelm.innerText = langname;
                            preelm.appendChild(pelm);
                        }
                        let codeelm = document.createElement("code");
                        codeelm.className = "page";
                        p++;
                        while (true) {
                            if (p >= d.length || d[p].startsWith("```")) {
                                break;
                            }
                            codeelm.innerText += d[p] + "\n";
                            p++;
                        }
                        if (pelm.innerText.length > 0) {
                            part.appendChild(pelm);
                        }

                        if (langname=="js") {
                            part.appendChild(jshighlight(codeelm.innerText));
                        }
                        else if (langname=="math") {
                            let mth = document.createElement("math");
                            mth.className = "mathml"
                            mth.innerText = codeelm.innerText;
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
                        pelm.innerText += d[p].replace(/\ \ /g, "<br>");
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
}
