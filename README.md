# Admin Architect mix

A set of predefined webpack tasks for Admin Architect assets compilation.

### Installation

`npm i https://github.com/endihunter/mix.git --save-dev`
or
`yarn add https://github.com/endihunter/mix.git -D`

### Usage

add to your main `webpack.mix.js` file.

```
(new admin)
// requires corresponding node modules (see mix.js comments)
//.enableEditors([
//  'Medium',
//  'TinyMce',
//  'Ck',
//  'Markdown'
//])
.handle();
``` 


run `npm run dev` to compile assets to a `public/admin` directory.

### Enjoy!
