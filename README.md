# use-vest issue repo

Clone this repo, run `npm install` and `npm run dev` and you will
see that it fails on http://localhost:3000

But if you change the import in `src/lib/components/Form.svelte` to
`./use-vest` (instead of `use-vest`) it will work, although the imported
files are identical.