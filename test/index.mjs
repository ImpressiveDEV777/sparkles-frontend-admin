import { convert } from 'html-to-text'

const html =
  `<thead>
  <tr>
  <th>Old option</th>
  <th>Depr.</th>
  <th>Rem.</th>
  <th>Instead use</th>
  </tr>
  </thead>`
const text = convert(html)
console.log(text) // Page [https://example.com/page.html]
