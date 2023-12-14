# threeStarterTemplate

Provides a starter template that incorporates three.js, parcel, typescript and scss.

- `npm install` Installs node_modules included in package.json.
- `npm run build` produces a clean parcel build in the `dist` folder.
- `npm run start` produces a build and launches a local server.
- Pressing `d` in browser toggles debugMode controls on and off.
- Pressing `spacebar` in browser toggles pausing / playing animation loop.

# Special Notes

I recommend reading through these notes as it'll help clarify why the template looks as it does.

- I've made a special effort to ensure typescript and scss are working cleanly with no build warnings/errors. The crafted `parcel.d.ts` file aids in this effort.
- I've also taken the liberty to show how scss can be managed via a global `variables.scss` file that feeds into both the `style.scss` (for html reference) and `style.module.scss` (for typescript reference) files. This makes it very convenient to share css-level values between your html and javascript.
- The above commands intentionally have a `--no-cache` flag appended as my experience has been that parcel is overly aggressive and _misses_ file changes periodically.
- This template provides a multi-page setup for use-cases such as portfolio sites and static websites. If you're building a single page app, simply delete the unnecessary additional page.
