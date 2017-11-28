import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = "production";

console.log(chalk.blue("Generationg minified file for production."));

webpack(webpackConfig).run((err,stats)=>{
    if(err){
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error => console.log(chalk.red(error)) );
    }

    if(jsonStats.hasWarnings){
        return jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(`Webpack stats : ${stats}`);
    console.log(chalk.green("Your app has been built for production!"));
    return 0;
})
