export default ({ css, js, body, data }: { css:string, js:string, body:string, data: {} }) => {
	return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/${css}">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>CI Server React SSR</title>
      </head>
      <body>
          <div id="root">${body}</div>
      </body>
      <script id="data" type="application/json">${data}</script>
      <script src="/${js}" /></script>
    </html>
  `;
};
