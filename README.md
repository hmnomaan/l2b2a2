# L2B2A2 -- assignment 2  :: Mission2 #

**#Live Server: https://assignment2-six-sigma.vercel.app/**

*##instructions on how to run the application locally##*

1. create `.env` file and write down env variable.
*for_example:*

```bash
NODE_ENV= `#production or development`
PORT= `#5000 or any of your choice`
DATABASE_URL= `# mongodb connection url`
BCRYPT_SALT_ROUNDS=`#password length`
```

2. install all dependency with `npm install` command

3. then run `npm run build` it will work for typescript conversion

4. run `npm run start:dev` for server running for development server
`#or`, for production run `npm run start:prod`


###**for linting and prettier use this command below**

`npm run lint #for linting`

`npm run lint:fix #for fixing lint`

`npm run prettier #for formatting the code`

`npm run prettier:fix #for fix formatting`
