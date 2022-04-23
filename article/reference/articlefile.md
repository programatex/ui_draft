# 記事のファイル形式について

## タイトル

記事内の一番最初のタイトルが記事のタイトルになります  
1つの記事に1回しか使わないことを推奨  
タイトルは目次に表示されます  

```md
# タイトル
```
```html
<h1>タイトル</h1>
```

## 見出し

見出しは目次に表示されます  

```md
## 見出し
```
```html
<h2>見出し</h2>
```

## コードブロック

コードを表示できます  

```md
&esc;```
function code() {
    return "code";
}
&esc;```
```
```html
<pre><code>function code() {
    return "code";
}</code></pre>
```
```md
&esc;```js
function code() {
    return "code";
}
&esc;```
```
```html
<pre><p>js</p><code>function code() {
    return "code";
}</code></pre>
```