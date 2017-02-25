'use strict';

const gulp = require('gulp');
const gutil = require('gutil');
const runSequence = require('run-sequence');
const del = require('del');
const webpack = require('webpack');

const dest = './server/public';

function makeConfigTuple(configFileName) {
    return [configFileName, require(configFileName)];
}

const webPackConfigs = [
    makeConfigTuple('./webpack.jquery.js'),
    makeConfigTuple('./webpack.react.js')
];

function createWebpackTasks() {
    return webPackConfigs.map(tuple => {
        const configFileName = tuple[0];
        const config = tuple[1];
        const client = /\.\/.*\.(.*)\.js/.exec(configFileName)[1];
        const taskName = `webpack-${client}`;
        gulp.task(taskName, done => {
            webpack(config, (err, stats) => {
                if (err) throw new gutil.PluginError('webpack', err);
                const errors = stats.toString('errors-only');
                if (errors) gutil.log(`[${taskName}]`, errors);
                done();
            });
        });
        return taskName;
    });
}

gulp.task('clean', done => {
    return del(dest, done);
});

gulp.task('webpack', () => {
    return createWebpackTasks();
});

gulp.task('copyTopLevelFiles', () => {
    const files = [
        './client/index.html',
        './client/styles.css',
        './client/spinner.gif'
    ];
    return gulp.src(files).pipe(gulp.dest(dest));
});

gulp.task('build', () => {
    return runSequence('clean', createWebpackTasks(), 'copyTopLevelFiles');
});

gulp.task('default', ['build']);
