interface Settings {
    repoName: string;
    mainBranch: string;
    buildCommand: string;
    period: number;
}

interface Build {
    buildId: string;
}

declare class WebpackLoggerPlugin {
    constructor(opts?: {})
}

declare module 'webpack-logger-plugin' {
    export = WebpackLoggerPlugin;
}