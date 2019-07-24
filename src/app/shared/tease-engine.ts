export class TeaseEngine {

    pages: object;

    constructor(teaseScript: TeaseScript) {
        this.pages = teaseScript.pages;
        console.log(this.pages);
    }

    getFile() {

    }
}

export interface TeaseScript {
    files: TeaseFile;
    galleries: TeaseGallery;
    modules: {
        audio: any,
        nyx: any,
        pcm2: any,
    };
    pages: any;
}

export interface TeaseGallery {
    hash: string;
    name: string;
    images: {
        hash: string;
        width: number;
        height: number;
        size: number;
        id: number;
    }[];
}

export interface TeaseFile {
    name: string;
    hash: string;
    id: number;
    size: number;
    type: string;
}

export interface TeasePage {
    // name: string;
    actions: TeaseCommand[];
}

export interface TeaseCommand {
    image: undefined | {
        locator: string; // file:filename | gallery:gallery-hash/image-id
    };
    say: undefined | {
        allowSkip: boolean;
        duration: string;
        label: string;
        mode: string;
    };
    disable: undefined | {
        target: string;
    };
    choice: undefined | {
        options: TeaseOption[];
    };
    'audio.play': { // Loop until next page
        locator: string; // file:filename
        volume: number;
    };
    goto: {
        target: string;
    };
}

export interface TeaseOption {
    label: string;
    commands: TeaseCommand[];
}
