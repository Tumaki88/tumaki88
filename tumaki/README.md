# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5002](http://localhost:5002) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Troubleshooting: Port 5000 is already in use

If you see this error:
```
Port 5000 is already in use. Please stop the other process or use a different port.
```

**How to fix:**

1. **Find the process using port 5000:**
   ```bash
   sudo lsof -i :5000
   ```

2. **Kill the process (replace <PID> with the number you see):**
   ```bash
   sudo kill -9 <PID>
   ```

3. **If the process does not go away:**
   - Wait a few seconds and run the `lsof` command again.
   - If the process is still there, try restarting your computer to fully release the port.

4. **Alternatively, change the backend port:**
   - Edit your `.env` file in the backend folder and set a different port (e.g., `PORT=5001`).
   - Restart the backend server.

## Troubleshooting: Cannot POST /api/chat

If you see `Cannot POST /api/chat` in your browser or console, it means:

- The frontend is running, but the backend is either **not running**, **running on a different port**, or **not accessible**.

### How to fix

1. **Start the backend server**  
   In a terminal:
   ```bash
   cd /home/adi/Documents/tumaki/server
   npm install
   npm run dev
   ```
   Make sure it says something like:
   ```
   Tumaki backend running on :5001
   ```

2. **Check your frontend `.env`**  
   Make sure `REACT_APP_API_BASE` matches the backend port (e.g., `http://localhost:5001`).

3. **If running on a LAN IP (e.g., 192.168.29.225)**  
   - Edit `.env` in the frontend and set:
     ```
     REACT_APP_API_BASE=http://192.168.29.225:5001
     ```
   - Restart the frontend after changing `.env`.

4. **Restart both frontend and backend after any port or .env change.**

5. **If you still see the error:**  
   - Make sure there are no typos in the API URL.
   - Check that the backend terminal shows no errors.
   - Visit `http://localhost:5001/api/health` (or your LAN IP) in your browser. You should see `{ "status": "ok" }`.
