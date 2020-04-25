interface Settings {
    id: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
}

interface Build {
    id: string;
    configurationId: string;
    buildNumber: number;
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
    status: string;
    start: string;
    duration: number;
}

declare class WebpackLoggerPlugin {
    constructor(opts?: {})
}

declare module 'webpack-logger-plugin' {
    export = WebpackLoggerPlugin;
}