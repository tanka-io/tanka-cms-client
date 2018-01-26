import { strictEqual } from "assert";

export function getValue(b, lang, datas, options) {
    if (b.type === "text" || b.type === "title" || b.type === "image") {
        return getStringValue(b, lang, datas);
    } else if (b[lang]) {
        return getDataFromString(b[lang].value, datas);
    }
    return b;
}
function getStringValue(b, lang, datas, options) {
    let string = b[lang].value;
    if (string && string !== "") {
        while (string.indexOf("{{") !== -1) {
            let i = string.indexOf("{{");
            let e = string.indexOf("}}");
            let auxString = string.substring(i + 2, e);
            let data = getDataFromString(auxString, datas);
            if (data.length && typeof data === 'object') {
                let s = "<div class='columns is-multiline'>";
                data.forEach(e => {
                    if (e[lang]) {
                        s += "<li>" + e[lang] + "</li>"
                    } else {
                        let page = "Budget";
                        if (lang === 'ar') {
                            page = 'الميزانية والمشاريع العمومية ';
                        }
                        s += genCard(e.Ministere.title[lang], "", "details", e._schema._id, page);
                    }
                });
                s += "</div>"
                data = s
            } else if(typeof data === 'string'){
                // Do nothing basicly
            } else {
                data = data[lang];
            }
            string = string.slice(0, i) + data + string.slice(e + 2);
        }
    }
    return string;
}
function getDataFromString(string, datas, options) {
    if (string && string !== "") {
        string = cleanVar(string);
        let keys = string.split(".");
        let data = new Object();
        Object.assign(data, datas);
        let error = false;
        keys.forEach(function (key) {
            if (data[key]) {
                data = data[key];
            } else {
                error = true;
                string =
                    "the key '" +
                    new String(key) +
                    "' doesn't exist, please verify that your data contains it \n ";
                if (options && options.alert) {
                    alert(string)
                }
            }
        }, this);
        if (!error) {
            return data;
        } else {
            return {};
        }
    } else {
        return {};
    }
}
function cleanVar(string) {
    let i = string.indexOf("{{");
    let e = string.indexOf("}}");
    if (i !== -1 && e !== -1) {
        return string.substring(i + 2, e);
    }
    return string;
}

function resolveObject(obj) {

}

function genCard(title, description, button, id, page) {
    return `
<div class="column is-4">
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
    ${title}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
    ${description}
    </div>
  </div>
  <footer class="card-footer">
    <a href="${genLink(page, id, title)}" class="card-footer-item">${button}</a>
  </footer>
</div>
</div>
`
}

function genLink(page, id, label) {
    let url = window.location.protocol + "//" + window.location.host;

    return url + "/" + page + "/" + "?_id=" + id + "&label=" + label
}