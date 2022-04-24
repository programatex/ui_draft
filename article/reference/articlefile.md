# 記事のファイル形式について

仕様は変更される可能性が高いです

## タイトル

記事内の一番最初の大見出しが記事のタイトルになります  

```md
# タイトル
```
```html
<h1>タイトル</h1>
```

## 大見出し

大見出しは目次に表示されます  
記事内の一番最初の大見出しが記事のタイトルになります  

```md
# 大見出し
```
```html
<h1>大見出し</h1>
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