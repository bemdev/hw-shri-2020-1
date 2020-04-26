interface Settings {
    id?: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: string;
    pathToRepo?: any;
    commits?: any;
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
    duration: string;
    log: string;
}

declare class WebpackLoggerPlugin {
    constructor(opts?: {})
}

declare module 'webpack-logger-plugin' {
    export = WebpackLoggerPlugin;
}

declare class Convert {
    constructor(
        {fg, newline, escapeXML} : { fg: string, newline: boolean, escapeXML: boolean}
    )

	[text: string]: any;
}

declare module 'ansi-to-html' {
    export = Convert
}