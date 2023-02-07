# MERN-BLOG-簡易部落格製作

[網站範例連結](https://mern-blog-eosin.vercel.app/ "link")


* 使用useContext來實現Auth狀態管理的功能
* react-quill實現文字編譯器的功能

```bash
  * 由於使用此套件，生成的是HTML的格式，因此我們需要將文字編輯器產生的格式轉成Obj，然後再轉為純text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
```
