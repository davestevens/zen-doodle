# Zen Doodle

Based on a gif i saw on [Reddit](https://www.reddit.com/r/interestingasfuck/comments/4bm5yz/zen_doodle/).

## Shape

`Shape` takes a list of points (at least 3). From these points the inner structure is built using the `size` and `percentage` options. `percentage` is used for calculating the position of the next point.

Reversing the order of the points results in the pattern being draw clocksize or anti-clockwise.

See `assets/scripts/examples.json` for example shapes.

## Development

Tasks have been created in the `package.json` file, run `npm install` to install all required packages.

### Running a local server

```shell
npm run start
```
Starts a local server which runs out of the `public` directory

### Compilation
```shell
npm run build
```
Compiles all files into `public` directory.

```shell
npm run watch
```
Compiles all files into `public` directory and watches for any changes.
